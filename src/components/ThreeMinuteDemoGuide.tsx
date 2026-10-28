import React from 'react';
import { Video, Clock, CheckCircle2, X } from 'lucide-react';

interface ThreeMinuteDemoGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThreeMinuteDemoGuide: React.FC<ThreeMinuteDemoGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const CUES = [
    {
      time: '0:00 – 0:30',
      title: 'Context, Constraints & Campaign Target',
      script: 'Introduce the goal: Acquire 500 final-year engineering students in 7 days with a strict ₹2,000 budget for NxtWave\'s "Build Your First AI Project in 60 Minutes" free workshop. Frame why high unit economics matter and why broad paid ads fail.',
      action: 'Show the Campaign Goal banner and Channel Mix allocation table.',
    },
    {
      time: '0:30 – 1:10',
      title: 'Authentic NxtWave Design & 3D Interactive Story',
      script: 'Highlight the authentic NxtWave brand identity (colors, typography, official CCBP structure). Interact with the Three.js 3D hero nodes (Prompt → Neural Core → Output) and run the 4-step interactive simulated preview.',
      action: 'Click nodes in 3D canvas and trigger "Run Simulated AI Pipeline" on the engineering research track.',
    },
    {
      time: '1:10 – 1:50',
      title: 'Frictionless Registration & Viral Referral Loop',
      script: 'Demonstrate registering a student. Show client-side validation, duplicate email prevention, and the instant generation of unique referral code (e.g. AI60-***). Demonstrate the one-click WhatsApp share link.',
      action: 'Fill sample registration, show confirmation screen, copy personal link, and show WhatsApp share preview.',
    },
    {
      time: '1:50 – 2:25',
      title: 'Campaign Analytics Dashboard & Attribution Audit',
      script: 'Walk through the growth analytics: 194/500 progress, ₹740 spent out of ₹2,000 budget, blended ₹3.81 CPA, 21.6% viral referral participation, and the audit log table with CSV export.',
      action: 'Filter by channel in the dashboard, highlight the Sensitivity Funnel simulator, and click CSV Export.',
    },
    {
      time: '2:25 – 3:00',
      title: 'Strategic Decisions, Rejected AI Ideas & Next Steps',
      script: 'Detail the 3 AI trade-off case studies (rejecting broad paid ads, prioritizing the referral loop over vanity animations, lightweight Three.js vs heavy 3D). Outline what would be built in the next 24 hours (automated WhatsApp webhook reminders & college club leaderboards).',
      action: 'Highlight the AI Learning Notes section and conclude with transparent demo labeling.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
          aria-label="Close guide"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#1565D8] flex items-center justify-center font-bold">
            <Video className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Assessment Presentation Support
            </span>
            <h3 className="text-xl font-extrabold text-[#0A2540]">
              3-Minute Video Demonstration Script
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
          Follow this calibrated timeline during your screen recording to hit every assessment rubric criteria within 180 seconds:
        </p>

        <div className="mt-6 space-y-4">
          {CUES.map((c, i) => (
            <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="px-2 py-0.5 rounded font-bold font-mono bg-blue-100 text-[#1565D8] text-[11px]">
                  {c.time}
                </span>
                <span className="font-bold text-slate-800">{c.title}</span>
              </div>
              <p className="text-slate-700 leading-relaxed font-normal my-1.5">
                <strong>Talking Points:</strong> {c.script}
              </p>
              <div className="p-2 rounded bg-white border border-slate-200 text-[11px] text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span><strong>Visual Action on Screen:</strong> {c.action}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#1565D8] hover:bg-[#0D47A1] transition-all"
          >
            Got it, ready to record!
          </button>
        </div>
      </div>
    </div>
  );
};
