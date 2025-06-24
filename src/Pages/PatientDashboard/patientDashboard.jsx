import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import DashboardHeader from "./components/header";
import AppointmentList from "./components/appointmentList";
import HistoryList from "./components/historyList";

const PatientDashboard = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleLogout = () => {
    localStorage.removeItem("token");
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
  };

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:3000/appointments/patient`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const enriched = await Promise.all(
        res.data.map(async (appt) => {
          const doctorName = await fetchDoctorDetails(appt.doctorId);
          return { ...appt, doctorName };
        })
      );
      setAppointments(enriched);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }

    try {
      const resHistory = await axios.get(`http://localhost:3000/appointments/history`);
      setHistory(resHistory.data);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:3000/appointments/cancel`, { appointmentId });
      alert("Appointment Cancelled");
      fetchAppointments();
    } catch (err) {
      console.error("Cancel error:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

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
