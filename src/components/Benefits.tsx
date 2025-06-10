import React, { useState, useEffect } from 'react';
import { Leaf, Shield, Infinity, Zap, Globe, Recycle, TrendingUp, BarChart3 } from 'lucide-react';

const Benefits = () => {
  const [selectedBenefit, setSelectedBenefit] = useState(0);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    coal: 0,
    gas: 0,
    fission: 0,
    fusion: 0
  });

  const benefits = [
    {
      icon: <Leaf className="w-8 h-8 text-green-400" />,
      title: "Clean Energy",
      description: "No greenhouse gases, no long-lived radioactive waste, and no risk of meltdown",
      stats: "Zero CO₂ emissions",
      color: "green",
      details: "Fusion produces only helium as a byproduct, which is completely harmless and useful for many applications."
    },
    {
      icon: <Infinity className="w-8 h-8 text-blue-400" />,
      title: "Abundant Fuel",
      description: "Hydrogen from seawater could power civilization for millions of years",
      stats: "Virtually limitless fuel",
      color: "blue",
      details: "Just one liter of seawater contains enough hydrogen to produce as much energy as 300 liters of gasoline."
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-400" />,
      title: "Inherently Safe",
      description: "Fusion reactions stop immediately if conditions aren't perfect - no chain reactions",
      stats: "No meltdown risk",
      color: "purple",
      details: "Unlike fission, fusion cannot run away or cause catastrophic accidents. It simply stops if anything goes wrong."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "High Energy Density",
      description: "One fusion plant could power entire cities with minimal fuel requirements",
      stats: "4x more energy than fission",
      color: "yellow",
      details: "A single fusion power plant could generate 1000+ MW of electricity continuously for decades."
    },
    {
      icon: <Globe className="w-8 h-8 text-cyan-400" />,
      title: "Global Accessibility",
      description: "Fusion fuel is available everywhere, reducing energy geopolitics",
      stats: "Available worldwide",
      color: "cyan",
      details: "Every country has access to seawater or can produce the necessary fuel, eliminating energy dependence."
    },
    {
      icon: <Recycle className="w-8 h-8 text-orange-400" />,
      title: "Minimal Waste",
      description: "Primary byproduct is helium - useful for many applications",
      stats: "Useful byproducts",
      color: "orange",
      details: "Helium is valuable for medical imaging, scientific research, and industrial applications."
    }
  ];

  const emissionData = [
    { name: "Coal", value: 820, color: "red", targetValue: 820 },
    { name: "Natural Gas", value: 490, color: "orange", targetValue: 490 },
    { name: "Nuclear Fission", value: 12, color: "blue", targetValue: 12 },
    { name: "Nuclear Fusion", value: 0, color: "green", targetValue: 0 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedBenefit((prev) => (prev + 1) % benefits.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [benefits.length]);

  useEffect(() => {
    if (comparisonMode) {
      const animateValues = () => {
        emissionData.forEach((item, index) => {
          setTimeout(() => {
            const startTime = Date.now();
            const duration = 1500;
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const currentValue = Math.floor(item.targetValue * progress);
              
              setAnimatedValues(prev => ({
                ...prev,
                [item.name.toLowerCase().replace(' ', '')]: currentValue
              }));
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            animate();
          }, index * 300);
        });
      };
      animateValues();
    }
  }, [comparisonMode]);

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      green: "border-green-500/50 bg-green-500/10 hover:bg-green-500/20",
      blue: "border-blue-500/50 bg-blue-500/10 hover:bg-blue-500/20",
      purple: "border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20",
      yellow: "border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-500/20",
      cyan: "border-cyan-500/50 bg-cyan-500/10 hover:bg-cyan-500/20",
      orange: "border-orange-500/50 bg-orange-500/10 hover:bg-orange-500/20"
    };
    return colors[color] || colors.green;
  };

  return (
    <section id="benefits" className="py-20 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Interactive Benefits Explorer
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover how fusion energy will transform our world
          </p>
        </div>

        {/* Interactive Benefit Showcase */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className={`rounded-2xl p-8 border-2 transition-all duration-500 ${getColorClasses(benefits[selectedBenefit].color)}`}>
            <div className="flex items-center mb-6">
              <div className="p-4 bg-slate-700/50 rounded-xl transform hover:rotate-12 transition-transform duration-300">
                {benefits[selectedBenefit].icon}
              </div>
              <div className="ml-6">
                <h3 className="text-2xl font-bold text-white mb-2">{benefits[selectedBenefit].title}</h3>
                <div className="text-sm font-semibold text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full inline-block">
                  {benefits[selectedBenefit].stats}
                </div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg mb-4">{benefits[selectedBenefit].description}</p>
            <p className="text-blue-300 text-sm">{benefits[selectedBenefit].details}</p>
          </div>
          
          {/* Benefit Selector */}
          <div className="flex justify-center mt-6 gap-2">
            {benefits.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedBenefit(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  selectedBenefit === index ? 'bg-blue-400 scale-125' : 'bg-slate-500 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Interactive Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              onClick={() => setSelectedBenefit(index)}
              className={`group cursor-pointer rounded-2xl p-6 border transition-all duration-300 transform hover:scale-105 ${
                selectedBenefit === index 
                  ? `${getColorClasses(benefit.color)} scale-105` 
                  : 'bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-slate-600/50 rounded-xl group-hover:bg-slate-600/70 transition-all duration-300 transform group-hover:rotate-6">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-white ml-4">{benefit.title}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4 text-sm">{benefit.description}</p>
              <div className="text-xs font-semibold text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full inline-block">
                {benefit.stats}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Emissions Comparison */}
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-8 border border-green-500/30 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-white">Environmental Impact Comparison</h3>
            <button
              onClick={() => setComparisonMode(!comparisonMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                comparisonMode 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-slate-600 text-gray-300 hover:bg-slate-500'
              }`}
            >
              {comparisonMode ? <BarChart3 className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
              {comparisonMode ? 'Animated View' : 'Start Animation'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {emissionData.map((item, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold mb-2 transition-all duration-500 ${
                  item.color === 'red' ? 'text-red-400' :
                  item.color === 'orange' ? 'text-orange-400' :
                  item.color === 'blue' ? 'text-blue-400' : 'text-green-400'
                }`}>
                  {item.name}
                </div>
                
                {/* Animated bar chart */}
                <div className="h-32 flex items-end justify-center mb-2">
                  <div 
                    className={`w-12 transition-all duration-1000 rounded-t-lg ${
                      item.color === 'red' ? 'bg-red-400' :
                      item.color === 'orange' ? 'bg-orange-400' :
                      item.color === 'blue' ? 'bg-blue-400' : 'bg-green-400'
                    }`}
                    style={{ 
                      height: comparisonMode 
                        ? `${(animatedValues[item.name.toLowerCase().replace(' ', '') as keyof typeof animatedValues] / 820) * 100}%`
                        : `${(item.value / 820) * 100}%`
                    }}
                  />
                </div>
                
                <div className="text-gray-300 mb-2">
                  {comparisonMode 
                    ? animatedValues[item.name.toLowerCase().replace(' ', '') as keyof typeof animatedValues]
                    : item.value}g CO₂/kWh
                </div>
                
                {comparisonMode && item.value === 0 && (
                  <div className="text-green-400 text-xs animate-pulse">
                    🌱 Zero Emissions!
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center text-gray-300">
            <p className="text-sm">
              Fusion energy produces zero direct emissions, making it the cleanest energy source possible
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;