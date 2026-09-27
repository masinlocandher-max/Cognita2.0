import { ArrowRight, BrainCircuit, CheckCircle2, CreditCard, SearchCheck, Sparkles, Waypoints } from 'lucide-react'

const steps = [
  ['01', BrainCircuit, 'Create your account', 'Your account anchors the CEE, recommendation, enrollment, and future competency record.'],
  ['02', SearchCheck, 'Complete the CEE', 'Cognita evaluates current competency, technical readiness, learning-support needs, goals, and practical constraints.'],
  ['03', Waypoints, 'Receive your Cognita path', 'The system identifies strengths, gaps, skip-eligible competencies, depth, specialization, and recommended learning mode.'],
  ['04', CreditCard, 'Review the paid offer', 'You see the recommended Self-Paced or Guided option, the material terms, price, access period, and applicable refund conditions before paying.'],
  ['05', Sparkles, 'Learn and build evidence', 'Progress through practice, feedback, remediation, projects, and mastery rather than passive completion.'],
  ['06', CheckCircle2, 'Get verified and advance', 'When requirements are met, your competency record summarizes demonstrated capability and Cognita can recommend the next path.'],
]

export default function PublicAdmissions() {
  return (
    <>
      <section className="info-hero">
        <div className="page-width info-hero__grid">
          <div>
            <p className="section-label">HOW COGNITA WORKS</p>
            <h1>The first decision is not which course to buy.</h1>
            <p>Cognita starts with the CEE, then builds the recommendation around your actual profile.</p>
          </div>
          <aside className="info-hero__aside"><span>Canonical journey</span><strong>Create Account → CEE → Personalized Path → Recommended Offer → Mastery</strong></aside>
        </div>
      </section>

      <section className="section info-page">
        <div className="page-width">
          <div className="public-admissions-grid">
            {steps.map(([number, Icon, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <div><Icon size={20} /><h3>{title}</h3><p>{body}</p></div>
              </article>
            ))}
          </div>
          <div className="public-admissions-cta">
            <div><BrainCircuit /><div><strong>Why this model?</strong><p>Because two learners with similar knowledge can still need different pathways, support levels, and commercial offers.</p></div></div>
            <a className="button" href="/cee">Understand the CEE <ArrowRight size={17} /></a>
          </div>
        </div>
      </section>
    </>
  )
}
