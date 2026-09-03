import { Link } from 'react-router-dom'
import { ArrowRight, BrainCircuit, Clock3, FileCheck2, Languages, ScanSearch, ShieldCheck } from 'lucide-react'
import { examMeta } from '../../features/cee/questionnaire.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'

export default function EntranceExamInfo() {
  useDocumentTitle('Cognita Entrance Exam')

  return (
    <>
      <section className="page-hero page-hero--ink on-ink">
        <div className="page-width exam-hero-grid">
          <div>
            <p className="eyebrow eyebrow--light">Cognita Entrance Exam</p>
            <h1>Find the right place to begin.</h1>
            <p className="hero-lead" style={{ marginTop: 'var(--s-5)' }}>
              The CEE is a placement assessment. It identifies what you already have, what would benefit from
              reinforcement, and whether you are ready beyond the foundation level.
            </p>
            <div className="exam-meta-row">
              <span><Clock3 size={17} aria-hidden="true" /> {examMeta.recommendedMinutes} minutes recommended</span>
              <span><FileCheck2 size={17} aria-hidden="true" /> {examMeta.objectiveItems} objective items + 2 applied tasks</span>
            </div>
            <div className="wrap-actions" style={{ marginTop: 'var(--s-6)' }}>
              <Link className="btn btn--onink btn--lg" to="/app/entrance-exam">Begin the exam <ArrowRight size={17} /></Link>
            </div>
          </div>

          <aside className="exam-score-card" aria-label="Score composition">
            <p className="eyebrow eyebrow--muted">{examMeta.version}</p>
            <strong className="exam-score-total">{examMeta.totalPoints}</strong>
            <p>Total assessment points</p>
            <ul className="exam-score-breakdown">
              <li><b>30</b><span>Communication</span></li>
              <li><b>25</b><span>AI foundations</span></li>
              <li><b>15</b><span>Research judgment</span></li>
              <li><b>30</b><span>Applied response</span></li>
            </ul>
            <p className="exam-score-note">70 points are scored automatically. The remaining 30 are read by a person.</p>
          </aside>
        </div>
      </section>

      <section className="section section--paper">
        <div className="page-width">
          <div className="section-head">
            <p className="eyebrow">What it measures</p>
            <h2>Readiness is broader than knowing AI terms.</h2>
            <p>Some questions test whether you can recognise missing information, uncertainty, misleading claims, or unsafe assumptions.</p>
          </div>

          <div className="grid-auto">
            <article className="value-card"><Languages aria-hidden="true" /><h3>Functional communication</h3><p>Comprehension, grammar, clarity, and the ability to give a precise instruction.</p></article>
            <article className="value-card"><BrainCircuit aria-hidden="true" /><h3>AI foundations</h3><p>Capability, limitation, hallucination risk, prompting, and human responsibility.</p></article>
            <article className="value-card"><ScanSearch aria-hidden="true" /><h3>Research judgment</h3><p>Source authority, current information, verification behaviour, and uncertainty.</p></article>
            <article className="value-card"><FileCheck2 aria-hidden="true" /><h3>Applied instruction</h3><p>Turning a vague request into a controlled, responsible instruction.</p></article>
            <article className="value-card"><ShieldCheck aria-hidden="true" /><h3>Critical judgment</h3><p>Challenging unsupported AI output instead of accepting it because it sounds certain.</p></article>
          </div>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="page-width prose-columns">
          <div>
            <h2>It is not pass or fail</h2>
            <p>There is no pass mark. The result is a readiness profile that names a starting point. A foundation placement is the ordinary outcome, not a rejection.</p>
          </div>
          <div>
            <h2>Two written tasks</h2>
            <p>Thirty of the hundred points come from written work that an evaluator reads against a rubric. We do not auto-mark judgment, because keyword matching is not assessment.</p>
          </div>
          <div>
            <h2>Do it independently</h2>
            <p>No AI assistant, search engine, translator, or other person during the exam. The result is only useful to you if it reflects what you can currently do.</p>
          </div>
          <div>
            <h2>You can sit it again</h2>
            <p>Attempts are kept in your record rather than overwritten. Reapplying is normal.</p>
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="page-width readiness-panel">
          <div>
            <p className="eyebrow">Before you begin</p>
            <h2>Four commitments.</h2>
          </div>
          <ul className="clean-list">
            <li>No generative AI tools during the exam.</li>
            <li>No web browsing for the objective sections.</li>
            <li>Answer from your own understanding and judgment.</li>
            <li>Applied responses written in your own words.</li>
          </ul>
          <Link className="btn btn--lg" to="/app/entrance-exam">Start {examMeta.version} <ArrowRight size={17} /></Link>
        </div>
      </section>
    </>
  )
}
