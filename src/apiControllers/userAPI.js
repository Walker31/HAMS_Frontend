import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export const createDoctor = async (doctorData) => {
  const res = await axios.post(`${base_url}/doctors/signup`, doctorData, {
    withCredentials: true,
  });
  return res.data;
};

export const loginUser = async (loginData, role = "patient") => {
  const route = role === "doctor" ? "doctors/login" : "patients/login";
  const res = await axios.post(`${base_url}/${route}`, loginData, {
    withCredentials: true,
  });
  return res.data;
};

export const createPatient = async (patientData) => {
  const res = await axios.post(`${base_url}/patients/signup`, patientData, {
    withCredentials: true,
  });
  return res.data;
};

export const createHospital = async (hospitalData) => {
  const res = await axios.post(`${base_url}/hospitals/signup`, hospitalData, {
    withCredentials: true,
  });
  return res.data;
};

export const loginHospital = async (hospitalData) => {
  const res = await axios.post(`${base_url}/hospitals/login`, hospitalData, {
    withCredentials: true,
  });
  return res.data;
};
