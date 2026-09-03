import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen } from 'lucide-react'
import { useLearningContext } from '../../hooks/useLearningContext.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { placementFor } from '../../services/placementService.js'
import { ModuleState } from '../../lib/status.js'
import StatusPill from '../../components/StatusPill.jsx'
import StateBlock, { LoadingRows } from '../../components/StateBlock.jsx'
import Meter from '../../components/Meter.jsx'
import Alert from '../../components/Alert.jsx'
import { formatMinutes } from '../../lib/format.js'

export default function LearnDashboard() {
  useDocumentTitle('Learning')
  const { loading, program, moduleStates, summary, nextLesson, placementCode } = useLearningContext()

  if (loading) return <LoadingRows rows={4} height={100} />
  if (!program) return <StateBlock variant="error" title="Programme unavailable" description="The programme could not be loaded." />

  const placement = placementCode ? placementFor(placementCode) : null

  return (
    <div className="stack-7">
      <div className="page-head page-head-row">
        <div>
          <p className="eyebrow">{program.title}</p>
          <h1>Your learning</h1>
          <p>{program.tagline}</p>
        </div>
        {placement ? <StatusPill label={placement.name} tone="accent" icon="MapPin" /> : <StatusPill label="Preview — no placement yet" tone="quiet" icon="Eye" />}
      </div>

      {!placement ? (
        <Alert tone="info" title="You are previewing the pathway">
          Without a placement, every module is shown as available. Once your entrance exam is placed, modules your
          profile already covers are marked waived and the rest are sequenced for you.
        </Alert>
      ) : null}

      {nextLesson ? (
        <section className="next-action" aria-labelledby="continue-heading">
          <div>
            <p className="eyebrow">Continue</p>
            <h2 id="continue-heading">{nextLesson.lesson.title}</h2>
            <p>{nextLesson.module.title} · {nextLesson.course.title} · {formatMinutes(nextLesson.lesson.estimatedMinutes)}</p>
          </div>
          <Link className="btn btn--lg" to={`/learn/lesson/${nextLesson.lesson.id}`}>Open lesson <ArrowRight size={17} /></Link>
        </section>
      ) : (
        <section className="next-action">
          <div>
            <p className="eyebrow">Programme</p>
            <h2>Every available module is complete.</h2>
            <p>Your required modules are done. Certificates reflect completion once evaluator review exists.</p>
          </div>
          <Link className="btn btn--lg" to="/learn/certificates">View certificates <ArrowRight size={17} /></Link>
        </section>
      )}

      <section className="card">
        <div className="card-head">
          <p className="card-title">Programme progress</p>
          <span className="muted" style={{ fontSize: 'var(--text-sm)' }}>
            {summary.completedLessons} of {summary.totalLessons} lessons
            {summary.waivedCount ? ` · ${summary.waivedCount} modules waived` : ''}
          </span>
        </div>
        <Meter value={summary.percentage} max={100} valueText={`${summary.percentage}%`} label="Overall completion" tone={summary.percentage === 100 ? 'positive' : 'accent'} />
      </section>

      <section className="stack-5">
        <h2 style={{ fontSize: 'var(--display-sm)' }}>Courses</h2>
        {program.courses.map((course) => {
          const completedModules = course.modules.filter((module) => moduleStates[module.id]?.state === ModuleState.COMPLETED).length

          return (
            <article className="card" key={course.id}>
              <div className="card-head">
                <div>
                  <p className="course-code">{course.code}</p>
                  <h3 style={{ fontSize: 'var(--text-xl)', marginTop: 4 }}>{course.title}</h3>
                </div>
                <span className="muted" style={{ fontSize: 'var(--text-sm)' }}>{completedModules}/{course.modules.length} modules</span>
              </div>
              <p className="card-note" style={{ marginBottom: 'var(--s-4)' }}>{course.summary}</p>

              <ul className="module-rows">
                {course.modules.map((module) => {
                  const state = moduleStates[module.id]
                  const locked = state?.locked

                  return (
                    <li key={module.id} className={locked ? 'is-locked' : undefined}>
                      <div className="module-row-main">
                        {locked ? (
                          <span className="module-row-title">{module.title}</span>
                        ) : (
                          <Link className="module-row-title" to={`/learn/module/${module.id}`}>{module.title}</Link>
                        )}
                        <span className="muted">{state?.completedLessons}/{state?.totalLessons} lessons</span>
                      </div>
                      <StatusPill status={state?.state} />
                    </li>
                  )
                })}
              </ul>

              <Link className="link-arrow" to={`/learn/course/${course.id}`} style={{ marginTop: 'var(--s-4)' }}>
                <BookOpen size={15} aria-hidden="true" /> Open course <ArrowRight size={15} />
              </Link>
            </article>
          )
        })}
      </section>
    </div>
  )
}
