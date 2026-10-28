import React from 'react';
import { Sparkles, ArrowRight, Users, ShieldCheck } from 'lucide-react';

export const FinalCTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0A192F] via-[#0A2540] to-[#0E1E38] text-white relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <span className="nxt-badge bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Final-Year Engineering Opportunity
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Stop Waiting to Start with AI. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-amber-300">
            Build Something Real.
          </span>
        </h2>

        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Take your first step into practical AI with a free, beginner-friendly online workshop designed for engineering students ready to build.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#register"
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-white bg-[#1565D8] hover:bg-blue-600 shadow-glow hover:shadow-nxt-hover transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Register Free</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#register"
            className="w-full sm:w-auto px-6 py-4 rounded-xl font-bold text-sm text-blue-200 bg-white/10 hover:bg-white/15 border border-white/20 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Users className="w-4 h-4 text-teal-400" />
            <span>Invite a Friend</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 pt-6 border-t border-slate-700/60 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Free Online Workshop</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Practical Code You Can Keep</span>
          </div>
        </div>
      </div>
    </section>
  );
};
