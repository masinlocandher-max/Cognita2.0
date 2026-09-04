# Cognita 2.0

The Cognita Institute of Artificial Intelligence — public website, admissions,
Student Portal, evaluator workspace and administrative interface, built
frontend-first.

## Product rule for this milestone

Cognita 2.0 is intentionally frontend-only at this stage.

There is no backend, Supabase project, server authentication, evaluator portal,
payment system, email delivery, or cloud learner record connected to this
repository. **The interface must never imply that browser-only data has reached
Cognita.** That rule is enforced in the build, not just in the copy — see
*Honesty rules* below.

## Architecture

```
UI  →  Feature logic  →  Service / Repository layer  →  Local implementation
```

`src/repositories/localStore.js` is the only file that touches browser storage.
No component imports it. Connecting a backend means replacing repository bodies;
nothing above them moves.

Full detail: [`docs/FRONTEND_ARCHITECTURE.md`](docs/FRONTEND_ARCHITECTURE.md).
Data contracts and security boundaries for the backend:
[`docs/BACKEND_INTEGRATION_CONTRACT.md`](docs/BACKEND_INTEGRATION_CONTRACT.md).

```
src/
  app/            routing and the five layout shells
  pages/          one file per route (public, app, learn, staff, admin)
  features/       cee (entrance exam) · assessments (assessment engine)
  components/     status pills, meters, tables, modals, state blocks
  services/       journey, placement, learning-path logic
  repositories/   every read and write, all async
  hooks/          useAsync, learner context, learning context, document meta
  lib/            status enums, ids, formatting
  mock/           curriculum, cohort, attempts, evaluations, credentials
  styles/         tokens, base, components, layout, features
```

## Public website and Student Portal

The most important structural rule in this repository is the separation between
what is public and what is private.

| Surface | Audience | Contains |
| --- | --- | --- |
| **Public website** | Prospective students, parents, professionals, partners, media | Programs, admissions, about, resources, contact |
| **Applicant workspace** (`/apply`) | People going through admissions | Application, entrance exam, readiness profile, placement |
| **Cognita Student Portal** (`/portal`) | Enrolled students | Courses, lessons, assessments, progress, certificates |

Course material exists only under `/portal`, behind the portal entrance. The
public website links *to* that entrance and never past it. Any direct navigation
to a portal URL without a session lands on sign-in.

**This is separation, not access control.** The session is device-local and a
determined visitor can read the bundle. Real enforcement needs authentication and
row-level security — see the backend contract.

## The six product layers

```
PUBLIC INSTITUTE → ADMISSIONS → PLACEMENT → LEARNING → ASSESSMENT → CREDENTIALS
```

All six run under one learner identity, reading the same derived journey state,
so the institution cannot tell a student two different things in two places.

## Routes

**Public** — `/` `/programs` `/programs/:programId` `/admissions`
`/admissions/entrance-exam` `/admissions/apply` `/about` `/resources`
`/resources/:slug` `/contact` `/privacy` `/terms` `/verify` `/verify/:credentialId`

**Applicant** — `/apply` `/apply/profile` `/apply/application`
`/apply/entrance-exam` `/apply/result` `/apply/placement` `/apply/enrollment`

**Student Portal** — `/portal` (entrance) · `/portal/dashboard`
`/portal/program/:programId` `/portal/course/:courseId` `/portal/module/:moduleId`
`/portal/lesson/:lessonId` `/portal/assessment/:assessmentId` `/portal/progress`
`/portal/certificates`

**Internal** (noindex, absent from public navigation) — `/staff`
`/staff/evaluations` `/staff/evaluations/:attemptId` · `/admin` + 15 sections

**Redirects** — `/learner` and `/app/*` → `/apply/*` · `/learn/*` → `/portal/*` ·
`/entrance-exam` → `/admissions/entrance-exam` · `/ai-00` `/ai-01` → program pages

## The Cognita Entrance Exam

CEE v1.0 production questionnaire: 45 objective items (25 communication,
15 AI foundations, 5 research judgment) and 2 applied tasks.

| Area | Points |
| --- | --- |
| Functional English & Communication | 30 |
| AI Foundations | 25 |
| Research & Verification Judgment | 15 |
| Applied Communication & AI Evaluation | 30 |
| **Total** | **100** |

70 objective points are scored automatically. The 30 applied points are reserved
for a human evaluator — open-ended judgment is not reduced to keyword matching.

Attempts are stamped with the questionnaire version they were taken on. An
unfinished attempt from a superseded item set is kept in history but never
resumed or rescored: scoring old answers against a new key produces a confident,
wrong placement, which is worse than asking a candidate to start again.

Formulas, placement bands, applied rubrics and known integrity boundaries:
[`docs/cee-v1-scoring-guide.md`](docs/cee-v1-scoring-guide.md).

## Placement

Placement is developmental, not punitive. There is no pass mark and no pass/fail
result. Six outcomes: AI-01 readiness, AI-00 Communication Foundation, AI-00 AI
Foundations, Full AI-00, Targeted Bridge, Manual Review.

AI-00 is personalized. A module a placement waives is shown as waived rather than
hidden — a learner can see what was skipped on their behalf, and open it anyway.

## Learning environment

Program → course → module → lesson → activity → assessment. Module states are
explicit: required, optional, waived, completed, locked, current. A required
module unlocks when the earlier required modules in its course are complete.

The assessment engine supports nine question types and serves every course.
Objective items are scored on the client; anything marked `reviewedByHuman` is
held for an evaluator, and the result screen reports the two figures separately
rather than inventing a total for work nobody has read.

Lessons marked `outline: true` carry a real structure but not finished
courseware, and the interface says so rather than presenting a stub as a lesson.

## Honesty rules

Encoded in the build, not just written in copy:

- The contact page shows an address instead of a form, because email delivery
  does not exist.
- Enrollment has no button and explains why — enrollment is a cohort place and,
  where applicable, a fee.
- File upload accepts a link and states that storage is not connected.
- The admin interface performs no mutations. A button that persists nowhere is a
  false confirmation.
- Evaluator rubric scores and notes are labeled local drafts.
- Credential verification states that it is a record lookup, not a proof.
- Every learner surface carries the device-local notice.

## Development

```bash
npm install
npm run dev
```

```bash
npm run build     # production build
npm run verify    # questionnaire, scoring and content integrity
```

`npm run verify` fails if the CEE drifts from its approved 45-item shape or
answer key, if scoring or placement stops matching the institutional formulas, or
if the curriculum graph breaks — a module pointing at a missing lesson, a lesson
referencing a renamed knowledge check, a placement that leaves a learner with no
modules, or a status value with no icon. CI runs it before the build.

## Known boundaries

Frontend-only, by design at this stage:

- No authentication; the learner record is device-local with no password.
- Records do not sync between devices, and clearing browser storage destroys
  them with no backup.
- Application submission, exam submission and assessment submission reach nobody.
- Applied responses are not reviewed; no final placement is issued.
- `/staff` and `/admin` have no access control. They are noindex and unlinked,
  which is obscurity, not security.
- The Student Portal gate is a device-local session, not authentication. It
  enforces the separation in the interface, not against a determined visitor.
- The public site publishes no accreditation, recognition, partnership, ranking,
  enrollment figure or graduate outcome, because none has been established.
- Client-side CEE scoring means the answer key is present in the bundle.
- Curriculum is mock content.

These are intentional product boundaries, not hidden production capabilities.
