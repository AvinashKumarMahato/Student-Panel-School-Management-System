import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserClass from './pages/UserClass'
import Navbar from './components/Navbar';
import MyProfile from './pages/MyProfile';
import Home from './pages/Home';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/student-classes' element={<UserClass />} />
      </Routes>
    </div>
  )
}

export default App