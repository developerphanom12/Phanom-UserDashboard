import React, { useEffect, useState } from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { RiInstagramFill } from "react-icons/ri";
import { FaPinterest, FaFacebookSquare, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import Images from '../assets/Images';

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

const Footer = () => {
  const navigate = useNavigate();

  const [agencyLinks, setAgencyLinks] = useState([]);
  const [serviceSections, setServiceSections] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [linksRes, servicesRes] = await Promise.all([
          fetch(`${API_BASE}/api/topbar`),
          fetch(`${API_BASE}/api/services`),
        ]);

        const linksJson = await linksRes.json();
        const servicesJson = await servicesRes.json();

        // filter agency links (Portfolio, Blogs, About, Hire etc.)
        setAgencyLinks(
          (Array.isArray(linksJson) ? linksJson : []).filter((l) =>
            ["/portfolio", "/blogs", "/about", "/hire-talent"].includes(
              (l.url || "").toLowerCase()
            )
          )
        );

        // services sections (with items)
        setServiceSections(
          (Array.isArray(servicesJson) ? servicesJson : []).filter(
            (sec) => (sec.items || []).length > 0
          )
        );
      } catch (err) {
        setAgencyLinks([]);
        setServiceSections([]);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="relative sm:min-h-[1000px] overflow-hidden pt-[10%] sm:pt-5 ">
      {/* Gradient background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#8E59E2] to-[#141415]"></div>

      {/* Background images */}
      <img src={Images.FooterBg} alt="Footer Background"
        className=" sm:absolute sm:block top-2 inset-0 w-[80%] mx-auto h-full object-contain  hidden z-10" />
      <img src={Images.MobileFooterBg} alt="Footer Background"
        className="absolute sm:hidden -top-40 inset-0 w-full h-full object-contain  z-10" />

      {/* Content */}
      <div className="relative z-20 text-white p-10 h-full">
        
        {/* Top CTA */}
        <div className='flex flex-col justify-center items-center h-[55%] gap-7 my-auto'>
          <h1 style={{ fontFamily: 'Open Sauce One' }}
            className='text-[48px] font-bold w-[80%] sm:w-[60%] lg:w-[40%] text-center leading-12 text-white'>
            Let's make something great together.
          </h1>
          <p className='text-[36px] font-semibold w-[80%] sm:w-[60%] lg:w-[45%] text-center leading-12 text-[#C2B5F6]'>
            Let us know what challenges you are trying to solve so we can help
          </p>
          <div onClick={() => navigate('/book-appointment')}
            className='bg-white w-[200px] text-[#8E59E2] text-[18px] rounded-full px-8 py-2 mt-2 items-center justify-center text-2xl font-bold flex gap-3 cursor-pointer'>
            Join Us <FaArrowRight />
          </div>
          <div className='flex justify-center items-center gap-4'>
            <FaFacebookSquare onClick={() => window.open('https://www.facebook.com/phanom.professionals/', '_blank')} size={30}/>
            <RiInstagramFill onClick={() => window.open('https://www.instagram.com/phanomprofessionalsofficial/', '_blank')} size={30}/>
            <FaLinkedin onClick={() => window.open('https://www.linkedin.com/company/phanom-professionals/posts/?feedView=all', '_blank')} size={30}/>
            <FaXTwitter onClick={() => window.open('https://x.com/phanompro', '_blank')} size={30}/>
            <FaPinterest onClick={() => window.open('https://in.pinterest.com/phanom_professionals/', '_blank')} size={30}/>
          </div>
        </div>

        <hr className="border-[1px] border-white my-10" />

        {/* Menu Section */}
        <div className="flex flex-col sm:flex-row w-full lg:px-[78px] pb-10">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-10 text-white text-sm sm:text-base mt-6 sm:mt-0">

            {/* Logo + About */}
            <div className="hidden sm:block w-full ">
              {/* <img src={Images.Logo} alt="Logo" className="w-[90%] h-auto" /> */}
              <p className="text-[#ffffff]">Phanom Professionals Rising from the 'City of Mountains', we are a future focused IT agency helping businesses scale digitally...</p>
              <div className='flex justify-left items-center gap-3 mt-5'>
                <h6 className='text-white whitespace-nowrap'>Backed By</h6>
                <img src={Images.BackedBy1} alt="" />
                <img src={Images.BackedBy2} alt="" />
              </div>
            </div>

            {/* Agency (only if API has links) */}
            {agencyLinks.length > 0 && (
              <div className="space-y-3 flex flex-col lg:col-span-1 sm:col-span-2">
                <h6 className='lg:border-b lg:border-white block text-[18px] text-white pb-2'>Agency</h6>
                {agencyLinks.map((l) => (
                  <a key={l.id} className='text-white font-normal' href={l.url}>
                    {l.label}
                  </a>
                ))}
              </div>
            )}

            {/* Policies (always visible) */}
            <div className="space-y-3 flex flex-col lg:col-span-1 sm:col-span-2">
              <h6 className='border-b border-white block text-[18px] text-white pb-2'>Policies</h6>
              <a className='text-white font-normal' href="#">Terms of Use</a>
              <a className='text-white font-normal' href="#">Privacy Policy</a>
              <a className='text-white font-normal' href="#">About Cookies</a>
            </div>

            {/* Our Services (only if API has services) */}
            {serviceSections.length > 0 && (
              <div className="flex flex-col space-y-3 lg:col-span-1 sm:col-span-2">
                <h6 className='border-b border-white block text-[18px] text-white pb-2'>Our Services</h6>
                {serviceSections.flatMap((sec) =>
                  sec.items.map((item) => (
                    <a key={item.id} className='text-white font-normal' href={item.url}>
                      {item.label}
                    </a>
                  ))
                )}
              </div>
            )}

            {/* Industries (always visible) */}
            <div className="flex flex-col space-y-3 lg:col-span-1 sm:col-span-2">
              <h6 className='border-b border-white block text-[18px] text-white pb-2'>Industries</h6>
              <a className='text-white font-normal' href="#">BFSI</a>
              <a className='text-white font-normal' href="#">B2B</a>
              <a className='text-white font-normal' href="#">Healthcare</a>
              <a className='text-white font-normal' href="#">Education</a>
              <a className='text-white font-normal' href="#">Real Estate</a>
              <a className='text-white font-normal' href="#">Edtech</a>
              <a className='text-white font-normal' href="#">Hospitality</a>
            </div>

            {/* Mobile Logo */}
            <div className="block sm:hidden">
              <img src={Images.Logo} alt="Logo" className="w-40 h-auto mt-4" />
            </div>
          </div>
        </div>

        {/* Address + Contact */}
        <div className='flex flex-col lg:flex-row lg:px-[78px] justify-between my-12'>
          <div className='space-y-4 text-[18px]'>
            <h6 className='underline text-[18px] text-white '>Address :</h6>
            <p className='text-white font-normal'>Ground Floor, Prosperity Square, D-185, Phase 8B, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Punjab 160055</p>
          </div>
          <div className='space-y-4 text-[18px]'>
            <h6 className='underline block text-[18px] text-white'>Contact Us :</h6>
            <p className='text-white font-normal'>Info@phanomprofessionals.com </p>
          </div>
        </div>

        {/* Bottom */}
        <div className='flex flex-col lg:flex-row lg:px-[78px] justify-between my-12'>
          <div className='space-y-4 text-[18px]'>
            Copyright © 2025 Phanom Techno Private Ltd. All rights reserved.
          </div>
          <div className='space-y-4 text-[18px]'>
            <FaWhatsapp className="bg-green-500 rounded-sm" size={40}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
