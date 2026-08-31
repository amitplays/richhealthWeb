const {chromium}=require('playwright-core');
const ROUTES=['/','/#/deep/watch','/#/deep/watch','/#/deep/india','/#/deep/privacy','/#/deep/evidence','/#/deep/cycle','/#/deep/doctors','/#/deep/health-analysis','/#/deep/richie','/#/deep/checkins','/#/deep/family','/#/deep/day','/#/quality','/#/security','/#/about','/#/investors','/#/careers'];
const SIZES=[[1680,1000],[1440,900],[1180,900],[834,1000],[600,900],[390,844]];
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
 let bad=0;
 for(const rm of ['no-preference','reduce']){
  const c=await b.newContext({viewport:{width:1440,height:900},reducedMotion:rm});
  const p=await c.newPage(); await p.goto('http://localhost:4173/',{waitUntil:'networkidle'});
  const r=await p.evaluate(()=>{const t=document.querySelector('.px-sort');
    return{h:getComputedStyle(t).height, sticky:getComputedStyle(document.querySelector('.px-sort__stage')).position,
           card:getComputedStyle(document.querySelector('.px-sc')).translate};});
  console.log('reduced-motion='+rm, JSON.stringify(r)); await c.close();
 }
 for(const [w,h] of SIZES){
  const c=await b.newContext({viewport:{width:w,height:h}});
  for(const route of ROUTES){
   const p=await c.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
   await p.goto('http://localhost:4173'+route,{waitUntil:'networkidle'});
   await p.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
   await p.waitForTimeout(300);
   await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(200);
   const o=await p.evaluate(()=>{
     const de=document.documentElement, over=de.scrollWidth-de.clientWidth;
     /* Two rails are wider than the viewport on purpose: the hero marquee (an
        animated loop) and the screens rail (a horizontal scroller). Their own
        parents clip them and the document itself never scrolls sideways, so
        their children are not layout escapes — skip that subtree. */
     /* .px-per__frame is the third case: the portrait rests at scale(1.03) so
        that pointer parallax has edge bleed to move into, and the frame clips
        it with overflow:hidden. getBoundingClientRect reports the pre-clip box,
        so the image reads as escaping when it is not. */
     /* .px-reel__p is the fourth: a closed pane of the "Who this is for" reel is
        ~108px wide (6% at mobile) and clips a 560px text block with
        overflow:hidden. The block is laid out at its full width so the headline
        breaks the same way it does when open and is then cut — that is the
        design — but getBoundingClientRect reports the pre-clip box, so a
        rightmost closed pane reads as escaping. Verified: document overflow is
        0 at all six widths, and every flagged node sits inside a pane. */
     const OK='.px-marquee,.px-rail,.px-railwrap,.px-deck__rail,.px-bento,.px-xrail,.px-deckstage,.px-sort,.px-per__frame,.px-reel__p';
     const esc=[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();
       if(!(r.width>0&&(r.left< -2||r.right>de.clientWidth+2))) return false;
       return !e.closest(OK);}).length;
     return{over,esc};});
   const flag=(o.over>0||o.esc>0||errs.length)?' <-- CHECK':'';
   if(flag)bad++;
   console.log(`${w}x${h} ${route.padEnd(30)} overflow=${o.over} escaped=${o.esc} errs=${errs.length}${flag}`);
   await p.close();
  }
  await c.close();
 }
 console.log(bad?`\n${bad} ISSUES`:'\nALL CLEAN');
 await b.close();
})();
