import { useRef } from "react";
import ScrollButton from "./scrollButton.jsx";
import healthCarePrograms from "../constants/programs.js";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const Programs = () => {
  const samplePrograms = healthCarePrograms;
  const carouselRef = useRef(null);

  const handleScroll = (offset) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  if (!samplePrograms || samplePrograms.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No healthcare programs available at the moment.
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-cyan-700">
          Healthcare <span className="text-indigo-900">Programs</span>
        </h3>
        <a href="#" className="text-sm text-blue-600 hover:underline">
          View All
        </a>
      </div>

      <div className="relative">
        <div
          ref={carouselRef}
          className="flex space-x-6 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar scroll-smooth bg-white"

        >
          {samplePrograms.map((p, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-56 bg-white border border-gray-200 shadow-md p-4 rounded-lg"
            >
              <img
                src={p.icon}
                alt={`${p.name} icon`}
                loading="lazy"
                className="w-12 h-12 rounded-full mb-4 object-cover"
              />
              <div className="space-y-1">
                <p className="font-semibold text-gray-800">{p.name}</p>
                <p className="text-xs text-gray-500">
                  {p.description.substring(0, 100)}
                  {p.description.length > 100 ? "..." : ""}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-cyan-600 font-bold text-sm flex items-center">
                    <CurrencyRupeeIcon fontSize="small" className="mr-1" />
                    {p.price}
                  </p>
                  <button
                    onClick={() => alert(`Booking ${p.name}`)}
                    className="px-3 py-1 text-sm text-[#10217D] border border-[#10217D] rounded hover:bg-indigo-50 transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Buttons */}
        <ScrollButton
          direction="left"
          onClick={() => handleScroll(-600)}
          className="left-0"
        />
        <ScrollButton
          direction="right"
          onClick={() => handleScroll(600)}
          className="right-0"
        />
      </div>
    </div>
  );
};

export default Programs;
  