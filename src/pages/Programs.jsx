import { ArrowRight, BookOpenCheck, GraduationCap, Languages, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { getApplication, getEnrollment, PROGRAMS, selectProgram } from '../lib/admissions'

const icons = {
  'ai-foundations': Sparkles,
  'communication-readiness': Languages,
  'applied-ai-learning': GraduationCap,
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
          <h1>Choose your Cognita program.</h1>
          <p>Your CEE has been marked passed. Select the program you want to enter. Cognita can later use placement evidence to recommend or restrict programs when final curriculum rules are approved.</p>
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
