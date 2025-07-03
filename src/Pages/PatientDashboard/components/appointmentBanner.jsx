
import { useEffect, useState } from "react";
import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const AppointmentBanner = () => {
  const [latestAppointment, setLatestAppointment] = useState(null);

  useEffect(() => {
    const fetchLatestAppointment = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${base_url}/appointments/patient`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Sort appointments by date (latest first)
        const sorted = res.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        const upcoming = sorted.find(
          (appt) => appt.appStatus === "Pending"
        );

        setLatestAppointment(upcoming);
      } catch (err) {
        console.error("Failed to fetch appointment:", err);
      }
    };

    fetchLatestAppointment();
  }, []);

  if (!latestAppointment) return null; // nothing to show

  const { date, slotNumber, hospital, doctorName, consultStatus } = latestAppointment;

  return (
    <section className="bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-md mb-6">
      <p className="font-semibold text-lg">Stay Informed! Upcoming Appointment Details</p>
      <p className="text-sm text-gray-600 mt-1">
        {new Date(date).toDateString()} | Slot {slotNumber} | {consultStatus}
      </p>
      <p className="text-sm text-gray-500">
        Doctor: {doctorName} | Location: {hospital || "Hospital"}
      </p>
      <button className="mt-2 text-cyan-600 text-sm font-medium">View Details</button>
    </section>
  );
};

export default AppointmentBanner;
