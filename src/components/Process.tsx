import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Zap, Thermometer, Target } from 'lucide-react';

const Process = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [step, setStep] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [energyOutput, setEnergyOutput] = useState(0);
  const [userControlled, setUserControlled] = useState(false);

  const steps = [
    {
      title: "Hydrogen Nuclei Approach",
      description: "Two hydrogen nuclei (protons) approach each other at extremely high speeds due to intense heat and pressure.",
      temperature: 15000000,
      pressure: 25,
      energy: 0
    },
    {
      title: "Overcoming Coulomb Barrier",
      description: "The nuclei must overcome their natural electrical repulsion (Coulomb barrier) to get close enough for the strong nuclear force to take effect.",
      temperature: 50000000,
      pressure: 50,
      energy: 10
    },
    {
      title: "Nuclear Fusion Occurs",
      description: "When nuclei get within 1 femtometer of each other, the strong nuclear force takes over, binding them together.",
      temperature: 100000000,
      pressure: 75,
      energy: 50
    },
    {
      title: "Energy Release",
      description: "The fusion creates a heavier nucleus, releasing enormous amounts of energy in the form of high-energy particles and radiation.",
      temperature: 150000000,
      pressure: 100,
      energy: 100
    }
  ];

  useEffect(() => {
    if (isAnimating && !userControlled) {
      const interval = setInterval(() => {
        setStep(prev => {
          const nextStep = (prev + 1) % steps.length;
          updateParameters(nextStep);
          return nextStep;
        });
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isAnimating, userControlled]);

  const updateParameters = (stepIndex: number) => {
    const currentStep = steps[stepIndex];
    setTemperature(currentStep.temperature);
    setPressure(currentStep.pressure);
    setEnergyOutput(currentStep.energy);
  };

  const startAnimation = () => {
    if (isAnimating) {
      setIsAnimating(false);
      return;
    }
    
    setIsAnimating(true);
    setUserControlled(false);
    setStep(0);
    updateParameters(0);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setUserControlled(false);
    setStep(0);
    updateParameters(0);
  };

  const handleStepClick = (stepIndex: number) => {
    setStep(stepIndex);
    setUserControlled(true);
    setIsAnimating(false);
    updateParameters(stepIndex);
  };

  const handleParameterChange = (param: string, value: number) => {
    setUserControlled(true);
    setIsAnimating(false);
    
    switch (param) {
      case 'temperature':
        setTemperature(value);
        break;
      case 'pressure':
        setPressure(value);
        break;
      case 'energy':
        setEnergyOutput(value);
        break;
    }
  };

  return (
    <section id="process" className="py-20 bg-gradient-to-br from-slate-900 to-blue-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Interactive Fusion Process
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Control the fusion process and watch how hydrogen nuclei combine to form helium
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Interactive Animation */}
          <div className="bg-slate-800/50 rounded-2xl p-8 mb-12 backdrop-blur-sm border border-slate-600/50">
            <div className="flex justify-center mb-8">
              <div className="relative w-96 h-80 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl flex items-center justify-center overflow-hidden border border-slate-600/30">
                {/* Temperature indicator */}
                <div className="absolute top-4 left-4 text-xs text-gray-300">
                  <Thermometer className="w-4 h-4 inline mr-1" />
                  {(temperature / 1000000).toFixed(0)}M°C
                </div>
                
                {/* Pressure indicator */}
                <div className="absolute top-4 right-4 text-xs text-gray-300">
                  <Target className="w-4 h-4 inline mr-1" />
                  {pressure}% Pressure
                </div>

                {/* Animation visualization */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {step === 0 && (
                    <>
                      <div className={`w-10 h-10 bg-gradient-to-r from-red-400 to-red-500 rounded-full absolute transition-all duration-1000 shadow-lg ${isAnimating ? 'left-20 animate-pulse' : 'left-12'}`} />
                      <div className={`w-10 h-10 bg-gradient-to-r from-red-400 to-red-500 rounded-full absolute transition-all duration-1000 shadow-lg ${isAnimating ? 'right-20 animate-pulse' : 'right-12'}`} />
                    </>
                  )}
                  {step === 1 && (
                    <>
                      <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-red-500 rounded-full absolute left-28 animate-pulse shadow-lg" />
                      <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-red-500 rounded-full absolute right-28 animate-pulse shadow-lg" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 animate-pulse rounded-full" />
                      </div>
                      {/* Electric field lines */}
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-8 bg-yellow-400 opacity-60 animate-pulse"
                          style={{
                            transform: `rotate(${i * 30}deg)`,
                            transformOrigin: 'center'
                          }}
                        />
                      ))}
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-pulse shadow-xl border-2 border-blue-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 border-2 border-purple-400 rounded-full animate-spin opacity-50" />
                      </div>
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full shadow-xl border-2 border-blue-300" />
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping shadow-lg"
                          style={{
                            transform: `rotate(${i * 30}deg) translateX(50px)`,
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: '1s'
                          }}
                        />
                      ))}
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-xl animate-pulse" />
                    </>
                  )}
                </div>

                {/* Energy output indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <Zap className="w-4 h-4" />
                    <div className="w-20 h-2 bg-slate-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-yellow-400 transition-all duration-1000"
                        style={{ width: `${energyOutput}%` }}
                      />
                    </div>
                    <span>{energyOutput}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-700/30 rounded-xl p-4">
                <label className="block text-white text-sm font-medium mb-2">Temperature (Million °C)</label>
                <input
                  type="range"
                  min="0"
                  max="200000000"
                  step="1000000"
                  value={temperature}
                  onChange={(e) => handleParameterChange('temperature', parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-center text-blue-400 text-sm mt-1">
                  {(temperature / 1000000).toFixed(0)}M°C
                </div>
              </div>
              
              <div className="bg-slate-700/30 rounded-xl p-4">
                <label className="block text-white text-sm font-medium mb-2">Pressure (%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={pressure}
                  onChange={(e) => handleParameterChange('pressure', parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-center text-purple-400 text-sm mt-1">
                  {pressure}%
                </div>
              </div>
              
              <div className="bg-slate-700/30 rounded-xl p-4">
                <label className="block text-white text-sm font-medium mb-2">Energy Output (%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={energyOutput}
                  onChange={(e) => handleParameterChange('energy', parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-center text-green-400 text-sm mt-1">
                  {energyOutput}%
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={startAnimation}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all duration-300 transform hover:scale-105"
              >
                {isAnimating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isAnimating ? 'Pause' : 'Start'} Auto Animation
              </button>
              <button
                onClick={resetAnimation}
                className="flex items-center gap-2 px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">{steps[step].title}</h3>
              <p className="text-gray-300">{steps[step].description}</p>
            </div>
          </div>

          {/* Interactive Step Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((stepItem, index) => (
              <div
                key={index}
                onClick={() => handleStepClick(index)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  step === index
                    ? 'bg-blue-500/20 border-2 border-blue-400 shadow-lg shadow-blue-400/25'
                    : 'bg-slate-700/50 border border-slate-600/50 hover:bg-slate-700/70'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 ${
                    step === index ? 'bg-blue-500 scale-110' : 'bg-slate-600'
                  }`}>
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white ml-3">{stepItem.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-3">{stepItem.description}</p>
                <div className="text-xs text-blue-400">
                  Click to jump to this step
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </section>
  );
};

export default Process;