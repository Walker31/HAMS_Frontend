import { useRef } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import sampleDoctors from "../constants/doctors";
const TopDoc = () => {
  const doctors = sampleDoctors;
  const carouselRef = useRef(null);

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 600, behavior: "smooth" });
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="header flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-indigo-900">
          Our<span className="doc-highlight text-cyan-700"> patients</span>{" "}
          feedback about us
        </h3>
        <a href="#" className="text-sm text-blue-600 hover:underline">
          View All
        </a>
      </div>

      <div className="relative">
        <div
          ref={carouselRef}
          className="doc-list flex space-x-6 overflow-x-auto pb-2 -mx-4 px-2 no-scrollbar"
          style={{ scrollbarWidth: "none" }}
        >
          {doctors.map((d, idx) => (
            <div
              key={idx}
              className="doc-card flex-shrink-0 w-45  bg-white rounded-xl shadow-lg p-2 text-center"
            >
              <img
                src={d.photo}
                alt="doc-photo"
                className="doc-img w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <div className="doc-info space-y-1">
                <div className="doc-name font-semibold text-gray-800">
                  {d.name}
                </div>
                <div className="doc-spec text-xs text-gray-500">
                  {d.specialization}, {d.location}
                </div>
              </div>
              <button
                onClick={() => alert(`Consulting ${d.name}`)}
                className="mt-4 w-full border border-solid border-[#10217D] text-[#10217D] text-sm font-medium py-2  hover:bg-indigo-50 hover:translate-0.5"
              >
                Consult Now
              </button>
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

export default TopDoc;
