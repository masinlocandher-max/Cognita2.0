import { Paperclip } from 'lucide-react'

/**
 * File and project submissions.
 *
 * File storage does not exist in this build. Rather than showing an upload
 * control that discards the file, the question states the limit and accepts a
 * link or a note instead — the honest version of the same step.
 */
export default function SubmissionPlaceholder({ question, value = '', onChange, disabled = false }) {
  return (
    <div className="submission-placeholder">
      <div className="alert alert--attention">
        <Paperclip size={16} aria-hidden="true" />
        <div>
          <strong>File upload is not connected</strong>
          {question.accepts ? `This step will accept ${question.accepts}. ` : ''}
          Until storage exists, add a link or a short note instead — nothing is uploaded anywhere.
        </div>
      </div>
      <div className="field">
        <label htmlFor={`submission-${question.id}`}>Link or note</label>
        <input
          id={`submission-${question.id}`}
          className="input"
          value={value}
          disabled={disabled}
          placeholder="https://… or a short note"
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  )
}
