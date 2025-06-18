import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import CalendarWithSlots from "./CalendarWithSlots";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

const Sidebar = ({
  collapsed,
  onOverviewClick,
  onAppointmentClick,
  onDashboardClick,
}) => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

  const locationState = location.state || {};
  const doctor = locationState.doctor || {};  
  const hname = locationState.hname || "";

  const [doctorState, setDoctorState] = useState(doctor);

  useEffect(() => {
    const latitude = localStorage.getItem("latitude");
    const longitude = localStorage.getItem("longitude");
    axios
      .get(`${base_url}/doctors/nearby/${latitude}/${longitude}`)
      .then((res) => {
        console.log(res.data);

      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      className={`p-3 sidebar position-fixed top-0 start-0 ${
        collapsed ? "collapsed" : ""
      }`}
      style={{
        height: "100vh",
        width: collapsed ? "0" : "250px",
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
        zIndex: 1000,
      }}
    >
      {!collapsed && (
        <div>
          <div className="d-flex flex-column align-items-center text-center">
            <div className="mb-4 w-fit">
              <div className="card p-3 shadow-sm h-100">
                <img
                  src={doctorState?.photo || "/default-doctor.jpg"}
                  className="rounded-circle mb-2"
                  alt={doctorState?.name || "Doctor"}
                  style={{
                    width: "160px",
                    height: "160px",
                    objectFit: "cover",
                  }}
                />
                <h5>{doctorState?.name || "Doctor name"}</h5>
              </div>
            </div>
          </div>
          <hr />
          <ul className="nav flex-column">
            <li className="nav-item">
              <button
                className="nav-link btn btn-link text-start"
                onClick={onDashboardClick}
              >
                Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link text-start"
                onClick={onAppointmentClick}
              >
                Appointments
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link text-start"
                onClick={onOverviewClick}
              >
                Overview
              </button>
            </li>
            <li className="nav-item">
              <a className="nav-link text-danger" href="#">
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};





const Header = ({ toggleSidebar }) => (
  <div
    className="bg-primary text-white p-3 d-flex align-items-center"
    style={{ position: "sticky", top: 0, zIndex: 1001 }}
  >
    <Button variant="light" onClick={toggleSidebar} className="me-3">
      ☰
    </Button>
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

  const handleStatusChange = (index, status) => {
    const appt = todayAppointments[index];
    const updatedToday = [...todayAppointments];
    updatedToday.splice(index, 1);
    setTodayAppointments(updatedToday);

    setPreviousAppointments([...previousAppointments, { ...appt, status }]);
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
              <h4>120</h4>
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
          <Card className="mb-3" style={{ width: "100%" }}>
            <Card.Header>Today's Appointments</Card.Header>
            <Card.Body>
              {todayAppointments.length === 0 ? (
                <p>No appointments for today.</p>
              ) : (
                todayAppointments.map((appt, idx) => (
                  <Card className="mb-2" key={idx}>
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{appt.name}</strong>
                        <br />
                        Time: {appt.time}
                        <br />
                        Reason: {appt.reason}
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
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3" style={{ width: "100%" }}>
            <Card.Header>Previous Appointments</Card.Header>
            <Card.Body>
              {previousAppointments.length === 0 ? (
                <p>No previous appointments.</p>
              ) : (
                previousAppointments.map((appt, idx) => (
                  <Card className="mb-2" key={idx}>
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{appt.name}</strong>
                        <br />
                        Time: {appt.time}
                        <br />
                        Reason: {appt.reason}
                        <br />
                        <span className="badge bg-secondary">
                          Status: {appt.status}
                        </span>
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
    <Container fluid className="p-0" style={{ overflowX: "hidden" }}>
      <Sidebar
        collapsed={collapsed}
        onOverviewClick={handleOverviewClick}
        onAppointmentClick={() => setView("appointments")}
        onDashboardClick={() => setView("dashboard")}
      />

      <div
        style={{
          marginLeft: collapsed ? "0" : "250px",
          transition: "margin-left 0.3s ease-in-out",
          width: "100%",
        }}
      >
        <Header toggleSidebar={toggleSidebar} />
        {view === "dashboard"
          ? renderDashboardContent()
          : renderAppointmentCalendar()}
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
          <Button variant="secondary" onClick={() => setShowOverview(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveDescription}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DoctorDashboard;
