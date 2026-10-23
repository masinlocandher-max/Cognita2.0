import { ArrowRight, BrainCircuit, CheckCircle2, CreditCard, SearchCheck, Sparkles, Waypoints } from 'lucide-react'

const steps = [
  ['01', BrainCircuit, 'Create your account', 'Create a verified account, review the privacy notice, and record your learning goal. Registration is not open yet.'],
  ['02', SearchCheck, 'Complete the CEE', 'Cognita evaluates current competency, technical readiness, learning-support needs, goals, and practical constraints.'],
  ['03', Waypoints, 'Receive your Cognita path', 'The system identifies strengths, gaps, skip-eligible competencies, depth, specialization, and recommended learning mode.'],
  ['04', CreditCard, 'Review the paid offer', 'Understand why Self-Paced or Guided is recommended. Review the price, access period, support, and refund terms, then pay through a verified checkout when enrollment opens.'],
  ['05', Sparkles, 'Learn and build evidence', 'Start with an orientation and manageable study plan. Read short lessons, try synthetic cases, check your reasoning, submit evidence, and revise after feedback.'],
  ['06', CheckCircle2, 'Get verified and advance', 'Demonstrate the required skills, defend your final project, and receive a competency record once authorized verification is available. Choose the next step from evidence of your remaining gaps.'],
]

export default function PublicAdmissions() {
  return (
    <>
      <section className="info-hero">
        <div className="page-width info-hero__grid">
          <div>
            <p className="section-label">HOW COGNITA WORKS</p>
            <h1>Find your starting point. Build from there.</h1>
            <p>Cognita starts with the CEE, then builds the recommendation around your actual profile.</p>
          </div>
          <aside className="info-hero__aside"><span>Your planned journey</span><strong>Create Account → CEE → Personalized Path → Recommended Offer → Mastery</strong></aside>
        </div>
      </section>

      <section className="section info-page">
        <div className="page-width">
          <div className="public-programs-notice"><div><strong>Designed journey; enrollment is not yet open.</strong><p>Explore the learning model and syllabus now. Account creation, the CEE, and paid enrollment will become available when intake opens.</p></div></div>
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
      <div className="page-width section"><h2>See what learning looks like.</h2><p>Eight units connect short lessons to practice, feedback, and a final evidence portfolio.</p><a className="button" href="/self-paced">View the self-paced syllabus</a></div></section>
    </>
  )
}
