import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import ExperimentPage from './components/ExperimentPage';
import Basics from './components/Basics';
import Process from './components/Process';
import Simulation3D from './components/Simulation3D';
import Benefits from './components/Benefits';
import Challenges from './components/Challenges';
import Projects from './components/Projects';
import Future from './components/Future';
import Footer from './components/Footer';
import ScrollIndicator from './components/ScrollIndicator';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('main');

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-500 dark:bg-slate-900 bg-gray-50 overflow-x-hidden">
        {currentPage === 'main' ? (
          <>
            <Header />
            <Hero onNavigateToExperiment={() => setCurrentPage('experiment')} />
            <Basics />
            <Process />
            <Simulation3D />
            <Benefits />
            <Challenges />
            <Projects />
            <Future />
            <Footer />
            <ScrollIndicator />
          </>
        ) : (
          <ExperimentPage onNavigateBack={() => setCurrentPage('main')} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;