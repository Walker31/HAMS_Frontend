import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StarRating from "../components/RatingStars";
import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export const DoctorDescription = () => {
  const [selectedDate, setSelectedDate] = useState(() => { const today = new Date(); return today.toISOString().split("T")[0]; });
  const [selectedSlot, setSelectedSlot] = useState("");
  const [isOn, setIsOn] = useState(false); // payment
  const [isSet, setIsSet] = useState(false); // online/offline
  const [availableSlots, setAvailableSlots] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const location = useLocation();
  const { doctor, reason } = location.state || {};
  const doctorId = doctor?.doctorId || location.state?.doctorId;

  // Fetch doctor profile
  useEffect(() => {
    if (!doctorId) return;

    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`${base_url}/doctors/${doctorId}/profile`);
        setDoctorDetails(res.data.doctor);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  useEffect(() => {
    if (!selectedDate || !doctorId) return;

    const fetchSlots = async () => {
      try {
        const res = await axios.get(`${base_url}/doctors/${doctorId}/slots`);
        const allSlots = res.data?.availableSlots || {};
        const dateKey = new Date(selectedDate).toISOString().split("T")[0];
        setAvailableSlots(allSlots[dateKey] || []);
      } catch (error) {
        console.error("Error fetching slots:", error);
        setAvailableSlots([]);
      }
    };

    fetchSlots();
  }, [selectedDate, doctorId]);

  const handleBookNow = async () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select a date and time slot before booking.");
      return;
    }

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const payload = {
      date: selectedDate,
      doctorId,
      hospitalId: doctorDetails?.Hospital || "Own Practice",
      slotNumber: selectedSlot,
      reason: reason || "General Checkup",
      payStatus: isOn ? "Paid" : "Unpaid",
      consultStatus: isSet ? "Online" : "Offline",
    };

    try {
      const response = await axios.post(
        `${base_url}/appointments/book`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        alert("Appointment booked successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Failed to book appointment. Please try again.");
      console.error("Booking error:", error);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Doctor Description</h2>

      <div className="flex md:flex-row flex-col justify-between p-5 bg-[#10217D] rounded-3xl">
        <div className="col-md-8">
          <div className="d-flex align-items-start gap-4">
            <img
              src={doctorDetails?.photo?.url || "/default.avif"}
              alt="Doctor"
              className="rounded-full"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />

            <div>
              <h3 className="fw-bold text-white">{doctorDetails?.name || "Doctor Name"}</h3>

              {doctorDetails?.experience && (
                <p className="text-white mb-1">{doctorDetails.experience} Years Experience</p>
              )}

              <p className="text-white mb-1">
                <strong>Specialization:</strong> {doctorDetails?.specialization || "General"}
              </p>
              <p className="text-white mb-1">
                <strong>Languages:</strong> {doctorDetails?.languages?.join(", ") || "English"}
              </p>
              <p className="text-white mb-1">
                <strong>Qualifications:</strong> {doctorDetails?.qualifications?.join(", ") || "MBBS"}
              </p>
              <p className="text-white mb-1">
                <strong>Hospital Name:</strong> {doctorDetails?.Hospital || "Not Provided"}
              </p>
              <p className="text-white mb-1">
                <strong>Timings:</strong> {doctorDetails?.timings || "MON-SAT (09:00 AM - 04:00 PM)"}
              </p>

              {doctorDetails?.averageRating && (
                <StarRating rating={doctorDetails.averageRating} />
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className=" flex flex-col gap-4 mt-4 mt-md-0">
          <div className="card p-3 shadow-sm">
            <h6 className="fw-bold mb-2">Select Date</h6>
            <input
              type="date"
              className="form-control mb-3"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />

            <h6 className="fw-bold mb-2">Available Slots:</h6>
            <div className="d-flex flex-wrap gap-2 mb-2">
              {availableSlots.length > 0 ? (
                availableSlots.map((slot) => (
                  <button
                    key={slot}
                    className={`btn btn-sm ${
                      selectedSlot === slot ? "btn-warning" : "btn-outline-warning"
                    }`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot}
                  </button>
                ))
              ) : (
                <p className="text-muted">No slots available for selected date</p>
              )}
            </div>

            <div className="flex gap-2 items-center justify-between  my-2">
             <p className="m-0">Mode of Consulting:</p>
              <div className="flex gap-2 mt-2">
                <div
                  onClick={() => setIsSet(true)}
                  className={`px-2 py-1 rounded-full cursor-pointer transition-colors ${
                    isSet ? "bg-blue-400 text-white font-semibold" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  Offline
                </div>
                <div
                  onClick={() => setIsSet(false)}
                  className={`px-2 py-1 rounded-full cursor-pointer transition-colors ${
                    !isSet ? "bg-blue-400 text-white font-semibold" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  Online
                </div>
              </div>

            </div>

            <div className="d-flex align-items-center my-2">
              <p className="m-0">Payment done:</p>
              <div
                onClick={() => setIsOn(!isOn)}
                className={`ms-2 w-10 h-5 d-flex align-items-center rounded-pill p-1 cursor-pointer ${
                  isOn ? "bg-success" : "bg-secondary"
                }`}
                style={{ minWidth: "40px" }}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-circle shadow transform transition ${
                    isOn ? "translate-x-6" : ""
                  }`}
                />
              </div>
              <span className="ms-2">{isOn ? "Paid" : "Unpaid"}</span>
            </div>

            <button
              className="btn btn-outline-primary w-100"
              onClick={handleBookNow}
              disabled={!isLoggedIn}
            >
              {isLoggedIn ? "BOOK APPOINTMENT" : "Please Login to book an appointment"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h4 className="fw-bold">Overview</h4>
        <p>{doctorDetails?.overview || "No overview available."}</p>
      </div>
    </div>
  );
};

export default DoctorDescription;
