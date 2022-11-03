import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import { useRouter, reload } from 'next/router'

import { Navbar } from '../../../components/Navbar/Navbar'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
  reload: jest.fn(),
}))

global.fetch = jest.fn(() => Promise.resolve())

describe('Navbar component', () => {
  describe('handleChangeLanguaje function', () => {
    beforeEach(() => {
      useRouter.mockReturnValue({
        pathname: '/',
        locale: 'en-US',
        locales: ['en-US', 'es'],
      })

      render(<Navbar />)
    })

    it('Navbar should have two menu item languaje', async () => {
      const buttonsLocales = await (await screen.findByTestId('menu-locales')).childNodes
      expect(buttonsLocales.length).toBe(2)
    })

    it('click on any menu item languaje should triggered handleChangeLanguaje function', async () => {
      const buttonsLocales = await (await screen.findByTestId('menu-locales')).childNodes
      await buttonsLocales[0].click()
      expect(fetch).toHaveBeenCalled()
      expect(reload).toHaveBeenCalled()
    })
  })
})
