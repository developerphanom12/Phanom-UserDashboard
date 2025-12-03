import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Images from '../assets/Images';

const ComingSoon = () => {
  const navigate = useNavigate();
  const [seconds] = useState(5); // keeping countdown for display only

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#8E59E2] text-white text-center relative overflow-hidden px-4">
      {/* Decorative shapes */}
      <img
        src={Images.DoubleElipse}
        alt="Decorative"
        className="absolute top-0 -left-[10%] sm:w-[25vw] w-[20vh] rotate-180"
      />
      <img
        src={Images.DoubleElipse}
        alt="Decorative"
        className="absolute -bottom-[10%] -right-10 sm:w-[25vw] w-[20vh]"
      />
      <img
        src={Images.AppointmentLogo}
        alt="Decorative"
        className="absolute top-0 right-0 sm:w-[25vw] rotate-270 w-[23vh]"
      />
      <img
        src={Images.AppointmentLogo}
        alt="Decorative"
        className="absolute bottom-0 left-0 sm:w-[25vw] rotate-90 w-[23vh]"
      />

      {/* Content */}
      <div className="z-10 max-w-xl flex flex-col items-center">
        <h1 className="text-4xl md:text-7xl font-bold mb-4">Coming Soon!</h1>
        <p className="text-lg md:text-2xl text-white/80 mb-6">
          Exam will start soon. Stay tuned for updates.
          You will soon receive an email with further instructions.
        </p>

        {/* Countdown display */}
        {/* <p className="text-md md:text-lg text-white/70 mb-6">
          Redirect to home in <span className="font-bold">{seconds}</span> seconds...
        </p> */}

        {/* Redirect button */}
        <a href='https://www.phanomprofessionals.com/'>

        
        <button
        
          className="px-6 py-2 rounded bg-white text-purple-600 font-semibold hover:bg-gray-200 transition-all"
        >
          Go to Home
        </button>
        </a>
      </div>
    </div>
  );
};

export default ComingSoon;
