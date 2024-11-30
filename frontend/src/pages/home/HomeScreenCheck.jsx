import { useAuth } from '../../Context/authContext';
import AdminDashboard from './AdminDashboard';
import AuthScreen from './AuthScreen';
import HomePage_Main from './HomePage-main';
const HomeScreenCheck = () => {
  const {user}=useAuth()
  if(user?.role=='admin'){
    return (
      <AdminDashboard/>
    )
  }
  return (
    <>
      {user?<HomePage_Main/>:<AuthScreen/>}
    </>
  )
}

export default HomeScreenCheck