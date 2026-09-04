import {
  ArrowRight, BadgeCheck, Check, CircleAlert, CircleDot, Clock3,
  CreditCard, FileText, GraduationCap, Hourglass, ScrollText, UserCheck,
} from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * Shared admissions status system.
 *
 * One source for the applicant-facing state vocabulary, so every surface —
 * application, entrance exam, programs, payment, account setup, student app —
 * reports the same position in the same words. An applicant should never have
 * to guess whether they have already been accepted.
 *
 * This reads the canonical lifecycle state produced by src/lib/admissions.js.
 * It does not change any gate, decision, or sequence.
 */

/** The canonical lifecycle, as the applicant experiences it. */
export const LIFECYCLE = [
  { id: 'application', label: 'Application submitted', hint: 'Your application is on record with Admissions.' },
  { id: 'review', label: 'Admissions review', hint: 'A person reviews your application before any exam access is issued.' },
  { id: 'invitation', label: 'CEE access issued', hint: 'Approved applicants receive invitation-only exam access by email.' },
  { id: 'examination', label: 'Entrance examination', hint: 'One timed session, completed independently.' },
  { id: 'evaluation', label: 'Evaluation and result', hint: 'Applied responses are reviewed before a final decision is released.' },
  { id: 'program', label: 'Program selection', hint: 'Passing applicants choose an eligible learning route.' },
  { id: 'payment', label: 'Enrollment and payment', hint: 'Enrollment is complete only after the required steps are confirmed.' },
  { id: 'account', label: 'Student account activation', hint: 'Account activation follows confirmed enrollment.' },
  { id: 'learning', label: 'Cognita Learning App', hint: 'Your learning environment opens once your account is active.' },
]

const STATES = {
  none: { label: 'No application yet', tone: 'neutral', icon: CircleDot },
  under_review: { label: 'Under review', tone: 'waiting', icon: Hourglass },
  not_approved: { label: 'Not approved', tone: 'negative', icon: CircleAlert },
  approved_for_cee: { label: 'Approved for CEE', tone: 'progress', icon: BadgeCheck },
  cee_in_progress: { label: 'CEE in progress', tone: 'progress', icon: Clock3 },
  cee_review_pending: { label: 'Evaluation pending', tone: 'waiting', icon: ScrollText },
  cee_passed: { label: 'Passed', tone: 'positive', icon: Check },
  cee_failed: { label: 'Not passed', tone: 'negative', icon: CircleAlert },
  program_selected: { label: 'Program selected', tone: 'progress', icon: GraduationCap },
  payment_pending: { label: 'Payment pending', tone: 'waiting', icon: CreditCard },
  payment_confirmed: { label: 'Enrollment confirmed', tone: 'positive', icon: BadgeCheck },
  account_active: { label: 'Student access activated', tone: 'positive', icon: UserCheck },
}

/**
 * Resolves the applicant's single current state and the one action available
 * to them. Derived strictly from stored lifecycle records.
 */
export function resolveAdmissionState(application, enrollment, account) {
  if (!application) {
    return {
      ...STATES.none,
      key: 'none',
      stageIndex: -1,
      description: 'Admission begins with an application. Nothing is assessed or charged before it is reviewed.',
      next: { label: 'Begin your application', to: '/apply' },
    }
  }

  if (account?.status === 'frontend_preview_active') {
    return {
      ...STATES.account_active, key: 'account_active', stageIndex: 8,
      description: 'Your student account is active. Your learning environment is available in the Cognita Learning App.',
      next: { label: 'Enter the Learning App', to: '/app' },
    }
  }

  if (enrollment?.payment?.status === 'confirmed') {
    return {
      ...STATES.payment_confirmed, key: 'payment_confirmed', stageIndex: 7,
      description: 'Your enrollment is confirmed. The next step is activating your Cognita student account.',
      next: { label: 'Activate your student account', to: '/account-setup' },
    }
  }

  if (enrollment?.payment?.status === 'awaiting_confirmation') {
    return {
      ...STATES.payment_pending, key: 'payment_pending', stageIndex: 6,
      description: `Enrollment for ${enrollment.programName} is awaiting payment confirmation.`,
      next: { label: 'Continue to enrollment', to: '/payment' },
    }
  }

  if (enrollment?.status === 'program_selected') {
    return {
      ...STATES.program_selected, key: 'program_selected', stageIndex: 6,
      description: `You selected ${enrollment.programName}. Complete the enrollment and payment step to continue.`,
      next: { label: 'Continue to enrollment', to: '/payment' },
    }
  }

  if (application.ceeDecision?.status === 'passed') {
    return {
      ...STATES.cee_passed, key: 'cee_passed', stageIndex: 5,
      description: 'You passed the Cognita Entrance Examination. Program selection is now available to you.',
      next: { label: 'Explore Our Programs', to: '/programs' },
    }
  }

  if (application.ceeDecision?.status === 'failed') {
    return {
      ...STATES.cee_failed, key: 'cee_failed', stageIndex: 4,
      description: 'You did not pass the entrance examination for this intake. Admissions will communicate any reapplication or readiness guidance.',
      next: null,
    }
  }

  const byStatus = {
    under_review: {
      ...STATES.under_review, key: 'under_review', stageIndex: 1,
      description: 'Your application has been received and is with Admissions. Exam access is issued only after approval.',
      next: null,
    },
    not_approved: {
      ...STATES.not_approved, key: 'not_approved', stageIndex: 1,
      description: 'This application was not approved to continue to the entrance examination.',
      next: null,
    },
    approved_for_cee: {
      ...STATES.approved_for_cee, key: 'approved_for_cee', stageIndex: 2,
      description: 'Your application was approved. Entrance examination access has been issued to your registered email address.',
      next: null,
    },
    cee_in_progress: {
      ...STATES.cee_in_progress, key: 'cee_in_progress', stageIndex: 3,
      description: 'Your examination session is open. It uses one persistent timed session.',
      next: null,
    },
    cee_review_pending: {
      ...STATES.cee_review_pending, key: 'cee_review_pending', stageIndex: 4,
      description: 'Your examination has been submitted. Objective items are recorded, and your applied responses are awaiting evaluator review before a final decision is released.',
      next: null,
    },
  }

  return byStatus[application.status] || {
    ...STATES.under_review, key: application.status, stageIndex: 1,
    description: 'Your application is progressing through the admission process.',
    next: null,
  }
}

/** A single state badge. Always carries an icon and a label, never colour alone. */
export function StatusPill({ state, className = '' }) {
  const Icon = state.icon || CircleDot
  return (
    <span className={`ci-state ci-state--${state.tone} ${className}`.trim()}>
      <Icon aria-hidden="true" />
      {state.label}
    </span>
  )
}

/** The whole admission sequence, with the applicant's position marked. */
export function LifecycleRail({ stageIndex }) {
  return (
    <ol className="ci-rail" aria-label="Admission process progress">
      {LIFECYCLE.map((stage, index) => {
        const status = index < stageIndex ? 'is-done' : index === stageIndex ? 'is-current' : ''
        return (
          <li className={`ci-rail-item ${status}`} key={stage.id} aria-current={index === stageIndex ? 'step' : undefined}>
            <span className="ci-rail-dot" aria-hidden="true">{index < stageIndex ? <Check size={13} /> : null}</span>
            <span className="ci-rail-label">
              <strong>{stage.label}</strong>
              <span>{stage.hint}</span>
              <span className="ci-visually-hidden">
                {index < stageIndex ? 'Completed.' : index === stageIndex ? 'Current step.' : 'Not yet reached.'}
              </span>
            </span>
          </li>
        )
      })}
    </ol>
  )
}

/** The one action available now, or an honest statement that none is. */
export function NextStep({ state }) {
  return (
    <div className="ci-next">
      <div className="ci-next-copy">
        <span>{state.next ? 'What happens next' : 'Current stage'}</span>
        <strong>{state.next ? state.next.label : state.label}</strong>
        <p>{state.description}</p>
      </div>
      {state.next ? (
        <Link className="button" to={state.next.to}>{state.next.label} <ArrowRight size={17} /></Link>
      ) : null}
    </div>
  )
}

/** Reference, state, sequence and next action in one institutional panel. */
export default function AdmissionStatusPanel({ application, enrollment, account, showRail = true }) {
  const state = resolveAdmissionState(application, enrollment, account)

  return (
    <section className="ci-status-panel" aria-label="Admission status">
      <div className="ci-status-head">
        <div className="ci-status-ref">
          <span>{application ? 'Application reference' : 'Admission status'}</span>
          <strong className="ci-tabular">{application?.reference || 'Not started'}</strong>
          {application ? <span className="ci-muted" style={{ letterSpacing: 0, textTransform: 'none', fontWeight: 400 }}>{application.applicant.fullName} · {application.applicant.email}</span> : null}
        </div>
        <StatusPill state={state} />
      </div>

      {showRail ? <LifecycleRail stageIndex={state.stageIndex} /> : null}
      <NextStep state={state} />
    </section>
  )
}

export { FileText }
