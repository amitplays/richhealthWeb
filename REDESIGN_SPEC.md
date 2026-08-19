# RichHealth Website Redesign — Spec & Change Log
Branch: `redesign/both-apps-v2`

This document records the research, decisions, and exact changes behind the revamp.
It is the spec the redesign was built from (Step 6).

## 1. Strategy (from Steps 1–4 research)

**Positioning (white-space we honestly own):** *family × intelligence × continuous × India.*
"One AI that understands your whole family's health — grounded in your own data."
No competitor spans family + intelligence + continuous + India (Apple/Fitbit = individual storage;
Function/Superpower = individual lab snapshots, US-only; HealthifyMe/Zoe = single-goal; caregiver apps
= logistics, no health data or AI).

**Five pillars** (the new spine):
1. **Richie** — the AI that knows you (grounded chat, model picker, memory, quick-log, grounded suggestions).
2. **One graph for the whole family** — dependents (newborn→elder→deceased), shared Pro, per-member chat, hereditary risk.
3. **Every signal in one place** — Apple Watch/HealthKit fusion, symptoms, meds, periods, vision-read reports.
4. **Proactive, not reactive** — multimodal check-ins, medication reminders, NutriCheck, AQI, health feed.
5. **India-first & private** — drug-brand grounding, IDRS, privacy by architecture.

**Claims discipline (avoid regulatory/trust landmines):** descriptive not diagnostic; "understand/organise/prepare
for your doctor," never "diagnose/treat/detect." Keep in the general-wellness lane.

## 2. Honesty fixes applied (the site was overclaiming)
- **AI "consensus across vendors" → "a panel of perspectives, reconciled."** All model keys route to one provider today;
  the Council is multi-*perspective*, not multi-*vendor*. Copy reframed everywhere; the fabricated **"Qwen"** chip removed;
  chat mockup now shows the real picker (Auto/Gemini/Mistral/DeepSeek R1/Llama 3.3/GPT-5.3·Pro/Claude 4.5·Pro).
- **"Doctor-verified AI analyses" → "Doctor-ready."** The portal shares your data with a doctor (real); there is no
  AI-review pipeline, so that claim was removed.
- **Mental-health "always-on private AI" → real AI/privacy controls.** (In-app mental-health chat is a local demo.)
- **"Export anytime / permanent deletion, no shadow copies" → "close account + wipe identifiers; request export/erasure."**
  (Deletion anonymises; there is no export endpoint yet.)
- **"Medication interaction checks" → "reminders & adherence + public safety flags"** (no interaction DB; openFDA/Drug
  Registry flags are on the rollout).
- **"End-to-end encrypted" → "encrypted in transit & at rest."**
- **Dead "custom podcast" Ultra claim** replaced with "newborn growth & vaccine tracking" (real, on rollout).

## 3. Both-apps + new screenshots (Step 8)
- iOS is **live**, not "coming soon." Store buttons now read "Download on the App Store"; footer lists iPhone/Android/Watch;
  roadmap moves iOS, Apple Watch, and Health Connect to **Shipped**.
- 11 new iPhone (Liquid Glass) screenshots added under `src/assets/screens/ios/`. The hero slideshow now rotates 10 real
  iOS shots (Richie grounded home, Apple Watch measurements, multimodal check-in, Family + Covered/Pro, family chat picker,
  model picker, medications, symptoms, reports, profile/AI settings). The App-tour ("Four tabs") keeps the Android
  screenshots and notes the same tabs ship on iPhone/Watch — so the page shows **both** platforms.

## 4. New product/marketing surface from free open data (Steps 3–4)
Added a **"Smarter every release — on open medical data"** feature and a **"Now rolling out"** roadmap column, wiring
honest, free, India-relevant sources: Open Food Facts (barcode NutriCheck), WHO child-growth standards + immunisation
calendar (newborns), openFDA + India Drug Registry (medicine safety flags), MedlinePlus (plain-language explanations),
OpenAQ (street-level AQI), PubMed/OpenAlex (research-cited answers). Top-10 easy wins are documented in the research.

## 5. Investor-credible stats strip (Step 2, all sourced)
India digital health $107B by 2033 (~25% CAGR, Grand View); 101M Indians with diabetes (ICMR-INDIAB, Lancet 2023);
1.5M/yr air-pollution deaths (Lancet Planetary Health 2024); 1B+ ABHA records (ABDM 2026); 50% medication non-adherence
(WHO); 20% of India aged 60+ by 2050 (UNFPA).

## 6. UI consistency & accessibility
- Tokenised the off-palette gold into a semantic `--warn` (3-state ok/warn/risk system); added a radius scale.
- Fixed the **moat-grid breakpoint bug** (2-col tablet layout never rendered).
- Loaded the **font weights** the CSS actually uses (Outfit 400/500/600 were missing).
- Added **`prefers-reduced-motion`** support and **`:focus-visible`** styles; made the hamburger keyboard-operable
  (`aria-expanded`, Enter/Space); nudged `--text-tertiary` for contrast; fixed `theme-color`.
- Preserved the good bones: hero word-reveal + rotator, the auto-measuring phone slideshow, the AppIcon system,
  the bespoke CSS mockups, teal-glow hover language, and the Four-tabs product story.

## 7. Open items to confirm with the team (not changed — flagged)
- **Domain split:** wordmark is `richhealth.ai`, all emails are `@richhealth.app`. Left as-is; confirm which is canonical.
- **Family-network "16×" multiplier** copy retained as marketing; consider softening to a claim you can defend.
- Whether to keep an in-app "Wellness/mental-health" surface at all (currently a local demo).

## 8. Verify
`CI=false npm run build` compiles clean. Preview screenshots (desktop + mobile) were captured with reduced-motion to
reveal all sections. No functional/animation code was removed — changes are copy, data, tokens, a11y, and assets.
