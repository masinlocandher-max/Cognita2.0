import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Info } from 'lucide-react'
import { findResource, resourceCategories, resources } from '../../content/resources.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { formatDate } from '../../lib/format.js'

const CATEGORY_LABEL = Object.fromEntries(resourceCategories.map((category) => [category.id, category.label]))

function Block({ block }) {
  if (block.type === 'heading') return <h2 className="article-heading">{block.text}</h2>
  if (block.type === 'paragraph') return <p className="article-paragraph">{block.text}</p>

  if (block.type === 'list') {
    const List = block.ordered ? 'ol' : 'ul'
    return <List className={`article-list${block.ordered ? ' article-list--ordered' : ''}`}>{block.items.map((item) => <li key={item}>{item}</li>)}</List>
  }

  if (block.type === 'note') {
    return (
      <aside className="article-note">
        <Info size={16} aria-hidden="true" />
        <div><strong>{block.title}</strong><p>{block.text}</p></div>
      </aside>
    )
  }

  if (block.type === 'compare') {
    return (
      <figure className="article-compare">
        <figcaption>{block.title}</figcaption>
        <div className="article-compare-pair">
          <div><span>Weaker</span><p>{block.weak}</p></div>
          <div className="is-strong"><span>Stronger</span><p>{block.strong}</p></div>
        </div>
        <p className="article-compare-why">{block.why}</p>
      </figure>
    )
  }

  return null
}

export default function ResourceArticle() {
  const { slug } = useParams()
  const resource = findResource(slug)
  useDocumentTitle(resource?.title)

  if (!resource) {
    return (
      <section className="inst-section inst-section--paper">
        <div className="page-width" style={{ maxWidth: '58ch' }}>
          <p className="inst-eyebrow" style={{ color: 'var(--brand-violet-600)' }}>Not found</p>
          <h1 style={{ fontSize: 'var(--display-md)' }}>This resource is not in the directory.</h1>
          <p className="lead" style={{ marginTop: 'var(--s-5)' }}>
            The link may be out of date, or the resource may have been renamed.
          </p>
          <div className="wrap-actions" style={{ marginTop: 'var(--s-7)' }}>
            <Link className="btn" to="/resources">All resources</Link>
            <Link className="btn btn--secondary" to="/">Institute home</Link>
          </div>
        </div>
      </section>
    )
  }

  const related = resources.filter((item) => item.slug !== resource.slug && item.category === resource.category).slice(0, 2)

  return (
    <>
      <article className="inst-section inst-section--paper">
        <div className="page-width article">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/resources"><ArrowLeft size={13} aria-hidden="true" /> Resources</Link>
          </nav>

          <header className="article-head">
            <p className="inst-eyebrow" style={{ color: 'var(--brand-violet-600)' }}>{CATEGORY_LABEL[resource.category]}</p>
            <h1>{resource.title}</h1>
            <p className="article-summary">{resource.summary}</p>
            <p className="article-byline">
              Published {formatDate(resource.publishedAt)} · {resource.readingMinutes} minute read ·
              The Cognita Institute of Artificial Intelligence
            </p>
          </header>

          <div className="article-body">
            {resource.body.map((block, index) => <Block key={`${block.type}-${index}`} block={block} />)}
          </div>

          <footer className="article-foot">
            <p className="muted" style={{ fontSize: 'var(--text-sm)', lineHeight: 1.75 }}>
              This article is part of Cognita’s public educational resources. Structured study of these
              subjects is available through the institute’s programs.
            </p>
            <div className="wrap-actions">
              <Link className="btn" to="/programs">Explore Programs <ArrowRight size={16} /></Link>
              <Link className="btn btn--secondary" to="/resources">More resources</Link>
            </div>
          </footer>
        </div>
      </article>

      {related.length ? (
        <section className="inst-section inst-section--sunken">
          <div className="page-width">
            <div className="section-marker">
              <span className="section-marker-num" aria-hidden="true">—</span>
              <div><h2>Related reading</h2></div>
            </div>
            <div className="program-grid">
              {related.map((item) => (
                <article className="program-card" key={item.slug}>
                  <p className="program-card-class">{CATEGORY_LABEL[item.category]}</p>
                  <h3><Link to={`/resources/${item.slug}`}>{item.title}</Link></h3>
                  <p>{item.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
