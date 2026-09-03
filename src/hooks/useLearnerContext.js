import { useCallback, useEffect, useState } from 'react'
import { getCurrentLearner } from '../repositories/learnerRepository.js'
import { getApplication } from '../repositories/admissionsRepository.js'
import { getActiveAttempt, getLatestSubmittedAttempt, importLegacyAttempt } from '../repositories/ceeRepository.js'
import { subscribe } from '../repositories/localStore.js'
import { deriveJourney } from '../services/journeyService.js'

/**
 * The learner's whole position in one place: identity, application, exam,
 * placement and next action. Re-reads whenever device storage changes, so two
 * open tabs of the same build cannot disagree.
 */
export function useLearnerContext() {
  const [state, setState] = useState({ loading: true, learner: null, application: null, activeAttempt: null, submittedAttempt: null, journey: null })

  const load = useCallback(async () => {
    const learner = await getCurrentLearner()
    if (learner) await importLegacyAttempt(learner)

    const [application, activeAttempt, submittedAttempt] = await Promise.all([
      getApplication(),
      getActiveAttempt(),
      getLatestSubmittedAttempt(),
    ])

    const journey = deriveJourney({ learner, application, activeAttempt, submittedAttempt })
    setState({ loading: false, learner, application, activeAttempt, submittedAttempt, journey })
  }, [])

  useEffect(() => {
    load()
    return subscribe(() => { load() })
  }, [load])

  return { ...state, reload: load }
}
