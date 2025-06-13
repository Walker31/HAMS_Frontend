import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorDetails = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    alert("naalaiku appointment function add panitren guyss");
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm rounded d-flex flex-row flex-wrap align-items-center">
        
        <div className="me-4 mb-3 mb-md-0 text-center">
          <img
            src="/src/assets/doctorpic.png"
            alt="Doctor"
            className="rounded-circle"
            style={{ width: "100px", height: "160px", objectFit: "cover" }}
          />
        </div>

        
        <div className="flex-grow-1">
          <h5 className="fw-bold text-warning mb-1">Dr Akila Mani</h5>
          <p className="text-muted mb-1">
            <span className="text-info">General Medicine</span> &nbsp;|&nbsp; 20 years exp
          </p>
          <p className="mb-1">
            <i className="bi bi-geo-alt-fill"></i> Apollo Speciality Hospitals, Vanagaram, Chennai
          </p>
          <p className="mb-1">
            <i className="bi bi-translate"></i> English,Arabic
          </p>
          <p className="mb-0">
            <i className="bi bi-mortarboard-fill"></i> MBBS, MRCP
          </p>
        </div>

       
        <div className="text-end ms-auto">
          <p className="text-warning fw-semibold mb-0">MON-SAT</p>
          <p className="text-info">(09:00 AM-04:00 PM)</p>
          <button className="btn btn-primary " onClick={handleBookNow}>
            BOOK APPOINTMENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
