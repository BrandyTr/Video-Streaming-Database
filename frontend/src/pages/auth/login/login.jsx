import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../Context/authContext'

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()
  const handleLogin = (e) => {
    e.preventDefault()
    login({ email, password })
  }
  return (
    <div className="card border-transparent p-7 gap-5 max-w-md w-full relative bg-black/50 rounded-[40px] backdrop-blur-[20px] overflow-hidden">
      <div className="flex justify-center items-center mx-auto text-white text-xl font-normal font-['Poppins']">Welcome to CineStream</div>
      <div className="flex justify-center items-center mx-auto text-white text-[64px] font-extrabold font-['Poppins'] uppercase">Log in</div>
      <div className="mx-auto justify-start items-start gap-[27px]">
        <form onSubmit={handleLogin} className='space-y-4 flex flex-col gap-2' action="">
          <div>
            <input name='email' className='w-full px-3 py-2 mt-1 border-transparent bg-[#494949]/50 rounded-[9px] 
                            focus:outline-none focus:ring' type="email"
              placeholder='Username or Email address'
              id='email'
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />
          </div>
          <div>
            <input name='password' className='w-full px-3 py-2 mt-1 border-transparent bg-[#494949]/50 rounded-[9px]
                            focus:outline-none focus:ring' type="password"
              placeholder='Password'
              id='password'
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>
          <button className='w-full py-2 bg-first-blue text-white font-normal rounded-md 
                        hover:bg-white hover:text-second-blue'>Login</button>
          <label className='flex justify-center items-center text-sm font-medium text-gray-300 mb-1'>
            or
          </label>
          <button className='w-full py-2 bg-white text-first-blue font-normal rounded-md 
                        hover:bg-second-blue hover:text-white'>Sign in with Google</button>
        </form>
      </div>
    </div>

  )
}

export default LoginPage