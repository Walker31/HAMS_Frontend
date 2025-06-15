import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/navbar";
import TopDoc from "./components/topDoc";
import Programs from "./components/programs";
import Header from "./components/header"

const App = () => {
  return <>
  <Navbar/>
  <Header/>
  <TopDoc/>
  <Programs/>
  </>
} ;

export default App;
