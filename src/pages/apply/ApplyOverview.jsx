import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLearnerContext } from '../../hooks/useLearnerContext.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { deriveApplicationStatus } from '../../repositories/admissionsRepository.js'
import { attemptStatus } from '../../repositories/ceeRepository.js'
import { placementFor } from '../../services/placementService.js'
import { admissionsSteps } from '../../content/institute.js'
import StatusPill from '../../components/StatusPill.jsx'
import { LoadingRows } from '../../components/StateBlock.jsx'
import Alert, { LocalOnlyNotice } from '../../components/Alert.jsx'
import { formatDateShort } from '../../lib/format.js'

/**
 * The applicant's overview: where they are in admissions and what is next.
 */
export default function ApplyOverview() {
  useDocumentTitle('Your application')
  const { loading, learner, application, activeAttempt, submittedAttempt, journey } = useLearnerContext()

  if (loading) return <LoadingRows rows={4} height={90} />

  if (!learner) {
    return (
      <>
        <div className="page-head">
          <p className="eyebrow">Admissions</p>
          <h1>Begin your application</h1>
          <p>
            Applications start with a short record of who you are. In this preview build the record is
            created on your device — Cognita has not connected accounts yet.
          </p>
        </div>
        <div className="card" style={{ maxWidth: '52ch' }}>
          <p className="card-title">Create your applicant record</p>
          <p className="card-note" style={{ margin: 'var(--s-2) 0 var(--s-5)' }}>
            Your name, email and where you are based. This links your application, entrance exam and
            placement together.
          </p>
          <Link className="btn" to="/apply/profile">Create record <ArrowRight size={16} /></Link>
        </div>
      </>
    )
  }

  const placement = submittedAttempt?.placement ? placementFor(submittedAttempt.placement.code) : null
  const next = journey.nextAction

  return (
    <>
      <div className="page-head page-head-row">
        <div>
          <p className="eyebrow">Admissions</p>
          <h1>{learner.fullName.split(' ')[0]}, here is your application.</h1>
          <p>Everything in the admissions process, and what remains.</p>
        </div>
      </div>

      <div className="stack-6">
        <section className="next-action">
          <div>
            <p className="eyebrow">Next step</p>
            <h2>{next.label}</h2>
            <p>{next.description}</p>
            {journey.caveat ? <p className="next-action-caveat">{journey.caveat}</p> : null}
          </div>
          <Link className="btn btn--lg" to={next.to}>
            {next.label} <ArrowRight size={17} />
          </Link>
        </section>

        <div className="grid-auto">
          <article className="card">
            <div className="card-head">
              <p className="card-title">Application</p>
              <StatusPill status={deriveApplicationStatus(application)} />
            </div>
            <p className="card-note">
              {application?.submittedAt ? `Submitted ${formatDateShort(application.submittedAt)}.` : 'Seven questions about your goals and available study time.'}
            </p>
            <Link className="link-arrow" to="/apply/application" style={{ marginTop: 'var(--s-4)' }}>
              {application?.submittedAt ? 'Review answers' : 'Open application'} <ArrowRight size={15} />
            </Link>
          </article>

          <article className="card">
            <div className="card-head">
              <p className="card-title">Entrance exam</p>
              <StatusPill status={attemptStatus(activeAttempt || submittedAttempt)} />
            </div>
            <p className="card-note">
              {submittedAttempt
                ? `Submitted ${formatDateShort(submittedAttempt.submittedAt)}.`
                : '70 minutes recommended. Your progress saves as you work.'}
            </p>
            <Link className="link-arrow" to="/apply/entrance-exam" style={{ marginTop: 'var(--s-4)' }}>
              {submittedAttempt ? 'Attempt history' : activeAttempt?.startedAt ? 'Resume exam' : 'Open exam'} <ArrowRight size={15} />
            </Link>
          </article>

          <article className="card">
            <div className="card-head">
              <p className="card-title">Placement</p>
              {placement ? <StatusPill label="Preliminary" tone="attention" icon="Hourglass" /> : <StatusPill label="Not yet determined" tone="quiet" icon="Circle" />}
            </div>
            <p className="card-note">{placement ? placement.name : 'Determined once your objective profile is complete.'}</p>
            {placement ? <Link className="link-arrow" to="/apply/placement" style={{ marginTop: 'var(--s-4)' }}>View placement <ArrowRight size={15} /></Link> : null}
          </article>
        </div>

        {submittedAttempt ? (
          <Alert tone="info" title="Written responses require institutional review" icon="ClipboardCheck">
            Part of the entrance exam is written work read by an evaluator. Your placement remains
            preliminary until that review is complete, and evaluator review is not connected in this build.
          </Alert>
        ) : null}

        <section className="panel">
          <div className="panel-head"><p className="card-title">The admissions process</p></div>
          <div className="panel-body">
            <ol className="numbered-list">
              {admissionsSteps.map((step) => <li key={step.id}><strong>{step.title}.</strong> {step.body}</li>)}
            </ol>
          </div>
        </section>

        <LocalOnlyNotice />
      </div>
    </>
  )
}
