import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../../hooks/useRobots.js'

export default function NotFound() {
  useDocumentTitle('Page not found')

  return (
    <section className="section section--paper">
      <div className="page-width" style={{ maxWidth: '54ch' }}>
        <p className="eyebrow">404</p>
        <h1>That page does not exist.</h1>
        <p className="lead" style={{ marginTop: 'var(--s-4)' }}>
          The link may be out of date, or the page may have moved during this build.
        </p>
        <div className="wrap-actions" style={{ marginTop: 'var(--s-6)' }}>
          <Link className="btn" to="/">Back to the institute</Link>
          <Link className="btn btn--secondary" to="/app">Student journey</Link>
        </div>
      </div>
    </section>
  )
}
