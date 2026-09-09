/**
 * Verified institutional facts and disclosures.
 *
 * Everything here must be true of the product as it actually exists today.
 * docs/COGNITA-2.0-SOURCE-OF-TRUTH.md §18 lists what has NOT been approved —
 * accreditation, tuition, thresholds, the policy suite, the credential
 * hierarchy — and none of it may be stated or implied anywhere on the site.
 *
 * CONTACT_EMAIL is deliberately null. No institutional address has been
 * approved, and inventing one would put a dead address in front of real
 * applicants. Set it here once a real, monitored mailbox exists and every
 * contact surface picks it up.
 */

export const CONTACT_EMAIL = null

export const INSTITUTION = {
  name: 'The Cognita Institute of Artificial Intelligence',
  shortName: 'Cognita',
  founder: 'Francine Marie Bautista',
  audience: 'Filipino learners',
  instruction: 'English',
  delivery: 'Online',
}

/**
 * Honest institutional status.
 *
 * Saying plainly what Cognita is not yet claiming reads as more credible than
 * silence, and it is the only version that survives scrutiny.
 */
export const DISCLOSURES = [
  {
    id: 'recognition',
    title: 'Recognition and accreditation',
    body: 'Cognita does not claim accreditation, government recognition, institutional partnership, or endorsement by any agency or organization. Any credential Cognita issues represents work assessed by Cognita against its own published standards, and nothing more.',
  },
  {
    id: 'stage',
    title: 'Development stage',
    body: 'Cognita is in active development and is not yet enrolling students. The admissions process described on this site is the intended process. Program details, tuition, schedules, and final academic policies are still being finalized and are not published here until they are approved.',
  },
  {
    id: 'systems',
    title: 'How this site currently works',
    body: 'This site runs entirely in your browser. It has no server accounts, no database, and no transactional email. Anything you enter is kept in your own browser storage on this device and is not transmitted to Cognita or to any third party.',
  },
  {
    id: 'outcomes',
    title: 'Outcomes',
    body: 'Cognita publishes no employment, income, placement, or completion statistics, because it has none to publish. Admission does not guarantee completion, and completion does not guarantee any particular professional outcome.',
  },
]

/** Browser storage this site actually writes, named exactly as it appears. */
export const STORAGE_KEYS = [
  { key: 'cognita-v2-admissions-state', holds: 'Your application details, admission stage, simulated email log, program selection, and enrollment state.' },
  { key: 'cognita-v2-cee-evaluation', holds: 'Entrance examination answers, timing, integrity events, and evaluator scoring entered during a local review simulation.' },
  { key: 'cognita-v2-device-state', holds: 'Local learning progress used by the preview of the student application.' },
  { key: 'cognita-cee-v1-progress', holds: 'Progress from an earlier examination build, retained only so an in-progress session is not lost.' },
]

/** Exactly what the application form asks for. Kept in step with pages/Apply.jsx. */
export const APPLICATION_FIELDS = [
  'Full name',
  'Email address',
  'Mobile number',
  'City or municipality',
  'Highest education completed',
]
