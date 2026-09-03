import Meter from '../../components/Meter.jsx'

export default function AssessmentProgress({ answered, total, title, minutes }) {
  return (
    <div className="assessment-progress">
      <div>
        <p className="eyebrow">Assessment</p>
        <h1>{title}</h1>
      </div>
      <div className="assessment-progress-meter">
        <Meter value={answered} max={total} label="Questions answered" valueText={`${answered}/${total}`} />
        {minutes ? <p className="muted" style={{ fontSize: 'var(--text-xs)' }}>~{minutes} minutes</p> : null}
      </div>
    </div>
  )
}
