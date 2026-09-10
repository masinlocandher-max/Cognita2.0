# Cognita Entrance Examination v1.1 — Assessment Blueprint

Status: Approved assessment-strengthening implementation
Date: 2026-09-09

## Purpose

CEE v1.1 strengthens the existing Cognita admissions and readiness assessment without changing the locked 100-point, 70-minute structure or the requirement for human evaluator review.

The assessment is designed to distinguish between surface familiarity and usable judgment. Strong performance requires candidates to interpret constraints, communicate precisely, recognize uncertainty, reason about AI limitations, evaluate evidence, and design responsible human-controlled workflows.

## Assessment structure

- Functional English & Communication — 30 points
  - 20 objective items
  - comprehension, ambiguity, precision, professional communication, constraint handling, audience awareness, and instruction quality
- AI Foundations — 25 points
  - 15 objective items
  - model limitations, hallucinations, privacy, prompt injection, workflow decomposition, human-in-the-loop controls, evaluation, bias, model drift, and verification
- Research & Verification Judgment — 15 points
  - 10 objective items
  - source authority, recency, sampling, percentages, causation, conflicting evidence, primary-source verification, and current-policy research
- Applied Communication & AI Evaluation — 30 points
  - 2 human-scored written tasks worth 15 points each

Total: 100 points
Time: 70 minutes
Final admission decision: human evaluator review required

## Applied task rubric

### Task 1 — Applied Instruction & Workflow Design

Score each dimension from 0–3:

1. Scope and instruction quality
2. Privacy and data boundaries
3. Escalation and human control
4. Verification and failure safeguards
5. Clarity and practical usability

Maximum: 15 points

### Task 2 — AI Evidence & Decision Audit

Score each dimension from 0–3:

1. Identification of unsupported claims
2. Evidence and source plan
3. Reasoning, causation, and generalization judgment
4. Operational and human-risk analysis
5. Quality of the recommended decision process

Maximum: 15 points

## Design rules

- Avoid distractors that are obviously absurd when a realistic professional alternative can be used.
- Prefer scenarios requiring interpretation over isolated vocabulary recall.
- Test whether the candidate knows when evidence is insufficient, not only whether they know an AI term.
- Do not reward confidence without verification.
- Do not treat AI fluency as AI competence.
- Preserve human accountability for consequential decisions.
- Applied responses must be evaluated for reasoning and defensibility, not writing polish alone.

## Security boundary

CEE v1.1 remains a frontend milestone. The current public repository necessarily exposes client-side question content and answer keys. This is acceptable only for simulation and QA.

Before real applicant use, production CEE security must move question selection, answer keys, scoring, invitation validation, authoritative timing, submissions, and evaluator records to protected server-side systems. Production should support rotating or randomized item pools so one leaked form does not compromise the assessment.
