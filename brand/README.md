# Cognita Brand System

This directory is the canonical source-controlled implementation of the current Cognita identity.

## Brand platform

**Formal name:** The Cognita Institute of Artificial Intelligence  
**Primary wordmark:** COGNITA  
**Primary promise:** Human potential amplified by AI.  
**Supporting line:** Real skills. Real Guidance. A more capable Philippines.  
**Learning framework:** THINK. APPLY. TRANSFORM.

## Art direction

Cognita uses a **matte holographic institutional system**: premium academic authority combined with restrained AI-era depth.

The visual language is cinematic and future-facing without becoming cyberpunk, gaming-like, glossy, or synthetic. Matte navy architecture, frosted glass planes, luminous blue intelligence layers, brushed warm-gold accents, precise serif typography, and disciplined negative space should create the feeling of a serious AI institute building capability for the Philippines.

### Core visual rules

- Use matte, low-sheen surfaces rather than glossy plastic or chrome.
- Use layered frosted holographic panels for depth and controlled overlap.
- Keep glow diffused and restrained. Avoid neon overload.
- Warm gold is a precision accent, not a dominant fill.
- Deep navy and midnight blue establish authority and depth.
- Ivory/light sections provide breathing room. The website should not be all-dark or all-white.
- Primary digital hero art should not rely on people, generic stock photography, robots, or AI faces.
- The Philippines may be used as a meaningful visual anchor when relevant.
- Do not publish invented social proof, learner counts, placement rates, mentor counts, or other unverified metrics.
- Avoid decorative UI that implies functionality or institutional claims that do not exist.

## Canonical palette

- Deep Navy — `#0B1F3B`
- Midnight Blue — `#102A56`
- Luminous Blue — `#3B82F6`
- Ivory — `#F8FAFC`
- Cool Gray — `#94A3B8`
- Warm Gold — `#D4AF7C`

Deep Navy, Midnight Blue, and Ivory carry most surfaces. Luminous Blue is reserved for intelligence, interaction, and holographic illumination. Warm Gold signals opportunity, human potential, and premium institutional detail.

## Typography

- Display / editorial headlines: **Tiempos Headline** where licensed and available.
- Display fallback: Georgia or another approved high-contrast serif.
- Body / UI: **Inter**.
- Do not commit or distribute proprietary font files in this repository.

## Brand attributes

- Intelligent
- Human-centered
- Premium
- Practical
- Credible
- Progressive

## Logo usage

The current logo is a **wordmark-only identity**. Do not reintroduce the superseded icon system.

- Default: navy COGNITA wordmark on Ivory/white.
- Dark application: white wordmark on Deep Navy or Midnight Blue.
- Keep the stylized `A` intact.
- Maintain generous clear space.
- Do not stretch, redraw, add an icon, apply bevels, add glow directly to the logo, or recolor individual letters.
- The formal descriptor `INSTITUTE OF ARTIFICIAL INTELLIGENCE` may sit beneath the wordmark in institutional applications.

## Matte hologram recipe

A holographic panel should feel like frosted optical glass, not transparent plastic:

- Surface opacity: approximately 8–18%
- Backdrop blur: approximately 18–36px
- Border: 1px cool-white/blue at low opacity
- Reflection: broad, diffused, low intensity
- Bloom: localized, never full-panel
- Gold edge/light: optional and sparse
- Shadow: architectural and soft
- Overlap: intentional, with clear foreground/midground/background hierarchy

## Page balance

Use contrast deliberately:

- High-impact hero and CEE moments may use Deep Navy / Midnight Blue.
- Program, admissions, policy, and long-form information may use Ivory/light surfaces.
- Avoid an entirely dark page and avoid an overexposed all-white page.
- Holographic depth should be strongest near the hero and become quieter as the page becomes more academic and informational.

## Repository contents

- `logos/` — approved wordmark reference asset
- `code/tokens.json` — machine-readable brand tokens
- `code/brand.js` — JavaScript brand export
- `code/cognita-brand.css` — CSS variables and reusable brand primitives
- `code/preview.html` — coded brand preview
- `reference/APPROVED-DIRECTION.md` — detailed art-direction rules for design and engineering

This brand package is the design source of truth. Product/application runtime styles should only be migrated to it deliberately and must not be assumed updated merely because the brand kit changes.
