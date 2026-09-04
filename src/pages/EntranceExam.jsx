import {
  ArrowRight, BrainCircuit, Clock3, FileCheck2, HeartHandshake, Languages,
  LockKeyhole, ScrollText, SearchCheck, ShieldCheck,
} from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { getAccount, getApplication, getEnrollment, verifyCeeInvite } from '../lib/admissions'
import AdmissionStatusPanel, { StatusPill, resolveAdmissionState } from '../components/AdmissionStatus'
import { useReveal } from '../lib/useReveal'

/**
 * The Cognita Entrance Examination gateway.
 *
 * Purpose is communicated before enforcement, per
 * docs/CEE-PURPOSE-AND-INTEGRITY.md. An applicant should understand why the
 * examination exists and why an honest result serves them better than an
 * inflated one, before they are asked to make an integrity commitment.
 *
 * Access remains invitation-only. This page changes nothing about scoring,
 * timing, or the evaluator-review requirement.
 */
export default function EntranceExam() {
  useReveal()
  const [params] = useSearchParams()
  const invite = params.get('invite') || ''
  const application = getApplication()
  const enrollment = getEnrollment()
  const account = getAccount()
  const allowed = verifyCeeInvite(invite)

  if (!allowed) {
    const state = resolveAdmissionState(application, enrollment, account)

    return (
      <section className="admissions-page">
        <div className="page-width ci-stack-lg">
          <div className="gate-card">
            <LockKeyhole size={34} aria-hidden="true" />
            <p className="section-label section-label--plain">Invitation-only examination</p>
            <h1>The Cognita Entrance Examination is not publicly accessible.</h1>
            <p>
              Applicants apply first. Admissions reviews the application, and approved applicants receive
              examination access through their registered email address. Opening the examination address
              directly does not grant access.
            </p>
            {application ? <StatusPill state={state} /> : null}
            <Link className="button" to="/apply">
              {application ? 'View your application' : 'Begin Your Application'} <ArrowRight size={17} />
            </Link>
          </div>

          {application ? (
            <AdmissionStatusPanel application={application} enrollment={enrollment} account={account} />
          ) : null}
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="exam-hero">
        <div className="page-width exam-hero-grid">
          <div>
            <p className="section-label section-label--light">Cognita Entrance Examination</p>
            <h1>Your approved examination session.</h1>
            <p>
              {application.applicant.fullName}, your application has been approved for the Cognita Entrance
              Examination. This access is tied to the admissions invitation issued for{' '}
              {application.applicant.email}.
            </p>
            <div className="exam-meta-row">
              <span><Clock3 size={17} aria-hidden="true" /> One 70-minute session</span>
              <span><FileCheck2 size={17} aria-hidden="true" /> 45 objective items + 2 applied tasks</span>
              <span><ScrollText size={17} aria-hidden="true" /> Evaluator-reviewed result</span>
            </div>
            <Link className="button" to={`/entrance-exam/start?invite=${invite}`}>
              Continue to examination instructions <ArrowRight size={17} />
            </Link>
          </div>

          <div className="exam-score-card">
            <span>CEE v1.0</span>
            <strong>100</strong>
            <p>Total assessment points</p>
            <div className="score-breakdown">
              <div><b>30</b><span>Functional English &amp; Communication</span></div>
              <div><b>25</b><span>AI Foundations</span></div>
              <div><b>15</b><span>Research &amp; Verification Judgment</span></div>
              <div><b>30</b><span>Applied Communication &amp; AI Evaluation</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose before enforcement. */}
      <section className="section section--white">
        <div className="page-width ci-reveal">
          <div className="ci-purpose">
            <div>
              <p className="section-label">Why this examination exists</p>
              <p className="ci-purpose-lead">
                The CEE is not designed to catch you out. It is designed to understand your current readiness
                accurately.
              </p>
              <p className="ci-purpose-body">
                Your result helps Cognita decide where your learning should begin. Answering independently
                helps us recommend the pathway that can genuinely support you.
              </p>
            </div>
            <div className="ci-purpose-points">
              <article>
                <HeartHandshake size={19} aria-hidden="true" />
                <h3>Needing foundational support is not a failure</h3>
                <p>
                  Cognita does not expect every applicant to know everything before entering. Many learners
                  begin with foundation work, and that is an ordinary starting point rather than a judgment.
                </p>
              </article>
              <article>
                <ShieldCheck size={19} aria-hidden="true" />
                <h3>An honest result is more useful than a high one</h3>
                <p>
                  Unauthorized assistance can place you into a pathway that does not match your actual needs,
                  which makes study harder rather than easier.
                </p>
              </article>
              <article>
                <ScrollText size={19} aria-hidden="true" />
                <h3>Integrity safeguards protect learners</h3>
                <p>
                  They protect you from being placed above your readiness, other applicants from unfair
                  conditions, and the credibility of Cognita credentials.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="page-width ci-reveal">
          <div className="section-heading">
            <p className="section-label">What the examination measures</p>
            <h2>Readiness is broader than knowing AI terminology.</h2>
          </div>
          <div className="ci-grid ci-grid--3">
            <article className="ci-card"><Languages size={20} aria-hidden="true" style={{ color: 'var(--cognita-indigo)' }} /><h3>Functional communication</h3><p>Comprehension, grammar, clarity, and the ability to express intent.</p></article>
            <article className="ci-card"><BrainCircuit size={20} aria-hidden="true" style={{ color: 'var(--cognita-indigo)' }} /><h3>AI foundations</h3><p>Capabilities, limitations, hallucination risk, prompting, and human responsibility.</p></article>
            <article className="ci-card"><SearchCheck size={20} aria-hidden="true" style={{ color: 'var(--cognita-indigo)' }} /><h3>Research judgment</h3><p>Source authority, current information, verification, and uncertainty.</p></article>
            <article className="ci-card"><FileCheck2 size={20} aria-hidden="true" style={{ color: 'var(--cognita-indigo)' }} /><h3>Applied instruction</h3><p>Turning a vague request into a useful, controlled instruction.</p></article>
            <article className="ci-card"><ShieldCheck size={20} aria-hidden="true" style={{ color: 'var(--cognita-indigo)' }} /><h3>Critical judgment</h3><p>Challenging unsupported output instead of accepting it because it reads well.</p></article>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="page-width readiness-panel ci-reveal">
          <div>
            <p className="section-label">Examination conditions</p>
            <h2>Complete the examination independently.</h2>
            <p className="ci-muted" style={{ marginTop: '14px', fontSize: '15.5px', lineHeight: 1.7, maxWidth: '46ch' }}>
              These conditions keep assessment fair for every applicant and keep your result meaningful for
              your own placement.
            </p>
          </div>
          <ul className="clean-list">
            <li>The 70-minute session begins when you start and does not reset if you refresh.</li>
            <li>No generative AI assistance during the examination.</li>
            <li>No web browsing for the objective sections.</li>
            <li>Applied responses must be your own work.</li>
            <li>Leaving the examination window may be recorded as an integrity event for evaluator context.</li>
            <li>When time expires, your current attempt is submitted for review.</li>
          </ul>
          <Link className="button" to={`/entrance-exam/start?invite=${invite}`}>
            Continue to examination instructions <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  )
}
