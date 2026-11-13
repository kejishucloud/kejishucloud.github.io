/** Pagefind 全文搜索；在运行时失败时使用本地已审核内容的 JSON 索引。 */
interface SearchHit {url:string;title:string;description:string}
interface PagefindRecord {url:string;meta?:{title?:string;description?:string};title?:string;excerpt?:string}
interface PagefindRuntime {search(term:string):Promise<{results:Array<{data:()=>Promise<PagefindRecord>}>}>}
type FallbackRecord = SearchHit & {lang:string;topic:string};

const form=document.querySelector<HTMLFormElement>('#site-search');
if(form){
  const input=form.querySelector<HTMLInputElement>('#search-input');
  const results=form.querySelector<HTMLElement>('#search-results');
  const status=form.querySelector<HTMLElement>('#search-message');
  const fallbackList=document.querySelector<HTMLElement>('.fallback-articles');
  const lang=form.dataset.lang??'zh';
  let cached:FallbackRecord[]|undefined;
  const localized=(url:string):boolean=>
    url.startsWith('/')&&!url.startsWith('//')&&(/^\/(en|es|ja)\//.exec(url)?.[1]??'zh')===lang;
  async function indexed(query:string):Promise<SearchHit[]>{
    // @ts-expect-error Pagefind is emitted only after Astro's static build.
    const pagefind:PagefindRuntime=await import(/* @vite-ignore */ '/pagefind/pagefind.js');
    const output=await pagefind.search(query);
    const entries=await Promise.all(output.results.slice(0,40).map(x=>x.data()));
    return entries.filter(x=>localized(x.url)).map(x=>({
      url:x.url,title:x.meta?.title??x.title??'Article',
      description:x.meta?.description??x.excerpt?.replace(/<[^>]*>/g,'')??''
    }));
  }
  async function fallback(query:string):Promise<SearchHit[]>{
    if(!cached){
      const response=await fetch('/search-index.json');
      if(!response.ok)throw new Error('Search unavailable');
      const data:unknown=await response.json();
      if(!Array.isArray(data))throw new Error('Invalid index');
      cached=data.filter((entry):entry is FallbackRecord =>
        entry&&typeof entry.url==='string'&&localized(entry.url)&&
        typeof entry.title==='string'&&typeof entry.description==='string'&&
        typeof entry.topic==='string'&&typeof entry.lang==='string');
    }
    const terms=query.toLocaleLowerCase(lang).split(/\s+/u).filter(Boolean);
    return cached.filter(x=>terms.every(w=>(x.title+' '+x.description+' '+x.topic).toLocaleLowerCase(lang).includes(w)));
  }
  const draw=(items:SearchHit[]):void=>{
    if(!results||!status)return;
    results.replaceChildren();status.textContent=String(items.length)+' results';
    fallbackList?.setAttribute('hidden','');
    for(const item of items){
      const a=document.createElement('a');a.className='article-row';a.href=item.url;
      const box=document.createElement('span');box.className='article-content';
      const h=document.createElement('strong');h.textContent=item.title;
      const detail=document.createElement('span');detail.className='article-desc';detail.textContent=item.description;
      const arrow=document.createElement('span');arrow.className='article-arrow';arrow.textContent='↗';
      box.append(h,detail);a.append(box,arrow);results.append(a);
    }
  };
  form.addEventListener('submit',async event=>{
    event.preventDefault();
    if(!input||!results||!status)return;
    const term=input.value.trim().slice(0,140);
    if(!term){results.replaceChildren();status.textContent='';fallbackList?.removeAttribute('hidden');return;}
    status.textContent='Searching…';
    try{
      const matches=await indexed(term).catch(()=>fallback(term));
      draw(matches.length?matches:await fallback(term));
    }catch{
      status.textContent='Search unavailable. Browse the articles below.';
      results.replaceChildren();fallbackList?.removeAttribute('hidden');
    }
  });
}
