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

## Current public route behavior

Public routes:

- `/` — institutional website and full public information surface
- `/programs` — public program information; program selection remains gated by a passing admission decision
- `/apply` — public Admissions information page and official email routing while the production application backend is unfinished
- `/entrance-exam?invite=...` — invitation-only assessment access; invalid or missing access routes the visitor to official Cognita contact options

The browser-local application simulator is preserved only for internal frontend QA at:

- `/operations/apply-preview`

It must not be presented as a production public application form.

Unknown or unavailable public routes must not end in a blank page, inert control, misleading form, or generic 404. They should route to the Cognita assistance fallback with one-click email access to the official addresses and a route back to the institutional website.

## Public navigation

The normal public navigation should focus on:

- About
- Programs
- Admissions
- CEE
- Institutional Training
- FAQs
- Contact

Do not expose `/app`, `/operations`, `/operations/apply-preview`, `/operations/admissions`, or `/operations/learning` in normal public navigation.

Internal and learner routes may remain in the repository for frontend development and QA.

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

The following should not be represented as production-live until the actual infrastructure is connected and tested:

- server-submitted applications;
- transactional admissions email;
- secure CEE invitation tokens;
- production authentication;
- payment processing;
- secure staff/evaluator access;
- cloud student records;
- cross-device progress;
- production learner submissions;
- production support ticketing;
- verified credential issuance.

These systems may continue to exist as clearly separated local frontend simulations for product development.
