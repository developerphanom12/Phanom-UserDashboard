import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_BASE } from "../../utils/api";
import Images from "../../assets/Images";

const Interview = () => {
  const [interviewUrl, setInterviewUrl] = useState(null);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [saving, setSaving] = useState(false);
  const iframeRef = useRef(null);
  const navigate = useNavigate();

  // Save interview results to backend
  const saveInterviewResults = async (feedbackData) => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const interviewId = sessionStorage.getItem("interviewId");
      
      const response = await fetch(`${API_BASE}/api/interview/save-results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          interview_id: interviewId,
          feedback: feedbackData,
        }),
      });

      if (response.ok) {
        toast.success("Interview results saved!");
      } else {
        console.error("Failed to save interview results");
      }
    } catch (error) {
      console.error("Error saving interview results:", error);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const initInterview = async () => {
      // Get interview URL from session storage
      let url = sessionStorage.getItem("interviewUrl");
      
      if (!url) {
        // No URL in storage, create a new interview session
        try {
          const token = localStorage.getItem("token") || sessionStorage.getItem("userToken");
          if (!token) {
            toast.error("Please log in first");
            navigate("/login");
            return;
          }

          toast.loading("Preparing interview...");
          const response = await fetch(`${API_BASE}/api/interview/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();
          toast.dismiss();

          if (data.ok && data.interview_url) {
            url = data.interview_url;
            sessionStorage.setItem("interviewUrl", url);
            sessionStorage.setItem("interviewId", data.interview_id);
          } else {
            toast.error(data.message || "Failed to create interview");
            navigate("/welcome");
            return;
          }
        } catch (error) {
          toast.dismiss();
          console.error("Error creating interview:", error);
          toast.error("Error creating interview session");
          navigate("/welcome");
          return;
        }
      }

      if (url) {
        setInterviewUrl(url);
      }
    };

    initInterview();

    // Listen for postMessage from MockTrail iframe
    const handleMessage = (event) => {
      // Accept messages from MockTrail domains
      if (event.origin.includes("mocktrail.app") || event.origin.includes("mocktrail.com")) {
        console.log("MockTrail postMessage received:", event.data);
        
        const data = event.data;
        
        // Check for interview completion signals
        if (data.type === "interview_complete" || data.type === "interview_ended" || 
            data.event === "interview_complete" || data.status === "completed") {
          setInterviewComplete(true);
          
          // If feedback data is included in the message
          if (data.feedback || data.data) {
            const feedbackData = data.feedback || data.data;
            setFeedback(feedbackData);
            saveInterviewResults(feedbackData);
          }
        }
        
        // Handle feedback data directly
        if (data.technicalScore !== undefined || data.overallScore !== undefined) {
          setFeedback(data);
          setInterviewComplete(true);
          saveInterviewResults(data);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    // Cleanup
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate]);

  // Poll for URL changes (backup detection method)
  useEffect(() => {
    if (!interviewUrl) return;

    const checkInterval = setInterval(() => {
      try {
        const iframe = iframeRef.current;
        if (iframe) {
          // Try to detect if iframe navigated to thank you page
          // Note: This may not work due to cross-origin restrictions
          const currentUrl = iframe.contentWindow?.location?.href;
          if (currentUrl && (currentUrl.includes("thank") || currentUrl.includes("complete"))) {
            setInterviewComplete(true);
            clearInterval(checkInterval);
          }
        }
      } catch (e) {
        // Cross-origin restriction - expected
      }
    }, 2000);

    return () => clearInterval(checkInterval);
  }, [interviewUrl]);

  if (!interviewUrl) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading interview...</p>
        </div>
      </div>
    );
  }

  // Show completion screen if interview is done
  if (interviewComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Interview Complete!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for completing your AI interview. Your results have been recorded.
          </p>
          
          {feedback && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-700 mb-2">Quick Summary</h3>
              {feedback.overallScore !== undefined && (
                <p className="text-sm text-gray-600">Overall Score: <span className="font-bold text-purple-600">{feedback.overallScore}%</span></p>
              )}
              {feedback.recommendation && (
                <p className="text-sm text-gray-600 mt-1">Recommendation: <span className="font-semibold">{feedback.recommendation}</span></p>
              )}
            </div>
          )}

          {saving && (
            <p className="text-sm text-gray-500 mb-4">Saving your results...</p>
          )}

          <button
            onClick={() => navigate("/")}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const NAVBAR_HEIGHT = 70; // Height of your navbar
  const MOCKTRAIL_HEADER_HEIGHT = 60; // Height of MockTrail header to hide

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
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Project Navbar */}
      <nav
        style={{
          height: NAVBAR_HEIGHT,
          background: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          flexShrink: 0,
          zIndex: 100,
        }}
      >
        <a href="https://www.phanomprofessionals.com/">
          <img
            src={Images.Logo}
            alt="Phanom Professionals"
            style={{ height: 45, objectFit: 'contain' }}
          />
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: '#6b7280', fontSize: 14 }}>AI Technical Interview</span>
          <div style={{
            background: 'linear-gradient(to right, #459CE1, #D11AE7)',
            color: '#fff',
            padding: '6px 16px',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
          }}>
            In Progress
          </div>
        </div>
      </nav>

      {/* Iframe Container - clips the MockTrail header */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <iframe
          ref={iframeRef}
          src={interviewUrl}
          style={{
            width: '100%',
            height: `calc(100% + ${MOCKTRAIL_HEADER_HEIGHT}px)`,
            border: 'none',
            position: 'absolute',
            top: -MOCKTRAIL_HEADER_HEIGHT, // Shift iframe up to hide MockTrail header
            left: 0,
          }}
          allow="camera; microphone; display-capture; autoplay"
          allowFullScreen
          title="AI Interview"
        />
      </div>
    </div>
  );
};

export default Interview;

