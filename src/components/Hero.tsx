import React, { useState, useEffect } from 'react';
import { ChevronRight, Play, Pause, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeroProps {
  onNavigateToExperiment?: () => void;
  isActive?: boolean;
}

const Hero: React.FC<HeroProps> = ({ onNavigateToExperiment, isActive = true }) => {
  const [isPlaying, setIsPlaying] = useState(true);
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
    const newStars = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.02,
      vy: (Math.random() - 0.5) * 0.02,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      twinkle: Math.random() * Math.PI * 2
    }));
    setStars(newStars);
  }, []);

  // Animate stars
  useEffect(() => {
    if (!isPlaying || !isActive) return;

    const interval = setInterval(() => {
      setStars(prevStars => 
        prevStars.map(star => ({
          ...star,
          x: (star.x + star.vx + 100) % 100,
          y: (star.y + star.vy + 100) % 100,
          twinkle: star.twinkle + 0.05,
          opacity: 0.2 + Math.sin(star.twinkle) * 0.3 + 0.3
        }))
      );
    }, 50);

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
                  ? `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity * 0.5})`
                  : `0 0 ${star.size * 2}px rgba(0, 0, 0, ${star.opacity * 0.3})`
              }}
            />
          ))}
        </div>

        {/* Subtle nebula effect */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full blur-3xl ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-400/30 to-purple-400/30' 
                  : 'bg-gradient-to-r from-blue-300/40 to-purple-300/40'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 300 + 200}px`,
                height: `${Math.random() * 300 + 200}px`,
                transform: `translateY(${Math.sin(Date.now() * 0.0005 + i) * 30}px)`,
                animation: `float ${8 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 4}s`
              }}
            />
          ))}
        </div>
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
            onClick={openSimulation}
            className={`flex items-center gap-2 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:shadow-lg hover:shadow-blue-500/25' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-600/25'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            Live Simulation
          </button>
        </div>

        {/* Experiment navigation */}
        {onNavigateToExperiment && (
          <div className="flex justify-center mb-8">
            <button
              onClick={onNavigateToExperiment}
              className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 group ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 hover:shadow-lg hover:shadow-green-500/25' 
                  : 'bg-gradient-to-r from-green-600 to-teal-600 text-white hover:from-green-700 hover:to-teal-700 hover:shadow-lg hover:shadow-green-600/25'
              }`}
            >
              <span>View Our Experiment</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        )}

        {/* Animation control */}
        <div className="flex justify-center items-center mb-8">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-slate-700/50 text-white hover:bg-slate-600/50' 
                : 'bg-white/50 text-gray-900 hover:bg-white/70'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause' : 'Play'} Stars
          </button>
        </div>

        {/* Scroll hint */}
        <div className={`text-center ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <div className="text-sm mb-2">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-current rounded-full mx-auto relative">
            <div className="w-1 h-3 bg-current rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-bounce" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.3s both;
        }
      `}</style>
    </section>
  );
};

export default Hero;