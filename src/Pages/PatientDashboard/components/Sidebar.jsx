import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { FaBars, FaCalendarAlt, FaHeartbeat } from 'react-icons/fa';
import { MdLogout, MdSettings } from 'react-icons/md';

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard/patient', icon: <FaCalendarAlt />,end: true },
    { label: 'Appointments', path: '/dashboard/patient/appointments', icon: <FaHeartbeat /> },
    { label: 'Settings', path: '/dashboard/patient/settings', icon: <MdSettings /> },
  ];

  return (
    <aside
      className={`bg-white shadow-lg transition-all duration-300 h-screen flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      } p-4`}
    >
      {/* Toggle Button */}
      <button onClick={toggleSidebar} className="self-end mb-4 text-gray-500 hover:text-cyan-600">
        <FaBars size={18} />
      </button>

      {/* Logo */}
      <h2
        className={`text-2xl font-bold text-cyan-600 mb-6 transition-opacity duration-300 ${
          collapsed ? 'opacity-0 hidden' : 'opacity-100'
        }`}
      >
        HAMS
      </h2>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 flex-1">
        {navItems.map(({ label, path, icon,end }) => (
          <NavLink
            key={label}
            end={end}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-3 py-2 rounded-lg text-gray-700 text-sm font-medium !no-underline transition-colors
               ${isActive ? 'bg-cyan-100 text-cyan-700 font-semibold' : 'hover:bg-gray-100'}`
            }
          >
            <div className="text-lg">{icon}</div>
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}

        {/* Logout */}
        <div
          onClick={handleLogout}
          className="flex items-center gap-4 px-3 py-2 rounded-lg text-red-500 text-sm font-medium cursor-pointer hover:bg-red-50 transition"
        >
          <div className="text-lg">
            <MdLogout />
          </div>
          {!collapsed && <span>Logout</span>}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
