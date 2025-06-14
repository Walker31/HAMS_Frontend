import axios from 'axios';

const API_URL = 'http://localhost:3000'; 

export const createDoctor = async (doctorData) => {
  try {
    const response = await axios.post(`http://localhost:3000/doctors/doctorsignup`, doctorData);
    return response.data;
  } catch (error) {
    console.error('Doctor registration failed:', error.response?.data || error.message);
    throw error;
  }
};



export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response.data; 
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export const createPatient = async (patientData) => {
    try {
    const response = await axios.post(`${API_URL}/patients`, patientData);
    return response.data; 
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};


