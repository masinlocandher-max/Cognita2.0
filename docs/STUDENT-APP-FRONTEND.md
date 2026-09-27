# Cognita 2.0 — Student Learning Frontend

Status: Canonical frontend implementation map
Updated: 2026-09-28

## Purpose

The enrolled learning environment lives at /app.

The canonical product journey is:
**Create Account → CEE → Profile → Personalized Path → Recommended Offer → Payment → Enrolled Learning → Mastery → Evidence → Credential → Next Path**

The repository remains frontend-only until secure production identity, CEE, payment, records, and authorization exist.

Do not imply that local browser data is a production academic record.

## Access model

In production, /app should require:
- valid account
- completed CEE
- generated path/recommendation
- completed enrollment/payment for the applicable paid pathway
- active learner authorization

Account creation occurs before CEE.

Do not restore an application-first or account-after-payment rule.

## Student workspace

The app should support:
1. Overview
2. Learn
3. Assessments
4. Feedback
5. Capstone
6. Portfolio
7. Credential
8. Support
9. Profile / learning settings
10. Pathway / next-step recommendation

## Personalized pathway

The app should display the learner's:
- CEE profile summary
- current depth
- specialization
- competencies already demonstrated
- competencies required
- remediation
- recommended mode
- current mastery state
- next required action

Do not force every learner through identical content when CEE evidence supports skipping or targeted remediation.

## Learning modes

### Self-Paced
Flexible schedule, same competency standard.

### Guided
Adds structure, checkpoints, accountability, human feedback/support, and other features defined by the paid offer.

## Mastery

Activity completion is not competence.

Use:
**Learn → Do → Evaluate → Explain → Remediate → Retry → Master**

Credential readiness should depend on required evidence, mastery decisions, projects/capstone where applicable, and final verification.

REVISE means improve and resubmit, not permanent failure.

## Portfolio

Portfolio items are learner evidence.

Learner-created original work remains learner-owned unless a separate agreement states otherwise.

Public display or commercialization requires the appropriate separate permission/agreement.

## Credential

The frontend may show readiness and evidence status.

Do not issue or imply a production-verifiable credential until the production credential system exists.

Unless expressly stated otherwise, Cognita credentials are private proprietary training credentials, not government qualifications, degrees, or professional licenses.

## Support

Support should include:
- learning questions
- pathway/recommendation review
- accessibility/support requests
- technical issues
- billing/enrollment support once production systems exist
- privacy contact
- complaint/redress route

## Founder/operator review

Human time should focus on:
- material CEE review/challenges
- learner feedback
- difficult revision cases
- guided facilitation
- capstone review
- credential quality control
- significant support/complaints

## Frontend-only limitation

Local simulations may store preview progress in browser state.

They are not:
- secure multi-user records
- cloud academic records
- production authentication
- production payments
- production credential verification

