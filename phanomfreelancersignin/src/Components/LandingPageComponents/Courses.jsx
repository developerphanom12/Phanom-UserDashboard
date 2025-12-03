import React from "react";
import Images from "../../assets/Images";

function Courses() {
  return (
    <div className="bg-[#F7F7F7] sm:h-[440px] w-full mt-14 display flex flex-col sm:flex-row  justify-between cursor-pointer">
      <div className="py-12 px-4 md:px-8 lg:px-16">
        <img src={Images.Logo} alt="phanomLogo" />
        <h3 className="font-bold text-xl sm:text-xl md:text-2xl lg:text-3xl py-4">
          Platform that specially Designed <br /> for Top 1% Professionals!
        </h3>
        <p>Join India's Top 1% Professionals Community.</p>
        <div className="flex mt-3 gap-2">

        <img src={Images.Badge} className="h-6 w-6" alt="badge" />
        <h2 className="bg-gradient-to-r from-[#4899E1] via-[#9A4DE4] to-[#D019E4] bg-clip-text text-transparent font-bold">Phanom verified</h2>
        </div>
      </div>
      <div className="h-full flex justify-end">
        <img src={Images.GroupImage} alt="groupimages" />
      </div>
    </div>
  );
}

export default Courses;
