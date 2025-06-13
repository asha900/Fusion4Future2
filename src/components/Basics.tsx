import React, { useState, useEffect, useRef } from 'react';
import { Atom, Zap, Sun, Flame, ChevronRight, Info } from 'lucide-react';

const Basics = () => {
  const [selectedCard, setSelectedCard] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [hoveredFact, setHoveredFact] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const cards = [
    {
      icon: <Atom className="w-12 h-12 text-blue-400" />,
      title: "What is Nuclear Fusion?",
      description: "Nuclear fusion is the process where two or more light atomic nuclei combine to form a heavier nucleus, releasing tremendous amounts of energy. It's the same process that powers the sun and all stars.",
      color: "blue",
      interactiveElement: "Click to see atomic structure"
    },
    {
      icon: <Sun className="w-12 h-12 text-yellow-400" />,
      title: "Stellar Power",
      description: "Every second, the sun converts 600 million tons of hydrogen into helium through fusion, releasing energy equivalent to billions of nuclear weapons. This process has been sustaining life on Earth for billions of years.",
      color: "yellow",
      interactiveElement: "Hover to see solar facts"
    },
    {
      icon: <Zap className="w-12 h-12 text-purple-400" />,
      title: "Energy Release",
      description: "Fusion releases 3-4 times more energy per unit mass than nuclear fission and millions of times more than chemical reactions. Just one gram of fusion fuel contains as much energy as 11 tons of coal.",
      color: "purple",
      interactiveElement: "Compare energy sources"
    },
    {
      icon: <Flame className="w-12 h-12 text-orange-400" />,
      title: "Extreme Conditions",
      description: "To achieve fusion on Earth, we need temperatures of over 100 million°C and immense pressure. At these conditions, matter exists in a fourth state called plasma, where electrons are stripped from atoms.",
      color: "orange",
      interactiveElement: "Temperature simulator"
    }
  ];

  const facts = [
    { value: "15 million°C", label: "Sun's core temperature", color: "blue" },
    { value: "4.6 billion", label: "Years the sun has been fusing", color: "purple" },
    { value: "E=mc²", label: "Einstein's mass-energy equation", color: "orange" }
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setSelectedCard((prev) => (prev + 1) % cards.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, cards.length]);

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: "border-blue-500/50 bg-blue-500/10 hover:bg-blue-500/20",
      yellow: "border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-500/20",
      purple: "border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20",
      orange: "border-orange-500/50 bg-orange-500/10 hover:bg-orange-500/20"
    };
    return colors[color] || colors.blue;
  };

  return (
    <section 
      id="basics" 
      ref={sectionRef}
      className="py-20 bg-slate-800 relative overflow-hidden"
    >
      {/* Parallax background elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400 parallax-element"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              animationDelay: `${Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-on-scroll animate-fade-in' : 'animate-on-scroll'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Understanding Fusion Basics
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Nuclear fusion is the fundamental force that powers the universe, creating the elements that make up everything around us
          </p>
        </div>

        {/* Interactive Card Selector */}
        <div className={`flex justify-center mb-8 ${isVisible ? 'animate-on-scroll animate-scale-up' : 'animate-on-scroll'}`} style={{ animationDelay: '0.2s' }}>
          <div className="flex gap-2 bg-slate-700/50 rounded-full p-2 backdrop-blur-sm">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedCard(index);
                  setIsAutoPlay(false);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  selectedCard === index ? 'bg-blue-400 scale-125' : 'bg-slate-500 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main Interactive Card Display */}
        <div className={`max-w-4xl mx-auto mb-12 ${isVisible ? 'animate-on-scroll animate-slide-left' : 'animate-on-scroll'}`} style={{ animationDelay: '0.4s' }}>
          <div className={`rounded-2xl p-8 border-2 transition-all duration-500 transform hover:scale-105 ${getColorClasses(cards[selectedCard].color)}`}>
            <div className="flex items-center mb-6">
              <div className="transform hover:rotate-12 transition-transform duration-300">
                {cards[selectedCard].icon}
              </div>
              <h3 className="text-2xl font-bold text-white ml-4">{cards[selectedCard].title}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg mb-4">{cards[selectedCard].description}</p>
            <div className="flex items-center text-blue-400 text-sm cursor-pointer hover:text-blue-300 transition-colors duration-200">
              <Info className="w-4 h-4 mr-2" />
              {cards[selectedCard].interactiveElement}
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>

        {/* Card Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16 ${isVisible ? 'animate-on-scroll animate-slide-right' : 'animate-on-scroll'}`} style={{ animationDelay: '0.6s' }}>
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => setSelectedCard(index)}
              className={`cursor-pointer rounded-2xl p-6 border transition-all duration-300 transform hover:scale-105 ${
                selectedCard === index 
                  ? `${getColorClasses(card.color)} scale-105` 
                  : 'bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="transform hover:rotate-12 transition-transform duration-300">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-white ml-4">{card.title}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

        {/* Interactive Facts Section */}
        <div className={`bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-8 border border-blue-500/30 backdrop-blur-sm ${isVisible ? 'animate-on-scroll animate-fade-in' : 'animate-on-scroll'}`} style={{ animationDelay: '0.8s' }}>
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Key Fusion Facts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {facts.map((fact, index) => (
              <div
                key={index}
                className="text-center cursor-pointer transform transition-all duration-300 hover:scale-110"
                onMouseEnter={() => setHoveredFact(index)}
                onMouseLeave={() => setHoveredFact(null)}
              >
                <div className={`text-3xl font-bold mb-2 transition-all duration-300 ${
                  hoveredFact === index ? 'scale-125' : ''
                } ${
                  fact.color === 'blue' ? 'text-blue-400' :
                  fact.color === 'purple' ? 'text-purple-400' : 'text-orange-400'
                }`}>
                  {fact.value}
                </div>
                <div className="text-gray-300">{fact.label}</div>
                {hoveredFact === index && (
                  <div className="mt-2 text-sm text-blue-300 animate-pulse">
                    Click for more details
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Auto-play toggle */}
        <div className={`flex justify-center mt-8 ${isVisible ? 'animate-on-scroll animate-scale-up' : 'animate-on-scroll'}`} style={{ animationDelay: '1s' }}>
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 transform hover:scale-105 ${
              isAutoPlay 
                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                : 'bg-slate-600 text-gray-300 hover:bg-slate-500'
            }`}
          >
            {isAutoPlay ? 'Pause Auto-play' : 'Resume Auto-play'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Basics;