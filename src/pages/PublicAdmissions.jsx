import { ArrowRight, CheckCircle2, Clock3, Mail, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

const PRIMARY_EMAIL = 'info@thecognitainstitute.com'
const ALTERNATE_EMAIL = 'cognitainstituteofai@gmail.com'

const steps = [
  ['01', 'Application inquiry', 'Contact Cognita using your current email address and request the application requirements for the active intake.'],
  ['02', 'Application review', 'Cognita reviews the submitted applicant information before any entrance examination access is issued.'],
  ['03', 'CEE invitation', 'Approved applicants receive invitation-only Cognita Entrance Examination instructions through email.'],
  ['04', 'Assessment and evaluation', 'Applicants complete the timed CEE independently. Objective evidence and applied responses are reviewed before a decision is released.'],
  ['05', 'Admission result', 'Cognita communicates the admission decision and any applicable readiness or foundation guidance through email.'],
  ['06', 'Program and enrollment', 'Passing applicants may select an eligible learning route and receive the applicable enrollment and payment instructions.'],
  ['07', 'Student access', 'After enrollment requirements are confirmed, the learner receives access to the private student learning environment.'],
]

export default function PublicAdmissions() {
  return (
    <>
      <section className="admissions-public-hero">
        <div className="page-width admissions-public-hero__grid">
          <div>
            <p className="section-label">COGNITA ADMISSIONS</p>
            <h1>Admission begins with readiness, not payment.</h1>
            <p>Cognita follows a structured admission process before enrollment. Applicants are reviewed first, then approved applicants receive access to the Cognita Entrance Examination.</p>
            <div className="public-hero-actions">
              <a className="button" href={`mailto:${PRIMARY_EMAIL}?cc=${ALTERNATE_EMAIL}&subject=Cognita%20Application%20Request`}><Mail size={17} /> Request application information</a>
              <Link className="button button--ghost" to="/programs">Review programs</Link>
            </div>
          </div>
          <aside className="admissions-public-summary">
            <span>Before you contact Admissions</span>
            <ul>
              <li><CheckCircle2 size={16} /> Use an email address you regularly check.</li>
              <li><CheckCircle2 size={16} /> Be ready to provide complete and accurate applicant information.</li>
              <li><CheckCircle2 size={16} /> Ensure you have a suitable device and internet connection for online assessment and learning.</li>
              <li><CheckCircle2 size={16} /> Review Cognita’s academic-integrity expectations before the CEE.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section admissions-public-process">
        <div className="page-width">
          <div className="public-section-intro">
            <div>
              <p className="section-label">ADMISSION PROCESS</p>
              <h2>What happens from first inquiry to student access.</h2>
            </div>
            <p>The sequence is designed to keep admission, assessment, enrollment, and learning clearly separated.</p>
          </div>

          <div className="admissions-public-steps">
            {steps.map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{body}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft admissions-public-cee">
        <div className="page-width admissions-public-cee__grid">
          <div>
            <p className="section-label">COGNITA ENTRANCE EXAMINATION</p>
            <h2>The CEE helps Cognita understand where learning should begin.</h2>
            <p>The assessment considers communication readiness, AI foundations, research and verification judgment, and applied reasoning. An honest result is more useful than an artificially high score because it supports a more appropriate learning pathway.</p>
          </div>
          <div className="admissions-public-cee__facts">
            <div><Clock3 /><strong>70 minutes</strong><span>One persistent timed assessment session</span></div>
            <div><ShieldCheck /><strong>Invitation only</strong><span>Access is issued after application review</span></div>
            <div><CheckCircle2 /><strong>Human reviewed</strong><span>Applied responses contribute to the final admission decision</span></div>
          </div>
        </div>
      </section>

      <section className="section admissions-public-contact">
        <div className="page-width admissions-public-contact__grid">
          <div>
            <p className="section-label">CONTACT ADMISSIONS</p>
            <h2>Request current application, intake, and fee information.</h2>
            <p>While Cognita’s production admissions backend is being connected, official applicant communication is handled through the Institute’s email channels. This avoids presenting a form as live before it can securely transmit and preserve applicant records.</p>
          </div>
          <div className="admissions-public-contact__actions">
            <a className="button" href={`mailto:${PRIMARY_EMAIL}?cc=${ALTERNATE_EMAIL}&subject=Cognita%20Application%20Request`}><Mail size={17} /> {PRIMARY_EMAIL}</a>
            <a className="button button--ghost" href={`mailto:${ALTERNATE_EMAIL}?cc=${PRIMARY_EMAIL}&subject=Cognita%20Application%20Request`}><Mail size={17} /> {ALTERNATE_EMAIL}</a>
          </div>
        </div>
      </section>
    </>
  )
}
