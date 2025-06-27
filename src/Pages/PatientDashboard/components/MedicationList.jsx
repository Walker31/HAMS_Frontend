import { FaPills } from "react-icons/fa";

const dummyMeds = [
  {
    name: "Paracetamol 500mg",
    dose: "1 tablet",
    time: "Morning, After Food",
  },
  {
    name: "Metformin 250mg",
    dose: "1 tablet",
    time: "Night, Before Food",
  },
  {
    name: "Vitamin D3",
    dose: "1 capsule",
    time: "Weekly, After Lunch",
  },
];

const MedicationList = ({ medications = dummyMeds }) => {
  if (!medications.length) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-pink-500 mb-4">Medications</h3>
        <p className="text-sm text-gray-400 text-center">No medications prescribed</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="text-lg font-semibold text-pink-500 mb-4">Medications</h3>
      <div className="space-y-4">
        {medications.map((med, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-pink-50 p-4 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="bg-pink-200 p-2 rounded-full text-white mt-1">
              <FaPills size={18} />
            </div>
            <div>
              <p className="font-semibold text-gray-700">{med.name}</p>
              <p className="text-sm text-gray-500">{med.dose}</p>
              <p className="text-xs text-gray-400">{med.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationList;
