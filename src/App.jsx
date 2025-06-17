import React, { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Home from "./Pages/Home";
import Navbar from "./components/navbar";
import DoctorsAvailable from "./components/DoctorsAvailable";
import DoctorDescription from "./components/DoctorDescription";
import RegisterForm from "./Pages/Login/registerForm";
import Confirmation from "./components/Confirmation";
import { getCityFromCoords } from "./utils/locationUtils";
import DoctorDashboard from "./Pages/Dashboard/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout = ({ location, setLocation }) => (
  <>
    <Navbar location={location} setLocation={setLocation} />
    <Outlet />
  </>
);

const App = () => {
  const [location, setLocation] = useState("Select Location");

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setLocation(savedLocation);
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const city = await getCityFromCoords(
            position.coords.latitude,
            position.coords.longitude
          );
          setLocation(city);
          localStorage.setItem("userLocation", city);
          localStorage.setItem("latitude", position.coords.latitude);
          localStorage.setItem("longitude", position.coords.longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocation("Unavailable");
        }
      );
    } else {
      setLocation("Not supported");
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar location={location} setLocation={setLocation} />
            <Home />
          </>
        }
      />
      <Route path="/doctors-available" element={<DoctorsAvailable />} />
      <Route path="/doctor-description" element={<DoctorDescription />} />
      <Route path="/login" element={<RegisterForm />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/doctordashboard" element={<DoctorDashboard />} />
      <Route element={<Layout location={location} setLocation={setLocation} />}>
        <Route path="/" element={<Home />} />
        <Route path="/doctors-available" element={<DoctorsAvailable />} />
        <Route path="/:hospital/doctors-available/DoctorDescription" element={<DoctorDescription />} />
        <Route path="/login" element={<RegisterForm />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/:hospital/doctors-available" element={<DoctorsAvailable />} />
      </Route>
    </Routes>
  );
};

export default App;
