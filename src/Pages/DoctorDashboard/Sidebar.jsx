import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LibraryBooksSharpIcon from '@mui/icons-material/LibraryBooksSharp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InsightsIcon from '@mui/icons-material/Insights';
import LogoutIcon from '@mui/icons-material/Logout';
import defImage from "/default.avif";

const Sidebar = ({
  doctor,
  sidebarCollapsed,
  setSidebarCollapsed,
  handleOverviewClick,
  handleLogout,
}) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const effectiveCollapse = isMobile || sidebarCollapsed;

  const navItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { label: "Appointments", icon: <LibraryBooksSharpIcon />, path: "/dashboard/appointments" },
    { label: "Slots", icon: <CalendarTodayIcon />, path: "/dashboard/slots" },
    { label: "Overview", icon: <InsightsIcon />, action: handleOverviewClick },
  ];

  const handleNavigation = (label, path, action) => {
    if (label === "Slots") {
      if (!doctor || !doctor.doctorId) {
        alert("Doctor ID missing from doctor object.");
        return;
      }
      navigate("/dashboard/slots", { state: { doctorId: doctor.doctorId } });
    } else if (path) {
      navigate(path);
    } else if (action) {
      action();
    }
  };

  return (
    <div
      className={`bg-gray-900 text-white shadow-md transition-all duration-300 ease-in-out h-screen flex flex-col ${
        effectiveCollapse ? "w-24" : "w-64"
      }`}
    >
      <div className="p-4 text-center border-b border-gray-800">
        {!effectiveCollapse && <h1 className="text-lg font-bold">Welcome</h1>}
      </div>

      <div className="flex flex-col gap-2 p-4">
        {navItems.map(({ label, icon, path, action }) => (
          <div
            key={label}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer transition-all"
            onClick={() => handleNavigation(label, path, action)}
          >
            <div className="text-xl">{icon}</div>
            {!effectiveCollapse && <span>{label}</span>}
          </div>
        ))}

        <div
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer text-yellow-400 transition-all"
          onClick={handleLogout}
        >
          <div className="text-xl">
            <LogoutIcon />
          </div>
          {!effectiveCollapse && <span>Logout</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
