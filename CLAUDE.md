# Cognita 2.0 — Claude instructions

Use the committed Cognita 2.0 brand system for every visual or website change in this repository. Required sources: `brand/logos/`, `brand/code/cognita-brand.css`, `brand/code/tokens.json`, `brand/code/brand.js`, `src/brand-runtime.css`, and `brand/README.md`.

Do not recreate or reinterpret the logo. Do not introduce a dark-first public identity. The default system is light institutional: white and soft gray surfaces, deep navy authority, with controlled indigo, violet, and cyan accents.

Canonical student lifecycle: application → human admissions review → email CEE invitation → one persistent 70-minute CEE session with integrity guardrails → evaluator review → pass/fail email → program selection → payment confirmation → account activation → student learning app.

Public routes are `/` and `/apply`. The CEE must remain invitation-only. `/programs`, `/payment`, `/account-setup`, and `/app` must remain gated by prior lifecycle state. The former `/learner` route must not be restored as a pre-enrollment account surface. `/operations/admissions` is a local QA simulator only, never a production staff portal.

Cognita remains frontend-only until it is genuinely ready to onboard real students. Do not add Supabase, paid backend infrastructure, server authentication, transactional email, payment processing, evaluator backends, or cloud learner records unless a later task explicitly moves the product into launch readiness. Browser-local email events are simulations only. Never imply delivery or server submission. Never store passwords in localStorage.

Preserve admissions gates, CEE scoring, timer behavior, assessment content, evaluator-review requirement, integrity logging, local persistence, enrollment order, and student-app access gates unless a task explicitly changes institutional policy.
