import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { FaBars, FaCalendarAlt, FaHeartbeat } from 'react-icons/fa';
import { MdLogout, MdSettings, MdMessage } from 'react-icons/md';

const navItems = [
  { label: 'Dashboard', path: '/dashboard/patient', icon: <FaCalendarAlt />, end: true },
  { label: 'Appointments', path: '/dashboard/patient/appointments', icon: <FaHeartbeat /> },
  { label: 'Reviews', path: '/dashboard/patient/reviews', icon: <MdMessage /> },
  { label: 'Settings', path: '/dashboard/patient/settings', icon: <MdSettings /> },
];

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside
      className={`bg-white shadow-lg transition-all duration-300 h-screen flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      } p-4`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="self-end mb-4 text-gray-500 hover:text-cyan-600"
        aria-label="Toggle Sidebar"
      >
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
        {navItems.map(({ label, path, icon, end }) => (
          <NavLink
            key={label}
            to={path}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-4 px-3 py-2 rounded-lg text-gray-700 text-sm font-medium !no-underline transition-colors
               ${isActive ? 'bg-cyan-100 text-cyan-700 font-semibold' : 'hover:bg-gray-100'}`
            }
          >
            <div className="text-lg">{icon}</div>
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div
        onClick={handleLogout}
        className="flex items-center gap-4 px-3 py-2 rounded-lg text-red-500 text-sm font-medium cursor-pointer hover:bg-red-50 transition mt-4"
      >
        <div className="text-lg">
          <MdLogout />
        </div>
        {!collapsed && <span>Logout</span>}
      </div>
    </aside>
  );
};

export default Sidebar;
