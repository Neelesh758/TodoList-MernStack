import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import errimg from '../assets/errimg.jpeg'
import { CiEdit } from "react-icons/ci";
import { IoTrashBin } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from 'react-toastify';

import axios from 'axios';
import Footer from '../components/Footer.jsx';

function TodoList() {
  const [popup , setPopup] =useState(false)
  const [todos , setTodos] = useState([]);
  const [title , setTitle] = useState("");
  const [editId, setEditId] = useState(null);

  const [description , setDescription] = useState("");
  //state for animation
  const [deleteid , setDeleteid] = useState(null)
//Get Todos
  const getTodos = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('todoapp'))
      console.log(userData)
      const token = userData?.token;

      //validation
      if(!token){
        toast.error("Please Login Again");
        return ;
      }
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/todo/get`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      if(res.data.success){
        setTodos(res.data.todo)
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in fetching Todo List")
    }
  }
  useEffect(()=>{
    getTodos()
  },[])
  //Delete 
  const handleDelete = async (id)=>{
    const isConfirmed = window.confirm("Are you sure you want to delete this todo?");
    if(!isConfirmed) return;
    setDeleteid(id);
    setTimeout(async () => {
      try {
      const userData = JSON.parse(localStorage.getItem("todoapp"));
      console.log( "This is data" , userData)
      const token = await userData?.token
      //validation
      if(!token){
        toast.error("Please Login Again");
        return ;
      }
      
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/todo/delete/${id}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      if(res.data.success){
        toast.success("Deleted Successfully");
        getTodos();
      }
    } catch (error) {
      console.log(error);
      toast.error("Oh No, Something Went Wrong")
      setDeleteid(null)
    }
    }, 250);
  }
  //on update only Done
  const handleDone = async (id,currentStatus) => {
    try {
      const userData = JSON.parse(localStorage.getItem('todoapp'));
      const token = await userData?.token;
      //validation
      if(!token){
        toast.error("Please Login Again");
        return ;
      }
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/todo/update/${id}`,{
        isCompleted: !currentStatus
      },
        {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      if(res.data.success){
        console.log("Successfully")
        toast.success(!currentStatus ? "Task marked as completed" : "Task marked as pending");
        getTodos()
      }
    } catch (error) {
      console.log(error);
      toast.error("Oh No, Something Went Wrong")
    }
  }
  //On Update Todo List

  const openPopup = ()=>{
    setPopup(true)
  }
  const closePopup = ()=>{
    setPopup(false)
  }


  const updateTodo = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("todoapp"));
      const token = await userData?.token;
      //validation
      if(!token){
        toast.error("Please Login Again");
        return ;
      }
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/todo/update/${editId}`,
        {
          title,
          description,
        },
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )
      if(res.data.success){
        toast.success("Todo Updated Successfully");
        closePopup();
        setEditId(null);
        getTodos();
      }
    } catch (error) {
      console.log(error);
      toast.error("Oh No, Something Went Wrong")
    }
  }
  return (
    <div className='flex flex-col justify-between items-center h-screen'>
      <Navbar />
      {!popup && (
      <div className='flex flex-col justify-center items-center gap-5 mt-4'>
        <h1 className='font-bold text-emerald-900 text-2xl'>My Todos</h1>
        <div className='flex gap-5 flex-wrap items-center justify-center'>
          {
          todos.length === 0?(
            <div className='flex flex-col justify-center items-center'>
              <p className='text-emerald-700 font-semibold text-lg'>No Todos Found</p>
              <img src={errimg} alt="error" />
            </div>
          ):(
            todos.map((todo)=>(
              <div key={todo._id} className={`w-[330px] h-[200px] bg-emerald-100 rounded-xl flex justify-center overflow-hidden shadow-md transition-all duration-300 ease-in-out  ${deleteid === todo._id ? "opacity-0 -translate-x-20" : "opacity-100 translate-x-0"} `}>
                <div className={`w-[80%] bg-emerald-200 p-4 flex flex-col justify-between  ${todo.isCompleted ? "bg-emerald-50 ": "bg-emerald-200"} `}>
                  <div>
                    <h1 className={`font-bold text-xl ${todo.isCompleted ? "line-through text-gray-30" : ""}`}>{todo.title}</h1>
                    <p className={`font-semibold font-mono text-emerald-800 text-md mt-3 ${todo.isCompleted ? "line-through text-gray-30" : ""}`}>{todo.description}</p>
                  </div>
                  <div><p className={`font-bold text-lg ${todo.isCompleted ? "text-emerald-800":"text-red-800"}`}>Status : {todo.isCompleted? "Completed ✅" : "Pending 🔄"}</p></div>
                </div>
                <div className='w-[20%] bg-emerald-300 h-full p-2 flex flex-col items-center justify-center gap-5'>
                  <div className="flex flex-col justify-center items-center cursor-pointer " onClick={()=>{handleDone(todo._id,todo.isCompleted)}}>
                    <div className='text-green-700'><FaCheckCircle /></div>
                    <p className='font-semibold'>Done</p>
                  </div>
                  <div className='flex flex-col justify-center items-center cursor-pointer ' onClick={()=>{
                    setEditId(todo._id),
                    setTitle(todo.title);
                    setDescription(todo.description);
                    openPopup();
                  }}>
                    <div className='text-blue-700'><CiEdit /></div>
                    <p className='font-semibold'>Edit</p>
                  </div>
                  <div className='flex flex-col justify-center items-center cursor-pointer ' onClick={()=> handleDelete(todo._id)}>
                    <div className='text-red-700'><IoTrashBin /></div>
                    <p className='font-semibold' >Delete</p>
                  </div>
                </div>
              </div>
            ))
          )
        }
        </div>
      </div>)}
      <div className='rounded-xl w-80 h-96  overflow-hidden mt-6'>
        <div className={`bg-emerald-100 w-full h-full px-3 py-2  transition-all duration-500 ease-in-out ${popup ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"} flex items-center justify-between flex-col`}>
          <div className='flex justify-end w-full flex-col items-end'>
            <button className='bg-red-700 text-white font-extrabold px-2 py-[2px] rounded-2xl ' onClick={closePopup}>X</button>
            <div>
              <h1 className='text-emerald-700 font-extrabold text-xl'>Task Edit</h1>
            </div>
          </div>
          <div>
            <form action="">
              <input type="text" placeholder='Enter Title Here' value={title} onChange={(e)=> setTitle(e.target.value)} className='w-full rounded-md py-2 px-3 mb-4' />
              <textarea type="text" placeholder='Deacription' value={description} onChange={(e)=> setDescription(e.target.value)} className='w-full h-36 rounded-md py-2 px-3' />
            </form>
          </div>
          <button onClick={updateTodo} className='px-5 py-2 rounded-lg text-white font-bold bg-emerald-500 hover:bg-emerald-600'>Submit</button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default TodoList