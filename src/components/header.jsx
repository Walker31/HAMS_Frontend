import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HeaderSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [reason, setReason] = useState('');
  const [step, setStep] = useState(1);
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
    { name: 'General Physician', icon: '🩺' },
    { name: 'Neurologist', icon: '🧠' },
    { name: 'Psychiatrist', icon: '💬' },
    { name: 'Neurosurgeon', icon: '🧬' },
    { name: 'Cardiologist', icon: '💔' },
    { name: 'Orthopedic Surgeon', icon: '🦴' },
    { name: 'Rheumatologist', icon: '💊' },
    { name: 'Obstetrician & Gynecologist', icon: '🤰' },
    { name: 'Pediatrician', icon: '🧒' },
    { name: 'Fertility Specialist', icon: '🧬' },
    { name: 'Ophthalmologist', icon: '👁️' },
    { name: 'ENT Specialist', icon: '👂' },
    { name: 'Dentist', icon: '🦷' },
    { name: 'Gastroenterologist', icon: '🍽️' },
    { name: 'Pulmonologist', icon: '🌬️' },
    { name: 'Urologist', icon: '🚽' },
    { name: 'Oncologist', icon: '🎗️' },
    { name: 'Dermatologist', icon: '🧴' }
  ];

  const reasonMap = {
    'General Physician': ['Fever', 'Cold and Cough', 'General Checkup'],
    'Neurologist': ['Headache', 'Seizures', 'Memory Loss'],
    'Psychiatrist': ['Depression', 'Anxiety', 'Sleep Disorders'],
    'Neurosurgeon': ['Brain Surgery Consult', 'Spinal Issues'],
    'Cardiologist': ['Chest Pain', 'High BP', 'Heart Palpitations'],
    'Orthopedic Surgeon': ['Fracture', 'Joint Pain', 'Back Pain'],
    'Rheumatologist': ['Arthritis', 'Joint Inflammation'],
    'Obstetrician & Gynecologist': ['Pregnancy Checkup', 'Menstrual Issues'],
    'Pediatrician': ['Child Vaccination', 'Fever in Child'],
    'Fertility Specialist': ['IVF Consultation', 'Infertility'],
    'Ophthalmologist': ['Vision Checkup', 'Eye Pain'],
    'ENT Specialist': ['Ear Pain', 'Hearing Loss'],
    'Dentist': ['Toothache', 'Cavity', 'Braces'],
    'Gastroenterologist': ['Acidity', 'Stomach Pain'],
    'Pulmonologist': ['Cough', 'Asthma', 'Breathlessness'],
    'Urologist': ['Kidney Stone', 'UTI'],
    'Oncologist': ['Cancer Screening', 'Chemotherapy'],
    'Dermatologist': ['Skin Rash', 'Acne', 'Hair Loss']
  };

  const currentReasons = reasonMap[selectedSpecialization] || [];

  const [hospitals, setHospitals] = useState([]);

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
              <div className={`d-flex align-items-center mb-3 ${step === 1 ? 'fw-bold text-primary' : 'text-muted'}`} style={{ cursor: 'pointer' }} onClick={() => setStep(1)}>
                <div className="border rounded-circle d-flex justify-content-center align-items-center" style={{ width: '30px', height: '30px' }}>1</div>
                <span className="ms-2">Specialization</span>
              </div>
              <div className={`d-flex align-items-center ${step === 2 ? 'fw-bold text-primary' : 'text-muted'}`} style={{ cursor: 'pointer' }} onClick={() => setStep(2)}>
                <div className="border rounded-circle d-flex justify-content-center align-items-center" style={{ width: '30px', height: '30px' }}>2</div>
                <span className="ms-4">Reason</span>
              </div>
              <div className={`d-flex align-items-center ${step === 3 ? 'fw-bold text-primary' : 'text-muted'}`} style={{ cursor: 'pointer' }} onClick={() => setStep(3)}>
                <div className="border rounded-circle d-flex justify-content-center align-items-center" style={{ width: '30px', height: '30px' }}>3</div>
                <span className="ms-2">Select Hospital</span>
              </div>
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
                            className={`border rounded py-3 bg-light ${selectedSpecialization === spec.name ? 'border-primary bg-primary text-white' : ''}`}
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
                                reason: reason
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
