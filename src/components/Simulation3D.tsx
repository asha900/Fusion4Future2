import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Eye, 
  Layers, 
  Zap, 
  Thermometer, 
  Magnet,
  Settings,
  Volume2,
  VolumeX
} from 'lucide-react';

const Simulation3D = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [viewMode, setViewMode] = useState('normal');
  const [showMagneticField, setShowMagneticField] = useState(true);
  const [showHeatFlow, setShowHeatFlow] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [temperature, setTemperature] = useState(100);
  const [magneticStrength, setMagneticStrength] = useState(50);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const simulationSteps = [
    {
      title: "Plasma Initialization",
      description: "Hydrogen isotopes are heated to form plasma",
      temperature: 10000000,
      particles: 20,
      color: "#3b82f6"
    },
    {
      title: "Magnetic Confinement",
      description: "Powerful magnetic fields contain the plasma",
      temperature: 50000000,
      particles: 40,
      color: "#8b5cf6"
    },
    {
      title: "Fusion Ignition",
      description: "Nuclei overcome Coulomb barrier and fuse",
      temperature: 100000000,
      particles: 60,
      color: "#f59e0b"
    },
    {
      title: "Energy Release",
      description: "Fusion reactions release tremendous energy",
      temperature: 150000000,
      particles: 80,
      color: "#ef4444"
    }
  ];

  const viewModes = [
    { id: 'normal', name: 'Normal View', icon: <Eye className="w-4 h-4" /> },
    { id: 'cutaway', name: 'Cutaway View', icon: <Layers className="w-4 h-4" /> },
    { id: 'exploded', name: 'Exploded View', icon: <Settings className="w-4 h-4" /> },
    { id: 'wireframe', name: 'Wireframe', icon: <Zap className="w-4 h-4" /> }
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % simulationSteps.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      drawSimulation(ctx, canvas.width, canvas.height);
      if (isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentStep, viewMode, showMagneticField, showHeatFlow, temperature, magneticStrength, rotationSpeed]);

  const drawSimulation = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Clear canvas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const time = Date.now() * 0.001 * rotationSpeed;

    // Draw reactor vessel based on view mode
    drawReactorVessel(ctx, centerX, centerY, time);

    // Draw magnetic field lines if enabled
    if (showMagneticField) {
      drawMagneticField(ctx, centerX, centerY, time);
    }

    // Draw plasma and particles
    drawPlasma(ctx, centerX, centerY, time);

    // Draw heat flow if enabled
    if (showHeatFlow) {
      drawHeatFlow(ctx, centerX, centerY, time);
    }

    // Draw energy output
    drawEnergyOutput(ctx, centerX, centerY, time);
  };

  const drawReactorVessel = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    const radius = 120;
    
    if (viewMode === 'wireframe') {
      // Wireframe view
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Draw grid lines
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * radius,
          centerY + Math.sin(angle) * radius
        );
        ctx.stroke();
      }
    } else if (viewMode === 'cutaway') {
      // Cutaway view - show internal structure
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
      gradient.addColorStop(0.7, 'rgba(139, 92, 246, 0.2)');
      gradient.addColorStop(1, 'rgba(100, 116, 139, 0.8)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI);
      ctx.closePath();
      ctx.fill();
      
      // Draw vessel wall
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 4;
      ctx.stroke();
    } else if (viewMode === 'exploded') {
      // Exploded view - components separated
      const offset = Math.sin(time) * 20;
      
      // Outer vessel
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + offset, 0, Math.PI * 2);
      ctx.stroke();
      
      // Inner chamber
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 20 - offset, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      // Normal view
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
      gradient.addColorStop(1, 'rgba(100, 116, 139, 0.6)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  };

  const drawMagneticField = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    const fieldStrength = magneticStrength / 100;
    
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + time * 0.5;
      const radius = 80 + Math.sin(time + i) * 10 * fieldStrength;
      
      const x1 = centerX + Math.cos(angle) * radius;
      const y1 = centerY + Math.sin(angle) * radius;
      const x2 = centerX + Math.cos(angle) * (radius + 30);
      const y2 = centerY + Math.sin(angle) * (radius + 30);
      
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, `rgba(139, 92, 246, ${0.8 * fieldStrength})`);
      gradient.addColorStop(1, `rgba(139, 92, 246, ${0.2 * fieldStrength})`);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      
      // Draw field direction arrows
      const arrowSize = 5;
      const arrowAngle = angle + Math.PI / 6;
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(
        x2 - arrowSize * Math.cos(arrowAngle),
        y2 - arrowSize * Math.sin(arrowAngle)
      );
      ctx.moveTo(x2, y2);
      ctx.lineTo(
        x2 - arrowSize * Math.cos(angle - Math.PI / 6),
        y2 - arrowSize * Math.sin(angle - Math.PI / 6)
      );
      ctx.stroke();
    }
  };

  const drawPlasma = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    const step = simulationSteps[currentStep];
    const tempFactor = temperature / 200000000;
    
    // Draw plasma core
    const plasmaRadius = 60 * tempFactor;
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, plasmaRadius);
    gradient.addColorStop(0, step.color + 'ff');
    gradient.addColorStop(0.5, step.color + '80');
    gradient.addColorStop(1, step.color + '20');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, plasmaRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw particles
    for (let i = 0; i < step.particles; i++) {
      const angle = (i / step.particles) * Math.PI * 2 + time * 2;
      const radius = 20 + Math.sin(time * 3 + i) * 30;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, 3);
      particleGradient.addColorStop(0, '#ffffff');
      particleGradient.addColorStop(1, step.color);
      
      ctx.fillStyle = particleGradient;
      ctx.beginPath();
      ctx.arc(x, y, 2 + Math.sin(time * 5 + i) * 1, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw particle trails
      ctx.strokeStyle = step.color + '40';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(
        x - Math.cos(angle) * 10,
        y - Math.sin(angle) * 10
      );
      ctx.stroke();
    }
  };

  const drawHeatFlow = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const startRadius = 70;
      const endRadius = 140;
      
      for (let j = 0; j < 5; j++) {
        const progress = (j / 5) + (time * 0.5) % 1;
        const currentRadius = startRadius + (endRadius - startRadius) * progress;
        
        const x = centerX + Math.cos(angle) * currentRadius;
        const y = centerY + Math.sin(angle) * currentRadius;
        
        const alpha = 1 - progress;
        ctx.fillStyle = `rgba(245, 158, 11, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(x, y, 2 * alpha, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const drawEnergyOutput = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, time: number) => {
    if (currentStep >= 2) {
      const energyLevel = (currentStep - 1) / 3;
      
      for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2 + time;
        const radius = 140 + Math.sin(time * 2 + i) * 20;
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${energyLevel})`);
        gradient.addColorStop(1, `rgba(245, 158, 11, ${energyLevel * 0.3})`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 3 + energyLevel * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setTemperature(100);
    setMagneticStrength(50);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-indigo-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            3D Fusion Process Simulation
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Interactive 3D visualization of nuclear fusion with real-time controls
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 3D Simulation Canvas */}
            <div className="lg:col-span-3">
              <div className="bg-slate-800/50 rounded-2xl p-6 backdrop-blur-sm border border-slate-600/50">
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-xl bg-slate-900 border border-slate-700"
                  />
                  
                  {/* Overlay Information */}
                  <div className="absolute top-4 left-4 bg-slate-800/80 rounded-lg p-3 backdrop-blur-sm">
                    <h3 className="text-white font-bold text-lg mb-1">
                      {simulationSteps[currentStep].title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-2">
                      {simulationSteps[currentStep].description}
                    </p>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <Thermometer className="w-3 h-3 text-red-400" />
                        <span className="text-gray-300">
                          {(simulationSteps[currentStep].temperature / 1000000).toFixed(0)}M°C
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-yellow-400" />
                        <span className="text-gray-300">
                          {simulationSteps[currentStep].particles} particles
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* View Mode Indicator */}
                  <div className="absolute top-4 right-4 bg-slate-800/80 rounded-lg p-2 backdrop-blur-sm">
                    <div className="text-white text-sm font-medium">
                      {viewModes.find(v => v.id === viewMode)?.name}
                    </div>
                  </div>
                </div>

                {/* Simulation Controls */}
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                      isPlaying 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    {isPlaying ? 'Pause' : 'Play'} Simulation
                  </button>
                  
                  <button
                    onClick={resetSimulation}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Reset
                  </button>
                  
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-300 ${
                      soundEnabled 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                        : 'bg-slate-600 hover:bg-slate-500 text-white'
                    }`}
                  >
                    {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Control Panel */}
            <div className="space-y-6">
              {/* View Mode Selection */}
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-600/50">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-400" />
                  View Mode
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {viewModes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setViewMode(mode.id)}
                      className={`flex items-center gap-2 p-3 rounded-lg text-sm transition-all duration-300 ${
                        viewMode === mode.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
                      }`}
                    >
                      {mode.icon}
                      {mode.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Process Steps */}
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-600/50">
                <h3 className="text-white font-bold text-lg mb-4">Process Steps</h3>
                <div className="space-y-2">
                  {simulationSteps.map((step, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                        currentStep === index
                          ? 'bg-blue-500/20 border border-blue-400'
                          : 'bg-slate-700/30 hover:bg-slate-700/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          currentStep === index ? 'bg-blue-400' : 'bg-gray-500'
                        }`} />
                        <div>
                          <div className="text-white font-medium text-sm">{step.title}</div>
                          <div className="text-gray-400 text-xs">{step.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Parameter Controls */}
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-600/50">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-400" />
                  Parameters
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Temperature: {(temperature * 1000000).toLocaleString()}°C
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="200"
                      value={temperature}
                      onChange={(e) => setTemperature(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Magnetic Field: {magneticStrength}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={magneticStrength}
                      onChange={(e) => setMagneticStrength(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Rotation Speed: {rotationSpeed}x
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="3"
                      step="0.1"
                      value={rotationSpeed}
                      onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>

              {/* Display Options */}
              <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-600/50">
                <h3 className="text-white font-bold text-lg mb-4">Display Options</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showMagneticField}
                      onChange={(e) => setShowMagneticField(e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                    />
                    <div className="flex items-center gap-2">
                      <Magnet className="w-4 h-4 text-purple-400" />
                      <span className="text-white text-sm">Magnetic Field Lines</span>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showHeatFlow}
                      onChange={(e) => setShowHeatFlow(e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                    />
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-orange-400" />
                      <span className="text-white text-sm">Heat Flow</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </section>
  );
};

export default Simulation3D;