import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Images from "../../assets/Images"; // <-- import your Images file

const RateClientPopup = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return; // ensure rating selected
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg border border-gray-300">
        {/* ---------- STEP 1: Rate & Review ---------- */}
        {!submitted ? (
          <>
            <h2 className="text-xl font-semibold text-center mb-2">
              Rate & Review Your Client
            </h2>
            <p className="text-gray-500 text-center mb-6">
              Share your experience working with this client. Your feedback helps us maintain a trusted community.
            </p>

            {/* Stars */}
            <div className="text-center">

                <h4 className="text-sm ">Rate your Experience</h4>
            <div className="flex  justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-3xl transition-colors ${
                    (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(null)}
                />
              ))}
            </div>
            </div>

            {/* Review textarea */}
            <label className="mb-1">Write Your Review</label>
            <textarea
              className="w-full border border-gray-400 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
              rows="3"
              placeholder="Describe your experience with this client..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />

            {/* Buttons */}
            <div className="flex justify-between gap-3">
              <button
                className="w-full py-2 border border-gray-400 rounded-lg"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="w-full py-2 text-white rounded-lg bg-gradient-to-r from-[#459CE1] to-[#D11AE7]"
              >
                Submit Review
              </button>
            </div>
          </>
        ) : (
          /* ---------- STEP 2: Thank You ---------- */
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">
              Thank You For Your Feedback!
            </h2>
            <img
              src={Images.ThankYouClient}
              alt="rating"
              className="mx-auto w-56 h-40 mb-4"
            />
            <p className="text-gray-500 mb-6">
              Your review has been submitted successfully and will help improve the community experience.
            </p>
            <button
              onClick={onClose}
              className="w-full py-2 text-white rounded-lg bg-gradient-to-r from-[#459CE1] to-[#D11AE7]"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RateClientPopup;
