import { Link, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useAsync } from '../../hooks/useAsync.js'
import { getCourse } from '../../repositories/learningRepository.js'
import { useLearningContext } from '../../hooks/useLearningContext.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import StatusPill from '../../components/StatusPill.jsx'
import StateBlock, { LoadingRows } from '../../components/StateBlock.jsx'
import Meter from '../../components/Meter.jsx'
import { formatMinutes } from '../../lib/format.js'

export default function CourseView() {
  const { courseId } = useParams()
  const course = useAsync(() => getCourse(courseId), [courseId])
  const { moduleStates, progress } = useLearningContext(course.data?.programId || null)
  useDocumentTitle(course.data?.title)

  if (course.loading) return <LoadingRows rows={4} height={100} />
  if (course.error) return <StateBlock variant="error" description="This course could not be loaded." />
  if (!course.data) return <StateBlock variant="empty" title="Course not found" action={<Link className="btn" to="/portal/dashboard">Back to learning</Link>} />

  const data = course.data
  const totalMinutes = data.modules.reduce((sum, module) => sum + module.lessons.reduce((inner, lesson) => inner + lesson.estimatedMinutes, 0), 0)

  return (
    <div className="stack-7">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/portal/dashboard">Learning</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/portal/program/${data.programId}`}>{data.program.title}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{data.title}</span>
      </nav>

      <div className="page-head">
        <p className="eyebrow">{data.code} · {data.modules.length} modules · {formatMinutes(totalMinutes)}</p>
        <h1>{data.title}</h1>
        <p>{data.summary}</p>
      </div>

      <ul className="module-cards">
        {data.modules.map((module) => {
          const state = moduleStates[module.id]
          return (
            <li key={module.id} className="module-card">
              <div className="row-between">
                <h3>{module.title}</h3>
                <StatusPill status={state?.state} />
              </div>
              <p>{module.summary}</p>
              <Meter value={state?.percentage || 0} max={100} valueText={`${state?.completedLessons || 0}/${module.lessons.length} lessons`} label={`${module.title} progress`} />

              <ul className="lesson-mini-list">
                {module.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <span>{lesson.title}</span>
                    <span className="muted">{formatMinutes(lesson.estimatedMinutes)}{progress?.[lesson.id]?.completedAt ? ' · done' : ''}</span>
                  </li>
                ))}
              </ul>

              {state?.locked
                ? <p className="field-hint">Unlocks when the earlier required modules are complete.</p>
                : <Link className="link-arrow" to={`/portal/module/${module.id}`}>Open module <ArrowRight size={15} /></Link>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
