import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    layout: z.string().optional(),
    view: z.string().optional(),
    lang: z.enum(['zh', 'en', 'es', 'ja']),
    topic: z.enum(['frontier', 'ai-work', 'agents', 'tools']),
    translation_key: z.string(),
    review_status: z.enum(['approved', 'draft', 'needs-review']),
    content_id: z.string(),
    title: z.string().min(5),
    description: z.string().min(10),
    date: z.coerce.date(),
    updated_at: z.coerce.date(),
    author: z.string(),
    permalink: z.string().startsWith('/'),
    sources: z.array(z.object({ title: z.string(), url: z.url() })).min(1)
  })
});
export const collections = { articles };
