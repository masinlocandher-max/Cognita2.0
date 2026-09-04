import { ArrowRight, KeyRound, ShieldCheck } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { activatePreviewAccount, getAccount, getEnrollment } from '../lib/admissions'

export default function AccountSetup() {
  const navigate = useNavigate()
  const enrollment = getEnrollment()
  const account = getAccount()

  if (enrollment?.payment?.status !== 'confirmed') {
    return (
      <section className="admissions-page">
        <div className="page-width gate-card">
          <KeyRound size={34} />
          <p className="section-label">ACCOUNT ACTIVATION GATE</p>
          <h1>Student account creation begins after payment confirmation.</h1>
          <p>This keeps Cognita's sequence clean: admission, program, payment, then account.</p>
          <Link className="button button--ghost" to="/payment">Return to payment status</Link>
        </div>
      </section>
    )
  }

  const activate = () => {
    activatePreviewAccount()
    navigate('/app')
  }

  if (account) {
    return (
      <section className="admissions-page">
        <div className="page-width gate-card">
          <ShieldCheck size={34} />
          <p className="section-label">ACCOUNT ACTIVE</p>
          <h1>Your student-app access is ready in this frontend preview.</h1>
          <Link className="button" to="/app">Open student app <ArrowRight size={18} /></Link>
        </div>
      </section>
    )
  }

  return (
    <section className="admissions-page">
      <div className="page-width account-setup-layout">
        <article className="account-setup-card">
          <p className="section-label">STUDENT ACCOUNT</p>
          <h1>Create access only after enrollment is confirmed.</h1>
          <p>In production, Cognita should issue a secure account activation email after payment confirmation. The student verifies the email address, creates secure credentials, accepts student policies, and then receives access to the learning app.</p>

          <div className="notice-panel">
            <KeyRound />
            <div>
              <strong>Frontend-safe preview</strong>
              <p>This milestone does not ask for or store a password in localStorage. The button below activates only a device-local preview identity so the student-app sequence can be tested safely.</p>
            </div>
          </div>

          <button className="button" type="button" onClick={activate}>Activate preview student account <ArrowRight size={18} /></button>
        </article>
      </div>
    </section>
  )
}
