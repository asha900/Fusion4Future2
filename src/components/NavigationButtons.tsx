import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, SkipBack, SkipForward, Home } from 'lucide-react';

interface NavigationButtonsProps {
  currentSlide: number;
  totalSlides: number;
  onNavigateToSlide: (slideIndex: number) => void;
  isTransitioning: boolean;
  autoPlayEnabled: boolean;
  onToggleAutoPlay: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentSlide,
  totalSlides,
  onNavigateToSlide,
  isTransitioning,
  autoPlayEnabled,
  onToggleAutoPlay
}) => {
  const canGoPrevious = currentSlide > 0 && !isTransitioning;
  const canGoNext = currentSlide < totalSlides - 1 && !isTransitioning;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="flex items-center gap-2 bg-slate-800/90 backdrop-blur-sm rounded-full p-2 border border-slate-600/50">
        {/* Go to first slide */}
        <button
          onClick={() => onNavigateToSlide(0)}
          disabled={currentSlide === 0 || isTransitioning}
          className={`p-2 rounded-full transition-all duration-300 ${
            currentSlide === 0 || isTransitioning
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-white hover:bg-slate-700 hover:scale-110'
          }`}
          title="Go to first slide (Home)"
        >
          <Home className="w-4 h-4" />
        </button>

        {/* Previous slide */}
        <button
          onClick={() => onNavigateToSlide(currentSlide - 1)}
          disabled={!canGoPrevious}
          className={`p-2 rounded-full transition-all duration-300 ${
            !canGoPrevious
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-white hover:bg-slate-700 hover:scale-110'
          }`}
          title="Previous slide (↑ or PageUp)"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Auto-play toggle */}
        <button
          onClick={onToggleAutoPlay}
          className={`p-2 rounded-full transition-all duration-300 ${
            autoPlayEnabled
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'text-white hover:bg-slate-700'
          } hover:scale-110`}
          title={autoPlayEnabled ? 'Pause auto-play (ESC)' : 'Start auto-play'}
        >
          {autoPlayEnabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        {/* Slide counter */}
        <div className="px-3 py-1 bg-slate-700/50 rounded-full text-white text-sm font-medium min-w-[60px] text-center">
          {currentSlide + 1} / {totalSlides}
        </div>

        {/* Next slide */}
        <button
          onClick={() => onNavigateToSlide(currentSlide + 1)}
          disabled={!canGoNext}
          className={`p-2 rounded-full transition-all duration-300 ${
            !canGoNext
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-white hover:bg-slate-700 hover:scale-110'
          }`}
          title="Next slide (↓, Space, or PageDown)"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Go to last slide */}
        <button
          onClick={() => onNavigateToSlide(totalSlides - 1)}
          disabled={currentSlide === totalSlides - 1 || isTransitioning}
          className={`p-2 rounded-full transition-all duration-300 ${
            currentSlide === totalSlides - 1 || isTransitioning
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-white hover:bg-slate-700 hover:scale-110'
          }`}
          title="Go to last slide (End)"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default NavigationButtons;