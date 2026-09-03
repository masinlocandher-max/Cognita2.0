import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useDocumentTitle } from '../../hooks/useRobots.js'

export default function About() {
  useDocumentTitle('About')

  return (
    <>
      <section className="page-hero">
        <div className="page-width">
          <p className="eyebrow">About Cognita</p>
          <h1>An institute built around a specific gap.</h1>
          <p className="lead reading" style={{ marginTop: 'var(--s-5)' }}>
            AI capability spread faster than the judgment required to use it well. Cognita exists for the
            distance between having the tools and being trusted with the output.
          </p>
        </div>
      </section>

      <section className="section section--paper">
        <div className="page-width prose-columns">
          <div>
            <h2>Who it is for</h2>
            <p>
              Working people in the Philippines and beyond who already use AI, or are about to, and whose work
              carries consequence — communications staff, researchers, small business owners, teachers, local
              government workers, and anyone whose name goes on the final version.
            </p>
            <p>
              You do not need a technical background. You do need to be willing to check things.
            </p>
          </div>
          <div>
            <h2>What we teach</h2>
            <p>
              Functional communication, how generative systems actually behave, and verification that holds up
              when someone asks where a number came from. Tool training is the easy part and the part that
              expires; we treat it as a consequence of the foundations, not a substitute for them.
            </p>
          </div>
          <div>
            <h2>How learning works</h2>
            <p>
              Short lessons with worked contrasts between weak and strong practice, knowledge checks as you go,
              and module assessments where the written work is read by a person. Automatic marking is used where
              it is honest — objective items — and refused where it is not.
            </p>
          </div>
          <div>
            <h2>What makes it different</h2>
            <p>
              Placement. Most programmes put every learner through the same sequence. Cognita measures readiness
              first and then removes what you do not need. A learner with strong English and weak AI foundations
              should not sit through five communication modules to reach the part they came for.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="page-width">
          <div className="section-head">
            <p className="eyebrow">What we will not do</p>
            <h2>Positions, stated plainly.</h2>
          </div>
          <ul className="position-list">
            <li><strong>We do not auto-grade judgment.</strong> Written reasoning is read by an evaluator. Keyword matching is not assessment.</li>
            <li><strong>We do not sell certainty about AI.</strong> Where the evidence is contested, our material says so.</li>
            <li><strong>We do not treat placement as ranking.</strong> A foundation placement is a starting point, not a verdict on a person.</li>
            <li><strong>We do not overstate our own systems.</strong> This site is a frontend preview, and it says so wherever that matters.</li>
          </ul>
        </div>
      </section>

      <section className="section section--paper">
        <div className="page-width cta-band cta-band--light">
          <div>
            <h2>Start with the entrance exam.</h2>
            <p className="muted">It is the fastest honest answer to “where would I begin?”</p>
          </div>
          <Link className="btn btn--lg" to="/app">Begin student journey <ArrowRight size={17} /></Link>
        </div>
      </section>
    </>
  )
}
