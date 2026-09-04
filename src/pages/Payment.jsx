import { useState } from 'react'
import { ArrowRight, CreditCard, Mail, ReceiptText, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getAccount, getApplication, getEnrollment, requestPaymentInstructions } from '../lib/admissions'
import AdmissionStatusPanel from '../components/AdmissionStatus'

/**
 * Enrollment and payment.
 *
 * Payment follows program selection, which follows a passing admission
 * decision. No checkout is connected: fees, provider, receipts, refunds, and
 * enrollment accounting are approved institutional matters, and this surface
 * models the sequence without inventing any of them.
 */
export default function Payment() {
  const [enrollment, setEnrollment] = useState(() => getEnrollment())
  const application = getApplication()
  const account = getAccount()

  if (!enrollment) {
    return (
      <section className="admissions-page">
        <div className="page-width gate-card">
          <CreditCard size={34} aria-hidden="true" />
          <p className="section-label section-label--plain">Enrollment step</p>
          <h1>Select a program before enrollment.</h1>
          <p>
            Enrollment and payment follow program selection, which opens after a passing admission decision.
          </p>
          <Link className="button" to="/programs">Go to program selection <ArrowRight size={17} /></Link>
        </div>
      </section>
    )
  }

  const pending = enrollment.payment?.status === 'awaiting_confirmation'
  const confirmed = enrollment.payment?.status === 'confirmed'

  const request = () => {
    requestPaymentInstructions()
    setEnrollment(getEnrollment())
  }

  return (
    <section className="admissions-page">
      <div className="page-width ci-apply-layout">
        <div className="ci-stack-lg">
          <header className="ci-admissions-head">
            <p className="section-label">Step 07 — enrollment and payment</p>
            <h1>Complete your enrollment</h1>
            <p>
              Your enrollment is considered complete only after the required steps have been successfully
              confirmed.
            </p>
          </header>

          <article className="ci-card">
            <p className="ci-card-title">Selected program</p>
            <h2 className="ci-enrollment-name">{enrollment.programName}</h2>
            <dl className="ci-detail-list" style={{ marginTop: '18px' }}>
              <div><dt>Program code</dt><dd>{enrollment.programCode}</dd></div>
              <div><dt>Selected</dt><dd>{new Date(enrollment.selectedAt).toLocaleDateString('en-PH', { dateStyle: 'medium' })}</dd></div>
              <div><dt>Enrollment status</dt><dd>{confirmed ? 'Confirmed' : pending ? 'Awaiting confirmation' : 'Not started'}</dd></div>
              <div><dt>Approved fee</dt><dd>Not yet published</dd></div>
            </dl>

            <div style={{ marginTop: '24px' }}>
              {confirmed ? (
                <Link className="button button--block" to="/account-setup">
                  Continue to student account activation <ArrowRight size={17} />
                </Link>
              ) : pending ? (
                <div className="ci-notice ci-notice--info">
                  <Mail size={17} aria-hidden="true" />
                  <div>
                    <strong>Payment instructions recorded</strong>
                    In production, Cognita issues official payment instructions to your registered email
                    address and confirms payment before account activation. Confirmation is an institutional
                    step, not something completed on this page.
                  </div>
                </div>
              ) : (
                <button className="button button--block" type="button" onClick={request}>
                  Request payment instructions <ArrowRight size={17} />
                </button>
              )}
            </div>
          </article>

          <AdmissionStatusPanel application={application} enrollment={enrollment} account={account} showRail={false} />
        </div>

        <aside className="ci-apply-aside">
          <article className="ci-card ci-card--soft">
            <ShieldCheck size={20} aria-hidden="true" style={{ color: 'var(--cognita-indigo)' }} />
            <h3 style={{ fontSize: '16px', margin: '12px 0 8px', color: 'var(--cognita-navy)' }}>
              No checkout is connected
            </h3>
            <p style={{ fontSize: '14.5px', lineHeight: 1.68, color: 'var(--cognita-muted)' }}>
              Fees, payment provider, receipts, refunds, and enrollment accounting must be approved before a
              real checkout exists. This screen models the sequence without inventing prices or collecting
              money.
            </p>
          </article>

          <article className="ci-card">
            <p className="ci-card-title">What confirmation means</p>
            <ul className="ci-route-list">
              <li>Cognita verifies the payment against your enrollment record.</li>
              <li>Your enrollment status changes to confirmed.</li>
              <li>Student account activation is then issued to you.</li>
            </ul>
          </article>

          <div className="ci-notice ci-notice--sim">
            <ReceiptText size={17} aria-hidden="true" />
            <div>
              <strong>Frontend preview</strong>
              No payment is processed and no money is collected. Confirmation is simulated from the local
              admissions operations preview for testing.
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
