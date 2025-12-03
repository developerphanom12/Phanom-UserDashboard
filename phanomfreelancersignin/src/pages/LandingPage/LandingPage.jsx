import React from 'react'
import VideoSection from '../../Components/LandingPageComponents/VideoSection'
import FAQs from '../../Components/LandingPageComponents/FAQs'
import HeroSection from '../../Components/LandingPageComponents/HeroSection'
import CareerPage from '../../Components/LandingPageComponents/CareerPage'
import HowItWorks from '../../Components/LandingPageComponents/HowItWorks'
import Courses from '../../Components/LandingPageComponents/Courses'
import StartJourney from '../../Components/LandingPageComponents/StartJourney'

const LandingPage = () => {
  return (
    <div>
      <HeroSection/>
      <CareerPage/>
      <HowItWorks/>
      <Courses/>
     {/* <VideoSection bg={true}/> */}
     <FAQs/>
     <StartJourney/>
    </div>
  )
}

export default LandingPage
