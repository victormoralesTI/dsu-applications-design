import React from 'react'
import Image from 'next/image'
import { Card } from 'semantic-ui-react'
import Link from 'next/link'

const mapProductsToCards = (avocados) =>
  avocados.map(({ fields }) => (
    <Link key={fields.slug} href={`/avocado/${fields.slug}`} passHref>
      <Card
        as="a"
        header={fields.title}
        image={{ children: <Image src={'https:' + fields.featuredImage.fields.file.url} width={333} height={333} alt="avocado-image" /> }}
        meta={{
          children: (
            <Card.Meta style={{ color: 'dimgray' }}>
              {fields.attributes.price.symbol}
              {fields.attributes.price.value}
            </Card.Meta>
          ),
        }}
      />
    </Link>
  ))

export const AvocadoList = ({ avocados }) => {
  return (
    <Card.Group itemsPerRow={2} stackable>
      {mapProductsToCards(avocados)}
    </Card.Group>
  )
}
