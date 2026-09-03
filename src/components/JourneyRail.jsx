import { Check } from 'lucide-react'
import { JOURNEY_STEPS, JourneyStage } from '../lib/status.js'
import { journeyProgressIndex } from '../services/journeyService.js'

const STEP_STAGE_INDEX = {
  [JourneyStage.APPLICANT]: 1,
  [JourneyStage.CEE_SUBMITTED]: 3,
  [JourneyStage.AWAITING_REVIEW]: 4,
  [JourneyStage.PLACEMENT_ISSUED]: 5,
  [JourneyStage.ENROLLED]: 6,
  [JourneyStage.ACTIVE_LEARNER]: 7,
}

/** The whole journey at a glance. Position is shown by state, not by colour alone. */
export default function JourneyRail({ stage }) {
  const current = journeyProgressIndex(stage)

  return (
    <ol className="journey-rail" aria-label="Student journey progress">
      {JOURNEY_STEPS.map((step) => {
        const stepIndex = STEP_STAGE_INDEX[step.stage]
        const state = current > stepIndex ? 'done' : current >= stepIndex ? 'current' : 'upcoming'

        return (
          <li key={step.stage} className={`journey-step is-${state}`} aria-current={state === 'current' ? 'step' : undefined}>
            <span className="journey-dot" aria-hidden="true">{state === 'done' ? <Check size={12} /> : null}</span>
            <span className="journey-label">
              {step.label}
              <small>{state === 'done' ? 'Complete' : state === 'current' ? 'You are here' : 'Upcoming'}</small>
            </span>
          </li>
        )
      })}
    </ol>
  )
}
