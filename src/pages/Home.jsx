import {
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  Building2,
  CheckCircle2,
  CircleHelp,
  Clock3,
  GraduationCap,
  Mail,
  MapPinned,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  Waypoints,
} from 'lucide-react'

const PRIMARY_EMAIL = 'info@thecognitainstitute.com'
const ALTERNATE_EMAIL = 'cognitainstituteofai@gmail.com'

const admissionsSteps = [
  ['01', 'Submit an application', 'Applicants begin through Cognita Admissions and provide the information required for initial review.'],
  ['02', 'Application review', 'Admissions reviews the application before any entrance examination access is issued.'],
  ['03', 'Receive CEE access', 'Approved applicants receive invitation-only Cognita Entrance Examination instructions through their registered email.'],
  ['04', 'Complete the CEE', 'The applicant completes one timed assessment session independently and under the stated integrity conditions.'],
  ['05', 'Receive the result', 'Objective evidence and applied responses are reviewed before Cognita releases the final admission decision and pathway guidance.'],
  ['06', 'Choose an eligible program', 'Passing applicants may select an available learning route, guided by readiness evidence where appropriate.'],
  ['07', 'Complete enrollment', 'Program selection is followed by the approved payment and enrollment process for the applicable intake.'],
  ['08', 'Activate the student account', 'Student access is created only after enrollment requirements have been confirmed.'],
  ['09', 'Enter the private learning app', 'Lessons, assessments, submissions, feedback, progress, and academic work happen in the enrolled-student environment, not on this public website.'],
]

const faqs = [
  ['Is Cognita a university or degree-granting school?', 'No. Cognita is a private, non-degree training and learning institution. It does not represent its programs as college degrees, CHED-recognized degrees, PRC licensure, or government credentials unless a specific approval has actually been obtained and disclosed.'],
  ['Who is Cognita designed for?', 'Cognita is designed around Filipino learners with different educational backgrounds, English proficiency, work responsibilities, digital experience, and learning pace.'],
  ['Do I need to know AI before applying?', 'Not necessarily. Cognita uses readiness evidence to understand where a learner should begin. Foundation support may be recommended when it is academically appropriate.'],
  ['What is the CEE?', 'The Cognita Entrance Examination is an admissions and readiness assessment. It looks at functional communication, AI foundations, research and verification judgment, and applied reasoning before a final human-reviewed admission decision is released.'],
  ['Can I study directly on this website?', 'No. This is the public institutional website. Enrolled learners study inside Cognita’s private learning environment after admission, enrollment, and account activation.'],
  ['How much is tuition?', 'Current fees are released only for approved intakes and programs. Cognita does not publish historical or unapproved prices as current tuition. Contact Admissions for the latest approved information.'],
  ['Does completing lessons automatically earn a credential?', 'No. Cognita is competency-based. Required work, assessment evidence, revision where needed, capstone requirements, and final institutional verification determine completion.'],
  ['Can organizations request a private training cohort?', 'Yes. Cognita can discuss customized learning for schools, companies, LGUs, NGOs, professional groups, and community or workforce-development partners.'],
]

export default function Home() {
  return (
    <>
      <section className="public-hero">
        <div className="public-hero-glow public-hero-glow--one" />
        <div className="public-hero-glow public-hero-glow--two" />
        <div className="page-width public-hero-grid">
          <div className="public-hero-copy">
            <span className="public-eyebrow">THE COGNITA INSTITUTE OF ARTIFICIAL INTELLIGENCE</span>
            <h1>Learn with structure.<br />Advance with purpose.</h1>
            <p>Training designed for Filipino learners who want to build real knowledge, practical AI capability, stronger judgment, and measurable progress.</p>
            <div className="public-hero-actions">
              <a className="button" href="#admissions">View the admission process <ArrowRight size={18} /></a>
              <a className="button button--ghost" href="#programs">Explore our programs</a>
            </div>
            <div className="public-hero-proof">
              <span><CheckCircle2 size={17} /> Readiness-based entry</span>
              <span><CheckCircle2 size={17} /> Competency-based completion</span>
              <span><CheckCircle2 size={17} /> Human review where it matters</span>
            </div>
          </div>
          <div className="public-hero-card">
            <span>COGNITA LEARNING STANDARD</span>
            <strong>THINK.<br />APPLY.<br />TRANSFORM.</strong>
            <p>AI should amplify human intelligence, not replace judgment, verification, accountability, or the ability to explain your work.</p>
            <div className="public-hero-card-rule" />
            <small>Human Intelligence. Amplified.</small>
          </div>
        </div>
      </section>

      <section className="public-facts-band">
        <div className="page-width public-facts-grid">
          <div><span>Institution type</span><strong>Private training & learning institution</strong></div>
          <div><span>Primary audience</span><strong>Filipino learners</strong></div>
          <div><span>Learning routes</span><strong>Guided + self-paced</strong></div>
          <div><span>Academic principle</span><strong>Progress is earned</strong></div>
        </div>
      </section>

      <section className="section public-section" id="about">
        <div className="page-width public-two-column">
          <div>
            <p className="section-label">ABOUT COGNITA</p>
            <h2>A modern learning institution built around applied intelligence.</h2>
          </div>
          <div className="public-copy-stack">
            <p>Cognita Institute is a private training and learning institution designed for Filipino learners. We believe quality education should be structured, practical, accessible, and connected to the realities of the people it serves.</p>
            <p>Our approach combines flexible learning with clear progression standards, assessment, practical outputs, and appropriate human guidance. Students are expected to demonstrate understanding and capability, not simply open lessons or complete attendance.</p>
            <div className="public-mission-grid">
              <article><Target /><span>MISSION</span><p>Provide structured, accessible, competency-based training that strengthens practical knowledge and prepares learners for meaningful academic, professional, entrepreneurial, and personal growth.</p></article>
              <article><Waypoints /><span>VISION</span><p>Become a trusted Filipino learning institution known for practical education, stronger learner capability, and adaptability in a rapidly changing world.</p></article>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft public-section">
        <div className="page-width">
          <div className="section-heading section-heading--wide">
            <p className="section-label">WHY COGNITA</p>
            <h2>Good AI education is not a list of tools.</h2>
            <p>Cognita trains the durable thinking, communication, verification, workflow, and professional judgment that make AI useful beyond one platform or trend.</p>
          </div>
          <div className="public-principles-grid">
            <article><BrainCircuit /><h3>Understanding before automation</h3><p>Know the task, the goal, and the limits before asking AI to perform it.</p></article>
            <article><SearchCheck /><h3>Evidence before confidence</h3><p>Fluent output is not proof. Important claims, sources, quotations, calculations, and recommendations require verification.</p></article>
            <article><ShieldCheck /><h3>Human accountability</h3><p>AI can assist the work. The learner remains responsible for the decision, the final output, and its consequences.</p></article>
            <article><BookOpenCheck /><h3>Practice before certification</h3><p>Credentials should represent demonstrated capability, not passive consumption or attendance alone.</p></article>
          </div>
        </div>
      </section>

      <section className="section public-section" id="programs">
        <div className="page-width">
          <div className="public-section-intro">
            <div><p className="section-label">PROGRAMS</p><h2>Two primary ways to learn.</h2></div>
            <p>Guided when you need structure. Flexible when you need freedom. The standard remains the same.</p>
          </div>

          <div className="public-program-grid">
            <article className="public-program-card public-program-card--primary">
              <div className="public-program-topline"><span>FLAGSHIP GUIDED ROUTE</span><GraduationCap /></div>
              <h3>Cognita Professional AI Program</h3>
              <p className="public-program-meta">10 Weeks · Guided · Cohort-Based · Mentor-Supported</p>
              <p>For learners who benefit from deadlines, live guidance, human feedback, cohort accountability, and an intensive applied-learning environment.</p>
              <div className="public-program-details">
                <div><strong>Foundation</strong><span>Up to 4 weeks, adjusted by readiness evidence</span></div>
                <div><strong>Specialization</strong><span>6-week applied track and capstone progression</span></div>
              </div>
              <ul>
                <li>AI for Students</li>
                <li>AI for Creatives</li>
                <li>AI for Entrepreneurs</li>
                <li>AI for Professionals & Virtual Assistants</li>
              </ul>
              <a href={`mailto:${PRIMARY_EMAIL}?subject=Cognita%20Professional%20AI%20Program%20Inquiry`} className="public-inline-link">Ask about the guided program <ArrowRight size={16} /></a>
            </article>

            <article className="public-program-card">
              <div className="public-program-topline"><span>SELF-PACED ROUTE</span><Sparkles /></div>
              <h3>Cognita Skills Lab</h3>
              <p className="public-program-meta">Applied AI Foundations and Professional Practice</p>
              <p className="public-program-promise">Learn it. Build it. Prove it.</p>
              <p>Project-based, assessment-driven learning for independent learners who need more control over when and how they study without lowering the completion standard.</p>
              <div className="public-program-details">
                <div><strong>Recommended rhythm</strong><span>28 days</span></div>
                <div><strong>Estimated learning time</strong><span>32–40 hours</span></div>
              </div>
              <ol className="public-module-list">
                <li>AI Foundations and Reality Check</li>
                <li>Problem Framing and Strategic Thinking</li>
                <li>Prompt Design and Instruction Quality</li>
                <li>Research, Verification, and Evidence</li>
                <li>AI-Assisted Professional Workflows</li>
                <li>Communication, Creativity, and Quality Control</li>
                <li>Ethics, Privacy, Bias, and Intellectual Property</li>
                <li>Capstone Development and Professional Defense</li>
              </ol>
              <a href={`mailto:${PRIMARY_EMAIL}?subject=Cognita%20Skills%20Lab%20Inquiry`} className="public-inline-link">Ask about the Skills Lab <ArrowRight size={16} /></a>
            </article>
          </div>

          <div className="public-foundation-note">
            <div><span>AI-00 FOUNDATION BRIDGE</span><h3>Foundation support is assigned, not sold as a generic program.</h3></div>
            <p>Where readiness evidence shows a need for stronger AI foundations, communication, English/grammar, comprehension, research, verification, digital literacy, or learning readiness, Cognita may recommend Foundation Required, Foundation Accelerated, or Direct Track Entry.</p>
          </div>
        </div>
      </section>

      <section className="section section--soft public-section" id="admissions">
        <div className="page-width">
          <div className="public-section-intro">
            <div><p className="section-label">ADMISSIONS</p><h2>Your journey begins before enrollment.</h2></div>
            <p>Admission is intentional because Cognita uses readiness evidence and human review before a learner enters a program.</p>
          </div>
          <div className="public-admissions-grid">
            {admissionsSteps.map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{body}</p></div>
              </article>
            ))}
          </div>
          <div className="public-admissions-cta">
            <div><Mail /><div><strong>Admissions and intake inquiries</strong><p>For current intake dates, approved fees, application assistance, or program questions, contact Cognita directly.</p></div></div>
            <a className="button" href={`mailto:${PRIMARY_EMAIL}?subject=Cognita%20Admissions%20Inquiry`}>Email Admissions</a>
          </div>
        </div>
      </section>

      <section className="section public-section" id="cee">
        <div className="page-width public-cee-grid">
          <div>
            <p className="section-label">COGNITA ENTRANCE EXAMINATION</p>
            <h2>The CEE is designed to understand learners accurately.</h2>
            <p className="public-lead-copy">It is not merely a barrier, a ceremonial quiz, or a system designed to catch people out. It gives Cognita evidence about communication readiness, AI foundations, research judgment, and applied reasoning before an admissions decision is made.</p>
            <div className="public-cee-note"><ShieldCheck /><p>Approved applicants receive invitation-only access. The current assessment model uses one persistent 70-minute session with integrity safeguards and human evaluation of applied work.</p></div>
          </div>
          <div className="public-cee-breakdown">
            <article><span>30</span><div><strong>Functional English & Communication</strong><p>Comprehension, clarity, instructions, and professional communication.</p></div></article>
            <article><span>25</span><div><strong>AI Foundations</strong><p>Core understanding of AI capabilities, limitations, and responsible use.</p></div></article>
            <article><span>15</span><div><strong>Research & Verification Judgment</strong><p>Evidence quality, cross-checking, source awareness, and false-confidence detection.</p></div></article>
            <article><span>30</span><div><strong>Applied Communication & AI Evaluation</strong><p>Human-reviewed applied tasks that test reasoning beyond multiple-choice scoring.</p></div></article>
          </div>
        </div>
      </section>

      <section className="section public-section public-learning-experience">
        <div className="page-width">
          <div className="section-heading section-heading--wide">
            <p className="section-label">HOW COGNITA WORKS</p>
            <h2>The public website explains the institution. Learning happens privately after enrollment.</h2>
          </div>
          <div className="public-experience-grid">
            <article><Clock3 /><span>01</span><h3>Flexible or guided delivery</h3><p>Learners follow either a structured cohort or a self-paced rhythm depending on the program and readiness recommendation.</p></article>
            <article><BookOpenCheck /><span>02</span><h3>Applied work</h3><p>Learning includes activities, practical outputs, assessment evidence, and work that can be reviewed and improved.</p></article>
            <article><UsersRound /><span>03</span><h3>Human feedback</h3><p>Where judgment matters, a facilitator or evaluator can require revision instead of treating one submission as automatically complete.</p></article>
            <article><GraduationCap /><span>04</span><h3>Competency-based completion</h3><p>Required outputs, capstone evidence, and institutional verification matter more than simply reaching the end of a lesson list.</p></article>
          </div>
        </div>
      </section>

      <section className="section section--soft public-section" id="training">
        <div className="page-width public-training-grid">
          <div>
            <p className="section-label">INSTITUTIONAL TRAINING</p>
            <h2>Structured AI learning for organizations and communities.</h2>
            <p>Cognita can discuss tailored cohort learning for schools, companies, LGUs, NGOs, professional organizations, and workforce or community-development partners.</p>
            <a className="button" href={`mailto:${PRIMARY_EMAIL}?subject=Cognita%20Institutional%20Training%20Inquiry`}>Discuss institutional training <ArrowRight size={18} /></a>
          </div>
          <div className="public-training-list">
            <article><Building2 /><div><strong>Organizations</strong><span>Private companies, teams, and professional groups</span></div></article>
            <article><GraduationCap /><div><strong>Education</strong><span>Schools, learning communities, and academic partners</span></div></article>
            <article><MapPinned /><div><strong>Public & community sector</strong><span>LGUs, NGOs, community groups, and development partners</span></div></article>
            <article><UsersRound /><div><strong>Customized cohorts</strong><span>Participant-focused structure while preserving Cognita’s academic and integrity standards</span></div></article>
          </div>
        </div>
      </section>

      <section className="section public-section" id="founder">
        <div className="page-width public-founder-grid">
          <div className="public-founder-monogram" aria-hidden="true">FMB</div>
          <div>
            <p className="section-label">FOUNDER</p>
            <h2>Francine Marie Bautista</h2>
            <p className="public-founder-role">Founder, Cognita Institute</p>
            <p>Francine Marie Bautista founded Cognita Institute with a clear objective: to create a more structured, practical, and accessible learning environment designed around the realities of Filipino learners.</p>
            <p>Her work across education, training, communications, creative strategy, and digital development informs Cognita’s focus on clear instruction, measurable progress, practical application, and respect for different learner starting points.</p>
            <blockquote>“Flexibility should not mean lowering standards. Learners should be given the structure and opportunity to progress while still being expected to demonstrate genuine understanding and capability.”</blockquote>
          </div>
        </div>
      </section>

      <section className="section section--soft public-section" id="faq">
        <div className="page-width">
          <div className="section-heading">
            <p className="section-label">FREQUENTLY ASKED QUESTIONS</p>
            <h2>What prospective learners should know.</h2>
          </div>
          <div className="public-faq-list">
            {faqs.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary><span>{question}</span><CircleHelp size={20} /></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section public-section" id="contact">
        <div className="page-width public-contact-panel">
          <div>
            <p className="section-label">CONTACT COGNITA</p>
            <h2>Questions before admission?</h2>
            <p>Contact Cognita for current program information, admissions assistance, intake availability, institutional training, or general inquiries.</p>
          </div>
          <div className="public-contact-emails">
            <a href={`mailto:${PRIMARY_EMAIL}`}><span>PRIMARY INSTITUTIONAL EMAIL</span><strong>{PRIMARY_EMAIL}</strong><Mail /></a>
            <a href={`mailto:${ALTERNATE_EMAIL}`}><span>ALTERNATE EMAIL</span><strong>{ALTERNATE_EMAIL}</strong><Mail /></a>
          </div>
        </div>
      </section>

      <section className="public-compliance-band">
        <div className="page-width">
          <ShieldCheck />
          <p><strong>Institutional transparency:</strong> Cognita is a private, non-degree training and learning institution. It does not claim CHED recognition, TESDA registration/accreditation, TESDA National Certificates or Certificates of Competency, PRC recognition/licensure, degree equivalency, or government approval unless a specific status has actually been obtained and is disclosed for the applicable offering. Final program fees, credential wording, and regulatory status are confirmed before enrollment.</p>
        </div>
      </section>
    </>
  )
}
