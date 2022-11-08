import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { avocadosMock } from '../../__mocks__/avocado'
import Home from '../../pages/index'
import { Provider } from 'react-redux'
import { useRouter } from 'next/router'
import { store } from '../../store'
import { clientContentful } from '../../utils/client'
import { setFooter } from '../../store/content'
import { useAppDispatch } from '../../store/hooks'
import { useEffect } from 'react'


const mockRender = (component) => render(<Provider store={store}>{component}</Provider>)

jest.mock('next/router', () => ({
  useRouter : jest.fn(),
}))

jest.mock('../../utils/client')

describe('Index page', () => {


  // it('Should initially set games to an empty object', () => {
    
  //   useRouter.mockReturnValue({
  //     pathname: '/',
  //     locale: 'en-US',
  //     locales: ['en-US', 'es'],
  //   })

  //   const { findByTestId } = mockRender(<Home avocados={avocadosMock} />)
  // })

  it('should render Home page', async () => {
    useRouter.mockReturnValue({
      pathname: '/',
      locale: 'en-US',
      locales: ['en-US', 'es'],
    })

    clientContentful.getEntries.mockImplementationOnce(() => ({
      items: avocadosMock
    }))

    const { findByTestId } = mockRender(<Home avocados={avocadosMock} />)
    // const footer = await findByTestId('footer')
    const navbar = await findByTestId('navbar')
    const avocadoList = await findByTestId('avocado-list')

    // expect(footer).toBeInTheDocument()
    expect(navbar).toBeInTheDocument()
    expect(avocadoList).toBeInTheDocument()
  })

  it('should render footer', ()=>{ 
    const ComponentTest = ()=>{
      const dispatch = useAppDispatch()
      useEffect( ()=> {

        dispatch(
          setFooter({
            fields: {
              servicesTitle: 'Services',
              servicesText: 'See all avocados',
              footerTitle: 'DSU app',
            },
          }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
      return(<></>)
    }
    mockRender(<ComponentTest/> )
  })
})
