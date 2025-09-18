import { useState } from "react";
import Images from "../../assets/Images";

const WorkReviewPopup = ({ onClose }) => {
  const [showCongratsModal, setShowCongratsModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCongratsModal(true);
  };

  const handleClose = () => {
    setShowCongratsModal(false);
    onClose();
  };

  return (
    <div>
      {/* Submit Work For Review Modal */}
      {!showCongratsModal && (
        <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 border">
          <div className="bg-white p-6 rounded-lg w-[90%] md:w-[450px] shadow-lg border border-gray-300 ">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">Submit Work For Review</h2>
              <p className="text-gray-500 mb-4">
                Upload Your Work And Send It For Client Approval.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Milestone */}
              <div>
                <label className="block text-sm mb-1">Milestone</label>
                <input
                  type="text"
                  value="Product Page Design"
                  readOnly
                  className="w-full border border-gray-300 p-2 rounded-md text-sm"
                />
              </div>

              {/* Upload */}
              <div>
                <label className="block text-sm mb-1">Attach Files</label>
                <input
                  type="file"
                  className="w-full border border-gray-300 p-2 rounded-md text-sm"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm mb-1">Message</label>
                <textarea
                  placeholder="Please find attached the draft version of the Product Page."
                  className="w-full border border-gray-300 p-2 rounded-md text-sm"
                  rows={3}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-between gap-3 mt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm w-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md text-sm text-white bg-gradient-to-r from-[#459CE1] to-[#D11AE7] w-full"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Congratulations Modal */}
      {showCongratsModal && (
        <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] md:w-[450px] shadow-lg text-center relative border border-gray-300">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <img
              src={Images.Congratulations2}
              alt="Celebration"
              className="w-44 mx-auto mb-4"
            />
            <h2 className="text-xl font-bold mb-2">Congratulations!</h2>
            <p className="text-gray-600 text-sm">
              Thank you for submitting the application. <br />
              The Phanom team will connect with you very soon.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkReviewPopup;
