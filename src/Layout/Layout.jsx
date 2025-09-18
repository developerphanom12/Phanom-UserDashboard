import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-[#F5F7F9]">
      <Navbar toggleSidebar={toggleSidebar} />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 transition-all duration-300 lg:ml-64 pt-16">
          <Outlet />
        </main>
      </div>
      
      {sidebarOpen && (
        <div 
          className="fixed inset-0  bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Layout;

