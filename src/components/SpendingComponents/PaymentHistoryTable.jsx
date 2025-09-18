import React, { useState } from 'react';
import { HiSearch } from 'react-icons/hi';

const PaymentHistoryTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Default');

  const paymentHistory = [
    {
      id: 1,
      date: 'Mar 12, 2025',
      type: 'Job Assigned',
      amount: '₹888',
      status: 'Progress',
      statusColor: 'text-blue-600'
    },
    {
      id: 2,
      date: 'Mar 12, 2025',
      type: 'Sell Services',
      amount: '₹720',
      status: 'Pending',
      statusColor: 'text-orange-600'
    },
    {
      id: 3,
      date: 'Mar 12, 2025',
      type: 'Sell Services',
      amount: '₹720',
      status: 'In Review',
      statusColor: 'text-purple-600'
    },
    {
      id: 4,
      date: 'Mar 12, 2025',
      type: 'Job Assigned',
      amount: '₹900',
      status: 'Cancelled',
      statusColor: 'text-red-600'
    },
    {
      id: 5,
      date: 'Mar 12, 2025',
      type: 'Job Assigned',
      amount: '₹900',
      status: 'Completed',
      statusColor: 'text-green-600'
    }
  ];

  const filteredHistory = paymentHistory.filter(item =>
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClasses = (status) => {
  switch (status.toLowerCase()) {
    case "progress":
      return "bg-[#D4EDDA] text-[#155724]";
    case "cancelled":
      return "bg-[#F8D7DA] text-[#721C24]";
    case "in review":
      return "bg-yellow-100 text-yellow-800";
    case "pending":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-[#CCE5FF] text-[#004085]";
    default:
      return "bg-gray-100 text-gray-800";
  }
};


  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 ">
      <div className="px-6 py-4 ">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h3>
        
        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative ">
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className=" bg-white text-gray-400 border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none  "
            >
              <option value="Default">Sort by</option>
              <option value="Date">Date</option>
              <option value="Amount">Amount</option>
              <option value="Status">Status</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DATE
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                TYPE
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                AMOUNT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white ">
            {filteredHistory.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                 <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusClasses(item.status)}`}>
                {item.status}
              </span>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistoryTable; 