import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Trash2 } from 'lucide-react'
import { clearLocalIdentity, saveLearner } from '../../repositories/learnerRepository.js'
import { listAttempts } from '../../repositories/ceeRepository.js'
import { useLearnerContext } from '../../hooks/useLearnerContext.js'
import { useAsync } from '../../hooks/useAsync.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { LocalOnlyNotice } from '../../components/Alert.jsx'
import Modal from '../../components/Modal.jsx'
import StatusPill from '../../components/StatusPill.jsx'
import StateBlock from '../../components/StateBlock.jsx'
import { attemptStatus } from '../../repositories/ceeRepository.js'
import { formatDateTime } from '../../lib/format.js'

export default function Profile() {
  useDocumentTitle('Profile')
  const navigate = useNavigate()
  const { learner, reload } = useLearnerContext()
  const attempts = useAsync(() => listAttempts(), [])

  const [form, setForm] = useState({ fullName: '', email: '', municipality: '' })
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)
  const [confirmClear, setConfirmClear] = useState(false)

  useEffect(() => {
    if (learner) setForm({ fullName: learner.fullName, email: learner.email, municipality: learner.municipality || '' })
  }, [learner])

  const submit = async (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!form.fullName.trim()) nextErrors.fullName = 'Enter the name you want on your record.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = 'Enter a valid email address.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    await saveLearner(form)
    await reload()
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2600)
    if (!learner) navigate('/apply/application')
  }

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Profile</p>
        <h1>{learner ? 'Your learner record' : 'Create your learner record'}</h1>
        <p>
          This record links your application, exam attempts, placement and progress together. It is not an
          account: there is no password, no sign-in, and nothing is transmitted to Cognita.
        </p>
      </div>

      <div className="profile-grid">
        <form className="card stack-6" onSubmit={submit} noValidate>
          <div className="field">
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              className="input"
              value={form.fullName}
              autoComplete="name"
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
            />
            {errors.fullName ? <p className="field-error" id="fullName-error">{errors.fullName}</p> : null}
          </div>

          <div className="field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              className="input"
              value={form.email}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : 'email-hint'}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            />
            {errors.email
              ? <p className="field-error" id="email-error">{errors.email}</p>
              : <p className="field-hint" id="email-hint">Used to identify your record. No email is sent in this build.</p>}
          </div>

          <div className="field">
            <label htmlFor="municipality">City or municipality</label>
            <input
              id="municipality"
              className="input"
              value={form.municipality}
              autoComplete="address-level2"
              onChange={(event) => setForm((current) => ({ ...current, municipality: event.target.value }))}
            />
          </div>

          <div className="row-between">
            <button className="btn" type="submit">{learner ? 'Save changes' : 'Create record'} <ArrowRight size={16} /></button>
            {saved ? <span className="status status--positive" role="status"><span aria-hidden="true">✓</span> Saved on this device</span> : null}
          </div>
        </form>

        <div className="stack-6">
          <LocalOnlyNotice />

          {learner ? (
            <div className="card">
              <p className="card-title">Record details</p>
              <dl className="kv-grid" style={{ marginTop: 'var(--s-4)' }}>
                <div className="kv"><dt>Reference</dt><dd className="tabular">{learner.reference}</dd></div>
                <div className="kv"><dt>Created</dt><dd>{formatDateTime(learner.createdAt)}</dd></div>
                <div className="kv"><dt>Last updated</dt><dd>{formatDateTime(learner.updatedAt)}</dd></div>
              </dl>
            </div>
          ) : null}

          {learner ? (
            <div className="card">
              <p className="card-title">Device data</p>
              <p className="muted" style={{ fontSize: 'var(--text-sm)', margin: 'var(--s-2) 0 var(--s-4)' }}>
                Removes your record, application, exam attempts and learning progress from this browser. It cannot
                be undone, because there is no copy anywhere else.
              </p>
              <button className="btn btn--secondary btn--sm" type="button" onClick={() => setConfirmClear(true)}>
                <Trash2 size={15} /> Clear device data
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {learner ? (
        <section className="stack-4" style={{ marginTop: 'var(--s-8)' }}>
          <h2 style={{ fontSize: 'var(--display-sm)' }}>Exam attempt history</h2>
          {!attempts.data?.length ? (
            <StateBlock variant="empty" title="No attempts yet" description="Your entrance exam attempts will be listed here." />
          ) : (
            <ul className="attempt-list">
              {attempts.data.map((attempt, index) => (
                <li key={attempt.id} className="attempt-row">
                  <span className="attempt-index tabular">{String(attempts.data.length - index).padStart(2, '0')}</span>
                  <div className="attempt-main">
                    <strong>{attempt.examVersion}</strong>
                    <span className="muted">Updated {formatDateTime(attempt.updatedAt)}</span>
                  </div>
                  <div className="attempt-score">
                    {attempt.completed ? <strong className="tabular">{attempt.objectivePoints}<small>/70</small></strong> : null}
                    <StatusPill status={attemptStatus(attempt)} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : null}

      <Modal
        open={confirmClear}
        onClose={() => setConfirmClear(false)}
        title="Clear all device data?"
        description="This removes your learner record, application, exam attempts and learning progress from this browser."
        actions={(
          <>
            <button className="btn btn--secondary" type="button" onClick={() => setConfirmClear(false)}>Cancel</button>
            <button
              className="btn btn--danger"
              type="button"
              onClick={async () => {
                await clearLocalIdentity()
                setConfirmClear(false)
                await reload()
                navigate('/app')
              }}
            >
              Clear everything
            </button>
          </>
        )}
      >
        <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>
          Nothing is stored on a server in this build, so there is no backup to restore from.
        </p>
      </Modal>
    </>
  )
}
