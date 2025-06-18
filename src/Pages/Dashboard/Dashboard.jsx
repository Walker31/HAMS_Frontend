import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import CalendarWithSlots from './CalendarWithSlots';
import 'react-calendar/dist/Calendar.css';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  OverviewModal,
  RejectModal,
  PrescriptionModal,
  ViewPrescriptionModal
} from "./DoctorModals";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

  const locationState = location.state || {};
  const doctor = locationState.doctor || {};

  const [doctorState, setDoctorState] = useState(doctor);

  useEffect(() => {
    const latitude = localStorage.getItem("latitude");
    const longitude = localStorage.getItem("longitude");
    axios.get(`${base_url}/doctors/nearby/${latitude}/${longitude}`)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  }, []);

  const [todayAppointments, setTodayAppointments] = useState([]);
  const [previousAppointments, setPreviousAppointments] = useState([]);

  useEffect(() => {
    const fetchTodayAppointments = async () => {
      try {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        const res = await axios.get(`${base_url}/appointments/pending/${formattedDate}?doctorId=${doctorState._id}`);

        const filteredAppointments = res.data.filter(appt => appt.doctorId === doctorState._id && appt.appStatus === 'Pending');

        const transformed = filteredAppointments.map(appt => ({
          name: appt.patientId,
          time: appt.slotNumber,
          date: new Date(appt.date),
          status: appt.appStatus,
          appId: appt.appId
        }));

        setTodayAppointments(transformed);
      } catch (error) {
        console.error("Error fetching today's appointments:", error);
      }
    };

    fetchTodayAppointments();
  }, [doctorState]);

  const updateAppointmentStatus = async (apptId, newStatus, reason = "") => {
    try {
      await axios.put(`${base_url}/appointments/update-status/${apptId}`, {
        appStatus: newStatus,
        reasonForReject: reason
      });
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectIndex, setRejectIndex] = useState(null);

  const handleStatusChange = (index, status) => {
    const appt = todayAppointments[index];

    if (status === "Done") {
      const confirmDone = window.confirm("Are you sure you are done with this appointment?");
      if (!confirmDone) return;
      updateAppointmentStatus(appt.appId, "Completed");
      moveToPrevious(index, "Completed");
    } else if (status === "Rejected") {
      setRejectIndex(index);
      setShowRejectModal(true);
    } else if (status === "Rescheduled") {
      updateAppointmentStatus(appt.appId, "Rescheduled");
      moveToPrevious(index, "Rescheduled");
    }
  };

  const moveToPrevious = (index, status, reasonOverride = null) => {
    const appt = todayAppointments[index];
    const updatedToday = [...todayAppointments];
    updatedToday.splice(index, 1);
    setTodayAppointments(updatedToday);

    setPreviousAppointments(prev => [
      ...prev,
      {
        ...appt,
        reasonForReject: reasonOverride || rejectionReason,
        status
      }
    ]);
  };

  const handleRejectConfirm = () => {
    if (!rejectionReason.trim()) {
      alert("Please enter a rejection reason.");
      return;
    }

    const appt = todayAppointments[rejectIndex];
    updateAppointmentStatus(appt.appId, "Rejected", rejectionReason);
    moveToPrevious(rejectIndex, "Rejected", rejectionReason);

    setShowRejectModal(false);
    setRejectionReason("");
    setRejectIndex(null);
  };

  const Sidebar = ({ collapsed, onOverviewClick, onAppointmentClick, onDashboardClick }) => (
    <div className={`p-0 sidebar position-fixed top-0 start-0 text-white bg-dark ${collapsed ? 'collapsed' : ''}`} style={{ height: '100vh', width: collapsed ? '0' : '250px', overflow: 'hidden', transition: 'all 0.3s ease-in-out', zIndex: 1000 }}>
      {!collapsed && (
        <div>
          <div className="d-flex flex-column align-items-center text-center">
            <img src={doctorState?.photo || "Doctor photo"} className="rounded-circle mb-3" style={{ width: '120px', height: '120px', objectFit: 'cover' }} alt="Doctor" />
            <h5>{doctorState?.name || "Doctor Name"}</h5>
          </div>
          <ul className="nav flex-column mt-4">
            <li className="nav-item"><a className="nav-link text-white" href="/" onClick={onDashboardClick}>Home</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#" onClick={onDashboardClick}>Dashboard</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#" onClick={onAppointmentClick}>Appointments</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#" onClick={onOverviewClick}>Overview</a></li>
            <li className="nav-item"><a className="nav-link text-warning" href="#">Logout</a></li>
          </ul>
        </div>
      )}
    </div>
  );

  const Header = ({ toggleSidebar }) => (
    <div className="bg-primary text-white p-3 d-flex align-items-center" style={{ position: "sticky", top: 0, zIndex: 1001 }}>
      <Button variant="outline-light" onClick={toggleSidebar} className="me-3">☰</Button>
      <h4 className="mb-0">Doctor Dashboard</h4>
    </div>
  );

  const [collapsed, setCollapsed] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [description, setDescription] = useState("");
  const [view, setView] = useState("dashboard");

  const toggleSidebar = () => setCollapsed(!collapsed);
  const handleOverviewClick = () => setShowOverview(true);
  const handleSaveDescription = () => {
    alert("Saved");
    setShowOverview(false);
  };

  const renderDashboardContent = () => {
    const today = new Date();
    const todayAppointmentsFiltered = todayAppointments.filter((appt) => {
      const apptDate = new Date(appt.date);
      return (
        apptDate.getDate() === today.getDate() &&
        apptDate.getMonth() === today.getMonth() &&
        apptDate.getFullYear() === today.getFullYear()
      );
    });

    return (
      <div className="p-4">
        <Row className="mb-4">
          <Col md={6} lg={3}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>Total Patients</Card.Title>
                <h4>{previousAppointments.filter(appt => appt.status === "Completed").length}</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>Today's Appointments</Card.Title>
                <h4>{todayAppointmentsFiltered.length}</h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <h5 className="text-primary">Today's Appointments</h5>
            {todayAppointmentsFiltered.length === 0 ? (
              <p>No appointments for today.</p>
            ) : (
              todayAppointmentsFiltered.map((appt, idx) => (
                <Card key={idx} className="mb-3 shadow-sm">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{appt.name}</strong><br />
                      <span>{appt.time}</span><br />
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
                <Card key={idx} className="mb-3 border-start border-4 border-primary shadow-sm">
                  <Card.Body>
                    <div>
                      <strong>{appt.name}</strong><br />
                      <span>{appt.time}</span><br />
                      {appt.status === "Rejected" && (
                        <p className="text-danger">Rejection: {appt.reasonForReject}</p>
                      )}
                      <span className={`badge bg-${appt.status === 'Completed' ? 'success' : appt.status === 'Rejected' ? 'danger' : 'warning'}`}>
                        {appt.status}
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
  };

  const renderAppointmentCalendar = () => (
    <div className="p-4">
      <CalendarWithSlots />
    </div>
  );

  return (
    <Container fluid className="p-0" style={{ overflowX: 'hidden' }}>
      <Header toggleSidebar={toggleSidebar} />

      <div className="d-flex" style={{ minHeight: '100vh' }}>
        {/* Sidebar */}
        <div
          className={`p-0 bg-dark text-white ${collapsed ? 'collapsed' : ''}`}
          style={{
            width: collapsed ? '0' : '250px',
            overflow: 'hidden',
            transition: 'all 0.3s ease-in-out'
          }}
        >
          {!collapsed && (
            <div>
              <div className="d-flex flex-column align-items-center text-center p-3">
                <img
                  src={doctorState?.photo || "Doctor photo"}
                  className="rounded-circle mb-3"
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                  alt="Doctor"
                />
                <h5>{doctorState?.name || "Doctor Name"}</h5>
              </div>
              <ul className="nav flex-column">
                <li className="nav-item"><a className="nav-link text-white" href="/">Home</a></li>
                <li className="nav-item"><a className="nav-link text-white" href="/doctordashboard" onClick={() => setView("dashboard")}>Dashboard</a></li>
                <li className="nav-item"><a className="nav-link text-white" href="#" onClick={() => setView("appointments")}>Appointments</a></li>
                <li className="nav-item"><a className="nav-link text-white" href="#" onClick={handleOverviewClick}>Overview</a></li>
                <li className="nav-item"><a className="nav-link text-warning" href="#">Logout</a></li>
              </ul>
            </div>
          )}
        </div>

 
        <div style={{ flex: 1 }}>
          {view === "dashboard" ? renderDashboardContent() : renderAppointmentCalendar()}
        </div>
      </div>

    
      <OverviewModal
        show={showOverview}
        onClose={() => setShowOverview(false)}
        description={description}
        setDescription={setDescription}
        onSave={handleSaveDescription}
      />
      <RejectModal
        show={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
        onConfirm={handleRejectConfirm}
      />
      <PrescriptionModal
        show={showPrescriptionModal}
        onClose={() => setShowPrescriptionModal(false)}
        name={todayAppointments[prescriptionIndex]?.name}
        prescription={currentPrescription}
        setPrescription={setCurrentPrescription}
        onSave={handleSavePrescription}
      />
      <ViewPrescriptionModal
        show={showViewPrescription}
        onClose={() => setShowViewPrescription(false)}
        name={viewedPatientName}
        prescription={viewedPrescription}
      />
    </Container>
  );
};

export default DoctorDashboard;
