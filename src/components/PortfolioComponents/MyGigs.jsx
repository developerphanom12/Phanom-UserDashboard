import React from 'react'

  const myGigs = [
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

const MyGigs = () => {
  return (
    <div className='mt-8'>
                                            <h2 className='text-2xl font-bold mb-6'>My Gigs</h2>
                                            <div className='grid grid-cols-1  gap-6'>
                                                {myGigs.map((gig) => (
                                                    <div key={gig.id} className='overflow-hidden transition-shadow'>
                                                        <div className='relative'>
                                                            <img
                                                                src={gig.image}
                                                                alt={gig.title}
                                                                className='w-full h-48 object-cover  rounded-lg '
                                                            />
                                                            {/* <button className='absolute top-3 right-3 text-white hover:text-red-500 transition-colors'>
                                                                <FaHeart />
                                                            </button> */}
                                                        </div>
    
                                                        <div className='py-4'>
                                                            <p className='text-sm text-gray-700 mb-3 line-clamp-3'>{gig.title}</p>
    
                                                            {/* <div className='flex items-center justify-between text-xs text-gray-600 mb-3'>
                                                                <div className='flex items-center gap-3'>
                                                                    <span className='flex items-center gap-1'>
                                                                        <FaHeart className='text-red-500' />
                                                                        {gig.likes}k
                                                                    </span>
                                                                    <span className='flex items-center gap-1'>
                                                                        <FaEye />
                                                                        {gig.views}
                                                                    </span>
                                                                    <span>⭐ {gig.orders}</span>
                                                                </div>
                                                            </div> */}
    
                                                            <p className='text-sm font-medium text-gray-800'>{gig.price}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
  )
}

export default MyGigs
