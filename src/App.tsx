import React from 'react';
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
    <div className="min-h-screen bg-slate-900">
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
  );
}

export default App;