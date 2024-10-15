import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Footer} from './commonPaths'
import Homepage from './pages/home/homepage';
import Watching from './pages/watching/watching';
import Notfound from './pages/notfound/notfound';

import './App.css'


function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/watching" element={<Watching />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
