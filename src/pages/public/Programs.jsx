import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { pathways, programsForPathway, publicPrograms } from '../../content/institute.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { useReveal } from '../../hooks/useReveal.js'

export default function Programs() {
  useDocumentTitle('Programs')
  useReveal()
  const [params, setParams] = useSearchParams()
  const active = params.get('pathway') || 'all'

  const visible = active === 'all' ? publicPrograms : programsForPathway(active)

  return (
    <>
      <section className="inst-hero on-ink" style={{ paddingBlock: 'clamp(var(--s-9), 7vw, 108px)' }}>
        <div className="page-width">
          <p className="inst-eyebrow">Programs</p>
          <h1 style={{ maxWidth: '18ch' }}>Study organized into pathways.</h1>
          <p className="inst-hero-lead">
            Each program states its intended learner, its learning outcomes, what it covers, and what
            completing it requires. Placement determines where you begin.
          </p>
        </div>
      </section>

      <section className="inst-section inst-section--paper">
        <div className="page-width">
          <div className="tabs" role="tablist" aria-label="Filter by pathway" style={{ maxWidth: 'fit-content', marginBottom: 'var(--s-8)' }}>
            <button type="button" role="tab" aria-selected={active === 'all'} onClick={() => setParams({})}>
              All programs
            </button>
            {pathways.map((pathway) => (
              <button
                key={pathway.id}
                type="button"
                role="tab"
                aria-selected={active === pathway.id}
                onClick={() => setParams({ pathway: pathway.id })}
              >
                {pathway.name}
              </button>
            ))}
          </div>

          {pathways
            .filter((pathway) => active === 'all' || pathway.id === active)
            .map((pathway, index) => {
              const programs = programsForPathway(pathway.id)

              return (
                <section key={pathway.id} style={{ marginBottom: 'var(--s-10)' }} data-reveal>
                  <div className="section-marker">
                    <span className="section-marker-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h2>{pathway.name}</h2>
                      <p>{pathway.description}</p>
                    </div>
                  </div>

                  <div className="statement-split" style={{ marginBottom: 'var(--s-7)' }}>
                    <div>
                      <p className="field-label" style={{ marginBottom: 'var(--s-3)' }}>Intended for</p>
                      <ul className="clean-list">
                        {pathway.forWhom.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>

                    <div className="program-grid">
                      {programs.length ? programs.map((program) => (
                        <article className="program-card" key={program.id}>
                          <p className="program-card-class">{program.classification}</p>
                          <h3><Link to={`/programs/${program.id}`}>{program.name}</Link></h3>
                          <p>{program.summary}</p>
                          <dl className="program-card-facts">
                            <div><dt>Format</dt><dd>{program.format.split('.')[0]}</dd></div>
                            <div><dt>Study load</dt><dd>{program.studyLoad.replace('Indicative: ', '').split('.')[0]} (indicative)</dd></div>
                          </dl>
                          <Link className="link-arrow" to={`/programs/${program.id}`}>Program details <ArrowRight size={15} /></Link>
                        </article>
                      )) : (
                        <div className="card card--sunken">
                          <p className="card-title">In development</p>
                          <p className="card-note" style={{ marginTop: 'var(--s-2)' }}>
                            Cognita will publish the curriculum, entry requirements and study load for this pathway
                            when the programs are defined. We would rather leave this section empty than describe
                            courses that do not exist yet.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              )
            })}
        </div>
      </section>

      <section className="inst-section inst-section--sunken">
        <div className="page-width inst-close">
          <h2>Not sure where you would begin?</h2>
          <p>The entrance exam establishes your starting point. It is a placement assessment, not a competitive test.</p>
          <div className="inst-close-actions">
            <Link className="btn btn--lg" to="/admissions/entrance-exam">About the entrance exam <ArrowRight size={17} /></Link>
            <Link className="btn btn--secondary btn--lg" to="/admissions">Admissions information</Link>
          </div>
        </div>
      </section>
    </>
  )
}
