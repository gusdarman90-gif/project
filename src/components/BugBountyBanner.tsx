import React, { useState, useEffect } from 'react';
import { Shield, Bug, DollarSign, ChevronRight, X } from 'lucide-react';
import { ThemeClasses } from '../types';

interface BugBountyBannerProps {
  darkMode: boolean;
  themeClasses: ThemeClasses;
}

const BugBountyBanner: React.FC<BugBountyBannerProps> = ({ darkMode, themeClasses }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Bug,
      text: "🐛 Bug Bounty Program: Earn up to $50,000 for critical vulnerabilities",
      cta: "Report Now"
    },
    {
      icon: Shield,
      text: "🛡️ Help secure our platform - Rewards from $100 to $50,000",
      cta: "Learn More"
    },
    {
      icon: DollarSign,
      text: "💰 Found a security issue? Get rewarded instantly - bounty@securep2p.pro",
      cta: "Submit Report"
    }
  ];

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isVisible, slides.length]);

  const handleBountyClick = () => {
    window.open('mailto:bounty@securep2p.pro?subject=Security Vulnerability Report', '_blank');
  };

  if (!isVisible) return null;

  const currentSlideData = slides[currentSlide];
  const IconComponent = currentSlideData.icon;

  return (
    <div className={`relative overflow-hidden ${darkMode ? 'bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-800/30' : 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200'} border-b backdrop-blur-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className={`w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0`}>
              <IconComponent className="w-4 h-4 text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${darkMode ? 'text-orange-300' : 'text-orange-800'} truncate`}>
                {currentSlideData.text}
              </p>
            </div>
            
            <button
              onClick={handleBountyClick}
              className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                darkMode 
                  ? 'bg-orange-800/50 text-orange-300 hover:bg-orange-700/50' 
                  : 'bg-orange-200 text-orange-800 hover:bg-orange-300'
              } flex-shrink-0`}
            >
              <span>{currentSlideData.cta}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className={`ml-3 p-1 rounded-full ${themeClasses.hover} transition-colors flex-shrink-0`}
          >
            <X className={`w-4 h-4 ${themeClasses.textSecondary}`} />
          </button>
        </div>
      </div>
      
      {/* Slide indicators */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1 pb-1">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-1 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-orange-500'
                : darkMode ? 'bg-orange-800' : 'bg-orange-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BugBountyBanner;