import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import CalendarWithSlots from './CalendarWithSlots';
import 'react-calendar/dist/Calendar.css';

const Sidebar = ({ collapsed, onOverviewClick, onAppointmentClick, onDashboardClick }) => (
  <div
    className={`p-3 sidebar position-fixed top-0 start-0 ${collapsed ? 'collapsed' : ''}`}
    style={{
      height: '100vh',
      width: collapsed ? '0' : '250px',
      overflow: 'hidden',
      transition: 'all 0.3s ease-in-out',
      zIndex: 1000,
    }}
  >
    {!collapsed && (
      <div>
        <div className="d-flex flex-column align-items-center text-center">
          <img
            src="/src/assets/doctorpic1.jpg"
            className="rounded-circle mb-2"
            style={{ width: '160px', height: '160px', objectFit: 'cover' }}
            alt="Doctor"
          />
          <h5>Dr. Jangaa Mani</h5>
        </div>
        <hr />
        <ul className="nav flex-column">
          <li className="nav-item">
            <button className="nav-link btn btn-link text-start" onClick={onDashboardClick}>Dashboard</button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link text-start" onClick={onAppointmentClick}>Appointments</button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link text-start" onClick={onOverviewClick}>Overview</button>
          </li>
          <li className="nav-item"><a className="nav-link text-danger" href="#">Logout</a></li>
        </ul>
      </div>
    )}
  </div>
);

const Header = ({ toggleSidebar }) => (
  <div className="bg-primary text-white p-3 d-flex align-items-center" style={{ position: "sticky", top: 0, zIndex: 1001 }}>
    <Button variant="light" onClick={toggleSidebar} className="me-3">☰</Button>
    <h3 className="mb-0">Doctor Dashboard</h3>
  </div>
);

const DoctorDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [description, setDescription] = useState("");
  const [view, setView] = useState("dashboard");

  const [todayAppointments, setTodayAppointments] = useState([
    { name: "Lishanth", time: "10:00 AM", reason: "Heart missing" },
    { name: "Aditya", time: "10:30 AM", reason: "Brain missing" },
    { name: "Jayashree", time: "11:00 AM", reason: "Earring missing" },
  ]);

  const [previousAppointments, setPreviousAppointments] = useState([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectIndex, setRejectIndex] = useState(null);

  const handleStatusChange = (index, status) => {
    if (status === "Done") {
      const confirmDone = window.confirm("Are you sure you are done with this appointment?");
      if (!confirmDone) return;
    }

    if (status === "Rejected") {
      setRejectIndex(index);
      setShowRejectModal(true);
      return;
    }

    moveToPrevious(index, status);
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
        reason: appt.reason,
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
    moveToPrevious(rejectIndex, "Rejected", rejectionReason);
    setShowRejectModal(false);
    setRejectionReason("");
    setRejectIndex(null);
  };

  const toggleSidebar = () => setCollapsed(!collapsed);
  const handleOverviewClick = () => setShowOverview(true);
  const handleSaveDescription = () => {
    alert("Saved");
    setShowOverview(false);
  };

  const renderDashboardContent = () => (
    <div className="p-3">
      <Row className="mb-3">
        <Col md={6} lg={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Patients</Card.Title>
              <h4>{previousAppointments.filter(appt => appt.status === "Done").length}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Today's Appointments</Card.Title>
              <h4>{todayAppointments.length}</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Card className="mb-3" style={{ width: '100%' }}>
            <Card.Header>Today's Appointments</Card.Header>
            <Card.Body>
              {todayAppointments.length === 0 ? (
                <p>No appointments for today.</p>
              ) : (
                todayAppointments.map((appt, idx) => (
                  <Card className="mb-2" key={idx}>
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{appt.name}</strong><br />
                        Time: {appt.time}<br />
                        Reason: {appt.reason}
                      </div>
                      <div>
                        <Button variant="success" size="sm" className="me-2" onClick={() => handleStatusChange(idx, "Done")}>
                          Done
                        </Button>
                        <Button variant="danger" size="sm" className="me-2" onClick={() => handleStatusChange(idx, "Rejected")}>
                          Reject
                        </Button>
                        <Button variant="warning" size="sm" onClick={() => handleStatusChange(idx, "Rescheduled")}>
                          Reschedule
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-3" style={{ width: '100%' }}>
            <Card.Header>Previous Appointments</Card.Header>
            <Card.Body>
              {previousAppointments.length === 0 ? (
                <p>No previous appointments.</p>
              ) : (
                previousAppointments.map((appt, idx) => (
                  <Card className="mb-2" key={idx}>
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{appt.name}</strong><br />
                        Time: {appt.time}<br />
                        Reason: {appt.reason}<br />
                         {appt.status === "Rejected" && (
                            <>
                        Reason for reject: {appt.reasonForReject}<br/>
                        </>
                         )}
                        <span className="badge bg-secondary">Status: {appt.status}</span>
                      </div>
                    </Card.Body>
                  </Card>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderAppointmentCalendar = () => (
    <div className="p-4">
      <h4>Select Available Slots</h4>
      <CalendarWithSlots />
    </div>
  );

  return (
    <Container fluid className="p-0" style={{ overflowX: 'hidden' }}>
      <Sidebar
        collapsed={collapsed}
        onOverviewClick={handleOverviewClick}
        onAppointmentClick={() => setView("appointments")}
        onDashboardClick={() => setView("dashboard")}
      />

      <div
        style={{
          marginLeft: collapsed ? '0' : '250px',
          transition: 'margin-left 0.3s ease-in-out',
          width: '100%',
        }}
      >
        <Header toggleSidebar={toggleSidebar} />
        {view === "dashboard" ? renderDashboardContent() : renderAppointmentCalendar()}
      </div>

      <Modal show={showOverview} onHide={() => setShowOverview(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Write Overview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Doctor Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your description here..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOverview(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveDescription}>Save</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Rejection Reason</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRejectModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleRejectConfirm}>Reject Appointment</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DoctorDashboard;
