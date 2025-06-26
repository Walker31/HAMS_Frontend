import { useNavigate } from "react-router-dom";
import defImage from "/default.avif";
import LibraryBooksSharpIcon from '@mui/icons-material/LibraryBooksSharp';

import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InsightsIcon from '@mui/icons-material/Insights';
import LogoutIcon from '@mui/icons-material/Logout';
const Sidebar = ({ doctor, sidebarCollapsed, setSidebarCollapsed, handleOverviewClick, handleLogout }) => {
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { label: "Appointments", icon: <LibraryBooksSharpIcon />, path: "/dashboard/appointments" },
    { label: "Slots", icon: <CalendarTodayIcon />, path: "/dashboard/slots" },
    { label: "Overview", icon: <InsightsIcon />, action: handleOverviewClick },
  ];

  return (
    <div
      className={`bg-gray-900 text-white shadow-md transition-all duration-300 ease-in-out 
        h-screen flex flex-col
        ${sidebarCollapsed ? "w-24" : "w-64"}
      `}
    >
      {/* Optional: Profile or Logo section */}
      <div className="p-4 text-center border-b border-gray-800">
        {!sidebarCollapsed && (
          <h1 className="text-lg font-bold">Welcome</h1>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        {navItems.map(({ label, icon, path, action }) => (
          <div
            key={label}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer transition-all"
            onClick={() => (path ? navigate(path) : action())}
          >
            <div className="text-xl">{icon}</div>
            {!sidebarCollapsed && <span>{label}</span>}
          </div>
        ))}

        <div
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer text-yellow-400 transition-all"
          onClick={handleLogout}
        >
          <div className="text-xl">
            <LogoutIcon />
          </div>
          {!sidebarCollapsed && <span>Logout</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
