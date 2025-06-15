import { createDoctor } from '../apiControllers/userAPI';

export default async function handleDoctorRegistration (e, formData){
  e.preventDefault();
  try {
    const response = await createDoctor(formData);
    console.log('Doctor registered successfully:', response);
    alert('Doctor registration successful!');
  } catch (error) {
    console.error('Doctor registration error:', error);
    alert('Doctor registration failed.');
  }
};
