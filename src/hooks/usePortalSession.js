import { useCallback, useEffect, useState } from 'react'
import { getPortalSession } from '../repositories/sessionRepository.js'
import { getCurrentLearner } from '../repositories/learnerRepository.js'
import { getLatestSubmittedAttempt } from '../repositories/ceeRepository.js'
import { subscribe } from '../repositories/localStore.js'

export function usePortalSession() {
  const [state, setState] = useState({ loading: true, session: null, learner: null, placement: null })

  const load = useCallback(async () => {
    const [session, learner, attempt] = await Promise.all([
      getPortalSession(),
      getCurrentLearner(),
      getLatestSubmittedAttempt(),
    ])
    setState({ loading: false, session, learner, placement: attempt?.placement || null })
  }, [])

  useEffect(() => {
    load()
    return subscribe(() => { load() })
  }, [load])

  return { ...state, reload: load }
}
