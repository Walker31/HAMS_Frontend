const Dashboard = () => {

    return (
        <Container fluid className="p-0" style={{ overflowX: "hidden" }}>
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
              <IconButton size="sm" onClick={fetchAppointments}><RefreshIcon /></IconButton>
            </div>
            {todayAppointments.length === 0 ? (
              <p>No appointments for today.</p>
            ) : (
              todayAppointments.map((appt, idx) => (
                <Card key={appt.appointmentId || idx} className="mb-3 shadow-sm">
                  <Card.Body className="d-flex justify-content-between">
                    <div>
                      <div><strong>Patient ID:</strong> {appt.patientId}</div>
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

      {/* Modals */}
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
        name={todayAppointments[prescriptionIndex]?.patientId || ""}
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
    )
}
export default Dashboard;