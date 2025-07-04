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
  const [showAddReview, setShowAddReview] = useState(false);
  const [showDeleteReview, setShowDeleteReview] = useState(false);

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

  const handleAddReviewClick = () => setShowAddReview(true);
  const handleDeleteReviewClick = () => setShowDeleteReview(true);
  const handleCloseAddReview = () => setShowAddReview(false);
  const handleCloseDeleteReview = () => setShowDeleteReview(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
        onAddReviewClick={handleAddReviewClick}
        onDeleteReviewClick={handleDeleteReviewClick}
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

      {/* Add Review Modal (placeholder) */}
      {showAddReview && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[300px]">
            <h2 className="text-lg font-bold mb-4">Add Review</h2>
            {/* TODO: Add review form here */}
            <button onClick={handleCloseAddReview} className="mt-4 px-4 py-2 bg-gray-300 rounded">Close</button>
          </div>
        </div>
      )}
      {/* Delete Review Modal (placeholder) */}
      {showDeleteReview && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[300px]">
            <h2 className="text-lg font-bold mb-4">Delete Review</h2>
            {/* TODO: Add delete review form here */}
            <button onClick={handleCloseDeleteReview} className="mt-4 px-4 py-2 bg-gray-300 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
