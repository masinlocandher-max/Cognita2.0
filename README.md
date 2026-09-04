# Cognita 2.0 — Frontend Milestone

The Cognita Institute of Artificial Intelligence public website, device-local learner journey, and Cognita Entrance Exam experience.

## Brand system — mandatory

The Cognita 2.0 brand system committed in this repository is the visual source of truth for every website implementation, redesign, prototype, generated component, or deployment, regardless of whether the work is done with Codex, Claude, Copilot, Lovable, Replit, another AI builder, or manual development.

- Official logos: `brand/logos/`
- Brand rules: `brand/README.md`
- Canonical CSS tokens: `brand/code/cognita-brand.css`
- Machine-readable tokens: `brand/code/tokens.json`
- JavaScript constants: `brand/code/brand.js`
- Active website application layer: `src/brand-runtime.css`
- Agent/tool instructions: `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`

Do not redraw, regenerate, reinterpret, or replace the Cognita logo. The public identity is light, professional, academic, human, and technology-forward: white and soft gray dominate; deep navy is the primary authority color; indigo, violet, and cyan are controlled accents.

Formal institutional name: **The Cognita Institute of Artificial Intelligence**  
Brand essence: **Human Intelligence. Amplified.**  
Learning framework: **THINK. APPLY. TRANSFORM.**

## Product rule for this milestone

Cognita 2.0 is intentionally frontend-only at this stage.

There is no backend, Supabase project, server authentication, evaluator portal, payment system, or cloud learner record connected to this repository. The interface must not imply that browser-only data has been transmitted to Cognita.

This frontend-only operating model remains in effect through the build and QA phase. Paid backend infrastructure should only be introduced when Cognita is genuinely ready to onboard real students.

## Public and student architecture

The public institutional website and the student/admissions experience are intentionally separate surfaces.

- `/` is the public Cognita website.
- `/learner`, `/entrance-exam`, and `/entrance-exam/start` remain functional internal frontend routes for development, QA, and future student-launch preparation.
- Internal learner and CEE routes are not linked from the public global navigation, footer, or homepage calls to action during the current phase.
- The public site may explain readiness, placement, AI-00, and Cognita's learning model without directly exposing the operational learner workspace or launching the CEE.
- Do not publicly promote or expose the Cognita Entrance Exam from the institutional homepage unless a later product decision explicitly changes this rule.

This separation is a product boundary, not a security boundary. Because there is no authentication backend yet, direct URLs are not access-controlled and must not be treated as secure student-only infrastructure.

## Phase status

### Phase 1 — Public website

Complete for the current frontend milestone.

- Modern Cognita 2.0 public website
- Who we are
- What we do
- Why Cognita is different
- AI-00 positioning
- Student journey
- Readiness and placement positioning
- Responsive desktop/mobile design
- Public navigation separated from internal student/admissions routes

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

- `/` — public Cognita Institute website
- `/learner` — internal device-local learner profile and CEE history
- `/entrance-exam` — internal Entrance Exam overview and readiness journey
- `/entrance-exam/start` — internal CEE v1.0 exam experience

The three student/admissions routes remain reachable by direct URL for development and QA but are intentionally absent from the public institutional navigation during this phase.

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
- direct student/admissions URLs are not access-controlled

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

Canonical active branch: `main`

The older `cognita-institute` repository is not used as the active Cognita 2.0 frontend. Its operational concepts may be selectively reused in later phases without carrying forward the old product architecture or visual system.
