import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const HeaderSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleBookClick = () => setShowPopup(true);
  const handleClose = () => {
    setShowPopup(false);
    setStep(1);
    setSelectedSpecialization('');
  };

  const sectionStyle = {
    backgroundImage: "url('/src/assets/headerpic2.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '550px',
    width: '100vw',
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

  const hospitals = [
    'HAMS Hospital',
    'Janga Hospital',
    'Durai Hospital',
    'Jayyy Hospital',
    'Shrudeepan Hospital',
    'Mahimaa Hospital',
    'Chairperson Hospital',
  ];

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

            <div className="d-flex flex-column justify-content-start pe-4 border-end" style={{ width: '200px' }}>
              <h4 className="mb-4">Hi</h4>
              <p>Follow the steps below:</p>
              <hr />
              <div
                className={`d-flex align-items-center mb-3 ${step === 1 ? 'fw-bold text-primary' : 'text-muted'}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setStep(1)}
              >
                <div className="border rounded-circle d-flex justify-content-center align-items-center" style={{ width: '30px', height: '30px' }}>1</div>
                <span className="ms-2">Specialization</span>
              </div>
              <div
                className={`d-flex align-items-center ${step === 2 ? 'fw-bold text-primary' : 'text-muted'}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setStep(2)}
              >
                <div className="border rounded-circle d-flex justify-content-center align-items-center" style={{ width: '30px', height: '30px' }}>2</div>
                <span className="ms-2">Select Hospital</span>
              </div>
            </div>

            <div className="ps-4 w-100">
              {step === 1 && (
                <>
                  <h5>Select Specialization</h5>
                  <div className="overflow-auto" style={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: '350px' }}>
                    <div className="row row-cols-3 g-3">
                      {specializations.map((spec) => (
                        <div key={spec.name} className="col text-center">
                          <div
                            className={`border rounded py-3 bg-light ${selectedSpecialization === spec.name ? 'border-primary bg-primary text-white' : ''}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              setSelectedSpecialization(spec.name);
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
                  <h5 className="mb-3">Select Hospital</h5>
                  <div className="row row-cols-2 g-3">
                    {hospitals.map((hosp) => (
                      <div key={hosp} className="col text-center">
                        <div
                          className="border rounded py-3 bg-light"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            setShowPopup(false);
                            navigate('/doctors-available');
                          }}
                        >
                          🏥
                          <div style={{ fontSize: '14px', marginTop: '5px' }}>{hosp}</div>
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
