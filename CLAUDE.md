# Cognita 2.0 — Claude instructions

Use the committed Cognita 2.0 brand system for every visual or website change in this repository. Required sources: `brand/logos/`, `brand/code/cognita-brand.css`, `brand/code/tokens.json`, `brand/code/brand.js`, `src/brand-runtime.css`, and `brand/README.md`.

Before changing institutional copy, admissions, CEE, programs, or the learner journey, also read:
- `docs/COGNITA-2.0-SOURCE-OF-TRUTH.md`
- `docs/WEBSITE-CONTENT.md`
- `docs/CEE-PURPOSE-AND-INTEGRITY.md`
- `src/data/programs.js`

Do not recreate or reinterpret the logo. Do not introduce a dark-first public identity. The default system is light institutional: white and soft gray surfaces, deep navy authority, with controlled indigo, violet, and cyan accents.

Canonical student lifecycle: application → human admissions review → email CEE invitation → one persistent 70-minute CEE session with integrity guardrails → evaluator review → pass/fail email → academic pathway recommendation → program selection → payment confirmation → account activation → student learning app.

Public routes are `/` and `/apply`. The CEE must remain invitation-only. `/programs`, `/payment`, `/account-setup`, and `/app` must remain gated by prior lifecycle state. The former `/learner` route must not be restored as a pre-enrollment account surface. `/operations/admissions` is a local QA simulator only, never a production staff portal.

Cognita remains frontend-only until it is genuinely ready to onboard real students. Do not add Supabase, paid backend infrastructure, server authentication, transactional email, payment processing, evaluator backends, or cloud learner records unless a later task explicitly moves the product into launch readiness. Browser-local email events are simulations only. Never imply delivery or server submission. Never store passwords in localStorage.

Preserve admissions gates, CEE scoring, timer behavior, assessment content, evaluator-review requirement, integrity logging, local persistence, enrollment order, and student-app access gates unless a task explicitly changes institutional policy.

## CEE purpose and integrity rule

The CEE must never be presented merely as a barrier, anti-cheating mechanism, or pass/fail quiz. Cognita uses it to understand the learner's actual readiness, identify strengths and gaps, and support appropriate placement such as Foundation Required, Foundation Accelerated, or Direct Track Entry once final academic thresholds are approved.

CEE screens should explain purpose before enforcement. Applicants should understand that an honest result is more useful than an artificially high result because unauthorized assistance can place them into a learning pathway that does not match their actual needs.

Required core message:

**The CEE is not designed to catch learners out. It is designed to understand them accurately.**

Before the integrity pledge, clearly encourage applicants to answer wholeheartedly, independently, and without unauthorized help. Explain that Cognita does not expect everyone to know everything before entering and that honest evidence helps the institution provide the right level of support.

Do not use threatening or adversarial integrity language. Integrity safeguards should be framed as protecting the learner, fairness, academic standards, and the credibility of Cognita credentials.

## Program architecture

The two primary learner routes are:

1. **Cognita Professional AI Program** — 10-week guided, cohort-based, mentor-supported flagship route.
2. **Cognita Skills Lab: Applied AI Foundations and Professional Practice** — self-paced, project-based, assessment-driven route with a 28-day recommended rhythm and 32–40 estimated learning hours.

AI-00 is a foundation bridge assigned through readiness evidence and evaluator judgment. It is not a normal commercial program card.

Core operating principle: **Guided when you need structure. Flexible when you need freedom. The standard remains the same.**
