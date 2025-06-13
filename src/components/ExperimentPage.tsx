import React, { useState } from 'react';
import { ArrowLeft, Play, Pause, BarChart3, Zap, Thermometer, Timer, Star } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ExperimentPageProps {
  onNavigateBack: () => void;
}

const ExperimentPage: React.FC<ExperimentPageProps> = ({ onNavigateBack }) => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('objective');
  const [isSimulatorLoaded, setIsSimulatorLoaded] = useState(false);

  const tabs = [
    { id: 'objective', name: 'Objective', icon: <Star className="w-4 h-4" /> },
    { id: 'methodology', name: 'Methodology', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'results', name: 'Results', icon: <Zap className="w-4 h-4" /> },
    { id: 'simulator', name: 'Live Simulator', icon: <Play className="w-4 h-4" /> }
  ];

  const testResults = [
    { trial: 1, electrode: 'Copper wire (control)', voltage: '10 kV', lifetime: '0.2 sec', stability: 2 },
    { trial: 2, electrode: 'Graphite rods', voltage: '~8 kV', lifetime: '~0.5 sec', stability: 4 },
    { trial: 3, electrode: 'Perforated graphite', voltage: '~6 kV', lifetime: '~1.2 sec', stability: 5 }
  ];

  const materials = [
    { item: 'Piezoelectric igniter', purpose: 'High-voltage pulse source' },
    { item: 'Graphite rods (pencil leads)', purpose: 'Low-cost carbon electrodes' },
    { item: 'Copper wire', purpose: 'Baseline metal electrodes' },
    { item: 'Glass jar + saltwater', purpose: 'Conductive plasma medium' },
    { item: 'Neodymium magnets', purpose: 'Plasma confinement' },
    { item: 'Multimeter', purpose: 'Measure voltage and current' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'objective':
        return (
          <div className="space-y-8">
            <div className={`p-8 rounded-2xl border ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-600/50' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Objective
              </h3>
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                To test whether carbon-based electrodes or pulsed-voltage systems generate plasma more efficiently than traditional metal electrodes under equivalent conditions.
              </p>
            </div>

            <div className={`p-8 rounded-2xl border ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-600/50' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Hypothesis
              </h3>
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Perforated graphite electrodes will sustain plasma at lower voltage and for longer durations than copper electrodes by trapping ions and reducing energy loss, improving overall plasma stability and energy efficiency.
              </p>
            </div>

            <div className={`p-8 rounded-2xl border ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30' 
                : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Why This Matters
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6 text-blue-400" />
                    <span className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Lower Energy Requirements
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Timer className="w-6 h-6 text-green-400" />
                    <span className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Longer Plasma Duration
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Thermometer className="w-6 h-6 text-orange-400" />
                    <span className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Better Stability
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-6 h-6 text-purple-400" />
                    <span className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Cost-Effective Solution
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'methodology':
        return (
          <div className="space-y-8">
            <div className={`p-8 rounded-2xl border ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-600/50' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Materials
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {materials.map((material, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-slate-700/30 border-slate-600/30' 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className={`font-medium mb-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {material.item}
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {material.purpose}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-8 rounded-2xl border ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-600/50' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Procedure
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className={`text-lg font-semibold mb-3 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    1. Build 3 Electrode Types
                  </h4>
                  <ul className={`space-y-2 ml-4 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <li>• Control: Copper wire coils</li>
                    <li>• Test 1: Sharpened graphite rods</li>
                    <li>• Test 2: Perforated graphite rods (holes drilled to trap plasma)</li>
                  </ul>
                </div>

                <div>
                  <h4 className={`text-lg font-semibold mb-3 ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`}>
                    2. Generate Plasma
                  </h4>
                  <ul className={`space-y-2 ml-4 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <li>• Submerge each electrode pair in a saltwater-filled glass jar</li>
                    <li>• Connect to piezoelectric igniter</li>
                    <li>• Pulse (click) 10 times per trial</li>
                  </ul>
                </div>

                <div>
                  <h4 className={`text-lg font-semibold mb-3 ${
                    isDarkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}>
                    3. Measure Performance
                  </h4>
                  <ul className={`space-y-2 ml-4 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <li>• Voltage Required: Use multimeter to measure voltage at plasma ignition</li>
                    <li>• Plasma Lifetime: Time visible glow using stopwatch or phone</li>
                    <li>• Stability: Observe flicker or scatter; rate 1–5 (5 = highly stable)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'results':
        return (
          <div className="space-y-8">
            <div className={`p-8 rounded-2xl border ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-600/50' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Test Results
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b ${
                      isDarkMode ? 'border-slate-600' : 'border-gray-200'
                    }`}>
                      <th className={`text-left py-3 px-4 font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Trial
                      </th>
                      <th className={`text-left py-3 px-4 font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Electrode Type
                      </th>
                      <th className={`text-left py-3 px-4 font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Voltage Required
                      </th>
                      <th className={`text-left py-3 px-4 font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Plasma Lifetime
                      </th>
                      <th className={`text-left py-3 px-4 font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        Stability (1-5)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {testResults.map((result, index) => (
                      <tr key={index} className={`border-b ${
                        isDarkMode ? 'border-slate-700' : 'border-gray-100'
                      }`}>
                        <td className={`py-3 px-4 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {result.trial}
                        </td>
                        <td className={`py-3 px-4 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {result.electrode}
                        </td>
                        <td className={`py-3 px-4 ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          {result.voltage}
                        </td>
                        <td className={`py-3 px-4 ${
                          isDarkMode ? 'text-green-400' : 'text-green-600'
                        }`}>
                          {result.lifetime}
                        </td>
                        <td className={`py-3 px-4 ${
                          isDarkMode ? 'text-purple-400' : 'text-purple-600'
                        }`}>
                          {result.stability}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={`p-8 rounded-2xl border ${
              isDarkMode 
                ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30' 
                : 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Key Findings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-slate-700/30' : 'bg-white/50'
                  }`}>
                    <div className="text-2xl font-bold text-green-400 mb-2">40%</div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Voltage reduction with graphite
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-slate-700/30' : 'bg-white/50'
                  }`}>
                    <div className="text-2xl font-bold text-blue-400 mb-2">6x</div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Longer plasma duration
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-slate-700/30' : 'bg-white/50'
                  }`}>
                    <div className="text-2xl font-bold text-purple-400 mb-2">2.5x</div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Better stability rating
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-slate-700/30' : 'bg-white/50'
                  }`}>
                    <div className="text-2xl font-bold text-orange-400 mb-2">$0.10</div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Cost per electrode vs $20B ITER
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'simulator':
        return (
          <div className="space-y-8">
            <div className={`p-8 rounded-2xl border ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-600/50' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-2xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Interactive Fusion Simulator
              </h3>
              <p className={`text-lg mb-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Explore nuclear fusion physics with this interactive simulation. Adjust parameters and observe how they affect the fusion process.
              </p>
              
              <div className="relative w-full h-[600px] rounded-xl overflow-hidden border border-slate-600/50">
                {!isSimulatorLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                      <p className="text-white">Loading Fusion Simulator...</p>
                    </div>
                  </div>
                )}
                <iframe
                  src="https://visualize-it.github.io/nuclear_fusion/simulation.html"
                  className="w-full h-full"
                  title="Nuclear Fusion Simulator"
                  onLoad={() => setIsSimulatorLoaded(true)}
                  style={{ border: 'none' }}
                />
              </div>
              
              <div className={`mt-6 p-4 rounded-lg ${
                isDarkMode ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'
              }`}>
                <p className={`text-sm ${
                  isDarkMode ? 'text-blue-300' : 'text-blue-700'
                }`}>
                  <strong>Tip:</strong> Use the controls in the simulator to adjust temperature, pressure, and magnetic field strength. 
                  Observe how these parameters affect plasma formation and stability.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isDarkMode 
          ? 'bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50' 
          : 'bg-white/95 backdrop-blur-sm border-b border-gray-200/50'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onNavigateBack}
              className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-slate-800 text-white hover:bg-slate-700' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Main
            </button>
            
            <h1 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Fusion Plasma Experiment
            </h1>
            
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-12">
          <div className={`flex gap-2 p-2 rounded-full ${
            isDarkMode ? 'bg-slate-800/50' : 'bg-white/50'
          } backdrop-blur-sm border ${
            isDarkMode ? 'border-slate-600/50' : 'border-gray-200/50'
          }`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : isDarkMode
                      ? 'text-gray-300 hover:text-white hover:bg-slate-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ExperimentPage;