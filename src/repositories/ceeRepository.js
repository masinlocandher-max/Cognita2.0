/**
 * Cognita Entrance Exam attempts.
 *
 * Attempts are stamped with the questionnaire version they were started
 * against. An attempt from a superseded item set is kept in history but is
 * never resumed or rescored — scoring old answers against a new key would
 * produce a confident, wrong placement.
 */

import { examMeta } from '../features/cee/questionnaire.js'
import { AttemptStatus } from '../lib/status.js'
import { uid } from '../lib/id.js'
import { readStore, settle, updateStore } from './localStore.js'

const LEGACY_CEE_KEY = 'cognita-cee-v1-progress'

export function isCurrentQuestionnaire(attempt) {
  return attempt?.questionnaireVersion === examMeta.questionnaireVersion
}

export function attemptStatus(attempt) {
  if (!attempt) return AttemptStatus.NOT_STARTED
  if (attempt.completed) return AttemptStatus.SUBMITTED
  if (!isCurrentQuestionnaire(attempt)) return AttemptStatus.SUPERSEDED
  return attempt.startedAt ? AttemptStatus.IN_PROGRESS : AttemptStatus.NOT_STARTED
}

function sortByRecency(attempts) {
  return [...attempts].sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
}

export async function listAttempts() {
  return settle(sortByRecency(readStore().attempts), 0)
}

export async function getAttempt(attemptId) {
  return settle(readStore().attempts.find((attempt) => attempt.id === attemptId) || null, 0)
}

/** The resumable attempt, if there is one on the current questionnaire. */
export async function getActiveAttempt() {
  const attempts = sortByRecency(readStore().attempts)
  return settle(attempts.find((attempt) => !attempt.completed && isCurrentQuestionnaire(attempt)) || null, 0)
}

export async function getLatestSubmittedAttempt() {
  const attempts = sortByRecency(readStore().attempts)
  return settle(attempts.find((attempt) => attempt.completed) || null, 0)
}

export async function countSupersededAttempts() {
  const attempts = readStore().attempts
  return settle(attempts.filter((attempt) => !attempt.completed && !isCurrentQuestionnaire(attempt)).length, 0)
}

export async function createAttempt(learner) {
  const now = new Date().toISOString()
  const attempt = {
    id: uid('cee'),
    learnerId: learner.id,
    examVersion: examMeta.version,
    questionnaireVersion: examMeta.questionnaireVersion,
    candidate: { name: learner.fullName, email: learner.email },
    answers: {},
    applied: {},
    startedAt: null,
    stageIndex: 0,
    completed: false,
    submittedAt: null,
    objectivePoints: null,
    scores: null,
    placement: null,
    acknowledgedIntegrity: false,
    createdAt: now,
    updatedAt: now,
  }

  updateStore((store) => ({ ...store, attempts: [...store.attempts, attempt] }))
  return attempt
}

export async function saveAttempt(attempt) {
  const next = { ...attempt, updatedAt: new Date().toISOString() }

  updateStore((store) => {
    const index = store.attempts.findIndex((item) => item.id === next.id)
    const attempts = [...store.attempts]
    if (index >= 0) attempts[index] = next
    else attempts.push(next)
    return { ...store, attempts }
  })

  return next
}

/**
 * Imports an attempt left by the pre-2.0 exam page, if one exists.
 *
 * It is stamped `legacy` rather than as the current questionnaire, so it lands
 * in history as a superseded record instead of becoming resumable.
 */
export async function importLegacyAttempt(learner) {
  if (typeof window === 'undefined') return false

  try {
    const raw = window.localStorage.getItem(LEGACY_CEE_KEY)
    if (!raw) return false
    const legacy = JSON.parse(raw)
    if (!legacy?.candidate?.name) return false

    const attempt = await createAttempt(learner)
    await saveAttempt({
      ...attempt,
      questionnaireVersion: legacy.questionnaireVersion || 'legacy',
      candidate: legacy.candidate,
      answers: legacy.answers || {},
      applied: legacy.applied || {},
      startedAt: legacy.startedAt || null,
      stageIndex: Number.isInteger(legacy.stageIndex) ? legacy.stageIndex : 0,
      completed: Boolean(legacy.completed),
      submittedAt: legacy.completed ? new Date().toISOString() : null,
    })

    window.localStorage.removeItem(LEGACY_CEE_KEY)
    return true
  } catch {
    return false
  }
}
