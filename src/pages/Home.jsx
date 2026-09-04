import {
  ArrowRight, BadgeCheck, BookOpenCheck, ClipboardCheck, GraduationCap,
  Landmark, Layers, ShieldCheck, Sparkles, UserCheck,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useHashScroll, useReveal } from '../lib/useReveal'
import { PROGRAMS, FOUNDATION_BRIDGE } from '../data/programs'

/**
 * The public institutional homepage.
 *
 * Copy follows docs/WEBSITE-CONTENT.md. The section order answers, in
 * sequence: what Cognita is, who it is for, why the approach differs, how
 * admission works, what learning routes exist, what happens after admission,
 * why the institution can be trusted, and what to do next.
 */

const ADMISSION_STEPS = [
  { step: 'Step 01', title: 'Submit your application', body: 'Complete the Cognita application form and provide the required applicant information. Your application allows Cognita to review your basic eligibility.' },
  { step: 'Step 02', title: 'Application review', body: 'Your application is reviewed by Admissions. Applicants who meet the initial requirements receive instructions through their registered email address.' },
  { step: 'Step 03', title: 'Receive your CEE access', body: 'Approved applicants receive access to the Cognita Entrance Examination by email. Access is intended only for you and must not be shared.' },
  { step: 'Step 04', title: 'Take the examination', body: 'Complete the CEE within the conditions provided. The examination helps Cognita assess your current readiness and foundational competencies.' },
  { step: 'Step 05', title: 'Receive your result and pathway', body: 'After evaluation, Cognita sends your admission result. Passing applicants may also receive an academic pathway recommendation based on readiness evidence.' },
  { step: 'Step 06', title: 'Choose your program', body: 'Successful applicants explore the programs currently available for enrollment. Cognita may recommend a guided or self-paced route.' },
  { step: 'Step 07', title: 'Complete enrollment', body: 'Proceed with the required enrollment and payment process. Enrollment is complete only after the required steps have been confirmed.' },
  { step: 'Step 08', title: 'Create your student account', body: 'After enrollment confirmation, you are instructed to create your Cognita student account.' },
  { step: 'Step 09', title: 'Enter the Learning App', body: 'Once your account is activated, you may access your lessons, activities, assessments, progress, and student resources.' },
]

const PRINCIPLES = [
  { icon: Layers, title: 'Understanding before automation', body: 'Learners should understand the task before asking AI to perform it.' },
  { icon: ShieldCheck, title: 'Evidence before confidence', body: 'Fluent output is not proof of truth. Claims, sources, and recommendations are verified when verification matters.' },
  { icon: ClipboardCheck, title: 'Practice before certification', body: 'Credentials represent demonstrated capability, not passive consumption.' },
  { icon: UserCheck, title: 'Human accountability', body: 'Learners remain responsible for decisions, submissions, communications, and consequences.' },
]

export default function Home() {
  useReveal()
  useHashScroll()
  const [guided, selfPaced] = PROGRAMS

  return (
    <>
      {/* 1 — What is Cognita */}
      <section className="hero hero--dark">
        <div className="page-width hero-grid">
          <div className="hero-copy">
            <span className="ci-hero-eyebrow">The Cognita Institute of Artificial Intelligence</span>
            <h1>Learn with structure. Advance with purpose.</h1>
            <p className="ci-hero-sub">
              Training designed for Filipino learners who want to build real knowledge, practical
              capability, and measurable progress.
            </p>
            <div className="hero-actions">
              <a className="button" href="#admission">View the Admission Process <ArrowRight size={18} /></a>
              <Link className="text-link" to="/programs">Explore Our Programs <ArrowRight size={16} /></Link>
            </div>
            <p className="ci-hero-principle">Admission is intentional. Learning is structured. Progress is earned.</p>
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

      {/* 2 — Who it is for */}
      <section className="section section--white" id="about">
        <div className="page-width split-layout ci-reveal">
          <div>
            <p className="section-label">About Cognita Institute</p>
            <h2>A private training and learning institution designed for Filipino learners.</h2>
          </div>
          <div className="prose-large">
            <p>
              We believe quality education should be structured, practical, accessible, and connected to the
              realities of the people it serves. Cognita develops learning experiences that help students
              strengthen foundational knowledge, build practical skills, and progress with greater confidence
              toward academic, professional, and personal goals.
            </p>
            <p>
              Our approach combines self-paced learning with structured assessments, clear progression
              standards, and appropriate human guidance. Students are expected to demonstrate understanding
              and competency, not simply complete lessons.
            </p>
            <p>
              Cognita is built around the needs of Filipino learners. This means considering different
              educational backgrounds, levels of English proficiency, access to technology, learning pace, and
              the practical demands students face outside the classroom.
            </p>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="section section--soft">
        <div className="page-width ci-reveal">
          <div className="section-heading">
            <p className="section-label">Mission and Vision</p>
            <h2>What the institution is for.</h2>
          </div>
          <div className="ci-statement-pair">
            <article className="ci-statement">
              <h3>Mission</h3>
              <p>
                Cognita Institute exists to provide Filipino learners with structured, accessible, and
                competency-based training that develops practical knowledge, strengthens foundational skills,
                and prepares them for meaningful academic, professional, and personal growth.
              </p>
              <p>
                We design learning experiences that combine flexibility with rigor, encourage genuine
                understanding, and recognize that learners begin from different educational, linguistic,
                technological, and socioeconomic circumstances.
              </p>
            </article>
            <article className="ci-statement">
              <h3>Vision</h3>
              <p>
                To become a trusted Filipino learning institution known for making high-quality, practical,
                and structured education more accessible, while helping learners develop the competence,
                confidence, and adaptability needed to succeed in a rapidly changing world.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 3 — Why the approach differs */}
      <section className="section section--white" id="approach">
        <div className="page-width ci-reveal">
          <div className="section-heading">
            <p className="section-label">Learning philosophy</p>
            <h2>Completing lessons is not the same as developing competence.</h2>
            <p>
              A learner does not earn a credential simply by opening lessons, watching videos, or meeting
              attendance requirements. Cognita learning is based on understanding, practice, assessment,
              output, revision, and demonstrated competence.
            </p>
          </div>
          <div className="ci-grid ci-grid--2">
            {PRINCIPLES.map(({ icon: Icon, title, body }) => (
              <article className="ci-card" key={title}>
                <Icon size={20} aria-hidden="true" style={{ color: 'var(--cognita-indigo)' }} />
                <h3 style={{ fontSize: '17px', margin: '12px 0 8px', color: 'var(--cognita-navy)' }}>{title}</h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--cognita-muted)' }}>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — How admission works */}
      <section className="section section--soft" id="admission">
        <div className="page-width ci-reveal">
          <div className="section-heading">
            <p className="section-label">View the admission process</p>
            <h2>Your study at Cognita begins with admission.</h2>
            <p>
              Cognita Institute follows a structured admission process designed to help ensure that applicants
              are ready for the learning experience and are placed appropriately before enrollment.
            </p>
          </div>

          <div className="ci-process">
            {ADMISSION_STEPS.map((item) => (
              <article className="ci-process-item" key={item.step}>
                <span className="ci-process-step">{item.step}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="ci-grid ci-grid--2" style={{ marginTop: 'clamp(28px, 4vw, 44px)' }}>
            <article className="ci-card">
              <p className="ci-card-title">Before you apply</p>
              <ul className="ci-route-list">
                <li>Provide complete and accurate information.</li>
                <li>Have access to a working email address.</li>
                <li>Have a suitable device and internet connection for the examination and online learning.</li>
                <li>Be prepared to follow Cognita’s academic-integrity and student policies.</li>
                <li>Understand that admission does not automatically guarantee completion or certification.</li>
              </ul>
            </article>
            <article className="ci-card ci-card--soft">
              <p className="ci-card-title">Ready to begin?</p>
              <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: 'var(--cognita-muted)', marginBottom: '20px' }}>
                Take the first step toward becoming a Cognita learner. Your application is reviewed by a person
                before any examination access is issued.
              </p>
              <div className="ci-row">
                <Link className="button" to="/apply">Begin Your Application <ArrowRight size={17} /></Link>
                <Link className="text-link" to="/programs">Explore Our Programs</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 5 — What learning routes exist */}
      <section className="section section--white" id="programs">
        <div className="page-width ci-reveal">
          <div className="section-heading">
            <p className="section-label">Two primary ways to learn</p>
            <h2>Guided when you need structure. Flexible when you need freedom.</h2>
            <p>
              Both routes use competency-based progression. Guided and self-paced learners may study
              differently, but the standard required to complete remains the same.
            </p>
          </div>

          <div className="ci-routes">
            <article className="ci-route">
              <span className="ci-route-code"><GraduationCap size={13} aria-hidden="true" /> {guided.code}</span>
              <h3>{guided.name}</h3>
              <p className="ci-route-meta">{guided.duration} · {guided.delivery}</p>
              <p>{guided.summary}</p>
              <dl className="ci-route-facts">
                <div><dt>Academic model</dt><dd>Foundation + 6-week specialization</dd></div>
                <div><dt>Completion</dt><dd>Demonstrated competency</dd></div>
              </dl>
              <Link className="text-link" to="/programs">View the 10-Week Program <ArrowRight size={16} /></Link>
            </article>

            <article className="ci-route">
              <span className="ci-route-code"><Sparkles size={13} aria-hidden="true" /> {selfPaced.code}</span>
              <h3>Cognita Skills Lab</h3>
              <p className="ci-route-meta">{selfPaced.duration} · {selfPaced.delivery}</p>
              <p>{selfPaced.summary}</p>
              <dl className="ci-route-facts">
                <div><dt>Core promise</dt><dd>{selfPaced.promise}</dd></div>
                <div><dt>Structure</dt><dd>Eight modules + capstone</dd></div>
              </dl>
              <Link className="text-link" to="/programs">View the Self-Paced Program <ArrowRight size={16} /></Link>
            </article>
          </div>

          <div className="ci-standard">
            <strong>The standard remains the same.</strong>
            <p>
              Progress is based on demonstrated learning, not simply time spent inside the platform. Required
              outputs, assessments, and competency checks apply to both routes.
            </p>
          </div>
        </div>
      </section>

      {/* 6 — What happens after admission */}
      <section className="section section--soft">
        <div className="page-width ci-reveal">
          <div className="ci-bridge">
            <div>
              <span className="ci-bridge-tag"><BookOpenCheck size={13} aria-hidden="true" /> Academic placement</span>
              <h3>{FOUNDATION_BRIDGE.name}</h3>
              <p>
                {FOUNDATION_BRIDGE.purpose} AI-00 is assigned through academic placement rather than offered as
                a normal public program choice, and it may be assigned in full or in targeted form.
              </p>
              <p style={{ marginTop: '14px' }}>
                It can cover AI foundations and responsible use, functional English and grammar, comprehension
                and instruction clarity, research and verification basics, digital literacy, and
                learning readiness.
              </p>
            </div>
            <div>
              <p className="ci-card-title">Pathway outcomes from readiness evidence</p>
              <div className="ci-pathways">
                <div className="ci-pathway">
                  <b>Foundation Required</b>
                  <span>The learner needs substantial foundational support before advanced specialization.</span>
                </div>
                <div className="ci-pathway">
                  <b>Foundation Accelerated</b>
                  <span>Partial readiness — selected foundation requirements rather than repeating mastered material.</span>
                </div>
                <div className="ci-pathway">
                  <b>Direct Track Entry</b>
                  <span>Sufficient foundational readiness to move directly into the applicable program structure.</span>
                </div>
              </div>
              <p className="mvp-note" style={{ marginTop: '14px' }}>
                Pathway recommendations follow evaluator review. Final academic thresholds remain subject to
                Cognita academic policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — Why the institution can be trusted */}
      <section className="section section--white" id="founder">
        <div className="page-width ci-founder ci-reveal">
          <div>
            <p className="section-label">Founder</p>
            <div className="ci-founder-id">
              <span className="ci-founder-name">Francine Marie Bautista</span>
              <span className="ci-founder-role">Founder, Cognita Institute</span>
            </div>
            <p style={{ marginTop: '20px', fontSize: '15.5px', lineHeight: 1.75, color: 'var(--cognita-muted)' }}>
              Her work across education, training, communications, creative strategy, and digital development
              has shaped Cognita’s approach to learning: clear instruction, measurable progress, practical
              application, and respect for the different circumstances from which learners begin.
            </p>
          </div>

          <div>
            <blockquote className="ci-founder-message">
              <p>
                Education has the power to change what becomes possible for a person, but access to learning
                alone is not enough. Learning must also be understandable, relevant, structured, and capable of
                producing real progress.
              </p>
              <p>
                Not every learner begins from the same place. Some need stronger foundations. Some need
                flexibility because they are working or carrying responsibilities outside school. Some have the
                ability to succeed but have not always had access to the right learning environment, guidance,
                or opportunities.
              </p>
              <p>
                We want to create an institution where learners can move at a reasonable pace without losing
                structure, where technology makes education more accessible without replacing human judgment,
                and where completing a course is not treated as the same thing as developing competence.
              </p>
              <p>
                My hope is that every learner who becomes part of Cognita leaves with more than a certificate.
                I want them to leave with stronger knowledge, greater confidence in what they can do, and
                capabilities they can genuinely use beyond the classroom.
              </p>
              <footer className="ci-founder-sign">
                <strong>Francine Marie Bautista</strong>
                Founder, Cognita Institute
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Institutional training */}
      <section className="section section--soft">
        <div className="page-width split-layout ci-reveal">
          <div>
            <p className="section-label">Institutional training</p>
            <h2>Structured cohort learning for organizations.</h2>
          </div>
          <div className="prose-large">
            <p>
              Cognita can develop structured cohort learning for schools, companies, LGUs, NGOs, professional
              organizations, and community-development partners.
            </p>
            <p>
              Institutional programs may be customized for participant needs while preserving Cognita’s
              academic-integrity and competency standards. Production institutional delivery may later include
              cohort scheduling, facilitator support, participant progress reporting, completion reporting, and
              verified credentials.
            </p>
          </div>
        </div>
      </section>

      {/* 8 — What to do next */}
      <section className="section section--white">
        <div className="page-width ci-reveal" style={{ textAlign: 'center', display: 'grid', justifyItems: 'center', gap: '20px' }}>
          <Landmark size={26} aria-hidden="true" style={{ color: 'var(--cognita-indigo)' }} />
          <h2 style={{ fontSize: 'clamp(26px, 3.4vw, 40px)', color: 'var(--cognita-navy)', maxWidth: '20ch' }}>
            Take the first step toward becoming a Cognita learner.
          </h2>
          <p style={{ maxWidth: '54ch', fontSize: '17px', lineHeight: 1.7, color: 'var(--cognita-muted)' }}>
            Browsing Cognita programs does not require enrollment. Enrollment requires successful completion of
            the Cognita admission process.
          </p>
          <div className="ci-row" style={{ justifyContent: 'center', marginTop: '6px' }}>
            <a className="button" href="#admission">View the Admission Process <ArrowRight size={18} /></a>
            <Link className="button button--ghost" to="/programs">Explore Our Programs</Link>
          </div>
          <p className="mvp-note" style={{ marginTop: '10px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <BadgeCheck size={14} aria-hidden="true" /> Admission is intentional. Learning is structured. Progress is earned.
          </p>
        </div>
      </section>
    </>
  )
}
