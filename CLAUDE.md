# Cognita 2.0 — Claude instructions

Before changing programs, website copy, admissions language, learning pathways, credentials, or learner experience, read `docs/COGNITA-2.0-SOURCE-OF-TRUTH.md`, `docs/WEBSITE-CONTENT.md`, and `src/data/programs.js`.

Active Cognita 2.0 model:
- Admissions + CEE first.
- AI-00 is a foundation bridge assigned through readiness evidence, not a normal commercial program choice.
- Cognita Professional AI Program is the flagship guided route: 10 weeks, cohort-based, mentor-supported, with up to 4 weeks of foundation adjusted by readiness and a 6-week specialization.
- Cognita Skills Lab: Applied AI Foundations and Professional Practice is the self-paced route: 28 days recommended, 32–40 hours estimated, eight modules plus capstone/professional defense.
- Guided and self-paced delivery differ in structure, not in competency standard.
- Do not invent pricing, credentials, academic thresholds, or launch-ready courses that are not approved.

Use the committed Cognita 2.0 brand system for every visual or website change in this repository. Required sources: `brand/logos/`, `brand/code/cognita-brand.css`, `brand/code/tokens.json`, `brand/code/brand.js`, `src/brand-runtime.css`, and `brand/README.md`.

Do not recreate or reinterpret the logo. Do not introduce a dark-first public identity. The default system is light institutional: white and soft gray surfaces, deep navy authority, with controlled indigo, violet, and cyan accents.

Canonical student lifecycle: application → human admissions review → email CEE invitation → one persistent 70-minute CEE session with integrity guardrails → evaluator review → pass/fail email → readiness/pathway guidance where applicable → program selection → payment confirmation → account activation → student learning app.

Public routes are `/` and `/apply`. The CEE must remain invitation-only. `/programs`, `/payment`, `/account-setup`, and `/app` must remain gated by prior lifecycle state. The former `/learner` route must not be restored as a pre-enrollment account surface. `/operations/admissions` is a local QA simulator only, never a production staff portal.

The learner-facing pathway model is Foundation Required, Foundation Accelerated, or Direct Track Entry. Exact thresholds are not yet approved. Do not silently change current CEE scoring or placement logic until an explicit academic-policy task approves the thresholds.

Cognita remains frontend-only until it is genuinely ready to onboard real students. Do not add Supabase, paid backend infrastructure, server authentication, transactional email, payment processing, evaluator backends, or cloud learner records unless a later task explicitly moves the product into launch readiness. Browser-local email events are simulations only. Never imply delivery or server submission. Never store passwords in localStorage.

Preserve admissions gates, CEE scoring, timer behavior, assessment content, evaluator-review requirement, integrity logging, local persistence, enrollment order, and student-app access gates unless a task explicitly changes institutional policy.
