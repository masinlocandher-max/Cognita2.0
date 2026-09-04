# Cognita 2.0 — Frontend Architecture

How this codebase is organized, and why. The organizing constraint is that the
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
`EnrollmentStatus` · `AssessmentAttemptStatus` · `QuestionType`

`StatusPill` renders any of them with an icon and a text label, so status never
depends on colour alone.

### Journey derivation

`services/journeyService.js` has one function, `deriveJourney`, which takes the
learner, application, exam attempts and enrollment and returns the stage plus the
single next action. Every dashboard, nav item and call to action reads from it,
so the product cannot tell a learner two different things in two places.

### Personalized learning paths

`services/learningPathService.js` resolves each module to one state given the
learner's placement and progress. Modules a placement waives are shown as waived
rather than hidden — a learner can see what was skipped on their behalf and open
it anyway. Gating rule: a required module unlocks when every earlier required
module in the same course is complete; optional and waived modules never gate.

## Three audiences, three surfaces

The most important structural rule in this codebase is the separation between
the public website and the private Student Portal.

| Surface | Audience | Contains |
| --- | --- | --- |
| **Public website** | Prospective students, parents, professionals, partners, media | Programs, admissions, about, resources, contact. No course material. |
| **Applicant workspace** (`/apply`) | People going through admissions | Application, entrance exam, readiness profile, placement |
| **Cognita Student Portal** (`/portal`) | Enrolled students | Courses, lessons, assessments, progress, certificates |

Course content exists only under `/portal`, behind the portal entrance. The
public site links *to* the entrance and never past it — `scripts` and the
browser checks in the QA pass both verify this. `PortalLayout` redirects any
direct navigation to a portal URL back to sign-in when no session exists.

**This is separation, not access control.** The session is device-local; a
determined visitor can read the bundle. Real enforcement requires
authentication and row-level security, recorded in the backend contract.

## The six product layers

```
PUBLIC INSTITUTE → ADMISSIONS → PLACEMENT → LEARNING → ASSESSMENT → CREDENTIALS
```

All six run under one learner identity (`repositories/learnerRepository.js`).
There are no disconnected mini-sites: the public site leads into `/apply`,
`/apply` leads to the portal entrance, and all of them read the same derived
journey state.

## Routes

| Surface | Routes |
| --- | --- |
| Public | `/` `/programs` `/programs/:programId` `/admissions` `/admissions/entrance-exam` `/admissions/apply` `/about` `/resources` `/resources/:slug` `/contact` `/privacy` `/terms` `/verify` `/verify/:credentialId` |
| Applicant | `/apply` `/apply/profile` `/apply/application` `/apply/entrance-exam` `/apply/result` `/apply/placement` `/apply/enrollment` |
| Portal entrance | `/portal` — sign-in; the only public-facing portal route |
| Student Portal | `/portal/dashboard` `/portal/program/:programId` `/portal/course/:courseId` `/portal/module/:moduleId` `/portal/lesson/:lessonId` `/portal/assessment/:assessmentId` `/portal/progress` `/portal/certificates` |
| Evaluator (internal) | `/staff` `/staff/evaluations` `/staff/evaluations/:attemptId` |
| Admin (internal) | `/admin` + 15 sections |
| Redirects | `/learner` `/app/*` → `/apply/*` · `/learn/*` → `/portal/*` · `/entrance-exam` → `/admissions/entrance-exam` · `/ai-00` `/ai-01` → program pages |

Internal surfaces carry `noindex, nofollow` via `useRobots()` and appear in no
public navigation.

## Design system

`src/styles/tokens.css` holds the whole visual vocabulary: an ink scale for
institutional ground, paper for reading surfaces, a slate scale for text, the
brand blue-to-violet luminous gradient, and four status tones. Type is a serif
display face (Source Serif 4) against Inter for interface text, with tabular
numerals wherever figures are compared.

`src/styles/public.css` carries the institutional website: hairline rules and
numbered section markers do the structural work, the luminous gradient appears
once or twice per page, and motion is limited to a reveal on scroll that is
applied by JavaScript and disabled under `prefers-reduced-motion`. Every public
layout is designed to read correctly with all motion removed.

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

- The public site publishes no accreditation, recognition, partnership, ranking,
  enrolment figure or graduate outcome, because none has been established. The
  About page says so explicitly rather than leaving the absence to be noticed.
- Program study loads are labelled indicative, and the advanced pathway is shown
  as in development rather than described as if it were teachable today.
- The contact form does not exist, because email delivery does not. The address
  is shown instead.
- Enrollment has no button, because enrollment is a cohort place and a fee.
- File upload accepts a link and says storage is not connected.
- Admin performs no mutations. A button that persists nowhere is a false
  confirmation.
- Evaluator decisions are labeled local drafts.
- Credential verification states that it is a record lookup, not a proof.
- Every learner surface carries the device-local notice.

## Verification

`npm run verify` runs three checks before the build:

| Script | Guards |
| --- | --- |
| `verify-cee.mjs` | The entrance exam's item shape, answer key, scoring formulas and placement bands |
| `verify-content.mjs` | The curriculum graph, placement reachability, assessment definitions and status metadata |
| `verify-voice.mjs` | The institutional voice: forbidden marketing language, rationed words, Student Portal naming, American spelling, and that no public page publishes a placement threshold |

The voice check exists because a copy rule that is only written down gets broken
quietly. It reads visible copy from `src/pages/public`, `src/content` and the
public layout, ignoring identifiers, routes and comments.

## Known frontend boundaries

- No authentication. `learnerRepository` is a device-local profile.
- No sync between devices or browsers.
- Client-side CEE scoring means the answer key is present in the bundle. See
  `docs/cee-v1-scoring-guide.md`.
- Curriculum is mock. Lessons marked `outline: true` carry a structure, not
  finished courseware, and the interface labels them.
