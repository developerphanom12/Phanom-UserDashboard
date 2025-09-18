import React, { useState } from "react";
import OrderCard from "../../components/OrdersComponents/OrderCard";
import WorkReviewPopup from "../../components/OrdersComponents/WorkReviewPopup";
import RateClientPopup from "../../components/OrdersComponents/RateClientPopup";

const activeOrders = [
  {
    id: 1,
    status: "Ontime",
    title: "Need a UX designer to design a website on figma",
    rating: 4,
    daysAgo: "2 days ago",
    price: 4000,
    location: "Mohali, Punjab, India",
    description: "As a Lead User Experience Designer, you will collaborate closely with our Creative ...",
    tags: ["Wireframing", "Mockup"],
    button: "Submit Now",
  },
    {
    id: 2,
    status: "completed",
    title: "Need a UX designer to design a website on figma",
    rating: 4,
    daysAgo: "2 days ago",
    price: 4000,
    location: "Mohali, Punjab, India",
    description:
      "As a Lead User Experience Designer, you will collaborate closely with our Creative ...",
    tags: ["Wireframing", "Mockup"],
    button: "Submit Now",
  },
  {
    id: 3,
    status: "Pre-Time",
    title: "I will design wordpress website with elementor pro",
    rating: 4,
    daysAgo: "2 days ago",
    price: 4000,
    location: "Mohali, Punjab, India",
    description:
      "As a Lead User Experience Designer, you will collaborate closely with our Creative ...",
    tags: ["Wireframing", "Mockup"],
    button: "Waiting for Approve",
  },

];

const completeOrders = [
  {
    id: 2,
    status: "Complete",
    title: "Landing page UI done successfully",
    rating: 5,
    daysAgo: "5 days ago",
    price: 5000,
    location: "Delhi, India",
    description: "Delivered project on time with responsive design.",
    tags: ["UI/UX", "Figma"],
    button: "View Details",
  },
];

const deniedOrders = [
  {
    id: 3,
    status: "Denied",
    title: "E-commerce website setup",
    rating: 3,
    daysAgo: "1 week ago",
    price: 3000,
    location: "Mumbai, India",
    description: "Project was rejected due to requirement mismatch.",
    tags: ["WordPress", "WooCommerce"],
    button: "Reapply",
  },
];

const Orders = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getData = () => {
    switch (activeTab) {
      case "active":
        return activeOrders;
      case "complete":
        return completeOrders;
      case "denied":
        return deniedOrders;
      default:
        return [];
    }
  };

  const handleOpenReview = (order) => {
    setSelectedOrder(order);
    setShowReviewModal(true);
  };

  const handleOpenSubmit = (order) => {
    setSelectedOrder(order);
    setShowSubmitModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 ">
           {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900  mb-6">Orders</h1>
    
      {/* Tabs */}
      <div className="flex justify-between">

      <div className="flex gap-6 pb-2 mb-6 text-gray-600  font-medium">
        <button
          onClick={() => setActiveTab("active")}
          className={`pb-2 ${
            activeTab === "active"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "hover:text-purple-600"
          }`}
        >
          Active ({activeOrders.length})
        </button>
        <button
          onClick={() => setActiveTab("complete")}
          className={`pb-2 ${
            activeTab === "complete"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "hover:text-purple-600"
          }`}
        >
          Complete ({completeOrders.length})
        </button>
        <button
          onClick={() => setActiveTab("denied")}
          className={`pb-2 ${
            activeTab === "denied"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "hover:text-purple-600"
          }`}
        >
          Denied ({deniedOrders.length})
        </button>
      </div>

       <div>
          <select
            className="border border-gray-300 px-3 py-1.5 rounded-md text-gray-600 hover:bg-gray-50"
            defaultValue="30days"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>

        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {getData().map((order) => (
          <OrderCard
            key={order.id}
            {...order}
            onReview={() => handleOpenReview(order)}
            onSubmit={() => handleOpenSubmit(order)}
          />
        ))}
      </div>
      {showReviewModal && (
        <RateClientPopup onClose={() => setShowReviewModal(false)} />
      )}
      {showSubmitModal && (
        <WorkReviewPopup onClose={() => setShowSubmitModal(false)} />
      )}
    </div>
  );
};

export default Orders;
