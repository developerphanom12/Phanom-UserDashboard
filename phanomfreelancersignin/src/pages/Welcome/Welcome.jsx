import React, { useState, useEffect } from "react";
import Images from "../../assets/Images"; // <-- apne Images file ka path sahi karo
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

const Welcome = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quizAvailable, setQuizAvailable] = useState(null);
  const [quizInfo, setQuizInfo] = useState(null);
  const [userData, setUserData] = useState({
    userName: sessionStorage.getItem("userName") || "",
    userEmail: sessionStorage.getItem("userEmail") || "",
    userId: sessionStorage.getItem("userId") || "",
  });
  const navigate = useNavigate();

  // Fetch user data from API if not in sessionStorage
  useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem("userToken") || localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE}/api/freelancer/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.user) {
          setUserData({
            userName: data.user.name || "",
            userEmail: data.user.email || "",
            userId: data.user.id || "",
          });
          // Also store in sessionStorage for other pages
          sessionStorage.setItem("userName", data.user.name || "");
          sessionStorage.setItem("userEmail", data.user.email || "");
          sessionStorage.setItem("userId", data.user.id || "");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    if (!userData.userName) {
      fetchUserData();
    }
  }, []);

  // Check if quiz is available when clicking Start Test
  const handleStartTest = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/quiz/available`);
      const data = await res.json();
      
      if (data.available) {
        // Quiz is available, show popup and store quiz data
        setQuizAvailable(true);
        setQuizInfo(data.quiz);
        sessionStorage.setItem("quizData", JSON.stringify(data));
        setShowPopup(true);
      } else {
        // No quiz available, go directly to interview
        setQuizAvailable(false);
        setShowPopup(true);
      }
    } catch (err) {
      console.error("Error checking quiz availability:", err);
      // On error, assume no quiz and go to interview
      setQuizAvailable(false);
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = () => {
    if (quizAvailable) {
      navigate("/first-round-test");
    } else {
      // Skip test and go directly to interview
      navigate("/interview");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 ">
      {/* Page Section */}
      <div className="bg-white w-full text-center pt-10">
        <h1 className="text-2xl sm:text-5xl mb-4">Welcome {userData.userName || "User"}!</h1>
        <img
          src={Images.PaymentApproved}
          alt="Payment Approved"
          className="mx-auto mb-6 w-[400px]"
        />
        <p className="text-gray-600 mb-2">Payment successful.</p>
        <p className="text-gray-800 font-medium mb-6">
          You're now ready for the First Round MCQ Test. <br /> Good luck!
        </p>
        <button
          onClick={handleStartTest}
          disabled={loading}
          className="w-[400px] bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Checking..." : "Start Test"}
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full relative">
            {quizAvailable ? (
              <>
                <h2 className="text-lg font-bold mb-4 text-center">
                  {quizInfo?.title || "First Round Test Instructions"}
                </h2>
                <img
                  src={Images.FirstRoundTest}
                  alt="Instructions"
                  className="mx-auto mb-4 w-40"
                />
                {quizInfo?.description && (
                  <p className="text-gray-600 text-sm text-center mb-4">{quizInfo.description}</p>
                )}
                <div className="flex justify-center gap-4 text-sm text-gray-600 mb-4">
                  <span>📝 {quizInfo?.total_questions || 0} Questions</span>
                  <span>⏱️ {Math.floor((quizInfo?.total_duration || 0) / 60)}m</span>
                  <span>⭐ {quizInfo?.total_marks || 0} Marks</span>
                </div>
                <ul className="text-gray-700 text-sm space-y-2 mb-6">
                  <li>• Do not switch tabs or screens</li>
                  <li>• Complete within given time</li>
                  <li>• Passing Score: 80%</li>
                </ul>
                <button
                  onClick={handleProceed}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg w-full transition"
                >
                  Start Now
                </button>
              </>
            ) : (
              <>
                <h2 className="text-lg font-bold mb-4 text-center">
                  Proceed to AI Interview
                </h2>
                <img
                  src={Images.FirstRoundTest}
                  alt="Interview"
                  className="mx-auto mb-4 w-40"
                />
                <p className="text-gray-600 text-sm text-center mb-4">
                  No MCQ test is currently configured. You will proceed directly to the AI-powered technical interview.
                </p>
                <ul className="text-gray-700 text-sm space-y-2 mb-6">
                  <li>• Ensure good internet connection</li>
                  <li>• Allow camera and microphone access</li>
                  <li>• Find a quiet place for the interview</li>
                </ul>
                <button
                  onClick={handleProceed}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg w-full transition"
                >
                  Start AI Interview
                </button>
              </>
            )}
            <button
              onClick={() => setShowPopup(false)}
              className="mt-3 text-gray-500 hover:text-gray-700 text-sm w-full text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;
