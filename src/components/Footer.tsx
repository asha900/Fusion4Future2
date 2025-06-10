import React from 'react';
import { Zap, ExternalLink, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const resources = [
    { name: "ITER Project", url: "https://www.iter.org", description: "Official ITER website" },
    { name: "MIT Fusion", url: "https://www.psfc.mit.edu", description: "MIT Plasma Science Center" },
    { name: "Fusion Industry", url: "https://www.fusionindustryassociation.org", description: "Industry association" },
    { name: "UKAEA", url: "https://www.gov.uk/government/organisations/uk-atomic-energy-authority", description: "UK Atomic Energy Authority" }
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-700">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-white">Nuclear Fusion</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Exploring the science and promise of fusion energy - humanity's path to clean, abundant power.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Learn More</h3>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    {resource.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </a>
                  <p className="text-sm text-gray-500">{resource.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Connect</h3>
            <div className="space-y-3">
              <a
                href="mailto:info@fusionexplorer.com"
                className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Get in touch
              </a>
              <a
                href="https://github.com/fusion-explorer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                Open source
              </a>
              <a
                href="https://twitter.com/fusionexplorer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <Twitter className="w-4 h-4" />
                Follow updates
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Nuclear Fusion Explorer. Educational content for learning purposes.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Made with ⚡ for the future of clean energy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;