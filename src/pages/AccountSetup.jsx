import { ArrowRight, KeyRound, ShieldCheck, UserCheck } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { activatePreviewAccount, getAccount, getApplication, getEnrollment } from '../lib/admissions'
import AdmissionStatusPanel from '../components/AdmissionStatus'

/**
 * Student account activation.
 *
 * Activation follows confirmed enrollment. No password is requested or stored:
 * secure credentials require production authentication, and this surface
 * activates only a device-local preview identity so the sequence can be tested.
 */
export default function AccountSetup() {
  const navigate = useNavigate()
  const application = getApplication()
  const enrollment = getEnrollment()
  const account = getAccount()

  if (enrollment?.payment?.status !== 'confirmed') {
    return (
      <section className="admissions-page">
        <div className="page-width gate-card">
          <KeyRound size={34} aria-hidden="true" />
          <p className="section-label section-label--plain">Account activation step</p>
          <h1>Account activation begins after enrollment is confirmed.</h1>
          <p>
            Cognita keeps the sequence in order: admission, program selection, enrollment, then your student
            account.
          </p>
          <Link className="button" to="/payment">Return to enrollment <ArrowRight size={17} /></Link>
        </div>
      </section>
    )
  }

  if (account) {
    return (
      <section className="admissions-page">
        <div className="page-width ci-stack-lg">
          <div className="gate-card">
            <UserCheck size={34} aria-hidden="true" />
            <p className="section-label section-label--plain">Student access activated</p>
            <h1>Your student account is active.</h1>
            <p>Your learning environment is available in the Cognita Learning App.</p>
            <Link className="button" to="/app">Enter the Learning App <ArrowRight size={17} /></Link>
          </div>
          <AdmissionStatusPanel application={application} enrollment={enrollment} account={account} />
        </div>
      </section>
    )
  }

  return (
    <section className="admissions-page">
      <div className="page-width ci-apply-layout">
        <div className="ci-stack-lg">
          <header className="ci-admissions-head">
            <p className="section-label">Step 08 — student account</p>
            <h1>Create your Cognita student account</h1>
            <p>
              After enrollment confirmation, you are instructed to create your Cognita student account. This
              account provides access to your official learning environment.
            </p>
          </header>

          <article className="ci-card">
            <p className="ci-card-title">Account holder</p>
            <dl className="ci-detail-list">
              <div><dt>Name</dt><dd>{application?.applicant?.fullName}</dd></div>
              <div><dt>Email</dt><dd>{application?.applicant?.email}</dd></div>
              <div><dt>Program</dt><dd>{enrollment.programName}</dd></div>
            </dl>

            <div className="ci-notice ci-notice--info" style={{ marginTop: '22px' }}>
              <KeyRound size={17} aria-hidden="true" />
              <div>
                <strong>No password is requested here</strong>
                In production, Cognita issues a secure activation email, and you verify your address, create
                credentials, and accept student policies. This preview does not ask for or store a password.
              </div>
            </div>

            <button className="button button--block" type="button" style={{ marginTop: '22px' }} onClick={() => { activatePreviewAccount(); navigate('/app') }}>
              Activate preview student account <ArrowRight size={17} />
            </button>
          </article>
        </div>

        <aside className="ci-apply-aside">
          <article className="ci-card ci-card--soft">
            <ShieldCheck size={20} aria-hidden="true" style={{ color: 'var(--cognita-indigo)' }} />
            <h3 style={{ fontSize: '16px', margin: '12px 0 8px', color: 'var(--cognita-navy)' }}>
              What production activation will include
            </h3>
            <ul className="ci-route-list">
              <li>Verified email address</li>
              <li>Secure credentials held by an authentication service</li>
              <li>Acceptance of Cognita student policies</li>
              <li>Access issued against your enrollment record</li>
            </ul>
          </article>
          <div className="ci-notice ci-notice--sim">
            <UserCheck size={17} aria-hidden="true" />
            <div>
              <strong>Frontend preview</strong>
              This activates a device-local preview identity only. There is no authentication service and no
              account exists outside this browser.
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
