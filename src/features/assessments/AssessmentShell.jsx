import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { QuestionType } from '../../lib/status.js'
import { getOrCreateAttempt, saveAssessmentAttempt, scoreAssessment } from '../../repositories/assessmentRepository.js'
import { AssessmentAttemptStatus } from '../../lib/status.js'
import QuestionCard from './QuestionCard.jsx'
import ChoiceQuestion from './ChoiceQuestion.jsx'
import WrittenResponse from './WrittenResponse.jsx'
import SubmissionPlaceholder from './SubmissionPlaceholder.jsx'
import AssessmentProgress from './AssessmentProgress.jsx'
import AssessmentResults from './AssessmentResults.jsx'
import Modal from '../../components/Modal.jsx'
import { LoadingRows } from '../../components/StateBlock.jsx'

const CHOICE_TYPES = new Set([
  QuestionType.SINGLE_CHOICE,
  QuestionType.MULTIPLE_CHOICE,
  QuestionType.TRUE_FALSE,
  QuestionType.SCENARIO_JUDGMENT,
])

const WRITTEN_TYPES = new Set([
  QuestionType.SHORT_RESPONSE,
  QuestionType.ESSAY,
  QuestionType.HUMAN_REVIEWED_TASK,
])

/**
 * One assessment runner for every course.
 *
 * Question types are resolved from the definition, so adding a course never
 * means writing bespoke assessment code.
 */
export default function AssessmentShell({ assessment, backTo }) {
  const [attempt, setAttempt] = useState(null)
  const [loading, setLoading] = useState(true)
  const [confirm, setConfirm] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)
    getOrCreateAttempt(assessment.id).then((record) => {
      if (active) { setAttempt(record); setLoading(false) }
    })
    return () => { active = false }
  }, [assessment.id])

  const responses = attempt?.responses || {}

  const answered = useMemo(
    () => assessment.questions.filter((question) => {
      const value = responses[question.id]
      return Array.isArray(value) ? value.length > 0 : String(value || '').trim().length > 0
    }).length,
    [assessment.questions, responses],
  )

  const requiredOutstanding = assessment.questions.filter((question) => {
    if (question.optional) return false
    const value = responses[question.id]
    if (Array.isArray(value)) return value.length === 0
    const text = String(value || '').trim()
    if (WRITTEN_TYPES.has(question.type)) return text.length < (question.minLength || 1)
    return text.length === 0
  })

  const update = async (questionId, value) => {
    const next = { ...attempt, responses: { ...responses, [questionId]: value } }
    setAttempt(next)
    await saveAssessmentAttempt(next)
  }

  const submit = async () => {
    const result = scoreAssessment(assessment, responses)
    const next = {
      ...attempt,
      status: result.status,
      submittedAt: new Date().toISOString(),
      result,
    }
    setAttempt(next)
    await saveAssessmentAttempt(next)
    setConfirm(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  if (loading) return <LoadingRows rows={4} height={110} />

  if (attempt?.status !== AssessmentAttemptStatus.IN_PROGRESS && attempt?.result) {
    return <AssessmentResults assessment={assessment} result={attempt.result} backTo={backTo} />
  }

  return (
    <div className="stack-6">
      <AssessmentProgress
        title={assessment.title}
        answered={answered}
        total={assessment.questions.length}
        minutes={assessment.estimatedMinutes}
      />

      <p className="muted reading">{assessment.summary}</p>

      <div className="question-list">
        {assessment.questions.map((question, index) => (
          <QuestionCard key={question.id} question={question} index={index + 1}>
            {CHOICE_TYPES.has(question.type) ? (
              <ChoiceQuestion question={question} value={responses[question.id]} onChange={(value) => update(question.id, value)} />
            ) : WRITTEN_TYPES.has(question.type) ? (
              <WrittenResponse question={question} value={responses[question.id] || ''} onChange={(value) => update(question.id, value)} />
            ) : (
              <SubmissionPlaceholder question={question} value={responses[question.id] || ''} onChange={(value) => update(question.id, value)} />
            )}
          </QuestionCard>
        ))}
      </div>

      <div className="exam-nav">
        <Link className="btn btn--secondary" to={backTo}><ArrowLeft size={16} /> Back to module</Link>
        <p className="exam-nav-status" role="status">
          {answered} of {assessment.questions.length} answered
          {requiredOutstanding.length ? <small>{requiredOutstanding.length} required {requiredOutstanding.length === 1 ? 'question needs' : 'questions need'} an answer.</small> : null}
        </p>
        <button className="btn" type="button" disabled={requiredOutstanding.length > 0} onClick={() => setConfirm(true)}>
          Submit assessment <Check size={16} />
        </button>
      </div>

      <Modal
        open={confirm}
        onClose={() => setConfirm(false)}
        title="Submit this assessment?"
        description="Objective items are scored immediately. Written work is held for evaluator review."
        actions={(
          <>
            <button className="btn btn--secondary" type="button" onClick={() => setConfirm(false)}>Keep working</button>
            <button className="btn" type="button" onClick={submit}>Submit</button>
          </>
        )}
      />
    </div>
  )
}
