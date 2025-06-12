import {
  FaCity,
  FaMonument,
  FaBuilding,
  FaHospital,
  FaLandmark,
} from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";
import { GiIndianPalace, GiTempleGate } from "react-icons/gi";

const cityIcons = {
  Ahmedabad: <GiIndianPalace />,
  Amritsar: <GiTempleGate />,
  Aragonda: <FaHospital />,
  Bangalore: <MdLocationCity />,
  Bhopal: <FaCity />,
  Bhubaneswar: <FaMonument />,
  Bilaspur: <FaBuilding />,
  Chennai: <MdLocationCity />,
  Cochin: <FaBuilding />,
  Delhi: <FaLandmark />,
  Gandhinagar: <FaCity />,
  Guwahati: <GiTempleGate />,
  Hyderabad: <GiIndianPalace />,
  Indore: <FaCity />,
  Kakinada: <MdLocationCity />,
  Karaikudi: <GiTempleGate />,
  KarimNagar: <FaBuilding />,
  Karur: <FaHospital />,
  Kolkata: <FaLandmark />,
  Lucknow: <GiIndianPalace />,
  Madurai: <GiTempleGate />,
  Mumbai: <FaCity />,
  Mysore: <GiTempleGate />,
  Nashik: <FaBuilding />,
  Nellore: <MdLocationCity />,
  Noida: <FaBuilding />,
  Rourkela: <FaCity />,
  Trichy: <GiTempleGate />,
  Visakhapatnam: <FaCity />,
  Warangal: <GiTempleGate />,
  OtherCities: <FaBuilding />,
};
export default cityIcons