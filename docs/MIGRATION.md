# Migration audit and URL register

## Implementation choice

The old Jekyll / Liquid / Academic Pages runtime is replaced entirely by Astro. A verified Git bundle was created outside the repository before work. The previous commit history remains recoverable via Git. No legacy theme assets, jQuery, Academic Pages content templates or unused academic records ship in the new source tree.

## Content preservation exception

Eight source-backed Markdown articles (two unique titles in four languages) are imported into a validated Astro content collection. The body text, titles, sources, publication dates, canonical article permalinks and translation keys remain unchanged. Historical sample posts, placeholder CV data, academic sample images and demonstration portfolios are excluded.

## Kept routes

All locale core topics are preserved: /, /frontier/, /ai-work/, /agents/, /tools/, /about/ and their /en/, /es/, /ja/ variants. Both approved article paths per language remain stable.

## New routes

Localized /insights/, /projects/, /lab/, /search/, /privacy/. Atom feed: /articles.xml. Search JSON: /search-index.json. GitHub Pages sitemap-index.xml plus Pagefind index.

## Explicit legacy aliases

/blog/ → /insights/
/news/ → /frontier/
/aigc/ → /ai-work/
/algorithm/ → /frontier/
/summarize/ → /ai-work/
/book/ → /insights/

These static hosted redirects are HTML/meta refresh rather than HTTP 301 (not supported by GitHub Pages). The full set of Academic Pages example URLs is intentionally not restored. A full historical backlink audit is still advisable before launch.

## Constraints and outstanding content work

Tools are supported by official documentation, with review dates; no unverified pricing or first-hand test conclusions. Expanding original article breadth, sources checked live and third-party licensing still requires manual editorial review. GitHub Pages repository Source must be configured for Actions-based deployment.
