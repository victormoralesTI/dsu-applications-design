import { clientContentful } from '../../utils/client'
import { setAvocados, setContentFetched, setFooter, setSelectedAvocado } from './contentSlice'

export const getContentThunk = () => async (dispatch) => {
  await dispatch(getAvocadosThunk())
  await dispatch(getFooterThunk())
  dispatch(setContentFetched(true))
}

export const getAvocadoBySlugThunk = (slug) => async (dispatch, getState) => {
  try {
    const { content } = getState()
    console.log(content.locale)

    const { items } = await clientContentful.getEntries({
      content_type: 'avocadoItem',
      'fields.slug': slug,
      locale: content.locale,
    })
    dispatch(setSelectedAvocado(items[0]))
  } catch (error) {
    console.log(error)
  }
}

const getAvocadosThunk = () => async (dispatch, getState) => {
  try {
    const { content } = getState()
    const res = await clientContentful.getEntries({ content_type: 'avocadoItem', locale: content.locale })
    dispatch(setAvocados(res.items))
  } catch (error) {
    console.log(error)
  }
}

const getFooterThunk = () => async (dispatch, getState) => {
  try {
    const { content } = getState()
    const res = await clientContentful.getEntries({ content_type: 'footer', locale: content.locale })
    dispatch(setFooter(res.items[0].fields))
  } catch (error) {
    console.log(error)
  }
}
