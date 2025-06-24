import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  useEffect(() => {
    const fetchDoctor = async () => {
        const newToken = localStorage.getItem('token');
      try {
        const res = await axios.get(`${base_url}/doctors/profile`,{
        headers: { Authorization: `Bearer ${newToken}` },
      });
        setDoctor(res.data.doctor);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };

    fetchDoctor();
  }, []);

  // ✅ Define mock or actual handlers
  const handleOverviewClick = () => {
    console.log("Overview clicked");
    // Navigate or perform other logic
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
    alert("Logged out successfully");
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0">
        <Header toggleSidebar={toggleSidebar} />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          doctor={doctor}
          handleOverviewClick={handleOverviewClick}
          handleLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
