import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const DoctorDescription = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBookNow = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select a date and time slot before booking.");
      return;
    }

    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    alert(`Appointment booked for ${selectedDate} at ${selectedSlot}`);
  };

  const handleLogin = () => {
    if (phoneNumber.trim().length === 10) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      alert("Login successful! Proceeding to book appointment.");
      alert(`Appointment booked for ${selectedDate} at ${selectedSlot}`);
    } else {
      alert("Enter a valid 10-digit mobile number.");
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8">
          <div className="d-flex align-items-start gap-4">
            <img
              src="/src/assets/doctorpic2.jpg"
              alt="Doctor"
              className="img-fluid rounded"
              style={{ width: "160px", height: "230px", objectFit: "cover" }}
            />

            <div>
              <h3 className="fw-bold">Dr Jangaa Mani</h3>
              <p className="text-primary mb-1"> 0 Years Experience</p>
              <p className="mb-1">
                <strong>Specialization:</strong> Corporate Criminal
              </p>
              <p className="mb-1">
                <strong>Languages:</strong> English, Telugu, Hindi, Tamil, Malayalam, Kannada
              </p>
              <p className="mb-1">
                <strong>Qualifications:</strong> B.tech-EEE, MBBS
              </p>
              <p className="mb-1">
                <strong>Hospital:</strong> Janga Hospitals, Avadi, Chennai
              </p>
              <p className="mb-1">
                <strong>Timings:</strong> MON-SAT (09:00 AM - 04:00 PM)
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

      
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Body className="text-center">
          <h5 className="fw-bold">Hello, Guest!</h5>
          <p>Quick login using Mobile Number.</p>
          <Form.Control
            type="tel"
            placeholder="+91"
            maxLength={10}
            className="mb-3"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Button variant="info" className="w-100 rounded-pill fw-bold" onClick={handleLogin}>
            GET STARTED
          </Button>
          <div className="mt-3">
            <Button variant="link" onClick={() => setShowLoginModal(false)}>
              Go Back
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <div className="mt-5">
        <h4 className="fw-bold">Overview</h4>
        <p>Solla onnum illa...</p>
      </div>
    </div>
  );
};

export default DoctorDescription;
