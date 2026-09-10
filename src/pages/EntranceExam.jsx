import { ArrowRight, BrainCircuit, Clock3, FileCheck2, Languages, LockKeyhole, Mail, SearchCheck, ShieldCheck } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { getApplication, verifyCeeInvite } from '../lib/admissions'

const PRIMARY_EMAIL = 'info@thecognitainstitute.com'
const ALTERNATE_EMAIL = 'cognitainstituteofai@gmail.com'

export default function EntranceExam() {
  const [params] = useSearchParams()
  const invite = params.get('invite') || ''
  const application = getApplication()
  const allowed = verifyCeeInvite(invite)

  if (!allowed) {
    return (
      <section className="admissions-page">
        <div className="page-width gate-card">
          <LockKeyhole size={36} />
          <p className="section-label">INVITATION-ONLY ASSESSMENT</p>
          <h1>The Cognita Entrance Examination is not publicly accessible.</h1>
          <p>CEE access is issued only after an application has been reviewed and approved. Opening an examination URL directly does not grant access.</p>
          {application ? <p className="mvp-note">Current local application status: {application.status.replaceAll('_', ' ')}.</p> : null}
          <div className="gate-card-actions">
            <a className="button" href={`mailto:${PRIMARY_EMAIL}?cc=${ALTERNATE_EMAIL}&subject=Cognita%20CEE%20Access%20Inquiry`}><Mail size={17} /> Contact Cognita about CEE access</a>
            <a className="button button--ghost" href="/#admissions">View the admission process</a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="exam-hero">
        <div className="page-width exam-hero-grid">
          <div>
            <p className="section-label section-label--light">COGNITA ENTRANCE EXAMINATION</p>
            <h1>Your approved assessment session.</h1>
            <p>{application.applicant.fullName}, your application has been approved for the Cognita Entrance Examination. This access is tied to the admissions invitation issued for {application.applicant.email}.</p>
            <div className="exam-meta-row">
              <span><Clock3 size={18} /> 70-minute timed session</span>
              <span><FileCheck2 size={18} /> 45 objective items + 2 applied tasks</span>
            </div>
            <Link className="button" to={`/entrance-exam/start?invite=${invite}`}>Continue to examination rules <ArrowRight size={18} /></Link>
          </div>
          <div className="exam-score-card">
            <span>CEE v1.0</span>
            <strong>100</strong>
            <p>Total assessment points</p>
            <div className="score-breakdown">
              <div><b>30</b><span>Communication</span></div>
              <div><b>25</b><span>AI foundations</span></div>
              <div><b>15</b><span>Research judgment</span></div>
              <div><b>30</b><span>Applied response</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="page-width">
          <div className="section-heading section-heading--wide">
            <p className="section-label">WHAT IT MEASURES</p>
            <h2>Readiness is broader than memorizing AI terms.</h2>
          </div>
          <div className="measure-grid">
            <article><Languages /><h3>Functional communication</h3><p>Comprehension, grammar, clarity, and the ability to express intent.</p></article>
            <article><BrainCircuit /><h3>AI foundations</h3><p>Core capabilities, limitations, hallucination risk, prompting, and human responsibility.</p></article>
            <article><SearchCheck /><h3>Research judgment</h3><p>Source authority, current information, verification, and uncertainty.</p></article>
            <article><FileCheck2 /><h3>Applied instruction</h3><p>The ability to turn a vague request into a useful, controlled instruction.</p></article>
            <article><ShieldCheck /><h3>Critical judgment</h3><p>The ability to challenge unsupported AI output instead of simply accepting it.</p></article>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="page-width readiness-panel">
          <div>
            <p className="section-label">INTEGRITY RULES</p>
            <h2>Complete the CEE independently.</h2>
          </div>
          <ul className="clean-list">
            <li>The 70-minute timer begins when you start and does not reset on refresh.</li>
            <li>No generative AI tools during the assessment.</li>
            <li>No web browsing for objective sections.</li>
            <li>Applied responses must be your own work.</li>
            <li>Leaving the exam window may be logged as an integrity event.</li>
            <li>When time expires, the current attempt is submitted for review.</li>
          </ul>
          <Link className="button" to={`/entrance-exam/start?invite=${invite}`}>Proceed to CEE v1.0 <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  )
}
