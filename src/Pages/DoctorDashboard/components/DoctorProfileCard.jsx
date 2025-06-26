import dp from '../../../assets/dp.jpg';
import { Button } from "react-bootstrap";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

const DoctorProfileCard = ({ doctor }) => {
    if (!doctor) return <div>Loading...</div>;

    const requests = [
        {
        name: "Kevin Mitchell",
        date: "07/02/2022",
        time: "09:30 - 10:30",
        },
        {
        name: "Adaline Hughes",
        date: "07/02/2022",
        time: "14:00 - 15:00",
        },
    ];
console.log(doctor)
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm border border-gray-200">
      {/* Profile */}
      <div className="flex flex-col items-center mb-6">
        {doctor.photo?.url && (
            <img src={doctor.photo.url} alt="Doctor" className="rounded-full w-20 h-20 border-2 border-gray-300" />
          )}
        <div className="mt-4 text-lg font-bold text-gray-900">{doctor.name}</div>
        <div className="text-sm text-gray-500">{doctor.specialty}</div>
      </div>

      {/* Stats */}
      <div className="flex justify-around text-sm text-gray-600 mb-6">
        <div className="text-center">
          <div className="text-gray-500">EXPERIENCE</div>
          <div className="font-semibold text-gray-800">{doctor.experience}</div>
        </div>
        <div className="text-center">
          <div className="text-gray-500">RATING</div>
          <div className="font-semibold text-yellow-500">{doctor.averageRating}</div>
        </div>
        <div className="text-center">
          <div className="text-gray-500">LICENSE</div>
          <div className="font-semibold text-gray-800">{doctor.medicalReg}</div>
        </div>
      </div>

      {/* Requests Header */}
      <div className="flex justify-between items-center text-sm mb-4">
        <div className="flex items-center gap-2 text-gray-800 font-medium">
          Requests
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">3+</span>
        </div>
        <div className="text-green-600 cursor-pointer hover:underline">View All ➤</div>
      </div>

      {/* Request Cards */}
      {requests.map((req, idx) => (
        <div key={idx} className="bg-gray-100 p-4 rounded-xl mb-4 border border-gray-200">
          <div className="font-semibold mb-2 text-gray-800">{req.reason}</div>
          <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
            <img src={dp} alt="Patient DP" className="w-6 h-6 rounded-full" />
            {req.name}
          </div>
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <div className="flex items-center gap-1">
              <CalendarMonthRoundedIcon fontSize="small" />
              {req.date}
            </div>
            <div className="flex items-center gap-1">
              <AccessTimeRoundedIcon fontSize="small" />
              {req.time}
            </div>
          </div>
          <div className="flex justify-between gap-2 mt-2">
            <Button
              size="sm"
              className="bg-green-500 border-0 text-white w-1/2"
            >
                <div className='flex gap-2 justify-center items-center'>
                <CheckCircleRoundedIcon style={{ height: 18,width: 18}}/>
                Accept
                </div>
            
            </Button>
            <Button
              size="sm"
              className="bg-red-500 border-0 text-white w-1/2"
            >
              <div className='flex gap-2 justify-center items-center'>
                <HighlightOffRoundedIcon style={{ height: 18,width: 18}}/>
                Reject
                </div>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorProfileCard;
