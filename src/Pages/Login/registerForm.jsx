import { useState } from "react";
import DoctorRegisterForm from "./doctorRegistration.jsx";
import PatientRegisterForm from "./patientRegistration.jsx";
import HospitalRegisterForm from "./hospitalRegistration.jsx";
import ModeSelector from "./modeSelector.jsx";
import loginHandler from "../../handlers/loginHandler.js";
import patientHandler from "../../handlers/patientHandler";
import doctorHandler from "../../handlers/doctorHandler";
import hospitalHandler from "../../handlers/hospitalHandler.js"

export default function RegisterForm() {
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    setUserType(null);
    setIsLogin(false);
    setFormData({});
  };

  const handleSubmit = async (e, data, mode, role) => {
    e?.preventDefault();

    try {
      if (mode === "Login") {
        const loginData = data || formData;
        await loginHandler(loginData);
        alert("Login successful!");
      } else if (mode === "SignUp") {
        if (role === "Patient") {
          setUserType("Patient");
        } else if (role === "Doctor") {
          setUserType("Doctor");
        }
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Operation failed. Please check inputs.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userType === "Patient") {
        await patientHandler(formData);
      } else if (userType === "Doctor") {
        const formattedData = {
          ...formData,
          location: {
            latitude: formData.latitude,
            longitude: formData.longitude,
          },
        };
        delete formattedData.latitude;
        delete formattedData.longitude;
        await doctorHandler(formattedData);

      } else if (userType === "Hospital") {
        const formattedData = {
          ...formData,
          location: {
            latitude: formData.latitude,
            longitude: formData.longitude,
          },
        };
        delete formattedData.latitude;
        delete formattedData.longitude;
        console.log('handle register');
        console.log(formattedData);
        await hospitalHandler(formattedData);
      }
      alert("Registration successful!");
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-2">
      {!userType && !isLogin && (
        <ModeSelector handleSubmit={handleSubmit} />
      )}
      {userType === "Doctor" && (
        <DoctorRegisterForm
          formData={formData}
          handleChange={handleChange}
          handleRegisterSubmit={handleRegisterSubmit}
          handleBack={handleBack}
        />
      )}
      {userType === "Patient" && (
        <PatientRegisterForm
          formData={formData}
          handleChange={handleChange}
          handleRegisterSubmit={handleRegisterSubmit}
          handleBack={handleBack}
        />
      )}
      {userType === "Hospital" && !isLogin && (
        <HospitalRegisterForm
          formData={formData}
          handleChange={handleChange}
          handleRegisterSubmit={handleRegisterSubmit}
          handleBack={handleBack}
        />
      )}
    </div>
  );
}
