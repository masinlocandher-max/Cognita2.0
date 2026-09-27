# Cognita CEE / AI-00 v2.0 — Pathway and Offer Engine

Status: CANONICAL DESIGN
Effective: 2026-09-28

This document supersedes CEE v1.1 and v1.2 where they conflict.

## 1. Purpose

The Cognita Entry & Competency Evaluation (CEE), academic code AI-00, is Cognita's diagnostic, routing, personalization, and commercial recommendation engine.

Its primary question is not:
"Did the applicant pass?"

Its primary questions are:
- What can this learner already do?
- What is missing?
- What can be skipped?
- What depth is appropriate?
- What specialization matches the goal?
- What learning mode is likely to work?
- What paid Cognita offer is appropriate?

## 2. Canonical learner flow

**Create Account → CEE → Learner Profile → Gap Analysis → Personalized Pathway → Learning Mode Recommendation → Paid Offer**

The CEE is not a ceremonial quiz and not primarily an exclusion mechanism.

## 3. Four-layer assessment

### Layer A — Competency Diagnostic
Measure:
- AI conceptual literacy
- applied AI problem solving
- prompt/instruction design
- output evaluation and verification
- hallucination detection
- research and evidence judgment
- data/privacy/security/responsible-use judgment
- digital/computational literacy
- workflow and automation reasoning
- governance/professional judgment

Prefer scenarios, application, judgment, transfer, and reasoning over rote definitions.

### Layer B — Technical Readiness
Measure:
- digital fluency
- computational thinking
- programming readiness
- systems reasoning
- readiness for technical tools

### Layer C — Learner Readiness & Support Profile
Non-clinical educational profile.

Possible constructs:
- self-regulation
- persistence
- study consistency
- accountability needs
- response to failure
- confidence calibration
- tolerance for ambiguity
- willingness to experiment
- problem-solving orientation
- digital confidence
- preferred participation mode

Do not diagnose psychological or mental-health conditions.

### Layer D — Goal & Constraint Profile
Capture:
- career/business objective
- target role or use case
- desired specialization
- available study time
- device/internet constraints
- preferred language
- schedule
- relevant experience
- practical budget constraints where appropriate

## 4. Outputs

CEE should generate:
- current competency profile
- strongest capabilities
- critical gaps
- recommended depth pathway
- recommended specialization
- skip-eligible competencies
- required competencies
- recommended learning mode
- support intensity
- recommended paid offer
- explanation of why the recommendation was made

Do not reduce the result to a single score.

## 5. Depth routing

- AI Literacy
- Applied AI
- AI Builder
- AI Engineering

Entry can occur at the appropriate level based on evidence.

## 6. Learning-mode routing

### Self-Paced
Recommend when the learner demonstrates sufficient independence, consistency, and capacity to progress without high-touch accountability.

### Guided
Recommend when additional structure, human feedback, accountability, checkpoints, or facilitation is likely to materially improve outcomes.

### Organizations
Use cohort-level diagnostic evidence to design an organization-specific pathway.

## 7. Commercial recommendation rule

CEE may recommend a paid service.

The recommendation must be defensible and tied to actual profile evidence.

Do not recommend the higher-priced option merely because the learner appears wealthier, anxious, desperate for work, or easier to persuade.

Do not secretly vary the price of an identical product using inferred vulnerability.

## 8. Behavioral/readiness safety rule

The readiness section is not a clinical psychological exam.

Allowed output:
"Likely to benefit from weekly accountability."

Not allowed:
"Psychologically weak."
"Lazy."
"Low intelligence."
"Unstable."
"Clinically introverted."

## 9. Confidence calibration

Where useful, ask learners to rate confidence before or after selected answers.

High-confidence errors may indicate a verification/calibration gap and can justify additional retrieval, verification, or feedback exercises.

## 10. Assessment integrity

The goal is accurate placement, not catching learners out.

Core message:
**The CEE is designed to understand you accurately so Cognita can recommend the right path.**

Integrity safeguards should protect the validity of the learner profile and the credibility of Cognita's recommendations.

## 11. Validation

Before production use as a high-stakes routing system:
- pilot items
- review construct coverage
- test completion burden
- review fairness/language load
- assess domain reliability
- compare recommendations with observed learner performance
- review human/automated agreement
- revise poor items
- document changes

## 12. Profiling disclosure

Before CEE begins, provide a concise disclosure explaining that responses and assessment evidence may be used to:
- generate a competency profile
- identify gaps
- recommend a personalized pathway
- recommend a learning mode/support level
- recommend a Cognita paid offering

Provide a review route for materially incorrect recommendations.

## 13. Frontend-only rule

Current frontend simulations may model the CEE but must not be represented as production-secure assessment infrastructure.

Production requires server-side protection for identity, item delivery, scoring, timing where used, submissions, profiling, records, and recommendation evidence.

