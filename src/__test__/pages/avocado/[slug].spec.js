import { useRouter } from 'next/router'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import AvocadoDetail, { getStaticPaths, getStaticProps } from '../../../pages/avocado/[slug]'
import { clientContentful } from '../../../utils/client'
import { avocadoMock } from '../../../__mocks__/avocado'

jest.mock('../../../utils/client')

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@contentful/rich-text-react-renderer', () => ({
  documentToReactComponents: jest.fn(),
}))

describe('[slug] avocado page', () => {
  describe('server methos', () => {
    it('should throw error if no locales', async () => {
      const locales = null
      await getStaticPaths({ locales }).catch((error) => {
        expect(error).toEqual(new Error('No locales provided'))
      })
    })

    it('should return static paths', async () => {
      clientContentful.getEntries.mockImplementationOnce(() => ({
        items: [{ fields: { slug: '1' } }, { fields: { slug: '2' } }],
      }))

      const { paths } = await getStaticPaths({ locales: ['en-US', 'es'] })
      expect(paths).toEqual([
        { locale: 'en-US', params: { slug: '1' } },
        { locale: 'es', params: { slug: '1' } },
        { locale: 'en-US', params: { slug: '2' } },
        { locale: 'es', params: { slug: '2' } },
      ])
    })

    it('should return static props', async () => {
      clientContentful.getEntries.mockImplementationOnce(() => ({
        items: [
          {
            fields: {
              slug: '1',
              title: 'Hass Avocado',
              description: 'Hass avocado description',
            },
          },
        ],
      }))

      const { props } = await getStaticProps({ params: { slug: '1' }, locale: 'en-US' })
      expect(props).toEqual({
        avocado: {
          fields: {
            slug: '1',
            title: 'Hass Avocado',
            description: 'Hass avocado description',
          },
        },
      })
    })
  })

  describe('render [slug] page', () => {
    it('should render Skeleton component when avocado is null', async () => {
      const { getByTestId } = render(<AvocadoDetail avocado={null} />)
      const skeleton = getByTestId('skeleton-test')
      expect(skeleton).toBeInTheDocument()
    })

    it('should render AvocadoDetail when avocado is passed', async () => {
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

      useRouter.mockReturnValue({
        pathname: '/',
        locale: 'en-US',
        locales: ['en-US', 'es'],
      })

      render(<AvocadoDetail avocado={avocadoMock} />)
      await screen.findByTestId('footer')

      const title = screen.getByTestId('avocado-title')

      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent(avocadoMock.fields.title)
    })
  })
})
