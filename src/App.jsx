import { useState, useEffect } from "react";
import Home from "./Pages/Home";
import Navbar from "./components/navbar";
import DoctorsAvailable from "./components/DoctorsAvailable";
import DoctorDescription from "./components/DoctorDescription";
import RegisterForm from "./components/RegisterForm";
import Confirmation from "./components/Confirmation";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";


const Layout = ({ location, setLocation }) => (
  <>
    <Navbar location={location} setLocation={setLocation} />
    <Outlet />
  </>
);

const App = () => {
  const [location, setLocation] = useState("Select Location");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const city = await getCityFromCoords(
            position.coords.latitude,
            position.coords.longitude
          );
          setLocation(city);
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
    <Router>
      <Routes>
        <Route
          element={<Layout location={location} setLocation={setLocation} />}
        >
          <Route path="/" element={<Home />} />
          <Route path="/doctors-available" element={<DoctorsAvailable />} />
          <Route path="/doctor-description" element={<DoctorDescription />} />
          <Route path="/login" element={<RegisterForm />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
