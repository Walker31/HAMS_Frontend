import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import { FaHome } from "react-icons/fa";
import { useAuth } from '../../../contexts/AuthContext';
import axios from 'axios';

const Header = () => {
  const [name, setName] = useState('');
  const {logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get('/api/patient/profile');
        setName(response.data.name);
      } catch (error) {
        console.error('Failed to fetch patient name:', error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <header className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">Health Dashboard</h1>
        <p className="text-sm text-gray-600">Welcome back, {name || 'Patient'}!</p>
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-cyan-600 text-white px-4 py-2"> Schedule Appointment</button>
        <FaBell className="text-gray-500 text-xl ml-4" />
        <button onClick={handleLogout} className=" text-gray-500 ml-4">
         <FaHome className="text-xl" />
        </button>
      </div>
    </header>
  );
};

export default Header;