import CommonFields from "./commonFields";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import PasswordField from "../../components/passwordField";

export default function PatientRegisterForm({
  formData,
  handleChange,
  handleRegisterSubmit,
  handleBack,
}) {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md space-y-6">
      {/* Back Button */}
      <IconButton onClick={handleBack} aria-label="Back">
        <ArrowBackIcon />
      </IconButton>

      {/* Header */}
      <h2 className="text-2xl font-bold text-center">Patient Registration</h2>

      {/* Form */}
      <form onSubmit={handleRegisterSubmit} className="flex flex-col w-full">
        <CommonFields formData={formData} handleChange={handleChange} />

        <PasswordField
                      value={formData.password || ""}
                      onChange={handleChange}
                    />

        <div className="flex flex-col md:flex-row gap-4">
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
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
            margin="normal"
          />
        </div>

        <Divider className="my-2">Address</Divider>
        <TextField
          label="Street"
          name="street"
          value={formData.street || ""}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="City"
          name="city"
          value={formData.city || ""}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <div className="flex flex-col md:flex-row gap-4">
          <TextField
            label="State"
            name="state"
            value={formData.state || ""}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Postal Code"
            name="postalCode"
            value={formData.postalCode || ""}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
        </div>

        <Divider className="my-2">Emergency Contact</Divider>
        <TextField
          label="Contact Name"
          name="emergencyName"
          value={formData.emergencyName || ""}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <div className="flex flex-col md:flex-row gap-4">
          <TextField
            label="Relation"
            name="emergencyRelation"
            value={formData.emergencyRelation || ""}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="emergencyPhone"
            value={formData.emergencyPhone || ""}
            onChange={handleChange}
            inputProps={{ pattern: "[0-9]{10}" }}
            fullWidth
            required
            margin="normal"
          />
        </div>

        <Button variant="contained" color="primary" type="submit" fullWidth style={{marginTop: 10 }}>
          Register
        </Button>
      </form>
    </div>
  );
}
