import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const DoctorsAvailable = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

  const location = useLocation();
  const { doctor, hname, reason = "General Checkup" } = location.state || {};
 // hname = { hosp: "some hospital name" }

  useEffect(() => {
    const latitude = localStorage.getItem("latitude");
    const longitude = localStorage.getItem("longitude");

    axios.get(`${base_url}/doctors/nearby/${latitude}/${longitude}`)
      .then((res) => {
        const allDoctors = res.data;
        setDoctors(allDoctors);

       
          if (specialization) {
          const filtered = allDoctors.filter(doc =>
            doc.specialization?.toLowerCase() === specialization.toLowerCase()
          );
          setFilteredDoctors(filtered);
        } else {
          setFilteredDoctors(allDoctors);
        }
      })
      .catch((err) => console.error(err));
  }, [specialization]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Doctors Available</h2>
      {specialization && (
        <p className="text-center text-muted">
          Showing doctors specialized in <strong>{specialization}</strong>
        </p>
      )}
      <div className="row">
        {doctors.map((doc, idx) => (
          <div className="col-md-4 mb-4" key={idx}>
            <div className="card p-3 shadow-sm h-100">
              <img
                src={doc.photo || "/default-doctor.jpg"}
                className="card-img-top rounded"
                alt={doc.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{doc.name}</h5>
                <p className="card-text"><strong>Specialization:</strong> {doc.specialization || "General"}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/${hname.split(' ')[0]}/doctors-available/DoctorDescription`, { state: { doctor: doc, hname: { hosp: hname } , reason: reason || "General Checkup"} })}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-5">No doctors found for the selected specialization.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorsAvailable;
