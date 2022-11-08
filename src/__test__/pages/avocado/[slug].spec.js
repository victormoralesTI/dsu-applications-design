import { useRouter } from 'next/router'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import AvocadoDetail from '../../../pages/avocado/[slug]'
import { clientContentful } from '../../../utils/client'
import { avocadoMock } from '../../../__mocks__/avocado'
import { Provider } from 'react-redux'
import { store } from '../../../store'

jest.mock('../../../utils/client')

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@contentful/rich-text-react-renderer', () => ({
  documentToReactComponents: jest.fn(),
}))

describe('[slug] avocado page', () => {

  describe('render [slug] page', () => {


    it('should render Skeleton component when avocado is null', async () => {
      useRouter.mockReturnValue({
        query: { slug: 'reed-avocado' }
      })
      const { getByTestId } = render(<Provider store={store}><AvocadoDetail avocado={null} /></Provider>)
      const skeleton = getByTestId('skeleton-test')
      expect(skeleton).toBeInTheDocument()
    })

    it('should render AvocadoDetail when avocado is passed', async () => {
      clientContentful.getEntries.mockImplementationOnce(() => ({
        items: [ avocadoMock ],
      }))

      useRouter.mockReturnValue({
        query: {
          slug: 'reed-avocado'
        },
        pathname: '/',
        locale: 'en-US',
        locales: ['en-US', 'es'],
      })

      render(<Provider store={store}><AvocadoDetail/></Provider>)
      await screen.findByTestId('footer')

      const title = screen.getByTestId('avocado-title')

      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent(avocadoMock.fields.title)
    })
  })
})
