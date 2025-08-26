import React, { useState, useEffect } from 'react';
import { Wallet, Menu, X, Sun, Moon, Shield, Bug, ExternalLink, AlertTriangle } from 'lucide-react';
import { ThemeClasses } from '../types';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  walletConnected: boolean;
  walletAddress: string;
  showWalletAnimation: boolean;
  themeClasses: ThemeClasses;
  isMobile: boolean;
}

const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  walletConnected,
  walletAddress,
  showWalletAnimation,
  themeClasses,
  isMobile
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentBountyIndex, setCurrentBountyIndex] = useState(0);

  // Bug bounty announcements that slide
  const bountyAnnouncements = [
    "🐛 Bug Bounty: Up to $50,000 for critical vulnerabilities!",
    "🔒 Security Researchers: Earn $25,000 for high-risk findings!",
    "⚡ Find bugs, get rewarded: $1,000-$50,000 bounties available!",
    "🛡️ Help secure our platform: Report to bounty@securep2p.pro"
  ];

  // Auto-rotate bounty announcements
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBountyIndex((prev) => (prev + 1) % bountyAnnouncements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bountyAnnouncements.length]);

  return (
    <>
      {/* Bug Bounty Sliding Banner */}
      <div className={`${darkMode ? 'bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-800/30' : 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200'} border-b backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-2">
          <div className="flex items-center justify-center space-x-2 text-sm">
            <Bug className={`w-4 h-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'} animate-pulse`} />
            <div className="overflow-hidden">
              <div 
                className={`transition-transform duration-500 ${darkMode ? 'text-orange-300' : 'text-orange-800'} font-medium whitespace-nowrap`}
                style={{ transform: `translateY(-${currentBountyIndex * 100}%)` }}
              >
                {bountyAnnouncements.map((announcement, index) => (
                  <div key={index} className="h-6 flex items-center">
                    {announcement}
                  </div>
                ))}
              </div>
            </div>
            <a 
              href="mailto:bounty@securep2p.pro"
              className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-orange-800/50 text-orange-300 hover:bg-orange-700/50' : 'bg-orange-200 text-orange-800 hover:bg-orange-300'} transition-colors duration-200 whitespace-nowrap`}
            >
              Report Bug
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`${themeClasses.cardBg}/95 backdrop-blur-xl border-b ${themeClasses.border} sticky top-0 z-50 shadow-lg`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${themeClasses.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl`}>
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-lg sm:text-xl font-bold ${themeClasses.text}`}>
                  Securep2p.pro
                </h1>
                <div className={`text-xs ${themeClasses.textSecondary} hidden sm:block`}>
                  Secure • Fast • Trusted
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Wallet Status */}
              {walletConnected && (
                <div className={`flex items-center space-x-3 ${themeClasses.cardBg} border ${themeClasses.border} rounded-xl px-4 py-2 shadow-lg ${
                  showWalletAnimation ? 'animate-pulse ring-4 ring-green-300 ring-opacity-50' : ''
                }`}>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <Wallet className={`w-4 h-4 ${themeClasses.text}`} />
                  <span className={`text-sm font-medium ${themeClasses.text}`}>
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </span>
                </div>
              )}

              {/* Language Selector */}
              <LanguageSelector darkMode={darkMode} themeClasses={themeClasses} />

              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-3 rounded-xl ${themeClasses.hover} transition-all duration-200 border ${themeClasses.border} ${themeClasses.cardBg} shadow-sm hover:shadow-md`}
              >
                {darkMode ? (
                  <Sun className={`w-5 h-5 ${themeClasses.text}`} />
                ) : (
                  <Moon className={`w-5 h-5 ${themeClasses.text}`} />
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              {/* Mobile Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${themeClasses.hover} transition-all duration-200`}
              >
                {darkMode ? (
                  <Sun className={`w-5 h-5 ${themeClasses.text}`} />
                ) : (
                  <Moon className={`w-5 h-5 ${themeClasses.text}`} />
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg ${themeClasses.hover} transition-all duration-200`}
              >
                {isMenuOpen ? (
                  <X className={`w-6 h-6 ${themeClasses.text}`} />
                ) : (
                  <Menu className={`w-6 h-6 ${themeClasses.text}`} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={`lg:hidden border-t ${themeClasses.border} py-4 space-y-4`}>
              {/* Mobile Wallet Status */}
              {walletConnected && (
                <div className={`flex items-center space-x-3 ${themeClasses.cardBg} border ${themeClasses.border} rounded-xl px-4 py-3 shadow-lg ${
                  showWalletAnimation ? 'animate-pulse ring-4 ring-green-300 ring-opacity-50' : ''
                }`}>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <Wallet className={`w-4 h-4 ${themeClasses.text}`} />
                  <span className={`text-sm font-medium ${themeClasses.text}`}>
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </span>
                </div>
              )}

              {/* Mobile Language Selector */}
              <LanguageSelector darkMode={darkMode} themeClasses={themeClasses} />
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;