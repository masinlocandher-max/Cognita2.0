import { useMemo, useState } from 'react'
import { CheckCircle2, GraduationCap, MessageSquareText, RotateCcw, ShieldAlert, XCircle } from 'lucide-react'
import { getAccount, getEnrollment } from '../lib/admissions'
import {
  getLearningSnapshot,
  respondToSupportRequest,
  reviewCapstone,
  reviewSubmission,
} from '../lib/learning'

function formatDate(value) {
  if (!value) return 'Not yet'
  return new Intl.DateTimeFormat('en-PH', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

export default function LearningReview() {
  const account = getAccount()
  const enrollment = getEnrollment()
  const [snapshot, setSnapshot] = useState(() => getLearningSnapshot())
  const [notes, setNotes] = useState({})
  const [supportResponses, setSupportResponses] = useState({})
  const [capstoneNote, setCapstoneNote] = useState('')

  const refresh = () => setSnapshot(getLearningSnapshot())

  const pendingSubmissions = useMemo(
    () => Object.values(snapshot.state.submissions).filter((submission) => ['submitted_for_review', 'resubmitted'].includes(submission.status)),
    [snapshot],
  )

  const lessonMap = useMemo(() => Object.fromEntries(snapshot.lessons.map((lesson) => [lesson.id, lesson])), [snapshot])
  const openSupport = snapshot.state.supportRequests.filter((request) => request.status === 'open_local_preview')

  const decideSubmission = (lessonId, decision) => {
    const note = notes[lessonId] || ''
    if (!note.trim()) return
    reviewSubmission(lessonId, decision, note)
    setNotes((current) => ({ ...current, [lessonId]: '' }))
    refresh()
  }

  const decideCapstone = (decision) => {
    if (!capstoneNote.trim()) return
    reviewCapstone(decision, capstoneNote)
    setCapstoneNote('')
    refresh()
  }

  const answerSupport = (requestId) => {
    const response = supportResponses[requestId] || ''
    if (!response.trim()) return
    respondToSupportRequest(requestId, response)
    setSupportResponses((current) => ({ ...current, [requestId]: '' }))
    refresh()
  }

  return (
    <section className="ops-page">
      <div className="page-width ops-layout">
        <header className="ops-header">
          <div>
            <p className="section-label">INTERNAL FRONTEND PREVIEW</p>
            <h1>Learning & Facilitation Review</h1>
            <p>Local trainer workspace for reviewing learner outputs, capstone work, and support requests. This is designed for Cognita’s solo-operator pilot model.</p>
          </div>
          <button className="button button--ghost" type="button" onClick={refresh}><RotateCcw size={17} /> Refresh local state</button>
        </header>

        <div className="ops-data-grid">
          <div><span>Student</span><strong>{account?.fullName || 'No active student'}</strong></div>
          <div><span>Program</span><strong>{enrollment?.programName || 'No active enrollment'}</strong></div>
          <div><span>Learning progress</span><strong>{snapshot.progress}%</strong></div>
          <div><span>Pending output reviews</span><strong>{snapshot.pendingReviews}</strong></div>
          <div><span>Outputs passed</span><strong>{snapshot.passedOutputs}/{snapshot.requiredOutputs}</strong></div>
          <div><span>Open support requests</span><strong>{snapshot.openSupport}</strong></div>
        </div>

        <article className="ops-card">
          <div className="ops-card-heading">
            <div><span>OUTPUT REVIEW QUEUE</span><h2>Submitted learner work</h2></div>
            <strong>{pendingSubmissions.length} pending</strong>
          </div>
          {pendingSubmissions.length ? (
            <div className="learning-review-list">
              {pendingSubmissions.map((submission) => {
                const lesson = lessonMap[submission.lessonId]
                return (
                  <section className="learning-review-item" key={submission.lessonId}>
                    <div className="learning-review-heading">
                      <div><span>{lesson?.type || 'output'}</span><h3>{lesson?.title || submission.lessonId}</h3><small>Submitted {formatDate(submission.submittedAt)}</small></div>
                      <strong>{submission.status.replaceAll('_', ' ')}</strong>
                    </div>
                    <div className="learning-review-response"><p>{submission.text}</p></div>
                    <textarea rows="4" placeholder="Required facilitator feedback or revision rationale" value={notes[submission.lessonId] || ''} onChange={(event) => setNotes((current) => ({ ...current, [submission.lessonId]: event.target.value }))} />
                    <div className="ops-actions"><div><button className="button" type="button" onClick={() => decideSubmission(submission.lessonId, 'pass')}><CheckCircle2 size={18} /> PASS</button><button className="button button--ghost" type="button" onClick={() => decideSubmission(submission.lessonId, 'revise')}><XCircle size={18} /> REVISE</button></div></div>
                  </section>
                )
              })}
            </div>
          ) : <p>No learner outputs are currently waiting for review.</p>}
        </article>

        <article className="ops-card">
          <div className="ops-card-heading">
            <div><span>CAPSTONE</span><h2>Final project review</h2></div>
            <GraduationCap />
          </div>
          <div className="ops-data-grid">
            <div><span>Status</span><strong>{snapshot.state.capstone.status.replaceAll('_', ' ')}</strong></div>
            <div><span>Submitted</span><strong>{formatDate(snapshot.state.capstone.submittedAt)}</strong></div>
          </div>
          {snapshot.state.capstone.draft ? <div className="learning-review-response"><strong>Project evidence</strong><p>{snapshot.state.capstone.draft}</p><strong>Reflection / defense</strong><p>{snapshot.state.capstone.reflection || 'No reflection provided.'}</p></div> : <p>No capstone draft exists yet.</p>}
          {snapshot.state.capstone.status === 'submitted_for_review' && (
            <div className="ops-actions">
              <textarea rows="4" placeholder="Required capstone evaluation rationale" value={capstoneNote} onChange={(event) => setCapstoneNote(event.target.value)} />
              <div><button className="button" type="button" onClick={() => decideCapstone('pass')}><CheckCircle2 size={18} /> PASS capstone</button><button className="button button--ghost" type="button" onClick={() => decideCapstone('revise')}><XCircle size={18} /> Require revision</button></div>
            </div>
          )}
        </article>

        <article className="ops-card">
          <div className="ops-card-heading">
            <div><span>STUDENT SUPPORT</span><h2>Open learner requests</h2></div>
            <MessageSquareText />
          </div>
          {openSupport.length ? (
            <div className="learning-review-list">
              {openSupport.map((request) => (
                <section className="learning-review-item" key={request.id}>
                  <div className="learning-review-heading"><div><span>OPEN REQUEST</span><h3>{account?.fullName || 'Learner'}</h3><small>{formatDate(request.createdAt)}</small></div></div>
                  <div className="learning-review-response"><p>{request.message}</p></div>
                  <textarea rows="3" placeholder="Response to learner" value={supportResponses[request.id] || ''} onChange={(event) => setSupportResponses((current) => ({ ...current, [request.id]: event.target.value }))} />
                  <button className="button" type="button" onClick={() => answerSupport(request.id)}>Record response</button>
                </section>
              ))}
            </div>
          ) : <p>No support requests are currently waiting for a response.</p>}
        </article>

        <div className="ops-warning"><ShieldAlert /><p>This is still browser-local simulation. PASS/REVISE decisions and support responses are stored only on this device and are not production academic records.</p></div>
      </div>
    </section>
  )
}
