import { QuestionType } from '../../lib/status.js'

const TRUE_FALSE_OPTIONS = [
  { id: 'true', label: 'True' },
  { id: 'false', label: 'False' },
]

/**
 * Single choice, multiple choice, true/false and scenario judgment share one
 * control. Multiple choice uses checkboxes and says so in its instruction, so
 * a learner is never guessing how many answers are expected.
 */
export default function ChoiceQuestion({ question, value, onChange, disabled = false, revealed = null }) {
  const multiple = question.type === QuestionType.MULTIPLE_CHOICE
  const options = question.type === QuestionType.TRUE_FALSE ? TRUE_FALSE_OPTIONS : question.options || []
  const selected = [].concat(value || [])

  const toggle = (optionId) => {
    if (disabled) return
    if (!multiple) { onChange([optionId]); return }
    onChange(selected.includes(optionId) ? selected.filter((id) => id !== optionId) : [...selected, optionId])
  }

  return (
    <>
      {multiple ? <p className="field-hint" style={{ marginBottom: 'var(--s-2)' }}>Select all that apply.</p> : null}
      <div className="choice-list">
        {options.map((option, index) => {
          const isSelected = selected.includes(option.id)
          const isCorrect = revealed ? (question.correct || []).includes(option.id) : null

          return (
            <label
              key={option.id}
              className={`choice${isSelected ? ' is-selected' : ''}${revealed && isCorrect ? ' is-correct' : ''}${revealed && isSelected && !isCorrect ? ' is-incorrect' : ''}`}
            >
              <input
                type={multiple ? 'checkbox' : 'radio'}
                name={`question-${question.id}`}
                checked={isSelected}
                disabled={disabled}
                onChange={() => toggle(option.id)}
              />
              <span className="choice-key" aria-hidden="true">{String.fromCharCode(65 + index)}</span>
              <span>{option.label}</span>
            </label>
          )
        })}
      </div>
    </>
  )
}
