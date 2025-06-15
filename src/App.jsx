import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/navbar";
import TopDoc from "./components/topDoc";
import Programs from "./components/programs";

const App = () => {
  return <>
  <Navbar/>
  <Header/>
  <TopDoc/>
  <Programs/>
  </>
} ;

export default App;
