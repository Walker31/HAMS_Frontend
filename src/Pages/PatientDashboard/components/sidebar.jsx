import { FaFilePrescription, FaCalendarAlt, FaSignOutAlt, FaBars } from "react-icons/fa";
import SidebarItem from "./sidebarItem";
import { useState } from "react";

const Sidebar = ({ collapsed, toggleSidebar, handleLogout }) => {
  const [active, setActive] = useState("Appointments");

  const handleItemClick = (label) => setActive(label);

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-[#FFF1F4] shadow-md flex flex-col py-6 transition-all duration-300 min-h-screen`}
    >
      <button onClick={toggleSidebar} className="mb-6 self-center text-gray-500 hover:text-pink-500">
        <FaBars size={24} />
      </button>

      <div className="flex flex-col items-center space-y-4 flex-1 w-full px-2">
        <SidebarItem
          icon={<FaCalendarAlt size={18} />}
          label="Appointments"
          collapsed={collapsed}
          active={active === "Appointments"}
          onClick={() => handleItemClick("Appointments")}
        />
        <SidebarItem
          icon={<FaFilePrescription size={18} />}
          label="Prescriptions"
          collapsed={collapsed}
          active={active === "Prescriptions"}
          onClick={() => handleItemClick("Prescriptions")}
        />
      </div>

      <div className="px-4 mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 text-gray-500 hover:text-red-500 transition-colors"
        >
          <FaSignOutAlt size={20} />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
