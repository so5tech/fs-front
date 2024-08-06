// import { add, format} from "date-fns"
// import React, { useState } from 'react';
import {Routes, Route } from 'react-router-dom'
// import TimeSeriesInput from './Input/TimeSerisInput';
// import './App.css'
import Home from './components/homePage/Home';
import Login from './components/loginPage/Login';
import Signup from './components/signupPage/Signup';
import Admin from './components/adminPage/Admin';

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/admin' element={<Admin/>} />


      </Routes>
    </div>
  )
}

export default App
