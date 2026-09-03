import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useAsync } from '../../hooks/useAsync.js'
import { useLearnerContext } from '../../hooks/useLearnerContext.js'
import { countSupersededAttempts, createAttempt } from '../../repositories/ceeRepository.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import ExamRunner from '../../features/cee/ExamRunner.jsx'
import { LoadingRows } from '../../components/StateBlock.jsx'
import Alert from '../../components/Alert.jsx'
import { formatDateTime } from '../../lib/format.js'

export default function EntranceExam() {
  useDocumentTitle('Entrance Exam')
  const { loading, learner, activeAttempt, submittedAttempt, reload } = useLearnerContext()
  const superseded = useAsync(() => countSupersededAttempts(), [])

  if (loading) return <LoadingRows rows={4} height={80} />

  if (!learner) {
    return (
      <>
        <div className="page-head">
          <h1>Cognita Entrance Exam</h1>
          <p>Create your learner record first so your attempt is saved against it.</p>
        </div>
        <Link className="btn" to="/app/profile">Create learner record <ArrowRight size={16} /></Link>
      </>
    )
  }

  if (submittedAttempt && !activeAttempt) {
    return (
      <>
        <div className="page-head">
          <p className="eyebrow">Cognita Entrance Exam</p>
          <h1>You have a submitted attempt.</h1>
          <p>Submitted {formatDateTime(submittedAttempt.submittedAt)}. Your readiness profile is available now; the applied responses still require institutional review.</p>
        </div>

        <Alert tone="info" title="Sitting the exam again is normal">
          A new attempt creates a new record. Previous attempts are kept rather than overwritten, because placement
          looks at your profile, not at a single best number.
        </Alert>

        <div className="wrap-actions" style={{ marginTop: 'var(--s-6)' }}>
          <Link className="btn" to="/app/results">View readiness profile <ArrowRight size={16} /></Link>
          <button
            className="btn btn--secondary"
            type="button"
            onClick={async () => { await createAttempt(learner); await reload() }}
          >
            Start another attempt
          </button>
        </div>
      </>
    )
  }

  return (
    <ExamRunner
      learner={learner}
      attempt={activeAttempt}
      supersededCount={superseded.data || 0}
      onChange={reload}
    />
  )
}
