import React from 'react';
import { ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A192F] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="https://d14qv6cm1t62pm.cloudfront.net/ccbp-website/Nxtwave_White_logo.svg"
                alt="NxtWave Logo"
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                  const fallback = document.getElementById('footer-logo-fallback');
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              <span id="footer-logo-fallback" style={{ display: 'none' }} className="font-extrabold text-xl text-white">
                NxtWave
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Transforming college students into industry-ready software professionals. Over 2,500+ companies have hired NxtWave learners across India.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Internship Assessment Prototype Disclaimer
              </div>
              <p>
                This interactive website is an independently created prototype for the <strong>NxtWave Growth Intern Round 1 Challenge</strong>. It demonstrates campaign architecture, 3D interaction, viral referral loops, and acquisition analytics. It is not an officially published NxtWave commercial release.
              </p>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Campaign Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#workshop" className="hover:text-blue-400 transition-colors">Workshop Promise</a></li>
              <li><a href="#what-you-build" className="hover:text-blue-400 transition-colors">3-Stage Architecture</a></li>
              <li><a href="#interactive-preview" className="hover:text-blue-400 transition-colors">Interactive 3D Demo</a></li>
              <li><a href="#strategy" className="hover:text-blue-400 transition-colors">7-Day Growth Plan</a></li>
              <li><a href="#faqs" className="hover:text-blue-400 transition-colors">Common Doubts</a></li>
            </ul>
          </div>

          {/* Official References Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Official Design References
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href="https://www.ccbp.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  <span>ccbp.in (CCBP 4.0)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.ccbp.in/academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  <span>ccbp.in/academy</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.nxtwave.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  <span>nxtwave.co.in</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 NxtWave Growth Intern Assessment Submission. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with React, TypeScript, Three.js, & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
