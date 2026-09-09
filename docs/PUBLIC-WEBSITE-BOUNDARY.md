# Cognita 2.0 — Public Website Boundary

Status: LOCKED frontend direction for the current build phase.

## Purpose

The public Cognita website is an institutional information website. It exists so prospective learners, parents, organizations, partners, and the public can understand Cognita, its programs, admissions process, Cognita Entrance Examination, learning model, institutional training, founder, FAQs, regulatory positioning, and contact details.

The public website is not the place where students study.

Learning remains inside the separate enrolled-student environment after the canonical admissions and enrollment lifecycle is completed.

## Public presentation rule during backend development

The public website should look complete, professional, and institutionally credible while production backend systems are still being built.

Do not expose fake or non-working backend behavior simply to create the appearance of completeness. Where a production form, email workflow, authentication system, payment processor, cloud record, or other backend dependency is not yet live, use a truthful frontend alternative such as published information, a real `mailto:` contact action, or an informational status surface.

The goal is a complete public information experience, not a false claim that unfinished transactional systems are operating.

## Security boundary during the frontend-only phase

The current repository does not have production authentication or server-side authorization. Therefore the production build follows **default deny** for every route that would require a trusted identity.

A normal production build must register only the explicit public route allowlist. Internal operations, CEE execution, payment, account activation, and student-app routes are development-only until their server-side authorization exists and is tested.

Hiding links or buttons is not a security control. A protected route must not be made production-live merely because it is absent from navigation.

## Current public route behavior

Public routes:

- `/` — Cognita institutional website
- `/about` — institutional information
- `/founder` — founder information
- `/programs` — public program information; real program selection remains unavailable until a secure enrollment backend exists
- `/programs/professional-ai-program` — public flagship-program information
- `/programs/skills-lab` — public Skills Lab information
- `/admissions` — public Admissions information and official email routing
- `/apply` — same public Admissions information while the production application backend is unfinished
- `/cee` — public CEE purpose/structure information only
- `/organizations` — institutional training information
- `/policies` — policy index
- `/privacy` — privacy policy
- `/terms` — terms of use
- `/academic-integrity` — academic integrity and AI-use policy
- `/student-policies` — student policies
- `/institutional-status` — institutional status and regulatory disclosure

The browser-local application simulator is preserved only for internal frontend QA in development mode. The timed CEE, payment, account activation, student app, and staff/review consoles are also development-only.

Unknown or unavailable public routes must not end in a blank page, inert control, misleading form, or fake backend. They should route to the Cognita assistance fallback with one-click email access to the official addresses and a route back to the institutional website.

## Development-only routes

The following routes may exist in source for local QA, but a normal production build must deny them until server-side identity and authorization are implemented:

- `/entrance-exam`
- `/entrance-exam/start`
- `/payment`
- `/account-setup`
- `/app`
- `/operations`
- `/operations/apply-preview`
- `/operations/admissions`
- `/operations/learning`

These are not a production access-control model.

## Public navigation

The normal public navigation should focus on:

- About
- Programs
- Admissions
- CEE
- Institutional Training
- FAQs
- Contact

Do not expose development-only learner or operations routes in normal public navigation.

## Contact details

Primary institutional email:

`info@thecognitainstitute.com`

Alternate email:

`cognitainstituteofai@gmail.com`

The domain email is the primary public contact. The Gmail address is an alternate contact.

Until a production contact-form or admissions backend is connected, public contact and admissions actions should use these real email addresses rather than a form that implies successful server submission.

Where practical, primary `mailto:` actions should include the alternate address as `cc` so the user has one clear action while both institutional inboxes are available.

## Visual credibility rule

The public website should read as a modern private learning institution, not as a startup landing page or SaaS product.

Prefer:

- restrained white, soft gray, navy, and controlled brand accents;
- editorial hierarchy and clear institutional typography;
- straight or lightly rounded surfaces rather than excessive floating cards;
- thin rules, formal content groupings, and generous but disciplined spacing;
- factual program and admissions information;
- calm, precise language;
- clear institutional disclosures and contact details.

Avoid:

- excessive glows, gradients, glassmorphism, and decorative orbs;
- oversized startup-style display typography that overwhelms institutional information;
- bento-grid or product-dashboard visual language on public pages;
- fake metrics, decorative status pills, or internal workflow vocabulary on public pages;
- speculative fees, credentials, staff, regulatory status, or service availability;
- generic “coming soon” dead ends when direct email contact is available.

## Website information standard

The public website should provide enough information that a visitor does not need access to the student app to understand Cognita.

At minimum it should explain:

- institutional identity and positioning;
- mission and vision;
- learning philosophy;
- Cognita Professional AI Program;
- Cognita Skills Lab;
- AI-00 Foundation Bridge;
- admissions lifecycle;
- CEE purpose and structure;
- guided and self-paced learning model;
- competency-based completion principle;
- institutional training;
- founder;
- FAQs;
- contact details;
- truthful regulatory/institutional disclosure.

## Backend-dependent items

The following must not be represented as production-live until the actual infrastructure and authorization model are connected and tested:

- server-submitted applications;
- transactional admissions email;
- authenticated applicant-status access;
- secure CEE invitation tokens;
- timed CEE execution and server-authoritative submission;
- protected CEE question bank/scoring;
- production authentication;
- payment processing and confirmation;
- secure staff/evaluator access;
- cloud student records;
- cross-device progress;
- production learner submissions;
- production support ticketing;
- verified credential issuance.

These systems may continue to exist as clearly separated local frontend simulations for product development, but they must not ship as available production functionality.

See also:

- `docs/security/ACCESS-CONTROL-MATRIX.md`
- `docs/security/SECURITY-AUDIT-2026-09-10.md`
