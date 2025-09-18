import React, { useState } from 'react'
import { FaEye, FaPlusCircle, FaStar, FaThumbsUp, FaEdit } from 'react-icons/fa';
import { IoShareSocialOutline } from 'react-icons/io5';
import { AiFillLike } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';

const Projects = () => {
const [selectedCard, setSelectedCard] = useState(null);

// Projects data
const projects = [
    {
        id: 1,
        title: 'UI/UX design creating intuitive, user-first designs and Figma layouts for web and mobile applications.',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
        likes: 1.1,
        views: 473,
        orders: 4.6,
        price: 'From ₹ 4,999 /-'
    },
    {
        id: 2,
        title: 'UI/UX design creating intuitive, user-first designs and Figma layouts for web and mobile applications.',
        image: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400',
        likes: 1.1,
        views: 473,
        orders: 4.6,
        price: 'From ₹ 4,999 /-'
    },
    {
        id: 3,
        title: 'UI/UX design creating intuitive, user-first designs and Figma layouts for web and mobile applications.',
        image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400',
        likes: 1.1,
        views: 473,
        orders: 4.6,
        price: 'From ₹ 4,999 /-'
    }
];

return (
    <>
        <div className='md:w-2/3'>
            <h2 className='text-2xl font-bold mb-6 text-purple-600 border-b-2 border-purple-600 w-fit px-6 p-2'>Work</h2>
            <div className='bg-gray-100 rounded-lg p-6 h-48 flex items-center justify-center text-gray-500'>
                About section content goes here
            </div>
            <div className='mt-8'>
                <h2 className='text-2xl font-bold mb-6'>Projects</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {projects.map((project) => (
                        <div 
                            key={project.id} 
                            className='overflow-hidden rounded-lg cursor-pointer hover:shadow-lg transition-shadow'
                            onClick={() => setSelectedCard(project)}
                        >
                            <div className='relative'>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className='w-full h-48 object-cover rounded-lg'
                                />
                            </div>

                            <div className='p-4'>
                                <div className='flex items-center justify-end text-xs text-gray-600 mb-3'>
                                    <div className='flex items-center gap-3'>
                                        <span className='flex items-center gap-1'>
                                            <FaThumbsUp className='text-black' />
                                            {project.likes}k
                                        </span>
                                        <span className='flex items-center gap-1 text-black'>
                                            <FaEye />
                                            {project.views}
                                        </span>
                                        <span className='flex gap-2 justify-center'><FaStar className='text-black ' /> {project.orders}{"(1k+)"}</span>
                                    </div>
                                </div>
                                <p className='text-sm text-gray-700 mb-3 line-clamp-3'>{project.title}</p>
                                <p className='text-sm font-medium text-gray-800'>{project.price}</p>
                            </div>
                        </div>
                    ))}
                    
                    <div className='h-72 border-dashed border-2 border-[#D3BDF3] p-4 overflow-hidden hover:shadow-lg rounded-lg flex flex-col justify-between items-center gap-4 text-center'>
                        <div className='w-18 h-18 flex bg-[#D3BDF3] justify-center items-center rounded-full'>
                            <FaPlusCircle className='text-white text-xl' />
                        </div>
                        <h3 className='font-semibold border border-[#D3BDF3] text-[#D3BDF3] rounded-full w-full py-1'>Create a Project</h3>
                        <p className='text-sm text-gray-600'>
                            Get feedback, views, and appreciations. Public projects can be featured by our curators.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Project Popup Modal */}
        {selectedCard && (
            <div
                className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm overflow-y-auto"
                onClick={() => setSelectedCard(null)}
            >
                <div
                    className="w-full max-w-[1440px] mx-auto py-10 px-4 relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="bg- relative rounded-lg overflow-hidden p-6">
                        {/* Top-left Avatar Info */}
                        <div className="flex items-center gap-3 mb-6 w-full">
                            <img
                                src={selectedCard.image}
                                alt="Avatar"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="text-sm font-semibold">Ranjani Singh</h3>
                                <p className="text-xs text-gray-500">Phantom Team</p>
                            </div>
                        </div>
                        
                        <div className='flex'>
                            {/* Main Image */}
                            <img
                                src={selectedCard.image}
                                alt={selectedCard.title}
                                className="w-[95%] h-[800px] object-cover rounded-lg"
                            />

                            {/* Floating Right Side Buttons */}
                            <div className="flex flex-col items-center gap-3 w-[5%] ml-4">
                                <img
                                    src={selectedCard.image}
                                    alt="Avatar"
                                    className="w-10 h-10 rounded-full object-cover border border-white"
                                />
                                <button className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow hover:bg-purple-600">
                                    <FaEdit/>
                                </button>
                                <button className="bg-purple-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow hover:bg-purple-600">
                                    <IoShareSocialOutline/>
                                </button>
                                <button className="bg-purple-500 text-white w-10 h-10 rounded-full shadow flex items-center justify-center hover:bg-purple-600">
                                    <AiFillLike/>
                                </button>
                            </div>
                        </div>

                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-gray-600 text-2xl font-bold w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100"
                            onClick={() => setSelectedCard(null)}
                        >
                            <RxCross1/>
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
)
}

export default Projects
