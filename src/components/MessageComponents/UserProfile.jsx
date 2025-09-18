import React from 'react';
import { HiStar } from 'react-icons/hi';

const UserProfile = () => {
  return (
    <div className="h-full bg-white p-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">About hollyteacher</h3>
        
        {/* Profile Image */}
        <div className="relative mx-auto w-20 h-20 mb-4">
          <img
            src="https://i.pravatar.cc/150?img=1"
            alt="hollyteacher"
            className="w-full h-full rounded-full object-cover"
          />
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
        </div>

        {/* User Info */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">From</p>
            <p className="font-medium text-gray-900">India</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Avg response time</p>
            <p className="font-medium text-gray-900">Aug 1998</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Languages</p>
            <p className="font-medium text-gray-900">English, Hindi, Gujarati</p>
          </div>

          <div className="flex items-center justify-center space-x-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <HiStar key={i} className="w-4 h-4" />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-900 ml-2">4.9 (97)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;