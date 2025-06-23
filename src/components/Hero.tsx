import React, { useState, useEffect } from 'react';
import { ChevronRight, Play, Pause, ExternalLink, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeroProps {
  onNavigateToExperiment?: () => void;
  isActive?: boolean;
}

const Hero: React.FC<HeroProps> = ({ onNavigateToExperiment, isActive = true }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [stars, setStars] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    twinkle: number;
  }>>([]);
  const { isDarkMode } = useTheme();

  const openSimulation = () => {
    window.open('https://visualize-it.github.io/nuclear_fusion/simulation.html', '_blank');
  };

  // Initialize stars
  useEffect(() => {
    const newStars = Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.03,
      vy: (Math.random() - 0.5) * 0.03,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      twinkle: Math.random() * Math.PI * 2
    }));
    setStars(newStars);
  }, []);

  // Animate stars with smoother movement
  useEffect(() => {
    if (!isPlaying || !isActive) return;

    const interval = setInterval(() => {
      setStars(prevStars => 
        prevStars.map(star => ({
          ...star,
          x: (star.x + star.vx + 100) % 100,
          y: (star.y + star.vy + 100) % 100,
          twinkle: star.twinkle + 0.03,
          opacity: 0.2 + Math.sin(star.twinkle) * 0.4 + 0.4
        }))
      );
    }, 30); // Smoother animation at 30ms intervals

    return () => clearInterval(interval);
  }, [isPlaying, isActive]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated star field background */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100'
      }`}>
        {/* Floating stars */}
        <div className="absolute inset-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className={`absolute rounded-full transition-opacity duration-100 ${
                isDarkMode 
                  ? 'bg-white' 
                  : 'bg-gray-800'
              }`}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                transform: `translate(-50%, -50%)`,
                boxShadow: isDarkMode 
                  ? `0 0 ${star.size * 3}px rgba(255, 255, 255, ${star.opacity * 0.6})`
                  : `0 0 ${star.size * 2}px rgba(0, 0, 0, ${star.opacity * 0.3})`
              }}
            />
          ))}
        </div>

        {/* Enhanced nebula effect */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full blur-3xl ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-400/40 to-purple-400/40' 
                  : 'bg-gradient-to-r from-blue-300/50 to-purple-300/50'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 400 + 300}px`,
                height: `${Math.random() * 400 + 300}px`,
                transform: `translateY(${Math.sin(Date.now() * 0.0003 + i) * 50}px)`,
                animation: `float ${10 + Math.random() * 6}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 className={`text-6xl md:text-8xl font-bold mb-8 leading-tight animate-fade-in transition-colors duration-500 ${
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
        <p className={`text-2xl md:text-3xl mb-12 leading-relaxed animate-slide-up transition-colors duration-500 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          The power of the stars, harnessed for humanity's future
        </p>
        
        {/* Enhanced interactive controls */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <button
            onClick={openSimulation}
            className={`group flex items-center gap-3 px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:shadow-2xl hover:shadow-blue-500/25' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-2xl hover:shadow-blue-600/25'
            }`}
          >
            <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-lg font-medium">Live Simulation</span>
          </button>

          {/* Experiment navigation */}
          {onNavigateToExperiment && (
            <button
              onClick={onNavigateToExperiment}
              className={`group flex items-center gap-3 px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 hover:shadow-2xl hover:shadow-green-500/25' 
                  : 'bg-gradient-to-r from-green-600 to-teal-600 text-white hover:from-green-700 hover:to-teal-700 hover:shadow-2xl hover:shadow-green-600/25'
              }`}
            >
              <span className="text-lg font-medium">View Our Experiment</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          )}
        </div>

        {/* Enhanced control panel */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-105 ${
              isDarkMode 
                ? 'bg-slate-700/50 text-white hover:bg-slate-600/50 border border-slate-600/30' 
                : 'bg-white/50 text-gray-900 hover:bg-white/70 border border-gray-200/30'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="text-sm font-medium">{isPlaying ? 'Pause' : 'Play'} Stars</span>
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-105 ${
              soundEnabled
                ? isDarkMode 
                  ? 'bg-blue-500/50 text-white hover:bg-blue-600/50 border border-blue-400/30'
                  : 'bg-blue-500/50 text-white hover:bg-blue-600/50 border border-blue-400/30'
                : isDarkMode 
                  ? 'bg-slate-700/50 text-white hover:bg-slate-600/50 border border-slate-600/30'
                  : 'bg-white/50 text-gray-900 hover:bg-white/70 border border-gray-200/30'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="text-sm font-medium">Sound</span>
          </button>
        </div>

        {/* Enhanced scroll hint */}
        <div className={`text-center animate-bounce-slow ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <div className="text-lg mb-4 font-medium">Scroll to explore</div>
          <div className="w-8 h-12 border-2 border-current rounded-full mx-auto relative">
            <div className="w-1 h-4 bg-current rounded-full absolute top-3 left-1/2 transform -translate-x-1/2 animate-bounce" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in {
          animation: fade-in 1.2s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 1.2s ease-out 0.4s both;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;