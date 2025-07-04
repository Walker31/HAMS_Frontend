import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { OverviewModal } from "./DoctorModals"; // ✅ Import modal
import { Snackbar } from "@mui/material";

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [showOverview, setShowOverview] = useState(false); // ✅ For modal
  const [overviewText, setOverviewText] = useState("");     // ✅ Description editing
  const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [snackbarOpen,setSnackbarOpen] = useState(false)
  const [snackbarMessage,setsnackbarMessage] = useState("")

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  useEffect(() => {
    const fetchDoctor = async () => {
      const newToken = localStorage.getItem("token");
      try {
        const res = await axios.get(`${base_url}/doctors/profile`, {
          headers: { Authorization: `Bearer ${newToken}` },
        });
        setDoctor(res.data.doctor);
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };

    fetchDoctor();
  }, []);

  const handleOverviewClick = () => {
    if (doctor?.overview) {
      setOverviewText(doctor.overview);
    }
    setShowOverview(true);
  };

  const handleSaveOverview = async () => {
    try {
      const res = await axios.put(`${base_url}/doctors/update/${doctor.doctorId}`, {
        overview: overviewText,
      });
      setDoctor({ ...doctor, overview: overviewText });
      setShowOverview(false);
    } catch (err) {
      console.error("Failed to update overview", err);
      alert("Failed to update overview.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setSnackbarOpen(true)
    setsnackbarMessage("Logged Out Successfully")
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 1000);
    logout();
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
          handleOverviewClick={handleOverviewClick} // ✅ Working now
          handleLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>

      {/* Overview Modal */}
      <OverviewModal
        show={showOverview}
        onClose={() => setShowOverview(false)}
        description={overviewText}
        setDescription={setOverviewText}
        onSave={handleSaveOverview}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => [
          setSnackbarOpen(false),
          setsnackbarMessage(""),
        ]}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <div
          style={{
            backgroundColor: "#4caf50",
            color: "white",
            padding: "12px 16px",
            borderRadius: "4px",
          }}
        >
          {snackbarMessage}
        </div>
      </Snackbar>
    </div>
  );
};

export default DashboardLayout;
