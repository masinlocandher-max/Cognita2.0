/**
 * The personalized AI-00 pathway.
 *
 * A learner takes the modules their readiness profile identifies. Modules a
 * placement waives are shown as waived rather than hidden — a learner should be
 * able to see what was skipped on their behalf, and open it if they want it.
 */

import { LessonState, ModuleState, PlacementCode } from '../lib/status.js'

function baseModuleState(module, placementCode) {
  if (!placementCode) return module.requiredFor?.length ? ModuleState.REQUIRED : ModuleState.OPTIONAL
  if (module.waivedFor?.includes(placementCode)) return ModuleState.WAIVED
  if (module.requiredFor?.includes(placementCode)) return ModuleState.REQUIRED
  if (module.optionalFor?.includes(placementCode)) return ModuleState.OPTIONAL
  return ModuleState.OPTIONAL
}

/**
 * Resolves every module in a program to a single explicit state.
 *
 * Gating rule: a required module unlocks when every earlier required module in
 * the same course is complete. Optional and waived modules never gate anything.
 */
export function resolveModuleStates(program, { placementCode = null, progress = {}, overrides = {} } = {}) {
  const result = {}
  let currentAssigned = false

  program.courses.forEach((course) => {
    let priorRequiredComplete = true

    course.modules.forEach((module) => {
      const override = overrides[module.id]
      const intent = override?.state || baseModuleState(module, placementCode)

      const lessonStates = module.lessons.map((lesson) => {
        const record = progress[lesson.id]
        if (record?.completedAt) return LessonState.COMPLETED
        if (record?.openedAt) return LessonState.IN_PROGRESS
        return LessonState.AVAILABLE
      })

      const completedLessons = lessonStates.filter((state) => state === LessonState.COMPLETED).length
      const allComplete = module.lessons.length > 0 && completedLessons === module.lessons.length

      let state
      if (allComplete) state = ModuleState.COMPLETED
      else if (intent === ModuleState.WAIVED) state = ModuleState.WAIVED
      else if (intent === ModuleState.REQUIRED && !priorRequiredComplete) state = ModuleState.LOCKED
      else if (intent === ModuleState.REQUIRED && !currentAssigned) { state = ModuleState.CURRENT; currentAssigned = true }
      else state = intent

      result[module.id] = {
        state,
        intent,
        completedLessons,
        totalLessons: module.lessons.length,
        percentage: module.lessons.length ? Math.round((completedLessons / module.lessons.length) * 100) : 0,
        lessonStates: Object.fromEntries(module.lessons.map((lesson, index) => [lesson.id, lessonStates[index]])),
        locked: state === ModuleState.LOCKED,
      }

      if (intent === ModuleState.REQUIRED && !allComplete) priorRequiredComplete = false
    })
  })

  return result
}

/** Program-level roll-up used by the dashboard, progress page and certificates. */
export function summarizeProgram(program, moduleStates) {
  const entries = program.courses.flatMap((course) => course.modules.map((module) => ({ module, state: moduleStates[module.id] })))
  const counted = entries.filter(({ state }) => state.intent !== ModuleState.WAIVED)
  const required = entries.filter(({ state }) => state.intent === ModuleState.REQUIRED)
  const requiredComplete = required.length > 0 && required.every(({ state }) => state.state === ModuleState.COMPLETED)

  const totalLessons = counted.reduce((sum, { state }) => sum + state.totalLessons, 0)
  const completedLessons = counted.reduce((sum, { state }) => sum + state.completedLessons, 0)

  const current = entries.find(({ state }) => state.state === ModuleState.CURRENT)
    || entries.find(({ state }) => state.state === ModuleState.REQUIRED)
    || entries.find(({ state }) => state.state === ModuleState.OPTIONAL)

  return {
    programId: program.id,
    totalLessons,
    completedLessons,
    percentage: totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0,
    requiredTotal: required.length,
    requiredComplete,
    waivedCount: entries.filter(({ state }) => state.state === ModuleState.WAIVED).length,
    currentModule: current?.module || null,
  }
}

/** The next lesson a learner should open, respecting gating. */
export function nextLessonFor(program, moduleStates) {
  for (const course of program.courses) {
    for (const module of course.modules) {
      const state = moduleStates[module.id]
      if (!state || state.locked || state.state === ModuleState.WAIVED || state.state === ModuleState.COMPLETED) continue
      const nextLesson = module.lessons.find((lesson) => state.lessonStates[lesson.id] !== LessonState.COMPLETED)
      if (nextLesson) return { lesson: nextLesson, module, course }
    }
  }
  return null
}

export function programIdForPlacement(placementCode) {
  return placementCode === PlacementCode.AI_01 ? 'prog_ai01' : 'prog_ai00'
}
