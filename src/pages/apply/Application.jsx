import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { APPLICATION_FIELDS, deriveApplicationStatus, saveApplicationDraft, submitApplication } from '../../repositories/admissionsRepository.js'
import { useLearnerContext } from '../../hooks/useLearnerContext.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { ApplicationStatus } from '../../lib/status.js'
import Alert from '../../components/Alert.jsx'
import StatusPill from '../../components/StatusPill.jsx'
import Meter from '../../components/Meter.jsx'
import { formatDateTime } from '../../lib/format.js'

export default function Application() {
  useDocumentTitle('Application')
  const navigate = useNavigate()
  const { learner, application, reload } = useLearnerContext()
  const [answers, setAnswers] = useState({})
  const [savedAt, setSavedAt] = useState(null)
  const [errors, setErrors] = useState({})

  useEffect(() => { if (application?.answers) setAnswers(application.answers) }, [application?.id])

  if (!learner) {
    return (
      <>
        <div className="page-head">
          <h1>Application</h1>
          <p>Create your learner record first — the application attaches to it.</p>
        </div>
        <Link className="btn" to="/apply/profile">Create learner record <ArrowRight size={16} /></Link>
      </>
    )
  }

  const status = deriveApplicationStatus({ ...application, answers })
  const submitted = application?.status === ApplicationStatus.SUBMITTED
  const requiredFields = APPLICATION_FIELDS.filter((field) => field.required)
  const completed = requiredFields.filter((field) => String(answers[field.id] || '').trim()).length

  const update = async (fieldId, value) => {
    const next = { ...answers, [fieldId]: value }
    setAnswers(next)
    const saved = await saveApplicationDraft({ [fieldId]: value })
    setSavedAt(saved.updatedAt)
  }

  const submit = async (event) => {
    event.preventDefault()
    const nextErrors = {}
    requiredFields.forEach((field) => {
      if (!String(answers[field.id] || '').trim()) nextErrors[field.id] = 'This answer is required.'
    })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      document.getElementById(Object.keys(nextErrors)[0])?.focus()
      return
    }

    await submitApplication()
    await reload()
    navigate('/apply/entrance-exam')
  }

  return (
    <>
      <div className="page-head page-head-row">
        <div>
          <p className="eyebrow">Admissions</p>
          <h1>Your application</h1>
          <p>Answer honestly rather than impressively. This is used to place you, not to rank you against other applicants.</p>
        </div>
        <StatusPill status={status} />
      </div>

      {submitted ? (
        <Alert tone="positive" title="Application recorded on this device">
          Submitted {formatDateTime(application.submittedAt)}. It has not been transmitted to Cognita — this preview
          build has no server behind it. Your answers remain editable below.
        </Alert>
      ) : (
        <Meter value={completed} max={requiredFields.length} label="Required questions answered" valueText={`${completed}/${requiredFields.length}`} />
      )}

      <form className="stack-6" onSubmit={submit} noValidate style={{ marginTop: 'var(--s-6)' }}>
        {APPLICATION_FIELDS.map((field) => (
          <div className="card field" key={field.id}>
            <label htmlFor={field.id}>
              {field.label}
              {!field.required ? <span className="muted" style={{ fontWeight: 400 }}> · optional</span> : null}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                id={field.id}
                className="textarea"
                style={{ minHeight: 120 }}
                value={answers[field.id] || ''}
                aria-invalid={Boolean(errors[field.id])}
                aria-describedby={errors[field.id] ? `${field.id}-error` : field.hint ? `${field.id}-hint` : undefined}
                onChange={(event) => update(field.id, event.target.value)}
              />
            ) : field.type === 'select' ? (
              <select
                id={field.id}
                className="select"
                value={answers[field.id] || ''}
                aria-invalid={Boolean(errors[field.id])}
                aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                onChange={(event) => update(field.id, event.target.value)}
              >
                <option value="">Select an answer</option>
                {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            ) : (
              <input
                id={field.id}
                className="input"
                value={answers[field.id] || ''}
                aria-invalid={Boolean(errors[field.id])}
                aria-describedby={errors[field.id] ? `${field.id}-error` : field.hint ? `${field.id}-hint` : undefined}
                onChange={(event) => update(field.id, event.target.value)}
              />
            )}

            {errors[field.id]
              ? <p className="field-error" id={`${field.id}-error`}>{errors[field.id]}</p>
              : field.hint ? <p className="field-hint" id={`${field.id}-hint`}>{field.hint}</p> : null}
          </div>
        ))}

        <div className="row-between">
          <span className="muted" style={{ fontSize: 'var(--text-xs)' }} role="status">
            {savedAt ? <><Check size={13} style={{ verticalAlign: '-2px' }} /> Draft saved on this device</> : 'Your answers save automatically as you type.'}
          </span>
          <button className="btn btn--lg" type="submit">
            {submitted ? 'Update application' : 'Submit application'} <ArrowRight size={17} />
          </button>
        </div>
      </form>
    </>
  )
}
