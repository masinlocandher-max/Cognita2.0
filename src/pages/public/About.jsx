import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { useReveal } from '../../hooks/useReveal.js'

export default function About() {
  useDocumentTitle('About Cognita')
  useReveal()

  return (
    <>
      <section className="inst-hero on-ink" style={{ paddingBlock: 'clamp(var(--s-9), 7vw, 112px)' }}>
        <div className="page-width">
          <p className="inst-eyebrow">About the institute</p>
          <h1 style={{ maxWidth: '19ch' }}>Education for the part of AI work that cannot be automated.</h1>
          <p className="inst-hero-lead">
            Cognita is an institute dedicated to structured, practical education in artificial
            intelligence — the understanding, discipline and judgment required to use these systems well.
          </p>
        </div>
      </section>

      <section className="inst-section inst-section--paper">
        <div className="page-width statement-split" data-reveal>
          <p className="statement">Capability with AI spread faster than the judgment required to use it.</p>
          <div className="statement-body">
            <p>
              Powerful systems became available to almost everyone in a very short period. The instruction
              that came with them was mostly promotional. People learned which buttons to press without
              learning what the system was doing, where it fails, or what remains their responsibility.
            </p>
            <p>
              Cognita exists in that gap. We teach artificial intelligence as a subject to be understood
              rather than a set of tricks to be collected, because understanding is what survives the next
              change of tool.
            </p>
          </div>
        </div>
      </section>

      <section className="inst-section inst-section--sunken">
        <div className="page-width" data-reveal>
          <div className="section-marker">
            <span className="section-marker-num" aria-hidden="true">01</span>
            <div>
              <h2>Educational philosophy</h2>
              <p>Five commitments that shape how Cognita designs study.</p>
            </div>
          </div>

          <div className="process-list">
            <article className="process-item">
              <span className="process-step" aria-hidden="true">One</span>
              <div>
                <h3>Responsible AI literacy</h3>
                <p>Students should understand what these systems do and do not do before being asked to rely on them. Literacy comes before technique.</p>
              </div>
            </article>
            <article className="process-item">
              <span className="process-step" aria-hidden="true">Two</span>
              <div>
                <h3>Structure over accumulation</h3>
                <p>Study is sequenced, with each module placed where it builds on what came before. A collection of tutorials produces fragments; a curriculum produces capability.</p>
              </div>
            </article>
            <article className="process-item">
              <span className="process-step" aria-hidden="true">Three</span>
              <div>
                <h3>Practical capability</h3>
                <p>Learning is designed around work students actually do — writing, research, analysis, communication — rather than exercises invented to be easy to mark.</p>
              </div>
            </article>
            <article className="process-item">
              <span className="process-step" aria-hidden="true">Four</span>
              <div>
                <h3>Human judgment</h3>
                <p>Artificial intelligence can extend what a person is able to do. It does not transfer accountability for the result, and our assessments are built around that distinction.</p>
              </div>
            </article>
            <article className="process-item">
              <span className="process-step" aria-hidden="true">Five</span>
              <div>
                <h3>Continuous learning</h3>
                <p>The subject changes. Study is designed so students can adapt to new systems using principles that hold, rather than relearning from the beginning each time.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="inst-section inst-section--paper">
        <div className="page-width statement-split" data-reveal>
          <div>
            <p className="inst-eyebrow" style={{ color: 'var(--brand-violet-600)' }}>Direction</p>
            <p className="statement">What Cognita is building toward.</p>
          </div>
          <div className="statement-body">
            <p>
              The institute is establishing its foundation and applied pathways first, with advanced and
              professional study to follow once those programs are defined and taught.
            </p>
            <p>
              Cognita is based in the Philippines and writes its materials with Filipino learners in mind —
              local examples, local institutions, local working conditions — while keeping the underlying
              capability applicable anywhere.
            </p>
          </div>
        </div>
      </section>

      <section className="inst-section inst-section--sunken">
        <div className="page-width" data-reveal>
          <div className="section-marker">
            <span className="section-marker-num" aria-hidden="true">02</span>
            <div>
              <h2>What we do not claim</h2>
              <p>Stated plainly, so nobody has to infer it.</p>
            </div>
          </div>

          <ul className="position-list">
            <li><strong>We do not publish accreditation or recognition status.</strong> None has been established. When it is, it will appear here with the detail required to check it.</li>
            <li><strong>We do not publish enrollment numbers, rankings or graduate outcomes.</strong> Cognita is early, and inventing figures would be the first dishonest thing we did.</li>
            <li><strong>We do not automatically mark judgment.</strong> Written reasoning is read by an evaluator.</li>
            <li><strong>We do not treat placement as ranking.</strong> A foundation placement identifies a starting point, not a verdict on a person.</li>
          </ul>
        </div>
      </section>

      <section className="inst-section inst-section--ink">
        <div className="page-width inst-close">
          <h2>Study with Cognita</h2>
          <p>Begin with the programs, or apply and complete the entrance exam.</p>
          <div className="inst-close-actions">
            <Link className="btn btn--onink btn--lg" to="/programs">Explore Programs <ArrowRight size={17} /></Link>
            <Link className="btn btn--quiet-onink btn--lg" to="/admissions/apply">Apply to Cognita</Link>
          </div>
        </div>
      </section>
    </>
  )
}
