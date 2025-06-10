import React, { useState, useEffect } from 'react';
import { Calendar, Zap, Globe, Rocket, Factory, Home, Play, Pause, FastForward } from 'lucide-react';

const Future = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(0);
  const [isTimelineAnimating, setIsTimelineAnimating] = useState(false);
  const [impactValues, setImpactValues] = useState({ clean: 0, co2: 0, economy: 0 });
  const [selectedApplication, setSelectedApplication] = useState<number | null>(null);

  const timeline = [
    {
      year: "2025-2030",
      title: "Proof of Concept",
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      events: [
        "ITER first plasma achieved",
        "Private companies reach net energy gain",
        "Advanced superconductor deployment",
        "Tritium breeding demonstrated"
      ],
      color: "blue",
      probability: 85,
      impact: "Foundation"
    },
    {
      year: "2030-2040",
      title: "Demonstration Plants",
      icon: <Factory className="w-6 h-6 text-green-400" />,
      events: [
        "First demonstration power plants",
        "Grid-connected fusion electricity",
        "Cost competitiveness achieved",
        "Commercial reactor designs finalized"
      ],
      color: "green",
      probability: 70,
      impact: "Breakthrough"
    },
    {
      year: "2040-2050",
      title: "Commercial Deployment",
      icon: <Globe className="w-6 h-6 text-purple-400" />,
      events: [
        "Mass production of fusion reactors",
        "Widespread grid integration",
        "Fossil fuel phase-out begins",
        "Global energy transformation"
      ],
      color: "purple",
      probability: 60,
      impact: "Revolution"
    },
    {
      year: "2050+",
      title: "Fusion Society",
      icon: <Rocket className="w-6 h-6 text-orange-400" />,
      events: [
        "Abundant clean energy for all",
        "Space exploration powered by fusion",
        "Climate goals achieved",
        "New technological possibilities"
      ],
      color: "orange",
      probability: 50,
      impact: "Transformation"
    }
  ];

  const applications = [
    {
      icon: <Home className="w-8 h-8 text-blue-400" />,
      title: "Residential Power",
      description: "Clean, abundant electricity for homes and communities worldwide",
      timeline: "2040s",
      impact: "High",
      details: "Fusion could provide 24/7 clean electricity to every home on Earth"
    },
    {
      icon: <Factory className="w-8 h-8 text-green-400" />,
      title: "Industrial Applications",
      description: "High-temperature processes, steel production, chemical manufacturing",
      timeline: "2040s",
      impact: "Very High",
      details: "Enable carbon-free industrial processes and manufacturing"
    },
    {
      icon: <Rocket className="w-8 h-8 text-purple-400" />,
      title: "Space Propulsion",
      description: "Fusion rockets for Mars missions and deep space exploration",
      timeline: "2050s",
      impact: "Revolutionary",
      details: "Make interplanetary travel routine and enable deep space exploration"
    },
    {
      icon: <Globe className="w-8 h-8 text-cyan-400" />,
      title: "Desalination",
      description: "Large-scale water purification and atmospheric carbon capture",
      timeline: "2040s",
      impact: "Critical",
      details: "Solve global water scarcity and reverse climate change"
    }
  ];

  useEffect(() => {
    if (isTimelineAnimating) {
      const interval = setInterval(() => {
        setSelectedPeriod((prev) => (prev + 1) % timeline.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isTimelineAnimating, timeline.length]);

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: "border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20",
      green: "border-green-500/30 bg-green-500/10 hover:bg-green-500/20",
      purple: "border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20",
      orange: "border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20"
    };
    return colors[color] || colors.blue;
  };

  const animateImpactValues = () => {
    const targets = { clean: 100, co2: 50, economy: 10 };
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setImpactValues({
        clean: Math.floor(targets.clean * progress),
        co2: Math.floor(targets.co2 * progress),
        economy: Math.floor(targets.economy * progress)
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-green-400';
      case 'Very High': return 'text-blue-400';
      case 'Revolutionary': return 'text-purple-400';
      case 'Critical': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <section id="future" className="py-20 bg-gradient-to-br from-slate-900 to-purple-900/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Interactive Future Timeline
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore the roadmap to a clean energy future powered by fusion
          </p>
        </div>

        {/* Timeline Controls */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-4 bg-slate-700/50 rounded-full p-2">
            <button
              onClick={() => setIsTimelineAnimating(!isTimelineAnimating)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                isTimelineAnimating 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-slate-600 text-gray-300 hover:bg-slate-500'
              }`}
            >
              {isTimelineAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isTimelineAnimating ? 'Pause' : 'Play'} Timeline
            </button>
            <button
              onClick={() => setSelectedPeriod((prev) => (prev + 1) % timeline.length)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-gray-300 hover:bg-slate-500 rounded-full transition-all duration-300"
            >
              <FastForward className="w-4 h-4" />
              Next Period
            </button>
          </div>
        </div>

        {/* Interactive Timeline */}
        <div className="max-w-6xl mx-auto mb-20">
          {/* Timeline Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-2">
              {timeline.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedPeriod(index);
                    setIsTimelineAnimating(false);
                  }}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    selectedPeriod === index ? 'bg-blue-400 scale-125' : 'bg-slate-500 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Featured Period */}
          <div className={`rounded-2xl p-8 border-2 transition-all duration-500 ${getColorClasses(timeline[selectedPeriod].color)}`}>
            <div className="flex items-center mb-6">
              <div className="p-4 bg-slate-700/50 rounded-xl mr-4 transform hover:rotate-12 transition-transform duration-300">
                {timeline[selectedPeriod].icon}
              </div>
              <div>
                <div className="text-sm text-gray-400 font-medium">{timeline[selectedPeriod].year}</div>
                <div className="text-2xl font-bold text-white">{timeline[selectedPeriod].title}</div>
                <div className="text-sm text-blue-400">
                  Probability: {timeline[selectedPeriod].probability}% | Impact: {timeline[selectedPeriod].impact}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Key Milestones</h4>
                <ul className="space-y-3">
                  {timeline[selectedPeriod].events.map((event, eventIndex) => (
                    <li key={eventIndex} className="text-gray-300 flex items-start gap-3 hover:text-white transition-colors duration-200">
                      <div className="w-2 h-2 bg-current rounded-full mt-2 flex-shrink-0 animate-pulse" />
                      {event}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-slate-800/30 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Success Probability</h4>
                <div className="w-full bg-slate-600 rounded-full h-4 mb-2">
                  <div 
                    className={`h-4 rounded-full transition-all duration-1000 ${
                      timeline[selectedPeriod].color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                      timeline[selectedPeriod].color === 'green' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                      timeline[selectedPeriod].color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                      'bg-gradient-to-r from-orange-500 to-orange-600'
                    }`}
                    style={{ width: `${timeline[selectedPeriod].probability}%` }}
                  />
                </div>
                <div className="text-center text-gray-300 text-sm">
                  {timeline[selectedPeriod].probability}% likelihood based on current progress
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {timeline.map((period, index) => (
              <div
                key={index}
                onClick={() => setSelectedPeriod(index)}
                className={`cursor-pointer rounded-xl p-4 border transition-all duration-300 transform hover:scale-105 ${
                  selectedPeriod === index 
                    ? `${getColorClasses(period.color)} scale-105` 
                    : 'bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50'
                }`}
              >
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-slate-700/50 rounded-lg mr-3">
                    {period.icon}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium">{period.year}</div>
                    <div className="text-sm font-bold text-white">{period.title}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  {period.probability}% probability
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Applications */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Future Applications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {applications.map((app, index) => (
              <div
                key={index}
                onClick={() => setSelectedApplication(selectedApplication === index ? null : index)}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50 hover:border-slate-500/70 transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-slate-700/50 rounded-xl mr-4 transform hover:rotate-12 transition-transform duration-300">
                    {app.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{app.title}</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-blue-400 font-medium">Expected: {app.timeline}</span>
                      <span className={`font-medium ${getImpactColor(app.impact)}`}>
                        Impact: {app.impact}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed mb-3">{app.description}</p>
                
                {selectedApplication === index && (
                  <div className="mt-4 pt-4 border-t border-slate-600/50 animate-fade-in">
                    <p className="text-blue-300 text-sm">{app.details}</p>
                  </div>
                )}
                
                <div className="text-xs text-gray-400 mt-2">
                  Click for more details
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Impact Projection */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-8 border border-blue-500/30 max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Projected Global Impact by 2050</h3>
            <button
              onClick={animateImpactValues}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Animate Impact
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{impactValues.clean}%</div>
              <div className="text-gray-300">Clean electricity generation</div>
              <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                <div 
                  className="h-2 bg-green-400 rounded-full transition-all duration-1000"
                  style={{ width: `${impactValues.clean}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{impactValues.co2}B</div>
              <div className="text-gray-300">Tons CO₂ eliminated annually</div>
              <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                <div 
                  className="h-2 bg-blue-400 rounded-full transition-all duration-1000"
                  style={{ width: `${(impactValues.co2 / 50) * 100}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">${impactValues.economy}T</div>
              <div className="text-gray-300">Global fusion economy</div>
              <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                <div 
                  className="h-2 bg-purple-400 rounded-full transition-all duration-1000"
                  style={{ width: `${(impactValues.economy / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-300 leading-relaxed">
              Fusion energy could provide humanity with clean, abundant power for thousands of years, 
              enabling unprecedented technological advancement while healing our planet's climate.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Future;