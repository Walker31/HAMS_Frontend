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
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/doctors-available" element={<DoctorsAvailable />} />
          <Route path="/doctor-description" element={<DoctorDescription />} />
          <Route path="/login" element={<RegisterForm />} />
          <Route path="/confirmation" element={<Confirmation />} />
          {/* Add more routes here if needed */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;