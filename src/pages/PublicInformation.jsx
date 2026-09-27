import { Link } from 'react-router-dom'
import { ArrowRight, BookOpenCheck, Building2, CheckCircle2, FileText, GraduationCap, Mail, Scale, SearchCheck, ShieldCheck, Sparkles, Target, UsersRound, Waypoints } from 'lucide-react'

const PRIMARY_EMAIL = 'info@thecognitainstitute.com'
const ALTERNATE_EMAIL = 'cognitainstituteofai@gmail.com'
const EFFECTIVE_DATE = 'September 28, 2026'

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
            <p>The public website explains Cognita, the CEE, learning paths, policies, and institutional status. Enrolled learners study inside a separate private learning environment after completing the applicable CEE, enrollment, and secure account requirements.</p>
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
    ['01', 'Competency Diagnostic', 'What you currently understand and can actually do across AI literacy, applied use, verification, research, workflow reasoning, privacy, and professional judgment.'],
    ['02', 'Technical Readiness', 'Digital fluency, computational thinking, programming readiness, systems reasoning, and readiness for deeper technical pathways.'],
    ['03', 'Learner Readiness & Support', 'Non-clinical educational indicators such as study consistency, accountability needs, confidence calibration, and preferred participation style.'],
    ['04', 'Goals & Constraints', 'Your target outcome, specialization interest, study time, device and connectivity realities, schedule, language, and relevant prior experience.'],
  ]
  return (
    <>
      <PageIntro
        label="COGNITA ENTRY & COMPETENCY EVALUATION"
        title="The CEE tells Cognita what you actually need next."
        body="The CEE, academically coded AI-00, is Cognita’s diagnostic, routing, personalization, and recommendation engine. It is designed to identify strengths, gaps, appropriate depth, learning-support needs, and the most suitable Cognita pathway."
        aside={<><span>Core principle</span><strong>Assess first. Recommend second. Enroll third.</strong></>}
      />
      <section className="section info-page"><div className="page-width">
        <div className="info-score-grid">{parts.map(([score, title, body]) => <article key={title}><span>{score}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
        <div className="info-two-column info-top-gap">
          <article>
            <h2>What your result can influence</h2>
            <p>Your CEE profile can influence your starting level, competencies to study, competencies you may skip, remediation, specialization, recommended Self-Paced or Guided mode, support intensity, and the Cognita paid offering recommended to you.</p>
            <p>The result should be presented as a profile with an understandable rationale, not merely one total score.</p>
          </article>
          <article>
            <h2>Learner readiness is non-clinical</h2>
            <p>The Learner Readiness & Support Profile is designed only to improve educational routing and support. It is not a psychological examination, mental-health assessment, medical diagnosis, or clinical fitness determination.</p>
            <p>Before a production CEE begins, Cognita should clearly disclose how profiling and automated or partially automated recommendations are used and provide a route to request review of a materially incorrect recommendation.</p>
          </article>
        </div>
      </div></section>
      <ContactBand subject="Cognita CEE Inquiry" />
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
    <>
      <PageIntro
        label="PRIVACY NOTICE"
        title="Privacy is part of Cognita’s product design."
        body="This public notice summarizes Cognita’s privacy position during the current frontend-only phase and the controls required before production account, CEE, profiling, payment, and learner-record systems go live."
      />
      <section className="section info-page"><div className="page-width policy-document"><PolicyMeta title="Privacy Notice" />
        <h2>1. Scope</h2><p>This notice applies to Cognita’s public website, inquiries, account and CEE systems when activated, learning services, credential records, and institutional communications.</p>
        <h2>2. Information Cognita may process</h2><p>Depending on the service, information may include identity and contact details, age eligibility, education and professional background, CEE answers and scores, competency and technical-readiness indicators, Learner Readiness & Support responses, goals and practical constraints, learning activity, submissions, feedback, transaction references, credential records, support communications, and proportionate technical/security logs.</p>
        <h2>3. CEE profiling</h2><p>CEE may use automated or partially automated processing to compare assessment evidence and learner information with competency standards, prerequisites, pathway rules, learning-mode criteria, and available Cognita offerings. This may influence starting level, remediation, specialization, Self-Paced or Guided recommendation, support intensity, and the paid offer shown to the learner.</p>
        <h2>4. Non-clinical readiness data</h2><p>The Learner Readiness & Support Profile is educational and non-clinical. Cognita does not intend it to diagnose mental illness, psychiatric condition, personality disorder, psychological disorder, cognitive disability, medical condition, or clinical fitness.</p>
        <h2>5. Purpose limitation</h2><p>Personal data should be used only for identified purposes such as account administration, CEE, pathway generation, training delivery, mastery assessment, credential verification, support, security, legal compliance, product improvement, and marketing where a separate lawful basis exists.</p>
        <h2>6. Human review</h2><p>Production users should have an accessible route to question a materially incorrect CEE recommendation and request review where appropriate.</p>
        <h2>7. Service providers</h2><p>Cognita may use appropriately governed providers for hosting, authentication, payments, email, analytics, AI processing, security, support, and learning infrastructure. Data minimization and appropriate contractual safeguards should apply.</p>
        <h2>8. No sale of learner data</h2><p>Cognita does not treat learner personal data as a commodity for sale to unrelated advertisers.</p>
        <h2>9. Retention and security</h2><p>Production retention periods, access controls, incident response, logging, vendor review, and data-deletion rules must be finalized before live enrollment. Data should be retained only for as long as justified by the purpose, legal obligations, dispute handling, security, or credential verification.</p>
        <h2>10. Rights and contact</h2><p>Individuals may exercise applicable rights under Philippine data-protection law, subject to lawful exceptions and identity verification. Privacy inquiries may be sent to <a href={`mailto:${PRIMARY_EMAIL}?subject=Cognita%20Privacy%20Request`}>{PRIMARY_EMAIL}</a> until the final DPO/privacy contact is published.</p>
      </div></section>
    </>
  )
}

export function TermsOfUse() {
  return (
    <>
      <PageIntro
        label="TERMS OF USE"
        title="Clear terms for Cognita’s public and future learning services."
        body="These public terms summarize the current website rules. Before any paid production service begins, Cognita must present the applicable enrollment, price, billing, access, refund, profiling, and privacy terms for affirmative acceptance."
      />
      <section className="section info-page"><div className="page-width policy-document"><PolicyMeta title="Terms of Use" />
        <h2>1. Nature of service</h2><p>Cognita is a private, non-degree professional training and competency-development provider. Unless expressly stated otherwise for a specific authorized offering, Cognita does not represent its private training as a degree, professional license, or government-issued qualification.</p>
        <h2>2. CEE and recommendations</h2><p>The CEE may generate a personalized competency profile, identify gaps, recommend learning depth and specialization, recommend Self-Paced or Guided learning, and suggest an appropriate Cognita paid offering. A recommendation does not obligate a user to purchase.</p>
        <h2>3. No guaranteed outcomes</h2><p>Cognita does not guarantee employment, salary, promotion, clients, business revenue, professional appointment, licensure, third-party recognition, or a particular assessment result.</p>
        <h2>4. Pricing and checkout</h2><p>Before payment, the production service should disclose the product, price, billing cadence, access period, material limitations, and applicable refund/cancellation terms. Recurring billing requires separate explicit authorization.</p>
        <h2>5. Intellectual property</h2><p>Cognita retains rights in its assessments, question banks, scoring and routing logic, competency frameworks, instructional materials, software, brand assets, rubrics, and credential formats. Learners retain original work unless a separate written agreement states otherwise.</p>
        <h2>6. Learner work commercialization</h2><p>Ordinary enrollment does not automatically authorize Cognita to sell or commercially exploit learner-owned work. Commercialization requires a separate written agreement covering the relevant rights and compensation terms.</p>
        <h2>7. Acceptable use</h2><p>Users must not attempt unauthorized access, manipulate assessments, impersonate others, distribute protected assessment material, introduce malicious code, interfere with services, or unlawfully copy Cognita content.</p>
        <h2>8. Current frontend boundary</h2><p>The present repository is frontend-only. Public screens must not imply that secure production account registration, CEE submission, payment, cloud records, or credential issuance are live until the required backend and compliance controls exist.</p>
        <h2>9. Contact</h2><p>Questions may be sent to <a href={`mailto:${PRIMARY_EMAIL}?subject=Cognita%20Terms%20Inquiry`}>{PRIMARY_EMAIL}</a>.</p>
      </div></section>
    </>
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
    <>
      <PageIntro label="LEARNER POLICIES" title="Standards for learning, evidence, support, and conduct." body="Cognita is competency-based. The learner’s personalized path may differ, but required evidence and integrity standards remain defensible." />
      <section className="section info-page"><div className="page-width policy-document"><PolicyMeta title="Learner Policies" />
        <h2>1. Conduct</h2><p>Learners must not harass, threaten, impersonate, falsify records, share protected accounts, misuse personal or confidential information, manipulate assessments, or disrupt Cognita systems.</p>
        <h2>2. Competency-based progression</h2><p>Opening lessons, attendance, or time spent in the platform does not by itself establish competence. Cognita may require practical tasks, projects, scenario assessments, demonstrations, revisions, remediation, retesting, and capstone evidence.</p>
        <h2>3. Personalized progression</h2><p>CEE evidence may allow a learner to skip competencies already demonstrated or may require targeted foundation/remediation where gaps are identified.</p>
        <h2>4. AI use</h2><p>AI is not automatically prohibited. Each assessment defines what assistance is permitted. Learners may be required to explain, defend, or reproduce submitted work to demonstrate actual understanding.</p>
        <h2>5. Learner work and intellectual property</h2><p>Learners retain ownership of original work subject to third-party rights. Public portfolio use, testimonials, and commercialization should use the appropriate separate permission or agreement where required.</p>
        <h2>6. Credentials</h2><p>Cognita credentials summarize demonstrated competency within Cognita’s private training system. They do not imply CHED degree status, TESDA National Certificate or Certificate of Competency, PRC licensure, academic-credit equivalency, or other government qualification unless explicitly stated and independently verifiable.</p>
        <h2>7. Complaints and recommendation review</h2><p>Learners should have documented routes for learning concerns, billing or service complaints, privacy requests, and review of materially incorrect CEE recommendations.</p>
        <h2>8. Fees and refunds</h2><p>Before any real payment is collected, Cognita must disclose the approved price, billing cadence, access period, withdrawal/cancellation conditions, and applicable refund terms.</p>
      </div></section>
      <ContactBand subject="Cognita Learner Policy Inquiry" />
    </>
  )
}

