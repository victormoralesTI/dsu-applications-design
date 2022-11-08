import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, Container } from 'semantic-ui-react'
import { setLocale } from '../../store/content'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

export const Navbar = () => {
  const dispatch = useAppDispatch()
  const nowLocale = useAppSelector((state) => state.content.locale)
  const selectedAvocado = useAppSelector((state) => state.content.selectedAvocado)
  const { pathname, locales } = useRouter()

  const handleChangeLanguaje = async (e, { value: newPreferredLocale }) => {
    dispatch(setLocale(newPreferredLocale))
  }

  return (
    <Menu size="huge" borderless pointing as="header" data-testid="navbar">
      <Container text>
        <Link href="/" passHref>
          <Menu.Item active={pathname === '/'} title="Home | Our Avocados">
            Avocado Store {selectedAvocado.fields ? ` - ${selectedAvocado.fields.title}` : null}
          </Menu.Item>
        </Link>

        <Menu.Menu position="right" data-testid="menu-locales">
          {locales.map((loc) => (
            <Menu.Item key={loc} value={loc} name={loc.toUpperCase()} onClick={handleChangeLanguaje} active={nowLocale === loc} />
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
