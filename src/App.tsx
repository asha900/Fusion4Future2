import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Basics from './components/Basics';
import Process from './components/Process';
import Benefits from './components/Benefits';
import Challenges from './components/Challenges';
import Projects from './components/Projects';
import Future from './components/Future';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-500 dark:bg-slate-900 bg-gray-50">
        <Header />
        <Hero />
        <Basics />
        <Process />
        <Benefits />
        <Challenges />
        <Projects />
        <Future />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;