# Cognita 2.0 Copilot instructions

Before changing programs, website copy, admissions language, learning pathways, credentials, learner experience, or internal operations, read `docs/COGNITA-2.0-SOURCE-OF-TRUTH.md`, `docs/V1-SOLO-OPERATOR-MODEL.md`, `docs/WEBSITE-CONTENT.md`, and `src/data/programs.js`.

Active program architecture:
- Admissions + CEE first.
- AI-00 is a foundation bridge assigned through readiness evidence, not a normal commercial program choice.
- Cognita Professional AI Program is the 10-week guided flagship route.
- Cognita Skills Lab: Applied AI Foundations and Professional Practice is the self-paced route, with a 28-day recommended journey and 32–40 hours estimated learning time.
- Guided and self-paced delivery differ in structure, not in the academic standard required for completion.
- Do not invent unapproved pricing, credential names, placement thresholds, or launch-ready course claims.

All frontend code must follow the committed Cognita 2.0 brand system. Use `brand/logos/` for official assets and `brand/code/cognita-brand.css`, `brand/code/tokens.json`, `brand/code/brand.js`, and `src/brand-runtime.css` as canonical implementation sources.

Visual direction: light institutional, academic, human, modern. White and soft gray dominate; deep navy is the primary authority color; indigo, violet, and cyan are controlled accents.

Canonical lifecycle: application → admissions review → email CEE invitation → one persistent 70-minute CEE session with integrity guardrails → evaluator review → pass/fail email → readiness/pathway guidance where applicable → program selection → payment confirmation → account activation → student learning app.

The learner-facing pathway model is Foundation Required, Foundation Accelerated, or Direct Track Entry. Exact thresholds are not yet approved. Do not silently change current CEE scoring or placement logic until an explicit academic-policy task approves them.

Public routes are `/` and `/apply`. The CEE must remain invitation-only. Keep `/programs`, `/payment`, `/account-setup`, and `/app` gated by lifecycle state. Do not restore `/learner` as a pre-enrollment account surface.

Internal operations routes are `/operations` and `/operations/admissions`. They are development-only local simulations, not secure staff portals. Do not expose them in public navigation.

## V1 solo-operator model

Cognita V1 is designed so one founder/operator can run a deliberately small pilot intake. The same person may serve as Founder / Institutional Lead, Admissions Reviewer, CEE Evaluator, Trainer / Facilitator, Student Support Lead, and Records and Enrollment Administrator.

Do not invent separate employees or departments. Keep those responsibilities distinct in workflow and record-keeping even when one person performs all of them.

Core principle: **One operator. Separate functions. Recorded decisions. No invented staff.**

The Founder Operations Console at `/operations` should identify the next human action and organize work across admissions, CEE/evaluation, enrollment/payment, training/facilitation, academic records, and student support.

Do not create lifecycle bypasses because one operator controls multiple roles. Before material scale, formal appeals, serious integrity cases, credential disputes/revocation, and significant complaints should gain an independent second-review mechanism.

Cognita remains frontend-only until student-launch readiness. Do not introduce Supabase, server authentication, transactional email, payment processing, evaluator backends, or paid cloud infrastructure unless explicitly requested for launch preparation. Never imply local email events were delivered or local records were submitted to a server. Never store passwords in localStorage.

Do not alter admissions gates, CEE scoring, timer behavior, integrity logging, assessment content, evaluator-review requirement, local persistence, enrollment order, app-access gates, or solo-operator separation-of-functions as part of ordinary styling work.
