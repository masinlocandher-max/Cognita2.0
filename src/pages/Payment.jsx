import { ArrowRight, CreditCard, Mail, ShieldCheck } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { getEnrollment, requestPaymentInstructions } from '../lib/admissions'

export default function Payment() {
  const navigate = useNavigate()
  const enrollment = getEnrollment()

  if (!enrollment) {
    return (
      <section className="admissions-page">
        <div className="page-width gate-card">
          <CreditCard size={34} />
          <p className="section-label">ENROLLMENT GATE</p>
          <h1>Select a program before payment.</h1>
          <Link className="button button--ghost" to="/programs">Go to program selection</Link>
        </div>
      </section>
    )
  }

  const request = () => {
    requestPaymentInstructions()
    navigate('/payment')
    window.location.reload()
  }

  const pending = enrollment.payment?.status === 'awaiting_confirmation'
  const confirmed = enrollment.payment?.status === 'confirmed'

  return (
    <section className="admissions-page">
      <div className="page-width payment-layout">
        <article className="payment-card">
          <p className="section-label">ENROLLMENT PAYMENT</p>
          <h1>{enrollment.programName}</h1>
          <p>Payment happens only after a successful CEE result and program selection. Cognita should not collect tuition before admissions eligibility is established.</p>

          <div className="payment-status-row">
            <span>Program</span><strong>{enrollment.programCode}</strong>
          </div>
          <div className="payment-status-row">
            <span>Payment status</span><strong>{confirmed ? 'Confirmed' : pending ? 'Awaiting confirmation' : 'Not started'}</strong>
          </div>

          {confirmed ? (
            <Link className="button" to="/account-setup">Continue to account setup <ArrowRight size={18} /></Link>
          ) : pending ? (
            <div className="notice-panel">
              <Mail />
              <div>
                <strong>Payment instructions recorded</strong>
                <p>In production, the applicant receives official payment instructions by email and Cognita confirms payment before account activation.</p>
              </div>
            </div>
          ) : (
            <button className="button" type="button" onClick={request}>Request payment instructions <ArrowRight size={18} /></button>
          )}
        </article>

        <aside className="admissions-side-note">
          <ShieldCheck />
          <h3>No fake checkout during the frontend phase.</h3>
          <p>Fees, payment provider, receipts, refunds, and enrollment accounting must be approved before a real checkout is connected. This screen models the sequence without inventing prices or collecting money.</p>
          <p className="mvp-note">For testing, payment confirmation is performed from the hidden admissions operations preview.</p>
        </aside>
      </div>
    </section>
  )
}
