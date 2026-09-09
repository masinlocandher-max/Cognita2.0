import { Link } from 'react-router-dom'
import { useReveal } from '../lib/useReveal'

/**
 * Shared layout for the institutional document pages — policies, privacy,
 * terms, FAQ, contact.
 *
 * These pages carry a different reading job from the marketing surfaces: they
 * are consulted, not browsed. So the composition inverts — a narrow measure, a
 * standing contents rail, and ruled sections instead of any card treatment.
 * One layout for all of them keeps the set coherent as it grows.
 */
export default function DocPage({ eyebrow, title, summary, updated, sections, footer }) {
  useReveal()

  return (
    <>
      <header className="ed-doc-head">
        <div className="page-width">
          <p className="ed-label">{eyebrow}</p>
          <h1 className="ed-doc-title">{title}</h1>
          {summary ? <p className="ed-doc-summary">{summary}</p> : null}
          {updated ? <p className="ed-doc-meta">{updated}</p> : null}
        </div>
      </header>

      <div className="ed-section ed-section--white">
        <div className="page-width ed-grid">
          <nav className="ed-c1-3 ed-doc-rail" aria-label="On this page">
            <p className="ed-doc-rail-title">On this page</p>
            <ol>
              {sections.map((s) => (
                <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
              ))}
            </ol>
          </nav>

          <div className="ed-c5-8 ed-doc-body">
            {sections.map((s) => (
              <section id={s.id} key={s.id} className="ed-doc-section">
                <h2 className="ed-h3">{s.title}</h2>
                {s.body}
              </section>
            ))}
            {footer ? <div className="ed-doc-footer">{footer}</div> : null}
            <p className="ed-doc-back">
              <Link className="text-link" to="/">Return to the homepage</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
