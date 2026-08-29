# RichHealth — Design Findings & Element Library
Working doc. Source: 4 reference sites (Neura bento, Neura coach/stepper, Neura full page,
Heidi, Counsel Health) + a full-page capture of our current v5 site.
Purpose: stop inventing layouts per section. Extract a fixed element library, map our real
features onto it, and define ONE motion system used everywhere.

---

## PART A — Where we lose against Neura / Heidi / Counsel

Measured from our own build: our page is **28,175px tall across 24 bands ≈ 1,170px per section**.
The reference pages say more in far less scroll. The problems, in order of severity:

**A1. Density. One idea per screen.**
Every section of ours = a heading, a lede, a list of 4 rows, one screenshot. Neura's bento
puts 3 distinct features + 3 live UI fragments in a single viewport. Our full-page capture is
mostly black void between islands of text. This is the single biggest gap.

**A2. Same scaffolding, different words.**
`.px-duo` (rows left / frame right) is used ~10 times. I fixed "one card repeated" by
inventing "one two-column repeated". Still a template.

**A3. No humans.**
Every reference uses warm photography of people — a woman on a bed at golden hour, a man
running, someone reading in a garden. Ours is 100% UI and text. Health is emotional; our page
reads like a terminal readout. (We can keep dark and still be warm.)

**A4. We show screenshots. They show UI fragments.**
They lift ONE component out of the product — a notification pill, a progress card, an
approve/deny row — and float it over a photo. It's legible in 200ms. Our portrait phone frames
require squinting; nothing is readable at a glance.

**A5. No hierarchy between features.**
Bento sizes signal importance: one tall hero tile, two supporting. Every one of our sections
is the same weight, so nothing feels like the headline.

**A6. Single temperature.**
Neura alternates white / green / dark. Heidi cream / yellow. Counsel white / navy. We are
near-black end to end, so there's no rhythm, no "chapter" feeling.

**A7. Missing standard blocks that build trust.**
No logo/trust strip, no comparison table, no ratings, no category-filtered FAQ, no mega-footer
with newsletter/QR. Counsel's $0-vs-$199 table does more persuading than a paragraph ever will.

**A8. Motion is decoration, not a system.**
We have a reveal + two loops. No shared easing/duration tokens, no scroll-linked motion, no
stagger primitive, no reusable hover contract. Every animation is bespoke = inconsistent.

---

## PART B — Element library extracted from the references

Each element: what it is → where seen → **what OUR content maps onto it** → how it animates.
This is the fixed vocabulary. New sections compose from these; we don't invent per-section.

### E1 · Photo card with bottom scrim
Full-bleed photo, dark gradient bottom third, small icon + title + 2-line description.
*Seen:* Neura "Personal Neura Agent", "Health Plan", "Complete Integration".
*Maps to:* Family (multi-generation), Newborn, Elder care, Wrist/voice, NutriCheck (thali),
AQI (hazy skyline), Cycle.
*Motion:* image `scale(1.04)` over 600ms on hover; scrim deepens; title rises 4px. Scroll-linked
parallax of the image inside the frame (`animation-timeline: view()`, no JS).

### E2 · Floating UI fragment over photo
A real component from the app, glass, drop-shadowed, sitting on the photo.
*Seen:* Neura goal-progress card, mindfulness notification, chat bubbles.
*Maps to:* our medication reminder, check-in "analysis ready", family Pro-covered badge,
watch voice verdict, AQI advisory.
*Motion:* enters with 8px rise + fade on view; idle float loop 7s; lifts 6px on card hover.

### E3 · Confirm row — Approve / Deny / Edit  ← **card state, not decoration**
*Seen:* Neura "'I'm lactose intolerant' — Should I add this to your profile?"
*Maps to:* **our quick-log** — "Log 'knee pain 3/10' to your record?" This is a feature we
currently only describe in prose. Also: family request accept/decline, dependent graduate,
consent to share with a doctor.
*Motion:* buttons press 1px; on Approve the row collapses to a confirmed line with a tick
(height transition + colour change). Real state change, not a static picture.

### E4 · Progress/goal card
Title, date range, labelled bar with thumb, one-sentence status.
*Seen:* Neura "Boost Stamina · Goal Progress · You're right on track".
*Maps to:* check-in streak, medication adherence %, health score trend, profile completeness,
newborn growth percentile.
*Motion:* bar fills from 0 to value on view, 900ms; number counts up in mono.

### E5 · Notification pill
Icon tile + title + relative time + one line body.
*Seen:* Neura "Mindfulness Prompt · 6h".
*Maps to:* our entire notification system, which is invisible today — dose reminders with
snooze, check-in cadence by tier, "your analysis is ready", family coverage changed.
*Motion:* slides in from top with slight overshoot; stack of 3 with 60ms stagger.

### E6 · Section header with right-side note + CTA
Left: big title. Right: small supporting paragraph + a pill button.
*Seen:* Neura "What You Get With Neura" / "Free basics… Explore Key Features".
*Maps to:* every section header, giving us a place for the secondary line and a CTA.

### E7 · Vertical stepper / accordion synced to a device visual
Grey inactive rows with hairline rules; active row bold with a thicker underline; description
appears under the active row; the visual on the right changes with selection.
*Seen:* Neura "Your personal health coach"; Heidi "Vanquish the paperwork".
*Maps to:* **onboarding depth (currently unshown)** — Add yourself → Connect your watch →
Upload a report → Add your family → Get your briefing. Also the 4-tab app tour.
*Motion:* underline slides between rows (shared layout transition); description height
animates; device visual cross-fades + 6px rise. Auto-advances, pauses on hover.

### E8 · Device-in-hand photo
Real hand holding a phone, app UI on screen, on a gradient panel.
*Maps to:* our hero, or the "Health Hub" section. Needs a photo asset (or a clean render).

### E9 · In-app metric tile grid
Ring progress, image tile, value + range bar + status badge, mini line chart, statement tile,
bar chart, task row.
*Seen:* Neura Health Hub screen.
*Maps to:* our Health Hub / measurements — HR, SpO₂, glucose with range, weight trend,
steps, and a statement tile ("Your resting HR is steadier than 6 weeks ago").
*Motion:* tiles stagger in 40ms apart; charts draw left→right; ring sweeps.

### E10 · Tonal gradient panel
A section whose background is a colour wash rather than the base canvas.
*Maps to:* chapter breaks — deep-teal wash for Family, warm amber wash for the day-in-the-life,
cool slate for privacy. Fixes A6 without leaving dark.

### E11 · Three photo cards with label on image
*Seen:* Neura "Personalized Power / Grounded in Science / Your Data is Yours".
*Maps to:* our three pillars — India-first / Whole family / Your data stays yours.

### E12 · Hero with floating cards around a device
*Maps to:* our current hero (already close) — keep, but swap flat chips for E2 fragments.

### E13 · Full-bleed CTA banner
Dark image, eyebrow, headline, one button.
*Maps to:* our closer.

### E14 · FAQ with category pills
Left title block; right accordion; filter pills above.
*Maps to:* our FAQ — pills: General · Family · Devices · Privacy · Plans.
*Motion:* pill selection slides; answers height-animate.

### E15 · Mega footer
Newsletter capture, app-store QR, 5–6 link columns, glossary/compare/use-case links.
*Maps to:* our footer, which is currently thin.

### E16 · Live/working widget in hero
Heidi shows a transcription actually running with a stop button and mic dropdown.
*Maps to:* our grounded-answer demo — it already works; move a compact version into the hero.

### E17 · Logo / credibility strip
*Seen:* Heidi's institution logos.
*We have no customers* — honest equivalent: **"Grounded in"** strip of data sources
(WHO · openFDA · MedlinePlus · OpenAQ · Open Food Facts · PubMed). Same trust function, true.

### E18 · Category chip columns + preview card
*Seen:* Heidi specialties; Counsel condition lists.
*Maps to:* what Richie can read — CBC, lipid panel, thyroid, HbA1c, vitamin D, ferritin…
and the conditions/medicines it accounts for. Cheap density win.

### E19 · Curved three-step timeline
*Seen:* Heidi "Before / During / After the consult".
*Maps to:* **a day with RichHealth** — 7am briefing → 1pm NutriCheck → 9pm dose → 10pm check-in.
*Motion:* the connecting path draws on scroll (stroke-dashoffset tied to view progress).

### E20 · Comparison table
Two columns, prices, tick/cross rows.
*Seen:* Counsel $0 vs $199.
*Maps to:* one plan for a family vs paying per person; or RichHealth vs a generic tracker.
State the axis honestly, don't name competitors.

### E21 · "…all in one place" repeated rhythm
Icon + heading with one coloured word + short paragraph + pill button, repeated 5×.
*Seen:* Counsel.
*Maps to:* our one-record spine — reports / medicines / vitals / family / cycle, all in one place.
Gives a repeatable, high-density rhythm without feeling like cards.

### E22 · Mixed bento with a rating/quote tile
*Maps to:* later, once we have real reviews. Not now — we won't fake it.

### E23 · Vertical scrolling card columns
Two columns of small cards drifting in opposite directions, paused on hover.
*Maps to:* "what people actually log" or our signal types; a live, breathing texture block.
*Motion:* pure CSS translate loop, GPU-only, pauses on hover and under reduced-motion.

---

## PART C — One motion system (coded once, used everywhere)

Tokens:
- Easing: `--fx-ease: cubic-bezier(.22,1,.36,1)` (single easing for everything).
- Durations: `--fx-fast:180ms` (press/colour) · `--fx-base:320ms` (hover/state) · `--fx-slow:600ms`
  (reveal/image) · `--fx-idle:7s` (float loops).
- Distance: `--fx-rise:14px` for entrances, `6px` for hover lifts, `1px` for presses.

Primitives (each written once):
1. `.fx-rise` — fade + translateY on view (IntersectionObserver, already exists).
2. `.fx-stagger > *` — children delayed by `--i * 60ms`.
3. `.fx-parallax` — image drifts inside its frame, scroll-linked via `animation-timeline: view()`
   with a static fallback. No JS, GPU-composited.
4. `.fx-card` — the hover contract: image `scale(1.04)`, scrim +12%, overlay lift 6px,
   border→`--px-line-2`. Every card uses this; no bespoke hovers.
5. `.fx-count` — number counts up in mono on view.
6. `.fx-fill` — bar/ring animates 0→value on view.
7. `.fx-draw` — SVG path draws on scroll progress.
8. `.fx-float` — idle 7s loop with `--d` delay for floating fragments.
9. `.fx-vscroll` — vertical card drift, pauses on hover.
10. `prefers-reduced-motion` — one block disables 1–9 and pins final states.

Rules: transform/opacity only (never animate layout). One easing. Nothing faster than 180ms,
nothing slower than 900ms except idle loops. Hover effects never move text more than 6px.

---

## PART D — Card state matrix (every card supports all of these)

| State | Treatment |
|---|---|
| default | panel bg, hairline border, soft shadow |
| hover | `.fx-card` contract (image scale, scrim, +6px lift, brighter border) |
| focus-visible | 2px teal outline, 3px offset — keyboard parity with hover |
| pressed | translateY(0) + 1px scale-down |
| selected | teal border + inner glow + mono label turns teal |
| loading | shimmer skeleton lines, mono "reading your record" |
| empty | outline icon + one explanatory line + the action that fills it |
| error | image fails → gradient fallback, never a broken frame |
| disabled / Pro-locked | 55% opacity, lock glyph, cursor not-allowed, tooltip "Requires Pro" |

---

## PART E — Feature ledger

**Shown today:** grounded chat + why-suggested · model picker + Pro lock · council · memory ·
quick-log (prose only) · chat vision · citations · family graph 5 personas · caregiver chat ·
hereditary risk · coverage economics · watch fusion · labs + trends · Watch app + widget ·
check-in watchlist + streak · med reminders + adherence + offline · 7-pass analysis + score ·
briefing · AQI advisory · NutriCheck + barcode + learning · intel feed · diet guide · workouts ·
cycle · doctor portal · India grounding + IDRS · open data · privacy switches · 4-tab tour ·
pricing · FAQ.

**Still not shown anywhere:** onboarding depth (20-step profile) → E7 · notification system
→ E5 · quick-log as an actual interaction → E3 · usage/limits transparency · symptom sharing
toggles · exercise library · multi-rail billing · Android-specific surfaces · a day-in-the-life
narrative → E19 · "what Richie can read" list → E18 · grounded-in source strip → E17.

**Never claimed:** multi-vendor council · doctor-reviewed AI · data export endpoint ·
drug-interaction database · podcasts · mental-health chat.

---

## PART F — Working method

One section at a time. For each: (1) inspiration reference, (2) which E-elements it composes
from, (3) which ledger features it crosses off, (4) build, (5) verify at 6 breakpoints, (6)
cross off. No section invents a new layout primitive unless we add it to Part B first.
