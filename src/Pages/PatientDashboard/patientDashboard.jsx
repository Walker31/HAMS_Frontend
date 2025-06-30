
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AppointmentBanner from './components/appointmentBanner';
import HealthReport from './components/HealthReports';
import HeartRateGraph from './components/HeartRateGraph';
import RecentAppointments from './components/RecentAppointments';

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
  const { user, logout } = useAuth();

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout?.();
    navigate("/", { replace: true });
    alert("Logged out successfully");
  };

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
        return apptDate === todayStr && a.appStatus === "Pending";
      });

      const past = res.data.filter((a) => {
        const apptDate = new Date(a.date).toISOString().split("T")[0];
        return apptDate < todayStr && ["Completed", "Rejected", "Rescheduled"].includes(a.appStatus);
      });

      setAppointments(upcoming);
      setHistory(past);
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
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} handleLogout={handleLogout} />

      <main className="flex-1 p-6">
        <Header />
        <AppointmentBanner />
        <HealthReport />
        <HeartRateGraph />
        <RecentAppointments
          appointments={appointments}
          onCancel={handleCancel}
          handleOpenJitsi={handleOpenJitsi}
        />
      </main>

      <JitsiMeetModal roomName={jitsiRoom} isOpen={showJitsi} onClose={handleCloseJitsi} />
    </div>
  );
};

export default PatientDashboard;
