import React from 'react'
import About from './pages/About'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Home from './pages/Home'
import { ToastContainer } from "react-toastify";
import TodoList from './pages/TodoList.jsx'

function App() {
  return (
    <div>
      <ToastContainer position='top-right' autoClose={2000} pauseOnHover />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />
        <Route path='/home' element={<Home />} />
        <Route path='/todolist' element={<TodoList />} />
      </Routes>
    </div>
  )
}

export default App