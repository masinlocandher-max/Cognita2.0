import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Clock3, Flag, RotateCcw } from 'lucide-react'
import { appliedTasks, examMeta, examSections } from '../data/exam'

const storageKey = 'cognita-cee-v1-progress'

function getSavedProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null')
    return saved || {}
  } catch {
    return {}
  }
}

function formatTime(seconds) {
  const safe = Math.max(0, seconds)
  const minutes = Math.floor(safe / 60)
  const secs = safe % 60
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export default function Exam() {
  const saved = useMemo(() => getSavedProgress(), [])
  const [candidate, setCandidate] = useState(saved.candidate || { name: '', email: '' })
  const [answers, setAnswers] = useState(saved.answers || {})
  const [applied, setApplied] = useState(saved.applied || {})
  const [startedAt, setStartedAt] = useState(saved.startedAt || null)
  const [stageIndex, setStageIndex] = useState(saved.stageIndex || 0)
  const [completed, setCompleted] = useState(saved.completed || false)
  const [elapsed, setElapsed] = useState(0)

  const stages = [...examSections, { id: 'applied', title: 'Applied Response', subtitle: 'Independent written tasks' }]
  const currentStage = stages[stageIndex]

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ candidate, answers, applied, startedAt, stageIndex, completed }))
  }, [candidate, answers, applied, startedAt, stageIndex, completed])

  useEffect(() => {
    if (!startedAt || completed) return
    const tick = () => setElapsed(Math.floor((Date.now() - startedAt) / 1000))
    tick()
    const timer = window.setInterval(tick, 1000)
    return () => window.clearInterval(timer)
  }, [startedAt, completed])

  const objectiveQuestions = examSections.flatMap((section) => section.questions)
  const objectiveAnswered = objectiveQuestions.filter((question) => answers[question.id] !== undefined).length
  const appliedAnswered = appliedTasks.filter((task) => (applied[task.id] || '').trim().length >= 40).length
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
    if (communicationScore >= 80 && aiScore >= 80) return { title: 'AI-01 readiness indicated', detail: 'Your objective results indicate readiness to move beyond the foundation level. Applied responses still require review before final placement.' }
    if (communicationScore < 70 && aiScore >= 80) return { title: 'AI-00 Communication Readiness indicated', detail: 'Your AI foundation appears stronger than your current communication-readiness score. Communication support is the likely starting point.' }
    if (communicationScore >= 80 && aiScore < 70) return { title: 'AI-00 AI Foundations indicated', detail: 'Your communication readiness appears strong. AI foundations are the likely area to strengthen before progression.' }
    if (communicationScore < 70 && aiScore < 70) return { title: 'Full AI-00 indicated', detail: 'Your objective profile indicates that both AI foundations and communication readiness should be strengthened first.' }
    return { title: 'Targeted bridge + review indicated', detail: 'One or more readiness areas are near the progression threshold. Applied responses should be reviewed before final placement.' }
  }, [communication.percentage, aiReadiness])

  const begin = (event) => {
    event.preventDefault()
    if (!candidate.name.trim() || !candidate.email.trim()) return
    setStartedAt(Date.now())
  }

  const choose = (questionId, optionIndex) => {
    setAnswers((previous) => ({ ...previous, [questionId]: optionIndex }))
  }

  const next = () => {
    setStageIndex((index) => Math.min(index + 1, stages.length - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const previous = () => {
    setStageIndex((index) => Math.max(index - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const finish = () => {
    if (objectiveAnswered !== objectiveQuestions.length || appliedAnswered !== appliedTasks.length) return
    setCompleted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const reset = () => {
    if (!window.confirm('Clear this exam attempt and start again?')) return
    localStorage.removeItem(storageKey)
    setCandidate({ name: '', email: '' })
    setAnswers({})
    setApplied({})
    setStartedAt(null)
    setStageIndex(0)
    setCompleted(false)
    setElapsed(0)
  }

  if (!startedAt) {
    return (
      <section className="exam-workspace exam-workspace--setup">
        <div className="exam-container exam-setup-card">
          <div>
            <p className="section-label">CEE v1.0</p>
            <h1>Cognita Entrance Exam</h1>
            <p className="exam-intro">Complete the assessment independently. Your result is used to identify the most appropriate starting point in the Cognita learning journey.</p>
          </div>
          <form className="candidate-form" onSubmit={begin}>
            <label>
              Full name
              <input value={candidate.name} onChange={(event) => setCandidate({ ...candidate, name: event.target.value })} autoComplete="name" required />
            </label>
            <label>
              Email address
              <input type="email" value={candidate.email} onChange={(event) => setCandidate({ ...candidate, email: event.target.value })} autoComplete="email" required />
            </label>
            <div className="integrity-note">
              <Flag size={20} />
              <p>By starting, you confirm that you will answer without generative AI assistance and that the written responses are your own.</p>
            </div>
            <button className="button" type="submit">Start exam <ArrowRight size={18} /></button>
          </form>
        </div>
      </section>
    )
  }

  if (completed) {
    return (
      <section className="exam-workspace">
        <div className="exam-container result-layout">
          <div className="result-hero">
            <div className="result-check"><Check size={32} /></div>
            <p className="section-label">OBJECTIVE PROFILE COMPLETE</p>
            <h1>{placement.title}</h1>
            <p>{placement.detail}</p>
          </div>

          <div className="result-score-grid">
            <article><span>Objective score</span><strong>{objectivePoints}<small>/70</small></strong><p>Applied responses account for the remaining 30 points.</p></article>
            <article><span>Communication</span><strong>{communication.percentage}%</strong><p>{communication.correct} of {communication.total} objective items correct.</p></article>
            <article><span>AI readiness</span><strong>{aiReadiness}%</strong><p>Combined AI foundations and research judgment.</p></article>
          </div>

          <div className="review-panel">
            <div>
              <h2>What happens next</h2>
              <p>The two applied responses require evaluator review before a final placement decision and full 100-point score are issued. This prevents open-ended judgment from being reduced to unreliable automatic scoring.</p>
            </div>
            <div className="review-status"><span>30 points</span><strong>Pending applied review</strong></div>
          </div>

          <div className="result-actions">
            <button className="button button--ghost" type="button" onClick={reset}><RotateCcw size={18} /> Clear local attempt</button>
          </div>
          <p className="mvp-note">MVP note: this build stores the exam attempt locally in the browser only. Server submission and evaluator workflow have not been connected yet.</p>
        </div>
      </section>
    )
  }

  const currentQuestions = currentStage.id === 'applied' ? [] : currentStage.questions
  const currentAnswered = currentQuestions.filter((question) => answers[question.id] !== undefined).length
  const canAdvance = currentStage.id === 'applied' ? appliedAnswered === appliedTasks.length : currentAnswered === currentQuestions.length
  const remainingSeconds = examMeta.recommendedMinutes * 60 - elapsed

  return (
    <section className="exam-workspace">
      <div className="exam-topbar">
        <div className="exam-container exam-topbar-inner">
          <div>
            <strong>{examMeta.version}</strong>
            <span>{candidate.name}</span>
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
            <button key={stage.id} className={index === stageIndex ? 'is-active' : ''} onClick={() => setStageIndex(index)}>
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
                      <textarea rows="9" value={applied[task.id] || ''} onChange={(event) => setApplied((previous) => ({ ...previous, [task.id]: event.target.value }))} placeholder="Write your response in your own words…" />
                    </label>
                    <small>{(applied[task.id] || '').trim().length < 40 ? 'Write at least a short developed response before submitting.' : 'Response captured.'}</small>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="exam-navigation">
            <button className="button button--ghost" type="button" onClick={previous} disabled={stageIndex === 0}><ArrowLeft size={18} /> Previous</button>
            <div className="exam-navigation-status">
              {currentStage.id !== 'applied' && <span>{currentAnswered} of {currentQuestions.length} answered</span>}
              {!canAdvance && <small>Complete this section to continue.</small>}
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
