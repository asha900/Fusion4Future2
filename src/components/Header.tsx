import React, { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import DarkModeToggle from './DarkModeToggle';

interface HeaderProps {
  onNavigateToSlide?: (slideIndex: number) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateToSlide }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode } = useTheme();

  const navigationItems = [
    { name: 'Home', slideIndex: 0 },
    { name: 'Basics', slideIndex: 1 },
    { name: 'Process', slideIndex: 2 },
    { name: '3D Tokamak', slideIndex: 3 },
    { name: 'Benefits', slideIndex: 4 },
    { name: 'Challenges', slideIndex: 5 },
    { name: 'Projects', slideIndex: 6 },
    { name: 'Future', slideIndex: 7 }
  ];

  const handleNavigation = (slideIndex: number) => {
    if (onNavigateToSlide) {
      onNavigateToSlide(slideIndex);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50' 
        : 'bg-white/95 backdrop-blur-sm border-b border-gray-200/50'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleNavigation(0)}
            className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
          >
            <div className={`p-2 rounded-xl transition-all duration-300 ${
              isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
            }`}>
              <Zap className={`w-8 h-8 transition-colors duration-300 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`} />
            </div>
            <div>
              <span className={`text-xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Fusion 4 Future
              </span>
              <div className={`text-xs transition-colors duration-300 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                Interactive Nuclear Fusion Explorer
              </div>
            </div>
          </button>
          
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.slideIndex)}
                className={`transition-all duration-300 hover:scale-105 relative group ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.name}
                <div className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                }`} />
              </button>
            ))}
            <DarkModeToggle />
          </div>

          <div className="md:hidden flex items-center gap-3">
            <DarkModeToggle />
            <button
              className={`transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className={`md:hidden mt-4 pb-4 border-t transition-colors duration-300 ${
            isDarkMode ? 'border-slate-700' : 'border-gray-200'
          }`}>
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.slideIndex)}
                className={`block w-full text-left py-3 px-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-slate-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;