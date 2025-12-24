import React from 'react'
import Navbar from '../components/Navbar.jsx'
import AddTodo from './AddTodo.jsx'
import Footer from '../components/Footer.jsx'

function Home() {
  return (
    <div className='flex flex-col justify-between items-center h-screen'>
      <Navbar />
      <AddTodo />
      <Footer />
    </div>
  )
}

export default Home