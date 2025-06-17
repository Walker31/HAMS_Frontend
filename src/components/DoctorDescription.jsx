import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DoctorDescription = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOn, setIsOn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { doctor, hname } = location.state || {};

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
        doctor: doctor.name,
      },
    });
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Doctor Description</h2>
      <div className="row p-5 bg-[#10217D] rounded-3xl">
        <div className="col-md-8">
          <div className="d-flex align-items-start gap-4">
            <img
              src={doctor?.photo || "/default-doctor.jpg"}
              alt="Doctor"
              className="rounded-full"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
            <div>
              <h3 className="fw-bold text-white">{doctor?.name || "Doctor Name"}</h3>
              <p className="text-primary mb-1 text-white">
                {doctor?.experience || "0"} Years Experience
              </p>
              <p className="mb-1 text-white">
                <strong>Specialization:</strong>{" "}
                {doctor?.specialization || "General"}
              </p>
              <p className="mb-1 text-white">
                <strong>Languages:</strong>{" "}
                {doctor?.languages?.join(", ") || "English"}
              </p>
              <p className="mb-1 text-white">
                <strong>Qualifications:</strong>{" "}
                {doctor?.qualifications?.join(", ") || "MBBS"}
              </p>
              <p className="mb-1 text-white">
                Hospital Name : {hname?.hosp || "Not Provided"}
              </p>
              <p className="mb-1 text-white">
                <strong>Timings:</strong>{" "}
                {doctor?.timings || "MON-SAT (09:00 AM - 04:00 PM)"}
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
              {[
                "9:00 AM",
                "10:00 AM",
                "11:00 AM",
                "12:00 PM",
                "1:00 PM",
                "2:00 PM",
                "3:00 PM",
              ].map((slot) => (
                <button
                  key={slot}
                  className={`btn btn-sm ${
                    selectedSlot === slot
                      ? "btn-warning"
                      : "btn-outline-warning"
                  }`}
                  onClick={() => handleSlotClick(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
            <div className = "d-flex items-center mt-2.5 mb-2.5 ">
              <p className = "m-0 pr-5">Payment done :</p>
            <div
              onClick={() => setIsOn(!isOn)}
              className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                isOn ? "bg-green-400" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${
                  isOn ? "translate-x-6" : ""
                }`}
              ></div>
            </div>
            </div>

            <button
              className="btn btn-outline-primary w-100"
              onClick={handleBookNow}
            >
              BOOK APPOINTMENT
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h4 className="fw-bold">Overview</h4>
        <p>{doctor?.overview || "No overview available."}</p>
      </div>
    </div>
  );
};

export default DoctorDescription;
