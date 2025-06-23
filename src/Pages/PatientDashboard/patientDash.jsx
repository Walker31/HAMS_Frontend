import React, { useState, useEffect } from "react";
import { FaFilePrescription, FaCalendarAlt, FaSignOutAlt, FaBars } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Sidebar Component
const Sidebar = ({ collapsed, toggleSidebar, handleLogout }) => (
  <div className={`h-screen ${collapsed ? "w-20" : "w-64"} bg-white shadow-lg flex flex-col py-6 transition-all duration-300`}>
    <button onClick={toggleSidebar} className="mb-6 self-center">
      <FaBars size={24} />
    </button>
    <div className="flex flex-col items-center space-y-6 mt-6">
      <button className="flex items-center gap-4 mb-4">
        <FaCalendarAlt size={28} className="text-cyan-500" />
        {!collapsed && <span className="text-cyan-500 font-semibold">Appointments</span>}
      </button>
      <button className="flex items-center gap-4 mb-4">
        <FaFilePrescription size={28} className="text-cyan-500" />
        {!collapsed && <span className="text-cyan-500 font-semibold">Prescriptions</span>}
      </button>
      <div className="mt-auto">
        <button className="flex items-center gap-4 mb-4" onClick={handleLogout}>
          <FaSignOutAlt size={28} className="text-gray-500" />
          {!collapsed && <span className="text-gray-500 font-semibold">Logout</span>}
        </button>
      </div>
    </div>
  </div>
);

// Dashboard Header
const DashboardHeader = () => (
  <div className="flex justify-between items-center p-6 bg-FCECDD-50 shadow-sm">
    <h2 className="text-2xl font-bold">Your Appointments</h2>
  </div>
);

// Appointment List Component
const AppointmentList = ({ appointments, onCancel }) => {
  if (appointments.length === 0) return <p>No Appointments Found</p>;

  return (
    <div className="mt-8 bg-white rounded-2xl p-6 shadow">
      <h3 className="text-orange-400 font-bold mb-4">Upcoming Appointments</h3>
      {appointments.map((appt) => (
        <div key={appt.appointmentId} className="flex justify-between items-center border-b py-3">
          <div>
            <h4 className="font-semibold">{appt.reason}</h4>
            <p className="text-sm text-gray-500">Doctor: {appt.doctorName}</p>
            <p className="text-sm text-gray-500">{appt.date} | {appt.slotNumber}</p>
            <p className="text-sm text-gray-500">Clinic: {appt.clinicId}</p>
            <p className="text-sm text-gray-500">Payment: {appt.payStatus}</p>
          </div>
          {appt.appStatus === "Pending" && (
            <button className="bg-cyan-500 text-white px-4 py-2 rounded-xl hover:bg-cyan-600"
              onClick={() => onCancel(appt.appointmentId)}>
              Cancel
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

// History List Component
const HistoryList = ({ history }) => {
  if (history.length === 0) return <p>No Cancelled Appointments</p>;

  return (
    <div className="mt-8 bg-white rounded-2xl p-6 shadow">
      <h3 className="text-red-400 font-bold mb-4">Cancelled History</h3>
      {history.map((appt) => (
        <div key={appt.appointmentId} className="flex justify-between items-center border-b py-3">
          <div>
            <h4 className="font-semibold">{appt.reason}</h4>
            <p className="text-sm text-gray-500">{appt.date} | {appt.slotNumber}</p>
            <p className="text-sm text-gray-500">Clinic: {appt.clinicId}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// MAIN PATIENT DASHBOARD
const PatientDashboard = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const patientId = "HAMS_ADMIN";  // hardcoded for now

  // Sidebar toggle
  const toggleSidebar = () => setCollapsed(!collapsed);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
    alert("Logged out successfully");
  };

  // 🔥 Fetch doctor details function (as you asked)
  const fetchDoctorDetails = async (doctorId) => {
    try {
      const res = await axios.get(`http://localhost:3000/doctors/${doctorId}`);
      if (res.data && res.data.name) {
        return res.data.name;
      } else {
        return "Unknown Doctor";
      }
    } catch (error) {
      console.error(`Error fetching doctor for ID ${doctorId}:`, error);
      return "Unknown Doctor";
    }
  };

  // Fetch Appointments + attach doctor name
  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/appointments/patient/${patientId}`);
      const appts = res.data;

      // Enrich with doctor name
      const enrichedAppointments = await Promise.all(
        appts.map(async (appt) => {
          const doctorName = await fetchDoctorDetails(appt.doctorId);
          return { ...appt, doctorName };
        })
      );

      setAppointments(enrichedAppointments);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }

    // Fetch history
    axios.get(`http://localhost:3000/appointments/history/${patientId}`)
      .then(res => setHistory(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Cancel Appointment
  const handleCancel = (appointmentId) => {
    axios.put(`http://localhost:3000/appointments/cancel`, { appointmentId })
      .then(() => {
        alert("Appointment Cancelled");
        fetchAppointments();
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <div className="p-6 bg-FCECDD-50 flex-1 overflow-y-auto">
          <AppointmentList appointments={appointments} onCancel={handleCancel} />
          <HistoryList history={history} />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
