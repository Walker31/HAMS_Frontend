import { loginUser } from '../apiControllers/userAPI';

export default async function handleUserLogin(e, formData) {
  e.preventDefault();
  try {
    const response = await loginUser(formData);
    console.log('Login successful:', response);
    // localStorage.setItem('token', response.token);
  } catch (error) {
    console.error('Login error:', error);
    alert('Login failed. Please check your credentials.');
  }
}

