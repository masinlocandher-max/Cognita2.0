import { useMemo, useRef, useState } from 'react'
import { ArrowRight, CircleAlert, FileCheck2, Mail, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getAccount, getApplication, getEnrollment, submitApplication } from '../lib/admissions'
import AdmissionStatusPanel, { resolveAdmissionState } from '../components/AdmissionStatus'

/**
 * The Cognita application, and the applicant's status once it exists.
 *
 * The form asks only what Admissions needs to review eligibility, and the
 * post-submission view answers the question every applicant actually has:
 * where am I, and what happens next.
 */

const FIELDS = [
  { id: 'fullName', label: 'Full name', type: 'text', autoComplete: 'name', required: true },
  { id: 'email', label: 'Email address', type: 'email', autoComplete: 'email', required: true, hint: 'Admission instructions and your examination access are issued to this address.' },
  { id: 'mobile', label: 'Mobile number', type: 'tel', autoComplete: 'tel', required: true },
  { id: 'location', label: 'City or municipality', type: 'text', autoComplete: 'address-level2', required: true },
  { id: 'highestEducation', label: 'Highest education completed', type: 'text', required: true, hint: 'For example: Senior High School, Some College, Bachelor’s Degree.' },
]

export default function Apply() {
  const [application, setApplication] = useState(() => getApplication())
  const [errors, setErrors] = useState({})
  const formRef = useRef(null)
  const [form, setForm] = useState({
    fullName: '', email: '', mobile: '', location: '', highestEducation: '', statement: '', consent: false,
  })

  const enrollment = getEnrollment()
  const account = getAccount()
  const state = useMemo(() => resolveAdmissionState(application, enrollment, account), [application, enrollment, account])

  const update = (id, value) => {
    setForm((current) => ({ ...current, [id]: value }))
    setErrors((current) => ({ ...current, [id]: undefined }))
  }

  const submit = (event) => {
    event.preventDefault()
    const next = {}

    FIELDS.forEach((field) => {
      if (!String(form[field.id] || '').trim()) next[field.id] = 'This field is required.'
    })
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Enter a valid email address.'
    }
    if (!String(form.statement || '').trim()) next.statement = 'Please tell Admissions why you are applying.'
    if (!form.consent) next.consent = 'Please confirm before submitting your application.'

    setErrors(next)
    if (Object.keys(next).length) {
      const first = document.getElementById(Object.keys(next)[0])
      first?.focus()
      first?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      return
    }

    setApplication(submitApplication(form))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* ------------------------------------------------- Existing application */
  if (application) {
    return (
      <section className="admissions-page">
        <div className="page-width ci-stack-lg">
          <header className="ci-admissions-head">
            <p className="section-label">Cognita Admissions</p>
            <h1>Your application</h1>
            <p>
              This page shows exactly where your application stands and what happens next. Cognita communicates
              formal decisions through your registered email address in production.
            </p>
          </header>

          <AdmissionStatusPanel application={application} enrollment={enrollment} account={account} />

          {state.key === 'approved_for_cee' ? (
            <div className="ci-notice ci-notice--info">
              <Mail size={17} aria-hidden="true" />
              <div>
                <strong>Your examination access has been issued.</strong>
                Entrance examination access is invitation-only and reaches you through your registered email
                address. Opening the examination URL directly does not grant access.
              </div>
            </div>
          ) : null}

          <div className="ci-grid ci-grid--2">
            <article className="ci-card">
              <p className="ci-card-title">Application details</p>
              <dl className="ci-detail-list">
                <div><dt>Reference</dt><dd className="ci-tabular">{application.reference}</dd></div>
                <div><dt>Applicant</dt><dd>{application.applicant.fullName}</dd></div>
                <div><dt>Email</dt><dd>{application.applicant.email}</dd></div>
                <div><dt>Location</dt><dd>{application.applicant.location}</dd></div>
                <div><dt>Submitted</dt><dd>{new Date(application.submittedAt).toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' })}</dd></div>
              </dl>
            </article>

            <article className="ci-card ci-card--soft">
              <p className="ci-card-title">While you wait</p>
              <ul className="ci-route-list">
                <li>Check the email address on your application regularly, including spam or promotions folders.</li>
                <li>Prepare a suitable device and internet connection for the examination.</li>
                <li>Review the programs so you know your options if you are admitted.</li>
              </ul>
              <div className="ci-row" style={{ marginTop: '18px' }}>
                <Link className="button button--ghost button--small" to="/programs">Explore Our Programs</Link>
              </div>
            </article>
          </div>

          <div className="ci-notice ci-notice--sim">
            <ShieldCheck size={17} aria-hidden="true" />
            <div>
              <strong>Frontend preview — nothing has been transmitted.</strong>
              This build stores your application in this browser only. It has not been sent to Cognita, no
              email has been delivered, and no staff member has reviewed it.
            </div>
          </div>
        </div>
      </section>
    )
  }

  /* ------------------------------------------------------------ New application */
  return (
    <section className="admissions-page">
      <div className="page-width ci-apply-layout">
        <div className="ci-stack-lg">
          <header className="ci-admissions-head">
            <p className="section-label">Step 01 of the admission process</p>
            <h1>Begin your application</h1>
            <p>
              Complete the Cognita application form and provide the required applicant information. Your
              application allows Cognita to review your basic eligibility and determine whether you may proceed
              to the next stage of admission.
            </p>
          </header>

          <form className="ci-card candidate-form" onSubmit={submit} ref={formRef} noValidate>
            {FIELDS.map((field) => (
              <div className="ci-field" key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                <input
                  id={field.id}
                  className="ci-input"
                  type={field.type}
                  value={form[field.id]}
                  autoComplete={field.autoComplete}
                  aria-invalid={Boolean(errors[field.id])}
                  aria-describedby={errors[field.id] ? `${field.id}-error` : field.hint ? `${field.id}-hint` : undefined}
                  onChange={(event) => update(field.id, event.target.value)}
                />
                {errors[field.id] ? (
                  <p className="ci-field-error" id={`${field.id}-error`}>
                    <CircleAlert size={14} aria-hidden="true" /> {errors[field.id]}
                  </p>
                ) : field.hint ? (
                  <p className="ci-field-hint" id={`${field.id}-hint`}>{field.hint}</p>
                ) : null}
              </div>
            ))}

            <div className="ci-field">
              <label htmlFor="statement">Why are you applying to Cognita?</label>
              <textarea
                id="statement"
                className="ci-textarea"
                value={form.statement}
                aria-invalid={Boolean(errors.statement)}
                aria-describedby={errors.statement ? 'statement-error' : 'statement-hint'}
                onChange={(event) => update('statement', event.target.value)}
              />
              {errors.statement ? (
                <p className="ci-field-error" id="statement-error">
                  <CircleAlert size={14} aria-hidden="true" /> {errors.statement}
                </p>
              ) : (
                <p className="ci-field-hint" id="statement-hint">
                  A few sentences about what you want to be able to do. Write it in your own words — this is read
                  by a person, not scored automatically.
                </p>
              )}
            </div>

            <label className="ci-consent" htmlFor="consent">
              <input
                id="consent"
                type="checkbox"
                checked={form.consent}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? 'consent-error' : undefined}
                onChange={(event) => update('consent', event.target.checked)}
              />
              <span>
                <strong>I confirm my information is accurate.</strong>
                I understand that Cognita reviews applications before issuing entrance examination access, and
                that admission does not automatically guarantee completion or certification.
              </span>
            </label>
            {errors.consent ? (
              <p className="ci-field-error" id="consent-error">
                <CircleAlert size={14} aria-hidden="true" /> {errors.consent}
              </p>
            ) : null}

            <button className="button button--block" type="submit">
              Submit application <ArrowRight size={17} />
            </button>
          </form>
        </div>

        <aside className="ci-apply-aside">
          <article className="ci-card">
            <p className="ci-card-title">What happens after you submit</p>
            <ol className="ci-mini-steps">
              <li><span>02</span><div><strong>Application review</strong><small>A person reviews your application before any examination access is issued.</small></div></li>
              <li><span>03</span><div><strong>CEE access by email</strong><small>Approved applicants receive invitation-only examination access.</small></div></li>
              <li><span>04</span><div><strong>Entrance examination</strong><small>One timed session, completed independently.</small></div></li>
              <li><span>05</span><div><strong>Result and pathway</strong><small>Released after evaluator review of your applied responses.</small></div></li>
            </ol>
            <Link className="text-link" to="/#admission" style={{ marginTop: '8px' }}>
              View the full admission process <ArrowRight size={15} />
            </Link>
          </article>

          <article className="ci-card ci-card--soft">
            <p className="ci-card-title">Before you apply</p>
            <ul className="ci-route-list">
              <li>Provide complete and accurate information.</li>
              <li>Use an email address you check regularly.</li>
              <li>Have a suitable device and internet connection.</li>
              <li>Be prepared to follow Cognita’s academic-integrity policies.</li>
            </ul>
          </article>

          <div className="ci-notice ci-notice--sim">
            <FileCheck2 size={17} aria-hidden="true" />
            <div>
              <strong>Frontend preview</strong>
              Your application is stored in this browser only. It is not transmitted to Cognita and no email is
              delivered.
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
