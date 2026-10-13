# Global AI Editorial Platform — Full Transformation Roadmap

**Repository:** kejishucloud/kejishucloud.github.io  
**Baseline reviewed:** Jekyll / Academic Pages; homepage contains template instructions, legacy placeholder posts remain, and multiple proposed navigation URLs were not implemented.  
**Strategic outcome:** Independent, source-backed, multilingual publication covering technology, AI productivity, agents and tools.

## Delivery model
All work via feature branches, code review, CI and preview. Do not overwrite `main` or declare deployment complete before checks and a deliberate merge. Keep historical links and identify redirects before deleting legacy pages.

### Phase 0 — Foundation (this PR / first iteration)
**Scope:** fix navigation, homepage, responsive visual hierarchy and source-backed starting guides across Chinese, English, Spanish and Japanese.
- [x] Four editorial pillars and product brief.
- [x] Shared localized Jekyll layout and structured content dictionary.
- [x] Home, topic and editorial policy pages in four languages.
- [x] Real WebGPU shader integration guarded by capability/reduced-motion checks and CSS fallback.
- [x] Canonical and alternate hreflang markup.
- [ ] Build verification and manual cross-browser acceptance before merge.
- [ ] Add a public preview deployment for editorial approval.

**Acceptance:** all 24 core routes render; cross-language links map to equivalent routes; no 404s in core navigation; JavaScript disabled retains navigation.

### Phase 1 — Publishing infrastructure (next 1–2 weeks)
- Clean template/demo posts, publication profiles and obsolete training workflows *after* confirming preservation needs.
- Consolidate existing `_posts`, `_pages`, `_agent`, `zh`, `en` into one controlled content schema.
- Define content fields: stable ID, slug, translation key, language, category, author, original sources, published/updated dates, review status and disclosures.
- Implement related reading, topic/tag taxonomy, breadcrumbs, article templates and author bylines.
- Preserve legacy slugs with explicit 301 redirects; generate XML sitemap, RSS/Atom and a robust 404 page.
- Move analytics to consent-aware configuration as required by audience jurisdiction; publish privacy and cookie policies.

**Acceptance:** migration script can be rerun safely; CI detects broken internal links and required metadata; no duplicate canonical paths.

### Phase 2 — Editorial breadth and tool atlas (weeks 3–5)
- Publish **12 flagship articles** (three per pillar), each reviewed and evidence-checked; start with authoritative English + Chinese editions.
- Build 4 detailed workplace workflows (meeting follow-up, document drafting, research synthesis, spreadsheet analysis) with reusable templates and human approval steps.
- Develop an agent laboratory: architecture diagrams, minimal-permission tools, evaluation examples and error-handling cases.
- Build structured tool directory with: use case, company, model or integration, price as-of date, platform/regions, privacy, pros, limitations and independently tested findings.
- Introduce comparison matrices for assistants, automation products, agent stacks; avoid live or unsourced rankings.
- Establish a weekly editorial review of high-change items; label reviews and stale pages visibly.

**Acceptance:** each item has a primary citation, human review, reviewed-on date, accessible structure and clear limitations.

### Phase 3 — Global localization and discovery (weeks 5–7)
- Expand to full professionally checked `es` and `ja` flagship editions; optional additional languages only when review capacity exists.
- Enforce sentence-level translation QA for terminology, local conventions, right reading order, and regional tool availability.
- Audit canonical, hreflang, sitemap, OG images and Article schema for translated articles; perform keyword research in each language, not literal SEO translation.
- Add lightweight static full-text search (e.g., Pagefind after build validation), filtering by language/category.
- Establish regional glossary and per-locale editorial calendar.

**Acceptance:** every translated article points to verified alternates; incomplete translations do not claim parity.

### Phase 4 — Quality, automation and growth (weeks 7–8+)
- Add CMS-like authoring checks, editorial PR template and scheduled link/review-age checks.
- Optional Python pipeline: ingest sources → deduplicate → research brief → draft assistance → human fact check → localization → PR → CI → publish.
- Separate generated drafts from approved content; no autonomous publishing of news or product recommendations.
- Add structured community contributions and an opt-in newsletter only with adequate privacy disclosures.
- Measure audience outcomes and iterate on reader journeys.

**Acceptance targets, not observed metrics:** Lighthouse performance/accessibility/SEO >= 90 on representative mobile and desktop pages where feasible, zero critical accessibility failures, 100% core-route coverage, zero broken published internal links, and 100% of factual product comparisons containing sources and review dates.

## Editorial cadence (initial target)
| Pillar | Format | Target cadence |
| --- | --- | --- |
| Technology signals | Evidence-led explainer | 1/week |
| AI at Work | Reproducible workflow | 1/week |
| AI Agents | Architecture or evaluation case | 2/month |
| AI Tools | Tested comparison or guide | 2/month |

Cadences are capacity targets, not promises. Accuracy and verification take priority over volume.

## Information architecture
```text
/                    Chinese editorial home
/frontier/           /ai-work/  /agents/  /tools/  /about/
/en/                 English and matching topic routes
/es/                 Spanish and matching topic routes
/ja/                 Japanese and matching topic routes
```
Planned article route: `/{locale}/{pillar}/{article-slug}/`, except zh where locale prefix is absent. Preserve a stable `translation_key` across translations.

## Decision log
- **Why stay with Jekyll?** Static pages are simple to host, accessible to crawlers and cheap to operate; current needs do not require backend accounts. Consider Astro only if content pipelines, search and rich visualization demand it.
- **Why Shaders?** An optional, isolated MIT-licensed GPU layer that provides character without replacing text.
- **Why Impeccable?** Consistent visual craft, content hierarchy, copy and accessibility audits, not a replacement runtime framework.
- **Why four languages?** Broad initial coverage with manageable editorial QA. Add languages based on demand and translation capacity.

## Risks and safeguards
| Risk | Mitigation |
| --- | --- |
| AI misinformation | Primary references, human editorial gate, corrections log |
| Tool pages becoming stale | Reviewed-on dates, update reminders, remove unsupported prices |
| Cross-locale duplication | Canonicals, hreflang, language-specific writing and QA |
| GPU/bandwidth cost | Lazy optional shader, reduced-motion support, fallback, measure page weight |
| Rights/licensing | MIT shader source only; do not republish paid presets, respect article/image licenses |
| Legacy SEO loss | URL inventory, mappings and measured redirects |
| Unintended site outage | PR review, CI checks, build preview and reversible merge |

## Release gate
1. Run `python3 scripts/validate_portal.py`.
2. Run an actual Jekyll production build with the repository's Pages configuration.
3. Browse all 24 routes at 320px, 768px, desktop widths, with keyboard and JavaScript disabled.
4. Inspect rendered `canonical` and `hreflang` URLs and check source links.
5. Test on Safari, Chromium and Firefox; confirm no errors when WebGPU fails.
6. Capture before/after screenshots and Lighthouse results.
7. Merge only when technical and editorial criteria are satisfied.
