import React from 'react';
import { Zap, ExternalLink, Github, Twitter, Mail } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();
  
  const resources = [
    { name: "ITER Project", url: "https://www.iter.org", description: "Official ITER website" },
    { name: "MIT Fusion", url: "https://www.psfc.mit.edu", description: "MIT Plasma Science Center" },
    { name: "Fusion Industry", url: "https://www.fusionindustryassociation.org", description: "Industry association" },
    { name: "UKAEA", url: "https://www.gov.uk/government/organisations/uk-atomic-energy-authority", description: "UK Atomic Energy Authority" }
  ];

  const teamMembers = [
    { name: "Jin-Zhao Teh", email: "tehj8036@mhjc.school.nz" },
    { name: "Lucas Wong", email: "wongl8934@mhjc.school.nz" },
    { name: "Ayaan Shah", email: "shaha9233@mhjc.school.nz" }
  ];

  return (
    <footer className={`border-t transition-all duration-500 ${
      isDarkMode 
        ? 'bg-slate-900 border-slate-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
              }`}>
                <Zap className={`w-8 h-8 transition-colors duration-300 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
              </div>
              <div>
                <span className={`text-xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Fusion 4 Future
                </span>
                <div className={`text-xs transition-colors duration-300 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  Interactive Nuclear Fusion Explorer
                </div>
              </div>
            </div>
            <p className={`leading-relaxed transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Exploring the science and promise of fusion energy - humanity's path to clean, abundant power.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className={`text-lg font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Learn More
            </h3>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-all duration-300 flex items-center gap-2 group hover:scale-105 ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-white' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {resource.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </a>
                  <p className={`text-sm transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    {resource.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Team Members */}
          <div>
            <h3 className={`text-lg font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Development Team
            </h3>
            <div className="space-y-3">
              {teamMembers.map((member, index) => (
                <div key={index} className="group">
                  <div className={`font-medium transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {member.name}
                  </div>
                  <a
                    href={`mailto:${member.email}`}
                    className={`text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 ${
                      isDarkMode 
                        ? 'text-blue-400 hover:text-blue-300' 
                        : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    <Mail className="w-3 h-3" />
                    {member.email}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Connect & Simulation */}
          <div>
            <h3 className={`text-lg font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Connect & Explore
            </h3>
            <div className="space-y-3">
              <a
                href="https://visualize-it.github.io/nuclear_fusion/simulation.html"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all duration-300 flex items-center gap-2 hover:scale-105 p-3 rounded-lg border ${
                  isDarkMode 
                    ? 'text-purple-400 hover:text-purple-300 border-purple-500/30 hover:bg-purple-500/10' 
                    : 'text-purple-600 hover:text-purple-700 border-purple-300 hover:bg-purple-50'
                }`}
              >
                <ExternalLink className="w-4 h-4" />
                Interactive Fusion Simulation
              </a>
              <a
                href="https://github.com/fusion-explorer"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all duration-300 flex items-center gap-2 hover:scale-105 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Github className="w-4 h-4" />
                Open source
              </a>
              <a
                href="https://twitter.com/fusionexplorer"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all duration-300 flex items-center gap-2 hover:scale-105 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Twitter className="w-4 h-4" />
                Follow updates
              </a>
            </div>
          </div>
        </div>

        <div className={`border-t mt-8 pt-8 transition-colors duration-300 ${
          isDarkMode ? 'border-slate-700' : 'border-gray-200'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              © 2025 Fusion 4 Future. Educational content for learning purposes.
            </p>
            <p className={`text-sm mt-2 md:mt-0 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Made with ⚡ for the future of clean energy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;