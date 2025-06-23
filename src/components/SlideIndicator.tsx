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
        className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
          currentSlide === 0 || isTransitioning
            ? 'bg-slate-600/50 text-gray-500 cursor-not-allowed'
            : 'bg-slate-800/80 text-white hover:bg-slate-700/80 backdrop-blur-sm shadow-lg hover:shadow-xl'
        }`}
        title="Previous slide"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      {/* Slide indicators */}
      <div className="flex flex-col space-y-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => !isTransitioning && onNavigateToSlide(index)}
            disabled={isTransitioning}
            className={`group relative w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
              currentSlide === index
                ? 'bg-blue-400 scale-125 shadow-lg shadow-blue-400/50'
                : 'bg-slate-500 hover:bg-slate-400'
            } ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {/* Enhanced tooltip */}
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <div className="bg-slate-800/95 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap backdrop-blur-sm border border-slate-600/50 shadow-xl">
                {slide.name}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800/95 rotate-45 border-l border-b border-slate-600/50"></div>
              </div>
            </div>

            {/* Active indicator glow */}
            {currentSlide === index && (
              <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></div>
            )}
          </button>
        ))}
      </div>

      {/* Down arrow */}
      <button
        onClick={navigateDown}
        disabled={currentSlide === slides.length - 1 || isTransitioning}
        className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
          currentSlide === slides.length - 1 || isTransitioning
            ? 'bg-slate-600/50 text-gray-500 cursor-not-allowed'
            : 'bg-slate-800/80 text-white hover:bg-slate-700/80 backdrop-blur-sm shadow-lg hover:shadow-xl'
        }`}
        title="Next slide"
      >
        <ChevronDown className="w-5 h-5" />
      </button>

      {/* Enhanced current slide label */}
      <div className="bg-slate-800/90 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm border border-slate-600/50 shadow-lg">
        <div className="font-medium">{slides[currentSlide].name}</div>
        <div className="text-xs text-gray-400 text-center">{currentSlide + 1} of {slides.length}</div>
      </div>

      {/* Enhanced progress indicator */}
      <div className="w-2 h-24 bg-slate-600/50 rounded-full overflow-hidden border border-slate-500/30">
        <div 
          className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out shadow-lg"
          style={{ height: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default SlideIndicator;