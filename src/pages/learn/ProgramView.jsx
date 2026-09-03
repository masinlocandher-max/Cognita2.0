import { Link, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLearningContext } from '../../hooks/useLearningContext.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import StatusPill from '../../components/StatusPill.jsx'
import StateBlock, { LoadingRows } from '../../components/StateBlock.jsx'
import Meter from '../../components/Meter.jsx'

export default function ProgramView() {
  const { programId } = useParams()
  const { loading, program, moduleStates, summary } = useLearningContext(programId)
  useDocumentTitle(program?.title)

  if (loading) return <LoadingRows rows={4} height={100} />
  if (!program) return <StateBlock variant="empty" title="Programme not found" description="This programme does not exist in the current curriculum." action={<Link className="btn" to="/learn/dashboard">Back to learning</Link>} />

  return (
    <div className="stack-7">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/learn/dashboard">Learning</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{program.title}</span>
      </nav>

      <div className="page-head">
        <p className="eyebrow">{program.level} · ~{program.estimatedWeeks} weeks</p>
        <h1>{program.title}</h1>
        <p>{program.summary}</p>
      </div>

      <div className="card">
        <Meter value={summary.percentage} max={100} valueText={`${summary.percentage}%`} label="Programme completion" tone={summary.percentage === 100 ? 'positive' : 'accent'} />
      </div>

      {program.courses.map((course) => (
        <section className="stack-4" key={course.id}>
          <div className="row-between">
            <div>
              <p className="course-code">{course.code}</p>
              <h2 style={{ fontSize: 'var(--display-sm)' }}>{course.title}</h2>
            </div>
            <Link className="link-arrow" to={`/learn/course/${course.id}`}>Course detail <ArrowRight size={15} /></Link>
          </div>

          <ul className="module-cards">
            {course.modules.map((module) => {
              const state = moduleStates[module.id]
              return (
                <li key={module.id} className="module-card">
                  <div className="row-between">
                    <h3>{module.title}</h3>
                    <StatusPill status={state?.state} />
                  </div>
                  <p>{module.summary}</p>
                  <Meter value={state?.percentage || 0} max={100} valueText={`${state?.completedLessons}/${state?.totalLessons} lessons`} label={`${module.title} progress`} />
                  {state?.locked
                    ? <p className="field-hint">Unlocks when the earlier required modules in this course are complete.</p>
                    : <Link className="link-arrow" to={`/learn/module/${module.id}`}>Open module <ArrowRight size={15} /></Link>}
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
