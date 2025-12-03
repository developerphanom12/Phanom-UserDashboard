import React from 'react'
import { useNavigate } from 'react-router-dom';

function StartJourney() {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col  items-center justify-center text-center gap-2 my-8'>
        <h1 className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-3xl'>Start your journey – sign up and <br/> publish your first Gig today.</h1>
        {/* <p>Learn from industry leaders and master the skills needed to succeed <br/> as a Phanom seller – all at no cost.</p> */}
        <button onClick={()=>navigate("/signup")} className='bg-[#8E59E2] text-white cursor-pointer rounded-3xl py-2 px-10 font-semibold shadow-md hover:bg-[#7442cc] transition cursor-pointer'>Get Started</button>
    </div>
  )
}

export default StartJourney; 