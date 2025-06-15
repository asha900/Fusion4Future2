import React, { useState, useEffect, useRef } from 'react';
import { 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Play, 
  Pause, 
  Eye, 
  Layers, 
  Zap, 
  Thermometer,
  Settings,
  MousePointer
} from 'lucide-react';

interface Tokamak3DProps {
  isActive?: boolean;
}

const Tokamak3D: React.FC<Tokamak3DProps> = ({ isActive = true }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewMode, setViewMode] = useState('normal');
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [temperature, setTemperature] = useState(100);
  const [magneticField, setMagneticField] = useState(75);
  const [plasmaIntensity, setPlasmaIntensity] = useState(80);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const viewModes = [
    { id: 'normal', name: 'Normal View', icon: <Eye className="w-4 h-4" /> },
    { id: 'cutaway', name: 'Cutaway View', icon: <Layers className="w-4 h-4" /> },
    { id: 'plasma', name: 'Plasma Only', icon: <Zap className="w-4 h-4" /> },
    { id: 'magnetic', name: 'Magnetic Field', icon: <Settings className="w-4 h-4" /> }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      if (isActive) {
        drawTokamak(ctx, canvas.width, canvas.height);
      }
      if (isPlaying && isActive) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, isActive, viewMode, zoom, rotation, temperature, magneticField, plasmaIntensity]);

  const drawTokamak = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Clear canvas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const time = Date.now() * 0.001;

    // Apply transformations
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(zoom, zoom);
    ctx.rotate(rotation.y * 0.01);

    // Draw based on view mode
    switch (viewMode) {
      case 'normal':
        drawNormalView(ctx, time);
        break;
      case 'cutaway':
        drawCutawayView(ctx, time);
        break;
      case 'plasma':
        drawPlasmaView(ctx, time);
        break;
      case 'magnetic':
        drawMagneticView(ctx, time);
        break;
    }

    ctx.restore();

    // Draw UI overlay
    drawUIOverlay(ctx, width, height);
  };

  const drawNormalView = (ctx: CanvasRenderingContext2D, time: number) => {
    // Outer vessel
    const outerRadius = 150;
    const innerRadius = 120;
    
    // Vessel structure
    const vesselGradient = ctx.createRadialGradient(0, 0, innerRadius, 0, 0, outerRadius);
    vesselGradient.addColorStop(0, 'rgba(100, 116, 139, 0.3)');
    vesselGradient.addColorStop(1, 'rgba(100, 116, 139, 0.8)');
    
    ctx.fillStyle = vesselGradient;
    ctx.beginPath();
    ctx.arc(0, 0, outerRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Inner chamber
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, innerRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Toroidal field coils
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      const coilRadius = outerRadius + 20;
      const x = Math.cos(angle) * coilRadius;
      const y = Math.sin(angle) * coilRadius;
      
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Coil connections
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    // Plasma
    drawPlasma(ctx, time);
  };

  const drawCutawayView = (ctx: CanvasRenderingContext2D, time: number) => {
    // Show internal structure
    const outerRadius = 150;
    const innerRadius = 120;
    
    // Half vessel
    ctx.fillStyle = 'rgba(100, 116, 139, 0.6)';
    ctx.beginPath();
    ctx.arc(0, 0, outerRadius, 0, Math.PI);
    ctx.closePath();
    ctx.fill();
    
    // Internal components
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    
    // Blanket modules
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI;
      const x1 = Math.cos(angle) * innerRadius;
      const y1 = Math.sin(angle) * innerRadius;
      const x2 = Math.cos(angle) * (innerRadius - 15);
      const y2 = Math.sin(angle) * (innerRadius - 15);
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Plasma
    drawPlasma(ctx, time);
    
    // Divertor
    ctx.fillStyle = '#6366f1';
    ctx.beginPath();
    ctx.arc(0, innerRadius - 30, 20, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawPlasmaView = (ctx: CanvasRenderingContext2D, time: number) => {
    // Focus only on plasma
    drawPlasma(ctx, time, true);
    
    // Plasma instabilities
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + time * 2;
      const radius = 60 + Math.sin(time * 3 + i) * 20;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      const instabilityGradient = ctx.createRadialGradient(x, y, 0, x, y, 10);
      instabilityGradient.addColorStop(0, 'rgba(239, 68, 68, 0.8)');
      instabilityGradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
      
      ctx.fillStyle = instabilityGradient;
      ctx.beginPath();
      ctx.arc(x, y, 5 + Math.sin(time * 4 + i) * 3, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawMagneticView = (ctx: CanvasRenderingContext2D, time: number) => {
    // Magnetic field lines
    const fieldStrength = magneticField / 100;
    
    // Toroidal field
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      const radius1 = 80;
      const radius2 = 160;
      
      const gradient = ctx.createLinearGradient(
        Math.cos(angle) * radius1, Math.sin(angle) * radius1,
        Math.cos(angle) * radius2, Math.sin(angle) * radius2
      );
      gradient.addColorStop(0, `rgba(139, 92, 246, ${0.8 * fieldStrength})`);
      gradient.addColorStop(1, `rgba(139, 92, 246, ${0.2 * fieldStrength})`);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * radius1, Math.sin(angle) * radius1);
      ctx.lineTo(Math.cos(angle) * radius2, Math.sin(angle) * radius2);
      ctx.stroke();
    }

    // Poloidal field
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + time * 0.5;
      const radius = 100 + Math.sin(time + i) * 20;
      
      ctx.strokeStyle = `rgba(34, 197, 94, ${0.6 * fieldStrength})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, radius, angle, angle + Math.PI / 4);
      ctx.stroke();
    }

    // Plasma (faded)
    drawPlasma(ctx, time, false, 0.3);
  };

  const drawPlasma = (ctx: CanvasRenderingContext2D, time: number, enhanced = false, opacity = 1) => {
    const intensity = (plasmaIntensity / 100) * opacity;
    const tempFactor = temperature / 200;
    
    // Core plasma
    const coreRadius = 50 * tempFactor;
    const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, coreRadius);
    coreGradient.addColorStop(0, `rgba(255, 255, 255, ${intensity})`);
    coreGradient.addColorStop(0.3, `rgba(245, 158, 11, ${intensity * 0.8})`);
    coreGradient.addColorStop(0.7, `rgba(239, 68, 68, ${intensity * 0.6})`);
    coreGradient.addColorStop(1, `rgba(139, 92, 246, ${intensity * 0.3})`);
    
    ctx.fillStyle = coreGradient;
    ctx.beginPath();
    ctx.arc(0, 0, coreRadius, 0, Math.PI * 2);
    ctx.fill();

    // Plasma edge
    const edgeRadius = 80 * tempFactor;
    const edgeGradient = ctx.createRadialGradient(0, 0, coreRadius, 0, 0, edgeRadius);
    edgeGradient.addColorStop(0, `rgba(139, 92, 246, ${intensity * 0.3})`);
    edgeGradient.addColorStop(1, `rgba(59, 130, 246, ${intensity * 0.1})`);
    
    ctx.fillStyle = edgeGradient;
    ctx.beginPath();
    ctx.arc(0, 0, edgeRadius, 0, Math.PI * 2);
    ctx.fill();

    if (enhanced) {
      // Plasma particles
      for (let i = 0; i < 50; i++) {
        const angle = (i / 50) * Math.PI * 2 + time * 3;
        const radius = 20 + Math.sin(time * 2 + i) * 40;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        const particleSize = 1 + Math.sin(time * 5 + i) * 1;
        const particleOpacity = intensity * (0.5 + Math.sin(time * 4 + i) * 0.3);
        
        ctx.fillStyle = `rgba(255, 255, 255, ${particleOpacity})`;
        ctx.beginPath();
        ctx.arc(x, y, particleSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const drawUIOverlay = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Temperature display
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(10, 10, 200, 80);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px sans-serif';
    ctx.fillText(`Temperature: ${(temperature * 1000000).toLocaleString()}°C`, 20, 30);
    ctx.fillText(`Magnetic Field: ${magneticField}%`, 20, 50);
    ctx.fillText(`Plasma Intensity: ${plasmaIntensity}%`, 20, 70);

    // Zoom indicator
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(width - 120, 10, 100, 30);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Zoom: ${zoom.toFixed(1)}x`, width - 110, 30);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;
    
    setRotation(prev => ({
      x: prev.x + deltaY,
      y: prev.y + deltaX
    }));
    
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.5, Math.min(3, prev * zoomFactor)));
  };

  const resetView = () => {
    setZoom(1);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <section className="h-screen bg-gradient-to-br from-slate-900 to-indigo-900 relative overflow-hidden">
      {/* Floating stars background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 4 + 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="p-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Interactive 3D Tokamak
          </h2>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Explore a fusion reactor in 3D - drag to rotate, scroll to zoom, and control the plasma
          </p>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* 3D Viewer */}
          <div className="flex-1 p-6">
            <div className="bg-slate-800/50 rounded-2xl p-6 h-full backdrop-blur-sm border border-slate-600/50">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="w-full h-full rounded-xl cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
              />
            </div>
          </div>

          {/* Control Panel */}
          <div className="w-80 p-6 space-y-6">
            {/* View Controls */}
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

            {/* Camera Controls */}
            <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-600/50">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <MousePointer className="w-5 h-5 text-purple-400" />
                Camera
              </h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setZoom(prev => Math.min(3, prev * 1.2))}
                    className="flex-1 flex items-center justify-center gap-2 p-2 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <ZoomIn className="w-4 h-4" />
                    Zoom In
                  </button>
                  <button
                    onClick={() => setZoom(prev => Math.max(0.5, prev * 0.8))}
                    className="flex-1 flex items-center justify-center gap-2 p-2 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <ZoomOut className="w-4 h-4" />
                    Zoom Out
                  </button>
                </div>
                <button
                  onClick={resetView}
                  className="w-full flex items-center justify-center gap-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset View
                </button>
              </div>
            </div>

            {/* Plasma Parameters */}
            <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-600/50">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-orange-400" />
                Parameters
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Temperature: {temperature}M°C
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="200"
                    value={temperature}
                    onChange={(e) => setTemperature(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Magnetic Field: {magneticField}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={magneticField}
                    onChange={(e) => setMagneticField(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Plasma Intensity: {plasmaIntensity}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={plasmaIntensity}
                    onChange={(e) => setPlasmaIntensity(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>

            {/* Animation Control */}
            <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-600/50">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-300 ${
                  isPlaying 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isPlaying ? 'Pause' : 'Play'} Animation
              </button>
            </div>

            {/* Instructions */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-blue-500/30">
              <h4 className="text-white font-medium mb-2">Controls:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Drag to rotate the view</li>
                <li>• Scroll to zoom in/out</li>
                <li>• Use sliders to control plasma</li>
                <li>• Switch view modes to explore</li>
              </ul>
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

export default Tokamak3D;