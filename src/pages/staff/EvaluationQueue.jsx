import { Link } from 'react-router-dom'
import { useAsync } from '../../hooks/useAsync.js'
import { listEvaluations } from '../../repositories/evaluatorRepository.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { EvaluationStatus } from '../../lib/status.js'
import { placementFor } from '../../services/placementService.js'
import DataTable from '../../components/DataTable.jsx'
import StatusPill from '../../components/StatusPill.jsx'
import { formatDateTime } from '../../lib/format.js'

export default function EvaluationQueue() {
  useDocumentTitle('Evaluation queue')
  const evaluations = useAsync(() => listEvaluations(), [])

  const rows = (evaluations.data || []).map((evaluation) => ({
    id: evaluation.id,
    attemptId: evaluation.attemptId,
    candidate: evaluation.learner?.fullName || 'Unknown',
    reference: evaluation.attempt?.reference || '—',
    submittedAt: evaluation.attempt?.submittedAt,
    objective: evaluation.attempt?.scores.objectivePoints ?? null,
    preliminary: evaluation.attempt?.preliminaryPlacement || null,
    status: evaluation.status,
    assignee: evaluation.assignee?.fullName || 'Unassigned',
    appliedScore: evaluation.appliedScore,
  }))

  const columns = [
    { id: 'candidate', label: 'Candidate', render: (row) => <Link className="cell-strong" to={`/staff/evaluations/${row.attemptId}`}>{row.candidate}</Link> },
    { id: 'reference', label: 'Attempt' },
    { id: 'submittedAt', label: 'Submitted', render: (row) => formatDateTime(row.submittedAt) },
    { id: 'objective', label: 'Objective', numeric: true, render: (row) => `${row.objective}/70` },
    { id: 'preliminary', label: 'Preliminary', render: (row) => (row.preliminary ? placementFor(row.preliminary).name : '—') },
    { id: 'appliedScore', label: 'Applied', sortable: false, render: (row) => (row.appliedScore ? `${row.appliedScore.points}/30${row.appliedScore.complete ? '' : ' (partial)'}` : 'Not scored') },
    { id: 'assignee', label: 'Evaluator' },
    { id: 'status', label: 'Status', render: (row) => <StatusPill status={row.status} /> },
  ]

  return (
    <div className="stack-6">
      <div className="page-head">
        <p className="eyebrow">Evaluator workspace</p>
        <h1>Evaluation queue</h1>
        <p>Every submitted attempt and where it sits in review.</p>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        loading={evaluations.loading}
        error={evaluations.error}
        searchFields={['candidate', 'reference', 'assignee']}
        searchPlaceholder="Search candidate or attempt"
        filters={[{
          id: 'status',
          label: 'Status',
          options: [
            { value: EvaluationStatus.PENDING_REVIEW, label: 'Pending review' },
            { value: EvaluationStatus.IN_REVIEW, label: 'In review' },
            { value: EvaluationStatus.REVIEWED, label: 'Reviewed' },
            { value: EvaluationStatus.PLACEMENT_ISSUED, label: 'Placement issued' },
          ],
        }]}
        emptyTitle="No attempts match"
        emptyDescription="Adjust the search or filter."
        caption="Evaluation queue"
      />
    </div>
  )
}
