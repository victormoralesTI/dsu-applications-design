import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Menu, Container } from 'semantic-ui-react'

export const Navbar = () => {
  const { pathname } = useRouter()

  return (
    <Menu size="huge" borderless pointing as="header">
      <Container text>
        <Link href="/" passHref>
          <Menu.Item active={pathname === '/'} title="Home | Our Avocados">
            Avocado Store
          </Menu.Item>
        </Link>
      </Container>
      <style jsx global>{`
        .ui.menu.huge {
          font-size: 1.5rem;
        }
      `}</style>
    </Menu>
  )
}
