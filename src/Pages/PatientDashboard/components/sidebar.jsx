import { FaFilePrescription, FaCalendarAlt, FaSignOutAlt, FaBars } from "react-icons/fa";
import SidebarItem from "./sidebarItem";

const Sidebar = ({ collapsed, toggleSidebar, handleLogout }) => (
  <div className={`h-full ${collapsed ? "w-20" : "w-64"} bg-white shadow-md flex flex-col py-6 transition-all duration-300`}>
    <button onClick={toggleSidebar} className="mb-6 self-center">
      <FaBars size={24} />
    </button>
    <div className="flex flex-col items-center space-y-6 mt-6">
      <SidebarItem icon={<FaCalendarAlt size={24} />} label="Appointments" collapsed={collapsed} />
      <SidebarItem icon={<FaFilePrescription size={24} />} label="Prescriptions" collapsed={collapsed} />
      <div className="mt-auto">
        <button onClick={handleLogout} className="flex items-center gap-4 text-gray-600 hover:text-red-500">
          <FaSignOutAlt size={24} />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  </div>
);

export default Sidebar;
