import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button, Nav } from "react-bootstrap";
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

const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state || {};
  const initialDoctor = locationState.doctor || {};

  const [doctor, setDoctor] = useState(initialDoctor);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [previousAppointments, setPreviousAppointments] = useState([]);
  const [modals, setModals] = useState({
    overview: false,
    reject: false,
    prescription: false,
    viewPrescription: false,
  });
  const [rejectionReason, setRejectionReason] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentPrescription, setCurrentPrescription] = useState("");
  const [viewedPrescription, setViewedPrescription] = useState({ name: "", prescription: "" });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [description, setDescription] = useState("");
  const [view, setView] = useState("dashboard");

  // Axios: Attach token if present
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);

  // Fetch doctor details and appointments
  const fetchDoctorDetails = useCallback(async () => {
    if (!doctor.doctorId) return;
    try {
      const { data } = await axios.get(`${base_url}/doctors/${doctor.doctorId}`);
      setDoctor(data);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
  }, [doctor.doctorId]);

  const fetchAppointments = useCallback(async () => {
    if (!doctor.doctorId) return;
    const today = new Date().toLocaleDateString("en-CA");
    try {
      const [{ data: todayData }, { data: prevData }] = await Promise.all([
        axios.get(`${base_url}/appointments/pending/${today}?doctorId=${doctor.doctorId}`),
        axios.get(`${base_url}/appointments/previous?doctorId=${doctor.doctorId}`),
      ]);
      setTodayAppointments(todayData);
      setPreviousAppointments(prevData);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }, [doctor.doctorId]);

  useEffect(() => {
    fetchDoctorDetails();
    fetchAppointments();
  }, [fetchDoctorDetails, fetchAppointments]);

  // Sidebar toggle
  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  // Overview
  const handleOverviewClick = () => {
    setDescription(doctor.overview || "");
    setModals((m) => ({ ...m, overview: true }));
  };

  const handleSaveDescription = async () => {
    try {
      const response = await axios.put(`${base_url}/doctors/update/${doctorState.doctorId}`, {overview: description});
      setDoctorState((prev) => ({ ...prev, overview: description }));
      alert("Overview updated successfully");
      setModals((m) => ({ ...m, overview: false }));
    } catch (error) {
      console.error("Error updating overview:", error);
      alert("Failed to update overview. Please try again.");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
    alert("Logged out successfully");
  };

  // Appointment status changes
  const updateAppointmentStatus = async (apptId, newStatus, reason = "") => {
    try {
      await axios.put(`${base_url}/appointments/update-status/${apptId}`, {
        appStatus: newStatus,
        rejectionReason: reason,
      });
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  const moveToPrevious = (index, status, reason = "") => {
    const appt = todayAppointments[index];
    setTodayAppointments((prev) => prev.filter((_, i) => i !== index));
    setPreviousAppointments((prev) => [
      ...prev,
      { ...appt, reasonForReject: reason, appStatus: status },
    ]);
  };

  const handleStatusChange = (index, status) => {
    setCurrentIndex(index);
    if (status === "Done") {
      setModals((m) => ({ ...m, prescription: true }));
    } else if (status === "Rejected") {
      setModals((m) => ({ ...m, reject: true }));
    } else if (status === "Rescheduled") {
      updateAppointmentStatus(todayAppointments[index].appId, "Rescheduled");
      moveToPrevious(index, "Rescheduled");
    }
  };

  useEffect(() => {
    if (!doctorState._id) return;
    fetchDoctorDetails();
    fetchTodayAppointments();
    fetchPreviousAppointments();
  }, [doctorState._id]);

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
                    (appt) => appt.status === "Completed"
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
          <h5 className="text-primary">Today's Appointments</h5>
          {todayAppointments.length === 0 ? (
            <p>No appointments for today.</p>
          ) : (
            todayAppointments.map((appt, idx) => (
              <Card key={appt.appId || idx} className="mb-3 shadow-sm">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <span>Patient name: {appt.patientId}</span>
                    <br />
                    <span>Slot: {appt.slotNumber}</span>
                    <br />
                    <span>Status: {appt.appStatus}</span>
                  </div>
                  <div>
                    <Button
                      variant="success"
                      size="sm"
                      className="me-2"
                      onClick={() => handleStatusChange(idx, "Done")}
                    >
                      Done
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="me-2"
                      onClick={() => handleStatusChange(idx, "Rejected")}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleStatusChange(idx, "Rescheduled")}
                    >
                      Reschedule
                    </Button>
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
                key={appt.appId || idx}
                className="mb-3 border-start border-4 border-primary shadow-sm"
              >
                <Card.Body>
                  <div>
                    <span>Patient name: {appt.patientId}</span>
                    <br />
                    <span>Slot: {appt.slotNumber}</span>
                    <br />
                    <span>Status: {appt.appStatus}</span>
                    <br />
                    <span>Date: {appt.date}</span>
                    {appt.appStatus === "Rejected" && (
                      <p className="text-danger">
                        Rejection: {appt.reasonForReject}
                      </p>
                    )}
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
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </div>
  );

  // Calendar view
  const renderAppointmentCalendar = () => (
    <div className="p-4">
      <CalendarWithSlots />
    </div>
  );

  // Sidebar
  const Sidebar = () => (
    <div
      className={`p-0 bg-dark text-white ${sidebarCollapsed ? "collapsed" : ""}`}
      style={{
        width: sidebarCollapsed ? "0" : "250px",
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {!sidebarCollapsed && (
        <div>
          <div className="d-flex flex-column align-items-center text-center p-3">
            <img
              src={doctor?.photo || "Doctor photo"}
              className="rounded-circle mb-3"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
              }}
              alt="Doctor"
            />
            <h5>{doctor?.name || "Doctor Name"}</h5>
          </div>
          <Nav className="flex-column">
            <Nav.Link className="text-white" onClick={() => navigate("/")}>
              Home
            </Nav.Link>
            <Nav.Link className="text-white" onClick={() => setView("dashboard")}>
              Dashboard
            </Nav.Link>
            <Nav.Link className="text-white" onClick={() => setView("appointments")}>
              Appointments
            </Nav.Link>
            <Nav.Link className="text-white" onClick={handleOverviewClick}>
              Overview
            </Nav.Link>
            <Nav.Link className="text-warning" onClick={handleLogout}>
              Logout
            </Nav.Link>
          </Nav>
        </div>
      )}
    </div>
  );

  // Header
  const Header = () => (
    <div
      className="bg-primary text-white p-3 d-flex align-items-center"
      style={{ position: "sticky", top: 0, zIndex: 1001 }}
    >
      <Button variant="outline-light" onClick={toggleSidebar} className="me-3">
        ☰
      </Button>
      <h4 className="mb-0">Doctor Dashboard</h4>
    </div>
  );

  return (
    <Container fluid className="p-0" style={{ overflowX: "hidden" }}>
      <Header />
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          {view === "dashboard" ? renderDashboardContent() : renderAppointmentCalendar()}
        </div>
      </div>
      <OverviewModal
        show={modals.overview}
        onClose={() => setModals((m) => ({ ...m, overview: false }))}
        description={description}
        setDescription={setDescription}
        onSave={handleSaveDescription}
      />
      <RejectModal
        show={modals.reject}
        onClose={() => setModals((m) => ({ ...m, reject: false }))}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
        onConfirm={handleRejectConfirm}
      />
      <PrescriptionModal
        show={modals.prescription}
        onClose={() => setModals((m) => ({ ...m, prescription: false }))}
        name={todayAppointments[currentIndex]?.name}
        prescription={currentPrescription}
        setPrescription={setCurrentPrescription}
        onSave={handleSavePrescription}
      />
      <ViewPrescriptionModal
        show={modals.viewPrescription}
        onClose={() => setModals((m) => ({ ...m, viewPrescription: false }))}
        name={viewedPrescription.name}
        prescription={viewedPrescription.prescription}
      />
    </Container>
  );
};

DoctorDashboard.propTypes = {};

export default DoctorDashboard;
