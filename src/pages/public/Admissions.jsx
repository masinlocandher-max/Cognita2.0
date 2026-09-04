import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { admissionsSteps } from '../../content/institute.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { useReveal } from '../../hooks/useReveal.js'

export default function Admissions() {
  useDocumentTitle('Admissions')
  useReveal()

  return (
    <>
      <section className="inst-hero on-ink" style={{ paddingBlock: 'clamp(var(--s-9), 7vw, 112px)' }}>
        <div className="page-width">
          <p className="inst-eyebrow">Admissions</p>
          <h1 style={{ maxWidth: '17ch' }}>Admission is by placement.</h1>
          <p className="inst-hero-lead">
            Cognita does not rank applicants against one another. Admissions establishes where your study
            should begin, so you neither repeat what you already understand nor start beyond it.
          </p>
          <div className="inst-hero-actions">
            <Link className="btn btn--onink btn--lg" to="/admissions/apply">Apply to Cognita <ArrowRight size={17} /></Link>
            <Link className="btn btn--quiet-onink btn--lg" to="/programs">Explore Programs</Link>
          </div>
        </div>
      </section>

      <section className="inst-section inst-section--paper">
        <div className="page-width" data-reveal>
          <div className="section-marker">
            <span className="section-marker-num" aria-hidden="true">01</span>
            <div>
              <h2>The admissions process</h2>
              <p>Six steps. Most applicants complete the first four in a single sitting.</p>
            </div>
          </div>

          <div className="process-list">
            {admissionsSteps.map((step, index) => (
              <article className="process-item" key={step.id}>
                <span className="process-step" aria-hidden="true">Step {String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="inst-section inst-section--sunken">
        <div className="page-width requirement-grid" data-reveal>
          <article>
            <h2>Requirements</h2>
            <ul className="clean-list">
              <li>No degree requirement and no technical background</li>
              <li>Functional English, since study and assessment are conducted in English</li>
              <li>A reliable internet connection and a device you can study on</li>
              <li>Willingness to complete the entrance exam independently</li>
            </ul>
          </article>

          <article>
            <h2>Fees</h2>
            <p className="muted" style={{ fontSize: 'var(--text-sm)', lineHeight: 1.75 }}>
              Program fees are not published on this preview website, and no payment is collected anywhere on
              it. Publishing a figure Cognita has not set would be misleading, so we have left it out until
              the fee structure is confirmed.
            </p>
          </article>

          <article>
            <h2>Timelines</h2>
            <p className="muted" style={{ fontSize: 'var(--text-sm)', lineHeight: 1.75 }}>
              Written responses are reviewed in cycles by an evaluator. Turnaround depends on evaluator
              capacity in a given cycle and is confirmed at review rather than promised in advance.
            </p>
          </article>

          <article>
            <h2>Reapplying</h2>
            <p className="muted" style={{ fontSize: 'var(--text-sm)', lineHeight: 1.75 }}>
              You may sit the entrance exam more than once. Previous attempts are kept in your record rather
              than overwritten, because placement considers your profile rather than a single result.
            </p>
          </article>
        </div>
      </section>

      <section className="inst-section inst-section--paper">
        <div className="page-width statement-split" data-reveal>
          <div>
            <p className="inst-eyebrow" style={{ color: 'var(--brand-violet-600)' }}>The entrance exam</p>
            <p className="statement">A placement assessment, not a competitive entrance test.</p>
          </div>
          <div className="statement-body">
            <p>
              The Cognita Entrance Exam is part of the admissions process. It measures functional
              communication, understanding of artificial intelligence, and research judgment, and it includes
              two written tasks that an evaluator reads.
            </p>
            <p>
              There is no pass mark. The result is a readiness profile that identifies where your study
              begins and which modules apply to you.
            </p>
            <Link className="link-arrow" to="/admissions/entrance-exam">About the entrance exam <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="inst-section inst-section--ink">
        <div className="page-width inst-close">
          <h2>Begin your application</h2>
          <p>A short set of questions about your goals, background and available study time.</p>
          <div className="inst-close-actions">
            <Link className="btn btn--onink btn--lg" to="/admissions/apply">Apply to Cognita <ArrowRight size={17} /></Link>
            <Link className="btn btn--quiet-onink btn--lg" to="/contact">Ask a question</Link>
          </div>
        </div>
      </section>
    </>
  )
}
