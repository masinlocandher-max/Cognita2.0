import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, BookOpenCheck, Compass, ScanSearch, ShieldCheck } from 'lucide-react'
import { useDocumentTitle } from '../../hooks/useRobots.js'

export default function Home() {
  useDocumentTitle(null)

  return (
    <>
      <section className="hero on-ink">
        <div className="page-width hero-inner">
          <div className="hero-copy">
            <p className="eyebrow eyebrow--light">Cognita Institute of Artificial Intelligence</p>
            <h1>Anyone can use AI. Far fewer can be trusted with the result.</h1>
            <p className="hero-lead">
              Cognita teaches the judgment that makes AI-assisted work defensible — clear communication,
              honest verification, and knowing which decisions a person still has to make.
            </p>
            <div className="wrap-actions">
              <Link className="btn btn--onink btn--lg" to="/app">Begin your student journey <ArrowRight size={17} /></Link>
              <Link className="btn btn--quiet-onink btn--lg" to="/entrance-exam">Learn about the entrance exam</Link>
            </div>
            <p className="hero-note">Placement-based admission. You start where you actually are, not where a syllabus assumes you are.</p>
          </div>

          <aside className="hero-card" aria-label="Where learners begin">
            <p className="eyebrow eyebrow--muted">Where learners begin</p>
            <ul className="hero-paths">
              <li>
                <strong>AI-00 Foundation</strong>
                <span>Communication, AI foundations, and verification judgment — the areas your entrance exam identifies.</span>
              </li>
              <li>
                <strong>AI-01 Applied Practice</strong>
                <span>For learners whose readiness profile already meets the threshold.</span>
              </li>
            </ul>
            <p className="hero-card-note">The Cognita Entrance Exam decides which. It is a placement instrument, not a pass-or-fail gate.</p>
          </aside>
        </div>
      </section>

      <section className="section section--paper">
        <div className="page-width">
          <div className="section-head">
            <p className="eyebrow">What Cognita is</p>
            <h2>An institute for the part of AI work that cannot be automated.</h2>
            <p>
              The tools change every few months. What does not change is whether you can state what you need,
              tell a real source from a convincing one, and take responsibility for what goes out with your name on it.
            </p>
          </div>

          <div className="grid-auto">
            <article className="value-card">
              <Compass aria-hidden="true" />
              <h3>Readiness before tooling</h3>
              <p>We do not start with prompts. We start with whether you can be understood, and whether you can tell when you are being misled.</p>
            </article>
            <article className="value-card">
              <ScanSearch aria-hidden="true" />
              <h3>Verification as a habit</h3>
              <p>Every programme treats an unverified claim as unfinished work — including a claim that arrived sounding confident.</p>
            </article>
            <article className="value-card">
              <ShieldCheck aria-hidden="true" />
              <h3>Judgment stays human</h3>
              <p>AI amplifies capability. It does not transfer accountability. Our assessments are built around that distinction.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="page-width">
          <div className="section-head">
            <p className="eyebrow">How it works</p>
            <h2>Four steps, in order.</h2>
          </div>

          <ol className="step-list">
            <li>
              <span className="step-index" aria-hidden="true">01</span>
              <div>
                <h3>Apply</h3>
                <p>A short application about your goals, your background, and the time you can commit. No entrance fee, no essay competition.</p>
              </div>
            </li>
            <li>
              <span className="step-index" aria-hidden="true">02</span>
              <div>
                <h3>Sit the entrance exam</h3>
                <p>Seventy minutes across communication, AI foundations, and research judgment, plus two written tasks a person reads.</p>
              </div>
            </li>
            <li>
              <span className="step-index" aria-hidden="true">03</span>
              <div>
                <h3>Receive your placement</h3>
                <p>A readiness profile, not a score out of a hundred. It names what to build and what you can skip.</p>
              </div>
            </li>
            <li>
              <span className="step-index" aria-hidden="true">04</span>
              <div>
                <h3>Begin at the right level</h3>
                <p>AI-00 or AI-01, with modules your profile already covers waived rather than repeated.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="section section--paper">
        <div className="page-width pathway-split">
          <div>
            <p className="eyebrow">The pathways</p>
            <h2>Two levels. One institution.</h2>
            <p className="lead" style={{ marginTop: 'var(--s-4)' }}>
              Most learners begin at AI-00. Some do not need all of it. A few are ready for AI-01 immediately.
              The point of the entrance exam is to tell the difference honestly.
            </p>
          </div>

          <div className="stack-6">
            <article className="pathway-card">
              <div className="row-between">
                <h3>AI-00 Foundation Pathway</h3>
                <span className="status status--info"><BookOpenCheck aria-hidden="true" /> Foundation</span>
              </div>
              <p>Communication, AI foundations, and verification judgment — personalised, so you take the areas your profile identifies.</p>
              <Link className="link-arrow" to="/ai-00">What AI-00 covers <ArrowRight size={15} /></Link>
            </article>

            <article className="pathway-card">
              <div className="row-between">
                <h3>AI-01 Applied AI Practice</h3>
                <span className="status status--accent"><BadgeCheck aria-hidden="true" /> Applied</span>
              </div>
              <p>Staged AI workflows on real deliverables, with verification built into the process rather than added at the end.</p>
              <Link className="link-arrow" to="/ai-01">What AI-01 covers <ArrowRight size={15} /></Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="page-width cta-band">
          <div>
            <h2>Find out where you would start.</h2>
            <p>The entrance exam takes about seventy minutes. It is a placement instrument — there is no pass mark to be anxious about.</p>
          </div>
          <div className="wrap-actions">
            <Link className="btn btn--onink btn--lg" to="/app">Begin student journey <ArrowRight size={17} /></Link>
            <Link className="btn btn--quiet-onink btn--lg" to="/entrance-exam">About the exam</Link>
          </div>
        </div>
      </section>
    </>
  )
}
