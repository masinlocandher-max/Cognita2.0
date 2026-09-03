import { QuestionType } from '../../lib/status.js'
import StatusPill from '../../components/StatusPill.jsx'

const TYPE_LABEL = {
  [QuestionType.SINGLE_CHOICE]: 'Single choice',
  [QuestionType.MULTIPLE_CHOICE]: 'Select all that apply',
  [QuestionType.TRUE_FALSE]: 'True or false',
  [QuestionType.SHORT_RESPONSE]: 'Short response',
  [QuestionType.ESSAY]: 'Written response',
  [QuestionType.SCENARIO_JUDGMENT]: 'Scenario judgment',
  [QuestionType.FILE_SUBMISSION]: 'File submission',
  [QuestionType.PROJECT_SUBMISSION]: 'Project submission',
  [QuestionType.HUMAN_REVIEWED_TASK]: 'Reviewed by an evaluator',
}

/** The frame every question type sits in, whatever the course. */
export default function QuestionCard({ question, index, children }) {
  return (
    <fieldset className="question-card">
      <legend>
        <span className="question-number tabular" aria-hidden="true">{index}</span>
        <span className="visually-hidden">Question {index}. </span>
        {question.prompt}
      </legend>

      <div className="question-meta">
        <span className="muted">{TYPE_LABEL[question.type] || 'Question'}</span>
        {question.points ? <span className="muted">· {question.points} points</span> : null}
        {question.optional ? <span className="muted">· optional</span> : null}
        {question.reviewedByHuman ? <StatusPill label="Human reviewed" tone="info" icon="UserCheck" /> : null}
      </div>

      {question.scenario ? <p className="question-scenario-inline">{question.scenario}</p> : null}
      {children}
    </fieldset>
  )
}
