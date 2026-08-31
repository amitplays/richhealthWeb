import React, { useEffect } from 'react';
import './premium.css';
import { useReveal, Head, Crop, Ico, SiteNav, Foot, PageCta } from './Premium';
import sCheckin from './assets/screens/ios/ios_checkin.jpg';
import sSymptoms from './assets/screens/ios/ios_symptoms.jpg';
import sReports from './assets/screens/ios/ios_reports.jpg';
import sProfile from './assets/screens/ios/ios_profile.jpg';
import sRichie from './assets/screens/ios/ios_richie_home.jpg';
import sFamily from './assets/screens/ios/ios_family.jpg';
import sMeds from './assets/screens/ios/ios_medications.jpg';
import sMeasure from './assets/screens/ios/ios_measurements_watch.jpg';
import sModels from './assets/screens/ios/ios_model_picker.jpg';

/* Every row carries the app's own icon. Rows are [icon, title, body]. */
const PAGES={
 'cycle':{k:'Cycle intelligence',t:<>A cycle tracker that <i>reads your bloods.</i></>,
  l:'Most cycle apps know your dates and nothing else. Yours sits in the same record as your thyroid panel, ferritin and medicines.',img:sSymptoms,
  rows:[['gyn','Logged in seconds','Start, end, flow and pain. That is the whole interaction.'],
   ['doc','Cross-read with labs','Thyroid, ferritin, vitamin D and PCOS markers considered alongside your cycle.'],
   ['famgrp','Hereditary patterns','Early menopause, PCOS and endometriosis in the family become part of the picture.'],
   ['family','For dependants too','Available for any female dependant you look after, with the same privacy.']]},
 'doctors':{k:'For doctors',t:<>Your patient arrives <i>prepared.</i></>,
  l:'Richie is not a clinician. Its job is to make sure the clinician has everything in front of them.',img:sReports,
  rows:[['doc','A dossier, not a shrug','History, medicines, symptoms, uploaded reports and exposure, organised, dated and readable in a minute.'],
   ['check','Consent per connection','Nothing is visible until a patient accepts your request, and they can disconnect at any time.'],
   ['pill','Adherence you can trust','Doses logged as taken or missed from the reminder itself, not guessed at the counter.'],
   ['ruler','Their own baseline','Every value carries its date and its source, so you are reading a trend rather than a snapshot.'],
   ['analysis','The clinician decides','Where Richie and a treating doctor disagree, the product tells the patient to follow the doctor.']]},
 'evidence':{k:'Our sources',t:<>Every answer has a <i>source.</i></>,
  l:'Where an answer leans on something outside your own record, it says what — and everything named here is actually wired.',img:sModels,
  rows:[['check','Every source, named on the answer','A grounded reply carries a "Checked N sources" row. Open it and you get each tool it ran and every paper it read, by title and year — before you read a word of the answer.'],
   ['analysis','OpenAlex','Peer-reviewed literature, searched live when a question needs it, with the DOI of each paper returned to you.'],
   ['ai','Tavily','Web search, used only inside agentic chat and only when the question cannot be answered from your record.'],
   ['air','IQAir','Air quality where you are, read by the apps and kept with the reading it explains.'],
   ['doc','Your own last five reports','A new lab value is read against your previous ones before anything is said about it — your baseline, not a table built somewhere else.'],
   ['meds','Brand-to-molecule table','Indian brands hand-checked to their molecule and class, with withdrawal notes where a drug was pulled. Used in chat.'],
   ['health','Indian Diabetes Risk Score','The Madras Diabetes Research Foundation score (Mohan et al., 2005; PubMed 16334618), calculated rather than guessed.']]},
 'india':{k:'Built for India',t:<>Built for <i>Indian</i> medicine.</>,
  l:'Different brand names, different risk thresholds, different labs. We started here rather than translating something built elsewhere.',img:sMeds,
  rows:[['meds','The same molecule, a dozen names','Crocin and Dolo are both paracetamol. The record knows, so it can warn you before you double a dose.'],
   ['pill','Withdrawn drugs flagged','Rantac is ranitidine, pulled over NDMA. If it is on your list, the app says so.'],
   ['doc','Photograph the report, whatever it looks like','Indian labs all print differently. A vision model reads the page you actually have, so nothing needs retyping.'],
   ['health','Risk on South-Asian cutoffs','The Indian Diabetes Risk Score, and a waist threshold of 90cm for men and 80cm for women, not the European numbers.'],
   ['msg','Answers in your language','Ask in Hindi and Richie remembers that as a standing preference, so it keeps answering in Hindi.']]},
 /* ── Four pages for capabilities that had no home anywhere on the site.
    Every claim below is read out of the app or the backend, and the
    platform-only ones say so rather than implying both. ── */
 'richie':{k:'Richie',t:<>It checks the serious causes <i>before it reassures you.</i></>,
  l:'Tell Richie a symptom and it will not jump to the easy answer. It weighs what else it could be, including the few things that need a hospital rather than a paragraph — and if one of those fits, it stops explaining and tells you where to go. Every reply starts from what is actually in your record, and you decide which model reads it.',img:sRichie,
  rows:[['mAuto','Seven models, your choice','Auto, Gemini, Mistral, DeepSeek R1 and Llama 3.3, with GPT-5.3 and Claude 4.5 on Pro. Change it in the middle of a conversation.'],
   ['mMax','Max mode','On Pro, one question goes to a council of three and comes back as a single answer, with the header telling you a council is on it. Android today.'],
   ['ai','Fork the conversation','Take any reply and carry on in a different model. The new chat opens with the original in front of it and a link back. Android today.'],
   ['check','Log and remember from here','One tap reads the conversation back and files what it finds — symptoms, measurements, medicines, cycle logs — each properly dated. iOS today.'],
   ['ruler','Log without leaving the chat','When Richie spots something worth recording it offers a card. Severity, notes and the date are all editable before you save.'],
   ['cognition','It shows its working','A collapsible row carries the reasoning; above it, "Checked N sources" opens to every search it ran and every paper it read. Ask something hard and you get the citations, not just a confident tone.'],
   ['msg','Told once, remembered','Ask for shorter replies, or answers in Hindi, and it stays that way. Everything remembered is listed in Settings and you can delete any of it.'],
   ['family','A separate chat per person','Switch to someone you look after and Richie answers from their record, in their own conversation.']]},
 'checkins':{k:'Health check-ins',t:<>Two minutes of questions, <i>read three different ways.</i></>,
  l:'A few questions on a schedule. What comes back is a read on you that gets sharper every time you answer.',img:sCheckin,
  rows:[['checkin','A few questions, that is all','Tap through a handful of answers with a progress bar. Richie takes it from there.'],
   ['analysis','The Council','On Pro three analytical lenses read the same check-in — cardiometabolic risk, adherence and behaviour, lifestyle and mind-body — and Richie reconciles them into one read.'],
   ['cognition','Or Richie’s reasoning','Free plans get one read with its reasoning shown. Not a locked door.'],
   ['health','A watch-list, not a score','Focus this week, what is going well, what Richie is watching — each traceable to something you actually logged.'],
   ['upload','Worth logging','It names the missing data that would sharpen the next read, instead of guessing without it.'],
   ['check','A streak you can see','How many in a row, and what share of them you kept.'],
   ['air','It knows when it is stale','New data since the last read turns the card amber, so you never read yesterday’s conclusion as today’s.'],
   ['msg','Cadence follows your plan','Monthly on free, weekly on Pro, twice a week on Ultra.']]},
 'family':{k:'Family and dependants',t:<>A separate record, <i>and a separate chat, per person.</i></>,
  l:'Two different things: relatives who have their own account, and dependants whose health you keep for them. Both sit in your record, each with their own switches.',img:sFamily,
  rows:[['famgrp','Connect, or add','A relative gets a request and accepts it. A dependant — a child, a parent — is added by you and tracked by you.'],
   ['msg','A private chat each','Everyone you cover gets their own conversation, answered from their record and not yours.'],
   ['family','Share your plan','Pro covers up to five connected relatives. They are told when you add them, and you can take it back.'],
   ['analysis','Family history counts','Conditions in the family are weighted into your own risk, with South-Asian predisposition accounted for.'],
   ['gyn','Cycle tracking for dependants','Available for any female dependant you look after, with the same privacy switches.'],
   ['check','A tree you can move','Everyone grouped by generation. Pinch to zoom, drag to move, double-tap to fit.']]},
 'day':{k:'Every day',t:<>Reminders that count <i>whether you actually took it.</i></>,
  l:'The parts of looking after yourself that are not a crisis and are easy to drop. These are the ones the app carries for you.',img:sMeds,
  rows:[['nutri','NutriCheck','Ask whether you should eat something. The verdict names which of your records it was based on.'],
   ['pill','Medicines that remind themselves','A reminder you answer from the notification itself — taken, missed, or snooze ten minutes. Answers made offline queue up and land when you are back.'],
   ['analysis','Adherence, counted','Doses taken against doses due, so “I think I take it” becomes a number your doctor can read.'],
   ['meds','Indian brands, resolved','Crocin and Dolo are the same molecule. Withdrawn drugs are flagged if they are on your list.'],
   ['msg','A brief each morning','What Richie has for you today, read from what actually changed.'],
   ['air','The air where you are','Today’s AQI, kept beside the readings it might explain.']]},
 'privacy':{k:'Privacy',t:<>Your data. <i>Your switches.</i></>,
  l:'What we hold, what is on by default, and what you can turn off — written from the code rather than from a policy template.',img:sProfile,
  rows:[['check','Richie reads only what you allow','Every symptom, measurement, medicine, report and cycle log carries an "include in AI chat context" switch, and every query that builds Richie’s context filters on it.'],
   ['cognition','Memory you can read','Durable facts Richie remembers are listed in Settings, and you can delete any of them.'],
   ['analysis','Model improvement is ON by default','improveModel defaults to true in the user model. You can turn it off in Settings; we would rather say so than imply otherwise.'],
   ['upload','Deletion overwrites your identifiers','Account deletion scrambles your name, email, phone and date of birth. It is not a full erasure of every record, and there is no export endpoint yet.'],
   ['air','One third-party call','The site loads its typefaces from Google Fonts. Nothing else on this page contacts anyone.']]},
 'watch':{k:'Apple Watch and Health Connect',t:<>Ask your watch data <i>a question.</i></>,
  l:'Ten measurements come off Apple Health and Health Connect and then just sit there. Here they are kept with the moment they were taken and the device that took them, and read next to your labs, your medicines and yesterday\u2019s air \u2014 so \u201cwhy is my resting heart rate up\u201d has an answer instead of another graph.',img:sMeasure,
  rows:[['ruler','Ten measurements, not a score','Heart rate, resting heart rate, blood oxygen, sleep, wrist temperature, ECG result, steps, active energy, weight and blood pressure.'],
   ['check','Each keeps its source','A reading carries its device and its timestamp, so Richie can answer "as of 6:12 this morning" instead of guessing.'],
   ['health','Read beside everything else','Yesterday’s air quality, this month’s thyroid panel and last night’s sleep are the same record, not three apps.'],
   ['ai','Android too','Health Connect on Android, with steps through Google Fit.'],
   ['family','No wearable needed','Everything works without one. A watch sharpens the reasoning; it is not the price of entry.']]},
};


/* Focus rectangles into the real 1206x2622 captures. Each one is the part of the
   screen the page is actually about; the rest of the screenshot was never worth
   the pixels. Read off the captures with a 10% grid overlay. */
const FOCUS={
 'richie':          {f:[.03,.385,.94,.272], c:'Richie proposes the question, and says which of your readings made it ask.'},
 'checkins':        {f:[.02,.285,.96,.255], c:'What Richie is watching this week, with its own three states.'},
 'cycle':           {f:[.02,.217,.96,.255], c:'Every symptom dated and graded, beside the rest of the record.'},
 'doctors':         {f:[.02,.202,.96,.098], c:'A report photographed, read and dated — nothing retyped.'},
 'evidence':        {f:[.04,.503,.92,.392],  c:'Whichever model you pick, the sources listed under the answer are the same ones.'},
 'india':           {f:[.02,.412,.96,.196],   c:'Brand names resolved to the molecule, with the dates you took them.'},
 'family':          {f:[.02,.15,.96,.275],  c:'Relatives who have their own account, and dependants you keep.'},
 'day':             {f:[.02,.20,.96,.26],   c:'Doses logged as taken or missed, not guessed at the counter.'},
 'privacy':         {f:[.02,.562,.96,.176], c:'Every switch, and what it is set to before you touch anything.'},
 'watch':           {f:[.02,.252,.96,.235],  c:'Ten measurements, each carrying the device and the minute it was taken.'},
};

export default function Deep({slug}){
  useReveal();
  useEffect(()=>{window.scrollTo({top:0,left:0,behavior:'instant'});},[slug]);
  const d=PAGES[slug];
  return(
  /* The SAME nav and the SAME footer as everywhere else. This page used to build
     its own nav — seven feature labels wrapping onto two lines — and cap it with
     a "Back to product" button, which told the reader they had left the site.
     They have not: a feature page is a page of the site, reached from Features
     in the one nav, and it is marked there while you are on it. */
  <div className="px">
    <SiteNav slug={slug} alwaysStuck/>
    <section className="px-band px-band--first">
      <div className="px-wrap">
        {!d?(<>
          <Head k="Not found" t={<>That page <i>doesn't exist.</i></>} l="It may have moved."/>
          {/* "Back to the product" was a sixth way of saying "go back". Every
              not-found state on the site now says the same thing. */}
          <a className="px-btn px-btn--fill fx-glow" href="#/">Back to home</a>
        </>):(<>
          {/* Hero, then cards. The rows used to be a bulleted list crammed into
              half the width beside the phone — a feature page that reads like a
              changelog. The phone now sits with the heading, and each capability
              gets a card of its own across the full measure, with the app's own
              icon. fx-stagger/fx-card/fx-glow are the site's existing effects:
              60ms cascade in, lift + teal edge + follow-glow on hover, and all of
              it already neutralised under prefers-reduced-motion. */}
          <div className="px-duo px-duo--wide px-deep__top">
            <div><Head k={d.k} t={d.t} l={d.l}/></div>
            <Crop src={d.img} alt={`${d.k} in the app`}
              focus={(FOCUS[slug]||{}).f||[.02,.2,.96,.26]}
              cap={(FOCUS[slug]||{}).c}/>
          </div>
          <div className="px-fcards px-rv fx-stagger">
            {d.rows.map(([ic,t,b],i)=>(
              <article className="px-card fx-card fx-glow" key={t} style={{'--i':i}}>
                <span className="px-card__ic"><Ico n={ic} size={20}/></span>
                <b>{t}</b>
                <p>{b}</p>
              </article>))}
          </div>
          {/* No "Back to the product". The nav never left. What is useful at the
              foot of a feature page is the next one, so this is a sibling link,
              not an exit. */}
          {/* fx-glow was on every .px-btn in Premium.js and on none of the
              identical buttons here — half the site's buttons carried the
              cursor-follow highlight and half did not. */}
          {(()=>{ const ks=Object.keys(PAGES); const i=ks.indexOf(slug);
            const nx=ks[(i+1)%ks.length];
            return(<div className="px-deep__next">
              <a className="px-btn px-btn--line fx-glow px-arw" href={`#/deep/${nx}`}>Next: {PAGES[nx].k}</a>
            </div>);})()}
        </>)}
      </div>
    </section>
    {/* Eleven feature pages ended with no primary action at all: the only route
        from any of them to the ask was the nav or the footer. Same component,
        same words and same target as Medical quality, Security and About. */}
    {d&&<PageCta/>}
    <Foot/>
  </div>);
}
