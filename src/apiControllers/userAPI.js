// userAPI.js
import axios from 'axios';

export const createDoctor = async (doctorData) => {
  const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  try {
    const response = await axios.post(`${base_url}/doctors/signup`, doctorData);
    return response.data;
  } catch (error) {
    console.error('Doctor registration failed:', error.response?.data || error.message);
    throw error;
  }
};

 export const loginUser = async (loginData, role = "patient") => {
  const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  const route = role === "doctor" ? "doctors/login" : "patients/login";
  try {
    const response = await axios.post(`${base_url}/${route}`, loginData);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export const createPatient = async (patientData) => {
  const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

  try {
    const response = await axios.post(`${base_url}/patients/signup`, patientData);
    console.log("Patient signup successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Patient signup failed:", error.response?.data || error.message);
    throw error;
  }
};

export const createHospital = async (hospitalData) => {
  const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  try {
    console.log(hospitalData);
    const response = await axios.post(`${base_url}/hospitals/signup`, hospitalData);
    return response.data;
  } catch (error) {
    console.error('Hospital registration failed:', error.response?.data || error.message);
    throw error;
  }
};

export const loginHospital = async (hospitalData) => {
  const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
  try {
    const response = await axios.post(`${base_url}/hospitals/login`, hospitalData);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};