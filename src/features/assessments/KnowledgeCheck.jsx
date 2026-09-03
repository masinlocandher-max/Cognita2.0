import { useState } from 'react'
import { CircleCheck, CircleHelp, RotateCcw } from 'lucide-react'
import { QuestionType } from '../../lib/status.js'
import { findKnowledgeCheck } from '../../mock/assessments.js'
import ChoiceQuestion from './ChoiceQuestion.jsx'

/**
 * The inline check inside a lesson. Formative: it explains rather than scores,
 * and a wrong answer can be retried without penalty.
 */
export default function KnowledgeCheck({ questionId, saved, onAnswer }) {
  const question = findKnowledgeCheck(questionId)
  const [value, setValue] = useState(saved?.response || [])
  const [checked, setChecked] = useState(Boolean(saved))

  if (!question) return null

  const expected = [...(question.correct || [])].sort()
  const given = [...value].sort()
  const correct = given.length === expected.length && given.every((item, index) => item === expected[index])
  const multiple = question.type === QuestionType.MULTIPLE_CHOICE

  return (
    <aside className="knowledge-check" aria-label="Knowledge check">
      <p className="eyebrow"><CircleHelp size={13} aria-hidden="true" style={{ verticalAlign: '-2px', marginRight: 5 }} /> Knowledge check</p>
      <p className="knowledge-check-prompt">{question.prompt}</p>

      <ChoiceQuestion question={question} value={value} onChange={setValue} disabled={checked} revealed={checked} />

      {!checked ? (
        <button
          className="btn btn--sm"
          type="button"
          disabled={!value.length}
          onClick={() => { setChecked(true); onAnswer?.(questionId, value, correct) }}
        >
          Check answer
        </button>
      ) : (
        <div className={`knowledge-feedback${correct ? ' is-correct' : ''}`} role="status">
          <p>
            {correct ? <CircleCheck size={15} aria-hidden="true" /> : null}
            <strong>{correct ? 'Correct.' : multiple ? 'Not quite — the highlighted options are the expected ones.' : 'Not quite — the highlighted option is the expected one.'}</strong>
          </p>
          <p>{question.explanation}</p>
          <button className="btn btn--ghost btn--sm" type="button" onClick={() => { setChecked(false); setValue([]) }}>
            <RotateCcw size={14} /> Try again
          </button>
        </div>
      )}
    </aside>
  )
}
