import {useNavigate} from "react-router-dom";

const DoctorDetails = ()=>{
    const navigate = useNavigate();

    const handleBookNow = () => {
       alert("Booking functionality will be added next.")
    };

    return (
        <div className="container mt-5">
            <div className="d-flex gap-4 flex-wrap">
                <div>
                    <img src ="/src/assets/doctorpic.png" alt="Doctor" className="img-fluid rounded-circle mb-3" style={{width: "200px", height: "auto"}} />
                </div>

                <div>
                    <h2>Dr Akila Mani</h2>
                    <p className="text-muted">20+ Years Experience</p>
                    <p>
                        <strong>Qualifications:</strong>MBBS,MRCP
                    </p>
                    <p>
                        <strong>Address:</strong>No.64, Vanagaram to Ambattur Main Road,Chennai
                    </p>
                    <button className="btn btn-primary mt-3" onClick={handleBookNow}>
                        Book Appointment
                        </button>
            </div>
           
           </div>
           
        </div>
    );
};

export default DoctorDetails;
