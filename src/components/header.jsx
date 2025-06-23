import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HeaderSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [reason, setReason] = useState('');
  const [step, setStep] = useState(1);
  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();

  const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

  const handleBookClick = () => setShowPopup(true);

  const handleClose = () => {
    setShowPopup(false);
    setStep(1);
    setSelectedSpecialization('');
    setReason('');
  };

  const sectionStyle = {
    backgroundImage: `url("/headerpic2.jpg")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '550px',
    width: '99vw',
  };

  const specializations = [
    { name: 'General Medicine', icon: '🩺' },
    { name: 'Pediatrics', icon: '🧒' },
    { name: 'Cardiology', icon: '💔' },
    { name: 'Dermatology', icon: '🧴' },
    { name: 'Orthopedics', icon: '🦴' },
    { name: 'Gynecology', icon: '🤰' },
    { name: 'Psychiatry', icon: '💬' },
    { name: 'ENT (Otorhinolaryngology)', icon: '👂' },
    { name: 'Ophthalmology', icon: '👁️' },
    { name: 'Neurology', icon: '🧠' },
    { name: 'Oncology', icon: '🎗️' },
    { name: 'Urology', icon: '🚽' },
    { name: 'Nephrology', icon: '💊' },
    { name: 'Gastroenterology', icon: '🍽️' },
    { name: 'Pulmonology', icon: '🌬️' },
    { name: 'Endocrinology', icon: '🧬' },
    { name: 'Radiology', icon: '📷' },
    { name: 'Anesthesiology', icon: '💤' },
    { name: 'Dentistry', icon: '🦷' },
  ];

  const reasonMap = {
    'General Medicine': ['Fever', 'Cold and Cough', 'General Checkup'],
    'Pediatrics': ['Child Vaccination', 'Fever in Child'],
    'Cardiology': ['Chest Pain', 'High BP', 'Heart Palpitations'],
    'Dermatology': ['Skin Rash', 'Acne', 'Hair Loss'],
    'Orthopedics': ['Fracture', 'Joint Pain', 'Back Pain'],
    'Gynecology': ['Pregnancy Checkup', 'Menstrual Issues'],
    'Psychiatry': ['Depression', 'Anxiety', 'Sleep Disorders'],
    'ENT (Otorhinolaryngology)': ['Ear Pain', 'Hearing Loss'],
    'Ophthalmology': ['Vision Checkup', 'Eye Pain'],
    'Neurology': ['Headache', 'Seizures', 'Memory Loss'],
    'Oncology': ['Cancer Screening', 'Chemotherapy'],
    'Urology': ['Kidney Stone', 'UTI'],
    'Nephrology': ['Kidney Function Issues', 'Dialysis'],
    'Gastroenterology': ['Acidity', 'Stomach Pain'],
    'Pulmonology': ['Cough', 'Asthma', 'Breathlessness'],
    'Endocrinology': ['Diabetes', 'Thyroid Disorders'],
    'Radiology': ['X-Ray', 'MRI', 'CT Scan'],
    'Anesthesiology': ['Pre-Surgery Consultation', 'Pain Management'],
    'Dentistry': ['Toothache', 'Cavity', 'Braces'],
  };

  const currentReasons = reasonMap[selectedSpecialization] || [];

  useEffect(() => {
    const lat = 12.9058;
    const lon = 80.2270;
    axios.get(`${base_url}/hospitals/getAll/${lat}/${lon}`)
      .then(response => setHospitals(response.data))
      .catch(error => console.error('Error fetching hospitals:', error));
  }, []);

  return (
    <div style={sectionStyle} className="d-flex justify-content-center align-items-center flex-column text-center m-0 p-0">
      <div
        className="border border-primary rounded p-4 bg-light mb-3"
        style={{ width: '300px', cursor: 'pointer' }}
        onClick={handleBookClick}
      >
        <h5 className="text-primary fw-bold mb-2">Book Appointment</h5>
        <p className="text-muted mb-0">Click to proceed with booking.</p>
      </div>

      {showPopup && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center z-3">
          <div className="bg-white p-4 rounded position-relative d-flex" style={{ width: '800px', minHeight: '500px' }}>
            <button className="btn-close position-absolute top-0 end-0 m-2" onClick={handleClose}></button>

            {/* Step navigation */}
            <div className="d-flex flex-column justify-content-start pe-4 border-end" style={{ width: '200px' }}>
              <h4 className="mb-4">Hi</h4>
              <p>Follow the steps below:</p>
              <hr />
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`d-flex align-items-center mb-3 ${step === num ? 'fw-bold text-primary' : 'text-muted'}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setStep(num)}
                >
                  <div className="border rounded-circle d-flex justify-content-center align-items-center" style={{ width: '30px', height: '30px' }}>
                    {num}
                  </div>
                  <span className="ms-2">
                    {num === 1 ? 'Specialization' : num === 2 ? 'Reason' : 'Select Hospital'}
                  </span>
                </div>
              ))}
            </div>

            {/* Step content */}
            <div className="ps-4 w-100">
              {step === 1 && (
                <>
                  <h5>Select Specialization</h5>
                  <div className="overflow-auto" style={{ maxHeight: '350px' }}>
                    <div className="row row-cols-3 g-3">
                      {specializations.map((spec) => (
                        <div key={spec.name} className="col text-center">
                          <div
                            className={`border rounded py-3 bg-light ${selectedSpecialization === spec.name ? 'border-primary bg-primary text-black' : ''}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              setSelectedSpecialization(spec.name);
                              setReason('');
                              setStep(2);
                            }}
                          >
                            <div style={{ fontSize: '24px' }}>{spec.icon}</div>
                            <div style={{ fontSize: '14px', marginTop: '5px' }}>{spec.name}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h5>Why do you want to see a {selectedSpecialization}?</h5>
                  <select
                    className="form-select mt-3 mb-4"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  >
                    <option value="">-- Select Reason --</option>
                    {currentReasons.map((r, idx) => (
                      <option key={idx} value={r}>{r}</option>
                    ))}
                  </select>
                  {reason && (
                    <button className="btn btn-primary" onClick={() => setStep(3)}>
                      Next: Select Hospital
                    </button>
                  )}
                </>
              )}

              {step === 3 && (
                <>
                  <h5 className="mb-3">Select Hospital</h5>
                  <div className="row row-cols-2 g-3">
                    {hospitals.map((hosp) => (
                      <div key={hosp.RegId} className="col text-center">
                        <div
                          className="border rounded py-3 bg-light"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            setShowPopup(false);
                            navigate(`/${hosp.hospitalName.split(' ')[0]}/doctors-available`, {
                              state: {
                                hname: hosp.hospitalName,
                                specialization: selectedSpecialization,
                                reason: reason,
                              }
                            });
                          }}
                        >
                          🏥
                          <div style={{ fontSize: '14px', marginTop: '5px' }}>{hosp.hospitalName}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderSection;
