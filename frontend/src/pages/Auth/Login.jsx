import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer.jsx'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { toast } from 'react-toastify';
import axios from "axios";

function Login() {
  const  [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //checking user has entered all fields 
      if(!email || !password){
        console.log("error")
      }
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/login`,{
        email,
        password
      })
      console.log(res.data);
      toast.success("Login Successfull")
      navigate("/home")
      localStorage.setItem('todoapp',JSON.stringify(res.data))
    } catch (error) {
      console.log(error.response.data.message)
      toast.error(error.response.data.message)
    }
  }
  return (
    <div className='w-full h-screen flex flex-col justify-between items-center'>
      {/* <div className=' h-[6%] w-full flex justify-start items-center px-5'>
        <Link to='/landing' className='text-emerald-500'><IoArrowBackCircleSharp className='h-9 w-9'/></Link>
      </div> */}
      <div className='w-full p-5 flex justify-center items-center'>
        <div className='h-[400px] w-full sm:w-[400px] bg-emerald-100 rounded-3xl flex flex-col justify-around shadow-lg shadow-emerald-200'>
          <div className='flex justify-center items-center'>
            <h1 className='font-bold text-emerald-900 text-2xl' style={{textShadow: "2px 2px 4px rgba(0,0,0,0.3)"}}>Login</h1>
          </div>
          <div>
            <form action="">
              <div className='flex flex-col justify-center gap-5 px-7'>
                <input className='px-2 py-3 rounded-2xl text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:shadow-lg' type="text" placeholder='Enter your Email Id' onChange={(e)=>setEmail(e.target.value)}/>
                <input className='px-2 py-3 rounded-2xl text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:shadow-lg' type="text" placeholder='Enter Password Here' onChange={(e)=>setPassword(e.target.value)} />
              </div>
              <p className='flex justify-center py-3'>Not registered? <Link to="/register" className='text-blue-700'>SignUp</Link></p>
            </form>
          </div>
          <div className='flex justify-center'>
            <button className='bg-emerald-500 px-4 py-2 rounded-md font-semibold  text-white shadow-lg' onClick={handleLogin}>Sign In</button>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <Footer />
      </div>
    </div>
  )
}

export default Login