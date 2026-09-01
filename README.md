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
- 45 objective assessment items
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

## Local data model

Frontend learner data is stored under a versioned browser key and contains:

- one device-local learner profile
- zero or more CEE attempts
- answers and applied responses
- progress and timing state
- submitted objective scores
- preliminary placement indication

Submitted attempts remain in history. A new attempt creates a new record instead of overwriting the previous result.

## Known boundary

Because this milestone is frontend-only:

- learner records do not sync between devices
- clearing browser storage can delete local records
- there is no password/login system
- exam submission does not reach Cognita staff
- applied responses are not yet reviewed
- no final placement is issued

These are intentional product boundaries, not hidden production capabilities.

## Development

```bash
npm install
npm run dev
```

Build check:

```bash
npm run build
```

A GitHub Actions workflow also runs the frontend build when Actions are enabled for the repository.

## Branch

Active build branch: `build/cognita-mvp-v2`

The older `cognita-institute` repository is not used as the active Cognita 2.0 frontend. Its operational concepts may be selectively reused in later phases without carrying forward the old product architecture or visual system.
