import { getCollection } from 'astro:content';
import type { Lang, Topic } from './site';

export interface VerifiedArticle {
  id: string;
  body: string;
  data: {
    lang: Lang;
    topic: Topic;
    translation_key: string;
    review_status: 'approved' | 'draft' | 'needs-review';
    content_id: string;
    title: string;
    description: string;
    date: Date;
    updated_at: Date;
    author: string;
    permalink: string;
    sources: {title:string;url:string}[];
  };
}
/** Astro/Zod 确认数据结构，再在页面内使用显式稳定类型。 */
export async function approvedArticles(): Promise<VerifiedArticle[]> {
  const entries = (await getCollection('articles')) as unknown as VerifiedArticle[];
  return entries.filter(a=>a.data.review_status === 'approved');
}
