import React , { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import Menu from './components/Menu'
import Signin from './components/Signin';
import Profile from './components/Profile';
import MyOrder from './components/MyOrder';
import './App.css'
 
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/MyOrder" element={<MyOrder />} />
      </Routes>
    </Router>
  );
}

export default App
