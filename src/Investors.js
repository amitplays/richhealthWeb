import React, { useEffect } from 'react';
import './premium.css';
import { Mast, SiteNav, Foot } from './Premium';

const STATS=[
 ['$107B','India\'s digital health market by 2033, compounding ~25% a year','Grand View Research'],
 ['101M','Indians living with diabetes, with 136M more pre-diabetic','ICMR-INDIAB, Lancet 2023'],
 ['1.5M','Deaths a year in India attributable to PM2.5 air pollution','Lancet Planetary Health 2024'],
 ['20%','Share of India aged 60+ by 2050, outnumbering children','UNFPA 2023'],
 ['50%','Long-term patients who don\'t take medicine as prescribed','WHO'],
 ['1B+','Health records linked under India\'s digital health mission','ABDM, 2026']];

const WEDGE=[
 ['Individual storage','Apple Health, Fitbit','Holds numbers. Doesn\'t reason, and stops at one person.'],
 ['Lab-test subscriptions','Function, Superpower','Deep on bloodwork, US-priced, individual, and blind between draws.'],
 ['Single-goal coaching','HealthifyMe, Zoe','Excellent at one outcome. Not a health record, no family, no clinician path.'],
 ['Caregiving apps','Various','Logistics and reminders. No health data, no intelligence.']];

const BUILT=[
 ['Native across three surfaces','iPhone (iOS 26), Apple Watch with voice and Android, on one backend and one record.'],
 ['~110 REST endpoints, 29 data models','Chat, check-ins, reports, medications, observations, family, payments, doctor portal.'],
 ['25+ prompt templates with safety scaffolding','Grounding rules, instruction hierarchy, injection defences, urgent-care escalation.'],
 ['Vision pipeline for lab reports','Multi-vendor extraction, structured biomarkers, longitudinal trending.'],
 ['Three payment rails, server-verified','StoreKit 2, Google Play Billing, Razorpay, with reconciliation jobs.'],
 ['Six background jobs','Report processing, subscription expiry, transaction reconciliation, check-in scheduling, feed agent.']];

const ROADMAP=[
 ['Shipped',['iPhone, Apple Watch and Android apps','Grounded chat with model choice','Family graph, dependents, shared plans','Multimodal check-ins','Vision-read lab reports','Medication reminders and adherence','Doctor portal','Three billing rails']],
 ['Rolling out',['Barcode nutrition (Open Food Facts)','Medicine safety flags (openFDA, India Drug Registry)','Newborn growth curves and vaccine calendar (WHO)','Plain-language lab explanations (MedlinePlus)','Research-cited answers (PubMed, OpenAlex)']],
 ['Next',['Regional language support','Lab booking with auto-import','Pharmacy integration','Sleep staging and HRV depth','District-level outbreak alerts']],
 ['Horizon',['Predictive risk forecasting','ABDM interoperability','Hospital EHR via FHIR','Pregnancy and child development','White-label B2B']]];

export default function Investors(){
  useEffect(()=>{window.scrollTo(0,0);},[]);
  useEffect(()=>{const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.1});
    document.querySelectorAll('.px-rv:not(.in)').forEach(el=>io.observe(el));return()=>io.disconnect();});
  return(
  <div className="px">
    <SiteNav slug="investors" alwaysStuck/>

    <header className="px-hero" style={{paddingBottom:'clamp(40px,6vw,80px)'}}>
      <div className="px-wrap">
        <Mast k="Investors"/>
        <h1 className="px-hero__h1" style={{maxWidth:'16ch'}}>The health record <i>most of the world</i> doesn't have yet.</h1>
        <p className="px-hero__sub" style={{maxWidth:'62ch'}}>A billion people are getting older, sicker and more connected at the same time, in a country where a consultation lasts ten minutes and nothing is written down. RichHealth is the record that gets written, for a household rather than a person.</p>
        <div className="px-hero__btns">
          <a href="mailto:hello@richhealth.app?subject=Investor%20enquiry" className="px-btn px-btn--fill">Request the deck</a>
          <a href="#/" className="px-btn px-btn--line">See the product</a>
        </div>
      </div>
    </header>

    <section className="px-band px-band--alt"><div className="px-wrap">
      <Mast k="Why now"/><div className="px-head px-rv"><h2 className="px-h2">The market is arriving <i>at the same time</i> as the need.</h2></div>
      <div className="px-rv">{STATS.map(([n,d,s],i)=>(
        <div className="px-src" key={i}><div className="px-src__n" style={{fontSize:22,color:'var(--px-teal)'}}>{n}</div>
        <div className="px-src__d">{d}</div><div className="px-src__t">{s}</div></div>))}
      </div>
    </div></section>

    <section className="px-band"><div className="px-wrap">
      <Mast k="The gap"/><div className="px-head px-rv" style={{maxWidth:'62ch'}}>
        <h2 className="px-h2">Everyone solves <i>one axis.</i> Health is four.</h2>
        <p className="px-lede">Family, intelligence, continuity and India. Every serious player owns one or two. Nobody spans all four, which is the whole opportunity.</p></div>
      <div className="px-rv">{WEDGE.map(([c,who,gap],i)=>(
        <div className="px-src" key={i}><div className="px-src__n">{c}</div>
        <div className="px-src__d">{gap}</div><div className="px-src__t">{who}</div></div>))}
      </div>
    </div></section>

    <section className="px-band px-band--alt"><div className="px-wrap">
      <Mast k="What exists today"/><div className="px-head px-rv" style={{maxWidth:'62ch'}}>
        <h2 className="px-h2">This is <i>built</i>, not a deck.</h2>
        <p className="px-lede">Three shipped native apps on one backend, in production with paying tiers.</p></div>
      <div className="px-rows px-rv">{BUILT.map(([t,b],i)=>(
        <div className="px-row" key={i}><div className="px-row__n">{String(i+1).padStart(2,'0')}</div>
        <div className="px-row__b"><b>{t}</b><p>{b}</p></div></div>))}
      </div>
    </div></section>

    <section className="px-band"><div className="px-wrap">
      <Mast k="Roadmap"/><div className="px-head px-rv"><h2 className="px-h2">Where it goes <i>next.</i></h2></div>
      <div className="px-grid px-rv" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))',gap:24}}>
        {ROADMAP.map(([phase,items],i)=>(
          <div key={i}>
            <div style={{fontFamily:'var(--px-mono)',fontSize:11,letterSpacing:'.16em',textTransform:'uppercase',
              color:i<2?'var(--px-teal)':'var(--px-lo)',paddingBottom:12,borderBottom:'1px solid var(--px-line)',marginBottom:14}}>{phase}</div>
            {items.map((x,j)=>(<div key={j} style={{fontSize:13.5,lineHeight:1.5,color:'var(--px-mid)',padding:'8px 0'}}>{x}</div>))}
          </div>))}
      </div>
    </div></section>

    <section className="px-band px-band--alt"><div className="px-wrap">
      <Mast k="How we talk about it"/><div className="px-head px-rv" style={{maxWidth:'62ch'}}>
        <h2 className="px-h2">We’d rather be <i>trusted</i> than impressive.</h2>
        <p className="px-lede">Health claims are easy to inflate and expensive to retract. Some things we deliberately do not say:</p></div>
      <div className="px-rows px-rv">
        <div className="px-row"><div className="px-row__n">01</div><div className="px-row__b"><b>Our council is multi-perspective, not multi-vendor</b><p>Several expert lenses reason in parallel and are reconciled. We don’t claim rival frontier vendors are debating each other.</p></div></div>
        <div className="px-row"><div className="px-row__n">02</div><div className="px-row__b"><b>Richie is not doctor-verified</b><p>Clinicians receive consented dossiers through the portal. We don’t claim physicians review every AI output.</p></div></div>
        <div className="px-row"><div className="px-row__n">03</div><div className="px-row__b"><b>Descriptive, never diagnostic</b><p>The product organises, explains and prepares. It does not diagnose or treat, and it says so in the interface.</p></div></div>
      </div>
    </div></section>

    <section className="px-band"><div className="px-wrap px-closer">
      <div className="px-rv">
        <Mast k="Talk to us"/>
        <h2 className="px-h2" style={{maxWidth:'20ch',marginInline:'auto'}}>We’re raising to <i>go deeper,</i> not wider.</h2>
        <p className="px-lede" style={{marginInline:'auto',textAlign:'center'}}>Predictive risk, regional languages and clinical interoperability, on a product that already ships.</p>
        <div style={{display:'flex',gap:12,justifyContent:'center',marginTop:30,flexWrap:'wrap'}}>
          <a href="mailto:hello@richhealth.app?subject=Investor%20enquiry" className="px-btn px-btn--fill">hello@richhealth.app</a>
          <a href="#/" className="px-btn px-btn--line">See the product</a>
        </div>
      </div>
    </div></section>

    {/* The figures note lived in this page's own stub footer. It belongs to the
        page, not to the site chrome, so it stays here as a page-level line and
        the real footer follows. */}
    <p className="px-figsnote">Figures are cited to public sources; product claims reflect what is shipped today.</p>
    <Foot/>
  </div>);
}
