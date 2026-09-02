# Cognita 2.0 — Frontend Milestone

Cognita Institute of Artificial Intelligence public website, device-local learner journey, and Cognita Entrance Exam experience.

## Product rule for this milestone

Cognita 2.0 is intentionally frontend-only at this stage.

There is no backend, Supabase project, server authentication, evaluator portal, payment system, or cloud learner record connected to this repository. The interface must not imply that browser-only data has been transmitted to Cognita.

## Phase status

### Phase 1 — Public website

Complete for the current frontend milestone.

- Modern Cognita 2.0 public website
- Who we are
- What we do
- Why Cognita is different
- AI-00 positioning
- Student journey
- Cognita Entrance Exam positioning
- Responsive desktop/mobile design
- Learner journey entry in the global navigation

### Phase 2 — Learner identity

Complete as a frontend-only device profile.

- Device-local learner profile
- Name and email identity record
- Versioned localStorage data model
- Edit profile flow
- CEE attempt history
- Resume status
- Preliminary placement history
- Clear device-data control
- Legacy CEE localStorage migration

This is not server authentication. The profile exists only on the current browser/device.

### Phase 3 — Cognita Entrance Exam

Complete for the frontend-only milestone.

- Functional CEE v1.0 exam interface
- The approved CEE v1.0 production questionnaire and answer key
- 45 objective assessment items (25 communication, 15 AI foundations, 5 research)
- Shared scenario stems rendered with the items that depend on them
- 2 applied-response tasks
- 70 objective points automatically scored
- 30 applied-response points deliberately reserved for human evaluation
- Device-local autosave
- Resumable active attempt
- Sequential section gating
- Recommended-time display
- Submitted attempt record
- Objective readiness profile
- Preliminary placement indication
- Multiple attempt history without deleting previous submitted records

## Routes

- `/` — Cognita Institute public website
- `/learner` — device-local learner profile and CEE history
- `/entrance-exam` — Entrance Exam overview and readiness journey
- `/entrance-exam/start` — CEE v1.0 exam experience

## Assessment model

The CEE is a placement instrument rather than a simple pass/fail quiz.

- Functional English & Communication — 30 points
- AI Foundations — 25 points
- Research & Verification Judgment — 15 points
- Applied Communication & AI Evaluation — 30 points
- Total — 100 points

The frontend automatically scores the 70 objective points. The remaining 30 applied-response points are not automatically scored because open-ended judgment should not be reduced to unreliable keyword matching.

The result shown by this frontend is therefore a preliminary objective placement indication, not a final institutional placement decision.

Scoring follows the institutional formulas exactly — points are computed from raw item counts and rounded once for display, never from an already-rounded percentage. Placement thresholds compare unrounded percentages, so 79.4% is not promoted at 79.5%.

Formulas, placement bands, the applied-response rubrics, and the known integrity boundaries of this build are documented in `docs/cee-v1-scoring-guide.md`. That document is institutional reference material and is not imported by the app, so it does not ship in the browser bundle.

Implementation map:

- `src/data/exam.js` — questionnaire and answer key
- `src/lib/scoring.js` — scoring formulas and placement logic
- `scripts/verify-cee.mjs` — integrity check, run by CI

## Local data model

Frontend learner data is stored under a versioned browser key and contains:

- one device-local learner profile
- zero or more CEE attempts
- answers and applied responses
- progress and timing state
- submitted objective scores
- preliminary placement indication

Submitted attempts remain in history. A new attempt creates a new record instead of overwriting the previous result.

Every attempt is stamped with the questionnaire version it was started against. An unfinished attempt from an earlier item set is kept in history but cannot be resumed, because its stored answers point at questions the current exam no longer contains. Scoring such an attempt against the current key would produce a confident and wrong placement, which is worse than asking the learner to start again.

## Known boundary

Because this milestone is frontend-only:

- learner records do not sync between devices
- clearing browser storage can delete local records
- there is no password/login system
- exam submission does not reach Cognita staff
- applied responses are not yet reviewed
- no final placement is issued

These are intentional product boundaries, not hidden production capabilities.

## Exam integrity boundary

Objective scoring runs in the browser, so the CEE answer key is present in the JavaScript bundle and can be read by anyone who opens developer tools. This is inherent to frontend-only scoring; obfuscation would not change it. Server-side scoring is the only real fix and belongs to a later phase.

A second issue is in the approved questionnaire itself rather than in this code: the keyed option positions follow a visible repeating cycle, which a candidate could exploit without reading the items. Both boundaries are documented in `docs/cee-v1-scoring-guide.md` with the available remedies. Neither has been applied to v1.0.

## Development

```bash
npm install
npm run dev
```

Build check:

```bash
npm run build
```

Questionnaire and scoring check:

```bash
npm run verify
```

`npm run verify` fails if the questionnaire drifts from the approved 45-item shape or answer key, if the section weights stop summing to 70, or if scoring and placement stop matching the institutional formulas and thresholds. CI runs it before the build.

A GitHub Actions workflow also runs the frontend build when Actions are enabled for the repository.

## Branch

Active build branch: `build/cognita-mvp-v2`

The older `cognita-institute` repository is not used as the active Cognita 2.0 frontend. Its operational concepts may be selectively reused in later phases without carrying forward the old product architecture or visual system.
