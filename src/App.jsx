import Navbar from "./components/navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./Pages/Home";

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
          {/* Add more routes here, for example: */}
          {/* <Route path="/about" element={<About />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
