import { Link } from 'react-router-dom'
import { ArrowRight, BookOpenCheck, Building2, CheckCircle2, FileText, GraduationCap, Mail, Scale, SearchCheck, ShieldCheck, Sparkles, Target, UsersRound, Waypoints } from 'lucide-react'

const PRIMARY_EMAIL = 'info@thecognitainstitute.com'
const ALTERNATE_EMAIL = 'cognitainstituteofai@gmail.com'
const EFFECTIVE_DATE = 'September 9, 2026'

function PageIntro({ label, title, body, aside }) {
  return (
    <section className="info-hero">
      <div className="page-width info-hero__grid">
        <div>
          <p className="section-label">{label}</p>
          <h1>{title}</h1>
          <p>{body}</p>
        </div>
        {aside ? <aside className="info-hero__aside">{aside}</aside> : null}
      </div>
    </section>
  )
}

function PolicyMeta({ title }) {
  return (
    <div className="policy-meta">
      <div><span>Policy</span><strong>{title}</strong></div>
      <div><span>Version</span><strong>1.0</strong></div>
      <div><span>Effective</span><strong>{EFFECTIVE_DATE}</strong></div>
      <div><span>Institution</span><strong>The Cognita Institute of Artificial Intelligence</strong></div>
    </div>
  )
}

function ContactBand({ subject = 'Cognita Institute Inquiry', title = 'Need clarification?' }) {
  const href = `mailto:${PRIMARY_EMAIL}?cc=${ALTERNATE_EMAIL}&subject=${encodeURIComponent(subject)}`
  return (
    <section className="info-contact-band">
      <div className="page-width info-contact-band__inner">
        <div><span>CONTACT COGNITA</span><h2>{title}</h2><p>Official institutional correspondence should use the Cognita domain email.</p></div>
        <a className="button" href={href}><Mail size={17} /> {PRIMARY_EMAIL}</a>
      </div>
    </section>
  )
}

export function AboutCognita() {
  return (
    <>
      <PageIntro
        label="ABOUT COGNITA"
        title="A Filipino learning institution built for practical AI capability."
        body="The Cognita Institute of Artificial Intelligence is a private, non-degree training and learning institution designed for Filipino learners. Cognita combines structured instruction, flexible delivery, assessment, practical output, revision, and demonstrated competence."
        aside={<><span>Institutional principle</span><strong>Guided when you need structure. Flexible when you need freedom. The standard remains the same.</strong></>}
      />
      <section className="section info-page">
        <div className="page-width info-two-column">
          <article>
            <p className="section-label">IDENTITY</p>
            <h2>Human Intelligence. Amplified.</h2>
            <p>Cognita is not a generic video-course marketplace, certificate mill, attendance-only training provider, or tool-tutorial platform. Learning is organized around understanding, judgment, verification, practice, revision, and accountability.</p>
            <p>The public website explains Cognita, its programs, admissions, academic approach, policies, and institutional status. Enrolled learners study inside a separate private learning environment after admission and enrollment.</p>
          </article>
          <div className="info-values-grid">
            <article><Target /><h3>Mission</h3><p>Provide Filipino learners with structured, accessible, competency-based training that develops practical knowledge, strengthens foundational skills, and supports meaningful academic, professional, entrepreneurial, and personal growth.</p></article>
            <article><Waypoints /><h3>Vision</h3><p>Become a trusted Filipino learning institution known for making high-quality, practical, and structured education more accessible while strengthening learner competence, confidence, and adaptability.</p></article>
            <article><BookOpenCheck /><h3>Learning framework</h3><p><strong>THINK. APPLY. TRANSFORM.</strong> Learners understand the task, use AI deliberately, verify important outputs, and remain accountable for final work.</p></article>
            <article><ShieldCheck /><h3>Institutional standard</h3><p>Practice before certification. Evidence before confidence. Human accountability remains central even when AI is used throughout the learning process.</p></article>
          </div>
        </div>
      </section>
      <section className="section section--soft info-page">
        <div className="page-width">
          <div className="section-heading section-heading--wide"><p className="section-label">LEARNING PHILOSOPHY</p><h2>Durable capability over platform dependence.</h2></div>
          <div className="info-list-grid">
            <article><strong>Understanding before automation</strong><p>Define the task, purpose, constraints, and expected result before asking AI to perform work.</p></article>
            <article><strong>Judgment before speed</strong><p>Fast output is not useful when it is inaccurate, weak, generic, harmful, or strategically unsound.</p></article>
            <article><strong>Evidence before confidence</strong><p>Claims, quotations, calculations, and consequential recommendations are verified when verification matters.</p></article>
            <article><strong>Practice before certification</strong><p>Credentials represent demonstrated capability, not passive lesson consumption or attendance alone.</p></article>
            <article><strong>Human accountability</strong><p>Learners remain responsible for decisions, submissions, communications, and consequences.</p></article>
            <article><strong>Transferable capability</strong><p>Cognita teaches thinking and workflow skills that remain useful as individual AI products change.</p></article>
          </div>
        </div>
      </section>
      <ContactBand subject="About Cognita Inquiry" />
    </>
  )
}

export function Founder() {
  return (
    <>
      <PageIntro label="FOUNDER" title="Francine Marie Bautista" body="Founder of The Cognita Institute of Artificial Intelligence. Cognita is founder-led, but it is designed to operate as an institution rather than a personality-brand course platform." aside={<><span>Founder positioning</span><strong>Education, training, communications, creative strategy, and digital development inform Cognita’s approach to clear instruction and practical learning.</strong></>} />
      <section className="section info-page"><div className="page-width info-two-column">
        <article><h2>Why Cognita exists</h2><p>Francine Marie Bautista founded Cognita to create a more structured, practical, and accessible learning environment around the realities of Filipino learners. Her work in education, workforce training, communications, strategy, and digital development shapes Cognita’s emphasis on clarity, measurable progress, application, and respect for different learner starting points.</p><p>The institution is intended to grow beyond the founder through documented academic standards, consistent assessment, responsible governance, and systems that protect the integrity of learning and credentials.</p></article>
        <aside className="info-quote"><span>Founder’s message</span><blockquote>“Flexibility should not mean lowering standards. Learners should be given the structure and opportunity to progress while still being expected to demonstrate genuine understanding and capability.”</blockquote></aside>
      </div></section>
      <ContactBand subject="Cognita Founder and Institution Inquiry" />
    </>
  )
}

export function EntranceExamInfo() {
  const parts = [
    ['30', 'Functional English & Communication', 'Comprehension, clarity, instructions, and professional communication.'],
    ['25', 'AI Foundations', 'Core understanding of AI capabilities, limitations, and responsible use.'],
    ['15', 'Research & Verification Judgment', 'Evidence quality, cross-checking, source awareness, and false-confidence detection.'],
    ['30', 'Applied Communication & AI Evaluation', 'Human-reviewed applied tasks testing reasoning beyond objective items.'],
  ]
  return (
    <>
      <PageIntro label="COGNITA ENTRANCE EXAMINATION" title="The CEE is designed to understand readiness accurately." body="The Cognita Entrance Examination is an admissions and readiness instrument. It is not a ceremonial quiz and it is not publicly accessible without an admissions invitation." aside={<><span>Current assessment model</span><strong>100 points · 70 minutes · invitation only · human-reviewed final decision</strong></>} />
      <section className="section info-page"><div className="page-width">
        <div className="info-score-grid">{parts.map(([score, title, body]) => <article key={title}><span>{score}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
        <div className="info-two-column info-top-gap"><article><h2>How the decision works</h2><p>The first 70 points are objective evidence in the current model. The final 30 points come from applied responses that require evaluator review. Objective scoring alone is not the final admission decision.</p><p>Readiness evidence may support Foundation Required, Foundation Accelerated, targeted foundation support, or Direct Track Entry. Final production thresholds are established through Cognita’s approved academic policy and calibration process.</p></article><article><h2>Integrity safeguards</h2><ul className="info-bullets"><li>One invitation represents one assessment session.</li><li>The timer persists across refreshes.</li><li>Applicants accept an integrity acknowledgement before starting.</li><li>Window-leave, paste, or similar events may be logged as integrity signals.</li><li>Time expiry submits the current attempt for review.</li><li>Closed assessment work must represent the applicant’s own performance.</li></ul></article></div>
      </div></section>
      <ContactBand subject="Cognita Entrance Examination Inquiry" />
    </>
  )
}

export function Organizations() {
  const groups = [['Companies & teams', 'Applied AI capability, workflow design, communication, research, verification, and professional practice.'], ['Schools & learning communities', 'Structured learning programs that can support responsible AI use and practical digital capability.'], ['LGUs & public-sector institutions', 'Cohort training aligned to workforce, public-service, community, or digital-capability objectives.'], ['NGOs & development partners', 'Participant-focused learning for community, livelihood, workforce, or organizational development.']]
  return (
    <>
      <PageIntro label="FOR ORGANIZATIONS" title="Structured AI learning for teams, institutions, and communities." body="Cognita can discuss tailored cohort delivery for organizations while preserving its academic, assessment, integrity, and learner-support standards." aside={<><span>Institutional training</span><strong>Customized delivery does not mean diluted standards.</strong></>} />
      <section className="section info-page"><div className="page-width info-org-grid">{groups.map(([title, body]) => <article key={title}><Building2 /><h2>{title}</h2><p>{body}</p></article>)}</div></section>
      <section className="section section--soft info-page"><div className="page-width info-two-column"><article><h2>Possible delivery model</h2><p>Institutional engagements may include tailored cohort scheduling, facilitated sessions, project-based learning, participant progress reporting, completion reporting, and private institutional credentials when the applicable program and credential are approved for delivery.</p></article><article><h2>What Cognita does not promise</h2><p>Cognita does not promise guaranteed employment, government recognition, licensure, degree equivalency, or a specific business result. Any regulatory or credential status is disclosed specifically and verifiably.</p></article></div></section>
      <ContactBand subject="Cognita Institutional Training Inquiry" title="Discuss an institutional cohort." />
    </>
  )
}

export function ProfessionalProgram() {
  const weeks = ['Week 1 — AI Foundations, Responsibility, and Learner Purpose','Week 2 — Prompt Strategy, Problem Framing, and Verification','Week 3 — Research, Communication, and Digital Efficiency','Week 4 — Workflow Design, Tool Orientation, and Foundation Gate','Weeks 5–6 — Specialization Core and Revision','Week 7 — Applied Workflow and Professional Delivery','Week 8 — Portfolio Project and Evidence of Competence','Week 9 — Capstone Planning and Build','Week 10 — Capstone Completion, Defense, and Reflection']
  return (
    <><PageIntro label="FLAGSHIP GUIDED PROGRAM" title="Cognita Professional AI Program" body="A 10-week guided, cohort-based, mentor-supported program for learners who benefit from structure, deadlines, feedback, accountability, and a more intensive applied-learning environment." aside={<><span>Program format</span><strong>10 weeks · guided · cohort-based · mentor-supported</strong></>} />
      <section className="section info-page"><div className="page-width info-two-column"><article><h2>Program architecture</h2><p>The academic base combines up to four weeks of foundation and readiness development, adjusted through CEE evidence where applicable, followed by specialization, applied workflow development, portfolio evidence, and a capstone.</p><h3>Initial specialization tracks</h3><ul className="info-bullets"><li>AI for Students</li><li>AI for Creatives</li><li>AI for Entrepreneurs</li><li>AI for Professionals & Virtual Assistants</li></ul></article><article><h2>What completion requires</h2><ul className="info-bullets"><li>Structured weekly progression</li><li>Required applied outputs</li><li>Facilitator or evaluator review</li><li>Revision where work does not yet meet standard</li><li>Portfolio evidence</li><li>Capstone project and professional defense</li><li>Competency-based completion decision</li></ul></article></div></section>
      <section className="section section--soft info-page"><div className="page-width"><div className="section-heading"><p className="section-label">LEARNING SEQUENCE</p><h2>Ten weeks from foundation to defended work.</h2></div><div className="info-sequence">{weeks.map((week, i) => <article key={week}><span>{String(i+1).padStart(2,'0')}</span><strong>{week}</strong></article>)}</div></div></section>
      <ContactBand subject="Cognita Professional AI Program Inquiry" />
    </>
  )
}

export function SkillsLabProgram() {
  const modules = ['AI Foundations and Reality Check','Problem Framing and Strategic Thinking','Prompt Design and Instruction Quality','Research, Verification, and Evidence','AI-Assisted Professional Workflows','Communication, Creativity, and Quality Control','Ethics, Privacy, Bias, and Intellectual Property','Capstone Development and Professional Defense']
  return (
    <><PageIntro label="SELF-PACED PROGRAM" title="Cognita Skills Lab" body="Applied AI Foundations and Professional Practice is a self-paced, project-based, assessment-driven program for independent learners who need control over study timing without lowering the completion standard." aside={<><span>Recommended rhythm</span><strong>28 days · 32–40 estimated learning hours · eight modules</strong></>} />
      <section className="section info-page"><div className="page-width info-two-column"><article><h2>Learn it. Build it. Prove it.</h2><p>The 28-day structure is a recommended learning rhythm, not a hard deadline. Learners may move faster or slower, pause, resume, repeat lessons, and resubmit selected work where permitted.</p><p>The credential remains locked until required evidence, assessments, capstone work, and completion requirements are satisfied.</p></article><div className="info-module-list">{modules.map((m,i) => <div key={m}><span>{i+1}</span><strong>{m}</strong></div>)}</div></div></section>
      <ContactBand subject="Cognita Skills Lab Inquiry" />
    </>
  )
}

export function InstitutionalStatus() {
  return (
    <><PageIntro label="INSTITUTIONAL STATUS" title="Clear about what Cognita is — and what it is not." body="Cognita is a private, non-degree training and learning institution. Public claims are intentionally conservative so prospective learners can distinguish private institutional training from government-recognized qualifications." aside={<><span>Transparency rule</span><strong>No recognition, accreditation, certification, licensure, or equivalency claim is made unless it has actually been obtained and can be independently verified.</strong></>} />
      <section className="section info-page"><div className="page-width info-status-grid"><article><CheckCircle2 /><h2>Cognita is</h2><ul><li>A private training and learning institution</li><li>Focused on applied artificial intelligence</li><li>Designed for Filipino learners</li><li>Competency-based in learning and completion</li><li>Authorized to describe its own private institutional programs and credentials accurately</li></ul></article><article><Scale /><h2>Cognita does not currently claim</h2><ul><li>CHED recognition as a college or university</li><li>Degree-granting authority</li><li>TESDA registration or accreditation unless specifically obtained for an offering</li><li>TESDA National Certificates or Certificates of Competency</li><li>PRC recognition or licensure qualification</li><li>Government qualification-level or academic-credit equivalency</li></ul></article></div></section>
      <section className="section section--soft info-page"><div className="page-width"><h2>Program-specific disclosure</h2><p>Before enrollment, Cognita discloses the applicable program’s current regulatory status, credential type, approved fees, commercial terms, and any external recognition that has actually been obtained. If an external status does not exist, Cognita does not imply that it does.</p></div></section>
      <ContactBand subject="Cognita Institutional Status Inquiry" />
    </>
  )
}

export function PoliciesIndex() {
  const items = [
    ['/privacy','Privacy Policy','How Cognita handles personal information and the current frontend-only website boundary.'],
    ['/terms','Terms of Use','Rules governing use of Cognita’s public website and institutional information.'],
    ['/academic-integrity','Academic Integrity & AI Use','How Cognita distinguishes responsible AI-assisted learning from outsourcing learner competence.'],
    ['/student-policies','Student Policies','Conduct, assessment, support, accessibility, credentials, complaints, and related learner rules.'],
    ['/institutional-status','Institutional Status','What Cognita is and what recognition or qualification claims it does not make.'],
  ]
  return (
    <><PageIntro label="PUBLIC POLICIES" title="Institutional information should be easy to verify." body="These pages describe Cognita’s current public rules and transparency commitments. Commercial terms that depend on a specific intake are disclosed before enrollment." aside={<><span>Policy version</span><strong>Public suite v1.0 · effective {EFFECTIVE_DATE}</strong></>} />
      <section className="section info-page"><div className="page-width policy-index">{items.map(([to,title,body]) => <Link to={to} key={to}><FileText /><div><h2>{title}</h2><p>{body}</p></div><ArrowRight /></Link>)}</div></section></>
  )
}

export function PrivacyPolicy() {
  return (
    <><PageIntro label="PRIVACY POLICY" title="Privacy is part of the learning system, not an afterthought." body="This policy explains Cognita’s public privacy position. The current website remains frontend-only and does not yet operate the production student-record, payment, authentication, or admissions database." />
      <section className="section info-page"><div className="page-width policy-document"><PolicyMeta title="Privacy Policy" />
        <h2>1. Scope</h2><p>This policy applies to Cognita’s public website, public inquiries, and institutional communications. Separate or additional notices may apply when production admissions, enrollment, payment, student records, assessment systems, or learning services become active.</p>
        <h2>2. Information Cognita may receive</h2><p>Depending on how you contact or interact with Cognita, information may include your name, email address, contact details, inquiry content, program interest, institutional affiliation, and information voluntarily supplied in correspondence. Cognita should collect only information reasonably necessary for the declared purpose.</p>
        <h2>3. Current website boundary</h2><p>The current public website does not operate a production admissions database, cloud learner record, live payment processor, server authentication system, or credential registry. Browser-local simulation data used during product development is not represented as a real institutional record.</p>
        <h2>4. Purpose of use</h2><p>Information may be used to answer inquiries, communicate current program or intake information, support legitimate institutional administration, prepare future enrollment where explicitly requested, protect institutional systems, comply with legal obligations, and resolve disputes or requests.</p>
        <h2>5. Data minimization and sensitive information</h2><p>Cognita avoids collecting unnecessary personal data and does not use facial recognition or other high-risk biometric processing merely for convenience. Applicants and learners should not send passwords, one-time passwords, financial credentials, or unrelated sensitive records by email.</p>
        <h2>6. Sharing</h2><p>Cognita does not sell personal information. Information may be shared only with service providers, professional advisers, authorized institutional personnel, or authorities where reasonably necessary, contractually appropriate, or legally required.</p>
        <h2>7. Retention</h2><p>Records are retained only for as long as reasonably necessary for the purpose for which they were collected, legitimate institutional administration, legal obligations, dispute handling, or credential verification where applicable. Retention periods will become more specific when production admissions and student-record systems are activated.</p>
        <h2>8. Security</h2><p>Cognita uses proportionate organizational and technical safeguards appropriate to the systems in operation. No online system is perfectly secure, so production student systems will require a separate security and privacy-readiness review before real intake.</p>
        <h2>9. Rights and requests</h2><p>Individuals may contact Cognita to ask about personal information, request correction, raise a privacy concern, or exercise applicable rights under Philippine data-protection law, subject to identity verification and lawful exceptions.</p>
        <h2>10. Contact</h2><p>Privacy requests may be sent to <a href={`mailto:${PRIMARY_EMAIL}?subject=Cognita%20Privacy%20Request`}>{PRIMARY_EMAIL}</a>.</p>
      </div></section></>
  )
}

export function TermsOfUse() {
  return (
    <><PageIntro label="TERMS OF USE" title="Terms for Cognita’s public website and information." body="These terms govern use of the public Cognita website. Enrollment-specific terms are provided separately before a learner commits to a program or payment." />
      <section className="section info-page"><div className="page-width policy-document"><PolicyMeta title="Terms of Use" />
        <h2>1. Public information service</h2><p>The website provides institutional, program, admissions, academic, policy, and contact information. Website content does not itself create admission, enrollment, student status, a payment obligation, a credential entitlement, or an employment guarantee.</p>
        <h2>2. Accuracy and current status</h2><p>Cognita aims to keep public information accurate and clearly distinguishes current approved information from future, intake-specific, or externally regulated matters. Fees, schedules, available seats, credential wording, and regulatory status may be confirmed separately for a specific intake before enrollment.</p>
        <h2>3. Acceptable use</h2><p>Users must not interfere with the site, attempt unauthorized access, misuse exam or private links, impersonate another person, scrape protected learner information, introduce malicious code, or use Cognita systems for unlawful activity.</p>
        <h2>4. Intellectual property</h2><p>Cognita’s name, logos, brand assets, original website content, curriculum materials, assessment materials, and institutional documents are protected by applicable rights. Public access does not grant permission to copy, sell, impersonate, or redistribute protected materials beyond lawful use.</p>
        <h2>5. External services</h2><p>Where the website links to email, communication, payment, video, learning, or other third-party services, those providers may apply their own terms and privacy practices.</p>
        <h2>6. No false credential or status claims</h2><p>Users must not represent themselves as enrolled, admitted, certified, employed, authorized, or officially affiliated with Cognita when that status has not been granted.</p>
        <h2>7. Changes</h2><p>Cognita may update public terms as its production systems and programs mature. Material enrollment obligations are not silently imposed through a website edit after a learner has entered a separate enrollment agreement.</p>
        <h2>8. Contact</h2><p>Questions about these terms may be sent to <a href={`mailto:${PRIMARY_EMAIL}?subject=Cognita%20Terms%20Inquiry`}>{PRIMARY_EMAIL}</a>.</p>
      </div></section></>
  )
}

export function AcademicIntegrityPolicy() {
  return (
    <><PageIntro label="ACADEMIC INTEGRITY & AI USE" title="Cognita teaches AI without outsourcing the learner’s competence to AI." body="AI can support learning, research, drafting, analysis, creativity, and workflow design. The learner must still understand, verify, revise, explain, and defend required work." />
      <section className="section info-page"><div className="page-width policy-document"><PolicyMeta title="Academic Integrity & AI Use Policy" />
        <h2>1. Core rule</h2><p>AI assistance is acceptable when the assignment permits it and the learner remains responsible for the final work. AI may not be used to impersonate independent competence in an assessment that requires unaided performance.</p>
        <h2>2. Commonly acceptable assistance</h2><ul><li>Spellcheck, grammar correction, formatting, accessibility tools, and approved transcription where these are not the skill being tested.</li><li>Brainstorming, outlining, prompt testing, research planning, draft generation, code skeletons, visual ideation, workflow design, and analysis assistance where the assignment permits such use.</li></ul>
        <h2>3. Disclosure</h2><p>When required, learners must identify tools used, tasks supported by AI, work completed independently, meaningful revisions, facts independently verified, sensitive-data precautions, and the final human decision owner.</p>
        <h2>4. Prohibited use</h2><ul><li>AI assistance during the CEE unless an instruction explicitly permits it.</li><li>Unauthorized AI use during closed-book or supervised competency checks.</li><li>Submitting AI-produced work the learner cannot explain, verify, revise, or defend.</li><li>Fabricated sources, data, quotations, records, or evidence.</li><li>Impersonation, account sharing, collusion where independent work is required, or evasion of integrity controls.</li></ul>
        <h2>5. Capstones</h2><p>AI is not automatically prohibited in Cognita capstones. Appropriate AI use may be central to the work, but use must follow the brief, claims must be verified, sensitive information must be protected, and the learner must make and defend final decisions.</p>
        <h2>6. Fair process</h2><p>Integrity concerns should be documented and reviewed proportionately. Serious allegations should include notice of the concern, relevant evidence, an opportunity to respond, a written outcome, and an appropriate review route.</p>
      </div></section></>
  )
}

export function StudentPolicies() {
  return (
    <><PageIntro label="STUDENT POLICIES" title="Learning standards, support, conduct, and completion rules." body="This page summarizes Cognita’s public learner policy framework. Intake-specific commercial terms are disclosed before enrollment, and the application backend remains outside the current public launch scope." />
      <section className="section info-page"><div className="page-width policy-document"><PolicyMeta title="Student Policies" />
        <h2>1. Conduct</h2><p>Students must not harass, threaten, discriminate against, abuse, impersonate, falsify records, share protected accounts or exam invitations, misuse personal or confidential information, or disrupt learning and assessment systems.</p>
        <h2>2. Competency-based progression</h2><p>Attendance or opening lessons does not by itself establish completion. Cognita may use quizzes, applied exercises, research and verification tasks, professional outputs, revision assignments, track projects, capstones, defenses, and final competency checks.</p>
        <h2>3. Remediation and revision</h2><p>Where work does not yet meet standard, Cognita may require targeted review, evaluator feedback, resubmission, alternate practice, additional verification work, or other academically appropriate remediation.</p>
        <h2>4. Guided attendance</h2><p>Required live participation may form part of the guided program. Attendance supports learning but is not proof of competence. Reasonable treatment of illness, emergencies, accessibility needs, work emergencies, and connectivity disruption should be built into guided-cohort administration.</p>
        <h2>5. Accessibility and reasonable accommodation</h2><p>Cognita aims to provide reasonable accommodation where feasible, including accessible formats, captioning or transcripts, scheduling adjustments, assistive technology compatibility, and valid alternative assessment methods where appropriate. Disability alone is not a basis for denial.</p>
        <h2>6. Student work and intellectual property</h2><p>Students retain ownership of their original work subject to applicable third-party rights. Cognita may showcase identifiable student work only with appropriate permission, license, or another lawful basis clearly disclosed in advance.</p>
        <h2>7. Credentials</h2><p>Cognita issues private institutional credentials for learners who satisfy the approved requirements of the named program. A credential does not imply a CHED degree, TESDA National Certificate, TESDA Certificate of Competency, PRC license, academic-credit equivalency, or government qualification unless explicitly stated and independently verifiable.</p>
        <h2>8. Appeals and complaints</h2><p>Assessment appeals may address calculation error, rubric misapplication, overlooked submitted evidence, or procedural irregularity. Administrative complaints may cover enrollment, service, records, support, or commercial concerns. Learners should receive a documented route to raise concerns and receive a written outcome.</p>
        <h2>9. Fees, withdrawal, and refunds</h2><p>Public fees and intake-specific payment terms are released only after they are approved for the applicable offering. Before any real payment is collected, Cognita will disclose the applicable withdrawal, cancellation, refund, and non-delivery terms. The current public website does not process live tuition payments.</p>
        <h2>10. Records and verification</h2><p>Production records may include admissions decisions, CEE evidence, enrollment, learning progress, assessments, revisions, completion decisions, credentials, and necessary support or appeal records. Public credential verification, when introduced, should disclose only the minimum information necessary to verify the credential.</p>
        <h2>11. Support</h2><p>Students and applicants should use official Cognita communication channels for access concerns, academic questions, complaints, accommodation requests, or administrative support.</p>
      </div></section>
      <ContactBand subject="Cognita Student Policy Inquiry" />
    </>
  )
}
