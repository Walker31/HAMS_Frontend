import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
//import './DoctorDashboard.css'; // optional, for custom styles

const Sidebar = ({ collapsed }) => (
  <div
    className={`bg-light p-3 sidebar ${collapsed ? 'collapsed' : ''}`}
    style={{
      minHeight: '100vh',
      width: collapsed ? '0' : '250px',
      overflow: 'hidden',
      transition: 'all 0.3s ease-in-out'
    }}
  >
    {!collapsed && (
      <div>
        <div className="text-center">
          <img src="/src/assets/doctorpic1.jpg" className="rounded-circle mb-2 align-items-cen" style={{ width: '160px', height: '160px' }} alt="Doctor" />
          <h5>Dr. Jangaa Mani</h5>
        </div>
        <hr />
        <ul className="nav flex-column">
          <li className="nav-item"><a className="nav-link" href="#">Dashboard</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Appointments</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Overview</a></li>
          <li className="nav-item"><a className="nav-link text-danger" href="#">Logout</a></li>
        </ul>
      </div>
    )}
  </div>
);

const Header = ({ toggleSidebar }) => (
  <div className="bg-primary text-white p-3 d-flex align-items-center">
    <Button variant="light" onClick={toggleSidebar} className="me-3">☰</Button>
    <h3 className="mb-0">Doctor Dashboard</h3>
  </div>
);
const appointments = [
  { name: "Lishanth", time: "10:00 AM", Reason: "Heart missing"},
  { name: "Aditya", time: "10:30 AM", Reason: "Brain missing" },
  { name: "Suresh", time: "11:00 AM", Reason: "Stomach ache" },
];

const DashboardContent = () => {
  const [date, setDate] = useState(new Date());

  return (
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
              <h4>10</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      

      <Row className="mb-3">
        <Col lg={8}>
          <Card>
            <Card.Header>Today's Appointments</Card.Header>
            <Card.Body>
                
              {appointments.map((appt, idx) => (
                <Card className="mb-2" key={idx}>
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{appt.name}</strong><br />
                      Time: {appt.time}<br />
                      Reason: {appt.Reason}
                    </div>
                    <div>
                      <Button variant="success" size="sm" className="me-2">Done with Appointment</Button>
                      <Button variant="danger" size="sm" className="me-2">Reject</Button>
                      <Button variant="warning" size="sm">Reschedule</Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Header>Available Dates</Card.Header>
            <Card.Body>
              <Calendar onChange={setDate} value={date} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const DoctorDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Container fluid className="d-flex p-0">
      <Sidebar collapsed={collapsed} />
      <div style={{ flex: 1 }}>
        <Header toggleSidebar={toggleSidebar} />
        <DashboardContent />
      </div>
    </Container>
  );
};

export default DoctorDashboard;
