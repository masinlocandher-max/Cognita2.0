import { ArrowRight, BrainCircuit, CheckCircle2, Gauge, GraduationCap, Languages, SearchCheck, ShieldCheck, Sparkles, Waypoints } from 'lucide-react'
import { Link } from 'react-router-dom'

const journey = [
  { number: '01', title: 'Apply to Cognita', body: 'Submit an admissions application before any entrance assessment is issued.' },
  { number: '02', title: 'Admissions review', body: 'Approved applicants receive a Cognita Entrance Exam invitation through email.' },
  { number: '03', title: 'Complete the CEE', body: 'Take the timed assessment independently, then wait for the official pass/fail decision.' },
  { number: '04', title: 'Enroll and begin', body: 'Successful applicants choose a program, complete payment, activate an account, and enter the student app.' },
]

export default function Home() {
  return (
    <>
      <section className="hero hero--dark">
        <div className="hero-orb hero-orb--one" />
        <div className="hero-orb hero-orb--two" />
        <div className="page-width hero-grid">
          <div className="hero-copy">
            <h1>AI education for people who want to use it well.</h1>
            <p className="hero-lead">The Cognita Institute of Artificial Intelligence develops practical AI capability through strong foundations, communication readiness, critical thinking, and real-world application.</p>
            <div className="hero-actions">
              <Link className="button" to="/apply">Apply to Cognita <ArrowRight size={18} /></Link>
              <a className="text-link" href="#about">Explore Cognita</a>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="signal-field">
              <div className="signal-core" />
              <span className="orbit orbit--1" />
              <span className="orbit orbit--2" />
              <span className="orbit orbit--3" />
              <span className="signal-label signal-label--a">THINK</span>
              <span className="signal-label signal-label--b">APPLY</span>
              <span className="signal-label signal-label--c">TRANSFORM</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--white" id="about">
        <div className="page-width split-layout">
          <div>
            <p className="section-label">WHO WE ARE</p>
            <h2>A modern institute built around applied intelligence.</h2>
          </div>
          <div className="prose-large">
            <p>Cognita exists to make AI education more useful, more responsible, and more relevant to real work. We do not treat AI as a collection of trendy tools. We train the underlying skills that make those tools useful.</p>
            <p>That means understanding what AI can do, communicating with it clearly, checking what it produces, protecting human judgment, and turning knowledge into usable output.</p>
          </div>
        </div>
      </section>

      <section className="section section--soft" id="difference">
        <div className="page-width">
          <div className="section-heading">
            <p className="section-label">WHY COGNITA</p>
            <h2>We do not assume every learner should start in the same place.</h2>
            <p>Readiness matters. Good AI use depends on more than knowing which button to press.</p>
          </div>
          <div className="principle-grid">
            <article>
              <BrainCircuit />
              <h3>Understanding first</h3>
              <p>Learners need enough foundation to know what AI can and cannot reliably do.</p>
            </article>
            <article>
              <Languages />
              <h3>Communication matters</h3>
              <p>Clear instructions, comprehension, and functional English can directly affect the quality of AI-assisted work.</p>
            </article>
            <article>
              <SearchCheck />
              <h3>Evidence over confidence</h3>
              <p>Fluent AI output is not automatically true. Verification and research judgment are part of the skill.</p>
            </article>
            <article>
              <ShieldCheck />
              <h3>Human responsibility</h3>
              <p>AI can assist. The learner still owns the decision, the final output, and its consequences.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--white" id="learning">
        <div className="page-width">
          <div className="section-heading section-heading--wide">
            <p className="section-label">WHAT WE OFFER</p>
            <h2>A clearer starting point, then practical AI learning.</h2>
          </div>
          <div className="offering-rail">
            <article className="offering offering--featured">
              <div className="offering-icon"><Gauge /></div>
              <div>
                <span>ENTRY</span>
                <h3>Readiness & Placement</h3>
                <p>A structured admissions and readiness process helps identify communication strength, AI foundations, research judgment, and the learner's appropriate starting point.</p>
              </div>
            </article>
            <article className="offering">
              <div className="offering-icon"><Sparkles /></div>
              <div>
                <span>AI-00</span>
                <h3>AI Foundations</h3>
                <p>For learners who need a stronger base before moving into applied AI learning.</p>
              </div>
            </article>
            <article className="offering">
              <div className="offering-icon"><Languages /></div>
              <div>
                <span>AI-00</span>
                <h3>Communication Readiness</h3>
                <p>Functional English, comprehension, grammar, clarity, and instruction-building for effective AI use.</p>
              </div>
            </article>
            <article className="offering">
              <div className="offering-icon"><GraduationCap /></div>
              <div>
                <span>NEXT</span>
                <h3>Applied AI Learning</h3>
                <p>Progress into higher-level AI learning once the required foundations are demonstrated.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="page-width split-layout split-layout--center">
          <div>
            <p className="section-label section-label--light">WHY PLACEMENT MATTERS</p>
            <h2>Learning should begin from evidence, not assumptions.</h2>
          </div>
          <div className="exam-reasons">
            <div><CheckCircle2 /><span>Identifies where the learner is already ready.</span></div>
            <div><CheckCircle2 /><span>Finds specific gaps that can be strengthened.</span></div>
            <div><CheckCircle2 /><span>Avoids unnecessary repetition for stronger learners.</span></div>
            <div><CheckCircle2 /><span>Creates a more defensible path into higher-level learning.</span></div>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="page-width">
          <div className="section-heading">
            <p className="section-label">STUDENT JOURNEY</p>
            <h2>Admission first. Learning begins inside the student app.</h2>
          </div>
          <div className="journey-line">
            {journey.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cta">
        <div className="page-width cta-panel">
          <Waypoints size={36} />
          <div>
            <h2>Begin with Admissions.</h2>
            <p>Entrance exam access is issued only after an application has been reviewed and approved.</p>
          </div>
          <Link className="button button--light" to="/apply">Start an application <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  )
}
