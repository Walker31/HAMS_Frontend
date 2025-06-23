import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import PasswordField from "../../components/passwordField";

export default function HospitalRegisterForm({
  formData,
  handleChange,
  handleRegisterSubmit,
  handleBack,
}) {
  return (
    <div className="w-full max-w-xl space-y-6">
      <IconButton onClick={handleBack}>
        <ArrowBackIcon />
      </IconButton>

      <h2 className="text-2xl font-bold text-center mb-5">Hospital Registration</h2>
      <form className="space-y-4" onSubmit={handleRegisterSubmit}>
        <input
          type="text"
          name="hospitalName"
          placeholder="Hospital's Name *"
          onChange={handleChange}
          className="w-full p-3 border rounded-md mb-3"
          required
        />
        <PasswordField
                      value={formData.password || ""}
                      onChange={handleChange}
                    />
        <div className="flex-row flex">
          <div className="w-70 mr-2">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            pattern="[0-9]{10}"
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          /></div>
          <input
            type="text"
            name="RegId"
            placeholder="Registration Number *"
            onChange={handleChange}
            className="h-15 w-full p-3 border rounded-md"
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email *"
          onChange={handleChange}
          className="w-full p-3 border rounded-md mb-3"
          required
        />
        
        <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
}
