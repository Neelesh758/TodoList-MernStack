import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';
import addtodo from '../assets/addtodo.jpeg'
import axios from 'axios';

function AddTodo() {
  const [popup , setPopup] = useState(false)
  const [title , setTitle] = useState("")
  const [description , setDescription] = useState("")
  

  const openPopup = ()=>{
    setPopup(true)
  }
  const closePopup = ()=>{
    setPopup(false)
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const userData = JSON.parse(localStorage.getItem('todoapp'))
      console.log(userData)

      const id = userData?.user?.id
      console.log(id)
      const token = userData?.token
      const createdBy = id
      //CHecking user inputs
      if(!title || !description){
        toast.error("Kindly Enter All Details")
        return;
      }
      const data = {title,description,createdBy}
      const res = await axios.post("/api/v1/todo/create",
        data,
        {
          headers :{
            Authorization : `Bearer ${token}`,
          }
        }
      )
      toast.success("Todo added Successfully")
      setDescription("")
      setTitle("")

      closePopup();

    } catch (error) {
      console.log(error)
      toast.error("Something Went wrong!!")
    }

  }
  return (
    <div className='flex flex-col justify-center items-center h-4/6'>
      <div className='flex justify-center items-center p-5'>
        {!popup && (
          <div className='flex flex-col justify-center items-center'>
            <button className='px-5 py-2 rounded-lg text-white font-bold bg-emerald-500 hover:bg-emerald-600' onClick={openPopup}>Create Todo</button>
            <img src={addtodo} className='-translate-x-6' alt="add todo" />
          </div>
        )}
      </div>
      {/* Popup Div */}
      <div className='rounded-xl w-80 h-96  overflow-hidden -translate-y-16'>
        <div className={`bg-emerald-100 w-full h-full px-3 py-2  transition-all duration-500 ease-in-out ${popup ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} flex items-center justify-between flex-col`}>
          <div className='flex justify-end w-full flex-col items-end'>
            <button className='bg-red-700 text-white font-extrabold px-2 py-[2px] rounded-2xl ' onClick={closePopup}>X</button>
            <div>
              <h1 className='text-emerald-700 font-extrabold text-xl'>Hello !! , Add Your Task Here</h1>
            </div>
          </div>
          <div>
            <form action="">
              <input type="text" placeholder='Enter Title Here' value={title} onChange={(e)=> setTitle(e.target.value)} className='w-full rounded-md py-2 px-3 mb-4' />
              <textarea type="text" maxLength={120} placeholder='Deacription' value={description} onChange={(e)=> setDescription(e.target.value)} className='w-full h-36 rounded-md py-2 px-3' />
            </form>
          </div>
          <button onClick={handleSubmit} className='px-5 py-2 rounded-lg text-white font-bold bg-emerald-500 hover:bg-emerald-600'>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default AddTodo