import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLearningContext } from '../../hooks/useLearningContext.js'
import { useAsync } from '../../hooks/useAsync.js'
import { listAssessments, listAttemptsFor } from '../../repositories/assessmentRepository.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { ModuleState } from '../../lib/status.js'
import StatusPill from '../../components/StatusPill.jsx'
import StateBlock, { LoadingRows } from '../../components/StateBlock.jsx'
import Meter from '../../components/Meter.jsx'
import { formatDateTime } from '../../lib/format.js'

export default function ProgressView() {
  useDocumentTitle('Progress')
  const { loading, program, moduleStates, summary } = useLearningContext()

  const assessmentHistory = useAsync(async () => {
    const definitions = await listAssessments()
    const entries = await Promise.all(definitions.map(async (definition) => ({
      definition,
      attempts: await listAttemptsFor(definition.id),
    })))
    return entries.filter((entry) => entry.attempts.length > 0)
  }, [])

  if (loading) return <LoadingRows rows={4} height={90} />
  if (!program) return <StateBlock variant="error" title="Progress unavailable" />

  return (
    <div className="stack-7">
      <div className="page-head">
        <p className="eyebrow">Progress</p>
        <h1>What you have completed.</h1>
        <p>Lesson completion and assessment history for {program.title}.</p>
      </div>

      <div className="grid-auto">
        <article className="card">
          <p className="card-title">Lessons</p>
          <p className="result-figure tabular">{summary.completedLessons}<span>/{summary.totalLessons}</span></p>
          <Meter value={summary.percentage} max={100} valueText={`${summary.percentage}%`} label="Lesson completion" tone={summary.percentage === 100 ? 'positive' : 'accent'} />
        </article>
        <article className="card">
          <p className="card-title">Required modules</p>
          <p className="result-figure tabular">{summary.requiredTotal}</p>
          <p className="card-note">{summary.requiredComplete ? 'All required modules complete.' : 'In progress.'}</p>
        </article>
        <article className="card">
          <p className="card-title">Waived by placement</p>
          <p className="result-figure tabular">{summary.waivedCount}</p>
          <p className="card-note">Modules your readiness profile already covers.</p>
        </article>
      </div>

      <section className="stack-4">
        <h2 style={{ fontSize: 'var(--display-sm)' }}>Module status</h2>
        <div className="panel">
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Module</th>
                  <th scope="col">Course</th>
                  <th scope="col">Lessons</th>
                  <th scope="col">State</th>
                </tr>
              </thead>
              <tbody>
                {program.courses.flatMap((course) => course.modules.map((module) => {
                  const state = moduleStates[module.id]
                  return (
                    <tr key={module.id}>
                      <td className="cell-strong">
                        {state?.locked ? module.title : <Link to={`/learn/module/${module.id}`}>{module.title}</Link>}
                      </td>
                      <td>{course.title}</td>
                      <td className="cell-num">{state?.completedLessons}/{state?.totalLessons}</td>
                      <td><StatusPill status={state?.state || ModuleState.OPTIONAL} /></td>
                    </tr>
                  )
                }))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="stack-4">
        <h2 style={{ fontSize: 'var(--display-sm)' }}>Assessment history</h2>
        {assessmentHistory.loading ? <LoadingRows rows={2} />
          : !assessmentHistory.data?.length ? (
            <StateBlock variant="empty" title="No assessments submitted yet" description="Module assessments appear here once you submit them." />
          ) : (
            <ul className="attempt-list">
              {assessmentHistory.data.flatMap((entry) => entry.attempts.map((attempt) => (
                <li key={attempt.id} className="attempt-row">
                  <div className="attempt-main">
                    <strong>{entry.definition.title}</strong>
                    <span className="muted">{attempt.submittedAt ? `Submitted ${formatDateTime(attempt.submittedAt)}` : 'In progress'}</span>
                  </div>
                  <div className="attempt-score">
                    {attempt.result ? <strong className="tabular">{attempt.result.autoPoints}<small>/{attempt.result.autoMax} auto</small></strong> : null}
                    <StatusPill status={attempt.status} />
                  </div>
                </li>
              )))}
            </ul>
          )}
      </section>

      <div className="wrap-actions">
        <Link className="btn btn--secondary" to="/learn/dashboard">Back to learning <ArrowRight size={16} /></Link>
      </div>
    </div>
  )
}
