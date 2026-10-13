# KeJiShuCloud — Global Technology & Practical AI

Independent technology analysis and practical guides to AI at work, agent engineering, and AI tools.

**Site:** https://kejishucloud.github.io  
**Status:** multilingual editorial redesign under review  
**Stack:** Jekyll, Liquid, GitHub Pages, responsive CSS, progressive JavaScript, optional WebGPU shaders.

## Sections
- [Technology signals](https://kejishucloud.github.io/frontier/)
- [AI at work](https://kejishucloud.github.io/ai-work/)
- [AI agents](https://kejishucloud.github.io/agents/)
- [AI tools](https://kejishucloud.github.io/tools/)

Language homes: `/` (zh), `/en/`, `/es/`, `/ja/`. Core topic and about routes are mirrored per language.

## Architecture
- `_layouts/portal.html`: unified home/topic/about layout and SEO alternates.
- `_data/portal.json`: translated UI copy and source-backed starting guides.
- `_pages/portal-*.md`: Chinese topic routes.
- `en/`, `es/`, `ja/`: alternate locales.
- `assets/css/portal.css`: editorial responsive design system.
- `assets/js/portal.js`: progressive navigation and optional MIT-licensed Shaders effect.
- `scripts/validate_portal.py`: structural content validation.

## Work with the site
1. Use a branch and create a PR; do not edit production directly.
2. Edit `_data/portal.json` to update localizations and field guides.
3. Run `python3 scripts/validate_portal.py`.
4. Review the generated Jekyll pages in a browser before merging.

## Planning and standards
- [Transformation roadmap](docs/ROADMAP.md)
- [Product brief](PRODUCT.md)
- [Design system](DESIGN.md)
- [Editorial and localization handbook](docs/EDITORIAL.md)

### External inspiration
[Shaders](https://github.com/shader-effects-inc/shaders) (MIT) for the optional WebGPU engine; [Impeccable](https://github.com/pbakaus/impeccable) (Apache-2.0) for design practices. Their separate hosted platform assets and commercial presets are not copied here.

Legacy Academic Pages content remains until migration/redirect inventory is reviewed. Some demo articles still exist; this PR introduces new primary navigation rather than claiming the entire archive is production-ready.

## License
Repository license: MIT; verify individual content and third-party asset licenses separately.

## Editorial publishing system (live on main)

Approved long-form content lives in `_articles/<language>/<slug>.md` and is automatically included on the homepage, its topic page, four-language search, and the Atom subscription feed.

- Search: `/search/`, `/en/search/`, `/es/search/`, `/ja/search/`.
- Search index: `/search-index.json` (Jekyll-generated, client-only search, no user queries transmitted).
- Atom feed: `/articles.xml` (approved posts only).
- First deep dives: evidence-first research (`ai-work`) and reliable agent architecture (`agents`), with localized versions in all four languages.
- Full article frontmatter: `layout: portal`, `view: article`, `lang`, `topic`, `translation_key`, `content_id`, `title`, `description`, `date`, `updated_at`, `review_status: approved`, `author`, `sources`, and explicit `permalink`.
- Drafts must NOT be set to `review_status: approved` until human source and translation review is complete; use a separate non-published draft directory for work-in-progress.

Validate locally with `python3 scripts/validate_portal.py`; CI runs a true Jekyll build plus the generated output checks in `scripts/validate_build.py`.

Legacy Academic Pages sample posts are preserved for redirect planning; their content is not in the new search index or curated topic collections.
