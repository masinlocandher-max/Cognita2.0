import { useMemo, useState } from 'react'
import { ArrowRight, BookOpenCheck, CheckCircle2, FileClock, Laptop, Pencil, RotateCcw, ShieldCheck, UserRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { clearDeviceData, createAttempt, getAttempts, getLearner, importLegacyExamIfAvailable, saveLearner } from '../lib/localLearner'

function formatDate(value) {
  if (!value) return 'Not started'
  return new Intl.DateTimeFormat('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))
}

export default function Learner() {
  useMemo(() => importLegacyExamIfAvailable(), [])

  const navigate = useNavigate()
  const [learner, setLearner] = useState(() => getLearner())
  const [editing, setEditing] = useState(() => !getLearner())
  const [form, setForm] = useState(() => ({
    fullName: getLearner()?.fullName || '',
    email: getLearner()?.email || '',
  }))
  const [refreshKey, setRefreshKey] = useState(0)

  const attempts = useMemo(() => learner ? getAttempts(learner.id) : [], [learner, refreshKey])
  const activeAttempt = attempts.find((attempt) => !attempt.completed)
  const latestCompleted = attempts.find((attempt) => attempt.completed)

  const submitProfile = (event) => {
    event.preventDefault()
    if (!form.fullName.trim() || !form.email.trim()) return
    const nextLearner = saveLearner(form)
    setLearner(nextLearner)
    setForm({ fullName: nextLearner.fullName, email: nextLearner.email })
    setEditing(false)
    setRefreshKey((value) => value + 1)
  }

  const startNewAttempt = () => {
    if (!learner) return
    createAttempt(learner)
    navigate('/entrance-exam/start')
  }

  const clearAll = () => {
    if (!window.confirm('Delete this device-local learner profile and all saved Cognita Entrance Exam attempts?')) return
    clearDeviceData()
    setLearner(null)
    setForm({ fullName: '', email: '' })
    setEditing(true)
    setRefreshKey((value) => value + 1)
  }

  return (
    <section className="learner-page">
      <div className="page-width learner-shell">
        <div className="learner-intro">
          <div>
            <p className="section-label">LEARNER PROFILE</p>
            <h1>Your Cognita starting point lives here.</h1>
            <p>This frontend-only build keeps your profile and exam records on this device. It does not create an online account or send your information to a server.</p>
          </div>
          <div className="local-only-note">
            <Laptop size={22} />
            <div>
              <strong>Stored on this device</strong>
              <span>Clearing browser data or changing devices can remove access to these records.</span>
            </div>
          </div>
        </div>

        {!learner || editing ? (
          <div className="learner-profile-card">
            <div className="learner-profile-heading">
              <UserRound size={28} />
              <div>
                <h2>{learner ? 'Edit learner profile' : 'Create your learner profile'}</h2>
                <p>This profile links your CEE attempts together on this browser.</p>
              </div>
            </div>
            <form className="candidate-form" onSubmit={submitProfile}>
              <label>
                Full name
                <input value={form.fullName} onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))} autoComplete="name" required />
              </label>
              <label>
                Email address
                <input type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} autoComplete="email" required />
              </label>
              <div className="profile-form-actions">
                {learner ? <button className="button button--ghost" type="button" onClick={() => setEditing(false)}>Cancel</button> : null}
                <button className="button" type="submit">Save learner profile <ArrowRight size={18} /></button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="learner-dashboard-grid">
              <article className="learner-summary-card learner-summary-card--profile">
                <div className="learner-card-topline">
                  <span>DEVICE PROFILE</span>
                  <button type="button" onClick={() => setEditing(true)}><Pencil size={16} /> Edit</button>
                </div>
                <h2>{learner.fullName}</h2>
                <p>{learner.email}</p>
                <small>Created {formatDate(learner.createdAt)}</small>
              </article>

              <article className="learner-summary-card">
                <div className="learner-card-icon"><FileClock /></div>
                <span>CEE STATUS</span>
                <h3>{activeAttempt ? 'Exam in progress' : latestCompleted ? 'Submitted for review' : 'Not started'}</h3>
                <p>{activeAttempt ? 'Your current attempt is saved and can be resumed on this device.' : latestCompleted ? 'Your objective profile is complete. Applied responses remain a human-review step in the future operational version.' : 'Begin CEE v1.0 when you are ready.'}</p>
                {activeAttempt ? (
                  <Link className="button" to="/entrance-exam/start">Resume exam <ArrowRight size={18} /></Link>
                ) : (
                  <button className="button" type="button" onClick={startNewAttempt}>{latestCompleted ? 'Start another attempt' : 'Start CEE v1.0'} <ArrowRight size={18} /></button>
                )}
              </article>

              <article className="learner-summary-card">
                <div className="learner-card-icon"><BookOpenCheck /></div>
                <span>PLACEMENT</span>
                <h3>{latestCompleted?.placement?.title || 'Not yet determined'}</h3>
                <p>{latestCompleted?.placement?.detail || 'A preliminary placement indication appears after the objective CEE profile is complete.'}</p>
                {latestCompleted?.objectivePoints !== null && latestCompleted?.objectivePoints !== undefined ? <strong className="objective-mini-score">{latestCompleted.objectivePoints}<small>/70 objective</small></strong> : null}
              </article>
            </div>

            <div className="attempt-history-section">
              <div className="attempt-history-heading">
                <div>
                  <p className="section-label">CEE RECORDS</p>
                  <h2>Attempt history</h2>
                </div>
                <span>{attempts.length} {attempts.length === 1 ? 'attempt' : 'attempts'} saved</span>
              </div>

              {attempts.length ? (
                <div className="attempt-list">
                  {attempts.map((attempt, index) => (
                    <article className="attempt-row" key={attempt.id}>
                      <div className="attempt-index">{String(attempts.length - index).padStart(2, '0')}</div>
                      <div className="attempt-main">
                        <div>
                          <strong>{attempt.examVersion}</strong>
                          <span>{attempt.completed ? 'Submitted' : attempt.startedAt ? 'In progress' : 'Created'}</span>
                        </div>
                        <small>Updated {formatDate(attempt.updatedAt)}</small>
                      </div>
                      <div className="attempt-result">
                        {attempt.completed ? (
                          <>
                            <strong>{attempt.objectivePoints ?? '—'}<small>/70</small></strong>
                            <span>{attempt.placement?.title || 'Objective profile complete'}</span>
                          </>
                        ) : (
                          <span>{attempt.startedAt ? 'Resume available' : 'Ready to begin'}</span>
                        )}
                      </div>
                      {!attempt.completed && index === 0 ? <Link className="attempt-link" to="/entrance-exam/start">Resume <ArrowRight size={16} /></Link> : <CheckCircle2 className="attempt-done" size={20} />}
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-attempts">
                  <ShieldCheck size={28} />
                  <div>
                    <strong>No exam attempts yet.</strong>
                    <p>Your CEE progress and submitted objective profile will appear here.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="local-data-controls">
              <div>
                <strong>Device-local data controls</strong>
                <p>This deletes the profile and all saved CEE attempts from this browser only.</p>
              </div>
              <button className="button button--ghost" type="button" onClick={clearAll}><RotateCcw size={18} /> Clear device data</button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
