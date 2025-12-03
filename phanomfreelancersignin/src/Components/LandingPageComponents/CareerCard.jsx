import React from "react";
import Images from "../../assets/Images";

function CareerCard({ career }) {
  const { title = [], desc = "", img = "", skills = [] } = career;

  return (
    <div className="bg-[#F3F0E9] rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 hover:bg-[#E0CEFF] cursor-pointer">
      
      {/* Skills badges and badge icon */}
      <div className="flex justify-between items-start p-3 mt-4">
        <div className="flex flex-wrap gap-2">
          {skills && skills.length > 0 ? (
            skills.map((skill, index) => (
              <p
                key={index}
                className="bg-white text-[#000000] text-sm px-4 py-1 rounded-full border border-gray-300 drop-shadow-sm"
              >
                {skill}
              </p>
            ))
          ) : (
            <>
              <p className="bg-white text-[#000000] px-4 py-1 rounded-full border border-gray-300 drop-shadow-sm">
                Skill 1
              </p>
              <p className="bg-white text-[#000000] px-4 py-1 rounded-full border border-gray-300 drop-shadow-sm">
                Skill 2
              </p>
            </>
          )}
        </div>

        <div className="mr-2">
          <img
            src={Images.Badge}
            alt="badge"
            className="h-[22px] w-[40px] mt-2"
          />
        </div>
      </div>

      {/* Title and description */}
      <div className="px-4 pb-3">
        <h3 className="text-lg md:text-xl font-semibold mb-1 leading-tight">
          {title[0]} <br /> {title[1]}
        </h3>
        <p className="text-[#000000] text-sm md:text-base line-clamp-2">
          {desc}
        </p>
      </div>

      {/* Image */}
      <img
        src={img}
        alt={title.join(" ")}
        className="w-full h-[230px] object-cover rounded-b-2xl"
      />
    </div>
  );
}

export default CareerCard;
