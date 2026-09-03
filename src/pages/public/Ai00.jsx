import { Link } from 'react-router-dom'
import { ArrowRight, FastForward } from 'lucide-react'
import { courses, modules } from '../../mock/programs.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'

const AI00_COURSES = ['course_comm', 'course_aifound', 'course_research']

export default function Ai00() {
  useDocumentTitle('AI-00 Foundation Pathway')

  return (
    <>
      <section className="page-hero page-hero--ink on-ink">
        <div className="page-width">
          <p className="eyebrow eyebrow--light">AI-00</p>
          <h1>The foundation pathway.</h1>
          <p className="hero-lead" style={{ marginTop: 'var(--s-5)' }}>
            AI-00 builds the three things that decide whether AI-assisted work holds up: whether you can be
            understood, whether you know how the system fails, and whether you check.
          </p>
        </div>
      </section>

      <section className="section section--paper">
        <div className="page-width">
          <div className="section-head">
            <p className="eyebrow">Personalisation</p>
            <h2>You take the parts your profile identifies.</h2>
            <p>
              AI-00 is not one queue. A learner placed into AI-00 AI Foundations has the communication modules
              waived; a learner placed into AI-00 Communication Foundation has the AI modules waived. Waived
              modules stay visible and openable — we tell you what was skipped on your behalf.
            </p>
          </div>

          <div className="alert alert--info" style={{ maxWidth: '58ch' }}>
            <FastForward size={17} aria-hidden="true" />
            <div><strong>Waived, not hidden</strong>A module the exam says you do not need is marked waived. You can still open it.</div>
          </div>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="page-width stack-8">
          {AI00_COURSES.map((courseId) => {
            const course = courses.find((item) => item.id === courseId)
            const courseModules = course.moduleIds.map((id) => modules.find((module) => module.id === id))

            return (
              <article key={courseId} className="course-block">
                <div>
                  <p className="course-code">{course.code}</p>
                  <h2>{course.title}</h2>
                  <p className="lead" style={{ marginTop: 'var(--s-3)', maxWidth: '52ch' }}>{course.summary}</p>
                </div>
                <ul className="module-list">
                  {courseModules.map((module) => (
                    <li key={module.id}>
                      <h3>{module.title}</h3>
                      <p>{module.summary}</p>
                      <span className="muted" style={{ fontSize: 'var(--text-xs)' }}>
                        {module.lessonIds.length} {module.lessonIds.length === 1 ? 'lesson' : 'lessons'}
                        {module.assessmentId ? ' · module assessment' : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </section>

      <section className="section section--paper">
        <div className="page-width cta-band cta-band--light">
          <div>
            <h2>AI-00 begins with placement.</h2>
            <p className="muted">The entrance exam decides which modules apply to you.</p>
          </div>
          <Link className="btn btn--lg" to="/app">Begin student journey <ArrowRight size={17} /></Link>
        </div>
      </section>
    </>
  )
}
