import React from 'react'
import Navbar from './components/Navbar'
import PageRouter from './Routers/PageRouter'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <div className="main-section flex-grow">
        <PageRouter/>
      </div>
      <Footer/>
    </div>
  )
}

export default App
