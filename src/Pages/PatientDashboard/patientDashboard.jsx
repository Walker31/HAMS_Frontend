import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import DashboardHeader from "./components/header";
import AppointmentList from "./components/appointmentList";
import HistoryList from "./components/historyList";
import { useAuth } from "../../contexts/AuthContext";
import JitsiMeetModal from "../../Meeting/JitsiMeetModal";

const PatientDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
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

  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
    alert("Logged out successfully");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const fetchAppointments = useCallback(async () => {
    if (!user?.id) return;

    const today = new Date().toISOString().split("T")[0];

    try {
      const todayURL = `http://localhost:3000/appointments/pending/${today}/patient?patientId=${user.id}`;
      const prevURL = `http://localhost:3000/appointments/previous?patientId=${user.id}`;

      const [todayRes, prevRes] = await Promise.all([
        axios.get(todayURL),
        axios.get(prevURL),
      ]);

      setAppointments(todayRes.data || []);
      setHistory(prevRes.data || []);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleCancel = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:3000/appointments/cancel`, { appointmentId });
      alert("Appointment Cancelled");
      fetchAppointments();
    } catch (err) {
      console.error("Cancel error:", err);
    }
  };

  return (
    <div className="flex bg-[#FFF1F4] min-h-screen overflow-hidden">
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
      <div className="flex flex-col flex-1 overflow-y-auto p-6 space-y-6">
        <DashboardHeader name={user?.name || "Olivia"} />
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
              <p><strong>Name:</strong> {user?.name}</p>
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
