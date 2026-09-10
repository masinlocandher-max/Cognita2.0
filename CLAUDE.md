# Cognita 2.0 — Claude instructions

Use the committed Cognita 2.0 brand system for every visual or website change in this repository. Required sources: `brand/logos/`, `brand/code/cognita-brand.css`, `brand/code/tokens.json`, `brand/code/brand.js`, `src/brand-runtime.css`, and `brand/README.md`.

Before changing institutional copy, admissions, CEE, programs, learner journey, curriculum presentation, student policy, credentials, or internal operations, also read:
- `docs/COGNITA-2.0-SOURCE-OF-TRUTH.md`
- `docs/COGNITA-2.0-ACADEMIC-INSTITUTIONAL-v1.0-PROVISIONAL.md`
- `docs/V1-SOLO-OPERATOR-MODEL.md`
- `docs/PUBLIC-WEBSITE-BOUNDARY.md`
- `docs/WEBSITE-CONTENT.md`
- `docs/CEE-PURPOSE-AND-INTEGRITY.md`
- `src/data/programs.js`

## Source precedence and policy status

`docs/COGNITA-2.0-SOURCE-OF-TRUTH.md` is the current LOCKED institutional/program architecture.

`docs/PUBLIC-WEBSITE-BOUNDARY.md` is the current LOCKED public-site behavior while production backend systems are unfinished. It governs how the public site presents admissions, programs, contact, and backend-dependent actions without changing the underlying production lifecycle.

`docs/COGNITA-2.0-ACADEMIC-INSTITUTIONAL-v1.0-PROVISIONAL.md` is the full Day-1 academic and operational handbook draft. Do not treat a PROVISIONAL rule as LOCKED merely because it appears detailed or institutional.

Policy states:
- `LOCKED` — approved for implementation/use
- `PROVISIONAL` — working rule pending approval, pilot evidence, legal/commercial review, or launch readiness
- `NOT YET APPROVED` — unresolved; do not invent or publish as policy
- `SUPERSEDED` — replaced by a later approved version

## Public institutional website rule

The public Cognita website is an institutional information website, not the student classroom and not a startup/SaaS landing page.

It should look like a credible modern private learning institution: restrained white and soft-gray surfaces, deep navy authority, controlled indigo/violet/cyan accents, editorial hierarchy, thin rules, factual copy, disciplined spacing, limited radii, and minimal shadows.

Avoid excessive glows, glassmorphism, bento grids, fake metrics, decorative status pills, internal workflow jargon, oversized startup-style hero treatment, and speculative claims.

Public routes:
- `/`
- `/programs`
- `/apply`

`/programs` is public for information browsing. Program selection remains gated by a passing admission decision.

During the current frontend-only phase, `/apply` is a public Admissions information/contact page. It must not pretend to submit a server-side application. Official application and intake inquiries route to:
- `info@thecognitainstitute.com` — primary
- `cognitainstituteofai@gmail.com` — alternate

The browser-local application simulator is internal only at `/operations/apply-preview`.

Unknown or unavailable public routes should render the Cognita assistance fallback with one-click email access to the official addresses. Do not leave generic 404s, blank pages, inert “coming soon” controls, or fake forms.

The CEE remains invitation-only. Invalid or missing CEE access must direct the visitor to official Cognita contact options and the public admission process.

Do not expose `/app`, `/operations`, `/operations/apply-preview`, `/operations/admissions`, or `/operations/learning` in public navigation.

## Canonical student lifecycle

Production lifecycle: application → human admissions review → email CEE invitation → one persistent 70-minute CEE session with integrity guardrails → evaluator review → pass/fail email → academic pathway recommendation → program selection → payment confirmation → account activation → student learning app.

The current public `/apply` email-routing surface is a temporary frontend presentation choice while the real admissions backend is unfinished. It does not change the production lifecycle.

The former `/learner` page has been removed and must not be restored as a pre-enrollment account surface.

## Compliance rule

Cognita is positioned as a private, non-degree training institution. Do not claim CHED recognition, TESDA registration/accreditation, TESDA National Certificates or Certificates of Competency, PRC recognition/licensure, degree equivalency, or government approval unless the applicable authority has actually been obtained and is verifiable.

Before real enrollment, Cognita must resolve whether its Day-1 offerings fall within a TESDA-regulated TVET category requiring UTPRAS program registration. Do not assume that describing a TVET course as a “private/non-accredited certificate” removes a registration requirement.

Do not introduce facial-recognition attendance or other invasive biometric monitoring without explicit approval, necessity, privacy review, and legal basis.

## V1 solo-operator rule

Cognita V1 is designed to be operable by one founder/operator for a deliberately small pilot intake.

The same person may perform these functions:
- Founder / Institutional Lead
- Admissions Reviewer
- CEE Evaluator
- Trainer / Facilitator
- Student Support Lead
- Records and Enrollment Administrator

Do not represent these as separate employees when they are not. Preserve the functions as separate workflows and recorded decisions even when one person performs all of them.

Core principle: **One operator. Separate functions. Recorded decisions. No invented staff.**

The Founder Operations Console at `/operations` should identify the next human action and organize work across admissions, CEE/evaluation, enrollment/payment, training/facilitation, academic records, and student support.

Do not create lifecycle bypasses just because the same operator controls multiple roles. Before material scale, formal appeals, serious integrity cases, credential disputes/revocation, and significant complaints should gain an independent second-review mechanism.

Cognita remains frontend-only until it is genuinely ready to onboard real students. Do not add Supabase, paid backend infrastructure, server authentication, transactional email, payment processing, evaluator backends, or cloud learner records unless a later task explicitly moves the product into launch readiness. Browser-local email events are simulations only. Never imply delivery or server submission. Never store passwords in localStorage.

Preserve admissions gates, CEE scoring, timer behavior, assessment content, evaluator-review requirement, integrity logging, local persistence, enrollment order, student-app access gates, and solo-operator separation-of-functions unless a task explicitly changes LOCKED institutional policy.

## CEE purpose and integrity rule

The CEE must never be presented merely as a barrier, anti-cheating mechanism, or pass/fail quiz. Cognita uses it to understand the learner's actual readiness, identify strengths and gaps, and support appropriate placement such as Foundation Required, Foundation Accelerated, or Direct Track Entry once final academic thresholds are approved.

CEE screens should explain purpose before enforcement. Applicants should understand that an honest result is more useful than an artificially high result because unauthorized assistance can place them into a learning pathway that does not match their actual needs.

Required core message:

**The CEE is not designed to catch learners out. It is designed to understand them accurately.**

Before the integrity pledge, clearly encourage applicants to answer wholeheartedly, independently, and without unauthorized help. Explain that Cognita does not expect everyone to know everything before entering and that honest evidence helps the institution provide the right level of support.

Do not use threatening or adversarial integrity language. Integrity safeguards should be framed as protecting the learner, fairness, academic standards, and the credibility of Cognita credentials.

The provisional academic handbook contains pilot scoring/placement bands. These are not final policy. Do not silently change the active CEE scoring logic or publish those bands as guaranteed admission rules without explicit approval.

## Program architecture

The two primary learner routes are:

1. **Cognita Professional AI Program** — 10-week guided, cohort-based, mentor-supported flagship route.
2. **Cognita Skills Lab: Applied AI Foundations and Professional Practice** — self-paced, project-based, assessment-driven route with a 28-day recommended rhythm and 32–40 estimated learning hours.

AI-00 is a foundation bridge assigned through readiness evidence and evaluator judgment. It is not a normal commercial program card.

The provisional handbook provides the current week-by-week 10-week curriculum draft. It may be used to build curriculum prototypes or internal academic views, but do not present it as finally approved if the UI/document explicitly distinguishes LOCKED from PROVISIONAL content.

Core operating principle: **Guided when you need structure. Flexible when you need freedom. The standard remains the same.**

## Credential and pricing protection

Do not invent tuition, discounts, refund rules, government-recognition language, or credential names.

The provisional recommended Day-1 credential is `Cognita Certificate of Completion`, subject to final approval. Avoid `Certificate of Competency` because that wording can be confused with TESDA's official CoC terminology.

Historical prices from older Cognita documents remain reference material only.
