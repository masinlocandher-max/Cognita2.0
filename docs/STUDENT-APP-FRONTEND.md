# Cognita 2.0 — Student Learning Frontend

Status: Canonical frontend implementation map for the student learning environment and solo-operator facilitation workflow.

## Purpose

Cognita learning happens inside `/app` only after the learner has completed the canonical admissions and enrollment lifecycle.

The student app is intentionally frontend-only during product completion and QA. It must behave like a credible learning environment without implying that local browser records are production academic records.

## Student app route

`/app`

Access remains gated by:

application → admissions approval → CEE → evaluator pass decision → program selection → payment confirmation → account activation.

Do not create a separate pre-enrollment learner account or restore the old `/learner` route.

## Student workspace sections

The current frontend includes:

1. **Overview**
   - next required learning action;
   - overall activity progress;
   - passed-output status;
   - capstone status;
   - support-request status;
   - guided-track preview where applicable.

2. **Learn**
   - complete program outline;
   - module and lesson selection;
   - learning focus;
   - integrity reminder;
   - local lesson completion;
   - local applied-work drafting and submission.

3. **Assessments**
   - required applied outputs;
   - submission status;
   - direct route back to the relevant activity.

4. **Feedback**
   - trainer PASS / REVISE decisions;
   - written facilitator feedback;
   - capstone feedback;
   - revision return path.

5. **Capstone**
   - final project/evidence draft;
   - reflection and professional-defense notes;
   - local submission for review;
   - trainer PASS / REVISE feedback.

6. **Portfolio**
   - learner outputs saved as evidence of work;
   - visible facilitator decision where one exists.

7. **Credential**
   - learning completion status;
   - required-output pass status;
   - capstone pass status;
   - credential-readiness state;
   - no certificate is actually issued in frontend-only mode.

8. **Support**
   - learner support request creation;
   - request history;
   - local facilitator response display.

9. **Profile**
   - learner profile and goals;
   - local learning preferences;
   - account/program reference information.

## Program content model

The student app must use the active Cognita 2.0 program architecture in `src/data/programs.js` and `src/data/learning.js`.

### Cognita Skills Lab

The self-paced route uses the approved eight-module sequence:

1. AI Foundations and Reality Check
2. Problem Framing and Strategic Thinking
3. Prompt Design and Instruction Quality
4. Research, Verification, and Evidence
5. AI-Assisted Professional Workflows
6. Communication, Creativity, and Quality Control
7. Ethics, Privacy, Bias, and Intellectual Property
8. Capstone Development and Professional Defense

### Cognita Professional AI Program

The guided route uses the 10-week architecture:

- foundation learning in Weeks 1–4;
- specialization in Weeks 5–9;
- full-integration capstone in Week 10.

The four active specialization directions are:

- AI for Students
- AI for Creatives
- AI for Entrepreneurs
- AI for Professionals & Virtual Assistants

The frontend track selector is a simulation aid only. In production, track assignment/approval should be authoritative and controlled by the approved academic/enrollment workflow.

## Competency rule

Activity completion is not the same as academic completion.

A learner may mark learning activities complete for progress tracking, but credential readiness must depend on demonstrated competence.

Current frontend rule:

- required outputs must receive **PASS** from the trainer;
- the capstone must receive **PASS**;
- learning activities must be complete;
- credential readiness still requires final institutional verification before any real credential can be issued.

`REVISE` means the learner must improve and resubmit the work. It is not a permanent failure state.

## Trainer / facilitator route

`/operations/learning`

This is the frontend-only trainer review workspace for the solo-operator pilot.

It supports:

- current learner/program summary;
- learning progress summary;
- pending output-review count;
- PASS / REVISE decisions with required written feedback;
- capstone review with required rationale;
- open learner-support requests;
- recorded local support responses.

These decisions are browser-local simulations. They are not secure production academic records.

## Founder Operations Console integration

`/operations` must prioritize human work in this order when relevant:

- admissions decisions;
- CEE evaluation;
- payment confirmation;
- account activation;
- learner support responses;
- learner output review;
- capstone evaluation;
- ongoing facilitation/progress monitoring.

This makes the V1 institution operable by one person without eliminating institutional gates or judgment records.

## Local persistence

Student learning state currently persists in browser localStorage under:

`cognita-v2-learning-state`

Local state may include:

- selected guided track;
- completed activities;
- learner submissions;
- facilitator feedback;
- capstone draft, reflection, submission and review status;
- portfolio references;
- support requests and local responses;
- learner profile;
- learning preferences.

Clearing browser data can delete this preview state.

## Production boundary

Before real student intake, replace local-only behavior with production systems for:

- secure authentication and account recovery;
- server-authoritative enrollment and access control;
- multi-student records;
- protected submission storage;
- facilitator/evaluator role permissions;
- audit trails;
- real support messaging;
- notifications and email;
- secure academic records;
- cross-device progress;
- credential issuance and public verification;
- approved data retention, privacy, appeals, and records policies.

Do not add those paid/backend systems until Cognita is explicitly moved into student-launch readiness.
