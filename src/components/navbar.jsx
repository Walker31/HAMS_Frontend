import { useState } from "react";
import LocationModal from "./locationBox";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import RegisterForm from "../Pages/Login/registerForm";

const navigation = [
  { name: "Health", href: "#", current: false },
  { name: "Medicines & Health Services", href: "#", current: false },
  { name: "Services", href: "#", current: false },
  { name: "About Us", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({ location, setLocation }) => {
  const [selected, setSelected] = useState("Health");
  const [open, setOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between px-6 sm:px-12 h-16 shadow bg-white">
        <button
          className="text-4xl font-bold text-black bg-transparent border-0 p-0"
          onClick={() => navigate("/")}
        >
          HAMS
        </button>

        <div className="hidden md:flex justify-center flex-1 space-x-6">
          {navigation.map((item) => (
            <div
              key={item.name}
              onClick={() => setSelected(item.name)}
              className={classNames(
                selected === item.name
                  ? "border-b-2 border-[#527C88] text-[#527C88]"
                  : "hover:border-b-2 hover:text-[#527C88] border-[#527C88]",
                "px-3 py-2 text-sm font-medium transition cursor-pointer"
              )}
            >
              {item.name}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1 text-sm text-black hover:text-blue-600 font-medium"
          >
            <LocationOnOutlinedIcon className="text-xl" />
            <span>{location}</span>
            <svg
              className="w-4 h-4 ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.19l3.71-3.96a.75.75 0 111.1 1.02l-4.25 4.5a.75.75 0 01-1.1 0L5.21 8.27a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div
            className="rounded-full bg-[#10217D] hover:bg-[#1a2bb8] transition cursor-pointer"
            onClick={() => setShowRegister(true)}
          >
            <button className="text-white px-4 py-2 text-sm font-medium">
              SignUp / Login
            </button>
          </div>
        </div>
      </div>

      <LocationModal
        open={open}
        onClose={() => setOpen(false)}
        setLocation={setLocation}
      />

      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-max max-h-[90vh] flex flex-col shadow-lg relative overflow-y-auto">
            <div className="flex flex-row justify-end pr-2 pt-2">
              <IconButton
              aria-label="Close"
              onClick={() => setShowRegister(false)}
            >
              <CloseIcon ></CloseIcon>
            </IconButton>
            </div>
            <div className="px-4 pb-4">
              <RegisterForm />
            </div>
            
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
