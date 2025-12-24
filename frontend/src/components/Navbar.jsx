import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/icons8-what-i-do-94.png'
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from "react-icons/gi";



function Navbar() {
  const [userName,setUserName] = useState("");
  const [openMenu , setOpenMenu] = useState(false)
  const navigate = useNavigate();

  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('todoapp'));


    console.log(userData)
    setUserName(userData?.user?.userName)
  },[])

  const handleLogout = () => {
    if(window.confirm("Are you sure you want to logout?")){
      localStorage.removeItem('todoapp')
      navigate('/login')
      toast.success("Logout Succesfully")
    }
  }

  return (
    <div className='w-full h-14 bg-emerald-100 flex justify-between items-center px-5'>
      <div className='flex items-center gap-6'>
        <div className='h-[55px] w-[55px] '>
         <img src={Logo} alt="logo"  className='h-full w-full'/>
        </div>
        <div className='hidden md:flex'>
         <h1 className='md:text-2xl font-serif font-bold'>Welcome <span className='font-mono font-semibold text-red-700 '>{userName}</span></h1>
        </div>
      </div>
      <div className='hidden font-bold font-serif text-lg md:flex gap-5'>
        <Link to="/home">Home</Link>
        <Link to="/todolist">Todo List</Link>
        <Link to="/about">About</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {/* Mobile menu */}
      <div className='sm:block md:hidden '>
        <div>
          <GiHamburgerMenu className='h-[50px] w-[30px]' onClick={()=>setOpenMenu(true)} />
        </div>
        <div className={`fixed top-0 right-0 transform transition-transform duration-500 h-screen w-full bg-emerald-100
          ${openMenu ? 'translate-x-0' : 'translate-x-full'} z-[99999] `}>
          <div className='flex justify-between items-center px-2 py-1 bg-emerald-200'>
            <div onClick={() => setOpenMenu(false)} className='font-bold text-xl px-5 py-2'>X</div>
            <div>
              <h1 className='text-xl font-serif font-bold'>Welcome <span className='font-mono font-semibold text-red-700 '>{userName}</span></h1>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center gap-8 font-bold font-serif text-lg '>
            <Link to="/home" onClick={()=> setOpenMenu(false)}>Home</Link>
            <Link to="/todolist" onClick={()=> setOpenMenu(false)}>Todo List</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar