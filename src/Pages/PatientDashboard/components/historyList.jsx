import ListCard from "./listcard";

const HistoryList = ({ history }) => {
  if (!history.length) return <p className="text-center mt-4 text-gray-500">No Cancelled Appointments</p>;

  return (
    <ListCard title="Cancelled History" color="red">
      {history.map((appt) => (
        <div key={appt.appointmentId} className="border-b py-4">
          <h4 className="font-semibold text-lg">{appt.reason}</h4>
          <p className="text-sm text-gray-600">{appt.date} | Slot: {appt.slotNumber}</p>
          <p className="text-sm text-gray-600">Clinic: {appt.clinicId}</p>
        </div>
      ))}
    </ListCard>
  );
};

export default HistoryList;
