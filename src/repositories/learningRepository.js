/**
 * Curriculum and learner progress.
 *
 * Curriculum comes from src/mock and is read-only in this build — it is
 * authored content, which will later come from the database. Progress is the
 * learner's own and is device-local.
 */

import { courses, findCourse, findLesson, findModule, findProgram, lessons, modules, programs } from '../mock/programs.js'
import { LessonState } from '../lib/status.js'
import { readStore, settle, updateStore } from './localStore.js'

export async function listPrograms() {
  return settle(programs, 0)
}

export async function getProgram(programId) {
  const program = findProgram(programId)
  if (!program) return settle(null, 0)

  return settle({
    ...program,
    courses: program.courseIds.map((courseId) => {
      const course = findCourse(courseId)
      return {
        ...course,
        modules: course.moduleIds.map((moduleId) => {
          const module = findModule(moduleId)
          return { ...module, lessons: module.lessonIds.map(findLesson) }
        }),
      }
    }),
  }, 0)
}

export async function getCourse(courseId) {
  const course = findCourse(courseId)
  if (!course) return settle(null, 0)

  return settle({
    ...course,
    program: findProgram(course.programId),
    modules: course.moduleIds.map((moduleId) => {
      const module = findModule(moduleId)
      return { ...module, lessons: module.lessonIds.map(findLesson) }
    }),
  }, 0)
}

export async function getModule(moduleId) {
  const module = findModule(moduleId)
  if (!module) return settle(null, 0)
  const course = findCourse(module.courseId)

  return settle({
    ...module,
    course,
    program: findProgram(course.programId),
    lessons: module.lessonIds.map(findLesson),
  }, 0)
}

/** A lesson with everything the player needs: context and neighbours. */
export async function getLesson(lessonId) {
  const lesson = findLesson(lessonId)
  if (!lesson) return settle(null, 0)

  const module = findModule(lesson.moduleId)
  const course = findCourse(module.courseId)
  const program = findProgram(course.programId)
  const index = module.lessonIds.indexOf(lessonId)

  return settle({
    ...lesson,
    module,
    course,
    program,
    position: index + 1,
    totalInModule: module.lessonIds.length,
    previousLessonId: index > 0 ? module.lessonIds[index - 1] : null,
    nextLessonId: index < module.lessonIds.length - 1 ? module.lessonIds[index + 1] : null,
  }, 0)
}

export async function getProgress() {
  return settle(readStore().lessonProgress, 0)
}

export function lessonStateFrom(progress, lessonId) {
  const record = progress?.[lessonId]
  if (!record) return LessonState.AVAILABLE
  if (record.completedAt) return LessonState.COMPLETED
  return record.openedAt ? LessonState.IN_PROGRESS : LessonState.AVAILABLE
}

export async function markLessonOpened(lessonId) {
  const now = new Date().toISOString()
  updateStore((store) => {
    const current = store.lessonProgress[lessonId]
    if (current?.openedAt) return store
    return { ...store, lessonProgress: { ...store.lessonProgress, [lessonId]: { ...current, openedAt: now } } }
  })
  return true
}

export async function markLessonComplete(lessonId, complete = true) {
  const now = new Date().toISOString()
  updateStore((store) => {
    const current = store.lessonProgress[lessonId] || {}
    return {
      ...store,
      lessonProgress: {
        ...store.lessonProgress,
        [lessonId]: { ...current, openedAt: current.openedAt || now, completedAt: complete ? now : null },
      },
    }
  })
  return true
}

export async function saveKnowledgeCheck(lessonId, questionId, response, correct) {
  updateStore((store) => {
    const current = store.lessonProgress[lessonId] || {}
    return {
      ...store,
      lessonProgress: {
        ...store.lessonProgress,
        [lessonId]: {
          ...current,
          openedAt: current.openedAt || new Date().toISOString(),
          checks: { ...(current.checks || {}), [questionId]: { response, correct, answeredAt: new Date().toISOString() } },
        },
      },
    }
  })
  return true
}

/** Module overrides let an evaluator waive or require a module for a learner. */
export async function getModuleOverrides() {
  return settle(readStore().moduleOverrides, 0)
}

export const curriculum = { programs, courses, modules, lessons }
