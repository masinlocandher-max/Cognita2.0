import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { findPathway, findPublicProgram } from '../../content/institute.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { useReveal } from '../../hooks/useReveal.js'

export default function ProgramDetail() {
  const { programId } = useParams()
  const program = findPublicProgram(programId)
  useDocumentTitle(program?.name)
  useReveal()

  if (!program) {
    return (
      <section className="inst-section inst-section--paper">
        <div className="page-width" style={{ maxWidth: '58ch' }}>
          <p className="inst-eyebrow" style={{ color: 'var(--brand-violet-600)' }}>Not found</p>
          <h1 style={{ fontSize: 'var(--display-md)' }}>This program is not in the directory.</h1>
          <p className="lead" style={{ marginTop: 'var(--s-5)' }}>
            The link may be out of date, or the program may have been renamed.
          </p>
          <div className="wrap-actions" style={{ marginTop: 'var(--s-7)' }}>
            <Link className="btn" to="/programs">All programs</Link>
            <Link className="btn btn--secondary" to="/">Institute home</Link>
          </div>
        </div>
      </section>
    )
  }

  const pathway = findPathway(program.pathwayId)

  return (
    <>
      <section className="inst-hero on-ink" style={{ paddingBlock: 'clamp(var(--s-9), 7vw, 112px)' }}>
        <div className="page-width inst-hero-inner">
          <div>
            <p className="inst-eyebrow">{pathway.name}</p>
            <h1 style={{ maxWidth: '16ch' }}>{program.name}</h1>
            <p className="inst-hero-lead">{program.summary}</p>
            <div className="inst-hero-actions">
              <Link className="btn btn--onink btn--lg" to="/admissions/apply">Apply to Cognita <ArrowRight size={17} /></Link>
              <Link className="btn btn--quiet-onink btn--lg" to="/admissions">Admissions information</Link>
            </div>
          </div>

          <aside className="hero-index" aria-label="Program summary">
            <p className="hero-index-label">Program summary</p>
            <ol>
              <li><span className="hero-index-num" aria-hidden="true">01</span><div><strong>Classification</strong><span>{program.classification}</span></div></li>
              <li><span className="hero-index-num" aria-hidden="true">02</span><div><strong>Format</strong><span>{program.format}</span></div></li>
              <li><span className="hero-index-num" aria-hidden="true">03</span><div><strong>Study load</strong><span>{program.studyLoad}</span></div></li>
            </ol>
          </aside>
        </div>
      </section>

      <section className="inst-section inst-section--paper">
        <div className="page-width statement-split" data-reveal>
          <div>
            <p className="inst-eyebrow" style={{ color: 'var(--brand-violet-600)' }}>Intended learner</p>
            <p className="statement" style={{ fontSize: 'clamp(20px, 2.2vw, 27px)' }}>{program.intendedLearner}</p>
          </div>

          <div>
            <h2 style={{ fontSize: 'var(--display-sm)', marginBottom: 'var(--s-5)' }}>Learning outcomes</h2>
            <ul className="outcome-list">
              {program.outcomes.map((outcome) => (
                <li key={outcome}><Check size={16} aria-hidden="true" /><span>{outcome}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="inst-section inst-section--sunken">
        <div className="page-width" data-reveal>
          <div className="section-marker">
            <span className="section-marker-num" aria-hidden="true">01</span>
            <div>
              <h2>What the program covers</h2>
              {program.personalized ? (
                <p>
                  This program is personalized. Your entrance exam identifies which areas apply to you, and
                  modules your result already covers are marked as waived rather than repeated.
                </p>
              ) : null}
            </div>
          </div>

          <ol className="topic-list">
            {program.topics.map((topic, index) => (
              <li key={topic}>
                <span className="topic-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span>{topic}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="inst-section inst-section--paper">
        <div className="page-width requirement-grid" data-reveal>
          <article>
            <h2>Entry requirements</h2>
            <ul className="clean-list">
              {program.entryRequirements.map((requirement) => <li key={requirement}>{requirement}</li>)}
            </ul>
          </article>

          <article>
            <h2>Completion requirements</h2>
            <ul className="clean-list">
              {program.completionRequirements.map((requirement) => <li key={requirement}>{requirement}</li>)}
            </ul>
          </article>

          <article>
            <h2>Format and study load</h2>
            <p className="muted" style={{ lineHeight: 1.75, fontSize: 'var(--text-sm)' }}>{program.format}</p>
            <p className="muted" style={{ lineHeight: 1.75, fontSize: 'var(--text-sm)', marginTop: 'var(--s-3)' }}>{program.studyLoad}</p>
          </article>
        </div>
      </section>

      <section className="inst-section inst-section--ink">
        <div className="page-width inst-close">
          <h2>Apply to {program.name}</h2>
          <p>Applications begin with a short set of questions, followed by the Cognita Entrance Exam.</p>
          <div className="inst-close-actions">
            <Link className="btn btn--onink btn--lg" to="/admissions/apply">Apply to Cognita <ArrowRight size={17} /></Link>
            <Link className="btn btn--quiet-onink btn--lg" to="/programs">All programs</Link>
          </div>
        </div>
      </section>
    </>
  )
}
