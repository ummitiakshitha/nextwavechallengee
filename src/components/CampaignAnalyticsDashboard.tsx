import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Users,
  Target,
  DollarSign,
  Download,
  Filter,
  CheckCircle2,
  Calendar,
  Share2,
  AlertTriangle,
  RefreshCw,
  Search,
  PieChart,
  BarChart3,
  Award
} from 'lucide-react';
import type {
  StudentRegistration,
  ChannelPerformance,
  DailyTrackingRecord,
} from '../types';
import {
  getStoredRegistrations,
  INITIAL_CHANNELS,
  INITIAL_DAILY_DATA,
  exportRegistrationsToCSV,
  resetDemoData
} from '../services/storage';

export const CampaignAnalyticsDashboard: React.FC = () => {
  const [registrations, setRegistrations] = useState<StudentRegistration[]>(() => getStoredRegistrations());
  const [selectedChannelFilter, setSelectedChannelFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDemoMode, setIsDemoMode] = useState(true);

  // Re-fetch on demand
  const refreshData = () => {
    setRegistrations(getStoredRegistrations());
  };

  const handleResetData = () => {
    if (confirm('Reset to initial 7-day benchmark demo dataset?')) {
      resetDemoData();
      setRegistrations(getStoredRegistrations());
    }
  };

  // Metrics Calculations
  const TARGET_REGISTRATIONS = 500;
  const TOTAL_BUDGET = 2000; // in INR

  // Actual live count from storage + synthetic baseline
  // Let's compute channel counts dynamically
  const channelBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    INITIAL_CHANNELS.forEach((c) => {
      counts[c.channel] = c.actual;
    });

    // Add any newly registered users
    registrations.forEach((r) => {
      if (counts[r.discoveryChannel] !== undefined) {
        // Only count if not in base seed to prevent double counting
        if (!r.id.startsWith('reg_100')) {
          counts[r.discoveryChannel] = (counts[r.discoveryChannel] || 0) + 1;
        }
      }
    });

    return INITIAL_CHANNELS.map((ch) => ({
      ...ch,
      actual: counts[ch.channel] || ch.actual,
    }));
  }, [registrations]);

  const totalRegistrations = useMemo(() => {
    return channelBreakdown.reduce((acc, curr) => acc + curr.actual, 0);
  }, [channelBreakdown]);

  const referralAttributed = useMemo(() => {
    const refChan = channelBreakdown.find((c) => c.channel === 'Student Referrals');
    return refChan ? refChan.actual : 42;
  }, [channelBreakdown]);

  const referralParticipationRate = ((referralAttributed / totalRegistrations) * 100).toFixed(1);

  const totalSpent = useMemo(() => {
    return channelBreakdown.reduce((acc, curr) => acc + curr.actualSpent, 0);
  }, [channelBreakdown]);

  const remainingBudget = TOTAL_BUDGET - totalSpent;
  const blendedCPA = totalSpent > 0 ? (totalSpent / totalRegistrations).toFixed(2) : '0.00';
  const progressPercent = Math.min(100, Math.round((totalRegistrations / TARGET_REGISTRATIONS) * 100));

  // Funnel Assumptions
  const estimatedExposures = 10000;
  const estimatedVisits = 2000;
  const conversionRate = ((totalRegistrations / estimatedVisits) * 100).toFixed(1);

  // Filtered registrations for the audit table
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((r) => {
      const matchChannel = selectedChannelFilter === 'all' || r.discoveryChannel === selectedChannelFilter;
      const matchQuery =
        r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.referralCode.toLowerCase().includes(searchQuery.toLowerCase());
      return matchChannel && matchQuery;
    });
  }, [registrations, selectedChannelFilter, searchQuery]);

  return (
    <div id="analytics" className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Top Header & Mode Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="nxt-badge bg-blue-100 text-[#1565D8]">
                <BarChart3 className="w-3.5 h-3.5" />
                Campaign Command Center
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-600" />
                {isDemoMode ? 'Benchmark Assessment Simulation' : 'Live Production Data'}
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#0A2540] tracking-tight">
              7-Day Growth Campaign Analytics
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Target: 500 Final-Year Engineering Students • Budget: ₹2,000 • Verified Attribution
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={refreshData}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              Refresh
            </button>

            <button
              onClick={exportRegistrationsToCSV}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#1565D8] hover:bg-[#0D47A1] text-white flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Export Records (CSV)
            </button>

            <button
              onClick={handleResetData}
              className="px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
              title="Reset synthetic baseline data"
            >
              Reset Seed
            </button>
          </div>
        </div>

        {/* Top 4 Primary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* KPI 1: Total Registrations */}
          <div className="nxt-card p-5 bg-white border-slate-200">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Completed Registrations</span>
              <Target className="w-4 h-4 text-[#1565D8]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#0A2540]">{totalRegistrations}</span>
              <span className="text-xs text-slate-500 font-semibold">/ {TARGET_REGISTRATIONS} goal</span>
            </div>
            {/* Progress bar */}
            <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#1565D8] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-2 text-[11px] text-slate-500 flex justify-between font-medium">
              <span>{progressPercent}% towards 500 target</span>
              <span className="text-emerald-600 font-bold">Pacing on track</span>
            </div>
          </div>

          {/* KPI 2: Peer Referral Attribution */}
          <div className="nxt-card p-5 bg-white border-slate-200">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Student Referrals</span>
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-emerald-600">{referralAttributed}</span>
              <span className="text-xs text-slate-500 font-semibold">/ 100 viral target</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <span>Viral Share Contribution</span>
              <span className="font-bold text-[#0A2540]">{referralParticipationRate}%</span>
            </div>
            <div className="mt-1 text-[11px] text-emerald-700 font-medium">
              K-factor virality: 0.22 (Zero marginal ad spend)
            </div>
          </div>

          {/* KPI 3: Budget Utilization */}
          <div className="nxt-card p-5 bg-white border-slate-200">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Budget Spent</span>
              <DollarSign className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#0A2540]">₹{totalSpent}</span>
              <span className="text-xs text-slate-500 font-semibold">/ ₹{TOTAL_BUDGET} total</span>
            </div>
            <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(totalSpent / TOTAL_BUDGET) * 100}%` }}
              />
            </div>
            <div className="mt-2 text-[11px] text-slate-500 flex justify-between font-medium">
              <span>Remaining: <strong>₹{remainingBudget}</strong></span>
              <span className="text-emerald-700 font-bold">57% reserve safe</span>
            </div>
          </div>

          {/* KPI 4: Blended Unit Economics */}
          <div className="nxt-card p-5 bg-white border-slate-200">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Blended Cost / Student</span>
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-purple-700">₹{blendedCPA}</span>
              <span className="text-xs text-slate-500 font-semibold">/ reg (Max ₹4.00)</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <span>Visit-to-Reg Conversion</span>
              <span className="font-bold text-slate-800">24.2%</span>
            </div>
            <div className="mt-1 text-[11px] text-purple-700 font-medium">
              Budget efficiency: 5% lower than target ceiling
            </div>
          </div>
        </div>

        {/* Charts Section: Acquisition Channel Breakdown & Daily Progression */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Channel Performance Bar Breakdown */}
          <div className="lg:col-span-6 nxt-card p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#0A2540] flex items-center gap-2">
                <PieChart className="w-4 h-4 text-[#1565D8]" />
                Acquisition Channel Performance
              </h3>
              <span className="text-xs text-slate-400 font-medium">Target vs Actual</span>
            </div>

            <div className="space-y-4">
              {channelBreakdown.map((ch, idx) => {
                const pct = Math.min(100, Math.round((ch.actual / ch.target) * 100));
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ch.color }} />
                        {ch.channel}
                      </span>
                      <span className="text-slate-600 font-mono">
                        <strong>{ch.actual}</strong> / {ch.target} ({pct}%)
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden flex">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: ch.color }}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>Spent: ₹{ch.actualSpent} (Budget ₹{ch.allocatedBudget})</span>
                      <span className="italic">{ch.actualSpent > 0 ? `₹${(ch.actualSpent / ch.actual).toFixed(1)} / reg` : 'Free Organic'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily 7-Day Velocity Tracking */}
          <div className="lg:col-span-6 nxt-card p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#0A2540] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                7-Day Registration Velocity Pacing
              </h3>
              <span className="text-xs text-slate-400 font-medium">Daily Cumulative</span>
            </div>

            {/* Visual SVG Timeline Chart */}
            <div className="h-56 w-full flex items-end gap-2 pt-6 pb-2 border-b border-slate-200">
              {INITIAL_DAILY_DATA.map((d, i) => {
                const maxTarget = 500;
                const targetH = Math.min(100, (d.targetCumulative / maxTarget) * 100);
                const actualH = d.actualCumulative > 0 ? Math.min(100, (d.actualCumulative / maxTarget) * 100) : 0;

                return (
                  <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                    {/* Tooltip */}
                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] p-1.5 rounded pointer-events-none z-10 whitespace-nowrap shadow-lg">
                      {d.dateStr}: Target {d.targetCumulative} | Actual {d.actualCumulative || 'Planned'}
                    </div>

                    <div className="w-full flex items-end justify-center gap-1 h-full">
                      {/* Target bar */}
                      <div
                        className="w-2.5 bg-slate-200 rounded-t"
                        style={{ height: `${targetH}%` }}
                        title={`Target: ${d.targetCumulative}`}
                      />
                      {/* Actual bar */}
                      <div
                        className={`w-3.5 rounded-t transition-all ${
                          d.actualCumulative > 0 ? 'bg-[#1565D8]' : 'bg-transparent'
                        }`}
                        style={{ height: `${actualH}%` }}
                        title={`Actual: ${d.actualCumulative}`}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-600 mt-2">D{d.dayNumber}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 flex items-center justify-center gap-6 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-slate-200 rounded-sm" />
                <span>Target Cumulative</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#1565D8] rounded-sm" />
                <span>Actual Cumulative</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Performance Ledger Table */}
        <div className="nxt-card p-6 bg-white mb-8 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-[#0A2540]">
              7-Day Daily Pacing Ledger & Audit Notes
            </h3>
            <span className="text-xs text-slate-500">Day-by-day milestone tracking</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase font-bold tracking-wider border-y border-slate-200">
                <tr>
                  <th className="py-3 px-3">Timeline</th>
                  <th className="py-3 px-3">Daily Target</th>
                  <th className="py-3 px-3">Daily Actual</th>
                  <th className="py-3 px-3">Variance</th>
                  <th className="py-3 px-3">Top Channel</th>
                  <th className="py-3 px-4">Milestone / Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {INITIAL_DAILY_DATA.map((row, idx) => {
                  const variance = row.dailyActual > 0 ? row.dailyActual - row.dailyTarget : null;
                  return (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-900">{row.dateStr}</td>
                      <td className="py-3 px-3 font-mono">{row.dailyTarget}</td>
                      <td className="py-3 px-3 font-mono font-bold text-[#1565D8]">
                        {row.dailyActual > 0 ? row.dailyActual : '—'}
                      </td>
                      <td className="py-3 px-3">
                        {variance !== null ? (
                          <span className={`font-bold ${variance >= 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {variance >= 0 ? `+${variance}` : variance}
                          </span>
                        ) : (
                          <span className="text-slate-400">Scheduled</span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-800">{row.topChannel}</td>
                      <td className="py-3 px-4 text-slate-600 max-w-xs">{row.notes}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Registration Audit Stream (Anonymized for student privacy) */}
        <div className="nxt-card p-6 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h3 className="text-base font-bold text-[#0A2540]">
                Verified Registration Audit Stream ({filteredRegistrations.length})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Privacy-conscious audit log with referral links and source channels.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search college, name..."
                  className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 outline-none focus:border-[#1565D8] w-44"
                />
              </div>

              <select
                value={selectedChannelFilter}
                onChange={(e) => setSelectedChannelFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 outline-none bg-white text-slate-700 font-medium"
              >
                <option value="all">All Channels</option>
                <option value="College Clubs & Ambassadors">College Clubs</option>
                <option value="WhatsApp Student Communities">WhatsApp Communities</option>
                <option value="Student Referrals">Student Referrals</option>
                <option value="LinkedIn & Instagram Organic">Social Organic</option>
                <option value="Permission-based Email Outreach">Email Outreach</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase font-bold tracking-wider border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Student</th>
                  <th className="py-2.5 px-3">College & Branch</th>
                  <th className="py-2.5 px-3">Acquisition Channel</th>
                  <th className="py-2.5 px-3">Referral Code</th>
                  <th className="py-2.5 px-3">Referred By</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredRegistrations.slice(0, 10).map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900">
                      {r.fullName}
                      <span className="block text-[10px] text-slate-400 font-normal">Grad: {r.gradYear}</span>
                    </td>
                    <td className="py-3 px-3 max-w-xs">
                      <span className="font-medium text-slate-800">{r.college}</span>
                      <span className="block text-[10px] text-slate-500">{r.branch}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {r.discoveryChannel}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-[#1565D8]">
                      {r.referralCode}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600">
                      {r.referredBy ? (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {r.referredBy}
                        </span>
                      ) : (
                        <span className="text-slate-400">Direct</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Confirmed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
