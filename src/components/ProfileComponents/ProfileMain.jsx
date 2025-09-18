import React from 'react';
import { FaAngleRight, FaMapMarkerAlt, FaLanguage, FaLink } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
// import { FaGlobe } from "react-icons/fa6";
// import profile from '../../assets/profile.png'; 

const ProfileMain = () => {
    const navigate = useNavigate();
    return (
        <div className='relative z-10 space-y-6 bg-[#F5F7F9] '>
            {/* Header */}
            <div className='flex justify-between'>
                <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
                <div className='flex gap-2'>
                    <div onClick={() => navigate('/profile/edit')} className='border-[2px] border-gray-400 px-3 py-1 rounded-lg hover:bg-gray-200 cursor-pointer '>
                        Edit Profile
                    </div>
                    <div className='border-[2px] border-gray-400 px-3 py-1 rounded-lg hover:bg-gray-200 cursor-pointer '>
                        Share
                    </div>
                </div>
            </div>

            <div className='mx-auto'>

                {/* Profile Info Section */}
                <div className='w-full mt-2 flex flex-col md:flex-row gap-6 items-start'>
                    {/* Profile Image */}
                    <div className='relative w-[130px] h-[130px]'>
                        <img
                            src={"https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww"}
                            alt='Profile'
                            className='w-full h-full object-cover rounded-full border-4 border-white shadow-md'
                        />
                        {/* Online Indicator */}
                        {/* <div className='absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full'></div> */}
                    </div>

                    {/* Profile Details */}
                    <div className='flex-1'>
                        <h2 className='text-xl font-bold flex items-center gap-2'>
                            <span className='bg-gradient-to-r from-[#4899E1] via-[#984EE8] to-[#D019E4] bg-clip-text text-transparent font-semibold'>
                                Phanom Verified
                            </span>
                        </h2>
                        <p className='text-gray-800 font-semibold'>Ranjani Singh <span className='text-gray-500'>@Ranjanisingh</span></p>
                        <p className='text-sm text-purple-500 mt-1'>Ui Ux Designer | React Js</p>

                        {/* Location and Language */}
                        <div className='mt-2 flex flex-col flex-wrap gap-1 text-sm text-gray-600'>
                            <div className='flex items-center gap-1'>
                                <FaMapMarkerAlt /> Mohali, Punjab, India
                            </div>
                            <div className='flex items-center gap-1'>
                                <FaLanguage /> English, Hindi
                            </div>
                            <div className='flex items-center gap-1'>
                                <FaLink /> www.phanomprofessionals.com/ranjanisingh
                            </div>
                        </div>

                        {/* Buttons */}
                    </div>

                </div>

                {/* About Me Section */}
                <div className='w-full  my-8'>
                    <h3 className='text-2xl font-semibold mb-4'>About me</h3>
                    <p className='text-gray-700 text-sm md:text-base leading-relaxed'>
                        Creative and detail-oriented UI/UX designer passionate about crafting user-friendly and visually stunning digital experiences. Proficient in Figma, Adobe XD, and user research, I bring concepts to life through thoughtful design and intuitive interfaces. I design with empathy and purpose, ensuring every interaction is both meaningful and impactful. From wireframes to prototypes, I combine creativity with strategy to solve real user problems. Experienced in design systems, accessibility, and collaborative workflows, I thrive in fast-paced environments and love transforming complex ideas into clean, functional solutions.
                    </p>
                </div>

                {/* Skills Section */}
                {/* <div className='w-full  mt-6 '>
                <h3 className='text-2xl font-semibold mb-4'>Skills</h3>
                <div className='flex flex-wrap gap-3'>
                    {["Wireframing", "Prototyping", "UX Design", "Responsive", "Components", "UI/UX", "Routing", "APIs", "State", "+14"].map((skill, index) => (
                        <span key={index} className='px-6 py-2 border bg-[#F5F7F9] border-gray-300 drop-shadow-sm rounded-full text-sm hover:bg-gray-100 cursor-default'>
                            {skill}
                        </span>
                    ))}
                </div>
            </div> */}
            </div>

        </div>
    );
};

export default ProfileMain;
