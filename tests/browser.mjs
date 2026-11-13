import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const url = process.env.SITE_URL ?? 'http://127.0.0.1:4327';
const output = process.env.QA_OUTPUT ?? '/Users/kejishu/code/kejishu/.keji3-visual-review';
const routes = ['/', '/ai-work/evidence-first-ai-research/', '/tools/', '/tools/notebooklm/', '/tools/compare/', '/projects/', '/about/'];
const widths = [{name:'desktop',width:1440,height:900},{name:'tablet',width:1024,height:768},{name:'phone',width:390,height:844},{name:'small',width:320,height:740}];
mkdirSync(output,{recursive:true});
const browser=await chromium.launch(process.env.CI ? {headless:true} : {headless:true,channel:'chrome'});
const findings=[];
try{
 for(const size of widths){
  const context=await browser.newContext({viewport:{width:size.width,height:size.height},deviceScaleFactor:1,reducedMotion:'reduce'});
  const page=await context.newPage();
  for(const route of routes){
   const errors=[];
   const onError=error=>errors.push(error.message);
   page.on('pageerror',onError);
   const response=await page.goto(url+route,{waitUntil:'domcontentloaded',timeout:25000});
   await page.locator('main h1').first().waitFor();
   await page.screenshot({path:resolve(output,size.name+'-'+(route.replaceAll('/','_')||'home')+'.png'),fullPage:true,animations:'disabled'});
   const metrics=await page.evaluate(()=>({
    width:window.innerWidth,scrollWidth:document.documentElement.scrollWidth,
    h1:document.querySelectorAll('main h1').length,
    contentLength:document.querySelector('main')?.textContent?.trim().length??0,
    title:document.title
   }));
   const problems=[];
   if(!response?.ok())problems.push('HTTP '+response?.status());
   if(metrics.scrollWidth>size.width+1)problems.push('horizontal overflow '+metrics.scrollWidth);
   if(metrics.h1!==1)problems.push('wrong h1 count');
   if(metrics.contentLength<120)problems.push('empty content');
   if(errors.length)problems.push('browser JS: '+errors.join('; ').slice(0,220));
   findings.push({route,size:size.name,...metrics,problems});
   console.log((problems.length?'FAIL':'PASS')+' '+size.name+' '+route+' (scroll '+metrics.scrollWidth+') '+problems.join(' / '));
   page.off('pageerror',onError);
  }
  await context.close();
 }
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 const page=await context.newPage();
 await page.goto(url+'/',{waitUntil:'domcontentloaded'});
 await page.locator('.menu-toggle').click();
 if(await page.locator('.mobile-nav.is-open').count()!==1)throw new Error('mobile menu broken');
 await page.locator('#lang-switch').selectOption('/en/');
 await page.waitForURL('**/en/');
 if((await page.locator('html').getAttribute('lang'))!=='en')throw new Error('locale change broken');
 await page.goto(url+'/search/',{waitUntil:'domcontentloaded'});
 await page.locator('#search-input').fill('agent');
 await page.locator('#site-search button').click();
 await page.locator('#search-results a').first().waitFor({timeout:12000});
 if((await page.locator('#search-results a').count())===0)throw new Error('client search broken');
 console.log('PASS menu / locale / search');
 await page.goto(url+'/tools/notebooklm/',{waitUntil:'domcontentloaded'});
 await page.locator('#lang-switch').selectOption('/es/tools/notebooklm/');
 await page.waitForURL('**/es/tools/notebooklm/');
 if((await page.locator('html').getAttribute('lang'))!=='es')throw new Error('tool context lost during locale change');
 console.log('PASS tool-detail contextual locale switch');
 await context.close();
 const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const p=await noJS.newPage();
 await p.goto(url+'/en/agents/reliable-agent-design/',{waitUntil:'domcontentloaded'});
 if((await p.locator('.prose').innerText()).length<600)throw new Error('no-JS article unavailable');
 if(!(await p.locator('.mobile-nav').isVisible()))throw new Error('no-JS mobile navigation unavailable');
 console.log('PASS no-JS article');
 await noJS.close();
}finally{await browser.close();}
writeFileSync(resolve(output,'visual-audit.json'),JSON.stringify(findings,null,2));
if(findings.some(x=>x.problems.length))process.exitCode=1;
