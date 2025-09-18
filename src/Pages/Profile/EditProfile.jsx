import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [active, setActive] = useState(true);
  const [skills, setSkills] = useState(["HTML"]);
  const navigate = useNavigate();

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setSkills([...skills, e.target.value.trim()]);
      e.target.value = "";
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="bg-[#F5F7F9] min-h-screen p-6">
      {/* Card */}
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="flex gap-3 text-xl font-semibold justify-center"><FaArrowLeft onClick={() => navigate('/profile')} className="text-lg mt-1 cursor-pointer"/>Edit Profile</h2>
          <button className="px-4 py-2 bg-gradient-to-r from-[#429CE1] via-[#9158E4] to-[#CA1DE5] text-white rounded-lg text-sm font-medium shadow-md hover:opacity-90">
            Save Changes
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center">
              <FaCamera className="text-gray-500 text-3xl" />
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Skill (tags) */}
            <div>
              <label className="text-sm font-medium text-gray-600">Skill</label>
              <div className="flex flex-wrap gap-2 mt-1 border px-2 py-2 rounded-lg min-h-[42px]">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {skill}
                    <button
                      className="ml-1 text-xs"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      ✕
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  onKeyDown={handleAddSkill}
                  placeholder="Type and press Enter"
                  className="outline-none text-sm flex-1"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Location
              </label>
              <select className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-400">
                <option value="">Enter your location</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Language
              </label>
              <select className="w-full mt-1 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-400">
                <option value="">Select language</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>

            {/* Active Toggle */}
            <div className="flex items-center gap-3 mt-3">
              <span className="text-sm font-medium text-gray-600">Active</span>
              <button
                onClick={() => setActive(!active)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                  active ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                    active ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        {/* About Me */}
        <div className="mt-8">
          <h3 className="text-md font-semibold mb-2">About me</h3>
          <textarea
            rows="4"
            placeholder="Write about yourself..."
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-400"
          ></textarea>
        </div>

        {/* Skills Tags */}
        {/* <div className="mt-8">
          <h3 className="text-md font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Wireframing",
              "Prototyping",
              "UX Design",
              "Responsive",
              "Components",
              "JSX",
              "Routing",
              "APIs",
              "State",
              "+14",
            ].map((skill, i) => (
              <span
                key={i}
                className="px-6 py-2 border bg-[#F5F7F9] border-gray-300 drop-shadow-sm rounded-full text-sm hover:bg-gray-100 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default EditProfile;
