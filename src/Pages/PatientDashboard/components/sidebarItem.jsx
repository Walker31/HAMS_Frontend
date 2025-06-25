import React from "react";

const SidebarItem = ({ icon, label, collapsed }) => (
  <button className="flex items-center gap-4 mb-4 text-cyan-500 font-medium hover:text-cyan-700">
    {icon}
    {!collapsed && <span>{label}</span>}
  </button>
);

export default SidebarItem;
