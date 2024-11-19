import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../Context/authContext'


const SignUpPage = () => {
    const params = new URL(document.location).searchParams
    const emailValue = params.get("email")
    const [email, setEmail] = useState(emailValue || "")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { signup } = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault()
        signup({ email, username, password })
    }
    return (
        <div className='card border-transparent p-8 gap-4 max-w-md w-full relative bg-black/50 rounded-[40px] backdrop-blur-[20px] overflow-hidden'>
            <div className="flex justify-center items-center mx-auto text-white text-[64px] font-extrabold font-['Poppins'] uppercase">sign up</div>
            <form onSubmit={handleSubmit} className='mx-auto space-y-4 flex flex-col gap-2' action="">
                <div>
                    <input name='email' className='h-auto w-full px-3 py-2 mt-1 border-transparent font-light bg-[#494949]/50 rounded-[9px] 
                            focus:outline-none focus:ring focus:bg-inherit' type="email"
                        placeholder='Enter your email'
                        id='email'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                </div>
                <div>
                    <input name='username' className='h-auto w-full px-3 py-2 mt-1 border-transparent font-light bg-[#494949]/50 rounded-[9px] 
                            focus:outline-none focus:ring focus:bg-inherit' type="text"
                        placeholder='username'
                        id='Enter username'
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                    />
                </div>
                <div>
                    <input name='password' className='h-auto w-full px-3 py-2 mt-1 border-transparent font-light bg-[#494949]/50 rounded-[9px] 
                            focus:outline-none focus:ring focus:bg-inherit' type="password"
                        placeholder='password'
                        id='Password'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </div>
                <div>
                    <input name='confirmPassword' className='h-auto w-full px-3 py-2 mt-1 border-transparent font-light bg-[#494949]/50 rounded-[9px] 
                            focus:outline-none focus:ring focus:bg-inherit' type="password"
                        placeholder='Confirm password'
                        id='password'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </div>
                <button className='w-full py-2 bg-first-blue text-white font-light rounded-md 
                        hover:bg-second-blue'>Register</button>
            </form>
            <label className='mx-auto flex justify-center items-center text-sm font-medium text-gray-300 mb-1'>
                or
            </label>
            <button className='w-full py-2 bg-white text-first-blue font-light rounded-md 
                        hover:bg-second-blue hover:text-white'>Sign in with Google</button>

        </div>
    )
}

export default SignUpPage