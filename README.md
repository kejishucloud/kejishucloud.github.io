# KeJiShuCloud 3.0

A global, independent technology research and software engineering studio.

**Live URL:** https://kejishucloud.github.io
**Stack:** Astro 7, strict TypeScript, React islands, MDX, Shaders/WebGPU, Pagefind, Zod, Python 3.11, GitHub Pages.

## Local development

Requires Node 22.23.4+ or Node 24 LTS, Python 3.11+. Run:

~~~bash
npm ci
npm run dev
~~~

## Full release audit

~~~bash
npm run check
python3.11 -m unittest discover -s tests/keji3 -v
python3.11 scripts/quality.py
npm run build
python3.11 scripts/validate_build.py
npm run preview -- --port 4327
npm run test:browser
npm run test:locales
~~~

The browser suite uses installed Chrome and captures the homepage, article, AI tools, project and about pages at 1440, 1024, 390 and 320 viewport widths. Screenshots are saved outside the repository by default.

## Source organization

- src/layouts/Base.astro — shared navigation, localization, SEO and footer
- src/pages/[...slug].astro — localized static routes and page types
- src/content/articles — manually approved Markdown editorial articles
- src/data — content models, project sources and four-language copy
- src/components — project / article reusable pieces and lazy Shader island
- src/styles — responsive design tokens and component rules
- src/scripts — progressive, client-only search
- scripts/keji3 — modular, typed Python publishing safeguards
- tests — unit tests, interactions and screenshot checks
- .github/workflows/deploy.yml — quality-gated static deployment

## Content and localization

Chinese defaults to /, English /en/, Spanish /es/, and Japanese /ja/. Published articles retain stable URLs and translation keys. Missing translations are not synthesized. The search index runs in the browser. The Atom feed and sitemap are generated automatically.

The original long-form articles contain attributed primary references. URL format checks and source link availability are not equivalent to independent factual review. Their original editorial approval state is retained; no new automated AI text is published without human review. Tool listings are documentation-grounded, without unverified prices or performance claims.

## Deployment

A push to main runs all checks and prepares a GitHub Pages artifact. In repository Settings > Pages, change the Source to **GitHub Actions**, otherwise branch-based Jekyll deployment will prevent the Astro site from publishing. Deployment must be verified after the Action run.

## Licensing

The new site code is MIT licensed. Editorial content and third-party materials retain their respective rights. The Shaders npm package (MIT) provides an optional GPU enhancement with a CSS fallback. The Impeccable tool and guidance (Apache-2.0) support visual QA, not production runtime. No commercial Shaders presets are shipped.

## Evidence and remaining limitations

See `docs/QA.md` for actual local mobile Lighthouse measurements, 28 screenshots and 88 multilingual checks. See `docs/ROADMAP.md` for non-blocking editorial and production validation work, and `docs/MIGRATION.md` for old URL decisions. Production deployment is not considered verified until the `main` Actions workflow and live URL both pass.
