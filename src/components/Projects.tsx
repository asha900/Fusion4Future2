import React, { useState, useEffect } from 'react';
import { Building, Users, Calendar, MapPin, Zap, Target, TrendingUp, Globe, Play, Pause } from 'lucide-react';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [progressAnimation, setProgressAnimation] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  const majorProjects = [
    {
      name: "ITER",
      location: "France",
      status: "Under Construction",
      completion: "2025",
      investment: "$20+ Billion",
      participants: "35 Nations",
      description: "The world's largest fusion experiment, designed to demonstrate the feasibility of fusion power",
      goals: ["Produce 500 MW of power", "Achieve Q=10 (10x energy gain)", "Run for 400-600 seconds"],
      progress: 70,
      color: "blue",
      facts: {
        height: "30 meters",
        weight: "23,000 tons",
        magneticField: "11.8 Tesla",
        plasmaVolume: "840 m³"
      },
      milestones: [
        { year: "2020", event: "Assembly begins", completed: true },
        { year: "2025", event: "First plasma", completed: false },
        { year: "2035", event: "Full deuterium-tritium operation", completed: false }
      ]
    },
    {
      name: "Commonwealth Fusion",
      location: "USA",
      status: "Development",
      completion: "2025",
      investment: "$2+ Billion",
      participants: "Private Company",
      description: "Using high-temperature superconductors to build smaller, more efficient tokamaks",
      goals: ["SPARC reactor by 2025", "Commercial ARC reactor", "Compact design"],
      progress: 60,
      color: "green",
      facts: {
        approach: "High-field tokamak",
        magneticField: "12+ Tesla",
        size: "Compact design",
        timeline: "Accelerated"
      },
      milestones: [
        { year: "2021", event: "Funding secured", completed: true },
        { year: "2025", event: "SPARC first plasma", completed: false },
        { year: "2030", event: "ARC commercial reactor", completed: false }
      ]
    },
    {
      name: "China Fusion Engineering",
      location: "China",
      status: "Active Research",
      completion: "2030",
      investment: "$15+ Billion",
      participants: "Government Led",
      description: "EAST reactor achieving record-breaking plasma containment times",
      goals: ["101 seconds at 120M°C", "Commercial reactor by 2040", "Energy independence"],
      progress: 55,
      color: "purple",
      facts: {
        record: "101 seconds",
        temperature: "120 million°C",
        reactor: "EAST tokamak",
        goal: "Energy independence"
      },
      milestones: [
        { year: "2021", event: "101-second record", completed: true },
        { year: "2025", event: "Sustained operation", completed: false },
        { year: "2040", event: "Commercial deployment", completed: false }
      ]
    }
  ];

  const globalStats = [
    { label: "Total Investment", value: "$50B+", color: "blue", description: "Global funding for fusion research" },
    { label: "Active Projects", value: "50+", color: "green", description: "Fusion projects worldwide" },
    { label: "Countries Involved", value: "30+", color: "purple", description: "Nations investing in fusion" }
  ];

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setSelectedProject((prev) => (prev + 1) % majorProjects.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, majorProjects.length]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Construction': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Development': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Active Research': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: "border-blue-500/50 bg-blue-500/10",
      green: "border-green-500/50 bg-green-500/10",
      purple: "border-purple-500/50 bg-purple-500/10"
    };
    return colors[color] || colors.blue;
  };

  const animateProgress = () => {
    setProgressAnimation(true);
    setTimeout(() => setProgressAnimation(false), 2000);
  };

  return (
    <section id="projects" className="py-20 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Interactive Project Explorer
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore groundbreaking fusion initiatives around the world
          </p>
        </div>

        {/* Project Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-4 bg-slate-700/50 rounded-full p-2">
            {majorProjects.map((project, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedProject(index);
                  setIsAutoPlay(false);
                }}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  selectedProject === index
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-slate-600'
                }`}
              >
                {project.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Project Display */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className={`rounded-2xl p-8 border-2 transition-all duration-500 ${getColorClasses(majorProjects[selectedProject].color)}`}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <h3 className="text-3xl font-bold text-white">{majorProjects[selectedProject].name}</h3>
                  <div className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(majorProjects[selectedProject].status)}`}>
                    {majorProjects[selectedProject].status}
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-6 text-lg">{majorProjects[selectedProject].description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors duration-200">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300 text-sm">{majorProjects[selectedProject].location}</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors duration-200">
                    <Calendar className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300 text-sm">{majorProjects[selectedProject].completion}</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors duration-200">
                    <Building className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300 text-sm">{majorProjects[selectedProject].investment}</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors duration-200">
                    <Users className="w-4 h-4 text-orange-400" />
                    <span className="text-gray-300 text-sm">{majorProjects[selectedProject].participants}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-yellow-400" />
                    Key Goals
                  </h4>
                  <ul className="space-y-2">
                    {majorProjects[selectedProject].goals.map((goal, goalIndex) => (
                      <li key={goalIndex} className="text-gray-300 flex items-center gap-2 hover:text-white transition-colors duration-200">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Project Timeline</h4>
                  <div className="space-y-2">
                    {majorProjects[selectedProject].milestones.map((milestone, mIndex) => (
                      <div key={mIndex} className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                        milestone.completed ? 'bg-green-500/10' : 'bg-slate-700/30'
                      }`}>
                        <div className={`w-3 h-3 rounded-full ${
                          milestone.completed ? 'bg-green-400' : 'bg-gray-400'
                        }`} />
                        <span className="text-sm text-white font-medium">{milestone.year}</span>
                        <span className="text-sm text-gray-300">{milestone.event}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Interactive Progress */}
                <div className="bg-slate-800/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white font-semibold">Progress</span>
                    <button
                      onClick={animateProgress}
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                    >
                      <TrendingUp className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-400 font-bold text-lg">{majorProjects[selectedProject].progress}%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-4 rounded-full transition-all duration-2000 ${
                        progressAnimation ? 'animate-pulse' : ''
                      } ${
                        majorProjects[selectedProject].color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                        majorProjects[selectedProject].color === 'green' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                        'bg-gradient-to-r from-purple-500 to-purple-600'
                      }`}
                      style={{ width: `${majorProjects[selectedProject].progress}%` }}
                    />
                  </div>
                </div>
                
                {/* Project Facts */}
                <div className="bg-slate-800/50 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-semibold">Key Facts</span>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(majorProjects[selectedProject].facts).map(([key, value], index) => (
                      <div key={index} className="flex justify-between items-center text-sm hover:bg-slate-700/30 p-2 rounded transition-colors duration-200">
                        <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="text-gray-300 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Auto-play Control */}
        <div className="flex justify-center mb-16">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
              isAutoPlay 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-slate-600 text-gray-300 hover:bg-slate-500'
            }`}
          >
            {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isAutoPlay ? 'Pause Auto-play' : 'Resume Auto-play'}
          </button>
        </div>

        {/* Interactive Global Stats */}
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-8 border border-green-500/30 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
            <Globe className="w-6 h-6" />
            Global Fusion Investment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {globalStats.map((stat, index) => (
              <div
                key={index}
                className="text-center cursor-pointer transform transition-all duration-300 hover:scale-110"
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div className={`text-3xl font-bold mb-2 transition-all duration-300 ${
                  hoveredStat === index ? 'scale-125' : ''
                } ${
                  stat.color === 'blue' ? 'text-blue-400' :
                  stat.color === 'green' ? 'text-green-400' : 'text-purple-400'
                }`}>
                  {stat.value}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
                {hoveredStat === index && (
                  <div className="mt-2 text-sm text-blue-300 animate-fade-in">
                    {stat.description}
                  </div>
                )}
              </div>
            ))}
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

export default Projects;