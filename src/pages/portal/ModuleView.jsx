import { Link, useParams } from 'react-router-dom'
import { ArrowRight, ClipboardList } from 'lucide-react'
import { useAsync } from '../../hooks/useAsync.js'
import { getModule } from '../../repositories/learningRepository.js'
import { getAssessment } from '../../repositories/assessmentRepository.js'
import { useLearningContext } from '../../hooks/useLearningContext.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { LessonState, ModuleState } from '../../lib/status.js'
import StatusPill from '../../components/StatusPill.jsx'
import StateBlock, { LoadingRows } from '../../components/StateBlock.jsx'
import Meter from '../../components/Meter.jsx'
import Alert from '../../components/Alert.jsx'
import { formatMinutes } from '../../lib/format.js'

export default function ModuleView() {
  const { moduleId } = useParams()
  const module = useAsync(() => getModule(moduleId), [moduleId])
  const assessment = useAsync(() => (module.data?.assessmentId ? getAssessment(module.data.assessmentId) : Promise.resolve(null)), [module.data?.assessmentId])
  const { moduleStates } = useLearningContext(module.data?.program?.id || null)
  useDocumentTitle(module.data?.title)

  if (module.loading) return <LoadingRows rows={4} height={90} />
  if (!module.data) return <StateBlock variant="empty" title="Module not found" action={<Link className="btn" to="/portal/dashboard">Back to learning</Link>} />

  const data = module.data
  const state = moduleStates[data.id]

  return (
    <div className="stack-7">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/portal/dashboard">Learning</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/portal/course/${data.course.id}`}>{data.course.title}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{data.title}</span>
      </nav>

      <div className="page-head page-head-row">
        <div>
          <p className="eyebrow">{data.course.title}</p>
          <h1>{data.title}</h1>
          <p>{data.summary}</p>
        </div>
        <StatusPill status={state?.state} />
      </div>

      {state?.state === ModuleState.WAIVED ? (
        <Alert tone="info" title="Waived by your placement" icon="FastForward">
          Your readiness profile indicates you already have this. It is not required — but it is not hidden either, and
          you can work through it if you want to.
        </Alert>
      ) : null}

      {state?.locked ? (
        <Alert tone="attention" title="Locked" icon="Lock">
          This module unlocks when the earlier required modules in {data.course.title} are complete.
        </Alert>
      ) : null}

      <div className="card">
        <Meter value={state?.percentage || 0} max={100} valueText={`${state?.completedLessons || 0} of ${data.lessons.length} lessons`} label="Module progress" tone={state?.state === ModuleState.COMPLETED ? 'positive' : 'accent'} />
      </div>

      <section className="stack-4">
        <h2 style={{ fontSize: 'var(--display-sm)' }}>Lessons</h2>
        <ol className="lesson-list">
          {data.lessons.map((lesson, index) => {
            const lessonState = state?.lessonStates?.[lesson.id] || LessonState.AVAILABLE
            return (
              <li key={lesson.id}>
                <span className="lesson-index tabular" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div className="lesson-main">
                  {state?.locked
                    ? <span className="lesson-title">{lesson.title}</span>
                    : <Link className="lesson-title" to={`/portal/lesson/${lesson.id}`}>{lesson.title}</Link>}
                  <span className="muted">{formatMinutes(lesson.estimatedMinutes)}{lesson.outline ? ' · outline' : ''}</span>
                </div>
                <StatusPill status={lessonState} />
              </li>
            )
          })}
        </ol>
      </section>

      {assessment.data ? (
        <section className="card card--accent">
          <div className="card-head">
            <p className="card-title"><ClipboardList size={15} aria-hidden="true" style={{ verticalAlign: '-2px', marginRight: 6 }} /> Module assessment</p>
            <span className="muted" style={{ fontSize: 'var(--text-sm)' }}>~{assessment.data.estimatedMinutes} min</span>
          </div>
          <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--s-2)' }}>{assessment.data.title}</h3>
          <p className="card-note" style={{ marginBottom: 'var(--s-4)' }}>{assessment.data.summary}</p>
          <Link className="btn" to={`/portal/assessment/${assessment.data.id}`}>Open assessment <ArrowRight size={16} /></Link>
        </section>
      ) : null}
    </div>
  )
}
