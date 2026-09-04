# Cognita 2.0 repository instructions

## Brand is mandatory

Every website, admissions surface, student surface, prototype, redesign, generated component, and deployment created from this repository must use the Cognita 2.0 brand system already committed here.

Canonical sources: `brand/README.md`, `brand/logos/`, `brand/code/cognita-brand.css`, `brand/code/tokens.json`, `brand/code/brand.js`, and `src/brand-runtime.css`.

Do not redraw, approximate, regenerate, or replace the Cognita logo. The public identity is light, professional, academic, human, and technology-forward. White and soft gray carry most surfaces; deep navy is the primary authority color; indigo, violet, and cyan are controlled accents.

Formal institutional name: `The Cognita Institute of Artificial Intelligence`.
Brand essence: `Human Intelligence. Amplified.`
Learning framework: `THINK. APPLY. TRANSFORM.`

## Canonical institutional lifecycle

Do not bypass or reorder this sequence:

1. Applicant submits `/apply`.
2. Human admissions review occurs before CEE access.
3. Approved applicants receive an invitation-only CEE through email in production.
4. CEE uses one persistent 70-minute session, integrity acknowledgement, integrity-event logging, and timeout submission.
5. Objective scoring is not the final admission decision. Applied responses require evaluator review.
6. Final pass/fail is released after review and communicated through email in production.
7. Only passing applicants may choose a program.
8. Payment comes after program selection.
9. Student account activation comes only after payment confirmation.
10. Learning happens inside `/app`, separate from the public institutional website.

The former standalone `/learner` route must not be restored as a pre-enrollment student account surface.

## Surface boundary

Public surfaces:
- `/`
- `/apply`

Invitation/enrollment surfaces:
- `/entrance-exam?invite=...`
- `/entrance-exam/start?invite=...`
- `/programs`
- `/payment`
- `/account-setup`
- `/app`

`/operations/admissions` is a development-only local simulator, not a production staff portal or security boundary.

Do not publicly expose the raw CEE without an approved invitation. Do not expose the student app before enrollment/account activation.

## Frontend-only operating rule

Cognita 2.0 remains frontend-only until the product, curriculum, operations, and policies are genuinely ready to onboard real students. Do not add paid backend infrastructure, Supabase, server authentication, transactional email, payment processing, evaluator backend, or cloud learner records unless a later task explicitly moves the product into launch readiness.

Browser-local records and email logs are simulations only. Never imply they were actually transmitted, delivered, reviewed, paid, or authenticated.

Do not collect or store passwords in localStorage.

## Functional protection

Brand/UI work must not casually alter admissions gates, CEE scoring, assessment content, timer behavior, integrity logging, evaluator-review requirement, local persistence, enrollment sequence, or app-access gates.

The application entry point must continue loading the canonical brand token layer and `src/brand-runtime.css`.
