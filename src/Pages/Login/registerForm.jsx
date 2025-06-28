import { useState } from "react";
import DoctorRegisterForm from "./doctorRegistration.jsx";
import PatientRegisterForm from "./patientRegistration.jsx";
import HospitalRegisterForm from "./hospitalRegistration.jsx";
import ModeSelector from "./modeSelector.jsx";
import loginHandler from "../../handlers/loginHandler.js";
import patientHandler from "../../handlers/patientHandler";
import doctorHandler from "../../handlers/doctorHandler";
import hospitalHandler from "../../handlers/hospitalHandler.js";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export default function RegisterForm() {
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    setUserType(null);
    setIsLogin(true);
    setFormData({});
  };

  const handleSubmit = async (e, data, mode, role) => {
    e?.preventDefault();

    try {
      if (mode === "Login") {
        const loginData = data || formData;
        console.log(data)
        const res = await loginHandler(loginData, role, login);
        if (res?.token) {
          navigate("dashboard");
        }
      } else if (mode === "SignUp") {
        if (role === "patient") {
          setUserType("patient");
        } else if (role === "doctor") {
          setUserType("doctor");
        } else if (role === "hospital") {
          setUserType("hospital");
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
      if (userType === "patient") {
        console.log("Submitting patient data:", formData);
        await patientHandler(formData, login);
      } else if (userType === "doctor") {
        const { latitude, longitude } = await getCurrentLocation();
        console.log(formData);
        const formPayLoad = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (key !== "photo") {
            formPayLoad.append(key, value);
          }
        });

        const location = {
          type: "Point",
          coordinates: [longitude, latitude],
        };

        // Append location as JSON string
        formPayLoad.append("location", JSON.stringify(location));

        if (formData.photo instanceof File) {
          formPayLoad.append("photo", formData.photo);
        }
        for (let [key, value] of formPayLoad.entries()) {
          console.log(`${key}:`, value);
        }

        await doctorHandler(formPayLoad, login);
      } else if (userType === "hospital") {
        const lat = localStorage.getItem("latitude");
        const lon = localStorage.getItem("longitude");
        const formattedData = {
          ...formData,
          location: {
            latitude: lat,
            longitude: lon,
          },
        };
        console.log("handle register");
        console.log(formattedData);
        await hospitalHandler(formattedData, login);
      }
      alert("Registration successful!");
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-[500px] h-full max-h-[750px] flex flex-col overflow-y-auto	rounded-lg items-center space-y-2 scrollbar-hide">
      {!userType && !isLogin && <ModeSelector handleSubmit={handleSubmit} />}
      {userType === "doctor" && (
        <DoctorRegisterForm
          formData={formData}
          handleChange={handleChange}
          handleRegisterSubmit={handleRegisterSubmit}
          handleBack={handleBack}
        />
      )}
      {userType === "patient" && (
        <PatientRegisterForm
          formData={formData}
          handleChange={handleChange}
          handleRegisterSubmit={handleRegisterSubmit}
          handleBack={handleBack}
        />
      )}
      {userType === "hospital" && !isLogin && (
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
