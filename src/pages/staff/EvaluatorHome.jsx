import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useAsync } from '../../hooks/useAsync.js'
import { listEvaluations, queueCounts } from '../../repositories/evaluatorRepository.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { EvaluationStatus } from '../../lib/status.js'
import StatusPill from '../../components/StatusPill.jsx'
import StateBlock, { LoadingRows } from '../../components/StateBlock.jsx'
import Alert from '../../components/Alert.jsx'
import { formatDateTime } from '../../lib/format.js'

const STAGES = [
  { status: EvaluationStatus.PENDING_REVIEW, label: 'Pending review' },
  { status: EvaluationStatus.IN_REVIEW, label: 'In review' },
  { status: EvaluationStatus.REVIEWED, label: 'Reviewed' },
  { status: EvaluationStatus.PLACEMENT_ISSUED, label: 'Placement issued' },
]

export default function EvaluatorHome() {
  useDocumentTitle('Evaluator')
  const counts = useAsync(() => queueCounts(), [])
  const evaluations = useAsync(() => listEvaluations(), [])

  return (
    <div className="stack-7">
      <div className="page-head">
        <p className="eyebrow">Evaluator workspace</p>
        <h1>Applied response review.</h1>
        <p>Thirty of the hundred CEE points are read by a person. This is where that happens.</p>
      </div>

      <Alert tone="attention" title="Internal preview — no authentication, mock candidates" icon="ShieldAlert">
        This workspace has no staff sign-in behind it and the candidates below are invented records for building the
        interface. Anything you score here is a local draft in this browser.
      </Alert>

      {counts.loading ? <LoadingRows rows={1} height={90} /> : (
        <div className="grid-auto">
          {STAGES.map((stage) => (
            <article className="card metric-card" key={stage.status}>
              <p className="card-title">{stage.label}</p>
              <p className="metric-value tabular">{counts.data?.[stage.status] ?? 0}</p>
              <StatusPill status={stage.status} />
            </article>
          ))}
        </div>
      )}

      <section className="stack-4">
        <div className="row-between">
          <h2 style={{ fontSize: 'var(--display-sm)' }}>Needs attention</h2>
          <Link className="link-arrow" to="/staff/evaluations">Full queue <ArrowRight size={15} /></Link>
        </div>

        {evaluations.loading ? <LoadingRows rows={3} />
          : evaluations.error ? <StateBlock variant="error" />
          : (() => {
            const open = evaluations.data.filter((item) => item.status === EvaluationStatus.PENDING_REVIEW || item.status === EvaluationStatus.IN_REVIEW)
            if (!open.length) return <StateBlock variant="empty" title="Queue is clear" description="No attempts are waiting for review." />

            return (
              <ul className="queue-list">
                {open.map((evaluation) => (
                  <li key={evaluation.id}>
                    <div className="queue-main">
                      <Link className="queue-name" to={`/staff/evaluations/${evaluation.attemptId}`}>{evaluation.learner?.fullName}</Link>
                      <span className="muted">
                        {evaluation.attempt?.reference} · submitted {formatDateTime(evaluation.attempt?.submittedAt)}
                      </span>
                    </div>
                    <span className="queue-score tabular">{evaluation.attempt?.scores.objectivePoints}/70 objective</span>
                    <StatusPill status={evaluation.status} />
                  </li>
                ))}
              </ul>
            )
          })()}
      </section>
    </div>
  )
}
