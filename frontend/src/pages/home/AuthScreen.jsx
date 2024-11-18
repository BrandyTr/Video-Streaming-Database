import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
const AuthScreen = () => {
  const [email, setEmail] = useState("")
  const navigate=useNavigate()
  const handleFormSubmit=(e)=>{
    e.preventDefault()
    navigate("/signup?email="+email)
  }
  return (
    <div className='hero-bg relative'>
      <header className='max-w-6xl mx-auto flex items-center justify-between p-5 pb-10'>
        {/* <img className='w-32 md:w-52' src="/netflix-logo.png" alt="Netflix logo" /> */}
        <div className="tMovie text-2xl">tMovie</div>
        <Link to={"/login"} className='text-white bg-first-blue py-1 px-2 rounded'>
          Sign in
        </Link>
      </header>
      <div className="flex flex-col gap-4 items-center justify-center text-center py-40 text-white max-w-6xl mx-auto">
        <h1 className='text-4xl md:text-6xl font-bold'>Unlimited movies, TV shows, and more</h1>
        <p className="text-lg">watch anywhere. Cancel anytime</p>
        <p className="mb-4">Ready to watch? Enter your email to create or restart your membership</p>
        <form onSubmit={handleFormSubmit} className='flex flex-col md:flex-row gap-4 w-1/2' action="">
          <input
            type="email"
            placeholder='Email address'
            className='p-2 rounded flex-1 bg-black/80 border border-gray-700'
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />
          <button className="bg-first-blue text-xl lg:text-2xl px-2 
            lg:px-6 py-1 md:py-2 rounded flex justify-center items-center">
            Get Started
            <ChevronRight className='size-8 md:size-10'></ChevronRight>
          </button>
        </form>
      </div>
      {/* separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden='true'></div>
      {/* 1st section */}
      <div className="bg-black text-white py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center">
          <div className="px-4 md:px-2 flex-1 items-center text-center md:text-left">
            <h2 className="font-extrabold text-4xl md:text-5xl mb-4">Enjoy on your TV</h2>
            <p className="text-lg md:text-xl">
              Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
            </p>
          </div>
          <div className="flex-1 mt-4 relative">
            <img className='relative z-10' src="/tv.png" alt="tv image" />
            <video className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[56%]' src="hero-vid.m4v" type='video/mp4'
              playsInline
              muted
              loop
              autoPlay={true}></video>
          </div>
        </div>
      </div>
      {/* separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden='true'></div>
      {/* second section */}
      <div className="py-10 bg-black text-white">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row justify-center items-center">
          {/* left */}
          <div className="flex-1">
            <div className="relative">
              <img className='mt-4' src="/stranger-things-lg.png" alt="Stranger things img" />
              <div className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 
              lg:w-1/2 h-24 border border-slate-500 rounded-md px-2">
                <img className='h-full' src="/stranger-things-sm.png" alt="" />
                <div className="flex justify-between items-center w-full ">
                  <div className="flex flex-col gap-0">
                    <span className="text-md lg:text-lg font-bold">Stranger Things</span>
                    <span className="text-sm text-blue-500">Downloading...</span>
                  </div>
                  <img className='h-12' src="/download-icon.gif" alt="" />
                </div>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="flex-1 text-center md:text-left">
            <h2 className='text-4xl md:text-5xl font-extrabold mb-4 text-balance'>Download your shows to watch offline</h2>
            <p className='text-lg md:text-xl'>Save your favorites easily and always have something to watch</p>
          </div>
        </div>
      </div>
      {/* separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden='true'></div>
      {/* 3rd section */}
      <div className="bg-black text-white py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center">
          <div className="px-4 md:px-2 flex-1 items-center text-center md:text-left">
            <h2 className="font-extrabold text-4xl md:text-5xl mb-4">Watch everywhere</h2>
            <p className="text-lg md:text-xl">
              Stream unlimited movies and TV shows on your phone, table, laptop, and TV.
            </p>
          </div>
          <div className="flex-1 mt-4 relative overflow-hidden">
            <img className='relative z-10' src="/device-pile.png" alt="tv image" />
            <video className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[83%] h-[46%]' src="video-devices.m4v" type='video/mp4'
              playsInline
              muted
              loop
              autoPlay={true}></video>
          </div>
        </div>
      </div>
      {/* separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden='true'></div>
      <div className="py-10 bg-black text-white ">
        <div className="max-w-6xl mx-auto items flex flex-col-reverse justify-between md:flex-grow px-4 md:px-2">
          {/* //todo */}
          <div className="flex max-w-6xl mx-auto items-center flex-col-reverse md:flex-row  
          px-4 md:px-2">
            {/* left */}
            <div className="flex-1 relative">
              <img src="/kids.png" alt="kid image" className="mt-4" />
            </div>
            {/* right */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Create profiles for kids</h2>
              <p className="text-lg md:text-xl">
                Send kids on adventures with their favorite characters in a space made just for them-free with your membership
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthScreen