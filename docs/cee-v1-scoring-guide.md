# CEE v1.0 — Scoring and Placement Guide

Institutional reference for the Cognita Entrance Exam, version 1.0.

This document is **not imported by the application** and does not ship in the
frontend bundle. It exists so evaluators and future engineers score the same
instrument the same way.

## Single source of truth

| Artifact | Location |
| --- | --- |
| Questionnaire and answer key | `src/data/exam.js` |
| Scoring formulas and placement logic | `src/lib/scoring.js` |
| Automated integrity check | `scripts/verify-cee.mjs` (`npm run verify`) |
| Applied-response rubrics | this document |

The answer key is not restated here. Duplicating it would create two versions
that can drift apart. `scripts/verify-cee.mjs` holds the approved key as a
regression guard and fails the build if `src/data/exam.js` diverges from it.

## Objective scoring

| Section | Items | Points | Formula |
| --- | --- | --- | --- |
| Functional English & Communication | 25 | 30 | raw correct ÷ 25 × 30 |
| AI Foundations | 15 | 25 | raw correct ÷ 15 × 25 |
| Research & Verification Judgment | 5 | 15 | raw correct ÷ 5 × 15 |
| **Objective maximum** | **45** | **70** | |

Points are computed from the raw item count and rounded to the nearest whole
point once, for display. The system never rounds a percentage and then converts
it — that double rounding can move a learner across a placement threshold.

## Combined AI readiness

Placement uses a combined "AI Foundations + Research" readiness figure. The
implementation computes it on the **weighted point scale**:

```
AI readiness = (AI Foundations points + Research points) ÷ 40 × 100
```

This is a deliberate reading of the guide, and it matters. The instrument
assigns 25 points to 15 AI Foundations items (1.67 points each) and 15 points to
5 Research items (3.00 points each), so a Research item is worth roughly 1.8× an
AI Foundations item. Combining on a flat item count would discard that weighting
and quietly make the two sections equal.

`src/lib/scoring.js` exposes `AI_READINESS_MODE` if the institute prefers the
flat item-count reading, and returns both figures on every scored attempt so the
two can be compared against real candidate data.

## Preliminary placement logic

Evaluated in order. Thresholds use unrounded percentages, so 79.4% is not
promoted to a progression at 79.5%.

| Condition | Indication |
| --- | --- |
| Communication ≥ 80% **and** AI readiness ≥ 80% | `AI-01` readiness indicated |
| Communication < 70% **and** AI readiness ≥ 80% | `AI-00` Communication Readiness |
| Communication ≥ 80% **and** AI readiness < 70% | `AI-00` AI Foundations |
| Communication < 70% **and** AI readiness < 70% | Full `AI-00` |
| Anything else (typically the 70–79% band) | Targeted bridge + human review |

## Applied Task 1 — Applied Communication (15 points)

| Criterion | 0–3 points |
| --- | --- |
| **Objective and context** | 3: clearly defines the business objective and enough relevant business context to guide the AI. 2: objective present, context incomplete. 1: objective or context vague. 0: no meaningful objective or context. |
| **Audience, market, budget, timeframe** | 3: realistic target audience, geographic market, budget, and timeframe. 2: most but not all. 1: only one or two useful constraints. 0: none. |
| **Deliverable and structure** | 3: clearly defines what the AI should produce and how the output should be structured. 2: deliverable defined, structure not. 1: output request remains broad. 0: no meaningful deliverable. |
| **Verification and responsible use** | 3: explicitly prevents invention, requires verification where relevant, recognizes uncertainty or missing information. 2: some quality-control instruction. 1: vaguely asks the AI to be accurate. 0: none. |
| **Clarity and professional instruction** | 3: precise, coherent, efficient, directly usable as an AI instruction. 2: generally clear with minor weaknesses. 1: difficult to follow or unnecessarily vague. 0: does not function as a usable instruction. |

## Applied Task 2 — AI Response Evaluation (15 points)

| Criterion | Points |
| --- | --- |
| **Recognition of unsupported claims** (0–3) | 3: clearly identifies that both exact numerical claims and the cited institution/report require verification, and that confidence is not evidence. 2: most reliability issues. 1: one obvious issue. 0: accepts the claims without meaningful scrutiny. |
| **Verification strategy and source quality** (0–4) | 4: strong verification process using appropriate primary or authoritative sources, checks the existence and contents of the alleged report, distinguishes primary from secondary evidence. 3: good plan, minor omissions. 2: general approach without clear source hierarchy. 1: weak verification such as asking another AI. 0: no credible plan. |
| **Treatment of uncertainty** (0–3) | 3: explains that unsupported exact figures should not be repeated as fact, and proposes cautious language when evidence is incomplete or conflicting. 2: recognizes uncertainty without explaining how to communicate it. 1: mentions uncertainty superficially. 0: presents unsupported figures as established fact. |
| **Reasoning quality** (0–3) | 3: logical, independent judgment; explains why each verification step matters. 2: sound reasoning, limited depth. 1: mostly conclusion without explanation. 0: fundamentally flawed. |
| **Communication quality** (0–2) | 2: clear, organized, professional, concise. 1: understandable but poorly structured. 0: difficult to understand. |

## Total

| Area | Points |
| --- | --- |
| Functional English & Communication | 30 |
| AI Foundations | 25 |
| Research & Verification Judgment | 15 |
| Applied Communication & AI Evaluation | 30 |
| **Maximum** | **100** |

## Institutional rule

The CEE is a diagnostic placement instrument, not a ranking. A learner with a
high total should not automatically advance if one critical competency is weak,
and a learner should not be pushed through material they have already mastered
because a different competency needs support. The purpose is to find the correct
starting point.

## Known integrity boundaries of the current build

These are properties of a frontend-only implementation, recorded so they are not
mistaken for exam security.

1. **The answer key ships to the browser.** Objective scoring runs client-side,
   so the key is present in the JavaScript bundle and readable by anyone who
   opens developer tools. Frontend obfuscation would not change this. Server-side
   scoring is the only real fix, and it belongs to a later phase.
2. **The keyed option positions follow a visible cycle.** Read down the approved
   key: Section I repeats C, A, D, B; Section II repeats B, D, A, C; Section III
   resumes C, A, D, B. A candidate who notices the pattern can score well without
   reading the items, which would corrupt placement rather than merely inflate a
   score. The fix is either re-randomizing the keyed positions in the approved
   questionnaire, or shuffling option order per attempt at render time and
   storing the per-attempt permutation. Neither has been applied to v1.0.
3. **Submission is device-local.** Attempts are stored in browser storage only.
   They are not transmitted to Cognita and no evaluator receives them.
