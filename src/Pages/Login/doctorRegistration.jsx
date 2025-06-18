import { useRef } from "react";
import CommonFields from "./commonFields";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import SPECIALIZATIONS from "../../constants/specializations";

export default function DoctorRegisterForm({
  formData,
  handleChange,
  handleRegisterSubmit,
  handleBack,
  handleFileChange,
  imagePreview,
}) {
  const fileInputRef = useRef();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md space-y-6">
      {/* Back Button */}
      <IconButton onClick={handleBack} aria-label="Back">
        <ArrowBackIcon />
      </IconButton>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-center">Doctor Registration</h2>

      <form
        onSubmit={handleRegisterSubmit}
        className="flex flex-col gap-6 w-full"
      >
        {/* Top Section: Image + Common Fields */}
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Image Upload and Preview */}
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

        {/* Password */}
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password || ""}
          onChange={handleChange}
          inputProps={{ minLength: 6 }}
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
