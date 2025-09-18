import React from 'react';
import { 
  HiMenu, 
  HiBell, 
  HiSearch, 
  HiUser,
  HiChevronDown 
} from 'react-icons/hi';
import Images from '../assets/Images';
import { PiStudentFill } from 'react-icons/pi';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-30">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side */}
        <div className="flex items-center space-x-6">
         
           <img src={Images.PhanomLogo} alt="logo" />
         
        </div>

        {/* Center - Search (hidden on mobile) */}

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Navigation links (hidden on mobile) */}
          <div className="hidden lg:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Service
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Hire Indian Talent
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Our Portfolio
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Case Study
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Blog
            </a>
          </div>

          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <PiStudentFill className="w-6 h-6 text-gray-600" />
          </button>

          {/* Hire Indian Talent button */}
          <button className="bg-gradient-to-r from-[#459CE1] to-[#D11AE7] text-white px-4 py-1 rounded-lg hover:bg-purple-700 transition-colors hidden sm:block">
            Hire Indian Talent
          </button>

          {/* Mobile menu button - shown only on mobile */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <HiMenu className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
