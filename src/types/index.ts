export interface StudentRegistration {
  id: string;
  fullName: string;
  email: string;
  college: string;
  gradYear: string;
  branch: string;
  whatsapp?: string;
  discoveryChannel: AcquisitionChannel;
  referralCode: string; // Their own generated referral code
  referredBy?: string; // If referred by another code
  createdAt: string;
  status: 'confirmed' | 'pending';
}

export type AcquisitionChannel =
  | 'College Clubs & Ambassadors'
  | 'WhatsApp Student Communities'
  | 'Student Referrals'
  | 'LinkedIn & Instagram Organic'
  | 'Permission-based Email Outreach'
  | 'Direct / Other';

export interface ChannelPerformance {
  channel: AcquisitionChannel;
  target: number;
  actual: number;
  plannedApproach: string;
  allocatedBudget: number; // in INR
  actualSpent: number;
  color: string;
}

export interface DailyTrackingRecord {
  dayNumber: number;
  dateStr: string;
  targetCumulative: number;
  actualCumulative: number;
  dailyTarget: number;
  dailyActual: number;
  topChannel: string;
  keyMilestone: string;
  notes: string;
}

export interface FunnelMetrics {
  campaignExposures: number; // Planned ~10,000
  landingPageVisits: number; // Planned ~2,000 (20%)
  formStarts: number;        // ~850
  completedRegistrations: number; // Target 500 (25% conversion from visits)
  referralCount: number;     // Subset of registrations
}

export interface AILearningRecord {
  id: string;
  title: string;
  userPrompt: string;
  initialAISuggestion: string;
  growthMarketerDecision: string;
  strategicRationale: string;
  impactMetric: string;
}

export interface ExperimentLog {
  id: string;
  hypothesis: string;
  changeMade: string;
  metric: string;
  observation: string;
  decision: string;
  status: 'Winner' | 'Learning' | 'In Progress';
}
