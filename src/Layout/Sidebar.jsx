import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HiBriefcase,
  HiCog,
  HiSupport,
  HiDocumentText,} from 'react-icons/hi';
import { RxDashboard } from 'react-icons/rx';
import { FaRegUser, FaUserAlt } from 'react-icons/fa';
import { LuMessageSquareShare, LuMessageSquareText } from 'react-icons/lu';
import { MdOutlineGroupWork } from 'react-icons/md';
import { CiCreditCard1, CiWallet } from 'react-icons/ci';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  const menuItems = [
    {
      title: 'Overview',
      items: [
        { name: 'Dashboard', icon: RxDashboard, path: '/' },
        { name: 'Profile', icon: FaRegUser, path: '/profile' },
        // { name: 'Portfolio', icon: HiBriefcase, path: '/portfolio' },
        { name: 'Message', icon: LuMessageSquareText, path: '/messages' },
        // { name: 'My Gigs', icon: MdOutlineGroupWork, path: '/gigs' },
        { name: 'Orders', icon: HiDocumentText, path: '/orders' },
        { name: 'spendings', icon: CiWallet, path: '/spendings' },
        { name: 'Payment Settings', icon: CiCreditCard1, path: '/payment-settings' },
        { name: 'Support', icon: HiSupport, path: '/support' }
      ]
    }
  ];

  return (
    <>
      {/* Sidebar */}
      <aside className={`
        fixed top-16 z-40 h-[calc(100vh-4rem)] bg-white transition-all duration-300 w-64
        lg:left-0  lg:translate-x-0
        right-0 lg:border-l-0 ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">

          {/* Menu items */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-1">
                {/* Section title */}
                <h3 className="px-3 py-2 text-xs font-semibold text-[#6F6F6F] uppercase tracking-wider lg:block hidden">
                  {section.title}
                </h3>
                {isOpen && (
                  <h3 className="px-3 py-2 text-xs font-semibold text-[#6F6F6F] uppercase tracking-wider lg:hidden">
                    {section.title}
                  </h3>
                )}
                
                {/* Menu items */}
                {section.items.map((item, itemIndex) => {
                  const IconComponent = item.icon;
                  const isActive = item.path === "/"
                                    ? location.pathname === "/"   // Home ke liye exact match
                                    : location.pathname.startsWith(item.path);

                  
                  return (
                    <Link
                      key={itemIndex}
                      to={item.path}
                      className={`
                        flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
                        ${isActive
                          ? ' text-white border-r-2 bg-[#8E59E2]'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }
                        ${!isOpen ? 'justify-center lg:justify-start' : ''}
                      `}
                    >
                      <IconComponent className="w-5 h-5 mr-3" />
                      <span className={`truncate ${isOpen ? '' : 'hidden lg:block'}`}>
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Bottom section */}
          {/* <div className="p-3 border-t border-gray-200">
            <Link
              to="/settings"
              className={`
                flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors
                ${!isOpen ? 'justify-center lg:justify-start' : ''}
                ${location.pathname === '/settings' ? 'bg-purple-700 text-white' : ''}
              `}
            >
              <HiCog className="w-5 h-5 mr-3" />
              <span className={`${isOpen ? '' : 'hidden lg:block'}`}>Settings</span>
            </Link>
          </div> */}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

