# Cognita V1 — Solo-Operator Institutional Model

Status: Canonical operating model for the first small student intake while Cognita remains frontend-only.

## Purpose

Cognita V1 is intentionally designed so one person can operate the institution for a small pilot intake without presenting Cognita as having staff or departments that do not yet exist.

One person may perform several institutional roles. The roles themselves must still remain separate in process, evidence, and decision-making.

The frontend should reduce administrative load by making the next required human action obvious, preserving lifecycle gates, and preventing informal shortcuts.

## Founder/operator roles in V1

The founder/operator may act as:

1. Founder / Institutional Lead
2. Admissions Reviewer
3. CEE Evaluator
4. Trainer / Facilitator
5. Student Support Lead
6. Records and Enrollment Administrator

These are functional responsibilities, not claims that Cognita currently employs six separate staff members.

## Operating principle

**One operator. Separate functions. Recorded decisions. No invented staff.**

The operator should not manually perform work that the frontend can reliably organize or simulate. Human time should concentrate on judgment-heavy work:

- admissions decisions;
- CEE applied-response evaluation;
- integrity review;
- learner feedback and revision decisions;
- live facilitation where required;
- capstone evaluation;
- difficult learner support cases;
- credential eligibility and quality control.

## Required workflow separation

Even when the same person performs every role, Cognita must retain the canonical lifecycle:

application → admissions review → CEE invitation → timed CEE → evaluator review → pass/fail release → program selection → payment confirmation → account activation → student app → learning and assessment → completion/credential decision.

Do not add operator shortcuts that allow a learner to skip a required stage simply because the same person controls multiple functions.

## Founder Operations Console

Frontend route: `/operations`

Purpose: a device-local command center that tells the operator what needs human action next and summarizes current admissions/enrollment state.

The console should organize work into these functional queues:

- Admissions
- CEE & Evaluation
- Enrollment & Payment
- Training & Facilitation
- Academic Records
- Student Support

`/operations/admissions` remains the detailed local simulator for application review, CEE evaluation, result release, payment confirmation, and preview email events.

Neither route is a production staff portal or security boundary while Cognita remains frontend-only.

## Pilot scale

The solo-operator model is intended for a small first intake, not unlimited enrollment.

Cohort size should remain deliberately limited until Cognita has evidence about:

- time required per admissions review;
- time required per CEE evaluation;
- weekly feedback load;
- number of revisions per learner;
- support volume;
- capstone-review time;
- operational failure points.

Do not publish a permanent maximum cohort size until the pilot produces real operating data.

## Independence and conflict-of-interest boundary

During a small pilot, the founder/operator may be the original decision-maker across admissions, evaluation, training, and records.

Before Cognita scales materially, the following should gain an independent second-review mechanism:

- formal learner appeals;
- serious assessment-integrity cases;
- credential revocation or disputes;
- significant complaints or grievances;
- cases where the original evaluator's impartiality is reasonably questioned.

This does not require a full staff immediately. A qualified external reviewer or designated second evaluator can provide the first independence layer.

## Frontend-only limitation

The current console and workflows use browser-local state for simulation and QA.

They do not provide:

- secure staff authentication;
- role-based permissions;
- server audit trails;
- real email delivery;
- real payment processing;
- cloud student records;
- multi-student operations at production scale.

Those capabilities belong to the student-launch infrastructure phase, after the frontend, curriculum, policies, and operating process are ready.
