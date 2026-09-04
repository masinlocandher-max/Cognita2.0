# Cognita 2.0 repository instructions

## Brand is mandatory

Every website, landing page, learner surface, prototype, redesign, generated component, and deployment created from this repository must use the Cognita 2.0 brand system already committed here.

Canonical implementation sources:

- `brand/README.md` — usage rules
- `brand/logos/` — official logo assets
- `brand/code/cognita-brand.css` — design tokens and reusable brand utilities
- `brand/code/tokens.json` — machine-readable tokens
- `brand/code/brand.js` — JavaScript brand constants
- `src/brand-runtime.css` — website-wide runtime application layer

Do not redraw, approximate, regenerate, or replace the Cognita logo. Use the existing SVG assets.

The default public identity is light, professional, academic, human, and technology-forward. White and soft gray should carry most surfaces. Deep navy is the primary authority color. Indigo, violet, and cyan are controlled accents. Do not revert the public website to a dark-first tech-startup aesthetic.

Formal institutional name: `The Cognita Institute of Artificial Intelligence`.

Brand essence: `Human Intelligence. Amplified.`

Learning framework: `THINK. APPLY. TRANSFORM.`

## Functional protection

Brand and UI work must not casually alter the CEE scoring model, assessment content, learner-data model, local persistence, routing, progression rules, or other functional behavior. Treat those systems separately from the visual identity unless a task explicitly requires functional changes.

## Implementation rule

The application entry point must continue to load the canonical brand token layer and `src/brand-runtime.css`. Any future framework migration or site rebuild must port these tokens and official SVGs before new visual work is considered complete.
