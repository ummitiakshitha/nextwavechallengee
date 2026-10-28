import React, { useState } from 'react';
import {
  Compass,
  Layers,
  DollarSign,
  TrendingUp,
  Sliders,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { INITIAL_CHANNELS } from '../services/storage';

export const GrowthStrategySection: React.FC = () => {
  // Sensitivity Funnel Simulator State
  const [targetRegistrations, setTargetRegistrations] = useState(500);
  const [conversionRatePercent, setConversionRatePercent] = useState(25); // 25%
  const [visitRatePercent, setVisitRatePercent] = useState(20); // 20%

  // Calculations
  const requiredVisits = Math.ceil(targetRegistrations / (conversionRatePercent / 100));
  const requiredExposures = Math.ceil(requiredVisits / (visitRatePercent / 100));
  const estimatedCostPerRegistration = (2000 / targetRegistrations).toFixed(2);

  const EXECUTION_DAYS = [
    {
      day: 'Day 1',
      title: 'Prepare & Launch',
      focus: 'System verification & baseline activation',
      bullets: [
        'Publish campaign landing page and 3D interactive hero',
        'Verify referral attribution parameters and WhatsApp share links',
        'Distribute tracking links to first 12 college club leads',
        'Run end-to-end test registration in demo mode',
      ],
    },
    {
      day: 'Day 2',
      title: 'Community Outreach',
      focus: 'Peer network & WhatsApp activation',
      bullets: [
        'Coordinate with campus ambassadors across 25+ engineering colleges',
        'Share concise, value-focused invitations in admin-approved WhatsApp batches',
        'Track early source attribution and form drop-off metrics',
      ],
    },
    {
      day: 'Day 3',
      title: 'Demonstrate Tangible Value',
      focus: 'Interactive preview & zero-hype proof',
      bullets: [
        'Feature the 4-step AI Pipeline simulator prominently',
        'Share 30-second screen recordings of the project running live',
        'Engage engineering students asking technical stack questions',
      ],
    },
    {
      day: 'Day 4',
      title: 'Activate Student Referrals',
      focus: 'Viral K-factor acceleration',
      bullets: [
        'Encourage confirmed students to invite their final-year project buddies',
        'Highlight the starter code repository reward for 2 referrals',
        'Review which colleges are showing highest peer sharing velocity',
      ],
    },
    {
      day: 'Day 5',
      title: 'Conversion Optimization',
      focus: 'Friction reduction & usability fixes',
      bullets: [
        'Inspect analytics for form abandonment bottlenecks',
        'Clarify FAQ points regarding tool prerequisites and zero-cost setup',
        'Test single headline/CTA variation without changing core promise',
      ],
    },
    {
      day: 'Day 6',
      title: 'Focus on Qualified Channels',
      focus: 'Double down on high-performing sources',
      bullets: [
        'Reallocate remaining ambassador budget to top-converting college clubs',
        'Send concise reminder in permitted channels with accurate workshop schedule',
        'Avoid false scarcity or artificial countdown hype',
      ],
    },
    {
      day: 'Day 7',
      title: 'Final Registration & Audit',
      focus: 'Target milestone review & reporting',
      bullets: [
        'Publish final joining instructions to confirmed students',
        'Export registration ledger and reconcile channel source attribution',
        'Document final expenditure against the ₹2,000 budget ceiling',
      ],
    },
  ];

  return (
    <section id="strategy" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="nxt-badge bg-blue-100 text-[#1565D8] mb-3">
            <Compass className="w-3.5 h-3.5" />
            Strategic Growth Blueprint
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] tracking-tight">
            500 Registrations • 7 Days • ₹2,000 Budget
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            A disciplined, channel-by-channel growth strategy tailored for final-year Indian engineering students. No paid ad waste. Focused on peer trust, college communities, and viral referral loops.
          </p>
        </div>

        {/* Channel Mix Table (Hypothesis & Planning Allocation) */}
        <div className="nxt-card p-6 bg-white mb-10 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-[#0A2540]">
                Channel Mix & Target Allocation
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Planning assumptions calibrated to hit exactly 500 completed registrations.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              Target: 500 Confirmed Seats
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[11px] tracking-wider border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">Acquisition Channel</th>
                  <th className="py-3 px-4">Target Registrations</th>
                  <th className="py-3 px-4">% Share</th>
                  <th className="py-3 px-4">Planned Approach</th>
                  <th className="py-3 px-4">Budget</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {INITIAL_CHANNELS.map((ch, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ch.color }} />
                      {ch.channel}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#1565D8]">{ch.target}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-600">
                      {((ch.target / 500) * 100).toFixed(0)}%
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600 max-w-sm">{ch.plannedApproach}</td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-900">
                      {ch.allocatedBudget > 0 ? `₹${ch.allocatedBudget}` : '₹0 (Organic)'}
                    </td>
                  </tr>
                ))}
                <tr className="bg-blue-50/60 font-bold text-slate-900">
                  <td className="py-3.5 px-4">Total Campaign Target</td>
                  <td className="py-3.5 px-4 font-mono text-[#1565D8]">500</td>
                  <td className="py-3.5 px-4">100%</td>
                  <td className="py-3.5 px-4 text-xs font-normal text-slate-600">Integrated multi-channel acquisition</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-700">₹1,700 (+₹300 reserve)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Budget Allocation Breakdown (₹2,000) & Sensitivity Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* Budget Breakdown */}
          <div className="lg:col-span-5 nxt-card p-6 bg-white">
            <h3 className="text-base font-bold text-[#0A2540] flex items-center gap-2 mb-4">
              <DollarSign className="w-4 h-4 text-amber-500" />
              Disciplined ₹2,000 Budget Allocation
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between font-bold text-slate-900 mb-1">
                  <span>Targeted Social Micro-Testing</span>
                  <span className="font-mono text-amber-700">₹800 (40%)</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Controlled micro-promotions on Instagram/LinkedIn targeting tier-2/3 final-year tech colleges. Continued only if CPA &lt; ₹16.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between font-bold text-slate-900 mb-1">
                  <span>Creative Assets & Visual Teasers</span>
                  <span className="font-mono text-blue-700">₹500 (25%)</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Design templates, short project video demo cutdowns, and shareable WhatsApp infographic cards.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between font-bold text-slate-900 mb-1">
                  <span>Student Community Enablement</span>
                  <span className="font-mono text-emerald-700">₹400 (20%)</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Perks & recognition collateral for college club leads and technical society coordinators.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <div className="flex justify-between font-bold text-emerald-900 mb-1">
                  <span>Contingency Reserve</span>
                  <span className="font-mono text-emerald-800">₹300 (15%)</span>
                </div>
                <p className="text-emerald-800 text-[11px] leading-relaxed">
                  Unallocated buffer to protect against unexpected channel fatigue or test final-day surge.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Sensitivity Funnel Simulator */}
          <div className="lg:col-span-7 nxt-card p-6 bg-gradient-to-br from-white to-blue-50/30 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#0A2540] flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#1565D8]" />
                Interactive Sensitivity Funnel Calculator
              </h3>
              <span className="text-xs text-slate-500 font-medium">Dynamic Planning Tool</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Adjust the sliders below to test how different visit rates and form conversion rates impact the required audience reach needed to achieve 500 registrations.
            </p>

            {/* Slider 1: Conversion Rate */}
            <div className="space-y-2 mb-5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>Landing Page-to-Registration Conversion Rate:</span>
                <span className="text-[#1565D8] font-mono text-sm">{conversionRatePercent}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                value={conversionRatePercent}
                onChange={(e) => setConversionRatePercent(Number(e.target.value))}
                className="w-full accent-[#1565D8] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>10% (Conservative)</span>
                <span>25% (Planned Benchmark)</span>
                <span>40% (High Peer Virality)</span>
              </div>
            </div>

            {/* Slider 2: Visit Rate from Exposures */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span>Visit Rate from Exposures (CTR):</span>
                <span className="text-emerald-700 font-mono text-sm">{visitRatePercent}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="35"
                value={visitRatePercent}
                onChange={(e) => setVisitRatePercent(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>10%</span>
                <span>20% (Planned)</span>
                <span>35%</span>
              </div>
            </div>

            {/* Dynamic Calculated Outcomes */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Campaign Exposures</span>
                <div className="text-lg font-black text-slate-900 mt-1 font-mono">
                  {requiredExposures.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-500">Reach needed</span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Landing Page Visits</span>
                <div className="text-lg font-black text-[#1565D8] mt-1 font-mono">
                  {requiredVisits.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-500">Unique visitors</span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Cost / Registration</span>
                <div className="text-lg font-black text-emerald-600 mt-1 font-mono">
                  ₹{estimatedCostPerRegistration}
                </div>
                <span className="text-[10px] text-slate-500">From ₹2k budget</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Day-by-Day Execution Cards */}
        <div className="nxt-card p-6 bg-white">
          <h3 className="text-base font-bold text-[#0A2540] mb-6 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#1565D8]" />
            7-Day Operational Execution Roadmap
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {EXECUTION_DAYS.map((step, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-300 transition-all text-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-blue-100 text-[#1565D8]">
                      {step.day}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Milestone</span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 mb-1">{step.title}</h4>
                  <p className="text-[11px] font-semibold text-emerald-700 mb-3">{step.focus}</p>

                  <ul className="space-y-1.5 text-slate-600">
                    {step.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-1.5 text-[11px]">
                        <span className="text-[#1565D8] font-bold mt-0.5">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
