import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Clock3, Flag, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { appliedTasks, examMeta, examSections } from '../data/exam'
import { createAttempt, getActiveAttempt, getLearner, importLegacyExamIfAvailable, saveAttempt, saveLearner } from '../lib/localLearner'

function formatTime(seconds) {
  const safe = Math.max(0, seconds)
  const minutes = Math.floor(safe / 60)
  const secs = safe % 60
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

function bootExam() {
  importLegacyExamIfAvailable()
  const learner = getLearner()
  return {
    learner,
    attempt: learner ? getActiveAttempt(learner.id) : null,
  }
}

export default function Exam() {
  const initial = useMemo(() => bootExam(), [])
  const [learner, setLearner] = useState(initial.learner)
  const [attempt, setAttempt] = useState(initial.attempt)
  const [profileForm, setProfileForm] = useState({
    fullName: initial.learner?.fullName || '',
    email: initial.learner?.email || '',
  })
  const [elapsed, setElapsed] = useState(0)

  const stages = useMemo(() => [...examSections, { id: 'applied', title: 'Applied Response', subtitle: 'Independent written tasks' }], [])
  const answers = attempt?.answers || {}
  const applied = attempt?.applied || {}
  const stageIndex = attempt?.stageIndex || 0
  const currentStage = stages[stageIndex]

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

  const objectiveQuestions = useMemo(() => examSections.flatMap((section) => section.questions), [])
  const objectiveAnswered = objectiveQuestions.filter((question) => answers[question.id] !== undefined).length
  const appliedAnswered = appliedTasks.filter((task) => (applied[task.id] || '').trim().length >= 80).length
  const completedItems = objectiveAnswered + appliedAnswered
  const totalItems = objectiveQuestions.length + appliedTasks.length
  const progress = Math.round((completedItems / totalItems) * 100)

  const scoreSection = (section) => {
    const correct = section.questions.filter((question) => answers[question.id] === question.answer).length
    return {
      correct,
      total: section.questions.length,
      percentage: Math.round((correct / section.questions.length) * 100),
    }
  }

  const sectionScores = examSections.map(scoreSection)
  const communication = sectionScores[0]
  const ai = sectionScores[1]
  const research = sectionScores[2]
  const communicationPoints = Math.round((communication.percentage / 100) * 30)
  const aiPoints = Math.round((ai.percentage / 100) * 25)
  const researchPoints = Math.round((research.percentage / 100) * 15)
  const objectivePoints = communicationPoints + aiPoints + researchPoints
  const aiReadiness = Math.round(((ai.correct + research.correct) / (ai.total + research.total)) * 100)

  const placement = useMemo(() => {
    const communicationScore = communication.percentage
    const aiScore = aiReadiness

    if (communicationScore >= 80 && aiScore >= 80) {
      return {
        title: 'AI-01 readiness indicated',
        detail: 'Your objective results indicate readiness to move beyond the foundation level. Applied responses still require review before final placement.',
      }
    }

    if (communicationScore < 70 && aiScore >= 80) {
      return {
        title: 'AI-00 Communication Readiness indicated',
        detail: 'Your AI foundation appears stronger than your current communication-readiness score. Communication support is the likely starting point.',
      }
    }

    if (communicationScore >= 80 && aiScore < 70) {
      return {
        title: 'AI-00 AI Foundations indicated',
        detail: 'Your communication readiness appears strong. AI foundations are the likely area to strengthen before progression.',
      }
    }

    if (communicationScore < 70 && aiScore < 70) {
      return {
        title: 'Full AI-00 indicated',
        detail: 'Your objective profile indicates that both AI foundations and communication readiness should be strengthened first.',
      }
    }

    return {
      title: 'Targeted bridge + review indicated',
      detail: 'One or more readiness areas are near the progression threshold. Applied responses should be reviewed before final placement.',
    }
  }, [communication.percentage, aiReadiness])

  const stageIsComplete = (stage) => {
    if (stage.id === 'applied') return appliedAnswered === appliedTasks.length
    return stage.questions.every((question) => answers[question.id] !== undefined)
  }

  const completedStages = stages.map(stageIsComplete)
  const firstIncompleteStage = completedStages.findIndex((value) => !value)
  const maxReachableStage = firstIncompleteStage === -1 ? stages.length - 1 : firstIncompleteStage

  const updateAttempt = (changes) => {
    setAttempt((current) => current ? { ...current, ...changes } : current)
  }

  const createProfileAndBegin = (event) => {
    event.preventDefault()
    if (!profileForm.fullName.trim() || !profileForm.email.trim()) return

    const nextLearner = saveLearner(profileForm)
    const nextAttempt = createAttempt(nextLearner)
    const startedAttempt = { ...nextAttempt, startedAt: Date.now() }
    saveAttempt(startedAttempt)
    setLearner(nextLearner)
    setAttempt(startedAttempt)
  }

  const beginExistingProfile = () => {
    if (!learner) return
    const nextAttempt = attempt || createAttempt(learner)
    const startedAttempt = nextAttempt.startedAt ? nextAttempt : { ...nextAttempt, startedAt: Date.now() }
    saveAttempt(startedAttempt)
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

  const finish = () => {
    if (!attempt || objectiveAnswered !== objectiveQuestions.length || appliedAnswered !== appliedTasks.length) return

    const submitted = {
      ...attempt,
      completed: true,
      submittedAt: new Date().toISOString(),
      objectivePoints,
      scores: {
        communication: { ...communication, points: communicationPoints },
        aiFoundations: { ...ai, points: aiPoints },
        research: { ...research, points: researchPoints },
        aiReadiness,
      },
      placement,
    }

    saveAttempt(submitted)
    setAttempt(submitted)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const newAttempt = () => {
    if (!learner) return
    const nextAttempt = createAttempt(learner)
    setAttempt(nextAttempt)
    setElapsed(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!learner) {
    return (
      <section className="exam-workspace exam-workspace--setup">
        <div className="exam-container exam-setup-card">
          <div>
            <p className="section-label">DEVICE-LOCAL LEARNER PROFILE</p>
            <h1>Set up your Cognita learner record.</h1>
            <p className="exam-intro">This frontend-only build stores your profile and CEE attempts on this browser. It is not an online account and no information is sent to a server.</p>
          </div>
          <form className="candidate-form" onSubmit={createProfileAndBegin}>
            <label>
              Full name
              <input value={profileForm.fullName} onChange={(event) => setProfileForm((current) => ({ ...current, fullName: event.target.value }))} autoComplete="name" required />
            </label>
            <label>
              Email address
              <input type="email" value={profileForm.email} onChange={(event) => setProfileForm((current) => ({ ...current, email: event.target.value }))} autoComplete="email" required />
            </label>
            <div className="integrity-note">
              <Flag size={20} />
              <p>By starting, you confirm that you will answer without generative AI assistance and that the written responses are your own.</p>
            </div>
            <button className="button" type="submit">Create profile and start <ArrowRight size={18} /></button>
          </form>
        </div>
      </section>
    )
  }

  if (!attempt?.startedAt) {
    return (
      <section className="exam-workspace exam-workspace--setup">
        <div className="exam-container exam-setup-card">
          <div>
            <p className="section-label">CEE v1.0</p>
            <h1>Ready when you are, {learner.fullName.split(' ')[0]}.</h1>
            <p className="exam-intro">Your learner profile is ready. Once you begin, progress is automatically saved on this device so you can return and continue.</p>
            <div className="exam-profile-confirmation">
              <UserRound size={20} />
              <div><strong>{learner.fullName}</strong><span>{learner.email}</span></div>
              <Link to="/learner">Edit profile</Link>
            </div>
          </div>
          <div className="exam-start-actions">
            <div className="integrity-note">
              <Flag size={20} />
              <p>Complete the assessment independently. Do not use generative AI or browse the web for the objective sections.</p>
            </div>
            <button className="button" type="button" onClick={beginExistingProfile}>Start exam <ArrowRight size={18} /></button>
            <Link className="text-link text-link--dark" to="/learner">Return to learner profile</Link>
          </div>
        </div>
      </section>
    )
  }

  if (attempt.completed) {
    const resultPlacement = attempt.placement || placement
    const resultObjectivePoints = attempt.objectivePoints ?? objectivePoints

    return (
      <section className="exam-workspace">
        <div className="exam-container result-layout">
          <div className="result-hero">
            <div className="result-check"><Check size={32} /></div>
            <p className="section-label">OBJECTIVE PROFILE COMPLETE</p>
            <h1>{resultPlacement.title}</h1>
            <p>{resultPlacement.detail}</p>
          </div>

          <div className="result-score-grid">
            <article><span>Objective score</span><strong>{resultObjectivePoints}<small>/70</small></strong><p>Applied responses account for the remaining 30 points.</p></article>
            <article><span>Communication</span><strong>{communication.percentage}%</strong><p>{communication.correct} of {communication.total} objective items correct.</p></article>
            <article><span>AI readiness</span><strong>{aiReadiness}%</strong><p>Combined AI foundations and research judgment.</p></article>
          </div>

          <div className="review-panel">
            <div>
              <h2>What happens next</h2>
              <p>The two applied responses are intentionally not auto-scored. In a future operational version, an evaluator will review those 30 points before issuing final placement. This frontend milestone records your submitted objective profile without pretending that human review already exists.</p>
            </div>
            <div className="review-status"><span>30 points</span><strong>Evaluator review not connected</strong></div>
          </div>

          <div className="result-actions result-actions--split">
            <Link className="button button--ghost" to="/learner">View learner record</Link>
            <button className="button" type="button" onClick={newAttempt}>Start another attempt <ArrowRight size={18} /></button>
          </div>
          <p className="mvp-note">Frontend-only milestone: this submitted attempt is stored in this browser and appears in your device-local learner history. It has not been transmitted to Cognita or reviewed by an evaluator.</p>
        </div>
      </section>
    )
  }

  const currentQuestions = currentStage.id === 'applied' ? [] : currentStage.questions
  const currentAnswered = currentQuestions.filter((question) => answers[question.id] !== undefined).length
  const canAdvance = stageIsComplete(currentStage)
  const remainingSeconds = examMeta.recommendedMinutes * 60 - elapsed

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
                      <textarea rows="9" value={applied[task.id] || ''} onChange={(event) => setAppliedResponse(task.id, event.target.value)} placeholder="Write your response in your own words…" />
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
              {!canAdvance ? <small>Complete this section to continue.</small> : null}
            </div>
            {stageIndex < stages.length - 1 ? (
              <button className="button" type="button" onClick={next} disabled={!canAdvance}>Next section <ArrowRight size={18} /></button>
            ) : (
              <button className="button" type="button" onClick={finish} disabled={!canAdvance || objectiveAnswered !== objectiveQuestions.length}>Submit exam <Check size={18} /></button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
