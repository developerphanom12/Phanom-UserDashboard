import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const SignUp = ()=> {
  const [step, setStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate()

  const totalSteps = 4;
  const completionRate = Math.round((step / totalSteps) * 100);

  const nextStep = () => {
    if (step === totalSteps) {
      setShowPopup(true);
    } else {
      setStep(step + 1);
    }
  };

  {/* Reusable Upload Field */ }
  const UploadField = ({ id, label, accept, helper }) => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 text-sm mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative w-full sm:w-3/4">
        <input
          id={id}
          type="file"
          accept={accept}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="w-full border border-gray-300 rounded-lg p-3 flex items-center justify-between text-sm text-gray-400 bg-white">
          <span>Upload file</span>
          {/* Upload Icon */}
          <svg xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-400"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
          </svg>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-1">{helper}</p>
    </div>
  );

  return (
    <div className=" flex items-center justify-center p-4 ">
      <div className="w-full max-w-[1500px] rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div className="flex flex-wrap gap-4 mb-4 sm:mb-0">
            {["Signup", "Description", "Upload Category", "Experience"].map(
              (label, i) => (
                <div
                  key={i}
                  className={`flex items-center text-xs space-x-2 ${step >= i + 1
                      ? "text-green-600 font-medium"
                      : "text-gray-400"
                    }`}
                >
                  <div
                    className={`w-5 h-5 flex items-center justify-center rounded-full border-2 text-xs ${step >= i + 1
                        ? "bg-green-600 text-white border-green-600"
                        : "border-gray-300 text-gray-400"
                      }`}
                  >
                    {i + 1}
                  </div>
                  <span>{label}</span>
                </div>
              )
            )}
          </div>

          {/* Completion Rate Section */}
          <div className="flex flex-col items-start sm:items-end w-full sm:w-auto">
            <span className="text-gray-400 text-xs mb-2">
              Completion Rate: {completionRate}%
            </span>
            <div className="w-32 bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-purple-600 h-1.5 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>
        </div>


        {/* Step Forms */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-medium mb-3">Why Signup?</h2>
            <p className="text-gray-500 mb-5 font-regular">
              We use your details to verify your profile and connect you with clients.
            </p>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-700 text-sm font-regular mb-1">
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                className="w-full sm:w-3/4 border border-gray-300 rounded-lg p-3 text-sm font-regular focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-regular mb-1">
                Phone Number *
              </label>
              <input
                id="phoneNumber"
                type="text"
                placeholder="Enter your mobile number"
                className="w-full sm:w-3/4 border border-gray-300 text-sm font-regular rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="emailId" className="block text-gray-700 text-sm font-regular mb-1">
                Email ID *
              </label>
              <input
                id="emailId"
                type="email"
                placeholder="Enter your email ID"
                className="w-full sm:w-3/4 border border-gray-300 text-sm font-regular rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Personalized Dashboard</h2>
            <p className="text-gray-500 mb-5">
              Tell us more about yourself to personalize your experience.
            </p>
            <div className="mb-4">
              <label htmlFor="dateOfBirth" className="block text-gray-700 text-sm font-regular mb-1">
                Date of Birth *
              </label>
              <input
                id="dateOfBirth"
                type="date"
                className="w-full sm:w-3/4 border border-gray-300 text-sm font-regular rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="block text-gray-700 text-sm font-regular mb-1">
                Gender *
              </label>
              <select
                id="gender"
                className="w-full sm:w-3/4 border bg-white border-gray-300 text-sm font-regular rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="mb-6">
              <label htmlFor="location" className="block text-gray-700 text-sm font-regular mb-1">
                Location *
              </label>
              <input
                id="location"
                type="text"
                placeholder="Enter your location"
                className="w-full sm:w-3/4 border border-gray-300 text-sm font-regular rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Select Your Expertise</h2>
            <p className="text-gray-500 mb-5">
              Choose Your Main Skill And Specialty. This Defines What Kind Of Jobs You'll Get.
            </p>

            {/* Category */}
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-700 text-sm mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                className="w-full sm:w-3/4 bg-white border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              >
                <option value="">Select category</option>
                <option>Web Development</option>
                <option>Graphic Design</option>
                <option>Content Writing</option>
                <option>Digital Marketing</option>
              </select>
            </div>

            {/* Subcategory */}
            <div className="mb-4">
              <label htmlFor="subcategory" className="block text-gray-700 text-sm mb-1">
                Subcategory <span className="text-red-500">*</span>
              </label>
              <select
                id="subcategory"
                className="w-full sm:w-3/4 bg-white border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              >
                <option value="">Select subcategory</option>
                <option>Frontend Development</option>
                <option>Backend Development</option>
                <option>UI/UX Design</option>
                <option>SEO</option>
              </select>
            </div>

            {/* Upload Fields */}
            <UploadField id="portfolioUpload" label="Upload Portfolio" accept=".pdf,.doc,.docx" helper="Upload PDF or DOC only" />
            <UploadField id="aadharUpload" label="Upload Aadhar Card" accept=".pdf" helper="Upload PDF only" />
            <UploadField id="panUpload" label="Upload Pan Card" accept=".pdf" helper="Upload PDF only" />
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Add Experience</h2>
            <p className="text-gray-500 mb-5">
              Share your professional experience and notable projects.
            </p>
            <div className="mb-4">
              <label htmlFor="yearsOfExperience" className="block text-gray-700 text-sm font-regular mb-1">
                Years of Experience *
              </label>
              <select
                id="yearsOfExperience"
                className="w-full sm:w-3/4 bg-white text-sm font-regular border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              >
                <option value="">Select Years</option>
                <option>0-1 Year</option>
                <option>2-5 Years</option>
                <option>6-10 Years</option>
                <option>10+ Years</option>
              </select>
            </div>
            <div className="mb-6">
              <label htmlFor="notableProjects" className="block text-gray-700 text-sm font-regular mb-1">
                Notable Projects (Optional)
              </label>
              <textarea
                id="notableProjects"
                placeholder="Describe your most impactful projects or achievements."
                className="w-full sm:w-3/4 border text-sm font-regular border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                rows={4}
              />
            </div>
          </div>
        )}

        {/* Next Button */}
        <button
          onClick={nextStep}
          className="w-full sm:w-3/4 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg mt-4 text-base font-medium transition duration-200"
        >
          {step === 1
            ? "Next: Basic Information"
            : step === totalSteps
              ? "Proceed to Enrollment"
              : "Next"}
        </button>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-[600px] w-full sm:w-3/4 text-center shadow-lg">
            <h2 className="text-3xl font-bold text-black-800 mb-3">
              Secure Your Spot for <br />Just ₹499!
            </h2>
            <p className="text-gray-900 mb-5 flex items-left text-left text-sm">
              One-time registration fee ensures only serious professionals join our elite network.
            </p>
            <p className="text-gray-900 mb-5 flex items-left text-left text-sm">
              After payment, you’ll unlock:
            </p>
            <ul className="text-left text-sm text-gray-700 mb-6 space-y-3">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Access to first round of testing
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Technical evaluation round
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Dedicated onboarding support
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Recognized as Top 1% Indian Talent
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Work with High-Value International Clients
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Earn in Dollars, Spend in Rupees
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Exclusive Access to Elite Talent Pool
              </li>
            </ul>
            <button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg text-lg font-sm transition duration-200"
              onClick={() => navigate("/welcome")}
            >
              Continue to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
