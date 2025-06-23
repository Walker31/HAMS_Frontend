// userAPI.js
import { useContext } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

// These now ONLY send requests, and leave state to AuthContext
export const createDoctor = async (doctorData,login) => {
  console.log(doctorData)
  const res = await axios.post(`${base_url}/doctors/signup`, doctorData, {
    withCredentials: true,
  });
  login(res.data, 'doctor');
  return res.data;
};

export const loginUser = async (loginData, role, login) => {
  const route = role === "doctor" ? "doctors/login" : "patients/login";
  const res = await axios.post(`${base_url}/${route}`, loginData, {
    withCredentials: true,
  });
  login(loginData);
  return res.data;
};

export const createPatient = async (patientData,login) => {
  const res = await axios.post(`${base_url}/patients/signup`, patientData, {
    withCredentials: true,
  });
  login(res.data, 'patient');
  return res.data;
};

export const createHospital = async (hospitalData,login) => {
  const res = await axios.post(`${base_url}/hospitals/signup`, hospitalData, {
    withCredentials: true,
  });
  login(res.data, 'hospital');
  return res.data;
};

export const loginHospital = async (hospitalData, login) => {
  const res = await axios.post(`${base_url}/hospitals/login`, hospitalData, {
    withCredentials: true,
  });
  login(res.data, 'hospital');
  return res.data;
};
