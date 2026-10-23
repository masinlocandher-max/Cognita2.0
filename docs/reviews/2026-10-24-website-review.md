# Cognita website assessment and redesign

Assessed 24 October 2026 (Philippines). Production inspected in a browser; source reviewed against canonical repository documents.

## Findings
1. Homepage renders, with a clear institutional identity and existing mission/vision. However it has no classroom entry, uses a noncanonical contact address, and describes AI-00 as AI Foundations instead of CEE.
2. Direct navigation to /programs, /about, /cee, /how-it-works, /organizations, /privacy, /terms and /institutional-status returned Vercel 404 pages. Source defines these routes but lacks a hosting rewrite.
3. Public pages use a separate navigation shell from the homepage. The learning journey lacks an obvious transition from information to a usable sample.
4. Mission and vision differ between homepage and About. A single shared source is needed.
5. Enrolled learning is a local development preview. No secure production account, CEE, payment, submission review, or credential service is established.

## Implemented
- Shared navigation and footer, clearer learner entry, navy/ivory/gold brand system, revised homepage.
- Shared mission/vision copy and dedicated purpose page.
- Public sample classroom: overview, lesson, explanatory check, local draft workspace, downloadable resources, activity progress, support.
- Dedicated contact, learner FAQ, and not-found pages; all existing information/policy pages retained.
- Vercel SPA route rewrite and explicit build/output configuration.
- Route titles/canonical metadata, skip link, focus restoration, mobile navigation, reduced-motion and print styling.
- Public sample contains deliberately public introductory content. Full proprietary curriculum and assessment banks are not included.

## Delivery boundary
Sample activity is not assessed competence. Local work does not sync or submit. No fake account/checkout/CEE is offered. Existing developer-only student preview remains excluded from production. Private course implementation remains in the previously delivered training kit.

## Launch requirements still outstanding
Secure identity and enrollment authorization; protected assessment engine; approved commercial terms and payment integration; server-side learner records and assessor review; final operational/legal disclosures; credential issuance and verification; end-to-end accessibility, device and production-flow validation. This change does not claim production enrollment readiness.
