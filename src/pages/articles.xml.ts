import { approvedArticles } from '../data/content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const articles = (await approvedArticles())
    .sort((a,b)=>b.data.date.valueOf()-a.data.date.valueOf());
  const escape = (v:string) => v.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const entries = articles.map(({data}) => '<entry><id>https://kejishucloud.github.io'+data.permalink+'</id><title>'+escape(data.title)+'</title><link href="https://kejishucloud.github.io'+data.permalink+'"/><updated>'+data.updated_at.toISOString()+'</updated><summary>'+escape(data.description)+'</summary></entry>').join('');
  const xml = '<?xml version="1.0" encoding="utf-8"?><feed xmlns="http://www.w3.org/2005/Atom"><id>https://kejishucloud.github.io/articles.xml</id><title>KeJiShuCloud Research</title><updated>'+(articles[0]?.data.updated_at.toISOString()??new Date('2026-10-13').toISOString())+'</updated><link href="https://kejishucloud.github.io/articles.xml" rel="self"/>'+entries+'</feed>';
  return new Response(xml,{headers:{'Content-Type':'application/atom+xml; charset=utf-8'}});
};
