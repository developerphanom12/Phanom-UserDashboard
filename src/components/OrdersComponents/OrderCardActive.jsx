import React from "react";
import { FaStar, FaRegCalendarAlt, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderCardActive = ({
    status,
    title,
    rating,
    daysAgo,
    price,
    location,
    description,
    tags,
}) => {

    const getStatusClasses = () => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'bg-[#D4EDDA] text-[#155724]';
            case 'denied':
                return 'bg-[#F8D7DA] text-[#721C24]';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'pre-time':
                return 'bg-[#CCE5FF] text-[#004085]';
            case 'ontime':
                return 'bg-[#CCE5FF] text-[#004085]';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getButtonName = () => {
  switch (status.toLowerCase()) {
    case "completed":
      return "Review & Rating";
    case "denied":
      return null; // ❌ don't return string
    case "pending":
      return "Submit";
    case "late":
      return "Submit again";
    case "pre-time":
      return "Waiting for Approve";
    case "ontime":
      return "Submit Now";
    default:
      return "Submit";
  }
};

const navigate = useNavigate()


    return (
        <div onClick={() => navigate('/orders/order-details')} className=" rounded-xl drop-shadow-sm hover:shadow-lg transition bg-white p-5 flex flex-col justify-between cursor-pointer">
            {/* Status */}
            <div className="w-full flex justify-end items-end ">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses()}`}>
                    {status}
                </span>

            </div>
                <div className={`flex justify-between items-center py-2 gap-1 ${status === "Denied" ? "hidden" : "block"}`} >
                    <div className="flex flex-1 gap-3">
                        <span className="w-[25%] h-2 rounded-full bg-[#8E59E2]"></span>
                        <span className="w-[25%] h-2 rounded-full bg-[#8E59E2]"></span>
                        <span className="w-[25%] h-2 rounded-full bg-[#8E59E2]"></span>
                        <span className="w-[25%] h-2 rounded-full bg-gray-200"></span>
                    </div>
                    <span className="whitespace-nowrap">3 days left</span>
                </div>

            {/* Title */}
            <h3 className="font-semibold text-gray-800 text-lg mb-2">{title}</h3>

            {/* Info */}
            <div className="flex items-center justify-between gap-2 text-gray-500 text-sm mb-2">
                <div className="flex gap-2">
                    <FaStar className="text-yellow-400" /> {rating}
                </div>

                <div className="flex gap-2">
                    <FaRegCalendarAlt className="mt-0.5" /> {daysAgo}
                </div>

                <div className="flex gap-2">
                    <FaRupeeSign className="mt-0.5" /> {price}
                </div>
            </div>

            <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                <FaMapMarkerAlt /> {location}
            </div>

            {/* Description */}
            <p className=" text-sm mb-4">{description}</p>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mb-4">
                {tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 border rounded-full text-sm ">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Button */}
           {getButtonName() && (
  <button
    className="w-full py-2 text-white rounded-lg bg-gradient-to-r from-[#459CE1] to-[#D11AE7]"
  >
    {getButtonName()}
  </button>
)}

        </div>
    );
};

export default OrderCardActive;
