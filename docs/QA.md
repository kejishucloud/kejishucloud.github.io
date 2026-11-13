# KeJiShuCloud 3.0 — QA Evidence

Verification environment: local macOS, Google Chrome headless via Playwright, Astro production preview on 127.0.0.1, Node 22.23.4, Python 3.11. Date: 2026-11-13.

## Tested gates

| Gate | Measured outcome |
| --- | --- |
| Astro strict type checking | 0 errors, 0 warnings, 0 hints |
| Static production routes | 79 pages generated |
| Generated core and tool SEO | canonical, language, hreflang, single H1: PASS |
| Internal resource link audit | 0 broken local links |
| Content auditor | 8 approved translations; 0 metadata errors |
| Python unit tests | 4/4 passed |
| Browser viewport screenshots | 28 captures: 7 pages × 1440 / 1024 / 390 / 320 |
| Browser interactions | mobile navigation, full-text search, contextual locale switching: PASS |
| Disabled JavaScript | article reading and mobile navigation: PASS |
| Multilingual 320/390 audit | 88 locale × path × viewport checks; 0 failures |

## Lighthouse — locally measured mobile baseline

These are **actual local-run results**, not guaranteed production scores. A local headless browser may differ from public networks and hardware.

| Route | Performance | Accessibility | SEO | Notes |
| --- | ---: | ---: | ---: | --- |
| Home | 98 | 95 | 100 | initial local mobile run |
| Article | 99 | 96 | 100 | **after** switching Google Fonts to display=optional; CLS 0 |
| Tools index | 96 | 96 | 100 | before the font-loading adjustment |
| Projects | 99 | 98 | 100 | before the font-loading adjustment |
| About | 99 | 100 | 100 | before the font-loading adjustment |
| NotebookLM detail | 98 | 100 | 100 | before the font-loading adjustment |
| Comparison | 99 | 100 | 100 | before the responsive matrix update |

Lighthouse JSON files, 28 browser screenshots, locale snapshots and machine-readable audits reside outside the Git repo at:
\`/Users/kejishu/code/kejishu/.keji3-visual-review\`

These are not published to the web or committed as site assets. In CI, screenshots are retained in the GitHub Actions artifacts for visual review.

## Design critique findings and fixes

1. Typeface loading caused a 0.139 cumulative layout shift on the article page. Changed Google Fonts from swap to optional; same-device rerun measured CLS 0.
2. Tool directory contained a large empty “articles” heading when none existed. Empty headings now render conditionally.
3. The comparison table was horizontally scroll-only on a 390px phone. Reworked the 700px-and-below layout to readable vertical rows.
4. The client search test used a fixed 600ms delay and failed intermittently on cold Pagefind loads. The test now waits for a real indexed result.

## Known limitations

- Official tool documentation is linked, but external URLs that time out from the Mac are **not** claimed verified. The recorded date is an editorial reference timestamp, **not** an independent product test.
- The official Impeccable skill files and license are included. Its standalone detection engine download was blocked by the Mac’s GitHub Release connectivity; design guidance was applied with actual Playwright screenshots and Lighthouse instead. Do not report the engine as having passed.
- WebGPU shader rendering is optional and follows device capability and reduced-motion requirements; an end-to-end GPU rendering benchmark was not completed.
- Live production Lighthouse must be rerun after deployment. Real-world Core Web Vitals require field data and cannot be inferred from local Lighthouse alone.
- GitHub Pages **Settings → Pages → Build and deployment → Source** must be set to **GitHub Actions**. A code push cannot be reported as a successful deployment until the workflow and public URL are verified.

## Visual-redesign QA / Signal Atlas 3.1

After the earlier version was rejected as aesthetically generic, a second design pass changed the **layout, graphics, project presentation and topic information architecture**, not just the colors. Verified locally on 2026-11-13:

- 79 Astro pages built, 0 TypeScript errors/warnings, generated-route and source checks pass.
- Screenshots taken at 1440, 1024, 390 and 320 across 7 critical pages (home, article, tool directory, tool detail, comparison, projects and About).
- 88 multilingual viewport+canonical checks across ZH/EN/ES/JA: 0 failures.
- Browser menu/search/translation checks and disabled-JavaScript article reading passed.
- Locally measured redesigned mobile homepage: Lighthouse **Performance 98 / Accessibility 95 / SEO 100**, LCP 1.80s, CLS 0, Total Blocking Time 0ms. These are laboratory values, not public production scores.
- Design review explicitly corrected the broken desktop `RemoteOps` wordmark by reducing its first-row display type; visual review also corrected long translated contact labels.

Before reporting public deployment success for this design pass, recheck the GitHub Actions run and fetch the deployed SVG + site HTML. The currently live site may remain on a previous version until the new code is pushed and deployed.
