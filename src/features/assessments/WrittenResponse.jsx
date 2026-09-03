/**
 * Short responses, essays and human-reviewed tasks.
 *
 * The minimum length is a completeness check, not a quality judgment, and the
 * hint says so — nothing here implies that longer is better.
 */
export default function WrittenResponse({ question, value = '', onChange, disabled = false }) {
  const length = value.trim().length
  const minimum = question.minLength || 0
  const met = length >= minimum

  return (
    <div className="field">
      <label htmlFor={`response-${question.id}`} className="visually-hidden">Your response</label>
      <textarea
        id={`response-${question.id}`}
        className="textarea"
        value={value}
        disabled={disabled}
        placeholder={question.placeholder || 'Write your response…'}
        aria-describedby={`response-${question.id}-hint`}
        onChange={(event) => onChange(event.target.value)}
      />
      <p className="field-hint" id={`response-${question.id}-hint`}>
        {question.rubricSummary ? <><strong>Assessed on:</strong> {question.rubricSummary}. </> : null}
        {minimum
          ? met
            ? 'Response captured. There is no advantage to unnecessary length.'
            : `Write a developed response — at least ${minimum} characters (${length} so far).`
          : `${length} characters.`}
      </p>
    </div>
  )
}
