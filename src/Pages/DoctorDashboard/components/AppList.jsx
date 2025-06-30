import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import "./QueuePage.css";

const QueuePage = () => {
  const { user } = useAuth(); // no token here
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [time, setTime] = useState(new Date());
  const [showGreeting, setShowGreeting] = useState(false);

  const base_url = "http://localhost:3000";

  // Get token directly from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowGreeting((prev) => !prev);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`${base_url}/doctors/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctor(res.data.doctor);
        console.log("Doctor profile:", res.data.doctor); // ✅ confirm doctor.doctorId
      } catch (err) {
        console.error("Failed to fetch doctor profile", err);
      }
    };

    if (token) fetchDoctor();
  }, [token]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const today = new Date().toISOString().split("T")[0];

      if (!doctor?.doctorId) {
        console.warn("No doctorId found.");
        return;
      }

      try {
        const url = `${base_url}/appointments/pending/${today}?doctorId=${doctor.doctorId}`;
        console.log("Fetching appointments from:", url); // ✅ confirm URL
        const res = await axios.get(url);
        setAppointments(res.data || []);
        console.log("Appointments fetched:", res.data); // ✅ confirm data
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      }
    };

    if (doctor?.doctorId) fetchAppointments();
  }, [doctor?.doctorId]);

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

  const awaiting = appointments.filter((a) => a.appStatus === "Pending").length;
  const cancelled = appointments.filter((a) => a.appStatus === "Rejected").length;
  const ended = appointments.filter((a) => a.appStatus === "Completed").length;
  const online = appointments.filter((a) => a.consultStatus === "Online").length;

  return (
    <div className="p-6 font-sans bg-blue-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1
          key={showGreeting ? "greeting" : "date"}
          className="text-3xl font-bold text-blue-900 dust-fade"
        >
          {showGreeting ? `Hello, ${user?.name || "Doctor"}` : formattedDate}
        </h1>
        <div className="clock-frame px-6 py-3 rounded-2xl border-4 border-pink-400">
          <span className="clock-text text-[38px] md:text-[48px] font-mono bg-clip-text text-transparent bg-gradient-to-br from-pink-300 to-yellow-200">
            {formattedTime}
          </span>
        </div>
      </div>

      <div className="flex justify-around mb-6 flex-wrap">
        <div className="bg-white border-l-4 border-blue-500 rounded-lg p-4 shadow w-64 mb-4">
          <p className="text-blue-600">Awaiting visits</p>
          <p className="text-3xl font-bold text-blue-800">{awaiting}</p>
        </div>
        <div className="bg-white border-l-4 border-red-500 rounded-lg p-4 shadow w-64 mb-4">
          <p className="text-red-600">Canceled visits</p>
          <p className="text-3xl font-bold text-red-800">{cancelled}</p>
        </div>
        <div className="bg-white border-l-4 border-green-500 rounded-lg p-4 shadow w-64 mb-4">
          <p className="text-green-600">Ended visits</p>
          <p className="text-3xl font-bold text-green-800">{ended}</p>
        </div>
        <div className="bg-white border-l-4 border-yellow-500 rounded-lg p-4 shadow w-64 mb-4">
          <p className="text-yellow-600">Online Slots</p>
          <p className="text-3xl font-bold text-yellow-800">{online}</p>
        </div>
      </div>

      <table className="w-full border-collapse bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-blue-100 text-blue-800 text-left">
          <tr>
            <th className="p-3">Patient ID</th>
            <th className="p-3">Slot</th>
            <th className="p-3">Consult Mode</th>
            <th className="p-3">Status</th>
            <th className="p-3">Reason</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt, index) => (
            <tr key={index} className="border-t hover:bg-blue-50">
              <td className="p-3">{appt.patientName}</td>
              <td className="p-3">{appt.slotNumber}</td>
              <td className="p-3">{appt.consultStatus}</td>
              <td className="p-3">{appt.appStatus}</td>
              <td className="p-3">{appt.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueuePage;
