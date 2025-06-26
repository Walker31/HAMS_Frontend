<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from "react";
=======
import { useState, useEffect, useCallback } from "react";
>>>>>>> 95a159260750a04640d28eb6dd8bf46239142575
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import DashboardHeader from "./components/header";
import AppointmentList from "./components/appointmentList";
import HistoryList from "./components/historyList";
import { useAuth } from "../../contexts/AuthContext";
import JitsiMeetModal from "../../Meeting/JitsiMeetModal";

const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
const PatientDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [history, setHistory] = useState([]);
  const [jitsiRoom, setJitsiRoom] = useState("");
  const [showJitsi, setShowJitsi] = useState(false);

  const navigate = useNavigate();
<<<<<<< HEAD
  const { user } = useAuth();
  const [jitsiRoom, setJitsiRoom] = useState("");
  const [showJitsi, setShowJitsi] = useState(false);

  const handleOpenJitsi = (meetLink) => {
    const roomName = meetLink?.split("https://meet.jit.si/")[1];
    if (!roomName || roomName === "Link") {
      alert("Invalid or missing Meet link for this appointment.");
      return;
    }
    setJitsiRoom(roomName);
    setShowJitsi(true);
  };

  const handleCloseJitsi = () => {
    setShowJitsi(false);
  };
=======
  const { user, logout } = useAuth();
>>>>>>> 95a159260750a04640d28eb6dd8bf46239142575

  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout?.(); // call logout if it's available in the AuthContext
    navigate("/", { replace: true });
    alert("Logged out successfully");
  };

<<<<<<< HEAD
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
=======
  const handleOpenJitsi = (meetLink) => {
    const roomName = meetLink?.split("https://meet.jit.si/")[1];
    if (!roomName || roomName === "Link") {
      alert("Invalid or missing Meet link for this appointment.");
      return;
    }
    setJitsiRoom(roomName);
    setShowJitsi(true);
  };

  const handleCloseJitsi = () => {
    setShowJitsi(false);
  };

  const fetchDoctorDetails = async (doctorId) => {
    try {
      const res = await axios.get(`${base_url}/doctors/${doctorId}`);
      return res.data?.name || "Unknown Doctor";
    } catch (err) {
      console.error("Failed to fetch doctor details", err);
      return "Unknown Doctor";
>>>>>>> 95a159260750a04640d28eb6dd8bf46239142575
    }
  }, []);

  const fetchAppointments = useCallback(async () => {
    if (!user?.id) return;

    const today = new Date().toISOString().split("T")[0];

<<<<<<< HEAD
    try {
      const todayURL = `http://localhost:3000/appointments/pending/${today}/patient?patientId=${user.id}`;
      const prevURL = `http://localhost:3000/appointments/previous?patientId=${user.id}`;

      const [todayRes, prevRes] = await Promise.all([
        axios.get(todayURL),
        axios.get(prevURL),
      ]);

      setAppointments(todayRes.data || []);
      setHistory(prevRes.data || []);
=======
  const fetchAppointments = useCallback(async () => {
    if (!user?.id) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${base_url}/appointments/patient`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const todayStr = new Date().toISOString().split("T")[0];

      const upcoming = res.data.filter((a) => {
        const apptDate = new Date(a.date).toISOString().split("T")[0];
        return apptDate === todayStr;
      });

      const past = res.data.filter((a) => {
        const apptDate = new Date(a.date).toISOString().split("T")[0];
        return apptDate < todayStr;
      });

      setAppointments(upcoming);
      setHistory(past);
>>>>>>> 95a159260750a04640d28eb6dd8bf46239142575
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleCancel = async (appointmentId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${base_url}/appointments/cancel`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Appointment Cancelled");
      fetchAppointments();
    } catch (err) {
      console.error("Cancel error:", err);
    }
  };

  return (
    <div className="flex bg-[#FFF1F4] min-h-screen overflow-hidden">
<<<<<<< HEAD
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
      <div className="flex flex-col flex-1 overflow-y-auto p-6 space-y-6">
        <DashboardHeader name={user?.name || "Olivia"} />
=======
      <Sidebar
        collapsed={collapsed}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />
      <div className="flex flex-col flex-1 overflow-y-auto p-6 space-y-6">
        <DashboardHeader name={user?.name || "Patient"} />
>>>>>>> 95a159260750a04640d28eb6dd8bf46239142575
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AppointmentList
              appointments={appointments}
              onCancel={handleCancel}
              handleOpenJitsi={handleOpenJitsi}
            />
            <HistoryList history={history} />
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold mb-4">Welcome back</h3>
            <div className="text-sm text-gray-600">
<<<<<<< HEAD
              <p><strong>Name:</strong> {user?.name}</p>
=======
              <p><strong>Name:</strong> {user?.name || "N/A"}</p>
>>>>>>> 95a159260750a04640d28eb6dd8bf46239142575
              <p><strong>Age:</strong> {user?.age || "N/A"}</p>
              <p><strong>Weight:</strong> {user?.weight || "N/A"}</p>
              <p><strong>Height:</strong> {user?.height || "N/A"}</p>
            </div>
          </div>
        </div>
        <JitsiMeetModal
          show={showJitsi}
          onHide={handleCloseJitsi}
          roomName={jitsiRoom}
        />
      </div>
    </div>
  );
};

export default PatientDashboard;
