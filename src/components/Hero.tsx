import React, { useState, useEffect } from 'react';
import { ChevronDown, Play, Pause, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [particleCount, setParticleCount] = useState(50);
  const { isDarkMode } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
  };

  const adjustParticles = (count: number) => {
    setParticleCount(count);
  };

  const openSimulation = () => {
    window.open('https://visualize-it.github.io/nuclear_fusion/simulation.html', '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic background based on theme */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100'
      }`}>
        <div className="absolute inset-0 opacity-30">
          {[...Array(particleCount)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full cursor-pointer hover:scale-150 transition-transform duration-300 ${
                isPlaying ? 'animate-pulse' : ''
              } ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 4 + 2}s`,
              }}
              onClick={() => {
                const ripple = document.createElement('div');
                ripple.className = `absolute rounded-full opacity-50 animate-ping pointer-events-none ${
                  isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                }`;
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.left = `${Math.random() * 100}%`;
                ripple.style.top = `${Math.random() * 100}%`;
                document.querySelector('.particle-container')?.appendChild(ripple);
                setTimeout(() => ripple.remove(), 1000);
              }}
            />
          ))}
        </div>
        <div className="particle-container absolute inset-0"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in transition-colors duration-500 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Fusion 4
          <span className={`bg-gradient-to-r bg-clip-text text-transparent hover:from-purple-400 hover:to-blue-400 transition-all duration-500 cursor-pointer ${
            isDarkMode 
              ? 'from-blue-400 to-purple-400' 
              : 'from-blue-600 to-purple-600'
          }`}>
            {' '}Future
          </span>
        </h1>
        <p className={`text-xl md:text-2xl mb-8 leading-relaxed animate-slide-up transition-colors duration-500 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          The power of the stars, harnessed for humanity's future
        </p>
        
        {/* Interactive controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={() => scrollToSection('basics')}
            className={`px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:shadow-lg hover:shadow-blue-500/25' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-600/25'
            }`}
          >
            Explore the Science
          </button>
          <button
            onClick={() => scrollToSection('process')}
            className={`px-8 py-3 rounded-full transition-all duration-300 border-2 hover:shadow-lg ${
              isDarkMode 
                ? 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white hover:shadow-blue-400/25' 
                : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-blue-600/25'
            }`}
          >
            How It Works
          </button>
          <button
            onClick={openSimulation}
            className={`flex items-center gap-2 px-8 py-3 rounded-full transition-all duration-300 border-2 hover:shadow-lg ${
              isDarkMode 
                ? 'border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white hover:shadow-purple-400/25' 
                : 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white hover:shadow-purple-600/25'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            Live Simulation
          </button>
        </div>

        {/* Animation controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={toggleAnimation}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-slate-700/50 text-white hover:bg-slate-600/50' 
                : 'bg-white/50 text-gray-900 hover:bg-white/70'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause' : 'Play'} Animation
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm transition-colors duration-500 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Particles:
            </span>
            <input
              type="range"
              min="10"
              max="100"
              value={particleCount}
              onChange={(e) => adjustParticles(parseInt(e.target.value))}
              className={`w-20 h-2 rounded-lg appearance-none cursor-pointer slider ${
                isDarkMode ? 'bg-slate-600' : 'bg-gray-300'
              }`}
            />
            <span className={`text-sm transition-colors duration-500 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {particleCount}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection('basics')}
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-colors duration-500 ${
          isDarkMode 
            ? 'text-white hover:text-blue-400' 
            : 'text-gray-900 hover:text-blue-600'
        }`}
      >
        <ChevronDown className="w-8 h-8" />
      </button>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.3s both;
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: ${isDarkMode ? '#3b82f6' : '#1d4ed8'};
          cursor: pointer;
        }
      `}</style>
    </section>
  );
};

export default Hero;