import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import { DIALOG_CONTENT, RICHIE_PROMPTS } from './content';

/* Asset imports */
import logoIcon from './assets/ic_launcher.png';
import measurementsImg from './assets/Measurements.png';
import icMentalHealth from './assets/ic_mental_health_chat.png';
import icFamily from './assets/ic_family_relationships.png';
import icSymptoms from './assets/ic_symptoms_measurements.png';
import icReports from './assets/ic_medical_reports.png';
import icMedications from './assets/ic_medications.png';
import icStethoscope from './assets/ic_stethoscope.png';
/* Phone slideshow images */
import splashScreen from './assets/SplashScreenwithlogo.png';
import medicalReportsImg from './assets/Medical Reports.png';
import medicationsScreenImg from './assets/Medications.png';
import vitalsScreenImg from './assets/appScreenVitals.png';
import addSymptomImg from './assets/Add Symptom.png';
import addMeasurementImg from './assets/Add Measurement.png';

/* =============================================================
   SVG LINE ICONS
   ============================================================= */
const I = {
  dna: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="M17 6H3"/><path d="M21 18H7"/></svg>),
  scatter: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="7" cy="7" r="2"/><circle cx="17" cy="5" r="2"/><circle cx="12" cy="14" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="17" r="2"/></svg>),
  brainQ: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 1 4.83 3.7A4 4 0 0 1 19 9.5a4 4 0 0 1-1.17 6.2A5 5 0 0 1 12 22"/><path d="M12 2a5 5 0 0 0-4.83 3.7A4 4 0 0 0 5 9.5a4 4 0 0 0 1.17 6.2A5 5 0 0 0 12 22"/><circle cx="12" cy="12" r="1" fill="currentColor"/><path d="M12 15v-1.5"/></svg>),
  familyBroken: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="6" r="2.5"/><circle cx="16" cy="6" r="2.5"/><path d="M4 20v-2a4 4 0 0 1 4-4"/><path d="M20 20v-2a4 4 0 0 0-4-4"/><line x1="10" y1="14" x2="14" y2="18" strokeDasharray="2 2"/></svg>),
  brain: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 1 4.83 3.7A4 4 0 0 1 19 9.5a4 4 0 0 1-1.17 6.2A5 5 0 0 1 12 22"/><path d="M12 2a5 5 0 0 0-4.83 3.7A4 4 0 0 0 5 9.5a4 4 0 0 0 1.17 6.2A5 5 0 0 0 12 22"/><path d="M12 2v20"/></svg>),
  family: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><path d="M12 8v4"/><circle cx="6" cy="15" r="2"/><circle cx="18" cy="15" r="2"/><path d="M6 17v2"/><path d="M18 17v2"/><path d="M8 13l4-1 4 1"/></svg>),
  chart: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 16l4-6 4 4 5-8"/></svg>),
  document: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>),
  globe: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>),
  apple: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c-1.5-1.5-4-1.5-4 1 0 3 4 3 4 3s4 0 4-3c0-2.5-2.5-2.5-4-1z"/><path d="M12 7c-4 0-7 3-7 8s3 7 7 7 7-2 7-7-3-8-7-8z"/></svg>),
  pill: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 1.5l-8 8a5 5 0 0 0 7.07 7.07l8-8a5 5 0 0 0-7.07-7.07z"/><path d="M7 11l4-4"/></svg>),
  stethoscope: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12a4 4 0 0 0 4 4h1a4 4 0 0 0 4-4V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7z"/><circle cx="18" cy="12" r="2"/><path d="M18 14v3a3 3 0 0 1-3 3h-1a4 4 0 0 1-4-4"/></svg>),
  headphones: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>),
  dumbbell: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 7v10"/><path d="M18 7v10"/><path d="M3 9v6"/><path d="M21 9v6"/><path d="M6 12h12"/></svg>),
  shield: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>),
  network: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="M12 8v3"/><path d="M7.5 17l3-6"/><path d="M16.5 17l-3-6"/></svg>),
  layers: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>),
  triangle: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>),
  wind: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2"/><path d="M12.59 19.41A2 2 0 1 0 14 16H2"/><path d="M17.73 7.73A2.5 2.5 0 1 1 19.5 12H2"/></svg>),
  heartPulse: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19.5 12.572l-7.5 7.428l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572"/><path d="M4 12h4l2-4 2 6 2-3h6"/></svg>),
  lock: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>),
  eyeOff: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>),
  check: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>),
  checkCircle: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>),
  clock: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>),
  compass: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-tertiary)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>),
  rocket: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-warm)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/></svg>),
  search: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>),
  play: (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>),
  skip: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>),
  skipBack: (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg>),
  x: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round"><path d="M4 4l11.733 16h4.267l-11.733-16z"/><path d="M4 20l6.768-8.046"/><path d="M13.277 11.954L20 4"/></svg>),
  linkedin: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>),
  mail: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>),
  instagram: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="var(--text-tertiary)" stroke="none"/></svg>),
  youtube: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>),
  download: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>),
  playStore: (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M3.609 1.814L13.792 12 3.609 22.186a.996.996 0 01-.609-.92V2.734a.996.996 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 1.329c.576.333.576 1.165 0 1.498L17.698 13.663l-2.499-2.5 2.499-2.655zM5.864 2.658l10.937 6.333-2.302 2.302L5.864 2.658z"/></svg>),
  appStore: (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>),
};

/* Feature icon image map */
const FEATURE_ICON_MAP = {
  'ai-chat': icMentalHealth,
  'family-network': icFamily,
  symptoms: icSymptoms,
  reports: icReports,
  medications: icMedications,
  doctor: icStethoscope,
};

/* =============================================================
   CUSTOM HOOKS
   ============================================================= */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }); },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.sr,.sr-left,.sr-right,.sr-scale').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function CountUp({ value, suffix = '', prefix = '', decimals = 0 }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const animated = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const start = performance.now();
        const step = (now) => {
          const p = Math.min((now - start) / 2200, 1);
          setCount(parseFloat(((1 - Math.pow(1 - p, 4)) * value).toFixed(decimals)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, decimals]);
  return (<span ref={ref} className="stat-number gradient-text" style={{ fontFamily: 'var(--font-mono)' }}>{prefix}{decimals > 0 ? count.toFixed(decimals) : count}{suffix}</span>);
}

/* =============================================================
   DATA
   ============================================================= */
const PROBLEMS = [
  { title: 'Fragmented Health Data', body: 'Your health data lives across 10+ apps, paper prescriptions, and scattered doctor visits. No single system sees the full picture. In India, where most health records are still on paper, this fragmentation isn\u2019t just inconvenient. It\u2019s dangerous. When something goes wrong, critical context is lost.', stat: '73% of medical errors stem from incomplete patient information' },
  { title: 'No AI Built for Indian Health', body: 'Existing health AIs are built for Western markets. They don\u2019t understand Indian dietary patterns: dal, ghee, regional cuisines. They don\u2019t recognize Indian medication brands like Crocin or Dolo-650. They can\u2019t reason about dengue, TB, or monsoon-related health risks. They give generic advice to a population that needs deeply contextual intelligence.', stat: 'Zero health AIs are purpose-built for India\u2019s 1.4 billion people' },
  { title: 'Family Health is Invisible', body: 'Your mother\u2019s diabetes, your father\u2019s heart condition, your child\u2019s allergies. These are YOUR risk factors. In Indian families, where generations live together and health decisions are deeply interconnected, no app connects these critical hereditary dots. Until now.', stat: 'Indian families lose \u20B968,000/year to preventable health crises' },
];

const FEATURES = [
  { id: 'ai-chat', title: 'Meet Richie: AI That Actually Knows You', body: 'Not a generic chatbot. Richie reads your complete health profile (medications, symptoms, measurements, medical reports, family history, and even your local air quality) before responding. Built to understand Indian health context: from regional diseases like dengue and TB, to local medications, dietary patterns, and Ayurvedic concepts alongside modern medicine. Multi-model cascade with 15+ AI models ensures 99.9% uptime.', badges: ['India-First Health AI', 'Multi-Model Cascade', 'Auto-Fallback', 'Conversation Memory'] },
  { id: 'family-network', title: 'The World\u2019s First Family-Connected Health AI', highlight: 'PATENT-WORTHY INNOVATION. NO COMPETITOR HAS THIS.', body: 'Connect your family members. Each member\u2019s relevant health data flows securely to Richie, giving it hereditary context no other platform can match. When you ask \u201CAm I at risk for diabetes?\u201D, Richie already knows your mother has Type 2 and your BMI has been trending upward.', list: ['Relationship requests & approvals', 'Selective data sharing (AI-only)', 'Hereditary risk detection', 'Family health timeline'] },
  { id: 'symptoms', title: 'Your Body\u2019s Black Box Recorder', body: 'Log symptoms with severity, duration, and descriptions. Track measurements (blood pressure, blood sugar, weight, heart rate) over time. Richie cross-references every entry against your medications, AQI exposure, and family history to find patterns invisible to the human eye.', insight: 'A user who logs daily for 90 days gives Richie more personal health context than exists in their entire medical record history.' },
  { id: 'reports', title: 'Upload a Report. Get a Second Opinion in Seconds.', body: 'Upload any medical report (blood work, imaging, lab results) and Richie extracts key findings, flags abnormal values, and cross-references everything against your health profile and family genetics.', badges: ['Pro: Doctor Review Layer', 'Telehealth + AI Hybrid'] },
  { id: 'aqi', title: 'The Air You Breathe Is Part of Your Health Record', body: 'RichHealth.ai passively tracks your location\u2019s Air Quality Index, building a complete environmental exposure profile. Richie correlates your headaches with pollution spikes and generates long-term exposure risk assessments.', badges: ['30-Day Analytics', 'Trend Detection', 'Health Impact Categorization'], list: ['AQI (US & China standards)', 'PM2.5, PM10, O3', 'Temperature & Humidity'] },
  { id: 'health-news', title: 'Health News That Matters to Where You Live', body: 'Richie curates health news based on your location, health profile, and family conditions. When dengue outbreaks hit your city, you\u2019re the first to know. When new research emerges about a condition in your family, Richie brings it to you. No noise, no clickbait. Just health intelligence that\u2019s relevant to YOUR life, YOUR city, YOUR conditions.', badges: ['Location-Aware', 'Condition-Matched', 'Outbreak Alerts', 'Daily Digest'] },
  { id: 'nutricheck', title: 'Should I Eat This? Ask Richie.', body: 'Type any food item and get an instant, personalized recommendation. NutriCheck analyzes food against YOUR health profile: conditions, medications, allergies, blood work, and goals, with deep understanding of Indian cuisine and dietary patterns.', badges: ['Foods to Eat', 'Foods to Avoid', 'Meal Plan Ideas'] },
  { id: 'medications', title: 'Never Miss a Dose. Never Miss an Interaction.', body: 'Track every medication with full details, including Indian brands and generics. Richie uses your complete medication list when analyzing symptoms, evaluating food interactions, and providing health recommendations.' },
  { id: 'doctor', title: 'A Bridge Between You and Your Doctor', body: 'The Doctor Portal gives physicians a comprehensive view: medical history, medications, symptoms, Richie\u2019s report analyses, AQI exposure, and health alerts, all in one place. Data-rich, continuous care.', badges: ['Patient health status', 'Comprehensive profiles', 'Report verification', 'Risk scoring'] },
  { id: 'podcasts', title: 'Health Knowledge, Curated & Delivered', body: 'Access a curated library of health podcasts with full playback controls, bookmarking, and progress persistence. Building health literacy that compounds over time.' },
  { id: 'workout', title: 'Complete Fitness Tracking', body: 'Browse exercises, build custom workouts, and log history. Richie factors exercise data into health recommendations, suggesting rest, adjusting calories, correlating patterns with symptoms.' },
];

const MOAT = [
  { icon: I.brain, title: 'India-First Proprietary AI', body: 'Richie is trained on Indian medical terminology, doctor communication patterns, regional disease profiles, and local medication databases. No Western AI understands the difference between Crocin and Tylenol, or why a patient in Mumbai needs fundamentally different guidance than one in Montana.', dialogKey: 'india-first' },
  { icon: I.shield, title: 'Data Compounding Effect', body: 'Every day a user logs data, Richie gets exponentially smarter. After 90 days, switching costs become enormous. After a year, the platform holds an irreplaceable health history.', dialogKey: 'data-compounding' },
  { icon: I.network, title: 'Family Network Effect', body: 'Each family member who joins multiplies Richie\u2019s intelligence for EVERY member. A family of 4 gets 16x value through cross-referential health intelligence.', dialogKey: 'family-network' },
  { icon: I.layers, title: 'Multi-Model AI Architecture', body: '15+ AI models in a cascade fallback system. Not dependent on any single AI provider. 99.9% uptime without vendor lock-in.', dialogKey: 'multi-model' },
  { icon: I.triangle, title: 'Doctor-Patient-AI Triangle', body: 'The only platform where Richie\u2019s analysis is verified by licensed doctors, creating a trust layer that pure AI can\u2019t match.', dialogKey: 'doctor-triangle' },
  { icon: I.wind, title: 'Environmental Context Layer', body: 'GPS-tracked AQI data as a health variable is unprecedented. In India where air pollution causes 1.67M deaths annually, this feature alone is a market maker.', dialogKey: 'environmental' },
];

const STATS = [
  { value: 81.4, suffix: 'B', prefix: '$', label: 'Global digital health tracking market by 2035', decimals: 1 },
  { value: 9.9, suffix: 'B', prefix: '$', label: 'India digital health market by 2029', decimals: 1 },
  { value: 1.2, suffix: 'B', prefix: '', label: 'Smartphone users in India by 2026', decimals: 1 },
  { value: 337.9, suffix: 'B', prefix: '\u20B9', label: 'India healthcare apps market by 2026', decimals: 1 },
  { value: 1.67, suffix: 'M', prefix: '', label: 'Annual deaths from air pollution in India', decimals: 2 },
  { value: 70, suffix: 'M', prefix: '', label: 'Indian households adopting ePharmacy', decimals: 0 },
];

const PRICING = [
  { name: 'Basic', originalPrice: '\u20B91,249', price: '\u20B9999', period: '/month', usd: '~$12/mo', discount: '20% OFF', popular: false, dialogKey: 'pricing-basic', features: ['Single user', '<b>3</b> AI report analyses per month', '<b>Full</b> symptom & measurement tracking', 'Richie AI chat (standard models)', 'AQI monitoring', 'NutriCheck', 'Health news feed', 'Medication tracking'] },
  { name: 'Pro', originalPrice: '\u20B93,599', price: '\u20B92,499', period: '/month', usd: '~$30/mo', discount: '30% OFF', popular: true, dialogKey: 'pricing-pro', features: ['Up to <b>3</b> family members', '<b>20</b> AI report analyses per month', '<b>Everything in Basic</b>', 'Premium AI models (Gemini, Llama 70B+)', 'Family health network', 'Doctor connection', 'Priority support'] },
  { name: 'Ultra', originalPrice: '\u20B99,999', price: '\u20B94,999', period: '/3 months', usd: '~$60/quarter', discount: '50% OFF', popular: false, dialogKey: 'pricing-ultra', features: ['<b>6+</b> family members', '<b>100</b> AI report analyses per month', '<b>Everything in Pro</b>', 'Doctor review of AI analyses', 'Custom podcast requests', 'Dedicated health insights', 'White-glove onboarding'] },
];

const TRUST_ITEMS = [
  { icon: I.lock, img: null, title: 'End-to-End Privacy', body: 'Your health data is encrypted at rest and in transit. We never sell, share, or mine your personal health information. Your data belongs to you. Period.', cta: 'How do we protect your data?', dialogKey: 'privacy' },
  { icon: null, img: icMentalHealth, title: 'Private Mental Health Chat', body: 'Richie\u2019s mental health chat is completely private: no tracking, no profiling, no data retention beyond what you choose. A safe, culturally aware space for your most sensitive conversations.', cta: 'What is private mental health chat?', dialogKey: 'mental-health' },
  { icon: I.shield, img: null, title: 'Your Data, Your Control', body: 'Export or delete your data anytime. Granular sharing controls let you decide exactly what your family or doctors can see. Full data sovereignty, always.', cta: 'See how data control works', dialogKey: 'data-control' },
];

const ROADMAP = [
  { phase: 'Completed', icon: I.checkCircle, dotActive: true, items: ['Richie AI chat with multi-model architecture', 'Family health network', 'Symptom & measurement tracking', 'Medical report AI analyzer', 'Doctor portal & connection', 'AQI environmental monitoring', 'NutriCheck food analysis', 'Medication management', 'Health news feed', 'Health podcasts', 'Pro subscription with Razorpay'] },
  { phase: 'Next Quarter', icon: I.clock, dotActive: false, items: ['Google Fit / Samsung Health integration', 'Apple Watch + Wear OS data sync', 'Push notification health alerts', 'iOS app launch'] },
  { phase: '6 Months', icon: I.compass, dotActive: false, items: ['Insurance company API partnerships', 'Pharmacy integration', 'Lab test booking with auto-import', 'Regional language support'] },
  { phase: '12 Months', icon: I.rocket, dotActive: false, items: ['Predictive Health Engine: anticipate health risks before they happen', 'Ayushman Bharat integration', 'Hospital EHR integration', 'Mental health module', 'Pregnancy & child tracker', 'White-label B2B platform'] },
];

/* =============================================================
   FEATURE VISUAL MOCKUPS (restored original CSS mockups)
   ============================================================= */
function MockupChat() {
  return (
    <div className="mockup-chat">
      <div className="chat-msg chat-user">I've been having headaches for 3 days and my BP was 145/92 this morning</div>
      <div className="chat-msg chat-ai">
        <div className="chat-ai-label">Richie</div>
        Given your hypertension history, current BP reading, and the AQI of 156 in your area today, I recommend...
        <div className="chat-typing"><span/><span/><span/></div>
      </div>
      <div className="model-chips">
        <span className="model-chip active">Gemini 2.0 Flash</span>
        <span className="model-chip">Llama 3.3 70B</span>
        <span className="model-chip">DeepSeek V3</span>
        <span className="model-chip">Qwen 3</span>
      </div>
    </div>
  );
}

function MockupNetwork() {
  const nodes = [
    { label: 'You', angle: 0 },
    { label: 'Mom', angle: 72 },
    { label: 'Dad', angle: 144 },
    { label: 'Spouse', angle: 216 },
    { label: 'Child', angle: 288 },
  ];
  return (
    <div className="mockup-network">
      <div className="nw-ring-track" />
      <div className="nw-hub">
        <img src={logoIcon} alt="" className="nw-hub-img" loading="lazy" />
      </div>
      <div className="nw-orbit">
        {nodes.map((n, i) => (
          <div key={i} className="nw-arm" style={{ '--a': `${n.angle}deg` }}>
            <div className={`nw-node ${i === 0 ? 'nw-node-you' : ''}`}>
              <span style={{ transform: `rotate(-${n.angle}deg)` }}>{n.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockupChart() {
  const bars = [30,50,70,40,85,55,20,50,95,35,30,60];
  return (
    <div className="mockup-chart">
      <div className="chart-header">SYMPTOM SEVERITY OVER TIME</div>
      <div className="chart-bars">{bars.map((v,i)=>(<div key={i} className="chart-bar" style={{'--bar-h':`${v}%`,'--bar-c':v>70?'var(--accent-warm)':v>45?'#FFD700':'var(--accent-primary)'}}/>))}</div>
      <div className="chart-labels"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span></div>
    </div>
  );
}

function MockupUpload() {
  const steps = [{label:'Uploaded',status:'completed'},{label:'Processing',status:'completed'},{label:'AI Analysed',status:'completed'},{label:'Doctor Reviewed',status:'active'}];
  return (
    <div className="mockup-upload">
      <div className="upload-steps">{steps.map((s,i)=>(<React.Fragment key={i}>{i>0&&<div className="upload-connector"/>}<div className={`upload-step ${s.status}`}><div className="step-dot"/><span>{s.label}</span></div></React.Fragment>))}</div>
      <div className="upload-result glass-card">
        <div className="result-header">AI ANALYSIS SUMMARY</div>
        <div className="result-item"><span className="result-flag high">HIGH</span> LDL Cholesterol: 142 mg/dL</div>
        <div className="result-item"><span className="result-flag normal">NORMAL</span> HDL Cholesterol: 52 mg/dL</div>
        <div className="result-item"><span className="result-flag high">HIGH</span> Fasting Glucose: 118 mg/dL</div>
      </div>
    </div>
  );
}

function MockupAQI() {
  const bars = [30,45,70,25,50,80,35,55,20,60,40,90,30,65,45,50];
  return (
    <div className="mockup-aqi">
      <div className="aqi-display">
        <div className="aqi-circle-wrap"><div className="aqi-ring"/><div className="aqi-ring"/><div className="aqi-ring"/><div className="aqi-center">47</div></div>
        <div className="aqi-info"><span className="aqi-label">AIR QUALITY INDEX</span><span className="aqi-status good">Good</span></div>
      </div>
      <div className="aqi-bars">{bars.map((v,i)=>(<div key={i} className="aqi-bar" style={{'--h':`${v}%`,'--c':v>65?'var(--accent-warm)':v>40?'#FFD700':'var(--accent-primary)'}}/>))}</div>
    </div>
  );
}

function MockupFood() {
  return (
    <div className="mockup-food">
      <div className="food-search">{I.search}<span className="food-search-text">Paneer Butter Masala</span><span className="food-search-cursor"/></div>
      <div className="food-result glass-card">
        <div className="food-rating moderate">Moderate</div>
        <p className="food-advice">High in saturated fat. Given your cholesterol levels (LDL: 142), consider grilled paneer with reduced cream. Atorvastatin may interact with high-fat meals.</p>
      </div>
    </div>
  );
}

function MockupMeds() {
  const meds = [{name:'Atorvastatin',dose:'10mg',freq:'Daily',status:'active'},{name:'Metoprolol',dose:'50mg',freq:'Twice daily',status:'active'},{name:'Amoxicillin',dose:'500mg',freq:'3x daily',status:'completed'}];
  return (
    <div className="mockup-meds">{meds.map((m,i)=>(<div key={i} className="med-card glass-card"><div className="med-info"><div className="med-name">{m.name}</div><div className="med-details">{m.dose} &middot; {m.freq}</div></div><span className={`med-status ${m.status}`}>{m.status}</span></div>))}</div>
  );
}

function MockupDoctor() {
  return (
    <div className="mockup-doctor">
      <div className="doctor-side"><div className="doctor-label">PATIENT APP</div><div className="doctor-connect"><div className="doctor-avatar"/><span>Connect with Dr. Sharma</span></div></div>
      <div className="doctor-side"><div className="doctor-label">DOCTOR DASHBOARD</div>
        {[{name:'Amit R.',status:'good',label:'Good'},{name:'Priya S.',status:'fair',label:'Fair'},{name:'Raj K.',status:'poor',label:'Attention'}].map((p,i)=>(<div key={i} className="doctor-row"><div className={`status-dot ${p.status}`}/><span>{p.name}</span><span className="health-label">{p.label}</span></div>))}
      </div>
    </div>
  );
}

function MockupPodcast() {
  return (
    <div className="mockup-podcast">
      <div><div className="podcast-title">Understanding Hypertension</div><div className="podcast-host">Dr. Health Expert &middot; 24 min</div></div>
      <div className="podcast-progress"><div className="podcast-bar"/></div>
      <div className="podcast-controls"><span className="podcast-speed">1x</span><button className="podcast-btn" aria-label="Skip back">{I.skipBack}</button><button className="podcast-btn play-btn" aria-label="Play">{I.play}</button><button className="podcast-btn" aria-label="Skip">{I.skip}</button></div>
    </div>
  );
}

function MockupWorkout() {
  return (
    <div className="mockup-workout">
      <div className="workout-header">Push Day</div>
      {[{name:'Bench Press',sets:'4 \u00D7 12'},{name:'Shoulder Press',sets:'3 \u00D7 10'},{name:'Tricep Dips',sets:'3 \u00D7 15'},{name:'Lateral Raises',sets:'3 \u00D7 12'}].map((e,i)=>(<div key={i} className="exercise-row"><span className="exercise-name">{e.name}</span><span className="exercise-sets">{e.sets}</span></div>))}
    </div>
  );
}

function MockupNews() {
  const news = [
    { type: 'alert', label: 'ALERT', text: 'Dengue cases up 40% in your district this week' },
    { type: 'research', label: 'RESEARCH', text: 'New study links vitamin D deficiency to diabetes risk in South Asian populations' },
    { type: 'weather', label: 'ADVISORY', text: 'Heat wave warning: Peak 43\u00B0C expected tomorrow \u2014 stay hydrated' },
    { type: 'aqi', label: 'AQI', text: 'Air quality expected to reach \u201CUnhealthy\u201D levels by evening in your area' },
  ];
  return (
    <div className="mockup-news">
      <div className="news-header">HEALTH NEWS &bull; YOUR AREA</div>
      {news.map((n, i) => (
        <div key={i} className="news-item">
          <span className={`news-label ${n.type}`}>{n.label}</span>
          <span className="news-text">{n.text}</span>
        </div>
      ))}
    </div>
  );
}

const PHONE_SLIDES = [splashScreen, vitalsScreenImg, measurementsImg, medicalReportsImg, medicationsScreenImg, addSymptomImg, addMeasurementImg];

const VISUAL_MAP = {
  'ai-chat': MockupChat,
  'family-network': MockupNetwork,
  symptoms: MockupChart,
  reports: MockupUpload,
  aqi: MockupAQI,
  'health-news': MockupNews,
  nutricheck: MockupFood,
  medications: MockupMeds,
  doctor: MockupDoctor,
  podcasts: MockupPodcast,
  workout: MockupWorkout,
};

/* =============================================================
   SECTIONS
   ============================================================= */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const close = useCallback(() => setMenuOpen(false), []);
  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="container nav-inner">
        <a href="#hero" className="nav-logo" aria-label="RichHealth Home">
          <img src={logoIcon} alt="" className="nav-logo-icon" />
          <span className="nav-logo-text">RichHealth<span style={{color:'var(--accent-primary)'}}>.ai</span></span>
        </a>
        <div className={`nav-links ${menuOpen ? 'mobile-open' : ''}`}>
          <a href="#platform" onClick={close}>Platform</a>
          <a href="#moat" onClick={close}>Why Us</a>
          <a href="#pricing" onClick={close}>Pricing</a>
          <a href="#trust" onClick={close}>Privacy</a>
          <a href="#roadmap" onClick={close}>Roadmap</a>
        </div>
        <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} role="button" aria-label="Toggle menu" tabIndex={0}><span/><span/><span/></div>
      </div>
    </nav>
  );
}

function Hero() {
  const line1Words = "Your Family's".split(' ');
  const rotatingWords = ['Health.', 'Wellness.', 'Future.', 'Story.'];
  const [slideIdx, setSlideIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setSlideIdx(prev => (prev + 1) % PHONE_SLIDES.length), 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-orb" />
      <div className="dot-grid" />
      <div className="container hero-inner">
        <div className="hero-text">
          <div className="hero-badge">{I.dna}<span>Your health, Intelligently Rich</span></div>

          <h1 className="hero-headline">
            <span className="hero-line">
              {line1Words.map((w, i) => (<span key={i} className="hero-word" style={{ animationDelay: `${i * 0.12 + 0.3}s` }}>{w}</span>))}
              <span className="hero-word" style={{ animationDelay: '0.54s' }}>
                <span className="rotator-wrap"><span className="rotator-track gradient-text">{rotatingWords.map((w, i) => <span key={i}>{w}</span>)}</span></span>
              </span>
            </span>
            <span className="hero-line">
              {['AI', 'That', 'Knows'].map((w, i) => (
                <span key={i} className="hero-word gradient-text" style={{ animationDelay: `${(i + 4) * 0.12 + 0.3}s` }}>{w}</span>
              ))}
              <span className="hero-word gradient-text" style={{ animationDelay: '1.14s' }}>You.</span>
            </span>
          </h1>

          <p className="hero-sub">Meet <span className="hero-richie-highlight">Richie</span>, your personal health AI that analyzes reports, tracks symptoms, knows your family's health history, monitors your environment, and understands Indian health context like no other AI can. Powered by 15+ leading AI models.</p>

          <div className="store-buttons" style={{ animation: 'fadeInUp .7s var(--ease-spring) 1.1s both' }}>
            <a href="#contact" className="store-btn">{I.playStore}<span className="store-btn-text"><small>GET IT ON</small><span>Google Play</span></span></a>
            <a href="#contact" className="store-btn">{I.appStore}<span className="store-btn-text"><small>COMING SOON ON</small><span>App Store</span></span></a>
          </div>

          <div className="trust-strip">
            <span>Family Health Network</span>
            <span>15+ AI Models</span>
            <span>Privacy First</span>
          </div>
        </div>

        <div className="hero-phone" aria-hidden="true">
          <div className="phone-wrap">
            <div className="phone-frame">
              <div className="phone-slideshow">
                {PHONE_SLIDES.map((src, i) => (
                  <img key={i} src={src} alt="RichHealth App" className={`phone-slide ${i === slideIdx ? 'active' : ''}`} />
                ))}
              </div>
            </div>
            <div className="hero-float-hr">
              <svg viewBox="0 0 200 40" fill="none">
                <path d="M0,20 L25,20 L35,20 L42,8 L50,32 L58,14 L65,26 L72,20 L200,20" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeDasharray="300" strokeDashoffset="300">
                  <animate attributeName="stroke-dashoffset" to="0" dur="2.5s" fill="freeze" begin="1.2s" />
                </path>
              </svg>
            </div>
            <div className="hero-float-aqi"><div className="hero-float-dot" /><span>AQI: 47 · Good</span></div>
            <div className="hero-float-ai"><strong>Richie:</strong> Based on your family history...</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="problem-section" id="problem">
      <div className="dot-grid" />
      <div className="container">
        <div className="problem-header sr">
          <div className="section-label">The Problem</div>
          <h2 className="section-title">Healthcare is <span className="broken-text">{'Broken'.split('').map((c, i) => <span key={i} className="broken-letter" style={{'--i': i}}>{c}</span>)}</span> for Families</h2>
          <p className="section-subtitle">Three fundamental failures prevent families from taking control of their health. RichHealth.ai combines our proprietary India-first AI with the world's top models to solve each one.</p>
        </div>
        <div className="problem-grid">
          {PROBLEMS.map((p, i) => (
            <article key={i} className="problem-card glass-card sr" style={{ transitionDelay: `${i * 0.18}s` }}>
              <div className="problem-card-content">
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
              <div className="problem-stat">{p.stat}</div>
            </article>
          ))}
        </div>
        <div className="problem-statement sr">
          <div className="problem-statement-line"/>
          <h3>We built <span className="hero-richie-highlight">Richie</span> to solve all three. <span className="simultaneously-text gradient-text">Simultaneously.</span></h3>
          <div className="problem-statement-line"/>
        </div>
      </div>
    </section>
  );
}

function PlatformSection() {
  return (
    <section className="platform-section" id="platform">
      <div className="container">
        <div className="platform-header sr">
          <div className="section-label">The Platform</div>
          <h2 className="section-title">
            <span className="section-title-line">One Platform.</span>
            <span className="section-title-line">Complete Health{' '}
              <span className="rotator-wrap rotator-section"><span className="rotator-track gradient-text">
                <span>Intelligence.</span><span>Revolution.</span><span>Future.</span><span>Guardian.</span>
              </span></span>
            </span>
          </h2>
          <p className="section-subtitle">Every feature feeds Richie. Every data point makes your health AI smarter. A living, breathing health brain for your entire family.</p>
        </div>
        {FEATURES.map((f, i) => {
          const Visual = VISUAL_MAP[f.id];
          const isReverse = i % 2 !== 0;
          const featureImg = FEATURE_ICON_MAP[f.id];
          return (
            <div key={f.id} className={`feature-block ${isReverse ? 'reverse' : ''}`}>
              <div className={`feature-visual ${isReverse ? 'sr-right' : 'sr-left'}`}>{Visual && <Visual />}</div>
              <div className={`feature-content ${isReverse ? 'sr-left' : 'sr-right'}`}>
                {featureImg && <img src={featureImg} alt="" className="feature-icon-img" />}
                <h3>{f.title}</h3>
                {f.highlight && <div className="highlight-badge">{f.highlight}</div>}
                <p>{f.body}</p>
                {f.insight && <div className="feature-insight">{f.insight}</div>}
                {f.badges && <div className="feature-badges">{f.badges.map((b,bi)=><span key={bi} className="feature-badge">{b}</span>)}</div>}
                {f.list && <div className="feature-list">{f.list.map((item,li)=><span key={li} className="feature-list-item">{item}</span>)}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MoatSection() {
  return (
    <section className="moat-section" id="moat">
      <div className="container">
        <div className="moat-header sr">
          <div className="section-label">Why RichHealth.ai Wins</div>
          <h2 className="section-title">Six Layers of Competitive Advantage</h2>
          <p className="section-subtitle">Richie is built on a proprietary AI trained specifically for Indian health: regional diseases, local medications, doctor communication patterns, and family-first healthcare culture. Combined with five more defensive layers, RichHealth.ai becomes more valuable with every user and impossible to replicate.</p>
        </div>
        <div className="moat-grid">
          {MOAT.map((m, i) => (
            <article key={i} className="moat-card sr" style={{ transitionDelay: `${i * 0.12}s` }}>
              <div className="moat-card-header">
                <div className="moat-icon-wrap">{m.icon}</div>
                <div className="moat-number gradient-text">0{i + 1}</div>
              </div>
              <h3>{m.title}</h3>
              <p>{m.body}</p>
              <button className="explore-btn" aria-label="Learn more" onClick={() => window.dispatchEvent(new CustomEvent('openModal', { detail: m.dialogKey }))}>
                <span className="explore-circle"><span className="explore-arrow" /></span>
                <span className="explore-text">Learn More</span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarketSection() {
  return (
    <section className="market-section" id="market">
      <div className="container">
        <div className="market-header sr">
          <div className="section-label">Why It Matters</div>
          <h2 className="section-title">Health Intelligence at Scale</h2>
        </div>
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div key={i} className="stat-item sr" style={{ transitionDelay: `${i * 0.1}s` }}>
              <CountUp value={s.value} suffix={s.suffix} prefix={s.prefix} decimals={s.decimals} />
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="market-context sr">
          India alone has 1.4 billion people, most using Android, most without access to quality healthcare. RichHealth.ai is built FROM India, FOR this market, with UPI payments, regional health concerns, and pricing that scales. Developing markets in Southeast Asia, Africa, and Latin America share the exact same pain points.
          <button className="link-cta" onClick={() => window.dispatchEvent(new CustomEvent('openModal', { detail: 'market' }))}>See how RichHealth.ai helps &rarr;</button>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="pricing-section" id="pricing">
      <div className="container">
        <div className="pricing-header sr">
          <div className="section-label">Pricing</div>
          <h2 className="section-title">Plans That Scale With Your Family</h2>
        </div>
        <div className="pricing-grid">
          {PRICING.map((plan, i) => (
            <div key={i} className={`pricing-card sr ${plan.popular ? 'highlighted' : ''}`} style={{ transitionDelay: `${i * 0.15}s` }}>
              <div><div className="pricing-name">{plan.name}</div>{plan.popular && <span className="feature-badge" style={{marginTop:6,display:'inline-block'}}>MOST POPULAR</span>}</div>
              <div>
                <div className="pricing-intro-badge"><b>{plan.discount}</b></div>
                <div className="pricing-price">
                  <span className="pricing-original">{plan.originalPrice}</span>
                  <span className="pricing-amount gradient-text">{plan.price}</span>
                  <span className="pricing-period">{plan.period}</span>
                </div>
                <div className="pricing-usd">{plan.usd}</div>
              </div>
              <div className="pricing-features">{plan.features.map((f,fi)=>(<div key={fi} className="pricing-feature"><span className="pricing-check">{I.check}</span><span dangerouslySetInnerHTML={{__html: f}} /></div>))}</div>
              <button className="link-cta" onClick={() => window.dispatchEvent(new CustomEvent('openModal', { detail: plan.dialogKey }))}>See All Features &rarr;</button>
            </div>
          ))}
        </div>
        <div className="pricing-b2b sr"><strong>B2B Licensing:</strong> Enterprise health plans for corporates, insurance companies, and hospital chains. Contact us for custom pricing.</div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="trust-section" id="trust">
      <div className="container">
        <div className="trust-header sr">
          <div className="section-label">Privacy &amp; Trust</div>
          <h2 className="section-title">Your Health Data Deserves Better</h2>
          <p className="section-subtitle">We believe your most personal data should remain exactly that: personal. RichHealth.ai is built privacy-first from the ground up.</p>
        </div>
        <div className="trust-grid">
          {TRUST_ITEMS.map((t, i) => (
            <div key={i} className="trust-card sr" style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="trust-card-icon">
                {t.img ? <img src={t.img} alt="" className="trust-card-img" /> : t.icon}
              </div>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
              {t.cta && <button className="link-cta" onClick={() => window.dispatchEvent(new CustomEvent('openModal', { detail: t.dialogKey }))}>{t.cta} &rarr;</button>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoadmapSection() {
  return (
    <section className="roadmap-section" id="roadmap">
      <div className="container">
        <div className="roadmap-header sr"><div className="section-label">Roadmap</div><h2 className="section-title">What's Next</h2></div>
        <div className="roadmap-timeline">
          {ROADMAP.map((r, i) => (
            <div key={i} className="roadmap-phase sr" style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="roadmap-dot-wrap"><div className={`roadmap-dot ${r.dotActive ? 'active' : ''}`}/></div>
              <div className="roadmap-phase-title">{r.phase}</div>
              <div className="roadmap-items">{r.items.map((item, ii) => (<div key={ii} className="roadmap-item">{r.icon}<span>{item}</span></div>))}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="cta-section" id="contact">
      <div className="cta-orb"/>
      <div className="dot-grid"/>
      <div className="container cta-inner">
        <h2 className="cta-headline sr">Your family's health,<br/><span className="gradient-text">powered by Richie. AI that truly knows you.</span></h2>
        <p className="cta-sub sr">Download RichHealth.ai and let Richie start building your family's living health intelligence profile today. Available on Android now, iOS coming soon.</p>
        <div className="cta-download sr">
          <a href="#contact" className="store-btn">{I.playStore}<span className="store-btn-text"><small>GET IT ON</small><span>Google Play</span></span></a>
          <a href="#contact" className="store-btn">{I.appStore}<span className="store-btn-text"><small>COMING SOON ON</small><span>App Store</span></span></a>
        </div>
        <div className="cta-cards sr">
          <div className="cta-card"><h3>For Families</h3><p>Start tracking your health, connect family members, and let Richie build your complete health intelligence profile.</p></div>
          <div className="cta-card"><h3>For Doctors</h3><p>Register on the Doctor Portal to get a comprehensive, Richie-enhanced view of your patients with AI-powered health insights.</p></div>
          <div className="cta-card"><h3>For Enterprise</h3><p>White-label RichHealth.ai for your hospital chain, insurance company, or corporate wellness program.</p></div>
          <div className="cta-card cta-card-future"><span className="cta-card-badge">Coming Soon</span><h3>Predictive Health Engine</h3><p>Richie is learning your patterns. Soon, it won't just track your health. It will predict it. Early warnings, risk forecasts, and proactive care before you even feel symptoms.</p></div>
        </div>
        <div className="cta-contact sr">
          <button className="cta-doctor-link" onClick={() => window.dispatchEvent(new CustomEvent('openModal', { detail: 'doctor-apply' }))}>{I.stethoscope} Become a RichHealth.ai Doctor</button>
          <span className="cta-contact-sub">Review AI reports. Build your reputation. Earn equity.</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <div className="footer-logo">
            <img src={logoIcon} alt="" className="footer-logo-icon" />
            <span className="footer-logo-text">RichHealth<span style={{color:'var(--accent-primary)'}}>.ai</span></span>
          </div>
          <div className="footer-tagline">Your health, intelligently Rich</div>
        </div>
        <div className="footer-center">
          <div className="footer-stores">
            <a href="#contact" className="footer-store-btn">{I.playStore}<span>Google Play</span></a>
            <a href="#contact" className="footer-store-btn">{I.appStore}<span>App Store</span></a>
          </div>
          <div style={{marginTop:8,fontSize:'.72rem',color:'var(--text-tertiary)'}}>&copy; {new Date().getFullYear()} RichHealth.ai · All rights reserved.</div>
        </div>
        <div className="footer-links">
          <a href="https://x.com" className="footer-link" target="_blank" rel="noopener noreferrer" aria-label="X">{I.x}</a>
          <a href="https://linkedin.com" className="footer-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">{I.linkedin}</a>
          <a href="https://instagram.com" className="footer-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">{I.instagram}</a>
          <a href="https://youtube.com" className="footer-link" target="_blank" rel="noopener noreferrer" aria-label="YouTube">{I.youtube}</a>
          <a href="mailto:contact@richhealth.app" className="footer-link" aria-label="Email">{I.mail}</a>
        </div>
      </div>
    </footer>
  );
}

/* =============================================================
   MODAL DIALOG
   ============================================================= */
function Modal({ contentKey, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);
  const data = DIALOG_CONTENT[contentKey];
  if (!data) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h3 className="modal-title">{data.title}</h3>
        {data.subtitle && <p className="modal-subtitle">{data.subtitle}</p>}
        <p className="modal-body">{data.body}</p>
        {data.highlights && (
          <ul className="modal-highlights">
            {data.highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        )}
        {data.footer && <p className="modal-footer-text">{data.footer}</p>}
        <a href={data.ctaHref || '#contact'} className="btn-primary modal-cta" onClick={onClose} {...(data.ctaHref && data.ctaHref.startsWith('mailto') ? {target:'_blank', rel:'noopener noreferrer'} : {})}>{data.ctaText || 'Download RichHealth.ai'}</a>
      </div>
    </div>
  );
}

/* =============================================================
   RICHIE CHAT WIDGET
   ============================================================= */
function RichieChat({ onClose }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! I\u2019m Richie, your personal health AI by RichHealth.ai. I\u2019m built to understand your complete health picture \u2014 from medical reports to family history, from air quality to Indian dietary patterns. How can I help you today?' }
  ]);
  const [typing, setTyping] = useState(false);
  const messagesRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages, typing]);

  const handlePrompt = useCallback((prompt) => {
    setMessages(prev => [...prev, { role: 'user', text: prompt.question }]);
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: prompt.answer }]);
      setTyping(false);
    }, 1200);
  }, []);

  const availablePrompts = RICHIE_PROMPTS.filter(
    p => !messages.some(m => m.role === 'user' && m.text === p.question)
  );

  return (
    <div className="chat-overlay" onClick={onClose}>
      <div className="chat-widget" onClick={(e) => e.stopPropagation()}>
        <div className="chat-widget-header">
          <img src={logoIcon} alt="" className="chat-widget-avatar" />
          <div>
            <div className="chat-widget-name">Richie</div>
            <div className="chat-widget-status">AI Health Assistant &bull; Online</div>
          </div>
          <button className="chat-widget-close" onClick={onClose}>&times;</button>
        </div>
        <div className="chat-widget-messages" ref={messagesRef}>
          {messages.map((m, i) => (
            <div key={i} className={`chat-widget-msg ${m.role}`}>
              {m.role === 'ai' && <img src={logoIcon} alt="" className="chat-widget-msg-avatar" />}
              <div className="chat-widget-msg-text">{m.text}</div>
            </div>
          ))}
          {typing && (
            <div className="chat-widget-msg ai">
              <img src={logoIcon} alt="" className="chat-widget-msg-avatar" />
              <div className="chat-widget-msg-text"><span className="chat-widget-typing"><span/><span/><span/></span></div>
            </div>
          )}
          {availablePrompts.length > 0 && !typing && (
            <div className="chat-widget-prompts">
              {availablePrompts.map((p, i) => (
                <button key={i} className="chat-widget-prompt" onClick={() => handlePrompt(p)}>{p.question}</button>
              ))}
            </div>
          )}
        </div>
        <div className="chat-widget-input">
          <input type="text" placeholder="Download app for full access..." disabled />
          <a href="#contact" className="chat-widget-download" onClick={onClose}>Get App</a>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   MAIN APP
   ============================================================= */
function App() {
  useScrollReveal();
  const [modalKey, setModalKey] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const onOpenModal = (e) => setModalKey(e.detail);
    const onOpenChat = () => setChatOpen(true);
    window.addEventListener('openModal', onOpenModal);
    window.addEventListener('openChat', onOpenChat);
    return () => {
      window.removeEventListener('openModal', onOpenModal);
      window.removeEventListener('openChat', onOpenChat);
    };
  }, []);

  return (
    <div className="richhealth-app">
      <Navbar />
      <main>
        <Hero />
        <hr className="section-divider"/>
        <ProblemSection />
        <hr className="section-divider"/>
        <PlatformSection />
        <MoatSection />
        <hr className="section-divider"/>
        <MarketSection />
        <PricingSection />
        <hr className="section-divider"/>
        <TrustSection />
        <RoadmapSection />
        <hr className="section-divider"/>
        <CTASection />
      </main>
      <Footer />
      {!chatOpen && (
        <button className="richie-fab" onClick={() => setChatOpen(true)} aria-label="Talk to Richie">
          <img src={logoIcon} alt="Richie" className="richie-fab-img" />
          <span className="richie-fab-label">Richie</span>
        </button>
      )}
      {modalKey && <Modal contentKey={modalKey} onClose={() => setModalKey(null)} />}
      {chatOpen && <RichieChat onClose={() => setChatOpen(false)} />}
    </div>
  );
}

export default App;
