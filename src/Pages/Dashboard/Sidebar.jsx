import { useNavigate } from "react-router-dom";
import defImage from "/default.avif";
import LibraryBooksSharpIcon from '@mui/icons-material/LibraryBooksSharp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InsightsIcon from '@mui/icons-material/Insights';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = ({ doctor, sidebarCollapsed, setSidebarCollapsed, handleOverviewClick, handleLogout }) => {
  const navigate = useNavigate();
  console.log("Doctor ID in DashboardLayout:", doctor?.id);
  const navItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { label: "Appointments", icon: <LibraryBooksSharpIcon />, path: "/dashboard/appointments" },
    {
      label: "Slots",
      icon: <CalendarTodayIcon />,
      action: () => {
        if (!doctor?.id) {
          alert("Doctor ID not available.");
          return;
        }
        navigate("/dashboard/slots", { state: { doctorId: doctor.id } });
      },
    },
    { label: "Overview", icon: <InsightsIcon />, action: handleOverviewClick },
  ];

  return (
    <div
      className={`bg-gray-900 text-white shadow-md transition-all duration-300 ease-in-out 
        h-screen ${sidebarCollapsed ? "w-0 overflow-hidden" : "w-64"}`}
      style={{ minHeight: "100vh" }}
    >
      {!sidebarCollapsed && (
        <>
          <div className="flex flex-col items-center p-4 border-b border-gray-700">
            <img
              src={doctor?.photo || defImage}
              alt="Doctor"
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
            <h5 className="text-lg font-semibold text-center">
              {doctor?.name || "Doctor Name"}
            </h5>
          </div>

          <div className="flex flex-col gap-2 p-4">
            {navItems.map(({ label, icon, path, action }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 text-white transition-all"
                onClick={() => (path ? navigate(path) : action?.())}
              >
                {icon}
                <span>{label}</span>
              </div>
            ))}
            <div
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 text-yellow-400 transition-all"
              onClick={handleLogout}
            >
              <LogoutIcon />
              <span>Logout</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
