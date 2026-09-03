# Cognita 2.0 — Frontend Architecture

How this codebase is organised, and why. The organising constraint is that the
production backend does not exist yet and the interface must not pretend
otherwise.

## The rule

```
UI  →  Feature logic  →  Service / Repository layer  →  Local implementation
```

Today the local implementation is browser storage and mock curriculum. When the
backend arrives, the repositories change and nothing above them moves:

```
UI  →  Feature logic  →  Same repository interface  →  Production backend
```

**No component imports browser storage.** `src/repositories/localStore.js` is
the only file that touches `localStorage`, and only repositories import it. If a
component ever needs `localStorage`, the seam has been broken.

## Layers

| Layer | Path | Responsibility |
| --- | --- | --- |
| Routing and shells | `src/app/` | Route table, the five layout shells, scroll and focus management |
| Pages | `src/pages/{public,app,learn,staff,admin}/` | One file per route; composition only |
| Features | `src/features/{cee,assessments}/` | Self-contained domain UI — the exam runner, the assessment engine |
| Shared components | `src/components/` | Status pills, meters, tables, modals, state blocks |
| Services | `src/services/` | Cross-repository logic: journey derivation, placement presentation, learning paths |
| Repositories | `src/repositories/` | Every read and write. Async, so the network does not change call sites |
| Hooks | `src/hooks/` | `useAsync`, `useLearnerContext`, `useLearningContext`, document/robots meta |
| Domain model | `src/lib/status.js` | Every status enum and its presentation metadata |
| Mock data | `src/mock/` | Curriculum, cohort, attempts, evaluations, credentials |
| Design system | `src/styles/` | Tokens, base, components, layout, features |

### Why every repository is async

Repositories return promises even though browser storage is synchronous. This is
deliberate: loading and error states are exercised now, in development, instead
of being discovered the day the network appears. `useAsync` gives every data
surface the same four states — loading, error, empty, success.

## Domain model

Status is never assembled from ad-hoc booleans. Every state is a named enum in
`src/lib/status.js` with its label, tone and icon:

`JourneyStage` · `ApplicationStatus` · `AttemptStatus` · `EvaluationStatus` ·
`PlacementCode` · `ModuleState` · `LessonState` · `CertificateState` ·
`EnrolmentStatus` · `AssessmentAttemptStatus` · `QuestionType`

`StatusPill` renders any of them with an icon and a text label, so status never
depends on colour alone.

### Journey derivation

`services/journeyService.js` has one function, `deriveJourney`, which takes the
learner, application, exam attempts and enrolment and returns the stage plus the
single next action. Every dashboard, nav item and call to action reads from it,
so the product cannot tell a learner two different things in two places.

### Personalised learning paths

`services/learningPathService.js` resolves each module to one state given the
learner's placement and progress. Modules a placement waives are shown as waived
rather than hidden — a learner can see what was skipped on their behalf and open
it anyway. Gating rule: a required module unlocks when every earlier required
module in the same course is complete; optional and waived modules never gate.

## The six product layers

```
PUBLIC INSTITUTE → ADMISSIONS → PLACEMENT → LEARNING → ASSESSMENT → CREDENTIALS
```

All six run under one learner identity (`repositories/learnerRepository.js`).
There are no disconnected mini-sites: the public site links into `/app`, `/app`
links into `/learn`, and both read the same journey state.

## Routes

| Surface | Routes |
| --- | --- |
| Public | `/` `/about` `/programs` `/ai-00` `/ai-01` `/admissions` `/entrance-exam` `/contact` `/verify` `/verify/:credentialId` |
| Applicant / learner | `/app` `/app/profile` `/app/application` `/app/entrance-exam` `/app/results` `/app/placement` `/app/enrollment` |
| Learning | `/learn/dashboard` `/learn/program/:programId` `/learn/course/:courseId` `/learn/module/:moduleId` `/learn/lesson/:lessonId` `/learn/assessment/:assessmentId` `/learn/progress` `/learn/certificates` |
| Evaluator (internal) | `/staff` `/staff/evaluations` `/staff/evaluations/:attemptId` |
| Admin (internal) | `/admin` + 15 sections |
| Redirects | `/learner` → `/app`, `/entrance-exam/start` → `/app/entrance-exam` |

Internal surfaces carry `noindex, nofollow` via `useRobots()` and appear in no
public navigation.

## Design system

`src/styles/tokens.css` holds the whole visual vocabulary: an ink scale for
institutional ground, paper for reading surfaces, a slate scale for text, one
accent, and four status tones. Type is a serif display face (Source Serif 4)
against Inter for interface text, with tabular numerals wherever figures are
compared.

Spacing is a 4px scale, radii and elevation are restrained, and motion is used
only for state changes — `prefers-reduced-motion` disables all of it.

## Assessment engine

One engine serves every course (`src/features/assessments/`):

`AssessmentShell` · `QuestionCard` · `ChoiceQuestion` · `WrittenResponse` ·
`SubmissionPlaceholder` · `AssessmentProgress` · `AssessmentResults` ·
`KnowledgeCheck`

Nine question types are supported. Objective types are scored on the client;
anything marked `reviewedByHuman` is never auto-scored, and the results screen
reports the two figures separately rather than inventing a total for work nobody
has read.

The Cognita Entrance Exam is deliberately **not** built on this engine. It is a
separate versioned instrument (`src/features/cee/`) with its own questionnaire,
answer key and integrity check, because a placement instrument should not drift
when someone edits a course assessment.

## Honesty rules encoded in the build

These are architectural, not cosmetic:

- The contact form does not exist, because email delivery does not. The address
  is shown instead.
- Enrolment has no button, because enrolment is a cohort place and a fee.
- File upload accepts a link and says storage is not connected.
- Admin performs no mutations. A button that persists nowhere is a false
  confirmation.
- Evaluator decisions are labelled local drafts.
- Credential verification states that it is a record lookup, not a proof.
- Every learner surface carries the device-local notice.

## Known frontend boundaries

- No authentication. `learnerRepository` is a device-local profile.
- No sync between devices or browsers.
- Client-side CEE scoring means the answer key is present in the bundle. See
  `docs/cee-v1-scoring-guide.md`.
- Curriculum is mock. Lessons marked `outline: true` carry a structure, not
  finished courseware, and the interface labels them.
