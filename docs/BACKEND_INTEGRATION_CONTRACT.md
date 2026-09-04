# Cognita 2.0 — Backend Integration Contract

What the frontend expects when the backend arrives. Written now, while the
interface is being built, so the data model is a decision rather than an
accident of whatever the first API returns.

Nothing in this document is implemented. There is no Supabase project, no
server, no authentication, no payment provider and no email delivery behind this
build.

## Integration principle

Every read and write already goes through `src/repositories/`. Connecting the
backend means replacing the body of those functions. If a change to persistence
requires editing a component, the seam was drawn in the wrong place.

All repository functions are already async and already surface loading and error
states through `useAsync`.

## Entities

Ids are prefixed and generated client-side today (`src/lib/id.js`). Local
records carry ids that can be migrated rather than regenerated.

### `learners`
| Field | Type | Notes |
| --- | --- | --- |
| `id` | `lnr_*` → uuid | Becomes the Supabase Auth user id |
| `reference` | text | Human-facing learner reference (`CGN-2026-0001`) |
| `full_name` | text | |
| `email` | citext, unique | Auth identity |
| `municipality` | text | |
| `created_at` / `updated_at` | timestamptz | |

### `applications`
`id` · `learner_id` → learners · `status` (`not_started` \| `draft` \| `ready` \| `submitted`) · `answers` jsonb · `started_at` · `submitted_at`

Field definitions live in `APPLICATION_FIELDS` (`admissionsRepository.js`) and
should move to a `application_questions` table when the form becomes editable by
staff.

### `cee_attempts`
| Field | Type | Notes |
| --- | --- | --- |
| `id` | `cee_*` | |
| `learner_id` | fk | |
| `exam_version` | text | `CEE v1.0` |
| `questionnaire_version` | text | **Critical.** Attempts are scored only against the questionnaire they were taken on |
| `answers` | jsonb | question id → option index |
| `applied` | jsonb | task id → response text |
| `started_at` / `submitted_at` | timestamptz | |
| `objective_points` | int | 0–70 |
| `scores` | jsonb | per-section correct, percentage, points |
| `placement` | jsonb | preliminary placement code and copy |
| `acknowledged_integrity` | bool | Independent-work acknowledgment |

**Scoring must move server-side.** Client-side scoring puts the answer key in
the JavaScript bundle. See `docs/cee-v1-scoring-guide.md`.

### `evaluations`
`id` · `attempt_id` · `learner_id` · `status` (`pending_review` \| `in_review` \| `reviewed` \| `placement_issued`) · `assigned_to` → staff · `rubric` jsonb (criterion id → score) · `notes` text · `decision` (placement code) · `opened_at` · `completed_at`

Rubric criteria are defined in `src/mock/evaluations.js` and documented in
`docs/cee-v1-scoring-guide.md`. Task 1 is five criteria of 0–3; Task 2 is
3/4/3/3/2. Total applied score is 30.

### `placements`
`id` · `learner_id` · `attempt_id` · `code` · `preliminary` bool · `issued_by` → staff · `issued_at`

A preliminary placement is derived from the objective profile. A final placement
is an evaluator act and must never be written by the client.

### Curriculum — `programs`, `courses`, `modules`, `lessons`, `assessments`
Currently authored content in `src/mock/programs.js` and
`src/mock/assessments.js`. The shapes are stable; see `learningRepository.js`
for the hydration the UI expects (a program returns nested courses → modules →
lessons in one call).

Module personalization fields — `required_for`, `optional_for`, `waived_for`
(arrays of placement codes) — drive the personalized pathway and must survive
the migration.

### `lesson_progress`
`learner_id` · `lesson_id` · `opened_at` · `completed_at` · `checks` jsonb
(knowledge check id → response, correct, answered_at)

### `assessment_attempts`
`id` · `learner_id` · `assessment_id` · `status` · `responses` jsonb ·
`result` jsonb · `submitted_at`

`result` separates `auto_points` from `held_for_review_points`. These must never
be summed into a single mark before a human has read the written work.

### `certificates`
`credential_id` (public, e.g. `CGN-AI00-7F3K2M`) · `definition_id` · `learner_id` · `state` (`not_earned` \| `eligible` \| `issued` \| `revoked`) · `issued_at` · `revoked_reason`

## Service functions the frontend already calls

| Repository | Functions |
| --- | --- |
| `learnerRepository` | `getCurrentLearner` · `saveLearner` · `clearLocalIdentity` |
| `admissionsRepository` | `getApplication` · `saveApplicationDraft` · `submitApplication` · `deriveApplicationStatus` |
| `ceeRepository` | `listAttempts` · `getAttempt` · `getActiveAttempt` · `getLatestSubmittedAttempt` · `countSupersededAttempts` · `createAttempt` · `saveAttempt` · `isCurrentQuestionnaire` · `attemptStatus` |
| `placementRepository` | `getPreliminaryPlacement` · `listIssuedPlacements` · `recordIssuedPlacement` |
| `learningRepository` | `listPrograms` · `getProgram` · `getCourse` · `getModule` · `getLesson` · `getProgress` · `markLessonOpened` · `markLessonComplete` · `saveKnowledgeCheck` · `getModuleOverrides` |
| `assessmentRepository` | `listAssessments` · `getAssessment` · `getKnowledgeCheck` · `listAttemptsFor` · `getOrCreateAttempt` · `saveAssessmentAttempt` · `scoreAssessment` |
| `evaluatorRepository` | `listEvaluations` · `getEvaluation` · `getEvaluationByAttempt` · `saveEvaluationDraft` · `discardLocalEvaluation` · `queueCounts` |
| `certificateRepository` | `listCertificateDefinitions` · `listLearnerCertificates` · `verifyCredential` |
| `adminRepository` | `getOverview` · `queryCollection` · `list*Rows` (learners, applications, exams, evaluations, placements, curriculum, enrollments, certificates, announcements, staff) |

`queryCollection` already accepts `{ search, searchFields, filters, sort, page,
pageSize }` and returns `{ rows, total, page, pageCount, pageSize }` — the shape
a paginated endpoint should return.

## Status models

Defined once in `src/lib/status.js`. The backend should use the same string
values as enum types rather than inventing parallel vocabulary.

## Security boundaries for the backend to enforce

The frontend enforces none of this today, and must not be trusted to.

1. **CEE scoring and the answer key** belong on the server. The key must not be
   sent to the client.
2. **Placement thresholds** must not be exposed before submission.
3. **Evaluator rubrics** must be readable only by staff roles.
4. **Row-level security**: a learner reads only their own records. Evaluators
   read attempts assigned to them. Admin roles are scoped by function.
5. **Final placement** is written only by an evaluator action, never derived
   client-side.
6. **Credential verification** is a public read of a minimal projection — name,
   program, state, issue date. Nothing else.
7. **Staff routes** (`/staff`, `/admin`) currently have no access control. They
   are `noindex` and unlinked, which is obscurity, not security.
8. **The Student Portal gate must become real authentication.** Today `/portal`
   holds a device-local session (`sessionRepository.js`) that separates the
   public website from course material in the interface. It protects nothing.
   The backend must gate `/portal/*` on an authenticated session with an active
   enrollment, and serve course material only to students entitled to it.
9. **Enrollment status becomes an authorization fact**, not display data. A
   learner without an active enrollment must not receive course content from the
   API, regardless of what the client requests.

## Capabilities to add, and what currently stands in for them

| Capability | Current state | Where it plugs in |
| --- | --- | --- |
| Authentication | Device-local profile, no password | `learnerRepository` |
| Portal access | Device-local session, no enforcement | `sessionRepository` |
| Database | `localStore.js` | All repositories |
| File storage | `SubmissionPlaceholder` accepts a link and says so | `assessmentRepository` |
| Email | Contact page shows an address instead of a form | New `notificationRepository` |
| Payments | Enrollment has no button and explains why | New `enrolmentRepository` |
| Certificate issuance | Eligibility computed; issuance absent | `certificateRepository` |
| Analytics | None | Route-level hook in `AppRoutes` |

## Behaviours that are local-only today

Every one of these is stated in the interface where a user could otherwise
assume more:

- Learner records, applications, exam attempts and progress live in one browser.
- Student Portal access is a device-local session; it is separation in the
  interface, not access control.
- Application submission reaches nobody.
- Applied CEE responses are not sent to an evaluator.
- Evaluator rubric scores and notes are local drafts.
- Admin performs no mutations.
- Certificates are not issued and credential lookup reads sample records.
- Clearing browser data destroys the record with no backup.
