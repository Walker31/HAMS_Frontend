
const RecentAppointments = ({ appointments = [], onCancel, handleOpenJitsi }) => {
  const upcoming = appointments.filter((appt) => appt.appStatus === 'Pending');
  const past = appointments.filter((appt) => appt.appStatus !== 'Pending');
  
  const renderAppointmentCard = (appt, index) => (
    <div
      key={appt.appointmentId || index}
      className="bg-orange-50 p-4 rounded-xl mb-4 shadow-sm flex items-center justify-between"
    >
      <div className="flex items-start gap-3">
        <div>
          <p className="text-sm font-semibold text-gray-700">{appt.reason}</p>
          <p className="text-xs text-gray-500">
              {new Date(appt.date).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })} | Slot: {appt.slot}
            </p>
          <p className="text-xs text-gray-500">Doctor: {appt.doctorName}</p>
          <p className="text-xs text-gray-500">Visit Mode: {appt.consultStatus}</p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        {/* Status */}
        <span className={`text-xs font-bold ${
          appt.appStatus === 'Completed' ? 'text-green-500' :
          appt.appStatus === 'Canceled' ? 'text-red-500' :
          appt.appStatus === 'Reschedule' ? 'text-yellow-500' :
          'text-blue-500'
        }`}>
          {appt.appStatus}
        </span>

        {/* Buttons for Pending Only */}
        {appt.appStatus === 'Pending' && (
          <div className="flex gap-2">
            <button
              className="px-2 bg-blue-500 text-white text-xs rounded py-1 hover:bg-blue-600"
              onClick={() => handleOpenJitsi(appt.meetLink)}
            >
              Join
            </button>
            <button
              className="bg-white text-cyan-500 border border-cyan-300 text-xs px-2 py-1 rounded hover:bg-cyan-100"
              onClick={() => onCancel(appt.appointmentId)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
  
  return (
    <section className="bg-white p-4 rounded-md shadow-sm mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Appointments</h2>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Upcoming</h3>
          {upcoming.map(renderAppointmentCard)}
        </>
      )}

      {/* Past */}
      {past.length > 0 && (
        <>
          <h3 className="text-sm font-medium text-gray-600 mt-6 mb-2">Past</h3>
          {past.map(renderAppointmentCard)}
        </>
      )}

      {/* If empty */}
      {!appointments.length && (
        <p className="text-center text-gray-400">You have currently no appointments booked for today.</p>
      )}
    </section>
  );
};

export default RecentAppointments;
