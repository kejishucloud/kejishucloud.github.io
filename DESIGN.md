# KeJiShuCloud — Design system

This system draws on [Impeccable](https://github.com/pbakaus/impeccable) design guidance (Apache-2.0). The site does not bundle the Impeccable CLI or its proprietary binaries. A developer can opt in with `npx impeccable install` and use the `audit`, `critique`, `harden`, and `polish` passes locally.

## Brand register
- **Direction:** editorial technology journal, authoritative without corporate clichés.
- **Voice:** clear, curious, concrete, sober and non-hyperbolic.
- **Emotion:** deliberate clarity, not AI spectacle.
- **Anti-references:** purple-to-blue SaaS gradients, repetitive nested cards, stock AI imagery, fake dashboard metrics, bounce animations, jargon-only copy.

## Tokens
| Role | Token | Value |
| --- | --- | --- |
| Base background | `--bg` | `#0c1716` |
| Raised panels | `--forest` | `#142821` |
| Primary text | `--cream` | `#f3f4e9` |
| Secondary text | `--muted` | `#b1c4b6` |
| Signal accent | `--accent` | `#d9ff79` |
| Content width | `--width` | `1240px` |
| Headings | `--display` | Space Grotesk with CJK fallback |
| Body | `--body` | DM Sans with CJK fallback |

## Patterns
1. **Navigation**: concise horizontal topic navigation, mobile toggle, language switcher in a real `select`.
2. **Hero**: oversized typographic message, one primary CTA, one secondary CTA, optional ambient shader.
3. **Topic index**: four strong editorial panels rather than a catalog of random small cards.
4. **Reading index**: easy-to-scan rows, categories, summary and deliberate whitespace.
5. **Guides**: claims tied to primary source links and limitations.
6. **Footer**: clear ownership and open repository.

## Accessibility and responsiveness
- Semantic `header`, `nav`, `main`, `article`, `footer`; a skip link and keyboard focus rings.
- Responsive layouts at 1060px and 760px; Japanese and Spanish copy are allowed to wrap.
- No information should exist only in the shader; SVG/animated assets must remain decorative.
- Respect `prefers-reduced-motion`. Keep a CSS-only fallback and avoid WebGPU for unsupported devices.
- Goal: WCAG 2.2 AA for content and controls, verified in a browser before release.

## Shaders integration
- Source: [shader-effects-inc/shaders](https://github.com/shader-effects-inc/shaders); MIT open-source engine.
- Implementation: lazy dynamic import of `shaders@4.0.3/js` and a `LinearGradient` effect in the homepage hero.
- The imported module is a visual enhancement only. It does not block content, navigation, SEO, or any critical interaction.
- Risks: CDN availability, GPU support, energy use and international latency. Before launch, inspect real-browser behavior and consider self-hosting a bundled asset.
- Do not copy paid presets or sections from shaders.com under the open-source MIT grant.
