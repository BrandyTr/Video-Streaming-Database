import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../Context/authContext'


const SignUpPage = () => {
    const params= new URL(document.location).searchParams
    const emailValue=params.get("email")
    const [email,setEmail]=useState(emailValue||"")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")

    const {signup}= useAuth()

    const handleSubmit=(e)=>{
        e.preventDefault()
        signup({email,username,password})
    }
    return (
        <div className='h-screen w-full hero-bg'>
            <header className='mx-auto max-w-6xl flex items-center justify-center p-5'>
                <Link to={"/"}>
                <div className="text-3xl font-bold">tMovie</div>
                </Link>
            </header>
            <div className='text-white flex justify-center items-center mt-20 mx-3'>
                <div className='max-w-md w-full space-y-6 bg-black/60 p-8 rounded-lg shadow-md'>
                    <h1 className='text-center font-bold text-2xl mb-4'>Sign up</h1>
                    <form onSubmit={handleSubmit} className='space-y-4' action="">
                        <div>
                            <label htmlFor="email" className=' text-sm font-medium block text-gray-300 mb-1'>
                                Email
                            </label>
                            <input name='email' className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent 
                            focus:outline-none focus:ring' type="email"
                                placeholder='thaiallb63@gmail.com'
                                id='email'
                                value={email}
                                onChange={(e)=>{setEmail(e.target.value)}}
                            />
                        </div>
                        <div>
                            <label htmlFor="username" className=' text-sm font-medium block text-gray-300 mb-1'>
                                Username
                            </label>
                            <input name='username' className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent 
                            focus:outline-none focus:ring' type="text"
                                placeholder='Thai'
                                id='username'
                                value={username}
                                onChange={(e)=>{setUsername(e.target.value)}}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className=' text-sm font-medium block text-gray-300 mb-1'>
                                Password
                            </label>
                            <input name='password' className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent 
                            focus:outline-none focus:ring' type="password"
                                placeholder='******'
                                id='password'
                                value={password}
                                onChange={(e)=>{setPassword(e.target.value)}}
                            />
                        </div>
                        <button className='w-full py-2 bg-first-blue text-white font-semibold rounded-md 
                        hover:bg-second-blue'>Sign Up</button>
                    </form>
                    <div className="text-center text-gray-400">
                        Already have an account?
                        <Link to={"/login"} className='text-second-blue hover:underline'> Sign in</Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SignUpPage