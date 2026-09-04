import { PROGRAMS } from '../data/programs'

const STATE_KEY = 'cognita-v2-admissions-state'
const SCHEMA_VERSION = 1

export { PROGRAMS }

const emptyState = () => ({
  schemaVersion: SCHEMA_VERSION,
  application: null,
  emailLog: [],
  enrollment: null,
  account: null,
})

function uid(prefix) {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}_${crypto.randomUUID()}`
  }

  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

function normalizeState(value) {
  if (!value || typeof value !== 'object') return emptyState()

  return {
    schemaVersion: SCHEMA_VERSION,
    application: value.application || null,
    emailLog: Array.isArray(value.emailLog) ? value.emailLog : [],
    enrollment: value.enrollment || null,
    account: value.account || null,
  }
}

export function readAdmissionsState() {
  try {
    return normalizeState(JSON.parse(localStorage.getItem(STATE_KEY) || 'null'))
  } catch {
    return emptyState()
  }
}

export function writeAdmissionsState(nextState) {
  const normalized = normalizeState(nextState)
  localStorage.setItem(STATE_KEY, JSON.stringify(normalized))
  return normalized
}

function withEmail(state, type, subject, body) {
  const email = {
    id: uid('email'),
    type,
    subject,
    body,
    to: state.application?.applicant?.email || null,
    createdAt: new Date().toISOString(),
    delivery: 'frontend-preview-only',
  }

  return { ...state, emailLog: [...state.emailLog, email] }
}

export function getApplication() {
  return readAdmissionsState().application
}

export function getEnrollment() {
  return readAdmissionsState().enrollment
}

export function getAccount() {
  return readAdmissionsState().account
}

export function getEmailLog() {
  return readAdmissionsState().emailLog
}

export function submitApplication(input) {
  const state = readAdmissionsState()
  const now = new Date().toISOString()
  const application = {
    id: uid('application'),
    reference: `COG-${Date.now().toString().slice(-8)}`,
    status: 'under_review',
    applicant: {
      fullName: input.fullName.trim(),
      email: input.email.trim().toLowerCase(),
      mobile: input.mobile.trim(),
      location: input.location.trim(),
      highestEducation: input.highestEducation.trim(),
    },
    statement: input.statement.trim(),
    consent: Boolean(input.consent),
    submittedAt: now,
    reviewedAt: null,
    reviewNote: null,
    ceeInvite: null,
    ceeAttemptId: null,
    ceeSubmittedAt: null,
    objectivePoints: null,
    placement: null,
    ceeDecision: null,
  }

  let next = { ...state, application, enrollment: null, account: null }
  next = withEmail(
    next,
    'application_received',
    'Cognita application received',
    `We received application ${application.reference}. It is now pending admissions review. No CEE access is issued until the application is approved.`,
  )
  writeAdmissionsState(next)
  return application
}

export function approveApplication(note = '') {
  const state = readAdmissionsState()
  if (!state.application) return null

  const now = new Date().toISOString()
  const accessCode = Math.random().toString(36).slice(2, 10).toUpperCase()
  const application = {
    ...state.application,
    status: 'approved_for_cee',
    reviewedAt: now,
    reviewNote: note || 'Approved for Cognita Entrance Exam.',
    ceeInvite: {
      code: accessCode,
      issuedAt: now,
      usedAt: null,
    },
  }

  let next = { ...state, application }
  next = withEmail(
    next,
    'cee_invitation',
    'Your Cognita Entrance Exam invitation',
    'Your application has been approved for the Cognita Entrance Exam. Your invitation grants access to one timed CEE session.',
  )
  writeAdmissionsState(next)
  return application
}

export function declineApplication(note = '') {
  const state = readAdmissionsState()
  if (!state.application) return null

  const application = {
    ...state.application,
    status: 'not_approved',
    reviewedAt: new Date().toISOString(),
    reviewNote: note || 'Application was not approved for the current intake.',
  }

  let next = { ...state, application }
  next = withEmail(
    next,
    'application_not_approved',
    'Cognita application decision',
    'Thank you for applying to Cognita. Your application was not approved for the current intake. Any next-step guidance will be included in the formal admissions email.',
  )
  writeAdmissionsState(next)
  return application
}

export function verifyCeeInvite(code) {
  const application = getApplication()
  return Boolean(
    application?.status === 'approved_for_cee' &&
    application?.ceeInvite?.code &&
    code &&
    application.ceeInvite.code.toUpperCase() === code.trim().toUpperCase()
  )
}

export function markCeeStarted(attemptId) {
  const state = readAdmissionsState()
  if (!state.application?.ceeInvite) return null

  const now = new Date().toISOString()
  const application = {
    ...state.application,
    status: 'cee_in_progress',
    ceeAttemptId: attemptId,
    ceeInvite: {
      ...state.application.ceeInvite,
      usedAt: state.application.ceeInvite.usedAt || now,
    },
  }

  writeAdmissionsState({ ...state, application })
  return application
}

export function markCeeSubmitted(attemptId, objectivePoints, placement) {
  const state = readAdmissionsState()
  if (!state.application) return null

  const application = {
    ...state.application,
    status: 'cee_review_pending',
    ceeAttemptId: attemptId,
    ceeSubmittedAt: new Date().toISOString(),
    objectivePoints,
    placement: placement || null,
  }

  let next = { ...state, application }
  next = withEmail(
    next,
    'cee_submission_received',
    'Cognita Entrance Exam submitted',
    'Your CEE has been submitted. Objective items are recorded, but the final pass/fail decision is issued only after evaluator review of the complete assessment.',
  )
  writeAdmissionsState(next)
  return application
}

export function decideCee(decision, evaluatorNote = '') {
  const state = readAdmissionsState()
  if (!state.application || !['passed', 'failed'].includes(decision)) return null

  const now = new Date().toISOString()
  const application = {
    ...state.application,
    status: decision === 'passed' ? 'cee_passed' : 'cee_failed',
    ceeDecision: {
      status: decision,
      decidedAt: now,
      evaluatorNote: evaluatorNote.trim(),
    },
  }

  let next = { ...state, application }
  next = withEmail(
    next,
    decision === 'passed' ? 'cee_passed' : 'cee_failed',
    decision === 'passed' ? 'Cognita Entrance Exam result: Passed' : 'Cognita Entrance Exam result: Not passed',
    decision === 'passed'
      ? 'You passed the Cognita Entrance Exam. You may now continue to program selection and enrollment. Your CEE readiness evidence may also inform a recommended learning pathway or AI-00 foundation requirement.'
      : 'You did not pass the Cognita Entrance Exam for this intake. Any reapplication, bridge, or readiness guidance will be communicated by Admissions.',
  )
  writeAdmissionsState(next)
  return application
}

export function selectProgram(programId) {
  const state = readAdmissionsState()
  const program = PROGRAMS.find((item) => item.id === programId)
  if (!program || state.application?.ceeDecision?.status !== 'passed') return null

  const enrollment = {
    id: state.enrollment?.id || uid('enrollment'),
    applicationId: state.application.id,
    programId: program.id,
    programCode: program.code,
    programName: program.name,
    status: 'program_selected',
    selectedAt: new Date().toISOString(),
    payment: {
      status: 'not_started',
      requestedAt: null,
      confirmedAt: null,
      reference: null,
    },
  }

  writeAdmissionsState({ ...state, enrollment })
  return enrollment
}

export function requestPaymentInstructions() {
  const state = readAdmissionsState()
  if (!state.enrollment) return null

  const enrollment = {
    ...state.enrollment,
    status: 'payment_pending',
    payment: {
      ...state.enrollment.payment,
      status: 'awaiting_confirmation',
      requestedAt: new Date().toISOString(),
    },
  }

  let next = { ...state, enrollment }
  next = withEmail(
    next,
    'payment_instructions',
    'Cognita enrollment payment instructions',
    `Your program selection for ${enrollment.programName} is recorded. Payment instructions will be issued through the official enrollment channel when payment processing is activated.`,
  )
  writeAdmissionsState(next)
  return enrollment
}

export function confirmPayment(reference = 'FRONTEND-DEMO') {
  const state = readAdmissionsState()
  if (!state.enrollment) return null

  const enrollment = {
    ...state.enrollment,
    status: 'payment_confirmed',
    payment: {
      ...state.enrollment.payment,
      status: 'confirmed',
      confirmedAt: new Date().toISOString(),
      reference,
    },
  }

  let next = { ...state, enrollment }
  next = withEmail(
    next,
    'payment_confirmed',
    'Cognita payment confirmed',
    'Your enrollment payment has been confirmed. You may now complete account activation for the Cognita student app.',
  )
  writeAdmissionsState(next)
  return enrollment
}

export function activatePreviewAccount() {
  const state = readAdmissionsState()
  if (state.enrollment?.payment?.status !== 'confirmed' || !state.application) return null

  const account = {
    id: state.account?.id || uid('student'),
    applicationId: state.application.id,
    email: state.application.applicant.email,
    fullName: state.application.applicant.fullName,
    status: 'frontend_preview_active',
    activatedAt: new Date().toISOString(),
  }

  const enrollment = { ...state.enrollment, status: 'enrolled' }
  let next = { ...state, account, enrollment }
  next = withEmail(
    next,
    'student_app_access',
    'Your Cognita student app access',
    'Your Cognita student account has been activated. Use your official account credentials to access the student learning app when production authentication is connected.',
  )
  writeAdmissionsState(next)
  return account
}

export function hasStudentAppAccess() {
  const state = readAdmissionsState()
  return Boolean(state.account?.status === 'frontend_preview_active' && state.enrollment?.status === 'enrolled')
}

export function clearAdmissionsPreview() {
  localStorage.removeItem(STATE_KEY)
}
