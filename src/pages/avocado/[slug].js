import React, { useEffect } from 'react'
import Image from 'next/image'
import { Item, Label } from 'semantic-ui-react'
import { Layout } from '../../components/Layout/Layout'
import { AvocadoAttributes } from '../../components/Avocados/AvocadoAttributes'
import { Skeleton } from '../../components/Skeleton/Skeleton'
import { useRouter } from 'next/router'
import { getAvocadoBySlugThunk } from '../../store/content'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

// export const getStaticPaths = async ({ locales }) => {
//   if (!locales) {
//     throw new Error('No locales provided')
//   }
//   const { items } = await clientContentful.getEntries({
//     content_type: 'avocadoItem'
//   })

//   const paths = items.map((item) => ({ params: { slug: item.fields.slug } })).flatMap((path) => locales.map((loc) => ({ locale: loc, ...path })))
//   return {
//     paths,
//     fallback: true,
//   }
// }

// export const getStaticProps = async ({ params, locale }) => {
//   const { items } = await clientContentful.getEntries({
//     content_type: 'avocadoItem',
//     'fields.slug': params.slug,
//     locale,
//   })

//   return {
//     props: { avocado: items[0] },
//     revalidate: 1,
//   }
// }

export default function AvocadoDetail() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const avocado = useAppSelector((state) => state.content.selectedAvocado)
  const locale = useAppSelector((state) => state.content.locale)

  useEffect(() => {
    if (Object.keys(avocado).length === 0 && Object.getPrototypeOf(avocado) === Object.prototype) {
      dispatch(getAvocadoBySlugThunk(router.query.slug))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(getAvocadoBySlugThunk(router.query.slug))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  if (!avocado || (Object.keys(avocado).length === 0 && Object.getPrototypeOf(avocado) === Object.prototype)) return <Skeleton />
  const { title, description, titleDescription, featuredImage, attributes } = avocado.fields

  return (
    <Layout>
      <>
        <Item.Group as="section">
          <Item style={{ alignItems: 'center' }}>
            <Image src={'https:' + featuredImage.fields.file.url} width="400" height="400" alt="avocado-image" />

            <Item.Content>
              <Item.Header data-testid="avocado-title" as="h1">
                {title}
              </Item.Header>
              <Item.Description>
                <Label>
                  {attributes.price.symbol} {attributes.price.value}
                </Label>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
        <AvocadoAttributes description={description} titleDescription={titleDescription} caracteristic={attributes.caracteristic} />
      </>
    </Layout>
  )
}
