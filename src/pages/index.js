import { useEffect } from 'react'
import { AvocadoList } from '../components/Avocados/AvocadoList'
import { Layout } from '../components/Layout/Layout'
import { getContentThunk, selectAvocados, selectFetchedContent, selectLocale, setSelectedAvocado } from '../store/content'
import { useAppDispatch, useAppSelector } from '../store/hooks'

export default function Home() {
  const dispatch = useAppDispatch()
  const fetchedContent = useAppSelector(selectFetchedContent)
  const avocados = useAppSelector(selectAvocados)
  const locale = useAppSelector(selectLocale)

  useEffect(() => {
    dispatch(setSelectedAvocado({}))
    if (!fetchedContent) {
      console.log('fetching content')
      dispatch(getContentThunk())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(getContentThunk())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  return (
    <Layout>
      <AvocadoList avocados={avocados} />
    </Layout>
  )
}
