import ListCard from "./listcard";

const HistoryList = ({ history }) => {
  if (!history.length) {
    return <p className="text-center text-gray-400">No past appointments found</p>;
  }

  return (
    <ListCard title="Past Appointments" color="gray">
      {history.map((appt) => (
        <div key={appt.appointmentId} className="bg-gray-100 p-4 rounded-xl mb-4 shadow-sm">
          <p className="text-sm text-gray-700 font-semibold">{appt.reason}</p>
          <p className="text-xs text-gray-500">{appt.date} | Slot: {appt.slotNumber}</p>
          <p className="text-xs text-gray-500">Clinic: {appt.clinicId}</p>
        </div>
      ))}
    </ListCard>
  );
};

export default HistoryList;
