import { useRef } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ScrollButton from "./scrollButton";
import sampleDoctors from "../constants/doctors";
import IconButton from "@mui/material/IconButton";

const TopDoc = () => {
  const doctors = sampleDoctors;
  const carouselRef = useRef(null);

  const handleScroll = (offset) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  if (!doctors || doctors.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        No doctors available at the moment.
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-indigo-900">
          Top Rated <span className="doc-highlight text-cyan-700">Doctors</span>{" "}
          Near You
        </h3>
        <a href="#" className="text-sm text-blue-600 hover:underline">
          View All
        </a>
      </div>

      <div className="relative">
        {/* Left Scroll */}
        <ScrollButton direction="left" onClick={() => handleScroll(-600)} className="left-0"/>

        {/* Doctor List */}
        <div
          ref={carouselRef}
          className="flex space-x-6 overflow-x-auto pb-2 no-scrollbar scroll-smooth"
        >
          {doctors.map((d, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-64 bg-white rounded-xl shadow-md p-4 text-center hover:scale-105 transition-transform"
            >
              <img
                src={d.photo}
                alt="doc-photo"
                loading="lazy"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <div className="space-y-1">
                <div className="font-semibold text-gray-800">{d.name}</div>
                <div className="text-xs text-gray-500">
                  {d.specialization}, {d.location}
                </div>
              </div>
              <button
                onClick={() => alert(`Consulting ${d.name}`)}
                className="mt-4 w-full border border-[#10217D] text-[#10217D] text-sm font-medium py-2 rounded hover:bg-indigo-50"
              >
                Consult Now
              </button>
            </div>
          ))}
        </div>

        {/* Right Scroll */}
        <ScrollButton direction="right" onClick={() => handleScroll(600)} className="right-0"/>
      </div>
    </div>
  );
};

export default TopDoc;
