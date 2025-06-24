import React from 'react';
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  History as HistoryIcon,
  Logout as LogoutIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useFloatingBarStore } from '../store/floatingBarStore';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon fontSize="small" />, key: 'dashboard' },
  { label: 'Settings', icon: <SettingsIcon fontSize="small" />, key: 'settings' },
  { label: 'History', icon: <HistoryIcon fontSize="small" />, key: 'history' },
  { label: 'Logout', icon : <LogoutIcon fontSize='small' />, key: 'logout'},
];

const routeMap = {
  dashboard: '/dashboard',
  settings: '/settings',
  history: '/history',
};

const FloatingBar = () => {
  const navigate = useNavigate();
  const close = useFloatingBarStore((state) => state.close);
  const isVisible = useFloatingBarStore((state) => state.isVisible);
  const [activeTab, setActiveTab] = React.useState('');
  
  const handleLogout = () => {
    close()
    localStorage.removeItem("token");
    navigate("/", { replace: true });
    alert("Logged out successfully");
  };

  const handleTabChange = (key) => {
  if (key === 'logout') {
    handleLogout()
  }
  else{
  close()
  navigate(`/${key}`);}
};

  
  if(!isVisible) return ;

  return (
    <div
      className="fixed top-16 right-0 z-50 shadow-xl rounded-bl-2xl border border-gray-300 dark:border-white/10 
      bg-white backdrop-blur-lg flex flex-col overflow-hidden w-[160px]"
    >
      

      <div className="flex-1 divide-y divide-gray-200 dark:divide-white/10 w-full">
        {navItems.map(({ label, icon, key }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-left text-blue-700 hover:bg-gray-100 transition-all
                ${key === 'logout' ? 'text-red-700' : ''}`}
            >
              {icon}
              {label}
              <hr />
            </button>
            
          );
        })}
      </div>
    </div>
  );
};

export default FloatingBar;