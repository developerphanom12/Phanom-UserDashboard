import React from "react";
import Images from "../../assets/Images";
import { useNavigate } from "react-router-dom";

const Fail = () => {
  const navigate = useNavigate();
  
  // Get score from sessionStorage
  const score = sessionStorage.getItem("testScore") || "0";
  const correctAnswers = sessionStorage.getItem("correctAnswers") || "0";
  const totalQuestions = sessionStorage.getItem("totalQuestions") || "20";

  return (
    <div className="flex flex-col items-center justify-center py-20  ">
      {/* Page Section */}
      <div className="bg-white w-full text-center">
        <h1 className="text-2xl sm:text-5xl mb-4">Your Score</h1>
        <img
          src={Images.YourScoreFail}
          alt="Test Failed"
          className="mx-auto mb-6 w-[300px]"
        />
        <p className="text-[#DA0E04] mb-2 text-2xl">You scored {score}%</p>
        <p className="text-gray-500 text-sm mb-2">({correctAnswers} out of {totalQuestions} correct)</p>
        <p className="text-gray-800 font-medium mb-6">
         <span className="text-[#DA0E04] "> Oops! </span>You didn't score well. Take time to improve your skills and try again for better performance. <br />
         <span className="text-gray-500 text-sm">(Passing score is 80%)</span>
        </p>
        <button
          onClick={() => navigate("/")}
          className="w-[400px] bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Fail;
