import React from 'react'
import Logo from '../assets/icons8-what-i-do-94.png'
import HeroImg from '../assets/hero.png'
import { Link } from 'react-router-dom'
import Footer from '../components/footer'
// import Footer from '../components/Footer.jsx'

function Landing() {
  return (
    <div className='w-full h-screen flex flex-col justify-between '>
        <nav className='flex justify-around items-center bg-emerald-100 h-14'>
        <div className='w-12 h-12'>
          <img src={Logo} alt="Logo" />
        </div>
        <div className='flex gap-8 px-5'>
          <Link to="/register" className='bg-emerald-600 rounded-md flex justify-center items-center px-4 font-semibold text-white shadow-lg hover:bg-emerald-700 h-10'>Register</Link>
          <Link to="/login" className='bg-emerald-600 rounded-md flex justify-center items-center px-4 font-semibold text-white shadow-lg hover:bg-emerald-700 h-10'>Login</Link>
        </div>
      </nav>
      <div className='sm:flex-row  flex flex-col justify-center items-center'>
        <div className='flex flex-col justify-center items-center py-8 sm:w-1/2'>
          <div className='w-[70%]'>
            <h1 className='text-5xl font-bold'>Organize <br />Your Tasks</h1><br />
            <p className='text-2xl font-mono'>A <span className='text-red-600'>simple</span> and <span className='text-red-600'>effective</span> task management app</p>
            <p className='text-2xl font-mono'>Turn your tasks into goals you can <span className='text-red-600'>easily achieve</span>.</p>
          </div><br /><br />
          <div className=' w-[70%]'>
            <Link to="/register" className='px-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md py-3 font-bold'>Get Started</Link>
          </div>
        </div>
        <div className='w-full sm:w-1/2 h-full flex justify-center items-center'>
          <div className='w-full h-full flex justify-center items-center py-6'>
            <img src={HeroImg} alt="Hero img" className='w-[90%]  md:w-1/2' />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Landing