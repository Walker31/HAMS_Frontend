import { Row, Col, Card, Button } from "react-bootstrap";

const DashboardHome = ({
  previousAppointments = [],
  todayAppointments = [],
  fetchAppointments,
  handleStatusChange,
}) => (
  <div className="p-4">
    {/* Stats Row */}
    <Row className="mb-4">
      <Col md={6} lg={3}>
        <Card className="text-center shadow-sm">
          <Card.Body>
            <Card.Title>Total Patients</Card.Title>
            <h4>
              {previousAppointments.filter((a) => a.appStatus === "Completed").length}
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

    {/* Appointments Row */}
    <Row>
      {/* Today's Appointments */}
      <Col md={6}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="text-primary mb-0">Today's Appointments</h5>
          <Button variant="outline-primary" size="sm" onClick={fetchAppointments}>
            🔄 Refresh
          </Button>
        </div>
        {todayAppointments.length === 0 ? (
          <p>No appointments for today.</p>
        ) : (
          todayAppointments.map((appt, idx) => (
            <Card key={appt.appId || idx} className="mb-3 shadow-sm">
              <Card.Body className="d-flex justify-content-between">
                <div>
                  <div>
                    <strong>Name:</strong> {appt.name}
                  </div>
                  <div>
                    <strong>Date:</strong> {appt.date}
                  </div>
                  <div>
                    <strong>Slot:</strong> {appt.slotNumber}
                  </div>
                </div>
                <div>
                  <Button
                    className="me-2"
                    size="sm"
                    variant="success"
                    onClick={() => handleStatusChange(idx, "Done")}
                  >
                    Done
                  </Button>
                  <Button
                    className="me-2"
                    size="sm"
                    variant="danger"
                    onClick={() => handleStatusChange(idx, "Rejected")}
                  >
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    variant="warning"
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

      {/* Previous Appointments */}
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
                <p>
                  <strong>Patient ID:</strong> {appt.patientId}
                </p>
                <p>
                  <strong>Date:</strong> {appt.date}
                </p>
                <p>
                  <strong>Slot:</strong> {appt.slotNumber}
                </p>
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
                {appt.reasonForReject && (
                  <p className="text-danger">
                    <strong>Reason:</strong> {appt.reasonForReject}
                  </p>
                )}
                {appt.prescription && (
                  <p className="text-success">
                    <strong>Prescription:</strong> {appt.prescription}
                  </p>
                )}
              </Card.Body>
            </Card>
          ))
        )}
      </Col>
    </Row>
  </div>
);

export default DashboardHome;
