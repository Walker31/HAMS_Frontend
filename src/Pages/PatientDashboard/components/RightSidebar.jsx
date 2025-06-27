import { FaNotesMedical, FaCalendarAlt } from "react-icons/fa";

const RightProfileSidebar = ({ user }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md space-y-6">
      <div className="flex items-center gap-4">
        <img
          src="/profile.jpg"
          alt="profile"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-bold">{user?.name || "Olivia"}</h3>
          <p className="text-sm text-gray-500">Patient ID: {user?.patientId || "ZY123456"}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-gray-400 text-sm">Height</p>
          <p className="font-semibold">{user?.height || "--"} cm</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Weight</p>
          <p className="font-semibold">{user?.weight || "--"} kg</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Blood</p>
          <p className="font-semibold">{user?.bloodGroup || "O+"}</p>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold mb-2 text-gray-700">Health Plans</p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-pink-100 text-pink-600 text-xs px-3 py-1 rounded-full">
            Dental Checkups
          </span>
          <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
            Diabetes Care
          </span>
          <span className="bg-yellow-100 text-yellow-600 text-xs px-3 py-1 rounded-full">
            Vision Support
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <button className="w-full flex items-center justify-center gap-2 bg-pink-500 text-white py-2 rounded-xl text-sm hover:bg-pink-600">
          <FaNotesMedical />
          My Health Records
        </button>
        <button className="w-full flex items-center justify-center gap-2 border border-pink-500 text-pink-600 py-2 rounded-xl text-sm hover:bg-pink-50">
          <FaCalendarAlt />
          Appointments
        </button>
      </div>

      <div className="bg-pink-100 text-pink-700 p-4 rounded-xl text-sm text-center font-medium">
        💊 Explore our pharmacy to order your medicines with discounts!
      </div>
    </div>
  );
};

export default RightProfileSidebar;
