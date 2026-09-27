import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Clock3, Flag, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { appliedTasks, examMeta, examSections } from '../data/exam'
import { getApplication, markCeeStarted, markCeeSubmitted } from '../lib/admissions'
import { createAttempt, getAttempt, getLearner, saveAttempt, saveLearner } from '../lib/localLearner'

function formatTime(seconds) {
  const safe = Math.max(0, seconds)
  const minutes = Math.floor(safe / 60)
  const secs = safe % 60
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export default function Exam() {
  const [params] = useSearchParams()
  const invite = params.get('invite') || ''
  const application = getApplication()
  const inviteMatches = Boolean(
    application?.ceeInvite?.code &&
    invite &&
    application.ceeInvite.code.toUpperCase() === invite.trim().toUpperCase()
  )
  const accessAllowed = inviteMatches && ['approved_for_cee', 'cee_in_progress', 'cee_review_pending'].includes(application?.status)

  const initialLearner = useMemo(() => getLearner(), [])
  const initialAttempt = useMemo(() => {
    if (application?.ceeAttemptId) return getAttempt(application.ceeAttemptId)
    return null
  }, [application?.ceeAttemptId])

  const [learner, setLearner] = useState(initialLearner)
  const [attempt, setAttempt] = useState(initialAttempt)
  const [elapsed, setElapsed] = useState(0)
  const [pledged, setPledged] = useState(false)

  const stages = useMemo(() => [...examSections, { id: 'applied', title: 'Applied Response', subtitle: 'Independent written tasks' }], [])
  const answers = attempt?.answers || {}
  const applied = attempt?.applied || {}
  const stageIndex = attempt?.stageIndex || 0
  const currentStage = stages[stageIndex]
  const maxSeconds = examMeta.recommendedMinutes * 60

  const objectiveQuestions = useMemo(() => examSections.flatMap((section) => section.questions), [])
  const objectiveAnswered = objectiveQuestions.filter((question) => answers[question.id] !== undefined).length
  const appliedAnswered = appliedTasks.filter((task) => (applied[task.id] || '').trim().length >= 80).length
  const completedItems = objectiveAnswered + appliedAnswered
  const totalItems = objectiveQuestions.length + appliedTasks.length
  const progress = Math.round((completedItems / totalItems) * 100)

  const scoreSection = (section) => {
    const correct = section.questions.filter((question) => answers[question.id] === question.answer).length
    const total = section.questions.length
    const percentage = Math.round((correct / total) * 100)
    return {
      id: section.id,
      title: section.title,
      foundationModule: section.foundationModule,
      correct,
      total,
      percentage,
      points: Math.round((percentage / 100) * section.points),
      availablePoints: section.points,
    }
  }

  const sectionScores = examSections.map(scoreSection)
  const objectivePoints = sectionScores.reduce((sum, section) => sum + section.points, 0)
  const diagnosticProfile = Object.fromEntries(
    sectionScores.map((section) => [section.id, {
      title: section.title,
      percentage: section.percentage,
      points: section.points,
      availablePoints: section.availablePoints,
      foundationModule: section.foundationModule,
    }])
  )

  const placement = (() => {
    const needsSupport = sectionScores.filter((section) => section.percentage < 70)
    const criticalNeeds = sectionScores.filter((section) => section.percentage < 50)
    const requiredFoundationModules = needsSupport.map((section) => section.foundationModule)

    if (needsSupport.length === 0) {
      return {
        code: 'direct-track-entry',
        title: 'Direct Track Entry indicated',
        detail: 'The objective profile shows no foundation domain below the current diagnostic review line. Applied responses and evaluator review may still change the final pathway.',
        requiredFoundationModules: [],
      }
    }

    if (criticalNeeds.length > 0 || needsSupport.length >= 2) {
      return {
        code: 'foundation-required',
        title: 'Foundation Required indicated',
        detail: 'The objective profile shows one or more substantial readiness gaps. Cognita should assign only the foundation modules linked to the demonstrated gaps, subject to applied-task and evaluator review.',
        requiredFoundationModules,
      }
    }

    return {
      code: 'foundation-accelerated',
      title: 'Foundation Accelerated indicated',
      detail: 'The objective profile shows a targeted readiness gap rather than a need to repeat the full foundation layer. Applied responses and evaluator review determine the final assignment.',
      requiredFoundationModules,
    }
  })()

  const stageIsComplete = (stage) => {
    if (stage.id === 'applied') return appliedAnswered === appliedTasks.length
    return stage.questions.every((question) => answers[question.id] !== undefined)
  }

  const completedStages = stages.map(stageIsComplete)
  const firstIncompleteStage = completedStages.findIndex((value) => !value)
  const maxReachableStage = firstIncompleteStage === -1 ? stages.length - 1 : firstIncompleteStage

  const recordIntegrityEvent = (type) => {
    setAttempt((current) => {
      if (!current || current.completed) return current
      const previous = current.integrityEvents || []
      const last = previous[previous.length - 1]
      const now = Date.now()
      if (last?.type === type && now - last.at < 1500) return current
      return { ...current, integrityEvents: [...previous, { type, at: now }] }
    })
  }

  const updateAttempt = (changes) => {
    setAttempt((current) => current ? { ...current, ...changes } : current)
  }

  const beginExam = () => {
    if (!application || !pledged || !inviteMatches) return

    let nextLearner = learner
    if (!nextLearner || nextLearner.email !== application.applicant.email) {
      nextLearner = saveLearner({
        fullName: application.applicant.fullName,
        email: application.applicant.email,
      })
      setLearner(nextLearner)
    }

    let nextAttempt = attempt
    if (!nextAttempt) {
      nextAttempt = createAttempt(nextLearner)
    }

    const startedAttempt = nextAttempt.startedAt ? nextAttempt : {
      ...nextAttempt,
      candidate: { name: application.applicant.fullName, email: application.applicant.email },
      startedAt: Date.now(),
      integrityEvents: nextAttempt.integrityEvents || [],
      invitationReference: application.reference,
    }

    saveAttempt(startedAttempt)
    markCeeStarted(startedAttempt.id)
    setAttempt(startedAttempt)
  }

  const choose = (questionId, optionIndex) => {
    setAttempt((current) => current ? {
      ...current,
      answers: { ...current.answers, [questionId]: optionIndex },
    } : current)
  }

  const setAppliedResponse = (taskId, value) => {
    setAttempt((current) => current ? {
      ...current,
      applied: { ...current.applied, [taskId]: value },
    } : current)
  }

  const goToStage = (index) => {
    if (!attempt || index > maxReachableStage) return
    updateAttempt({ stageIndex: index })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const next = () => {
    if (!attempt || !stageIsComplete(currentStage)) return
    updateAttempt({ stageIndex: Math.min(stageIndex + 1, stages.length - 1) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const previous = () => {
    if (!attempt) return
    updateAttempt({ stageIndex: Math.max(stageIndex - 1, 0) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const finish = (forcedByTimeout = false) => {
    if (!attempt || attempt.completed) return
    if (!forcedByTimeout && (objectiveAnswered !== objectiveQuestions.length || appliedAnswered !== appliedTasks.length)) return

    const submitted = {
      ...attempt,
      completed: true,
      submittedAt: new Date().toISOString(),
      submissionReason: forcedByTimeout ? 'time_expired' : 'candidate_submitted',
      objectivePoints,
      scores: {
        sections: diagnosticProfile,
      },
      placement,
    }

    saveAttempt(submitted)
    markCeeSubmitted(submitted.id, objectivePoints, placement)
    setAttempt(submitted)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    if (attempt) saveAttempt(attempt)
  }, [attempt])

  useEffect(() => {
    if (!attempt?.startedAt || attempt.completed) return undefined
    const tick = () => setElapsed(Math.floor((Date.now() - attempt.startedAt) / 1000))
    tick()
    const timer = window.setInterval(tick, 1000)
    return () => window.clearInterval(timer)
  }, [attempt?.startedAt, attempt?.completed])

  useEffect(() => {
    if (!attempt?.startedAt || attempt.completed) return undefined
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') recordIntegrityEvent('exam_window_hidden')
    }
    const onBlur = () => recordIntegrityEvent('exam_window_blur')
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('blur', onBlur)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('blur', onBlur)
    }
  }, [attempt?.startedAt, attempt?.completed])

  useEffect(() => {
    if (attempt?.startedAt && !attempt.completed && elapsed >= maxSeconds) {
      finish(true)
    }
  }, [elapsed, attempt?.startedAt, attempt?.completed])

  if (!accessAllowed && !attempt?.completed) {
    return (
      <section className="admissions-page">
        <div className="page-width gate-card">
          <LockKeyhole size={36} />
          <p className="section-label">CEE ACCESS REQUIRED</p>
          <h1>This assessment requires an approved admissions invitation.</h1>
          <p>Register first and wait for Cognita Admissions to issue your entrance-exam access through email.</p>
          <Link className="button" to="/apply">Return to Admissions</Link>
        </div>
      </section>
    )
  }

  if (!attempt?.startedAt) {
    return (
      <section className="exam-workspace exam-workspace--setup">
        <div className="exam-container exam-setup-card">
          <div>
            <p className="section-label">{examMeta.version} · APPROVED CANDIDATE</p>
            <h1>Confirm the assessment rules before starting.</h1>
            <p className="exam-intro">The 70-minute AI-00 / CEE is a diagnostic assessment used to understand your current readiness and help determine your training flow. The timer begins only when you press Start exam. Once started, refreshing or leaving the page does not reset the timer.</p>
            <div className="exam-profile-confirmation">
              <UserRound size={20} />
              <div><strong>{application.applicant.fullName}</strong><span>{application.applicant.email}</span></div>
            </div>
          </div>
          <div className="exam-start-actions">
            <div className="integrity-note">
              <Flag size={20} />
              <p>Complete the assessment independently. Do not use generative AI or browse the web for objective sections. Window-leave events may be recorded for evaluator review.</p>
            </div>
            <label className="consent-row">
              <input type="checkbox" checked={pledged} onChange={(event) => setPledged(event.target.checked)} />
              <span>I understand the CEE integrity rules and certify that the work I submit will be my own.</span>
            </label>
            <button className="button" type="button" onClick={beginExam} disabled={!pledged}>Start timed exam <ArrowRight size={18} /></button>
          </div>
        </div>
      </section>
    )
  }

  if (attempt.completed) {
    return (
      <section className="exam-workspace">
        <div className="exam-container result-layout">
          <div className="result-hero">
            <div className="result-check"><Check size={32} /></div>
            <p className="section-label">CEE SUBMITTED</p>
            <h1>Your assessment is now pending evaluator review.</h1>
            <p>Cognita does not issue the final result on this screen. Your complete assessment, including the diagnostic profile, two applied responses, and any integrity events, must be reviewed before the official admission and training-pathway decision is released through email.</p>
          </div>

          <div className="review-panel">
            <div>
              <h2>What happens next</h2>
              <p>Admissions and evaluation review the submitted CEE / AI-00. The final review separates admission from training placement: an admitted learner may receive Direct Track Entry, targeted Foundation Accelerated modules, or Foundation Required modules based on demonstrated readiness.</p>
            </div>
            <div className="review-status"><span>STATUS</span><strong>Evaluation pending</strong></div>
          </div>

          <div className="result-actions">
            <Link className="button" to="/apply">View admissions status</Link>
          </div>
          <p className="mvp-note">Frontend milestone: the submission and email events remain on this browser only until Cognita's production backend and email service are activated.</p>
        </div>
      </section>
    )
  }

  const currentQuestions = currentStage.id === 'applied' ? [] : currentStage.questions
  const currentAnswered = currentQuestions.filter((question) => answers[question.id] !== undefined).length
  const canAdvance = stageIsComplete(currentStage)
  const remainingSeconds = maxSeconds - elapsed

  return (
    <section className="exam-workspace">
      <div className="exam-topbar">
        <div className="exam-container exam-topbar-inner">
          <div>
            <strong>{examMeta.version}</strong>
            <span>{attempt.candidate.name}</span>
          </div>
          <div className="exam-progress-wrap">
            <div className="exam-progress"><span style={{ width: `${progress}%` }} /></div>
            <span>{progress}% complete</span>
          </div>
          <div className={`exam-timer ${remainingSeconds <= 600 ? 'is-low' : ''}`}><Clock3 size={17} /> {formatTime(remainingSeconds)}</div>
        </div>
      </div>

      <div className="exam-container exam-body">
        <aside className="exam-sidebar">
          <div className="integrity-note"><ShieldCheck size={18} /><p>Integrity log active · {attempt.integrityEvents?.length || 0} event(s)</p></div>
          <p>Sections</p>
          {stages.map((stage, index) => (
            <button
              key={stage.id}
              className={index === stageIndex ? 'is-active' : ''}
              onClick={() => goToStage(index)}
              disabled={index > maxReachableStage}
            >
              <span>{index + 1}</span>
              <div><strong>{stage.title}</strong><small>{stage.subtitle}</small></div>
            </button>
          ))}
        </aside>

        <div className="exam-content">
          <div className="exam-section-heading">
            <p className="section-label">SECTION {stageIndex + 1} OF {stages.length}</p>
            <h1>{currentStage.title}</h1>
            <p>{currentStage.subtitle}</p>
          </div>

          {currentStage.id !== 'applied' ? (
            <div className="question-list">
              {currentQuestions.map((question) => (
                <fieldset className="question-card" key={question.id}>
                  <legend><span>{question.id}</span>{question.prompt}</legend>
                  <div className="option-list">
                    {question.options.map((option, index) => (
                      <label className={answers[question.id] === index ? 'is-selected' : ''} key={option}>
                        <input type="radio" name={`question-${question.id}`} checked={answers[question.id] === index} onChange={() => choose(question.id, index)} />
                        <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
          ) : (
            <div className="applied-list">
              {appliedTasks.map((task, index) => (
                <article className="applied-card" key={task.id}>
                  <div className="applied-number">0{index + 1}</div>
                  <div>
                    <span>{task.points} points</span>
                    <h2>{task.title}</h2>
                    <p className="applied-prompt">{task.prompt}</p>
                    <p className="applied-guidance">{task.guidance}</p>
                    <label>
                      Your response
                      <textarea
                        rows="9"
                        value={applied[task.id] || ''}
                        onChange={(event) => setAppliedResponse(task.id, event.target.value)}
                        onPaste={() => recordIntegrityEvent('paste_in_applied_response')}
                        placeholder="Write your response in your own words…"
                      />
                    </label>
                    <small>{(applied[task.id] || '').trim().length < 80 ? 'Write a developed response of at least 80 characters before submitting.' : 'Response captured.'}</small>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="exam-navigation">
            <button className="button button--ghost" type="button" onClick={previous} disabled={stageIndex === 0}><ArrowLeft size={18} /> Previous</button>
            <div className="exam-navigation-status">
              {currentStage.id !== 'applied' ? <span>{currentAnswered} of {currentQuestions.length} answered</span> : <span>{appliedAnswered} of {appliedTasks.length} developed responses ready</span>}
              {!canAdvance ? <small>Complete this section to continue. The timer continues running.</small> : null}
            </div>
            {stageIndex < stages.length - 1 ? (
              <button className="button" type="button" onClick={next} disabled={!canAdvance}>Next section <ArrowRight size={18} /></button>
            ) : (
              <button className="button" type="button" onClick={() => finish(false)} disabled={!canAdvance || objectiveAnswered !== objectiveQuestions.length}>Submit CEE <Check size={18} /></button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
