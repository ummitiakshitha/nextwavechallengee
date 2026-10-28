import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  Mail,
  Building,
  GraduationCap,
  Share2,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Send,
  MessageCircle,
  Sparkles,
  Users,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import type { AcquisitionChannel, StudentRegistration } from '../types';
import { saveNewRegistration, getReferralCountForCode } from '../services/storage';

interface RegistrationFlowProps {
  onRegistrationSuccess?: (reg: StudentRegistration) => void;
  initialReferralCode?: string;
}

export const RegistrationFlow: React.FC<RegistrationFlowProps> = ({
  onRegistrationSuccess,
  initialReferralCode,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [gradYear, setGradYear] = useState('2025');
  const [branch, setBranch] = useState('Computer Science and Engineering');
  const [whatsapp, setWhatsapp] = useState('');
  const [discoveryChannel, setDiscoveryChannel] = useState<AcquisitionChannel>('College Clubs & Ambassadors');
  const [referralCode, setReferralCode] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [confirmedRegistration, setConfirmedRegistration] = useState<StudentRegistration | null>(null);

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Auto-detect referral code and UTM parameters from URL query string
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref') || params.get('invite_code') || initialReferralCode;
    if (ref) {
      setReferralCode(ref.toUpperCase().trim());
      setDiscoveryChannel('Student Referrals');
    }

    const utmSource = params.get('utm_source')?.toLowerCase();
    if (utmSource) {
      if (utmSource.includes('whatsapp')) setDiscoveryChannel('WhatsApp Student Communities');
      else if (utmSource.includes('club') || utmSource.includes('ambassador')) setDiscoveryChannel('College Clubs & Ambassadors');
      else if (utmSource.includes('linkedin') || utmSource.includes('instagram')) setDiscoveryChannel('LinkedIn & Instagram Organic');
      else if (utmSource.includes('email')) setDiscoveryChannel('Permission-based Email Outreach');
    }
  }, [initialReferralCode]);

  const validate = () => {
    const err: Record<string, string> = {};
    if (!fullName.trim()) err.fullName = 'Please enter your full name';
    if (!email.trim()) {
      err.email = 'Please enter your college or personal email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      err.email = 'Please provide a valid email address';
    }
    if (!college.trim()) err.college = 'Please enter your college name';
    if (!privacyConsent) err.privacyConsent = 'Please agree to the privacy policy to register';

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const result = saveNewRegistration({
        fullName: fullName.trim(),
        email: email.trim(),
        college: college.trim(),
        gradYear,
        branch,
        whatsapp: whatsapp.trim() || undefined,
        discoveryChannel,
        referredBy: referralCode.trim() ? referralCode.toUpperCase().trim() : undefined,
      });

      setIsSubmitting(false);

      if (!result.success) {
        setServerError(result.error || 'Registration failed. Please verify your details.');
        return;
      }

      if (result.registration) {
        setConfirmedRegistration(result.registration);
        if (onRegistrationSuccess) onRegistrationSuccess(result.registration);

        // Fire celebratory confetti!
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#1565D8', '#00B290', '#F59E0B'],
          });
        } catch {
          // fallback
        }
      }
    }, 600);
  };

  // SUCCESS / REFERRAL VIEW
  if (confirmedRegistration) {
    const myCode = confirmedRegistration.referralCode;
    const currentUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://nxtwave-ai60.edu';
    const referralUrl = `${currentUrl}?ref=${myCode}`;
    const referralCount = getReferralCountForCode(myCode);

    const shareText = `Hey! I just registered for a free online workshop with NxtWave: "Build Your First AI Project in 60 Minutes". Thought you might like to build together! Register here: ${referralUrl} (Referral Code: ${myCode})`;
    const encodedShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

    const handleCopyLink = () => {
      navigator.clipboard.writeText(referralUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    };

    const handleCopyCode = () => {
      navigator.clipboard.writeText(myCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    };

    return (
      <div className="nxt-card p-6 sm:p-8 bg-white border-2 border-emerald-400/80 shadow-nxt-hover animate-in fade-in duration-300 max-w-xl mx-auto text-left">
        {/* Success Header */}
        <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
              Seat Confirmed
            </span>
            <h3 className="text-xl font-extrabold text-[#0A2540] mt-1">
              Welcome aboard, {confirmedRegistration.fullName}!
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Your free registration for <strong>Build Your First AI Project in 60 Minutes</strong> has been recorded in our system. Joining links will be shared via email prior to the session.
            </p>
          </div>
        </div>

        {/* Growth Referral Engine Box */}
        <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-blue-50/80 to-slate-50 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#1565D8]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1565D8]">
                Bring Your Friends. Build Together.
              </span>
            </div>
            <span className="text-[11px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
              {referralCount} Friends Joined
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            Building software is more fun and effective when you have a study partner. Invite your college classmates or project group so you can troubleshoot together during the 60 minutes!
          </p>

          {/* Referral Code Box */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between mb-3 shadow-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Your Personal Referral Code</span>
              <div className="text-base font-extrabold text-[#0A2540] tracking-wider font-mono">
                {myCode}
              </div>
            </div>
            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 transition-colors"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCode ? 'Copied' : 'Copy Code'}
            </button>
          </div>

          {/* Action Buttons: WhatsApp Share & Copy Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href={encodedShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Share on WhatsApp
            </a>

            <button
              onClick={handleCopyLink}
              className="px-4 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copiedLink ? 'Referral Link Copied!' : 'Copy Personal Link'}
            </button>
          </div>

          {/* Progress Goal */}
          <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Milestone: Invite 2 friends for exclusive Workshop Starter Code repo</span>
            <span className="font-bold text-[#1565D8]">{Math.min(referralCount, 2)}/2</span>
          </div>
        </div>

        {/* Audit Details */}
        <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
          <span>Student ID: <code className="text-slate-800">{confirmedRegistration.id}</code></span>
          <span>Source: <strong className="text-slate-700">{confirmedRegistration.discoveryChannel}</strong></span>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setConfirmedRegistration(null)}
            className="text-xs text-[#1565D8] hover:underline font-semibold"
          >
            Register another student (for demo/testing)
          </button>
        </div>
      </div>
    );
  }

  // REGISTRATION FORM VIEW
  return (
    <div id="register" className="nxt-card p-6 sm:p-8 bg-white border border-slate-200 shadow-nxt max-w-xl mx-auto text-left relative">
      <div className="mb-6">
        <span className="nxt-badge bg-blue-100 text-[#1565D8] mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Zero Cost • 100% Free Registration
        </span>
        <h3 className="text-2xl font-extrabold text-[#0A2540] tracking-tight">
          Register for the 60-Minute AI Workshop
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Designed specifically for final-year engineering students ready to build their first practical AI project.
        </p>
      </div>

      {serverError && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className={`w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border ${
                errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
              } focus:border-[#1565D8] focus:ring-2 focus:ring-blue-100 outline-none transition-all`}
            />
          </div>
          {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rahul.sharma@college.edu"
              className={`w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border ${
                errors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
              } focus:border-[#1565D8] focus:ring-2 focus:ring-blue-100 outline-none transition-all`}
            />
          </div>
          {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
        </div>

        {/* College Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            College / University Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="e.g. BMS College of Engineering"
              className={`w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border ${
                errors.college ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
              } focus:border-[#1565D8] focus:ring-2 focus:ring-blue-100 outline-none transition-all`}
            />
          </div>
          {errors.college && <p className="text-[11px] text-red-600 mt-1">{errors.college}</p>}
        </div>

        {/* Two Columns: Grad Year & Branch */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Graduation Year <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <select
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#1565D8] focus:ring-2 focus:ring-blue-100 outline-none bg-white transition-all text-slate-800"
              >
                <option value="2024">2024 (Recent Graduate)</option>
                <option value="2025">2025 (Final Year)</option>
                <option value="2026">2026 (Pre-Final Year)</option>
                <option value="2027">2027 (Undergraduate)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Branch / Specialization
            </label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#1565D8] focus:ring-2 focus:ring-blue-100 outline-none bg-white transition-all text-slate-800"
            >
              <option value="Computer Science and Engineering">Computer Science (CSE)</option>
              <option value="Information Technology">Information Technology (IT)</option>
              <option value="Electronics and Communication (ECE)">Electronics & Comm (ECE)</option>
              <option value="Electrical and Electronics (EEE)">Electrical (EEE)</option>
              <option value="Artificial Intelligence & Data Science">AI & Data Science (AI/DS)</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Other Engineering Branch">Other Engineering Branch</option>
            </select>
          </div>
        </div>

        {/* WhatsApp Number (Optional) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            WhatsApp Number <span className="text-slate-400 font-normal lowercase">(optional, for reminders)</span>
          </label>
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#1565D8] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          />
        </div>

        {/* Discovery Channel */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            How did you hear about this workshop?
          </label>
          <select
            value={discoveryChannel}
            onChange={(e) => setDiscoveryChannel(e.target.value as AcquisitionChannel)}
            className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-[#1565D8] focus:ring-2 focus:ring-blue-100 outline-none bg-white transition-all text-slate-800"
          >
            <option value="College Clubs & Ambassadors">College Clubs & Campus Ambassadors</option>
            <option value="WhatsApp Student Communities">WhatsApp College / Branch Groups</option>
            <option value="Student Referrals">Friend / Peer Referral</option>
            <option value="LinkedIn & Instagram Organic">LinkedIn or Instagram Post</option>
            <option value="Permission-based Email Outreach">Email Invitation</option>
            <option value="Direct / Other">Direct / Other Source</option>
          </select>
        </div>

        {/* Referral Code (Optional) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Referral Code <span className="text-slate-400 font-normal lowercase">(if a friend invited you)</span>
          </label>
          <input
            type="text"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
            placeholder="e.g. AI60-AD101"
            className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 font-mono focus:border-[#1565D8] focus:ring-2 focus:ring-blue-100 outline-none uppercase transition-all"
          />
          {referralCode && (
            <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
              <Check className="w-3 h-3" /> Referral attribution active. Your friend will receive invite credit!
            </p>
          )}
        </div>

        {/* Privacy Consent */}
        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={privacyConsent}
              onChange={(e) => setPrivacyConsent(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 text-[#1565D8] focus:ring-blue-400"
            />
            <span className="text-[11px] text-slate-600 leading-relaxed">
              I agree to receive the workshop joining details and occasional project updates. We respect your privacy and will never spam or sell your contact data.
            </span>
          </label>
          {errors.privacyConsent && (
            <p className="text-[11px] text-red-600 mt-1">{errors.privacyConsent}</p>
          )}
        </div>

        {/* Submit CTA */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-nxt transition-all ${
              isSubmitting
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-[#1565D8] hover:bg-[#0D47A1] shadow-blue-600/30 active:scale-[0.98]'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Confirming Your Free Seat...</span>
              </>
            ) : (
              <>
                <span>Register Free — Get Instant Confirmation</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        <div className="pt-2 text-center flex items-center justify-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Zero spam guarantee • 100% Free Online Workshop</span>
        </div>
      </form>
    </div>
  );
};
