import React from 'react';
import { HiBell, HiCheck, HiX } from 'react-icons/hi';

const NotificationPanel = () => {
  const notifications = [
    {
      id: 1,
      message: "The Application is Rejected On your Job UI Designer By Employer.",
      time: "30 Mins Ago",
      type: "rejected"
    },
    {
      id: 2,
      message: "The Application is Rejected On your Job UI Designer By Employer.",
      time: "30 Mins Ago", 
      type: "rejected"
    },
    {
      id: 3,
      message: "The Application is Rejected On your Job UI Designer By Employer.",
      time: "30 Mins Ago",
      type: "rejected"
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
        {/* <span className="text-sm text-gray-500">27-07-2020</span> */}
      </div>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <HiBell className="w-4 h-4 text-gray-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;