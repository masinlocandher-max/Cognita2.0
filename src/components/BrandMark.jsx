export default function BrandMark({ compact = false }) {
  return (
    <div className={`brand-lockup ${compact ? 'brand-lockup--compact' : ''}`} aria-label="Cognita Institute of Artificial Intelligence">
      <svg className="brand-mark" viewBox="0 0 120 120" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="cognitaGlow" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#eef2ff" />
            <stop offset="100%" stopColor="#b7c2ff" />
          </linearGradient>
          <linearGradient id="cognitaCyan" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#35f2ff" />
            <stop offset="100%" stopColor="#00b8ff" />
          </linearGradient>
        </defs>
        <circle cx="52" cy="60" r="37" fill="none" stroke="url(#cognitaGlow)" strokeWidth="22" strokeDasharray="180 60" transform="rotate(43 52 60)" />
        <path d="M68 61h20c10 0 17 7 17 17v12c0 10-7 17-17 17H68V61Z" fill="url(#cognitaGlow)" />
        <circle cx="83" cy="32" r="15" fill="url(#cognitaCyan)" />
      </svg>
      <div className="brand-wording">
        <strong>COGNITA</strong>
        {!compact && <span>Institute of Artificial Intelligence</span>}
      </div>
    </div>
  )
}
