import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import JitsiMeetModal from "../../Meeting/JitsiMeetModal";
import { useAuth } from "../../contexts/AuthContext";

const PatientDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [jitsiRoom, setJitsiRoom] = useState("");
  const [showJitsi, setShowJitsi] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();

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

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="p-6 pb-0">
          <Header />
        </div>

        {/* Render nested routes like /dashboard/patient, /appointments */}
        <Outlet context={{ handleOpenJitsi }} />
      </div>

      {/* Jitsi Modal */}
      <JitsiMeetModal
        roomName={jitsiRoom}
        isOpen={showJitsi}
        onClose={handleCloseJitsi}
      />
    </div>
  );
};

export default PatientDashboard;
