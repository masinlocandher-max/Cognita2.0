import { Link } from 'react-router-dom'
import { ArrowRight, Lock } from 'lucide-react'
import { differentiators, learningSteps, pathways, publicPrograms } from '../../content/institute.js'
import { resources } from '../../content/resources.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { useReveal } from '../../hooks/useReveal.js'
import { formatDateShort } from '../../lib/format.js'

export default function Home() {
  useDocumentTitle(null)
  useReveal()

  const featured = resources.filter((resource) => resource.category !== 'update').slice(0, 3)

  return (
    <>
      {/* 1 — Hero */}
      <section className="inst-hero on-ink">
        <div className="page-width inst-hero-inner">
          <div>
            <p className="inst-eyebrow">Institute of Artificial Intelligence</p>
            <h1>
              The Cognita Institute
              <span className="line-2">of Artificial Intelligence</span>
            </h1>
            <p className="inst-hero-lead">
              Structured AI education for people who want to understand, apply, and grow with
              artificial intelligence.
            </p>
            <div className="inst-hero-actions">
              <Link className="btn btn--onink btn--lg" to="/programs">Explore Programs <ArrowRight size={17} /></Link>
              <Link className="btn btn--quiet-onink btn--lg" to="/admissions/apply">Apply to Cognita</Link>
            </div>
            <dl className="inst-hero-meta">
              <div><dt>Study</dt><dd>Foundations, applied and advanced learning</dd></div>
              <div><dt>Admission</dt><dd>By placement assessment</dd></div>
              <div><dt>Location</dt><dd>Online, based in the Philippines</dd></div>
            </dl>
          </div>

          <aside className="hero-index" aria-label="Learning pathways">
            <p className="hero-index-label">Learning pathways</p>
            <ol>
              {pathways.map((pathway, index) => (
                <li key={pathway.id}>
                  <span className="hero-index-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{pathway.name}</strong>
                    <span>{pathway.summary}</span>
                    {pathway.status === 'in-development'
                      ? <span className="hero-index-status">In development</span>
                      : null}
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      {/* 2 — Introduction */}
      <section className="inst-section inst-section--paper">
        <div className="page-width statement-split" data-reveal>
          <p className="statement">
            Artificial intelligence is changing how people learn, work, create, and make decisions.
          </p>
          <div className="statement-body">
            <p>
              These systems are now part of ordinary professional work — writing, research, analysis,
              communication with clients and colleagues. Most people learned to use them by trial and
              error, without a clear picture of how they behave or where they fail.
            </p>
            <p>
              Cognita is an institute built to close that gap. We teach the understanding and practical
              capability required to work with artificial intelligence thoughtfully: how these systems
              produce what they produce, how to instruct them precisely, how to verify what comes back,
              and where human judgment remains necessary.
            </p>
            <p>
              Study is organized into structured pathways rather than isolated lessons, and students
              begin at the level their understanding supports.
            </p>
          </div>
        </div>
      </section>

      {/* 3 — Learning pathways */}
      <section className="inst-section inst-section--sunken">
        <div className="page-width" data-reveal>
          <div className="section-marker">
            <span className="section-marker-num" aria-hidden="true">01</span>
            <div>
              <h2>Learning pathways</h2>
              <p>Three levels of study, sequenced by understanding rather than by enrollment date.</p>
            </div>
          </div>

          <div className="pathway-list">
            {pathways.map((pathway, index) => (
              <article className="pathway-row" key={pathway.id}>
                <span className="pathway-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>
                  {pathway.status === 'open'
                    ? <Link to={`/programs?pathway=${pathway.id}`}>{pathway.name}</Link>
                    : pathway.name}
                </h3>
                <p className="pathway-summary">{pathway.summary}</p>
                <div className="pathway-meta">
                  {pathway.status === 'open' ? (
                    <Link className="link-arrow" to={`/programs?pathway=${pathway.id}`}>
                      View programs <ArrowRight size={15} />
                    </Link>
                  ) : (
                    <span className="status status--quiet">In development</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Programs */}
      <section className="inst-section inst-section--paper">
        <div className="page-width" data-reveal>
          <div className="section-marker">
            <span className="section-marker-num" aria-hidden="true">02</span>
            <div>
              <h2>Programs</h2>
              <p>Each program states what you will be able to do, what it covers, and what completing it requires.</p>
            </div>
          </div>

          <div className="program-grid">
            {publicPrograms.map((program) => (
              <article className="program-card" key={program.id}>
                <p className="program-card-class">{program.classification}</p>
                <h3><Link to={`/programs/${program.id}`}>{program.name}</Link></h3>
                <p>{program.summary}</p>
                <dl className="program-card-facts">
                  <div><dt>For</dt><dd>{program.pathwayId === 'foundations' ? 'Learners beginning structured AI study' : 'Students producing real work with AI'}</dd></div>
                  <div><dt>Format</dt><dd>Structured modules with evaluator-reviewed work</dd></div>
                  <div><dt>Entry</dt><dd>{program.pathwayId === 'foundations' ? 'Application and entrance exam' : 'Foundations or placement result'}</dd></div>
                </dl>
                <Link className="link-arrow" to={`/programs/${program.id}`}>Program details <ArrowRight size={15} /></Link>
              </article>
            ))}
          </div>

          <p className="muted" style={{ marginTop: 'var(--s-6)', fontSize: 'var(--text-sm)' }}>
            Advanced and professional programs are in development. Cognita will publish the curriculum and
            requirements when they are defined.
          </p>
        </div>
      </section>

      {/* 5 — Why Cognita */}
      <section className="inst-section inst-section--sunken">
        <div className="page-width" data-reveal>
          <div className="section-marker">
            <span className="section-marker-num" aria-hidden="true">03</span>
            <div>
              <h2>Why Cognita</h2>
              <p>What distinguishes structured AI education from a collection of tutorials.</p>
            </div>
          </div>

          <div className="diff-grid">
            {differentiators.map((item) => (
              <article className="diff-item" key={item.id}>
                <span className="diff-rule" aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — How learning works */}
      <section className="inst-section inst-section--ink">
        <div className="page-width" data-reveal>
          <div className="section-marker">
            <span className="section-marker-num" aria-hidden="true">04</span>
            <div>
              <h2>How learning works</h2>
              <p>Six stages, from first enquiry to progression into higher-level study.</p>
            </div>
          </div>

          <div className="process-list">
            {learningSteps.map((step, index) => (
              <article className="process-item" key={step.id}>
                <span className="process-step" aria-hidden="true">Step {String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Admissions */}
      <section className="inst-section inst-section--paper">
        <div className="page-width statement-split" data-reveal>
          <div>
            <p className="inst-eyebrow" style={{ color: 'var(--brand-violet-600)' }}>Admissions</p>
            <p className="statement">Admission is by placement, not by competition.</p>
          </div>
          <div className="statement-body">
            <p>
              Cognita does not select a cohort by ranking applicants against one another. Admissions
              exists to establish where your study should begin — which for most students means the
              foundations pathway, and for some means starting further along.
            </p>
            <p>
              The process is short: review the programs, submit an application, and complete the Cognita
              Entrance Exam. Written responses are read by an evaluator before placement is confirmed.
            </p>
            <div className="wrap-actions" style={{ marginTop: 'var(--s-2)' }}>
              <Link className="btn" to="/admissions">Admissions information <ArrowRight size={16} /></Link>
              <Link className="btn btn--secondary" to="/admissions/entrance-exam">About the entrance exam</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8 — Student experience */}
      <section className="inst-section inst-section--sunken">
        <div className="page-width" data-reveal>
          <div className="portal-band">
            <div>
              <span className="portal-lock"><Lock size={12} aria-hidden="true" /> Enrolled students</span>
              <h2>Your learning continues inside Cognita</h2>
              <p>
                Enrolled students receive access to the Cognita Student Portal, where courses, learning
                materials, assessments, progress and student tools are organized in one private learning
                environment.
              </p>
              <div className="wrap-actions" style={{ marginTop: 'var(--s-6)' }}>
                <Link className="btn btn--onink" to="/portal">Student Login <ArrowRight size={16} /></Link>
              </div>
              <p className="portal-band-note" style={{ marginTop: 'var(--s-4)' }}>For enrolled Cognita students.</p>
            </div>

            <div className="portal-band-panel">
              <p className="portal-lock" style={{ marginBottom: 0 }}>Inside the portal</p>
              <ul>
                <li><Lock size={13} aria-hidden="true" /><span>Course materials and structured lessons</span></li>
                <li><Lock size={13} aria-hidden="true" /><span>Module assessments and applied work</span></li>
                <li><Lock size={13} aria-hidden="true" /><span>Progress and completion records</span></li>
                <li><Lock size={13} aria-hidden="true" /><span>Placement and program information</span></li>
              </ul>
              <p className="portal-band-note">
                Course content is available to enrolled students only and is not published on this website.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9 — About Cognita */}
      <section className="inst-section inst-section--paper">
        <div className="page-width statement-split" data-reveal>
          <div>
            <p className="inst-eyebrow" style={{ color: 'var(--brand-violet-600)' }}>About Cognita</p>
            <p className="statement">An institute for the part of AI work that cannot be automated.</p>
          </div>
          <div className="statement-body">
            <p>
              Cognita teaches responsible AI literacy: the understanding required to use these systems
              well, the discipline to verify what they produce, and the judgment to know which decisions
              remain a person’s to make.
            </p>
            <p>
              Tools change quickly. The capability to state what you need precisely, to tell a real source
              from a convincing one, and to take responsibility for published work does not.
            </p>
            <Link className="link-arrow" to="/about">Read about the institute <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* 10 — Resources */}
      <section className="inst-section inst-section--sunken">
        <div className="page-width" data-reveal>
          <div className="section-marker">
            <span className="section-marker-num" aria-hidden="true">05</span>
            <div>
              <h2>Educational resources</h2>
              <p>Explainers and practical guides, published openly.</p>
            </div>
          </div>

          <div className="program-grid">
            {featured.map((resource) => (
              <article className="program-card" key={resource.slug}>
                <p className="program-card-class">{resource.category === 'explainer' ? 'AI explainer' : resource.category === 'responsible' ? 'Responsible AI' : 'Learning guide'}</p>
                <h3><Link to={`/resources/${resource.slug}`}>{resource.title}</Link></h3>
                <p>{resource.summary}</p>
                <p className="muted" style={{ fontSize: 'var(--text-xs)' }}>
                  {formatDateShort(resource.publishedAt)} · {resource.readingMinutes} min read
                </p>
              </article>
            ))}
          </div>

          <div className="wrap-actions" style={{ marginTop: 'var(--s-7)' }}>
            <Link className="btn btn--secondary" to="/resources">All resources <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* 11 — Closing call */}
      <section className="inst-section inst-section--ink">
        <div className="page-width inst-close" data-reveal>
          <h2>Build your understanding of artificial intelligence</h2>
          <p>
            Begin with the programs, or apply and complete the entrance exam to find out where your
            study would start.
          </p>
          <div className="inst-close-actions">
            <Link className="btn btn--onink btn--lg" to="/programs">Explore Programs <ArrowRight size={17} /></Link>
            <Link className="btn btn--quiet-onink btn--lg" to="/admissions/apply">Apply to Cognita</Link>
          </div>
        </div>
      </section>
    </>
  )
}
