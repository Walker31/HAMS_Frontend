import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import DashboardHeader from "./components/header";
import AppointmentList from "./components/appointmentList";
import HistoryList from "./components/historyList";
import { useAuth } from "../../contexts/AuthContext";


const PatientDashboard = () => {
  const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  const [collapsed, setCollapsed] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [history, setHistory] = useState([]);
  const {logout}=useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/", { replace: true });
    alert("Logged out successfully");
  };

  const fetchDoctorDetails = async (doctorId) => {
    try {
      const res = await axios.get(`http://localhost:3000/doctors/${doctorId}`);
      return res.data?.name || "Unknown Doctor";
    } catch {
      return "Unknown Doctor";
    }
  }

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
