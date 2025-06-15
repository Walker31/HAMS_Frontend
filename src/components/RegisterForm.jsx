// RegisterForm.jsx
import { useState } from "react";
import { handleUserLogin } from '../handlers/loginHandler';
import { handlePatientRegistration } from '../handlers/patientHandler';

import doctorHandler from '../handlers/doctorHandler';

export default function RegisterForm() {
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginHandler(formData);
      alert("Login successful!");
      // Optionally redirect or reset form
      // setFormData({});
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userType === "Customer") {
        await patientHandler(formData);
      } else if (userType === "Doctor") {
        await doctorHandler(formData);
      }
      alert("Registration successful!");
      // setFormData({});
      // setUserType(null);
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-3">
      {!userType && !isLogin && (
        <>
          <h2 className="text-xl font-bold">Register As</h2>
          <div className="flex justify-center">
            <div className="flex flex-col gap-4 w-full max-w-[300px]">
              <button
                onClick={() => setUserType("Customer")}
                className="px-6 py-3 bg-blue-600 w-[6cm] text-white rounded-lg shadow hover:bg-blue-700"
              >
                Patient
              </button>
              <button
                onClick={() => setUserType("Doctor")}
                className="px-6 py-3 bg-green-600 w-[6cm] text-white rounded-lg shadow hover:bg-green-700"
              >
                Doctor
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsLogin(true)}
            className="text-sm text-gray-600 underline hover:text-black"
          >
            Already have an account?
          </button>
        </>
      )}

      {isLogin && (
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-semibold text-center">Login</h2>
          <form
            className="space-y-4 gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              handleUserLogin(e, formData);
            }}
          >
            <input
              type="text"
              name="phone"
              placeholder="Phone (10 digits)"
              pattern="[0-9]{10}"
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              minLength="6"
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />
            <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
              Login
            </button>
          </form>

          <button
            onClick={() => {
              setIsLogin(false);
              setUserType(null);
              setFormData({});
            }}
            className="text-sm text-gray-600 underline hover:text-black"
          >
            Back
          </button>
        </div>
      )}

      {userType && !isLogin && (
        <div className="w-full max-w-xl space-y-6 gap-3">
          <h2 className="text-2xl font-bold text-center">
            {userType} Registration
          </h2>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();

              if (userType === "Customer") {
                handlePatientRegistration(formData);
              } else if (userType === "Doctor") {
                // Group latitude and longitude under location
                const formattedData = {
                  ...formData,
                  location: {
                    latitude: formData.latitude,
                    longitude: formData.longitude,
                  },
                };

                // Remove the separate latitude and longitude keys
                delete formattedData.latitude;
                delete formattedData.longitude;

                // Call doctorHandler directly
                doctorHandler(formattedData);
              }
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone (10 digits)"
              pattern="[0-9]{10}"
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />
            <select
              name="gender"
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            {userType === "Customer" && (
              <>
                <input
                  type="date"
                  name="dateOfBirth"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                  required
                />
                <input
                  type="text"
                  name="street"
                  placeholder="Street"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                />
                <input
                  type="text"
                  name="emergencyName"
                  placeholder="Emergency Contact Name"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                />
                <input
                  type="text"
                  name="emergencyPhone"
                  placeholder="Emergency Contact Phone"
                  pattern="[0-9]{10}"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                />
                <input
                  type="text"
                  name="emergencyRelation"
                  placeholder="Relation"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                />
              </>
            )}

            {userType === "Doctor" && (
              <>
                <input
                  type="text"
                  name="latitude"
                  placeholder="Latitude"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                />
                <input
                  type="text"
                  name="longitude"
                  placeholder="Longitude"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                />
                <input
                  type="text"
                  name="medicalReg"
                  placeholder="Medical Registration Number"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                />
                <input
                  type="text"
                  name="photo"
                  placeholder="Photo URL"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                />
              </>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password (min 6 characters)"
              minLength="6"
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />

            <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700">
              Register
            </button>
          </form>

          <button
            onClick={() => {
              setUserType(null);
              setIsLogin(false);
              setFormData({});
            }}
            className="text-sm text-gray-600 underline hover:text-black mt-2"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}
