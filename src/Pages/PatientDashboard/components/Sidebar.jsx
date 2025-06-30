import { useNavigate } from 'react-router-dom'; // ✅ import navigate
import { FaBars, FaCalendarAlt, FaHeartbeat } from 'react-icons/fa';
import { MdMessage, MdPayment, MdAssignment, MdLogout, MdSettings } from 'react-icons/md';
import { BsFileMedical } from 'react-icons/bs';
import { useAuth } from '../../../contexts/AuthContext';

const Sidebar = ({ collapsed, toggleSidebar }) => {
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

      <h2 className={`text-2xl font-bold text-cyan-600 mb-6 transition-opacity duration-300 ${collapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
        HAMS
      </h2>

      <nav className="flex flex-col space-y-4">
        <SidebarItem icon={<FaCalendarAlt />} label="Dashboard" collapsed={collapsed} />
        <SidebarItem icon={<FaHeartbeat />} label="Appointments" collapsed={collapsed} />
        <SidebarItem icon={<BsFileMedical />} label="Medical Records" collapsed={collapsed} />
        <SidebarItem icon={<MdAssignment />} label="Prescriptions" collapsed={collapsed} />
        <SidebarItem icon={<MdPayment />} label="Billing & Payments" collapsed={collapsed} />
        <SidebarItem icon={<MdMessage />} label="Messages" collapsed={collapsed} />
      </nav>

      <div className="mt-auto space-y-2">
        <SidebarItem icon={<MdSettings />} label="Settings" collapsed={collapsed} />
        <div onClick={handleLogout} className="cursor-pointer">
          <SidebarItem icon={<MdLogout />} label="Logout" collapsed={collapsed} />
        </div>
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label, collapsed }) => (
  <div className="flex items-center space-x-3 text-gray-700 text-sm font-medium">
    {icon}
    {!collapsed && <span>{label}</span>}
  </div>
);

export default Sidebar;
