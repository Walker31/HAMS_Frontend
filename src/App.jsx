import { useState, useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./Pages/Home";
import Navbar from "./components/navbar";
import DoctorsAvailable from "./components/DoctorsAvailable";
import DoctorDescription from "./components/DoctorDescription";
import RegisterForm from "./Pages/Login/registerForm";
import Confirmation from "./components/DoctorDescription";
import DoctorDashboard from "./Pages/Dashboard/Dashboard";
import { getCityFromCoords } from "./utils/locationUtils";
import AboutUs from "./components/Aboutus";
import FAQs from "./components/FAQs";
import Services from "./components/Services";
import PatientDashboard from "./Pages/PatientDashboard/patientDash";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout = ({ location, setLocation }) => (
  <>
    <Navbar location={location} setLocation={setLocation} />
    <Outlet />
  </>
);

const App = () => {
  const [location, setLocation] = useState("Select Location");
  localStorage.setItem('loggedIn',false);

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
      <Route element={<Layout location={location} setLocation={setLocation} />}>
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
      <Route path="/doctordashboard" element={<DoctorDashboard />} />
      <Route path="/patientdashboard" element={<PatientDashboard />} />
    </Routes>
    </AuthProvider>
  );
};

export default App;
