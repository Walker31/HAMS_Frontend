import { loginUser } from '../apiControllers/userAPI';

export const handleUserLogin = async (e, formData) => {
  e.preventDefault();
  try {
    const response = await loginUser(formData);
    console.log('Login successful:', response);

    // Save token or redirect if needed
    // localStorage.setItem('token', response.token);

  } catch (error) {
    console.error('Login error:', error);
    alert('Login failed. Please check your credentials.');
  }
};
