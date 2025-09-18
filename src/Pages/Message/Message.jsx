import React, { useState } from 'react';
import MessageSidebar from '../../components/MessageComponents/MessageSidebar';
import ChatArea from '../../components/MessageComponents/ChatArea';
import UserProfile from '../../components/MessageComponents/UserProfile';

const Message = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div>
      <div className='flex justify-between p-4 md:p-6'>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Message</h1>
        {/* Mobile sidebar toggle */}
        {/* <button 
          className="md:hidden bg-purple-500 text-white px-3 py-1 rounded-lg"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? 'Chat' : 'Messages'}
        </button> */}
      </div>
      
      <div className="h-[calc(100vh-5rem)] md:h-[calc(100vh-4rem)] flex bg-[#F5F7F9]">
        {/* Left Sidebar - Message List */}
        <div className={`
          ${showSidebar ? 'w-full' : 'w-0 overflow-hidden'} 
          md:w-80 border-r border-gray-200 flex flex-col transition-all duration-300
          ${selectedChat && !showSidebar ? 'hidden md:flex' : ''}
        `}>
          <MessageSidebar 
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            setShowSidebar={setShowSidebar}
          />
        </div>

        {/* Center - Chat Area */}
        <div className={`
          ${!showSidebar || !selectedChat ? 'w-full' : 'w-0 '} 
          md:flex-1 flex flex-col transition-all duration-300
          ${!selectedChat && showSidebar ? 'hidden md:flex' : ''}
        `}>
          <ChatArea 
            selectedChat={selectedChat}
            showProfile={showProfile}
            setShowProfile={setShowProfile}
            setShowSidebar={setShowSidebar}
          />
        </div>

        {/* Right Sidebar - User Profile */}
        {showProfile && (
          <div className="hidden lg:block w-80 border-l border-gray-200">
            <UserProfile />
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
