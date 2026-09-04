import { ArrowRight, BookOpenCheck, GraduationCap, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { getApplication, getEnrollment, PROGRAMS, selectProgram } from '../lib/admissions'

const icons = {
  'professional-ai-program': GraduationCap,
  'skills-lab': Sparkles,
}

export default function Programs() {
  const navigate = useNavigate()
  const application = getApplication()
  const enrollment = getEnrollment()

  if (application?.ceeDecision?.status !== 'passed') {
    return (
      <section className="admissions-page">
        <div className="page-width gate-card">
          <BookOpenCheck size={34} />
          <p className="section-label">ENROLLMENT GATE</p>
          <h1>Program selection opens after a passing CEE decision.</h1>
          <p>Cognita does not ask applicants to choose and pay for a program before admissions eligibility is established.</p>
          <Link className="button button--ghost" to="/apply">Return to application status</Link>
        </div>
      </section>
    )
  }

  const choose = (programId) => {
    selectProgram(programId)
    navigate('/payment')
  }

  return (
    <section className="admissions-page">
      <div className="page-width">
        <div className="section-heading section-heading--wide">
          <p className="section-label">PROGRAM SELECTION</p>
          <h1>Choose your Cognita learning route.</h1>
          <p>Both routes use competency-based progression. Guided learning provides more structure and human support; self-paced learning provides more schedule flexibility. The academic standard remains the same.</p>
          {application?.placement?.title && (
            <p><strong>CEE readiness indication:</strong> {application.placement.title}. Final pathway requirements remain subject to Cognita academic policy and evaluator guidance.</p>
          )}
          <p><strong>AI-00 Foundation Bridge:</strong> AI-00 is assigned as foundational support when readiness evidence shows it is needed. It is not a separate commercial program choice.</p>
        </div>

        <div className="program-grid">
          {PROGRAMS.map((program) => {
            const Icon = icons[program.id] || BookOpenCheck
            const selected = enrollment?.programId === program.id
            return (
              <article className={`program-card ${selected ? 'is-selected' : ''}`} key={program.id}>
                <Icon />
                <span>{program.code}</span>
                <h2>{program.name}</h2>
                <p><strong>{program.duration}</strong> · {program.delivery}</p>
                <p>{program.summary}</p>
                <button className="button" type="button" onClick={() => choose(program.id)}>
                  {selected ? 'Continue with this program' : 'Choose program'} <ArrowRight size={18} />
                </button>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
