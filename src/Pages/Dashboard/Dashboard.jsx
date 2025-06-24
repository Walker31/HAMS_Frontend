import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import CalendarWithSlots from "./CalendarWithSlots";
import "react-calendar/dist/Calendar.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  OverviewModal,
  RejectModal,
  PrescriptionModal,
  ViewPrescriptionModal,
} from "./DoctorModals";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

  const locationState = location.state || {};
  const doctor = locationState.doctor || {};

  const [doctorState, setDoctorState] = useState(doctor);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [previousAppointments, setPreviousAppointments] = useState([]);

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectIndex, setRejectIndex] = useState(null);

  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [prescriptionIndex, setPrescriptionIndex] = useState(null);
  const [currentPrescription, setCurrentPrescription] = useState("");

  const [showViewPrescription, setShowViewPrescription] = useState(false);
  const [viewedPatientName, setViewedPatientName] = useState("");
  const [viewedPrescription, setViewedPrescription] = useState("");

  const [collapsed, setCollapsed] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [description, setDescription] = useState("");
  const [view, setView] = useState("dashboard");

  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleOverviewClick = () => {
    setDescription(doctorState.overview || "");
    setShowOverview(true);
  };

  const handleSaveDescription = async () => {
    try {
      await axios.put(`${base_url}/doctors/update/${doctorState._id}`, {
        overview: description,
      });
      setDoctorState((prev) => ({ ...prev, overview: description }));
      alert("Overview updated successfully");
      setShowOverview(false);
    } catch (error) {
      console.error("Error updating overview:", error);
      alert("Failed to update overview. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("doctorId");
    navigate("/", { replace: true });
    alert("Logged out successfully");
  };

  const handleStatusChange = async (index, status) => {
    const appt = todayAppointments[index];
    const appointmentId = appt._id || appt.appId || appt.id;

    if (status === "Done") {
      setPrescriptionIndex(index);
      setShowPrescriptionModal(true);
    } else if (status === "Rejected") {
      setRejectIndex(index);
      setShowRejectModal(true);
    } else if (status === "Rescheduled") {
      try {
        await updateAppointmentStatus(appointmentId, "Rescheduled");
        moveToPrevious(index, "Rescheduled");
      } catch (error) {
        console.error("Failed to reschedule appointment:", error);
      }
    }
  };

  const moveToPrevious = (index, status, reasonOverride = null) => {
    const appt = todayAppointments[index];
    const updatedToday = [...todayAppointments];
    updatedToday.splice(index, 1);
    setTodayAppointments(updatedToday);

    setPreviousAppointments((prev) => [
      ...prev,
      {
        ...appt,
        reasonForReject: reasonOverride || rejectionReason,
        appStatus: status,
      },
    ]);
  };

  const handleRejectConfirm = async () => {
  if (!rejectionReason.trim()) {
    alert("Please enter a rejection reason.");
    return;
  }

  try {
    const appt = todayAppointments[rejectIndex];
    const appointmentId = appt._id || appt.appId || appt.id;
    console.log("Rejecting appointment ID:", appointmentId);  

    await updateAppointmentStatus(appointmentId, "Rejected", rejectionReason);
    console.log("Status updated, moving to previous"); 

    moveToPrevious(rejectIndex, "Rejected", rejectionReason);

    setShowRejectModal(false);
    setRejectionReason("");
    setRejectIndex(null);
  } catch (error) {
    console.error("Failed to reject appointment:", error);  t
  }
};
  const handleSavePrescription = async () => {
    try {
      const appt = todayAppointments[prescriptionIndex];
      const appointmentId = appt._id || appt.appId || appt.id;

      await updateAppointmentStatus(
        appointmentId,
        "Completed",
        "",
        currentPrescription
      );
      moveToPrevious(prescriptionIndex, "Completed");
      setShowPrescriptionModal(false);
      setCurrentPrescription("");
      setPrescriptionIndex(null);
    } catch (error) {
      console.error("Failed to save prescription:", error);
    }
  };

  const updateAppointmentStatus = async (apptId, newStatus, reason = "", prescriptionText = "") => {
    try {
      const payload = {
        appStatus: newStatus,
        rejectionReason: reason,
        prescription: prescriptionText,
      };

      await axios.put(`${base_url}/appointments/update-status/${apptId}`, payload);
    } catch (error) {
      console.error("Error updating appointment status:", error);
      throw error;
    }
  };

  const fetchTodayAppointments = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];
    

    const doctorId = doctorState?.doctorId || doctorState?._id;
    if (!doctorId) return console.warn("No valid doctorId found for today appointments");

    const res = await axios.get(
      `${base_url}/appointments/pending/${today}?doctorId=${doctorId}`
    );
    setTodayAppointments(res.data);
  } catch (error) {
    console.error("Error fetching today's appointments:", error);
  }
};
  const fetchPreviousAppointments = async () => {
  try {
    const doctorId = doctorState?.doctorId || doctorState?._id;
    if (!doctorId) return console.warn("No valid doctorId found for previous appointments");

    const res = await axios.get(
      `${base_url}/appointments/previous?doctorId=${doctorId}`
    );
    setPreviousAppointments(res.data);
  } catch (error) {
    console.error("Error fetching previous appointments:", error);
  }
};

  const fetchDoctorDetails = async () => {
  try {
    const idFromState = location.state?.doctor?.doctorId || location.state?.doctorId;
    const idFromStorage = localStorage.getItem("doctorId");
    const doctorId = idFromState || idFromStorage;

    if (!doctorId) {
      console.warn("Doctor ID not found in state or localStorage.");
      return;
    }

    console.log("Fetching doctor profile for ID:", doctorId);
    const res = await axios.get(`${base_url}/doctors/${doctorId}/profile`);
    
    console.log("Fetched doctor profile data:", res.data);

    
    if (res.data && res.data.doctor) {
      setDoctorState(res.data.doctor); 
    }
  } catch (error) {
    console.error("Error fetching doctor details:", error);
  }
};
  useEffect(() => {
  const idToSave = location.state?.doctor?.doctorId || location.state?.doctorId;
  if (idToSave) {
    localStorage.setItem("doctorId", idToSave);
  }
}, []);

  useEffect(() => {
  if (doctorState.doctorId || doctorState._id) {
    fetchDoctorDetails();
    fetchTodayAppointments();
    fetchPreviousAppointments();
  }
}, [doctorState.doctorId || doctorState.useE_id])


  const renderDashboardContent = () => (
    <div className="p-4">
      <Row className="mb-4">
        <Col md={6} lg={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Patients</Card.Title>
              <h4>
                {
                  previousAppointments.filter(
                    (appt) => appt.appStatus === "Completed"
                  ).length
                }
              </h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Today's Appointments</Card.Title>
              <h4>{todayAppointments.length}</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          
          <div className="d-flex justify-content-between align-items-center mb-2">
    <h5 className="text-primary mb-0">Today's Appointments</h5>
    <Button variant="outline-primary" size="sm" onClick={fetchTodayAppointments}>
      🔄 Refresh
    </Button>
  </div>
          {todayAppointments.length === 0 ? (
            <p>No appointments for today.</p>
          ) : (
            todayAppointments.map((appt, idx) => (
              <Card key={idx} className="mb-3 shadow-sm">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <span>Patient ID: {appt.patientId}</span>
                    <br />
                    <span><strong>Date:</strong> {appt.date}</span>
                    <br/>
                    <span>Slot: {appt.slotNumber}</span>
                  </div>
                  <div>
                    <Button variant="success" size="sm" className="me-2" onClick={() => handleStatusChange(idx, "Done")}>Done</Button>
                    <Button variant="danger" size="sm" className="me-2" onClick={() => handleStatusChange(idx, "Rejected")}>Reject</Button>
                    <Button variant="warning" size="sm" onClick={() => handleStatusChange(idx, "Rescheduled")}>Reschedule</Button>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>

        <Col md={6}>
         <h5 className="text-primary">Previous Appointments</h5>
{previousAppointments.length === 0 ? (
  <p>No previous appointments.</p>
) : (
  previousAppointments.map((appt, idx) => (
    <Card
      key={idx}
      className="mb-3 border-start border-4 border-primary shadow-sm"
    >
      <Card.Body>
        <div>
          <p><strong>Patient ID:</strong> {appt.patientId}</p>
          <p><strong>Slot:</strong> {appt.slotNumber}</p>
          <p><strong>Date:</strong> {appt.date}</p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`badge bg-${
                appt.appStatus === "Completed"
                  ? "success"
                  : appt.appStatus === "Rejected"
                  ? "danger"
                  : "warning"
              }`}
            >
              {appt.appStatus}
            </span>
          </p>

          {appt.appStatus === "Rejected" && appt.reasonForReject && (
            <p className="text-danger mt-2">
              <strong>Rejection Reason:</strong> {appt.reasonForReject}
            </p>
          )}

          {appt.appStatus === "Completed" && appt.prescription && (
            <p className="text-success mt-2">
              <strong>Prescription:</strong> {appt.prescription}
            </p>
          )}
        </div>
      </Card.Body>
    </Card>
  ))
)}
        </Col>
      </Row>
    </div>
  );

  const renderAppointmentCalendar = () => (
    <div className="p-4">
      <CalendarWithSlots />
    </div>
  );

  const Header = ({ toggleSidebar }) => (
    <div className="bg-primary text-white p-3 d-flex align-items-center" style={{ position: "sticky", top: 0, zIndex: 1001 }}>
      <Button variant="outline-light" onClick={toggleSidebar} className="me-3">☰</Button>
      <h4 className="mb-0">Doctor Dashboard</h4>
    </div>
  );

  return (
    <Container fluid className="p-0" style={{ overflowX: "hidden" }}>
      <Header toggleSidebar={toggleSidebar} />
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <div className={`p-0 bg-dark text-white ${collapsed ? "collapsed" : ""}`}
             style={{ width: collapsed ? "0" : "250px", overflow: "hidden", transition: "all 0.3s ease-in-out" }}>
          {!collapsed && (
            <div>
              <div className="d-flex flex-column align-items-center text-center p-3">
                <img src={doctorState?.photo || "Doctor photo"}
                     className="rounded-circle mb-3"
                     style={{ width: "120px", height: "120px", objectFit: "cover" }}
                     alt="Doctor" />
                <h5>{doctorState?.name || "Doctor Name"}</h5>
              </div>
              <ul className="nav flex-column">
                <li className="nav-item"><a className="nav-link text-white" href="/">Home</a></li>
                <li className="nav-item"><a className="nav-link text-white" href="#" onClick={() => setView("dashboard")}>Dashboard</a></li>
                <li className="nav-item"><a className="nav-link text-white" href="#" onClick={() => setView("appointments")}>Appointments</a></li>
                <li className="nav-item"><a className="nav-link text-white" href="#" onClick={handleOverviewClick}>Overview</a></li>
                <li className="nav-item"><a className="nav-link text-warning" href="#" onClick={handleLogout}>Logout</a></li>
              </ul>
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          {view === "dashboard" ? renderDashboardContent() : renderAppointmentCalendar()}
        </div>
      </div>

      <OverviewModal show={showOverview} onClose={() => setShowOverview(false)} description={description} setDescription={setDescription} onSave={handleSaveDescription} />
      <RejectModal show={showRejectModal} onClose={() => setShowRejectModal(false)} rejectionReason={rejectionReason} setRejectionReason={setRejectionReason} onConfirm={handleRejectConfirm} />
      <PrescriptionModal show={showPrescriptionModal} onClose={() => setShowPrescriptionModal(false)} name={todayAppointments[prescriptionIndex]?.name} prescription={currentPrescription} setPrescription={setCurrentPrescription} onSave={handleSavePrescription} />
      <ViewPrescriptionModal show={showViewPrescription} onClose={() => setShowViewPrescription(false)} name={viewedPatientName} prescription={viewedPrescription} />
    </Container>
  );
};

export default DoctorDashboard;
