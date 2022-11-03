import React from 'react'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { Menu, Container } from 'semantic-ui-react'

export const Navbar = () => {
  const { pathname, locale, locales } = useRouter()

  const handleChangeLanguaje = async (e, { value: newPreferredLocale }) => {
    await fetch(`/api/language`, { method: 'POST', body: newPreferredLocale })
    Router.reload('/')
  }

  return (
    <Menu size="huge" borderless pointing as="header" data-testid="navbar">
      <Container text>
        <Link href="/" passHref>
          <Menu.Item active={pathname === '/'} title="Home | Our Avocados">
            Avocado Store
          </Menu.Item>
        </Link>
        <Menu.Menu position="right" data-testid="menu-locales">
          {locales.map((loc) => (
            <Menu.Item key={loc} value={loc} name={loc.toUpperCase()} onClick={handleChangeLanguaje} active={locale === loc} />
          ))}
        </Menu.Menu>
      </Container>

      <style jsx global>{`
        .ui.menu.huge {
          font-size: 1.5rem;
        }
      `}</style>
    </Menu>
  )
}
