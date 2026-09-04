import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import StatusPill from '../../components/StatusPill.jsx'
import Meter from '../../components/Meter.jsx'
import Alert from '../../components/Alert.jsx'
import { AssessmentAttemptStatus } from '../../lib/status.js'

/**
 * Assessment outcome.
 *
 * Two figures, never merged: what was scored automatically, and what is held
 * for a person. Combining them would invent a mark for work nobody has read.
 */
export default function AssessmentResults({ assessment, result, backTo }) {
  const held = result.heldForReviewPoints > 0

  return (
    <div className="stack-6">
      <div className="page-head">
        <p className="eyebrow">Assessment submitted</p>
        <h1>{assessment.title}</h1>
      </div>

      <div className="grid-2">
        <article className="card">
          <div className="card-head">
            <p className="card-title">Scored automatically</p>
            <StatusPill status={AssessmentAttemptStatus.SCORED} />
          </div>
          <p className="result-figure tabular">{result.autoPoints}<span>/{result.autoMax}</span></p>
          <Meter value={result.autoPercentage || 0} max={100} valueText={`${result.autoPercentage ?? 0}%`} tone={(result.autoPercentage ?? 0) >= assessment.passMark ? 'positive' : 'accent'} label="Objective items" />
          <p className="card-note" style={{ marginTop: 'var(--s-3)' }}>
            Objective items only. Module pass mark is {assessment.passMark}%.
          </p>
        </article>

        <article className="card">
          <div className="card-head">
            <p className="card-title">Held for evaluator review</p>
            <StatusPill status={AssessmentAttemptStatus.AWAITING_REVIEW} />
          </div>
          <p className="result-figure tabular">{result.heldForReviewPoints}<span> points</span></p>
          <p className="card-note" style={{ marginTop: 'var(--s-3)' }}>
            Written work is read by a person against a rubric. It is not auto-marked and no provisional mark is
            shown for it here.
          </p>
        </article>
      </div>

      {held ? (
        <Alert tone="attention" title="Evaluator review is not connected in this build" icon="PlugZap">
          Your written responses are saved on this device. No reviewer has received them, and no final mark exists
          for this assessment.
        </Alert>
      ) : null}

      <section className="panel">
        <div className="panel-head"><p className="card-title">Question breakdown</p></div>
        <div className="panel-body panel-body--flush">
          <ul className="breakdown-list">
            {assessment.questions.map((question, index) => {
              const entry = result.perQuestion.find((item) => item.questionId === question.id)
              return (
                <li key={question.id}>
                  <span className="breakdown-index tabular">{index + 1}</span>
                  <span className="breakdown-prompt">{question.prompt}</span>
                  {entry?.autoScored
                    ? <StatusPill label={entry.correct ? `${entry.points}/${entry.max}` : `0/${entry.max}`} tone={entry.correct ? 'positive' : 'quiet'} icon={entry.correct ? 'CircleCheck' : 'Circle'} />
                    : <StatusPill label={entry?.answered ? 'With evaluator' : 'Not answered'} tone={entry?.answered ? 'info' : 'quiet'} icon={entry?.answered ? 'UserCheck' : 'Circle'} />}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <div className="wrap-actions">
        <Link className="btn" to={backTo}>Back to the module <ArrowRight size={16} /></Link>
        <Link className="btn btn--secondary" to="/portal/progress">View progress</Link>
      </div>
    </div>
  )
}
