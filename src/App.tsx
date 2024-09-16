// import { add, format} from "date-fns"
// import React, { useState } from 'react';
import {Routes, Route } from 'react-router-dom'
// import TimeSeriesInput from './Input/TimeSerisInput';
// import './App.css'
import Home from './components/homePage/Home';
import Login from './components/loginPage/Login';
import Signup from './components/signupPage/Signup';
import Admin from './components/adminPage/Admin';
import TaskHome from './components/taskPage/taskhome';
import Inventory from './components/inventoryPage/inventory';
import EDT from './components/edtPage/edt';
import ShopHome from './components/shopPage/shop';
function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/taskHome' element={<TaskHome/>} />
        <Route path='/shopHome' element={<ShopHome/>} />

        <Route path='/inventory' element={<Inventory/>} />
        <Route path='/edt' element={<EDT/>} />

        



      </Routes>
    </div>
  )
}

export default App
