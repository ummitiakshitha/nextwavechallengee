import React, { useState } from 'react';
import { Menu, X, BarChart3, Video, Sparkles, ExternalLink } from 'lucide-react';

interface NavbarProps {
  onOpenPitchGuide: () => void;
  activeView: 'campaign' | 'analytics';
  setActiveView: (view: 'campaign' | 'analytics') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPitchGuide,
  activeView,
  setActiveView,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-all">
      {/* Top Banner Notice */}
      <div className="bg-[#0A2540] text-white text-[11px] py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>NxtWave Growth Intern Assessment • Campaign Target: 500 Registrations • Budget: ₹2,000</span>
        <button
          onClick={onOpenPitchGuide}
          className="ml-2 underline text-amber-300 hover:text-white flex items-center gap-1 font-semibold"
        >
          <Video className="w-3 h-3" />
          View 3-Min Demo Script
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* NxtWave Official Logo */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2 group">
              <img
                src="https://d14qv6cm1t62pm.cloudfront.net/ccbp-website/Nxtwave_Colored.svg"
                alt="NxtWave Logo"
                className="h-7 sm:h-8 w-auto object-contain"
                onError={(e) => {
                  // Fallback styled text if network image fails
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                  const fallback = document.getElementById('logo-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div id="logo-fallback" style={{ display: 'none' }} className="items-center gap-1 font-black text-xl text-[#1565D8]">
                <span>NXT</span>
                <span className="text-[#0A2540]">WAVE</span>
              </div>
            </a>
            <span className="hidden sm:inline-block h-4 w-px bg-slate-300 mx-1" />
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#1565D8] border border-blue-200">
              AI 60-Min Initiative
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-700">
            <button
              onClick={() => {
                setActiveView('campaign');
                const el = document.getElementById('workshop');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`hover:text-[#1565D8] transition-colors ${
                activeView === 'campaign' ? 'text-[#1565D8]' : ''
              }`}
            >
              Workshop
            </button>
            <a href="#what-you-build" className="hover:text-[#1565D8] transition-colors">
              What You'll Build
            </a>
            <a href="#interactive-preview" className="hover:text-[#1565D8] transition-colors">
              Interactive 3D Demo
            </a>
            <a href="#strategy" className="hover:text-[#1565D8] transition-colors">
              Growth Plan (500 Goal)
            </a>
            <a href="#faqs" className="hover:text-[#1565D8] transition-colors">
              FAQs
            </a>
          </nav>

          {/* Right CTA Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* View Switcher: Campaign vs Analytics Dashboard */}
            <button
              onClick={() => setActiveView(activeView === 'analytics' ? 'campaign' : 'analytics')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                activeView === 'analytics'
                  ? 'bg-purple-50 text-purple-700 border-purple-300 shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-purple-600" />
              {activeView === 'analytics' ? 'Back to Landing Page' : 'Analytics Dashboard'}
            </button>

            <a
              href="#register"
              onClick={() => setActiveView('campaign')}
              className="nxt-btn-primary text-xs sm:text-sm px-5 py-2.5 font-bold"
            >
              Register Free
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={() => setActiveView(activeView === 'analytics' ? 'campaign' : 'analytics')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{activeView === 'analytics' ? 'Page' : 'Stats'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-200">
          <a
            href="#workshop"
            onClick={() => {
              setActiveView('campaign');
              setMobileMenuOpen(false);
            }}
            className="block py-2 text-sm font-semibold text-slate-800"
          >
            Workshop Overview
          </a>
          <a
            href="#what-you-build"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800"
          >
            What You'll Build
          </a>
          <a
            href="#interactive-preview"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800"
          >
            Interactive 3D Demo
          </a>
          <a
            href="#strategy"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800"
          >
            Growth Plan (500 Target)
          </a>
          <a
            href="#faqs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800"
          >
            FAQs
          </a>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                setActiveView(activeView === 'analytics' ? 'campaign' : 'analytics');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              {activeView === 'analytics' ? 'Switch to Landing Page' : 'Open Analytics Dashboard'}
            </button>

            <button
              onClick={() => {
                onOpenPitchGuide();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center gap-2"
            >
              <Video className="w-4 h-4" />
              Open 3-Min Pitch Guide
            </button>

            <a
              href="#register"
              onClick={() => {
                setActiveView('campaign');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl font-bold text-center text-white bg-[#1565D8] text-xs block"
            >
              Register Free
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
