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

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('main');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  useEffect(() => {
    if (currentPage !== 'main') return;

    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isTransitioning || isScrolling) return;
      
      isScrolling = true;
      clearTimeout(scrollTimeout);
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const newSlide = Math.max(0, Math.min(slides.length - 1, currentSlide + direction));
      
      if (newSlide !== currentSlide) {
        setIsTransitioning(true);
        setCurrentSlide(newSlide);
        
        setTimeout(() => {
          setIsTransitioning(false);
        }, 800);
      }
      
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const newSlide = Math.min(slides.length - 1, currentSlide + 1);
        if (newSlide !== currentSlide) {
          setIsTransitioning(true);
          setCurrentSlide(newSlide);
          setTimeout(() => setIsTransitioning(false), 800);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const newSlide = Math.max(0, currentSlide - 1);
        if (newSlide !== currentSlide) {
          setIsTransitioning(true);
          setCurrentSlide(newSlide);
          setTimeout(() => setIsTransitioning(false), 800);
        }
      }
    };

    // Touch handling for mobile
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning) return;
      
      touchEndY = e.changedTouches[0].screenY;
      const deltaY = touchStartY - touchEndY;
      
      if (Math.abs(deltaY) > 50) { // Minimum swipe distance
        const direction = deltaY > 0 ? 1 : -1;
        const newSlide = Math.max(0, Math.min(slides.length - 1, currentSlide + direction));
        
        if (newSlide !== currentSlide) {
          setIsTransitioning(true);
          setCurrentSlide(newSlide);
          setTimeout(() => setIsTransitioning(false), 800);
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
    if (isTransitioning || slideIndex === currentSlide) return;
    
    setIsTransitioning(true);
    setCurrentSlide(slideIndex);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const navigateToExperiment = () => {
    setCurrentPage('experiment');
  };

  const navigateBack = () => {
    setCurrentPage('main');
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
                    className={`absolute inset-0 w-full h-full transition-transform duration-800 ease-in-out ${
                      isTransitioning ? '' : 'transition-none'
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
          </>
        ) : (
          <ExperimentPage onNavigateBack={navigateBack} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;