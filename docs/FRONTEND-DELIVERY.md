# Cognita frontend delivery

Scope: complete the useful frontend without payments or other backend services. Original admissions policy is unchanged.

## Working local interactions
- Application preparation: seven steps, local notes, review, editing, export. No submission or applicant registration.
- Student home: next uncompleted practice unit, goal, counts linked to local activity.
- Eight public practice units: module overview, reading, example, task, reflection, check with explanatory feedback, project link, next unit, bookmarks.
- Projects: brief, workspace, evidence, reflection, completeness check, up to ten revision snapshots, exports.
- Progress: per-capability practice and draft activity, explicitly separate from assessed mastery.
- Notes: create, search, export. Bookmarks: save/remove from lessons and browse.
- Study plan: goal, hours, days, local persistence, export.
- Library: query/format filtering and four downloadable resources.
- Portfolio: collect and export local project drafts; no publication.
- Workspace backup: export and validated restore, with explicit replacement acknowledgment.
- Instructor demonstration: fictional roster, search, detail, sample submission, rubric feedback, validated review export. No message delivery or grade award.
- Institution demonstration: fictional cohort and report export. No real client data.
- Administration demonstration: operating views and local content drafting/export. No publishing, permissions changes, or payments.
- Career worksheet and fixed study guidance: usable without external services; no AI API or job promises.

## Prepared service states
CEE attempts/results, admission decisions, payment/confirmation, account authentication/recovery, grades, assessed credentials, completion, live sessions, mentor bookings, community/inbox, and notifications have explicit unavailable/empty states. They do not imply backend functions exist. Multiple addresses represent views of the same system, not separate fully operational services.

## Architecture
`src/AppRoutes.jsx` is the importable route tree; `src/main.jsx` mounts it. `src/frontend/routes.jsx` groups role-oriented views. Workspace state is versioned and validated in `src/frontend/state.js`. `WorkspaceContext.jsx` isolates browser persistence/export helpers. No backend URL, token, secret, or privileged real record is added.

The earlier public one-lesson `/classroom` sample remains available. The broader practice path begins at `/learn` and `/classroom/applied-ai`. The privately prepared paid-course kit is distinct from these public introductory units; this delivery does not claim the paid program is unlocked.

## Backend integration contracts
Replace local persistence with authorized APIs without treating browser state as authority.
- Applications: draft/review/submit endpoints, versioned notices, validation, authorized approval.
- CEE: invitation/attempt/response/submit/result endpoints with server time, validated bank, approved scoring, retake eligibility.
- Enrollment: versioned offer and agreement, verified payment events, activation.
- Learning: enrollment-scoped content, lesson events, versioned submissions, authorized rubric reviews, mastery decisions.
- Operations: role and institution scope on every request, immutable audit trail, human review/appeal routes.
- Publishing: draft/review/publish permissions and revision history.
- Credentials: approved criteria, issuance, revocation, minimal verification data.

Use loading, empty, validation, permission-denied, stale-write, and retry states. Official submission success must come from a durable server acknowledgement. Make payment and submission events idempotent.

## Validation
`npm run check` runs unit tests, route rendering/link coverage, production build and bundle security checks. Route rendering validates the React tree and internal destinations; it is not evidence of browser layout or click behavior. See FRONTEND-ROUTES.json for generated coverage.

Browser visual testing remains blocked: Vercel preview requires sign-in; the cloud browser also rejects file:// previews. No protection setting was weakened. Mobile layouts are implemented but not certified from browser screenshots.

## Publication
Changes are prepared in PR #9. A successful preview build does not mean the primary domain is updated. No main-branch merge or production release is implied.
