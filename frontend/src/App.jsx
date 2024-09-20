import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/footer'
import Watching from './pages/watching/watching';
import Homepage from './pages/home/homepage'
import NotFound from './pages/notfound/notfound'; // Ensure this path is correct

import './App.css'


function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/watching" element={<Watching />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
