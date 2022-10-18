import React from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Header, Divider, Table } from 'semantic-ui-react'

export const AvocadoAttributes = ({ description, titleDescription, caracteristic }) => {
  return (
    <section className="container">
      <Header as="h3">{titleDescription}</Header>
      <div>{documentToReactComponents(description)}</div>

      <Divider />

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="2">Attributes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {caracteristic.map(({ name, value }) => (
            <Table.Row key={name}>
              <Table.Cell className="attr-name">{name}</Table.Cell>
              <Table.Cell>{value}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </section>
  )
}
