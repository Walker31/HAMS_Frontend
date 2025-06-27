import ListCard from "./listcard";

const AppointmentList = ({ appointments, onCancel, handleOpenJitsi }) => {
  if (!appointments.length) {
    return <p className="text-center text-gray-400">You have no appointments for today</p>;
  }

  return (
    <ListCard title="Upcoming Appointments" color="pink">
      {appointments.map((appt) => (
        <div
          key={appt.appointmentId}
          className="bg-orange-50 p-4 rounded-xl mb-4 shadow-sm flex justify-between items-center"
        >
          <div>
            <p className="text-sm text-gray-700 font-semibold">{appt.reason}</p>
            <p className="text-xs text-gray-500">{appt.date} | Slot: {appt.slotNumber}</p>
            <p className="text-xs text-gray-500">Doctor: {appt.doctorName}</p>
            <p className="text-xs text-gray-500">Mode of Visit: {appt.consultStatus}</p>
          </div>

          {appt.appStatus === "Pending" && (
            <div className="flex gap-2">
              <button
                className="pl-2 pr-2 bg-blue-500 text-white text-xs rounded pt-1 pb-1 hover:bg-blue-600"
                onClick={() => handleOpenJitsi(appt.MeetLink)}
              >
                Join Meet
              </button>
              <button
                onClick={() => onCancel(appt.appointmentId)}
                className="bg-white text-cyan-500 border border-cyan-300 text-xs px-3 py-1 rounded-md hover:bg-cyan-300"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      ))}
    </ListCard>
  );
};

export default AppointmentList;
