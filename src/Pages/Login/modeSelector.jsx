import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import LoginForm from "./loginForm";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function ModeSelector({ handleSubmit }) {
  const [mode, setMode] = useState("Login");
  const [signUpRole, setSignUpRole] = useState("");

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br">
      <div className="w-full max-w-[400px] min-w-[350px] bg-white p-10 rounded-3xl space-y-6">
        <Typography variant="h5" className="text-center font-bold mb-2">
          {mode === "Login" ? "Login" : "Sign Up"}
        </Typography>

        {/* Top Toggle */}
        <div className="flex bg-gray-200 rounded-md p-1">
          <button
            onClick={() => {
              setMode("Login");
              setSignUpRole("");
            }}
            className={`flex-1 py-2 rounded-md font-semibold transition-all duration-300 ${
              mode === "Login" ? "bg-white text-black shadow" : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setMode("SignUp");
              setSignUpRole("");
            }}
            className={`flex-1 py-2 rounded-md font-semibold transition-all duration-300 ${
              mode === "SignUp" ? "bg-white text-black shadow" : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Login Form */}
        {mode === "Login" && (
          <LoginForm
            formData={formData}
            handleChange={handleChange}
            handleLoginSubmit={(e) => handleSubmit(e, formData, mode, signUpRole)}
            handleBack={() => setMode("Select")}
            handleRoleChange={(role) => setSignUpRole(role)} // sets doctor/patient role
          />
        )}


        {/* Sign Up Mode — Only role selection */}
        {mode === "SignUp" && (
        <div className="space-y-6">
          {/* Title */}
          <Typography variant="subtitle1" className="text-center font-semibold text-lg text-gray-700">
            Register As
          </Typography>

          {/* Button Group */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Patient */}
            <button
              onClick={() => handleSubmit(null, null, mode, "Patient")}
              className="w-full py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition duration-300 shadow-sm"
            >
              Patient
            </button>

            {/* Doctor */}
            <button
              onClick={() => handleSubmit(null, null, mode, "Doctor")}
              className="w-full py-3 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition duration-300 shadow-sm"
            >
              Doctor
            </button>

            {/* Hospital */}
            <button
              onClick={() => handleSubmit(null, null, mode, "Hospital")}
              className="w-full py-3 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 transition duration-300 shadow-sm"
            >
              Hospital
            </button>
          </div>
        </div>
      )}


        {/* Bottom Link */}
        {mode === "Login" && (
          <Typography variant="body2" className="text-center">
            Don’t have an account?{" "}
            <button
              onClick={() => setMode("SignUp")}
              className="text-blue-600 font-medium"
            >
              Register
            </button>
          </Typography>
        )}
      </div>
    </div>
  );
}
