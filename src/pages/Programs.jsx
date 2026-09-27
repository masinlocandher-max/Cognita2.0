import { ArrowRight, Building2, GraduationCap, Sparkles } from 'lucide-react'

const modes = [
  {
    icon: Sparkles,
    title: 'Self-Paced',
    label: 'Flexible paid pathway',
    body: 'For learners who can progress independently and need schedule flexibility. The competency standard does not change.',
    includes: ['Personalized competency sequence', 'Practice and assessment', 'Remediation and retry', 'Projects and evidence', 'Verified competency record when requirements are met'],
  },
  {
    icon: GraduationCap,
    title: 'Guided',
    label: 'Premium supported pathway',
    body: 'For learners who are likely to perform better with structure, accountability, checkpoints, facilitated support, and human feedback.',
    includes: ['Personalized competency sequence', 'Structured milestones', 'Human feedback and review', 'Accountability and support', 'Capstone or equivalent evidence where required'],
  },
  {
    icon: Building2,
    title: 'Cognita for Organizations',
    label: 'Institutional and cohort training',
    body: 'For schools, companies, LGUs, NGOs, associations, and professional groups that need capability development across a cohort.',
    includes: ['Baseline assessment', 'Competency-gap analysis', 'Customized cohort pathway', 'Training and verification', 'Organization-level reporting where implemented'],
  },
]

const depths = [
  ['AI Literacy', 'Understand, evaluate, and use AI responsibly.'],
  ['Applied AI', 'Use AI effectively in professional, business, education, research, government, and creative workflows.'],
  ['AI Builder', 'Build automations, agents, applications, APIs, and connected workflows.'],
  ['AI Engineering', 'Develop deeper programming, evaluation, deployment, reliability, and production-system capability.'],
]

export default function Programs() {
  return (
    <>
      <section className="programs-public-hero">
        <div className="page-width programs-public-hero__inner">
          <div>
            <p className="section-label">COGNITA LEARNING PATHS</p>
            <h1>You do not start by guessing which course to buy.</h1>
            <p>Take the CEE first. Cognita uses the resulting profile to recommend the depth, specialization, learning mode, and support level that fit your actual needs.</p>
          </div>
          <aside>
            <span>Core rule</span>
            <strong>Assess first. Recommend second. Enroll third.</strong>
          </aside>
        </div>
      </section>

      <section className="section public-programs-page">
        <div className="page-width">
          <div className="public-programs-notice">
            <Sparkles size={20} />
            <div>
              <strong>CEE determines the recommended offer.</strong>
              <p>Program information can be explored publicly, but Cognita’s intended commercial journey is CEE-led rather than catalog-led.</p>
            </div>
          </div>

          <div className="section-heading section-heading--wide">
            <p className="section-label">LEARNING MODES</p>
            <h2>Different levels of support. The same expectation of real evidence.</h2>
          </div>

          <div className="public-program-grid">
            {modes.map(({ icon: Icon, title, label, body, includes }) => (
              <article className={title === 'Guided' ? 'public-program-card public-program-card--primary' : 'public-program-card'} key={title}>
                <div className="public-program-topline"><span>{label}</span><Icon /></div>
                <h3>{title}</h3>
                <p>{body}</p>
                <ul>{includes.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft public-section">
        <div className="page-width">
          <div className="section-heading section-heading--wide">
            <p className="section-label">DEPTH PATHWAYS</p>
            <h2>Not everyone needs the same level of AI training.</h2>
          </div>
          <div className="info-list-grid">
            {depths.map(([title, body]) => <article key={title}><strong>{title}</strong><p>{body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section public-section">
        <div className="page-width public-training-grid">
          <div>
            <p className="section-label">YOUR STARTING POINT</p>
            <h2>Find out what you actually need before you pay for training.</h2>
            <p>CEE identifies what you already know, the gaps that matter, what may be skipped, and which learning mode is recommended.</p>
          </div>
          <a className="button" href="/cee">See how the CEE works <ArrowRight size={17} /></a>
        </div>
      </section>
    </>
  )
}
