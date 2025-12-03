import React, { useState, useEffect } from "react";
import Images from "../../assets/Images";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

const TechnicalRound = () => {
  const [loading, setLoading] = useState(true);
  const [interviewStatus, setInterviewStatus] = useState(null);
  const [interviewResult, setInterviewResult] = useState(null);
  const [startingInterview, setStartingInterview] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInterviewStatus();
  }, []);

  const fetchInterviewStatus = async () => {
    try {
      const token = sessionStorage.getItem("userToken") || localStorage.getItem("token");
      
      const res = await fetch(`${API_BASE}/api/interview/status`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      
      const json = await res.json();
      
      if (json.ok) {
        setInterviewStatus(json.interview_status);
        setInterviewResult(json.result);
        
        // If interview URL exists and status is pending, store it
        if (json.interview_url) {
          sessionStorage.setItem("interviewUrl", json.interview_url);
        }
      }
    } catch (err) {
      console.error("Error fetching interview status:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartInterview = async () => {
    setStartingInterview(true);
    
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
        toast.success("Interview session created! Redirecting...");
        sessionStorage.setItem("interviewUrl", json.interview_url);
        sessionStorage.setItem("interviewId", json.unique_id);
        window.location.href = json.interview_url;
      } else {
        toast.error(json.message || "Failed to create interview session");
      }
    } catch (err) {
      console.error("Error creating interview:", err);
      toast.error("Error connecting to interview service");
    } finally {
      setStartingInterview(false);
    }
  };

  const resumeInterview = () => {
    const url = sessionStorage.getItem("interviewUrl");
    if (url) {
      window.location.href = url;
    } else {
      toast.error("Interview URL not found. Please contact support.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <svg className="animate-spin h-12 w-12 text-purple-500" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <p className="mt-4 text-gray-600">Loading interview status...</p>
      </div>
    );
  }

  // Interview completed - show results
  if (interviewStatus === "completed" && interviewResult) {
    const passed = interviewResult.overall_score >= 70;
    
    return (
      <div className="flex flex-col items-center justify-center py-10 px-4">
        <div className="bg-white w-full max-w-2xl text-center">
          <h1 className="text-2xl sm:text-4xl mb-6">Technical Round Results</h1>
          
          {/* Score Card */}
          <div className={`rounded-2xl p-8 mb-6 ${passed ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className={`text-6xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {interviewResult.overall_score}%
            </div>
            <div className={`text-lg font-medium ${passed ? 'text-green-700' : 'text-red-700'}`}>
              {passed ? '✓ Passed' : '✗ Did not pass'}
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">{interviewResult.technical_score || '-'}%</div>
              <div className="text-sm text-gray-600">Technical</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{interviewResult.communication_score || '-'}%</div>
              <div className="text-sm text-gray-600">Communication</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600">{interviewResult.problem_solving_score || '-'}%</div>
              <div className="text-sm text-gray-600">Problem Solving</div>
            </div>
          </div>

          {/* Summary */}
          {interviewResult.summary && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-800 mb-2">Summary</h3>
              <p className="text-gray-600">{interviewResult.summary}</p>
            </div>
          )}

          {/* Strengths & Improvements */}
          <div className="grid md:grid-cols-2 gap-4 mb-6 text-left">
            {interviewResult.strengths?.length > 0 && (
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">💪 Strengths</h3>
                <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                  {interviewResult.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {interviewResult.improvements?.length > 0 && (
              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">📈 Areas to Improve</h3>
                <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                  {interviewResult.improvements.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Duration */}
          {interviewResult.duration_minutes && (
            <p className="text-sm text-gray-500 mb-6">
              Interview Duration: {interviewResult.duration_minutes} minutes
            </p>
          )}

          {passed ? (
            <div className="space-y-4">
              <p className="text-green-600 font-medium">
                🎉 Congratulations! You've passed the technical round!
              </p>
              <p className="text-gray-600">
                Our team will contact you shortly for the next steps.
              </p>
              <button
                onClick={() => navigate("/")}
                className="w-full max-w-xs bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                Back to Home
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">
                Don't worry! You can improve your skills and try again.
              </p>
              <button
                onClick={() => navigate("/")}
                className="w-full max-w-xs bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Interview pending - show resume option
  if (interviewStatus === "pending") {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="bg-white w-full text-center pt-10 flex flex-col justify-center items-center max-w-xl">
          <h1 className="text-2xl sm:text-4xl mb-4">Interview In Progress</h1>
          <img
            src={Images.WelcomeToTechnical}
            alt="Interview"
            className="mx-auto w-[300px] mb-6"
          />
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800">
              You have an interview session in progress. Click below to continue.
            </p>
          </div>
          <button
            onClick={resumeInterview}
            className="w-[300px] bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Resume Interview
          </button>
        </div>
      </div>
    );
  }

  // Not started - show start option
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="bg-white w-full text-center pt-10 flex flex-col justify-center items-center max-w-xl">
        <h1 className="text-2xl sm:text-4xl mb-4">Technical Round</h1>
        <h2 className="text-lg text-gray-600 mb-6">AI-Powered Interview</h2>
        <img
          src={Images.WelcomeToTechnical}
          alt="Technical Round"
          className="mx-auto w-[300px] mb-6"
        />
        
        <div className="bg-purple-50 rounded-lg p-6 mb-6 text-left max-w-md">
          <h3 className="font-semibold text-purple-800 mb-3">What to Expect:</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-500">✓</span>
              15-20 minute AI-powered interview
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">✓</span>
              Technical questions based on your expertise
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">✓</span>
              Problem-solving scenarios
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">✓</span>
              Instant feedback after completion
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-600">
          <p>⚠️ Make sure you have a working microphone and camera before starting.</p>
        </div>
        
        <button
          onClick={handleStartInterview}
          disabled={startingInterview}
          className="w-[300px] bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
        >
          {startingInterview ? (
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
  );
};

export default TechnicalRound;
