import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

const FAQS = [
  {
    q: 'Is the workshop really free?',
    a: 'Yes, 100% free. There are no hidden fees, paywalls, or surprise credit card requirements. The entire 60-minute practical session is open to engineering students free of charge.',
  },
  {
    q: 'Who should attend this workshop?',
    a: 'Final-year and pre-final year engineering students (from CSE, IT, ECE, EEE, Mechanical, Civil, or related branches) who want to understand how real-world AI applications are constructed from scratch.',
  },
  {
    q: 'Do I need prior AI or machine learning experience?',
    a: 'No prior AI/ML experience is required. Basic familiarity with variables, functions, and logic in any programming language (Python, C++, Java, or JavaScript) is helpful. We guide you step-by-step.',
  },
  {
    q: 'What exactly will I build during the 60 minutes?',
    a: 'You will build a functional, browser-based AI mini-project that takes raw input, processes it through lightweight open-source inference pipelines, and returns structured outputs. You can keep and extend the starter code afterwards.',
  },
  {
    q: 'When is the workshop scheduled?',
    a: 'The date and time are currently "To be announced". Once final technical schedules are set, all registered students will receive email and optional WhatsApp reminders with the live stream and notebook links.',
  },
  {
    q: 'How will I receive the workshop joining details?',
    a: 'Joining links, setup prerequisites, and notebook repository links will be sent directly to the email address you register with, approximately 24 hours prior to the live session.',
  },
  {
    q: 'How does the student referral code work?',
    a: 'When you register, you receive a unique code (e.g. AI60-AB123) and personal invite link. If your classmates register using your link, both of you unlock the extended AI project starter repository for your college resumes.',
  },
  {
    q: 'How will my registration information be used?',
    a: 'Your information is used solely to verify student eligibility, send workshop connection links, and record referral attribution. We do not sell, spam, or share your contact data with third-party marketers.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faqs" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="nxt-badge bg-blue-100 text-[#1565D8] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A2540] tracking-tight">
            Clear Answers. Zero False Promises.
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Everything you need to know about the upcoming 60-minute practical workshop, student prerequisites, and event delivery.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="nxt-card bg-white border border-slate-200 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {faq.q}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-500">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Transparent Trust Notice */}
        <div className="mt-12 p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex items-center gap-3 text-xs text-slate-700">
          <ShieldCheck className="w-5 h-5 text-[#1565D8] flex-shrink-0" />
          <span>
            <strong>Transparency Commitment:</strong> We never display fake participant countdowns, invented placements, or guaranteed salaries. This workshop is an honest, practical first step for engineering students.
          </span>
        </div>
      </div>
    </section>
  );
};
