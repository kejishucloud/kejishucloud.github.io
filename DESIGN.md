# KeJiShuCloud — Design system / Edition 02

**Visual direction:** independent, globally-oriented technology editorial with an airy, premium, high-legibility interface.
**Status:** the previous dark-emerald / lime design was rejected and replaced on `main`.
**Design guidance:** [Impeccable](https://github.com/pbakaus/impeccable) (Apache-2.0) informs hierarchy, whitespace, interaction, accessibility and craft. It is not an on-page framework.

## 1. Non-negotiable principles

- **No green palette.** No dark emerald panels, lime accents, or green shaders.
- **Light-first.** Most reading surfaces use soft ivory/white, deep ink headlines, cobalt controls and generous whitespace.
- **Editorial, not dashboard.** Design for explaining sophisticated ideas; do not fabricate metrics or render a sea of tiny cards.
- **Asymmetrical, considered composition.** One clear hero, anchored orbital visual, different-topic surfaces, horizontally rhythmical editorial lists, and reading pages without distracting decoration.
- **Real content first.** Decorative effects are isolated and optional. Unavailable WebGPU must never prevent reading or navigation.
- **Global-ready.** Proper Chinese, Japanese, Spanish and English line wrapping, readable font sizes and locale-consistent navigation.

## 2. Color tokens

| Purpose | CSS token | Value |
| --- | --- | --- |
| Canvas | `--bg` | `#f8f9fc` |
| Paper | `--paper` | `#ffffff` |
| Ink | `--ink` | `#10182c` |
| Midnight surfaces | `--navy` | `#111b35` |
| Main accent / focus | `--accent` | `#3659f5` |
| Hover accent | `--accent-hover` | `#2546d4` |
| Body secondary | `--muted` | `#667087` |
| Structural borders | `--line` | `#e6e9f1` |
| Blue-tinted panel | `--pale-blue` | `#edf2ff` |
| Lavender-tinted panel | `--pale-violet` | `#f3f0ff` |

Do not introduce fluorescent greens or revert to the removed palette.

## 3. Typography and rhythm

- **Headings:** Plus Jakarta Sans, with Chinese/Japanese/Spanish platform fallbacks.
- **Body:** DM Sans, appropriate locale fallbacks. Fonts fail gracefully when Google Fonts cannot be loaded.
- Large hero headlines are `clamp(49px,5.25vw,85px)` on desktop and scale down at mobile sizes.
- Comfortable article body: 18px desktop with a max measure around 760px, 16px mobile.
- Site max width: 1320px, with fluid side margins. Avoid unnecessarily narrow fixed columns.
- All body and label text must remain readable at 320px without horizontal overflow.

## 4. Component decisions

**Header:** clean white masthead with cobalt monogram, inline navigation at wide widths, accessible collapsible menu at <=1140px.

**Hero:** generous typography left and blue orbital illustration right, with CSS visual fallback and low-opacity optional Shaders WebGPU ambient gradient. The illustration contains no required information.

**Topic grid:** four larger editorial destinations, deliberately mixed midnight/blue/soft blue/lavender tones. Use large titles and meaningful descriptions, never microscopic dense labels.

**Reading paths:** cool-white section with a sticky section introduction and legible link rows. Avoid repeating card patterns.

**Long-form:** readable typographic column, citation links, publication metadata, and stable references. No decorative backgrounds under prose.

**Manifesto:** one dramatic dark-navy editorial statement near the footer, not four equal-height empty blocks.

**Search:** high-contrast input and controls, a non-JavaScript fallback list, and safe DOM-only result rendering.

## 5. Responsive and accessibility contract

- Desktop: up to 1320px content width, balanced 2-column hero.
- Tablet <=1140px: condensed navigation and locale selector, with no-JS menu fallback.
- Small tablet <=860px: stack the hero, remove sticky sidebar.
- Mobile <=640px: all primary grids become single column; 18px side gutters; no horizontal overflow.
- Keyboard focus visible, semantic navigation, contrast checked to WCAG 2.2 AA where possible.
- Respect `prefers-reduced-motion`, minimum 44px interaction targets wherever possible.
- JS must remain progressive enhancement only.
- Review real Safari/Chromium/Firefox screenshots before any future major art direction change.

## 6. Graphics and licensing

[Shaders](https://github.com/shader-effects-inc/shaders) MIT-licensed open-source JS engine is only a **decorative** enhancement. The site uses a version-pinned, lazy WebGPU gradient and a complete CSS fallback. The commercial presets and assets on shaders.com are not assumed to be open licensed.

## 7. Acceptance checklist

1. No previous green design colors in runtime template, CSS or shader code.
2. Hero copy, visual illustration and first topic section are comprehensible at desktop, tablet and mobile.
3. The four-language site and article routes retain readable hierarchy and navigation.
4. Search and source references remain functional.
5. CI validates Jekyll, all localized routes, Atom feed, and article pages.
6. Pages deploys successfully from `main`.
7. Manually review full-page screenshots at desktop and mobile, including GPU-disabled behavior.
