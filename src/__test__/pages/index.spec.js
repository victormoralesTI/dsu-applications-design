import { useRouter } from 'next/router'

import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import { avocadosMock } from '../../__mocks__/avocado'
import { clientContentful } from '../../utils/client'
import Home, { getStaticProps } from '../../pages/index'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('../../utils/client')

describe('Index page', () => {
  it('should return static props', async () => {
    clientContentful.getEntries.mockImplementationOnce(() => ({
      items: [{ fakeField: 'fakeValue' }, { fakeField: 'fakeValue' }],
    }))

    const { props } = await getStaticProps({ locale: 'en-US' })

    expect(props).toEqual({
      avocados: [{ fakeField: 'fakeValue' }, { fakeField: 'fakeValue' }],
      revalidate: 1,
    })
  })

  it('should render Home page', async () => {
    useRouter.mockReturnValue({
      pathname: '/',
      locale: 'en-US',
      locales: ['en-US', 'es'],
    })

    clientContentful.getEntries.mockImplementationOnce(() => ({
      items: [
        {
          fields: {
            servicesTitle: 'Services',
            servicesText: 'See all avocados',
            footerTitle: 'DSU app',
          },
        },
      ],
    }))

    const { findByTestId } = render(<Home avocados={avocadosMock} />)
    const footer = await findByTestId('footer')
    const navbar = await findByTestId('navbar')
    const avocadoList = await findByTestId('avocado-list')

    expect(footer).toBeInTheDocument()
    expect(navbar).toBeInTheDocument()
    expect(avocadoList).toBeInTheDocument()
  })
})
