import { createPatient } from '../apiControllers/userAPI';

export default async function handlePatientRegistration(formData){
  try {
    const response = await createPatient(formData);
    console.log('Patient registered successfully:', response);
    alert('Patient registration successful!');
  } catch (error) {
    console.error('Patient registration error:', error);
    alert('Patient registration failed.');
  }
};
