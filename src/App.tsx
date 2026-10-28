import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StudentPersonaSection } from './components/StudentPersonaSection';
import { WhatYouWillBuild } from './components/WhatYouWillBuild';
import { InteractiveAIPreview } from './components/InteractiveAIPreview';
import { RegistrationFlow } from './components/RegistrationFlow';
import { GrowthStrategySection } from './components/GrowthStrategySection';
import { CampaignAnalyticsDashboard } from './components/CampaignAnalyticsDashboard';
import { AILearningNotesSection } from './components/AILearningNotesSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTASection } from './components/FinalCTASection';
import { Footer } from './components/Footer';
import { ThreeMinuteDemoGuide } from './components/ThreeMinuteDemoGuide';
import type { StudentRegistration } from './types';

export function App() {
  const [activeView, setActiveView] = useState<'campaign' | 'analytics'>('campaign');
  const [isPitchGuideOpen, setIsPitchGuideOpen] = useState(false);

  const handleRegisterSuccess = (reg: StudentRegistration) => {
    console.log('Registration confirmed:', reg);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0A2540]">
      {/* Navbar with Mode Switcher & 3-Min Pitch Launcher */}
      <Navbar
        onOpenPitchGuide={() => setIsPitchGuideOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <main className="flex-1">
        {activeView === 'analytics' ? (
          /* Dedicated Analytics Dashboard View */
          <div className="animate-in fade-in duration-200">
            <CampaignAnalyticsDashboard />
          </div>
        ) : (
          /* Public Campaign Landing Page Journey */
          <div className="animate-in fade-in duration-200">
            {/* 1. Above the fold Hero with 3D Scene */}
            <HeroSection
              onRegisterClick={() => {
                const regEl = document.getElementById('register');
                if (regEl) regEl.scrollIntoView({ behavior: 'smooth' });
              }}
              onExploreClick={() => {
                const previewEl = document.getElementById('interactive-preview');
                if (previewEl) previewEl.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 2. Student Persona & Doubts addressed directly */}
            <StudentPersonaSection />

            {/* 3. 3-Stage Architecture ("From Curiosity to Working AI") */}
            <WhatYouWillBuild />

            {/* 4. Interactive AI Workshop Preview (Simulated 4-step Pipeline) */}
            <InteractiveAIPreview />

            {/* 5. Registration Experience & Viral Referral Loop */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <RegistrationFlow onRegistrationSuccess={handleRegisterSuccess} />
              </div>
            </section>

            {/* 6. Strategic Growth Plan (7-Day Acquisition & Sensitivity Funnel) */}
            <GrowthStrategySection />

            {/* 7. Responsible AI Learning Notes & Experiment Log */}
            <AILearningNotesSection />

            {/* 8. FAQs & Transparent Trust Section */}
            <FAQSection />

            {/* 9. Final Call to Action */}
            <FinalCTASection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* 3-Minute Video Demo Script Modal */}
      <ThreeMinuteDemoGuide
        isOpen={isPitchGuideOpen}
        onClose={() => setIsPitchGuideOpen(false)}
      />
    </div>
  );
}

export default App;
