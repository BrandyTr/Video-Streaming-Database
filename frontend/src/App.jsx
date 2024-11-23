import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notfound from "./pages/notfound/notfound";
import Rating from"./pages/detail/rateMovieFunct";
import { Toaster } from "react-hot-toast"
import { Navigate } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab  } from '@fortawesome/free-brands-svg-icons'
import Watching from "./pages/watching/watching";
import Detail from "./pages/detail/detail";
library.add(fas, fab);

import "./App.css";
import HomeScreenCheck from "./pages/home/HomeScreenCheck";
import Logitech from "./pages/auth/login/logitech";
import { Loader } from "lucide-react"
import { useAuth } from "./Context/authContext";
function App() {
  const { user, isCheckingAuth, authCheck } = useAuth()
  useEffect(() => {
    authCheck()
  }, [])
  if (isCheckingAuth)
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div>
          <Loader className="animate-spin text-red-600 size-10"></Loader>
        </div>
      </div>
    )
  console.log(user)
  return (
    <>
    <Router>
      {/* <Navbar /> */}
      <Routes>
        {/* <Route path="/" element={<Homepage />} /> */}
        <Route path="/" element={<HomeScreenCheck />} />
        <Route path='/login' element={ !user ? <Logitech /> : <Navigate to={"/"} />}></Route>
        <Route path="/watching/:id" element={<Watching/>} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/movie/:id/rate" element={<Rating />} />
      </Routes>
    </Router>
    <Toaster/>
    </>
  );
}

export default App
