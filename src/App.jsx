import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./Pages/Home";
import NavbarAlt from "./components/navbarAlternate";

const Layout = () => {
  return (
    <>
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <NavbarAlt />
      </div>

      {/* Scrollable content with top padding to avoid overlap */}
      <div className="pt-16 min-h-screen overflow-y-auto">
        <Outlet />
      </div>
    </>
  );
};


const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* Add more routes here, for example: */}
          {/* <Route path="/about" element={<About />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
