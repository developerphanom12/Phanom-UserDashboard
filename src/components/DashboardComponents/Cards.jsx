import React from 'react';

const StatCard = ({ title, value, img, percentage }) => {
  return (
    <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className='rounded-full '>
            <img src={img} alt="card" />
        </div>
      </div>
      {percentage && (
        <div className="mt-2">
          <span className="text-sm text-green-600">+{percentage}%</span>
          <span className="text-sm text-gray-500 ml-1">from last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;