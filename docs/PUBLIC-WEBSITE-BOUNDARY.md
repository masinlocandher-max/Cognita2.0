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

## Public navigation

The normal public navigation should focus on:

- About
- Programs
- Admissions
- CEE
- Institutional Training
- FAQs
- Contact

Do not expose `/app`, `/operations`, `/operations/admissions`, or `/operations/learning` in normal public navigation.

Internal and learner routes may remain in the repository for frontend development and QA.

## Contact details

Primary institutional email:

`info@thecognitainstitute.com`

Alternate email:

`cognitainstituteofai@gmail.com`

The domain email is the primary public contact. The Gmail address is an alternate contact.

Until a production contact-form backend is connected, public contact actions should use these real email addresses rather than a form that implies successful server submission.

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
