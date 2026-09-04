import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../../hooks/useRobots.js'

export default function NotFound() {
  useDocumentTitle('Page not found')

  return (
    <section className="inst-section inst-section--paper">
      <div className="page-width" style={{ maxWidth: '58ch' }}>
        <p className="inst-eyebrow" style={{ color: 'var(--brand-violet-600)' }}>404</p>
        <h1 style={{ fontSize: 'var(--display-md)' }}>That page does not exist.</h1>
        <p className="lead" style={{ marginTop: 'var(--s-5)' }}>
          The link may be out of date, or the page may have moved. The sections below cover most of what
          people are looking for.
        </p>
        <div className="wrap-actions" style={{ marginTop: 'var(--s-7)' }}>
          <Link className="btn" to="/programs">Explore Programs</Link>
          <Link className="btn btn--secondary" to="/admissions">Admissions</Link>
          <Link className="btn btn--ghost" to="/">Institute home</Link>
        </div>
      </div>
    </section>
  )
}
