# Editorial and Localization Handbook

## Editorial promise
KeJiShuCloud is analysis and practical education, not an unreviewed automated news ticker. Respect reader time and intellectual honesty.

## Source hierarchy
1. Primary technical documentation, official release notes, original research and standards.
2. Independent reproducible evaluations with documented methodology.
3. Credible specialized reporting that clearly attributes facts.
4. Community testimony for qualitative insight only, clearly marked as anecdotal.

No product claim should rely on promotional copy alone. Explain benchmark method and limitations. Cite the origin of a number and the date on which it was measured.

## Fact versus analysis
- **Fact:** directly sourceable and independently checkable.
- **Analysis:** interpretation with its assumptions stated.
- **Projection:** explicit scenario, not represented as measured outcome.
- **Unverified:** omit or prominently qualify pending checking.

## Tool evaluation protocol
Each comparison should record user job, test inputs, date, region, account tier, environment, reliability, model/version, latency, operational cost, privacy implications, exportability, and observed failures. Do not assign scores without reproducible criteria.

## AI-assisted publishing
1. Collect licensed source links and confirm permissions.
2. Prepare a source table with relevant claim, URL, author and source date.
3. Draft with AI assistance only as a provisional output.
4. Human-check every factual claim, quote, URL, image and comparison.
5. Localize for idiom, regulation and region; human review translations.
6. Open a PR; run validation, check renders, review, then merge.
7. Keep `updated_at` and a corrections note for material amendments.

No auto-publication from an AI model without review.

## Multilingual policy
- Canonical editorial home is `/` (zh); alternates at `/en/`, `/es/`, `/ja/`.
- Localized topic pages use the same stable slug across languages.
- Do not translate URLs or invent different tool names in localized content.
- Maintain a glossary for LLM, agent, MCP, RAG, eval, latency, privacy, and human-in-the-loop.
- For translated long-form work, require explicit `translation_key`, translator/reviewer, and a reference to the original version.
- Region-specific legal or availability differences require validation by locale.

## Proposed long-form frontmatter (Phase 1)
```yaml
---
layout: article
content_id: ai-work-evidence-first-research
translation_key: evidence-first-research
lang: en
category: ai-work
title: "Evidence-first AI research"
description: "..."
date: 2026-10-13
updated_at: 2026-10-13
review_status: approved
author: kejishucloud
sources:
  - url: https://example.org/primary-source
    accessed_at: 2026-10-13
disclosure: none
---
```

## Disclosure and copyright
All third-party charts, images, and quoted text must carry a permitted license or permission and clear attribution. Affiliate/paid relationships must be distinctly identified. The MIT license for the Shaders runtime does not grant rights to separate commercial presets hosted on shaders.com.
