import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollButton from "./scrollButton";
import axios from "axios";

const TopDoc = () => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

  const fetchTopDoctors = (lat, lon) => {
    axios
      .get(`${base_url}/doctors/nearby/${lat}/${lon}`)
      .then((res) => setDoctors(res.data.doctors))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const storedLat = localStorage.getItem("latitude");
    const storedLon = localStorage.getItem("longitude");

    if (storedLat && storedLon) {
      fetchTopDoctors(storedLat, storedLon);
    } else {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          localStorage.setItem("latitude", latitude);
          localStorage.setItem("longitude", longitude);
          fetchTopDoctors(latitude, longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setLoading(false);
        }
      );
    }
  }, []);

  const handleScroll = (offset) => {
    carouselRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  if (loading) return <div className="text-center py-10">Loading…</div>;
  if (!doctors.length)  
    return (
      <div className="text-center py-10 text-gray-600">
        No doctors available at the moment.
      </div>
    );

  return (
    <div className="container max-w-7xl mx-auto py-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-indigo-900">
          Top Rated <span className="doc-highlight text-cyan-700">Doctors</span> Near You
        </h2>
      </div>

      <div className="relative">
        <ScrollButton direction="left" onClick={() => handleScroll(-600)} className="left-0" />

        <div
          ref={carouselRef}
          className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
        >
          {doctors.map((d, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-48 bg-white rounded-xl border border-gray-200 pt-3 text-center hover:scale-105 transition-transform shadow-sm"
            >
              <div className="w-full h-36 overflow-hidden rounded-lg mb-4">
                <img
                  src={d.photo}
                  alt={`${d.name} photo`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mb-2">
                <div className="font-semibold text-gray-800 text-base">{d.name}</div>
                <div className="text-sm text-gray-500">{d.specialization}</div>
              </div>
              <button
                onClick={() => navigate("/doctor-description", { state: { doctor: d } })}
                className="px-4 mb-3 border border-[#10217D] text-[#10217D] text-sm font-medium py-2.5 rounded-md hover:bg-indigo-50"
              >
                Consult Now
              </button>
            </div>
          ))}
        </div>

        <ScrollButton direction="right" onClick={() => handleScroll(600)} className="right-0" />
      </div>
    </div>
  );
};

export default TopDoc;
