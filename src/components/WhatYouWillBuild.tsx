import React, { useState } from 'react';
import { Lightbulb, GitBranch, CheckCircle2, ArrowRight, Code2, Sparkles, HelpCircle } from 'lucide-react';

const STAGES = [
  {
    step: '01',
    title: 'Understand the Idea',
    headline: 'Define the Problem & Role of AI',
    description: 'Deconstruct a real engineering challenge: why does traditional rule-based coding fall short, and where does machine learning or language models provide the breakthrough?',
    details: [
      'Problem scoping: Structuring unstructured student inputs',
      'Prompt mechanics: System instructions vs user queries',
      'Accuracy vs hallucination boundaries',
    ],
    badgeColor: 'bg-blue-100 text-[#1565D8]',
    borderActive: 'border-[#1565D8]',
  },
  {
    step: '02',
    title: 'Explore the Workflow',
    headline: 'Hands-on Tools & Pipeline Setup',
    description: 'Follow an interactive step-by-step implementation. Connect open-source Python packages, token embeddings, and model API endpoints using beginner-friendly tools.',
    details: [
      'Environment setup in Google Colab / local Jupyter',
      'Free Hugging Face & open model inference',
      'Handling JSON responses and error edge cases',
    ],
    badgeColor: 'bg-teal-100 text-[#00B290]',
    borderActive: 'border-[#00B290]',
  },
  {
    step: '03',
    title: 'Test the Result',
    headline: 'Observe Output & Iterate Further',
    description: 'Launch your mini web app interface. Test with diverse inputs, observe latency and output nuances, and discover how to customize it for your college resume or project.',
    details: [
      'Interactive testing with edge-case prompts',
      'Connecting a clean web UI (Gradio / Streamlit)',
      'Git repository export for continued development',
    ],
    badgeColor: 'bg-amber-100 text-amber-700',
    borderActive: 'border-amber-500',
  },
];

export const WhatYouWillBuild: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="what-you-build" className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="nxt-badge bg-blue-100 text-[#1565D8] mb-3">
            <GitBranch className="w-3.5 h-3.5" />
            3-Stage Learning Progression
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] tracking-tight">
            The 60-Minute Workshop Journey
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Move step-by-step from raw curiosity to an interactive, tangible application running live in your browser.
          </p>
          <div className="mt-2 text-xs text-slate-500 italic">
            *Note: Exact project repository and tools will be confirmed during the workshop kickoff.
          </div>
        </div>

        {/* 3 Step Connected Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STAGES.map((s, idx) => (
            <div
              key={idx}
              onClick={() => setActiveStage(idx)}
              className={`nxt-card p-6 cursor-pointer relative transition-all duration-300 ${
                activeStage === idx
                  ? `border-2 ${s.borderActive} shadow-nxt-hover ring-4 ring-blue-50/60`
                  : 'hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-slate-300">
                  {s.step}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${s.badgeColor}`}>
                  {s.title}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {s.headline}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {s.description}
              </p>

              {/* Sub bullets */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                {s.details.map((d, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Visual Workflow Flowchart Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#1565D8] flex items-center justify-center font-bold flex-shrink-0">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">
                Open-Source & Free-Tier First Architecture
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                All components are designed to run in free environments (Google Colab, HuggingFace Inference API, Streamlit Cloud).
              </p>
            </div>
          </div>

          <a
            href="#register"
            className="nxt-btn-primary text-xs sm:text-sm px-6 py-3 whitespace-nowrap"
          >
            Register for Free Seat
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
