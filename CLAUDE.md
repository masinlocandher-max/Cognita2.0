# Cognita 2.0 — Claude instructions

Use the committed Cognita 2.0 brand system for every visual or website change in this repository.

Required sources:
- `brand/logos/` for the official SVG logo assets
- `brand/code/cognita-brand.css` for canonical design tokens
- `brand/code/tokens.json` and `brand/code/brand.js` for machine-readable values
- `src/brand-runtime.css` for the active website brand layer
- `brand/README.md` for usage rules

Do not recreate or reinterpret the logo. Do not introduce a dark-first public identity. The default system is light institutional: white and soft gray surfaces, deep navy authority, with controlled indigo, violet, and cyan accents.

Public/student boundary:
- `/` is the public institutional website.
- `/learner`, `/entrance-exam`, and `/entrance-exam/start` are internal frontend student/admissions routes during the current build phase.
- Do not expose those internal routes in the public global navigation, footer, or homepage calls to action unless explicitly requested.
- Public copy may explain readiness, placement, AI-00, and the learning model without directly launching the CEE or learner workspace.

Cognita remains frontend-only until it is ready to onboard real students. Do not add Supabase, paid backend infrastructure, server authentication, evaluator systems, payments, or cloud learner records unless a later task explicitly moves the product into student-launch readiness.

Preserve CEE scoring, assessment content, learner data, local persistence, progression, and routing unless the requested task explicitly changes functionality.
