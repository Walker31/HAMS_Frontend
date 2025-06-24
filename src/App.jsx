import { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./Pages/Home";
import { Navigate } from 'react-router-dom';
import Navbar from "./components/navbar";
import DoctorsAvailable from "./components/DoctorsAvailable";
import DoctorDescription from "./components/DoctorDescription";
import RegisterForm from "./Pages/Login/registerForm";
import Confirmation from "./components/Confirmation";
import DoctorDashboard from "./Pages/Dashboard/Dashboard";
import PatientDashboard from "./Pages/PatientDashboard/patientDash";
import AboutUs from "./components/Aboutus";
import FAQs from "./components/FAQs";
import Services from "./components/Services";
import { getCityFromCoords } from "./utils/locationUtils";

import "bootstrap/dist/css/bootstrap.min.css";

const MainLayout = ({ location, setLocation }) => (
  <>
    <Navbar location={location} setLocation={setLocation} />
    <Outlet />
  </>
);

const DashboardRouter = () => {
  const userType = localStorage.getItem('role');

  if (userType === 'doctor') {
    return <DoctorDashboard />;
  } else if (userType === 'patient') {
    return <PatientDashboard />;
  } else {
    return <Navigate to="/" replace />; // Redirect to home or login
  }
};

const DashboardLayout = () => (
  <div>
    <Outlet />
  </div>
);

const App = () => {
  const [location, setLocation] = useState("Select Location");

  useEffect(() => {
    if (location && location !== "Select Location") {
      localStorage.setItem("userLocation", location);
    }
  }, [location]);

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
    <AuthProvider>
      <Routes>
        {/* Public-facing layout */}
        <Route element={<MainLayout location={location} setLocation={setLocation} />}>
          <Route path="/" element={<Home />} />
          <Route path="/doctors-available" element={<DoctorsAvailable />} />
          <Route path="/:hospital/doctors-available" element={<DoctorsAvailable />} />
          <Route path="/doctor-description" element={<DoctorDescription />} />
          <Route path="/:hospital/doctors-available/DoctorDescription" element={<DoctorDescription />} />
          <Route path="/login" element={<RegisterForm />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/services" element={<Services />} />
        </Route>

        {/* Dashboard layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardRouter />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
