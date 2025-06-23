// doctorHandler.js
import { createDoctor } from '../apiControllers/userAPI';
import { useAuth } from '../contexts/AuthContext';

export default async function doctorHandler(formData,login) {
  try {
    const response = await createDoctor(formData,login);
    console.log('Doctor registered successfully:', response);
    alert('Doctor registration successful!');
  } catch (error) {
    console.error('Doctor registration error:', error);
    alert('Doctor registration failed.');
  }
};
