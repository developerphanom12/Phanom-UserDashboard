import React, { useState } from "react";
import ReactPlayer from "react-player";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";
import { FaPlay, FaPause } from "react-icons/fa";

const VideoSection = ({bg}) => {
  const videos = [
  { src: "https://www.youtube.com/watch?v=TEm701PQb9U", title: "Vaishnavi Khadi", name: "Mr. Puneet Gaba" },
  { src: "https://www.youtube.com/watch?v=62QxQRt7Yr4", title: "Youngistan Tattoos", name: "Mr. Vishal Manhas" },
  { src: "https://www.youtube.com/watch?v=Y083KfXfEQk", title: "Shop Closed", name: "Mr. Thomas" },
];


  const [activeIndex, setActiveIndex] = useState(1); // Which video is playing

  return (
    <section className={`sm:h-[715px] ${bg ?"bg-white"  : "bg-gradient-to-b from-[#F8F6FE] to-[#8E59E2]"}  sm:py-10 py-18 px-[13px] flex flex-col items-center justify-start overflow-hidden `}>
      <h1 className="sm:text-[48px] text-[25px] text-left font-sauce font-bold text-[#8E59E2] w-[90%] mb-10">
        Real Stories, Real Impact: Our User's Shares Their Experience
      </h1>
      <div className="flex md:flex-row flex-col gap-6 w-full justify-center items-center">
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            index={index}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            src={video.src}
            title={video.title}
            name={video.name}
          />
        ))}
      </div>
    </section>
  );
};

const VideoCard = ({ src, index, activeIndex, setActiveIndex, title , name }) => {
  const [muted, setMuted] = useState(true);
  const isPlaying = activeIndex === index;

  const toggleMute = () => setMuted((prev) => !prev);

  const togglePlay = () => {
    if (isPlaying) {
      setActiveIndex(null); // Stop playing
    } else {
      setActiveIndex(index); // Play this video
    }
  };

  return (
    <div className="flex flex-col items-center">
     <div
  onClick={togglePlay}
  className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 ${
    isPlaying ? "w-[320px] h-[420px]" : "w-[250px] h-[350px]"
  }`}
>
  <div className="relative w-full h-full">
    <ReactPlayer
      url={src}
      playing={isPlaying}
      muted={muted}
      loop
      controls={false}
      width="100%"
      height="100%"
      className="!absolute !top-0 !left-0 !w-full !h-full"
    />
  </div>

        {/* Play/Pause Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            className="bg-black bg-opacity-50 text-white p-3 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>

        {/* Mute/Unmute Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          className="absolute bottom-4 right-4 text-white p-2"
        >
          {muted ? <HiOutlineSpeakerXMark size={20} /> : <HiOutlineSpeakerWave size={20} />}
        </button>
      </div>

      <div className="text-white flex flex-col justify-center items-center mt-3">
        <h1 className="text-[24px] font-bold">{name}</h1>
        <p className="text-[18px] font-normal">{title}</p>
      </div>
    </div>
  );
};

export default VideoSection;
