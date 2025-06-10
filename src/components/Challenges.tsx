import React, { useState } from 'react';
import { Thermometer, Zap, Settings, DollarSign, Clock, Users, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';

const Challenges = () => {
  const [expandedChallenge, setExpandedChallenge] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showSolutions, setShowSolutions] = useState(false);

  const challenges = [
    {
      icon: <Thermometer className="w-8 h-8 text-red-400" />,
      title: "Extreme Temperatures",
      description: "Achieving and maintaining temperatures of 100+ million°C requires unprecedented engineering solutions",
      progress: "Current: 15 million°C achieved",
      difficulty: "Very High",
      color: "red",
      solutions: [
        "Advanced superconducting magnets",
        "Improved plasma heating systems",
        "Better thermal insulation materials"
      ],
      timeline: "2025-2030",
      impact: "Critical for ignition"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Plasma Control",
      description: "Containing and controlling plasma - the fourth state of matter - using powerful magnetic fields",
      progress: "ITER design: 500 seconds containment",
      difficulty: "High",
      color: "yellow",
      solutions: [
        "AI-powered plasma control systems",
        "Real-time magnetic field adjustment",
        "Advanced plasma diagnostics"
      ],
      timeline: "2025-2035",
      impact: "Essential for sustained fusion"
    },
    {
      icon: <Settings className="w-8 h-8 text-blue-400" />,
      title: "Engineering Complexity",
      description: "Building materials that can withstand neutron bombardment and extreme conditions",
      progress: "New materials in development",
      difficulty: "High",
      color: "blue",
      solutions: [
        "Tungsten-based plasma-facing materials",
        "Self-healing materials research",
        "Advanced composite structures"
      ],
      timeline: "2025-2040",
      impact: "Determines reactor lifetime"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-400" />,
      title: "Economic Viability",
      description: "Making fusion cost-competitive with other energy sources requires massive scale",
      progress: "Cost reduction needed: 90%",
      difficulty: "Medium",
      color: "green",
      solutions: [
        "Mass production of components",
        "Standardized reactor designs",
        "Government incentives and support"
      ],
      timeline: "2030-2050",
      impact: "Determines commercial success"
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-400" />,
      title: "Time to Market",
      description: "Decades of research and development needed before commercial deployment",
      progress: "Commercial target: 2040s",
      difficulty: "Medium",
      color: "purple",
      solutions: [
        "Parallel development programs",
        "Increased funding and resources",
        "International collaboration"
      ],
      timeline: "2025-2050",
      impact: "Affects climate goals"
    },
    {
      icon: <Users className="w-8 h-8 text-cyan-400" />,
      title: "Global Coordination",
      description: "Requires unprecedented international cooperation and knowledge sharing",
      progress: "ITER: 35 nations collaborating",
      difficulty: "Medium",
      color: "cyan",
      solutions: [
        "Enhanced international agreements",
        "Shared research databases",
        "Joint training programs"
      ],
      timeline: "Ongoing",
      impact: "Accelerates development"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Very High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'High': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      red: "border-red-500/30 hover:border-red-500/50",
      yellow: "border-yellow-500/30 hover:border-yellow-500/50",
      blue: "border-blue-500/30 hover:border-blue-500/50",
      green: "border-green-500/30 hover:border-green-500/50",
      purple: "border-purple-500/30 hover:border-purple-500/50",
      cyan: "border-cyan-500/30 hover:border-cyan-500/50"
    };
    return colors[color] || colors.red;
  };

  const filteredChallenges = selectedDifficulty === 'all' 
    ? challenges 
    : challenges.filter(c => c.difficulty === selectedDifficulty);

  const toggleExpanded = (index: number) => {
    setExpandedChallenge(expandedChallenge === index ? null : index);
  };

  return (
    <section id="challenges" className="py-20 bg-gradient-to-br from-slate-900 to-red-900/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Interactive Challenges Explorer
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore the scientific and engineering challenges that must be overcome
          </p>
        </div>

        {/* Interactive Filters */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          <div className="flex gap-2">
            <span className="text-white text-sm">Filter by difficulty:</span>
            {['all', 'Very High', 'High', 'Medium'].map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-3 py-1 rounded-full text-xs transition-all duration-300 ${
                  selectedDifficulty === difficulty
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-600 text-gray-300 hover:bg-slate-500'
                }`}
              >
                {difficulty === 'all' ? 'All' : difficulty}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setShowSolutions(!showSolutions)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
              showSolutions
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-slate-600 text-gray-300 hover:bg-slate-500'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            {showSolutions ? 'Hide Solutions' : 'Show Solutions'}
          </button>
        </div>

        {/* Interactive Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {filteredChallenges.map((challenge, index) => (
            <div
              key={index}
              className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 transform hover:scale-105 cursor-pointer ${getColorClasses(challenge.color)}`}
              onClick={() => toggleExpanded(index)}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-slate-700/50 rounded-xl transform hover:rotate-12 transition-transform duration-300">
                  {challenge.icon}
                </div>
                <h3 className="text-lg font-bold text-white ml-4">{challenge.title}</h3>
                <div className="ml-auto">
                  {expandedChallenge === index ? 
                    <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  }
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-4 text-sm">{challenge.description}</p>
              
              <div className="mb-4">
                <div className="text-xs text-blue-400 font-medium mb-1">Current Status:</div>
                <div className="text-gray-300 text-xs">{challenge.progress}</div>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <div className={`text-xs font-semibold px-3 py-1 rounded-full border ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </div>
                <div className="text-xs text-gray-400">
                  Timeline: {challenge.timeline}
                </div>
              </div>

              {/* Expanded Content */}
              {expandedChallenge === index && (
                <div className="mt-4 pt-4 border-t border-slate-600/50 animate-fade-in">
                  <div className="mb-3">
                    <div className="text-sm font-medium text-white mb-2">Impact:</div>
                    <div className="text-xs text-gray-300">{challenge.impact}</div>
                  </div>
                  
                  {showSolutions && (
                    <div>
                      <div className="text-sm font-medium text-green-400 mb-2">Potential Solutions:</div>
                      <ul className="space-y-1">
                        {challenge.solutions.map((solution, sIndex) => (
                          <li key={sIndex} className="text-xs text-gray-300 flex items-start gap-2">
                            <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Interactive Triple Product Challenge */}
        <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-600/30 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">The Interactive Triple Product Challenge</h3>
          <p className="text-gray-300 text-center mb-8 leading-relaxed">
            For fusion to work, three conditions must be met simultaneously - adjust the sliders to see the challenge
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { name: "Temperature", value: "100+ million°C", detail: "10x hotter than sun's core", color: "red", max: 200 },
              { name: "Density", value: "10²⁰ particles/m³", detail: "1/10,000th air density", color: "blue", max: 100 },
              { name: "Confinement", value: "Several seconds", detail: "Long enough for fusion", color: "purple", max: 600 }
            ].map((param, index) => (
              <div key={index} className="text-center p-6 bg-slate-700/30 rounded-xl">
                <div className={`text-2xl font-bold mb-2 ${
                  param.color === 'red' ? 'text-red-400' :
                  param.color === 'blue' ? 'text-blue-400' : 'text-purple-400'
                }`}>
                  {param.name}
                </div>
                <div className="text-gray-300 mb-2">{param.value}</div>
                <div className="text-sm text-gray-400 mb-4">{param.detail}</div>
                
                {/* Interactive slider */}
                <input
                  type="range"
                  min="0"
                  max={param.max}
                  defaultValue={param.max * 0.7}
                  className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-xs text-gray-400 mt-2">
                  Adjust to see difficulty
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-lg p-4 border border-red-500/30">
              <div className="text-white font-medium mb-2">Challenge Level: EXTREME</div>
              <div className="text-sm text-gray-300">
                All three parameters must be achieved simultaneously for sustained fusion
              </div>
            </div>
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
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ef4444, #8b5cf6);
          cursor: pointer;
        }
      `}</style>
    </section>
  );
};

export default Challenges;