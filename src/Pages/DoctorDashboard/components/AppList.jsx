import React, { useEffect, useState } from "react";
import "./QueuePage.css"; // Ensure this file includes the dustFade animation

const patients = [
  { name: "Angela Bishop", gender: "Female", age: 61, condition: "Diabetes" },
  { name: "Jack Starling", gender: "Male", age: 48, condition: "Lung inflammation" },
  { name: "Saul Goodman", gender: "Male", age: 63, condition: "Cold/Flu" },
  { name: "Mark Newell", gender: "Male", age: 31, condition: "Asthma" },
  { name: "Lori Bednar", gender: "Female", age: 25, condition: "Acute pain" },
];

const QueuePage = () => {
  const [time, setTime] = useState(new Date());
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

 useEffect(() => {
  const interval = setInterval(() => {
    setShowGreeting((prev) => !prev);
  }, 10000); // Now changes every 20 seconds
  return () => clearInterval(interval);
}, []);


  const formattedTime = time.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-6 font-sans bg-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1
          key={showGreeting ? "greeting" : "date"}
          className="text-3xl font-bold text-blue-900 dust-fade"
        >
          {showGreeting ? "Hello, Dr. Lishanth!" : formattedDate}
        </h1>
        <div className="clock-frame px-6 py-3 rounded-2xl border-4 border-pink-400">
          <span className="clock-text text-[38px] md:text-[48px] font-mono bg-clip-text text-transparent bg-gradient-to-br from-pink-300 to-yellow-200">
            {formattedTime}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-around mb-6 flex-wrap">
        <div className="bg-white border-l-4 border-blue-500 rounded-lg p-4 shadow w-64 mb-4">
          <p className="text-blue-600">Awaiting visits</p>
          <p className="text-3xl font-bold text-blue-800">4</p>
        </div>
        <div className="bg-white border-l-4 border-red-500 rounded-lg p-4 shadow w-64 mb-4">
          <p className="text-red-600">Canceled visits</p>
          <p className="text-3xl font-bold text-red-800">1</p>
        </div>
        <div className="bg-white border-l-4 border-green-500 rounded-lg p-4 shadow w-64 mb-4">
          <p className="text-green-600">Ended visits</p>
          <p className="text-3xl font-bold text-green-800">9</p>
        </div>
        <div className="bg-white border-l-4 border-yellow-500 rounded-lg p-4 shadow w-64 mb-4">
          <p className="text-yellow-600">Online Slots</p>
          <p className="text-3xl font-bold text-yello-800">9</p>
        </div>
      </div>

      {/* Table */}
      <table className="w-full border-collapse bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-blue-100 text-blue-800 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Visit Time</th>
            <th className="p-3">Gender</th>
            <th className="p-3">Age</th>
            <th className="p-3">Condition</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index} className="border-t hover:bg-blue-50">
              <td className="p-3 font-medium flex items-center gap-2">
                <span className="bg-blue-200 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm">
                  {patient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                {patient.name}
              </td>
              <td className="p-3">3:15 pm</td>
              <td className="p-3">{patient.gender}</td>
              <td className="p-3">{patient.age}</td>
              <td className="p-3">{patient.condition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueuePage;
