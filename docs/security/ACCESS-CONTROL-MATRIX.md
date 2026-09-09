# Cognita 2.0 Access Control Matrix

Status: SECURITY DESIGN / PRODUCTION REQUIREMENT

Security model: **DEFAULT DENY + LEAST PRIVILEGE + SERVER-SIDE AUTHORIZATION**.

This matrix records the roles that already exist in Cognita's product and operating model. It does not create a generic administrator or super-admin role. The current frontend repository has no production authentication backend, so the non-public permissions below are **requirements for the production backend**, not claims about the current browser-local preview.

## Roles discovered

1. **Visitor** — anonymous public website user.
2. **Applicant** — person in the admissions lifecycle.
3. **Student** — enrolled learner with activated student access.
4. **Admissions Officer** — reviews applications and records admissions decisions.
5. **CEE Evaluator** — reviews CEE submissions, applied work, integrity evidence, and final CEE decision.
6. **Enrollment & Payment Operator** — verifies program selection and payment evidence and authorizes account activation.
7. **Trainer / Facilitator** — reviews learner outputs and capstone work and releases academic feedback.
8. **Student Support** — handles learner support requests with only the minimum identity/context needed.
9. **Records Administrator** — maintains enrollment/completion/credential records and approved corrections.

The V1 founder/operator may hold several of these permissions at once, but **Founder is not a bypass role**. Holding multiple responsibilities must not remove per-action authorization checks or audit requirements.

There is currently no product requirement for a generic `admin`, `super_admin`, seller, moderator, or service-account role, so none is added here.

## Access control matrix

| ROLE | RESOURCE | READ | CREATE | UPDATE | DELETE | SPECIAL ACTIONS |
|---|---|---|---|---|---|---|
| Visitor | Public institutional pages, program descriptions, admissions information, CEE information, policies, founder page, institutional status | Yes | No | No | No | May initiate an email using published contact links |
| Visitor | Applications, CEE attempts, enrollment, payment, student records, support, staff consoles | No | No | No | No | None |
| Applicant | Own application | Own record only | Own application only | Only explicitly allowed applicant fields before lock/final submission | No self-delete unless policy explicitly permits | Submit application, view own status |
| Applicant | Own CEE invitation/session | Own invitation/session only | No direct invitation creation | Own answers during active session only | No | Start one authorized session, submit own attempt |
| Applicant | Other applicants' records | No | No | No | No | None |
| Applicant | Enrollment/payment state | Own record only after eligibility | Program selection only when server confirms eligibility | Only permitted selection fields | No | Request official payment instructions when eligible |
| Student | Own account/profile | Own record only | No duplicate account creation | Allowlisted self-service fields only | No direct account delete unless formal process exists | Manage own profile/preferences |
| Student | Own learning record, submissions, capstone, portfolio | Own records only | Own submissions/support requests | Own drafts/resubmissions where state permits | No deletion of institutional review history | Submit work, resubmit when revision is permitted |
| Student | Own support requests | Own tickets only | Yes | Add permitted follow-up content only | No | View support responses |
| Student | Other students' records | No | No | No | No | None |
| Admissions Officer | Application records | Assigned/current intake applications only | No applicant impersonation | Admissions-review fields only | No routine delete | Approve/decline application, trigger server-generated CEE invitation |
| Admissions Officer | CEE answers/scoring | Status/metadata only unless separately granted evaluator role | No | No scoring without evaluator permission | No | Cannot release CEE evaluation unless also authorized as evaluator |
| CEE Evaluator | CEE submission, applied responses, integrity signals, minimum applicant identity | Assigned attempts only | Evaluation record | Evaluation fields only while decision is open | No | Score applied tasks, record rationale, release pass/fail decision according to policy |
| CEE Evaluator | Payment/account configuration | No | No | No | No | None |
| Enrollment & Payment Operator | Eligible enrollment record, minimum applicant identity, payment evidence/status | Assigned records only | Payment verification record if needed | Payment/enrollment status fields only | No | Confirm/reject payment evidence, authorize account activation |
| Enrollment & Payment Operator | CEE answer content | No | No | No | No | May rely on final eligibility decision, not raw exam answers |
| Trainer / Facilitator | Enrolled learner identity needed for teaching, assigned learning submissions, progress, capstone | Assigned learners only | Feedback/review records | Academic review fields only | No deletion of learner evidence/audit history | PASS/REVISE outputs, review capstone, release feedback |
| Trainer / Facilitator | Admissions statement/payment secrets | No | No | No | No | None |
| Student Support | Learner identity/contact context and assigned support thread | Assigned support records only | Support responses | Support status/response fields only | No | Respond/escalate support issue |
| Student Support | CEE answers, payment details, academic review notes unrelated to support | No | No | No | No | None |
| Records Administrator | Enrollment, completion, credential and approved record-correction data | Authorized institutional records only | Official record entries when required | Approved record-maintenance fields only | Restricted, exceptional, audited only | Issue/verify/correct institutional records according to policy |
| Records Administrator | User roles/security configuration | No by default | No | No | No | Role/security changes require a separately approved security-administration capability if Cognita ever introduces one |

## Field-level restrictions

Client-supplied payloads must never be allowed to set protected fields unless the endpoint is explicitly authorized for that exact field. At minimum, applicant/student self-service endpoints must reject:

- `role`
- `roles`
- `permissions`
- `is_admin`
- `owner_id`
- `user_id` when ownership is derived from the session
- `application_id` when ownership is derived from the session
- `payment_status`
- `verification_status`
- `admission_status`
- `cee_decision`
- `objective_score`
- `evaluator_score`
- `credential_status`
- `account_status`
- internal notes
- audit fields

Use explicit allowlists per endpoint rather than blocklists alone.

## Production route classification

### PUBLIC

- `/`
- `/about`
- `/founder`
- `/programs`
- `/programs/professional-ai-program`
- `/programs/skills-lab`
- `/admissions`
- `/apply` while it remains informational/email-based
- `/cee`
- `/organizations`
- `/policies`
- `/privacy`
- `/terms`
- `/academic-integrity`
- `/student-policies`
- `/institutional-status`

### AUTHENTICATED / OWNERSHIP-RESTRICTED IN THE FUTURE

These must not become production-live until backed by trusted server-side identity and resource authorization:

- applicant status/application record
- invitation-only CEE session
- payment/enrollment status
- account activation
- student app

### ROLE-RESTRICTED / ADMINISTRATIVE IN THE FUTURE

- admissions review
- CEE evaluation
- payment confirmation
- learning/facilitation review
- student-support handling
- records administration

### DEVELOPMENT-ONLY IN THE CURRENT REPOSITORY

- `/entrance-exam`
- `/entrance-exam/start`
- `/payment`
- `/account-setup`
- `/app`
- `/operations`
- `/operations/apply-preview`
- `/operations/admissions`
- `/operations/learning`

Production builds must deny these routes until a server-side authorization layer exists.

## Server authorization rule

For every protected request, the server must determine authorization from the trusted authenticated session/token. Never accept a frontend-supplied user ID, role, owner ID, application ID, student ID, or record ID as proof of permission.

Required decision shape:

1. Authenticate the caller.
2. Resolve server-trusted roles/capabilities.
3. Load the target resource without exposing it to the client first.
4. Verify role + action + resource ownership/assignment + current workflow state.
5. Validate an allowlisted request schema.
6. Execute the minimum permitted operation.
7. Return the minimum permitted fields.
8. Audit privileged/high-impact actions.

Anything not explicitly permitted is denied.
