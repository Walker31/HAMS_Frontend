import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

const HeaderSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookClick = () => setShowPopup(true);
  const handleClose = () => {
    setShowPopup(false);
    setName("");
    setSelectedDate(null);
    setSpecialization("");
  };

  const sectionStyle = {
    backgroundImage: "url('/src/assets/headerpic.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "550px",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSubmitting(false);
    setShowPopup(false);
  };

  return (
    <div
      style={sectionStyle}
      className="d-flex justify-content-center align-items-center flex-column text-center"
    >
      <div
        className="border border-primary rounded p-4 bg-light mb-3"
        style={{ width: "300px", cursor: "pointer" }}
        onClick={handleBookClick}
      >
        <h5 className="text-primary fw-bold mb-2">Book Appointment</h5>
        <p className="text-muted mb-0">Long established fact that...</p>
      </div>

      {showPopup && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 flex justify-center align-items-center z-5"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="appointment-title"
        >
          <div
            className="modal-container flex flex-col gap-1 bg-white p-4 rounded position-relative"
            style={{ width: "350px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-end justify-end top-0 m-0">
              <button
                className="btn-close"
                onClick={handleClose}
                aria-label="Close appointment form"
              />
            </div>

            <h5 id="appointment-title" className="mb-3 text-center">
              Book an Appointment
            </h5>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="">
                <label
                  htmlFor="nameInput"
                  className="form-label visually-hidden"
                >
                  Your Name
                </label>
                <input
                  id="nameInput"
                  type="text"
                  placeholder="Your Name"
                  className="form-control text-center"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Preferred Date"
                  value={selectedDate}
                  onChange={setSelectedDate}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      sx: { "& .MuiInputBase-input": { textAlign: "center" } },
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="form-control mb-3 text-center"
                      fullWidth
                      required
                    />
                  )}
                />
              </LocalizationProvider>
              <div className="">
                <label
                  htmlFor="specializationSelect"
                  className="form-label visually-hidden"
                >
                  Specialization
                </label>
                <select
                  id="specializationSelect"
                  className="form-select mb-4 text-center"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Specialization
                  </option>
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
                  <option>ENT Specialist</option>
                  <option>Dentist</option>
                  <option>Gastroenterologist</option>
                  <option>Pulmonologist</option>
                  <option>Urologist</option>
                  <option>Oncologist</option>
                  <option>Dermatologist</option>
                </select>
              </div>
              <button
                className="btn btn-primary w-100"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Look for Available Doctors"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderSection;
