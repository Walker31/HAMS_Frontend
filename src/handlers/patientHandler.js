import { createPatient } from '../apiControllers/userAPI';

export const handlePatientRegistration = async (e, formData) => {
  e.preventDefault();
  try {
    const response = await createPatient(formData);
    console.log('Patient registered successfully:', response);
    alert('Patient registration successful!');
    // You can redirect or reset the form here
  } catch (error) {
    console.error('Patient registration error:', error);
    alert('Patient registration failed.');
  }
};
