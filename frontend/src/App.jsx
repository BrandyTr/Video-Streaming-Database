import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./commonPaths";
import Notfound from "./pages/notfound/notfound";
import Rating from "./pages/detail/rateMovieFunct";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Watching from "./pages/watching/watching";
import Detail from "./pages/detail/detail";
import AdminDashboard from './pages/home/AdminDashboard';
import Search from "./pages/search/search";
import ProfileEdit from "./pages/profile/Profile";

library.add(fas, fab);

import "./App.css";
import HomeScreenCheck from "./pages/home/HomeScreenCheck";
import Logitech from "./pages/auth/login/logitech";
import { Loader } from "lucide-react";
import { useAuth } from "./Context/authContext";
function App() {
  const { user, isCheckingAuth, authCheck } = useAuth();
  useEffect(() => {
    authCheck();
  }, []);
  if (isCheckingAuth)
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div>
          <Loader className="animate-spin text-red-600 size-10"></Loader>
        </div>
      </div>
    );
  if(user?.role=='admin'){
    return (
      <>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          {/* <Route path="/" element={<Homepage />} /> */}
          <Route path="/" element={<HomeScreenCheck />} />
          <Route path="/admin" element={user?<AdminDashboard/>:<Navigate to={"/"}/>} />
          <Route
            path="/login"
            element={!user ? <Logitech /> : <Navigate to={"/"} />}
          ></Route>
          <Route path="/watching/:id/:type" element={user?<Watching />:<Navigate to={"/"}/>} />
          <Route path="/movie/:id/rate" element={user?<Rating />:<Navigate to={"/"}/>} />
          <Route path="/detail/:id" element={user?<Detail />:<Navigate to={"/"}/>} />
          <Route path="/search" element={user?<Search />:<Navigate to={"/"}/>} />
          <Route path="*" element={<Notfound />} />
          <Route
            path="/edit-profile"
            element={user ? <ProfileEdit /> : <Navigate to={"/"} />}
          ></Route>
        </Routes>
        <Footer />
      </Router>
      <Toaster />
    </>
      
    )
  }
  return (
    <>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          {/* <Route path="/" element={<Homepage />} /> */}
          <Route path="/" element={<HomeScreenCheck />} />
          <Route
            path="/login"
            element={!user ? <Logitech /> : <Navigate to={"/"} />}
          ></Route>
          <Route path="/watching/:id/:type" element={user?<Watching />:<Navigate to={"/"}/>} />
          <Route path="/movie/:id/rate" element={user?<Rating />:<Navigate to={"/"}/>} />
          <Route path="/detail/:id" element={user?<Detail />:<Navigate to={"/"}/>} />
          <Route path="/search" element={user?<Search />:<Navigate to={"/"}/>} />
          <Route path="*" element={<Notfound />} />
          <Route
            path="/edit-profile"
            element={user ? <ProfileEdit /> : <Navigate to={"/"} />}
          ></Route>
        </Routes>
        <Footer />
      </Router>
      <Toaster />
    </>
  );
}

export default App;
