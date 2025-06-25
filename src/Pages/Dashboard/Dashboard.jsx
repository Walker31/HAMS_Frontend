import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  OverviewModal,
  RejectModal,
  PrescriptionModal,
  ViewPrescriptionModal,
} from "./DoctorModals";

const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const DoctorDashboard = () => {
  const location = useLocation();
  const [doctor, setDoctor] = useState({});
  const [doctorId, setDoctorId] = useState(null);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [previousAppointments, setPreviousAppointments] = useState([]);

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

    const idFromRoute = location.state?.doctor?.doctorId || location.state?.doctorId;
    const idFromStorage = localStorage.getItem("doctorId");
    const finalDoctorId = idFromRoute || idFromStorage;

    if (!finalDoctorId) return;

    setDoctorId(finalDoctorId);

    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`${base_url}/doctors/public/${finalDoctorId}`);
        if (res.status === 200) {
          setDoctor(res.data.doctor);
          localStorage.setItem("doctorId", res.data.doctor.doctorId);
        }
      } catch (err) {
        console.error("Failed to fetch doctor profile:", err);
      }
    };

    fetchDoctor();
  }, [location.state]);

  const fetchAppointments = useCallback(async () => {
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
  }, [doctorId]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const updateAppointmentStatus = async (apptId, status, reason = "", prescription = "") => {
    try {
      await axios.put(`${base_url}/appointments/update-status/${apptId}`, {
        appStatus: status,
        rejectionReason: reason,
        prescription,
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
    await updateAppointmentStatus(appt.appId, "Completed", "", currentPrescription);
    moveToPrevious(prescriptionIndex, "Completed", "", currentPrescription);
    setShowPrescriptionModal(false);
    setCurrentPrescription("");
    setPrescriptionIndex(null);
  };

  const handleSaveDescription = async () => {
    try {
      await axios.put(`${base_url}/doctors/update/${doctorId}`, { overview: description });
      setDoctor((prev) => ({ ...prev, overview: description }));
      setShowOverview(false);
    } catch (err) {
      alert("Failed to save overview");
    }
  };

  return (
    <Container fluid className="p-0" style={{ overflowX: "hidden" }}>
      {/* CONTENT SAME AS BEFORE */}
      {/* ... */}
      {/* Modals below */}
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
