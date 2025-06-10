import React, { useState, useEffect } from 'react';
import { ChevronDown, Play, Pause } from 'lucide-react';

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [particleCount, setParticleCount] = useState(50);

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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Interactive animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 opacity-30">
          {[...Array(particleCount)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400 ${
                isPlaying ? 'animate-pulse' : ''
              } cursor-pointer hover:scale-150 transition-transform duration-300`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 4 + 2}s`,
              }}
              onClick={() => {
                // Create ripple effect on click
                const ripple = document.createElement('div');
                ripple.className = 'absolute rounded-full bg-blue-400 opacity-50 animate-ping pointer-events-none';
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
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
          Nuclear
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-purple-400 hover:to-blue-400 transition-all duration-500 cursor-pointer"> Fusion</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed animate-slide-up">
          The power of the stars, harnessed for humanity's future
        </p>
        
        {/* Interactive controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={() => scrollToSection('basics')}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Explore the Science
          </button>
          <button
            onClick={() => scrollToSection('process')}
            className="px-8 py-3 border-2 border-blue-400 text-blue-400 rounded-full hover:bg-blue-400 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/25"
          >
            How It Works
          </button>
        </div>

        {/* Animation controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={toggleAnimation}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 backdrop-blur-sm text-white rounded-full hover:bg-slate-600/50 transition-all duration-300"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause' : 'Play'} Animation
          </button>
          <div className="flex items-center gap-2">
            <span className="text-white text-sm">Particles:</span>
            <input
              type="range"
              min="10"
              max="100"
              value={particleCount}
              onChange={(e) => adjustParticles(parseInt(e.target.value))}
              className="w-20 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-white text-sm">{particleCount}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection('basics')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce hover:text-blue-400 transition-colors duration-300"
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
          background: #3b82f6;
          cursor: pointer;
        }
      `}</style>
    </section>
  );
};

export default Hero;