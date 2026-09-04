# Cognita 2.0 — Frontend Institutional Milestone

The Cognita Institute of Artificial Intelligence public website, admissions flow, Cognita Entrance Exam, enrollment sequence, and student learning-app shell.

## Brand system — mandatory

The Cognita 2.0 brand system committed in this repository is the visual source of truth for every website implementation, redesign, prototype, generated component, or deployment, regardless of whether the work is done with Codex, Claude, Copilot, Lovable, Replit, another AI builder, or manual development.

- Official logos: `brand/logos/`
- Brand rules: `brand/README.md`
- Canonical CSS tokens: `brand/code/cognita-brand.css`
- Machine-readable tokens: `brand/code/tokens.json`
- JavaScript constants: `brand/code/brand.js`
- Active website application layer: `src/brand-runtime.css`
- Agent/tool instructions: `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`

Do not redraw, regenerate, reinterpret, or replace the Cognita logo. The public identity is light, professional, academic, human, and technology-forward: white and soft gray dominate; deep navy is the primary authority color; indigo, violet, and cyan are controlled accents.

Formal institutional name: **The Cognita Institute of Artificial Intelligence**  
Brand essence: **Human Intelligence. Amplified.**  
Learning framework: **THINK. APPLY. TRANSFORM.**

## Cost and infrastructure rule

Cognita 2.0 remains intentionally frontend-only through product completion, simulation, and QA.

Do not add paid backend infrastructure, Supabase, server authentication, transactional email, payment processing, evaluator backend, or cloud learner records until Cognita is genuinely ready to accept real students.

Frontend screens must never imply that browser-local records were actually transmitted, emailed, reviewed, paid, or authenticated.

## Canonical institutional process

The student lifecycle is sequential and must not be bypassed:

1. **Application / registration**
   - Applicant submits the Cognita admissions form.
   - Submission does not grant CEE or student-app access.

2. **Admissions review**
   - A human admissions decision comes before the entrance exam.
   - Approved applicants receive a CEE invitation through email in production.
   - Applicants who are not approved receive the appropriate admissions decision through email.

3. **Invitation-only Cognita Entrance Exam**
   - The CEE is not publicly accessible from the institutional website.
   - A valid admissions invitation is required.
   - The assessment uses a persistent 70-minute timer.
   - Refreshing the page does not reset the timer.
   - Window-leave and paste events may be recorded as integrity signals.
   - The candidate accepts an integrity pledge before starting.
   - One invitation represents one assessment session; there is no self-service retake.
   - Time expiry submits the current attempt for review.

4. **Evaluator review and pass/fail release**
   - 70 objective points are automatically scored.
   - 30 applied-response points remain subject to human evaluation.
   - The frontend does not treat the objective score alone as a final institutional decision.
   - Final pass/fail is issued only after evaluator review.
   - In production, the decision is sent through email.

5. **Program selection**
   - Only applicants with a passing CEE decision may continue.
   - Program choice happens after the admissions result, not during initial registration.

6. **Payment**
   - Payment comes after program selection.
   - No price, checkout, payment provider, receipt, or refund logic should be invented before the approved commercial model exists.
   - Production payment must be confirmed before account activation.

7. **Student account activation**
   - Account creation happens only after payment confirmation.
   - The frontend milestone does not collect or store passwords in localStorage.
   - Production account activation will require real secure authentication and email verification.

8. **Student app access**
   - Learning happens inside the Cognita student app, not on the public institutional website.
   - The app contains the enrolled program, lessons, modules, assessments, progress, schedule, notices, and student support once those systems are completed.

## Public and internal surfaces

Public:

- `/` — Cognita institutional website
- `/apply` — admissions application and applicant-status surface

Invitation / enrollment lifecycle:

- `/entrance-exam?invite=...` — approved CEE invitation landing
- `/entrance-exam/start?invite=...` — timed CEE session
- `/programs` — post-pass program selection
- `/payment` — post-selection payment stage
- `/account-setup` — post-payment account activation
- `/app` — enrolled-student learning app

Development-only operations simulator:

- `/operations/admissions` — local admissions/evaluator/payment simulation for QA

The operations route is **not a security boundary**. It has no production authentication because this repository remains frontend-only. It must never be presented as a real staff portal.

The former standalone `/learner` route is intentionally removed from routing. A student-facing account must not exist before enrollment and payment.

## Cognita Entrance Exam model

- Functional English & Communication — 30 points
- AI Foundations — 25 points
- Research & Verification Judgment — 15 points
- Applied Communication & AI Evaluation — 30 points
- Total — 100 points

The objective portion may generate a readiness/placement indication, but final admission is a separate evaluator decision after review of the complete submission.

## Frontend simulation model

Browser-local state currently represents:

- admissions application and status
- local preview email-event log
- CEE invitation code
- timed CEE attempt
- integrity-event log
- objective scoring and placement indication
- evaluator pass/fail decision
- selected program
- payment status
- preview student account activation
- student-app access state

These records exist only on the current browser/device. Clearing browser storage can remove them.

## Production launch boundary

Before accepting real students, Cognita will require at minimum:

- secure backend and database
- role-based admissions/evaluator/admin authorization
- production transactional email
- secure one-time CEE invitation tokens
- server-authoritative exam timing and submission
- protected assessment data and audit records
- approved payment processing and accounting flow
- real authentication and account recovery
- cloud student records and cross-device progress
- student privacy, consent, retention, and institutional policies
- complete curriculum and learning delivery inside the student app

Those systems should be introduced only when the frontend product, curriculum, operations, policies, and student journey are ready for real intake.

## Development

```bash
npm install
npm run dev
```

Build check:

```bash
npm run build
```

A GitHub Actions workflow is configured to build the frontend when Actions run for the repository.

## Branch

Canonical active branch: `main`.

The older `cognita-institute` repository is not the active Cognita 2.0 frontend. Operational concepts may be selectively reused later without restoring the old product architecture or visual system.
