import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./commonPaths";
import Notfound from "./pages/notfound/notfound";
import Rating from"./pages/detail/rateMovieFunct";
import { Toaster } from "react-hot-toast"
import { Navigate } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab  } from '@fortawesome/free-brands-svg-icons'

library.add(fas, fab);

import "./App.css";
import HomeScreenCheck from "./pages/home/HomeScreenCheck";
import LoginPage from "./pages/auth/login/login";
import SignUpPage from "./pages/auth/signup/signup";
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
        <Route path='/login' element={ !user ? <LoginPage /> : <Navigate to={"/"} />}></Route>
        <Route path='/signup' element={<SignUpPage/>}></Route>
        <Route path="/watching/:id" element={!user ? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/movie/:id/rate" element={<Rating/>} />
      </Routes>
      <Footer />
    </Router>
    <Toaster/>
    </>
  );
}
export default App;
