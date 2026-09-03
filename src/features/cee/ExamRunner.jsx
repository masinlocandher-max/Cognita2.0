import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Clock3, Flag } from 'lucide-react'
import { appliedSection, appliedTasks, candidateInstructions, examMeta, examSections } from './questionnaire.js'
import { scoreObjective } from './scoring.js'
import { createAttempt, saveAttempt } from '../../repositories/ceeRepository.js'
import { formatClock } from '../../lib/format.js'
import Modal from '../../components/Modal.jsx'
import Alert from '../../components/Alert.jsx'
import Meter from '../../components/Meter.jsx'

const MIN_APPLIED_CHARACTERS = 80

/**
 * The Cognita Entrance Exam runner.
 *
 * Autosaves every change, resumes an interrupted attempt, gates sections
 * sequentially, and never reveals correctness, the rubric, or the placement
 * thresholds before submission — a candidate who can see the key is not being
 * placed, they are being asked to copy.
 */
export default function ExamRunner({ learner, attempt, supersededCount, onChange }) {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(attempt)
  const [elapsed, setElapsed] = useState(0)
  const [acknowledged, setAcknowledged] = useState(Boolean(attempt?.acknowledgedIntegrity))
  const [confirmSubmit, setConfirmSubmit] = useState(false)
  const [showIncomplete, setShowIncomplete] = useState(false)
  const contentRef = useRef(null)

  useEffect(() => { setCurrent(attempt) }, [attempt?.id])

  const answers = current?.answers || {}
  const applied = current?.applied || {}
  const stages = useMemo(() => [...examSections, appliedSection], [])
  const stageIndex = current?.stageIndex || 0
  const stage = stages[stageIndex]

  const scenarioByLeadQuestion = useMemo(() => {
    const map = {}
    examSections.forEach((section) => {
      (section.scenarios || []).forEach((scenario) => { map[scenario.appliesTo[0]] = scenario })
    })
    return map
  }, [])

  useEffect(() => {
    if (!current?.startedAt || current.completed) return undefined
    const tick = () => setElapsed(Math.floor((Date.now() - current.startedAt) / 1000))
    tick()
    const timer = window.setInterval(tick, 1000)
    return () => window.clearInterval(timer)
  }, [current?.startedAt, current?.completed])

  const objectiveQuestions = useMemo(() => examSections.flatMap((section) => section.questions), [])
  const objectiveAnswered = objectiveQuestions.filter((question) => answers[question.id] !== undefined).length
  const appliedReady = appliedTasks.filter((task) => (applied[task.id] || '').trim().length >= MIN_APPLIED_CHARACTERS).length
  const totalItems = objectiveQuestions.length + appliedTasks.length
  const progress = Math.round(((objectiveAnswered + appliedReady) / totalItems) * 100)

  const result = useMemo(() => scoreObjective(examSections, answers), [answers])

  const persist = async (changes) => {
    const next = { ...current, ...changes }
    setCurrent(next)
    await saveAttempt(next)
    onChange?.()
  }

  const stageComplete = (candidate) => {
    if (candidate.id === 'applied') return appliedReady === appliedTasks.length
    return candidate.questions.every((question) => answers[question.id] !== undefined)
  }

  const maxReachable = (() => {
    const firstIncomplete = stages.findIndex((candidate) => !stageComplete(candidate))
    return firstIncomplete === -1 ? stages.length - 1 : firstIncomplete
  })()

  const focusContent = () => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    contentRef.current?.focus()
  }

  const begin = async () => {
    const record = current || await createAttempt(learner)
    await persist({ ...record, startedAt: Date.now(), acknowledgedIntegrity: true })
  }

  const submit = async () => {
    const submitted = {
      ...current,
      completed: true,
      submittedAt: new Date().toISOString(),
      objectivePoints: result.objectivePoints,
      scores: {
        communication: result.communication,
        aiFoundations: result.ai,
        research: result.research,
        aiReadiness: result.aiReadiness,
        aiReadinessWeighted: result.aiReadinessWeighted,
        aiReadinessByItem: result.aiReadinessByItem,
      },
      placement: result.placement,
      durationSeconds: elapsed,
    }
    await persist(submitted)
    setConfirmSubmit(false)
    navigate('/app/results')
  }

  /* ---------------------------------------------------------------- Intro */
  if (!current?.startedAt) {
    return (
      <div className="stack-6">
        <div className="page-head">
          <p className="eyebrow">{examMeta.version}</p>
          <h1>Cognita Entrance Exam</h1>
          <p>
            {examMeta.recommendedMinutes} minutes recommended · {examMeta.objectiveItems} objective items · 2 applied tasks.
            Your progress saves as you go, so you can stop and resume on this device.
          </p>
        </div>

        {supersededCount ? (
          <Alert tone="attention" title="An earlier attempt cannot be resumed">
            You have {supersededCount === 1 ? 'an unfinished attempt' : `${supersededCount} unfinished attempts`} from a
            previous version of the questionnaire. Those answers point at questions the current exam no longer contains,
            so they stay in your history rather than being resumed. This will be a new attempt.
          </Alert>
        ) : null}

        <div className="card">
          <p className="card-title">Before you begin</p>
          <ul className="clean-list" style={{ marginTop: 'var(--s-4)' }}>
            {candidateInstructions.map((instruction) => <li key={instruction}>{instruction}</li>)}
          </ul>
        </div>

        <div className="card card--accent">
          <label className="integrity-check">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(event) => setAcknowledged(event.target.checked)}
            />
            <span>
              <strong>I will complete this assessment independently.</strong>
              I will not use a generative AI assistant, search engine, translator, or another person to produce my
              answers, and the written responses will be my own.
            </span>
          </label>
        </div>

        <div className="wrap-actions">
          <button className="btn btn--lg" type="button" disabled={!acknowledged} onClick={begin}>
            {current ? 'Resume exam' : 'Start exam'} <ArrowRight size={17} />
          </button>
          <Link className="btn btn--secondary btn--lg" to="/app">Back to dashboard</Link>
        </div>
        {!acknowledged ? <p className="field-hint">Confirm the acknowledgment above to begin.</p> : null}
      </div>
    )
  }

  /* --------------------------------------------------------------- Running */
  const remaining = examMeta.recommendedMinutes * 60 - elapsed
  const overtime = remaining < 0

  return (
    <div className="exam-runner">
      <div className="exam-status" role="region" aria-label="Exam progress">
        <div>
          <strong>{examMeta.version}</strong>
          <span className="muted">{current.candidate?.name}</span>
        </div>
        <Meter value={progress} max={100} label="Overall progress" valueText={`${progress}%`} />
        <p className={`exam-timer${overtime ? ' is-over' : remaining <= 600 ? ' is-low' : ''}`}>
          <Clock3 size={15} aria-hidden="true" />
          <span className="tabular">{formatClock(Math.abs(remaining))}</span>
          <small>{overtime ? 'over recommended time' : 'remaining (recommended)'}</small>
        </p>
      </div>

      {overtime ? (
        <Alert tone="attention" title="Past the recommended time">
          The {examMeta.recommendedMinutes}-minute figure is guidance, not a cut-off. Nothing has been submitted and
          nothing is locked — finish at your own pace.
        </Alert>
      ) : null}

      <div className="exam-layout">
        <nav className="exam-sections" aria-label="Exam sections">
          {stages.map((item, index) => {
            const done = stageComplete(item)
            const reachable = index <= maxReachable
            return (
              <button
                key={item.id}
                type="button"
                className={index === stageIndex ? 'is-active' : done ? 'is-done' : undefined}
                aria-current={index === stageIndex ? 'step' : undefined}
                disabled={!reachable}
                onClick={() => { persist({ stageIndex: index }); focusContent() }}
              >
                <span className="exam-section-index" aria-hidden="true">{done ? <Check size={12} /> : index + 1}</span>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.id === 'applied' ? `${appliedTasks.length} written tasks` : `${item.questions.length} questions`}</small>
                </span>
              </button>
            )
          })}
        </nav>

        <div className="exam-content" ref={contentRef} tabIndex={-1}>
          <header className="exam-section-head">
            <p className="eyebrow">Section {stageIndex + 1} of {stages.length}</p>
            <h1>{stage.title}</h1>
            <p>{stage.intro || stage.subtitle}</p>
          </header>

          {stage.id !== 'applied' ? (
            <div className="question-list">
              {stage.questions.map((question) => {
                const scenario = scenarioByLeadQuestion[question.id]
                return (
                  <Fragment key={question.id}>
                    {scenario ? (
                      <aside className="question-scenario">
                        <p className="eyebrow">{scenario.label}</p>
                        {scenario.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      </aside>
                    ) : null}

                    <fieldset className="question-card">
                      <legend>
                        <span className="question-number tabular" aria-hidden="true">{question.id}</span>
                        <span className="visually-hidden">Question {question.id}. </span>
                        {question.prompt}
                      </legend>
                      <div className="choice-list">
                        {question.options.map((option, index) => (
                          <label className={`choice${answers[question.id] === index ? ' is-selected' : ''}`} key={option}>
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              checked={answers[question.id] === index}
                              onChange={() => persist({ answers: { ...answers, [question.id]: index } })}
                            />
                            <span className="choice-key" aria-hidden="true">{String.fromCharCode(65 + index)}</span>
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </Fragment>
                )
              })}
            </div>
          ) : (
            <div className="applied-list">
              {appliedTasks.map((task) => {
                const length = (applied[task.id] || '').trim().length
                return (
                  <article className="applied-card" key={task.id}>
                    <header>
                      <p className="eyebrow">Task {task.number} · {task.points} points</p>
                      <h2>{task.title}</h2>
                    </header>
                    <p className="applied-scenario">{task.scenario}</p>
                    <p className="applied-prompt">{task.prompt}</p>
                    <div className="applied-guidance">
                      <p>{task.guidance}</p>
                      <ul>{task.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
                      <p className="applied-note">{task.note}</p>
                    </div>
                    <div className="field">
                      <label htmlFor={`applied-${task.id}`}>Your response</label>
                      <textarea
                        id={`applied-${task.id}`}
                        className="textarea"
                        value={applied[task.id] || ''}
                        placeholder="Write your response in your own words…"
                        aria-describedby={`applied-${task.id}-hint`}
                        onChange={(event) => persist({ applied: { ...applied, [task.id]: event.target.value } })}
                      />
                      <p className="field-hint" id={`applied-${task.id}-hint`}>
                        {length < MIN_APPLIED_CHARACTERS
                          ? `Write a developed response — at least ${MIN_APPLIED_CHARACTERS} characters (${length} so far).`
                          : 'Response captured. There is no advantage to unnecessary length.'}
                      </p>
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          <div className="exam-nav">
            <button
              className="btn btn--secondary"
              type="button"
              disabled={stageIndex === 0}
              onClick={() => { persist({ stageIndex: Math.max(0, stageIndex - 1) }); focusContent() }}
            >
              <ArrowLeft size={16} /> Previous
            </button>

            <p className="exam-nav-status" role="status">
              {stage.id === 'applied'
                ? `${appliedReady} of ${appliedTasks.length} responses ready`
                : `${stage.questions.filter((question) => answers[question.id] !== undefined).length} of ${stage.questions.length} answered`}
              {!stageComplete(stage) ? <small>Complete this section to continue.</small> : null}
            </p>

            {stageIndex < stages.length - 1 ? (
              <button
                className="btn"
                type="button"
                disabled={!stageComplete(stage)}
                onClick={() => { persist({ stageIndex: stageIndex + 1 }); focusContent() }}
              >
                Next section <ArrowRight size={16} />
              </button>
            ) : (
              <button
                className="btn"
                type="button"
                onClick={() => {
                  if (objectiveAnswered !== objectiveQuestions.length || appliedReady !== appliedTasks.length) {
                    setShowIncomplete(true)
                    return
                  }
                  setConfirmSubmit(true)
                }}
              >
                Submit exam <Check size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={confirmSubmit}
        onClose={() => setConfirmSubmit(false)}
        title="Submit your entrance exam?"
        description="Once submitted, this attempt is final. You can sit the exam again later — previous attempts are kept, not overwritten."
        actions={(
          <>
            <button className="btn btn--secondary" type="button" onClick={() => setConfirmSubmit(false)}>Keep working</button>
            <button className="btn" type="button" onClick={submit}>Submit exam</button>
          </>
        )}
      >
        <ul className="clean-list">
          <li>{objectiveAnswered} of {objectiveQuestions.length} objective items answered.</li>
          <li>Both applied responses written.</li>
          <li>The 70 objective points are scored immediately. The 30 applied points require a person.</li>
        </ul>
      </Modal>

      <Modal
        open={showIncomplete}
        onClose={() => setShowIncomplete(false)}
        title="Not everything is answered yet"
        actions={<button className="btn" type="button" onClick={() => setShowIncomplete(false)}>Back to the exam</button>}
      >
        <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>
          {objectiveQuestions.length - objectiveAnswered} objective {objectiveQuestions.length - objectiveAnswered === 1 ? 'item is' : 'items are'} unanswered
          and {appliedTasks.length - appliedReady} of {appliedTasks.length} written responses need more content.
        </p>
      </Modal>

      <p className="exam-integrity-footer">
        <Flag size={14} aria-hidden="true" />
        You confirmed you would complete this assessment independently.
      </p>
    </div>
  )
}
