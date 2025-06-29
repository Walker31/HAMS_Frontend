import { useState } from "react";
import DoctorRegisterForm from "./doctorRegistration.jsx";
import PatientRegisterForm from "./patientRegistration.jsx";
import HospitalRegisterForm from "./hospitalRegistration.jsx";
import ModeSelector from "./modeSelector.jsx";
import loginHandler from "../../handlers/loginHandler.js";
import patientHandler from "../../handlers/patientHandler";
import doctorHandler from "../../handlers/doctorHandler";
import hospitalHandler from "../../handlers/hospitalHandler.js";
import { ArrowBack, Close } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";

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

export default function RegisterForm({ onClose }) {
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const resetForm = () => {
    setUserType(null);
    setIsLogin(false);
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    if (
      Object.keys(formData).length > 0 &&
      !window.confirm("Discard entered information?")
    )
      return;
    resetForm();
  };

  const handleSubmit = async (e, data, mode, role) => {
    e?.preventDefault();

    try {
      if (mode === "Login") {
        const loginData = data || formData;
        const res = await loginHandler(loginData, role, login);
        if (res?.token) navigate("dashboard");
      } else if (mode === "SignUp") {
        setUserType(role);
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
        await patientHandler(formData, login);
        onClose?.();
      } else if (userType === "doctor") {
        const { latitude, longitude } = await getCurrentLocation();
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

        await doctorHandler(formPayLoad, login);
        onClose?.();
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
        await hospitalHandler(formattedData, login);
        onClose?.();
      }
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-full h-full max-h-[750px] flex flex-col overflow-y-auto	rounded-lg items-center space-y-2 scrollbar-hide">
      <div className="flex w-full mt-4 justify-between">
        {(userType || isLogin) && (
          <IconButton onClick={handleBack} aria-label="Back">
            <ArrowBack />
          </IconButton>
        )}
        {onClose && (
          <div className="flex self-end">
            <IconButton aria-label="Close" onClick={onClose}>
              <Close />
            </IconButton>
          </div>
        )}
      </div>

      {!userType && !isLogin && <ModeSelector handleSubmit={handleSubmit} />}
      {userType === "doctor" && (
        <DoctorRegisterForm
          formData={formData}
          handleChange={handleChange}
          handleRegisterSubmit={handleRegisterSubmit}
        />
      )}
      {userType === "patient" && (
        <PatientRegisterForm
          formData={formData}
          handleChange={handleChange}
          handleRegisterSubmit={handleRegisterSubmit}
        />
      )}
      {userType === "hospital" && !isLogin && (
        <HospitalRegisterForm
          formData={formData}
          handleChange={handleChange}
          handleRegisterSubmit={handleRegisterSubmit}
        />
      )}
    </div>
  );
}
