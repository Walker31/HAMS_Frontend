import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import axios from 'axios';

const Header = () => {
  const [name, setName] = useState('');

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
        <button className="bg-cyan-600 text-white px-4 py-2 rounded-md"> Schedule Appointment</button>
        <FaBell className="text-gray-500 text-xl" />
        <img className="w-8 h-8 rounded-full" src="https://i.pravatar.cc/40" alt="profile" />
      </div>
    </header>
  );
};

export default Header;