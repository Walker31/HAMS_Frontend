// userAPI.js
import axios from 'axios';

const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

// Utility: Save user session info
const storeSession = (data, type) => {
  localStorage.setItem('loggedIn', 'true');
  localStorage.setItem('userType', type); // e.g., doctor, patient, hospital
  localStorage.setItem('user', JSON.stringify(data));
};

// Doctor Signup
export const createDoctor = async (doctorData) => {
  try {
    const response = await axios.post(`${base_url}/doctors/signup`, doctorData);
    storeSession(response.data, 'doctor');
    return response.data;
  } catch (error) {
    console.error('Doctor registration failed:', error.response?.data || error.message);
    throw error;
  }
};

// Doctor Login
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${base_url}/doctors/login`, loginData);
    storeSession(response.data, 'doctor');
    return response.data;
  } catch (error) {
    console.error('Doctor login failed:', error.response?.data || error.message);
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
    console.error('Patient registration failed:', error.response?.data || error.message);
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
    console.error('Hospital registration failed:', error.response?.data || error.message);
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
    console.error('Hospital login failed:', error.response?.data || error.message);
    throw error;
  }
};

// Utility: Logout
export const logoutUser = () => {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('userType');
  localStorage.removeItem('user');
};

