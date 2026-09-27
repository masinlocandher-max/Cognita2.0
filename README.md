# Cognita 2.0

Cognita is a commercial, private, non-degree professional training and competency-development business.

## Number-one objective

**Generate sustainable revenue and profit.**

Educational quality, learner outcomes, trust, compliance, accessibility, and credibility are operating requirements because they support conversion, retention, referrals, renewals, pricing power, institutional sales, and long-term business value.

## Canonical learner journey

**Create Account → CEE → Learner Profile → Gap Analysis → Personalized Pathway → Learning Mode Recommendation → Paid Offer → Training → Mastery → Portfolio Evidence → Verified Competency Record → Next Paid Path**

CEE = **Cognita Entry & Competency Evaluation**.

Cognita does not primarily ask a learner to browse a large catalog and guess which course to buy.

Cognita assesses first and recommends the path.

## Core positioning

**Stop taking AI courses you may not need.**

**Take the CEE. Discover your AI level. Get the learning path built for you.**

Long-term:
**Don't just learn AI. Prove you can use it.**

## Controlling source files

Read these before changing product architecture, CEE, programs, pricing, legal/privacy, credentials, learner journey, or public copy:

- docs/COGNITA-2.0-SOURCE-OF-TRUTH.md
- docs/COGNITA-2.0-COMMERCIAL-LEGAL-OPERATING-MODEL.md
- docs/CEE-AI00-V2-PATHWAY-OFFER-ENGINE.md
- docs/legal/COGNITA-LEGAL-PRIVACY-ENROLLMENT-PACK-2026.md
- docs/PUBLIC-WEBSITE-BOUNDARY.md
- docs/WEBSITE-CONTENT.md
- AGENTS.md
- CLAUDE.md

Older application-first, invitation-only CEE, pass/fail-first, catalog-first, or prompt-engineering-first documents are superseded.

## CEE profile

CEE uses four layers:

1. Competency Diagnostic
2. Technical Readiness
3. Learner Readiness & Support Profile
4. Goal & Constraint Profile

The Learner Readiness & Support Profile is educational and non-clinical.

It must not be marketed as a psychological examination or used to diagnose mental-health or psychological conditions unless a future regulated service is separately designed with appropriate licensed professionals and compliance.

## Learning depth

- AI Literacy
- Applied AI
- AI Builder
- AI Engineering

## Learning modes

- Self-Paced
- Guided
- Cognita for Organizations

Guided can be the premium recommendation when the learner profile genuinely indicates a need for more structure, accountability, feedback, or facilitation.

Do not secretly vary the price of the same product based on inferred vulnerability, anxiety, desperation, wealth, or willingness to pay.

## Mastery

**Learn → Do → Evaluate → Explain → Remediate → Retry → Master**

Watching lessons or spending time in the platform is not proof of competence.

## Legal positioning

Cognita should be described as a:

**private, non-degree professional training and competency-development provider.**

Do not claim CHED, DepEd, TESDA, PRC, government academic-credit, government certification, accreditation, or licensing status unless actually obtained and specifically applicable.

Before any potentially regulated TVET offering launches, complete a documented legal/compliance determination and required registration where applicable.

## Privacy and profiling

Before production CEE profiling and enrollment, complete the legal/privacy checklist in:
docs/legal/COGNITA-LEGAL-PRIVACY-ENROLLMENT-PACK-2026.md

Key requirements include privacy-by-design, a clear Privacy Notice, profiling disclosure/consent where required, a review route, retention rules, access controls, vendor controls, and secure production records.

## Learner work

Learners retain ownership of original work unless a separate written agreement states otherwise.

Ordinary enrollment does not automatically authorize Cognita to commercially sell learner-created work.

Commercialization requires a separate written agreement.

## Frontend-only development rule

This repository remains frontend-only until secure production backend systems are explicitly approved and implemented.

Do not pretend browser-local simulations are live:
- account registration
- CEE submission
- payment
- authentication
- cloud learner records
- credential issuance

The **product architecture is account-first**, but public UI must remain truthful about what is actually live.

## Brand

Use the committed Cognita brand system:
- brand/README.md
- brand/logos/
- brand/code/cognita-brand.css
- brand/code/tokens.json
- brand/code/brand.js
- src/brand-runtime.css

## Development

npm install
npm run dev

Build:
npm run build

Canonical branch: main
