import { useAuth } from '../../Context/authContext';
import AuthScreen from './AuthScreen';
import HomePage_Main from './HomePage-main';
const HomeScreenCheck = () => {
  const {user}=useAuth()
  return (
    <>
      {user?<HomePage_Main/>:<AuthScreen/>}
    </>
  )
}

export default HomeScreenCheck