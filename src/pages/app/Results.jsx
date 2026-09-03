import { Link } from 'react-router-dom'
import { ArrowRight, ClipboardCheck } from 'lucide-react'
import { useLearnerContext } from '../../hooks/useLearnerContext.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { competencyProfile, placementFor, PRELIMINARY_NOTICE } from '../../services/placementService.js'
import { formatDateTime, formatMinutes } from '../../lib/format.js'
import StateBlock, { LoadingRows } from '../../components/StateBlock.jsx'
import StatusPill from '../../components/StatusPill.jsx'
import Alert from '../../components/Alert.jsx'
import Meter from '../../components/Meter.jsx'

/**
 * The Cognita Readiness Profile.
 *
 * Deliberately not a pass/fail screen and deliberately not a single headline
 * number: the competency bands are what a learner acts on. The preliminary
 * notice is not fine print — it sits directly under the result.
 */
export default function Results() {
  useDocumentTitle('Readiness profile')
  const { loading, submittedAttempt } = useLearnerContext()

  if (loading) return <LoadingRows rows={4} height={90} />

  if (!submittedAttempt) {
    return (
      <>
        <div className="page-head">
          <p className="eyebrow">Readiness profile</p>
          <h1>No submitted attempt yet.</h1>
        </div>
        <StateBlock
          variant="empty"
          title="Your profile appears after you submit the exam"
          description="The objective sections are scored immediately on submission. The two applied tasks are read by a person."
          action={<Link className="btn" to="/app/entrance-exam">Go to the entrance exam <ArrowRight size={16} /></Link>}
        />
      </>
    )
  }

  const scores = submittedAttempt.scores
  const placement = placementFor(submittedAttempt.placement?.code)
  const profile = competencyProfile(scores)

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Cognita Readiness Profile</p>
        <h1>{placement.headline}</h1>
        <p>
          Submitted {formatDateTime(submittedAttempt.submittedAt)}
          {submittedAttempt.durationSeconds ? ` · ${formatMinutes(Math.round(submittedAttempt.durationSeconds / 60))}` : ''}
        </p>
      </div>

      <Alert tone="attention" title="This result is preliminary" icon="ClipboardCheck">
        {PRELIMINARY_NOTICE}
      </Alert>

      <section className="readiness-summary" aria-label="Objective score">
        <div>
          <p className="eyebrow">Objective score</p>
          <p className="readiness-score tabular">
            {submittedAttempt.objectivePoints}<span>/70</span>
          </p>
          <p className="muted">
            The remaining 30 points come from the two applied tasks and are not scored automatically.
          </p>
        </div>
        <div className="readiness-placement">
          <p className="eyebrow">Preliminary placement</p>
          <h2>{placement.name}</h2>
          <StatusPill label="Awaiting institutional review" tone="attention" icon="Hourglass" />
        </div>
      </section>

      <section className="stack-4" style={{ marginTop: 'var(--s-8)' }} aria-labelledby="competency-heading">
        <h2 id="competency-heading" style={{ fontSize: 'var(--display-sm)' }}>Competency profile</h2>
        <div className="stack-4">
          {profile.map((area) => (
            <article className="card competency-row" key={area.id}>
              <div className="competency-head">
                <div>
                  <p className="card-title">{area.label}</p>
                  <p className="card-note">{area.correct} of {area.total} objective items · {area.points} of {area.pointsMax} points</p>
                </div>
                <StatusPill label={area.band.label} tone={area.band.tone} icon={area.band.tone === 'positive' ? 'CircleCheck' : area.band.tone === 'attention' ? 'Hourglass' : 'TrendingUp'} />
              </div>
              <Meter value={area.percentage} max={100} valueText={`${area.percentage}%`} tone={area.band.tone === 'positive' ? 'positive' : 'accent'} label={`${area.label} readiness`} />
            </article>
          ))}
        </div>
      </section>

      <section className="card card--sunken" style={{ marginTop: 'var(--s-7)' }}>
        <p className="card-title"><ClipboardCheck size={15} aria-hidden="true" style={{ verticalAlign: '-2px', marginRight: 6 }} /> What happens to your written work</p>
        <p className="muted" style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--s-2)', lineHeight: 1.7 }}>
          Your two applied responses are worth 30 points and are read by an evaluator against a rubric — they are not
          auto-marked, because keyword matching is not assessment. In this preview build the evaluator workflow is not
          connected, so no reviewer has received your responses.
        </p>
      </section>

      <div className="wrap-actions" style={{ marginTop: 'var(--s-7)' }}>
        <Link className="btn" to="/app/placement">View placement and next step <ArrowRight size={16} /></Link>
        <Link className="btn btn--secondary" to="/app/entrance-exam">Attempt history</Link>
      </div>
    </>
  )
}
