import React from 'react'
import ProfileMain from '../../components/ProfileComponents/ProfileMain'
import Reviews from '../../components/ProfileComponents/Reviews'

const Profile = () => {
  return (
    <div className='p-6 bg-[#F5F7F9]'>
      <ProfileMain />
      {/* <MyGigs/> */}
      {/* <PortfolioSection/> */}
      <Reviews/>
    </div>
  )
}

export default Profile
