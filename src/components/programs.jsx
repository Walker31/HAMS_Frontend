import { useRef } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import healthCarePrograms from "../constants/programs.js";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
const Programs = () => {
  const samplePrograms = healthCarePrograms;
  const carouselRef = useRef(null);

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 600, behavior: "smooth" });
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="header flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold  text-cyan-700">
          Healthcare{" "}
          <span className="highlight  text-indigo-900">Programs</span>{" "}
        </h3>
        <a href="#" className="text-sm text-blue-600 hover:underline">
          View All
        </a>
      </div>

      <div className="relative">
        <div
          ref={carouselRef}
          className="prog-list flex space-x-6 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar"
          style={{ scrollbarWidth: "none" }}
        >
          {samplePrograms.map((p, idx) => (
            <div
              key={idx}
              className="prog-card border border-solid border-gray-200 flex-shrink-0 w-56 bg-white shadow-lg p-4 text-left"
            >
              <img
                src={p.icon}
                alt="prog-icon"
                className="doc-img w-12 h-12 rounded-full mb-4 object-cover"
              />
              <div className="doc-info space-y-1">
                <p className="doc-name font-semibold text-gray-800">{p.name}</p>
                <p className="doc-spec text-xs text-gray-500">
                  <span className="note-preview">
                    {p.description.substring(0, 100)}
                    {p.description.length > 100 ? "..." : ""}
                  </span>
                </p>
                <div className="mt-4 card-footer flex items-center justify-between mb-6">
                  <p className="doc-spec font-bold text-md text-cyan-500">
                    <CurrencyRupeeIcon />
                    {p.price}
                  </p>
                  <button
                    onClick={() => alert(`Booking ${p.name}`)}
                    className="px-4 border border-solid border-[#10217D] text-[#10217D] text-sm font-medium py-2 hover:bg-indigo-50"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2  text-[#10217D] font-bold bg-white rounded-full p-3 shadow"
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
};

export default Programs;
