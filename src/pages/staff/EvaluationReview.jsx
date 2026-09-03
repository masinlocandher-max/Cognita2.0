import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { useAsync } from '../../hooks/useAsync.js'
import {
  appliedScoreOf, discardLocalEvaluation, getEvaluationByAttempt,
  saveEvaluationDraft, TASK1_CRITERIA, TASK2_CRITERIA,
} from '../../repositories/evaluatorRepository.js'
import { appliedTasks } from '../../features/cee/questionnaire.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { competencyProfile, PLACEMENTS, placementFor } from '../../services/placementService.js'
import { EvaluationStatus, PlacementCode } from '../../lib/status.js'
import StatusPill from '../../components/StatusPill.jsx'
import StateBlock, { LoadingRows } from '../../components/StateBlock.jsx'
import Alert from '../../components/Alert.jsx'
import Meter from '../../components/Meter.jsx'
import Modal from '../../components/Modal.jsx'
import { formatDateTime, formatMinutes } from '../../lib/format.js'

function RubricGroup({ title, criteria, rubric, onScore, taskPoints }) {
  const scored = criteria.reduce((sum, criterion) => sum + (rubric[criterion.id] ?? 0), 0)
  const max = criteria.reduce((sum, criterion) => sum + criterion.max, 0)

  return (
    <section className="rubric-group">
      <div className="row-between">
        <h3>{title}</h3>
        <span className="tabular muted">{scored}/{max} of {taskPoints} points</span>
      </div>

      {criteria.map((criterion) => (
        <div className="rubric-row" key={criterion.id}>
          <span id={`label-${criterion.id}`}>{criterion.label}</span>
          <div className="rubric-scale" role="radiogroup" aria-labelledby={`label-${criterion.id}`}>
            {Array.from({ length: criterion.max + 1 }).map((_, value) => (
              <label key={value} className={`rubric-option${rubric[criterion.id] === value ? ' is-selected' : ''}`}>
                <input
                  type="radio"
                  name={criterion.id}
                  checked={rubric[criterion.id] === value}
                  onChange={() => onScore(criterion.id, value)}
                />
                <span>{value}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

/**
 * Candidate review.
 *
 * Objective results are read-only context; the evaluator's work is the rubric,
 * the notes and the placement decision. Everything saved here is a local draft
 * and the screen says so — this build has no evaluator record to write to.
 */
export default function EvaluationReview() {
  const { attemptId } = useParams()
  const evaluation = useAsync(() => getEvaluationByAttempt(attemptId), [attemptId])
  useDocumentTitle('Candidate review')

  const [rubric, setRubric] = useState({})
  const [notes, setNotes] = useState('')
  const [decision, setDecision] = useState('')
  const [savedAt, setSavedAt] = useState(null)
  const [confirmFinal, setConfirmFinal] = useState(false)

  useEffect(() => {
    if (!evaluation.data) return
    setRubric(evaluation.data.rubric || {})
    setNotes(evaluation.data.notes || '')
    setDecision(evaluation.data.decision || '')
  }, [evaluation.data?.id])

  if (evaluation.loading) return <LoadingRows rows={5} height={90} />
  if (evaluation.error) return <StateBlock variant="error" description="This evaluation could not be loaded." />
  if (!evaluation.data) {
    return (
      <StateBlock
        variant="empty"
        title="Attempt not found"
        description="No evaluation record matches this attempt."
        action={<Link className="btn" to="/staff/evaluations">Back to the queue</Link>}
      />
    )
  }

  const data = evaluation.data
  const attempt = data.attempt
  const profile = competencyProfile(attempt.scores)
  const applied = appliedScoreOf({ rubric })
  const total = (attempt.scores.objectivePoints || 0) + (applied?.points || 0)

  const persist = async (changes) => {
    const saved = await saveEvaluationDraft(data.id, changes)
    setSavedAt(new Date().toISOString())
    return saved
  }

  const score = async (criterionId, value) => {
    const next = { ...rubric, [criterionId]: value }
    setRubric(next)
    await persist({ rubric: next, status: data.status === EvaluationStatus.PENDING_REVIEW ? EvaluationStatus.IN_REVIEW : data.status })
  }

  return (
    <div className="stack-6">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/staff/evaluations"><ArrowLeft size={13} aria-hidden="true" /> Evaluation queue</Link>
      </nav>

      <div className="page-head page-head-row">
        <div>
          <p className="eyebrow">Candidate review · {attempt.reference}</p>
          <h1>{data.learner?.fullName}</h1>
          <p>
            Submitted {formatDateTime(attempt.submittedAt)} · {formatMinutes(attempt.durationMinutes)} ·
            {' '}{data.learner?.municipality}
          </p>
        </div>
        <StatusPill status={data.status} />
      </div>

      <Alert tone="attention" title="Local draft only" icon="ShieldAlert">
        There is no evaluator record to write to in this build. Your rubric scores and notes are stored in this
        browser, are not attached to the candidate, and are not visible to anyone else.
      </Alert>

      <section className="review-grid">
        <div className="stack-6">
          <article className="card">
            <p className="card-title">Objective readiness</p>
            <div className="objective-summary">
              <p className="result-figure tabular">{attempt.scores.objectivePoints}<span>/70</span></p>
              <div className="stack-2" style={{ flex: 1 }}>
                {profile.map((area) => (
                  <Meter
                    key={area.id}
                    value={area.percentage}
                    max={100}
                    label={area.label}
                    valueText={`${area.percentage}%`}
                    tone={area.band.tone === 'positive' ? 'positive' : 'accent'}
                  />
                ))}
              </div>
            </div>
            <p className="card-note" style={{ marginTop: 'var(--s-4)' }}>
              Preliminary placement from the objective profile: <strong>{placementFor(attempt.preliminaryPlacement).name}</strong>
            </p>
          </article>

          {appliedTasks.map((task) => (
            <article className="card" key={task.id}>
              <div className="card-head">
                <p className="card-title">Task {task.number} · {task.title}</p>
                <span className="muted" style={{ fontSize: 'var(--text-xs)' }}>{task.points} points</span>
              </div>
              <p className="applied-scenario">{task.scenario}</p>
              <blockquote className="candidate-response">{attempt.applied[task.id] || 'No response submitted.'}</blockquote>
              <p className="card-note">{(attempt.applied[task.id] || '').trim().split(/\s+/).filter(Boolean).length} words</p>
            </article>
          ))}
        </div>

        <div className="stack-6">
          <article className="card">
            <div className="card-head">
              <p className="card-title">Rubric scoring</p>
              <span className="tabular muted">{applied?.points ?? 0}/30</span>
            </div>

            <RubricGroup title="Task 1 · Applied Communication" criteria={TASK1_CRITERIA} rubric={rubric} onScore={score} taskPoints={15} />
            <RubricGroup title="Task 2 · AI Response Evaluation" criteria={TASK2_CRITERIA} rubric={rubric} onScore={score} taskPoints={15} />

            <div className="rubric-total">
              <span>Indicative total</span>
              <strong className="tabular">{total}/100</strong>
            </div>
            <p className="field-hint">
              Objective {attempt.scores.objectivePoints}/70 plus applied {applied?.points ?? 0}/30.
              {applied && !applied.complete ? ` ${applied.scoredCriteria} of ${applied.totalCriteria} criteria scored.` : ''}
            </p>
          </article>

          <article className="card">
            <p className="card-title">Evaluator notes</p>
            <div className="field" style={{ marginTop: 'var(--s-3)' }}>
              <label htmlFor="notes" className="visually-hidden">Evaluator notes</label>
              <textarea
                id="notes"
                className="textarea"
                style={{ minHeight: 130 }}
                value={notes}
                placeholder="What the written work shows, and what it does not."
                onChange={(event) => setNotes(event.target.value)}
                onBlur={() => persist({ notes })}
              />
            </div>
          </article>

          <article className="card">
            <p className="card-title">Placement decision</p>
            <div className="field" style={{ marginTop: 'var(--s-3)' }}>
              <label htmlFor="decision">Final placement</label>
              <select
                id="decision"
                className="select"
                value={decision}
                onChange={(event) => { setDecision(event.target.value); persist({ decision: event.target.value }) }}
              >
                <option value="">No decision recorded</option>
                {Object.values(PLACEMENTS).map((placement) => (
                  <option key={placement.code} value={placement.code}>{placement.name}</option>
                ))}
              </select>
              <p className="field-hint">
                The objective profile indicates {placementFor(attempt.preliminaryPlacement).name}. An evaluator may
                depart from it — that is the point of reading the written work.
              </p>
            </div>

            <div className="wrap-actions" style={{ marginTop: 'var(--s-5)' }}>
              <button className="btn" type="button" onClick={() => setConfirmFinal(true)} disabled={!applied?.complete || !decision}>
                <Save size={15} /> Complete review
              </button>
              <button
                className="btn btn--ghost btn--sm"
                type="button"
                onClick={async () => { await discardLocalEvaluation(data.id); await evaluation.reload() }}
              >
                Discard local draft
              </button>
            </div>
            {!applied?.complete || !decision ? (
              <p className="field-hint">Score every rubric criterion and record a placement decision to complete the review.</p>
            ) : null}
            {savedAt ? <p className="field-hint" role="status">Draft saved locally {formatDateTime(savedAt)}</p> : null}
          </article>
        </div>
      </section>

      <Modal
        open={confirmFinal}
        onClose={() => setConfirmFinal(false)}
        title="Complete this review?"
        description="In a connected build this issues the placement to the candidate and closes the evaluation."
        actions={(
          <>
            <button className="btn btn--secondary" type="button" onClick={() => setConfirmFinal(false)}>Cancel</button>
            <button
              className="btn"
              type="button"
              onClick={async () => {
                await persist({ status: EvaluationStatus.REVIEWED, completedAt: new Date().toISOString(), decision: decision || PlacementCode.MANUAL_REVIEW })
                await evaluation.reload()
                setConfirmFinal(false)
              }}
            >
              Complete review
            </button>
          </>
        )}
      >
        <Alert tone="attention" title="Nothing reaches the candidate">
          This build has no server. Completing the review marks the record complete in this browser only — the
          candidate is not notified and no placement is issued to them.
        </Alert>
      </Modal>
    </div>
  )
}
