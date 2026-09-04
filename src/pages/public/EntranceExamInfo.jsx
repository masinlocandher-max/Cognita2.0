import { Link } from 'react-router-dom'
import { ArrowRight, BrainCircuit, Clock3, FileText, Languages, ScanSearch, ShieldCheck } from 'lucide-react'
import { examMeta } from '../../features/cee/questionnaire.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { useReveal } from '../../hooks/useReveal.js'

/**
 * Public description of the entrance exam.
 *
 * Describes the exam as part of admissions and placement. It states the
 * structure a candidate needs in order to prepare, and deliberately publishes
 * neither the answer key nor the placement rules used to interpret a result.
 */
export default function EntranceExamInfo() {
  useDocumentTitle('Cognita Entrance Exam')
  useReveal()

  return (
    <>
      <section className="inst-hero on-ink" style={{ paddingBlock: 'clamp(var(--s-9), 7vw, 112px)' }}>
        <div className="page-width inst-hero-inner">
          <div>
            <p className="inst-eyebrow">Admissions · Placement</p>
            <h1 style={{ maxWidth: '15ch' }}>The Cognita Entrance Exam</h1>
            <p className="inst-hero-lead">
              A placement assessment completed as part of admissions. It establishes where your study
              begins — there is no pass mark and no ranking against other applicants.
            </p>
            <dl className="inst-hero-meta">
              <div><dt>Recommended time</dt><dd>{examMeta.recommendedMinutes} minutes</dd></div>
              <div><dt>Structure</dt><dd>{examMeta.objectiveItems} objective items, 2 written tasks</dd></div>
              <div><dt>Review</dt><dd>Written work read by an evaluator</dd></div>
            </dl>
          </div>

          <aside className="hero-index" aria-label="Exam structure">
            <p className="hero-index-label">Assessment structure</p>
            <ol>
              <li><span className="hero-index-num" aria-hidden="true">01</span><div><strong>Functional English and communication</strong><span>Comprehension, clarity, professional communication and precise instruction</span></div></li>
              <li><span className="hero-index-num" aria-hidden="true">02</span><div><strong>AI foundations</strong><span>Capability, limitation, responsible use and human responsibility</span></div></li>
              <li><span className="hero-index-num" aria-hidden="true">03</span><div><strong>Research and verification judgment</strong><span>Source evaluation, currency and verification behavior</span></div></li>
              <li><span className="hero-index-num" aria-hidden="true">04</span><div><strong>Applied written tasks</strong><span>Two written responses reviewed by an evaluator</span></div></li>
            </ol>
          </aside>
        </div>
      </section>

      <section className="inst-section inst-section--paper">
        <div className="page-width" data-reveal>
          <div className="section-marker">
            <span className="section-marker-num" aria-hidden="true">01</span>
            <div>
              <h2>What the exam measures</h2>
              <p>Readiness is broader than familiarity with AI terminology. Some questions test whether you can recognize missing information, uncertainty, or a claim that will not hold up.</p>
            </div>
          </div>

          <div className="grid-auto">
            <article className="value-card"><Languages aria-hidden="true" /><h3>Functional communication</h3><p>Comprehension, grammar, clarity, and the ability to give a precise instruction.</p></article>
            <article className="value-card"><BrainCircuit aria-hidden="true" /><h3>AI foundations</h3><p>How generative systems behave, where they fail, and who carries responsibility for the output.</p></article>
            <article className="value-card"><ScanSearch aria-hidden="true" /><h3>Research judgment</h3><p>Source authority, current information, verification behavior and uncertainty.</p></article>
            <article className="value-card"><FileText aria-hidden="true" /><h3>Applied instruction</h3><p>Turning a vague request into a controlled, responsible instruction.</p></article>
            <article className="value-card"><ShieldCheck aria-hidden="true" /><h3>Critical judgment</h3><p>Questioning unsupported output rather than accepting it because it sounds certain.</p></article>
          </div>
        </div>
      </section>

      <section className="inst-section inst-section--sunken">
        <div className="page-width requirement-grid" data-reveal>
          <article>
            <h2>There is no pass mark</h2>
            <p className="muted" style={{ fontSize: 'var(--text-sm)', lineHeight: 1.75 }}>
              The result is a readiness profile describing each area of the assessment. Beginning at the
              foundations pathway is the ordinary outcome for most applicants, not a rejection.
            </p>
          </article>
          <article>
            <h2>Two written tasks</h2>
            <p className="muted" style={{ fontSize: 'var(--text-sm)', lineHeight: 1.75 }}>
              A portion of the assessment is written work read by an evaluator against a rubric. Cognita does
              not mark judgment automatically, because keyword matching is not assessment.
            </p>
          </article>
          <article>
            <h2>Complete it independently</h2>
            <p className="muted" style={{ fontSize: 'var(--text-sm)', lineHeight: 1.75 }}>
              No AI assistant, search engine, translator or other person during the assessment. The result is
              only useful to you if it reflects what you can currently do.
            </p>
          </article>
          <article>
            <h2>How long it takes</h2>
            <p className="muted" style={{ fontSize: 'var(--text-sm)', lineHeight: 1.75 }}>
              {examMeta.recommendedMinutes} minutes is a recommendation rather than a limit. Your progress is
              saved as you work, so the assessment can be paused and resumed.
            </p>
          </article>
        </div>
      </section>

      <section className="inst-section inst-section--paper">
        <div className="page-width statement-split" data-reveal>
          <div>
            <p className="inst-eyebrow" style={{ color: 'var(--brand-violet-600)' }}>Preparation</p>
            <p className="statement">There is nothing to revise.</p>
          </div>
          <div className="statement-body">
            <p>
              The assessment measures current understanding and judgment rather than recall of material.
              Preparing for it by memorizing terminology would not improve your placement, and an
              artificially high placement is not in your interest — you would begin study beyond where your
              understanding supports.
            </p>
            <p>
              Answer as you would work. That produces a placement that fits.
            </p>
            <Link className="link-arrow" to="/admissions/apply">Begin an application <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="inst-section inst-section--ink">
        <div className="page-width inst-close">
          <h2>Apply and complete the assessment</h2>
          <p>The application takes a few minutes. The entrance exam follows it.</p>
          <div className="inst-close-actions">
            <Link className="btn btn--onink btn--lg" to="/admissions/apply">Apply to Cognita <ArrowRight size={17} /></Link>
            <Link className="btn btn--quiet-onink btn--lg" to="/admissions">Admissions information</Link>
          </div>
        </div>
      </section>
    </>
  )
}
