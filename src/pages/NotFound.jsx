import { Link } from 'react-router-dom'

/**
 * 404.
 *
 * A missing page is a navigation failure, so this one does the navigating:
 * it names the public surfaces rather than leaving the reader at a dead end.
 */
export default function NotFound() {
  return (
    <section className="ed-section ed-section--white">
      <div className="page-width ed-grid">
        <div className="ed-c1-7">
          <p className="ed-label">Error 404</p>
          <h1 className="ed-doc-title" style={{ marginBlockStart: 'var(--s-4)' }}>
            That page does not exist.
          </h1>
          <p className="ed-body" style={{ marginBlockStart: 'var(--s-5)', maxWidth: '46ch' }}>
            The link may be out of date, or the page may have moved. Some Cognita surfaces are also reached
            only through admission — the entrance examination, program selection, enrollment, and the student
            application are not open pages.
          </p>
        </div>
        <nav className="ed-c8-5" aria-label="Public pages">
          <ul className="ed-conditions" style={{ marginBlockStart: 0 }}>
            <li><Link className="text-link" to="/">Homepage</Link></li>
            <li><Link className="text-link" to="/programs">Programs</Link></li>
            <li><Link className="text-link" to="/apply">Apply</Link></li>
            <li><Link className="text-link" to="/faq">Frequently asked questions</Link></li>
            <li><Link className="text-link" to="/policies">Institutional status</Link></li>
            <li><Link className="text-link" to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </section>
  )
}
