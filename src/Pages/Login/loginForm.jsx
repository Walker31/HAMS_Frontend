import { useState } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

export default function LoginForm({
  formData,
  handleChange,
  handleLoginSubmit,
  handleBack,
  handleRoleChange,
}) {
  const [role, setRole] = useState("doctor");

  const toggleRole = (newRole) => {
    setRole(newRole);
    handleRoleChange(newRole); // Notify parent of selected role
  };

  return (
    <div className="w-full max-w-md space-y-6">

      

      {/* Login Form */}
      <form className="space-y-4" onSubmit={handleLoginSubmit}>
        <div className="flex flex-col gap-4">
          <TextField
            label="Phone"
            type="tel"
            name="phone"
            value={formData.phone}
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
        </div>

        <div className="flex justify-between items-center">
          <FormControlLabel
            control={
              <Checkbox
                name="remember"
                checked={formData.remember || false}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Remember me"
          />
          <Button variant="text" size="small" className="text-blue-600 normal-case">
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

      {/* Back Button */}
      <div className="flex justify-center">
        <Button onClick={handleBack} size="small" className="text-gray-600 normal-case">
          Back
        </Button>
        
      </div>
      {/* Role Toggle */}
      <div className="flex justify-center gap-4 mb-2">
        <Button
          variant={role === "doctor" ? "contained" : "outlined"}
          color="primary"
          onClick={() => toggleRole("doctor")}
          className="rounded-full normal-case"
        >
          Doctor
        </Button>
        <Button
          variant={role === "patient" ? "contained" : "outlined"}
          color="primary"
          onClick={() => toggleRole("patient")}
          className="rounded-full normal-case"
        >
          Patient
        </Button>
      </div>
    </div>
  );
}
