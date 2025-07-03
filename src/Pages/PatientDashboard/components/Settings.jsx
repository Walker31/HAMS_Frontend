import React, { useEffect, useState } from "react";
import axios from "axios";

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    password: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
    emergencyContact: {
      name: "",
      phone: "",
      relation: "",
    },
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");

  const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${base_url}/api/patient/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData((prev) => ({
          ...prev,
          ...res.data,
          address: { ...prev.address, ...res.data.address },
          emergencyContact: {
            ...prev.emergencyContact,
            ...res.data.emergencyContact,
          },
        }));

        setLoading(false);
      } catch (err) {
        console.error("Failed to load profile:", err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else if (name.startsWith("emergencyContact.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        emergencyContact: { ...prev.emergencyContact, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const payload = { ...formData };
      if (!payload.password) delete payload.password;

      await axios.put(`${base_url}/api/patient/update`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccessMsg("Profile updated successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update. Please try again.");
    }
  };

  if (loading) return <p className="p-4">Loading profile...</p>;

  return (
    <div className="mx-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 ml-4">Settings</h1>

      {successMsg && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded">{successMsg}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mx-4">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="border p-2 rounded w-full"
          />
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-2 rounded w-full"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded w-full"
          />
          <input
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth?.split("T")[0] || ""}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Password Section */}
        <h2 className="text-lg font-semibold mt-6">Update Password</h2>
        <div className="grid grid-cols-1 gap-4">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="New Password"
            className="border p-2 rounded w-full"
          />
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="border p-2 rounded w-full"
          />
        </div>
        <label className="inline-flex items-center mt-2">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
            className="mr-2"
          />
          Show Password
        </label>

        {/* Address Section */}
        <h2 className="text-lg font-semibold mt-6">Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="address.street"
            type="text"
            value={formData.address.street}
            onChange={handleChange}
            placeholder="Street"
            className="border p-2 rounded w-full"
          />
          <input
            name="address.city"
            type="text"
            value={formData.address.city}
            onChange={handleChange}
            placeholder="City"
            className="border p-2 rounded w-full"
          />
          <input
            name="address.state"
            type="text"
            value={formData.address.state}
            onChange={handleChange}
            placeholder="State"
            className="border p-2 rounded w-full"
          />
          <input
            name="address.postalCode"
            type="text"
            value={formData.address.postalCode}
            onChange={handleChange}
            placeholder="Postal Code"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Emergency Contact */}
        <h2 className="text-lg font-semibold mt-6">Emergency Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="emergencyContact.name"
            type="text"
            value={formData.emergencyContact.name}
            onChange={handleChange}
            placeholder="Contact Name"
            className="border p-2 rounded w-full"
          />
          <input
            name="emergencyContact.phone"
            type="tel"
            value={formData.emergencyContact.phone}
            onChange={handleChange}
            placeholder="Contact Phone"
            className="border p-2 rounded w-full"
          />
          <input
            name="emergencyContact.relation"
            type="text"
            value={formData.emergencyContact.relation}
            onChange={handleChange}
            placeholder="Relation"
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded mt-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
