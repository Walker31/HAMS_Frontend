import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const DoctorDescription = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpInput, setOtpInput] = useState("");

  const handleSlotClick = (slot) => setSelectedSlot(slot);

  const handleBookNow = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select both a date and a time slot.");
      return;
    }

    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    alert(`✅ Appointment booked on ${selectedDate} at ${selectedSlot}`);
    // Optionally: Reset form
    setSelectedDate("");
    setSelectedSlot("");
  };

  const handleSendOtp = () => {
    const isValid = /^[6-9]\d{9}$/.test(phoneNumber.trim());

    if (isValid) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);
      setOtpSent(true);
      alert(`📩 OTP sent: ${otp}`); // Replace with actual API call
    } else {
      alert("⚠️ Please enter a valid 10-digit Indian mobile number.");
    }
  };

  const handleVerifyOtp = () => {
    if (otpInput === generatedOtp) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setOtpInput("");
      setOtpSent(false);
      alert("🎉 Login successful! Appointment will be booked.");
      handleBookNow();
    } else {
      alert("❌ Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="container my-5">
      <div className="row gy-4">
        {/* Doctor Info */}
        <div className="col-md-8">
          <div className="d-flex align-items-start gap-4">
            <img
              src="/src/assets/doctorpic2.jpg"
              alt="Dr. Jangaa Mani"
              className="img-fluid rounded"
              style={{ width: "160px", height: "230px", objectFit: "cover" }}
            />
            <div>
              <h3 className="fw-bold">Dr. Jangaa Mani</h3>
              <p className="text-primary mb-1">0 Years Experience</p>
              <p className="mb-1"><strong>Specialization:</strong> General Medicine</p>
              <p className="mb-1"><strong>Languages:</strong> English, Telugu, Hindi, Tamil, Malayalam, Kannada</p>
              <p className="mb-1"><strong>Qualifications:</strong> B.Tech (EEE), MBBS</p>
              <p className="mb-1"><strong>Hospital:</strong> Janga Hospitals, Avadi, Chennai</p>
              <p className="mb-1"><strong>Timings:</strong> Mon - Sat (09:00 AM - 04:00 PM)</p>
            </div>
          </div>
        </div>

        {/* Booking Panel */}
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6 className="fw-bold mb-2">Select Date</h6>
            <input
              type="date"
              className="form-control mb-3"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />

            <h6 className="fw-bold mb-2">Available Slots</h6>
            <div className="d-flex flex-wrap gap-2 mb-3">
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

            <button className="btn btn-primary w-100" onClick={handleBookNow}>
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Body className="text-center py-5">
          <h5 className="fw-bold mb-3">Hello, Guest!</h5>
          {!otpSent ? (
            <>
              <p>Login with your mobile number.</p>
              <Form.Control
                type="tel"
                placeholder="Enter 10-digit number"
                maxLength={10}
                className="mb-3"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Button variant="info" className="w-100 rounded-pill fw-bold" onClick={handleSendOtp}>
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <p>Enter the OTP sent to your number.</p>
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                maxLength={6}
                className="mb-3"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
              />
              <Button variant="success" className="w-100 rounded-pill fw-bold" onClick={handleVerifyOtp}>
                Verify OTP
              </Button>
            </>
          )}
          <div className="mt-3">
            <Button variant="link" onClick={() => setShowLoginModal(false)}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Doctor Overview */}
      <div className="mt-5">
        <h4 className="fw-bold">Overview</h4>
        <p>This doctor provides expert consultations. Please book in advance and arrive 10 minutes early.</p>
      </div>
    </div>
  );
};

export default DoctorDescription;
