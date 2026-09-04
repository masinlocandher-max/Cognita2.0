# Cognita 2.0 Copilot instructions

All frontend code must follow the Cognita 2.0 brand system committed in this repository.

Use `brand/logos/` for official logo assets. Never redraw or substitute the Cognita mark.
Use `brand/code/cognita-brand.css`, `brand/code/tokens.json`, and `brand/code/brand.js` as canonical design-token sources.
Keep `src/brand-runtime.css` loaded after legacy page styles so the approved light professional identity remains active.

Visual direction: light institutional, academic, human, modern. White and soft gray dominate; deep navy is the primary authority color; indigo, violet, and cyan are controlled accents. Avoid dark-first SaaS/AI-startup styling unless a specifically requested campaign treatment requires it.

Public/student boundary:
- `/` is the public institutional website.
- `/learner`, `/entrance-exam`, and `/entrance-exam/start` are internal frontend student/admissions routes during the current build phase.
- Do not add those internal routes to the public navigation, footer, or homepage CTAs unless explicitly requested.
- Keep student/admissions routes functional for development and QA while keeping the institutional homepage public-facing.

Cognita remains frontend-only until student-launch readiness. Do not introduce Supabase, server authentication, payments, evaluator backends, or paid cloud infrastructure unless explicitly requested for launch preparation.

Do not alter CEE logic, assessment scoring, learner data, persistence, progression, or routing as part of ordinary styling work.
