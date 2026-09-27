# Cognita 2.0 Access Control Matrix

Status: CURRENT SECURITY DESIGN / PRODUCTION REQUIREMENT
Updated: 2026-09-28

Security model: **DEFAULT DENY + LEAST PRIVILEGE + SERVER-SIDE AUTHORIZATION**.

This document reflects the current account-first Cognita model.

## Current role model

1. **Visitor** — anonymous public-site user.
2. **Account Holder / CEE Participant** — authenticated user who may complete the CEE and view only their own profile/recommendation.
3. **Learner** — enrolled user with access to their own paid pathway and learning records.
4. **CEE / Pathway Reviewer** — authorized human reviewer for ambiguous or challenged CEE recommendations.
5. **Trainer / Facilitator** — reviews assigned learner work and provides feedback where the paid mode requires it.
6. **Learner Support** — handles support cases with the minimum context required.
7. **Enrollment / Billing Operator** — handles payment/enrollment state where production workflows require human action.
8. **Records / Credential Administrator** — maintains completion and credential records.

The same founder/operator may hold multiple functions during a small pilot, but no role is a bypass role.

## Core production flow

**Create Account → CEE → Profile → Personalized Path → Recommended Offer → Payment → Learning → Evidence → Credential**

Every protected transition must be authorized server-side.

## Access principles

### Visitor
May read public information only.

Must not access:
- account records
- CEE attempts/results
- personalized recommendations
- payment/enrollment records
- learner work
- staff/review tools
- credential administration

### Account Holder / CEE Participant
May access only:
- own profile
- own active CEE
- own CEE result/profile
- own recommended path/offer
- own checkout/enrollment state

Must not set or override:
- scores
- recommendation logic
- protected status fields
- pricing rules
- another user ID
- role/permission fields
- credential status

### Learner
May access only their own:
- enrolled pathway
- lessons
- submissions
- feedback
- support threads
- portfolio evidence
- competency/credential status

Learners may create/update only allowlisted self-service fields and drafts.

### CEE / Pathway Reviewer
May access only the minimum CEE evidence required for assigned reviews.

May:
- review disputed/ambiguous recommendation evidence
- record rationale
- approve an authorized recommendation adjustment

May not:
- alter payment records
- change unrelated learner records
- bypass audit requirements

### Trainer / Facilitator
May access only assigned learner work needed for teaching/review.

May:
- provide feedback
- record PASS/REVISE or equivalent mastery decisions where authorized
- review capstone/evidence

May not receive unrelated payment or private CEE data by default.

### Learner Support
May access identity/contact and case information needed to resolve assigned support requests.

Must not receive raw CEE answers, unnecessary payment data, or private academic notes unrelated to the support case.

### Enrollment / Billing Operator
May access only the minimum account, product, transaction, and enrollment data needed for billing/enrollment administration.

May not alter CEE evidence or academic mastery decisions.

### Records / Credential Administrator
May maintain authorized completion and credential records.

Credential corrections/revocations should be auditable and restricted.

## Protected fields

End-user requests must never directly set protected fields such as:
- role / permissions
- owner ID / user ID where derived from authenticated session
- CEE score
- routing/recommendation decision
- protected competency status
- payment verification status
- enrollment status
- credential status
- staff notes
- audit fields

Use explicit server-side allowlists.

## Production route classes

### Public
- /
- /about
- /founder
- /programs
- /admissions
- /apply
- /how-it-works
- /cee
- /organizations
- /policies
- /privacy
- /terms
- /academic-integrity
- /student-policies
- /institutional-status

### Future authenticated learner routes
- account/profile
- CEE execution
- CEE result/profile
- personalized path
- checkout/enrollment state
- learner app
- credential record

### Future restricted staff routes
- CEE/pathway review
- billing/enrollment operations
- trainer/facilitator review
- learner support
- credential/records administration

## Current repository boundary

The current repository remains frontend-only.

Only public information is production-safe.

The local student-app route may exist in development for product QA, but it is not a production authorization model.

Production must not trust:
- localStorage
- hidden routes
- frontend role flags
- query parameters
- client-provided user IDs
- browser-only workflow state

## Server authorization sequence

For every protected request:
1. Authenticate caller.
2. Resolve trusted role/capabilities.
3. Load target resource server-side.
4. Verify ownership/assignment and workflow state.
5. Validate an allowlisted request schema.
6. Perform only the permitted action.
7. Return only minimum necessary fields.
8. Audit high-impact actions.

Anything not explicitly permitted is denied.
