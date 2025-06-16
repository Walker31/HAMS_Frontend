import { useNavigate } from "react-router-dom";

const DoctorsAvailable = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/doctor-description");
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm rounded d-flex flex-row flex-wrap align-items-center">
        
        <div className="me-4 mb-3 mb-md-0 text-center">
          <img
            src="/src/assets/doctorpic2.jpg"
            alt="Doctor"
            className="rounded-circle"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
        </div>

        
        <div className="flex-grow-1">
          <h5 className="fw-bold text-warning mb-1">Dr Jangaa Mani</h5>
          <p className="text-muted mb-1">
            <span className="text-info">Corporate Criminal</span> &nbsp;|&nbsp; 0 years exp
          </p>
          <p className="mb-1">
            <i className="bi bi-geo-alt-fill"></i> Janga Hospitals, Avadi, Chennai
          </p>
          <p className="mb-1">
            <i className="bi bi-translate"></i> English, Telugu, Hindi, Tamil, Malayalam, Kannada
          </p>
          <p className="mb-0">
            <i className="bi bi-mortarboard-fill"></i> B.tech-EEE, MBBS, MD-Backendology, MS-Githubology
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

export default DoctorsAvailable;
