# KeJiShuCloud — Product brief

## Mission
Make consequential technology understandable and AI useful in real work. Publish independent, evidence-led analysis and repeatable playbooks for a global audience.

## Positioning
An editorial technology destination, not a product catalog, a university CV, or an undifferentiated AI-news aggregator.

## Audiences
1. Knowledge workers evaluating AI productivity and workplace adoption.
2. Developers and builders deploying LLM agents and AI automation.
3. Technology-literate global readers seeking thoughtful analysis over hype.
4. Teams comparing AI products based on tasks, cost, security and jurisdiction.

## Editorial pillars
- **Technology Signals** (`frontier`): model capabilities, compute, open research, governance and material industry shifts.
- **AI at Work** (`ai-work`): writing, research, meetings, spreadsheets, collaboration and automation.
- **AI Agents** (`agents`): planning, tool use, orchestration, memory, evaluation, observability and risk.
- **AI Tools** (`tools`): decision-oriented evaluations, repeatable comparisons, privacy and integrations.

## Reader journeys
- A new visitor selects a topic on the homepage and finds a usable guide within two clicks.
- A practitioner follows an explicit original source, checks limitations and acts with informed judgment.
- A reader changes language and stays on the corresponding topic.
- Readers who disable JavaScript or WebGPU still see the full content and navigate normally.

## Product decisions
- Keep Jekyll + GitHub Pages for the first release: low overhead, static SEO-friendly pages, no user account or personal-data processing.
- Default language: simplified Chinese at `/`; English `/en/`, Spanish `/es/`, Japanese `/ja/`.
- Typography-driven dark editorial interface; subtle Shaders WebGPU enhancement with CSS fallback.
- No paywall, login, tracking personalization, or newsletter database in this release.
- No unverifiable breaking-news claims. Timely reporting is a subsequent editorial capability requiring sourcing and review.

## Non-goals for the first PR
Production-grade CMS, RSS automation, AI summaries of live news, tool price scraping, comments, payment integration, and a React/Next.js rewrite.

## Delivery expectations
The first PR establishes information architecture, localized routes, initial evergreen content, a design system, and automated content checks. Full editorial operations and broader content migration follow the roadmap.
