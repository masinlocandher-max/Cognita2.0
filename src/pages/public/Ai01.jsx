import { Link } from 'react-router-dom'
import { ArrowRight, CircleCheck } from 'lucide-react'
import { useDocumentTitle } from '../../hooks/useRobots.js'

export default function Ai01() {
  useDocumentTitle('AI-01 Applied AI Practice')

  return (
    <>
      <section className="page-hero page-hero--ink on-ink">
        <div className="page-width">
          <p className="eyebrow eyebrow--light">AI-01</p>
          <h1>Applied AI practice.</h1>
          <p className="hero-lead" style={{ marginTop: 'var(--s-5)' }}>
            For learners whose readiness is already established. AI-01 is about producing work with AI that
            survives being questioned — by a client, an editor, or a regulator.
          </p>
        </div>
      </section>

      <section className="section section--paper">
        <div className="page-width prose-columns">
          <div>
            <h2>What you work on</h2>
            <p>
              Real deliverables from your own context: a campaign, a report, a research summary, a public
              communication. Not exercises invented to be easy to mark.
            </p>
          </div>
          <div>
            <h2>How the work is structured</h2>
            <p>
              Staged workflows — decomposing a deliverable into steps with checkable outputs, deciding where
              verification belongs in the chain, and keeping a record of what was generated versus confirmed.
            </p>
          </div>
          <div>
            <h2>How it is assessed</h2>
            <p>
              An applied portfolio reviewed by an evaluator. The question is not whether you used AI well; it is
              whether you can defend the output.
            </p>
          </div>
          <div>
            <h2>Who reaches AI-01 directly</h2>
            <p>
              Learners whose entrance exam shows readiness in both communication and AI understanding, confirmed
              by review of their written responses. Everyone else arrives via AI-00 — which is the ordinary route,
              not the consolation one.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="page-width">
          <div className="section-head">
            <p className="eyebrow">Entry</p>
            <h2>Two ways in.</h2>
          </div>
          <ul className="entry-list">
            <li><CircleCheck size={18} aria-hidden="true" /><div><strong>Direct placement</strong><p>Your entrance exam indicates AI-01 readiness and an evaluator confirms your written work.</p></div></li>
            <li><CircleCheck size={18} aria-hidden="true" /><div><strong>Progression from AI-00</strong><p>You complete the required AI-00 modules and their assessments.</p></div></li>
          </ul>
        </div>
      </section>

      <section className="section section--paper">
        <div className="page-width cta-band cta-band--light">
          <div>
            <h2>Find out whether you are ready.</h2>
            <p className="muted">The entrance exam gives an honest answer either way.</p>
          </div>
          <Link className="btn btn--lg" to="/entrance-exam">About the entrance exam <ArrowRight size={17} /></Link>
        </div>
      </section>
    </>
  )
}
