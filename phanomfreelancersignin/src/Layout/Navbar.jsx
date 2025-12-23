import React, { useEffect, useState, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import Images from "../assets/Images";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import gsap from 'gsap';
import { PiStudentFill } from "react-icons/pi";

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [services, setServices] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const path = useLocation().pathname

  // Services data
  useEffect(() => {
    const dummyData = [
      {
        title: "Digital Marketing",
        items: ["SEO", "Social Media", "PPC", "Youtube Marketing"],
      },
      {
        title: "Development",
        items: ["Web Development", "Shopify", "Magento", "WordPress"],
      },
      {
        title: "Graphics & Animation",
        items: [
          "Branding",
          "Packaging",
          "Web Design",
          "Animation",
          "Rotoscoping",
        ],
      },
      {
        title: "E-commerce",
        items: ["E-Commerce Marketing", "Amazon Marketing"],
      },
    ];

    setServices(dummyData);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize GSAP properties when sidebar opens
  useEffect(() => {
    if (isSidebarOpen && sidebarRef.current && overlayRef.current) {
      // Set initial positions
      gsap.set(sidebarRef.current, { x: "100%" });
      gsap.set(overlayRef.current, { opacity: 0 });
      
      // Animate in
      gsap.to(sidebarRef.current, { 
        x: "0%", 
        duration: 0.4, 
        ease: "power2.out" 
      });
      gsap.to(overlayRef.current, { 
        opacity: 1, 
        duration: 0.3 
      });
    }
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      closeSidebar();
    } else {
      setIsSidebarOpen(true);
    }
  };

  const closeSidebar = () => {
    if (sidebarRef.current && overlayRef.current) {
      // Animate out
      gsap.to(sidebarRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power2.in"
      });
      
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setIsSidebarOpen(false);
          setMobileServicesOpen(false);
        }
      });
    } else {
      setIsSidebarOpen(false);
      setMobileServicesOpen(false);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    closeSidebar();
  };

  return (
    <nav className="">
      <nav
        className={`fixed top-0 w-full max-w-[1500px] z-[500] transition-all duration-300 ${
          isScrolled ? "bg-white shadow" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between sm:px-12 px-4">
          {/* Left side */}
          <div className="flex items-center">
            <a href="/">
 <img
              src={Images.Logo}
              alt="logo"
              className="w-[120px] sm:w-[150px] h-auto object-contain cursor-pointer"
              // onClick={() => navigate('/')}
            />
            </a>
           
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-6 my-5">
             {/* <a
              href="/"
              className={` hover:text-[#D11AE7] transition-colors hidden lg:block ${path === "/" ? "text-[#D11AE7] " : "text-gray-600"}`}
            >
              Home
            </a> */}

            {/* Desktop Navigation links */}
            {/* <div className="hidden lg:flex items-center relative group">
              <button className={`hover:text-[#D11AE7] transition-colors flex gap-2 items-center ${path == "/services" ? "text-[#D11AE7] scale-105" : "text-gray-600"}`}>
                My Services
                <IoIosArrowDown className="mt-1 group-hover:hidden" />
                <IoIosArrowUp className="mt-1 hidden group-hover:inline" />
              </button>

              <div className="absolute top-full left-0 w-full h-8 bg-transparent"></div>

              <div className="absolute top-[calc(100%+25px)] -left-[350px] hidden group-hover:flex bg-white shadow-lg rounded-lg p-6 z-50 min-w-[800px] max-w-[95vw] drop-shadow-2xl">
                <div
                  className={`grid gap-8`}
                  style={{
                    gridTemplateColumns: `repeat(${services.length}, minmax(0,1fr))`,
                  }}
                >
                  {services.map((col, i) => (
                    <div key={i}>
                      <h3 className="font-semibold text-[#5A32EA] mb-3">
                        {col.title}
                      </h3>
                      <ul className="space-y-2">
                        {col.items.map((item, j) => (
                          <li key={j}>
                            <a
                              href="/services"
                              className="text-gray-700 hover:text-[#5A32EA] transition-colors"
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div> */}

            {/* <a
              href="/case-study"
              className={` hover:text-[#D11AE7] transition-colors hidden lg:block ${path == "/case-study" ? "text-[#D11AE7] scale-105" : "text-gray-600"}`}
            >
              Case Study
            </a> */}
           
            
            {/* <a
              href="/portfolio"
              className= {`hover:text-[#D11AE7] transition-colors hidden lg:block ${path == "/portfolio" ? "text-[#D11AE7] scale-105" : "text-gray-600"}`}
            >
              Our Portfolio
            </a> */}

            {/* <a
              href="/hosting"
              className="text-gray-600 hover:text-[#D11AE7] transition-colors hidden lg:block"
            >
              Hosting
            </a> */}

            {/* <a
              href="/"
              className="text-gray-600 hover:text-[#D11AE7] transition-colors hidden lg:block"
            >
              Logout
            </a> */}
 
            {/* <a
              href="/blogs"
              className="text-gray-600 hover:text-[#D11AE7] transition-colors hidden lg:block"
            >
              Blog
            </a>
            <a
              href="/login"
              className="text-gray-600 hover:text-[#D11AE7] transition-colors hidden lg:block"
            >
              Login
            </a> */}

            {/* Notifications */}
           {/* <button className="p-2 rounded-lg  transition-colors relative"> <PiStudentFill className="w-6 h-6 text-gray-600 hover:text-[#D11AE7] transition-colors cursor-pointer" /> </button>  */}

           {/* Hire Indian Talent button */}
            {/* <button 
            onClick={() => navigate('/hire-talent')} 
            className="bg-gradient-to-r from-[#459CE1] to-[#D11AE7] text-white px-4 py-1 rounded-lg hover:bg-purple-700 transition-colors hidden sm:block cursor-pointer" > Hire Indian Talent </button> */}

            {/* Mobile menu button */}
            {/* <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors "
            >
              <HiMenu className="w-6 h-6 text-gray-600" />
            </button> */}
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay and Sidebar */}
      {isSidebarOpen && (
        <>
          {/* Overlay */}
          <div
            ref={overlayRef}
            className="fixed inset-0 bg-opacity-50 z-[600] lg:hidden"
            onClick={closeSidebar}
          />

          {/* Sidebar */}
          <div
            ref={sidebarRef}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-[700] lg:hidden overflow-y-auto"
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <img
                src={Images.Logo}
                alt="logo"
                className="w-[120px] h-auto object-contain"
              />
              <button
                onClick={closeSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <RxCross1 className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Sidebar Navigation */}
            <div className="p-6 space-y-4">
              {/* Home */}
              <button
                onClick={() => handleNavigation('/')}
                className="block w-full text-left text-gray-700 hover:text-[#5A32EA] transition-colors py-2 text-lg"
              >
                Home
              </button>

              {/* Services Dropdown */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-[#5A32EA] transition-colors py-2 text-lg"
                >
                  Services
                  {mobileServicesOpen ? (
                    <IoIosArrowUp className="w-4 h-4" />
                  ) : (
                    <IoIosArrowDown className="w-4 h-4" />
                  )}
                </button>
                
                {mobileServicesOpen && (
                  <div className="ml-4 mt-2 space-y-3">
                    {services.map((category, i) => (
                      <div key={i} className="space-y-2">
                        <h4 className="font-semibold text-[#5A32EA] text-sm">
                          {category.title}
                        </h4>
                        <ul className="space-y-1 ml-2">
                          {category.items.map((item, j) => (
                            <li key={j}>
                              <button
                                onClick={() => handleNavigation('/services')}
                                className="text-gray-600 hover:text-[#5A32EA] transition-colors text-sm block w-full text-left"
                              >
                                {item}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Case Study */}
              <button
                onClick={() => handleNavigation('/case-study')}
                className="block w-full text-left text-gray-700 hover:text-[#5A32EA] transition-colors py-2 text-lg"
              >
                Case Study
              </button>

              {/* Portfolio */}
              {/* <button
                onClick={() => handleNavigation('/portfolio')}
                className="block w-full text-left text-gray-700 hover:text-[#5A32EA] transition-colors py-2 text-lg"
              >
                Portfolio
              </button> */}

              {/* Hosting */}
              {/* <button
                onClick={() => handleNavigation('/hosting')}
                className="block w-full text-left text-gray-700 hover:text-[#5A32EA] transition-colors py-2 text-lg"
              >
                Hosting
              </button> */}

              {/* Blog */}
              <button
                onClick={() => handleNavigation('/blogs')}
                className="block w-full text-left text-gray-700 hover:text-[#5A32EA] transition-colors py-2 text-lg"
              >
                Blog
              </button>

              {/* Hire Talent */}
              <button
                // onClick={() => handleNavigation('/hire-talent')}
                className="block w-full text-center bg-gradient-to-r from-[#459CE1] to-[#D11AE7] text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all mt-6"
              >
                Hire Indian Talent
              </button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
