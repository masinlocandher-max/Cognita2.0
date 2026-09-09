# Cognita 2.0

Cognita 2.0 is the current working repository for The Cognita Institute of Artificial Intelligence.

## Canonical project sources

- `docs/COGNITA-2.0-SOURCE-OF-TRUTH.md` — product and institutional source of truth
- `docs/COGNITA-2.0-ACADEMIC-INSTITUTIONAL-v1.0-PROVISIONAL.md` — detailed academic/institutional planning record
- `docs/PUBLIC-WEBSITE-BOUNDARY.md` — public-site boundary and launch constraints
- `docs/CEE-V1.1-ASSESSMENT-BLUEPRINT.md` — current CEE assessment blueprint
- `brand/README.md` — current source-controlled Cognita brand system

## Brand direction

The current approved identity is the **Matte Holographic Institutional System**.

Primary promise:

> Human potential amplified by AI.

Supporting line:

> Real skills. Real Guidance. A more capable Philippines.

The canonical palette, typography, visual rules, coded tokens, preview, wordmark, and approved references live in `brand/`.

## Current product boundary

The repository remains frontend-first for the current development milestone. Public institutional pages, admissions information, the CEE prototype, evaluator workflow, and private learner experience are represented in the frontend. Production-grade authentication, server-side CEE security/scoring, transactional email, payment infrastructure, and protected learner records must be implemented before real-student production use.

## Public admissions

Current public admissions inquiries use:

- `info@thecognitainstitute.com`
- `cognitainstituteofai@gmail.com`

The email-based inquiry flow is informational and does not represent a production applicant database.

## Development

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Important institutional guardrails

Cognita is presented as a private, non-degree training and learning institution. Do not imply CHED, TESDA, PRC, degree-granting, government-accreditation, or other regulatory status unless that status has actually been obtained and verified.

Do not publish invented learner counts, placement rates, mentor counts, partner counts, outcomes, or other unverified institutional metrics.
