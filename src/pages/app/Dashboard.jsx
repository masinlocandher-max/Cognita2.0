import { Link } from 'react-router-dom'
import { ArrowRight, Megaphone } from 'lucide-react'
import { useLearnerContext } from '../../hooks/useLearnerContext.js'
import { useAsync } from '../../hooks/useAsync.js'
import { listAnnouncements } from '../../repositories/announcementRepository.js'
import { deriveApplicationStatus } from '../../repositories/admissionsRepository.js'
import { attemptStatus } from '../../repositories/ceeRepository.js'
import { placementFor } from '../../services/placementService.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import JourneyRail from '../../components/JourneyRail.jsx'
import StatusPill from '../../components/StatusPill.jsx'
import StateBlock, { LoadingRows } from '../../components/StateBlock.jsx'
import Alert, { LocalOnlyNotice } from '../../components/Alert.jsx'
import Meter from '../../components/Meter.jsx'
import { formatDateShort } from '../../lib/format.js'

/**
 * The dashboard answers four questions above the fold: where am I, what should
 * I do next, what is my current status, and what have I completed. Everything
 * else is secondary and sits below.
 */
export default function Dashboard() {
  useDocumentTitle('Dashboard')
  const { loading, learner, application, activeAttempt, submittedAttempt, journey } = useLearnerContext()
  const announcements = useAsync(() => listAnnouncements('applicants'), [])

  if (loading) {
    return <div className="stack-6"><LoadingRows rows={4} height={90} /></div>
  }

  if (!learner) {
    return (
      <>
        <div className="page-head">
          <h1>Begin your student journey.</h1>
          <p>Cognita starts with a learner record. In this preview build it is created on your device — there is no account to sign in to yet.</p>
        </div>
        <div className="card" style={{ maxWidth: '52ch' }}>
          <p className="card-title">Set up your learner record</p>
          <p className="muted" style={{ fontSize: 'var(--text-sm)', margin: 'var(--s-2) 0 var(--s-5)' }}>
            Your name, email, and where you are based. This links your application, exam attempts and progress together.
          </p>
          <Link className="btn" to="/app/profile">Create learner record <ArrowRight size={16} /></Link>
        </div>
      </>
    )
  }

  const nextAction = journey.nextAction
  const placement = submittedAttempt?.placement ? placementFor(submittedAttempt.placement.code) : null
  const objectiveAnswered = Object.keys(activeAttempt?.answers || {}).length

  return (
    <>
      <div className="page-head page-head-row">
        <div>
          <p className="eyebrow">Student journey</p>
          <h1>{learner.fullName.split(' ')[0]}, here is where you are.</h1>
        </div>
        <StatusPill
          label={journey.stage.replace(/_/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase())}
          tone="accent"
          icon="Compass"
        />
      </div>

      <div className="stack-6">
        <JourneyRail stage={journey.stage} />

        <section className="next-action" aria-labelledby="next-action-heading">
          <div>
            <p className="eyebrow">Your next step</p>
            <h2 id="next-action-heading">{nextAction.label}</h2>
            <p>{nextAction.description}</p>
            {journey.caveat ? <p className="next-action-caveat">{journey.caveat}</p> : null}
          </div>
          <Link className="btn btn--lg" to={nextAction.to}>{nextAction.label} <ArrowRight size={17} /></Link>
        </section>

        <div className="grid-auto">
          <article className="card">
            <div className="card-head">
              <p className="card-title">Application</p>
              <StatusPill status={deriveApplicationStatus(application)} />
            </div>
            <p className="card-note">
              {application?.submittedAt
                ? `Submitted ${formatDateShort(application.submittedAt)}.`
                : 'Seven questions about your goals, background and available time.'}
            </p>
            <Link className="link-arrow" to="/app/application" style={{ marginTop: 'var(--s-4)' }}>
              {application?.submittedAt ? 'Review answers' : 'Open application'} <ArrowRight size={15} />
            </Link>
          </article>

          <article className="card">
            <div className="card-head">
              <p className="card-title">Entrance exam</p>
              <StatusPill status={attemptStatus(activeAttempt || submittedAttempt)} />
            </div>
            {activeAttempt?.startedAt && !submittedAttempt ? (
              <Meter value={objectiveAnswered} max={45} label="Objective items answered" valueText={`${objectiveAnswered}/45`} />
            ) : (
              <p className="card-note">
                {submittedAttempt
                  ? `Submitted ${formatDateShort(submittedAttempt.submittedAt)}. 70 objective points scored.`
                  : '70 minutes recommended. Progress saves as you go.'}
              </p>
            )}
            <Link className="link-arrow" to="/app/entrance-exam" style={{ marginTop: 'var(--s-4)' }}>
              {submittedAttempt ? 'Start another attempt' : activeAttempt?.startedAt ? 'Resume exam' : 'Open exam'} <ArrowRight size={15} />
            </Link>
          </article>

          <article className="card">
            <div className="card-head">
              <p className="card-title">Placement</p>
              {placement ? <StatusPill label="Preliminary" tone="attention" icon="Hourglass" /> : <StatusPill label="Not yet determined" tone="quiet" icon="Circle" />}
            </div>
            <p className="card-note">
              {placement ? placement.name : 'A preliminary indication appears once your objective profile is complete.'}
            </p>
            {placement ? (
              <Link className="link-arrow" to="/app/placement" style={{ marginTop: 'var(--s-4)' }}>View placement <ArrowRight size={15} /></Link>
            ) : null}
          </article>
        </div>

        {submittedAttempt ? (
          <Alert tone="info" title="Applied responses are with an evaluator" icon="ClipboardCheck">
            Thirty of the hundred points come from written work that a person reads. Your placement stays preliminary until
            that review is complete — and in this preview build, review is not yet connected.
          </Alert>
        ) : null}

        <section className="panel">
          <div className="panel-head">
            <p className="card-title"><Megaphone size={15} aria-hidden="true" style={{ verticalAlign: '-2px', marginRight: 6 }} /> Announcements</p>
          </div>
          <div className="panel-body">
            {announcements.loading ? <LoadingRows rows={2} height={44} />
              : announcements.error ? <StateBlock variant="error" />
              : !announcements.data?.length ? <StateBlock variant="empty" title="No announcements" />
              : (
                <ul className="announcement-list">
                  {announcements.data.map((announcement) => (
                    <li key={announcement.id}>
                      <div className="row-between">
                        <strong>{announcement.title}</strong>
                        <span className="muted" style={{ fontSize: 'var(--text-xs)' }}>{formatDateShort(announcement.publishedAt)}</span>
                      </div>
                      <p>{announcement.body}</p>
                    </li>
                  ))}
                </ul>
              )}
          </div>
        </section>

        <LocalOnlyNotice />
      </div>
    </>
  )
}
