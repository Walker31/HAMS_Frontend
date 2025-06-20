// userAPI.js
import axios from 'axios';

const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

// Utility: Save user session info
const storeSession = (data, type) => {
  localStorage.setItem('loggedIn', 'true');
  localStorage.setItem('userType', type);
  localStorage.setItem('user', JSON.stringify(data));
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
};

// Utility: Logout
export const logoutUser = () => {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('userType');
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

// Utility: Get current user
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Utility: Get Authorization Header
export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

// Doctor Signup
export const createDoctor = async (doctorData) => {
  try {
    const response = await axios.post(`${base_url}/doctors/signup`, doctorData);
    storeSession(response.data, 'doctor');
    return response.data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Doctor registration failed:', error.response?.data || error.message);
    }
    throw error;
  }
};

// Doctor/Patient Login
export const loginUser = async (loginData, role = "patient") => {
  const route = role === "doctor" ? "doctors/login" : "patients/login";
  try {
    const response = await axios.post(`${base_url}/${route}`, loginData);
    console.log(response)
    if (response.status === 200) storeSession(response.data, role);
    else alert("Login Failed");
    return response.data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error(`${role} login failed:`, error.response?.data || error.message);
    }
    throw error;
  }
};

// Patient Signup
export const createPatient = async (patientData) => {
  try {
    const response = await axios.post(`${base_url}/patients/signup`, patientData);
    storeSession(response.data, 'patient');
    return response.data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("Patient signup failed:", error.response?.data || error.message);
    }
    throw error;
  }
};

// Hospital Signup
export const createHospital = async (hospitalData) => {
  try {
    const response = await axios.post(`${base_url}/hospitals/signup`, hospitalData);
    storeSession(response.data, 'hospital');
    return response.data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Hospital registration failed:', error.response?.data || error.message);
    }
    throw error;
  }
};

// Hospital Login
export const loginHospital = async (hospitalData) => {
  try {
    const response = await axios.post(`${base_url}/hospitals/login`, hospitalData);
    storeSession(response.data, 'hospital');
    return response.data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Hospital login failed:', error.response?.data || error.message);
    }
    throw error;
  }
};
