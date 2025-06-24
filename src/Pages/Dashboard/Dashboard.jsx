import { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeIcon from '@mui/icons-material/Home';
import {
  Container, Row, Col, Card, Button,
  OverlayTrigger, Tooltip, Nav
} from "react-bootstrap";
import CalendarWithSlots from "./CalendarWithSlots";
import { useNavigate, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import {
  OverviewModal,
  RejectModal,
  PrescriptionModal,
  ViewPrescriptionModal,
} from "./DoctorModals";

const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialDoctor = location?.state?.doctor || {};

  const [doctor, setDoctor] = useState(initialDoctor);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [previousAppointments, setPreviousAppointments] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [view, setView] = useState("dashboard");

  const [showOverview, setShowOverview] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showViewPrescription, setShowViewPrescription] = useState(false);

  const [rejectionReason, setRejectionReason] = useState("");
  const [description, setDescription] = useState("");

  const [currentIndex, setCurrentIndex] = useState(null);
  const [prescriptionIndex, setPrescriptionIndex] = useState(null);
  const [currentPrescription, setCurrentPrescription] = useState("");
  const [viewedPrescription, setViewedPrescription] = useState("");
  const [viewedPatientName, setViewedPatientName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  useEffect(() => {
    if (initialDoctor?.doctorId) {
      localStorage.setItem("doctorId", initialDoctor.doctorId);
    }
  }, [initialDoctor]);

  const fetchDoctorDetails = useCallback(async () => {
    const doctorId = initialDoctor?.doctorId || localStorage.getItem("doctorId");
    if (!doctorId) return;

    try {
      const res = await axios.get(`${base_url}/doctors/${doctorId}/profile`);
      if (res.data?.doctor) setDoctor(res.data.doctor);
    } catch (err) {
      console.error("Error fetching doctor details:", err);
    }
  }, [initialDoctor]);

  const fetchAppointments = useCallback(async () => {
    const doctorId = doctor?.doctorId || localStorage.getItem("doctorId");
    if (!doctorId) return;

    try {
      const today = new Date().toISOString().split("T")[0];

      const [todayRes, prevRes] = await Promise.all([
        axios.get(`${base_url}/appointments/pending/${today}?doctorId=${doctorId}`),
        axios.get(`${base_url}/appointments/previous?doctorId=${doctorId}`),
      ]);

      setTodayAppointments(todayRes.data || []);
      setPreviousAppointments(prevRes.data || []);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  }, [doctor]);

  useEffect(() => {
    fetchDoctorDetails();
    fetchAppointments();
  }, [fetchDoctorDetails, fetchAppointments]);

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("doctorId");
    navigate("/", { replace: true });
  };

  const updateAppointmentStatus = async (apptId, status, reason = "", prescriptionText = "") => {
    try {
      await axios.put(`${base_url}/appointments/update-status/${apptId}`, {
        appStatus: status,
        rejectionReason: reason,
        prescription: prescriptionText,
      });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const moveToPrevious = (index, status, reason = "", prescription = "") => {
    const appt = todayAppointments[index];
    const updatedToday = [...todayAppointments];
    updatedToday.splice(index, 1);
    setTodayAppointments(updatedToday);

    setPreviousAppointments((prev) => [
      ...prev,
      {
        ...appt,
        appStatus: status,
        reasonForReject: reason,
        prescription,
      },
    ]);
  };

  const handleStatusChange = (index, status) => {
    setCurrentIndex(index);

    if (status === "Done") {
      setPrescriptionIndex(index);
      setShowPrescriptionModal(true);
    } else if (status === "Rejected") {
      setShowRejectModal(true);
    } else if (status === "Rescheduled") {
      const appt = todayAppointments[index];
      updateAppointmentStatus(appt.appId, "Rescheduled");
      moveToPrevious(index, "Rescheduled");
    }
  };

  const handleRejectConfirm = async () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason.");
      return;
    }

    const appt = todayAppointments[currentIndex];
    await updateAppointmentStatus(appt.appId, "Rejected", rejectionReason);
    moveToPrevious(currentIndex, "Rejected", rejectionReason);
    setShowRejectModal(false);
    setRejectionReason("");
    setCurrentIndex(null);
  };

  const handleSavePrescription = async () => {
    const appt = todayAppointments[prescriptionIndex];
    const appointmentId = appt.appId;

    try {
      await updateAppointmentStatus(appointmentId, "Completed", "", currentPrescription);
      moveToPrevious(prescriptionIndex, "Completed", "", currentPrescription);
      setShowPrescriptionModal(false);
      setCurrentPrescription("");
      setPrescriptionIndex(null);
    } catch (err) {
      console.error("Error saving prescription:", err);
    }
  };

  const handleOverviewClick = () => {
    setDescription(doctor?.overview || "");
    setShowOverview(true);
  };

  const handleSaveDescription = async () => {
    try {
      await axios.put(`${base_url}/doctors/update/${doctor.doctorId}`, { overview: description });
      setDoctor((prev) => ({ ...prev, overview: description }));
      setShowOverview(false);
    } catch (err) {
      alert("Failed to save overview");
    }
  };

  const renderDashboardContent = () => (
    <div className="p-4">
      <Row className="mb-4">
        <Col md={6} lg={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Patients</Card.Title>
              <h4>{previousAppointments.filter((a) => a.appStatus === "Completed").length}</h4>
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
            <Button variant="outline-primary" size="sm" onClick={fetchAppointments}>🔄 Refresh</Button>
          </div>
          {todayAppointments.length === 0 ? (
            <p>No appointments for today.</p>
          ) : (
            todayAppointments.map((appt, idx) => (
              <Card key={appt.appId || idx} className="mb-3 shadow-sm">
                <Card.Body className="d-flex justify-content-between">
                  <div>
                    <div><strong>Name:</strong> {appt.name}</div>
                    <div><strong>Date:</strong> {appt.date}</div>
                    <div><strong>Slot:</strong> {appt.slotNumber}</div>
                  </div>
                  <div>
                    <Button className="me-2" size="sm" variant="success" onClick={() => handleStatusChange(idx, "Done")}>Done</Button>
                    <Button className="me-2" size="sm" variant="danger" onClick={() => handleStatusChange(idx, "Rejected")}>Reject</Button>
                    <Button size="sm" variant="warning" onClick={() => handleStatusChange(idx, "Rescheduled")}>Reschedule</Button>
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
        <Col md={6}>
          <h5 className="text-primary">Previous Appointments</h5>
          {previousAppointments.map((appt, idx) => (
            <Card key={idx} className="mb-3 border-start border-4 border-primary shadow-sm">
              <Card.Body>
                <p><strong>Patient ID:</strong> {appt.patientId}</p>
                <p><strong>Date:</strong> {appt.date}</p>
                <p><strong>Slot:</strong> {appt.slotNumber}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`badge bg-${appt.appStatus === "Completed" ? "success" : appt.appStatus === "Rejected" ? "danger" : "warning"}`}>
                    {appt.appStatus}
                  </span>
                </p>
                {appt.reasonForReject && (
                  <p className="text-danger"><strong>Reason:</strong> {appt.reasonForReject}</p>
                )}
                {appt.prescription && (
                  <p className="text-success"><strong>Prescription:</strong> {appt.prescription}</p>
                )}
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </div>
  );

  const renderCalendarView = () => (
    <div className="p-4">
      <CalendarWithSlots />
    </div>
  );

  const Sidebar = () => (
    <div className={`bg-dark text-white ${sidebarCollapsed ? "collapsed" : ""}`} style={{ width: sidebarCollapsed ? "0" : "250px", transition: "0.3s", overflow: "hidden" }}>
      {!sidebarCollapsed && (
        <>
          <div className="text-center p-3">
            <img
              src={doctor?.photo || "https://via.placeholder.com/120"}
              className="rounded-circle mb-3"
              alt="Doctor"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <h5>{doctor?.name || "Doctor Name"}</h5>
          </div>
          <Nav className="flex-column p-3">
            <Nav.Link className="text-white" onClick={() => setView("dashboard")}>Dashboard</Nav.Link>
            <Nav.Link className="text-white" onClick={() => setView("appointments")}>Appointments</Nav.Link>
            <Nav.Link className="text-white" onClick={handleOverviewClick}>Overview</Nav.Link>
            <Nav.Link className="text-warning" onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </>
      )}
    </div>
  );

  const Header = () => (
    <header className="bg-primary text-white p-3 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <Button variant="outline-light" onClick={toggleSidebar}>☰</Button>
        <h5 className="ms-3 mb-0">Doctor Dashboard</h5>
      </div>
      <OverlayTrigger placement="bottom" overlay={<Tooltip>Go to Home</Tooltip>}>
        <IconButton onClick={() => navigate("/")} style={{ color: "white" }}>
          <HomeIcon />
        </IconButton>
      </OverlayTrigger>
    </header>
  );

  return (
    <Container fluid className="p-0" style={{ overflowX: "hidden" }}>
      <Header />
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          {view === "dashboard" ? renderDashboardContent() : renderCalendarView()}
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
