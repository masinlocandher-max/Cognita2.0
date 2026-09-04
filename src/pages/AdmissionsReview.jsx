import { useState } from 'react'
import { CheckCircle2, ClipboardCheck, Mail, RotateCcw, ShieldAlert, XCircle } from 'lucide-react'
import {
  approveApplication,
  clearAdmissionsPreview,
  confirmPayment,
  decideCee,
  declineApplication,
  getEmailLog,
  readAdmissionsState,
} from '../lib/admissions'
import { getAttempt } from '../lib/localLearner'

export default function AdmissionsReview() {
  const [state, setState] = useState(() => readAdmissionsState())
  const [note, setNote] = useState('')

  const refresh = () => setState(readAdmissionsState())
  const application = state.application
  const attempt = application?.ceeAttemptId ? getAttempt(application.ceeAttemptId) : null
  const emails = getEmailLog().slice().reverse()

  const approve = () => {
    approveApplication(note)
    setNote('')
    refresh()
  }

  const decline = () => {
    declineApplication(note)
    setNote('')
    refresh()
  }

  const decide = (decision) => {
    decideCee(decision, note)
    setNote('')
    refresh()
  }

  const markPaid = () => {
    confirmPayment()
    refresh()
  }

  const reset = () => {
    clearAdmissionsPreview()
    window.location.reload()
  }

  if (!application) {
    return (
      <section className="ops-page">
        <div className="page-width gate-card">
          <ClipboardCheck size={36} />
          <p className="section-label">INTERNAL FRONTEND PREVIEW</p>
          <h1>No local admissions application exists on this device.</h1>
          <p>This route is a development-only operations simulator. It is not authentication and must never be treated as a production staff portal.</p>
        </div>
      </section>
    )
  }

  const invitePath = application.ceeInvite ? `/entrance-exam?invite=${application.ceeInvite.code}` : null

  return (
    <section className="ops-page">
      <div className="page-width ops-layout">
        <header className="ops-header">
          <div>
            <p className="section-label">INTERNAL FRONTEND PREVIEW</p>
            <h1>Admissions Operations</h1>
            <p>Local-only simulation of review, result release, payment confirmation, and email events.</p>
          </div>
          <button className="button button--ghost" type="button" onClick={reset}><RotateCcw size={17} /> Reset preview</button>
        </header>

        <article className="ops-card">
          <div className="ops-card-heading">
            <div><span>{application.reference}</span><h2>{application.applicant.fullName}</h2></div>
            <strong>{application.status.replaceAll('_', ' ')}</strong>
          </div>
          <div className="ops-data-grid">
            <div><span>Email</span><strong>{application.applicant.email}</strong></div>
            <div><span>Mobile</span><strong>{application.applicant.mobile}</strong></div>
            <div><span>Location</span><strong>{application.applicant.location}</strong></div>
            <div><span>Education</span><strong>{application.applicant.highestEducation}</strong></div>
          </div>
          <div className="ops-statement"><span>Applicant statement</span><p>{application.statement}</p></div>

          {application.status === 'under_review' ? (
            <div className="ops-actions">
              <textarea rows="3" placeholder="Admissions review note" value={note} onChange={(event) => setNote(event.target.value)} />
              <div>
                <button className="button" type="button" onClick={approve}><CheckCircle2 size={18} /> Approve for CEE</button>
                <button className="button button--ghost" type="button" onClick={decline}><XCircle size={18} /> Do not approve</button>
              </div>
            </div>
          ) : null}

          {invitePath ? (
            <div className="ops-invite">
              <Mail />
              <div>
                <span>CEE invitation preview</span>
                <strong>{invitePath}</strong>
                <small>In production, this would be a secure one-time link delivered by email. This local code is only for frontend testing.</small>
              </div>
            </div>
          ) : null}
        </article>

        {attempt?.completed && application.status === 'cee_review_pending' ? (
          <article className="ops-card">
            <div className="ops-card-heading">
              <div><span>CEE EVALUATION</span><h2>Release final decision</h2></div>
              <strong>{attempt.objectivePoints ?? 0}/70 objective</strong>
            </div>
            <div className="ops-data-grid">
              <div><span>Placement indication</span><strong>{attempt.placement?.title || 'Not available'}</strong></div>
              <div><span>Integrity events</span><strong>{attempt.integrityEvents?.length || 0}</strong></div>
            </div>
            <div className="ops-response-grid">
              {Object.entries(attempt.applied || {}).map(([id, response]) => (
                <div key={id}><span>{id}</span><p>{response || 'No response submitted.'}</p></div>
              ))}
            </div>
            <div className="ops-actions">
              <textarea rows="3" placeholder="Evaluator note / rationale" value={note} onChange={(event) => setNote(event.target.value)} />
              <div>
                <button className="button" type="button" onClick={() => decide('passed')}><CheckCircle2 size={18} /> Mark passed</button>
                <button className="button button--ghost" type="button" onClick={() => decide('failed')}><XCircle size={18} /> Mark not passed</button>
              </div>
            </div>
          </article>
        ) : null}

        {state.enrollment?.payment?.status === 'awaiting_confirmation' ? (
          <article className="ops-card">
            <div className="ops-card-heading">
              <div><span>PAYMENT REVIEW</span><h2>{state.enrollment.programName}</h2></div>
              <strong>awaiting confirmation</strong>
            </div>
            <p>For frontend testing only, confirm payment here to unlock account activation. Production confirmation must come from the approved payment/accounting workflow.</p>
            <button className="button" type="button" onClick={markPaid}>Confirm preview payment</button>
          </article>
        ) : null}

        <article className="ops-card">
          <div className="ops-card-heading"><div><span>EMAIL EVENT LOG</span><h2>Institutional notices</h2></div><Mail /></div>
          <div className="email-log">
            {emails.map((email) => (
              <div key={email.id}>
                <strong>{email.subject}</strong>
                <span>{email.to}</span>
                <p>{email.body}</p>
                <small>{email.delivery}</small>
              </div>
            ))}
          </div>
        </article>

        <div className="ops-warning"><ShieldAlert /><p>This route has no real access control because Cognita 2.0 is intentionally frontend-only. It is for product simulation and QA only. A production staff portal must use authenticated roles and server-side authorization.</p></div>
      </div>
    </section>
  )
}
