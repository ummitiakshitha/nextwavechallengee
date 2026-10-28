import React from 'react';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, CheckCircle2, Play, Users } from 'lucide-react';
import { Hero3DScene } from './Hero3DScene';

interface HeroSectionProps {
  onRegisterClick: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRegisterClick,
  onExploreClick,
}) => {
  return (
    <section id="workshop" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-gradient-to-b from-white via-blue-50/20 to-[#F8FAFC]">
      {/* Subtle background ambient mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Column: Copy, Indicators & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-[#1565D8] border border-blue-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#1565D8] animate-pulse" />
              <span>NxtWave Free Practical Workshop</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0A2540] tracking-tight leading-[1.12]">
              Your First AI Project.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1565D8] to-teal-600 block sm:inline">
                Built in 60 Minutes.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
              AI is easier to explore when you build something yourself. Join a free, beginner-friendly online workshop designed for final-year engineering students ready to take their first step into practical AI.
            </p>

            {/* 4 Concise Value Indicators */}
            <div className="grid grid-cols-2 gap-3 pt-2 pb-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>100% Free Online Workshop</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Beginner-Friendly (No AI math)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Hands-on Project Experience</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Built for Final-Year Engineers</span>
              </div>
            </div>

            {/* Workshop Schedule Disclosure (Zero Fake Countdown per instructions) */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Live Workshop Date & Time: <strong>To be announced</strong> (Joining links sent via email)</span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href="#register"
                onClick={onRegisterClick}
                className="nxt-btn-primary text-sm sm:text-base px-8 py-4 font-bold shadow-nxt hover:shadow-nxt-hover flex items-center justify-center gap-2"
              >
                <span>Register Free</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onExploreClick}
                className="nxt-btn-secondary text-sm sm:text-base px-6 py-4 font-bold flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current text-[#1565D8]" />
                <span>Explore the Experience</span>
              </button>
            </div>

            {/* Trust Footer Note */}
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>No credit card needed</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Peer study buddy referral enabled</span>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Interactive 3D AI Project Canvas */}
          <div className="lg:col-span-6 relative">
            <div className="nxt-card p-2 sm:p-3 bg-gradient-to-b from-white to-slate-50/50 border-slate-200/80 shadow-nxt-hover">
              <Hero3DScene onNodeClick={() => {
                const preview = document.getElementById('interactive-preview');
                if (preview) preview.scrollIntoView({ behavior: 'smooth' });
              }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
