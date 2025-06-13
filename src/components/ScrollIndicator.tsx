import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ScrollIndicator = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const sections = [
    { id: 'hero', name: 'Home' },
    { id: 'basics', name: 'Basics' },
    { id: 'process', name: 'Process' },
    { id: 'simulation', name: 'Simulation' },
    { id: 'benefits', name: 'Benefits' },
    { id: 'challenges', name: 'Challenges' },
    { id: 'projects', name: 'Projects' },
    { id: 'future', name: 'Future' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id === 'hero' ? 'root' : section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(index);
          }
        }
      });

      // Hide indicator when at very top or bottom
      setIsVisible(window.scrollY > 100 && window.scrollY < document.body.scrollHeight - window.innerHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (direction: 'up' | 'down') => {
    const targetIndex = direction === 'down' 
      ? Math.min(currentSection + 1, sections.length - 1)
      : Math.max(currentSection - 1, 0);
    
    const targetSection = sections[targetIndex];
    const element = document.getElementById(targetSection.id === 'hero' ? 'root' : targetSection.id);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSpecificSection = (index: number) => {
    const targetSection = sections[index];
    const element = document.getElementById(targetSection.id === 'hero' ? 'root' : targetSection.id);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 flex flex-col items-center space-y-4">
      {/* Up arrow */}
      <button
        onClick={() => scrollToSection('up')}
        disabled={currentSection === 0}
        className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
          currentSection === 0
            ? 'bg-slate-600/50 text-gray-500 cursor-not-allowed'
            : 'bg-slate-800/80 text-white hover:bg-slate-700/80 backdrop-blur-sm'
        }`}
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      {/* Section indicators */}
      <div className="flex flex-col space-y-2">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSpecificSection(index)}
            className={`group relative w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
              currentSection === index
                ? 'bg-blue-400 scale-125'
                : 'bg-slate-500 hover:bg-slate-400'
            }`}
          >
            {/* Tooltip */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-slate-800/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap backdrop-blur-sm">
                {section.name}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Down arrow */}
      <button
        onClick={() => scrollToSection('down')}
        disabled={currentSection === sections.length - 1}
        className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
          currentSection === sections.length - 1
            ? 'bg-slate-600/50 text-gray-500 cursor-not-allowed'
            : 'bg-slate-800/80 text-white hover:bg-slate-700/80 backdrop-blur-sm'
        }`}
      >
        <ChevronDown className="w-5 h-5" />
      </button>

      {/* Current section label */}
      <div className="bg-slate-800/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
        {sections[currentSection].name}
      </div>
    </div>
  );
};

export default ScrollIndicator;