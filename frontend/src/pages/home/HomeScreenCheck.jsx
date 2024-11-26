

import { useAuth } from '../../Context/authContext';
import AdminPage from './AdminPage';
import AuthScreen from './AuthScreen';
import HomePage_Main from './HomePage-main';
const HomeScreenCheck = () => {
  const {user}=useAuth()
  if(user?.role=='admin'){
    return (
      <AdminPage/>
    )
  }
  return (
    <>
      {user?<HomePage_Main/>:<AuthScreen/>}
    </>
  )
}

export default HomeScreenCheck