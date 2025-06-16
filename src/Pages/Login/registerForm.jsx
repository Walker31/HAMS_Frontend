import { useState } from "react";
import LoginForm from "./loginForm.jsx";
import DoctorRegisterForm from "./doctorRegistration.jsx";
import PatientRegisterForm from "./patientRegistration.jsx";
import ModeSelector from "./modeSelector.jsx";
import loginHandler from "../../handlers/loginHandler.js";
import patientHandler from "../../handlers/patientHandler";
import doctorHandler from "../../handlers/doctorHandler";

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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginHandler(formData);
      alert("Login successful!");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userType === "Customer") {
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
      }
      alert("Registration successful!");
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-3">
      {!userType && !isLogin && (
        <ModeSelector setUserType={setUserType} setIsLogin={setIsLogin} />
      )}
      {isLogin && (
        <LoginForm
          formData={formData}
          handleChange={handleChange}
          handleLoginSubmit={handleLoginSubmit}
          handleBack={handleBack}
        />
      )}
      {userType === "Doctor" && !isLogin && (
        <DoctorRegisterForm
          formData={formData}
          handleChange={handleChange}
          handleRegisterSubmit={handleRegisterSubmit}
          handleBack={handleBack}
        />
      )}
      {userType === "Customer" && !isLogin && (
        <PatientRegisterForm
          formData={formData}
          handleChange={handleChange}
          handleRegisterSubmit={handleRegisterSubmit}
          handleBack={handleBack}
        />
      )}
    </div>
  );
}
