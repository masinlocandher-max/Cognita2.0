import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useDocumentTitle } from '../../hooks/useRobots.js'

export default function Admissions() {
  useDocumentTitle('Admissions')

  return (
    <>
      <section className="page-hero">
        <div className="page-width">
          <p className="eyebrow">Admissions</p>
          <h1>Admission by readiness, not by ranking.</h1>
          <p className="lead reading" style={{ marginTop: 'var(--s-5)' }}>
            Cognita does not select a cohort by competition. The admissions process exists to place you
            correctly — which means the honest answer is sometimes “start at the foundation”.
          </p>
        </div>
      </section>

      <section className="section section--paper">
        <div className="page-width">
          <div className="section-head">
            <p className="eyebrow">The process</p>
            <h2>What happens, in order.</h2>
          </div>

          <ol className="step-list step-list--compact">
            <li>
              <span className="step-index" aria-hidden="true">01</span>
              <div>
                <h3>Create your learner record</h3>
                <p>Name, email, and where you are based. In this preview build the record lives on your device.</p>
              </div>
            </li>
            <li>
              <span className="step-index" aria-hidden="true">02</span>
              <div>
                <h3>Complete the application</h3>
                <p>Seven questions about your goals, background, and available time. Ten minutes, honestly answered.</p>
              </div>
            </li>
            <li>
              <span className="step-index" aria-hidden="true">03</span>
              <div>
                <h3>Sit the Cognita Entrance Exam</h3>
                <p>Seventy minutes recommended. Forty-five objective items and two written tasks, done independently.</p>
              </div>
            </li>
            <li>
              <span className="step-index" aria-hidden="true">04</span>
              <div>
                <h3>Institutional review</h3>
                <p>An evaluator reads your two written responses against a published rubric. This is a person, so it is not instant.</p>
              </div>
            </li>
            <li>
              <span className="step-index" aria-hidden="true">05</span>
              <div>
                <h3>Placement and enrolment</h3>
                <p>You receive a readiness profile, a placement, and the modules that apply to you.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="page-width prose-columns">
          <div>
            <h2>Requirements</h2>
            <p>No degree requirement, no technical background, no prior AI experience. You need functional English, an internet connection, and the willingness to do the work independently.</p>
          </div>
          <div>
            <h2>Cost</h2>
            <p>Fees are not published on this preview build, and no payment is collected anywhere on this site. Anything else would be inventing a commitment we cannot currently honour.</p>
          </div>
          <div>
            <h2>Timelines</h2>
            <p>Applied responses are reviewed in weekly cycles. The exact turnaround depends on evaluator capacity in a given cycle and is confirmed at review, not promised in advance.</p>
          </div>
          <div>
            <h2>Reapplying</h2>
            <p>You can sit the entrance exam more than once. Previous attempts stay in your record rather than being overwritten — placement looks at your profile, not your best single number.</p>
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="page-width cta-band cta-band--light">
          <div>
            <h2>Begin your application.</h2>
            <p className="muted">Start with a learner record, then the application, then the exam.</p>
          </div>
          <Link className="btn btn--lg" to="/app">Begin student journey <ArrowRight size={17} /></Link>
        </div>
      </section>
    </>
  )
}
