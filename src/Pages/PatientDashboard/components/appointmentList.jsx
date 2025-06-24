import ListCard from "./listcard";

const AppointmentList = ({ appointments, onCancel }) => {
  if (!appointments.length) return <p className="text-center mt-4 text-gray-500">No Upcoming Appointments</p>;

  return (
    <ListCard title="Upcoming Appointments" color="cyan">
      {appointments.map((appt) => (
        <div key={appt.appointmentId} className="flex justify-between items-start border-b py-4">
          <div>
            <h4 className="font-semibold text-lg">{appt.reason}</h4>
            <p className="text-sm text-gray-600">Doctor: {appt.doctorName}</p>
            <p className="text-sm text-gray-600">{appt.date} | Slot: {appt.slotNumber}</p>
            <p className="text-sm text-gray-600">Clinic: {appt.clinicId}</p>
            <p className="text-sm text-gray-600">Payment: {appt.payStatus}</p>
            <p className="text-sm text-gray-600">Consultation Mode: {appt.consultStatus}</p>
          </div>
          {appt.appStatus === "Pending" && (
            <button
              onClick={() => onCancel(appt.appointmentId)}
              className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600"
            >
              Cancel
            </button>
          )}
        </div>
      ))}
    </ListCard>
  );
};

export default AppointmentList;
