import { AvocadoList } from '../components/Avocados/AvocadoList'
import { Layout } from '../components/Layout/Layout'
import { clientContentful } from '../utils/client'

export async function getStaticProps({ locale }) {
  const res = await clientContentful.getEntries({ content_type: 'avocadoItem', locale })

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
