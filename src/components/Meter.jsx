/** Accessible progress meter. The numeric value is always present as text. */
export default function Meter({ value, max = 100, label, valueText, tone = 'accent', id }) {
  const safeMax = max || 1
  const percentage = Math.max(0, Math.min(100, Math.round((value / safeMax) * 100)))

  return (
    <div className="meter">
      {label ? (
        <div className="meter-label">
          <span>{label}</span>
          <span>{valueText ?? `${percentage}%`}</span>
        </div>
      ) : null}
      <div
        className="meter-track"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progress'}
        id={id}
      >
        <span className={`meter-fill${tone === 'positive' ? ' meter-fill--positive' : ''}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
