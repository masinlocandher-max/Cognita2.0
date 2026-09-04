import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { resourceCategories, resources } from '../../content/resources.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { useReveal } from '../../hooks/useReveal.js'
import { formatDateShort } from '../../lib/format.js'

const CATEGORY_LABEL = Object.fromEntries(resourceCategories.map((category) => [category.id, category.label]))

export default function Resources() {
  useDocumentTitle('Resources')
  useReveal()
  const [params, setParams] = useSearchParams()
  const active = params.get('category') || 'all'

  const visible = active === 'all' ? resources : resources.filter((resource) => resource.category === active)
  const sorted = [...visible].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

  return (
    <>
      <section className="inst-hero on-ink" style={{ paddingBlock: 'clamp(var(--s-9), 7vw, 108px)' }}>
        <div className="page-width">
          <p className="inst-eyebrow">Resources</p>
          <h1 style={{ maxWidth: '17ch' }}>Educational resources, published openly.</h1>
          <p className="inst-hero-lead">
            Explainers, practical guides and institute updates. Free to read, whether or not you study with
            Cognita.
          </p>
        </div>
      </section>

      <section className="inst-section inst-section--paper">
        <div className="page-width">
          <div className="tabs" role="tablist" aria-label="Filter resources" style={{ maxWidth: 'fit-content', marginBottom: 'var(--s-8)' }}>
            <button type="button" role="tab" aria-selected={active === 'all'} onClick={() => setParams({})}>All</button>
            {resourceCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={active === category.id}
                onClick={() => setParams({ category: category.id })}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="resource-list" data-reveal>
            {sorted.map((resource) => (
              <article className="resource-row" key={resource.slug}>
                <div className="resource-meta">
                  <span className="program-card-class">{CATEGORY_LABEL[resource.category]}</span>
                  <span className="muted">{formatDateShort(resource.publishedAt)}</span>
                </div>
                <div>
                  <h2><Link to={`/resources/${resource.slug}`}>{resource.title}</Link></h2>
                  <p>{resource.summary}</p>
                </div>
                <Link className="link-arrow" to={`/resources/${resource.slug}`}>
                  {resource.readingMinutes} min read <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="inst-section inst-section--sunken">
        <div className="page-width inst-close">
          <h2>Study these subjects properly</h2>
          <p>The resources are an introduction. The programs are the structured version.</p>
          <div className="inst-close-actions">
            <Link className="btn btn--lg" to="/programs">Explore Programs <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>
    </>
  )
}
