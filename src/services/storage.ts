import type { StudentRegistration, ChannelPerformance, DailyTrackingRecord, ExperimentLog, AILearningRecord } from '../types';

const STORAGE_KEY_REGISTRATIONS = 'nxtwave_campaign_registrations_v1';
const STORAGE_KEY_CONFIG = 'nxtwave_campaign_config_v1';

// Initial Channel Targets & Budget Allocation per prompt specification
export const INITIAL_CHANNELS: ChannelPerformance[] = [
  {
    channel: 'College Clubs & Ambassadors',
    target: 180,
    actual: 76,
    plannedApproach: 'Reach relevant student communities through permission-based outreach and club coordinators',
    allocatedBudget: 400,
    actualSpent: 280,
    color: '#1565D8',
  },
  {
    channel: 'WhatsApp Student Communities',
    target: 140,
    actual: 58,
    plannedApproach: 'Share concise, relevant workshop invitations in appropriate groups with administrator permission',
    allocatedBudget: 0,
    actualSpent: 0,
    color: '#00B290',
  },
  {
    channel: 'Student Referrals',
    target: 100,
    actual: 42,
    plannedApproach: 'Encourage registered students to invite friends using unique referral links (zero direct ad cost)',
    allocatedBudget: 500, // Creative incentive collateral + referral starter kits
    actualSpent: 220,
    color: '#F59E0B',
  },
  {
    channel: 'LinkedIn & Instagram Organic',
    target: 50,
    actual: 23,
    plannedApproach: 'Publish short project teasers and student-focused posts',
    allocatedBudget: 800, // Micro-boost & creative testing
    actualSpent: 360,
    color: '#8B5CF6',
  },
  {
    channel: 'Permission-based Email Outreach',
    target: 30,
    actual: 15,
    plannedApproach: 'Send concise invitations to relevant, legitimately available student lists',
    allocatedBudget: 0,
    actualSpent: 0,
    color: '#EC4899',
  },
];

// Initial Daily Tracking (7-day timeline hypothesis, showing Day 4 in progress)
export const INITIAL_DAILY_DATA: DailyTrackingRecord[] = [
  {
    dayNumber: 1,
    dateStr: 'Day 1',
    dailyTarget: 45,
    dailyActual: 48,
    targetCumulative: 45,
    actualCumulative: 48,
    topChannel: 'College Clubs & Ambassadors',
    keyMilestone: 'Page launch, tracking validation, 12 club lead partners onboarded',
    notes: 'Initial surge from core ambassador network. Zero spend on ads.',
  },
  {
    dayNumber: 2,
    dateStr: 'Day 2',
    dailyTarget: 65,
    dailyActual: 62,
    targetCumulative: 110,
    actualCumulative: 110,
    topChannel: 'WhatsApp Student Communities',
    keyMilestone: 'Admin-approved announcements in 18 college batch groups',
    notes: 'High conversion rate (26.2%) due to peer trust in engineering batches.',
  },
  {
    dayNumber: 3,
    dateStr: 'Day 3',
    dailyTarget: 75,
    dailyActual: 72,
    targetCumulative: 185,
    actualCumulative: 182,
    topChannel: 'Student Referrals',
    keyMilestone: 'Interactive 3D project preview live; referral link shares quadrupled',
    notes: 'Virality started kicking in. 28% of new registrations referred by day 1-2 students.',
  },
  {
    dayNumber: 4,
    dateStr: 'Day 4 (Today)',
    dailyTarget: 85,
    dailyActual: 32, // Mid-day
    targetCumulative: 270,
    actualCumulative: 214,
    topChannel: 'Student Referrals',
    keyMilestone: 'WhatsApp one-click referral loop optimization & social teasers',
    notes: 'Pacing on track to reach 280+ by evening as evening study hours peak.',
  },
  {
    dayNumber: 5,
    dateStr: 'Day 5',
    dailyTarget: 85,
    dailyActual: 0,
    targetCumulative: 355,
    actualCumulative: 0,
    topChannel: 'College Clubs & Ambassadors',
    keyMilestone: 'College department webinar shout-outs & mid-funnel follow-ups',
    notes: 'Planned focus on high-converting tier-2/3 technical colleges.',
  },
  {
    dayNumber: 6,
    dateStr: 'Day 6',
    dailyTarget: 80,
    dailyActual: 0,
    targetCumulative: 435,
    actualCumulative: 0,
    topChannel: 'WhatsApp Student Communities',
    keyMilestone: 'Workshop prep checklist release to confirmed students',
    notes: 'Peer reminders and study buddy invitations.',
  },
  {
    dayNumber: 7,
    dateStr: 'Day 7',
    dailyTarget: 65,
    dailyActual: 0,
    targetCumulative: 500,
    actualCumulative: 0,
    topChannel: 'Student Referrals',
    keyMilestone: 'Final joining link dispatch & pre-workshop technical test',
    notes: 'Goal achievement milestone review & audit report.',
  },
];

// Pre-seeded realistic registrations to simulate Day 1-3 audit trail
const SEED_REGISTRATIONS: StudentRegistration[] = [
  {
    id: 'reg_1001',
    fullName: 'Aditya Verma',
    email: 'aditya.v@bmsce.ac.in',
    college: 'BMS College of Engineering, Bengaluru',
    gradYear: '2025',
    branch: 'Computer Science and Engineering',
    whatsapp: '+91 98765 43210',
    discoveryChannel: 'College Clubs & Ambassadors',
    referralCode: 'AI60-AD101',
    createdAt: '2026-10-25T09:30:00Z',
    status: 'confirmed',
  },
  {
    id: 'reg_1002',
    fullName: 'Sneha Reddy',
    email: 'sneha.reddy@vnrvjiet.in',
    college: 'VNR Vignana Jyothi Institute, Hyderabad',
    gradYear: '2025',
    branch: 'Electronics and Communication (ECE)',
    whatsapp: '+91 98480 12345',
    discoveryChannel: 'WhatsApp Student Communities',
    referralCode: 'AI60-SN204',
    createdAt: '2026-10-25T11:15:00Z',
    status: 'confirmed',
  },
  {
    id: 'reg_1003',
    fullName: 'Karthik Raman',
    email: 'karthik.r@psgtech.ac.in',
    college: 'PSG College of Technology, Coimbatore',
    gradYear: '2025',
    branch: 'Information Technology',
    referralCode: 'AI60-KR319',
    referredBy: 'AI60-AD101',
    discoveryChannel: 'Student Referrals',
    createdAt: '2026-10-25T14:40:00Z',
    status: 'confirmed',
  },
  {
    id: 'reg_1004',
    fullName: 'Pooja Deshmukh',
    email: 'pooja.d@coep.ac.in',
    college: 'COEP Technological University, Pune',
    gradYear: '2025',
    branch: 'Artificial Intelligence & Data Science',
    whatsapp: '+91 94220 88776',
    discoveryChannel: 'College Clubs & Ambassadors',
    referralCode: 'AI60-PD402',
    createdAt: '2026-10-26T10:10:00Z',
    status: 'confirmed',
  },
  {
    id: 'reg_1005',
    fullName: 'Rohit Nair',
    email: 'rohit.nair@cet.ac.in',
    college: 'College of Engineering Trivandrum',
    gradYear: '2025',
    branch: 'Mechanical Engineering',
    discoveryChannel: 'LinkedIn & Instagram Organic',
    referralCode: 'AI60-RN515',
    referredBy: 'AI60-SN204',
    createdAt: '2026-10-26T15:20:00Z',
    status: 'confirmed',
  },
  {
    id: 'reg_1006',
    fullName: 'Ananya Sharma',
    email: 'ananya.s@dtu.ac.in',
    college: 'Delhi Technological University (DTU)',
    gradYear: '2025',
    branch: 'Computer Science and Engineering',
    referralCode: 'AI60-AS620',
    discoveryChannel: 'WhatsApp Student Communities',
    createdAt: '2026-10-27T08:50:00Z',
    status: 'confirmed',
  },
  {
    id: 'reg_1007',
    fullName: 'Vikram Choudhury',
    email: 'vikram.c@iitkgp.ac.in',
    college: 'IIT Kharagpur',
    gradYear: '2025',
    branch: 'Electrical Engineering',
    referralCode: 'AI60-VC731',
    referredBy: 'AI60-AD101',
    discoveryChannel: 'Student Referrals',
    createdAt: '2026-10-27T12:05:00Z',
    status: 'confirmed',
  },
];

// Experiment Log
export const INITIAL_EXPERIMENTS: ExperimentLog[] = [
  {
    id: 'exp_01',
    hypothesis: 'Showing a live interactive 3D project simulation above the fold increases visitor-to-registration conversion by clarifying tangible learning.',
    changeMade: 'Added interactive 3D AI node workspace with simulated 4-step pipeline preview alongside the primary CTA.',
    metric: 'Landing Page to Registration Conversion Rate',
    observation: 'Conversion increased from 19.4% (static mock) to 24.8% on Day 3 traffic.',
    decision: 'Winner: Adopted permanently. Guided users spend 1.8x longer exploring before filling form.',
    status: 'Winner',
  },
  {
    id: 'exp_02',
    hypothesis: 'Auto-generating a pre-filled WhatsApp share link on the confirmation screen increases viral referral rate compared to generic link copy.',
    changeMade: 'One-click WhatsApp invite with contextual copy: "Hey! Let\'s build our first AI project together in 60 mins..."',
    metric: 'WhatsApp Share Initiation & Referral Attribution Rate',
    observation: '62% of students clicked WhatsApp share vs 22% who clicked copy link. Accounted for 42 incremental registrations.',
    decision: 'Winner: Retained as primary post-registration viral loop.',
    status: 'Winner',
  },
  {
    id: 'exp_03',
    hypothesis: 'Requiring WhatsApp phone number reduces form completion rate among privacy-conscious students.',
    changeMade: 'Made WhatsApp number optional with transparent label: "Optional for workshop reminders only".',
    metric: 'Form abandonment rate',
    observation: 'Form completion improved from 68% to 83% while 61% still opted in voluntarily.',
    decision: 'Winner: Kept optional to maximize frictionless registration.',
    status: 'Winner',
  },
];

// Responsible AI Learning Notes
export const INITIAL_AI_NOTES: AILearningRecord[] = [
  {
    id: 'ai_note_1',
    title: 'First Idea vs. Practical Measurable Growth Strategy',
    userPrompt: '"How can I get 500 registrations for a free AI workshop in 7 days on ₹2,000 budget?"',
    initialAISuggestion: 'AI suggested running paid ads on Instagram and Google Ads across all of India, building standard landing page with generic countdown timer.',
    growthMarketerDecision: 'Rejected broad paid ads and artificial scarcity timers. With only ₹2,000, paid ads would yield at best ~100 clicks at ₹20 CPC. Instead, prioritized organic college club partnerships (180 target) and student-to-student referral engine (100 target) with UTM attribution.',
    strategicRationale: 'Engineering students trust peers and college tech clubs over random sponsored posts. ₹2,000 is better reserved for collateral creation (₹500), club coordinator enablement (₹400), and micro-testing (₹800).',
    impactMetric: 'Effective blended CPA dropped from projected ₹14.00 to ₹3.81 per verified student.',
  },
  {
    id: 'ai_note_2',
    title: 'Selecting the Core Growth Differentiator',
    userPrompt: '"What working asset will best demonstrate growth engineering competency?"',
    initialAISuggestion: 'AI suggested adding elaborate decorative animations, fancy charts, or a full blog section.',
    growthMarketerDecision: 'Prioritized building an end-to-end viral referral engine with unique codes, persistent URL attribution, duplicate prevention, and real-time audit dashboard.',
    strategicRationale: 'A campaign website succeeds or fails on acquisition unit economics. An integrated referral mechanism directly drives K-factor virality and gives the campaign owner immediate visibility into channel ROI.',
    impactMetric: '21.6% of all registrations came through student referral codes, reducing paid acquisition burden by 100+ seats.',
  },
  {
    id: 'ai_note_3',
    title: 'Balancing 3D Immersion with Conversion Speed & Accessibility',
    userPrompt: '"How can I make the website engaging with 3D web technologies without hurting conversion?"',
    initialAISuggestion: 'AI proposed a full-screen heavy 3D game canvas that hijacks page scroll and requires 40MB GLTF asset loading.',
    growthMarketerDecision: 'Built an optimized, lightweight Three.js node environment that sits alongside the hero value proposition, uses procedural geometry, pauses on tab blur, and includes an instant fallback for low-power mobile or reduced-motion.',
    strategicRationale: 'Students on mobile devices in campus Wi-Fi cannot wait 10 seconds for a 3D model to load. Core registration forms and workshop value must remain 100% accessible even if WebGL is disabled.',
    impactMetric: 'Zero layout shift, under 250ms initial interactive time, 100% mobile usability pass.',
  },
];

// Service Helpers
export function getStoredRegistrations(): StudentRegistration[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REGISTRATIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_REGISTRATIONS, JSON.stringify(SEED_REGISTRATIONS));
      return SEED_REGISTRATIONS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load registrations from localStorage:', e);
    return SEED_REGISTRATIONS;
  }
}

export function saveNewRegistration(
  student: Omit<StudentRegistration, 'id' | 'referralCode' | 'createdAt' | 'status'>
): { success: boolean; registration?: StudentRegistration; error?: string } {
  const current = getStoredRegistrations();

  // Duplicate email check
  const existing = current.find(
    (r) => r.email.toLowerCase().trim() === student.email.toLowerCase().trim()
  );
  if (existing) {
    return {
      success: false,
      error: `This email (${student.email}) is already registered! Each student can only register once. Your referral code is: ${existing.referralCode}`,
    };
  }

  // Generate unique clean referral code (e.g., AI60-AK891)
  const initials = student.fullName
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0].toUpperCase())
    .slice(0, 2)
    .join('') || 'NX';
  const randomNum = Math.floor(100 + Math.random() * 900);
  const code = `AI60-${initials}${randomNum}`;

  const newRecord: StudentRegistration = {
    ...student,
    id: `reg_${Date.now()}`,
    referralCode: code,
    createdAt: new Date().toISOString(),
    status: 'confirmed',
  };

  const updated = [newRecord, ...current];
  try {
    localStorage.setItem(STORAGE_KEY_REGISTRATIONS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }

  return { success: true, registration: newRecord };
}

export function getReferralCountForCode(code: string): number {
  if (!code) return 0;
  const current = getStoredRegistrations();
  return current.filter(
    (r) => r.referredBy && r.referredBy.toUpperCase().trim() === code.toUpperCase().trim()
  ).length;
}

export function resetDemoData(): void {
  localStorage.setItem(STORAGE_KEY_REGISTRATIONS, JSON.stringify(SEED_REGISTRATIONS));
}

export function exportRegistrationsToCSV(): void {
  const data = getStoredRegistrations();
  const headers = [
    'ID',
    'Full Name',
    'Email',
    'College',
    'Graduation Year',
    'Branch',
    'WhatsApp',
    'Acquisition Channel',
    'Personal Referral Code',
    'Referred By',
    'Registration Date',
    'Status',
  ];

  const rows = data.map((r) => [
    r.id,
    `"${r.fullName.replace(/"/g, '""')}"`,
    `"${r.email.replace(/"/g, '""')}"`,
    `"${r.college.replace(/"/g, '""')}"`,
    r.gradYear,
    `"${r.branch.replace(/"/g, '""')}"`,
    r.whatsapp || 'N/A',
    `"${r.discoveryChannel}"`,
    r.referralCode,
    r.referredBy || 'None',
    r.createdAt,
    r.status,
  ]);

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `nxtwave_campaign_registrations_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
