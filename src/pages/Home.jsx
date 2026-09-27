import {
  ArrowRight,
  BrainCircuit,
  Building2,
  CheckCircle2,
  GraduationCap,
  Mail,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  Waypoints,
} from 'lucide-react'

const PRIMARY_EMAIL = 'info@thecognitainstitute.com'
const ALTERNATE_EMAIL = 'cognitainstituteofai@gmail.com'

const journey = [
  ['01', 'Create your account', 'Your Cognita profile becomes the starting point for assessment, pathway recommendations, and future learning records.'],
  ['02', 'Take the CEE', 'The Cognita Entry & Competency Evaluation measures current capability, technical readiness, learning-support needs, goals, and practical constraints.'],
  ['03', 'Receive your profile', 'Cognita identifies strengths, gaps, competencies you may skip, and the depth of training you actually need.'],
  ['04', 'Get your personalized path', 'Your result routes you toward AI Literacy, Applied AI, AI Builder, or AI Engineering with the right specialization and support.'],
  ['05', 'Review the recommended offer', 'Cognita recommends Self-Paced or Guided learning based on your profile rather than making you guess from a generic catalog.'],
  ['06', 'Enroll and master', 'Learn, practice, receive feedback, remediate, retry, and build evidence until required competencies are demonstrated.'],
  ['07', 'Prove what you can do', 'Projects, capstone evidence, and verified competency records show demonstrated capability rather than seat time.'],
  ['08', 'Advance', 'When one path is complete, Cognita can recommend the next specialization, depth, reassessment, or professional pathway.'],
]

const faqs = [
  ['What is Cognita?', 'Cognita is a private, non-degree professional training and competency-development provider focused on practical AI capability.'],
  ['What is the CEE?', 'CEE means Cognita Entry & Competency Evaluation. It is the diagnostic and routing system that helps determine what you already know, what you need next, and which Cognita learning mode is recommended.'],
  ['Do I choose a course first?', 'No. Cognita is designed to assess first and recommend the path before you commit to a paid learning option.'],
  ['What learning modes are available?', 'Cognita is designed around Self-Paced learning, Guided learning, and customized training for organizations.'],
  ['Is the learner-readiness section a psychological exam?', 'No. It is a non-clinical educational readiness and support profile used to improve learning recommendations.'],
  ['Does Cognita guarantee a job or income?', 'No. Cognita develops and verifies capability. Employment, income, promotion, and third-party recognition depend on factors outside Cognita.'],
]

export default function Home() {
  return (
    <>
      <section className="public-hero public-hero--institutional">
        <div className="page-width public-hero-grid">
          <div className="public-hero-copy">
            <p className="public-institution-name">The Cognita Institute of Artificial Intelligence</p>
            <h1>Stop taking AI courses you may not need.</h1>
            <p>Start with the CEE. Discover your current AI capability, identify the gaps that matter, and get a learning path built around what you actually need.</p>
            <div className="public-hero-actions">
              <a className="button" href="/cee">See how the CEE works <ArrowRight size={18} /></a>
              <a className="button button--ghost" href="#journey">See the Cognita path</a>
            </div>
            <p className="public-institutional-line">Don’t just learn AI. Prove you can use it.</p>
          </div>

          <aside className="public-academic-note" aria-label="Cognita model">
            <span>Cognita model</span>
            <h2>Assess first. Train what matters.</h2>
            <p>Cognita uses competency evidence, technical readiness, learning-support needs, goals, and practical constraints to recommend the right path.</p>
            <dl>
              <div><dt>Assessment</dt><dd>CEE / AI-00</dd></div>
              <div><dt>Learning</dt><dd>Self-Paced or Guided</dd></div>
              <div><dt>Standard</dt><dd>Demonstrated competency</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="public-facts-band">
        <div className="page-width public-facts-grid">
          <div><span>Provider</span><strong>Private, non-degree training</strong></div>
          <div><span>Starting point</span><strong>CEE diagnostic profile</strong></div>
          <div><span>Learning</span><strong>Personalized pathway</strong></div>
          <div><span>Proof</span><strong>Evidence-based competency</strong></div>
        </div>
      </section>

      <section className="section public-section">
        <div className="page-width">
          <div className="section-heading section-heading--wide">
            <p className="section-label">WHY COGNITA</p>
            <h2>You should not pay to relearn what you already know.</h2>
            <p>A generic catalog starts by asking what course you want. Cognita starts by finding out where you actually stand.</p>
          </div>
          <div className="public-principles-grid">
            <article><BrainCircuit /><h3>Know your starting point</h3><p>CEE creates a profile instead of reducing you to one score.</p></article>
            <article><SearchCheck /><h3>Find the real gaps</h3><p>Strong areas can move faster. Weak areas receive targeted support.</p></article>
            <article><Waypoints /><h3>Get the right route</h3><p>Your depth, specialization, learning mode, and support level are recommended from evidence.</p></article>
            <article><ShieldCheck /><h3>Build defensible capability</h3><p>Progress depends on practice, verification, projects, feedback, and mastery.</p></article>
          </div>
        </div>
      </section>

      <section className="section section--soft public-section" id="journey">
        <div className="page-width">
          <div className="public-section-intro">
            <div><p className="section-label">THE COGNITA PATH</p><h2>One journey, personalized after the CEE.</h2></div>
            <p>Create Account → CEE → Profile → Personalized Path → Recommended Offer → Mastery → Verified Competency → Next Path</p>
          </div>
          <div className="public-admissions-grid">
            {journey.map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{body}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section public-section">
        <div className="page-width">
          <div className="public-section-intro">
            <div><p className="section-label">LEARNING MODES</p><h2>The path is personalized. The standard remains defensible.</h2></div>
            <p>CEE helps determine not only what you learn, but how much structure and support you are likely to need.</p>
          </div>
          <div className="public-program-grid">
            <article className="public-program-card"><Sparkles /><h3>Self-Paced</h3><p>Flexible scheduling for learners who can progress independently while completing the same required competency evidence.</p></article>
            <article className="public-program-card public-program-card--primary"><GraduationCap /><h3>Guided</h3><p>Premium support for learners who benefit from structure, accountability, checkpoints, human feedback, and facilitated progress.</p></article>
            <article className="public-program-card"><Building2 /><h3>For Organizations</h3><p>Assess the people, identify the gaps, train what matters, verify capability, then measure and expand.</p></article>
          </div>
        </div>
      </section>

      <section className="section section--soft public-section">
        <div className="page-width">
          <div className="section-heading section-heading--wide"><p className="section-label">TRUST</p><h2>Clear about what Cognita is.</h2></div>
          <div className="info-list-grid">
            <article><CheckCircle2 /><strong>Private professional training</strong><p>Cognita is a private, non-degree professional training and competency-development provider.</p></article>
            <article><Target /><strong>No false guarantees</strong><p>Cognita does not promise guaranteed employment, income, promotion, or government recognition.</p></article>
            <article><ShieldCheck /><strong>Private credentials</strong><p>Cognita credentials describe demonstrated competency within Cognita unless a separate external recognition is explicitly verified.</p></article>
          </div>
        </div>
      </section>

      <section className="section public-section">
        <div className="page-width public-training-grid">
          <div>
            <p className="section-label">FOR ORGANIZATIONS</p>
            <h2>Don’t train everyone the same.</h2>
            <p>Measure the gaps. Train what matters. Verify the capability.</p>
          </div>
          <a className="button" href={`mailto:${PRIMARY_EMAIL}?cc=${ALTERNATE_EMAIL}&subject=Cognita%20for%20Organizations`}><Mail size={17} /> Discuss organizational training</a>
        </div>
      </section>

      <section className="section section--soft public-section">
        <div className="page-width">
          <div className="section-heading"><p className="section-label">FAQ</p><h2>Before you begin.</h2></div>
          <div className="public-faq-list">
            {faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>
    </>
  )
}
