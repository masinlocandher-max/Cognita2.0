import { Link } from 'react-router-dom'

export default function BrandMark({ to = '/', variant = 'dark', compact = false }) {
  const content = (
    <span className={`brand brand--${variant}`}>
      <span className="brand-glyph" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="30" height="30" role="presentation">
          <rect width="32" height="32" rx="9" fill="currentColor" />
          <path d="M22.5 11.4a7.4 7.4 0 1 0 0 9.2" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="23.4" cy="16" r="2.5" fill="#7d78ea" />
        </svg>
      </span>
      <span className="brand-words">
        <strong>COGNITA</strong>
        {!compact ? <span>Institute of Artificial Intelligence</span> : null}
      </span>
    </span>
  )

  return to ? <Link to={to} className="brand-link" aria-label="Cognita Institute of Artificial Intelligence — home">{content}</Link> : content
}
