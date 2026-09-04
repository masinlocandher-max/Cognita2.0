import { BookOpenCheck, CheckCircle2, ClipboardCheck, GraduationCap, Mail, ShieldCheck, UserRoundCheck, WalletCards } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getEmailLog, readAdmissionsState } from '../lib/admissions'

function statusLabel(value) {
  if (!value) return 'Not started'
  return value.replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function actionFor(state) {
  const application = state.application
  const enrollment = state.enrollment
  const account = state.account

  if (!application) return { title: 'No applicant waiting', detail: 'The next institutional action begins when an applicant submits the admissions form.', href: '/apply', cta: 'Open application preview' }
  if (application.status === 'under_review') return { title: 'Review admissions application', detail: `${application.applicant.fullName} is waiting for an admissions decision.`, href: '/operations/admissions', cta: 'Review application' }
  if (application.status === 'approved_for_cee') return { title: 'CEE invitation issued', detail: 'No staff decision is required until the candidate starts or submits the assessment.', href: '/operations/admissions', cta: 'View invitation' }
  if (application.status === 'cee_in_progress') return { title: 'CEE in progress', detail: 'The candidate is inside the timed assessment. Intervention is not required unless a technical issue is reported.', href: '/operations/admissions', cta: 'View candidate status' }
  if (application.status === 'cee_review_pending') return { title: 'CEE evaluation required', detail: 'Score both applied tasks, review integrity signals, record a rationale, and release the final decision.', href: '/operations/admissions', cta: 'Evaluate CEE' }
  if (application.status === 'cee_passed' && !enrollment) return { title: 'Awaiting program selection', detail: 'The successful applicant must choose an eligible learning route before payment.', href: '/programs', cta: 'View program stage' }
  if (enrollment?.payment?.status === 'awaiting_confirmation') return { title: 'Payment confirmation required', detail: 'Confirm payment only after the approved payment/accounting evidence is available.', href: '/operations/admissions', cta: 'Review payment' }
  if (enrollment?.payment?.status === 'confirmed' && !account) return { title: 'Account activation pending', detail: 'Payment is confirmed. The student can now activate learning-app access.', href: '/account-setup', cta: 'Open activation stage' }
  if (account?.status === 'frontend_preview_active') return { title: 'Student is active', detail: 'The learner has app access. Your next recurring work is teaching, feedback, assessment, support, and records review.', href: '/app', cta: 'Open student app' }
  if (application.status === 'cee_failed' || application.status === 'not_approved') return { title: 'Admissions cycle closed', detail: 'No enrollment action is due unless a new intake, bridge pathway, or reapplication is formally opened.', href: '/apply', cta: 'View decision status' }

  return { title: 'Review current record', detail: 'The local preview has a state that needs an operator check.', href: '/operations/admissions', cta: 'Open operations' }
}

export default function FounderConsole() {
  const state = readAdmissionsState()
  const emails = getEmailLog()
  const application = state.application
  const enrollment = state.enrollment
  const account = state.account
  const nextAction = actionFor(state)

  const roles = [
    {
      icon: ClipboardCheck,
      name: 'Admissions',
      status: application ? statusLabel(application.status) : 'No application',
      detail: 'Review applications, issue CEE eligibility decisions, and preserve a written basis for each decision.',
    },
    {
      icon: ShieldCheck,
      name: 'CEE & Evaluation',
      status: application?.ceeSubmittedAt ? 'Assessment submitted' : application?.ceeInvite ? 'Invitation issued' : 'Not active',
      detail: 'Protect assessment integrity, review applied work, score consistently, and issue the formal pass/fail decision.',
    },
    {
      icon: WalletCards,
      name: 'Enrollment & Payment',
      status: enrollment ? statusLabel(enrollment.status) : 'Not started',
      detail: 'Confirm the selected program and payment status before allowing student account activation.',
    },
    {
      icon: GraduationCap,
      name: 'Training & Facilitation',
      status: account ? 'Student access active' : 'No active student',
      detail: 'Deliver lessons, facilitate guided sessions, review outputs, require revision, and protect the academic standard.',
    },
    {
      icon: BookOpenCheck,
      name: 'Academic Records',
      status: account ? 'Learner record active' : 'No active learner record',
      detail: 'Track progress, assessment evidence, feedback, completion requirements, capstone status, and credential eligibility.',
    },
    {
      icon: UserRoundCheck,
      name: 'Student Support',
      status: account ? 'Student support active' : 'Not active',
      detail: 'Handle learner questions, reasonable support, schedule concerns, and issues that require human judgment.',
    },
  ]

  return (
    <section className="ops-page founder-console-page">
      <div className="page-width founder-console">
        <header className="ops-header founder-console-header">
          <div>
            <p className="section-label">INTERNAL FRONTEND PREVIEW</p>
            <h1>Founder Operations Console</h1>
            <p>Cognita V1 is designed so one operator can run a small intake without collapsing institutional roles into an informal process. One person may perform multiple roles, but each decision still follows its own rules and record.</p>
          </div>
          <div className="founder-mode-chip"><span>V1 OPERATING MODEL</span><strong>One operator · controlled workflow</strong></div>
        </header>

        <article className="founder-next-action">
          <div>
            <span>YOUR NEXT HUMAN ACTION</span>
            <h2>{nextAction.title}</h2>
            <p>{nextAction.detail}</p>
          </div>
          <Link className="button" to={nextAction.href}>{nextAction.cta}</Link>
        </article>

        <div className="founder-snapshot-grid">
          <article><span>Applicant</span><strong>{application?.applicant?.fullName || 'None'}</strong><small>{application?.reference || 'No application reference'}</small></article>
          <article><span>Admissions</span><strong>{statusLabel(application?.status)}</strong><small>{application?.applicant?.email || 'No applicant email'}</small></article>
          <article><span>Enrollment</span><strong>{statusLabel(enrollment?.status)}</strong><small>{enrollment?.programName || 'No program selected'}</small></article>
          <article><span>Student app</span><strong>{account ? 'Active preview' : 'Not active'}</strong><small>{account?.email || 'Account not activated'}</small></article>
          <article><span>Institutional notices</span><strong>{emails.length}</strong><small>Frontend email events recorded</small></article>
        </div>

        <div className="founder-role-grid">
          {roles.map(({ icon: Icon, name, status, detail }) => (
            <article className="founder-role-card" key={name}>
              <Icon />
              <div className="founder-role-heading"><h2>{name}</h2><span>{status}</span></div>
              <p>{detail}</p>
            </article>
          ))}
        </div>

        <article className="ops-card founder-boundary-card">
          <div className="ops-card-heading">
            <div><span>CONTROL PRINCIPLE</span><h2>Founder-led does not mean rule-free.</h2></div>
            <CheckCircle2 />
          </div>
          <p>During the pilot, the same person may be Founder, Admissions Officer, Evaluator, Trainer, Student Support, and Records Administrator. The frontend must still separate those functions, require recorded decisions where appropriate, and avoid giving the operator shortcuts that a larger institution would not permit.</p>
          <p>Before scale, high-impact appeals, serious integrity cases, credential disputes, and complaints should gain an independent second-review mechanism rather than relying permanently on the original decision-maker.</p>
        </article>

        <div className="founder-console-links">
          <Link to="/operations/admissions"><ClipboardCheck size={18} /> Admissions & CEE operations</Link>
          <Link to="/app"><GraduationCap size={18} /> Student learning app</Link>
          <Link to="/apply"><Mail size={18} /> Applicant status surface</Link>
        </div>

        <p className="mvp-note">This console is a device-local operating simulation, not a secure production admin system. Real staff access, permissions, audit trails, communications, payments, and student records require launch infrastructure later.</p>
      </div>
    </section>
  )
}
