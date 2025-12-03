import React, { useState, useEffect, useRef } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

const Tests = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 1 hour
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const [quizTitle, setQuizTitle] = useState("AI-Generated Test");

  // ✅ Fetch questions - first check for dashboard quiz, then fallback to AI-generated
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // First, check if we have quiz data from Welcome page
        const storedQuizData = sessionStorage.getItem("quizData");
        if (storedQuizData) {
          const quizData = JSON.parse(storedQuizData);
          if (quizData.available && quizData.questions && quizData.questions.length > 0) {
            setQuizTitle(quizData.quiz?.title || "Assessment Test");
            setQuestions(quizData.questions);
            // Set timer based on quiz duration (default 1 hour)
            if (quizData.quiz?.total_duration) {
              setTimeLeft(quizData.quiz.total_duration);
            }
            setLoading(false);
            return;
          }
        }

        // Fallback: Fetch from API
        const token = sessionStorage.getItem("userToken") || localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated. Please log in first.");
          setLoading(false);
          return;
        }

        // Try to get dashboard quiz first
        const quizRes = await fetch(`${API_BASE}/api/quiz/available`);
        const quizData = await quizRes.json();
        
        if (quizData.available && quizData.questions && quizData.questions.length > 0) {
          setQuizTitle(quizData.quiz?.title || "Assessment Test");
          setQuestions(quizData.questions);
          if (quizData.quiz?.total_duration) {
            setTimeLeft(quizData.quiz.total_duration);
          }
          setLoading(false);
          return;
        }

        // No dashboard quiz, use AI-generated questions
        const res = await fetch(`${API_BASE}/api/user/questions`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await res.json();
        if (data.ok && Array.isArray(data.questions)) {
          setQuizTitle(data.testTitle || "AI-Generated Test");
          setQuestions(data.questions);
        } else {
          setError(data.message || "Failed to load questions.");
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Error connecting to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // 🕒 Timer logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Option selection
  const handleOptionClick = (index) => {
    setAnswers({ ...answers, [currentQuestion]: index });
  };

  const handleSubmit = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      questions.forEach((q, index) => {
        if (answers[index] === q.correct) {
          correctCount++;
        }
      });
      
      // Calculate actual score percentage
      const score = Math.round((correctCount / questions.length) * 100);
      const passed = score >= 80; // 80% passing score
      
      // Store score in sessionStorage for results page
      sessionStorage.setItem("testScore", score);
      sessionStorage.setItem("testPassed", passed);
      sessionStorage.setItem("correctAnswers", correctCount);
      sessionStorage.setItem("totalQuestions", questions.length);

      // Prepare detailed test responses for admin view
      const testResponses = questions.map((q, index) => ({
        question: q.question,
        options: q.options,
        userAnswer: answers[index] !== undefined ? answers[index] : null,
        correctAnswer: q.correct,
        isCorrect: answers[index] === q.correct,
      }));

      // Submit to backend and create interview
      setSubmitting(true);
      const token = sessionStorage.getItem("userToken") || localStorage.getItem("token");
      
      console.log("Token:", token);
      console.log("Creating interview...");
      
      try {
        // Save test results with detailed responses
        console.log("Saving test results...", {
          score,
          passed,
          correct_answers: correctCount,
          total_questions: questions.length,
          test_responses_count: testResponses.length,
        });
        
        const testResultsRes = await fetch(`${API_BASE}/api/user-progress/test-results`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            score,
            passed,
            correct_answers: correctCount,
            total_questions: questions.length,
            test_responses: testResponses,
          }),
        });
        
        const testResultsJson = await testResultsRes.json();
        console.log("Test results save response:", testResultsJson);
        
        if (!testResultsJson.ok) {
          console.error("Failed to save test results:", testResultsJson);
        }

        // Create interview session directly
        const interviewRes = await fetch(`${API_BASE}/api/interview/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log("Interview response status:", interviewRes.status);
        const interviewJson = await interviewRes.json();
        console.log("Interview response:", interviewJson);
        
        if (interviewJson.ok && interviewJson.interview_url) {
          console.log("SUCCESS! Saving URL and redirecting...");
          sessionStorage.setItem("interviewUrl", interviewJson.interview_url);
          sessionStorage.setItem("interviewId", interviewJson.unique_id);
          console.log("Redirecting to /interview NOW");
          window.location.replace("/interview");
          return; // Stop execution
        } else {
          console.error("Interview create failed:", interviewJson);
          alert("Failed: " + (interviewJson.message || "Unknown error"));
          setSubmitting(false);
        }
      } catch (err) {
        console.error("Error creating interview:", err);
        toast.error("Error: " + err.message);
        setSubmitting(false);
      }
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const formatTime = (secs) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, "0");
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -40, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 40, behavior: "smooth" });
  };

  // Handle scroll visibility
  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    checkScroll();
    scrollRef.current.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      scrollRef.current?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  // 🟢 Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading AI-generated questions...
      </div>
    );
  }

  // 🔴 Error State
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  // 🟡 No Questions
  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 font-medium">
        No questions available for your category/subcategory.
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  // ✅ UI Rendering
  return (
    <div className="flex justify-center items-center p-2 sm:p-6">
      <div className="bg-white w-full max-w-6xl p-4 sm:p-6">
        {/* Header */}
        <div className="w-full text-center border border-gray-200 rounded-lg py-3 mb-6">
          <span className="text-sm font-medium text-gray-700">
            {quizTitle}
            {currentQ.category ? ` (${currentQ.category}${currentQ.subcategory ? ` - ${currentQ.subcategory}` : ''})` : ''}
          </span>
        </div>

        {/* Navigation + Timer */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 gap-2 sm:gap-4">
          {showLeft && (
            <button
              onClick={scrollLeft}
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <GoChevronLeft size={18} />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-scroll hide-scrollbar flex-1 px-1 sm:px-2"
          >
            {questions.map((_, i) => (
              <div
                key={i}
                className={`min-w-[32px] sm:min-w-[36px] h-8 flex items-center justify-center rounded-lg cursor-pointer text-sm font-medium ${
                  i === currentQuestion
                    ? "bg-purple-500 text-white"
                    : answers[i] !== undefined
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
                onClick={() => setCurrentQuestion(i)}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {showRight && (
            <button
              onClick={scrollRight}
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <GoChevronRight size={18} />
            </button>
          )}

          {/* Timer */}
          <div className="bg-red-100 max-w-[160px] min-w-[140px] text-red-600 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap">
            Time Left <span className="font-bold">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Question + Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
            <p className="font-semibold mb-2">
              Question {currentQuestion + 1}:
            </p>
            <p className="text-gray-700">{currentQ.question}</p>
          </div>

          <div className="flex flex-col gap-2 sm:gap-3">
            {currentQ.options.map((option, i) => (
              <div
                key={i}
                onClick={() => handleOptionClick(i)}
                className={`cursor-pointer border rounded-lg px-4 py-2 sm:py-3 text-sm transition ${
                  answers[currentQuestion] === i
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {String.fromCharCode(65 + i)}) {option}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="flex justify-between">
            <button
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className="px-4 sm:px-6 py-2 rounded-lg border border-purple-300 text-purple-600 text-sm font-medium hover:bg-purple-50 disabled:opacity-50"
            >
              <span className="mr-1">&lt;</span> Prev
            </button>
            <button
              onClick={() =>
                currentQuestion < questions.length - 1 &&
                setCurrentQuestion(currentQuestion + 1)
              }
              disabled={currentQuestion === questions.length - 1}
              className="px-4 sm:px-6 py-2 rounded-lg border border-purple-300 text-purple-600 text-sm font-medium hover:bg-purple-50 disabled:opacity-50"
            >
              Next <span className="ml-1">&gt;</span>
            </button>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={answers[currentQuestion] === undefined || submitting}
              className={`px-6 sm:px-8 py-2 rounded-lg text-sm font-medium ${
                answers[currentQuestion] !== undefined && !submitting
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {submitting
                ? "Submitting..."
                : currentQuestion === questions.length - 1
                ? "Submit Test"
                : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tests;
