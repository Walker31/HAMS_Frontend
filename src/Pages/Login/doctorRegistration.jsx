import { useRef, useEffect, useState } from "react";
import CommonFields from "./commonFields";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import SPECIALIZATIONS from "../../constants/specializations";
import axios from "axios";
import { InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function DoctorRegisterForm({
  formData,
  handleChange,
  handleBack,
  handleRegisterSubmit
}) {
  const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [show, setShow] = useState(true);

  // Handle Image File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange({ target: { name: "photo", value: file } });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  // Fetch hospitals on mount
  useEffect(() => {
    const lat = 12.9058;
    const lon = 80.227;

    axios
      .get(`${base_url}/hospitals/getAll/${lat}/${lon}`)
      .then((response) => setHospitals(response.data))
      .catch((error) => console.error("Error fetching hospitals:", error));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md space-y-6">
      {/* Back Button */}
      <IconButton onClick={handleBack} aria-label="Back">
        <ArrowBackIcon />
      </IconButton>

      <h2 className="text-2xl font-bold text-center">Doctor Registration</h2>

      <form
        onSubmit={handleRegisterSubmit}
        className="flex flex-col gap-6 w-full"
      >
        <div className="flex flex-row md:flex-row items-start gap-6">
          {/* Image Upload */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden cursor-pointer"
              onClick={() => fileInputRef.current.click()}
              title="Click to upload"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Upload Photo
                </div>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <Button
              variant="outlined"
              onClick={() => fileInputRef.current.click()}
              size="small"
            >
              {formData.photo ? "Change Photo" : "Upload Photo"}
            </Button>
          </div>

          {/* Common Fields */}
          <div className="flex-1">
            <CommonFields formData={formData} handleChange={handleChange} />
          </div>
        </div>

        <TextField
          select
          label="Gender"
          name="gender"
          value={formData.gender || ""}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        >
          <MenuItem value="">Select Gender</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        {/* Password */}
        <TextField
          label="Password"
          name="password"
          type={show ? "text" : "password"}
          value={formData.password || ""}
          onChange={handleChange}
          InputProps={{
            minLength: 6,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShow(!show)} edge="end">
                  {show ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
          required
        />

        {/* Medical Registration Number */}
        <TextField
          label="Medical Registration Number"
          name="medicalReg"
          value={formData.medicalReg || ""}
          onChange={handleChange}
          fullWidth
          required
        />

        {/* Specialization */}
        <TextField
          select
          label="Specialization"
          name="specialization"
          value={formData.specialization || ""}
          onChange={handleChange}
          fullWidth
          required
        >
          <MenuItem value="">Select Specialization</MenuItem>
          {SPECIALIZATIONS.map((spec) => (
            <MenuItem key={spec} value={spec}>
              {spec}
            </MenuItem>
          ))}
        </TextField>

        {/* Organisation/Hospital */}
        <TextField
          select
          label="Hospital"
          name="Hospital"
          value={formData.Hospital || ""}
          onChange={handleChange}
          fullWidth
          required
        >
          <MenuItem value="">Select hospital</MenuItem>
          {hospitals.map((hosp) => (
            <MenuItem key={hosp.hospitalId} value={hosp.hospitalName}>
              {hosp.hospitalName}
            </MenuItem>
          ))}
        </TextField>

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          className="mt-4"
        >
          Register
        </Button>
      </form>
    </div>
  );
}
