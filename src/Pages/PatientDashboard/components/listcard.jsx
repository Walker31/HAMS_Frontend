import React from "react";

const ListCard = ({ title, color, children }) => (
  <div className="mt-8 bg-white rounded-2xl p-6 shadow">
    <h3 className={`text-${color}-400 font-bold mb-4 text-lg`}>{title}</h3>
    {children}
  </div>
);

export default ListCard;
