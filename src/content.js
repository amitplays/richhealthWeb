/* =============================================================
   DIALOG CONTENT — Separate file for easy editing
   Keys must match dialogKey props in App.js data constants.
   ============================================================= */

export const DIALOG_CONTENT = {
  /* ---- Moat / Why Us ---- */
  'data-compounding': {
    title: 'The Data Compounding Effect',
    subtitle: 'Your health intelligence grows exponentially',
    body: 'Every symptom you log, every medication you track, every report you upload, every period you record, every check-in you complete makes Richie smarter about YOUR specific health. Unlike generic health apps that treat each data point in isolation, Richie builds a living, interconnected health graph that deepens every single day.',
    highlights: [
      'After 30 days — Richie identifies your personal health patterns',
      'After 90 days — more context than your entire medical record history',
      'After 1 year — an irreplaceable, comprehensive health intelligence profile',
      'Every data point cross-references with family history, environment, and medications',
    ],
    footer: 'The longer you use RichHealth.ai, the more indispensable it becomes — not because of lock-in, but because of genuine, compounding value.',
  },
  'family-network': {
    title: 'The Family Network Effect',
    subtitle: 'Each member multiplies intelligence for everyone',
    body: 'When your mother joins and logs her Type 2 diabetes, Richie immediately factors that into YOUR risk assessment. When your father adds his cardiac history, your child\'s health predictions improve. This isn\'t just data sharing — it\'s exponential health intelligence that no other platform offers.',
    highlights: [
      '1 member = baseline intelligence',
      '2 members = 4x cross-referential insights',
      '4 members = 16x hereditary pattern detection',
      'Each new connection strengthens the entire family\'s health safety net',
      'Selective sharing — you control exactly what Richie can see',
    ],
    footer: 'No other health platform in the world offers family-connected AI. This is patent-worthy innovation that changes how families manage health.',
  },
  'multi-model': {
    title: 'Multi-Model AI Architecture',
    subtitle: '15+ AI models working in concert',
    body: 'Richie isn\'t dependent on a single AI provider. Our cascade fallback system orchestrates 15+ models — including Gemini, GPT-5.3, Claude 4.5, Llama, DeepSeek and Qwen — routing each health query to the model best suited to answer it. Pro and Ultra tiers unlock the AI Council mode, where multiple frontier models analyze your data independently and synthesize a consensus response.',
    highlights: [
      '99.9% uptime through automatic model failover',
      'No vendor lock-in — always the best model for the job',
      'AI Council (Pro/Ultra): Gemini + GPT-5.3 + Claude 4.5 reach consensus',
      'Specialized routing: clinical queries, dietary advice, mental health',
      'Continuous model evaluation ensures quality improves over time',
    ],
    footer: 'While other health apps are limited to one AI, RichHealth.ai harnesses the collective intelligence of the world\'s leading models.',
  },
  'doctor-triangle': {
    title: 'The Doctor-Patient-AI Triangle',
    subtitle: 'AI intelligence, verified by real doctors',
    body: 'Richie\'s AI analysis doesn\'t exist in a vacuum. Licensed doctors on our platform review AI-generated insights, verify report analyses, and provide clinical oversight. This creates a trust layer that pure AI platforms simply cannot replicate — combining the speed of AI with the judgment of experienced physicians.',
    highlights: [
      'Richie analyzes your health data instantly',
      'Doctors verify critical findings for clinical accuracy',
      'You receive both speed and confidence in every insight',
      'Continuous feedback loop improves Richie\'s accuracy over time',
    ],
    footer: 'This triangle of AI speed, doctor expertise, and patient data creates healthcare that is faster, smarter, and more trustworthy than any single approach.',
  },
  'environmental': {
    title: 'Environmental Health Intelligence',
    subtitle: 'The air you breathe is part of your health record',
    body: 'India loses 1.67 million lives to air pollution annually. RichHealth.ai is the first health platform to treat your environment as a core health variable. Richie tracks your location\'s AQI in real-time, builds a long-term exposure profile, and correlates environmental data with your symptoms and conditions.',
    highlights: [
      'Real-time AQI monitoring using US & China standards',
      'PM2.5, PM10, O₃ tracking with health impact scoring',
      'Correlation engine: your symptoms vs. pollution spikes',
      'Long-term environmental exposure risk assessment',
      'Location-based health news and disease outbreak alerts',
    ],
    footer: 'In a country where air quality directly impacts hundreds of millions, this feature alone is a market maker.',
  },

  /* ---- India-First Proprietary AI ---- */
  'india-first': {
    title: 'India-First Proprietary AI',
    subtitle: 'The only health AI built from the ground up for Indian healthcare',
    body: 'Richie isn\'t a Western health AI with an Indian skin. It\'s a proprietary model trained on Indian medical terminology, doctor-patient communication styles, regional disease patterns, local medication brands, and dietary contexts that no global AI understands. When a doctor in Delhi writes "Tab Crocin 650 TDS," Richie doesn\'t just parse it — it understands the clinical intent, the dosage pattern, and the cultural context behind it.',
    highlights: [
      'Trained on Indian prescription language, abbreviations, and doctor handwriting patterns',
      'Understands Indian medication brands — Crocin, Dolo-650, Shelcal, Thyronorm — not just generic names',
      'Regional disease awareness: dengue in Mumbai, TB in UP, thyroid disorders in coastal regions',
      'Dietary intelligence: dal-chawal nutrition profiles, ghee consumption context, regional food habits',
      'Bilingual medical understanding across Hindi, English, and medical terminology',
      'Doctor communication style: knows how Indian doctors write prescriptions and discharge summaries',
    ],
    footer: 'This isn\'t a feature — it\'s the foundation. Every other capability of RichHealth.ai is built on top of an AI that genuinely understands Indian health.',
  },

  /* ---- New marquee feature dialogs ---- */
  'period-tracker': {
    title: 'Period & Cycle Intelligence',
    subtitle: 'Reproductive health, integrated with everything else',
    body: 'Most period apps live in a silo — they track flow and predict the next cycle, but they don\'t know about your thyroid panel, your iron levels, your stress, or your medications. Richie does. Every period log feeds the same intelligence layer that analyses your reports, your symptoms and your family history — surfacing connections most women have to discover the hard way.',
    highlights: [
      'Log start date, end date, flow intensity and pain level in seconds',
      'Cycle prediction grounded in your actual logs, not population averages',
      'Cross-referenced with thyroid, ferritin, vitamin D and PCOS markers from your reports',
      'Hereditary pattern detection — early menopause, PCOS, endometriosis from family data',
      'Private by default. End-to-end encrypted. Never used for advertising.',
      'Available for you and for any female dependent you manage',
    ],
    footer: 'Reproductive health is health. We treat it with the seriousness, depth and privacy it deserves.',
  },
  'dependents': {
    title: 'Dependents — One Account, Whole Family',
    subtitle: 'Manage health for children, ageing parents, and loved ones who need oversight',
    body: 'In Indian households, one person usually manages health for the entire family — booking appointments, tracking medications, remembering allergies. RichHealth.ai is built for that reality. Add a child, a parent, or a deceased relative whose hereditary data still matters, and Richie maintains a fully separate health graph for each — with caregiver-aware AI that always knows whose body it\'s talking about.',
    highlights: [
      'Child profiles — paediatric reference ranges, age-appropriate dosing, growth tracking',
      'Elder profiles — polypharmacy risk checks, fall prevention, cognitive markers',
      'Deceased relatives — preserve hereditary conditions and cause of death for family risk modeling',
      'Caregiver-aware Richie: addresses you, but reasons about your dependent\'s data',
      'Each dependent has their own reports, medications, symptoms, vitals and check-ins',
      '"Graduate" a child profile into their own account when they\'re ready',
    ],
    footer: 'No other health app in India treats caregiving as a first-class experience. We do — because that\'s how Indian families actually work.',
  },
  'council-ai': {
    title: 'AI Council — Multi-Model Consensus',
    subtitle: 'Three frontier AIs. One synthesised answer. Pro & Ultra only.',
    body: 'On the Pro and Ultra tiers, Richie shifts from single-model to a council of frontier AIs — Gemini, GPT-5.3 and Claude 4.5 — each analysing your data independently, then reconciling their findings into one consensus response. It\'s the equivalent of a second, third and fourth opinion, automatically, on every important question you ask.',
    highlights: [
      'Three top-tier models reason in parallel, not in sequence',
      'Disagreements are surfaced, not hidden — you see when models diverge',
      'Synthesised final answer grounded in your actual health data',
      'Especially powerful for report interpretation and risk assessment',
      'Fallback cascade keeps the council resilient if any single model is down',
    ],
    footer: 'You wouldn\'t trust a single doctor with a complex diagnosis. Why trust a single AI?',
  },
  'genetics-engine': {
    title: 'Hereditary Risk Engine',
    subtitle: 'Your family\'s health history, turned into your forward-looking risk map',
    body: 'You enter what you know — parents\' conditions, grandparents\' diagnoses, siblings\' history, hereditary patterns from deceased relatives. Richie cross-references that genetic context against your own labs, vitals, symptoms and lifestyle to produce a real, grounded hereditary risk profile. Not horoscopes. Not generic "you might be at risk for diabetes" copy-paste. A risk map specific to your bloodline.',
    highlights: [
      'Structured family history input — parents, grandparents, siblings, dependents',
      'Hereditary pattern detection only when the data actually supports it',
      'Risk scoring tuned for South Asian genetic predispositions',
      'Reproductive hereditary signals — PCOS, endometriosis, early menopause',
      'Updates automatically when family members add new conditions',
      'Surfaces hereditary risks doctors miss in 10-minute consultations',
    ],
    footer: 'This is preventive medicine, finally personalised. The opposite of "average patient" healthcare.',
  },
  'daily-checkin': {
    title: 'Daily & Weekly Health Check-Ins',
    subtitle: 'Two minutes a day. A complete behavioural health record over time.',
    body: 'A guided check-in flow asks the questions a thoughtful doctor would — energy, sleep, mood, pain, hydration, exercise, bowel health, stress. Two minutes. The result is a longitudinal behavioural and biometric record that Richie correlates against your reports, your AQI exposure, your medications and your cycle. Patterns emerge in weeks that would take a doctor years to spot.',
    highlights: [
      'Adaptive question set — Richie asks what\'s relevant to your conditions',
      'Cadence scales with your plan: weekly on Pro, every 3 days on Ultra',
      'Cross-correlated with vitals, symptoms, AQI, period and medication data',
      'Trend dashboard shows what\'s improving and what\'s drifting',
      'Optional fingerprint / face unlock for privacy on shared devices',
    ],
    footer: 'A two-minute habit that out-performs most fitness wearables — because it captures what wearables can\'t see.',
  },
  'health-hub': {
    title: 'Health Hub — Your Mission Control',
    subtitle: 'Everything Richie knows about your body, in one place',
    body: 'The Health Hub is the second tab of the app — the single screen where every vital, every report, every medication, every symptom, every cycle log and every dependent\'s data converges. From here you launch any tool, view any trend and ask Richie anything. It\'s designed to feel less like a health app and more like the dashboard of a high-end car: dense, calm, in control.',
    highlights: [
      'Unified vitals: BP, blood sugar, heart rate, weight, SpO₂, temperature',
      'One-tap entry to symptoms, measurements, reports, medications and check-ins',
      'Period tracker, dependents and family network surfaced contextually',
      'Trend lines and anomaly markers across every metric',
      'Quick actions tuned to your tier and your most-used tools',
    ],
    footer: 'A premium health experience demands a premium dashboard. The Hub is ours.',
  },

  /* ---- Trust / Privacy ---- */
  'privacy': {
    title: 'How We Protect Your Data',
    subtitle: 'Privacy isn\'t a feature — it\'s the foundation',
    body: 'Your health data is the most sensitive information you have. We treat it that way. RichHealth.ai is built with privacy-first architecture from the ground up — because we believe earning your trust with health data is a privilege, not a business model.',
    highlights: [
      'AES-256 encryption at rest, TLS 1.3 in transit',
      'Zero data selling — ever. Your health data is never monetized',
      'No third-party analytics on personal health records',
      'Regular security audits and penetration testing',
      'HIPAA-aligned practices for international standards',
      'Optional biometric (fingerprint / face) lock on the app itself',
    ],
    footer: 'Your data belongs to you. We just help you make it intelligent.',
  },
  'mental-health': {
    title: 'Private Mental Health Chat',
    subtitle: 'A safe space for your most sensitive conversations',
    body: 'Mental health conversations with Richie are treated with the highest level of privacy. We understand the cultural sensitivities around mental health in India, and Richie is built to be a judgment-free, culturally aware companion — available 24/7 without stigma.',
    highlights: [
      'No conversation data used for model training',
      'No profiling or behavioral tracking',
      'Data retained only as long as you choose',
      'Culturally aware of Indian mental health context',
      'Available anytime, without stigma or judgment',
    ],
    footer: 'Everyone deserves a safe space to talk about their mental health. Richie provides that, without compromise.',
  },
  'data-control': {
    title: 'Your Data, Your Rules',
    subtitle: 'Complete sovereignty over your health information',
    body: 'Data control at RichHealth.ai isn\'t just a settings page — it\'s a philosophy. You have granular power over every piece of health information, who can see it, and how Richie uses it.',
    highlights: [
      'Export all your data as structured files, anytime',
      'One-tap permanent deletion — no retention, no recovery',
      'Granular family sharing controls — choose what each member sees',
      'Selective AI access — decide what Richie can reference',
      'Transparent data usage logs you can audit',
    ],
    footer: 'We don\'t just promise data control — we build it into every interaction.',
  },

  /* ---- Market ---- */
  'market': {
    title: 'Why This Matters, Right Now',
    subtitle: 'The gap that RichHealth.ai fills',
    body: 'India has 1.4 billion people, most on Android, most without access to quality healthcare. The digital health market is projected to reach $9.9 billion by 2029. But the real opportunity isn\'t just market size — it\'s the gap. No AI health platform is built for the Indian context.',
    highlights: [
      'No health AI understands Indian dietary patterns, regional diseases, or local medications',
      'No family-connected health intelligence exists anywhere in the world',
      'UPI-native payments for seamless subscription adoption',
      'Regional health concerns — pollution, dengue, TB — addressed natively',
      'Pricing calibrated for Indian purchasing power',
      'Southeast Asia, Africa, and Latin America share the same unmet needs',
    ],
    footer: 'RichHealth.ai isn\'t entering a market — it\'s creating a category.',
  },

  /* ---- Pricing — synced with backend config/plans.js ---- */
  'pricing-plus': {
    title: 'RichHealth Plus — Your Personal Health AI',
    subtitle: '₹999 for 3 months · ₹333/month equivalent',
    body: 'Plus is the entry point into the RichHealth.ai ecosystem. Richie reads your reports, tracks your symptoms, monitors your environment and understands Indian health context — all at a price designed to remove every reason not to start.',
    highlights: [
      'Richie AI chat with standard models (25 messages per session)',
      '5 medical report uploads per month with AI analysis',
      '5 deep health analyses per month',
      '10 NutriCheck meal analyses per month',
      'Full symptom, measurement & vitals tracking',
      'Period & cycle tracker',
      '1 dependent profile (child / elder / deceased)',
      'AQI environmental monitoring',
      'Medication tracking with interaction checks',
    ],
    footer: '20% launch discount included. Cancel anytime — your data stays exportable.',
  },
  'pricing-pro': {
    title: 'RichHealth Pro — Family Health Intelligence',
    subtitle: '₹2,499 for 3 months · ₹833/month equivalent · Most popular',
    body: 'Pro unlocks the features families actually need: the AI Council (Gemini + GPT-5.3 + Claude 4.5 in consensus), more dependents, weekly check-ins, and direct connections with doctors on the platform. This is the plan most Indian families settle on.',
    highlights: [
      'Everything in Plus',
      'AI Council — Gemini, GPT-5.3 & Claude 4.5 reach consensus',
      'Premium AI models with 50 messages per chat session',
      '10 medical report uploads per month',
      '10 deep health analyses per month',
      '20 NutriCheck meal analyses per month',
      'Up to 2 dependents (children, ageing parents, deceased)',
      'Weekly guided health check-ins',
      'Doctor connections & data sharing',
      'Hereditary risk engine across the family graph',
    ],
    footer: '30% off — the most chosen plan. Quarterly billing, no contracts.',
  },
  'pricing-ultra': {
    title: 'RichHealth Ultra — Complete Health Command Center',
    subtitle: '₹4,999 for 12 months · ₹417/month equivalent · Best value',
    body: 'Ultra is for families who treat health intelligence as the most important investment they make. A full year of unlimited AI analyses, doctor-reviewed insights, more dependents, more family members, and white-glove onboarding.',
    highlights: [
      'Everything in Pro',
      'Unlimited medical report AI analyses',
      'Unlimited NutriCheck meal analyses',
      'All premium AI models with 100 messages per session',
      'Up to 5 dependents and 5 family members connected',
      'Doctor review of AI analyses for clinical confidence',
      'Health check-ins every 3 days',
      'Custom podcast requests on health topics you care about',
      'Dedicated health insights dashboard',
      'White-glove onboarding & priority human support',
    ],
    footer: '50% off — annual plan with the lowest effective monthly price.',
  },

  /* ---- Doctor Application ---- */
  'doctor-apply': {
    title: 'Become a RichHealth.ai Doctor',
    subtitle: 'Review AI reports. Build your reputation. Earn equity in the future of healthcare.',
    body: 'RichHealth.ai is building the world\'s first AI-verified health intelligence platform — and we need exceptional doctors to make it work. As a RichHealth.ai Doctor, you review Richie\'s AI-generated report analyses and provide the clinical oversight that transforms AI output into trusted medical intelligence. This isn\'t a side gig — it\'s an opportunity to shape how 1.4 billion people access healthcare, and earn a stake in that future.',
    highlights: [
      'Review AI-analyzed medical reports from your specialization — on your own schedule',
      'Upload your medical degree, license, and credentials for verification',
      'Your expertise trains Richie to become better — your feedback directly improves the AI',
      'Earn per review, with performance bonuses tied to quality and consistency',
      'Top-performing doctors earn equity stake in RichHealth.ai — real ownership in the platform',
      'Build a verified digital reputation as an early adopter of AI-assisted healthcare',
      'Flexible commitment — review 5 reports a week or 50, it\'s up to you',
    ],
    footer: 'Senior doctors with 20+ years of clinical experience are invited to email us directly at doctors@richhealth.app for priority onboarding, enhanced equity terms, and advisory board consideration.',
    ctaText: 'Check Eligibility',
    ctaHref: 'mailto:doctors@richhealth.app?subject=Doctor%20Application%20-%20RichHealth.ai',
  },

  /* ---- Legal ---- */
  'privacy-policy': {
    title: 'Privacy Policy',
    subtitle: 'Last updated: May 2026',
    body: 'RichHealth.ai (operated by RichHealth Technologies) is committed to protecting your personal and health information. This policy explains what we collect, how we use it, and the rights you have over your data.',
    highlights: [
      'What we collect: account details, health data you log (symptoms, vitals, medications, reports, period logs, check-ins), device metadata, and usage analytics strictly for product improvement.',
      'How we use it: to power Richie\'s personalised analysis, to surface hereditary and environmental risks, and to improve our AI models — never for advertising.',
      'What we never do: sell your data, share it with insurers/employers without your explicit consent, or use mental-health conversations for model training.',
      'Encryption: AES-256 at rest, TLS 1.3 in transit. Reports are stored in segregated, access-controlled buckets.',
      'Your rights: access, export (structured JSON/CSV), correction, restriction, and one-tap permanent deletion.',
      'Children and dependents: caregiver-managed dependent profiles are subject to the same protections; data is portable when a child "graduates" to their own account.',
      'Contact: privacy@richhealth.app for any data request. We respond within 7 working days.',
    ],
    footer: 'For the full legal text, write to privacy@richhealth.app. We will publish the complete document on this page shortly.',
    ctaText: 'Email privacy@richhealth.app',
    ctaHref: 'mailto:privacy@richhealth.app?subject=Privacy%20Request',
  },
  'terms': {
    title: 'Terms of Service',
    subtitle: 'Last updated: May 2026',
    body: 'By using RichHealth.ai (the app, website, doctor portal and any associated services) you agree to these terms. Please read them carefully.',
    highlights: [
      'Eligibility: you must be 18+ to hold a primary account. Minors may be managed as dependents by a parent or legal guardian.',
      'Medical disclaimer: Richie is an AI health assistant, not a licensed medical professional. Output is informational and does not constitute diagnosis, treatment or prescription. Always consult a qualified clinician for medical decisions.',
      'Acceptable use: do not upload data that isn\'t yours, attempt to reverse-engineer the AI, or use the platform for any unlawful purpose.',
      'Subscriptions: paid plans (Plus, Pro, Ultra) renew at the end of their billing period unless cancelled. You can cancel anytime from the app.',
      'Doctor portal: doctors warrant that all credentials uploaded are valid and current. Misrepresentation results in immediate removal and reporting to the relevant medical council.',
      'Limitation of liability: RichHealth.ai is not liable for medical outcomes arising from reliance on AI output without professional consultation.',
      'Termination: we may suspend accounts that violate these terms; you may close your account at any time and request full data deletion.',
    ],
    footer: 'Governing law: India. Jurisdiction: courts of Mumbai, Maharashtra. Questions: legal@richhealth.app.',
    ctaText: 'Email legal@richhealth.app',
    ctaHref: 'mailto:legal@richhealth.app?subject=Terms%20Inquiry',
  },
  'cookies': {
    title: 'Cookie Policy',
    subtitle: 'How we use cookies and similar technologies',
    body: 'RichHealth.ai uses a minimal set of cookies and local storage keys — only what is required to keep you signed in, remember your preferences and measure aggregate site performance. We do not use advertising cookies and we do not sell behavioural data.',
    highlights: [
      'Strictly necessary: session, authentication tokens, CSRF protection. Cannot be disabled.',
      'Preferences: theme, language, last-viewed plan. Removable from your browser at any time.',
      'Analytics (aggregate): anonymised page-view counts to understand which sections are useful. No PII is attached.',
      'No ad tracking: we do not run third-party ad pixels, retargeting tags or social-graph trackers.',
      'How to control: your browser\'s settings let you block or clear cookies; the app respects "Do Not Track" headers where supported.',
    ],
    footer: 'Questions about cookies or tracking? Reach us at privacy@richhealth.app.',
    ctaText: 'Email privacy@richhealth.app',
    ctaHref: 'mailto:privacy@richhealth.app?subject=Cookie%20Question',
  },
  'refund': {
    title: 'Refund & Cancellation Policy',
    subtitle: 'Fair, transparent, and pro-rated when it counts',
    body: 'We want you on RichHealth.ai because it\'s genuinely useful — not because you\'re locked in. Our refund policy reflects that.',
    highlights: [
      '7-day money-back guarantee on every new paid plan, no questions asked.',
      'Cancellation: cancel anytime from the app or by emailing billing@richhealth.app. Your access continues until the end of the paid period.',
      'Pro-rated refunds: if you cancel within 7 days of an upgrade or renewal, we refund the unused portion to your original payment method.',
      'Failed renewals: we never silently revoke access. You receive 3 reminders before any plan change.',
      'Data after cancellation: your data is yours. Export it anytime; we delete it on request within 30 days.',
      'UPI / Razorpay: refunds reflect in 5–7 working days depending on your bank.',
    ],
    footer: 'Refund or billing question? billing@richhealth.app — we respond within 1 working day.',
    ctaText: 'Email billing@richhealth.app',
    ctaHref: 'mailto:billing@richhealth.app?subject=Refund%20Request',
  },
  'contact-us': {
    title: 'Contact RichHealth.ai',
    subtitle: 'We answer every email — usually the same day',
    body: 'Whether you\'re a user, a doctor, an investor or a partner, here\'s how to reach the right person.',
    highlights: [
      'General support: support@richhealth.app',
      'Privacy & data requests: privacy@richhealth.app',
      'Legal & terms: legal@richhealth.app',
      'Billing, refunds, subscriptions: billing@richhealth.app',
      'Doctors interested in joining: doctors@richhealth.app',
      'Press & investors: hello@richhealth.app',
      'Registered office: Mumbai, Maharashtra, India',
    ],
    footer: 'We aim to respond to every message within one working day.',
    ctaText: 'Email support@richhealth.app',
    ctaHref: 'mailto:support@richhealth.app?subject=RichHealth.ai%20Inquiry',
  },
  'medical-disclaimer': {
    title: 'Medical Disclaimer',
    subtitle: 'Read this before relying on Richie for any medical decision',
    body: 'RichHealth.ai is a health intelligence platform, not a healthcare provider. Richie is an AI assistant designed to help you understand and organise your health data — not to replace your doctor.',
    highlights: [
      'Richie\'s output is informational and educational; it is not a diagnosis, prescription or treatment plan.',
      'Doctor-reviewed analyses (Ultra tier) provide additional clinical perspective but still do not substitute an in-person consultation.',
      'In a medical emergency, call your local emergency number immediately — do not wait for an AI response.',
      'Always consult a licensed physician before starting, stopping or changing any medication or treatment.',
      'AI models can be wrong. Treat Richie as a thoughtful research assistant, not as the final word.',
    ],
    footer: 'If anything Richie says contradicts your doctor\'s advice, follow your doctor.',
  },
};

/* =============================================================
   LEGAL — full-screen, length-realistic content for legal pages.
   Each entry has a list of sections. Sections render as h2 + body
   with paragraph splits on blank lines.
   ============================================================= */
export const LEGAL = {
  'privacy-policy': {
    title: 'Privacy Policy',
    eyebrow: 'Last updated · May 2026',
    intro: 'RichHealth.ai ("RichHealth", "we", "us", "our") is operated by RichHealth Technologies Inc. ("the Company"). This Privacy Policy explains in detail what information we collect when you use the RichHealth.ai mobile application, the doctor portal, and any associated websites and services (together, the "Services"); how we store, secure, share and otherwise process that information; the rights you hold over it under Indian law (the Digital Personal Data Protection Act, 2023), Canadian law (PIPEDA), the EU General Data Protection Regulation where applicable, and other equivalent regimes; and how you can contact us with questions, exercise your rights, or file a complaint.\n\nThis is a long document. We have made it long deliberately. Healthcare data is the most sensitive category of personal information you can share with a software product, and we believe you deserve a Privacy Policy that reads like one written by a person, not by a template generator.',
    sections: [
      {
        h: '1. The data we collect, and why',
        body: 'Account data — your name, email, phone number, date of birth, gender and password hash — is collected so we can create and secure your account. You may also choose to provide a profile photo, height, weight, blood group, lifestyle attributes, dietary preferences, allergies, conditions, and family history during onboarding. None of these are required to create an account, but each one improves the personalisation Richie can offer.\n\nHealth data is the core of the service. This includes any symptom you log, any vital you record (blood pressure, blood glucose, heart rate, SpO₂, weight, body temperature and similar), any medication you save, any medical report or document you upload, any period log you record, any daily or weekly check-in you complete, any conversation you have with Richie, and any information you save about a dependent (a child, an ageing parent, or a deceased relative whose hereditary information you choose to record).\n\nEnvironmental and device metadata — we record approximate location to deliver air-quality, pollen and outbreak intelligence relevant to where you actually live and breathe; basic device characteristics (operating system, app version, screen size class) for diagnostic and crash purposes; and aggregate, anonymised usage telemetry that helps us understand which features are useful and which are not. We do not run advertising trackers, retargeting pixels or social-graph trackers. Ever.\n\nFinancial data — when you subscribe to a paid plan we use Razorpay (or such other regulated payment provider as we engage from time to time) to process your card or UPI payment. We do not see, store, or have access to your full card or UPI credentials. We retain only what is required for billing reconciliation, refund processing and tax compliance.',
      },
      {
        h: '2. How we use your data',
        body: 'We use your data to provide the Services. That includes: powering Richie\'s personalised analyses, enabling the Health Hub to render your records, calculating your hereditary risk profile across the Family Network, surfacing today\'s relevant air-quality and outbreak alerts, generating your daily and weekly check-in cadence, and producing the report analyses, NutriCheck verdicts and Diet Guide outputs you explicitly request.\n\nWe also use your data to improve the Services. That improvement is constrained by clear lines: aggregate, de-identified analytics about feature usage are fair game; the contents of your medical reports, the details of your conversations with Richie, the contents of your mental-health (Wellness Chat) conversations, and the contents of any dependent\'s record are not used as training data for any model unless you explicitly opt in to a labelled research programme.\n\nWe never use your data to advertise to you, to score you for an insurer or employer, or to construct a behavioural profile that we sell or share. Selling personal health data is contrary to the entire reason this product exists.',
      },
      {
        h: '3. How we protect your data',
        body: 'In transit, your data is encrypted using TLS 1.3. At rest, data is encrypted using AES-256. Medical reports and other uploaded documents are stored in segregated, access-controlled object storage where access is logged at the request level and reviewed periodically. Production access is limited to a small, named on-call rotation and is gated by short-lived credentials and hardware-token MFA.\n\nWe undertake regular vulnerability scans, dependency audits, and a programme of internal and third-party penetration tests. Our security model assumes that breaches are not impossible, and we maintain incident-response runbooks, forensic logging and breach-notification workflows aligned with the timelines required by the DPDP Act, PIPEDA, and the GDPR.\n\nThe RichHealth.ai mobile application supports an optional biometric lock (fingerprint or face) that you can enable from the Profile tab. We strongly encourage you to enable it on any device you share with another person.',
      },
      {
        h: '4. How you can share your data — and how you cannot be made to',
        body: 'Sharing inside RichHealth.ai is always opt-in and granular. When you connect a family member, you choose what they (and Richie, on their behalf) can see. When you record a medication or a period log, the "share with family" flag is off by default; you can flip it per record. When you connect with a doctor on the platform, we will tell you exactly which records that doctor will be able to see, and you will need to confirm before any sharing takes effect.\n\nWe do not allow employers, insurers or any other third party to compel you to share your RichHealth.ai data through the product. If you are asked to do so by a third party, that is a request you can decline; we will not facilitate or pre-share your records on anyone\'s behalf.',
      },
      {
        h: '5. Children, dependents and deceased relatives',
        body: 'A primary account on RichHealth.ai requires the account-holder to be of the age of legal majority in their jurisdiction. Minors and other persons who require care may be managed as dependents on a primary account by their parent, legal guardian, or a similarly authorised caregiver. Caregivers must have lawful authority to manage that person\'s health information.\n\nDependents\' data is held to the same protection standards as the primary account. When a child dependent reaches the age of majority, their record is portable: they can be invited to claim their own primary account, at which point the historical data follows them.\n\nFor deceased relatives whose hereditary information you choose to record, we collect only what is needed for hereditary risk modelling: relationship, conditions, age and cause of death, hereditary conditions, and short notes you choose to add. This information is treated with the same dignity and the same safeguards as living-person data.',
      },
      {
        h: '6. Your rights',
        body: 'You have the right to access the personal data we hold about you. You have the right to correct it, to download a structured copy of it (including reports, vitals, medications, period logs, check-ins and chat history) at any time, and to permanently delete your account and the data it holds. You can exercise all four rights from inside the app — Profile → Data & Privacy — and you can also reach us at privacy@richhealth.app.\n\nIf you believe we have processed your data unlawfully, you have the right to complain to your local data-protection authority. In India that is the Data Protection Board established under the DPDP Act; in Canada, the Office of the Privacy Commissioner; in the EU, your national supervisory authority.',
      },
      {
        h: '7. Changes to this Policy',
        body: 'We may update this Policy from time to time as the Services and the law evolve. Material changes — anything that meaningfully affects what we collect, how we use it, or how you can control it — will be notified in-app and by email at least thirty days before they take effect. Non-material changes (clarifications, typos, contact updates) are published with the updated date at the top of this page.',
      },
      {
        h: '8. Contact',
        body: 'For all privacy-related questions, requests, complaints and disclosures, write to privacy@richhealth.app. Our Data Protection Officer reviews each one and responds, in writing, within seven working days. Where the law requires it, we will respond within the legal deadline regardless of working-day calendars.',
      },
    ],
  },

  'terms': {
    title: 'Terms of Service',
    eyebrow: 'Last updated · May 2026',
    intro: 'These Terms of Service ("Terms") govern your access to and use of the RichHealth.ai application, the doctor portal, the website, and all associated services (together, the "Services"), provided by RichHealth Technologies Inc. ("RichHealth", "we", "us", "our"). By creating an account, downloading the application, or using any part of the Services, you agree to these Terms. If you do not agree, do not use the Services.\n\nThese Terms are a legal agreement. We have written them in plain English wherever possible and reserved precise legal language only where it materially affects your rights or ours.',
    sections: [
      {
        h: '1. Eligibility and account',
        body: 'You must be of the age of legal majority in your jurisdiction to register a primary account. You may register and manage dependents (including minors in your lawful care, ageing parents, and similarly authorised cases) on your primary account. You are responsible for the accuracy of the information you provide, the security of your credentials, and the activity that occurs under your account.\n\nYou agree not to share your account credentials with any third party. If you believe your account has been compromised, you must notify us at security@richhealth.app immediately. We may suspend access to any account that we reasonably believe has been compromised pending investigation.',
      },
      {
        h: '2. The Services are not a substitute for medical care',
        body: 'RichHealth.ai is a health intelligence platform. Richie is an AI assistant designed to help you understand and organise your health information. The Services do not provide medical advice, diagnosis, prescription, or treatment, and should not be relied upon as a substitute for a consultation with a qualified healthcare professional.\n\nIn a medical emergency, you must contact your local emergency services immediately. Do not wait for an AI response. Do not delay seeking care because of anything Richie has said or has not said.',
      },
      {
        h: '3. Acceptable use',
        body: 'You agree not to: upload or share information that is not yours and that you have no lawful authority to share; impersonate another person; attempt to reverse-engineer, scrape, or otherwise extract data from the Services beyond what the in-product export tools allow; use the Services to harass, harm or defame another person; use the Services for any unlawful purpose, including fraud, money laundering, identity theft or unauthorised practice of medicine.\n\nIf you are a doctor on the doctor portal, you additionally agree to maintain a current and valid medical licence, to update your registration information promptly when it changes, and to comply with the professional standards of the medical council that licenses you. Misrepresentation results in immediate removal and may be reported to the relevant council.',
      },
      {
        h: '4. Subscriptions, billing and refunds',
        body: 'Paid plans are offered as Plus (3-month term), Pro (3-month term) and Ultra (12-month term). Plan inclusions are described in the in-product pricing screen and on richhealth.ai. Plans renew automatically at the end of their term unless cancelled. You may cancel at any time from inside the app, and access continues until the end of the paid term.\n\nWe offer a seven-day, no-questions-asked refund window from the start of any new paid plan. After that window, refunds are pro-rated for the unused portion of an upgrade or renewal performed in the last seven days. Refund operations are subject to the policies of your payment provider; UPI and card refunds typically take five to seven working days to reflect.',
      },
      {
        h: '5. Intellectual property',
        body: 'All software, design, content and trademarks comprising the Services are owned by RichHealth or licensed to us. You retain ownership of the data you upload (medical reports, photos, free-text notes, etc.). By uploading data, you grant us a limited, revocable licence to process it for the purpose of providing the Services to you. That licence ends when you delete the data or close your account.',
      },
      {
        h: '6. Limitation of liability',
        body: 'To the maximum extent permitted by applicable law, RichHealth and its officers, directors, employees and affiliates are not liable for any indirect, incidental, special, consequential or punitive damages, or for any loss of profits or revenues, whether incurred directly or indirectly, arising out of or related to your use of the Services. Nothing in these Terms limits our liability for fraud, gross negligence, or any liability that cannot be excluded under applicable law.',
      },
      {
        h: '7. Termination',
        body: 'You may close your account at any time. We may suspend or terminate access to the Services if we reasonably believe you have materially breached these Terms, if continued provision of the Services to you would be unlawful, or if your use creates a risk to the Services or to other users. Upon termination, you may export your data within thirty days; after that, retained copies will be deleted in accordance with our retention schedule, except where applicable law requires us to keep specific records for longer (for example, financial records for tax purposes).',
      },
      {
        h: '8. Governing law and dispute resolution',
        body: 'These Terms are governed by the laws of India, without regard to its conflict-of-laws principles. The parties submit to the exclusive jurisdiction of the courts of competent jurisdiction in the city in which RichHealth Technologies Inc. is registered for the resolution of any disputes arising out of or related to these Terms. Where you reside in a jurisdiction whose mandatory consumer law overrides this clause, that mandatory law applies.',
      },
      {
        h: '9. Changes to these Terms',
        body: 'We may update these Terms from time to time. Material changes are notified in-app and by email at least thirty days before they take effect. Continued use of the Services after that date constitutes acceptance of the updated Terms.',
      },
      {
        h: '10. Contact',
        body: 'Questions about these Terms? Write to legal@richhealth.app. We respond to every message in writing.',
      },
    ],
  },

  'cookies': {
    title: 'Cookie Policy',
    eyebrow: 'Last updated · May 2026',
    intro: 'This Cookie Policy explains how RichHealth.ai uses cookies and similar local-storage technologies on its website and in the doctor portal. The mobile application does not use HTTP cookies; it uses platform-standard secure storage to keep you signed in and to remember your preferences.\n\nOur philosophy on cookies is simple: as few as possible, only what is necessary to operate the product, and absolutely no advertising or behavioural tracking.',
    sections: [
      {
        h: '1. Strictly necessary cookies',
        body: 'These cookies are required to operate the website and the doctor portal. They include the session cookie that keeps you signed in, the CSRF protection token that prevents cross-site request forgery against authenticated actions, and the cookie that remembers your accepted cookie banner state. You cannot disable these without losing core functionality, and we do not need your consent to set them under applicable law.',
      },
      {
        h: '2. Preference cookies',
        body: 'These cookies remember your theme preference, language, and which pricing plan you last viewed. They make the experience smoother but are not required for the website to operate. You can clear them from your browser at any time.',
      },
      {
        h: '3. Aggregate analytics',
        body: 'We collect anonymised, aggregated metrics about which pages and which sections of pages are useful. This is the only place we use any form of analytics on the marketing website, and it is not joined to your account or to any personally identifying information. The mobile application does not run third-party analytics on personal health records.',
      },
      {
        h: '4. What we do not do',
        body: 'We do not run advertising cookies. We do not run retargeting pixels. We do not embed social-media trackers, third-party fingerprinting, or behavioural-advertising vendors. We do not sell or share data with data brokers.',
      },
      {
        h: '5. How to control cookies',
        body: 'Your browser\'s settings let you block or clear cookies. We respect the Do Not Track header where it is presented. You can also reach us at privacy@richhealth.app with any cookie-related question.',
      },
    ],
  },

  'refund': {
    title: 'Refund & Cancellation Policy',
    eyebrow: 'Effective immediately on every paid plan',
    intro: 'We want you on RichHealth.ai because the product is genuinely useful — not because cancellation is hard. This Policy explains how cancellation and refunds work for each of our paid plans (Plus, Pro and Ultra).',
    sections: [
      {
        h: '1. Seven-day, no-questions-asked refund',
        body: 'For every new paid plan, you have a full seven days from the start of the plan to request a complete refund — no questions asked. Email billing@richhealth.app within that window from the email address on the account, and we will process the refund within two working days of receiving your request.',
      },
      {
        h: '2. Cancellation any time, no friction',
        body: 'You may cancel any plan from inside the app at any time. After cancellation, your access continues until the end of the current paid term. If you cancelled by mistake, you can re-subscribe with one tap before the term ends.',
      },
      {
        h: '3. Pro-rated refunds on upgrades and renewals',
        body: 'If you upgrade or renew and decide within seven days that you would prefer not to, we refund the unused portion of the upgrade or renewal to your original payment method, pro-rated to the day.',
      },
      {
        h: '4. Failed renewals and reminders',
        body: 'We do not silently revoke access. Before any plan changes — renewal, downgrade, or expiry — we send three reminders: at fourteen days, three days and one day before the change takes effect. You always know what is about to happen and have the option to act.',
      },
      {
        h: '5. Data after cancellation',
        body: 'Your data belongs to you. You can export it at any time before or after cancellation. On request, we delete your data within thirty days. Some financial and tax records must be retained for the periods set by applicable tax and accounting law; those are stored in encrypted, restricted form and are not used for any product purpose.',
      },
      {
        h: '6. Refund timelines and your bank',
        body: 'UPI and card refunds typically reflect in your account within five to seven working days of being processed. If a refund has not appeared after seven working days, write to billing@richhealth.app with the original transaction reference and we will follow up with the payment provider on your behalf.',
      },
      {
        h: '7. Talking to a person',
        body: 'Refund and billing questions are answered by a real person, usually within one working day. billing@richhealth.app — every email is read.',
      },
    ],
  },

  'medical-disclaimer': {
    title: 'Medical Disclaimer',
    eyebrow: 'Read this before relying on Richie for any medical decision',
    intro: 'RichHealth.ai is a health intelligence platform. It is not a healthcare provider, a hospital, or a medical practice. Richie is an artificial intelligence assistant designed to help you understand, organise and reason about your health information. The product is built with deep respect for the practice of medicine — and from that respect comes a clear set of statements about what Richie is and is not.',
    sections: [
      {
        h: '1. Richie is not a doctor',
        body: 'Anything Richie says is informational and educational. It is not a diagnosis. It is not a prescription. It is not a treatment plan. It is a structured analysis of the information you have given the system, expressed in language a non-clinician can understand. Treat it as a thoughtful research assistant, not as a clinician.',
      },
      {
        h: '2. Doctor-reviewed analyses are an additional layer, not a replacement',
        body: 'On the Ultra plan, certain AI analyses are reviewed by licensed physicians on our platform. That review is a meaningful additional layer of safety and judgment. It is still not a substitute for an in-person consultation with your own treating clinician, who can examine you, take your history, and weigh context Richie does not have.',
      },
      {
        h: '3. In an emergency, call emergency services',
        body: 'If you believe you or someone you are caring for is experiencing a medical emergency — chest pain that does not resolve, sudden severe weakness, slurred speech, severe bleeding, suicidal ideation, anaphylaxis, breathing difficulty, severe abdominal pain, signs of stroke or heart attack, or any condition that you reasonably believe may be life-threatening — you must call your local emergency services immediately. Do not wait for an AI response. Do not search the app for an answer. Make the call, then come back to the app afterwards.',
      },
      {
        h: '4. Your doctor wins',
        body: 'If anything Richie says contradicts the explicit, contemporaneous advice of a qualified clinician who has examined you, follow your clinician. Bring Richie\'s analysis to them, ask them to interpret it, and let them adjudicate the disagreement. This is not us hedging — this is us telling you how to use the product safely.',
      },
      {
        h: '5. Models can be wrong',
        body: 'AI models, including the council of frontier models that power Richie\'s Pro and Ultra tiers, can be wrong. They can hallucinate. They can miss context that an experienced human would catch. We have invested heavily in evaluation, calibration and physician review to reduce this — but we have not eliminated it, because no one has.\n\nUse Richie the way a serious student uses any high-quality reference: as one strong input into your decision, alongside the judgment of a clinician you trust.',
      },
    ],
  },
};

/* =============================================================
   CAREERS — high-end roles. Designed to read like a serious
   biotech/AI lab posting, not a startup wishlist.
   ============================================================= */
export const JOBS = [
  {
    id: 'predictive-health-research-scientist',
    team: 'Predictive Health Research',
    title: 'Senior Research Scientist — Predictive Health',
    location: 'Hybrid · Remote-friendly',
    type: 'Full-time · PhD',
    pay: 'Senior research-scientist band + meaningful equity',
    summary: 'Own the modelling work behind the Predictive Health Engine — the system that turns a person\'s longitudinal symptom, vitals, lab, medication, period, environmental and family-history data into well-calibrated forward forecasts of clinically meaningful risk.',
    responsibilities: [
      'Design probabilistic models (state-space, survival, transformer-based sequence) over multi-modal patient timelines.',
      'Build the evaluation harness — calibration, lead-time, false-alarm rate, fairness across South Asian and global subgroups — that every model release must clear.',
      'Co-author the methodology behind hereditary risk scoring across the family graph, including reproductive-health signals (PCOS, endometriosis, perimenopause).',
      'Partner with clinicians and the AI council team to keep predictions clinically defensible and explainable to a treating physician.',
      'Publish where it improves the field — and shut up where it doesn\'t.',
    ],
    requirements: [
      'PhD in Biostatistics, Epidemiology, ML for Health, Computational Biology or a closely related field.',
      'Five or more years building predictive models on longitudinal clinical or biomedical data, with measurable impact.',
      'Track record of evaluation rigour: calibration, decision-curve analysis, subgroup analysis, ablations.',
      'Fluency in PyTorch or JAX, Bayesian methods, and modern survival / time-to-event analysis.',
      'Ability to defend modelling choices in front of physicians, reviewers and regulators.',
    ],
  },
  {
    id: 'biomedical-research-engineer',
    team: 'Biomedical Research',
    title: 'Biomedical Research Engineer — Vitals & Wearables',
    location: 'Hybrid · Remote-friendly',
    type: 'Full-time · M.Eng / PhD',
    pay: 'Senior research-engineer band + equity',
    summary: 'Own the pipeline from raw biosensor signal to clinically usable insight. Apple Watch, Wear OS, BP cuffs, CGMs, pulse oximeters, smart scales — decide what RichHealth.ai actually trusts and how it propagates into Richie\'s reasoning.',
    responsibilities: [
      'Lead the vitals ingestion stack: signal cleaning, artefact rejection, calibration, multi-device fusion.',
      'Define accuracy thresholds and rejection criteria for every supported device class — and document them like a clinical study.',
      'Drive integrations with Google Fit, Samsung Health, Apple HealthKit and HL7/FHIR EHR sources.',
      'Partner with regulatory on traceability, validation and post-market surveillance for SaMD-classified surfaces.',
    ],
    requirements: [
      'B.Eng / M.Eng / PhD in Biomedical Engineering, Electrical Engineering, or closely related.',
      'Six or more years shipping clinical-grade signal-processing code in production.',
      'Hands-on experience with PPG, ECG, NIBP, CGM data — and an understanding of why those signals lie.',
      'Working knowledge of IEC 62304, ISO 13485 and 21 CFR Part 820.',
    ],
  },
  {
    id: 'clinical-ai-lead',
    team: 'AI Council',
    title: 'Clinical AI Lead — Richie',
    location: 'Hybrid · Remote-friendly',
    type: 'Full-time',
    pay: 'Staff / principal band + equity',
    summary: 'Own the system that orchestrates frontier and specialised models into a single, clinically grounded response for every user. Define what "good" means for a healthcare AI assistant and build the evaluation framework that proves it.',
    responsibilities: [
      'Architect the routing, fallback and synthesis layer across 15+ frontier and specialised models.',
      'Build the evaluation framework: hallucination rate, clinical accuracy, citation traceability, harm mitigation, refusal calibration.',
      'Define prompt and retrieval contracts that hold up against adversarial and edge-case patient data.',
      'Lead a small team of applied AI engineers and clinical reviewers.',
    ],
    requirements: [
      'MS / PhD in CS, ML or equivalent staff-level industry experience.',
      'Seven or more years applied AI, including three or more shipping LLM systems in safety-critical domains.',
      'Strong opinions on evaluation, calibration and red-teaming, defensible in front of clinicians.',
      'Demonstrated ability to work alongside physicians without losing technical depth.',
    ],
  },
  {
    id: 'genomics-research-scientist',
    team: 'Hereditary Risk Lab',
    title: 'Research Scientist — Genomics & Hereditary Risk',
    location: 'Hybrid · Remote-friendly',
    type: 'Full-time · PhD',
    pay: 'Senior research-scientist band + equity',
    summary: 'Lead the methodology behind hereditary risk scoring across the family graph, with specific weighting for South Asian and other under-represented populations. Build the structures that turn parents\', siblings\' and deceased relatives\' health data into a defensible forward risk profile.',
    responsibilities: [
      'Design family-graph models that translate self-reported and imported family history into calibrated, condition-specific risk scores.',
      'Lead literature review and feature engineering around South-Asian-specific predispositions (Type 2 diabetes, cardiac, PCOS, thyroid).',
      'Co-design the integration of polygenic and pharmacogenomic signals when consented.',
      'Establish the validation protocol that physicians will rely on when reading these scores.',
    ],
    requirements: [
      'PhD in Genetic Epidemiology, Statistical Genetics, Computational Biology or a closely related field.',
      'Demonstrated work on familial / hereditary risk modelling — preferably published.',
      'Sensitivity to consent, lineage and the ethical surface of genetic prediction.',
      'Comfort engaging directly with both bench scientists and software engineers.',
    ],
  },
  {
    id: 'clinical-evaluation-lead',
    team: 'Clinical Evaluation',
    title: 'Clinical Evaluation Lead — AI Outputs',
    location: 'Hybrid · Remote-friendly',
    type: 'Full-time · MBBS / MD or equivalent',
    pay: 'Senior clinical band + equity',
    summary: 'Own the human review layer on top of Richie. Define what counts as an acceptable AI analysis, recruit and lead the panel of reviewing clinicians, and feed structured disagreement back into model training.',
    responsibilities: [
      'Build the evaluation rubrics that reviewing physicians use on AI-generated report analyses.',
      'Recruit, vet and onboard senior reviewing clinicians across specialties.',
      'Run continuous quality audits on AI outputs and convert disagreements into training signal.',
      'Co-own the doctor-portal roadmap with engineering and design.',
    ],
    requirements: [
      'Practising or recently practising clinician with MBBS/MD or international equivalent.',
      'At least eight years post-graduation, with experience in evidence-based medicine or clinical research.',
      'Comfortable critiquing AI output rigorously — no novelty bias, no dismissal.',
      'Bias toward writing things down: rubrics, checklists, structured feedback.',
    ],
  },
  {
    id: 'staff-android',
    team: 'Mobile Engineering',
    title: 'Staff Android Engineer — Health Hub',
    location: 'Hybrid · Remote-friendly',
    type: 'Full-time',
    pay: 'Staff band + equity',
    summary: 'Set the bar for what a premium native Android health app feels like. Own the architecture of our flagship app from the splash screen to the AI council surface — Health Hub, Services, Richie, Profile.',
    responsibilities: [
      'Lead Android architecture (Java + selective Kotlin), modularisation and performance work.',
      'Drive the next generation of the Health Hub — vitals, period tracker, dependents, daily check-ins.',
      'Mentor a small team of Android engineers; raise the quality bar on motion, accessibility and offline UX.',
    ],
    requirements: [
      'Eight or more years shipping native Android apps used by millions.',
      'Deep knowledge of modern Android — pragmatic about Java/Views where relevant.',
      'Track record of taking real apps from 4.4 to 4.8+ on Play Store.',
    ],
  },
  {
    id: 'regulatory-lead',
    team: 'Regulatory & Compliance',
    title: 'Head of Regulatory Affairs — Digital Health',
    location: 'Hybrid · Remote-friendly',
    type: 'Full-time',
    pay: 'Senior leadership band + equity',
    summary: 'Lead our path through global digital-health regulators and turn compliance into a structural advantage. Define the SaMD classification, validation and surveillance approach for every AI feature we ship.',
    responsibilities: [
      'Build the regulatory roadmap for SaMD classification across our AI features.',
      'Own ISO 13485 / 27001 and SOC 2 Type II programs end-to-end.',
      'Partner with engineering on traceability, change control and post-market surveillance.',
    ],
    requirements: [
      'Ten or more years digital-health or medical-device regulatory experience.',
      'Submissions experience across at least two major regulators.',
      'Comfort working across multiple jurisdictions concurrently.',
    ],
  },
];

/* ---- Richie Chat Suggested Prompts ---- */
export const RICHIE_PROMPTS = [
  {
    question: 'What can you do?',
    answer: 'I analyse your medical reports, track symptoms, vitals, medications and periods, monitor how air quality affects your health, manage health for your dependents (children and elders), and connect your family\'s health data for hereditary insights. On Pro and Ultra, I run as a council of three frontier models — Gemini, GPT-5.3 and Claude 4.5 — and reach consensus before answering. The more you share, the smarter I get about YOUR family, specifically.',
  },
  {
    question: 'Am I at risk for diabetes?',
    answer: 'To give you a personalised risk assessment, I cross-reference your family history (parents, grandparents, siblings — including any deceased relatives you\'ve recorded), your recent blood work, BMI trends, period regularity if relevant, and lifestyle patterns. For South Asian populations I weight genetic predisposition higher and factor in dal-rice-ghee dietary context. In the app, this analysis happens automatically the moment your hereditary or lab data updates.',
  },
  {
    question: 'Analyse my blood report',
    answer: 'Upload any medical report — CBC, lipid panel, thyroid, HbA1c, hormone panel — and I\'ll extract key findings, flag abnormal values, and cross-reference them against your full health profile, your medications, your cycle (if applicable) and your family\'s hereditary conditions. Ultra users get a licensed doctor\'s review on top of my analysis.',
  },
  {
    question: 'Track my child\'s health',
    answer: 'Add a dependent profile for your child and I switch into caregiver mode — I address you, but reason about your child\'s data. I use paediatric reference ranges for vitals, age-appropriate medication dosing, and growth tracking. You can upload their reports, log their symptoms, set medication reminders, and ask me anything about their health, all from the same app.',
  },
  {
    question: 'How\'s the air quality today?',
    answer: 'I track your location\'s AQI in real time using both US and China standards. I monitor PM2.5, PM10 and O₃ levels, and alert you when pollution spikes could affect your health — especially if you have respiratory conditions or relevant family history. I also surface local outbreak alerts and curated health news for your city.',
  },
];
