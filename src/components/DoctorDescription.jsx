import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const DoctorDescription = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isOn, setIsOn] = useState(false);
  const [isSet, setIsSet] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { hname, reason } = state || {};

  // Extract doctor object safely
  const doctor = state?.doctor;
  const doctorId =
    doctor?.doctorId ||
    doctor?._id ||
    state?.doctorId ||
    localStorage.getItem("doctorId");

  const rawPatientId = localStorage.getItem("patientId");
  const patientId =
    rawPatientId && rawPatientId !== "undefined" ? rawPatientId : "HAMS_ADMIN";

  const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    if (doctorId) {
      localStorage.setItem("doctorId", doctorId);
    }
  }, [doctorId]);

  useEffect(() => {
    console.log("DoctorDescription → doctorId:", doctorId);
    console.log("DoctorDescription → location.state:", state);
  }, []);

  useEffect(() => {
    const fetchDoctor = async () => {
      if (!doctorId) {
        console.warn("❌ Invalid or missing doctor ID");
        return;
      }

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
    const fetchSlots = async () => {
      if (!selectedDate || !doctorId) return;

      try {
        const res = await axios.get(`${base_url}/doctors/${doctorId}/slots`);
        const allSlots = res.data?.availableSlots || {};
        const dateKey = new Date(selectedDate).toISOString().split("T")[0];
        const slotsForDate = allSlots[dateKey] || [];
        setAvailableSlots(slotsForDate);
      } catch (error) {
        console.error("Error fetching slots:", error);
        setAvailableSlots([]);
      }
    };

    const fetchBooked = async () => {
      const parsedDate = new Date(selectedDate);
      if (isNaN(parsedDate)) return;
      const dateKey = parsedDate.toISOString().split("T")[0];

      try {
        const res = await axios.get(
          `${base_url}/doctors/${doctorId}/booked-slots?date=${encodeURIComponent(
            dateKey
          )}`
        );
        setBookedSlots(res.data.bookedSlots || []);
      } catch (error) {
        console.error("Error fetching booked slots:", error);
        setBookedSlots([]);
      }
    };

    fetchSlots();
    fetchBooked();
  }, [selectedDate, doctorId]);

  const handleSlotClick = (slot) => {
    if (bookedSlots.includes(slot)) return;
    setSelectedSlot(slot);
  };

  const handleBookNow = async () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select a date and time slot before booking.");
      return;
    }

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      const payload = {
        date: selectedDate,
        patientId,
        doctorId: doctorId || "dummy-doctor-id",
        hospitalId: hname?.hosp || "Unknown Clinic",
        slotNumber: selectedSlot,
        reason: reason || "General Checkup",
        payStatus: isOn ? "Paid" : "Unpaid",
        consultStatus: isSet ? "Online" : "Offline",
      };

      console.log("Sending payload:", payload);

      const response = await axios.post(
        `${base_url}/appointments/book`,
        payload
      );

      if (response.status === 201) {
        alert("Appointment booked successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        alert(
          "This slot has already been booked by another patient. Please choose another slot."
        );
      } else {
        alert("Failed to book appointment. Please try again.");
      }
      console.error("Booking error:", error);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Doctor Description</h2>
      <div className="row p-5 bg-[#10217D] rounded-3xl">
        <div className="col-md-8">
          <div className="d-flex align-items-start gap-4">
            <img
              src={doctorDetails?.photo?.url || "/default-doctor.jpg"}
              alt="Doctor"
              className="rounded-full"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
            <div>
              <h3 className="fw-bold text-white">
                {doctorDetails?.name || "Doctor Name"}
              </h3>
              <p className="text-primary mb-1 text-white">
                {doctorDetails?.experience || "0"} Years Experience
              </p>
              <p className="mb-1 text-white">
                <strong>Specialization:</strong>{" "}
                {doctorDetails?.specialization || "General"}
              </p>
              <p className="mb-1 text-white">
                <strong>Languages:</strong>{" "}
                {doctorDetails?.languages?.join(", ") || "English"}
              </p>
              <p className="mb-1 text-white">
                <strong>Qualifications:</strong>{" "}
                {doctorDetails?.qualifications?.join(", ") || "MBBS"}
              </p>
              <p className="mb-1 text-white">
                Hospital Name: {hname?.hosp || "Not Provided"}
              </p>
              <p className="mb-1 text-white">
                <strong>Timings:</strong>{" "}
                {doctorDetails?.timings || "MON-SAT (09:00 AM - 04:00 PM)"}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mt-4 mt-md-0">
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
                availableSlots.map((slot) => {
                  const isBooked = bookedSlots.includes(slot);
                  return (
                    <button
                      key={slot}
                      className={`btn btn-sm ${
                        selectedSlot === slot
                          ? "btn-warning"
                          : isBooked
                          ? "btn-outline-secondary"
                          : "btn-outline-warning"
                      }`}
                      onClick={() => handleSlotClick(slot)}
                      disabled={isBooked}
                      title={isBooked ? "Slot already booked" : ""}
                    >
                      {slot}
                    </button>
                  );
                })
              ) : (
                <p className="text-muted">
                  No slots available for selected date
                </p>
              )}
            </div>

            <div className="d-flex align-items-center mt-2.5 mb-2.5">
              <p className="m-0 pr-5">Mode of Consulting :</p>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="consultSwitch"
                  checked={isSet}
                  onChange={() => setIsSet(!isSet)}
                />
                <label
                  className="form-check-label text-white"
                  htmlFor="consultSwitch"
                >
                  {isSet ? "Online" : "Offline"}
                </label>
              </div>
              <span className="ms-2">{isSet ? "Online" : "Offline"}</span>
            </div>

            <div className="d-flex align-items-center mt-2.5 mb-2.5">
              <p className="m-0 pr-5">Payment done :</p>
              <div
                onClick={() => setIsOn((prev) => !prev)}
                className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer ${
                  isOn ? "bg-success" : "bg-secondary"
                }`}
                style={{ minWidth: "40px" }}
              >
                <div
                  className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${
                    isOn ? "translate-x-6" : ""
                  }`}
                ></div>
              </div>
              <span className="ms-2">{isOn ? "Paid" : "Unpaid"}</span>
            </div>

            <button
              className="btn btn-outline-primary w-100"
              onClick={handleBookNow}
              disabled={!selectedSlot}
              title={!selectedSlot ? "Please select a slot" : ""}
            >
              BOOK APPOINTMENT
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
