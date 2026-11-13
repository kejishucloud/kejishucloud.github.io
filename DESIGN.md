# KeJiShuCloud 3.0 — Visual design system

**Art direction:** cinematic signal intelligence; high-contrast typographic research. Deliberate asymmetry, generous spacing, documentation-first content and independent engineering credibility.

## Palette

Deep Space Black: #090D18; Midnight Navy: #111B35; Electric Cobalt: #3659F5; Aurora Violet: #9B8CFF; Mist White: #F8F9FC; Dark Ink: #10182C. No green, neon panels, oversaturated gradients or repetitive glass cards.

## Type and layout

Space Grotesk for Latin display, DM Sans for body, locale-aware Chinese/Japanese fallbacks. A fluid typography scale and viewport-aware gutters apply throughout. Editorial columns do not mimic generic SaaS dashboards.

## Signature chapters

1. Cinematic dark Hero with programmatic orbital graph, optional WebGPU and permanent CSS fallback.
2. Real public source projects with art-directed geometry.
3. Four research fields as a dark technical atlas, with navigable rows and a precise indexing diagram.
4. Source-backed research rows, strong visual hierarchy.
5. Light-silver workflow chapter with explicit validation steps.
6. Creator section with typography-led identity.
7. Strong typographic footer and contact.

Inner pages use differentiated reading, directories and work views. Accessible document structure is available without JavaScript. Animation is minimal and respects reduced motion and hidden tab state.

## Visual release checklist

Verify home / article / tools / projects / about at 1440, 1024, 390, 320. Inspect screenshot typography, orphaned glyphs, interactive focus, Chinese and Spanish wrapping, text contrast, navigational links, search, GPU fallback, sticky or mobile behavior, and cross-language parity. The Impeccable design vocabulary informs critique and polish, not any copied designs.

## Signal Atlas 3.1 — Creative-direction correction (2026-11-13)

The initial visual implementation was rejected as generic and insufficiently technical. The replacement is an art-directed **precision instrument** system, not a palette swap:

- **New cinematic composition:** dark header flows into a two-column Hero with restrained technical microtype, a real vector signal core, and prominent project-first call to action. On phones the figure moves into the flow directly under the headline.
- **Procedural geometry:** `scripts/generate_signal_core.py` renders deterministic 3D sphere projection, orbital curves, calibrated marks and engineered lighting into a self-contained SVG. The asset is deliberately not described as measured or scientific telemetry. On GPU/motion-restricted devices the exact vector figure remains visible without JavaScript.
- **Distinct case-study graphics:** RemoteOps uses a gateway topology, Readify uses editorial document layers, and DepthForge uses point-cloud reconstruction geometry. These are explicitly labeled visual studies, *not actual product screenshots*.
- **Research index:** replaces four generic colored tiles with a structured dark knowledge atlas and navigable rows.
- **Tone:** Silver-blue, cobalt and violet; no green, no fabricated numbers, no indiscriminate glowing borders or recycled card icons.
- **Consistency:** Inside pages use a dark architecture-inspired section masthead. The footer contact link is split into semantic segments to prevent unattractive wraps in long translations.
- **Social imagery:** `scripts/generate_social_og.mjs` composes the same orbital artwork into a 1200x630 OG PNG. Rebuild both original art assets using `npm run art:build`.

### Screenshot critique checklist

At 1440px, first-project titles must remain whole, the Hero artwork must not obscure its text and graphic annotations must remain secondary. At 390px/320px, the core must be visible without horizontal scrolling, the CTA readable and the research rows usable. The four language versions must have zero horizontal overflow. See `docs/QA.md` for the measured outcome.
