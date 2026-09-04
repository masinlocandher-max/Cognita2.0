import { useCallback, useEffect, useState } from 'react'
import { getProgram, getProgress } from '../repositories/learningRepository.js'
import { getModuleOverrides } from '../repositories/learningRepository.js'
import { getLatestSubmittedAttempt } from '../repositories/ceeRepository.js'
import { subscribe } from '../repositories/localStore.js'
import { nextLessonFor, programIdForPlacement, resolveModuleStates, summarizeProgram } from '../services/learningPathService.js'

/**
 * Resolves the learner's program, module states, progress roll-up and next
 * lesson in one place, so every learning screen agrees on what is unlocked.
 *
 * With no placement yet, the AI-00 pathway is shown in preview form — the
 * learning environment is browsable before enrollment exists.
 */
export function useLearningContext(programIdOverride = null) {
  const [state, setState] = useState({ loading: true, program: null, moduleStates: {}, summary: null, nextLesson: null, placementCode: null, progress: {} })

  const load = useCallback(async () => {
    const attempt = await getLatestSubmittedAttempt()
    const placementCode = attempt?.placement?.code || null
    const programId = programIdOverride || programIdForPlacement(placementCode)

    const [program, progress, overrides] = await Promise.all([getProgram(programId), getProgress(), getModuleOverrides()])
    if (!program) { setState({ loading: false, program: null, moduleStates: {}, summary: null, nextLesson: null, placementCode, progress: {} }); return }

    const moduleStates = resolveModuleStates(program, { placementCode, progress, overrides })
    setState({
      loading: false,
      program,
      moduleStates,
      summary: summarizeProgram(program, moduleStates),
      nextLesson: nextLessonFor(program, moduleStates),
      placementCode,
      progress,
    })
  }, [programIdOverride])

  useEffect(() => {
    load()
    return subscribe(() => { load() })
  }, [load])

  return { ...state, reload: load }
}
