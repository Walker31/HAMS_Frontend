import { FaStethoscope, FaFilePrescription, FaVial } from "react-icons/fa";

const stats = [
  {
    title: "Consultations",
    count: 12,
    icon: <FaStethoscope size={20} />,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Prescriptions",
    count: 8,
    icon: <FaFilePrescription size={20} />,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Lab Screenings",
    count: 5,
    icon: <FaVial size={20} />,
    color: "bg-cyan-100 text-cyan-600",
  },
];

const GreetingCards = ({ userName = "Olivia" }) => {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome, {userName} 👋</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 flex items-center shadow-md hover:shadow-lg transition"
          >
            <div className={`p-3 rounded-full ${card.color} mr-4`}>{card.icon}</div>
            <div>
              <p className="text-gray-500 text-sm">{card.title}</p>
              <p className="text-xl font-semibold">{card.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GreetingCards;
