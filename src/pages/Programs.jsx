import { ArrowRight, BookOpenCheck, CheckCircle2, GraduationCap, Lock, Mail, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { FOUNDATION_BRIDGE } from '../data/programs'
import { getApplication, getEnrollment, PROGRAMS, selectProgram } from '../lib/admissions'

const PRIMARY_EMAIL = 'info@thecognitainstitute.com'
const ALTERNATE_EMAIL = 'cognitainstituteofai@gmail.com'

const icons = {
  'professional-ai-program': GraduationCap,
  'skills-lab': Sparkles,
}

const details = {
  'professional-ai-program': {
    intended: 'Learners who benefit from structure, deadlines, live guidance, human feedback, cohort accountability, and an intensive applied-learning environment.',
    structure: [
      'Foundation layer of up to four weeks, adjusted through CEE readiness evidence',
      'Six-week specialization and capstone progression',
      'Structured weekly progression with applied deliverables',
      'Human review and revision where work does not yet meet standard',
      'Portfolio evidence and a competency-based completion decision',
    ],
  },
  'skills-lab': {
    intended: 'Independent learners who need greater control over when and how they study without lowering the academic standard required to complete the program.',
    structure: [
      'Eight-module core covering foundations through capstone',
      'Recommended 28-day rhythm and approximately 32–40 learning hours',
      'Pause, resume, repeat lessons, and resubmit selected exercises',
      'Required outputs and assessment standards must still be satisfied',
    ],
  },
}

export default function Programs() {
  const navigate = useNavigate()
  const application = getApplication()
  const enrollment = getEnrollment()
  const canSelect = application?.ceeDecision?.status === 'passed'

  const choose = (programId) => {
    if (!canSelect) return
    selectProgram(programId)
    navigate('/payment')
  }

  return (
    <>
      <section className="programs-public-hero">
        <div className="page-width programs-public-hero__inner">
          <div>
            <p className="section-label">COGNITA PROGRAMS</p>
            <h1>Learning designed for Filipino learners.</h1>
            <p>Cognita develops structured training programs that combine clear standards, guided progression, assessment, practical outputs, and measurable learning outcomes.</p>
          </div>
          <aside>
            <span>Institutional principle</span>
            <strong>Guided when you need structure. Flexible when you need freedom. The standard remains the same.</strong>
          </aside>
        </div>
      </section>

      <section className="section public-programs-page">
        <div className="page-width">
          <div className="public-programs-notice">
            <BookOpenCheck size={20} />
            <div>
              <strong>Program information is public.</strong>
              <p>You may review Cognita’s current learning routes before applying. Program selection and enrollment open only after a passing admission decision.</p>
            </div>
          </div>

          <div className="public-programs-list">
            {PROGRAMS.map((program) => {
              const Icon = icons[program.id] || BookOpenCheck
              const detail = details[program.id]
              const selected = enrollment?.programId === program.id

              return (
                <article className="public-program-detail" key={program.id}>
                  <div className="public-program-detail__heading">
                    <Icon />
                    <div>
                      <span>{program.code}</span>
                      <h2>{program.name}</h2>
                      <p>{program.duration} · {program.delivery}</p>
                    </div>
                  </div>

                  <div className="public-program-detail__body">
                    <div>
                      <h3>Who it is for</h3>
                      <p>{detail.intended}</p>
                    </div>
                    <div>
                      <h3>How it works</h3>
                      <ul>{detail.structure.map((item) => <li key={item}>{item}</li>)}</ul>
                    </div>
                    {program.specializations ? (
                      <div>
                        <h3>Initial specialization tracks</h3>
                        <ul>{program.specializations.map((item) => <li key={item}>{item}</li>)}</ul>
                      </div>
                    ) : null}
                    {program.modules ? (
                      <div>
                        <h3>Eight-module core</h3>
                        <ol>{program.modules.map((item) => <li key={item}>{item}</li>)}</ol>
                      </div>
                    ) : null}
                  </div>

                  <div className="public-program-detail__footer">
                    {canSelect ? (
                      <button className="button" type="button" onClick={() => choose(program.id)}>
                        <CheckCircle2 size={17} /> {selected ? 'Continue with this program' : 'Choose this program'}
                      </button>
                    ) : (
                      <div className="public-program-detail__locked"><Lock size={16} /><span>Selection opens after a passing admission decision.</span></div>
                    )}
                    <a className="public-inline-link" href={`mailto:${PRIMARY_EMAIL}?cc=${ALTERNATE_EMAIL}&subject=${encodeURIComponent(`${program.name} Inquiry`)}`}>
                      <Mail size={16} /> Ask Cognita about this program
                    </a>
                  </div>
                </article>
              )
            })}
          </div>

          <section className="public-foundation-detail">
            <div>
              <p className="section-label">AI-00 FOUNDATION BRIDGE</p>
              <h2>{FOUNDATION_BRIDGE.name}</h2>
              <p>AI-00 is Cognita’s foundational support pathway for learners who need additional preparation before or alongside a selected route. It is assigned through academic placement rather than sold as a generic public program.</p>
            </div>
            <div>
              <h3>Areas of support</h3>
              <ul>{FOUNDATION_BRIDGE.areas.map((area) => <li key={area}>{area}</li>)}</ul>
            </div>
          </section>

          <div className="public-programs-contact">
            <div>
              <p className="section-label">PROGRAM AND INTAKE INQUIRIES</p>
              <h2>Need current fees, intake dates, or help choosing a route?</h2>
              <p>Until the production enrollment backend is connected, Cognita handles public program and intake inquiries through its official email channels.</p>
            </div>
            <div className="public-programs-contact__actions">
              <a className="button" href={`mailto:${PRIMARY_EMAIL}?cc=${ALTERNATE_EMAIL}&subject=Cognita%20Program%20and%20Intake%20Inquiry`}><Mail size={17} /> Email Cognita</a>
              <a href={`mailto:${ALTERNATE_EMAIL}?cc=${PRIMARY_EMAIL}`}>{ALTERNATE_EMAIL}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
