const ListCard = ({ title, color = "pink", children }) => (
  <div className="bg-white rounded-2xl p-6 shadow-md">
    <h3 className={`text-${color}-500 font-semibold mb-4 text-lg`}>{title}</h3>
    {children}
  </div>
);

export default ListCard;
