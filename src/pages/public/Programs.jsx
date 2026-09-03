import { Link } from 'react-router-dom'
import { ArrowRight, Clock3, Layers } from 'lucide-react'
import { courses, modules, programs } from '../../mock/programs.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'

export default function Programs() {
  useDocumentTitle('Programs')

  return (
    <>
      <section className="page-hero">
        <div className="page-width">
          <p className="eyebrow">Programs</p>
          <h1>Two pathways, sequenced by readiness.</h1>
          <p className="lead reading" style={{ marginTop: 'var(--s-5)' }}>
            Your entrance exam decides where you enter and what you can skip. Nothing here is a fixed
            sixteen-week march that every learner walks identically.
          </p>
        </div>
      </section>

      <section className="section section--paper">
        <div className="page-width stack-8">
          {programs.map((program) => {
            const programCourses = courses.filter((course) => course.programId === program.id)
            const moduleCount = programCourses.reduce((sum, course) => sum + course.moduleIds.length, 0)

            return (
              <article key={program.id} className="program-block">
                <div className="program-block-head">
                  <div>
                    <p className="eyebrow">{program.level}</p>
                    <h2>{program.title}</h2>
                    <p className="lead" style={{ marginTop: 'var(--s-3)' }}>{program.tagline}</p>
                  </div>
                  <dl className="kv-grid program-facts">
                    <div className="kv"><dt>Duration</dt><dd><Clock3 size={13} aria-hidden="true" /> ~{program.estimatedWeeks} weeks</dd></div>
                    <div className="kv"><dt>Courses</dt><dd><Layers size={13} aria-hidden="true" /> {programCourses.length}</dd></div>
                    <div className="kv"><dt>Modules</dt><dd>{moduleCount}</dd></div>
                  </dl>
                </div>

                <p className="reading">{program.summary}</p>

                <div className="course-grid">
                  {programCourses.map((course) => (
                    <div key={course.id} className="course-tile">
                      <p className="course-code">{course.code}</p>
                      <h3>{course.title}</h3>
                      <p>{course.summary}</p>
                      <ul className="module-mini-list">
                        {course.moduleIds.map((moduleId) => {
                          const module = modules.find((item) => item.id === moduleId)
                          return <li key={moduleId}>{module?.title}</li>
                        })}
                      </ul>
                    </div>
                  ))}
                </div>

                <Link className="link-arrow" to={program.code === 'AI00' ? '/ai-00' : '/ai-01'}>
                  More about {program.code === 'AI00' ? 'AI-00' : 'AI-01'} <ArrowRight size={15} />
                </Link>
              </article>
            )
          })}
        </div>
      </section>

      <section className="section section--sunken">
        <div className="page-width cta-band cta-band--light">
          <div>
            <h2>Not sure which applies to you?</h2>
            <p className="muted">That is what the entrance exam is for.</p>
          </div>
          <Link className="btn btn--lg" to="/entrance-exam">About the entrance exam <ArrowRight size={17} /></Link>
        </div>
      </section>
    </>
  )
}
