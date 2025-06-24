import React from 'react';
import {
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  History as HistoryIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useFloatingBarStore } from '../store/floatingBarStore';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon fontSize="small" />, key: 'dashboard' },
  { label: 'Settings', icon: <SettingsIcon fontSize="small" />, key: 'settings' },
  { label: 'History', icon: <HistoryIcon fontSize="small" />, key: 'history' },
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
  

  const handleTabChange = (key) => {
  close()
  navigate(`/${key}`);
};

  
  if(!isVisible) return ;

  return (
    <div
      className="fixed top-24 right-6 z-50 shadow-xl rounded-2xl border border-gray-300 dark:border-white/10 
      bg-white/70 dark:bg-[#1c1c28]/60 backdrop-blur-lg flex flex-col overflow-hidden w-[240px]"
    >
      <div className="p-4 border-b border-gray-300 dark:border-white/10 relative flex items-center justify-between w-full">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Navigation</h2>
        <button
          onClick={close}
          className="absolute top-2 right-2 text-gray-700 dark:text-gray-300"
        >
          <CloseIcon fontSize="small" />
        </button>
      </div>

      <div className="flex-1 divide-y divide-gray-200 dark:divide-white/10 w-full">
        {navItems.map(({ label, icon, key }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-all
                ${isActive ? 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}
            >
              {icon}
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FloatingBar;
