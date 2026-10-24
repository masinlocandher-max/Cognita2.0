> Frontend implementation update: see FRONTEND-DELIVERY.md and FRONTEND-ROUTES.json for the current implemented views. The older planned-route list below describes system intent; many now have local interactions or explicit service-unavailable states. Backend status is unchanged.

# Cognita digital institution

Updated 24 October 2026. Implements the owner's expanded architecture as shared systems, not 252 independent screens. Admissions follow ADMISSIONS-OWNER-DECISION-2026-10-24.md.

## Critical path
Discover → Apply → Approval for CEE → CEE → Placement → Eligible program → Terms and payment → Enrollment → Student account activation → Orientation → Learn → Practice → Project → Review and revision → Demonstrate competence → Credential → Next pathway.

Account types must distinguish applicants from enrolled students. Accept material commercial terms before charging, not only after payment.

## Five environments
| Environment | Shared systems | Delivery status |
|---|---|---|
| Public institution | Identity, method, program discovery/details, learning modes, institutional solutions, resources, contact, trust | Implemented public information and public sample routes |
| Admissions/enrollment | Application profile, review, approved exam access, timed CEE, placement, offer, cohort, agreements, payment, activation | Process information implemented; secure transaction system pending |
| Student | Home, classroom, practice, project workspace, resources, progress, support | Working introductory sample with browser-local state; full private course remains separate |
| Faculty/institution | Classes, scoped learner records, rubrics, feedback, revision, reporting | Architecture only; no operational console claimed |
| Administration | Admissions, people, curriculum, payments, credentials, content, analytics | Architecture only; server authorization required |

## Implemented route groups
- Institution: /, /about, /mission-vision, /mission, /vision, /values, /cognita-method, /why-cognita, /founder.
- Discovery: /programs (search and mode filter), /programs/applied-ai, /programs/ai-foundations, /ai-foundations, /guided, /self-paced, /pathways, /learning-modes.
- Admissions information: /admissions, /apply, /how-it-works, /admissions/how-it-works, /cee. These do not collect applications or run exams.
- Institutional solutions: /organizations, /for-business, /for-government, /for-schools, /for-organizations.
- Public learning sample: /learn, /classroom, /classroom/lesson, /classroom/workspace, /classroom/resources, /classroom/progress.
- Convenience aliases: /labs → sample lesson, /projects → sample workspace, /progress → sample progress, /resources and /downloads → sample resources. These are not separate full lab/project products.
- Support: /contact, /support, /faq, /help, /accessibility.
- Trust: /credentials, /verify, /assessment-policy, /refund-policy; retained privacy, terms, learner policies, integrity and institutional status. Verification is explanatory only, with no registry or name search.
- Unknown routes: explicit not-found experience.

## Planned route families, not yet implemented
- /apply/*, /application, /admission/*: profile steps, approval, placement, program eligibility.
- /cee/prepare, /cee/instructions, /cee/start, /cee/question/:number, /cee/review, /cee/submit, /cee/result: one server-controlled attempt system, not independent question pages.
- /enrollment/*, /welcome, /onboarding/*: offer, payment, terms, activation and orientation.
- /learn/*, /classroom/:program/module/:module/lesson/:lesson: enrollment-scoped curriculum and resumable learning.
- /labs/*, /assessments/*, /projects/*, /feedback/*, /portfolio/*, /progress/*, /grades: practice and evidence with authorized review.
- /assistant: contextual tutoring with explicit limits around graded submissions. Requires approved AI processing and consent/disclosures.
- /notes/*, /bookmarks, /study-plan, /library/*, /community/*, /live/*, /mentorship/*, /attendance: study and supported delivery.
- /learn/credentials/* (separate from public /credentials), /complete/*, /graduation, /next: evidence-backed completion, credential and progression.
- /opportunities, /career/*: only real, current opportunities and approved career tools.
- /account/*, /inbox/*, /notifications, /support/ticket, /support/tickets/*: identity, communications, billing and cases.
- /teach/*, /manage/*, /admin/*, /institution/*: separate roles and scoped institutional records.
- /courses/*, /skills, /student-work, /stories, /faculty/*, /institutional-programs, /partners, /articles, /research, /events: publish when real approved content exists. Do not fabricate staff, student success, reports or events.
- /login, /register, /forgot-password, /reset-password, /verify-email, /verify-account, /session-expired, /access-denied, /offline, /maintenance, /500: identity and operational states added with actual services. A route label is not an authentication system or offline capability.

## Data model and ownership
Program versions → competencies and prerequisite edges → modules → lessons → activities → knowledge checks → assessment definitions/rubrics → project milestones → credential criteria.

Operational records: applicant, application version, review decision, exam invitation, CEE attempt, immutable response events, placement decision, offer version, agreement acceptance, payment events, enrollment, role membership, lesson activity, draft/submission version, rubric review, feedback, revision, mastery event, credential, revocation, institutional scope, audit event.

Version content and criteria. Enrollments pin a program version. Never overwrite evidence behind an issued credential. Store reading activity separately from reviewed mastery.

## Access boundaries
- Visitor: public content and sample only.
- Applicant: own application and approved attempt only; no answer bank, assessor notes, or other applicants.
- Student: own enrolled content, submissions, feedback, and consented portfolio.
- Instructor: assigned cohorts and submissions; no unrestricted financial or identity records.
- Institutional coordinator: contracted cohort reporting with agreed minimum fields, not all learner records.
- Curriculum editor: draft/publish curriculum; no payment authority by default.
- Administrator: least-privilege operational roles with logged actions. Role checks must run on the server for every privileged action.

## Admissions and assessment invariants
- Application approval is required before CEE invitation.
- 60 items / 60 minutes; timer, attempt eligibility, autosave and submission are server-authoritative.
- Original bands retained. Do not invent thresholds. One retake after four weeks where applicable.
- Duplicate submission/payment callbacks are idempotent.
- No enrollment from an unverified browser payment-success URL.
- No mastery from clicking complete or passing a sample quiz.
- Criterion-level review, feedback, and revision before competency award.
- No credential until approved criteria and reviewer authority are satisfied.

## Learning experience
Understand → See → Try → Do → Reflect → Check → Apply. Each lesson states a purpose, explanation, example, task, feedback, reflection, and next step. Full programs add independent evidence review, remediation, and transfer assessment.

## Commercial and launch gates
Launch one coherent paid pathway before expanding supporting systems. Require approved pricing/access/refund terms, secure identity, validated CEE, payment reconciliation, learner records, assessor capacity, privacy controls, accessible device testing, recovery/backups, and end-to-end evidence from application through credential.

The current build is an institutional website and public learning sample. It is not a launch-ready digital institution. Offline files are downloads, not a service-worker offline platform. Phone layouts are implemented but real-device validation remains required.
