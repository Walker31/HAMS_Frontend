import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import cityIcons from "../constants/cityIcons"; 
import { getCityFromCoords } from "../utils/locationUtils";


export default function LocationModal({ open, onClose, setLocation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  const cityList = Object.keys(cityIcons);

  useEffect(() => {
    setFilteredCities(
      searchTerm === ""
        ? cityList
        : cityList.filter((city) =>
            city.toLowerCase().includes(searchTerm.toLowerCase())
          )
    );
  }, [searchTerm]);

  const detectLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const city = await getCityFromCoords(
            pos.coords.latitude,
            pos.coords.longitude
          );
          setLocation(city);
          onClose();
        },
        () => {
          alert("Failed to detect location.");
        }
      );
    } else {
      alert("Geolocation not supported.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Select Your City</h2>
          <IconButton onClick={onClose}>
            <CloseIcon className="text-gray-500 hover:text-black" />
          </IconButton>
        </div>

        
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 mb-4">
          <SearchIcon className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search for your city"
            className="flex-grow outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        
        <button
          onClick={detectLocation}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium mb-4"
        >
          <LocationOnIcon />
          Detect my location
        </button>

        
        <div className="text-sm font-medium text-gray-700 mb-2">
          Popular Cities
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {filteredCities.map((city) => (
            <div
              key={city}
              onClick={() => {
                setLocation(city);
                onClose();
              }}
              className="flex flex-col items-center justify-center p-3 hover:bg-gray-100 rounded cursor-pointer"
            >
              <div className="text-2xl text-blue-700">{cityIcons[city]}</div>
              <div className="mt-1 text-sm font-semibold text-black-800">{city}</div>
            </div>
          ))}
        </div>

      
        {searchTerm === "" && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setSearchTerm(" ")} 
              className="text-pink-600 hover:underline text-sm"
            >
              View All Cities
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
