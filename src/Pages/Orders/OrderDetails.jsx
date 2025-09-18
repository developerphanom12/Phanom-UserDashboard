import React, { useState } from "react";
import { FaCalendarAlt, FaClipboardList, FaClock, FaFilePdf, FaFileWord, FaRegClock } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { CiCalendar, CiClock2 } from "react-icons/ci";
import { FaClockRotateLeft } from "react-icons/fa6";
import { PiFileDoc, PiFilePdfDuotone } from "react-icons/pi";
import { IoIosStar } from "react-icons/io";
import { LiaRupeeSignSolid } from "react-icons/lia";
import WorkReviewPopup from "../../components/OrdersComponents/WorkReviewPopup";

const logs = [
    {
        id: 1,
        date: "08-Aug-2025, 10:15 AM",
        user: "Freelancer — Priya",
        title: "Proposal Sent",
        description:
            'Sent Proposal In Chat: "Hi Rohan — Proposal Attached. Happy To Start After First Milestone Payment."',
        status: "Pending",
    },
    {
        id: 2,
        date: "08-Aug-2025, 10:20 AM",
        user: "Client — Rohan",
        title: "Proposal Accepted (Chat)",
        description: "Thanks — I Accept. Please Send Payment Link For Milestone 1",
        status: "Accepted",
    },
    {
        id: 3,
        date: "08-Aug-2025, 10:21 AM",
        user: "Client — Rohan",
        title: "Payment (Milestone 1)",
        description: "Paid ₹115,000 For Homepage (M1). Payment Held In Escrow.",
        status: "Paid",
    },
    {
        id: 4,
        date: "08-Aug-2025, 10:30 AM",
        user: "System",
        title: "Order Created",
        description: "Order ORD-1024 Auto-Created In Dashboard.",
        status: "Approved",
    },
    {
        id: 5,
        date: "08-Aug-2025, 10:35 AM",
        user: "Freelancer — Priya",
        title: "Work Started",
        description: "Started Working On Project.",
        status: "Started",
    },
    {
        id: 6,
        date: "08-Aug-2025, 10:40 AM",
        user: "Freelancer — Priya",
        title: "Work Completed",
        description: "Completed Work For Homepage. Please Review & Approve.",
        status: "Completed",
    },
    {
        id: 7,
        date: "08-Aug-2025, 10:45 AM",
        user: "Client — Rohan",
        title: "Payment (Milestone 2)",
        description: "Paid ₹115,000 For Homepage (M1). Payment Held In Escrow.",
        status: "Paid",
    },
    {
        id: 8,
        date: "08-Aug-2025, 10:50 AM",
        user: "Client — Rohan",
        title: "Order Completed",
        description: "Project Completed & Approved. Please Rate Freelancer.",
        status: "Completed",
    },
    {
        id: 9,
        date: "08-Aug-2025, 10:55 AM",
        user: "Freelancer — Priya",
        title: "Review & Rating",
        description: "Rated Freelancer 5/5 Stars.",
        status: "Rated",
    },

];

const milestones = [
    {
        title: "Project Kickoff",
        deliverables: "Initial Meeting, Requirement Gathering, Project Plan Approval",
        timeline: "Week 1",
        price: "₹500",
    },
    {
        title: "Design Phase",
        deliverables: "Wireframes, UI/UX Design Mockups, Design Approval",
        timeline: "Week 2 – Week 3",
        price: "₹1,200",
    },
    {
        title: "Development Phase",
        deliverables: "Front-End & Back-End Development, Database Setup, API Integration",
        timeline: "Week 4 – Week 7",
        price: "₹3,500",
    },
    {
        title: "Testing & QA",
        deliverables: "Functional Testing, Bug Fixes, Performance Optimization",
        timeline: "Week 8",
        price: "₹800",
    },
    {
        title: "Final Delivery",
        deliverables: "Project Deployment, Documentation, Knowledge Transfer, Final Approval",
        timeline: "Week 9",
        price: "₹1,000",
    },
];

const statusColors = {
    Pending: "text-yellow-500",
    Accepted: "text-green-600",
    Paid: "text-blue-600",
    Approved: "text-purple-600",
};

const OrderDetails = () => {
    const [openLog, setOpenLog] = useState(null);
    const [open, setOpen] = useState(false);
    return (
        <>
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <h1 className="text-xl md:text-2xl font-bold text-gray-900  mb-6">Orders</h1>

            {/* 🔹 Top Card */}
            <div className="bg-[#F9F2EC] drop-shadow-sm rounded-xl p-5 mb-6">
                <div>
                    <h2 className="text-lg md:text-2xl font-semibold text-gray-800">
                        Need A UX Designer To Design A Website On Figma
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-between w-[100%] ">

                        <div className="flex items-center gap-4 text-gray-600 text-sm mt-2">
                            <div className="flex gap-1">
                                <CiCalendar className="mt-0.5" />
                                <span >2 Days Left</span>
                            </div>
                            <div className="flex gap-1">
                                <LiaRupeeSignSolid className="mt-0.5" />
                                <span >900</span>
                            </div>
                            <div className="flex gap-1">
                                <IoIosStar className="mt-0.5 text-yellow-500" />
                                <span > 4</span>
                            </div>
                        </div>

                        <div className="flex sm:justify-center items-center gap-2">
                            <h4 className="text-gray-400 text-sm">Budget</h4>
                            <div className="flex">
                                <LiaRupeeSignSolid className="mt-0.5" />
                                <p className="">999</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔹 Main Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Section */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Project Overview */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-lg font-semibold mb-4">Project Overview</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <CiCalendar size={30} className=" text-black" />
                                <div>
                                    <div className="text-gray-400">Date Posted: </div>
                                    <div className="text-lg font-normal">April 20, 2025 </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <CiCalendar size={30} className=" text-black" />
                                <div>
                                    <div className="text-gray-400">Project Type:</div>
                                    <div className="text-xl font-normal">Fixed </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaClockRotateLeft size={30} className=" text-black" />
                                <div>
                                    <div className="text-gray-400">Duration </div>
                                    <div className="text-xl font-normal">100 Hours</div>
                                </div>
                            </div>
                        </div>

                        {/* Client Info */}
                        <p className=" text-gray-600 mb-2">
                            <h4 className="text-black font-medium">Client :</h4>
                            <p>Rohan Mehta</p>
                        </p>

                        {/* Description */}
                        <div className="py-5 space-y-2">
                            <h4 className="font-medium text-black">Project Duration</h4>
                            <p className="text-gray-700 mb-4">
                                Actively looking for a freelance UI/UX fullstack developer versatile in MERN
                                for rectifying UI & making website UI responsive. You will play a key role
                                in wireframes and user journey design.
                            </p>
                            <p className="text-gray-700 mb-4">
                                Actively looking for a freelance UI/UX fullstack developer versatile in MERN
                                for rectifying UI & making website UI responsive. You will play a key role
                                in wireframes and user journey design.
                            </p>
                        </div>

                        {/* Requirements */}
                        <h4 className="font-medium text-black mb-2">Requirements:</h4>
                        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                            <li>10-12 Pages; 6 Similar Pages</li>
                            <li>Dual Environment Setup</li>
                            <li>Micro Tasks (Alignment, Footer, Cards, Video, etc.)</li>
                            <li>Pre-defined content cards</li>
                            <li>Pre-defined design format</li>
                            <li>Source code available</li>
                            <li>Server deployable</li>
                        </ul>

                        {/* Attachments */}
                        <h4 className="font-semibold mt-4 mb-2">Attachments:</h4>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center gap-2 bg-[#F5F7F9] rounded-lg p-2 drop-shadow-sm">
                                <PiFilePdfDuotone size={40} className=" text-[#8E59E2]" />
                                <div>
                                    <div className="text-gray-400 text-sm" >File Name PDF</div>
                                    <div className="font-normal text-lg">PDF</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-[#F5F7F9] rounded-lg p-2 drop-shadow-sm">
                                <PiFileDoc size={40} className=" text-[#8E59E2]" />
                                <div>
                                    <div className="text-gray-400 text-sm">File Name DOC</div>
                                    <div className=" font-normal text-lg">DOC</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="bg-white p-6 rounded-xl shadow">
                    {/* Timer */}
                    <div className=" flex justify-between text-sm sm:text-lg">
                        <h3 className=" mb-2">Timing Ends</h3>
                        <p className="text-[#EB4F4F] font-medium flex items-start gap-2">
                            <FaRegClock className="mt-1.5 " /> 40h : 28m : 43s
                        </p>
                    </div>

                    {/* Active Log */}
                    <h3 className="font-normal text-lg mb-3">Active Log</h3>
                    <div className="relative ">

                        {logs.map((log) => (
                            <div key={log.id} className="relative mb-6 border-l-2 border-gray-300 pl-3">
                                {/* Dot */}
                                <div className="absolute -left-[4px] top-0 w-2 h-2 rounded-full bg-[#8E59E2]"></div>

                                {/* Log Card */}
                                <div
                                    className="cursor-pointer"
                                    onClick={() => setOpenLog(openLog === log.id ? null : log.id)}
                                >
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm font-medium text-gray-800">{log.date}</p>
                                        {openLog === log.id ? (
                                            <FaChevronUp className="text-gray-500" />
                                        ) : (
                                            <FaChevronDown className="text-gray-500" />
                                        )}
                                    </div>
                                    <p className="underline">{log.user}</p>
                                   
                                    {/* <p className={`text-sm ${statusColors[log.status]}`}>
                                        {log.title} 
                                    </p> */}
                                </div>

                                {/* Expanded Details */}
                                {openLog === log.id && (
                                    <div>

                                     <p className={`text-sm text-gray-600`}>
                                        {log.title}
                                    </p>
                                    <div className=" text-sm text-gray-600 py-2 ">
                                        {log.description}
                                    </div>
                                    </div>
                                )}
                                <p className={`text-sm ${statusColors[log.status] || "text-green-600"}`}>
                                    {log.status}
                                </p>
                            </div>
                        ))}

                        <button
                            onClick={() => setOpen(!open)}
                            className="w-full py-2 text-white rounded-lg bg-gradient-to-r from-[#459CE1] to-[#D11AE7] cursor-pointer"
                        >
                            Submit Work
                        </button>
                    </div>
                </div>
            </div>

            {/* Milestone Table */}
            <div className="max-w-6xl mt-10 mx-auto p-6 bg-white rounded-2xl drop-shadow-sm">
                <h2 className="text-xl mb-4">Milestone:</h2>

                <div className={`flex justify-between items-center py-2`} >
                    <div className="flex flex-1 gap-3">
                        <span className="w-[25%] h-2 rounded-full bg-[#8E59E2]"></span>
                        <span className="w-[25%] h-2 rounded-full bg-[#8E59E2]"></span>
                        <span className="w-[25%] h-2 rounded-full bg-[#8E59E2]"></span>
                        <span className="w-[25%] h-2 rounded-full bg-gray-200"></span>
                    </div>
                    <span className="px-5">3 days left</span>
                </div>

                {/* Scroll wrapper */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-[#8E59E2] text-white text-left divide-x divide-gray-400 border border-gray-400">
                                <th className="p-2">Title</th>
                                <th className="p-2">Deliverables</th>
                                <th className="p-2">Timeline</th>
                                <th className="p-2 whitespace-nowrap">Price (Optional)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {milestones.map((item, idx) => (
                                <tr
                                    key={idx}
                                    className="border text-gray-400 hover:bg-gray-50 transition-colors divide-x "
                                >
                                    <td className="p-3 ">{item.title}</td>
                                    <td className="p-3  ">{item.deliverables}</td>
                                    <td className="p-3">{item.timeline}</td>
                                    <td className="p-3">{item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

         {/* Popup / Modal */}
      {open && (
          <WorkReviewPopup />
      )}
        </>
    );
};

export default OrderDetails;
