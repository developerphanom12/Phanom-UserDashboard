import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { HiEye, HiChat, HiX } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';

const RecentPraposals = () => {
  const orders = [
    {
      id: 1,
      title: "UI/UX Sales Page Design For Natural Skincare Brand",
      company: "PrimeEdge Solutions",
      location: "Las Vegas, USA",
      dateOrdered: "Mar 12, 2024",
      price: "₹410",
      status: "Hired",
      statusColor: "bg-purple-100 text-purple-800"
    },
    {
      id: 2,
      title: "High-Quality Video Editing For Your Marketing Campaign",
      company: "Bright Future",
      location: "Las Vegas, USA",
      dateOrdered: "Mar 12, 2024",
      price: "₹410",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      id: 3,
      title: "Professional Voiceover Services For Your Video",
      company: "GlobalTech Partners",
      location: "Las Vegas, USA",
      dateOrdered: "Mar 12, 2024",
      price: "₹410",
      status: "Cancelled",
      statusColor: "bg-red-100 text-red-800"
    },
    {
      id: 4,
      title: "UI/UX Sales Page Design For Natural Skincare Brand",
      company: "Apex Innovations",
      location: "Las Vegas, USA",
      dateOrdered: "Mar 12, 2024",
      price: "₹410",
      status: "Completed",
      statusColor: "bg-green-100 text-green-800"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-300 ">
      <div className="px-6 py-4 border-b border-gray-300 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Recent Proposals</h3>
        <button className="text-sm hover:text-blue-800 font-medium">
          View Orders
        </button>
      </div>
      <div>
              <table className="min-w-full w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Candidate</th>
                    <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job Title</th>
                    {/* <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pricing</th> */}
                    <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Applied</th>
                    <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((milestone) => (
                    <tr key={milestone.id}>
                      <td className="flex gap-2 px-2 sm:px-6 py-4">
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQyawVbjORfalGKAFdWZyJbg8cH12xX-MlLw&s" alt="candidate" className='rounded-full w-10 h-10' />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{milestone.title}</div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            {/* <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> */}
                            {/* <span className="">{milestone.company}</span> */}
                            <span className="mr-0.5"><FaLocationDot/></span>
                            <span>{milestone.location}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 sm:px-6 py-4">
                        <span className="text-sm font-semibold text-gray-900">{milestone.company}</span>
                      </td>
                      {/* <td className="px-2 sm:px-6 py-4">
                        <span className="text-sm font-medium text-gray-900">{milestone.price}</span>
                      </td> */}
                      <td className="px-2 sm:px-6 py-4 font-semibold text-sm text-gray-900">{milestone.dateOrdered}</td>
                      <td className="px-2 sm:px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${milestone.statusColor}`}>
                          {milestone.status}
                        </span>
                      </td>
                      <td className="px-2 sm:px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <HiEye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <RiDeleteBin6Line className="w-4 h-4" />
                          </button>
                          {/* <button className="text-gray-400 hover:text-gray-600">
                            <HiShare className="w-4 h-4" />
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
    </div>
  );
};

export default RecentPraposals;