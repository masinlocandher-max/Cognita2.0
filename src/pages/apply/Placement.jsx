import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLearnerContext } from '../../hooks/useLearnerContext.js'
import { useAsync } from '../../hooks/useAsync.js'
import { getProgram } from '../../repositories/learningRepository.js'
import { competencyProfile, placementFor, PRELIMINARY_NOTICE } from '../../services/placementService.js'
import { resolveModuleStates } from '../../services/learningPathService.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { ModuleState } from '../../lib/status.js'
import StateBlock, { LoadingRows } from '../../components/StateBlock.jsx'
import StatusPill from '../../components/StatusPill.jsx'
import Alert from '../../components/Alert.jsx'

/**
 * Placement, described developmentally.
 *
 * The page names what to build and what is waived. It does not rank the learner
 * and it does not use the vocabulary of failure.
 */
export default function Placement() {
  useDocumentTitle('Placement')
  const { loading, submittedAttempt } = useLearnerContext()
  const placementCode = submittedAttempt?.placement?.code || null
  const placement = placementCode ? placementFor(placementCode) : null

  const program = useAsync(() => (placement?.programId ? getProgram(placement.programId) : Promise.resolve(null)), [placement?.programId])

  if (loading) return <LoadingRows rows={4} height={90} />

  if (!submittedAttempt) {
    return (
      <>
        <div className="page-head">
          <p className="eyebrow">Placement</p>
          <h1>Not yet determined.</h1>
        </div>
        <StateBlock
          variant="empty"
          title="Placement follows the entrance exam"
          description="Once your objective profile is complete, a preliminary placement appears here with the modules that apply to you."
          action={<Link className="btn" to="/apply/entrance-exam">Go to the entrance exam <ArrowRight size={16} /></Link>}
        />
      </>
    )
  }

  const profile = competencyProfile(submittedAttempt.scores)
  const moduleStates = program.data ? resolveModuleStates(program.data, { placementCode }) : {}

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Preliminary placement</p>
        <h1>{placement.name}</h1>
        <p>{placement.headline}</p>
      </div>

      <Alert tone="attention" title="Preliminary">{PRELIMINARY_NOTICE}</Alert>

      <div className="placement-grid">
        <section className="card">
          <p className="card-title">Why this placement</p>
          <p className="placement-explanation">{placement.explanation}</p>

          <h3 className="placement-subhead">Competency profile</h3>
          <ul className="placement-profile">
            {profile.map((area) => (
              <li key={area.id}>
                <span>{area.label}</span>
                <span className="row" style={{ gap: 10 }}>
                  <strong className="tabular">{area.percentage}%</strong>
                  <StatusPill label={area.band.label} tone={area.band.tone} icon={area.band.tone === 'positive' ? 'CircleCheck' : area.band.tone === 'attention' ? 'Hourglass' : 'TrendingUp'} />
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card card--accent">
          <p className="card-title">Recommended next step</p>
          <p style={{ marginTop: 'var(--s-3)', lineHeight: 1.7 }}>{placement.nextStep}</p>
          <div className="wrap-actions" style={{ marginTop: 'var(--s-5)' }}>
            <Link className="btn" to="/apply/enrollment">Enrollment <ArrowRight size={16} /></Link>
            {placement.programId ? <Link className="btn btn--secondary" to={`/portal/program/${placement.programId}`}>Preview the pathway</Link> : null}
          </div>
        </section>
      </div>

      {program.loading ? <LoadingRows rows={3} /> : program.data ? (
        <section className="stack-4" style={{ marginTop: 'var(--s-8)' }}>
          <div className="row-between">
            <h2 style={{ fontSize: 'var(--display-sm)' }}>Your pathway</h2>
            <span className="muted" style={{ fontSize: 'var(--text-sm)' }}>{program.data.title}</span>
          </div>
          <p className="muted" style={{ fontSize: 'var(--text-sm)', maxWidth: '64ch' }}>
            Modules your profile already covers are marked waived. They stay visible and you can still open them —
            we tell you what was skipped on your behalf rather than hiding it.
          </p>

          <div className="stack-4">
            {program.data.courses.map((course) => (
              <article className="card" key={course.id}>
                <p className="card-title">{course.title}</p>
                <ul className="pathway-module-list">
                  {course.modules.map((module) => {
                    const state = moduleStates[module.id]?.state || ModuleState.OPTIONAL
                    return (
                      <li key={module.id}>
                        <span>{module.title}</span>
                        <StatusPill status={state} />
                      </li>
                    )
                  })}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </>
  )
}
