import React from 'react'
import Image from 'next/image'
import { createClient } from 'contentful'
import { Item, Label } from 'semantic-ui-react'
import { Layout } from '../../components/Layout/Layout'
import { AvocadoAttributes } from '../../components/Avocados/AvocadoAttributes'
import { Skeleton } from '../../components/Skeleton/Skeleton'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'avocadoItem',
  })

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    }
  })

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: 'avocadoItem',
    'fields.slug': params.slug,
  })

  return {
    props: { avocado: items[0] },
    revalidate: 1,
  }
}

export default function AvocadoDetail({ avocado }) {
  if (!avocado) return <Skeleton />
  const { title, description, titleDescription, featuredImage, attributes } = avocado.fields

  return (
    <Layout>
      <>
        <Item.Group as="section">
          <Item style={{ alignItems: 'center' }}>
            <Image src={'https:' + featuredImage.fields.file.url} width="400" height="400" alt="avocado-image" />

            <Item.Content>
              <Item.Header as="h1">{title}</Item.Header>
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
