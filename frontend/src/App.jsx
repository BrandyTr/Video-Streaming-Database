import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./commonPaths";
import Homepage from "./pages/home/homepage";
import Watching from "./pages/watching/watching";
import Notfound from "./pages/notfound/notfound";

// New
import Header from "./components-main/header/Header";

// icon
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab  } from '@fortawesome/free-brands-svg-icons'

library.add(fas, fab);

import "./App.css";

function App() {
  return (
    <Router>
      <Header></Header>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/watching/:id" element={<Watching />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
