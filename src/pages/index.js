import { createClient } from 'contentful'
import { AvocadoList } from '../components/Avocados/AvocadoList'
import { Layout } from '../components/Layout/Layout'

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: 'avocadoItem' })

  return {
    props: {
      avocados: res.items,
      revalidate: 1,
    },
  }
}

export default function Home({ avocados }) {
  return (
    <Layout>
      <AvocadoList avocados={avocados} />
    </Layout>
  )
}
