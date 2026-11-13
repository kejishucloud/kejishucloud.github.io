import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Four-locale small-screen rendering and canonical-link contract.
 * Source articles and localized tool views must remain usable at 320 and 390.
 */
const site = process.env.SITE_URL ?? 'http://127.0.0.1:4327';
const output = process.env.QA_OUTPUT ?? '/Users/kejishu/code/kejishu/.keji3-visual-review';
const locales = {zh:'',en:'en/',es:'es/',ja:'ja/'};
const pages = ['', 'insights/', 'ai-work/', 'agents/', 'tools/', 'tools/notebooklm/',
               'tools/compare/', 'projects/', 'about/', 'lab/', 'ai-work/evidence-first-ai-research/'];
const problems = [];
let checks = 0;
mkdirSync(output,{recursive:true});
const browser = await chromium.launch(process.env.CI ? {headless:true}:{headless:true,channel:'chrome'});
try {
 for(const [lang,prefix] of Object.entries(locales)) {
  for(const width of [320,390]) {
   const context = await browser.newContext({viewport:{width,height:844},reducedMotion:'reduce'});
   const page = await context.newPage();
   for(const path of pages) {
    const url = site+'/'+prefix+path;
    const response = await page.goto(url,{waitUntil:'domcontentloaded'});
    const metrics = await page.evaluate(()=>({
      lang:document.documentElement.lang,
      headingCount:document.querySelectorAll('main h1').length,
      scrollWidth:document.documentElement.scrollWidth,
      canonical:document.querySelector('link[rel=canonical]')?.getAttribute('href'),
      alternates:document.querySelectorAll('link[hreflang]').length
    }));
    const expected='https://kejishucloud.github.io/'+prefix+path;
    const reason=[];
    if(!response?.ok())reason.push('HTTP '+response?.status());
    if(metrics.scrollWidth>width+1)reason.push('overflow '+metrics.scrollWidth);
    if(metrics.headingCount!==1)reason.push('heading count '+metrics.headingCount);
    if(metrics.lang!==(lang==='zh'?'zh-CN':lang))reason.push('incorrect html language');
    if(metrics.canonical!==expected)reason.push('canonical mismatch');
    if(metrics.alternates!==5)reason.push('missing locale alternates');
    checks++;
    if(reason.length)problems.push({lang,width,path,reason});
   }
   if(width===390){
    const home='/'+prefix;
    await page.goto(site+home,{waitUntil:'domcontentloaded'});
    await page.screenshot({path:resolve(output,'locale-'+lang+'-phone.png'),fullPage:true,animations:'disabled'});
   }
   await context.close();
  }
 }
}finally{await browser.close();}
writeFileSync(resolve(output,'locale-audit.json'),JSON.stringify({checks,problems},null,2));
console.log('Locale routes audited:',checks,'Failures:',problems.length);
for(const issue of problems) console.log(JSON.stringify(issue));
if(problems.length)process.exitCode=1;
