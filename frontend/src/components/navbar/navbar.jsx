import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../navbar/navbar.css'
const Navbar = () => {
  console.log("Navbar is rendering");
  return (
    <nav className="vertical-navbar">
      <img src="https://via.placeholder.com/150" alt="logo" />
      <ul> 
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">About</Link></li>
        <li><Link to="/">Services</Link></li>
        <li><Link to="/">Contact</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar