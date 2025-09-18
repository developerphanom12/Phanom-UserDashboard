import React, { useState } from 'react';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
import { HiSearch, HiChevronDown } from 'react-icons/hi';

const MessageSidebar = ({ selectedChat, setSelectedChat, setShowSidebar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleChatSelect = (conversation) => {
    setSelectedChat(conversation);
    // Hide sidebar on mobile when chat is selected
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  const conversations = [
    {
      id: 1,
      name: 'hollyteacher',
      lastMessage: 'Hey! can available today...',
      time: '3 hours',
      avatar: 'https://i.pravatar.cc/150?img=1',
      unread: 0
    },
    {
      id: 2,
      name: 'hollyteacher',
      lastMessage: 'Hey! can available today...',
      time: '3 hours',
      avatar: 'https://i.pravatar.cc/150?img=2',
      unread: 0
    },
    {
      id: 3,
      name: 'hollyteacher',
      lastMessage: 'Hey! can available today...',
      time: '3 hours',
      avatar: 'https://i.pravatar.cc/150?img=3',
      unread: 0
    },
    {
      id: 4,
      name: 'hollyteacher',
      lastMessage: 'Hey! can available today...',
      time: '3 hours',
      avatar: 'https://i.pravatar.cc/150?img=4',
      unread: 0
    },
    {
      id: 5,
      name: 'hollyteacher',
      lastMessage: 'Hey! can available today...',
      time: '3 hours',
      avatar: 'https://i.pravatar.cc/150?img=5',
      unread: 0
    },
    {
      id: 6,
      name: 'hollyteacher',
      lastMessage: 'Hey! can available today...',
      time: '3 hours',
      avatar: 'https://i.pravatar.cc/150?img=6',
      unread: 0
    },
    {
      id: 7,
      name: 'hollyteacher',
      lastMessage: 'Hey! can available today...',
      time: '3 hours',
      avatar: 'https://i.pravatar.cc/150?img=7',
      unread: 0
    },
    {
      id: 8,
      name: 'hollyteacher',
      lastMessage: 'Hey! can available today...',
      time: '2 days',
      avatar: 'https://i.pravatar.cc/150?img=8',
      unread: 0
    }
  ];

  return (
    <>
      {/* Header */}
      <div className="px-3 md:px-4 py-1 border-b border-gray-200">
        
        {/* Filters */}
        <div className="space-y-2 md:space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs md:text-sm text-gray-600">All messages</span>
            <HiChevronDown className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs md:text-sm text-gray-600">All Conversations</span>
            <HiChevronDown className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
          </div>
        </div>

        {/* Search */}
        <div className="relative mt-3 md:mt-4">
          <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 md:w-4 md:h-4" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 md:pl-10 pr-4 py-1.5 md:py-2 border border-gray-300 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => handleChatSelect(conversation)}
            className={`p-3 md:p-4 border-b m-1 md:m-2 rounded-lg border-gray-100 cursor-pointer hover:bg-[#EfEFEF] ${
              selectedChat?.id === conversation.id ? 'bg-[#EfEFEF] border-r-2 ' : ''
            }`}
          >
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="relative">
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-gray-600"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="flex gap-1 md:gap-2 text-xs md:text-sm font-medium text-gray-900 truncate">
                    {conversation.name}
                    <div className="mt-0.5 md:mt-1 w-2 h-2 md:w-3 md:h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </p>
                  <span className="text-xs text-gray-500">{conversation.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs md:text-sm text-gray-500 truncate mt-1">
                    {conversation.lastMessage}
                  </p>
                  <span className="text-sm md:text-md text-gray-500"><CiStar/></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MessageSidebar;
