import { approvedArticles } from '../data/content';
import type { APIRoute } from 'astro';
export const GET: APIRoute = async () => {
 const entries=await approvedArticles();
 return new Response(JSON.stringify(entries.map(p=>({
   lang:p.data.lang,title:p.data.title,description:p.data.description,
   url:p.data.permalink,topic:p.data.topic,translation_key:p.data.translation_key
 }))),{headers:{'Content-Type':'application/json; charset=utf-8'}});
};
