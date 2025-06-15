import { useNavigate } from "react-router-dom";
import doctorPic from '/src/assets/doctorpic2.jpg'

const DoctorsAvailable = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/doctor-description");
  };

  return (
    <div className="container my-5">
      <div className="card p-4 shadow-sm rounded d-flex flex-row flex-wrap align-items-center">

        {/* Doctor Image */}
        <div className="me-4 mb-3 mb-md-0 text-center">
          <img
            src={doctorPic}
            alt="Dr. Jangaa Mani"
            className="border rounded-circle"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
        </div>

        {/* Doctor Info */}
        <div className="flex-grow-1">
          <h5 className="fw-bold text-primary mb-1">Dr. Jangaa Mani</h5>
          <p className="text-muted mb-1">
            <span className="text-info">General Physician</span> &nbsp;|&nbsp; <strong>0 years experience</strong>
          </p>
          <p className="mb-1">
            <i className="bi bi-geo-alt-fill me-1 text-secondary"></i>
            Janga Hospitals, Avadi, Chennai
          </p>
          <p className="mb-1">
            <i className="bi bi-translate me-1 text-secondary"></i>
            Languages: English, Telugu, Hindi, Tamil, Malayalam, Kannada
          </p>
          <p className="mb-0">
            <i className="bi bi-mortarboard-fill me-1 text-secondary"></i>
            Qualifications: B.Tech (EEE), IPS, B.Sc (Fashion Technology)
          </p>
        </div>

        {/* Booking Section */}
        <div className="text-end ms-auto">
          <p className="text-warning fw-semibold mb-0">Mon - Sat</p>
          <p className="text-info">(09:00 AM - 04:00 PM)</p>
          <button className="btn btn-primary" onClick={handleBookNow}>
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorsAvailable;
