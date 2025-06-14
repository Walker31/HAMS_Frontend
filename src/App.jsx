import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/navbar";
import Home from "./Pages/Home";
import DoctorsAvailable from "./components/DoctorsAvailable";
import DoctorDescription from "./components/DoctorDescription";

const Layout = () => {
  return (
    <>
    <div className = "scrollbar-hide">
      <Navbar />
      <Outlet /></div>
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
          {/* Add more routes here if needed */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
