import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorDescription = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); //just for checking purpose, replace with actual login state

  const navigate = useNavigate();

  const handleSlotClick = (slot) => setSelectedSlot(slot);

  const handleBookNow = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select a date and time slot before booking.");
      return;
    }

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    navigate("/confirmation", {
      state: {
        date: selectedDate,
        slot: selectedSlot,
        doctor: "Dr Jangaa Mani"
      }
    });
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Doctor Description</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="d-flex align-items-start gap-4">
            <img
              src="/src/assets/doctorpic2.jpg"
              alt="Doctor"
              className="rounded-full"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
            <div>
              <h3 className="fw-bold">Dr Jangaa Mani</h3>
              <p className="text-primary mb-1">0 Years Experience</p>
              <p className="mb-1"><strong>Specialization:</strong> Corporate Criminal</p>
              <p className="mb-1"><strong>Languages:</strong> English, Telugu, Hindi, Tamil, Malayalam, Kannada</p>
              <p className="mb-1"><strong>Qualifications:</strong> B.tech-EEE, MBBS, MD-Backendology, MS-Githubology</p>
              <p className="mb-1"><strong>Hospital:</strong> Janga Hospitals, Avadi, Chennai</p>
              <p className="mb-1"><strong>Timings:</strong> MON-SAT (09:00 AM - 04:00 PM)</p>
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
              {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"].map((slot) => (
                <button
                  key={slot}
                  className={`btn btn-sm ${selectedSlot === slot ? "btn-warning" : "btn-outline-warning"}`}
                  onClick={() => handleSlotClick(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>

            <button className="btn btn-outline-primary w-100" onClick={handleBookNow}>
              BOOK APPOINTMENT
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h4 className="fw-bold">Overview</h4>
        <p>Solla onnum illa...</p>
      </div>
    </div>
  );
};

export default DoctorDescription;
