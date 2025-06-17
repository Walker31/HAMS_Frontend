import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";


export default function ModeSelector({ handleSubmit}) {
  const [mode, setMode] = useState("Login"); 
  const [signUpRole, setSignUpRole] = useState("");

  const [formData, setFormData] = useState({
    email: "",
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
          <form className="space-y-4" onSubmit={(e) => handleSubmit(e, formData, mode, signUpRole)}>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
            />

            <div className="flex justify-between items-center">
              <FormControlLabel
                control={
                  <Checkbox
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Button variant="text" className="text-blue-600 normal-case">
                Forgot Password?
              </Button>
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="!bg-blue-600 !text-white py-3 rounded-full hover:!bg-blue-700 transition-all duration-300"
            >
              Log In
            </Button>
          </form>
        )}

        {/* Sign Up Mode — Only role selection */}
        {mode === "SignUp" && (
          <div className="space-y-4">
            <Typography variant="subtitle1" className="text-center font-medium">
              Register As
            </Typography>
            <div className="flex flex-col bg-gray-100 rounded-md p-1">
              <button
                onClick={() => handleSubmit(null, null, mode, "Patient")}
                className="flex-1 py-2 rounded-md font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all"
              >
                Patient
              </button>
              <button
                onClick={() => handleSubmit(null, null, mode, "Doctor")}
                className="flex-1 py-2 rounded-md font-medium bg-green-500 text-white hover:bg-green-600 transition-all"
              >
                Doctor
              </button>
              <button
                className="flex-1 py-2 rounded-md font-medium bg-red-500 text-white hover:bg-red-600 transition-all"
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
