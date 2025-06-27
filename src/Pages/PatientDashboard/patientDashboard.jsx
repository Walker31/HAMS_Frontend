import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import DashboardHeader from "./components/header";
import AppointmentList from "./components/appointmentList";
import HistoryList from "./components/historyList";
import { useAuth } from "../../contexts/AuthContext";
import JitsiMeetModal from "../../Meeting/JitsiMeetModal";
import GreetingCards from "./components/GreetingCards";
import MedicationList from "./components/MedicationList";
import RightProfileSidebar from "./components/RightSidebar";


const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
const PatientDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [history, setHistory] = useState([]);
  const [jitsiRoom, setJitsiRoom] = useState("");
  const [showJitsi, setShowJitsi] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout?.(); // call logout if it's available in the AuthContext
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

  const fetchDoctorDetails = async (doctorId) => {
    try {
      const res = await axios.get(`${base_url}/doctors/${doctorId}`);
      return res.data?.name || "Unknown Doctor";
    } catch (err) {
      console.error("Failed to fetch doctor details", err);
      return "Unknown Doctor";
    }
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
        return apptDate === todayStr;
      });

      const past = res.data.filter((a) => {
        const apptDate = new Date(a.date).toISOString().split("T")[0];
        return apptDate < todayStr;
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
    <div className="flex bg-[#FFF1F4] min-h-screen overflow-hidden">
      <Sidebar
        collapsed={collapsed}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />
      <div className="flex flex-col flex-1 overflow-y-auto p-6 space-y-6">
        <DashboardHeader name={user?.name || "Patient"} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AppointmentList
              appointments={appointments}
              onCancel={handleCancel}
              handleOpenJitsi={handleOpenJitsi}
            />
            <HistoryList history={history} />
            <MedicationList/>
          </div>
          <RightProfileSidebar user={user} />
          </div>
        </div>
        <JitsiMeetModal
          show={showJitsi}
          onHide={handleCloseJitsi}
          roomName={jitsiRoom}
        />
      </div>
  );
};

export default PatientDashboard;
