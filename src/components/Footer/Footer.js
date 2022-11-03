import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Segment, Container, Grid, List, Header } from 'semantic-ui-react'
import { clientContentful } from '../../utils/client'

export default function Footer() {
  const [footer, setFooter] = useState({})

  useEffect(() => {
    const getFooter = async () => {
      const res = await clientContentful.getEntries({ content_type: 'footer' })
      setFooter(res.items[0].fields)
    }
    getFooter()
  }, [])

  return (
    <Segment
      vertical
      as="footer"
      style={{
        padding: '4em 0em',
        marginTop: '3em',
        borderTop: '1px solid #f2f2f2',
      }}
    >
      <Container text>
        <Grid stackable data-testid="footer">
          <Grid.Row>
            <Grid.Column width={9}>
              <Header as="h4" content={footer.servicesTitle} />
              <List>
                <List.Item>
                  <Link href="/">
                    <a>{footer.servicesText}</a>
                  </Link>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4">{footer.footerTitle}</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>

      <style jsx>{`
        .colophon {
          text-align: center;
          margin-top: 3.2rem;
          font-size: 0.8rem;
        }
        .colophon-entry {
          color: grey;
          margin-bottom: 0;
        }
      `}</style>
    </Segment>
  )
}
