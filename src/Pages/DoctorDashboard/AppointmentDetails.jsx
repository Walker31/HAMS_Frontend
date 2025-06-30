import Button from "@mui/material/Button";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from "axios";
import { useEffect, useState } from "react";


const appointmentHistory = [
  { date: "03/02/2025", time: "06:30 PM", reason: "High Blood Pressure Checkup", status: "upcoming" },
  { date: "04/01/2025", time: "03:30 PM", reason: "Routine Checkup", status: "done" },
  { date: "10/12/2024", time: "12:30 PM", reason: "Follow-up for Diabetes & Hypertension", status: "done" },
  { date: "19/11/2024", time: "05:30 PM", reason: "Medication Review & Side Effects", status: "done" },
  { date: "12/10/2024", time: "11:00 AM", reason: "High Cholesterol Check", status: "done" },
  { date: "05/09/2024", time: "04:30 PM", reason: "Dizziness & Fatigue", status: "done" },
  { date: "06/08/2024", time: "02:00 PM", reason: "Flu & Fever Consultation", status: "done" },
  { date: "08/07/2024", time: "12:00 PM", reason: "Routine Checkup", status: "done" },
  { date: "02/06/2024", time: "03:00 PM", reason: "Complaint of Dizziness & Fatigue", status: "done" },
];

const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const AppointmentDetails = () => {
  const [appoitnmentData,setAppointmentData] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(()=>{
    const fetchAppointmentData= () =>{
      try {
        const response = axios.get(`${base_url}/appointment/details`);
        setAppointmentData(response.data);
      } catch (error) {
        console.error('Error fetching data :',error);
      }
      finally {
        setLoading(false);
      }
    }
    fetchAppointmentData();
  },[]);

  if(loading) return 
  if(error) return <div className="p-4 text-red-500">{error}</div>;

  const {
    appoitnmentDetails,
    patientDetails,
    appointmentHistory
  } = appoitnmentData;
  return (
    <>
      <div className="flex gap-4">
        {/* Left Section */}
        <div className="flex flex-col gap-6 w-2/3">

          {/* Appointment Details Box */}
          <div className="border rounded-xl shadow-sm bg-white">
            <div className="flex justify-between items-center pt-4 px-3">
              <div className="text-lg font-semibold">Appointment Details</div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Status</span>
                <span className="px-3 py-1 rounded-full bg-yellow-300 text-gray-700 text-sm font-medium">
                  Upcoming
                </span>
              </div>
            </div>
            <hr />
            <div className="flex justify-between p-4 text-sm">
              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-gray-600">Appointment ID</div>
                  <div className="font-semibold">{appointmentDetails.id}</div>
                </div>
                <div>
                  <div className="text-gray-600">Doctor Assigned</div>
                  <div className="font-semibold">{appointmentDetails.doctor}</div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-gray-600">Booked On</div>
                  <div className="font-semibold">{appointmentDetails.bookedOn}</div>
                </div>
                <div>
                  <div className="text-gray-600">Department</div>
                  <div className="font-semibold">{appointmentDetails.department}</div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-gray-600">Appointment Date</div>
                  <div className="font-semibold">{appointmentDetails.date}</div>
                </div>
                <div>
                  <div className="text-gray-600">Reason for Visit</div>
                  <div className="font-semibold">{appointmentDetails.reason}</div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-gray-600">Appointment Time</div>
                  <div className="font-semibold">{appointmentDetails.time}</div>
                </div>
                <div>
                  <div className="text-gray-600">Consultation Type</div>
                  <div className="font-semibold">{appointmentDetails.type}</div>
                </div>
              </div>
            </div>
            <hr />
            <div className="flex justify-end gap-4 p-4">
              <Button variant="contained">Reschedule</Button>
              <Button variant="outlined" style={{ borderColor: 'red', color: 'red' }}>Cancel</Button>
            </div>
          </div>

          {/* Patient Details Box */}
          <div className="border rounded-xl shadow-sm bg-white">
            <div className="flex justify-between items-center pt-3 px-3">
              <div className="text-lg font-semibold">Patient Details</div>
            </div>
            <hr />
            <div className="flex justify-between p-4 text-sm">
              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-gray-600">First Name</div>
                  <div className="font-semibold">{patientDetails.firstName}</div>
                </div>
                <div>
                  <div className="text-gray-600">Email Address</div>
                  <div className="font-semibold">{patientDetails.email}</div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-gray-600">Last Name</div>
                  <div className="font-semibold">{patientDetails.lastName}</div>
                </div>
                <div>
                  <div className="text-gray-600">Contact No</div>
                  <div className="font-semibold">+91 {patientDetails.contact}</div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-gray-600">Age</div>
                  <div className="font-semibold">{patientDetails.age}</div>
                </div>
                <div>
                  <div className="text-gray-600">Address</div>
                  <div className="font-semibold">{patientDetails.address}</div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <div className="text-gray-600">Gender</div>
                  <div className="font-semibold">{patientDetails.gender}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Placeholder for future section */}
          <div className="border rounded-xl shadow-sm bg-white h-40 flex items-center justify-center text-gray-400">
            {/* Empty for now */}
            <span>Additional Information</span>
          </div>

        </div>

        <div className="w-1/3">
        <div className="flex flex-col border rounded-xl shadow-sm bg-white max-h-[700px] overflow-y-auto">
            <div className="p-4">
            <div className="text-lg font-semibold text-gray-800">Appointment History</div>
            </div>
            <hr />
            <div className="px-4 py-2 space-y-6">
            {appointmentHistory.map((appt, idx) => (
              <div key={idx} className="flex items-start relative">
                {/* Left: Date & Time */}
                <div className="w-[90px] text-xs text-right pr-2 flex flex-col pt-1">
                  <span className="text-gray-500">{appt.date}</span>
                  <span className="text-gray-500">{appt.time}</span>
                </div>

                {/* Center: Timeline */}
                <div className="relative flex flex-col items-center mx-3 min-h-[60px]">
                  {/* Vertical Line */}
                  <div
                    className={`absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full z-0 ${
                      appt.status === "done" ? "bg-green-300" : "bg-yellow-300"
                    }`}
                  />
                  {/* Dot */}
                  <div
                    className={`w-3 h-3 mt-1 rounded-full z-10 ${
                      appt.status === "done" ? "bg-green-500" : "bg-yellow-400"
                    }`}
                  />
                </div>

                {/* Right: Reason Box */}
                <div className="flex-1 ml-4">
                  <div
                    className={`text-sm flex justify-between items-center font-medium px-3 py-2 rounded-md shadow w-full ${
                      appt.status === "done"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {appt.reason}
                    {appt.status === "done" ? (
                      <CheckCircleIcon className="text-green-500" fontSize="small" />
                    ) : (
                      <AccessTimeIcon className="text-yellow-500" fontSize="small" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="text-sm text-blue-500 font-medium text-center mt-2 cursor-pointer">
                +View More
            </div>
            </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentDetails;
