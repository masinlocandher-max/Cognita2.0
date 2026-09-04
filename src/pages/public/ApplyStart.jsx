import { Link } from 'react-router-dom'
import { ArrowRight, Clock3, FileText, ListChecks } from 'lucide-react'
import { examMeta } from '../../features/cee/questionnaire.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { useReveal } from '../../hooks/useReveal.js'
import Alert from '../../components/Alert.jsx'

export default function ApplyStart() {
  useDocumentTitle('Apply to Cognita')
  useReveal()

  return (
    <>
      <section className="inst-hero on-ink" style={{ paddingBlock: 'clamp(var(--s-9), 7vw, 108px)' }}>
        <div className="page-width">
          <p className="inst-eyebrow">Admissions</p>
          <h1 style={{ maxWidth: '15ch' }}>Apply to Cognita</h1>
          <p className="inst-hero-lead">
            Two parts: a short application about your goals and background, then the entrance exam that
            establishes where your study begins.
          </p>
        </div>
      </section>

      <section className="inst-section inst-section--paper">
        <div className="page-width statement-split" data-reveal>
          <div>
            <p className="inst-eyebrow" style={{ color: 'var(--brand-violet-600)' }}>Before you begin</p>
            <p className="statement" style={{ fontSize: 'clamp(21px, 2.4vw, 30px)' }}>
              Set aside about ninety minutes if you intend to complete both parts in one sitting.
            </p>
          </div>

          <div className="stack-5">
            <article className="card">
              <div className="row" style={{ gap: 10, marginBottom: 'var(--s-3)' }}>
                <FileText size={17} aria-hidden="true" style={{ color: 'var(--brand-violet-600)' }} />
                <p className="card-title">Part one — application</p>
              </div>
              <p className="card-note">
                Seven questions about what you want to be able to do, your current work or study, and the
                time you can commit. Answer honestly rather than impressively: this is used to place you,
                not to rank you.
              </p>
            </article>

            <article className="card">
              <div className="row" style={{ gap: 10, marginBottom: 'var(--s-3)' }}>
                <ListChecks size={17} aria-hidden="true" style={{ color: 'var(--brand-violet-600)' }} />
                <p className="card-title">Part two — entrance exam</p>
              </div>
              <p className="card-note">
                {examMeta.objectiveItems} objective items across communication, AI foundations and research
                judgment, plus two written tasks read by an evaluator. Completed independently, without an AI
                assistant, search engine or translator.
              </p>
            </article>

            <article className="card">
              <div className="row" style={{ gap: 10, marginBottom: 'var(--s-3)' }}>
                <Clock3 size={17} aria-hidden="true" style={{ color: 'var(--brand-violet-600)' }} />
                <p className="card-title">You can stop and return</p>
              </div>
              <p className="card-note">
                Your progress is saved as you work, so both parts can be completed across more than one
                sitting on the same device.
              </p>
            </article>

            <Alert tone="attention" title="Preview build" icon="Laptop">
              Cognita’s admissions systems are not yet connected. Your application and assessment are stored
              on this device and are not transmitted to Cognita or reviewed by staff. You are welcome to
              complete both — this notice is so you know what does and does not happen when you do.
            </Alert>

            <div className="wrap-actions">
              <Link className="btn btn--brand btn--lg" to="/apply">Begin application <ArrowRight size={17} /></Link>
              <Link className="btn btn--secondary btn--lg" to="/admissions/entrance-exam">About the entrance exam</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
