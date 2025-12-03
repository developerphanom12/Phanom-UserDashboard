import React, { useState } from "react";
import Images from "../../assets/Images";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

const Pass = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [interviewUrl, setInterviewUrl] = useState(null);
  const [showInterview, setShowInterview] = useState(false);
  const navigate = useNavigate();
  
  // Get score from sessionStorage
  const score = sessionStorage.getItem("testScore") || "80";
  const correctAnswers = sessionStorage.getItem("correctAnswers") || "16";
  const totalQuestions = sessionStorage.getItem("totalQuestions") || "20";

  const handleStartInterview = async () => {
    setLoading(true);
    
    try {
      const token = sessionStorage.getItem("userToken") || localStorage.getItem("token");
      
      const res = await fetch(`${API_BASE}/api/interview/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      
      const json = await res.json();
      
      if (json.ok && json.interview_url) {
        toast.success("Interview session created!");
        // Store interview info
        sessionStorage.setItem("interviewUrl", json.interview_url);
        sessionStorage.setItem("interviewId", json.unique_id);
        // Show interview in iframe
        setInterviewUrl(json.interview_url);
        setShowInterview(true);
        setShowPopup(false);
      } else {
        toast.error(json.message || "Failed to create interview session");
        navigate("/technicalround");
      }
    } catch (err) {
      console.error("Error creating interview:", err);
      toast.error("Error connecting to interview service");
      navigate("/technicalround");
    } finally {
      setLoading(false);
    }
  };

  // Show full-screen interview iframe
  if (showInterview && interviewUrl) {
    return (
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
          width: '100vw',
          height: '100vh',
          background: '#fff',
        }}
      >
        <iframe
          src={interviewUrl}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          allow="camera; microphone; display-capture; autoplay"
          allowFullScreen
          title="AI Interview"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Page Section */}
      <div className="bg-white w-full text-center">
        <h1 className="text-2xl sm:text-5xl mb-4">Your Score</h1>
        <img
          src={Images.YourScorePass}
          alt="Payment Approved"
          className="mx-auto mb-6 w-[200px]"
        />
        <p className="text-[#00A859] mb-2 text-2xl">You scored {score}%</p>
        <p className="text-gray-500 text-sm mb-2">({correctAnswers} out of {totalQuestions} correct)</p>
        <p className="text-gray-800 font-medium mb-6">
         <span className="text-[#00A859]"> Great job!</span> Your score qualifies you for the next round – the Technical Round. <br />
        </p>
        <button
          onClick={() => setShowPopup(true)}
          className="w-[400px] bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Proceed to Technical Round
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-lg text-[#8E59E2] font-bold mb-4 text-center">
              Technical Round - AI Interview
            </h2>
            <img
              src={Images.WhatsNextPopup}
              alt="Instructions"
              className="mx-auto mb-4 w-40"
            />
            <div className="text-gray-700 text-sm space-y-3 mb-6">
              <p className="font-medium">What to expect:</p>
              <ul className="list-disc list-inside space-y-1 text-left">
                <li>15-20 minute AI-powered interview</li>
                <li>Technical questions based on your expertise</li>
                <li>Problem-solving scenarios</li>
                <li>Instant feedback after completion</li>
              </ul>
              <p className="text-xs text-gray-500 mt-3">
                Make sure you have a working microphone and camera.
              </p>
            </div>
            <button
              onClick={handleStartInterview}
              disabled={loading}
              className="bg-[#8E59E2] hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg w-full transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Starting Interview...
                </>
              ) : (
                "Start AI Interview"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pass;
