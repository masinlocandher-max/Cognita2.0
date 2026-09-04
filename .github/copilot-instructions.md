# Cognita 2.0 Copilot instructions

All frontend code must follow the committed Cognita 2.0 brand system. Use `brand/logos/` for official assets and `brand/code/cognita-brand.css`, `brand/code/tokens.json`, `brand/code/brand.js`, and `src/brand-runtime.css` as canonical implementation sources.

Visual direction: light institutional, academic, human, modern. White and soft gray dominate; deep navy is the primary authority color; indigo, violet, and cyan are controlled accents.

Canonical lifecycle: application → admissions review → email CEE invitation → one persistent 70-minute CEE session with integrity guardrails → evaluator review → pass/fail email → program selection → payment confirmation → account activation → student learning app.

Public routes are `/` and `/apply`. The CEE must remain invitation-only. Keep `/programs`, `/payment`, `/account-setup`, and `/app` gated by lifecycle state. Do not restore `/learner` as a pre-enrollment account surface. `/operations/admissions` is a development-only local simulator, not a secure staff portal.

Cognita remains frontend-only until student-launch readiness. Do not introduce Supabase, server authentication, transactional email, payment processing, evaluator backends, or paid cloud infrastructure unless explicitly requested for launch preparation. Never imply local email events were delivered or local records were submitted to a server. Never store passwords in localStorage.

Do not alter admissions gates, CEE scoring, timer behavior, integrity logging, assessment content, evaluator-review requirement, local persistence, enrollment order, or app-access gates as part of ordinary styling work.
