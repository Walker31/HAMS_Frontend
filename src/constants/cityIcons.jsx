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
  Bangalore: <MdLocationCity />,
  Chennai: <MdLocationCity />,
  Cochin: <FaBuilding />,
  Delhi: <FaLandmark />,
  Hyderabad: <GiIndianPalace />,
  Kolkata: <FaLandmark />,
  Lucknow: <GiIndianPalace />,
  Mumbai: <FaCity />,
  Warangal: <GiTempleGate />,
};
export default cityIcons