import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';

const HeaderSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleBookClick = () => setShowPopup(true);
  const handleClose = () => setShowPopup(false);

  const sectionStyle = {
    backgroundImage: "url('/src/assets/headerpic.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '550px',
    width: '100vw',
  };

  return (
    <div style={sectionStyle} className="d-flex justify-content-center align-items-center flex-column text-center m-0 p-0">
      <div
        className="border border-primary rounded p-4 bg-light mb-3"
        style={{ width: '300px', cursor: 'pointer' }}
        onClick={handleBookClick}
      >
        <h5 className="text-primary fw-bold mb-2">Book Appointment</h5>
        <p className="text-muted mb-0">Long established fact that...</p>
      </div>

      {showPopup && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center z-3">
          <div className="bg-white p-4 rounded position-relative" style={{ width: '350px' }}>
            <button className="btn-close position-absolute top-0 end-0 m-2" onClick={handleClose}></button>
            <h5 className="mb-3">Book an Appointment</h5>

            <input type="text" placeholder="Your Name" className="form-control mb-2 my-2 text-center" />

           <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
              className='w-max'
              sx={{ width: '100%' }}
              slotProps={{
                textField: {
                  className: "text-center mb-2",
                }
              }}
                label="Preferred Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className="form-control mb-2 text-center "
                    fullWidth
                  />
                )}
              />
            </LocalizationProvider></div>
            <select className="form-select align-items-center mb-2 my-2 text-center">
              <option>Specialization</option>
              <option>General Physician</option>
              <option>Neurologist</option>
              <option>Psychiatrist</option>
              <option>Neurosurgeon</option>
              <option>Cardiologist</option>
              <option>Orthopedic Surgeon</option>
              <option>Rheumatologist</option>
              <option>Obstetrician & Gynecologist</option>
              <option>Pediatrician</option>
              <option>Fertility Specialist</option>
              <option>Ophthalmologist</option>
              <option>ENT Specialist </option>
              <option>Dentist</option>
              <option>Gastroenterologist</option>
              <option>Pulmonologist</option>
              <option>Urologist</option>
              <option>Oncologist</option>
              <option>Dermatologist</option>
            </select>
            <button className="btn btn-primary w-100">Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderSection;
