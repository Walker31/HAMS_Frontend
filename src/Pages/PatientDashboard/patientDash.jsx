import React, { useState } from "react";
import { FaFilePrescription,FaCalendarAlt, FaSignOutAlt, FaBars } from "react-icons/fa";

const Sidebar = ({ collapsed, toggleSidebar, onDashboardClick }) => (
  <div className={`h-screen ${collapsed ? "w-20" : "w-64"} bg-white shadow-lg flex flex-col py-6 transition-all duration-300`}>
    <button onClick={toggleSidebar} className="mb-6 self-center">
      <FaBars size={24} />
    </button>

    <div className="flex flex-col items-center space-y-6 mt-6">
      <button onClick={onDashboardClick} className="flex items-center gap-4 mb-4">
        <FaCalendarAlt size={28} className="text-cyan-500" />
        {!collapsed && <span className="text-cyan-500 font-semibold">History</span>}
      </button>
      <button className="flex items-center gap-4 mb-4">
        <FaFilePrescription size={28} className="text-cyan-500" />
        {!collapsed && <span className="text-cyan-500 font-semibold">Prescriptions</span>}
      </button>
      <div className="mt-auto">
        <button className="flex items-center gap-4 mb-4">
          <FaSignOutAlt size={28} className="text-gray-500" />
          {!collapsed && <span className="text-gray-500 font-semibold">Logout</span>}
        </button>
      </div>
    </div>
  </div>
);

const DashboardHeader = () => (
  <div className="flex justify-between items-center p-6 bg-FCECDD-50 shadow-sm">
    <h2 className="text-2xl font-bold">Your Appointment is Confirmed!</h2>
    <p className="text-sm text-gray-500">You have no appointments for today</p>
  </div>
);

const UpcomingAppointments = () => {
  const appointments = [
    { name: "Knee Pain", doctor: "Dr. Janga Mani", date: "18 June 2025", time: "11:00 AM - 11:30 AM" },
    { name: "Chestache", doctor: "Dr. Janga Mani", date: "18 June 2025", time: "11:00 AM - 11:30 AM" }
  ];

  return (
    <div className="mt-8 bg-white rounded-2xl p-6 shadow">
      <h3 className="text-orange-400 font-bold mb-4">History</h3>
      {appointments.map((appt, idx) => (
        <div key={idx} className="flex justify-between items-center border-b py-3 last:border-b-0">
          <div>
            <h4 className="font-semibold">{appt.name}</h4>
            <p className="text-sm text-gray-500">{appt.doctor}</p>
            <p className="text-sm text-gray-500">{appt.date} | {appt.time}</p>
          </div>
          <button className="bg-cyan-500 text-white px-4 py-2 rounded-xl hover:bg-cyan-600">Cancel</button>
        </div>
      ))}
    </div>
  );
};

const PastAppointments = () => {
  const appointments = [
    { name: "Knee Pain", doctor: "Dr. Janga Mani", date: "18 June 2025", time: "11:00 AM - 11:30 AM" },
    { name: "Chestache", doctor: "Dr. Janga Mani", date: "18 June 2025", time: "11:00 AM - 11:30 AM" }
  ];

  return (
    <div className="mt-8 bg-white rounded-2xl p-6 shadow">
      <h3 className="font-bold mb-4">History</h3>
      {appointments.map((appt, idx) => (
        <div key={idx} className="flex justify-between items-center border-b py-3 last:border-b-0">
          <div>
            <h4 className="font-semibold">{appt.name}</h4>
            <p className="text-sm text-gray-500">{appt.doctor}</p>
            <p className="text-sm text-gray-500">{appt.date} | {appt.time}</p>
          </div>
          <button className="flex items-center gap-2">
            <FaFilePrescription size={24} className="text-cyan-500" />
            <span className="text-cyan-500 font-semibold">View Prescription</span>
          </button>
        </div>
      ))}
    </div>
  );
};


const PatientDashboard = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <div className="p-6 bg-FCECDD-50 flex-1 overflow-y-auto">
          <UpcomingAppointments />
          <PastAppointments />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
