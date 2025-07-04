import { useNavigate } from 'react-router-dom';
import { FaBars, FaCalendarAlt, FaHeartbeat } from 'react-icons/fa';
import { MdLogout, MdSettings } from 'react-icons/md';
import { useAuth } from '../../../contexts/AuthContext';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ collapsed, toggleSidebar, onReviewClick }) => {
  const {logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  return (
    <aside className={`bg-white shadow-md flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} p-4`}>
      <button onClick={toggleSidebar} className="self-end mb-4 text-gray-500">
        <FaBars />
      </button>

      <h2 className={`text-2xl font-bold text-cyan-600 mb-6 cursor-pointer transition-opacity duration-300 ${collapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
        HAMS
      </h2>

      <nav className="flex flex-col space-y-4">
        <NavLink to="/dashboard/patient" className={({ isActive }) =>
        `cursor-pointer !no-underline ${isActive ? "bg-gray-100 font-semibold rounded-md" : ""}`
        }>
        <SidebarItem icon={<FaCalendarAlt />} label="Dashboard" collapsed={collapsed} />
        </NavLink>
        <NavLink
          to="/dashboard/patient/appointments"
          className={({ isActive }) =>
            `cursor-pointer !no-underline ${isActive ? "bg-gray-100 font-semibold rounded-md" : ""}`
          }
        >
          <SidebarItem icon={<FaHeartbeat />} label="Appointments" collapsed={collapsed} />
        </NavLink>
        <NavLink
          to="/dashboard/patient/reviews"
          className={({ isActive }) =>
            `cursor-pointer !no-underline ${isActive ? "bg-gray-100 font-semibold rounded-md" : ""}`
          }
        >
          <SidebarItem icon={<MdMessage />} label="Reviews" collapsed={collapsed} />
        </NavLink>
        <NavLink
          to="/dashboard/patient/settings"
          className={({ isActive }) =>
            `cursor-pointer !no-underline ${isActive ? "bg-gray-100 font-semibold rounded-md" : ""}`
          }
        >
          <SidebarItem icon={<MdSettings />} label="Settings" collapsed={collapsed} />
        </NavLink>
        <div onClick={handleLogout} className="cursor-pointer">
          <SidebarItem icon={<MdLogout />} label="Logout" collapsed={collapsed} />
        </div>
      </nav>
    </aside>
  );
};

const SidebarItem = ({ icon, label, collapsed }) => (
  <div className="flex items-center space-x-4 text-gray-700 text-sm font-medium">
    {icon}
    {!collapsed && <span>{label}</span>}
  </div>
);

export default Sidebar;
