import React from 'react';
import { HelpCircle, Check, ArrowRight, BookOpen, Wrench, Layers, Target, Compass } from 'lucide-react';

const CONCERNS = [
  {
    icon: Compass,
    studentDoubt: "I know some programming, but I haven't built an AI project.",
    solution: "We start from square one. If you know basic variables and if/else conditions, we guide you step-by-step through setting up your first model interface.",
    tag: "Zero AI Experience Needed",
  },
  {
    icon: Target,
    studentDoubt: "I want practical experience rather than another long lecture.",
    solution: "Zero boring slides. You open a browser-based notebook and write code within the first 10 minutes, observing real visual outputs immediately.",
    tag: "Hands-on First",
  },
  {
    icon: Wrench,
    studentDoubt: "I am unsure which tools or libraries to use.",
    solution: "We demystify the ecosystem: Python, Hugging Face open weights, and lightweight inference runtimes that run smoothly without paid subscriptions or high-end GPUs.",
    tag: "Free Open-Source Stack",
  },
  {
    icon: Layers,
    studentDoubt: "I want to understand how an AI application comes together.",
    solution: "You will connect frontend inputs, backend processing, prompt engineering, and structured outputs so you understand the whole architecture.",
    tag: "Full-Stack Clarity",
  },
  {
    icon: BookOpen,
    studentDoubt: "I want to explore a project I can continue developing after the workshop.",
    solution: "You will leave with a working GitHub repository template and modular code you can customize for your final-year college project or hackathons.",
    tag: "Extendable Starter Code",
  },
];

export const StudentPersonaSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="nxt-badge bg-blue-50 text-[#1565D8] border border-blue-200 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Designed for Final-Year Engineering Students
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] tracking-tight">
            Designed for Beginners. Built for Action.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Transitioning from campus coursework to building real AI projects can feel overwhelming with all the noise. Here is how this 60-minute workshop directly solves your biggest hurdles:
          </p>
        </div>

        {/* 5 Student Concern Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONCERNS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="nxt-card p-6 flex flex-col justify-between hover:border-blue-300 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-0 opacity-60 group-hover:scale-110 transition-transform" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1565D8] flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    "{item.studentDoubt}"
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.solution}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#1565D8] group-hover:translate-x-1 transition-transform">
                  <span>How we tackle this in 60 mins</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}

          {/* 6th Card: Low-Friction Summary */}
          <div className="nxt-card p-6 bg-gradient-to-br from-[#0A2540] to-[#0E1E38] text-white flex flex-col justify-between border-blue-900 shadow-xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Low-Friction Promise
              </span>
              <h3 className="text-lg font-bold text-white mt-2 mb-3">
                No Hype. Just Your First Practical Step.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We do not promise you will become an AI scientist in 60 minutes or guarantee job placements. What we promise is a clear, friendly, and practical foundation so you can build projects with confidence.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">100% Free • Online</span>
              <a
                href="#register"
                className="px-4 py-2 rounded-lg bg-[#1565D8] hover:bg-blue-600 text-white font-bold text-xs shadow-md transition-all"
              >
                Claim Your Seat
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
