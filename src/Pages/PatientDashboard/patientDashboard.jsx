import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import DashboardHeader from "./components/header";
import AppointmentList from "./components/appointmentList";
import HistoryList from "./components/historyList";
import { useAuth } from "../../contexts/AuthContext";

const base_url = "http://localhost:3000"; 

const PatientDashboard = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ FIXED

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
      const todayURL = `${base_url}/appointments/pending/${today}/patient?patientId=${user.id}`;
      const prevURL = `${base_url}/appointments/previous?patientId=${user.id}`;

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
      await axios.put(`${base_url}/appointments/cancel`, { appointmentId });
      alert("Appointment Cancelled");
      fetchAppointments();
    } catch (err) {
      console.error("Cancel error:", err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-orange-50">
      <DashboardHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
        <main className="flex-1 p-6 overflow-y-auto">
          <AppointmentList appointments={appointments} onCancel={handleCancel} />
          <HistoryList history={history} />
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;
