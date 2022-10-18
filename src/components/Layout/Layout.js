import React from 'react'
import { Container } from 'semantic-ui-react'
import Footer from '../Footer/Footer'
import { Navbar } from '../Navbar/Navbar'

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container as="main" text>
        {children}
      </Container>
      <Footer />
    </>
  )
}
