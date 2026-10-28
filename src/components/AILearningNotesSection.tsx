import React, { useState } from 'react';
import {
  Brain,
  Sparkles,
  GitPullRequest,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FlaskConical
} from 'lucide-react';
import { INITIAL_AI_NOTES, INITIAL_EXPERIMENTS } from '../services/storage';

export const AILearningNotesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ai-notes' | 'experiments'>('ai-notes');
  const [expandedId, setExpandedId] = useState<string | null>('ai_note_1');

  return (
    <section id="ai-notes" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="nxt-badge bg-purple-100 text-purple-700 mb-3">
            <Brain className="w-3.5 h-3.5" />
            Growth Engineering Reflection
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] tracking-tight">
            Responsible AI & Strategic Decisions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            How AI was used responsibly as a collaborative sparring partner during development — and where human growth marketing judgment corrected generic suggestions.
          </p>

          {/* Toggle between AI Decisions and Experiment Log */}
          <div className="mt-6 inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setActiveTab('ai-notes')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'ai-notes'
                  ? 'bg-white text-[#1565D8] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3 Core Strategic Trade-Offs
            </button>
            <button
              onClick={() => setActiveTab('experiments')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'experiments'
                  ? 'bg-white text-[#1565D8] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Growth Experiment Log (3 A/B Tests)
            </button>
          </div>
        </div>

        {/* TAB 1: AI LEARNING NOTES */}
        {activeTab === 'ai-notes' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {INITIAL_AI_NOTES.map((note, index) => {
              const isExpanded = expandedId === note.id;
              return (
                <div
                  key={note.id}
                  className={`nxt-card p-6 bg-white border transition-all ${
                    isExpanded ? 'border-blue-400 shadow-md ring-2 ring-blue-50' : 'border-slate-200'
                  }`}
                >
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : note.id)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#1565D8] flex items-center justify-center font-bold text-xs">
                        0{index + 1}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{note.title}</h3>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">{note.userPrompt}</p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-700">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-6 pt-5 border-t border-slate-100 space-y-4 animate-in fade-in duration-200 text-xs sm:text-sm">
                      {/* Initial AI vs Marketer Choice Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Generic AI Suggestion */}
                        <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/70">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
                            🤖 Initial AI Suggestion
                          </span>
                          <p className="text-slate-700 leading-relaxed text-xs">
                            {note.initialAISuggestion}
                          </p>
                        </div>

                        {/* My Growth Engineering Decision */}
                        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1565D8] block mb-1">
                            💡 Human Marketer Override
                          </span>
                          <p className="text-slate-800 leading-relaxed text-xs font-medium">
                            {note.growthMarketerDecision}
                          </p>
                        </div>
                      </div>

                      {/* Strategic Rationale & Impact */}
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div className="text-xs text-slate-600">
                          <strong>Strategic Rationale:</strong> {note.strategicRationale}
                        </div>
                        <div className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold whitespace-nowrap">
                          {note.impactMetric}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: GROWTH EXPERIMENT LOG */}
        {activeTab === 'experiments' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-slate-700 flex items-start gap-3">
              <FlaskConical className="w-5 h-5 text-[#1565D8] flex-shrink-0 mt-0.5" />
              <div>
                <strong>Scientific Growth Methodology:</strong> Every change tested directly answers: "Does this attract qualified students, reduce registration friction, or encourage organic referrals?"
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {INITIAL_EXPERIMENTS.map((exp) => (
                <div key={exp.id} className="nxt-card p-6 bg-white border border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                      {exp.status}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{exp.id}</span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-2">
                    Hypothesis: {exp.hypothesis}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs my-3">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Change Made:</span>
                      <p className="text-slate-700 mt-0.5">{exp.changeMade}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Evaluated Metric:</span>
                      <p className="text-[#1565D8] font-semibold mt-0.5">{exp.metric}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-950">
                    <strong>Observation & Decision:</strong> {exp.observation} — <em>{exp.decision}</em>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
