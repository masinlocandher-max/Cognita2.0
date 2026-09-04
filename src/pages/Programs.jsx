import { ArrowRight, BookOpenCheck, CheckCircle2, GraduationCap, Info, Lock, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { PROGRAMS, getAccount, getApplication, getEnrollment, selectProgram } from '../lib/admissions'
import { FOUNDATION_BRIDGE } from '../data/programs'
import { resolveAdmissionState, StatusPill } from '../components/AdmissionStatus'
import { useReveal } from '../lib/useReveal'

/**
 * Program information and program selection.
 *
 * Program information is public: docs/WEBSITE-CONTENT.md states that browsing
 * Cognita programs does not require enrollment, and the homepage carries a
 * public "Explore Our Programs" call to action.
 *
 * Program *selection* remains gated on a passing CEE decision, per the
 * canonical lifecycle. Browsing is open; enrolling is earned.
 */

const ICONS = { 'professional-ai-program': GraduationCap, 'skills-lab': Sparkles }

const DETAIL = {
  'professional-ai-program': {
    heading: 'Cognita Professional AI Program',
    intended: 'Learners who benefit from structure, deadlines, live guidance, human feedback, cohort accountability, and an intensive applied-learning environment.',
    structure: [
      'Foundation layer of up to four weeks, adjusted through CEE readiness evidence',
      'Six-week specialization in a chosen track',
      'Structured weekly progression with real deliverables',
      'Mentor and facilitator review, with revision where work does not meet standard',
      'Applied portfolio evidence and a capstone project',
    ],
    outcomes: [
      'Apply AI to professional work with judgment rather than by imitation',
      'Produce reviewed deliverables that meet a defined standard',
      'Build portfolio evidence of demonstrated capability',
      'Complete a capstone assessed on competency rather than attendance',
    ],
    assessment: 'Required outputs, mentor review, revision where needed, portfolio evidence, capstone completion, and a competency-based completion decision.',
  },
  'skills-lab': {
    heading: 'Cognita Skills Lab',
    intended: 'Independent learners who need greater control over when and how they study, without lowering the academic standard required to complete the program.',
    structure: [
      'Eight-module core covering foundations through capstone',
      'Recommended four-week rhythm: Understand, Apply, Build, Protect and Prove',
      'Learners may pause, resume, repeat lessons, and resubmit selected exercises',
      'A recommended rhythm rather than a hard deadline — learners may move faster or slower',
    ],
    outcomes: [
      'Frame problems before reaching for a tool',
      'Design instructions and verify what comes back',
      'Build AI-assisted professional workflows you can defend',
      'Complete a capstone and a professional defense',
    ],
    assessment: 'All required outputs and assessments must be completed before the final credential is unlocked.',
  },
}

export default function Programs() {
  useReveal()
  const navigate = useNavigate()
  const application = getApplication()
  const enrollment = getEnrollment()
  const account = getAccount()
  const state = resolveAdmissionState(application, enrollment, account)

  const canSelect = application?.ceeDecision?.status === 'passed'
  const readiness = application?.placement?.title || null

  const choose = (programId) => {
    if (!canSelect) return
    selectProgram(programId)
    navigate('/payment')
  }

  return (
    <>
      <section className="section section--white" style={{ paddingBottom: 'clamp(28px, 4vw, 44px)' }}>
        <div className="page-width">
          <div className="section-heading">
            <p className="section-label">Explore our programs</p>
            <h1 style={{ fontSize: 'clamp(28px, 3.6vw, 44px)', color: 'var(--cognita-navy)', lineHeight: 1.12 }}>
              Learning designed for Filipino learners.
            </h1>
            <p>
              Cognita Institute develops structured training programs that help learners build practical
              knowledge, strengthen foundational skills, and develop capabilities they can apply beyond the
              classroom. Our programs combine flexible learning with clear standards, guided progression,
              assessments, and measurable learning outcomes.
            </p>
          </div>

          {canSelect ? (
            <div className="ci-notice ci-notice--info" role="status">
              <CheckCircle2 size={17} aria-hidden="true" />
              <div>
                <strong>Program selection is open to you.</strong>
                You passed the Cognita Entrance Examination
                {readiness ? <> and your readiness evidence indicates <strong style={{ display: 'inline' }}>{readiness}</strong></> : null}.
                Choose the route that fits how you need to study. Final pathway requirements remain subject to
                Cognita academic policy and evaluator guidance.
              </div>
            </div>
          ) : (
            <div className="ci-notice" role="status">
              <Info size={17} aria-hidden="true" />
              <div>
                <strong>Browsing does not require enrollment.</strong>
                Program information on this page is public. Selecting a program and enrolling opens after a
                passing decision in the Cognita admission process.
                {application ? <> Your application is currently <strong style={{ display: 'inline' }}>{state.label.toLowerCase()}</strong>.</> : null}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section section--soft" style={{ paddingTop: 'clamp(28px, 4vw, 44px)' }}>
        <div className="page-width ci-reveal">
          <div className="ci-routes">
            {PROGRAMS.map((program) => {
              const Icon = ICONS[program.id] || BookOpenCheck
              const detail = DETAIL[program.id]
              const selected = enrollment?.programId === program.id

              return (
                <article className={`ci-route ci-route--full ${selected ? 'is-selected' : ''}`} key={program.id}>
                  <span className="ci-route-code"><Icon size={13} aria-hidden="true" /> {program.code}</span>
                  <h2>{detail.heading}</h2>
                  <p className="ci-route-meta">{program.duration} · {program.delivery}</p>
                  <p>{program.summary}</p>

                  <div className="ci-route-section">
                    <p className="ci-card-title">Intended learners</p>
                    <p>{detail.intended}</p>
                  </div>

                  <div className="ci-route-section">
                    <p className="ci-card-title">Learning outcomes</p>
                    <ul className="ci-route-list">
                      {detail.outcomes.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>

                  <div className="ci-route-section">
                    <p className="ci-card-title">Program structure</p>
                    <ul className="ci-route-list">
                      {detail.structure.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>

                  {program.specializations ? (
                    <div className="ci-route-section">
                      <p className="ci-card-title">Initial specialization tracks</p>
                      <ul className="ci-route-list">
                        {program.specializations.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  ) : null}

                  {program.modules ? (
                    <div className="ci-route-section">
                      <p className="ci-card-title">Eight-module core</p>
                      <ol className="ci-module-list">
                        {program.modules.map((item, index) => (
                          <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>
                        ))}
                      </ol>
                    </div>
                  ) : null}

                  <dl className="ci-route-facts">
                    <div><dt>Learning format</dt><dd>{program.delivery}</dd></div>
                    <div><dt>Estimated duration</dt><dd>{program.duration}</dd></div>
                    <div><dt>Entry requirement</dt><dd>Passing CEE decision</dd></div>
                    <div><dt>Completion</dt><dd>{detail.assessment.split('.')[0]}</dd></div>
                    <div><dt>Approved fees</dt><dd>Not yet published</dd></div>
                    <div><dt>Credential</dt><dd>Pending academic approval</dd></div>
                  </dl>

                  {canSelect ? (
                    <button className="button button--block" type="button" onClick={() => choose(program.id)}>
                      {selected ? 'Continue with this program' : 'Choose this program'} <ArrowRight size={17} />
                    </button>
                  ) : (
                    <div className="ci-route-locked">
                      <Lock size={14} aria-hidden="true" />
                      <span>Selection opens after a passing admission decision.</span>
                    </div>
                  )}
                </article>
              )
            })}
          </div>

          <p className="mvp-note" style={{ marginTop: '18px', maxWidth: '70ch' }}>
            Fees, credential names, and the final curriculum map are still subject to academic and commercial
            approval. Cognita publishes them only once approved, rather than advertising figures that have not
            been set.
          </p>
        </div>
      </section>

      <section className="section section--white">
        <div className="page-width ci-reveal">
          <div className="ci-bridge">
            <div>
              <span className="ci-bridge-tag"><BookOpenCheck size={13} aria-hidden="true" /> Academic placement, not a program choice</span>
              <h3>{FOUNDATION_BRIDGE.name}</h3>
              <p>
                AI-00 is Cognita’s foundational support pathway for learners who need additional preparation
                before or alongside a chosen route. It is assigned through academic placement rather than
                marketed as a normal public program choice, and it cannot be purchased.
              </p>
              <ul className="ci-route-list" style={{ marginTop: '16px' }}>
                {FOUNDATION_BRIDGE.areas.map((area) => <li key={area}>{area}</li>)}
              </ul>
            </div>
            <div>
              <p className="ci-card-title">Pathway outcomes from readiness evidence</p>
              <div className="ci-pathways">
                <div className="ci-pathway"><b>Foundation Required</b><span>Substantial foundational support before advanced specialization.</span></div>
                <div className="ci-pathway"><b>Foundation Accelerated</b><span>Selected foundation requirements rather than repeating mastered material.</span></div>
                <div className="ci-pathway"><b>Direct Track Entry</b><span>Ready to move directly into the applicable program structure.</span></div>
              </div>
              {readiness ? (
                <div className="ci-notice ci-notice--info" style={{ marginTop: '16px' }}>
                  <Info size={16} aria-hidden="true" />
                  <div>
                    <strong>Your readiness indication: {readiness}</strong>
                    This is readiness evidence from your examination, not a final academic decision. Evaluator
                    review and Cognita academic policy determine your final pathway.
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="page-width" style={{ textAlign: 'center', display: 'grid', justifyItems: 'center', gap: '18px' }}>
          <h2 style={{ fontSize: 'clamp(23px, 3vw, 34px)', color: 'var(--cognita-navy)', maxWidth: '22ch' }}>
            Your program begins after admission.
          </h2>
          <p style={{ maxWidth: '52ch', fontSize: '16.5px', lineHeight: 1.7, color: 'var(--cognita-muted)' }}>
            Enrollment requires successful completion of the applicable Cognita admission process.
          </p>
          <div className="ci-row" style={{ justifyContent: 'center' }}>
            {canSelect ? (
              <StatusPill state={state} />
            ) : (
              <>
                <Link className="button" to="/apply">{application ? 'View your application' : 'Begin Your Application'} <ArrowRight size={17} /></Link>
                <a className="button button--ghost" href="/#admission">View the Admission Process</a>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
