// doctorHandler.js
import { createDoctor } from '../apiControllers/userAPI';

export default async function doctorHandler(formData) {
  try {
    const response = await createDoctor(formData);
    console.log('Doctor registered successfully:', response);
    alert('Doctor registration successful!');
  } catch (error) {
    console.error('Doctor registration error:', error);
    alert('Doctor registration failed.');
  }
};
<<<<<<< HEAD

=======
>>>>>>> ec834354c90a0410f45778a97caee57dbf9c5ebf
