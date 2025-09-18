import React, { useState } from 'react';
import { FaAngleRight, FaHeart, FaEye, FaUpload, FaMapMarkerAlt, FaLanguage, FaPlusCircle, FaEdit, FaStar, FaThumbsUp } from 'react-icons/fa';
import { RiContactsLine } from "react-icons/ri";
import { TbCurrentLocation } from "react-icons/tb";
import { IoIosTime } from "react-icons/io";
import { CiLink } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import MyGigs from './MyGigs';
import Projects from './Projects';

const Banner = () => {
    const [bannerImage, setBannerImage] = useState(null);
    const navigate = useNavigate();

    const handleBannerUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setBannerImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='min-h-screen p-6'>
           {/* Header */}
      <div className='flex justify-between mb-3'>
        <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
        <div className='flex gap-2'>
            <div onClick={() => navigate('/profile/edit')} className='border-[2px] border-gray-400 px-3 py-1 rounded-lg hover:bg-gray-200 cursor-pointer '>
               Share
            </div>
        </div>
      </div>


            {/* Main Content */}
            <div className=' pb-8'>
                <div className=' rounded-lg  '>
                    {/* Banner Section */}
                    <div className='relative h-48 md:h-64 bg-gray-400'>
                        {bannerImage ? (
                            <img src={bannerImage} alt="Banner" className='w-full h-full object-cover' />
                        ) : (
                            <div className='flex flex-col items-center justify-center h-full text-white'>
                                <FaUpload className='text-3xl mb-2' />
                                <p className='font-medium'>Add a banner image</p>
                                <p className='text-sm'>Optimal dimensions 1200 x 400px</p>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleBannerUpload}
                            className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                        />
                    </div>

                    {/* Profile Section */}
                    <div className=' sm:px-5 '>
                        <div className='flex flex-col md:flex-row gap-6'>
                            {/* Left - Profile Info */}
                            <div className='md:w-1/3'>
                                <div className='flex flex-col items-center md:items-start md:w-[80%]'>
                                    <img
                                        src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhY2V8ZW58MHx8MHx8fDA%3D"
                                        alt="Profile"
                                        className='w-32 h-32 rounded-full object-cover mb-4 -mt-20 border-4 border-white shadow-lg z-20'
                                    />

                                    <div className='text-center md:text-left mb-4'>
                                        <div className='flex items-center gap-2 mb-1'>
                                            <span className='bg-gradient-to-r from-[#4899E1] via-[#984EE8] to-[#D019E4] bg-clip-text text-transparent font-semibold'>
                                                Phanom Verified
                                            </span>
                                        </div>
                                        <h2 className='text-xl font-bold'>Sonali Singh<span className='text-gray-400 text-sm ml-4'>@sonalisingh</span></h2>
                                        <p className='text-purple-600 font-medium'>UI/UX Designer & Frontend Developer</p>
                                    </div>

                                    <div className='w-full space-y-2 text-sm text-gray-600 mb-4'>
                                        <p className='flex gap-2'>< RiContactsLine /> Web Design, Mobile UI, Figma Prototypes</p>
                                        <p className='flex gap-2'>< TbCurrentLocation /> Mobile, Punjab, India</p>
                                        <p className='flex gap-2'>< IoIosTime />  Mon - Fri | 10:00 AM to 6:00 PM</p>
                                        <p className='flex gap-2'>< CiLink />  www.phanomprofessionals.com</p>
                                    </div>

                                    <div className='w-full space-y-2 mb-6'>
                                        <button onClick={() => navigate('/profile/edit')} className='w-full bg-purple-600 text-white py-2 px-4 hover:bg-purple-700 transition-colors rounded-full flex justify-center items-center gap-3'>
                                            <FaEdit />Edit Profile Info
                                        </button>
                                        <button onClick={() => navigate('/portfolio/upload-your-work')} className='w-full bg-purple-600 text-white py-2 px-4 hover:bg-purple-700 transition-colors rounded-full flex justify-center items-center gap-3'>
                                            <FaUpload /> Upload Your Work
                                        </button>
                                    </div>

                                    {/* My Gigs Section */}
                                    <MyGigs />
                                </div>
                            </div>

                            {/* Right - About Section */}
                            <Projects />
                        </div>
                    </div>
                </div>

                {/* Projects Section */}



            </div>
        </div>
    );
};

export default Banner;
