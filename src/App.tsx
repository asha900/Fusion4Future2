import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import ExperimentPage from './components/ExperimentPage';
import Basics from './components/Basics';
import Process from './components/Process';
import Tokamak3D from './components/Tokamak3D';
import Benefits from './components/Benefits';
import Challenges from './components/Challenges';
import Projects from './components/Projects';
import Future from './components/Future';
import Footer from './components/Footer';
import SlideIndicator from './components/SlideIndicator';
import NavigationButtons from './components/NavigationButtons';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('main');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
  const [showKeyboardHints, setShowKeyboardHints] = useState(true);

  const slides = [
    { id: 'hero', component: Hero, name: 'Home' },
    { id: 'basics', component: Basics, name: 'Basics' },
    { id: 'process', component: Process, name: 'Process' },
    { id: 'tokamak', component: Tokamak3D, name: '3D Tokamak' },
    { id: 'benefits', component: Benefits, name: 'Benefits' },
    { id: 'challenges', component: Challenges, name: 'Challenges' },
    { id: 'projects', component: Projects, name: 'Projects' },
    { id: 'future', component: Future, name: 'Future' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlayEnabled && currentPage === 'main' && !isTransitioning) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, 8000); // 8 seconds per slide
      return () => clearInterval(interval);
    }
  }, [autoPlayEnabled, currentPage, isTransitioning, slides.length]);

  // Hide keyboard hints after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowKeyboardHints(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentPage !== 'main') return;

    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;
    let lastScrollTime = 0;
    const scrollCooldown = 1000; // 1 second cooldown between scrolls

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const now = Date.now();
      if (isTransitioning || isScrolling || (now - lastScrollTime) < scrollCooldown) return;
      
      isScrolling = true;
      lastScrollTime = now;
      clearTimeout(scrollTimeout);
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const newSlide = Math.max(0, Math.min(slides.length - 1, currentSlide + direction));
      
      if (newSlide !== currentSlide) {
        navigateToSlide(newSlide);
      }
      
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, scrollCooldown);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ': // Spacebar
          e.preventDefault();
          navigateToSlide(Math.min(slides.length - 1, currentSlide + 1));
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          navigateToSlide(Math.max(0, currentSlide - 1));
          break;
        case 'Home':
          e.preventDefault();
          navigateToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          navigateToSlide(slides.length - 1);
          break;
        case 'Escape':
          setAutoPlayEnabled(false);
          break;
      }
    };

    // Touch handling for mobile with improved sensitivity
    let touchStartY = 0;
    let touchEndY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.changedTouches[0].screenY;
      touchStartTime = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning) return;
      
      touchEndY = e.changedTouches[0].screenY;
      const deltaY = touchStartY - touchEndY;
      const touchDuration = Date.now() - touchStartTime;
      
      // Require minimum swipe distance and maximum duration for responsiveness
      if (Math.abs(deltaY) > 30 && touchDuration < 500) {
        const direction = deltaY > 0 ? 1 : -1;
        const newSlide = Math.max(0, Math.min(slides.length - 1, currentSlide + direction));
        
        if (newSlide !== currentSlide) {
          navigateToSlide(newSlide);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(scrollTimeout);
    };
  }, [currentSlide, isTransitioning, currentPage, slides.length]);

  const navigateToSlide = (slideIndex: number) => {
    if (isTransitioning || slideIndex === currentSlide || slideIndex < 0 || slideIndex >= slides.length) return;
    
    setIsTransitioning(true);
    setCurrentSlide(slideIndex);
    setAutoPlayEnabled(false); // Disable auto-play when user manually navigates
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Increased transition time for smoother animation
  };

  const navigateToExperiment = () => {
    setCurrentPage('experiment');
  };

  const navigateBack = () => {
    setCurrentPage('main');
  };

  const toggleAutoPlay = () => {
    setAutoPlayEnabled(!autoPlayEnabled);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <div className="h-screen overflow-hidden transition-colors duration-500 dark:bg-slate-900 bg-gray-50">
        {currentPage === 'main' ? (
          <>
            <Header onNavigateToSlide={navigateToSlide} />
            
            {/* Slides Container */}
            <div className="relative h-full">
              {slides.map((slide, index) => {
                const SlideComponent = slide.component;
                const offset = (index - currentSlide) * 100;
                
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 w-full h-full transition-transform duration-1000 ease-in-out ${
                      isTransitioning ? 'transition-transform' : ''
                    }`}
                    style={{
                      transform: `translateY(${offset}vh)`,
                      zIndex: index === currentSlide ? 10 : 1
                    }}
                  >
                    <SlideComponent 
                      onNavigateToExperiment={slide.id === 'hero' ? navigateToExperiment : undefined}
                      isActive={index === currentSlide}
                    />
                  </div>
                );
              })}
            </div>
            
            <SlideIndicator 
              slides={slides}
              currentSlide={currentSlide}
              onNavigateToSlide={navigateToSlide}
              isTransitioning={isTransitioning}
            />

            <NavigationButtons
              currentSlide={currentSlide}
              totalSlides={slides.length}
              onNavigateToSlide={navigateToSlide}
              isTransitioning={isTransitioning}
              autoPlayEnabled={autoPlayEnabled}
              onToggleAutoPlay={toggleAutoPlay}
            />

            {/* Keyboard Hints */}
            {showKeyboardHints && (
              <div className="fixed bottom-6 left-6 z-30 bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 text-white text-sm animate-fade-in">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="font-medium">Navigation Tips</span>
                </div>
                <div className="space-y-1 text-xs text-gray-300">
                  <div>↑↓ Arrow keys or scroll to navigate</div>
                  <div>Space/PageDown for next slide</div>
                  <div>Home/End for first/last slide</div>
                  <div>ESC to stop auto-play</div>
                </div>
                <button
                  onClick={() => setShowKeyboardHints(false)}
                  className="absolute top-1 right-2 text-gray-400 hover:text-white text-xs"
                >
                  ×
                </button>
              </div>
            )}

            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-700/50">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out"
                style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              />
            </div>

            {/* Auto-play indicator */}
            {autoPlayEnabled && (
              <div className="fixed top-20 right-6 z-40 bg-blue-500/90 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs animate-pulse">
                Auto-play enabled
              </div>
            )}
          </>
        ) : (
          <ExperimentPage onNavigateBack={navigateBack} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;