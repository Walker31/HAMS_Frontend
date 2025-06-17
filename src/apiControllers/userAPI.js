// userAPI.js
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const createDoctor = async (doctorData) => {
  try {
    const response = await axios.post(`${API_URL}/doctors/signup`, doctorData);
    return response.data;
  } catch (error) {
    console.error('Doctor registration failed:', error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/doctors/login`, loginData);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export const createPatient = async (patientData) => {
  try {
    const response = await axios.post(`${API_URL}/patients/signup`, patientData);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export const createHospital = async (hospitalData) => {
  try {
    console.log(hospitalData);
    const response = await axios.post(`${API_URL}/hospitals/signup`, hospitalData);
    return response.data;
  } catch (error) {
    console.error('Hospital registration failed:', error.response?.data || error.message);
    throw error;
  }
};

export const loginHospital = async (hospitalData) => {
  try {
    const response = await axios.post(`${API_URL}/hospitals/login`, hospitalData);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};