import { useState } from 'react'
import { ArrowRight, CheckCircle2, Clock3, FileCheck2, Mail, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getApplication, submitApplication } from '../lib/admissions'

const statusCopy = {
  under_review: {
    label: 'APPLICATION UNDER REVIEW',
    title: 'Your application is with Cognita Admissions.',
    body: 'Admissions review comes before the entrance exam. If approved, the CEE invitation and access instructions will be sent to the email address on your application.',
  },
  approved_for_cee: {
    label: 'APPROVED FOR CEE',
    title: 'Your entrance exam invitation has been issued.',
    body: 'Use only the CEE access link sent through the admissions email. Entrance exam access is invitation-only and is not part of the public website.',
  },
  cee_in_progress: {
    label: 'CEE IN PROGRESS',
    title: 'Your timed entrance exam session has started.',
    body: 'Complete the CEE within the issued session. Your timer persists from the moment the assessment begins.',
  },
  cee_review_pending: {
    label: 'RESULT UNDER REVIEW',
    title: 'Your CEE has been submitted for evaluation.',
    body: 'Objective results are recorded, but Cognita does not issue a final admissions decision until the complete assessment has been reviewed. Your pass/fail result will be communicated by email.',
  },
  cee_passed: {
    label: 'CEE PASSED',
    title: 'You are eligible to continue enrollment.',
    body: 'Your next step is to choose an eligible Cognita program, review enrollment requirements, and proceed to payment.',
  },
  cee_failed: {
    label: 'CEE NOT PASSED',
    title: 'Your current admissions cycle is complete.',
    body: 'Admissions will communicate any reapplication, bridge, or readiness guidance through the official result email.',
  },
  not_approved: {
    label: 'APPLICATION DECISION',
    title: 'Your application was not approved for this intake.',
    body: 'Please refer to the admissions email for the formal decision and any next-step guidance.',
  },
}

export default function Apply() {
  const [application, setApplication] = useState(() => getApplication())
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    location: '',
    highestEducation: '',
    statement: '',
    consent: false,
  })

  const submit = (event) => {
    event.preventDefault()
    if (!form.consent) return
    setApplication(submitApplication(form))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (application) {
    const copy = statusCopy[application.status] || statusCopy.under_review

    return (
      <section className="admissions-page">
        <div className="page-width admissions-status-layout">
          <article className="admissions-status-card">
            <p className="section-label">{copy.label}</p>
            <h1>{copy.title}</h1>
            <p>{copy.body}</p>
            <div className="application-reference">
              <span>Application reference</span>
              <strong>{application.reference}</strong>
            </div>
            <div className="application-reference">
              <span>Admissions email</span>
              <strong>{application.applicant.email}</strong>
            </div>
            {application.status === 'cee_passed' ? (
              <Link className="button" to="/programs">Choose a program <ArrowRight size={18} /></Link>
            ) : null}
          </article>

          <aside className="process-card">
            <h2>Cognita admissions sequence</h2>
            <ol className="institution-steps">
              <li className="is-current"><span>01</span><div><strong>Application</strong><small>Submit admissions information.</small></div></li>
              <li><span>02</span><div><strong>Admissions review</strong><small>Approval is required before CEE access.</small></div></li>
              <li><span>03</span><div><strong>CEE invitation</strong><small>Issued through the applicant's email.</small></div></li>
              <li><span>04</span><div><strong>Evaluation & result</strong><small>Pass/fail decision sent by email.</small></div></li>
              <li><span>05</span><div><strong>Program & enrollment</strong><small>Program selection, payment, account, then app access.</small></div></li>
            </ol>
          </aside>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="admissions-hero">
        <div className="page-width admissions-hero-grid">
          <div>
            <p className="section-label section-label--light">COGNITA ADMISSIONS</p>
            <h1>Apply first. Assessment comes after review.</h1>
            <p>Cognita follows an admissions process rather than offering an open public entrance exam. Submit your application, wait for Admissions review, and receive your next step through email.</p>
          </div>
          <div className="admissions-principles">
            <div><FileCheck2 /><strong>Application before assessment</strong></div>
            <div><Mail /><strong>Email-based admissions notices</strong></div>
            <div><Clock3 /><strong>Timed CEE after approval</strong></div>
            <div><ShieldCheck /><strong>Integrity and human review</strong></div>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="page-width application-grid">
          <form className="application-form" onSubmit={submit}>
            <div className="section-heading section-heading--wide">
              <p className="section-label">APPLICATION FORM</p>
              <h2>Applicant information</h2>
              <p>Use an email address you can access. Formal admissions notices, CEE invitation, result, and enrollment instructions will use this address once Cognita's production email system is connected.</p>
            </div>

            <div className="form-grid">
              <label>
                Full legal/preferred name
                <input required autoComplete="name" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} />
              </label>
              <label>
                Email address
                <input required type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
              </label>
              <label>
                Mobile number
                <input required autoComplete="tel" value={form.mobile} onChange={(event) => setForm({ ...form, mobile: event.target.value })} />
              </label>
              <label>
                City / Province
                <input required autoComplete="address-level2" value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} />
              </label>
              <label className="form-span-2">
                Highest educational attainment
                <input required value={form.highestEducation} onChange={(event) => setForm({ ...form, highestEducation: event.target.value })} />
              </label>
              <label className="form-span-2">
                Why do you want to study with Cognita?
                <textarea required rows="7" value={form.statement} onChange={(event) => setForm({ ...form, statement: event.target.value })} />
              </label>
            </div>

            <label className="consent-row">
              <input type="checkbox" checked={form.consent} onChange={(event) => setForm({ ...form, consent: event.target.checked })} required />
              <span>I certify that the information in this application is accurate and I understand that submitting an application does not automatically grant CEE or student-app access.</span>
            </label>

            <button className="button" type="submit">Submit application <ArrowRight size={18} /></button>
          </form>

          <aside className="admissions-side-note">
            <CheckCircle2 />
            <h3>What happens after submission?</h3>
            <p>Admissions reviews the application. Approved applicants receive a CEE invitation by email. The CEE result is reviewed before a pass/fail decision is issued. Only successful applicants continue to program selection and enrollment.</p>
            <p className="mvp-note">Frontend milestone: this form currently stores its record only in this browser. It does not yet transmit an application or send email.</p>
          </aside>
        </div>
      </section>
    </>
  )
}
