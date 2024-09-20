import React from 'react'
import { Link } from 'react-router-dom'
import { Logos } from '../../commonPaths'
import '../navbar/navbar.css'
const Navbar = () => {
  return (
    <nav className="vertical-navbar">
      <img className='logo' src={Logos.netflix} alt="NexFlit" />
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