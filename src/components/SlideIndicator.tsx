import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface SlideIndicatorProps {
  slides: Array<{ id: string; name: string }>;
  currentSlide: number;
  onNavigateToSlide: (slideIndex: number) => void;
  isTransitioning: boolean;
}

const SlideIndicator: React.FC<SlideIndicatorProps> = ({
  slides,
  currentSlide,
  onNavigateToSlide,
  isTransitioning
}) => {
  const navigateUp = () => {
    if (isTransitioning || currentSlide === 0) return;
    onNavigateToSlide(currentSlide - 1);
  };

  const navigateDown = () => {
    if (isTransitioning || currentSlide === slides.length - 1) return;
    onNavigateToSlide(currentSlide + 1);
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 flex flex-col items-center space-y-4">
      {/* Up arrow */}
      <button
        onClick={navigateUp}
        disabled={currentSlide === 0 || isTransitioning}
        className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
          currentSlide === 0 || isTransitioning
            ? 'bg-slate-600/50 text-gray-500 cursor-not-allowed'
            : 'bg-slate-800/80 text-white hover:bg-slate-700/80 backdrop-blur-sm'
        }`}
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      {/* Slide indicators */}
      <div className="flex flex-col space-y-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => !isTransitioning && onNavigateToSlide(index)}
            disabled={isTransitioning}
            className={`group relative w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
              currentSlide === index
                ? 'bg-blue-400 scale-125'
                : 'bg-slate-500 hover:bg-slate-400'
            } ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {/* Tooltip */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-slate-800/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap backdrop-blur-sm">
                {slide.name}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Down arrow */}
      <button
        onClick={navigateDown}
        disabled={currentSlide === slides.length - 1 || isTransitioning}
        className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
          currentSlide === slides.length - 1 || isTransitioning
            ? 'bg-slate-600/50 text-gray-500 cursor-not-allowed'
            : 'bg-slate-800/80 text-white hover:bg-slate-700/80 backdrop-blur-sm'
        }`}
      >
        <ChevronDown className="w-5 h-5" />
      </button>

      {/* Current slide label */}
      <div className="bg-slate-800/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
        {slides[currentSlide].name}
      </div>

      {/* Progress indicator */}
      <div className="w-1 h-20 bg-slate-600/50 rounded-full overflow-hidden">
        <div 
          className="w-full bg-blue-400 rounded-full transition-all duration-800 ease-in-out"
          style={{ height: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default SlideIndicator;