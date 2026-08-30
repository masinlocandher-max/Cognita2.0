# Cognita 2.0 — Institute MVP

Cognita Institute of Artificial Intelligence MVP website and Cognita Entrance Exam experience.

## Current scope

- Modern Cognita 2.0 public website
- Who we are
- What we do
- Why Cognita is different
- Current learning offer and AI-00 positioning
- Student journey
- Why the Cognita Entrance Exam matters
- Cognita Entrance Exam overview
- Functional CEE v1.0 exam interface
- 45 objective assessment items
- 2 applied-response tasks
- Progress persistence in localStorage
- Objective readiness profile and preliminary placement indication
- Responsive desktop/mobile design

## Routes

- `/` — Cognita Institute MVP
- `/entrance-exam` — Entrance Exam overview and readiness journey
- `/entrance-exam/start` — CEE v1.0 exam experience

## Assessment model

The CEE is a placement instrument rather than a simple pass/fail quiz.

- Functional English & Communication — 30 points
- AI Foundations — 25 points
- Research & Verification Judgment — 15 points
- Applied Communication & AI Evaluation — 30 points
- Total — 100 points

The current MVP automatically scores the 70 objective points. The remaining 30 applied-response points are deliberately left for evaluator review rather than unreliable keyword scoring.

## MVP limitation

There is currently no backend submission or evaluator portal. Exam progress is stored locally in the browser for prototyping and QA only.

No deployment is configured.

## Development

```bash
npm install
npm run dev
```

Build check:

```bash
npm run build
```

## Branch

Active build branch: `build/cognita-mvp-v2`

The older `cognita-institute` repository is not used for this build.
