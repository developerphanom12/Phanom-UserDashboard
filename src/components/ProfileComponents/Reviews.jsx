import React, { useState } from "react";
import { FaStar, FaThumbsDown, FaThumbsUp } from "react-icons/fa";

const Reviews = () => {
  const allReviews = [
    {
      id: 1,
      name: "cmr_cmr",
      role: "Website Developer",
      rating: 5,
      daysAgo: 6,
      text: "I put my feedback below and Fiverrs AI Generated Feedback. I wanted my feedback to stay so pasted their AI feedback. It's true. My feedback: He took a concept and far exceeded our expectations. He has produced the best product we've had so far, in a faster time line, with more functionality, better lorem ipsum. . It's true. My feedback: He took a concept and far exceeded our expectations. He has produced the best product we've had so far, in a faster time line, with more functionality, better lorem ipsum.",
      price: "₹4000 – ₹5000",
      duration: "6 days",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 2,
      name: "John Doe",
      role: "Frontend Engineer",
      rating: 4,
      daysAgo: 10,
      text: "Great work, very responsive and delivered on time. Code quality is good and easy to maintain.. It's true. My feedback: He took a concept and far exceeded our expectations. He has produced the best product we've had so far, in a faster time line, with more functionality, better lorem ipsum.. It's true. My feedback: He took a concept and far exceeded our expectations. He has produced the best product we've had so far, in a faster time line, with more functionality, better lorem ipsum.",
      price: "₹3000 – ₹4500",
      duration: "5 days",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
  ];

  const [visibleCount, setVisibleCount] = useState(1);
  const [expandedReview, setExpandedReview] = useState(null); // Track expanded review

  return (
    <div className=" space-y-8">
      <h3 className="text-2xl font-semibold mb-4">Reviews</h3>

      {allReviews.slice(0, visibleCount).map((review) => {
        const isExpanded = expandedReview === review.id;
        return (
          <div key={review.id}>
            {/* Review Card */}
            <div className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white w-full">
              {/* Top header */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{review.name}</h3>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>

              <hr className="my-3 text-gray-300" />

              {/* Rating + days ago */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="flex text-yellow-500">
                  {Array(review.rating)
                    .fill()
                    .map((_, i) => (
                      <FaStar key={i} />
                    ))}
                </div>
                <span className="text-gray-700 font-medium">
                  {review.rating}
                </span>
                <span className="text-gray-400">• {review.daysAgo} days ago</span>
              </div>

              {/* Review text */}
              <p
                className={`mt-3 text-gray-700 leading-relaxed text-sm ${
                  !isExpanded ? "line-clamp-2" : ""
                }`}
              >
                {review.text}
              </p>
              <button
                onClick={() =>
                  setExpandedReview(isExpanded ? null : review.id)
                }
                className="text-blue-600 flex justify-end w-full cursor-pointer underline text-sm mt-1"
              >
                {isExpanded ? "See less" : "See more"}
              </button>

              {/* Price & Duration */}
              <div className="flex gap-10 mt-5">
                <div>
                  <p className="font-semibold">{review.price}</p>
                  <p className="text-gray-500 text-sm">Price</p>
                </div>
                <div>
                  <p className="font-semibold">{review.duration}</p>
                  <p className="text-gray-500 text-sm">Duration</p>
                </div>
              </div>
            </div>

            {/* Helpful section - outside card */}
            <div className="mt-2 text-sm text-gray-500 flex gap-3 px-2">
              <span>Helpful?</span>
              <button className="hover:text-black flex gap-2 justify-center"><FaThumbsUp
              className="mt-1"/>Yes</button>
              <button className="hover:text-black flex gap-2 justify-center"><FaThumbsDown className="mt-1"/>No</button>
            </div>
          </div>
        );
      })}

      {/* See More Button (left aligned) */}
      {visibleCount < allReviews.length && (
        <div>
          <button
            onClick={() => setVisibleCount((prev) => prev + 1)}
            className="mt-2 px-6 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200"
          >
            See More Reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
