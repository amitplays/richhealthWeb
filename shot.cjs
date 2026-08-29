const {chromium}=require('playwright-core');
const args=process.argv.slice(2);
const W=parseInt(args[0]||'1440',10);
const routes=args.slice(1);
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
 const c=await b.newContext({viewport:{width:W,height:900},deviceScaleFactor:1});
 for(const r of routes){
  const p=await c.newPage();
  await p.goto('http://localhost:4173'+r,{waitUntil:'networkidle'});
  { // real wheel scroll: IntersectionObserver ignores instant programmatic jumps
    const h=await p.evaluate(()=>document.body.scrollHeight);
    for(let y=0;y<h;y+=500){ await p.mouse.wheel(0,500); await p.waitForTimeout(120); }
    await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(400); }
  const name=r.replace(/[^a-z]/gi,'')||'home';
  await p.screenshot({path:`/tmp/sh_${W}_${name}.png`,fullPage:true});
  console.log(name, (await p.evaluate(()=>document.body.scrollHeight))+'px');
  await p.close();
 }
 await b.close();
})();
