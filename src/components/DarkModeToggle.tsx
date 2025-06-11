import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        relative p-2 rounded-full transition-all duration-300 transform hover:scale-110
        ${isDarkMode 
          ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600 shadow-lg shadow-yellow-400/20' 
          : 'bg-blue-100 text-blue-600 hover:bg-blue-200 shadow-lg shadow-blue-400/20'
        }
      `}
      aria-label="Toggle dark mode"
    >
      <div className="relative w-6 h-6">
        <Sun 
          className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
            isDarkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`} 
        />
        <Moon 
          className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
            isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`} 
        />
      </div>
      
      {/* Animated background glow */}
      <div className={`
        absolute inset-0 rounded-full transition-all duration-300 -z-10
        ${isDarkMode 
          ? 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 animate-pulse' 
          : 'bg-gradient-to-r from-blue-400/20 to-cyan-400/20 animate-pulse'
        }
      `} />
    </button>
  );
};

export default DarkModeToggle;