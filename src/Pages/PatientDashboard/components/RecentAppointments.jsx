import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const RecentAppointments = ({
  appointments = [],
  onCancel,
  handleOpenJitsi
}) => {
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [reason, setReason] = useState("");

  const handleRescheduleClick = (appt) => {
    setSelectedAppointment(appt);
    setReason("");
    setRescheduleOpen(true);
  };

  const handleRescheduleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/patient/request-reschedule`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            appointmentId: selectedAppointment.appointmentId,
            reason,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Reschedule failed");

      alert("Reschedule request sent!");
      setRescheduleOpen(false);
    } catch (err) {
      alert(err.message || "Error while requesting reschedule");
    }
  };

  const upcoming = appointments.filter((appt) => appt.appStatus === "Pending");
  const past = appointments.filter((appt) => appt.appStatus !== "Pending");

  const renderAppointmentCard = (appt, index) => {
    const appointmentDateTimeString = `${appt.date}T${appt.slot}:00`;
    const appointmentDateTime = new Date(appointmentDateTimeString);
    const now = new Date();
    const isJoinEnabled = now >= appointmentDateTime;

    return (
      <div
        key={appt.appointmentId || index}
        className="bg-orange-50 p-4 rounded-xl mb-4 shadow-sm flex items-center justify-between"
      >
        <div>
          <p className="text-sm font-semibold text-gray-700">{appt.reason}</p>
          <p className="text-xs text-gray-500">
            {new Date(appt.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}{" "}
            | Slot: {appt.slot}
          </p>
          <p className="text-xs text-gray-500">Doctor: {appt.doctorName}</p>
          <p className="text-xs text-gray-500">Visit Mode: {appt.consultStatus}</p>
          {appt.hospital && <p className="text-xs text-gray-500">Address: {appt.hospital}</p> }
        </div>

        <div className="flex flex-col items-end gap-2 p-2 rounded-lg max-w-xs w-full">
          {/* Status Badge */}
          <span
            className={`
              text-xs font-semibold px-3 py-1 rounded-full shadow-sm mb-1
              ${
                appt.appStatus === "Completed"
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : appt.appStatus === "Cancelled"
                  ? "bg-red-100 text-red-700 border border-red-300"
                  : appt.appStatus === "Rescheduled"
                  ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                  : "bg-blue-100 text-blue-700 border border-blue-300"
              }
            `}
          >
            {appt.appStatus}
          </span>

          {/* Actions for Pending */}
          {appt.appStatus === "Pending" && (
            <>
            <div className= ''>
              <div className="flex flex-row gap-1 w-full justify-around">
                <Tooltip title="Join Video Call">
                  <span>
                    <IconButton
                      onClick={() => handleOpenJitsi(appt.meetLink)}
                      disabled={!isJoinEnabled}
                      size="small"
                      sx={{
                        bgcolor: isJoinEnabled ? "primary.main" : "grey.300",
                        color: isJoinEnabled ? "white" : "grey.500",
                        "&:hover": {
                          bgcolor: isJoinEnabled ? "primary.dark" : "grey.300",
                        },
                        fontSize: 20,
                      }}
                    >
                      <VideocamOutlinedIcon fontSize="small" />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Cancel Appointment">
                  <IconButton
                    onClick={() => onCancel(appt.appointmentId)}
                    size="small"
                    sx={{
                      bgcolor: "white",
                      color: "error.main",
                      border: "1px solid",
                      borderColor: "error.light",
                      "&:hover": { bgcolor: "error.light" },
                      fontSize: 20,
                    }}
                  >
                    <CloseOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="w-full flex justify-center">
                <Button
                  style={{backgroundColor : '#fef9c3', margin : 10 ,padding: 5}}
                  variant="text"
                  color="warning"
                  sx={{ textTransform: "none", fontWeight: 500, fontSize: 16}}
                  onClick={() => handleRescheduleClick(appt)}
                >
                  Request Reschedule
                </Button>
              </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="bg-white p-4 rounded-md shadow-sm mb-6">
      {upcoming.length > 0 && (
        <>
          <h3 className="text-sm font-medium text-gray-600 mb-4">
            Pending Appointments
          </h3>
          {upcoming.map(renderAppointmentCard)}
        </>
      )}

      {past.length > 0 && (
        <>
          <h3 className="text-sm font-medium text-gray-600 mt-6 mb-2">
            History
          </h3>
          {past.map(renderAppointmentCard)}
        </>
      )}

      {!appointments.length && (
        <p className="text-center text-gray-400">
          You have no appointments booked for today.
        </p>
      )}

      {/* Reschedule Dialog */}
      {rescheduleOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
            <h3 className="text-md font-semibold text-gray-800 mb-3">
              Reschedule Reason
            </h3>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-4 text-sm"
              rows="4"
              placeholder="Why do you want to reschedule?"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setRescheduleOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={handleRescheduleSubmit}
                disabled={!reason.trim()}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RecentAppointments;
