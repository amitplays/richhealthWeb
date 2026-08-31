import React, { useEffect, useRef } from 'react';
import './premium.css';
import { useReveal, Head, Band, Ico, SiteNav, Foot, PageCta } from './Premium';
/* PLACEHOLDERS. Swap these two files for the real portraits — same names, same
   3:4 crop, and nothing else in this file has to change. */
import portraitA from './assets/team/portrait_a.jpg';
import portraitB from './assets/team/portrait_b.jpg';

/* ═══════════════════════════════════════════════════════════════════════════
   THREE PAGES THE SITE DID NOT HAVE.

   Every competitor in this category carries them. Ada leads with a Medical
   Quality page; Docus leads with a founding story; WHOOP's footer alone carries
   Mission, Security, Engineering, Patent and Research. We had eleven feature
   pages, three legal pages, investors and careers — and nothing that answers
   "why should I trust this" or "who are you".

   EVERY LINE ON THESE PAGES IS READ OUT OF THE BACKEND. Where we do not have
   the thing a competitor claims, the page says we do not have it rather than
   going quiet — see WITHOUT below, which is the section Ada does not write.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── The eight blocks composed into EVERY Richie prompt. Source:
   config/prompts/reasoningCore.js, assembled in chatSystemPrompt.js,
   councilChatSystemPrompt.js and dependentChatSystemPrompt.js — the same
   eight in all three, so a caregiver conversation is governed identically. */
const RULES = [
  ['analysis', 'It holds more than one explanation',
   'For any symptom it weighs several plausible causes — common and harmless, common and serious, and the rare one it cannot afford to miss — before it settles on any of them. A headache is not automatically a migraine.'],
  ['lock', 'It checks the dangerous ones first',
   'Before it accepts a harmless explanation it runs the can’t-miss list for that complaint. If one is present it stops refining and names the level of care to seek now.'],
  ['ruler', 'It will not invent a number',
   'It may never state a lab value, dose or measurement that is not in the data it was given. If a number is not there it says so rather than estimating.'],
  ['cognition', 'It says how sure it is',
   'Likely, possible, less likely, or can’t tell from this. “I don’t know” is an allowed answer, and a single reading is treated as weak evidence rather than a trend.'],
  ['msg', 'It asks one question, not a form',
   'At most one to three questions in a whole conversation, one at a time, and only when the answer would change the read. It never asks for something already on file.'],
  ['sick', 'It will not flatter you',
   'If your assumption is medically wrong it says so and corrects it. Sounding agreeable is not allowed to beat being right.'],
  ['health', 'Wearable data is screening, not measurement',
   'Trends over single readings. SpO₂ is least reliable exactly when it is low; sleep-stage and calorie figures are estimates. Only ECG and irregular-rhythm alerts carry real weight, and those mean “get a medical ECG”, not a diagnosis.'],
  ['ai', 'Your own files cannot give it orders',
   'Health data and uploaded document text are treated as untrusted content, never as instructions. A line inside a PDF cannot change the rules above.'],
];

/* ── SAFETY_RULES in reasoningCore.js names exactly these nine. They override
   brevity, tone, and every user preference. */
const FLAGS = [
  'Chest pain or pressure',
  'One-sided weakness or slurred speech',
  'Trouble breathing',
  'Anaphylaxis',
  'Suicidal or self-harm intent',
  'Systolic blood pressure over 180, or under 90',
  'Blood glucose under 54 or over 300 mg/dL',
  'Fever in an infant under three months',
  'Heavy bleeding in pregnancy',
];

/* ── INSTRUCTION_HIERARCHY, verbatim in order. The point of publishing it is the
   last line: a preference cannot switch off the four above it. */
const ORDER = [
  ['Safety', 'Emergency escalation, and never fabricating a clinical value.'],
  ['Grounding', 'Clinical facts come from your data or from a source handed to it. Never from memory.'],
  ['Scope', 'Health information and reasoning. Not a diagnosis, not a prescription.'],
  ['Persona', 'How Richie talks.'],
  ['Your preferences', 'Tone, length, language, what to call you. These can never override the four above — not the safety rules, not a needed referral, and they cannot make it state a value it does not have.'],
];

/* ── What we deliberately do NOT claim. Ada publishes CE Class IIa, ISO 13485,
   ISO 27001, HIPAA and GDPR; a search of this repo for any of those returns
   nothing, so none of it goes on the site. */
const WITHOUT = [
  ['No medical-device clearance', 'RichHealth is not CE-marked, not FDA-cleared, and not registered as a medical device anywhere. It is a health information companion.'],
  ['No accuracy benchmark', 'We have not run a published accuracy study, so we do not quote a percentage. Competitors in this category do; we would rather have the number first.'],
  ['No certifications yet', 'No ISO 27001, no ISO 13485, no SOC 2, no HIPAA attestation. Those are audits we have not been through.'],
  ['No clinician in the loop', 'Nobody reviews Richie’s answers before you read them. Where Richie and a treating doctor disagree, the app tells you to follow the doctor.'],
];

function Quality(){
  return(
  <>
  <Band first id="q-top">
    <div className="px-wrap">
      <Head k="Medical quality" t={<>Every rule it follows <i>is written down.</i></>}
        l="Most health assistants describe their care as a value. Ours is a specification: eight blocks of reasoning rules composed into every conversation Richie has, whether it is about you, a parent or a child. This page is what those blocks say."/>
      <div className="px-fcards px-rv fx-stagger">
        {RULES.map(([ic,t,b],i)=>(
          <article className="px-card fx-card fx-glow" key={t} style={{'--i':i}}>
            <span className="px-card__ic"><Ico n={ic} size={20}/></span>
            <b>{t}</b><p>{b}</p>
          </article>))}
      </div>
    </div>
  </Band>

  <Band alt id="q-flags">
    <div className="px-wrap">
      <Head k="The stop list" t={<>Nine things that <i>end the conversation.</i></>}
        l="If any of these appears in your message or in your data, Richie leads with a plain instruction to seek urgent care — before any explanation, and regardless of how you asked or what tone you set."/>
      <ul className="px-flags px-rv fx-stagger">
        {FLAGS.map((f,i)=>(
          <li key={f} style={{'--i':i}}><Ico n="sick" size={16}/><span>{f}</span></li>))}
      </ul>
      <p className="px-aside">These are the only cases where Richie stops answering the question you asked and answers a different one.</p>
    </div>
  </Band>

  <Band id="q-order">
    <div className="px-wrap">
      <Head k="Order of precedence" t={<>When two rules disagree, <i>this is the order.</i></>}
        l="Published because the last line is the one that matters: nothing you can type into settings reaches above it."/>
      <ol className="px-order px-rv fx-stagger">
        {ORDER.map(([t,b],i)=>(
          <li key={t} style={{'--i':i}}>
            <span className="px-order__n">{i+1}</span>
            <div><b>{t}</b><p>{b}</p></div>
          </li>))}
      </ol>
    </div>
  </Band>

  <Band alt id="q-ground">
    <div className="px-wrap">
      <Head k="Grounding" t={<>We test the model <i>before we correct it.</i></>}
        l="Hard-coding medical facts into a product is a cost you carry forever, and most of it is wasted: a good model already knows a normal HbA1c. So before anything is written down, we ask the model and read the answer."/>
      <div className="px-fcards px-rv fx-stagger">
        <article className="px-card fx-card fx-glow" style={{'--i':0}}>
          <span className="px-card__ic"><Ico n="cognition" size={20}/></span>
          <b>What it already knows, we leave alone</b>
          <p>Standard reference ranges are not in our tables. The model answers those correctly and a stale copy of ours would eventually be worse than no copy.</p>
        </article>
        <article className="px-card fx-card fx-glow" style={{'--i':1}}>
          <span className="px-card__ic"><Ico n="meds" size={20}/></span>
          <b>What it gets wrong, we hard-code</b>
          <p>Indian brand names, and drugs that were withdrawn. Crocin and Dolo are the same molecule; Rantac is ranitidine, pulled over NDMA. Hand-checked to molecule and class.</p>
        </article>
        <article className="px-card fx-card fx-glow" style={{'--i':2}}>
          <span className="px-card__ic"><Ico n="health" size={20}/></span>
          <b>What must be exact, we calculate</b>
          <p>The Indian Diabetes Risk Score — Mohan et al., MDRF 2005, PubMed 16334618 — with the real point values and South-Asian waist cutoffs, computed rather than recalled.</p>
        </article>
      </div>
    </div>
  </Band>

  <Band id="q-without">
    <div className="px-wrap">
      <Head k="What we do not have" t={<>The four claims <i>we are not making.</i></>}
        l="This section exists because the pages we were measured against do not have one. Everything above is in the code. Everything here is not, and we would rather say so."/>
      <div className="px-fcards px-rv fx-stagger">
        {WITHOUT.map(([t,b],i)=>(
          <article className="px-card px-card--muted fx-card" key={t} style={{'--i':i}}>
            <b>{t}</b><p>{b}</p>
          </article>))}
      </div>
    </div>
  </Band>
  </>);
}

/* ── SECURITY. Read out of the user model, services/ai.js and the deletion path.
   The two uncomfortable ones — improveModel defaulting on, and deletion being a
   scramble rather than an erasure — are stated rather than buried. */
const HOLD = [
  ['doc','What you log','Symptoms, measurements, medicines, cycle logs, uploaded reports and their extracted values, check-in answers, and your conversations with Richie.'],
  ['famgrp','Who you cover','Dependants you add and relatives who accept a connection, each with their own record and their own switches.'],
  ['air','Where you are','Approximate location, so the air-quality reading beside your symptoms is the air you were actually breathing.'],
  ['health','What your watch sends','Ten measurements off Apple Health or Health Connect, each kept with its device and its timestamp.'],
];
const SWITCHES = [
  ['check','The one switch that is enforced everywhere','Every symptom, measurement, medicine, report and cycle log carries an “include in AI chat context” switch, and every query that builds Richie’s context filters on it. Turn it off and that record is not in the conversation.'],
  ['cognition','Memory you can read and delete','Durable facts Richie remembers are listed in Settings. You can delete any of them.'],
  ['analysis','Model improvement is ON before you touch anything','It defaults to true. You can turn it off in Settings. We would rather write that sentence than let you find out later.'],
  ['upload','Deletion scrambles, it does not erase','Account deletion overwrites your name, email, phone and date of birth. It is not a full erasure of every record, and there is no export endpoint yet.'],
];

function Security(){
  return(
  <>
  <Band first id="s-top">
    <div className="px-wrap">
      <Head k="Security and data" t={<>What we hold, <i>and what is switched on.</i></>}
        l="Written from the user model and the query layer, not from a policy template. Where the honest answer is not the flattering one, the honest answer is here."/>
      <div className="px-fcards px-rv fx-stagger">
        {HOLD.map(([ic,t,b],i)=>(
          <article className="px-card fx-card fx-glow" key={t} style={{'--i':i}}>
            <span className="px-card__ic"><Ico n={ic} size={20}/></span>
            <b>{t}</b><p>{b}</p>
          </article>))}
      </div>
    </div>
  </Band>
  <Band alt id="s-switch">
    <div className="px-wrap">
      <Head k="Your switches" t={<>Four things you control, <i>and one default you should know.</i></>}
        l="A switch that exists but is not read by the query layer is decoration. These are the ones that change what actually happens."/>
      <div className="px-fcards px-rv fx-stagger">
        {SWITCHES.map(([ic,t,b],i)=>(
          <article className="px-card fx-card fx-glow" key={t} style={{'--i':i}}>
            <span className="px-card__ic"><Ico n={ic} size={20}/></span>
            <b>{t}</b><p>{b}</p>
          </article>))}
      </div>
      <p className="px-aside">No advertising trackers, no retargeting pixels, no social-graph trackers. This website makes one third-party request: its typefaces, from Google Fonts.</p>
    </div>
  </Band>
  <Band id="s-without">
    <div className="px-wrap">
      <Head k="Not yet" t={<>Certifications <i>we have not been through.</i></>}
        l="No ISO 27001, no SOC 2, no HIPAA attestation, no medical-device registration. Those are audits, and we have not sat them. Anyone claiming otherwise about us is wrong."/>
    </div>
  </Band>
  </>);
}

/* ── ABOUT. The mission and the India case are read off the product and the
   backend. The founding story and the team are the two things no file in this
   repo contains, and they are not invented here — see NEEDS_FOUNDER below. */

/* ── THE TWO PEOPLE. No employer is named: a personal product that leans on a
   day job for credibility ends up sounding like the day job's marketing, and
   the clients involved did not sign up to appear here. The work is described;
   the logos are not borrowed.

   Bios are length-matched on purpose (~60 words each). An unequal pair in a
   two-up grid leaves one card with a floor of empty panel, which is the classic
   staff-directory tell. */
const TEAM = [
  {img:portraitA, n:'Amit', r:'Founder · Engineering',
   b:'He builds generative-AI systems for regulated industries — the kind of place where a wrong answer is an incident and every model call is logged. Ten years in production software, the last four leading the teams that ship it. Richie’s reasoning rules, the source-first answer path and the model picker are his.',
   also:'Teaches mobile development, modern web and cybersecurity at a Toronto college. Flies drones.'},
  {img:portraitB, n:'Ashley', r:'Design',
   b:'Ten years of end-to-end product design — research, interaction, interface and design systems — for retail, telecom, equipment-rental and enterprise-AI products at a global digital consultancy. She sets what the app looks like and how it behaves, which on a health app is the harder half.',
   also:'Bachelor of Fine Arts, and a diploma in digital design.'},
];

/* The four restrictions, lifted out of prose and set as a numbered spine. These
   are RULES[0..3] said in the first person — the Quality page gives each one a
   card and a body; here they are the argument itself, so they get a numeral and
   a hairline and nothing else. */
const RESTRICT = [
  ['Do not answer from memory',              'Anything general is searched at the moment you ask, not recalled.'],
  ['Do not invent a number',                 'No lab value, dose or measurement that is not already in your record.'],
  ['Check the dangerous explanation first',  'Before the comfortable one is allowed to stand.'],
  ['Say how sure you are',                   'Likely, possible, or cannot tell from this.'],
];

/* Figures as a ledger, not a stat row. A 0 set at display scale is the most
   arresting and most honest number on this page. */
const LEDGER = [
  ['2',    'people',            'the whole team'],
  ['4',    'surfaces shipped',  'iPhone · Watch · Android · backend'],
  ['0',    'engineers hired',   'headcount'],
  ['1',    'question',          'the one at the top of this page'],
];

/* Where to go next. Replaces a band that reprinted the homepage in worse form
   and linked to none of it. */
const JUMP = [
  ['Richie','richie','How an answer gets made'],
  ['Medical quality','quality','Every rule it follows, written down'],
  ['Our sources','evidence','What it reads, and what it will not'],
  ['Security and data','security','What we hold, and what is switched on'],
  ['Built for India','india','Why we started here'],
  ['Privacy','privacy','The switches, and the defaults'],
];

function Person({m,i}){
  return(
  <article className="px-per" style={{'--i':i}}>
    <div className="px-per__frame" data-plate>
      <img className="px-per__img" src={m.img} alt="" aria-hidden="true"/>
      <span className="px-per__grain" aria-hidden="true"/>
    </div>
    <div className="px-per__meta">
      <span className="px-per__idx">{String(i+1).padStart(2,'0')}</span>
      <div>
        <h3 className="px-per__name">{m.n}</h3>
        <span className="px-per__role">{m.r}</span>
        <p className="px-per__b">{m.b}</p>
        <p className="px-per__also">{m.also}</p>
      </div>
    </div>
  </article>);
}

function About(){
  /* This page owns its reveal. The page-wide useReveal observer is re-created on
     every parent render and never reached the deeper blocks — the same bug that
     left the Proof receipt sitting at opacity 0 for a whole build. */
  const stage = useRef(null);
  useEffect(()=>{
    const els = stage.current ? [...stage.current.querySelectorAll('.px-per, .px-spine li, .px-ledger li')] : [];
    if(!els.length) return;
    const io = new IntersectionObserver(es=>{
      es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); } });
    },{threshold:.15, rootMargin:'0px 0px -12% 0px'});
    els.forEach(e=>io.observe(e));
    return()=>io.disconnect();
  },[]);

  /* Pointer parallax. Six pixels, damped to 0.6 vertically, and NEGATED so the
     image moves against the pointer — that reads as a window with depth. Following
     the pointer reads as a toy. The loop terminates itself once the lerp
     converges, so there is no permanent rAF eating input latency. The resting
     scale of 1.03 exists to give this the edge bleed it needs. */
  useEffect(()=>{
    if(!window.matchMedia('(pointer:fine)').matches) return;
    if(window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const nodes=[...document.querySelectorAll('.px-per__frame')].map(el=>({
      el, img:el.querySelector('.px-per__img'), x:0, y:0 }));
    if(!nodes.length) return;
    const MAX=6, LERP=.075;
    let px=0, py=0, running=false, raf=0;
    const onMove=e=>{ px=e.clientX; py=e.clientY;
      if(!running){ running=true; raf=requestAnimationFrame(tick); } };
    function tick(){
      let moving=false;
      for(const n of nodes){
        const r=n.el.getBoundingClientRect();
        const nx=Math.max(-1,Math.min(1,(px-(r.left+r.width/2))/(r.width*1.6)));
        const ny=Math.max(-1,Math.min(1,(py-(r.top+r.height/2))/(r.height*1.6)));
        const tx=-nx*MAX, ty=-ny*MAX*.6;
        n.x+=(tx-n.x)*LERP; n.y+=(ty-n.y)*LERP;
        if(Math.abs(tx-n.x)>.05||Math.abs(ty-n.y)>.05) moving=true;
        n.img.style.setProperty('--px',n.x.toFixed(2)+'px');
        n.img.style.setProperty('--py',n.y.toFixed(2)+'px');
      }
      running=moving;
      if(moving) raf=requestAnimationFrame(tick);
    }
    window.addEventListener('pointermove',onMove,{passive:true});
    return()=>{ window.removeEventListener('pointermove',onMove); cancelAnimationFrame(raf); };
  },[]);

  return(
  <div ref={stage}>
  {/* ONE LINE, THEN QUIET. A whole screen holding one sentence. This is the
      reason the product exists and it is nine words long, so nothing else is
      allowed in the viewport with it. */}
  <Band id="a-line" first>
    <div className="px-wrap px-oneline">
      <h1 className="px-oneline__t">
        I had all of my father’s reports.<br/><i>And nobody to ask.</i>
      </h1>
    </div>
  </Band>

  {/* The story, first person and signed. Written from what happened, not from a
      mission statement. The immigration circumstances are deliberately not on
      this page; "I could not go" is as far as it goes. */}
  <Band id="a-story">
    <div className="px-wrap">
      <div className="px-tale">
        <p className="px-tale__lead">My father was misdiagnosed and put on steroids.</p>
        <p>By the time anyone caught it, his diabetes, his heart and his kidneys had all been hit. I was in Toronto. He was not, and I could not go.</p>
        <p>I had everything. The reports, the medicines, the symptoms, the dates, photographed and forwarded and sitting in my phone. What I did not have was one person to ask. Is this value bad. Does this drug fight that one. He is thirsty — can he have coconut water.</p>
        <p className="px-tale__pull">His phosphorus was the problem.<br/><i>Coconut water is what everyone at home hands a sick man.</i></p>
        <p>It was one of the worst things in that house, and nothing anywhere told us so. Not the reports. Not the prescriptions. Not the app on his phone counting his steps.</p>
        <p>Then my brother and I started noticing the same things in ourselves, and the question stopped being only about him.</p>
        <p className="px-tale__sig">— Amit, Toronto</p>
      </div>
    </div>
  </Band>

  <Band id="a-team">
    <div className="px-wrap">
      <div className="px-team2">{TEAM.map((m,i)=><Person m={m} i={i} key={m.n}/>)}</div>
    </div>
  </Band>

  <Band alt id="a-rules">
    <div className="px-wrap">
      <Head k="What we found" t={<>Almost every answer <i>was a subtraction.</i></>}
        l="It started as one question — what does an assistant have to do differently when the record it is reading belongs to somebody you love? Almost everything we learned was a thing it must never do."/>
      <ol className="px-spine">
        {RESTRICT.map(([t,b],i)=>(
          <li key={t} style={{'--i':i}}>
            <span className="px-spine__n" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
            <div className="px-spine__b"><b>{t}</b><p>{b}</p></div>
          </li>))}
      </ol>
      <p className="px-spine__end">Those four restrictions are the product. <i>The rest is plumbing.</i></p>
    </div>
  </Band>

  <Band id="a-how">
    <div className="px-wrap">
      <Head k="How" t={<>So how does a team of two <i>ship four surfaces?</i></>}
        l="By using AI agents the way the day job uses them, and holding them to the same standard. Agents get real repositories and real tasks. Every prompt is version-controlled, every model call is logged, and nothing is merged that a person has not read. It is not autocomplete and it is not magic — it is a discipline, and it is the only reason this list is not longer."/>
      <ul className="px-ledger">
        {LEDGER.map(([f,l,n],i)=>(
          <li key={l} style={{'--i':i}}>
            <b className="px-data">{f}</b>
            <span className="px-ledger__l">{l}</span>
            <em className="px-ledger__n">{n}</em>
          </li>))}
      </ul>
    </div>
  </Band>

  <Band alt id="a-jump">
    <div className="px-wrap">
      <Head k="Read on" t={<>The parts <i>that are checkable.</i></>}
        l="Everything claimed on this site is read out of the code that runs the app. These are the pages where you can go and check."/>
      <div className="px-jump">
        {JUMP.map(([t,slug,d])=>(
          <a className="px-jump__i" key={slug}
             href={slug==='quality'||slug==='security'?`#/${slug}`:`#/deep/${slug}`}>
            <b>{t}</b><span>{d}</span><Ico n="chev" size={13}/>
          </a>))}
      </div>
    </div>
  </Band>
  </div>);
}

const PAGES = {
  quality:  {title:'Medical quality',    render:Quality},
  security: {title:'Security and data',  render:Security},
  about:    {title:'About',              render:About},
};

export default function Page({slug}){
  useReveal();
  useEffect(()=>{window.scrollTo({top:0,left:0,behavior:'instant'});},[slug]);
  const p = PAGES[slug];
  if(!p) return null;
  const Body = p.render;
  return(
  <div className="px">
    <SiteNav slug={slug} alwaysStuck/>
    <Body/>
    {/* Medical quality, Security and About all ended on their last argument with
        nothing to do about it. One shared closing ask, in one place, for all
        three — a link to the real field rather than a third copy of it. */}
    <PageCta/>
    <Foot/>
  </div>);
}

export { PAGES as SITE_PAGES };
