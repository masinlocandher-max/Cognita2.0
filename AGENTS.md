# Cognita 2.0 repository instructions

## Canonical institutional and academic sources

Before changing programs, website copy, admissions language, CEE presentation, learning pathways, credentials, learner experience, or internal operations, read:

- `docs/COGNITA-2.0-SOURCE-OF-TRUTH.md`
- `docs/COGNITA-2.0-ACADEMIC-INSTITUTIONAL-v1.0-PROVISIONAL.md`
- `docs/V1-SOLO-OPERATOR-MODEL.md`
- `docs/STUDENT-APP-FRONTEND.md`
- `docs/WEBSITE-CONTENT.md`
- `docs/CEE-PURPOSE-AND-INTEGRITY.md`
- `src/data/programs.js`
- `src/data/learning.js`

These are the active Cognita 2.0 sources. Older Cognita Academy documents, old repositories, proposals, pricing sheets, and experiments may be used only as reference and must not silently override the current 2.0 model.

### Source precedence and policy status

`docs/COGNITA-2.0-SOURCE-OF-TRUTH.md` contains the current LOCKED architecture.

`docs/COGNITA-2.0-ACADEMIC-INSTITUTIONAL-v1.0-PROVISIONAL.md` is the full academic/operational handbook draft. It may guide design and policy development, but any item marked PROVISIONAL or NOT YET APPROVED must not silently change production behavior, public claims, pricing, credentials, CEE scoring, attendance, refunds, admissions eligibility, or legal positioning.

`docs/STUDENT-APP-FRONTEND.md` is the active implementation map for the frontend learner workspace and trainer-review loop. It does not override locked academic policy.

Policy states:

- `LOCKED` — approved for implementation/use
- `PROVISIONAL` — working rule pending approval, pilot evidence, legal/commercial review, or launch readiness
- `NOT YET APPROVED` — unresolved and must not be invented
- `SUPERSEDED` — replaced by a later approved version

Core program architecture:

- Admissions + CEE first.
- AI-00 is a foundation bridge assigned through readiness evidence; it is not a normal commercial program card.
- `Cognita Professional AI Program` is the flagship guided route: 10 weeks, cohort-based, mentor-supported, with up to 4 weeks of foundation adjusted by readiness and a 6-week specialization/capstone progression.
- `Cognita Skills Lab: Applied AI Foundations and Professional Practice` is the self-paced route: 28 days recommended, 32–40 hours estimated, eight modules plus capstone/professional defense.
- Guided and self-paced delivery differ in structure, not in the expectation of demonstrated competency.
- Future short courses, micro-credentials, institutional training, pricing, credential names, and final academic thresholds must not be invented before approval.

Institutional principle: `Guided when you need structure. Flexible when you need freedom. The standard remains the same.`

## Compliance boundary

Cognita is positioned as a private, non-degree training and learning institution. Do not claim CHED recognition, TESDA registration/accreditation, TESDA National Certificates or Certificates of Competency, PRC recognition/licensure, degree equivalency, or government approval unless the applicable authority has actually been obtained and is independently verifiable.

Before real enrollment, Cognita must resolve the regulatory classification of its Day-1 offerings. If an offering is operated as a TVET program, TESDA UTPRAS requirements may require program registration before offering the program or accepting enrollees. Do not imply that merely labeling a TVET credential “private/non-accredited” bypasses registration requirements.

Do not introduce facial-recognition attendance or other high-risk biometric processing without explicit legal/privacy approval and necessity review.

## V1 solo-operator model

Cognita V1 must be operable by one real founder/operator for a deliberately small pilot intake.

The same person may perform multiple functions, but the frontend and operating process must preserve them as separate responsibilities:

- Founder / Institutional Lead
- Admissions Reviewer
- CEE Evaluator
- Trainer / Facilitator
- Student Support Lead
- Records and Enrollment Administrator

Core V1 principle: `One operator. Separate functions. Recorded decisions. No invented staff.`

`/operations` is the device-local Founder Operations Console. It should show the next human action and organize work across admissions, CEE/evaluation, enrollment/payment, training/facilitation, academic records, and student support.

`/operations/admissions` is the detailed local admissions/evaluator/payment simulator.

`/operations/learning` is the detailed local trainer/facilitator simulator for submitted learner outputs, PASS/REVISE decisions, capstone review, and student-support responses.

These operations routes are not production staff portals or security boundaries during the frontend-only phase. Do not expose them in public navigation.

Do not create shortcuts that bypass the canonical learner lifecycle because one person controls multiple roles. Before material scale, formal appeals, serious integrity cases, credential disputes/revocation, and significant complaints should gain an independent second-review mechanism.

## Student learning frontend

`/app` is the enrolled-student learning environment and must remain gated behind completed enrollment and account activation.

The current frontend workspace includes:

- Overview
- Learn
- Assessments
- Feedback
- Capstone
- Portfolio
- Credential
- Support
- Profile / learning settings

The app persists device-local learning state for simulation. It supports activity completion, applied submissions, trainer PASS/REVISE feedback, capstone drafting and review state, portfolio evidence, support requests and local responses, learner profile information, and learning preferences.

Do not reduce `/app` back to a placeholder dashboard without explicit product approval.

Do not equate clicking an activity-completion control with academic competence. Credential readiness requires completed learning activities, PASS on all required outputs, PASS on the capstone, and later final institutional verification before any real credential is issued.

`REVISE` is a feedback state requiring improvement and resubmission, not a permanent failure state.

## Brand is mandatory

Every website, admissions surface, student surface, prototype, redesign, generated component, and deployment created from this repository must use the Cognita 2.0 brand system already committed here.

Canonical sources: `brand/README.md`, `brand/logos/`, `brand/code/cognita-brand.css`, `brand/code/tokens.json`, `brand/code/brand.js`, and `src/brand-runtime.css`.

Do not redraw, approximate, regenerate, or replace the Cognita logo. The public identity is light, professional, academic, human, and technology-forward. White and soft gray carry most surfaces; deep navy is the primary authority color; indigo, violet, and cyan are controlled accents.

Formal institutional name: `The Cognita Institute of Artificial Intelligence`.
Brand essence: `Human Intelligence. Amplified.`
Learning framework: `THINK. APPLY. TRANSFORM.`

## Canonical institutional lifecycle

Do not bypass or reorder this sequence:

1. Applicant submits `/apply`.
2. Human admissions review occurs before CEE access.
3. Approved applicants receive an invitation-only CEE through email in production.
4. CEE uses one persistent 70-minute session, integrity acknowledgement, integrity-event logging, and timeout submission.
5. Objective scoring is not the final admission decision. Applied responses require evaluator review.
6. Final pass/fail is released after review and communicated through email in production.
7. Passing applicants receive readiness/pathway guidance where applicable.
8. Only passing applicants may choose an eligible program.
9. Payment comes after program selection.
10. Student account activation comes only after payment confirmation.
11. Learning happens inside `/app`, separate from the public institutional website.
12. Required learner outputs receive human PASS/REVISE review before they count toward credential readiness.
13. The capstone requires human review and PASS before credential readiness.

The former standalone `/learner` route must not be restored as a pre-enrollment student account surface.

## CEE purpose, placement, and integrity policy

The Cognita Entrance Examination is not merely a barrier, pass/fail quiz, or anti-cheating mechanism. Its academic purpose is to understand the applicant's actual readiness, identify strengths and gaps, and support an appropriate learning pathway.

The current objective scoring logic may produce readiness indications. The learner-facing Cognita 2.0 pathway model is:

- Foundation Required
- Foundation Accelerated
- Direct Track Entry

Exact thresholds are not LOCKED. The provisional handbook contains pilot bands only. Do not silently change scoring, thresholds, or evaluator policy until a later task formally approves them.

CEE screens must explain purpose before enforcement. Applicants should understand that an honest result is more useful than an artificially high score because unauthorized assistance can produce inaccurate placement and place the learner into work for which they are not yet ready.

Required institutional message:

`The CEE is not designed to catch learners out. It is designed to understand them accurately.`

Before the integrity pledge, encourage applicants to answer wholeheartedly, independently, and without unauthorized help. Explain that Cognita does not expect every applicant to know everything already. Needing foundation support is not automatically a negative outcome; it gives Cognita better evidence about where learning should begin.

Integrity safeguards should be framed as protecting the learner, assessment fairness, academic standards, and the credibility of Cognita credentials. Do not use threatening, shaming, or adversarial language.

## Surface boundary

Public surfaces:
- `/`
- `/apply`

Invitation/enrollment surfaces:
- `/entrance-exam?invite=...`
- `/entrance-exam/start?invite=...`
- `/programs`
- `/payment`
- `/account-setup`
- `/app`

Internal frontend operations surfaces:
- `/operations`
- `/operations/admissions`
- `/operations/learning`

Operations routes are development-only local simulators, not production staff portals or security boundaries.

Do not publicly expose the raw CEE without an approved invitation. Do not expose the student app before enrollment/account activation.

## Frontend-only operating rule

Cognita 2.0 remains frontend-only until the product, curriculum, operations, policies, and compliance path are genuinely ready to onboard real students. Do not add paid backend infrastructure, Supabase, server authentication, transactional email, payment processing, evaluator backend, or cloud learner records unless a later task explicitly moves the product into launch readiness.

Browser-local records, email logs, learner submissions, trainer feedback, support requests, and review decisions are simulations only. Never imply they were actually transmitted, delivered, reviewed on a server, paid, authenticated, or preserved as production academic records.

Do not collect or store passwords in localStorage.

## Functional protection

Brand/UI work must not casually alter admissions gates, CEE scoring, assessment content, timer behavior, integrity logging, evaluator-review requirement, local persistence, enrollment sequence, app-access gates, the solo-operator separation-of-functions rule, PASS/REVISE review behavior, capstone review, or credential-readiness rules.

The application entry point must continue loading the canonical brand token layer and `src/brand-runtime.css`.
