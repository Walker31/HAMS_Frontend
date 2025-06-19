import { loginUser } from '../apiControllers/userAPI';

export default async function handleUserLogin(formData) {
  try {
    const response = await loginUser(formData,"patient"); // <-- specify role if needed
    console.log('Login successful:', response);
    localStorage.setItem('token', response.token);
    return response; // <-- return response if needed
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Login failed. Please check your credentials.'); // <-- propagate error
  }
}

