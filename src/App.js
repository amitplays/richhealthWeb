import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import { DIALOG_CONTENT, RICHIE_PROMPTS, JOBS, LEGAL } from './content';
import Premium, { Consent, SiteNav, Foot } from './Premium';
import Investors from './Investors';
import Deep from './Deep';
import Page from './Pages';

/* Asset imports */
import logoIcon from './assets/ic_launcher.png';
import icMentalHealth from './assets/ic_mental_health_chat.png';
import icFamily from './assets/ic_family_relationships.png';
import icSymptoms from './assets/ic_symptoms_measurements.png';
import icReports from './assets/ic_medical_reports.png';
import icMedications from './assets/ic_medications.png';
import icStethoscope from './assets/ic_stethoscope.png';

/* Real device screenshots */
import scrServicesLong from './assets/screens/services_hub_long.jpg';
import scrRichieDependent from './assets/screens/richie_dependent_picker.jpg';
import scrBiometric from './assets/screens/biometric_lock.jpg';
import scrHealthHubPeriod from './assets/screens/health_hub_period.jpg';

/* Real iOS device screenshots (iPhone, Liquid Glass) */
import iosRichieHome from './assets/screens/ios/ios_richie_home.jpg';
import iosFamilyChat from './assets/screens/ios/ios_family_chat.jpg';
import iosModelPicker from './assets/screens/ios/ios_model_picker.jpg';
import iosMeasurementsWatch from './assets/screens/ios/ios_measurements_watch.jpg';
import iosSymptoms from './assets/screens/ios/ios_symptoms.jpg';
import iosMedications from './assets/screens/ios/ios_medications.jpg';
import iosReports from './assets/screens/ios/ios_reports.jpg';
import iosFamily from './assets/screens/ios/ios_family.jpg';
import iosCheckin from './assets/screens/ios/ios_checkin.jpg';
import iosProfile from './assets/screens/ios/ios_profile.jpg';

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

/* =============================================================
   ANDROID-APP DRAWABLE ICONS (inlined as SVG)
   These are the same vector paths the Android app uses, so the
   website's icon language matches the product 1:1.
   ============================================================= */
const AppIcon = {
  // Translated from app/src/main/res/drawable/ic_menstrual_health.xml
  menstrual: (
    <svg viewBox="0 0 960 960" width="20" height="20" fill="currentColor" aria-hidden="true">
      <g transform="translate(0,960) scale(1,-1)">
        <path d="M119 178v302q0 127 74 225.5T382 845q-65-38-104.5-102.5T238 600q0-48 25-114.5T335 340L119 178Zm361 0q-97 117-155.5 232T266 600q0 89 62.5 151.5T480 814q89 0 151.5-62.5T694 600q0-75-58.5-190.5T480 178Zm361 0L625 341q46 77 71.5 144T722 600q0 78-39.5 142.5T578 845q115-41 189-139.5T841 480V178Z"/>
      </g>
    </svg>
  ),
  water: (
    <svg viewBox="0 0 960 960" width="20" height="20" fill="currentColor" aria-hidden="true">
      <g transform="translate(0,960) scale(1,-1)">
        <path d="M478 496Zm222 317q68-64 97.5-109t29.5-84q0-56-37-95.5T700 507q-53 0-90 39.63-37 39.62-37 94.89 0 37.85 30.94 84.84Q634.87 773.35 700 781Zm0-73q-37-42-55-71.39t-18-49.01q0-32 20.81-56.3 20.82-24.3 52-24.3Q731 507 752 531.3q21 24.3 21 56.3 0 19.62-18 49.01Q737 666 700 708ZM479.71 864Q352 864 267 776.4q-85-87.6-85-220.57Q182 463 257 351q75-112 223-241 50.88-45.09 92.44-86.29Q614 23.49 647 64q-3 6-16.17 21.95Q617.66 101.9 614 107q-27 33-60.5 68t-73.75 71Q360 309 298 404t-62 169.82q0 109.67 69.5 181.92Q375 810 479.85 810q52.43 0 96.79-19.5Q621 771 653.96 737.21q32.96-33.78 51.5-80.36Q724 610.26 724 556q0-17.62-3.5-37.31T709 479q5.96-3.55 23.5-13.5T756 452q12 28 17 54.07t5 49.93q0 132.8-85.29 220.4-85.3 87.6-213 87.6Z"/>
      </g>
    </svg>
  ),
  biotech: (
    <svg viewBox="0 0 960 960" width="20" height="20" fill="currentColor" aria-hidden="true">
      <g transform="translate(0,960) scale(1,-1)">
        <path d="M218 832v-54h204v110h-26q-76 0-127 56.5T218 478q0-55 29-101t79-68q-4-14-.5-27t12.5-24q-32-17-49-49t-17-69q0-57 40.5-96.5T410 614h312v-54H496V450h246v-54H218Zm358 364l-12 38-40-14-22 58q16 13 24 31.5t8 39.5q0 39-28 67.5T439 1708l-19 56 38 14-14 38 58 22 12-40 38 14 104-286-36-14 14-40-58-20Z"/>
      </g>
    </svg>
  ),
  family: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="7" r="2.5"/><circle cx="17" cy="9" r="2"/><path d="M3 21v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1"/><path d="M14 21v-1a3 3 0 0 1 3-3h1a3 3 0 0 1 3 3v1"/>
    </svg>
  ),
  pill: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.5 1.5l-8 8a5 5 0 0 0 7.07 7.07l8-8a5 5 0 0 0-7.07-7.07z"/><path d="M7 11l4-4"/>
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19.5 12.572l-7.5 7.428l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572"/>
    </svg>
  ),
  air: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.59 4.59A2 2 0 1 1 11 8H2"/><path d="M12.59 19.41A2 2 0 1 0 14 16H2"/><path d="M17.73 7.73A2.5 2.5 0 1 1 19.5 12H2"/>
    </svg>
  ),
  food: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11h18l-1.5 9a2 2 0 0 1-2 1.6h-11a2 2 0 0 1-2-1.6L3 11z"/><path d="M7 11V8a5 5 0 0 1 10 0v3"/>
    </svg>
  ),
  fingerprint: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 11v2a5 5 0 0 1-5 5"/><path d="M9 7a6 6 0 0 1 9 5"/><path d="M5 12a7 7 0 0 1 14 0v3"/><path d="M3 12a9 9 0 0 1 18 0"/>
    </svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0-3 3 3 3 0 0 0 1.5 2.6A3 3 0 0 0 6 18a3 3 0 0 0 3 3"/><path d="M15 4a3 3 0 0 1 3 3v1a3 3 0 0 1 3 3 3 3 0 0 1-1.5 2.6A3 3 0 0 1 18 18a3 3 0 0 1-3 3"/><path d="M12 4v17"/>
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/>
    </svg>
  ),
};

/* Feature icon image map */
const FEATURE_ICON_MAP = {
  'ai-chat': icMentalHealth,
  'family-network': icFamily,
  dependents: icFamily,
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
  { title: 'Health data lives in 10 places. Your body is one.', body: 'Reports in WhatsApp. Prescriptions in a drawer. Vitals in a wearable. Symptoms in your head. Period logs in a separate app. Your child\'s reports on your spouse\'s phone. Nothing reconciles. Doctors get a 10-minute slice of a 30-year story \u2014 and they make decisions on it. RichHealth.ai is the first platform that pulls reports, vitals, symptoms, periods, medications, dependents and family history into one encrypted graph.', stat: 'Most preventable medical errors trace back to incomplete or fragmented patient records' },
  { title: 'No health AI was built for the way Indians actually live.', body: 'Western health AIs reason about Tylenol and a 2,000-calorie diet of grilled chicken. Richie reads "Tab Crocin 650 TDS" and understands the clinical intent. It knows dal-chawal, ghee, dengue spikes in Mumbai, thyroid patterns in coastal Kerala, and PCOS prevalence among South Asian women. We built the AI from this context outward \u2014 and only then engineered it to scale globally.', stat: 'Zero global health AIs are purpose-built for India\'s 1.4 billion people' },
  { title: 'Period and family health are still treated as side features.', body: 'Half the planet menstruates. Indian families live multi-generationally and make health decisions for parents, children and dependents \u2014 yet most health apps either ignore this entirely or split it into separate, disconnected products. RichHealth.ai puts period tracking, dependents and hereditary risk on the same level as your blood work. Because they are.', stat: 'An estimated 1 in 10 to 1 in 5 Indian women live with PCOS - many diagnosed years too late.' },
];

const FEATURES = [
  { id: 'ai-chat', title: 'Meet Richie: AI That Actually Knows You', body: 'Not a generic chatbot. Before Richie says a word, it opens your record \u2014 medications, symptoms, measurements, lab reports, family history, period logs, check-ins and your local air quality. Every suggestion shows its work: tap \u201cwhy Richie suggested this\u201d and see the exact readings behind it. Pick the model you prefer \u2014 Auto, Gemini, Mistral, DeepSeek, Llama, or premium GPT-5.3 and Claude 4.5 on Pro \u2014 with automatic fallback so an answer always arrives. Built for Indian health context, and it remembers your history across conversations.', badges: ['Grounded In Your Data', 'Choose Your Model', 'Auto-Fallback', 'Remembers You'] },
  { id: 'apple-watch', title: 'Your Apple Watch Data, Finally Understood', highlight: 'HEART RATE \u00b7 SLEEP \u00b7 SpO\u2082 \u00b7 ACTIVITY \u00b7 TEMPERATURE', body: 'Your watch collects thousands of numbers a day \u2014 heart rate, resting HR, oxygen, sleep, activity, temperature \u2014 that mostly die inside a fitness app. RichHealth syncs them (Apple Health on iPhone, Google Health Connect on Android) and lets Richie read them alongside your labs, medications, symptoms and family history. So a variable heart rate isn\u2019t just a chart \u2014 it\u2019s a question Richie can actually answer, in the context of you.', list: ['Apple Watch & HealthKit sync (iPhone)', 'Google Fit / Health Connect (Android)', 'Vitals fused with labs, meds & symptoms', 'Trends read as meaning, not just graphs'] },
  { id: 'family-network', title: 'The World\u2019s First Family-Connected Health AI', highlight: 'ONE CONNECTED RECORD FOR YOUR WHOLE FAMILY', body: 'Connect your living family members. Each member\u2019s relevant health data flows securely to Richie, giving it hereditary context no other platform can match. When you ask \u201CAm I at risk for diabetes?\u201D, Richie already knows your mother has Type 2 and your BMI has been trending upward.', list: ['Relationship requests & approvals', 'Selective data sharing (AI-only)', 'Hereditary risk detection', 'Shared family health timeline'] },
  { id: 'dependents', title: 'Dependents \u2014 From a Newborn\u2019s First Day to a Parent\u2019s Last Years', highlight: 'NEWBORNS \u00B7 CHILDREN \u00B7 AGEING PARENTS \u00B7 DECEASED RELATIVES', body: 'In Indian households, one person manages health for everyone. RichHealth is built for exactly that. Add your newborn and track growth on WHO percentile charts with a personalised immunisation calendar and milestone check-ins. Add an ageing parent and get polypharmacy and fall-risk awareness. Add a deceased relative whose hereditary data still matters. Richie keeps a fully separate, caregiver-aware health graph for each \u2014 always knowing whose body it\u2019s reasoning about.', list: ['Newborns: WHO growth percentiles + vaccine reminders', 'Children: paediatric reference ranges & milestones', 'Elders: polypharmacy & fall-risk awareness', '\u201CGraduate\u201D a child\u2019s profile into their own account'] },
  { id: 'genetics', title: 'Hereditary Risk Engine', body: 'You enter what you know \u2014 parents\u2019 conditions, grandparents\u2019 diagnoses, siblings\u2019 history, hereditary patterns from deceased relatives. Richie cross-references that genetic context against your own labs, vitals, symptoms and lifestyle to produce a real, grounded hereditary risk profile. Not horoscopes. A risk map specific to your bloodline.', insight: 'South Asian populations carry distinct genetic predispositions for diabetes, cardiac disease, PCOS and thyroid disorders. Richie weights for them. Western health AIs do not.', badges: ['Family History Graph', 'South Asian Risk Weighting', 'Reproductive Hereditary Signals'] },
  { id: 'period', title: 'Period & Cycle Intelligence', highlight: 'INTEGRATED, PRIVATE, INDIA-AWARE', body: 'Most period apps live in a silo \u2014 they predict the next cycle and stop there. Richie cross-references every period log with your thyroid panel, your iron levels, your stress, your medications, and your family\u2019s hereditary patterns. PCOS, endometriosis, early menopause \u2014 flagged when the data actually supports it.', list: ['Flow intensity, pain level, duration logging', 'Cycle prediction grounded in your real logs', 'PCOS / endometriosis pattern detection', 'Available for you and any female dependent'] },
  { id: 'council', title: 'AI Council \u2014 A Panel of Perspectives, Reconciled', highlight: 'PRO & ULTRA', body: 'On Pro and Ultra, an important question isn\u2019t answered once. Richie runs a council \u2014 several expert perspectives (a cardiometabolic lens, a behavioural-and-adherence lens, a holistic lifestyle lens) reason over your data in parallel, then Richie reconciles them into a single, grounded takeaway. You see both the individual takes and the synthesis. It\u2019s a second, third and fourth opinion on your own health data \u2014 automatically.', badges: ['Multiple Perspectives', 'Reconciled by Richie', 'You See The Reasoning', 'Premium Models'] },
  { id: 'symptoms', title: 'Your Body\u2019s Black Box Recorder', body: 'Log symptoms with severity, duration, and notes. Track vitals \u2014 blood pressure, blood sugar, weight, heart rate, SpO\u2082, temperature \u2014 over time. Richie cross-references every entry against your medications, AQI exposure, cycle and family history to find patterns invisible to the human eye.', insight: 'A user who logs daily for 90 days gives Richie more personal health context than exists in their entire medical record history.' },
  { id: 'checkin', title: 'Daily & Weekly Health Check-Ins', body: 'A guided two-minute flow asks the questions a thoughtful doctor would \u2014 energy, sleep, mood, pain, hydration, exercise, bowel health, stress. Optional fingerprint or face unlock keeps the data private on shared devices. The result is a longitudinal record Richie correlates against everything else.', badges: ['Adaptive Questions', 'Weekly on Pro', 'Every 3 Days on Ultra', 'Biometric Lock'] },
  { id: 'reports', title: 'Upload Any Lab. Understand It, and Track Every Number Over Years.', body: 'Upload any medical report \u2014 blood work, imaging, lab results, discharge summaries \u2014 and Richie extracts key findings, flags abnormal values, and cross-references everything against your health profile, your medications and your family\u2019s hereditary conditions.', badges: ['AI Analysis', 'Biomarker Trends Over Time', 'Ultra: Doctor Review'] },
  { id: 'health-hub', title: 'Health Hub \u2014 Your Mission Control', body: 'The second tab of the app \u2014 the single screen where every vital, every report, every medication, every symptom, every cycle log and every dependent\u2019s data converges. Designed to feel less like a health app and more like the dashboard of a high-end car: dense, calm, in control.', list: ['Unified vitals at a glance', 'One-tap entry to every tool', 'Trend lines & anomaly markers', 'Tier-tuned quick actions'] },
  { id: 'aqi', title: 'The Air You Breathe Is Part of Your Health Record', body: 'RichHealth.ai passively tracks your location\u2019s Air Quality Index, building a complete environmental exposure profile. Richie correlates your headaches with pollution spikes and generates long-term exposure risk assessments.', badges: ['30-Day Analytics', 'Trend Detection', 'Health Impact Scoring'], list: ['AQI (US & China standards)', 'PM2.5, PM10, O\u2083', 'Temperature & Humidity'] },
  { id: 'health-news', title: 'Health News That Matters to Where You Live', body: 'Richie curates health news based on your location, health profile, and family conditions. When dengue outbreaks hit your city, you\u2019re the first to know. When new research emerges about a condition in your family, Richie brings it to you. No noise. No clickbait.', badges: ['Location-Aware', 'Condition-Matched', 'Outbreak Alerts', 'Daily Digest'] },
  { id: 'nutricheck', title: 'NutriCheck \u2014 Should I Eat This? Ask Richie.', body: 'Type a dish or scan a packaged-food barcode and get an instant, personalised verdict. NutriCheck weighs the food against YOUR profile \u2014 conditions, medications, allergies, blood work and goals \u2014 with deep understanding of Indian cuisine and regional staples. Barcode scanning reads real ingredient and nutrition data from Open Food Facts, so \u201cis this okay for me?\u201d has an honest answer in seconds.', badges: ['Scan Any Barcode', 'Foods to Eat / Avoid', 'Allergy & Med Aware', 'Indian Cuisine Native'] },
  { id: 'medications', title: 'Never Miss a Dose. Understand Every Medicine.', body: 'Track every medication \u2014 including Indian brands and generics like Crocin, Dolo-650, Shelcal and Thyronorm. Smart reminders nudge you at the right time; log each dose as Taken, Missed or Snoozed and watch your adherence build. Richie reads your full medication list when analysing symptoms and food, and surfaces safety flags \u2014 dosage, warnings and recalls \u2014 drawn from public FDA labels and India\u2019s national Drug Registry. Manage a dependent\u2019s medicines from the same place.', badges: ['Dose Reminders', 'Adherence Tracking', 'Brand \u2192 Generic', 'Public Safety Flags'] },
  { id: 'doctor', title: 'A Bridge Between You and Your Doctor', body: 'Connect a doctor and share exactly what you choose. The Doctor Portal gives them a comprehensive, consented view: medical history, medications, symptoms, your uploaded reports, AQI exposure and health alerts \u2014 all in one place, so a 10-minute visit starts from your whole story instead of a blank page.', badges: ['Consent-Based Sharing', 'Comprehensive Profiles', 'Health Alerts', 'Risk Signals'] },
  { id: 'open-data', title: 'Smarter Every Release \u2014 On Open Medical Data', highlight: 'FREE, TRUSTED, FOR EVERYONE', body: 'RichHealth gets sharper without you doing a thing. We wire in trusted public data: WHO child-growth standards for percentile tracking, openFDA and India\u2019s Drug Registry for medicine safety, Open Food Facts for barcodes, MedlinePlus for plain-language explanations of every lab and diagnosis, and OpenAQ for street-level air quality. When Richie explains a result or flags a risk, it can stand on a real, citable source.', badges: ['WHO Growth Standards', 'FDA / Drug Registry', 'MedlinePlus Explanations', 'Research-Backed'] },
  { id: 'podcasts', title: 'Health Knowledge, Curated & Delivered', body: 'A curated library of health podcasts with full playback controls, bookmarking and progress persistence. Ultra users can request custom episodes on the topics that matter to their family.' },
  { id: 'workout', title: 'Complete Fitness Tracking', body: 'Browse exercises, build custom workouts, and log history. Richie factors exercise data into health recommendations \u2014 suggesting rest, adjusting calories, correlating patterns with symptoms and cycle.' },
];

const MOAT = [
  { icon: I.brain, title: 'India-First AI', body: 'Most "global" health AIs are trained on American charts and translated for everyone else. Richie is the inverse \u2014 built on Indian prescriptions, brand names like Crocin and Dolo-650, regional disease patterns, doctor handwriting and dietary context. Then engineered to scale to the rest of the world from that foundation.', dialogKey: 'india-first' },
  { icon: I.shield, title: 'Data Compounds. Lock-In Doesn\'t.', body: 'Every report, symptom, vital, period log and check-in deepens Richie\'s understanding of you. After 90 days, no other app can match the context. After a year, the value is irreplaceable \u2014 and you can still export or delete every byte of it. The moat is genuine usefulness, not friction.', dialogKey: 'data-compounding' },
  { icon: I.network, title: 'Family Network Effect', body: 'One person logs. The whole family gets smarter. A family of four produces roughly 16\u00d7 the cross-referential signal of one isolated user \u2014 hereditary risk, shared environment, caregiver oversight. No other health app connects families like this.', dialogKey: 'family-network' },
  { icon: I.layers, title: 'A Council, Not One Answer', body: 'On Pro and Ultra, important questions are answered by a panel of expert perspectives \u2014 reasoning over your data in parallel, then reconciled by Richie into one grounded takeaway you can actually see the working behind. Premium models and automatic fallback keep it resilient even when one is down.', dialogKey: 'multi-model' },
  { icon: I.triangle, title: 'Doctor-Ready, Not Doctor-Replaced', body: 'AI on its own is a liability in healthcare. RichHealth keeps a clinician in the loop: connect your doctor and share exactly what you choose, so they start from your whole story. Richie helps you understand and prepare \u2014 it never pretends to be the physician.', dialogKey: 'doctor-triangle' },
  { icon: I.wind, title: 'Environment as a Health Variable', body: 'Your AQI exposure isn\'t lifestyle metadata \u2014 it\'s a clinical input. Richie correlates pollution spikes with your symptoms, weights long-term exposure into risk scoring, and surfaces local outbreak alerts. In a country where air kills 1.67M people a year, this isn\'t a feature. It\'s a category.', dialogKey: 'environmental' },
];

const STATS = [
  { value: 107, suffix: 'B', prefix: '$', label: 'India digital health market by 2033, ~25% CAGR (Grand View Research)', decimals: 0 },
  { value: 101, suffix: 'M', prefix: '', label: 'Indians living with diabetes; 136M more pre-diabetic (ICMR-INDIAB, Lancet 2023)', decimals: 0 },
  { value: 1.5, suffix: 'M', prefix: '', label: 'Annual deaths in India linked to PM2.5 air pollution (Lancet Planetary Health, 2024)', decimals: 1 },
  { value: 1, suffix: 'B+', prefix: '', label: 'Health records linked to ABHA under India’s digital health mission, ABDM (2026)', decimals: 0 },
  { value: 50, suffix: '%', prefix: '', label: 'Chronic patients who don’t take medication as prescribed (WHO)', decimals: 0 },
  { value: 20, suffix: '%', prefix: '', label: 'Share of India aged 60+ by 2050 — outnumbering children (UNFPA, 2023)', decimals: 0 },
];

const PRICING = [
  { name: 'Plus', originalPrice: '\u20B91,249', price: '\u20B9999', period: '/3 months', perMonth: '\u20B9333/mo equivalent', usd: '~$12 / 3 mo', discount: '20% OFF', popular: false, dialogKey: 'pricing-plus', features: ['<b>5</b> medical report uploads / mo', '<b>5</b> AI health analyses / mo', '<b>10</b> NutriCheck meals / mo', 'Richie AI chat (standard models, 25 msgs/session)', '<b>1</b> dependent profile', 'Period & cycle tracker', 'Full symptom & vitals tracking', 'AQI monitoring \u00B7 Medication reminders'] },
  { name: 'Pro', originalPrice: '\u20B93,599', price: '\u20B92,499', period: '/3 months', perMonth: '\u20B9833/mo equivalent', usd: '~$30 / 3 mo', discount: '30% OFF', popular: true, dialogKey: 'pricing-pro', features: ['<b>Everything in Plus</b>', '<b>AI Council</b> \u2014 multiple perspectives, reconciled', '<b>10</b> reports & <b>10</b> health analyses / mo', '<b>20</b> NutriCheck meals / mo', 'Premium AI models, 50 msgs/session', 'Up to <b>2</b> dependents', 'Hereditary risk engine', 'Weekly health check-ins', 'Doctor connections & sharing'] },
  { name: 'Ultra', originalPrice: '\u20B99,999', price: '\u20B94,999', period: '/12 months', perMonth: '\u20B9417/mo equivalent', usd: '~$60 / year', discount: '50% OFF', popular: false, dialogKey: 'pricing-ultra', features: ['<b>Everything in Pro</b>', '<b>Unlimited</b> AI report analyses', '<b>Unlimited</b> NutriCheck meals', 'All premium models, 100 msgs/session', 'Up to <b>5</b> dependents & <b>5</b> family members', 'Priority Doctor Portal sharing', 'Check-ins every 3 days', 'Newborn growth & vaccine tracking', 'White-glove onboarding'] },
];

const TRUST_ITEMS = [
  { icon: I.lock, img: null, title: 'Encrypted on every layer that touches your body.', body: 'TLS 1.3 in transit. AES-256 at rest. Reports stored in segregated, access-controlled object storage with request-level audit logs. We assume breaches are not impossible \u2014 and design like a security team that has lived through one.', cta: 'Read the full security model', dialogKey: 'privacy' },
  { icon: null, img: icMentalHealth, title: 'What you tell Richie stays yours.', body: 'You control Richie\u2019s memory and whether your data helps improve the model \u2014 both are switches in the app, and you can turn them off. Sensitive conversations aren\u2019t mined for advertising or behavioural profiling. Private by default, transparent by design.', cta: 'How your AI settings work', dialogKey: 'mental-health' },
  { icon: I.shield, img: null, title: 'Your account is yours to close. One tap.', body: 'Delete your account and wipe your personal identifiers from inside the app, instantly. Ask us to export or fully erase your records and we honour it. Granular, per-record sharing controls decide exactly what Richie, your family, dependents or a doctor can see.', cta: 'How data control works', dialogKey: 'data-control' },
  { icon: I.eyeOff, img: null, title: 'We do not sell, share, or monetise your health data. Ever.', body: 'No advertising network. No data broker. No insurer pre-feed. No employer wellness scoring. Selling personal health data is the precise opposite of why this product exists \u2014 and the business model is built around making sure we never need to.', cta: 'See what we never do with your data', dialogKey: 'privacy' },
];

const ROADMAP = [
  { phase: 'Shipped', icon: I.checkCircle, dotActive: true, items: ['Native iPhone app (iOS 26 Liquid Glass)', 'Apple Watch app', 'Native Android app', 'Apple Health & Google Health Connect sync', 'Richie AI chat — grounded, with model picker', 'Family network + shared Pro across the family', 'Multimodal Health Check-Ins', 'Vision-read medical reports', 'NutriCheck · AQI · Doctor Portal', 'Medication reminders & adherence', 'StoreKit, Google Play & Razorpay billing'] },
  { phase: 'Now Rolling Out', icon: I.clock, dotActive: true, items: ['Barcode food scanning (Open Food Facts)', 'Medicine safety flags (openFDA + India Drug Registry)', 'Newborn growth percentiles (WHO) + vaccine calendar', 'Plain-language lab & diagnosis explainers (MedlinePlus)', 'Research-cited answers (PubMed / OpenAlex)'] },
  { phase: 'Next', icon: I.compass, dotActive: false, items: ['Regional language support', 'Lab-test booking with auto-import', 'Pharmacy integration', 'Deeper wearable metrics — sleep stages, HRV', 'Local outbreak alerts by district (IDSP)'] },
  { phase: 'Horizon', icon: I.rocket, dotActive: false, items: ['Predictive Health Engine: early risk forecasts', 'ABDM / Ayushman Bharat interoperability', 'Hospital EHR integration (FHIR)', 'Pregnancy & child-development tracker', 'White-label B2B platform'] },
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
        <span className="model-chip active">Auto</span>
        <span className="model-chip">Gemini</span>
        <span className="model-chip">DeepSeek R1</span>
        <span className="model-chip">Llama 3.3</span>
        <span className="model-chip">GPT-5.3 · Pro</span>
        <span className="model-chip">Claude 4.5 · Pro</span>
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

function MockupDependents() {
  const deps = [
    { name: 'Aarav (Son · 7y)', tag: 'CHILD', color: 'good', detail: 'Vitamin D · 28 ng/mL' },
    { name: 'Mom (62y)', tag: 'ELDER', color: 'fair', detail: 'BP 138/86 · 4 meds' },
    { name: 'Dadaji', tag: 'DECEASED', color: 'poor', detail: 'Cardiac · hereditary' },
  ];
  return (
    <div className="mockup-doctor">
      <div className="doctor-side" style={{flex:1}}>
        <div className="doctor-label">DEPENDENTS</div>
        {deps.map((d,i)=>(
          <div key={i} className="doctor-row">
            <div className={`status-dot ${d.color}`}/>
            <span style={{fontSize:'.78rem'}}>{d.name}</span>
            <span className="health-label">{d.tag}</span>
          </div>
        ))}
        <div style={{marginTop:8,fontSize:'.7rem',color:'var(--text-tertiary)'}}>Caregiver-aware Richie · separate health graphs</div>
      </div>
    </div>
  );
}

function MockupGenetics() {
  const risks = [
    { label: 'Type 2 Diabetes', level: 'HIGH', pct: 78 },
    { label: 'Hypertension', level: 'MOD', pct: 54 },
    { label: 'Hypothyroidism', level: 'MOD', pct: 46 },
    { label: 'Cardiac (early)', level: 'LOW', pct: 22 },
  ];
  return (
    <div className="mockup-chart">
      <div className="chart-header">HEREDITARY RISK MAP · YOU</div>
      {risks.map((r,i)=>(
        <div key={i} className="med-card glass-card" style={{marginBottom:8}}>
          <div className="med-info">
            <div className="med-name">{r.label}</div>
            <div className="med-details">From: parents + grandparents · weighted for South Asian genetics</div>
          </div>
          <span className={`med-status ${r.level==='HIGH'?'active':r.level==='MOD'?'active':'completed'}`}>{r.level} · {r.pct}%</span>
        </div>
      ))}
    </div>
  );
}

function MockupPeriod() {
  return (
    <div className="mockup-period-wrap">
      <div className="mockup-period-frame">
        <img src={scrHealthHubPeriod} alt="Period History inside Health Hub" className="mockup-period-img" />
      </div>
      <div className="mockup-period-caption">
        <span className="mockup-period-icon">{AppIcon.menstrual}</span>
        <span>Period History sits next to BP and glucose — not in a separate app.</span>
      </div>
    </div>
  );
}

function MockupCouncil() {
  const models = [
    { name: 'Gemini 2.0', verdict: 'Likely iron-deficiency anaemia. Suggest ferritin + B12 panel.' },
    { name: 'GPT-5.3', verdict: 'Concur. Add thyroid panel — TSH trending up over 6 months.' },
    { name: 'Claude 4.5', verdict: 'Concur. Flag PCOS markers given cycle irregularity + LH/FSH.' },
  ];
  return (
    <div className="mockup-chat">
      <div className="chat-msg chat-user">Why have I been feeling exhausted for 6 weeks?</div>
      {models.map((m,i)=>(
        <div key={i} className="chat-msg chat-ai" style={{padding:'10px 14px'}}>
          <div className="chat-ai-label">{m.name}</div>
          <div style={{fontSize:'.78rem'}}>{m.verdict}</div>
        </div>
      ))}
      <div className="model-chips">
        <span className="model-chip active">Consensus</span>
        <span className="model-chip">Order: ferritin · B12 · TSH · LH/FSH</span>
      </div>
    </div>
  );
}

function MockupCheckIn() {
  const qs = [
    { q: 'Energy today (1–10)', a: '7' },
    { q: 'Sleep last night', a: '6h 40m' },
    { q: 'Mood', a: 'Steady' },
    { q: 'Pain anywhere?', a: 'Lower back · 3' },
    { q: 'Hydration', a: '~2.4 L' },
  ];
  return (
    <div className="mockup-meds">
      {qs.map((x,i)=>(
        <div key={i} className="med-card glass-card">
          <div className="med-info">
            <div className="med-name">{x.q}</div>
            <div className="med-details">{x.a}</div>
          </div>
          <span className="med-status active">logged</span>
        </div>
      ))}
    </div>
  );
}

function MockupHealthHub() {
  const tiles = [
    { l: 'BP', v: '124/82' },
    { l: 'Sugar', v: '96 mg/dL' },
    { l: 'HR', v: '72 bpm' },
    { l: 'SpO₂', v: '98%' },
    { l: 'Weight', v: '74.2 kg' },
    { l: 'Temp', v: '36.7°C' },
  ];
  return (
    <div className="mockup-meds" style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
      {tiles.map((t,i)=>(
        <div key={i} className="med-card glass-card" style={{flexDirection:'column',alignItems:'flex-start',padding:'10px 12px'}}>
          <div className="med-details" style={{fontSize:'.65rem',letterSpacing:'.08em',textTransform:'uppercase'}}>{t.l}</div>
          <div className="med-name" style={{fontSize:'1.05rem'}}>{t.v}</div>
        </div>
      ))}
    </div>
  );
}

/* Each slide can be { src, tall } — tall slides auto-scroll while active.
   Curated, deduplicated set covering: Services, Health Hub, Richie council, Period, NutriCheck, Health Analysis, Biometric. */
const PHONE_SLIDES = [
  { src: iosRichieHome, tall: false },          // Richie home — grounded suggestions ("why Richie suggested this")
  { src: iosMeasurementsWatch, tall: false },   // Measurements — Apple Watch data fused with manual
  { src: iosCheckin, tall: false },             // Multimodal Health Check-In watchlist
  { src: iosFamily, tall: false },              // Family — connections + Covered/Pro
  { src: iosFamilyChat, tall: false },          // Family health chat picker (You / papa / Vineet)
  { src: iosModelPicker, tall: false },         // Choose your model
  { src: iosMedications, tall: false },         // Medications
  { src: iosSymptoms, tall: false },            // Symptoms with severity
  { src: iosReports, tall: false },             // Medical reports — vision-read
  { src: iosProfile, tall: false },             // Profile — AI & privacy settings
];

const VISUAL_MAP = {
  'ai-chat': MockupChat,
  'apple-watch': MockupHealthHub,
  'open-data': MockupNews,
  'family-network': MockupNetwork,
  dependents: MockupDependents,
  genetics: MockupGenetics,
  period: MockupPeriod,
  council: MockupCouncil,
  symptoms: MockupChart,
  checkin: MockupCheckIn,
  reports: MockupUpload,
  'health-hub': MockupHealthHub,
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
/* Hero phone slide — measures overflow exactly so tall screenshots
   scroll just to the bottom and back, never beyond. */
function HeroSlide({ src, tall, active }) {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);
  const [overflow, setOverflow] = useState(0);
  const measure = useCallback(() => {
    const img = imgRef.current;
    const wrap = wrapRef.current;
    if (!img || !wrap || !img.naturalWidth) return;
    const rendered = img.naturalHeight * (wrap.clientWidth / img.naturalWidth);
    setOverflow(Math.max(0, rendered - wrap.clientHeight));
  }, []);
  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);
  const style = tall && overflow > 0 ? { '--overflow': `-${overflow}px` } : {};
  return (
    <div
      ref={wrapRef}
      className={`phone-slide-wrap ${active ? 'active' : ''} ${tall ? 'is-tall' : ''}`}
      style={style}
    >
      <img ref={imgRef} src={src} alt="RichHealth App" className="phone-slide" onLoad={measure} />
    </div>
  );
}

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
          <a href="#inside" onClick={close}>The App</a>
          <a href="#moat" onClick={close}>Why Us</a>
          <a href="#pricing" onClick={close}>Pricing</a>
          <a href="#trust" onClick={close}>Privacy</a>
          <a href="#/careers" onClick={close}>Careers</a>
        </div>
        <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setMenuOpen(!menuOpen); } }} role="button" aria-label="Toggle menu" aria-expanded={menuOpen} tabIndex={0}><span/><span/><span/></div>
      </div>
    </nav>
  );
}

function Hero() {
  const line1Words = "Your Family's".split(' ');
  const rotatingWords = ['Health.', 'Wellness.', 'Future.', 'Story.'];
  const [slideIdx, setSlideIdx] = useState(0);
  useEffect(() => {
    // Tall slides linger longer so the auto-scroll animation can finish
    const dwell = PHONE_SLIDES[slideIdx].tall ? 7500 : 4500;
    const timer = setTimeout(() => setSlideIdx((slideIdx + 1) % PHONE_SLIDES.length), dwell);
    return () => clearTimeout(timer);
  }, [slideIdx]);

  return (
    <section className="hero" id="hero">
      <div className="hero-orb" />
      <div className="dot-grid" />
      <div className="container hero-inner">
        <div className="hero-text">
          <div className="hero-badge">{I.dna}<span>Your family's health, intelligently Rich.</span></div>

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

          <p className="hero-sub">Meet <span className="hero-richie-highlight">Richie</span> — your family's personal health AI. It reads your lab reports, turns your Apple Watch vitals into meaning, tracks symptoms, medications, periods and check-ins, and manages dependents — children, ageing parents, even a newborn — under one account. Every answer starts from your own record. Native on <b>iPhone, Apple Watch and Android</b>.</p>

          <div className="store-buttons" style={{ animation: 'fadeInUp .7s var(--ease-spring) 1.1s both' }}>
            <a href="#contact" className="store-btn">{I.playStore}<span className="store-btn-text"><small>GET IT ON</small><span>Google Play</span></span></a>
            <a href="#contact" className="store-btn">{I.appStore}<span className="store-btn-text"><small>DOWNLOAD ON THE</small><span>App Store</span></span></a>
          </div>

          <div className="trust-strip">
            <span>iPhone · Watch · Android</span>
            <span>Apple Watch, Understood</span>
            <span>Whole-Family Care</span>
            <span>Privacy First</span>
          </div>
        </div>

        <div className="hero-phone" aria-hidden="true">
          <div className="phone-wrap">
            <div className="phone-frame">
              <div className="phone-slideshow">
                {PHONE_SLIDES.map((s, i) => (
                  <HeroSlide key={i} src={s.src} tall={s.tall} active={i === slideIdx} />
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
          <p className="section-subtitle">Three fundamental failures sit between Indian families and continuous, intelligent care. We built Richie — and the platform around it — to fix all three at once.</p>
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

/* =============================================================
   FOUR TABS — what the app actually looks like inside.
   Mirrors the real bottom-nav structure of the Android app:
   Richie · Health Hub · Services · Profile.
   Each tab gets a real screenshot (tall ones auto-scroll exactly
   to their overflow, no over-scroll), a calm explanation, and
   bullets that use the same icon language as the app drawables.
   ============================================================= */
const TABS = [
  {
    id: 'richie',
    tab: 'Richie',
    img: scrRichieDependent,
    tall: false,
    title: 'Richie — the AI that asks who you’re asking for first.',
    body: 'Open Richie and the first decision is whose body you’re reasoning about. Yourself, a child you manage, an ageing parent. Richie loads the right health graph, swaps in caregiver-aware reasoning, applies paediatric or geriatric reference ranges, and starts with a usage counter and tier — no surprises.',
    bullets: [
      { icon: AppIcon.brain, text: 'Dependent picker is part of the chat header — not buried in settings.' },
      { icon: AppIcon.heart, text: 'On Pro and Ultra, an AI council reconciles multiple frontier models before answering.' },
      { icon: AppIcon.doc, text: 'Suggested prompts adapt to whose profile is loaded — not the same generic five.' },
    ],
  },
  {
    id: 'health-hub',
    tab: 'Health Hub',
    img: scrHealthHubPeriod,
    tall: false,
    title: 'Health Hub — every record, every metric, one place.',
    body: 'The Health Hub splits into Daily Tracking and Health Records. Symptoms, Measurements and Period History live next to Medical Reports, Medications and Family Health. Encrypted in transit and at rest, private to you — and you reach any of the six surfaces in one tap.',
    bullets: [
      { icon: AppIcon.heart, text: 'Symptoms, vitals and cycle logging are first-class daily surfaces.' },
      { icon: AppIcon.menstrual, text: 'Period History sits beside BP and glucose — never siloed in a separate app.' },
      { icon: AppIcon.family, text: 'Family Health stores hereditary conditions across living and deceased relatives.' },
    ],
  },
  {
    id: 'services',
    tab: 'Services',
    img: scrServicesLong,
    tall: true,
    title: 'Services — your daily decision surface.',
    body: 'A long, deliberate scroll: Health Analysis on top, then your active plan, today’s Health Advisory rewritten as advice (not just an AQI number), Health Check-In, Diet Guide, NutriCheck, Find a Doctor, Log Workout, Exercises, and a Health Intel feed of sourced, personalised news matched to the conditions on your profile. The whole tab is one continuous answer to “what should I do today?”.',
    bullets: [
      { icon: AppIcon.air, text: 'Health Advisory rewrites today’s air quality and pollen into a personal action.' },
      { icon: AppIcon.food, text: 'NutriCheck and Diet Guide share the same dietary ledger Richie reads from.' },
      { icon: AppIcon.water, text: 'Health Check-In tracks behaviour wearables can’t — sleep, hydration, stress, mood, cycle.' },
    ],
  },
  {
    id: 'profile',
    tab: 'Profile',
    img: scrBiometric,
    tall: false,
    title: 'Profile — privacy you can actually defend.',
    body: 'Optional fingerprint or face unlock on app open. Per-record share controls. Granular consent over what Richie can see and what your family or doctors can. Export everything. Delete everything. Health records belong on a tier above WhatsApp messages, and the Profile tab is where that promise becomes settings you control.',
    bullets: [
      { icon: AppIcon.fingerprint, text: 'Biometric lock — fingerprint or face — survives screenshots and shared phones.' },
      { icon: AppIcon.family, text: 'Per-record sharing toggles for family, dependents and doctor connections.' },
      { icon: AppIcon.doc, text: 'Close your account and wipe your identifiers in one tap; request a full export or erase anytime.' },
    ],
  },
];

function FourTabsSection() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const len = TABS.length;

  useEffect(() => {
    if (paused) return undefined;
    const dwell = TABS[idx].tall ? 10000 : 7000;
    const t = setTimeout(() => setIdx((idx + 1) % len), dwell);
    return () => clearTimeout(t);
  }, [idx, paused, len]);

  const slide = TABS[idx];

  return (
    <section className="tabs-section" id="inside" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container">
        <div className="tabs-header sr">
          <div className="section-label">The App</div>
          <h2 className="section-title">Four tabs. One continuous health graph.</h2>
          <p className="section-subtitle">The bottom navigation is intentional. Richie is where you ask. Health Hub is where you record. Services is where you act. Profile is where you control. Every tap in one tab updates context every other tab can read. <span style={{color:'var(--text-tertiary)'}}>Shown on Android — the same four tabs ship on iPhone and Apple Watch.</span></p>
        </div>

        <div className="tabs-stage">
          <div className="tabs-rail">
            {TABS.map((t, i) => (
              <button
                key={t.id}
                className={`tabs-rail-btn ${i === idx ? 'active' : ''}`}
                onClick={() => setIdx(i)}
              >
                <span className="tabs-rail-label">{t.tab}</span>
              </button>
            ))}
          </div>

          <div className="tabs-frame-col">
            <div className="tabs-phone-frame">
              <div className="tabs-phone-screen">
                {TABS.map((t, i) => (
                  <TabSlide
                    key={t.id}
                    src={t.img}
                    active={i === idx}
                    tall={t.tall}
                    duration={t.tall ? 10 : 7}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="tabs-content-col">
            <div key={slide.id} className="tabs-content">
              <div className="tabs-content-tag">{slide.tab} tab</div>
              <h3 className="tabs-content-title">{slide.title}</h3>
              <p className="tabs-content-body">{slide.body}</p>
              <ul className="tabs-content-bullets">
                {slide.bullets.map((b, i) => (
                  <li key={i}>
                    <span className="tabs-bullet-icon">{b.icon}</span>
                    <span>{b.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* TabSlide — measures the image vs container and animates exactly
   the overflow distance, so tall screens never over-scroll. */
function TabSlide({ src, active, tall, duration }) {
  const imgRef = useRef(null);
  const wrapRef = useRef(null);
  const [overflow, setOverflow] = useState(0);

  const measure = useCallback(() => {
    const img = imgRef.current;
    const wrap = wrapRef.current;
    if (!img || !wrap || !img.complete || !img.naturalWidth) return;
    const renderedHeight = img.naturalHeight * (wrap.clientWidth / img.naturalWidth);
    const o = Math.max(0, renderedHeight - wrap.clientHeight);
    setOverflow(o);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const style = tall && overflow > 0
    ? { '--overflow': `-${overflow}px`, '--scroll-dur': `${duration}s` }
    : {};

  return (
    <div
      ref={wrapRef}
      className={`tabs-slide ${active ? 'active' : ''} ${tall ? 'is-tall' : ''}`}
      style={style}
    >
      <img ref={imgRef} src={src} alt="" className="tabs-slide-img" onLoad={measure} />
    </div>
  );
}

/* =============================================================
   CAREERS SECTION
   ============================================================= */
/* =============================================================
   HASH ROUTING
   ============================================================= */
function usePage() {
  const parse = () => {
    const h = window.location.hash || '';
    if (h.startsWith('#/careers/apply/')) return { name: 'apply', jobId: h.replace('#/careers/apply/', '') };
    if (h === '#/careers' || h.startsWith('#/careers')) return { name: 'careers' };
    if (h.startsWith('#/legal/')) return { name: 'legal', slug: h.replace('#/legal/', '') };
    if (h === '#/investors' || h.startsWith('#/investors')) return { name: 'investors' };
    if (h.startsWith('#/deep/')) return { name: 'deep', slug: h.replace('#/deep/', '') };
    if (h === '#/quality' || h === '#/security' || h === '#/about')
      return { name: 'page', slug: h.replace('#/', '') };
    // Home, optionally with a section anchor. Both `#s-pricing` (a link written on
    // home) and `#/#s-pricing` (the same link written on a product page, which has
    // to name the route as well) have to land on the same section.
    return { name: 'home', anchor: h.replace(/^#\/?/, '').replace(/^#/, '') };
  };
  const [page, setPage] = useState(parse());
  useEffect(() => {
    const onHash = () => {
      const next = parse();
      setPage(prev => {
        // Only scroll-to-top when the page actually changes (not when an in-page anchor changes)
        if (prev.name !== next.name) {
          // `behavior:'auto'` still obeys html{scroll-behavior:smooth} from index.css,
          // which made every page change drift for ~1.5s. 'instant' overrides it.
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        } else if (next.name === 'home' && next.anchor) {
          // In-page anchor on home — let the browser do native smooth-scroll
          const el = document.getElementById(next.anchor);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (prev.name !== 'home' && next.name === 'home' && next.anchor) {
          // Arriving home from another page *at* a section: the element does not
          // exist until this render commits, so the scroll waits two frames.
          requestAnimationFrame(() => requestAnimationFrame(() => {
            const el = document.getElementById(next.anchor);
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
          }));
        }
        return next;
      });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return page;
}

/* =============================================================
   CAREERS — full standalone page at #/careers
   Serious, calm, no fake numbers. Big cards. Research-first tone.
   ============================================================= */
function CareersPage() {
  return (
    <div className="page-shell careers-page">
      <SiteNav slug="careers" alwaysStuck/>
      <main>
        <section className="careers-hero careers-hero-clean">
          <div className="container careers-hero-inner">
            <div className="careers-eyebrow">Careers</div>
            <h1 className="careers-h1">
              We are building the predictive layer of healthcare.
            </h1>
            <p className="careers-lede">
              RichHealth.ai turns longitudinal personal, family and environmental health data into a continuously learning model of how a person’s body is actually trending. The work is technical, clinical, and consequential. We are hiring researchers and engineers who want to do that work for a living.
            </p>
            <div className="careers-hero-actions">
              <a className="btn-primary" href="#openings">See open roles</a>
              <a className="link-cta" href="mailto:careers@richhealth.app?subject=Open%20Application">Send an open application</a>
            </div>
          </div>
        </section>

        <section className="careers-principles-section">
          <div className="container">
            <div className="careers-principles">
              <div className="careers-principle">
                <h4>Research-grade rigour.</h4>
                <p>We expect papers, evaluation harnesses, ablations and honest error analysis — not vibes-driven model releases. Predictive claims have to clear calibration and lead-time thresholds before they ship.</p>
              </div>
              <div className="careers-principle">
                <h4>Clinical seriousness.</h4>
                <p>Every reasoning rule Richie follows is written down, published, and checkable — the red-flag list, the order of precedence, and the things it is forbidden to say. Where we have not earned a claim, the site says so instead of going quiet.</p>
              </div>
              <div className="careers-principle">
                <h4>Senior bias.</h4>
                <p>We over-index on staff- and principal-level hires. Most of our open roles are for people who have already led work like this once and are looking to do it again — with ownership.</p>
              </div>
              <div className="careers-principle">
                <h4>Quiet equity.</h4>
                <p>Every hire gets meaningful ownership. We don’t talk about it in numbers on a careers page — we talk about it on the offer call, with the cap table on the screen.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="careers-openings-section" id="openings">
          <div className="container">
            <div className="careers-section-head">
              <div className="careers-eyebrow">Open Roles</div>
              <h2 className="careers-h2">Where we are hiring right now.</h2>
            </div>

            <div className="careers-openings">
              {JOBS.map((j) => (
                <article key={j.id} className="opening-card">
                  <div className="opening-card-head">
                    <div className="opening-team">{j.team}</div>
                    <div className="opening-type">{j.type}</div>
                  </div>
                  <h3 className="opening-title">{j.title}</h3>
                  <p className="opening-summary">{j.summary}</p>
                  <dl className="opening-meta">
                    <div><dt>Location</dt><dd>{j.location}</dd></div>
                    <div><dt>Compensation</dt><dd>{j.pay}</dd></div>
                  </dl>
                  <div className="opening-actions">
                    <a className="btn-primary opening-apply" href={`#/careers/apply/${j.id}`}>Apply for this role</a>
                    <a className="link-cta" href={`#/careers/apply/${j.id}`}>View full description →</a>
                  </div>
                </article>
              ))}
            </div>

            <div className="careers-openfooter">
              <p>Don’t see your role? If you are a senior researcher, engineer or clinician with relevant work, write to <a href="mailto:careers@richhealth.app?subject=Open%20Application">careers@richhealth.app</a> with a one-page note on what you would build here.</p>
            </div>
          </div>
        </section>
      </main>
      <Foot/>
    </div>
  );
}

/* =============================================================
   APPLICATION PAGE — full-page form at #/careers/apply/:jobId
   ============================================================= */
function ApplicationPage({ jobId }) {
  const job = JOBS.find(j => j.id === jobId);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    country: '', city: '', linkedin: '', portfolio: '', github: '',
    yearsExperience: '', currentRole: '', currentCompany: '',
    workAuth: '', noticePeriod: '', expectedComp: '', remoteOk: '',
    whyRichhealth: '', proudestWork: '', heardFrom: '',
    consentPrivacy: false, consentBackground: false,
  });

  if (!job) {
    return (
      <div className="page-shell">
        <SiteNav slug="careers" alwaysStuck/>
        <main className="apply-not-found">
          <div className="container" style={{padding:'120px 0',textAlign:'center'}}>
            <h2 className="section-title">Role not found</h2>
            <p className="section-subtitle">The role you tried to open doesn't exist anymore. It may have been filled.</p>
            <a className="btn-primary" href="#/careers">See open roles</a>
          </div>
        </main>
        <Foot/>
      </div>
    );
  }

  const onChange = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const canStep1 = form.firstName && form.lastName && form.email && form.country && form.city;
  const canStep2 = form.yearsExperience && form.currentRole && form.workAuth && form.expectedComp;
  const canStep3 = form.whyRichhealth.trim().length >= 80 && form.proudestWork.trim().length >= 80 && form.consentPrivacy;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canStep3) return;
    const subject = encodeURIComponent(`Application — ${job.title} — ${form.firstName} ${form.lastName}`);
    const lines = [
      `Role: ${job.title}`,
      `Team: ${job.team}`,
      `---`,
      `Name: ${form.firstName} ${form.lastName}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Location: ${form.city}, ${form.country}`,
      `LinkedIn: ${form.linkedin}`,
      `Portfolio: ${form.portfolio}`,
      `GitHub: ${form.github}`,
      `---`,
      `Years of experience: ${form.yearsExperience}`,
      `Current role: ${form.currentRole}`,
      `Current company: ${form.currentCompany}`,
      `Work authorisation: ${form.workAuth}`,
      `Notice period: ${form.noticePeriod}`,
      `Expected compensation: ${form.expectedComp}`,
      `Open to remote: ${form.remoteOk}`,
      `---`,
      `Why RichHealth.ai:`,
      form.whyRichhealth,
      ``,
      `Proudest work:`,
      form.proudestWork,
      ``,
      `Heard from: ${form.heardFrom}`,
    ].join('\n');
    const body = encodeURIComponent(lines);
    window.location.href = `mailto:careers@richhealth.app?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="page-shell apply-page">
      <SiteNav slug="careers" alwaysStuck/>
      <main>
        <div className="container apply-container">
          <a href="#/careers" className="apply-back">&larr; Back to all roles</a>

          <header className="apply-header">
            <div className="job-team">{job.team}</div>
            <h1 className="apply-job-title">{job.title}</h1>
            <div className="job-chiprow">
              <span className="job-chip">{job.location}</span>
              <span className="job-chip">{job.type}</span>
              <span className="job-chip job-chip-pay">{job.pay}</span>
            </div>
          </header>

          <div className="apply-grid">
            <aside className="apply-sidebar">
              <div className="apply-sidebar-block">
                <div className="job-section-title">About the role</div>
                <p className="apply-sidebar-body">{job.summary}</p>
              </div>
              <div className="apply-sidebar-block">
                <div className="job-section-title">What you'll own</div>
                <ul className="apply-list">
                  {job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
              <div className="apply-sidebar-block">
                <div className="job-section-title">What we're looking for</div>
                <ul className="apply-list">
                  {job.requirements.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
              <div className="apply-sidebar-block apply-sidebar-meta">
                <div className="job-section-title">Process</div>
                <ol className="apply-process">
                  <li>Application reviewed within 5 business days</li>
                  <li>30-minute intro call with the hiring manager</li>
                  <li>Take-home or domain conversation (sized for senior time)</li>
                  <li>Onsite or virtual loop with 3–4 team members</li>
                  <li>Reference check &amp; offer within 10 days of loop</li>
                </ol>
              </div>
            </aside>

            <section className="apply-form-card">
              {submitted ? (
                <div className="apply-submitted">
                  <div className="apply-submitted-tick">{I.checkCircle}</div>
                  <h2 className="modal-title">Your draft is open in your email client.</h2>
                  <p className="modal-body">We pre-filled a structured application addressed to <strong>careers@richhealth.app</strong>. Hit send to officially apply. Attach your CV and any portfolio assets in that email. We respond within 5 business days.</p>
                  <a className="btn-primary" href="#/careers">Browse other roles</a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="apply-form" noValidate>
                  <div className="apply-progress">
                    <div className={`apply-progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}><span>01</span> Personal</div>
                    <div className="apply-progress-line"/>
                    <div className={`apply-progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'done' : ''}`}><span>02</span> Background</div>
                    <div className="apply-progress-line"/>
                    <div className={`apply-progress-step ${step >= 3 ? 'active' : ''}`}><span>03</span> Why RichHealth</div>
                  </div>

                  {step === 1 && (
                    <div className="apply-step">
                      <h3 className="apply-step-title">Tell us who you are</h3>
                      <div className="apply-row apply-row-2">
                        <Field label="First name" required value={form.firstName} onChange={onChange('firstName')} />
                        <Field label="Last name" required value={form.lastName} onChange={onChange('lastName')} />
                      </div>
                      <div className="apply-row apply-row-2">
                        <Field label="Email" type="email" required value={form.email} onChange={onChange('email')} />
                        <Field label="Phone" type="tel" placeholder="+1 416 555 0142" value={form.phone} onChange={onChange('phone')} />
                      </div>
                      <div className="apply-row apply-row-2">
                        <Field label="Country" required value={form.country} onChange={onChange('country')} />
                        <Field label="City" required value={form.city} onChange={onChange('city')} />
                      </div>
                      <div className="apply-row apply-row-3">
                        <Field label="LinkedIn URL" placeholder="https://linkedin.com/in/…" value={form.linkedin} onChange={onChange('linkedin')} />
                        <Field label="Portfolio / website" placeholder="https://…" value={form.portfolio} onChange={onChange('portfolio')} />
                        <Field label="GitHub / Scholar" placeholder="https://github.com/… or scholar.google.com/…" value={form.github} onChange={onChange('github')} />
                      </div>
                      <div className="apply-actions">
                        <button type="button" className="btn-primary" disabled={!canStep1} onClick={() => setStep(2)}>Continue &rarr;</button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="apply-step">
                      <h3 className="apply-step-title">Your background</h3>
                      <div className="apply-row apply-row-2">
                        <Field label="Years of relevant experience" required type="number" min="0" max="60" value={form.yearsExperience} onChange={onChange('yearsExperience')} />
                        <SelectField label="Work preference" required value={form.remoteOk} onChange={onChange('remoteOk')}
                          options={['', 'Fully remote', 'Hybrid', 'Onsite, will relocate', 'Onsite, no relocation']} />
                      </div>
                      <div className="apply-row apply-row-2">
                        <Field label="Current role / title" required value={form.currentRole} onChange={onChange('currentRole')} />
                        <Field label="Current company" value={form.currentCompany} onChange={onChange('currentCompany')} />
                      </div>
                      <div className="apply-row apply-row-2">
                        <SelectField label="Work authorisation" required value={form.workAuth} onChange={onChange('workAuth')}
                          options={['', 'Citizen / Permanent resident of country I am applying from', 'Will need sponsorship', 'Other — will note in cover']} />
                        <Field label="Notice period" placeholder="e.g. 2 months" value={form.noticePeriod} onChange={onChange('noticePeriod')} />
                      </div>
                      <Field label="Expected compensation" required placeholder="e.g. CAD 200k base + equity, or ₹65L base + equity" value={form.expectedComp} onChange={onChange('expectedComp')} />
                      <div className="apply-actions apply-actions-split">
                        <button type="button" className="link-cta" onClick={() => setStep(1)}>&larr; Back</button>
                        <button type="button" className="btn-primary" disabled={!canStep2} onClick={() => setStep(3)}>Continue &rarr;</button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="apply-step">
                      <h3 className="apply-step-title">Why RichHealth.ai</h3>
                      <TextareaField
                        label="Why this role, why us, why now?"
                        required minLength={80}
                        placeholder="80+ characters. Specific is better than enthusiastic — what about this role pulls at you that another wouldn't."
                        value={form.whyRichhealth}
                        onChange={onChange('whyRichhealth')}
                      />
                      <TextareaField
                        label="Pick one piece of work you're most proud of and walk us through it"
                        required minLength={80}
                        placeholder="80+ characters. What was the problem, what was your decision, what shipped, what would you redo. Links welcome."
                        value={form.proudestWork}
                        onChange={onChange('proudestWork')}
                      />
                      <SelectField label="How did you hear about us?" value={form.heardFrom} onChange={onChange('heardFrom')}
                        options={['', 'Word of mouth', 'LinkedIn', 'Y Combinator / accelerator', 'Conference talk', 'Search', 'A current team member', 'Other']} />

                      <div className="apply-consents">
                        <label className="apply-consent">
                          <input type="checkbox" checked={form.consentPrivacy} onChange={onChange('consentPrivacy')} required />
                          <span>I consent to RichHealth Technologies Inc. processing my application data per the <a href="#/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. I understand I can request deletion at any time.</span>
                        </label>
                        <label className="apply-consent">
                          <input type="checkbox" checked={form.consentBackground} onChange={onChange('consentBackground')} />
                          <span>I'm okay with a reasonable reference and credentials check if I become a finalist (optional).</span>
                        </label>
                      </div>

                      <div className="apply-actions apply-actions-split">
                        <button type="button" className="link-cta" onClick={() => setStep(2)}>&larr; Back</button>
                        <button type="submit" className="btn-primary" disabled={!canStep3}>Submit application</button>
                      </div>
                      <p className="apply-mailto-note">Submitting opens your email client with a structured draft pre-addressed to careers@richhealth.app. Attach your CV in that draft and hit send.</p>
                    </div>
                  )}
                </form>
              )}
            </section>
          </div>
        </div>
      </main>
      <Foot/>
    </div>
  );
}

function Field({ label, required, ...rest }) {
  return (
    <label className="apply-field">
      <span className="apply-field-label">{label}{required && <span className="apply-required">*</span>}</span>
      <input className="apply-input" required={required} {...rest} />
    </label>
  );
}

function SelectField({ label, required, options, ...rest }) {
  return (
    <label className="apply-field">
      <span className="apply-field-label">{label}{required && <span className="apply-required">*</span>}</span>
      <select className="apply-input apply-select" required={required} {...rest}>
        {options.map((o, i) => <option key={i} value={o}>{o || 'Select…'}</option>)}
      </select>
    </label>
  );
}

function TextareaField({ label, required, minLength, ...rest }) {
  return (
    <label className="apply-field">
      <span className="apply-field-label">{label}{required && <span className="apply-required">*</span>}{minLength && <span className="apply-hint"> · {minLength}+ chars</span>}</span>
      <textarea className="apply-input apply-textarea" required={required} minLength={minLength} rows={5} {...rest} />
    </label>
  );
}

/* PageNav — slim navbar reused across non-home pages */

function MoatSection() {
  return (
    <section className="moat-section" id="moat">
      <div className="container">
        <div className="moat-header sr">
          <div className="section-label">Why RichHealth.ai</div>
          <h2 className="section-title">The only health AI that knows your family, your environment and your context.</h2>
          <p className="section-subtitle">Six advantages that compound. India-fluent intelligence. A family-connected data graph. An AI council, not a single model. Doctor-verified analyses. Environmental signal as a clinical input. And a privacy architecture you can actually defend in front of a regulator. Together, they don't just describe a better app — they describe a different category.</p>
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
          We start where the gap is widest. India: 1.4 billion people, most on Android, most without continuous primary care. RichHealth.ai is engineered for that reality — UPI-native payments, regional disease awareness, family-managed accounts, pricing tuned for Indian incomes. From that base we extend to the Indian diaspora globally, then to Southeast Asia, the Gulf, Africa and Latin America — markets that share the same shape of unmet need.
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
                <div className="pricing-usd">{plan.perMonth} · {plan.usd}</div>
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
          <h2 className="section-title">The most personal data on your phone deserves the most serious architecture in the room.</h2>
          <p className="section-subtitle">Most apps treat privacy as a settings page. We treat it as the spec the product was built against. Encryption, audit trails, granular consent, no advertising surveillance, no data sale, full export, one-tap deletion — every claim on this page maps to a line of code, an audit log, or a contract you can read.</p>
        </div>
        <div className="trust-promises sr">
          <div className="trust-promise"><span>AES-256</span><small>at rest</small></div>
          <div className="trust-promise"><span>TLS 1.3</span><small>in transit</small></div>
          <div className="trust-promise"><span>Zero</span><small>data sale, ever</small></div>
          <div className="trust-promise"><span>Per-record</span><small>family sharing</small></div>
          <div className="trust-promise"><span>One-tap</span><small>permanent delete</small></div>
          <div className="trust-promise"><span>DPDP · GDPR · PIPEDA</span><small>aligned</small></div>
        </div>
        <div className="trust-grid">
          {TRUST_ITEMS.map((t, i) => (
            <div key={i} className="trust-card sr" style={{ transitionDelay: `${i * 0.12}s` }}>
              <div className="trust-card-icon">
                {t.img ? <img src={t.img} alt="" className="trust-card-img" /> : t.icon}
              </div>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
              {t.cta && <button className="link-cta" onClick={() => window.dispatchEvent(new CustomEvent('openModal', { detail: t.dialogKey }))}>{t.cta} &rarr;</button>}
            </div>
          ))}
        </div>
        <div className="trust-footnote sr">
          Want the long version? Read the <a href="#/legal/privacy-policy">full Privacy Policy</a>, the <a href="#/legal/terms">Terms of Service</a> and the <a href="#/legal/medical-disclaimer">Medical Disclaimer</a>. Each is the actual document, not a summary.
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
        <p className="cta-sub sr">Download RichHealth and let Richie start building your family's living health intelligence profile today. Native on iPhone, Apple Watch and Android — one account, one health graph, everywhere.</p>
        <div className="cta-download sr">
          <a href="#contact" className="store-btn">{I.playStore}<span className="store-btn-text"><small>GET IT ON</small><span>Google Play</span></span></a>
          <a href="#contact" className="store-btn">{I.appStore}<span className="store-btn-text"><small>DOWNLOAD ON THE</small><span>App Store</span></span></a>
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
/* =============================================================
   LEGAL PAGE — full-screen, lengthy real legal text
   ============================================================= */
function LegalPage({ slug }) {
  const data = LEGAL[slug];
  if (!data) {
    return (
      <div className="page-shell">
        <SiteNav alwaysStuck/>
        <main>
          <div className="container" style={{padding:'120px 0',textAlign:'center'}}>
            <h2 className="section-title">Document not found</h2>
            <p className="section-subtitle">The legal document you tried to open does not exist.</p>
            <a className="btn-primary" href="#/">Back to home</a>
          </div>
        </main>
        <Foot/>
      </div>
    );
  }

  const renderBody = (text) =>
    text.split(/\n\n+/).map((para, i) => <p key={i}>{para}</p>);

  return (
    <div className="page-shell legal-page">
      <SiteNav alwaysStuck/>
      <main>
        <div className="container legal-container">
          <a href="#/" className="apply-back">&larr; Back to home</a>
          <header className="legal-header">
            <div className="legal-eyebrow">{data.eyebrow}</div>
            <h1 className="legal-title">{data.title}</h1>
            {data.intro && <div className="legal-intro">{renderBody(data.intro)}</div>}
          </header>

          <div className="legal-grid">
            <aside className="legal-toc">
              <div className="legal-toc-title">On this page</div>
              <ol className="legal-toc-list">
                {data.sections.map((s, i) => (
                  <li key={i}><a href={`#section-${i}`}>{s.h}</a></li>
                ))}
              </ol>
              <div className="legal-toc-cta">
                <a href="mailto:legal@richhealth.app">Questions about this document?</a>
              </div>
            </aside>

            <article className="legal-body">
              {data.sections.map((s, i) => (
                <section key={i} id={`section-${i}`} className="legal-section">
                  <h2 className="legal-h2">{s.h}</h2>
                  <div className="legal-prose">{renderBody(s.body)}</div>
                </section>
              ))}

              <section className="legal-section legal-related">
                <h2 className="legal-h2">Related documents</h2>
                <div className="legal-related-list">
                  {Object.keys(LEGAL).filter(k => k !== slug).map(k => (
                    <a key={k} href={`#/legal/${k}`} className="legal-related-link">
                      {LEGAL[k].title} &rarr;
                    </a>
                  ))}
                </div>
              </section>
            </article>
          </div>
        </div>
      </main>
      <Foot/>
    </div>
  );
}

// Legacy home, superseded by <Premium/>. Kept for reference/rollback.
// eslint-disable-next-line no-unused-vars
function HomePage() {
  useScrollReveal();
  return (
    <div className="richhealth-app">
      <Navbar />
      <main>
        <Hero />
        <hr className="section-divider"/>
        <ProblemSection />
        <hr className="section-divider"/>
        <PlatformSection />
        <FourTabsSection />
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
      <Foot/>
    </div>
  );
}

function App() {
  const page = usePage();
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

  let pageEl;
  if (page.name === 'careers') pageEl = <CareersPage />;
  else if (page.name === 'apply') pageEl = <ApplicationPage jobId={page.jobId} />;
  else if (page.name === 'legal') pageEl = <LegalPage slug={page.slug} />;
  else if (page.name === 'investors') pageEl = <Investors />;
  else if (page.name === 'deep') pageEl = <Deep slug={page.slug} />;
  else if (page.name === 'page') pageEl = <Page slug={page.slug} />;
  else pageEl = <Premium />;

  return (
    <>
      {pageEl}
      {/* Mounted at the ROOT, not inside Premium. A visitor can land on any route
          — a feature page, the privacy policy, a job ad — and the choice has to be
          offered wherever they arrive, then never again. */}
      <Consent/>
      {/* Legacy floating chat button retired on the redesigned home: it collided with
          the new layout on mobile, and the page now has its own inline Richie demo. */}
      {modalKey && <Modal contentKey={modalKey} onClose={() => setModalKey(null)} />}
      {chatOpen && <RichieChat onClose={() => setChatOpen(false)} />}
    </>
  );
}

export default App;
