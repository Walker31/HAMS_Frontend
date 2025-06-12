import IconButton from "@mui/material/IconButton";
import cityIcons from "../constants/cityIcons";
import CloseIcon from '@mui/icons-material/Close';

export default function LocationModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-4xl max-h-[80vh] overflow-y-auto scrollbar-hide">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Popular Cities</h2>
          <IconButton onClick={onClose} >
            <CloseIcon className="text-gray-600 hover:text-black"/>
          </IconButton>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 items-center md:grid-cols-5 gap-4">
          {Object.entries(cityIcons).map(([city, icon]) => (
            <div
              key={city}
              className="bg-gray-100 flex flex-row gap-2 items-center hover:bg-yellow-100 rounded-md p-3 cursor-pointer shadow-sm"
            >
              <div className="text-xl mb-1 text-blue-800">{icon}</div>
              <div className="text-sm font-medium text-gray-800">
                {city}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
