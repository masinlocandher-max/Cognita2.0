# Cognita 2.0 Security Audit — 2026-09-10

Scope: repository `masinlocandher-max/Cognita2.0`, current frontend-only architecture.

Required model: **DEFAULT DENY + LEAST PRIVILEGE + SERVER-SIDE AUTHORIZATION**.

## Executive finding

Cognita's public institutional website can be kept public, but the repository does **not** yet contain a production authentication/authorization backend. The current admissions, CEE, enrollment, payment, account, learner, evaluator, support, and staff workflows are browser-local simulations built on `localStorage` and client-side route/UI checks.

That means these workflows are not safe for real users, real applicant records, real payments, real assessment decisions, or real student records.

This hardening pass changes the production frontend to **default deny** all private/transactional/internal preview routes. Production builds now include only the explicit public route allowlist. A CI security check fails if known internal preview state, staff consoles, privileged mutations, CEE question-bank markers, or common secret markers appear in `dist/`.

This is a containment fix, not a substitute for a secure backend.

## 1. Roles discovered

Roles/capabilities already present in the product or operating model:

- Visitor
- Applicant
- Student
- Admissions Officer
- CEE Evaluator
- Enrollment & Payment Operator
- Trainer / Facilitator
- Student Support
- Records Administrator

The founder may perform multiple roles during the solo-operator pilot, but Founder is not treated as an authorization bypass. No generic admin, super-admin, seller, moderator, or service-account role is introduced because the current product does not require one.

See `docs/security/ACCESS-CONTROL-MATRIX.md`.

## 2. Protected resources discovered

Protected or future-protected resources include:

- applicant identity and contact information
- application statement and admissions status
- admissions review notes
- CEE invitation code/token
- CEE attempt, objective answers, applied responses, timing and integrity signals
- CEE scoring/evaluation and evaluator notes
- program selection and enrollment state
- payment status/reference/evidence
- student account state
- learner profile and settings
- learning progress
- submissions and portfolio evidence
- facilitator feedback
- capstone work and evaluation
- support requests and staff responses
- completion/credential records
- email-event/audit-like records

## 3. Authorization vulnerabilities

### Critical — no trusted backend authorization

The current protected workflow state is read and changed entirely in browser JavaScript. Any user who can alter `localStorage`, execute JavaScript in the browser, or inspect/call client functions can manipulate the state that controls admissions, exam access, payment, account activation, and learning access.

Examples found in current code:

- `approveApplication()` changes an applicant to `approved_for_cee` client-side.
- `decideCee()` records pass/fail client-side.
- `confirmPayment()` changes payment to confirmed client-side.
- `activatePreviewAccount()` grants student preview access client-side.
- `hasStudentAppAccess()` trusts browser-local account/enrollment state.
- learning review PASS/REVISE decisions are written client-side.

These are valid only as explicitly labeled development simulations.

### High — internal routes were directly registered in the SPA

Before this hardening pass, the production route table registered `/operations`, `/operations/admissions`, `/operations/learning`, `/app`, `/payment`, `/account-setup`, and the CEE execution routes. Hiding them from navigation did not protect them.

Fix implemented: these routes are now development-only and are not registered by a normal production build.

## 4. Cross-user data access vulnerabilities

There is no real multi-user backend yet, so cross-user IDOR cannot be meaningfully tested against a server.

However, the current model provides **no production ownership enforcement**. Ownership is effectively “whatever is in this browser's localStorage.” If these client patterns were connected directly to shared data without server checks, they would create serious IDOR/cross-user risk.

Production must derive ownership from authenticated identity, not request parameters. Examples requiring ownership/assignment checks:

- application
- CEE attempt
- enrollment/payment record
- student account
- submissions
- capstone
- support requests
- portfolio/credential records

## 5. Privilege escalation vulnerabilities

### Critical in preview architecture

A browser user can change workflow state values or invoke client functions to simulate privileged actions. There is no server-trusted role source.

Potential preview escalations include:

- self-approving an application
- forging/setting a CEE invite state
- changing CEE result state
- marking payment confirmed
- activating a student account
- writing facilitator feedback
- changing capstone review state

These are contained from production route availability by this hardening pass, but they remain intentionally possible in local development preview code.

## 6. Database / RLS weaknesses

No Supabase or other production database is currently connected to this repository.

Therefore:

- there are no tables to audit for RLS yet
- there are no current SELECT/INSERT/UPDATE/DELETE policies to validate
- there is no service-role key in this frontend repository to assess

Before any real applicant/student data is stored, every user-accessible table must use explicit RLS or equivalent backend authorization. Broad `USING (true)` policies are prohibited for private records.

Minimum future policy expectations:

- applicants/students can read only their own records
- staff reads are limited by role and assignment/function
- protected status/score/payment/role fields cannot be written by end users
- service-role credentials remain server-only
- sensitive operations use server functions with independent authorization checks

## 7. Storage access weaknesses

No production object-storage bucket is currently connected.

Future buckets must be classified PUBLIC / AUTHENTICATED / PRIVATE / ADMIN-ONLY. Applicant files, learner work, assessment evidence, identity documents, payment evidence, and credential records must not use discoverable permanent public URLs.

Private downloads/uploads/replace/delete operations require ownership or role checks and should use signed URLs or authorized server access as appropriate.

## 8. API authorization weaknesses

No production API/server-function layer exists in the current repository.

This is the main unresolved security gap. The private workflows cannot become real until APIs enforce:

- authentication
- role/capability checks
- resource ownership/assignment
- workflow-state checks
- request schemas and field allowlists
- rate limits where appropriate
- minimum-field responses
- audit logging for privileged actions

Frontend routes and client functions must never be treated as the authorization boundary.

## 9. Admin / staff security weaknesses

The current Founder Operations Console, Admissions Operations, and Learning Review are explicitly browser-local simulators with no authentication. They display or change sensitive workflow information when local preview records exist.

Hardening implemented: these interfaces are development-only in the production route table.

Before any staff interface becomes live it requires:

- secure staff authentication
- server-side role verification per request
- short-lived/session validation
- explicit permission per action
- audit logging for admissions decisions, exam decisions, payment changes, record changes, exports, suspensions/deletions if introduced
- no direct database-console equivalent exposed to ordinary staff

## 10. Sensitive fields unnecessarily exposed

In the local preview, the browser contains full applicant/learner state including:

- full name
- email
- mobile
- location
- education
- applicant statement
- review notes
- CEE invite code
- exam answers/responses
- integrity events
- scores/placement
- payment status/reference
- learning submissions
- profile data
- support requests
- facilitator feedback

That is acceptable only for a local development simulation and must not become the production response model.

Production APIs should return only fields needed by the current screen/function. For example, a facilitator should not receive payment details or the applicant's full admissions statement merely because they are staff.

## 11. Fixes implemented in this hardening pass

1. **Production route default deny**
   - Sensitive/internal routes are loaded only when `import.meta.env.DEV` is true.
   - Normal production builds expose only the explicit public route allowlist.

2. **Protected code is dynamically separated from the production graph**
   - CEE execution, evaluator, payment, account activation, student app, founder console, admissions operations, and learning review are development-only dynamic imports.

3. **Program enrollment mutation is development-only**
   - The public Programs page no longer statically imports admissions mutation/state code.
   - Program selection simulation is dynamically loaded only in development.

4. **Production bundle leakage test**
   - `scripts/security-check.mjs` scans `dist/` and fails on known preview state keys, privileged consoles/actions, CEE question-bank markers, internal execution routes, and common secret markers.

5. **CI enforcement**
   - GitHub Actions now runs `npm run security:check` after the production build.

6. **Access-control model documented**
   - `docs/security/ACCESS-CONTROL-MATRIX.md` defines the least-privilege target for the roles and resources Cognita actually uses.

## 12. Tests performed / required

### Tests performed by this change

- production build via repository CI
- production bundle scan for internal preview state and privileged UI markers
- production bundle scan for CEE question-bank prompt markers
- production bundle scan for common server-secret markers
- route-table review confirming protected routes are DEV-only
- review of the browser-local admissions, evaluation, learner, and learning-state mutation functions
- review of the production public admissions flow, which currently uses real email links instead of pretending a backend form exists

### Authorization tests that cannot yet be performed

The following cannot be honestly passed because there is no server-side identity/authorization layer yet:

- anonymous vs authenticated API calls
- owner vs other authenticated user record access
- staff vs applicant/student endpoint permissions
- evaluator-only decision actions
- payment-operator-only confirmation actions
- cross-user IDOR tests
- server-side mass-assignment tests
- RLS policy tests
- private storage ownership tests
- role/permission tampering against a trusted role store

These must become blocking automated tests when the production backend is introduced.

## 13. Remaining unresolved risks

### BLOCKING before real intake

1. No production authentication.
2. No server-side authorization.
3. No secure shared database / RLS policy layer.
4. No secure one-time CEE token/session authority.
5. No server-authoritative exam timing/submission.
6. No protected CEE item bank/scoring service.
7. No authenticated evaluator/staff roles.
8. No server-side payment confirmation.
9. No secure student-account activation/recovery.
10. No cloud ownership controls for learner records/submissions/support.
11. No immutable/append-only privileged audit trail.
12. No private storage policy layer.
13. No backend rate limiting or endpoint validation layer.
14. Dependencies remain specified as `latest`, reducing build reproducibility and increasing supply-chain drift risk.
15. The repository is public and the current CEE question/answer bank has already existed in public source/history. That bank must be treated as compromised and must not be used for real admissions. Production questions/keys must be replaced and stored behind trusted server-side controls.

## Required production authorization tests

For each protected endpoint/resource, automate at least these cases:

- anonymous user → denied (401 where authentication is required)
- authenticated wrong user → denied (403 or non-enumerating 404 according to policy)
- resource owner → allowed only for the permitted action/fields
- staff without required capability → denied
- staff with required capability and assignment → allowed only for scoped fields/actions
- manipulated ID/owner/user/role/status fields → denied/ignored
- direct endpoint call without UI → same authorization result
- stale/revoked session → denied

## Final verdict

# DO NOT DEPLOY

Meaning: **do not deploy Cognita as a real admissions, assessment, payment, staff, or student-record system yet.**

The public informational website may be deployed as a public-only site provided the production build continues to pass the new security leakage check and no real private workflow is represented as live. The full transactional application remains blocked until server-side authentication, authorization, ownership enforcement, protected assessment data, database/storage policies, and prohibited-role tests are implemented and passed.
