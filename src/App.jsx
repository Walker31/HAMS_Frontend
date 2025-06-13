import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/navbar";
import Home from "./Pages/Home";
import DoctorDetails from "./components/DoctorDetails";

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
          <Route path="/doctor-details" element={<DoctorDetails />} />
          {/* Add more routes here if needed */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
