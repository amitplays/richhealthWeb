import React, { useEffect, useRef, useState, useCallback } from 'react';
import './premium.css';
import logo from './assets/ic_launcher.png';

import sRichie from './assets/screens/ios/ios_richie_home.jpg';
import sAndroid from './assets/screens/android_richie_home.jpg';
import sFamilyChat from './assets/screens/ios/ios_family_chat.jpg';
import sModel from './assets/screens/ios/ios_model_picker.jpg';
import sWatchScr from './assets/screens/ios/ios_measurements_watch.jpg';
import sCheckin from './assets/screens/ios/ios_checkin.jpg';
import sNutri from './assets/screens/nutricheck_result.jpg';
import sProfile from './assets/screens/ios/ios_profile.jpg';
import sReports from './assets/screens/ios/ios_reports.jpg';
import sMeasure from './assets/Measurements.png';
import sServices from './assets/screens/services_hub_long.jpg';
import sMeds from './assets/screens/ios/ios_medications.jpg';
import sSymptoms from './assets/screens/ios/ios_symptoms.jpg';
import sFamily from './assets/screens/ios/ios_family.jpg';
import sAqi from './assets/screens/home_amit.jpg';
import sHub from './assets/screens/health_hub_clean.jpg';
import sPeriod from './assets/screens/health_hub_period.jpg';
import sClinic from './assets/photo/clinician_plate.jpg';

/* Verified free stock (Unsplash/Pexels). Two candidates each, then gradient fallback. */
export const STOCK={
  family:['https://images.pexels.com/photos/34653644/pexels-photo-34653644.jpeg?auto=compress&cs=tinysrgb&w=1200','https://images.pexels.com/photos/14825428/pexels-photo-14825428.jpeg?auto=compress&cs=tinysrgb&w=1200'],
  newborn:['https://images.unsplash.com/photo-1747245361930-bde9dad0cff2?w=1200&q=80&auto=format&fit=crop','https://images.unsplash.com/photo-1552819289-824d37ca69d2?w=1200&q=80&auto=format&fit=crop'],
  elder:['https://images.unsplash.com/photo-1633086973369-54e62600c76b?w=1200&q=80&auto=format&fit=crop','https://images.unsplash.com/photo-1632414237690-7713a79fe9d3?w=1200&q=80&auto=format&fit=crop'],
  thali:['https://images.unsplash.com/photo-1742281257707-0c7f7e5ca9c6?w=1200&q=80&auto=format&fit=crop','https://images.unsplash.com/photo-1742281257687-092746ad6021?w=1200&q=80&auto=format&fit=crop'],
  air:['https://images.unsplash.com/photo-1754373218517-18c577811d0d?w=1200&q=80&auto=format&fit=crop','https://images.unsplash.com/photo-1754373218884-b21e0ed385d8?w=1200&q=80&auto=format&fit=crop'],
  watch:['https://images.unsplash.com/photo-1679436204470-87dc7da1e8be?w=1200&q=80&auto=format&fit=crop','https://images.unsplash.com/photo-1777496410128-926b2d0083f9?w=1200&q=80&auto=format&fit=crop'],
};
export function Photo({srcs,alt}){const[i,setI]=useState(0);if(i>=srcs.length)return null;
  return <img className="px-photo__img fx-parallax" src={srcs[i]} alt={alt||''} loading="lazy" onError={()=>setI(i+1)}/>;}

/* ── hooks ── */
export function useReveal(){useEffect(()=>{const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.1,rootMargin:'0px 0px -50px 0px'});document.querySelectorAll('.px-rv:not(.in),.px-day:not(.in),.fx-stagger:not(.in)').forEach(el=>io.observe(el));return()=>io.disconnect();});}
/* One pointer listener for the whole page. Anything with .fx-glow gets --mx/--my
   in its own coordinate space, so a highlight can follow the cursor across it.
   rAF-throttled, and it writes nothing while the pointer is over nothing. */
export function useGlow(){useEffect(()=>{
  let raf=0,last=null;
  const on=e=>{ if(raf) return;
    raf=requestAnimationFrame(()=>{ raf=0;
      const el=e.target.closest&&e.target.closest('.fx-glow');
      if(el!==last&&last){ last.style.removeProperty('--mx'); last.style.removeProperty('--my'); }
      last=el; if(!el) return;
      const r=el.getBoundingClientRect();
      el.style.setProperty('--mx',`${e.clientX-r.left}px`);
      el.style.setProperty('--my',`${e.clientY-r.top}px`);
    });};
  window.addEventListener('pointermove',on,{passive:true});
  return()=>{ window.removeEventListener('pointermove',on); if(raf)cancelAnimationFrame(raf); };
},[]);}

/* ── "PICK ONE OF N", CODED ONCE ──────────────────────────────────────────────
   Four controls asked the same question and answered it four different ways: the
   billing toggle was a radiogroup, the platform toggle was a role=group of
   aria-pressed buttons, the carousel dots used aria-current, and the FAQ
   category pills carried nothing at all but an `.on` class. Every one of them is
   "exactly one of N is chosen", which is what role=radio means — so they are all
   radiogroups now, with the roving tabindex and the arrow keys a radiogroup is
   expected to have. This is that keyboard behaviour, written once. */
export function radioKeys(i,n,pick){
  return e=>{
    let t=-1;
    if(e.key==='ArrowRight'||e.key==='ArrowDown') t=(i+1)%n;
    else if(e.key==='ArrowLeft'||e.key==='ArrowUp') t=(i-1+n)%n;
    else if(e.key==='Home') t=0;
    else if(e.key==='End') t=n-1;
    else return;
    e.preventDefault(); pick(t);
    const g=e.currentTarget.parentElement;
    const b=g?g.querySelectorAll('[role="radio"]'):null;
    if(b&&b[t]) b[t].focus();
  };
}


/* ═══ THE HERO DEVICE — both platforms, always ════════════════════════════════
   The claim "iPhone and Android" was a line of 13px trust text under the lede
   while the art showed one iPhone. Now both devices are on the stage at once,
   one a step behind the other, so the claim is made by the composition rather
   than by a sentence — it is true standing still, not only mid-animation.

   The swap is the founder's idea and it is the right one: the back card comes
   forward while the front recedes, which reads as "there are two of these"
   rather than as one image being replaced. transform + opacity only, so it
   composites; no 3D, which would force a backdrop root.

   The label is also the control. Auto-advance carries an obvious way to stop it
   (WCAG 2.2.2), it only runs while the hero is on screen, and it never starts
   under prefers-reduced-motion — where you simply get both phones, still. */
const PHONES=[
  {k:'ios', label:'iPhone', img:sRichie, alt:'Richie answering on iPhone', island:true},
  {k:'and', label:'Android', img:sAndroid, alt:'Richie answering on Android', island:false},
];
function TwoPhones(){
  const [n,setN]=useState(0);
  const [auto,setAuto]=useState(true);
  const [seen,setSeen]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{ const el=ref.current; if(!el) return;
    const io=new IntersectionObserver(e=>setSeen(e[0].isIntersecting),{threshold:.35});
    io.observe(el); return()=>io.disconnect(); },[]);
  useEffect(()=>{ if(!auto||!seen) return;
    if(window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const t=setInterval(()=>{ setMoved(true); setN(i=>1-i); },5200);
    return()=>clearInterval(t); },[auto,seen]);
  const [moved,setMoved]=useState(false);
  const swap=i=>{ setMoved(true); setN(i); };
  const pick=i=>{ setAuto(false); swap(i); };

  return(
  <div className="px-two" ref={ref}>
    <div className="px-two__deck">
      {PHONES.map((p,i)=>(
        /* The class carries the animation-name, so changing it on a swap restarts
           the keyframes for free — no key churn, no remount, the <img> is never
           refetched. `moved` keeps the first paint static; nothing should animate
           before the reader has arrived. */
        <div className={`px-air px-air--${p.k} ${n===i?'is-front':'is-back'} ${moved?'is-live':''}`} key={p.k}
          style={{zIndex:n===i?2:1}} aria-hidden={n!==i}>
          <div className="px-air__scr">
            <img src={p.img} alt={n===i?p.alt:''}/>
            {p.island&&<div className="px-air__isl"/>}
          </div>
        </div>))}
    </div>
    <div className="px-two__sw">
      <span className="px-two__lead" id="px-two-lead">Available on</span>
      <div className="px-two__seg" role="radiogroup" aria-labelledby="px-two-lead">
        {/* `translate`, not a transform — the billing thumb next to it already
            animated on `translate`, and two identical controls must not be
            driven by two different properties. */}
        <i className="px-two__ink" style={{translate:`${n*100}% 0`}} aria-hidden="true"/>
        {PHONES.map((p,i)=>(
          <button key={p.k} type="button" role="radio" aria-checked={n===i}
            tabIndex={n===i?0:-1} className={n===i?'on':''}
            onKeyDown={radioKeys(i,PHONES.length,pick)}
            onClick={()=>pick(i)}>{p.label}</button>))}
      </div>
    </div>
  </div>);
}

/* ═══ ICONS ══════════════════════════════════════════════════════════════════
   Lifted verbatim from the Android app's own vector drawables
   (app/src/main/res/drawable/*.xml) rather than hand-drawn here. The site was
   using approximations I invented; these are the shapes the product actually
   ships. Material-style filled paths.
   The drawables wrap their path in <group android:translateY="960"> and author
   it in NEGATIVE y — dropping that transform on the first pass put every icon
   above its own viewBox, so eleven of twelve rendered blank. The offset lives in
   the viewBox here rather than a wrapper <g>, which keeps each icon to one path. */
const APPICON={
  msg:{vb:'0 -960 960 960',d:'M282-304q-14.45 0-24.23-9.77Q248-323.55 248-338v-44h491l33 33v-395h43.67q15.23 0 24.78 9.78Q850-724.45 850-710v544L712-304H282Zm-172-20v-522.4q0-14.28 9.78-23.94Q129.55-880 144-880h514q14.45 0 24.22 9.78Q692-860.45 692-846v350q0 14.45-9.78 24.22Q672.45-462 658-462H248L110-324Z'},
  upload:{vb:'0 -960 960 960',d:'M180-100v-53h600v53H180Zm187-173v-254H222l258-333 257 333H592v254H367Z'},
  analysis:{vb:'0 -960 960 960',d:'M106-139v-54h748v54H106Zm34-154v-207h94v207h-94Zm194 0v-407h94v407h-94Zm196 0v-287h94v287h-94Zm196 0v-527h94v527h-94Z'},
  health:{vb:'0 -960 960 960',d:'M299-127v-172H127v-148h228l63 98q4 6 8.5 9t12.41 3q9.09 0 15.59-4.5T465-356l63-178 50 74q4.12 6.11 9.29 9.56Q592.47-447 600-447h233v148H661v172H299Zm133-287-50-75q-5-6-9.5-9t-12.5-3H127v-160h172v-172h362v172h172v160H604l-61-98q-3.85-5.67-9.67-8.83Q527.5-611 519.8-611q-8.8 0-14.8 4.5T495-592l-63 178Z'},
  nutri:{vb:'0 -960 960 960',d:'M309.5-229.5Q239-300 239-400q0-75 42-136t113-88q-57-19-85.5-72T281-811q8-2 10.5.5T290-806q-4 4-8 1t-2-13q76-3 134 41.5T481-659q13-28 29-54t39-49q8-8 17.5-9t18.5 6q10 8 10.5 20t-8.5 21q-20 20-34 42.5T527-633q85 14 139.5 80T721-400q0 100-70.5 170.5T480-159q-100 0-170.5-70.5Zm303-38Q667-322 667-400t-54.5-132.5Q558-587 480-587t-132.5 54.5Q293-478 293-400t54.5 132.5Q402-213 480-213t132.5-54.5ZM480-400Z'},
  family:{vb:'0 -960 960 960',d:'M245.45-293q-27.45 0-46.95-19.73-19.5-19.73-19.5-47.43Q179-389 198.73-408q19.73-19 47.43-19 27.29 0 46.57 19.16Q312-388.68 312-360.34t-19.55 47.84q-19.55 19.5-47 19.5Zm468 0q-27.45 0-46.95-19.73-19.5-19.73-19.5-47.43Q647-389 666.73-408q19.73-19 47.43-19 27.29 0 46.56 19.16Q780-388.68 780-360.34t-19.55 47.84q-19.55 19.5-47 19.5Zm-231.74-40q-35.71 0-61.21-24.96-25.5-24.97-25.5-61.12Q395-456 420.17-481t61.62-25Q517-506 543-481.21t26 61.5Q569-383 543.21-358t-61.5 25ZM299-99q13-63 63.87-105 50.86-42 119-42Q550-246 600-204t63 105H299Zm-199 0q0-62 42-104t104-42q17.28 0 34.52 4.5Q297.77-236 313-228q-26.86 25.59-43.98 58.89-17.13 33.3-24.51 70.11H100Zm617 0q-6.89-37.81-23.95-70.9Q676-203 648-229q16-7 31.96-11.5Q695.91-245 714-245q62 0 104 42t42 104H717ZM87-493l-31-41 426-326 164 126v-86h93v157l169 129-33 41-393-300L87-493Z'},
  checkin:{vb:'0 -960 960 960',d:'m440-154 31 26Q336-253 254.5-335.5T130-474.5q-43-56.5-56.5-98T60-655q0-82 57.5-139.5T258-852q49 0 96 26.5t86 76.5q39-50 86-76.5t96-26.5q90 0 152 65.5T826-617q-30-22-63.5-35.5T693-666q-108 1-173.5 64T454-442q0 55 24.5 101t70.5 80q-21 20-33.5 33.5T478-190l-38 36Zm278-177-95-95 38-39 57 58 141-143 38 39-179 180Z'},
  ai:{vb:'0 0 24 24',d:'M21,7L3,7c-1.1,0 -2,0.9 -2,2v6c0,1.1 0.9,2 2,2h18c1.1,0 2,-0.9 2,-2L23,9c0,-1.1 -0.9,-2 -2,-2zM11,13L9,13v2L7,15v-2L5,13v-2h2L7,9h2v2h2v2zM15.5,15h-2v-2h2v2zM19.5,15h-2v-2h2v2z'},
  air:{vb:'0 -960 960 960',d:'M452-164q-44 0-74.5-26.5T338-258h56q8 16 24 28t34 12q25 0 43.5-18.5T514-280q0-25-18.5-40.5T452-336H86v-54h366q51 0 83.5 29.5T568-280q0 51-32.5 83.5T452-164ZM86-572v-54h528q34 0 59-23t25-57q0-34-25-56t-59-22q-28 0-49 18t-29 42h-56q9-51 45-82.5t89-31.5q60 0 99 38t39 98q0 60-39 95t-99 35H86Zm674 328v-56q26-8 43-25.5t17-48.5q0-36-23-58t-59-22H86v-54h652q63 0 99.5 35.5T874-374q0 56-30 88.5T760-244Z'},
  meds:{vb:'0 0 960 960',d:'M464.62,580L495.38,580L495.38,495.38L580,495.38L580,464.62L495.38,464.62L495.38,380L464.62,380L464.62,464.62L380,464.62L380,495.38L464.62,495.38L464.62,580ZM215.38,800Q192.33,800 176.16,783.84Q160,767.67 160,744.62L160,215.38Q160,192.33 176.16,176.16Q192.33,160 215.38,160L744.62,160Q767.67,160 783.84,176.16Q800,192.33 800,215.38L800,744.62Q800,767.67 783.84,783.84Q767.67,800 744.62,800L215.38,800Z'},
  symptoms:{vb:'0 -960 960 960',d:'M722.65-145q-50.65 0-85.61-35.38-34.95-35.37-35.04-85.79 0-24.83 10.08-47.36Q622.15-336.06 641-354l81-75 81 75.21q18 16.79 28.5 40.29t10.5 47.79q-1 49.71-35.23 85.21-34.22 35.5-84.12 35.5ZM402-422.12q-32-32.12-32-78T402.12-578q32.12-32 78-32T558-577.88q32 32.12 32 78T557.88-422q-32.12 32-78 32T402-422.12ZM479.59-222q-139.04 0-251.81-76Q115-374 60-500q55-126 167.86-202 112.85-76 252-76Q619-778 732-702t168 202q-8 18.21-16.67 35.21-8.66 17-19.33 32.79L714-567l-81 82q3-4 4.5-8.88 1.5-4.87 1.5-10.12-2-65.67-47.86-110.83Q545.28-660 479.76-660 413-660 366.5-613.26 320-566.53 320-499.76 320-433 366.67-387q46.66 46 113.33 46 11.48 0 22.2-2.17 10.71-2.16 19.8-6.83-15 30-19.5 62.5t3.5 64.53q-6.44.97-12.99.97h-13.42Z'},
  reports:{vb:'0 -960 960 960',d:'M346-506v-28h268v28H346Zm0-160v-28h268v28H346ZM236-387h287q26.02 0 47.63 11.3 21.6 11.3 37.37 31.7l116 150v-580q0-14-9-23t-23-9H268q-14 0-23 9t-9 23v387Zm32 233h419L565-311q-8-10-18.67-16-10.66-6-23.33-6H236v147q0 14 9 23t23 9Zm424 54H268q-36.73 0-61.36-24.64Q182-149.27 182-186v-588q0-36.72 24.64-61.36Q231.27-860 268-860h424q36.72 0 61.36 24.64T778-774v588q0 36.73-24.64 61.36Q728.72-100 692-100Zm-456-54v-652 652Zm0-179v-54 54Z'},
  sick:{vb:'0 -960 960 960',d:'m336-508 71-72-72-72-29 29 43 42-43 43 30 30Zm454-122q-21-21-21-50 0-25 13-51.5t58-92.5q45 66 58 92.5t13 51.5q0 29-21 50t-50 21q-29 0-50-21ZM625-508l30-30-43-43 42-42-29-29-72 72 72 72Zm-145 90q-29 0-57 7.5T369-385l-155-90q-1-15-7-28.5T188-524q-18-11-38.5-5.5T119-505q-11 18-6 38.5t24 30.5q12 7 27.5 6t28.5-8l140 81q-14 14-24.5 30T290-292h50q21-36 57-59t83-23q47 0 83 23t57 59h50q-28-60-79-93t-111-33Zm0 318q-78 0-147.5-30T211-212q-52-52-81.5-120.5T100-480q0-79 29.5-147.5T211-748q52-52 121.5-82T480-860q70 0 131.5 23.5T723-771q-12 21-21 44t-9 47q0 57 37 98t93 48q9 0 17-3t15-9q4 16 4.5 32.5t.5 33.5q0 79-29.5 148t-81 120.5Q698-160 628.5-130T480-100Z'},
  ruler:{vb:'0 -960 960 960',d:'M232-199v-301q0-125.28 87.8-213.14Q407.6-801 532.8-801T746-713.2q88 87.8 88 213T746.14-287Q658.28-199 533-199H232Zm54-54h247q103 0 175-72t72-175q0-103-72-175t-175-72q-103 0-175 72t-72 175v247Zm337-157q37-37 37-90t-37-90q-37-37-90-37t-90 37q-37 37-37 90t37 90q37 37 90 37t90-37Zm-142-38.12q-21-21.12-21-52T481.12-552q21.12-21 52-21T585-551.88q21 21.12 21 52T584.88-448q-21.12 21-52 21T481-448.12ZM126-199v-174h54v174h-54Zm407-301Z'},
  gyn:{vb:'0 -960 960 960',d:'m390-139-14-27q-8-15-11.5-32t-3.5-34q0-23 6.5-43.5T386-313q8-13 13-28t5-29q0-16-6-31.5T384-433q-8-18-14.5-36.5T363-508v-112q0-33-20.5-58T290-703q-25 0-44.5 10.5T222-661q32 10 53 37t21 64q0 44-31.5 75.5T189-453q-44 0-75.5-31.5T82-560q0-38 24-66.5t60-35.5q8-41 43-68t81-27q9 0 16.5 1.5T321-752q36-20 77-27.5t82-7.5q43 0 83.5 7.5T640-752q7-2 15-3.5t16-1.5q46 0 81 27t43 68q36 8 59.5 36t23.5 66q0 44-31.5 75.5T771-453q-44 0-75.5-31.5T664-560q0-37 21-64.5t54-36.5q-6-21-25-31.5T671-703q-32 0-53 25t-21 58v112q0 20-6.5 38.5T575-433q-7 16-13 31.5t-6 31.5q0 14 4 29.5t14 28.5q12 18 18.5 37.5T599-232q0 17-4 34t-12 32l-14 28-49-25 14-27q5-10 8-20.5t3-21.5q0-14-4.5-26.5T529-283q-14-20-20.5-41.5T502-369q0-20 7-40t15-38q8-14 13.5-29t5.5-32v-112q0-29 12-54.5t33-38.5q-26-11-53-15.5t-55-4.5q-28 0-55.5 4T372-714q21 13 33 39t12 55v112q0 18 5.5 32.5T435-446q9 18 16 38t7 39q0 23-7 45t-20 41q-7 12-11.5 24.5T415-232q0 11 3 21.5t7 21.5l13 26-48 24Z'},
  doc:{vb:'0 -960 960 960',d:'M626.5-343.5Q598-372 598-412t28.5-68.5Q655-509 695-509t68.5 28.5Q792-452 792-412t-28.5 68.5Q735-315 695-315t-68.5-28.5ZM478-61v-103q0-15.57 7.53-28.25Q493.05-204.94 506-213q29.51-16.96 61.43-27.96 31.91-11 65.57-17.04l62 83 61-83q34.14 6.04 66.6 17.04 32.46 11 62.4 27.96 13 7 19.5 19.5T912-167v106H478ZM358-164v25H226.48q-37.48 0-61.98-24.63Q140-188.25 140-225v-506q0-36.75 24.63-61.38Q189.25-817 226-817h508q36.75 0 61.38 24.62Q820-767.75 820-731v147q-23-21-57.5-33T696-629q-7 0-13 .5t-13 1.5v-35H290v54h318q-38 13-65.5 40T500-505H290v54h193q-5 21-5.5 43.5T482-363q-9 4-17.5 7.5T448-348H290v54h124q-28 25-42 59.5T358-164Z'},
  pill:{vb:'0 -960 960 960',d:'m631-368 115-114q25.94-26.02 40.47-60.58Q801-577.13 801-615.06q0-78.22-53.96-132.08Q693.08-801 614.72-801q-37.51 0-72.1 14.53Q508.02-771.94 482-746L368-631l263 263ZM345.28-159q37.51 0 72.1-14.53Q451.98-188.06 478-214l114-115-263-263-115 114q-25.94 26.02-40.47 60.58Q159-382.87 159-344.94q0 78.22 53.96 132.08Q266.92-159 345.28-159Z'},
  famgrp:{vb:'0 -960 960 960',d:'M245.45-293q-27.45 0-46.95-19.73-19.5-19.73-19.5-47.43Q179-389 198.73-408q19.73-19 47.43-19 27.29 0 46.57 19.16Q312-388.68 312-360.34t-19.55 47.84q-19.55 19.5-47 19.5Zm468 0q-27.45 0-46.95-19.73-19.5-19.73-19.5-47.43Q647-389 666.73-408q19.73-19 47.43-19 27.29 0 46.56 19.16Q780-388.68 780-360.34t-19.55 47.84q-19.55 19.5-47 19.5Zm-231.74-40q-35.71 0-61.21-24.96-25.5-24.97-25.5-61.12Q395-456 420.17-481t61.62-25Q517-506 543-481.21t26 61.5Q569-383 543.21-358t-61.5 25ZM299-99q13-63 63.87-105 50.86-42 119-42Q550-246 600-204t63 105H299Zm-199 0q0-62 42-104t104-42q17.28 0 34.52 4.5Q297.77-236 313-228q-26.86 25.59-43.98 58.89-17.13 33.3-24.51 70.11H100Zm617 0q-6.89-37.81-23.95-70.9Q676-203 648-229q16-7 31.96-11.5Q695.91-245 714-245q62 0 104 42t42 104H717ZM87-493l-31-41 426-326 164 126v-86h93v157l169 129-33 41-393-300L87-493Z'},
  /* The app's own model glyphs, lifted from android/res/drawable/ic_model_*.xml.
     (iOS has no such assets in the repo — ModelIcon.swift looks up "ic_model_*"
     and falls back to SF Symbols when it is missing, so Android IS the source.)
     MOST OF THESE ARE STROKED, NOT FILLED, and several are two paths. Flattening
     them to one filled `d` — which is what was here — turned GPT's outlined
     hexagon into a solid blob and Claude's asterisk into nothing. Each path now
     carries its own stroke/fill exactly as the drawable declares it. */
  mGemini:{vb:'0 0 24 24',p:[{d:'M12,1 C12,7 12,7 23,12 C12,17 12,17 12,23 C12,17 12,17 1,12 C12,7 12,7 12,1 Z'}]},
  mGpt:{vb:'0 0 24 24',p:[{d:'M12,2.5 L20.1,7.25 L20.1,16.75 L12,21.5 L3.9,16.75 L3.9,7.25 Z',s:1,w:2,lj:'round',nf:1},{d:'M12,9.5 A2.5,2.5 0 1,0 12,14.5 A2.5,2.5 0 1,0 12,9.5 Z'}]},
  mClaude:{vb:'0 0 24 24',p:[{d:'M12,3 L12,21 M3,12 L21,12 M5.6,5.6 L18.4,18.4 M5.6,18.4 L18.4,5.6',s:1,w:2,lc:'round',nf:1}]},
  mDeep:{vb:'0 0 24 24',p:[{d:'M12,12 m-7.5,0 a7.5,7.5 0 1,0 15,0 a7.5,7.5 0 1,0 -15,0',s:1,w:2,nf:1},{d:'M12,12 m-2.6,0 a2.6,2.6 0 1,0 5.2,0 a2.6,2.6 0 1,0 -5.2,0'}]},
  mLlama:{vb:'0 0 24 24',p:[{d:'M9,12 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0',s:1,w:2,nf:1},{d:'M15,12 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0',s:1,w:2,nf:1}]},
  mMistral:{vb:'0 0 24 24',p:[{d:'M4,6 L20,6 L20,9 L4,9 Z M4,10.5 L20,10.5 L20,13.5 L4,13.5 Z M4,15 L20,15 L20,18 L4,18 Z'}]},
  mAuto:{vb:'0 0 24 24',p:[{d:'M10,2 L11.7,7.3 L17,9 L11.7,10.7 L10,16 L8.3,10.7 L3,9 L8.3,7.3 Z'},{d:'M18,13.5 L18.8,16.2 L21.5,17 L18.8,17.8 L18,20.5 L17.2,17.8 L14.5,17 L17.2,16.2 Z'}]},
  mMax:{vb:'0 0 24 24',p:[{d:'M13,2 L4,13 L11,13 L10,22 L20,10 L13,10 Z'}]},
  chev:{vb:'0 -960 960 960',d:'m317-92-51-51 338-338-338-338 51-51 389 389L317-92Z'},
  check:{vb:'0 0 24 24',d:'M9,16.17L4.83,12l-1.42,1.41L9,19 21,7l-1.41,-1.41z'},
  lock:{vb:'0 -960 960 960',d:'M480.02-100Q352-136 267-252.56 182-369.11 182-516v-230l298-112 298 112v229.57Q778-369 693.02-252.5t-213 152.5ZM407-326h146q17.75 0 30.38-12.63Q596-351.25 596-369v-118.63q0-13.12-8.62-21.75Q578.75-518 566-518h-9v-40q0-32-21.79-53t-54-21Q449-632 427-611t-22 53v40h-11q-12.75 0-21.37 8.62Q364-500.75 364-488v119q0 17.75 12.63 30.37Q389.25-326 407-326Zm34-192v-40q0-17 11.5-28.5T481-598q17 0 28.5 11.5T521-558v40h-80Z'},
  stetho:{vb:'0 -960 960 960',d:'M553.13-92q-96.87 0-163.5-69T323-328v-21q-86-10-144.5-74.5T120-577v-210h136v-50h54v154h-54v-50h-82v156q0 73 51.5 124.5T350-401q73 0 124.5-51.5T526-577v-156h-82v50h-54v-154h54v50h136v210q0 89-58.5 153.5T377-349v21q0 75 50.79 128.5T553-146q74 0 124-53.5T727-328v-64q-26-9-43-31t-17-51q0-35.83 25.62-61.42Q718.24-561 754.12-561q35.88 0 61.38 25.58Q841-509.83 841-474q0 29-17 51t-43 31v64q0 98-65.5 167T553.13-92ZM777-451q10-10 10-23t-10-23q-10-10-23-10t-23 10q-10 10-10 23t10 23q10 10 23 10t23-10Zm-23-23Z'},
  today:{vb:'0 -960 960 960',d:'M226-102q-36.73 0-61.36-24.64Q140-151.27 140-188v-508q0-36.72 24.64-61.36Q189.27-782 226-782h48v-88h58v88h300v-88h54v88h48q36.72 0 61.36 24.64T820-696v246l-54 54v-152H194v360q0 12 10 22t22 10h221l55 54H226Zm-32-500h572v-94q0-12-10-22t-22-10H226q-12 0-22 10t-10 22v94Zm0 0v-126 126ZM665-80 544-200l38-38 84 84 168-169 39 37L665-80Z'},
  cognition:{vb:'0 -960 960 960',d:'M279-119v-151q-57-54-88.5-118.79Q159-453.57 159-520.72q0-133.45 93.62-226.87Q346.25-841 480-841q107 0 195.41 66.27Q763.82-708.45 790-604l37.32 151.92Q832-432 819.45-415.5 806.91-399 786-399h-65v114q0 36.75-24.62 61.37Q671.75-199 635-199h-74v80H279Zm108.82-304q30.83 0 52.85-21.67l120.49-120.49Q583-587 583-617.82q0-30.83-22-53.18-22.35-22-53.18-22-30.82 0-52.5 22-27.32-11-54.73-5.31-27.41 5.69-46.31 24.59-18.9 18.9-24.59 46.31Q324-578 335-550.68q-22 22.03-22 52.86Q313-467 335-445t52.82 22Z'},
};
export function Ico({n,size=16,cls=''}){const i=APPICON[n]; if(!i) return null;
  /* two shapes: the Material icons are a single filled path (`d`), the app's
     model glyphs are a list of paths that may be stroked (`p`). */
  const paths=i.p||[{d:i.d}];
  return(<svg className={cls} width={size} height={size} viewBox={i.vb}
    fill="currentColor" aria-hidden="true">
    {paths.map((q,x)=><path key={x} d={q.d}
      fill={q.nf?'none':'currentColor'}
      stroke={q.s?'currentColor':undefined}
      strokeWidth={q.s?(q.w||1.6):undefined}
      strokeLinecap={q.lc} strokeLinejoin={q.lj}/>)}
  </svg>);}

const I={
  spark:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/></svg>,
  arrow:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  inbox:<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5.5h13L22 12v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6z"/></svg>,
  pill:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 1.5l-8 8a5 5 0 007.07 7.07l8-8a5 5 0 00-7.07-7.07z"/><path d="M7 11l4-4"/></svg>,
  sun:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/></svg>,
  heart:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M19.5 12.6l-7.5 7.4-7.5-7.4A5 5 0 1112 6a5 5 0 017.5 6.6"/></svg>,
  bell:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 10-12 0c0 7-3 8-3 8h18s-3-1-3-8"/><path d="M13.7 21a2 2 0 01-3.4 0"/></svg>,
  chart:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 15l4-5 4 3 5-7"/></svg>,
};

/* ── shells ── */
export function Mast({k}){return(<div className="px-mast"><span className="px-kicker">{k}</span><i aria-hidden="true"/></div>);}
export function Head({k,t,l,c}){return(<><Mast k={k}/><div className={`px-head ${c?'px-head--c':''} px-rv`}><h2 className="px-h2">{t}</h2>{l&&<p className="px-lede">{l}</p>}</div></>);}
export function Band({id,alt,first,children}){return(<section className={`px-band ${alt?'px-band--alt':''} ${first?'px-band--first':''}`} id={id}>{children}</section>);}
export function Dev({src,alt}){return(<div className="px-dev fx-card fx-glow"><img src={src} alt={alt}/></div>);}

/* ═══ CROP — a screenshot shown at the size you can actually read ═══
   `Dev` renders a 1206x2622 capture into a 296px frame: a 4.07x downscale, which
   puts the app's 13pt body type at about 3 CSS pixels and fills half the frame
   with chat space nobody needs to see. Every screenshot on the site was doing
   that.

   `Crop` takes the SAME real capture and a focus rectangle in fractions of the
   source, and renders only that region — at roughly 1.4x device size, so the
   part being talked about is bigger on the page than it is in your hand. The
   phone stays behind it as a hint of where the panel came from, cropped and
   faded rather than drawn in full.

   focus = [x, y, w, h], each 0-1 of the source image.
   Every capture is 1206x2622, so the panel's aspect ratio is arithmetic. */
const SHOT_W=1206, SHOT_H=2622;
export function Crop({src,alt,focus,cap,flip}){
  const [x,y,w,h]=focus;
  return(
  <figure className={`px-crop ${flip?'is-flip':''}`}>
    <div className="px-crop__ph" aria-hidden="true"><img src={src} alt=""/></div>
    <div className="px-crop__panel fx-card fx-glow" role="img" aria-label={alt}
      style={{aspectRatio:`${(w*SHOT_W)/(h*SHOT_H)}`,
        backgroundImage:`url(${src})`,
        backgroundSize:`${100/w}% auto`,
        /* background-position in % positions the IMAGE's x% point at the BOX's
           x% point, so the fraction has to be renormalised by the leftover. */
        backgroundPosition:`${w<1?(x/(1-w))*100:0}% ${h<1?(y/(1-h))*100:0}%`}}/>
    {cap&&<figcaption className="px-crop__cap">{cap}</figcaption>}
  </figure>);}
export function Rows({items}){return(<div className="px-rows px-rv fx-stagger">{items.map(([t,b,e],i)=>(<div className="px-row" key={i} style={{'--i':i}}>{/* No 01/02/03 here. These are four separate capabilities, not four steps —
          a numbered marker would be claiming a sequence that does not exist. */}
        <div className="px-row__n" aria-hidden="true"/><div className="px-row__b"><b>{t}</b><p>{b}</p>{e&&<em>{e}</em>}</div></div>))}</div>);}
function PhotoCard({srcs,icon,title,body,frag}){return(
  <div className="px-photo fx-card fx-glow"><Photo srcs={srcs} alt={title}/>
    {frag&&<div className="px-photo__frag">{frag}</div>}
    <div className="px-photo__b"><h4>{icon}{title}</h4><p>{body}</p></div>
  </div>);}
function Frag({icon,title,time,body}){return(
  <div className="px-frag2"><div className="px-frag2__t"><span className="px-frag2__ico">{icon}</span><b>{title}</b><em>{time}</em></div><p>{body}</p></div>);}

/* ═══ NAV ═══ */
/* One nav for the whole site. Before the split the homepage nav spied on section
   ids; four of those sections now live on their own pages, so the links pointed at
   nothing. The nav now names *pages*, is identical everywhere, and marks the page
   you are on. Pricing and the CTA are written route-first (`#/#id`) so the same
   href works from home and from a product page — App.js resolves both. */
/* One nav, and almost nothing in it. Raycast, Linear, Cash App and Vercel all
   carry a logo, one or two links and a CTA — the feature-page nav was mine, not
   the category's. India, Privacy and Our sources live in the footer, where the
   people who want reassurance go looking for it. */
/* The feature pages, named once. Deep.js owns their CONTENT; this owns the fact
   that they exist and what they are called, because the nav has to list them and
   Deep.js already imports from here — putting the list there instead would make
   the import circular. */
/* Ordered as a reader would meet them: the assistant, then what it produces,
   then the day-to-day, then who else is involved, then the proof.
   Third entry is the icon — eleven names stacked in one column was a scroll of
   text; four columns with a mark each is scannable at a glance. */
export const FEATURES=[
 ['richie','Richie','msg'],
 ['checkins','Health check-ins','checkin'],
 ['day','Every day','today'],
 ['cycle','Cycle intelligence','gyn'],
 ['family','Family and dependants','famgrp'],
 ['watch','Watch & Health Connect','health'],
 ['doctors','For doctors','stetho'],
 ['india','Built for India','meds'],
 ['evidence','Our sources','cognition'],
 ['privacy','Privacy','lock'],
];
/* One logo, used by the nav and the footer — it was duplicated markup with an
   inline style at both sites.

   href="#/" alone was a dead control on the home page: usePage only scrolls on
   `hashchange`, and clicking "#/" while the hash is already "#/" fires no event,
   so the logo did nothing. The route change is still the anchor's job (so
   middle-click and "open in new tab" keep working); the handler only covers the
   one case the hash cannot express — already home, scroll back to the top. */
export function Logo(){
  const home=()=>{const h=window.location.hash;return h===''||h==='#'||h==='#/';};
  return(
    <a className="px-logo" href="#/" aria-label="RichHealth home"
      onClick={e=>{ if(home()){ e.preventDefault();
        window.scrollTo({top:0,left:0,behavior:'smooth'}); } }}>
      <img src={logo} alt=""/><span>RichHealth<i>.ai</i></span>
    </a>);}

export function SiteNav({slug,alwaysStuck}){
  const[stuck,setStuck]=useState(!!alwaysStuck),[open,setOpen]=useState(false);
  /* ONE NAV FOR THE WHOLE SITE. The feature pages used to render a second nav of
     their own — seven long labels that wrapped onto two lines — plus a "Back to
     product" button, so a reader had to understand that they had left the site
     and find the way back. They are pages of this site, so they hang off this
     nav under Explore and the route simply changes underneath.

     It was called "Features" while a section link beside it said "What it does"
     — the same words for two different destinations, so a reader could not
     predict which one held what. The section is now "What it holds"; this is
     "Explore", which is already the name of that column in the footer. */
  const[feat,setFeat]=useState(false);
  const featRef=useRef(null),featBtn=useRef(null);
  const sheetRef=useRef(null),burgerRef=useRef(null),wasOpen=useRef(false);
  useEffect(()=>{ if(!feat) return;
    const away=e=>{ if(featRef.current&&!featRef.current.contains(e.target)) setFeat(false); };
    const esc=e=>{ if(e.key==='Escape'){ setFeat(false); featBtn.current?.focus(); } };
    document.addEventListener('pointerdown',away);
    document.addEventListener('keydown',esc);
    return()=>{ document.removeEventListener('pointerdown',away); document.removeEventListener('keydown',esc); };},[feat]);
  /* close the menu when the route changes under it */
  useEffect(()=>{ setFeat(false); setOpen(false); },[slug]);
  useEffect(()=>{ if(alwaysStuck) return;
    const on=()=>setStuck(window.scrollY>20);
    window.addEventListener('scroll',on,{passive:true}); on();
    return()=>window.removeEventListener('scroll',on);},[alwaysStuck]);

  /* ── THE SHEET IS A MODAL, and was not being treated as one ─────────────────
     It was a full-screen position:fixed overlay with no dialog role, no escape,
     no focus trap, no focus return and no scroll lock, so the page kept
     scrolling underneath a menu that covered it. It is the ONLY navigation a
     phone gets, so it gets the whole contract.

     The node is always mounted and toggled with `hidden`, not conditionally
     rendered: `hidden` takes it out of the accessibility tree AND lets the
     burger carry a permanent aria-controls that always resolves. */

  /* Scroll lock. The body is pinned at its current offset rather than the root
     being clipped — overflow on the root would clip a fixed child and is banned
     on this site anyway. The offset is only restored if the sheet closed WITHOUT
     navigating; a link inside the sheet changes the hash, and the router owns
     the scroll from there. */
  useEffect(()=>{
    if(!open) return undefined;
    const b=document.body, y=window.scrollY, h0=window.location.hash;
    const prev={position:b.style.position, top:b.style.top, width:b.style.width};
    b.style.position='fixed'; b.style.top=`-${y}px`; b.style.width='100%';
    document.documentElement.setAttribute('data-sheet','open');
    return()=>{ b.style.position=prev.position; b.style.top=prev.top; b.style.width=prev.width;
      document.documentElement.removeAttribute('data-sheet');
      if(window.location.hash===h0) window.scrollTo(0,y); };
  },[open]);

  /* Escape, first focus, and a real Tab cycle. The sheet carries its own close
     button, so the trap is simply "everything inside the dialog". */
  useEffect(()=>{
    if(!open) return undefined;
    const el=sheetRef.current; if(!el) return undefined;
    const tab=()=>[...el.querySelectorAll('a[href],button:not([disabled])')];
    const f0=tab()[0]; if(f0) f0.focus();
    const onKey=e=>{
      if(e.key==='Escape'){ e.preventDefault(); setOpen(false); return; }
      if(e.key!=='Tab') return;
      const f=tab(); if(!f.length) return;
      const first=f[0], last=f[f.length-1];
      if(e.shiftKey&&document.activeElement===first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey&&document.activeElement===last){ e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown',onKey);
    return()=>document.removeEventListener('keydown',onKey);
  },[open]);
  /* focus goes back to the control that opened it */
  useEffect(()=>{ if(open){ wasOpen.current=true; }
    else if(wasOpen.current){ wasOpen.current=false; burgerRef.current?.focus(); } },[open]);

  /* ── THE NAV MODEL ──────────────────────────────────────────────────────────
     Three links against TEN sections meant 6,710px of a 10,150px page — 66% of
     the scroll — with nothing lit: a "you are here" that was right a third of
     the time. One item per section would be ten items, which is a documentation
     sidebar, not a marketing bar. So each item owns a RANGE, in document order,
     and every section belongs to exactly one. The highlight is never orphaned.

     `key` is also the href target: clicking lands on the section the label names,
     while scrolling anywhere inside the range keeps it lit. */
  /* SIX, NOT FIVE. Every section on the page was already owned by an item —
     nothing was unmapped — but "What it holds" owned s-does, s-intake AND
     s-holds, which is 3,664px of scrolling with the indicator frozen. Sitting
     still for that long reads exactly like a section with no nav item. s-holds
     is its own thing anyway (the section is headed "Six more features"), so it
     gets its own item and no group now spans more than two sections.

     The hero and the 63px sources strip stay unmapped on purpose: one is the
     top of the page, which the logo already returns you to, and the other is a
     row of logos, not a destination. */
  /* ONE WORD EACH, AND THE SECTION FINISHES IT. The item you click is the first
     word of the eyebrow you land on: Why -> "Why this exists", Who -> "Who it's
     for", What -> "What it holds", Which -> "Which AI reads it", How -> "How it
     answers". The nav went from 817px of prose labels to a row of single words,
     and every section now announces itself with the word you used to get there.

     Price and FAQs stay nouns. They are the two destinations people look for by
     name rather than by question, and forcing them into the pattern ("What it
     costs", "What people ask") would cost clarity to buy symmetry.

     Ranges are contiguous — s-does and s-holds are both "what it does with your
     record" and now sit next to each other, which is why Holds moved ahead of
     Intake in the render below. Nothing spans a gap, so the indicator can never
     go backwards. */
  const links=[
    ['s-problem','Why',   ['s-problem']],
    ['s-who',    'Who',   ['s-who']],
    ['s-does',   'What',  ['s-does','s-holds']],
    ['s-intake', 'Which', ['s-intake']],
    ['s-proof',  'How',   ['s-proof']],
    ['s-pricing','Price', ['s-pricing']],
    ['s-faq',    'FAQs',  ['s-faq','s-get']],
  ];
  /* Flat list of every section and the item that owns it. Deliberately NOT
     assumed to be in document order: "What it holds" owns s-does, s-intake and
     s-holds, but s-proof sits between s-intake and s-holds on the page, so the
     ranges interleave. The spy therefore takes the LOWEST section that has
     passed the line rather than walking in order and stopping early — which
     was lighting the wrong item for 1,800px of the page. */
  const flat=[]; links.forEach(([k,,ids])=>ids.forEach(id=>flat.push([id,k])));
  /* ── ACTIVE ROUTE ───────────────────────────────────────────────────────────
     `onFeature = !!slug` marked Features active on careers, investors, quality,
     security and about — five routes that are not features. And nothing ever set
     `.on` on the three section links, so a nav class-named `.px-spy` did no
     scrollspying at all. It does now, off an observer on the three sections, in
     REACT STATE — never a classList.add on a node React re-renders. */
  const[spy,setSpy]=useState('');
  /* Scroll + rAF, not IntersectionObserver. An observer answers "is this section
     on screen", which cannot express "which of five ranges am I in" — two
     ranges are on screen at every boundary and a section taller than the
     viewport is in none of them. Reading the last section whose top has passed
     the nav line answers it exactly, at every scroll position, including inside
     a 1,339px section and at the very bottom of the page. */
  useEffect(()=>{
    if(slug){ setSpy(''); return undefined; }        // only home has these sections
    let raf=0;
    const pick=()=>{
      raf=0;
      const nav=parseFloat(getComputedStyle(document.documentElement)
        .getPropertyValue('--px-nav'))||64;
      const line=window.scrollY + nav + 10 + 24;     // nav sits at top:10, +24 of air
      let k='', best=-Infinity;
      for(const [id,key] of flat){
        const el=document.getElementById(id);
        if(!el) continue;                             // a removed section must not throw
        const top=el.getBoundingClientRect().top + window.scrollY;
        if(top<=line && top>best){ best=top; k=key; } // furthest one already begun
      }
      setSpy(p=>p===k?p:k);                           // no state churn on every frame
    };
    const on=()=>{ if(!raf) raf=requestAnimationFrame(pick); };
    window.addEventListener('scroll',on,{passive:true});
    window.addEventListener('resize',on);
    /* Arriving from another route at #/#s-pricing scrolls two frames after this
       effect runs, so the first read has to happen after that, not before. */
    requestAnimationFrame(()=>requestAnimationFrame(pick));
    return()=>{ window.removeEventListener('scroll',on); window.removeEventListener('resize',on);
      if(raf) cancelAnimationFrame(raf); };
  },[slug]);   // eslint-disable-line react-hooks/exhaustive-deps

  /* ── THE SLIDING INDICATOR ──────────────────────────────────────────────────
     One element behind the links rather than a background and an underline on
     each, so the highlight travels instead of blinking from one item to the
     next. Measured off getBoundingClientRect, not offsetLeft, because the
     Explore control is nested one level deeper than its siblings and would
     otherwise be measured against the wrong offsetParent. */
  const spyRef=useRef(null);
  const[ind,setInd]=useState(null);
  const[armed,setArmed]=useState(false);   // no slide-in from x=0 on first paint
  useEffect(()=>{
    const root=spyRef.current; if(!root) return undefined;
    const place=()=>{
      const el=root.querySelector('.on');
      if(!el){ setInd(null); return; }
      const r=el.getBoundingClientRect(), rr=root.getBoundingClientRect();
      setInd({x:Math.round(r.left-rr.left), w:Math.round(r.width)});
    };
    place();
    const raf=requestAnimationFrame(()=>setArmed(true));
    window.addEventListener('resize',place);
    /* the labels are set in a webfont; measured before it loads, every width is
       wrong by a few px and stays wrong until something else forces a re-measure */
    if(document.fonts&&document.fonts.ready) document.fonts.ready.then(place).catch(()=>{});
    return()=>{ window.removeEventListener('resize',place); cancelAnimationFrame(raf); };
  },[spy,slug]);
  const onFeature=FEATURES.some(([sl])=>sl===slug);
  return(<>
    <nav className={`px-nav ${stuck?'is-stuck':''}`}><div className="px-nav__in">
      <Logo/>
      <div className={`px-spy ${armed?'is-armed':''}`} ref={spyRef}>
        {/* the travelling highlight — one element, behind the labels */}
        <span className="px-spy__ind" aria-hidden="true"
          style={ind?{transform:`translateX(${ind.x}px)`,width:ind.w,opacity:1}:{opacity:0}}/>
        {links.map(([k,l])=><a key={k} href={`#/#${k}`} className={spy===k?'on':''}
          aria-current={spy===k?'true':undefined}>{l}</a>)}
        <div className="px-navmenu" ref={featRef}>
          <button type="button" ref={featBtn} className={`px-navmenu__btn ${onFeature?'on':''} ${feat?'is-open':''}`}
            aria-haspopup="menu" aria-expanded={feat} aria-controls="px-navmenu-panel"
            onClick={()=>setFeat(f=>!f)}>
            {/* A stroked chevron, not the app's filled ic_arrow_forward_ios. That
                glyph is a solid wedge built to sit on a 24dp list row; at 11px
                beside 13.5px nav text it read as a heavy black arrowhead. This is
                the same outline weight the carousel arrows use. */}
            Explore
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 9l6 6 6-6"/></svg>
          </button>
          {/* Mounted and toggled with `hidden`, like the sheet: `hidden` takes
              it out of the accessibility tree AND lets the trigger carry an
              aria-controls that always resolves to something. */}
          <div className="px-navmenu__panel" id="px-navmenu-panel" role="menu" hidden={!feat}>
              {FEATURES.map(([sl,l,ic])=>(
                <a key={sl} role="menuitem" href={`#/deep/${sl}`}
                  className={slug===sl?'on':''}
                  aria-current={slug===sl?'page':undefined} onClick={()=>setFeat(false)}>
                  <span className="px-navmenu__ic"><Ico n={ic} size={17}/></span>
                  <span>{l}</span>
                </a>))}
          </div>
        </div>
      </div>
      {/* No CTA here. The hero carries it, and a second copy in the bar directly
          above it was the same ask twice on one screen. */}
      <button className="px-burger" ref={burgerRef} type="button"
        aria-label={open?'Close menu':'Menu'} aria-expanded={open} aria-controls="px-sheet"
        onClick={()=>setOpen(o=>!o)}>&#9776;</button>
    </div></nav>
    <div className="px-sheet" id="px-sheet" ref={sheetRef} hidden={!open}
      role="dialog" aria-modal="true" aria-label="Menu" onClick={()=>setOpen(false)}>
      {/* The sheet sits ABOVE the nav, not under it. Under it, the first link
          rendered behind the fixed logo pill — the menu was centred in a box the
          nav was already standing in. It now owns the whole screen, carries its
          own logo and close control, and scrolls when fourteen entries do not
          fit a phone. */}
      <div className="px-sheet__top">
        <Logo/>
        <button className="px-burger px-sheet__x" type="button" aria-label="Close menu"
          onClick={()=>setOpen(false)}>&#10005;</button>
      </div>
      <div className="px-sheet__nav">
        {links.map(([k,l])=><a key={k} href={`#/#${k}`} className={spy===k?'on':''}
          aria-current={spy===k?'true':undefined}>{l}</a>)}
        {/* These were href="#/india" and href="#/privacy". App.js routes feature
            pages on the "#/deep/" prefix, so neither matched anything — two dead
            links, on the only nav a phone ever sees. The sheet now lists all
            eleven from the same source the desktop menu uses. */}
        <span className="px-sheet__k">Explore</span>
        {FEATURES.map(([sl,l])=><a key={sl} href={`#/deep/${sl}`} className={slug===sl?'on':''}
          aria-current={slug===sl?'page':undefined}>{l}</a>)}
        {/* was .px-nav__cta--sheet, which the 1000px breakpoint set to
            display:none — the phone menu's only CTA was invisible. */}
        <a href="#/#s-get" className="px-btn px-btn--fill fx-glow px-arw px-sheet__cta">Join the waitlist</a>
      </div>
    </div>
  </>);
}
function Nav(){ return <SiteNav/>; }


/* ═══ 01 HERO ═══ */
function Hero(){return(
  <header className="px-hero" id="top">
    <div className="px-wrap px-hero__grid">
      <div className="px-rv in">
        <p className="px-tag"><span>Meet Richie</span></p>
        <h1 className="px-hero__h1">
          Your family’s <span className="px-rot"><span className="px-rot__t">
            <span>Health.</span><span>Wellness.</span><span>Future.</span><span>Story.</span><span>Health.</span>
          </span></span><br/>
          AI that knows you.
        </h1>
        <p className="px-hero__sub">Richie is the health AI that reads your record before it answers. Medical reports, medicines, symptoms, periods, check-ins and watch data — for you, and for the children and parents you add.</p>
        {/* THE HERO HAD NO CTA. The only affordance in it was the platform
            toggle, and the nav CTA beside it is display:none below 1000px — so
            on a phone there was nothing above the fold to act on at all. One
            primary, in the same words and pointing at the same field as every
            other instance on the site. The platform toggle in the stage stays
            the secondary affordance; a second button here would only repeat the
            scroll the reader is already doing. */}
        <div className="px-hero__btns">
          <a href="#get" className="px-btn px-btn--fill fx-glow px-arw">Join the waitlist</a>
        </div>
        {/* This read "Free on iPhone, Apple Watch and Android" — present tense,
            under a hero shot, on a site for an app that is not on either store
            yet. The platforms and the price are true; only the tense was not. */}
        {/* Was: "Launching 1 October 2026 on iPhone, Apple Watch and Android.
            Free to start, and your data is never sold or shared." Four claims,
            three of them already on screen — the launch pill carries the date
            and "Free to start", and the platform toggle under the phone carries
            iPhone and Android. It also said "or shared", which is not true: the
            product has family sharing and doctor sharing, both opt-in. What is
            left is the one promise nothing else on this screen makes. */}
        <p className="px-hero__trust">Free to start. Your data is never sold.</p>
      </div>
      <div className="px-stage px-rv in">
        {/* The three floating readings. .px-chip and its --1/--2/--3 positions,
            its pxRise entry and its --d stagger were all still in the stylesheet
            with nothing rendering them — the markup had been dropped at some
            point and left the CSS orphaned. Three readings, no bobbing, each
            from a different source so the point of one record is made by the
            hero itself: a lab value, a watch reading, and the local air. */}
        <span className="px-chip px-chip--1" aria-hidden="true">
          <i style={{background:'var(--px-attn)'}}/><b>142</b><span>LDL mg/dL</span></span>
        <span className="px-chip px-chip--2" aria-hidden="true">
          <i style={{background:'var(--px-ok)'}}/><b>56</b><span>Resting HR</span></span>
        <span className="px-chip px-chip--3" aria-hidden="true">
          <i style={{background:'var(--px-watch)'}}/><b>186</b><span>AQI · Delhi</span></span>
        {/* The store badges are gone from the hero. Two vendor logos under a
            product shot is an install-funnel move, and the platform question is
            already answered above by the toggle. They still live at the close,
            which is where someone who has read the page actually decides. */}
        <TwoPhones/>
      </div>
    </div>
    {/* The vitals marquee is gone. A loop of pills running edge to edge, clipped
        mid-word at both sides, under a hero that has already made its point —
        it read as an unfinished ticker rather than a design. SIGNALS, its only
        data source, went with it — the marquee was its only consumer. */}
  </header>);}

/* ═══ 02 SOURCES STRIP ═══ */
export function Sources(){return(
  <div className="px-sources"><div className="px-wrap px-sources__in">
    <span className="px-sources__lbl">Grounded in</span>
    {/* Every entry here is wired. The strip used to name WHO growth standards,
        openFDA, an India Drug Registry, MedlinePlus, OpenAQ and Open Food Facts:
        who.int and medlineplus.gov appear only as RSS URLs in feedNewsAgent.js,
        openFDA and the registry exist nowhere in the repo, air quality is IQAir
        via the apps, and nothing reads Open Food Facts. */}
    {['OpenAlex','Tavily','IQAir','Brand-to-molecule table','Indian Diabetes Risk Score'].map(s=>
      <span className="px-sources__i" key={s}>{s}</span>)}
  </div></div>);}

/* ═══ 03 PROBLEM ═══
   Scattered fragments sort themselves into the record types we actually store
   (MedicalReport, Symptom, Medication, Observation, PeriodLog), scrubbed by scroll.
   Pure CSS scroll-driven animation: no library, no scroll listener, no bundle cost. */
/* The columns are the app's Health Hub sections, verbatim from the Android
   layout (res/layout/fragment_health_data.xml), cross-checked against
   ios/.../HealthHub/HealthHubView.swift.

   The second line on each card used to name where the thing was lost — "Fitness
   app", "WhatsApp", "Your memory". That is the same joke five times and it tells
   a reader nothing. It now says what we actually take in, which is the argument
   the section is making. Phrasing follows the app's own subtitles: "Blood
   pressure, weight, glucose & more", "Lab results, scans and clinical
   documents", "Active prescriptions, dosage and history". */
const SORT=[
  ['Symptoms','sick','12 logged',[
    ['Foot burning, three days','Severity, duration and pattern','34.4vw','-9vh','-9deg'],
    ['Told the doctor, forgot','Dated the moment you log it','47.4vw','-6vh','7deg'],
    ['Headache, which week?','Kept against that day’s air','29.9vw','-25vh','-4deg']]],
  ['Measurements','ruler','98 recorded',[
    ['Ninety-eight readings','Blood pressure, weight, glucose','-47.4vw','4vh','6deg'],
    ['BP cuff, on paper','Typed once, trended after','-14.4vw','7vh','-10deg'],
    ['Your watch, counting','Ten metrics, each with its source','-41.9vw','-23vh','-5deg']]],
  ['Period history','gyn','Day 14',[
    ['Cycle log, walled off','Flow, pain and notes','-36.9vw','-9vh','9deg'],
    ['Thyroid never crossed it','Read beside your bloods','-31.4vw','-26vh','-7deg'],
    ['Last one was… March?','Every cycle dated for you','-44vw','-31vh','4deg']]],
  ['Medical reports','doc','7 uploaded',[
    ['Blood report.pdf','Lab results, scans, documents','56.9vw','17vh','8deg'],
    ['Photo of a lab slip','Photographed, read, extracted','43.9vw','-6vh','-6deg'],
    ['Scan from 2023','Trended against the newest','51.4vw','-27vh','5deg']]],
  ['Medications','pill','3 active',[
    ['Prescription you can’t read','Brand mapped to molecule','-20vw','17vh','10deg'],
    ['Papa’s BP tablet','Active prescriptions and dosage','-26vw','-19vh','-8deg'],
    ['Dose you stopped guessing','Taken or missed, recorded','-15vw','-28vh','6deg']]],
];
function Problem(){
  /* The sort is threshold-driven, not scroll-scrubbed. One line on the screen:
     once the heading's top crosses it the cards get their own clock and tidy
     themselves at their own pace; cross back up and they untidy the same way;
     carry on down and they stay put. The test is on the heading's rect rather
     than on isIntersecting, because isIntersecting also goes false once the
     heading leaves through the TOP of the screen — which would scatter the grid
     again the moment you scrolled past it. */
  const [sorted,setSorted]=useState(false);
  const [live,setLive]=useState(false);
  const head=useRef(null);
  useEffect(()=>{
    /* reduced motion: no scatter at all, not a faster scatter */
    if(window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const el=head.current; if(!el) return;
    setLive(true);
    const LINE=.52;                       // of the viewport height, from the top
    const io=new IntersectionObserver(
      es=>setSorted(es[0].boundingClientRect.top <= window.innerHeight*LINE),
      {rootMargin:`0px 0px -${Math.round((1-LINE)*100)}% 0px`});
    io.observe(el);
    return()=>io.disconnect();
  },[]);
  return(
  <Band id="s-problem">
    <div className="px-wrap">
      <div className={`px-sort ${live?'is-live':''} ${sorted?'is-sorted':''}`}>
        <div className="px-sort__stage">
          <Mast k="Why"/>
          <div className="px-head px-head--wide px-head--flush px-rv in" ref={head}>
            <h2 className="px-h2">Why your health data is <i>scattered.</i></h2>
            <p className="px-lede">Reports sit in WhatsApp. Prescriptions sit in a drawer. Your watch counts without understanding. None of it is in the room when you see a doctor.</p>
          </div>
          <div className="px-sort__grid">
            {SORT.map(([col,ic,count,cards])=>(
              <div className="px-sort__col" key={col}>
                <div className="px-sort__lbl">
                  <span><Ico n={ic} size={24}/>{col}</span><b>{count}</b></div>
                {/* no icon on the card — the column heading above already carries
                    this section's mark, and repeating it three more times per
                    column said nothing and took the title's width. */}
                {cards.map(([txt,covers,dx,dy,rot],i)=>(
                  <div className="px-sc" key={i} style={{'--dx':dx,'--dy':dy,'--rot':rot}}>
                    <div className="px-sc__b"><b>{txt}</b><em>{covers}</em></div>
                  </div>))}
              </div>))}
          </div>
          <p className="px-sort__end">One record. Every entry dated, attributed and read together.</p>
        </div>
      </div>
    </div>
  </Band>);
}


/* ═══ HORIZONTAL RAIL — the app, at a size you can actually read ═══ */
const SHOTS=[
 [sRichie,'Richie','Grounded suggestions, each showing the readings behind it.'],
 [sWatchScr,'Measurements','98 Apple Watch readings beside the glucose you typed in.'],
 [sCheckin,'Check-in','Two minutes becomes a running watch-list.'],
 [sFamily,'Family','Connections and dependents, with who is covered.'],
 [sFamilyChat,'Family chat','A separate, private conversation per person.'],
 [sModel,'Model picker','Six models. Premium ones marked, never swapped silently.'],
 [sMeds,'Medicines','Schedules, adherence and brand-to-molecule.'],
 [sSymptoms,'Symptoms','Dated records with severity, from chat or by hand.'],
 [sReports,'Reports','Photograph a lab report; every value is extracted.'],
 [sProfile,'Profile','Memory, model improvement and lock are all switches.']];
export function Gallery(){
  const r=useRef(null);
  const go=d=>{const el=r.current;if(el)el.scrollBy({left:d*268,behavior:'smooth'});};
  return(
  <Band id="s-screens">
    <div className="px-wrap">
      <Head k="See it" t={<>Every screen <i>in the app.</i></>}
        l="Real captures from the iPhone build, not mockups. Drag, scroll or use the arrows."/>
      <div className="px-rail__nav">
        <button onClick={()=>go(-1)} aria-label="Previous screens">‹</button>
        <button onClick={()=>go(1)} aria-label="Next screens">›</button>
      </div>
      <div className="px-railwrap px-rv">
        <div className="px-rail__fade px-rail__fade--l"/>
        <div className="px-rail__fade px-rail__fade--r"/>
        <div className="px-rail" ref={r}>
          {SHOTS.map(([src,t,d])=>(
            <div className="px-railitem" key={t}>
              <div className="px-dev fx-card fx-glow"><img src={src} alt={t}/></div>
              <div className="px-railitem__cap"><b>{t}</b><span>{d}</span></div>
            </div>))}
          {/* Terminal card: the ask sits at the end of the rail, where someone
              who has just looked at all ten screens is most likely to act.
              NOTE: <Gallery/> is exported but rendered nowhere — dead since the
              screens rail moved into <Deck/>. Fixed anyway, because the two
              store badges it held were the same lie as the live ones and the
              next person to re-mount it would have shipped them. */}
          <div className="px-railitem px-railitem--cta" key="cta">
            <div className="px-railcta">
              <span className="px-railcta__k">That is all ten screens</span>
              <b>It opens on {LAUNCH_LONG}.</b>
              <div className="px-railcta__b">
                <a href="#get" className="px-btn px-btn--fill fx-glow px-arw">Join the waitlist</a>
              </div>
            </div>
            <div className="px-railitem__cap"><b>Launch day</b><span>Free to start. iPhone, Apple Watch and Android.</span></div>
          </div>
        </div>
      </div>
    </div>
  </Band>);}

/* ═══ 03 AHEAD ═══
   Predictive health, and it is all real: backend/models/CheckInSession.js stores
   analysisWatchlist[{signal,status:ok|watch|attention,note}], analysisOverall,
   analysisHeadline and analysisFocus{title,why} per cycle, on a cadence of
   weekly | semi_weekly (every 3 days) | monthly set by tier. Because every
/* ═══ 03 SEEING IT EARLY ═══
   This mirrors a screen we actually ship: the Trends tab behind the chart icon on
   Medical Reports (ios .../HealthHub/MedicalReportsSheetView.swift → trendsContent).
   That view is a parameter Picker, a Latest / Min / Max / Reports stat row (the
   comment there says it "mirrors Android"), the reference range, and Swift Charts
   AreaMark(teal .15) + LineMark(teal, 3pt, catmullRom) + PointMark(teal).

   Reference ranges and their sources are quoted from
   backend/config/grounding/labReferenceRanges.js. Status levels are the app's own
   StatusLevel: green normal, yellow borderline, orange high/low, red critical.

   Deliberately NOT charted: sleep, hydration, adherence or resting heart rate.
   The app plots lab parameters from reports and a small AQI sparkline, nothing
   else, and hydration is not a tracked series at all — waterIntake is a single
   onboarding number, not a time series. */
const LABS=[
 {k:'ldl', n:'LDL cholesterol', u:'mg/dL', lo:95, hi:150,
  ref:'Optimal below 100, near-optimal 100 to 129, borderline 130 to 159',
  src:'NCEP ATP III / ACC-AHA lipid guidance',
  pts:[108,118,131,142], lvl:['yellow','yellow','orange','orange'], sl:'Borderline',
  say:'Four reports, one direction. It was near-optimal in February last year and it has not come back down.'},
 {k:'a1c', n:'HbA1c', u:'%', lo:5.1, hi:6.4,
  ref:'Normal below 5.7, prediabetes 5.7 to 6.4, diabetes 6.5 and above',
  src:'ADA Standards of Care',
  pts:[5.3,5.5,5.8,6.1], lvl:['green','green','yellow','orange'], sl:'Prediabetes',
  say:'Crossed out of normal at the third report. Both your parents have type 2 diabetes, which Richie reads alongside this.'},
 {k:'vitd', n:'Vitamin D (25-OH)', u:'ng/mL', lo:14, hi:34,
  ref:'Deficient below 20, insufficient 20 to 29, sufficient 30 and above',
  src:'Endocrine Society clinical practice guidance',
  pts:[31,26,22,18], lvl:['green','yellow','yellow','orange'], sl:'Deficient',
  say:'Sufficient eighteen months ago, deficient now. A steady slide nobody would notice one report at a time.'},
 {k:'hb', n:'Hemoglobin', u:'g/dL', lo:13.2, hi:15.0,
  ref:'Adult men 13 to 17, adult women 12 to 15',
  src:'WHO / common clinical laboratory reference interval',
  pts:[14.4,14.1,14.2,13.9], lvl:['green','green','green','green'], sl:'Normal',
  say:'Flat across all four reports. Nothing to act on, which is also worth knowing.'},
];
const REPORTS=['8 Feb 2025','19 Aug 2025','2 Mar 2026','30 Jul 2026'];
const CW=720, CH=224, PL=12, PR=64, PT=22, PB=26;
const cx=i=>PL+i*((CW-PL-PR)/(REPORTS.length-1));
const cy=(v,l)=>PT+(1-(v-l.lo)/(l.hi-l.lo))*(CH-PT-PB);
/* catmullRom, the interpolation the app's Chart uses */
function smooth(pts){
  if(pts.length<2) return '';
  let d=`M${pts[0][0]},${pts[0][1]}`;
  for(let i=0;i<pts.length-1;i++){
    const p0=pts[i-1]||pts[i], p1=pts[i], p2=pts[i+1], p3=pts[i+2]||p2;
    d+=` C${(p1[0]+(p2[0]-p0[0])/6).toFixed(1)},${(p1[1]+(p2[1]-p0[1])/6).toFixed(1)}`
      +` ${(p2[0]-(p3[0]-p1[0])/6).toFixed(1)},${(p2[1]-(p3[1]-p1[1])/6).toFixed(1)}`
      +` ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}
function LabChart({l}){
  const[hov,setHov]=useState(null);
  const P=l.pts.map((v,i)=>[cx(i),cy(v,l)]);
  const line=smooth(P);
  const area=`${line} L${P[P.length-1][0].toFixed(1)},${CH-PB} L${P[0][0].toFixed(1)},${CH-PB} Z`;
  return(
  <div className="px-ch">
    <svg viewBox={`0 0 ${CW} ${CH}`} className="px-ch__svg" role="img"
      aria-label={`${l.n} across four reports, ${l.pts[0]} to ${l.pts[l.pts.length-1]} ${l.u}`}
      onMouseLeave={()=>setHov(null)}>
      {[0,1,2].map(i=><line key={i} className="px-ch__grid" x1={PL} x2={CW-PR}
        y1={PT+i*(CH-PT-PB)/2} y2={PT+i*(CH-PT-PB)/2}/>)}
      <path className="px-ch__area" d={area}/>
      <path className="px-ch__line" d={line} pathLength="1" fill="none"/>
      {P.map(([x,y],i)=><circle key={i} className="px-ch__pt" cx={x} cy={y} r="5"/>)}
      {hov!==null&&<line className="px-ch__cross" x1={cx(hov)} x2={cx(hov)} y1={PT} y2={CH-PB}/>}
      {l.pts.map((v,i)=>(<rect key={'h'+i} x={cx(i)-30} y="0" width="60" height={CH}
        fill="transparent" onMouseEnter={()=>setHov(i)}/>))}
    </svg>
    <div className="px-ch__x">{REPORTS.map((t,i)=><span key={t} className={hov===i?'on':''}>{t}</span>)}</div>
    {hov!==null&&(
      <div className="px-ch__tip" style={{left:`${(cx(hov)/CW)*100}%`}}>
        <b>{l.pts[hov]} <span>{l.u}</span></b>
        <em>{REPORTS[hov]}</em>
      </div>)}
  </div>);}

export function Ahead({bare,solo}){
  const[i,setI]=useState(0); const l=LABS[i];
  const last=l.pts[l.pts.length-1];
  const mn=Math.min(...l.pts), mx=Math.max(...l.pts);
  return(
  <Band alt id="s-ahead">
    <div className="px-wrap">
      {!bare&&<Head k="Seeing it early" t={<>A number tells you today. <i>A direction tells you what’s coming.</i></>}
        l="Photograph a report and every value is extracted and dated. Four reports later, the same test is a line rather than a number, and Richie reads the line."/>}

      <div className="px-early px-rv">
        <div className="px-early__hd">
          <div className="px-early__now">
            <span className="px-early__k">{l.n}, latest</span>
            <b>{last}<i>{l.u}</i></b>
            <span className={`px-pill px-pill--${l.lvl[l.lvl.length-1]}`}>{l.sl}</span>
          </div>
          <div className="px-early__pick" role="tablist" aria-label="Choose a parameter">
            {LABS.map((x,j)=>(
              <button key={x.k} role="tab" aria-selected={i===j}
                className={`px-early__b fx-glow ${i===j?'on':''}`} onClick={()=>setI(j)}>{x.n}</button>))}
          </div>
        </div>

        <div className="px-stats">
          <div><em>Latest</em><b>{last} {l.u}</b></div>
          <div><em>Min</em><b>{mn} {l.u}</b></div>
          <div><em>Max</em><b>{mx} {l.u}</b></div>
          <div><em>Reports</em><b>{l.pts.length}</b></div>
        </div>
        <p className="px-early__ref">Reference range: {l.ref}. <span>{l.src}</span></p>

        <LabChart l={l} key={l.k}/>

        <div className="px-early__ft">
          <p>{l.say}</p>
          <details className="px-early__tbl">
            <summary>See the readings as a table</summary>
            <table><thead><tr><th>Report</th><th>{l.n}</th></tr></thead>
              <tbody>{l.pts.map((v,j)=>(
                <tr key={j}><td>{REPORTS[j]}</td><td>{v} {l.u}</td></tr>))}
              </tbody></table>
          </details>
        </div>
      </div>

      {!solo&&<p className="px-early__out px-rv">This is the Trends tab from Medical Reports, the same parameter picker and the same four numbers. The point of keeping every value dated is that the fourth report is not read on its own.</p>}
    </div>
  </Band>);}

/* ═══ 04 RICHIE (demo + quick-log) ═══ */
const DEMO=[
 {q:'Why is my heart rate so variable?',why:'Your readings ran 54 to 120 bpm this week, wider than your 30-day baseline.',
  a:<>Three of the highs land within an hour of your <mark>evening walk on high-AQI days</mark> (186 yesterday). Resting HR is steady at <mark>56 bpm</mark>, which is the reassuring part. If a peak ever comes with chest discomfort at rest, that’s a doctor conversation, not one with me.</>},
 {q:'Is my low blood pressure concerning?',why:'Two readings under 90/60 this week. You started Metoprolol 50 mg twelve days ago.',
  a:<>You began <mark>Metoprolol 12 days ago</mark> and this is a known effect. You logged dizziness twice, both mornings. Dose changes are your prescriber’s call. Take them these readings and dates.</>},
 {q:'Should papa’s medicines be reviewed?',why:'Papa is on 4 medicines. Two carry sedation warnings. No fall-risk note since June.',
  a:<>Two of his four carry sedation warnings that compound in older adults. His BP is running <mark>138/86</mark> and nothing has checked his fall risk in six weeks. Worth asking for a medication review.</>}];
/* The picker used to render Gemini / DeepSeek R1 / Llama 3.3 / GPT-5.3 / Claude 4.5.
   Every text and reasoning key routes to deepseek-chat or deepseek-reasoner
   (config/ai.js), so that was five vendor names for one provider — the exact claim
   the feature report forbids in §6 and again in §12. What IS real is the panel:
   three distinct analytical lenses, defined verbatim in checkInController.js:54. */
const LENSES=[
  ['Cardiometabolic','Heart and blood sugar: waist, blood pressure, glucose, cholesterol and family history, on South Asian cutoffs.'],
  ['Adherence','Doses taken and missed, sleep and activity consistency, and what is quietly slipping.'],
  ['Lifestyle','Sleep, stress, mood, nutrition and load — and the one upstream change worth making.'],
];
export function RichiePanel({bare,solo}){
  const[sel,setSel]=useState(null),[phase,setPhase]=useState('idle'),[model,setModel]=useState('Cardiometabolic'),[log,setLog]=useState(null);
  const t=useRef(null);
  const pick=useCallback(i=>{clearTimeout(t.current);setSel(i);setPhase('thinking');t.current=setTimeout(()=>setPhase('answer'),1400);},[]);
  useEffect(()=>()=>clearTimeout(t.current),[]);
  return(
  <Band id="s-richie">
    <div className="px-wrap">
      {!bare&&<Head k="Meet Richie" t={<>Ask anything. Answers come from <i>your record.</i></>}
        l="Every suggestion is built from something you logged. Tap one and see the readings behind it."/>}
      <div className="px-demo px-rv">
        <div className="px-console">
          <div className="px-console__bar"><span className="px-dot"/><b>Richie</b><em>{model} · grounded</em></div>
          <div className="px-console__body">
            {DEMO.map((d,i)=>(<React.Fragment key={i}>
              <button className={`px-sugg ${sel===i?'on':''}`} onClick={()=>pick(i)}>{I.spark}{d.q}</button>
              {sel===i&&<div className="px-why"><em>Why Richie suggested this</em><p>{d.why}</p></div>}
              {sel===i&&phase==='thinking'&&<div className="px-answer">
                <div className="px-think"><i/><i/><i/> Reading your record</div>
                <div className="px-skeletons"><div className="px-skeleton" style={{width:'92%'}}/><div className="px-skeleton" style={{width:'78%'}}/><div className="px-skeleton" style={{width:'85%'}}/></div></div>}
              {sel===i&&phase==='answer'&&<div className="px-answer">
                <div className="px-answer__who"><img src={logo} alt=""/><b>Richie</b></div><p>{d.a}</p></div>}
            </React.Fragment>))}
            {sel===null&&<div className="px-empty">{I.inbox}<p>Nothing asked yet. Pick a question above.<br/>In the app these come from your own readings.</p></div>}
          </div>
          <div className="px-lenses">{LENSES.map(([m,d])=>(
            <button key={m} className={`px-lens ${model===m?'on':''}`} onClick={()=>setModel(m)} title={d}>
              <b>{m}</b><span>{d}</span></button>))}
          </div>
        </div>
        {!solo&&<div className="px-flow">
          <div className="px-confirm">
            {log===null?(<>
              <p className="px-confirm__q">Log <b>“knee pain · 3/10 · left side”</b> to your record?</p>
              <span className="px-confirm__s">From your message, 2 minutes ago</span>
              <div className="px-confirm__row">
                <button className="pri" onClick={()=>setLog('yes')}>✓ Approve</button>
                <button onClick={()=>setLog('no')}>Deny</button>
                <button onClick={()=>setLog('edit')}>Edit</button>
              </div></>
            ):(<div className="px-confirm__done">
              <span className="px-confirm__tick">{log==='yes'?'✓':log==='edit'?'✎':'×'}</span>
              <span>{log==='yes'?'Saved to Symptoms · 20 Aug':log==='edit'?'Opened for editing before saving':'Discarded. Nothing was written.'}</span>
              <button className="px-confirm__undo" onClick={()=>setLog(null)}>undo</button>
            </div>)}
          </div>
          <div className="px-flow__link" aria-hidden="true"><span/><em>lands in your record</em><span/></div>
          <div className={`px-uif ${log==='yes'?'is-lit':''}`}>
            <div className="px-uif__hd"><b>Symptoms</b><em>{log==='yes'?'just now':'your record'}</em></div>
            {log==='yes'&&<div className="px-uif__r px-uif__r--ok">
              <span className="px-uif__ico">{I.heart}</span>
              <div className="px-uif__t"><b>Knee pain · left</b><span>20 Aug · from chat</span></div>
              <span className="px-uif__v">3/10</span></div>}
            <div className="px-uif__r"><span className="px-uif__ico">{I.heart}</span>
              <div className="px-uif__t"><b>Foot sensations</b><span>18 Aug · logged manually</span></div>
              <span className="px-uif__v">2/10</span></div>
            <div className="px-uif__r"><span className="px-uif__ico">{I.heart}</span>
              <div className="px-uif__t"><b>Headache</b><span>14 Aug · after high-AQI day</span></div>
              <span className="px-uif__v">4/10</span></div>
            <div className="px-uif__cap">Approved items become dated records with severity, then they are read against your labs, medicines and air quality.</div>
          </div>
        </div>}
      </div>
      {!solo&&<div className="px-quad px-rv fx-stagger">
        {[['Say it, don’t type it twice','Mention something in chat and Richie offers to log it. You approve, edit or deny. It never writes silently.'],
          ['Three specialists, not one answer','A hard question is read three ways at once — heart and diabetes risk, whether you are taking your medicines, and sleep, stress and food. Richie weighs them rather than averaging them.'],
          ['You can read each take','The three views are kept separately, so you can see where they disagreed before Richie settled it.'],
          ['Sources when it matters','Richie can search the literature and answer with citations you can open.']].map(([t,b],i)=>(
          <div className="px-quadcard fx-glow" key={i} style={{'--i':i}}>
            {/* Not 01/02/03: these are four independent things Richie does, not
                four steps in an order. A numbered marker would assert a sequence
                the content does not have. */}
            <span className="px-quadcard__n" aria-hidden="true"/>
            <b>{t}</b><p>{b}</p>
          </div>))}
      </div>}
    </div>
  </Band>);}

/* ═══ 05 FAMILY ═══
   Movement 1 is the traversal: a question about YOU walks out to parents and
   grandparents and comes back with facts that change your own number. This is real:
   User.familyHistory is "hereditary conditions in parents/grandparents",
   familyHistoryRelatives tags which relative each came from, and
   config/grounding/riskTools.js scores familyHistory at none 0 / one_parent 10 /
   both_parents 20 inside the Indian Diabetes Risk Score. The arithmetic below is
   that table, run honestly: 40 without the family, 60 with it, and 60 is the band
   where a screening HbA1c is recommended. */
/* The strongest thing here is the arithmetic, not a diagram: 40 without your
   parents’ records, 60 with them, and 60 is the screening threshold. A pedigree
   chart buried that under a shape vocabulary that appears nowhere else on the site
   and needed a legend to read. This is the same traversal in the page’s own
   language: one spine, rows that light as it passes, and the number crossing. */
const READ=[
 ['h','Your record'],
 ['r','you','You','34, waist 96 cm, moderate activity'],
 ['h','Read from your family'],
 ['r','ma','Mother','Type 2 diabetes, 2011'],
 ['r','pa','Father','Type 2 diabetes, 2016'],
 ['h','Carried as context, does not score'],
 ['r','na','Nani','Hypertension from her sixties'],
 ['r','da','Dadaji','Cardiac, onset 58. Deceased.'],
];
const ASK='38.5°C this evening. Do we need a doctor?';
const PEOPLE=[
 {n:'You', r:'Primary', av:'A',
  chips:['Age 34','3 medicines','No fever since Jan'],
  a:"At 34, one evening reading like this is something to watch rather than act on, and none of your three medicines masks a temperature. If it is still there in three days, or arrives with breathlessness, that is a doctor’s call and not mine."},
 {n:'Aarav', r:'Newborn, 4 months', av:'A',
  chips:['Age 4 months','54th centile','IAP schedule current'],
  a:"This is where the answer changes completely. Under three months any fever is treated as an emergency; Aarav is four months, so the bar is lower than yours rather than the same. Alongside poor feeding or unusual drowsiness it is a same-day call. His vaccines are current to the IAP schedule."},
 {n:'Vineet', r:'Child, 9', av:'V',
  chips:['Age 9','28 kg','No conditions'],
  a:"At nine this is common and usually settles on its own. The part worth knowing is that children are dosed by weight rather than age: at 28 kg his paracetamol dose is not simply yours halved, and that is the mistake people make."},
 {n:'Papa', r:'Elder, 71', av:'P',
  chips:['Age 71','4 medicines','BP 138/86'],
  a:"Older adults often run a lower baseline, so 38.5 is a bigger departure for him than it is for you. Two of his four medicines carry sedation warnings, which makes early dehydration easy to miss. Worth a call today rather than watching it."},
 {n:'Dadaji', r:'Deceased', av:'D',
  chips:['Family history only','Cardiac, onset 58'],
  a:"Dadaji’s record is not for care, it is for context. His cardiac history from 58 is what Richie carries into everyone else’s risk, including yours. Nothing here produces reminders or advice."},
];
export function Family({bare,solo}){
  const[sel,setSel]=useState(0),[auto,setAuto]=useState(true);
  useEffect(()=>{ if(!auto) return;
    const t=setInterval(()=>setSel(i=>(i+1)%PEOPLE.length),4600);
    return()=>clearInterval(t); },[auto]);
  const pick=i=>{ setAuto(false); setSel(i); };
  const p=PEOPLE[sel];
  return(
  <Band alt id="s-family">
    <div className="px-wrap">
      {!bare&&<Head k="The family graph" t={<>A question about you <i>walks your family.</i></>}
        l="Your parents’ and grandparents’ records are not stored beside yours for tidiness. They are inputs. Scroll and watch one question collect them."/>}

      <div className="px-walk px-rv">
        <div className="px-lin">
          <span className="px-lin__spine" aria-hidden="true"><i/></span>
          {READ.map((row,i)=> row[0]==='h'
            ? <div className="px-lin__h" key={'h'+i}>{row[1]}</div>
            : <div className={`px-lin__r px-lin__r--${row[1]}`} key={row[1]}>
                <span className="px-lin__d" aria-hidden="true"/>
                <b>{row[2]}</b><span>{row[3]}</span>
              </div>)}
        </div>
        <div className="px-scq">
          <div className="px-scq__q"><em>You ask</em><p>What is my diabetes risk?</p></div>
          <div className="px-scq__k">Indian Diabetes Risk Score</div>
          <div className="px-scq__n">
            <span className="px-scq__was">40</span>
            <i aria-hidden="true">&rarr;</i>
            <span className="px-scq__now">60</span>
          </div>
          <div className="px-scq__b">
            <span className="px-scq__bw">Moderate</span>
            <span className="px-scq__bn">High</span>
          </div>
          <p className="px-scq__ft">Age, waist against the South Asian cutoff of 90 and activity come to 40. Your parents’ two records are the twenty that crosses 60, and 60 is where a screening HbA1c is recommended.</p>
        </div>
      </div>

      {!solo&&<div className="px-sub px-rv">
        <h3>And the answer changes with the person.</h3>
        <p>A newborn is not a small adult, and a parent on four medicines is not you. Each person has their own record, so the same question comes back differently. Pick a name.</p>
      </div>}
      <div className={`px-ask px-rv ${auto?'is-auto':''}`}>
        <div className="px-ask__who" role="tablist" aria-label="Choose a person">
          {PEOPLE.map((x,i)=>(
            <button key={x.n} role="tab" aria-selected={sel===i}
              className={`px-who ${sel===i?'on':''}`} onClick={()=>pick(i)}>
              <span className="px-who__av">{x.av}</span>
              <span className="px-who__n"><b>{x.n}</b><em>{x.r}</em></span>
              <span className="px-who__bar" aria-hidden="true"/>
            </button>))}
        </div>
        <div className="px-ask__panel">
          <div className="px-ask__q"><em>You ask</em><p>{ASK}</p></div>
          <div className="px-ask__a" key={p.n}>
            <div className="px-ask__hd">
              <span className="px-ask__mark">{I.spark}</span><b>Richie</b>
              <em>reading {p.n}'s record</em>
            </div>
            <p>{p.a}</p>
            <div className="px-ask__chips">
              {p.chips.map(c=><span className="px-askchip" key={c}>{c}</span>)}
            </div>
          </div>
        </div>
      </div>
      {!solo&&<div className="px-cards px-rv fx-stagger">
        <div style={{'--i':0}}><PhotoCard srcs={STOCK.newborn} icon={I.heart} title="From the first day"
          body="Growth on WHO percentile curves, and a vaccine calendar built from your baby’s date of birth."
          frag={<Frag icon={I.chart} title="Growth check" time="today" body="Weight 6.4 kg, 54th percentile for 4 months."/>}/></div>
        <div style={{'--i':1}}><PhotoCard srcs={STOCK.elder} icon={I.pill} title="To your parents’ later years"
          body="Too many medicines at once, and the fall risk that comes with them — watched from your phone instead of theirs."
          frag={<Frag icon={I.bell} title="Medication review" time="6 wk" body="2 of 4 medicines carry sedation warnings."/>}/></div>
        <div style={{'--i':2}}><PhotoCard srcs={STOCK.family} icon={I.spark} title="A private chat for each person"
          body="Switching person loads their record and reference ranges, then keeps the conversation about them. One Ultra plan carries five people."
          frag={<Frag icon={I.heart} title="Chat for family" time="now" body="Answering as papa, with elder ranges applied."/>}/></div>
      </div>}
    </div>
  </Band>);}

/* ═══ 06 THE WRIST ═══
   Every metric below is verified against ios/richhealth/Core/Health/HealthKitManager.swift
   (readTypes + fetch(): 10 quantity types, sleepAnalysis, and ECG summary only) and
   backend/models/Observation.js (effectiveDateTime + source + sourceName + externalId
   dedupe, per dependent). HRV is deliberately absent: nothing reads it yet. */
const INGEST=[
 ['Heart rate','78','bpm','Apple Watch'],
 ['Resting heart rate','56','bpm','Apple Watch'],
 ['Blood oxygen','97','%','Apple Watch'],
 ['Sleep','6h 40m','','Apple Watch'],
 ['Wrist temperature','36.4','°C','Apple Watch'],
 ['ECG result','Sinus rhythm','','Apple Watch'],
 ['Steps','8,420','today','iPhone and Watch'],
 ['Active energy','512','kcal','iPhone and Watch'],
 ['Blood pressure','138/86','mmHg','Cuff, via Health'],
 ['Weight','74.2','kg','Scale, via Health'],
];
const WRIST=[
 ['Today, at a glance','Steps, active energy, heart rate, resting heart rate, blood oxygen, sleep and weight on one screen.','Today Glance'],
 ['Your briefing, spoken','The same prioritised briefing as the phone, read aloud while you make tea.','Briefing'],
 ['Ask from the wrist','Full Richie, grounded in your record, answered in voice.','Ask AI'],
 ['“Should I eat this?” out loud','Say the dish. Hear the verdict, weighed against your labs and medicines.','NutriCheck by voice'],
];
export function Wrist({bare}){return(
  <Band id="s-signals">
    <div className="px-wrap">
      {!bare&&<Head k="Apple Watch and Health Connect" t={<>Your watch measures all day. <i>Nothing reads it back.</i></>}
        l="Apple Health stores the numbers and stops there. It does not know your LDL is 142, or that today’s air is 186. We keep every reading dated and attributed."/>}

      <div className="px-fuse px-rv">
        <div className="px-ingest">
          <div className="px-ingest__hd">
            <b>What we take from Apple Health</b>
            <span className="px-live"><i/>synced 6 min ago</span>
          </div>
          <div className="px-ingest__grid fx-stagger">
            {INGEST.map(([n,v,u,src],i)=>(
              <div className="px-ing" key={n} style={{'--i':i}}>
                <div className="px-ing__n">{n}</div>
                <div className="px-ing__v">{v}{u&&<em>{u}</em>}</div>
                <div className="px-ing__s">{src}</div>
              </div>))}
          </div>
          <p className="px-ingest__ft">Each sample keeps the moment it was taken and the device that took it, and is de-duplicated when your phone syncs again. That is what lets Richie answer “as of 6:12 this morning, from your Apple Watch” instead of guessing.</p>
        </div>

        <div className="px-fuse__side">
          <div className="px-insight">
            <em>Richie reads this as</em>
            <p>“Resting heart rate is steady, but sleep has fallen four nights running while activity stayed high, and yesterday’s air hit 186. That usually shows up as tiredness long before a blood test does.”</p>
            <small>Read from 98 wrist readings, 7 lab reports, 3 medicines and today’s air.</small>
          </div>
          <div className="px-uif">
            <div className="px-uif__hd"><b>Blood test, 30 Jul</b><em>extracted</em></div>
            <div className="px-uif__r"><span className="px-uif__ico">{I.chart}</span>
              <div className="px-uif__t"><b>LDL cholesterol</b><span>was 128 in Feb</span></div>
              <span className="px-uif__v px-uif__v--attn">142 mg/dL</span></div>
            <div className="px-uif__r"><span className="px-uif__ico">{I.chart}</span>
              <div className="px-uif__t"><b>Vitamin D</b><span>was 22 last year</span></div>
              <span className="px-uif__v px-uif__v--attn">18 ng/mL</span></div>
            <div className="px-uif__r"><span className="px-uif__ico">{I.chart}</span>
              <div className="px-uif__t"><b>HbA1c</b><span>stable</span></div>
              <span className="px-uif__v px-uif__v--watch">5.8 %</span></div>
            <div className="px-uif__cap">Photograph a report and every value is pulled out, explained and trended against the wrist data above.</div>
          </div>
        </div>
      </div>

      <div className="px-sub px-rv">
        <h3>And it answers from the wrist.</h3>
        <p>Your phone is in your pocket exactly when you need it most. The watch app runs Richie on its own and speaks the answer.</p>
      </div>
      <div className="px-duo px-rv">
        <div><Rows items={WRIST}/></div>
        <div className="px-watch">
          <div className="px-watch__band"/>
          <div className="px-watch__case"><div className="px-watch__scr">
            <div className="px-watch__hd"><span>Today</span><span>5:02</span></div>
            <div className="px-wrow"><span>Heart rate</span><b>78<i>bpm</i></b></div>
            <div className="px-wrow"><span>Resting</span><b>56<i>bpm</i></b></div>
            <div className="px-wrow"><span>Blood oxygen</span><b>97<i>%</i></b></div>
            <div className="px-wrow"><span>Steps</span><b>8,420</b></div>
            <div className="px-wrow px-wrow--end"><span>Sleep</span><b>6h40</b></div>
            <div className="px-voice">
              <div className="px-wave">{[0,1,2,3,4].map(i=><i key={i} style={{animationDelay:`${i*.12}s`}}/>)}</div>
              <p>“Two rotis and dal?” <b style={{color:'var(--px-ok)'}}>Good to go.</b></p>
            </div>
          </div></div>
          <div className="px-watch__band px-watch__band--b"/>
          <span className="px-slot">Watch captures landing here soon</span>
        </div>
      </div>
    </div>
  </Band>);}

/* ═══ 08 PROACTIVE (check-in + meds + notifications) ═══ */
export function Proactive({bare}){
  const[dose,setDose]=useState(null);
  return(
  <Band alt id="s-proactive">
    <div className="px-wrap">
      {!bare&&<Head k="Proactive" t={<>It tells you what’s drifting, <i>before it’s a problem.</i></>}
        l="Two minutes of check-in becomes a running watch-list, and reminders that know your medicine."/>}
      <div className="px-watch-grid px-rv">
        <div className="px-panel">
          <div className="px-panel__hd"><b>What Richie’s watching</b><em>Updated today</em></div>
          {[['Medication adherence','82% this month, five evening doses missed','attn'],
            ['Hydration','1.4 L a day against a 2.5 L goal','attn'],
            ['Sleep','6h 40m average, down from 7h 20m','watch'],
            ['Foot sensations','Logged three times in ten days','watch'],
            ['Resting heart rate','56 bpm, steady, and that’s good news','ok']].map(([t,s,st],i)=>(
            <div className="px-item" key={i}><span className={`px-bar px-bar--${st}`}/>
              <div className="px-item__txt"><b>{t}</b><span>{s}</span></div>
              <span className={`px-state px-state--${st}`}>{st==='attn'?'Attention':st==='watch'?'Watch':'Good'}</span></div>))}
          <div className="px-streak"><div className="px-ring" style={{'--deg':'252deg'}}><div>7</div></div>
            <p><b>Seven days straight.</b> Weekly on Pro, every third day on Ultra.</p></div>
          <div className="px-dose">
            <button className={dose==='taken'?'on':''} onClick={()=>setDose('taken')}>{dose==='taken'?'✓ Taken':'Taken'}</button>
            <button className={dose==='missed'?'on on--miss':''} onClick={()=>setDose('missed')}>Missed</button>
            <button className={dose==='snooze'?'on':''} onClick={()=>setDose('snooze')}>Snooze</button>
          </div>
          <div className="px-item"><div className="px-item__txt">
            <b>{dose==='taken'?'Logged. Adherence now 83%':dose==='missed'?'Logged as missed. Richie accounts for it.':dose==='snooze'?'Snoozed thirty minutes.':'Atorvastatin 10 mg · due 9:00 PM'}</b>
            <span>Works offline. The queue syncs when you’re back.</span></div></div>
        </div>
        <div>
          <p className="px-notif__k">What arrives on your phone</p>
          <div className="px-notifs fx-stagger px-rv">
            <div className="px-notif" style={{'--i':0}}><span className="px-notif__ico">{I.pill}</span>
              <div className="px-notif__b"><div className="r"><b>Atorvastatin 10 mg</b><em>9:00 PM</em></div>
              <p>Take with or after food.</p><div className="px-notif__acts"><span>Taken</span><span>Missed</span><span>Snooze</span></div></div></div>
            <div className="px-notif" style={{'--i':1}}><span className="px-notif__ico">{I.sun}</span>
              <div className="px-notif__b"><div className="r"><b>Your briefing is ready</b><em>7:00 AM</em></div>
              <p>Air is bad today, AQI 186. Move the evening walk indoors.</p></div></div>
            <div className="px-notif" style={{'--i':2}}><span className="px-notif__ico">{I.chart}</span>
              <div className="px-notif__b"><div className="r"><b>Check-in analysis ready</b><em>2 min ago</em></div>
              <p>Sleep and hydration need attention this week.</p></div></div>
            <div className="px-notif" style={{'--i':3}}><span className="px-notif__ico">{I.heart}</span>
              <div className="px-notif__b"><div className="r"><b>Papa is now covered</b><em>Mon</em></div>
              <p>Your Ultra plan now includes his profile.</p></div></div>
          </div>
          <p className="px-notif__note">Reminder cadence follows your plan, not a generic default. Nothing is sent to sell you anything.</p>
          <div className="px-uif px-uif--under">
            <div className="px-uif__hd"><b>Medicines</b><em>3 active</em></div>
            <div className="px-uif__r"><span className="px-uif__ico">{I.pill}</span>
              <div className="px-uif__t"><b>Atorvastatin 10 mg</b><span>Evening · with food</span></div>
              <span className="px-uif__v">82%</span></div>
            <div className="px-uif__r"><span className="px-uif__ico">{I.pill}</span>
              <div className="px-uif__t"><b>Dolo-650</b><span>Paracetamol 650 mg · as needed</span></div>
              <span className="px-uif__v px-uif__v--lo">PRN</span></div>
            <div className="px-uif__cap">Indian brands resolved to their molecule, with warnings and recalls from public records.</div>
          </div>
        </div>
      </div>
    </div>
  </Band>);}

/* ═══ 09 EVERY DAY (timeline + nutricheck + air) ═══ */
const DAY=[['7:00 AM','Your briefing','A short list of what needs attention, and today’s air before you walk into it.'],
 ['1:00 PM','NutriCheck','Name the dish or scan the barcode. The verdict weighs your labs, medicines and allergies.'],
 ['9:00 PM','Medicine','A reminder that knows what the medicine is. One tap to log it.'],
 ['10:00 PM','Check-in','Two minutes. It becomes the watch-list Richie reads tomorrow.']];
export function EveryDay({bare}){return(
  <Band id="s-day">
    <div className="px-wrap">
      {!bare&&<Head k="Every day" t={<>A day with <i>RichHealth.</i></>}
        l="Four moments. None of them take more than two minutes."/>}
      <div className="px-day px-rv">
        <svg className="px-day__path" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M60,90 C260,10 340,10 450,60 C570,115 660,115 780,55 C880,5 990,20 1140,80"/>
        </svg>
        <div className="px-day__grid fx-stagger px-rv">
          {DAY.map(([tm,t,b],i)=>(<div className="px-daycard" key={i} style={{'--i':i}}>
            <div className="px-daycard__dot"/><div className="px-daycard__time">{tm}</div>
            <b>{t}</b><p>{b}</p></div>))}
        </div>
      </div>
      <div className="px-cards px-rv fx-stagger">
        <div style={{'--i':0}}><PhotoCard srcs={STOCK.thali} icon={I.spark} title="Should you eat it?"
          body="Type a dish or scan a barcode. Judged against your bloods, medicines and allergies, and fluent in Indian food."
          frag={<Frag icon={I.spark} title="Paneer butter masala" time="now" body="In moderation. LDL 142 and you’re on atorvastatin."/>}/></div>
        <div style={{'--i':1}}><PhotoCard srcs={STOCK.air} icon={I.sun} title="The air is a health input"
          body="Street-level air quality, turned into an instruction rather than a number."
          frag={<Frag icon={I.bell} title="Advisory" time="today" body="AQI 186. Move the evening walk indoors."/>}/></div>
        <div style={{'--i':2}}><PhotoCard srcs={STOCK.watch} icon={I.heart} title="News for your conditions"
          body="Matched to your location, conditions and family history. Every item says why you were shown it."/></div>
      </div>
    </div>
  </Band>);}

/* ═══ 10 GETTING STARTED (stepper) ═══ */
const STEPS=[
 ['Create your profile','Sixteen short steps: body, habits, diet, sleep, conditions, family history. Skip anything; you can finish later.',sProfile],
 ['Connect your watch','Apple Health on iPhone, Health Connect on Android. Readings start folding in immediately.',sWatchScr],
 ['Upload a report','Photograph any lab report. Every value is extracted and dated.',sReports],
 ['Add your family','A child, a parent, or a relative who has passed. Each gets their own record.',sFamily],
 ['Get your briefing','From the next morning, the app opens with what needs attention.',sRichie]];
export function Start(){
  const[i,setI]=useState(0);
  return(
  <Band alt id="s-start">
    <div className="px-wrap">
      <Head k="Getting started" t={<>Set up in <i>ten minutes.</i></>}
        l="You don’t need everything on day one. Each thing you add makes the next answer sharper."/>
      <div className="px-duo px-duo--fill px-rv">
        <div className="px-steps">
          {STEPS.map(([t,d],j)=>(
            <button key={t} className={`px-step ${i===j?'on':''}`} onClick={()=>setI(j)} aria-expanded={i===j}>
              <div className="px-step__t">{String(j+1).padStart(2,'0')} &nbsp; {t}</div>
              <div className="px-step__d"><p>{d}</p></div>
            </button>))}
        </div>
        <Dev src={STEPS[i][2]} alt={STEPS[i][0]}/>
      </div>
    </div>
  </Band>);}

/* ═══ 11 INDIA ═══
   Every claim below comes from backend/config/grounding/:
   brandToMolecule.js (brand → molecule → class, with `withdrawn` + `safetyNote`),
   riskTools.js (IDRS, Mohan/MDRF 2005, PubMed 16334618, South-Asian waist cutoffs),
   labReferenceRanges.js ("aliases are how the test shows up in Indian reports,
   e.g. SGPT for ALT"), and config/prompts/reasoningCore.js rule 5, which honours
   language as a standing user preference. */
const BRANDS=[
 ['Crocin 650','Paracetamol 650 mg','Painkiller'],
 ['Dolo 650','Paracetamol 650 mg','Same molecule as Crocin'],
 ['Combiflam','Ibuprofen + Paracetamol','Two molecules in one pill'],
 ['Pan 40','Pantoprazole','Acidity'],
 ['Rantac','Ranitidine','Withdrawn over NDMA',1],
];
export function India({bare}){return(
  <Band id="s-india">
    <div className="px-wrap">
      {!bare&&<Head k="Built for India" t={<>Built for <i>Indian</i> medicine.</>}
        l="Different brand names, different reference ranges, different risk thresholds. We started here rather than translating something built elsewhere."/>}
      <div className="px-duo px-duo--wide px-rv">
        <div>
          <div className="px-brands">
            <div className="px-brands__hd"><span>What you say</span><span>What Richie reasons about</span></div>
            <div className="fx-stagger px-rv">
              {BRANDS.map(([a,b,c,warn],i)=>(
                <div className={`px-brand ${warn?'px-brand--warn':''}`} key={a} style={{'--i':i}}>
                  <b>{a}</b><i aria-hidden="true">→</i>
                  <span className="px-brand__m">{b}</span>
                  <span className="px-brand__k">{c}</span>
                </div>))}
            </div>
            <p className="px-brands__ft">Two brands, one molecule is how a double dose happens. Richie reads the molecule, carries the therapeutic class, and flags a brand whose drug has been withdrawn.</p>
          </div>
        </div>
        <div>
          <Rows items={[
            ['Brand names, read as molecules','“Tab Crocin 650 TDS” is read the way a pharmacist reads it: brand, molecule, dose, frequency. Withdrawn drugs carry a note.','Common Indian brands'],
            ['Diabetes risk on Indian thresholds','The Indian Diabetes Risk Score: four questions, no blood test, and a South Asian waist cutoff of 90 cm for men and 80 for women rather than the Western 102 and 88.','IDRS, Mohan 2005'],
            ['Lab reports as Indian labs print them','SGPT rather than ALT, and reference ranges matched to the test names that actually appear on your report.','Curated ranges'],
            ['Answer me in my language','A standing instruction Richie always honours, alongside tone and length. Ask for Hindi and the answers come back in Hindi.','Your instruction'],
          ]}/>
        </div>
      </div>
    </div>
  </Band>);}

/* ═══ 12 PRIVACY ═══
   Defaults below are the real ones from backend/models/User.js:
   saveMemories true, improveModel TRUE (the site used to claim off), 
   biometricEnabled false, customInstructions 500 chars. */
export function Trust({bare}){
  const[mem,setMem]=useState(true),[imp,setImp]=useState(true),[bio,setBio]=useState(false);
  return(
  <Band alt id="s-privacy">
    <div className="px-wrap">
      {!bare&&<Head k="Privacy" t={<>Your data. <i>Your</i> switches.</>}
        l="Encryption is the easy part. What matters is which switches exist, what they are set to before you touch anything, and that we never sell what is behind them."/>}
      <div className="px-duo px-rv">
        <div className="px-panel px-sws">
          <div className="px-sw">
            <div className="px-sw__t"><b>Richie’s memory</b><span>Remembers your conditions between chats.</span></div>
            <span className="px-sw__def">On</span>
            <button className={`px-toggle ${mem?'':'off'}`} onClick={()=>setMem(!mem)} aria-pressed={mem} aria-label="Memory"/></div>
          <div className="px-sw">
            <div className="px-sw__t"><b>Help improve RichHealth</b><span>Anonymised. On when you sign up, one tap to turn off.</span></div>
            <span className="px-sw__def">On</span>
            <button className={`px-toggle ${imp?'':'off'}`} onClick={()=>setImp(!imp)} aria-pressed={imp} aria-label="Model improvement"/></div>
          <div className="px-sw">
            <div className="px-sw__t"><b>Face or fingerprint lock</b><span>Off until you turn it on. For phones that get handed around.</span></div>
            <span className="px-sw__def">Off</span>
            <button className={`px-toggle ${bio?'':'off'}`} onClick={()=>setBio(!bio)} aria-pressed={bio} aria-label="Biometric lock"/></div>
          <div className="px-sw px-sw--note">
            <div className="px-sw__t"><b>Standing instructions</b><span>Five hundred characters Richie honours in every answer: tone, length, language, what to call you.</span></div>
            <span className="px-sw__def">Yours</span></div>
          <p className="px-sws__ft">These are the real defaults, not aspirational ones. Two of the four are on before you touch anything, and we would rather say so here than have you find out in Settings.</p>
        </div>
        <div>
          <Rows items={[
            ['Encrypted in transit and at rest','Uploads sit in access-controlled storage, and reports are never public objects.','Standard practice'],
            ['Never sold. Not to anyone.','No ad network, no data broker, no insurer feed. The business model is subscriptions and nothing else.','No exceptions'],
            ['Sharing is per record','Every report, symptom and reading carries its own flag for whether family can see it and whether Richie may read it.','Per-item consent'],
            ['Leave whenever you like','Name, email, phone and date of birth are overwritten the moment you close the account. Ask us to remove the records as well and we will.','Your call'],
          ]}/>
        </div>
      </div>
    </div>
  </Band>);}

/* ═══ 13 THE APP ═══ */
const TABS=[
 {id:'richie',t:'Richie',img:sRichie,h:'Ask, with the record already open.',p:'The first decision is who you’re asking about. Richie loads that person’s record, and every suggestion comes from their readings.',pts:['Suggestions cite the data behind them','Model picker per chat','Answers become records in one tap']},
 {id:'hub',t:'Health Hub',img:sWatchScr,h:'Where every signal lands.',p:'Watch readings, typed measurements, reports, medicines, symptoms and cycle in one timeline instead of six apps.',pts:['98 wrist readings folded in daily','Manual glucose, BP and weight alongside','Every value trended across months']},
 {id:'services',t:'Services',img:sCheckin,h:'What to do today.',p:'Briefing, check-in, analysis, advisory, NutriCheck and doctors in one continuous answer.',pts:['Check-in becomes a watch-list','Air quality rewritten as an instruction','Food weighed against your labs']},
 {id:'profile',t:'Profile',img:sProfile,h:'Controls you can defend.',p:'Memory on or off. Model improvement on or off. Reply tone and length. Biometric lock. Close the account in one tap.',pts:['Memory is a switch, not a policy','Per-record sharing','Face or fingerprint lock']}];
/* Hidden for now: this duplicates the Gallery. Kept because we still want a
   guided per-tab tour, just not two of them. Re-add <Tour/> to bring it back. */
// eslint-disable-next-line no-unused-vars
function Tour(){
  const[i,setI]=useState(0);const t=TABS[i];
  return(
  <Band>
    <div className="px-wrap">
      <Head c k="Inside the app" t={<>Four tabs. <i>One</i> record.</>} l="Available on iPhone, Apple Watch and Android."/>
      <div className="px-tour px-rv">
        <div className="px-tabs">{TABS.map((x,j)=>(<button key={x.id} className={`px-tab ${i===j?'on':''}`} onClick={()=>setI(j)} aria-pressed={i===j}><i/>{x.t}</button>))}</div>
        <div className="px-dev fx-card fx-glow"><img src={t.img} alt={`${t.t} tab`}/></div>
        <div className="px-tour__copy" key={t.id}>
          <h3>{t.h}</h3><p>{t.p}</p>
          <ul className="px-tour__pts">{t.pts.map((x,k)=><li key={k}>{x}</li>)}</ul>
        </div>
      </div>
    </div>
  </Band>);}

/* ═══ EXPLORE ═══
   The hub. Four product areas that used to be four full sections on this page,
   each now one line and one number, linking to the page that carries the detail.
   This is what lets the homepage be an argument instead of a manual. */
const AREAS=[
 ['watch','Apple Watch','Ten metrics off Apple Health, each kept with the moment it was taken and the device that took it.','10 metrics'],
 ['family','Family','A separate record, separate ranges and a separate private chat for every person you look after.','Up to 10 people'],
 ['reports','Reports','Photograph a lab report and every value is extracted and dated, then trended across reports.','4 reports, 1 line'],
 ['proactive','Every day','A check-in on a rhythm, a watch-list with three states, and reminders that know the molecule.','Every 3 days on Ultra'],
];
export function Explore(){return(
  <Band id="s-explore">
    <div className="px-wrap">
      <Head k="What it holds" t={<>Four things it does <i>while you get on with your day.</i></>}
        l="Each of these has a page of its own, because the detail matters more than the summary."/>
      <div className="px-areas px-rv fx-stagger">
        {AREAS.map(([k,t,d,n],i)=>(
          <a className="px-area fx-glow" key={k} href={`#/${k}`} style={{'--i':i}}>
            <span className="px-area__n">{n}</span>
            <b>{t}</b>
            <p>{d}</p>
            <em>Read this</em>
          </a>))}
      </div>
    </div>
  </Band>);}

/* ═══ 14 PRICING ═══
   Prices from backend/config/plans.js. Every number in the spec grid is the limit
   that actually gates the app in backend/config/tiers.js, so the rows are directly
   comparable across plans instead of four different bullet lists. */
/* "Premium models" gated gpt5.3 and claude4.5 — labels that both resolve to
   DeepSeek — plus "max", which sits in proOnlyModels for Free and Plus but appears
   in no tier's allowedModels at all (config/tiers.js). The row sold nothing real.
   What Pro and Ultra genuinely buy is the three-lens panel on check-ins. */
/* Each row carries the app's OWN icon — the site was drawing approximations of
   shapes the product already ships. Keys map into APPICON above. */
const SPEC=[
 ['Richie messages','msg'],
 ['Report uploads','upload'],
 ['Report analysis','analysis'],
 /* usageTracker.js:97 meters `nutricheck`, and :151 sets free 5, plus 15,
    pro and ultra unlimited. This row used to carry 2/10/20/Unlimited — the
    numbers for `dietaryInsights`, which is a DIFFERENT feature on :152 and is
    hidden in both apps. The row was selling a hidden feature's allowance under
    NutriCheck's name. shouldResetUsage (:3-8) rolls on calendar month, so
    "a month" is the right period. */
 ['NutriCheck','nutri'],
 ['People covered','family'],
 /* Plus is YES, and the table said No for months. checkInController.js:489
    computes isPro as (isPro && unexpired) with no plan comparison, and auth.js:80
    sets isPro true for plus, pro, ultra, family and family_member alike. Plus has
    always had the three lenses; the site was underselling it. */
 ['Three-lens check-in','checkin'],
];
/* Four plans. Every spec value is the matching row of backend/config/tiers.js —
   messagesPerSession, reportsPerPeriod, canAnalyzeReports, healthAnalysisPerMonth,
   dietaryInsightsPerMonth, maxDependents + maxFamilyMembers, and whether the
   check-in gets the Council. "Unlimited" on Max is real: usageTracker.js:135
   reads reportsPerPeriod 0 as null, and healthAnalysisPerMonth /
   dietaryInsightsPerMonth are null on that tier.
   m = price per month billed monthly. y = price per month billed yearly. */
const PLANS=[
 {n:'Free', m:0, y:0, who:'Enough to find out whether it understands you.',
  v:['5 a session','2','No','5 a month','Just you','No']},
 {n:'Plus', m:29.99, y:19.99, who:'One person who wants their reports read properly.',
  v:['25 a session','5','Yes','15 a month','You and 1','Yes']},
 {n:'Pro', m:59.99, y:49.99, tag:'Most chosen', hero:true, who:'You and a parent or a child, with the full model list.',
  v:['50 a session','10','Yes','Unlimited','You and 2','Yes']},
 {n:'Max', m:149.99, y:119.99, who:'Nothing metered, for whoever runs health for the family.',
  v:['100 a session','Unlimited','Yes','Unlimited','You and 10','Yes']},
];
/* toLocaleString, not toFixed: the yearly total on Max is $1,439.88 and a price
   without its thousands separator reads as a typo. */
const money=n=>`$${n.toLocaleString('en-US',{minimumFractionDigits:n%1?2:0,maximumFractionDigits:2})}`;

/* The price COUNTS DOWN to the yearly figure rather than being swapped for it.
   That is the whole argument of the toggle made visible: you watch the number
   fall, and how far it falls is the discount. A cut that you see happen is more
   persuasive than two numbers that were never in the same place at once.
   Tabular numerals, so nothing reflows while it runs. */
function useTween(target,ms=560){
  const[v,setV]=useState(target);
  const from=useRef(target), raf=useRef(0);
  useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion:reduce)').matches){
      from.current=target; setV(target); return; }
    const start=from.current, delta=target-start;
    if(!delta){ setV(target); return; }
    let t0=0;
    const step=t=>{ if(!t0) t0=t;
      const p=Math.min(1,(t-t0)/ms);
      setV(start+delta*(1-Math.pow(1-p,3)));   /* ease-out cubic */
      if(p<1) raf.current=requestAnimationFrame(step);
      else { from.current=target; setV(target); } };
    raf.current=requestAnimationFrame(step);
    return()=>cancelAnimationFrame(raf.current);
  },[target,ms]);
  return v;
}

function PlanPrice({p,yearly}){
  const live=useTween(yearly?p.y:p.m);
  /* Free gets a billing line too — not for information, but so its price block
     is the same height as the other three and the four rows stay level. */
  if(!p.m) return(<>
    <div className="px-plan__price"><span>$0</span><em>always free</em></div>
    <div className="px-plan__bill">no card, no trial clock</div>
  </>);
  const save=Math.round((p.m-p.y)*12);
  return(<>
    <div className="px-plan__price">
      {/* the old price only exists while there is a discount to point at */}
      {yearly&&<s>{money(p.m)}</s>}
      <span>{`$${live.toFixed(2)}`}</span><em>/month</em>
    </div>
    <div className={`px-plan__bill ${yearly?'is-year':''}`}>
      {yearly
        ? <>billed {money(+(p.y*12).toFixed(2))} a year <b>save ${save}</b></>
        : <>billed monthly</>}
    </div>
  </>);
}

function BillingToggle({yearly,onChange}){
  /* Two real radios in a group, so arrow keys and screen readers work; the pill
     behind them is decorative and slides between the two. */
  return(
  <div className="px-bill">
    <div className={`px-bill__seg ${yearly?'is-year':''}`} role="radiogroup" aria-label="Billing period">
      <span className="px-bill__thumb" aria-hidden="true"/>
      <button type="button" role="radio" aria-checked={!yearly} tabIndex={yearly?-1:0}
        className={!yearly?'on':''} onKeyDown={radioKeys(0,2,i=>onChange(!!i))}
        onClick={()=>onChange(false)}>Monthly</button>
      <button type="button" role="radio" aria-checked={yearly} tabIndex={yearly?0:-1}
        className={yearly?'on':''} onKeyDown={radioKeys(1,2,i=>onChange(!!i))}
        onClick={()=>onChange(true)}>Yearly</button>
    </div>
    <span className={`px-bill__save ${yearly?'is-on':''}`}>Save up to 33%</span>
  </div>);
}

function Pricing(){
  const[yearly,setYearly]=useState(true);
  return(
  <Band alt id="s-pricing">
    <div className="px-wrap">
      {/* The free band that used to sit here has gone. It was a whole card
          arguing that free is real, standing in front of four cards where Free
          is already the first one — the argument now lives in the lede, where it
          costs three lines instead of a section. */}
      <Head k="Price" t={<>Price: four plans, and <i>Free is not a trial.</i></>}
        l="Free is not a demo. It is the app with smaller numbers, and it stays free — paying is for volume, and for reading a lab report line by line. Cancel anytime from inside the app."/>
      <BillingToggle yearly={yearly} onChange={setYearly}/>
      <div className="px-plans px-rv fx-stagger">
        {/* No fx-card / fx-glow. The whole card lifted six pixels and lit under
            the cursor while the only thing you could click was the pill at the
            bottom of it — a card that behaves like a button and is not one. The
            pill keeps both. */}
        {PLANS.map((p,i)=>(<div key={p.n} className={`px-plan ${p.hero?'px-plan--hero':''}`} style={{'--i':i}}>
          <div className="px-plan__hd"><b>{p.n}</b>{p.tag&&<span className="px-plan__tag">{p.tag}</span>}</div>
          <PlanPrice p={p} yearly={yearly}/>
          <div className="px-plan__for">{p.who}</div>
          <ul className="px-plan__spec">
            {SPEC.map(([label,ic],j)=>(
              <li key={label}><Ico n={ic} size={16}/>
                <span>{label}</span><b className={p.v[j]==='No'?'off':''}>{p.v[j]}</b></li>))}
          </ul>
        </div>))}
      </div>
      {/* Was four buttons, one per card — same label, same href, same anchor,
          differing only in fill vs line, which made the variant decorative
          rather than semantic. Nothing is purchasable before launch, so four
          cards cannot lead anywhere different. One action for one action. */}
      <div className="px-plans__cta">
        <a href="#get" className="px-btn px-btn--fill fx-glow px-arw">Join the waitlist</a>
      </div>
      <p className="px-plans__ft">Nothing is on sale yet — plans open when the app launches on {LAUNCH_LONG}.
        Check-ins run monthly on Free and Plus, weekly on Pro and every third day on Max.
        Prices are per person; a Max plan covers five relatives who each keep their own account and their own record.</p>
    </div>
  </Band>);}

/* ═══ GROUNDED — the receipt ══════════════════════════════════════════════════
   The site asserted "grounded in research" in four places and demonstrated it in
   none: a marquee of source names, a footnote under the intake diagram, a line
   on the Richie page, and a whole feature page listing sources abstractly. This
   is the demonstration — one real answer with the eight papers it actually read.

   Rebuilt in CSS rather than shipped as the phone screenshot, for the same
   reason the Health Hub cards were: eight paper titles at phone scale are
   unreadable at any size that fits a page, and a picture cannot expand. Built,
   it can behave the way the app behaves — the trace opens.

   TRANSCRIBED, WITH ONE OMISSION. The capture also showed a line reading
   "Checked drug information: …". No such tool exists in this codebase —
   toolRegistry.js registers exactly three (search_publications,
   fetch_health_records, web_search) and neither ChatModels.swift nor
   ChatMessage.java has a case that would format that string. It is either newer
   than this checkout or from somewhere else, so it is not on the website. The
   three lines below use the formats those two files really produce.

   Not tier-gated: rhChatController.js:543 gates the agentic path on the
   AGENTIC_CHAT_ENABLED env flag, not on the plan. Free asks get citations too. */
const PROOF={
 q:'Does my calcium supplement affect my kidney stones? Elemental calcium 333mg with magnesium and vitamin D3, one pill, nightly for eighteen days.',
 tools:['Searched research: calcium supplement kidney stones',
        'Searched the web: calcium supplements kidney stone risk',
        'Checked your medications log'],
 /* Eight were read; three are shown, so the whole section still lands inside
    one screen like every other band. The count in the header stays the true
    one and the remainder is stated rather than quietly dropped. */
 total:8,
 sources:['Calcium Supplementation and Incident Kidney Stone Risk: A Systematic Review (2008)',
  'Dietary Factors and the Risk of Incident Kidney Stones in Younger Women (2004)',
  'How To Prevent Kidney Stones — Yale Medicine'],
 a:['Possible — but modest, and I would lean toward keeping it while you heal.',
    'The evidence is genuinely split. Dietary calcium protects against stones: it binds oxalate in the gut, so less of it ever reaches your kidneys.',
    'And your metatarsal fracture needs calcium to heal now. Stone risk from a supplement is the long game — the fracture is this month.']};

export function Proof(){
  /* The trace RUNS when it arrives rather than sitting there already open. The
     tool lines tick in one at a time and the papers cascade after them, so the
     reader watches the reading happen instead of being handed a finished list —
     which is the difference between claiming a citation and showing one. It is
     all transition-delay off --i, so reduced motion lands on the open state with
     no sequence at all. Clicking the row collapses it, exactly as in the app. */
  const[run,setRun]=useState(false),[open,setOpen]=useState(true);
  const ref=useRef(null);
  useEffect(()=>{ const el=ref.current; if(!el) return;
    const io=new IntersectionObserver(e=>{ if(e[0].isIntersecting){ setRun(true); io.disconnect(); } },{threshold:.25});
    io.observe(el); return()=>io.disconnect(); },[]);
  const n=PROOF.total, shown=PROOF.sources.length;
  return(
  <Band id="s-proof">
    <div className="px-wrap">
      {/* Centred. Left-aligned like every other section, the receipt sat in the
          left 60% with the right side empty — a single exhibit wants the middle
          of the page, not the reading column. */}
      <Head c k="How" t={<>How it answers — the research comes <i>first.</i></>}
        l="It is not allowed to answer a general health question from memory. Your question is rewritten into search terms, peer-reviewed literature and the web are searched, and the reply is written only from what came back — up to eight sources, each named under the answer."/>
      {/* `in` is set here, not left to the page-wide useReveal observer. That one
          is re-created on every render of the parent and never got to this block,
          so the container sat at opacity 0 with a fully sequenced receipt inside
          it — 806px of invisible content. This component already has its own
          observer for the sequence; it may as well own the reveal too. */}
      <div className={`px-pf px-rv ${run?'is-run in':''}`} ref={ref}>
        <p className="px-pf__ask">{PROOF.q}</p>

        {/* SIDE BY SIDE, not stacked. Stacked, this section ran 1233px — 1.37
            screens, where every other section on the page is about 1.0 — so the
            one exhibit that has to be seen was the one you had to scroll for.
            The receipt and the answer are two halves of the same claim anyway:
            what it checked, and what it therefore said. */}
        <div className="px-pf__cols">
          <div className="px-pf__col">
            <button type="button" className={`px-pf__trace ${open?'is-open':''}`}
              aria-expanded={open} aria-controls="px-pf-body" onClick={()=>setOpen(o=>!o)}>
              <Ico n="analysis" size={14}/>
              <span>Checked {n} sources</span>
              <Ico n="chev" size={10} cls="px-pf__tchev"/>
            </button>
            <div className="px-pf__body" id="px-pf-body" hidden={!open}>
              <ul className="px-pf__tools">
                {PROOF.tools.map((t,i)=>(
                  <li key={t} style={{'--i':i}}><Ico n="check" size={13}/>{t}</li>))}
              </ul>
              <span className="px-pf__k">Sources</span>
              <ol className="px-pf__src">
                {PROOF.sources.map((t,i)=>(<li key={t} style={{'--i':i}}>{t}</li>))}
                <li className="px-pf__more" style={{'--i':shown}}>and {n-shown} more</li>
              </ol>
            </div>
          </div>

          <div className="px-pf__col">
            <div className="px-pf__thought"><Ico n="cognition" size={13}/>Thought process<Ico n="chev" size={10}/></div>
            <div className="px-pf__msg">
              {PROOF.a.map((t,i)=><p key={i} className={i===0?'px-pf__lead':''}>{t}</p>)}
            </div>
          </div>
        </div>
        {/* The last line is the whole argument: eight papers weighed against one
            fracture in her own record. Neither half is any use without the other. */}
        {/* was "every source it used" — five of the eight are listed, so that
            sentence stopped being true the moment the list was trimmed. */}
        <p className="px-pf__ft">A real answer, and the reading behind it. Richie is not a doctor —
          where it and a treating doctor disagree, the app tells you to follow the doctor.</p>
      </div>
    </div>
  </Band>);}

/* ═══ 15 FAQ ═══ */
/* Six questions, not nine. The homepage FAQ was 335 words — 18% of the page —
   on a site whose whole problem was length. The cut ones live in the deep pages.
   Two answers here were also wrong and are corrected:
   · the "council" answer sold "several expert views" as vendor plurality; it is
     three analytical lenses on one provider (checkInController.js:54).
   · the newborn answer promised WHO percentile curves, an Indian vaccine calendar
     and milestone checks. None of the three exist in any repo — "vaccin" appears
     only inside a news-feed seed script. Replaced with what a dependent record
     actually does. */
const FAQ=[
 ['Is Richie a doctor?',
  'No, and it says so itself. It organises and explains your health so that a real consultation starts from your whole story instead of from scratch. If your doctor disagrees with it, follow your doctor.'],
 ['Can I choose which AI reads my record?',
  /* tiers.js — canSelectModel is true on every tier including free; the five in
     allowedModels are open to everyone and proOnlyModels lifts at pro. This
     describes the picker and stops there: config/ai.js says in writing not to
     sell "GPT vs Claude vs Gemini" as different answers. */
  'Yes, on every plan including Free. There is a model picker in the app: Free and Plus choose between five, Pro and above add GPT‑5.3 and Claude 4.5. Whichever you pick is reading the same record — the picker changes the mind, not what it knows about you.'],
 ['Where do the answers come from?',
  'Richie is not allowed to answer a general health question from memory. Your question is turned into search terms, peer-reviewed research and the web are searched, and the reply is written only from what comes back — up to eight sources, each named under the answer.'],
 ['What are the three lenses?',
  'A hard question is read three ways at once — one for heart and diabetes risk, one for whether you are actually taking your medicines, one for sleep, stress and food. Richie weighs the three rather than averaging them, and you can read each take.'],
 ['Can I log my periods?',
  /* PeriodLog.js — startDate, endDate, flowIntensity, painLevel, notes, plus
     shareWithFamily and includeInChat per entry. ai.js:276-278 puts the last six
     into every chat and analysis. There is no prediction code anywhere in the
     backend, so nothing here promises one. */
  'Yes. Dates, flow, pain and any notes — from the tracker or in a sentence, mid-conversation. Every entry has its own switches for whether family can see it and whether Richie may read it, and your last six cycles go into every chat and every analysis. That is the point: a period read next to your thyroid panel, not in a separate app.'],
 ['Do I have to type everything in?',
  'No. Photograph a report and it is read for you — values, dates, units and the name the lab actually printed. "Creatinine, Serum" and "Creatinine" become the same line on the same trend.'],
 ['Do I need an Apple Watch?',
  'No. Everything works without one. If you have a Watch, or an Android wearable through Health Connect, those readings fold in automatically and the reasoning gets sharper.'],
 ['Will it understand Indian medicine names?',
  'Yes. Crocin and Dolo are the same molecule and your record knows both. Reference ranges follow the names Indian labs actually print — SGPT rather than ALT — and Rantac is flagged as withdrawn.'],
 ['Can I add my child?',
  'Yes. A dependent gets their own record, their own paediatric reference ranges and their own private chat, and Richie answers from their profile rather than yours.'],
 ['How does one plan cover ten people?',
  'Max carries five dependent profiles you manage plus five relatives who each get their own account. Every person keeps a separate record, and sharing stays per-record and opt-in.'],
 ['Can I share any of this with my doctor?',
  'Yes. You can share a dated summary of your history with a doctor you connect to. Nothing is shared by default — it is per-record and you turn it on.'],
 ['Is Free actually free?',
  /* tiers.js free: messagesPerSession 5, reportsPerPeriod 2,
     healthAnalysisPerMonth 1, checkIn monthly, maxDependents 0. */
  'Yes, and it stays free. Five messages a session, two report uploads, one health analysis a month and a monthly check-in, for you. Paying buys volume and line-by-line report reading — not a different app.'],
 ['Is my chat used to train models?',
  'The contents of your reports and conversations are not training data. Aggregate, de-identified usage data is on when you sign up, and one tap in Profile turns it off.'],
 ['Can I delete my account?',
  'Yes, from Profile, whenever you want. Your sign-in details are removed and the account cannot be used again.'],
];

/* THE LEDGER. The category pills went: five filters over six questions, on a
   section whose whole job is to be scanned in one pass. There are fourteen now
   and they still do not need filtering — they need to be readable in order.

   This is the site's hairline row again (.px-spine li, .px-ledger li, and the
   Who column): a numeral in a fixed left column, the question in the next, a
   sign at the end, a rule over each. The answer opens into the question's own
   column so the numerals stay a clean vertical line down the page.

   The open/close is grid-template-rows 0fr -> 1fr with visibility, which is the
   mechanism already proven on this site — max-height silently clips any answer
   longer than the tallest you happened to test, and overflow:hidden alone hides
   nothing from a screen reader. */
export function Faq(){
  const[open,setOpen]=useState(0);
  /* Reveal in React state, not useReveal()'s classList.add. This component
     re-renders on every open/close, and holding view state on a class that
     React also owns is how rows end up stuck at opacity 0 — it has happened on
     this codebase before. */
  const[seen,setSeen]=useState(false); const ref=useRef(null);
  useEffect(()=>{const el=ref.current; if(!el) return;
    const io=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ setSeen(true); io.disconnect(); } },
      {threshold:.08});
    io.observe(el); return()=>io.disconnect();},[]);
  return(
  <Band id="s-faq">
    <div className="px-wrap">
      <Head k="FAQs" t={<>FAQs — the questions <i>we get asked.</i></>}
        l="Answered from the code, including the places where the honest answer is not the flattering one."/>
      {/* TWO COLUMNS, and they are real columns rather than a two-up grid: a
          grid would put rows 01/02 side by side and opening either would push
          BOTH down. Splitting the array means the halves move independently.
          DOM order is still 01…14, so reading order and tab order match. */}
      <div className={`px-fq ${seen?'is-in':''}`} ref={ref}>
        {[FAQ.slice(0,7),FAQ.slice(7)].map((col,c)=>(
        <div className="px-fq__col" key={c}>
        {col.map(([q,a],j)=>{
          const i=c*7+j;
          const on=open===i;
          return(
          <div className={`px-fq__row ${on?'is-open':''}`} key={q} style={{'--i':i}}>
            <button type="button" className="px-fq__q" id={`px-fq-b-${i}`}
              aria-controls={`px-fq-a-${i}`} aria-expanded={on}
              onClick={()=>setOpen(on?-1:i)}>
              <span className="px-fq__n" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
              <span className="px-fq__t">{q}</span>
              <span className="px-fq__x" aria-hidden="true"/>
            </button>
            <div className="px-fq__a" id={`px-fq-a-${i}`} role="region" aria-labelledby={`px-fq-b-${i}`}>
              <div className="px-fq__inner"><p>{a}</p></div>
            </div>
          </div>);})}
        </div>))}
      </div>
    </div>
  </Band>);}

/* ═══ WAITLIST ════════════════════════════════════════════════════════════════
   The app is not out. It ships 1 October 2026, so every "get it" affordance on
   the site pointed at nothing: two store badges that linked to their own anchor,
   a QR panel drawing procedural noise, and a footer form that called
   preventDefault() and posted nowhere. All of that is replaced by ONE component,
   rendered exactly twice — full in the closing band (the target of every #get),
   compact in the footer, which is the only block that appears on every route.

   Deliberately not a third instance: the sticky corner prompt scrolls to this
   one and focuses it rather than carrying its own input, because three live
   copies of the same field on one page is how a form ends up with three
   different behaviours. */
export const LAUNCH_ISO='2026-10-01T00:00:00+05:30';   /* IST — the team ships from India */
export const LAUNCH_LONG='1 October 2026';
export const LAUNCH_SHORT='1 Oct 2026';

/* First network call the site has ever made. The origin is the deployed API
   (ios/.../APIConfig.swift agrees); REACT_APP_API_URL overrides it for local work. */
const WAITLIST_API=(process.env.REACT_APP_API_URL||'https://richhealthbackend.vercel.app').replace(/\/+$/,'')+'/api/waitlist';

function daysToLaunch(){
  return Math.ceil((new Date(LAUNCH_ISO).getTime()-Date.now())/86400000);
}

/* Deliberately loose. The server validates properly (express-validator .isEmail);
   this only catches the obvious typo before we spend a round trip on it. */
const EMAIL_RE=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Same words for "joined" and "already on the list". The endpoint tells them
   apart — useful in a log — but the page must not, because anyone can type
   anyone's address into it and a different sentence would answer the question
   "does this person have an account here". */
const JOINED_COPY='You are on the list.';

/* Read off the ISO string, never off a Date: new Date(LAUNCH_ISO).getDate() in a
   browser west of IST returns 30 SEP for the same instant, and the plate would
   quietly print a different date than the sentence above it. Splitting the
   string is timezone-proof and keeps one source of truth for the day. */
const MON=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
const[L_Y,L_M,L_D]=LAUNCH_ISO.slice(0,10).split('-');

function LaunchPlate(){
  const d=daysToLaunch();
  return(
    <div className="px-wl__plate">
      <span className="px-wl__plate-k">Launching</span>
      <b className="px-wl__plate-d"><span>{L_D}</span><i aria-hidden="true"/><span>{MON[Number(L_M)-1]}</span><i aria-hidden="true"/><span>{L_Y}</span></b>
      {d>1&&<span className="px-wl__plate-c">{d} days to go</span>}
      {d===1&&<span className="px-wl__plate-c">Tomorrow</span>}
      {d===0&&<span className="px-wl__plate-c">Today</span>}
    </div>);
}

export function Waitlist({source='closer',compact=false}){
  const[email,setEmail]=useState('');
  /* idle | pending | joined | already | invalid | error — held in React state,
     never on the node's className, which React owns and would wipe. */
  const[state,setState]=useState('idle');
  const[note,setNote]=useState('');
  const box=useRef(null), field=useRef(null);
  const inputId=`wl-${source}`, noteId=`wl-${source}-note`;
  const done=state==='joined'||state==='already';
  const bad=state==='invalid'||state==='error';

  /* The sticky corner prompt asks for this field rather than duplicating it. */
  useEffect(()=>{
    if(source!=='closer') return undefined;
    let t=0;
    const on=()=>{
      const slow=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;
      if(box.current) box.current.scrollIntoView({block:'center',behavior:slow?'auto':'smooth'});
      window.clearTimeout(t);
      t=window.setTimeout(()=>{ const el=field.current;
        if(!el) return;
        try{ el.focus({preventScroll:true}); }catch(err){ el.focus(); }
      },slow?0:420);
    };
    window.addEventListener('rh:waitlist',on);
    return()=>{ window.clearTimeout(t); window.removeEventListener('rh:waitlist',on); };
  },[source]);

  async function submit(e){
    e.preventDefault();
    if(state==='pending') return;
    const v=email.trim();
    if(!EMAIL_RE.test(v)){ setState('invalid'); setNote('Please enter a valid email address.'); return; }
    setState('pending'); setNote('');
    try{
      const r=await fetch(WAITLIST_API,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email:v,source}),
      });
      let d=null; try{ d=await r.json(); }catch(err){ d=null; }
      if(r.status===429){ setState('error');
        setNote('Too many attempts from this connection. Please try again a little later.'); return; }
      if(r.status===400){ setState('invalid'); setNote('Please enter a valid email address.'); return; }
      if(!r.ok||!d||d.ok!==true){ setState('error');
        setNote('We could not save that just now. Please try again in a moment.'); return; }
      /* The typed value is never cleared — after any failure it is still in the box. */
      setState(d.status==='already'?'already':'joined'); setNote('');
    }catch(err){
      setState('error');
      setNote('We could not reach the server. Check your connection and try again.');
    }
  }

  return(
    <div className={`px-wl${compact?' px-wl--compact':''}`} ref={box}>
      {compact&&<p className="px-wl__k">Launching {LAUNCH_LONG}</p>}
      {!compact&&<LaunchPlate/>}
      {done?(
        <div className="px-wl__done" role="status" aria-live="polite">
          <span className="px-wl__tick" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"
              strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5.2 5.2L20 7"/></svg>
          </span>
          <span className="px-wl__done-t">
            <b>{JOINED_COPY}</b>
            <span>We will email {email} when RichHealth opens on {LAUNCH_LONG}. One email, nothing else.</span>
          </span>
        </div>
      ):(
        <form className="px-wl__form" onSubmit={submit} noValidate>
          <label className="px-wl__lbl" htmlFor={inputId}>Email address</label>
          <div className="px-wl__row">
            <input id={inputId} ref={field} className="px-wl__in" type="email" name="email"
              value={email}
              onChange={e=>{ setEmail(e.target.value); if(bad){ setState('idle'); setNote(''); } }}
              placeholder="you@example.com" autoComplete="email" inputMode="email"
              spellCheck="false" maxLength={254}
              aria-invalid={state==='invalid'} aria-describedby={noteId}/>
            {/* aria-disabled, not disabled: a real `disabled` on the control the
                keyboard user just activated throws focus to <body> mid-request.
                The double-submit guard is the first line of submit(). */}
            <button className="px-btn px-btn--fill fx-glow px-wl__go" type="submit"
              aria-disabled={state==='pending'} aria-busy={state==='pending'}>
              {state==='pending'?'Joining…':(compact?'Join':'Join the waitlist')}
            </button>
          </div>
          <p id={noteId} className={`px-wl__note${bad?' px-wl__note--bad':''}`} role="status" aria-live="polite">
            {note||'One email on launch day. No newsletter, and the address is never shared.'}
          </p>
        </form>
      )}
    </div>);
}

/* ═══ THE ASK, ON A PAGE THAT IS NOT THE HOME PAGE ════════════════════════════
   Eleven feature pages, plus quality, security and about, ended with no primary
   action at all: the only route to the waitlist from any of them was the nav or
   the footer.

   A LINK, NOT A SECOND FORM. <Waitlist compact/> already renders on every one of
   these routes — it is in <Foot/>, directly below this — so a form here would be
   the third live copy of one field on one page, which is exactly what the
   Waitlist comment above warns against. This points at the real field in the
   closing band, where the launch plate and the full copy are. */
export function PageCta({note}){return(
  <div className="px-pcta">
    <p className="px-pcta__t">{note||<>RichHealth opens on {LAUNCH_LONG}. Free to start, on iPhone, Apple&nbsp;Watch and Android.</>}</p>
    <a className="px-btn px-btn--fill fx-glow px-arw" href="#/#s-get">Join the waitlist</a>
  </div>);}

/* ═══ CLOSER + FOOTER ═══ */
function Closer(){return(
  <Band alt id="s-get">
    <div className="px-wrap px-closer">
      <div className="px-rv">
        <Mast k="Launch"/>
        {/* NBSP between the day and the month: the h2 wraps at 20ch and broke
            "1 / October" across two lines at both 1440 and 390. */}
        <h2 className="px-h2">RichHealth opens on 1&nbsp;October. <i>Be on the list.</i></h2>
        {/* The date is already in the h2 above and in the plate below. Saying it
            a third time here read as three dates rather than one, so the lede
            carries the platforms and the promise instead. */}
        <p className="px-lede">Not out yet — iPhone, Apple Watch and Android, free to start. Leave your email and we will send you the link that morning.</p>
        {/* The target of every #get. The two store badges that used to sit here
            linked to this same anchor — a download button for something nobody
            can download, and Apple's own identity guidelines only allow that
            badge when it opens the App Store listing. The platform promise they
            were making is now made in words, which can be true today. */}
        <div className="px-closer__cta" id="get">
          <Waitlist source="closer"/>
        </div>
      </div>
    </div>
  </Band>);}

export function Foot(){
  /* The closing band renders the only form on the site. Where it is on this page
     the footer adds nothing — and the same is true of the page-end CTA every
     feature/trust page carries, which also sits directly above it. Where neither
     is present the footer IS the ask. */
  const[hasForm,setHasForm]=useState(false);
  useEffect(()=>{ setHasForm(!!document.querySelector('#get, .px-pcta')); },[]);
  return(
  <footer className="px-foot">
    <div className="px-wrap">
      <div className="px-foot__top">
        <div>
          <Logo/>
          <p className="px-foot__tag">One health record for everyone you look after. iPhone, Apple Watch and Android.</p>
          {/* Ported off the pre-split footer, which carried a social row AND the
              two store badges; the new footer had neither. Its own column links
              all pointed at homepage anchors that stopped existing when the site
              was split into pages, so only these two blocks were worth keeping.
              The icons are the app's own, verbatim — an earlier pass stripped
              width/height from every element rather than just the root <svg>,
              which deleted LinkedIn's bar and Instagram's frame. */}
          <div className="px-foot__soc">
            <a href="https://x.com/richhealthai" target="_blank" rel="noopener noreferrer" aria-label="RichHealth on X"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4l11.733 16h4.267l-11.733-16z"/><path d="M4 20l6.768-8.046"/><path d="M13.277 11.954L20 4"/></svg></a>
            <a href="https://linkedin.com/company/richhealth-ai" target="_blank" rel="noopener noreferrer" aria-label="RichHealth on LinkedIn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
            <a href="https://instagram.com/richhealth.ai" target="_blank" rel="noopener noreferrer" aria-label="RichHealth on Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg></a>
            <a href="https://youtube.com/@richhealthai" target="_blank" rel="noopener noreferrer" aria-label="RichHealth on YouTube"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg></a>
            <a href="mailto:hello@richhealth.app" aria-label="Email RichHealth"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg></a>
          </div>
          {/* A LINK, NOT A SECOND FORM. On the home page this put a second
              <form>, a second "Email address" label and a second submit button
              one section below the first — the same field asked for twice on one
              screen. There is now exactly one form on the site, in the closing
              band, and every other surface points at it. */}
          <p className="px-foot__k">Launching {LAUNCH_LONG}</p>
          {/* ...and not even the link on the one page that carries the form: the
              closing band sits directly above the footer, so it would be the
              same ask twice inside one screen. */}
          {!hasForm&&<a href="#/#s-get" className="px-btn px-btn--line fx-glow px-arw px-foot__cta">Join the waitlist</a>}
        </div>
        <div className="px-foot__cols">
          <div className="px-foot__col"><b>Product</b><a href="#/#s-does">What it holds</a><a href="#/#s-intake">Full context</a><a href="#/#s-pricing">Pricing</a></div>
          <div className="px-foot__col"><b>Explore</b><a href="#/deep/india">Built for India</a><a href="#/deep/privacy">Privacy</a><a href="#/deep/cycle">Cycle intelligence</a><a href="#/deep/doctors">For doctors</a><a href="#/deep/evidence">Our sources</a></div>
          <div className="px-foot__col"><b>Company</b><a href="#/about">About</a><a href="#/investors">Investors</a><a href="#/careers">Careers</a><a href="mailto:doctors@richhealth.app">Doctors</a></div>
          <div className="px-foot__col"><b>Trust</b><a href="#/quality">Medical quality</a><a href="#/security">Security and data</a><a href="#/legal/privacy-policy">Privacy policy</a><a href="#/legal/terms">Terms</a><a href="#/legal/medical-disclaimer">Disclaimer</a></div>
        </div>
      </div>
      <div className="px-foot__legal">
        <span>© {new Date().getFullYear()} RichHealth Technologies Inc.</span>
        <span>Richie is an AI health assistant. It is informational, not a diagnosis. In an emergency, call your local emergency number.</span>
      </div>
    </div>
  </footer>);}

/* sticky QR (desktop) */
/* ── Consent ──────────────────────────────────────────────────────────────────
   The site sets no cookies and loads no tracker today, so this stays OFF. Flip
   NEEDS_CONSENT to true the day something is added that stores on the visitor’s
   device or calls a third party with their IP. Until then a banner would be
   consent theatre, and our own privacy page says we do not do that.
   Built to be lawful when it does ship: Decline carries the same weight as Accept
   (GDPR art.7(3) / ePrivacy), the choice is remembered, and it never blocks the
   page. The choice itself is strictly necessary storage, so it needs no consent. */
const NEEDS_CONSENT=true;
const CONSENT_KEY='rh.consent';
/* The answer is published where anything added later can read it, so this is a
   real gate rather than a banner that clears itself. Whatever measurement gets
   wired in must check it before it loads:
       if (document.documentElement.dataset.consent === 'all') { ...load it... }
   Nothing on the site reads it yet, because nothing on the site measures yet. */
function applyConsent(v){
  try{ document.documentElement.dataset.consent = v==='all'?'all':'necessary'; }catch(e){}
  try{ window.__rhConsent = v; }catch(e){}
}
export function Consent({onChange}){
  const[show,setShow]=useState(false);
  useEffect(()=>{ if(!NEEDS_CONSENT) return;
    let saved=null; try{ saved=window.localStorage.getItem(CONSENT_KEY); }catch(e){}
    /* First load only. A stored answer — of either kind — means never again. */
    if(!saved) setShow(true); else { applyConsent(saved); onChange&&onChange(saved); }
  },[onChange]);
  const decide=v=>{ try{ window.localStorage.setItem(CONSENT_KEY,v); }catch(e){}
    applyConsent(v); setShow(false); onChange&&onChange(v); };
  if(!show) return null;
  return(
  <div className="px-cc" role="dialog" aria-live="polite" aria-labelledby="px-cc-t">
    <div className="px-cc__t">
      <b id="px-cc-t">Cookies</b>
      <p>Essential storage keeps the site working. With your consent we would also
        measure which pages get read — aggregated, no identifier, and never joined
        to a health record.</p>
    </div>
    {/* Both buttons carry the same weight on purpose. Refusing has to be as easy
        as accepting (GDPR art.7(3), and the reason CNIL has fined sites that make
        "reject" the quieter button), so neither is the filled one. */}
    <div className="px-cc__a">
      <button type="button" className="px-btn px-btn--line fx-glow" onClick={()=>decide('necessary')}>Only necessary</button>
      <button type="button" className="px-btn px-btn--line fx-glow" onClick={()=>decide('all')}>Accept all</button>
      <a className="px-cc__l" href="#/legal/privacy-policy">Privacy policy</a>
    </div>
  </div>);}

/* ── sticky launch prompt (desktop) ───────────────────────────────────────────
   This slot used to hold "Scan to download" over a 21×21 grid filled by
   ((x*7 + y*11 + (x*y)%5) % 3 === 0). That is not a QR code — no format info, no
   timing pattern, no error correction — so a phone camera would have found
   nothing, on the one element whose entire promise is that it scans. It is gone,
   along with its CSS (which was also the site's last backdrop-filter).

   Something still earns the slot: the whole reason for its scroll trigger — a
   reader who has gone past pricing is the one worth asking — survives the launch
   date changing. What it offers changes. It carries the date and the count, and
   its button hands the reader to the real field in the closing band instead of
   being a fourth place to type an address. */
function LaunchPill(){
  const[show,setShow]=useState(true);
  const[past,setPast]=useState(false);
  useEffect(()=>{const on=()=>{const p=document.getElementById('s-pricing');
      const after=p ? p.getBoundingClientRect().top < window.innerHeight*.6
                    : window.scrollY > window.innerHeight*6;
      /* …but stand down over the footer. The QR used to sit on top of the line
         that tells you to call your local emergency number, which is the one
         piece of text on this page that must never be covered — and the footer
         carries the same waitlist field anyway. */
      const f=document.querySelector('.px-foot');
      const atFoot=f ? f.getBoundingClientRect().top < window.innerHeight : false;
      setPast(after&&!atFoot);};
    window.addEventListener('scroll',on,{passive:true});on();
    return()=>window.removeEventListener('scroll',on);},[]);
  const d=daysToLaunch();
  if(!show||!past||d<0)return null;
  return(<div className="px-launch">
    <span className="px-launch__n"><b>{d}</b><em>{d===1?'day':'days'}</em></span>
    {/* No button. From the pricing section down, the nav is already carrying a
        "Join the waitlist" — a floating second copy of it made two identical
        asks on one screen. This states the date and gets out of the way; the
        nav does the asking. */}
    <span className="px-launch__t">
      <b>Launching {LAUNCH_SHORT}</b>
      <em>Free to start</em>
    </span>
    <button className="px-launch__x" type="button" onClick={()=>setShow(false)} aria-label="Dismiss">×</button>
  </div>);}

/* ═══ WHAT IT DOES — bento overview, then a three-card deep dive ══════════════
   The accordion was wrong and the stat-tile deck before it was wrong for the same
   underlying reason: both made every feature the same size, so nothing could say
   "this one is the product." Size is the only encoding that does that at a glance.

   Measured, across three researched patterns:
   · A bento is the ONLY one of the three where card area carries importance. A
     sticky stack makes every card identical by construction — that is what makes
     it read as a deck. A horizontal accordion makes size mean "currently open",
     and hides four of five features at all times, which is the wrong instinct in
     a category where breadth IS the pitch.
   · 12 columns, not 4: a 4-column grid can only say 1 / 2 / 4, too coarse to
     separate "major" from "supporting". At 12 the areas land on ~6 : 2 : 1.
   · The sixth card is load-bearing. With five features the bottom row is two
     cards at span 6, which makes a SUPPORTING card wider than a MAJOR one and
     inverts the hierarchy. The sixth completes the three-across row.
   · Importance is encoded three ways at once — area, treatment (photo + scrim vs
     flat fill) and type scale — so it survives the mobile collapse, which is
     where most bentos fall apart. */
/* ═══ FULL CONTEXT — everything it holds, and who gets to read it ═════════════
   This column used to list INPUT METHODS — "a photograph of a page", "a PDF from
   the lab", "a question in your own words". Those describe how bytes get in.
   Nobody chooses a health app because it accepts HEIC. What matters is what ends
   up in one place, so the column is now the DOMAINS themselves.

   Every name here is the app's own, set in the site's sentence case rather than
   the app's title case (the site's own "Air quality" and "Symptoms" set that
   rule, and mixing the two inside one list looked like an oversight). The
   wording is untouched. The first six are the Health Hub sections in
   document order from res/layout/fragment_health_data.xml, cross-checked against
   HealthHubView.swift — Symptoms, Measurements, Period History under DAILY
   TRACKING; Medical Reports, Medications, Family Health under HEALTH RECORDS —
   each with its own drawable. The last two are the streams: Observation.js holds
   fifteen reading types across five sources including apple_health and
   health_connect, and the AQI is the IQAir feed the apps fetch client-side
   (HomeFragment.java:1319).

   One subtitle deliberately departs from the app's: Period History reads
   "Cycle tracking, predictions and notes" in the layout, but PeriodLog.js stores
   startDate, endDate, flowIntensity, painLevel and notes, and there is no
   prediction code anywhere in the backend. The site does not repeat it. */
/* ONE LINE EACH. Eight two-line cards ran the column past the fold. Five of
   these are now the app's own subtitle verbatim — they are short because they
   were written for a phone row in the first place, which is the whole reason to
   use them. Period History still departs (see above: no prediction code), and
   the last two have no Health Hub subtitle to borrow, so they are written to the
   same length. */
const HANDIT=[
 ['sick','Symptoms','Log discomfort, intensity and patterns'],
 ['ruler','Measurements','Blood pressure, weight, glucose & more'],
 ['doc','Medical reports','Lab results, scans and clinical documents'],
 ['pill','Medications','Active prescriptions, dosage and history'],
 ['gyn','Period history','Flow, pain and dates, beside your bloods'],
 ['famgrp','Family health','Genetic history and shared family records'],
 ['health','Apple Health & Health Connect','Heart rate, sleep, steps and SpO₂'],
 ['air','Air quality','The AQI where you actually are'],
];
/* THE MODEL PICKER, NOT THE VISION FALLBACK CHAIN. This listed Gemini 2.0 Flash
   / GPT-4o / OpenRouter with "first / if the first cannot / if neither can" —
   which is visionExtractor.js's retry order: true, but it is plumbing. Nobody
   picks it, nobody sees it, and it is not what the app offers you.

   These seven are RichieViewModel.allModels verbatim — id, display name and the
   isPro flag — cross-checked against config/tiers.js, where free and plus allow
   auto/gemini/mistral/deepseek/llama and pro, ultra and family add gpt5.3 and
   claude4.5. Icons are each model's own ic_model_* drawable. Deliberately no
   claim that one answers better than another: config/ai.js currently routes
   every key to DeepSeek and says in as many words not to market them against
   each other, so this states what the picker holds and what each costs, nothing
   more. */
const READERS=[
 ['mAuto','Auto'],
 ['mGemini','Gemini'],
 ['mMistral','Mistral'],
 ['mDeep','DeepSeek R1'],
 ['mLlama','Llama 3.3'],
 ['mGpt','GPT-5.3'],
 ['mClaude','Claude 4.5'],
];
/* Which row reads as picked. The app's ModelPickerSheet marks the current model
   by turning its name teal and putting a checkmark on the right (ic_check), so
   the site does the same. It is set to a named model rather than Auto on purpose:
   Auto selected would say "it decides", and the whole point of this column is
   that you decide. One string to change. */
const PICKED='Claude 4.5';
export function Intake(){return(
  <Band id="s-intake">
    <div className="px-wrap">
      {/* "Hand it whatever you have. It does the typing." sold the doorway, not
          the room — it was about file handling. The claim worth making is that
          everything about you sits in one place and you decide which mind reads
          it. "Full context" is the term for that pairing. */}
      {/* The eyebrow now says "Which AI reads it", so the headline saying "read
          by the AI you pick" was the same sentence twice. The headline takes the
          record, the eyebrow takes the reader, and between them they say both. */}
      <Head k="Which" t={<>Which AI reads your record? <i>You choose.</i></>}
        l="Everything about you sits in one dated record — symptoms, reports, medicines, cycles, what runs in your family, your watch, even the air where you are. A Pro check-in reads it three ways at once, and anything general is looked up rather than remembered."/>

      {/* THREE STAGES, THREE COLUMNS. It was two columns with the record hung off
          the bottom of the second, and that shape could not be saved: the right
          column ran 235px taller than the row, so the grid pushed the input list
          117px down, and the wires — stretched to that tall column and meeting at
          its midpoint — converged 234px BELOW the readers list they feed. Moving
          the record to a row underneath fixed the convergence to within 3px but
          left an L-shaped hole across the bottom-left half of the diagram with a
          44px arrow stranded in it.

          Three peer columns is the shape the content always was: five things in,
          three readers, one record. Every column is centred on the same line, so
          the wires meet the readers, the readers meet the record, and the width
          is used instead of pooled in a void. Five wires converging says "many
          become one"; the single wire out says "whichever of them answered, one
          record comes out" — the asymmetry is the argument. */}
      <div className="px-flow2 px-rv">
        <div className="px-flow2__col">
          <span className="px-flow2__k">All of it, in one place</span>
          <ul className="px-flow2__in">
            {HANDIT.map(([ic,t,d],i)=>(
              <li key={t} style={{'--i':i}}>
                <Ico n={ic} size={19}/>
                <div><b>{t}</b><em>{d}</em></div>
              </li>))}
          </ul>
        </div>

        <div className="px-flow2__mid" aria-hidden="true">
          <svg viewBox="0 0 120 400" preserveAspectRatio="none" className="px-flow2__wires">
            {/* the wire */}
            {[46,94,141,188,235,282,330,377].map((y,i)=>(
              <path key={y} d={`M0 ${y} C 58 ${y}, 62 200, 120 200`} pathLength="1"
                style={{'--i':i}}/>))}
            {/* and the light going down it. A short bright segment travelling the
                same path, one lane after another, so the diagram reads as five
                things being carried to one place rather than five lines drawn to
                one place. pathLength="1" makes the dash a fraction of the wire, so
                every lane runs at the same apparent speed despite different lengths. */}
            {/* Origins are offset for the kicker: the SVG spans the whole column,
                but the cards only start below the pill, so an even 0-400 spread
                left every lane about 60px above the card it leaves. */}
            {[46,94,141,188,235,282,330,377].map((y,i)=>(
              <path key={'s'+y} className="px-flow2__spark"
                d={`M0 ${y} C 58 ${y}, 62 200, 120 200`} pathLength="1"
                style={{'--i':i}}/>))}
          </svg>
        </div>

        <div className="px-flow2__col px-flow2__col--read">
          {/* "It is read by" described a mechanism. The thing worth saying is that
              the mechanism is YOURS to set — and "Choose model" is not a phrase
              invented for the website, it is the title of the app's own picker
              sheet in RichieView.swift. */}
          <span className="px-flow2__k">You choose the model</span>
          <ol className="px-flow2__read">
            {READERS.map(([ic,n,w],i)=>(
              <li key={n} style={{'--i':i}} className={n===PICKED?'is-on':''}>
                <span className="px-flow2__m"><Ico n={ic} size={18}/></span>
                <b>{n}</b>
                {n===PICKED&&<Ico n="check" size={17} cls="px-flow2__tick"/>}
              </li>))}
          </ol>
          {/* The moat, stated as the structural fact it is rather than as a claim
              about what any particular competitor ships today — which is not ours
              to assert and would date badly. Anyone whose business is their own
              model has a reason never to hand you a rival's. The second sentence
              is the honest qualifier: verified per-message in RichieViewModel
              (line 268 sends `model:` with every send, so it really is per turn),
              and the tier split is config/tiers.js. */}
          {/* The moat in six words. The long version spent a whole clause on what
              competitors would do; this states our own position instead, which is
              the thing that is actually true and durable — a company whose model
              is its business has something to protect, and we do not. 21 words
              down to 16, and it stops being a paragraph in a 266px column. */}
          <p className="px-flow2__note">No model of our own to protect. Switch any time.</p>
        </div>

        {/* One wire out, not three. The readers are alternatives, not contributors —
            whichever one answers, what leaves is the same single record. Fixed size
            and vertically centred rather than stretched, so the arrowhead keeps its
            shape at every width. */}
        <div className="px-flow2__mid px-flow2__mid--one" aria-hidden="true">
          <svg width="88" height="26" viewBox="0 0 88 26" className="px-flow2__out1">
            <path d="M0 13 H74"/>
            <path d="M67 7 L74 13 L67 19"/>
            <path className="px-flow2__spark px-flow2__spark--one" d="M0 13 H74" pathLength="1"/>
          </svg>
        </div>

        <div className="px-flow2__col px-flow2__col--out">
          <span className="px-flow2__k">And out comes</span>
          {/* The result was a filled teal pill reading "And out comes one record" —
              a label asserting an outcome, in a shape used nowhere else on the
              page. A record is not a slogan, so stop describing it and show one:
              this is the app's own Richie bubble, rebuilt from item_chat_ai.xml —
              28dp logo, 16dp corner, #AD3E3C3C ground, white body, and the real
              "What Richie checked" trace row whose lines are the literal output of
              ChatMessage.getAgentToolLines() ("Checked your <x> log"). One answer
              that could only exist because a photographed page, a date and a
              medicines list are in the same record — which is the argument the
              whole diagram is making. */}
          {/* A TURN, not a lone bubble. The app's chat is a teal user bubble pushed
              right (item_chat_user.xml: 16dp corner, #008b8b, white 13sp) and
              Richie's reply pushed left (item_chat_ai.xml: 16dp corner,
              #AD3E3C3C), with the trace row sitting above the reply. The avatar
              is gone: iOS does not draw one, and here it was indenting the reply
              so neither bubble lined up with the kicker or the column edge. */}
          {/* A REAL TURN, TRANSCRIBED FROM THE APP — not a written-for-the-website
              example. It is the better argument anyway: the answer settles the
              general question from evidence (prostaglandins, not temperature) and
              then turns on something only the record knows — the chronic bloating
              already logged in Symptoms. Two domains and a looked-up fact in one
              reply, which is precisely what this diagram claims.

              The row above it is the app's thinking expander, not the agent trace:
              RichieView.swift draws a brain glyph, "Thought process", and a
              chevron that rotates 0->90 on expand. Collapsed here, as it ships. */}
          <div className="px-flow2__chat">
            <p className="px-flow2__ask">Do you think I can eat ice cream during my periods?</p>
            <div className="px-flow2__trace">
              <Ico n="cognition" size={13}/>
              <span>Thought process</span>
              <Ico n="chev" size={10} cls="px-flow2__tchev"/>
            </div>
            <div className="px-flow2__msg">
              <p>Yes — ice cream is safe during your period. There's no evidence that cold
                food worsens bleeding or cramps; period pain is driven by prostaglandins,
                not food temperature.</p>
              <p>The one thing to watch: your chronic bloating/acidity. Dairy plus sugar can
                add to bloating for some women, so if that's already flaring, you may notice
                more after. Otherwise, no reason to skip it.</p>
            </div>
          </div>
        </div>

        {/* The three figures describe the whole intake system, not the one card
            above them, so they close the diagram rather than sitting inside its
            last column. */}
        <div className="px-flow2__foot">
          <div><b className="px-data">15</b><span>kinds of reading</span></div>
          <div><b className="px-data">5</b><span>sources, each named</span></div>
          <div><b className="px-data">1</b><span>record, all dated</span></div>
          <p className="px-flow2__note">Not one of those sentences is a guess. Every value keeps
            the moment it was <i>taken</i>, not the moment it synced — which is the difference
            between a number and an answer.</p>
        </div>
      </div>
    </div>
  </Band>);}

/* The bento, restored. Card area encodes importance — 6 : 2 : 1 across a
   12-column grid — and the sixth card is load-bearing: with five, the bottom row
   is two cards at span 6, which makes a SUPPORTING card wider than a MAJOR one. */
/* Each card carries the SHAPE OF ITS OWN OUTPUT. Every value here is a real enum
   from the backend, not a description of one:
     wl[].s   -> analysisWatchlist[].status   ok | watch | attention
                 (models/CheckInSession.js:80)
     overall  -> analysisOverall              good | steady | watch | attention
                 (models/CheckInSession.js:86-89)
     six      -> the six analyses run in parallel
                 (controllers/healthAnalysisController.js:444-452)
     scale    -> strong_no | no | moderate | yes | strong_yes
                 (utils/prompts.js:48, consumed at homeScreenController.js:87) */
/* THIS SECTION IS THE APP'S SERVICES TAB, and it had drifted badly from it.
   ServicesHomeView.swift renders, in order: Your Briefing, Health Analysis,
   Apple Health, Health Check-In, Daily Advisory, Air Quality, Dietary Insights,
   NutriCheck, Health Feed, Workouts, My Doctor. Android matches
   (HomeFragment.java, HealthAnalysisActivity.java).

   Two cards here were not services at all — Indian medicine names is a property
   of the medicines record, and per-record privacy is a setting. Both are gone
   from this section; both still have their deep pages under Explore.

   IN: Your briefing and Workouts, two things the app ships and the site had
   never mentioned. Apple Health and Air Quality stay OUT of this section on
   purpose — they are inputs, and they are already cards in "What it holds".

   DIETARY INSIGHTS IS NOT HERE, and must not be added back. It is commented out
   of ServicesHomeView.swift:54, out of ProfileView.swift:1091, and out of
   Android's UsageBottomSheet.java:46, all three with the same note: "hidden for
   now (product decision)". The service file and the endpoint still exist, which
   is exactly why reading the service layer alone is not enough — what ships is
   what the view actually renders.

   HEALTH ANALYSIS STAYS, and its description is correct. Six section runners —
   symptoms, medications, measurements, reports, genetics, diagnostics — go into
   one Promise.all at healthAnalysisController.js:445, and an overall is written
   from the six afterwards. ANALYSIS_TIMEOUT_MS is two minutes, which is the
   "up to 2 minutes" the iOS sheet shows.

   STILL NOT SHOWN, and it would need a slot: Health Feed.

   HEALTH ANALYSIS IS OUT of this section by product decision, even though
   healthAnalysisController.js, healthAnalysisRoutes.js, HealthAnalysisActivity
   (Android) and HealthAnalysisSheetView (iOS) are all still live. It is STILL
   referenced in eight other places on this site — the pricing row, the Explore
   item, the deep page, the footer link, the reel CTA and the Deck link — and
   those have not been touched.

   AUDITED AGAINST THE BACKEND, AND TWO CARDS CHANGED.

   OUT: "Apple Watch sync". The watch feed is now a card in "What it holds" two
   sections up, with the same sentence — ten readings, each kept with its device
   and its minute. It is an INPUT to the record, not something the app does with
   the record, so it belongs there and not here, and it was being said twice.

   IN: per-record privacy. Every entry carries its own flags for whether family
   may see it and whether Richie may read it (PeriodLog.js:45-52 shareWithFamily
   and includeInChat, and the same pair across the other record types). That is
   something the product does with your record, it is the only one of these six
   that is a decision you make rather than an answer you get, and it had no home
   on this page at all — it was buried on a deep page nothing linked to.

   The ids are grid-area names, and three of them had drifted from what they
   hold: `watch` was Indian medicine names, `india` was the Watch card, `priv`
   was Doctor sharing. Renamed here and in the three grid-template-areas maps. */
const BENTO=[
 {id:'checkins', k:'flagship', t:'Health check-ins',
  d:'Richie reads the whole record first, then spends its questions on the gaps that would actually move a prediction — and tells you what is still missing.',
  img:sClinic,
  /* Verified against the code, not the screen:
     - buildHealthContext (services/ai.js:248-499) is what "reads first" means —
       profile, active medicines, 30d symptoms, 90d measurements, findings from
       the last 5 reports, 14d of device observations, and buildActivityContext
       (:525-554) which is the last 21 days of check-in answers.
     - riskSignals.js:113 calls HIGH_VALUE_FIELDS "ranked"; missingHighValueFields
       (:130) returns the absent ones and checkInController.js:188 puts the top
       five into the question prompt. The two `why` strings below are verbatim
       from riskSignals.js:117 and :118.
     - the pull quote is verbatim from prompts.js:275.
     No question count is stated: prompts.js:261 asks for 6 weekly / 8 monthly but
     nothing validates the returned length (checkInController.js:1099-1121). */
  flow:[
    ['doc','Reads your record first', null,
      ['Reports','Medicines','Symptoms','Measurements','Watch data','Your last answers']],
    ['analysis','Ranks what is missing','by how much each gap would move your risk picture',
      [['Waist circumference','the single best body measurement for heart and diabetes risk in South Asians'],
       ['Blood pressure','hypertension screen + CVD risk']]],
    ['cognition','Then spends the check-in there',
      '“a question is only worth asking if its answer would change a health recommendation, a risk estimate, or what to screen next”', null],
  ],
  ret:'and your answers join the record',
  from:'Everything you have logged', to:'The one thing still missing'},

 /* Health analysis was here. Removed on your call. The endpoint, the controller
    and both app screens still exist — see the note at the top of this block —
    so this is a product decision, not a dead-code cleanup, and it is written
    down here so nobody re-adds it from the code.

    Daily Advisory takes the slot. DigestCardView renders unconditionally in
    ServicesHomeView.swift, fed by InsightsService.fetchDailyDigest ->
    /api/insights/daily-digest, and the card carries the AQI for where you are. */
 {id:'advisory', k:'major', t:'Daily advisory', d:'One read for today — not a list of actions but the shape of the day, written from your record and the air where you actually are.',
  img:sServices,
  six:['Your record','Medicines','Symptoms','Sleep','Where you are'],
  overall:{l:'Air today', v:'186', was:'unhealthy in Delhi — so today reads differently'},
  from:'Your record and today’s air', to:'What to do today'},

 /* prompts.js:40 is the order, verbatim: "allergy → med/condition clash → fit
    with goals → consistency with session history", followed by "Do not default
    to 'moderate' to avoid deciding." The old line said it was "not allowed to
    sit on the fence" while the scale below it offers Maybe as a verdict, which
    read as a contradiction. It is allowed to say Maybe — it is not allowed to
    say it to get out of deciding. */
 {id:'nutri', k:'major', t:'NutriCheck', d:'Allergies first, then your medicines and conditions, then your goals — and it will not say “maybe” just to avoid deciding.',
  img:sNutri,
  ask:'Can I eat paneer tikka?',
  scale:[['strong_no','Strong no'],['no','No'],['moderate','Maybe'],['yes','Yes'],['strong_yes','Strong yes']],
  pick:3, why:'High protein. The salt is the only thing to watch against your last BP reading.',
  from:'“Can I eat this?”', to:'One of five verdicts, and why'},

 /* InsightsService.swift:11 — GET /api/insights/briefing. The card carries a
    set of points, a "Fresh" pill when source == "fresh", and the time it was
    written. Deep page: Every day. */
 {id:'briefing', k:'sub', t:'Your briefing', d:'A few cards waiting when you open the app, each one thing worth doing and up to three reasons why. They advance on their own.', href:'#/deep/day',
  from:'Everything that changed', to:'Three cards, one action each'},

 /* WorkoutService.swift — /api/fitness/workouts, and WorkoutsCardView renders
    each one with its exercise count and date. Rendered unconditionally in the
    Services tab, unlike Dietary Insights, which is commented out there. */
 {id:'workouts', k:'sub', t:'Workouts', d:'Log a session with its exercises. It is dated into the same record as your labs and your medicines, not a separate fitness app.',
  from:'What you actually did', to:'In the record that gets read'},

 /* DoctorService.swift — search, request, accept or decline, then a dated
    summary goes to the doctors you are connected to. */
 {id:'doctors', k:'sub', t:'My doctor', d:'Connect to your doctor, accept or decline requests, and share a dated summary of your history with the ones you keep.', href:'#/deep/doctors',
  from:'Eleven scattered PDFs', to:'One dated summary'},
];

/* Every card carries one real before -> after, and resolves it when THAT CARD is
   on screen, not when the section is. The section was six static boxes: the copy
   was right and nothing on it moved, so the most important part of the app read
   as the least considered part of the page. One piece of state per card, not six
   different toys - the transition is the claim. */
/* One card, three possible readouts, one shared reveal clock. The readout IS the
   content now — there is no screenshot behind it, because a 4px-blurred capture
   is not texture, it is noise, and it was sitting exactly where the product
   should have been. The flagship card was ~90% empty behind one. */
function BentoCard({c}){
  const ref=useRef(null);
  const[on,setOn]=useState(false);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    if(window.matchMedia('(prefers-reduced-motion:reduce)').matches){ setOn(true); return; }
    const io=new IntersectionObserver(e=>{ if(e[0].isIntersecting){ setOn(true); io.disconnect(); } },
      {threshold:.25, rootMargin:'0px 0px -8% 0px'});
    io.observe(el); return()=>io.disconnect();
  },[]);
  const Tag=c.href?'a':'div';
  /* fx-glow, and the -4px hover lift in the stylesheet, only belong on the three
     cards that are links. The other three lifted and lit under the cursor and
     went nowhere — half a grid promising a click it could not honour. The lift
     is now scoped to `a.px-bn` in the stylesheet; the glow is scoped here. */
  return(
  <Tag ref={ref} className={`px-bn px-bn--${c.k} ${c.href?'fx-glow ':''}${on?'is-on':''}`} style={{gridArea:c.id}} href={c.href}>
    {/* The capture is back as texture behind the readout. It sits further down
        than before — the readout is real content now, not a title over
        wallpaper, so the photograph has to stay under it rather than compete. */}
    {c.img&&<><img className="px-bn__img" src={c.img} alt="" aria-hidden="true"/><span className="px-bn__scrim"/></>}
    {/* THE LOOP. Three stations, a line that draws itself between them, and a
        return arc that closes the circle — because this is a cycle, and the
        previous version drew it as a list of outputs. The return arc is the
        claim: the record gets sharper every time you answer. */}
    {/* Three steps down one spine, with the spine turning back up into step 01.
        The previous version put three side-by-side stations, a down-tick, an
        output band and a full-perimeter border into the same card as a 42px
        title — five parts fighting for one card, which is why it read as
        cramped. One idea per row, full width, and the only line on the card is
        the one that carries the claim. */}
    {c.flow&&(
      <div className="px-rank">
        {/* one glass plate, not one per step. Per-station panels made the card
            read as four boxes; a single plate reads as a pane of frosted glass
            with the photograph behind it, and it is what guarantees contrast —
            step 03's quote sat straight on the picture and measured 1.95:1. */}
        <div className="px-rank__p">
        <ol className="px-rank__l">
          {c.flow.map(([ic,t,sub,items],i)=>(
            <li key={t} style={{'--i':i}}>
              <span className="px-rank__n"><Ico n={ic} size={15}/></span>
              <span className="px-rank__i">{'0'+(i+1)}</span>
              <div className="px-rank__c">
                <b>{t}</b>
                {sub&&<em className={i===2?'is-quote':''}>{sub}</em>}
                {items&&i===0&&(
                  <div className="px-rank__tags">
                    {items.map((x,k)=><span key={x} style={{'--k':k}}>{x}</span>)}
                  </div>)}
                {items&&i===1&&(
                  <div className="px-rank__gaps">
                    {items.map(([l,w],k)=>(
                      <span key={l} style={{'--k':k}}><b>{l}</b><em>{w}</em></span>))}
                  </div>)}
              </div>
            </li>))}
        </ol>
        <span className="px-rank__lbl">{c.ret}</span>
        </div>
      </div>)}
    {c.six&&(
      <div className="px-six">
        <div className="px-six__g">
          {c.six.map((x,i)=><span key={x} style={{'--i':i}}>{x}</span>)}
        </div>
        <div className="px-six__o">
          <span className="px-six__ol">{c.overall.l||'Overall'}</span>
          <b className="px-data">{c.overall.v}</b>
          <em>{c.overall.was}</em>
        </div>
      </div>)}
    {c.scale&&(
      <div className="px-nc">
        <p className="px-nc__q">{c.ask}</p>
        <div className="px-nc__s" role="img"
          aria-label={`Verdict: ${c.scale[c.pick][1]}. ${c.why}`}>
          {c.scale.map(([v,l],i)=>(
            <span key={v} className={`px-nc__t ${i===c.pick?'is-pick':''}`} style={{'--i':i}}>
              <i/><em>{l}</em>
            </span>))}
        </div>
        <p className="px-nc__w">{c.why}</p>
      </div>)}
    <div className="px-bn__b">
      <b>{c.t}</b><p>{c.d}</p>
      {c.from&&(
        <span className="px-bn__res">
          <i className="px-bn__res-a">{c.from}</i>
          <span className="px-bn__res-x" aria-hidden="true"><Ico n="chev" size={11}/></span>
          <i className="px-bn__res-b">{c.to}</i>
        </span>)}
    </div>
  </Tag>);
}

/* Twelve cards, one treatment. Every value in a glass fragment is traceable:
   adherence is calculateAdherenceRate() in Medication.js, AQI is the IQAir feed
   the apps post, memories are UserMemory.fact which you can read and delete,
   IDRS is the Madras Diabetes Research Foundation score. Nothing invented. */
/* ═══ THE CARDS ═══════════════════════════════════════════════════════════════
   The reference is a travel listing: four peer specs (place, days, season, tour)
   plus rating / return-rate / price. That shape fits travel data. Ours is a
   different shape, so the layout is re-aligned rather than copied.

   What we actually have per feature is two things:
   · ONE REAL MOMENT — a question and its answer, or a value and what it was
     before. That is the persuasive part, and it goes in the glass panel.
   · ONE MECHANISM — and unlike the reference's four peer specs, ours is a
     SEQUENCE (photograph → extract and date → trend). So it renders as three
     numbered steps along the foot, which is honest here in a way that numbering
     peer capabilities was not.

   Deliberately NOT copied: the three-stat row and the per-card CTA. We have no
   ratings and no per-feature price — inventing a stat trio to fill the shape is
   exactly the kind of thing this project keeps having to undo. The page has one
   CTA; a card does not need its own.
   The screenshot is sharp: the glass panel and the spine now occupy the region
   where the app's own headline sits, so the collision that forced the blur is
   designed out rather than blurred out. */
/* EVERY CARD IS A QUESTION AND RICHIE'S ANSWER. They used to lead with a
   reading — "Your diabetes risk / 60/100 / twenty of those points came from
   their records" — which is three fragments of a database row and says nothing
   to anyone. A number on its own is a tracker. So each card is now the exchange:
   what you would type, and what comes back, in sentences.

   Every question needs MORE than the card's own data type to answer — the
   headache needs the air, the risk score needs a parent's record, the
   cholesterol needs the four reports before it. That is the argument for one
   joined record, and it cannot be made by a number in a box. */
const CARDS=[
 {t:'Medical reports', sub:'Photograph it, it reads it', tag:'Vision',
  img:sReports,
  moment:{q:'Is my cholesterol actually getting worse?',
          a:'Yes. LDL is 142 today, 128 in February and 121 last October — up at every report. All four are on one axis.'},
  how:['Photograph the page','Every value extracted and dated','Trended against the last']},

 {t:'Family', sub:'Everyone you look after', tag:'Ultra',
  img:sFamily,
  /* riskTools.js — familyHistory both_parents is 20 points, and the band at 60
     reads "High risk — screening glucose/HbA1c is recommended". */
  moment:{q:'Does my parents’ diabetes change my risk?',
          a:'It does. Both of them having it adds twenty points, which takes you from 40 to 60 — and 60 is where a screening blood test is advised.'},
  how:['Add a person','They get their own ranges','And their own private chat']},

 {t:'Period history', sub:'Read beside your bloods', tag:'The moat',
  img:sPeriod,
  moment:{q:'Why has my cycle been irregular?',
          a:'Your thyroid test came back high in March and your iron is low. A period app would not have seen either.'},
  how:['Log flow and pain','It sits with your labs','They are read together']},

 {t:'Symptoms', sub:'A bad night, logged', tag:'Daily',
  img:sHub,
  moment:{q:'Why do I keep getting headaches this week?',
          a:'You logged one on the 14th, the 16th and the 19th. The air where you live was over 180 on all three days.'},
  how:['Log it in seconds','It is dated for you','Read against air and labs']},

 {t:'Medications', sub:'Reminders that count', tag:'Adherence',
  img:sMeds,
  moment:{q:'Am I actually taking it, or do I just think I am?',
          a:'Eighteen of twenty-one doses this month, each one answered from the notification. That is what happened, not what you remember.'},
  how:['Add it once','It reminds you','Taken or missed, recorded']},

 {t:'Measurements', sub:'Typed once, trended after', tag:'Daily',
  img:sMeasure,
  moment:{q:'Is my blood pressure creeping up?',
          a:'A little. 128/84 today against 118/76 in March — worth watching next to your waist and what runs in your family.'},
  how:['Add a reading','It joins the trend','Read beside your bloods']},

 {t:'Apple Health & Health Connect', sub:'Ten readings, each with its source', tag:'Automatic',
  img:sWatchScr,
  moment:{q:'Is my resting heart rate telling me anything?',
          a:'It has gone from 51 in spring to 56 now — alongside your sleep dropping under six hours and the tablet you started in June.'},
  how:['Connect it once','Readings arrive on their own','Kept with their source']},

 {t:'Air quality', sub:'Today’s air, in your advice', tag:'Local',
  img:sAqi,
  moment:{q:'Should I run outside today?',
          a:'Not today. The air where you are is 186, which is unhealthy. Train indoors and try again tomorrow.'},
  how:['Read where you are','Kept with the day','Folded into the advice']},

 {t:'Memory', sub:'What it has learned', tag:'Yours',
  img:sProfile,
  moment:{q:'Does it remember I’m lactose intolerant?',
          a:'Yes — you told me in June and I saved it to your profile. I use it every time food comes up, and you can delete it.'},
  how:['It learns a fact','It is listed in Settings','Delete any of them']},
];




/* ═══ THE CAROUSEL — centre card forward, the rest stacked behind ═════════════
   Arrangement from the reference: one card at full size, its neighbours smaller,
   offset and dimmed behind it. Deliberately the 2D version — translate + scale +
   opacity — not true 3D coverflow: a 3D context forces a new backdrop root, so
   the glass panel's backdrop-filter would re-rasterise every frame, which the
   research names as the single worst thing to do on a mid-range Android.
   Auto-advance with a real pause control (WCAG 2.2.2 — hover-pause alone does
   not satisfy it on touch), and it stops for good on any deliberate click. */
function Carousel({items}){
  const [n,setN]=useState(0);
  const [auto,setAuto]=useState(true);
  const [seen,setSeen]=useState(false);
  /* Which way the deck is travelling. The contents inside a card lag behind it
     and catch up, and a lag only reads as weight if it trails the ACTUAL
     direction of travel — a fixed downward rise looks the same going forwards
     and backwards, which is why the old one read as a rebuild rather than a move. */
  const [dir,setDir]=useState(1);
  /* The staggered build — glass, name, steps arriving one after another — is an
     ENTRANCE. It belongs to the first time you see the deck and nowhere else.
     It was firing on every switch, which meant the card you were moving toward
     blanked itself and reassembled while it was still travelling. */
  const [intro,setIntro]=useState(true);
  const ref=useRef(null);
  useEffect(()=>{ const el=ref.current; if(!el) return;
    const io=new IntersectionObserver(e=>setSeen(e[0].isIntersecting),{threshold:.3});
    io.observe(el); return()=>io.disconnect(); },[]);
  useEffect(()=>{ if(!auto||!seen) return;
    if(window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const t=setInterval(()=>{ setDir(1); setIntro(false);
      setN(i=>(i+1)%items.length); },5200);
    return()=>clearInterval(t); },[auto,seen,items.length]);
  /* one slot along, from an arrow or a key */
  const nudge=d=>{ setAuto(false); setDir(d>0?1:-1); setIntro(false);
    setN(i=>(i+d+items.length)%items.length); };
  /* straight to a card, from a dot or from clicking a neighbour. The direction
     is the SHORTEST way round, so the deck always moves the way the target sits. */
  const jump=k=>{ let d=k-n; const h=items.length/2;
    if(d>h) d-=items.length; if(d<-h) d+=items.length;
    if(!d) return;
    setAuto(false); setDir(d>0?1:-1); setIntro(false); setN(k); };
  const onKey=e=>{
    if(e.key==='ArrowRight'){ e.preventDefault(); nudge(1); }
    else if(e.key==='ArrowLeft'){ e.preventDefault(); nudge(-1); }
  };

  return(
  /* is-intro is gated on `seen`, not on mount. The staggered build used to be
     attached to .is-on, which is set the moment the component renders — so it
     played out while the deck was still several screens below the fold and no
     one ever saw it. It now starts when the deck does. */
  <div className={`px-cw ${auto?'is-auto':''} ${intro&&seen?'is-intro':''}`}
    style={{'--dir':dir}} ref={ref}>
    <div className="px-deckstage" role="group" aria-roledescription="carousel"
      aria-label="What the app does" tabIndex={0} onKeyDown={onKey}>
      {items.map((d,k)=>{
        /* shortest signed distance, so the deck wraps instead of unspooling */
        let o=k-n; const h=items.length/2;
        if(o>h) o-=items.length; if(o<-h) o+=items.length;
        /* ±1 only. At ±2 the outer pair ran off both edges of the viewport and their
           glass and steps were fully readable, so three cards competed for the same
           attention. One neighbour each side is the deck; more is a pile. */
        const far=Math.abs(o)>1;
        return(
        /* Clicking a neighbour brings it forward. This was removed once on the
           argument that a mouse-only target is inaccessible — that was wrong.
           WCAG 2.1.1 requires the FUNCTION to be keyboard operable, not every
           pointer target to be focusable, and this function has three keyboard
           paths already: the dots, the arrows, and Left/Right on the focused
           deck. A redundant pointer target beside them is a convenience, not a
           barrier. aria-hidden stays: the dots are what name each card to a
           screen reader, and announcing the deck twice would be the real defect. */
        <article className={`px-tc ${o===0?'is-on':''} ${o!==0?'is-side':''}`} key={d.t}
          onClick={o!==0&&!far?()=>jump(k):undefined}
          /* No will-change. It was tried, on the three visible cards and then on
             all eight, and MEASURED both ways: click-to-first-frame went from 67ms
             with will-change left alone, to 78ms promoting three, to 86ms
             promoting eight. Toggling it mid-deck forces a layer to be built at
             exactly the moment the card has to move. Leaving it off is faster. */
          style={{'--o':o, zIndex:20-Math.abs(o), visibility:far?'hidden':'visible'}}
          aria-hidden={o!==0}>
          <span className="px-tc__veil"/>
          <div className="px-tc__dev"><img src={d.img} alt={`${d.t} in the RichHealth app`}/></div>

          {/* the moment — the persuasive part, in glass */}
          {d.moment&&(
            <div className="px-tc__glass">
              <p className="px-tc__q">{d.moment.q}</p>
              <p className="px-tc__a"><img src={logo} alt=""/><span>{d.moment.a}</span></p>
            </div>)}

          {/* the mechanism — a real sequence, so it is numbered */}
          <ol className="px-tc__how">
            {d.how.map((h2,x)=><li key={h2} style={{'--x':x}}><i>{x+1}</i><span>{h2}</span></li>)}
          </ol>

          {/* the spine */}
          <div className="px-tc__spine">
            <span className="px-tc__tag">{d.tag}</span>
            <span className="px-tc__sub">{d.sub}</span>
            <span className="px-tc__name">{d.t}</span>
          </div>
        </article>);})}
    </div>

    <div className="px-cw__ui">
      <button className="px-car__arw" aria-label="Previous" onClick={()=>nudge(-1)}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>
      {/* aria-current was a fourth answer to "pick one of N". Same radiogroup as
          the billing toggle, the platform toggle and the FAQ pills. The dot
          stays 8px; the 44px hit box around it is the button. */}
      <div className="px-cw__dots" role="radiogroup" aria-label="Choose a card">
        {items.map((d,k)=>(
          <button key={d.t} type="button" role="radio" aria-checked={k===n}
            tabIndex={k===n?0:-1} className={`px-car__dot ${k===n?'on':''}`}
            aria-label={d.t} onKeyDown={radioKeys(k,items.length,jump)}
            onClick={()=>jump(k)}/>))}
      </div>
      <button className="px-car__arw" aria-label="Next" onClick={()=>nudge(1)}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg></button>
      {/* One mechanism, not two. It carried aria-pressed AND swapped its label,
          so a screen reader said "Pause, pressed" while it was playing. The
          label is the state. */}
      <button className="px-cw__pause" type="button" onClick={()=>setAuto(a=>!a)}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          {auto ? <><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></>
                : <path d="M8 5l11 7-11 7z"/>}
        </svg>
        {auto?'Pause':'Play'}</button>
    </div>
  </div>);
}



/* Two sections, not one. Before, the bento and the carousel both opened with
   Richie — two starts to the same section, and three of the six bento cards were
   re-explained by the carousel immediately below them. Now the carousel shows the
   three you have to SEE working, and the bento lists what else is in there. */
export function Deck(){return(
  <Band id="s-does">
    <div className="px-wrap">
      {/* "Everything you have, in one record." described a filing cabinet. The
          point of the record is not that it is tidy — it is that a reading only
          means something next to everything else about you. The lede also said
          "Six ways" while CARDS has eight. */}
      {/* The card list was the record PLUS Richie himself, and it was missing two
          of the app's own Health Hub sections. Richie is the thing that reads
          the record, not a thing inside it, so he is out; Measurements and the
          watch feed are in, which is what the app actually stores and what the
          lede was already promising. Nine cards, and the heading is now
          literally true. */}
      <Head k="What it holds" t={<>What it holds — reports, measurements, medicines, <i>cycles.</i></>}
        l="Symptoms too, and what runs in your family, your watch, the air where you live, and everything Richie has learned about you. Every entry is dated and labelled with where it came from, and Richie only ever answers from what is in it."/>
      <Carousel items={CARDS}/>
    </div>
  </Band>);
}


/* ═══ 07 WHO THIS IS FOR ═══════════════════════════════════════════════════════
   The site had no audience section at all: eleven feature pages and not one line
   saying who any of it is for. Each situation below ends in the specific thing
   the app does about it, and every one of those things is real — the file and
   the mechanism are named in the comment beside it. */
const FOR = [
 {k:'The one this started with',
  t:'You have every report and nobody to ask',
  b:'Your parent is ill and lives somewhere else. Reports come by WhatsApp. The medicines keep changing. The questions are small and constant: is this number bad, do these two drugs clash, can he drink this?',
  /* dependentChatSystemPrompt.js:59-83 — a distinct prompt that addresses the
     caregiver, says "{{dependentName}}'s…" not "your…", and uses paediatric or
     geriatric framing. buildHealthContext(user, dependentId) swaps the whole
     subject record (ai.js:284-303). */
  d:'Keep their record too. Switch to it, and ask in their chat, not yours.',
  ic:'famgrp', img:sFamilyChat, href:'#/deep/family', cta:'How family records work'},
 {k:'Half the people we know',
  t:'Your cycle is logged, and nobody ever reads it',
  b:'Period apps know your dates and nothing else. Your thyroid test sits in another app, your iron result sits in a PDF, and the doctor who could join the three up has eight minutes.',
  /* healthCardExtractor.js:37-42 — "ANY report about menstruation MUST use the
     'period' card"; flow words map to flowIntensity, cramps to painLevel. The
     last six logs go into every chat and every analysis (ai.js:276-278). */
  d:'Log it in a sentence, even in the middle of a chat. Then it is read next to your blood tests.',
  ic:'gyn', img:sPeriod, href:'#/deep/cycle', cta:'How the cycle log is read'},
 {k:'Anyone with a folder',
  t:'Eleven PDFs, and no one has read them together',
  b:'Every report was read once, on its own, by someone who had not seen the one before. What matters is how the numbers move over time, and nobody has looked at that.',
  /* reportProcessor.js:119-164 — the previous five processed reports are
     summarised into the analysis prompt; canonicalKey + valueNumeric
     (MedicalReport.js:161-167) make "Creatinine, Serum" and "Creatinine" the
     same line on a trend. */
  d:'Every new report is read against your last five, on the same scale.',
  ic:'doc', img:sReports, href:'#/deep/richie', cta:'How Richie reads them'},
 {k:'Whoever runs health at home',
  t:'You are the one who remembers everyone’s medicines',
  b:'Your mother’s tablet, your child’s inhaler, the appointment nobody wrote down. It is unpaid work with no system, so all of it lives in your head.',
  /* Medication.js:102-115 reminderTimes; offline dose queue on both platforms
     (MedicationReminderHelper.java:419-510, LocalNotificationManager.swift:384-430);
     the plan is mirrored locally so BOOT and offline reschedules need no network. */
  d:'Reminders you answer straight from the notification. Answers given offline arrive when you are back.',
  ic:'pill', img:sMeds, href:'#/deep/day', cta:'A day with it'},
 {k:'Everyone wearing one',
  t:'Your watch counts all day and explains nothing',
  b:'Steps, sleep, heart rate, every day for a year. It is a lot of numbers, and not one of them is ever read next to your blood test or the medicine you started last month.',
  /* Observation.js holds fifteen reading types across five sources including
     apple_health and health_connect; each reading keeps its source device and
     its timestamp, which is what lets it be read beside a dated lab value. */
  d:'Ten readings arrive from Apple Health, each kept with the device and the minute it was taken.',
  ic:'health', img:sWatchScr, href:'#/deep/watch', cta:'How watch data is used'},
 {k:'Anyone who feels fine',
  t:'You only go when something is already wrong',
  b:'No symptoms, no appointment, no idea what is drifting. The things that warn you early — your waist, your blood pressure, how you sleep — are the things nobody measures between visits.',
  /* prompts.js:275 — "a question is only worth asking if its answer would
     change a health recommendation, a risk estimate, or what to screen next".
     riskSignals.js:114-124 ranks the nine fields worth asking for, each with
     the reason it earns the question. */
  d:'A check-in asks only what would change an answer, and what you say joins the record.',
  ic:'spark', img:sCheckin, href:'#/deep/checkins', cta:'How check-ins work'},
];

export /* THE STAGE AND THE INDEX. Two forms were tried here and both failed for the
   same reason: this section's job is recognition. A visitor has to find
   themselves in four people, so all four names must be legible at once. An
   accordion showed four rows of text and no product; a 70/30 reel showed one
   card and three unreadable strips, which is worse — it hides three quarters of
   the answer to "is this for me" behind a six-second wait.

   So the four live in an index across the bottom, always readable, and the one
   in focus gets the whole stage above it with its real app screen. The index is
   the indicator, the progress bar and the control in one object: the rule over
   the active column fills across the dwell, and every column is a click target.
   No arrows.

   NOTHING ANIMATES LAYOUT. The four panels are stacked in one grid cell, so the
   stage is always as tall as the tallest of them and swapping between them is
   opacity and a small rise — composited, no reflow. The previous version
   animated flex-basis on four panes and every decorative layer had to be
   hand-tuned to stop it dropping frames. This has nothing to tune. */
function Who(){
  const [n,setN]=useState(0);
  const [hold,setHold]=useState(false);
  const [seen,setSeen]=useState(false);
  const ref=useRef(null);

  /* Reveal in React state, not classList — useReveal() writes `in` onto .px-rv
     nodes and React wipes it on the next render of this component. */
  useEffect(()=>{const el=ref.current; if(!el) return;
    const io=new IntersectionObserver(es=>{ if(es[0].isIntersecting){ setSeen(true); io.disconnect(); } },
      {threshold:.15});
    io.observe(el); return()=>io.disconnect();},[]);

  /* NO PAUSE BUTTON, by request. It runs from the moment it is on screen and
     never stops for the pointer. Two things still stop it, and both are needed:
     keyboard focus inside the section (so a keyboard reader is not moved off the
     panel they are reading), and prefers-reduced-motion, which turns the whole
     thing into a manual control. Worth knowing: WCAG 2.2.2 asks for a visible
     mechanism to pause anything that auto-updates for longer than five seconds,
     and that is what the button was. Say the word and it can come back as a
     small control that only appears on hover. */
  const run = !hold && seen;

  useEffect(()=>{
    if(!run) return;
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id=setTimeout(()=>setN(p=>(p+1)%FOR.length), 4500);
    return()=>clearTimeout(id);
  },[n,run]);

  const jump=k=>{ setN(k); };

  return(
  <Band id="s-who">
    <div className="px-wrap" ref={ref}>
      <Head k="Who" t={<>Who it’s for. <i>Which one is you?</i></>}
        l="Six people, all doing this the hard way. None of them needs another tracker. They need one place that holds everything, and something that will actually read it."/>

      <div className={`px-reel ${seen?'is-in':''}`}
        onFocusCapture={()=>setHold(true)} onBlurCapture={()=>setHold(false)}>

        {/* All four in one grid cell. The stage is the height of the tallest,
            which is why nothing jumps when the panel changes. */}
        <div className="px-reel__stage fx-glow">
          {FOR.map((f,i)=>{
            const on=i===n;
            return(
            <div key={f.t} className={`px-reel__panel ${on?'is-on':''}`} inert={on?undefined:''}>
              <span className="px-reel__glow" aria-hidden="true"/>
              {/* A FRAME, not a loose <img>. The bare image was taller than the
                  stage at any useful width, so its top was sliced off by the
                  stage edge and it read as a flat panel. The frame has a visible
                  rounded top inside the stage and bleeds off the bottom, which
                  is the device standing at the back of the set. */}
              <div className="px-reel__dev" aria-hidden="true">
                <img src={f.img} alt="" loading="lazy"/>
              </div>
              {/* The site's hairline row, not a new one: a ghost figure in a
                  fixed left column, a rule across the top, everything else in
                  the right column — the same object as .px-spine li and
                  .px-ledger li. The rule runs the full width of the stage so it
                  ties the column to the screen at the other end. */}
              <div className="px-reel__col">
                <span className="px-reel__num" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
                <div className="px-reel__txt">
                  <span className="px-reel__k">{f.k}</span>
                  <h3 className="px-reel__t"><span>{f.t}</span></h3>
                  <p className="px-reel__b">{f.b}</p>
                  <p className="px-reel__d"><Ico n={f.ic} size={15}/>{f.d}</p>
                  <a className="px-reel__cta px-arw" href={f.href}>{f.cta}</a>
                </div>
              </div>
            </div>);})}
        </div>

        {/* The index. Same radiogroup contract as the billing toggle, the
            platform toggle and the FAQ pills — one tab stop, arrows to move. */}
        <div className="px-reel__idx" role="radiogroup" aria-label="Choose who this is for">
          {FOR.map((f,k)=>(
            <button key={f.t} type="button" role="radio" aria-checked={k===n}
              tabIndex={k===n?0:-1}
              className={`px-reel__tab ${k===n?'on':''} ${run?'is-run':''}`}
              onKeyDown={radioKeys(k,FOR.length,jump)} onClick={()=>jump(k)}>
              <span className="px-reel__tn" aria-hidden="true">{String(k+1).padStart(2,'0')}</span>
              <span className="px-reel__tk">{f.k}</span>
            </button>))}
        </div>

      </div>
    </div>
  </Band>);
}

export function Holds(){return(
  <Band alt id="s-holds">
    <div className="px-wrap">
      <Head k="What it does" t={<>What it does with it — check-ins, analysis, <i>NutriCheck.</i></>}
        l="Nothing here asks you to type anything again. Each one reads the record you just built and turns it into something you can act on."/>
      <div className="px-bento px-rv">
        {BENTO.map(c=><BentoCard c={c} key={c.id}/>)}
      </div>
    </div>
  </Band>);
}

export default function Premium(){
  useReveal(); useGlow();
  return(<div className="px">
    {/* Proof sits between the claim and the price: the last objection is "can I
        believe it", and it is answered immediately before the ask. It used to
        sit BEFORE Holds, which broke the nav: the spy lights the lowest section
        that has begun, and s-holds belongs to "What it holds" while s-proof is
        "How it answers" — so scrolling past Proof lit "How it answers", then
        went BACKWARDS to "What it holds" for the length of Holds, then jumped to
        Pricing. Holds now finishes its own group before Proof starts, and Proof
        still lands immediately before Pricing, which was the point of putting it
        here in the first place. */}
    {/* ORDER. The site used to go straight from the problem into eight data
        types — a feature list before anyone had been told who it was for. Who
        now sits directly after the problem, and the feed sits after Holds
        because it is the one thing that arrives without you asking. */}
    <Nav/><Hero/><Sources/><Problem/><Who/><Deck/><Holds/><Intake/><Proof/><Pricing/><Faq/><Closer/>
    <Foot/><LaunchPill/>
  </div>);
}
