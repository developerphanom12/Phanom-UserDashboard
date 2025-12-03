import React from "react";
import Images from "../../assets/Images";
import CounterBox from "../../GlobalComponents/CounterBox";
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate()
  return (
    <div className="py-12 px-4 md:px-8 lg:px-16 relative overflow-hidden">
       <img
          src={Images.LandingBg}
          alt="hero images"
          className="w-[90%]  object-contain rounded-2xl cursor-pointer absolute top-0 "
        />
      <div className="align-items-center text-center cursor-pointer mb-5">
        <h1 className="font-bold text-2xl md:text-4xl lg:text-5xl mb-14 mt-[80px]  sm:mt-[220px]  ">
          <span className="bg-gradient-to-r from-[#469AE0] via-[#9A4DE4] to-[#D01AE5] bg-clip-text text-transparent">We help you showcase, <br/> connect and get paid</span> <span> - all</span>
          <br /> in one place
        </h1>
        <p className="px-10 mb-2">
          You bring the passion and skill, and we’ll handle the rest. From
          showcasing your talent to simplifying payments, earning has never been
          this easy. <br /> We make it effortless to connect with buyers,
          deliver quality, and get paid securely.
        </p>
      </div>

      <div className="text-center ml-[500px]">
        <div className="dispay flex gap-8 mt-5">
          <h1 className="font-bold text-xl sm:text-2xl md:text-2xl lg:text-2xl mt-3">
            Backed By
          </h1>
          <img src={Images.hero1} alt="sun" />
          <img src={Images.hero2} alt="stpi" />
        </div>
      </div>
      <div className="flex justify-center sm:mt-[35px] sm:mb-[20px]">
        <button onClick={()=>navigate("/signup")} className="bg-[#8E59E2] text-white cursor-pointer rounded-3xl py-2 px-10 font-semibold shadow-md hover:bg-[#7442cc] transition cursor-pointer">Become a seller</button>
      </div>

       {/* Cards */}
              <div className="relative sm:mx-20 mx-4 mt-20 border border-[#6C5FD4] grid grid-cols-2 sm:grid-cols-4 gap-5 pt-10 p-4 rounded-3xl ">
                {/* Left Top Image */}
                <img
                  src={Images.Abstract}
                  alt="Decoration Left"
                  className="hidden sm:absolute -top-68 sm:left-26 -left-6 w-36 h-68 "
                />
    
                {/* Right Top Image (rotated) */}
                <img
                  src={Images.Abstract}
                  alt="Decoration Right"
                  className="hidden sm:absolute -top-68 sm:right-26 -right-6 w-36 h-68 scale-x-[-1] "
                />
                <div className="absolute -top-6 left-1/2 -translate-x-1/2  px-4 py-1 rounded-full flex items-center gap-2">
                  <img src={Images.Container} alt="Create Own" className="w-62 h-10" />
                  {/* <span className="text-sm font-semibold text-[#353535]">623+ Happy Customers</span> */}
                </div>
                <CounterBox target={300} label="Projects completed" />
                <CounterBox target={16} label="Award Received" />
                <CounterBox target={12} label="Years Of Experience" />
                <CounterBox target={34} label="Team Members" />
              </div>
    </div>
  );
}

export default Hero;
