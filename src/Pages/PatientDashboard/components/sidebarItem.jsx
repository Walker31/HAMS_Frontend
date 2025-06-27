import React from "react";

const SidebarItem = ({ icon, label, collapsed, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 px-4 py-2 rounded-xl w-full text-sm font-medium transition-all
        ${active ? "bg-pink-100 text-pink-600" : "text-gray-600 hover:bg-pink-50 hover:text-pink-500"}
      `}
    >
      <div className="p-2 bg-pink-200 text-white rounded-full">{icon}</div>
      {!collapsed && <span>{label}</span>}
    </button>
  );
};

export default SidebarItem;
