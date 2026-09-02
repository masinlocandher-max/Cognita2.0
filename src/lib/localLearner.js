import { examMeta } from '../data/exam'

const STATE_KEY = 'cognita-v2-device-state'
const LEGACY_EXAM_KEY = 'cognita-cee-v1-progress'
const SCHEMA_VERSION = 1

const emptyState = () => ({
  schemaVersion: SCHEMA_VERSION,
  learner: null,
  attempts: [],
})

function uid(prefix) {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}_${crypto.randomUUID()}`
  }

  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

function normalizeState(value) {
  if (!value || typeof value !== 'object') return emptyState()

  return {
    schemaVersion: SCHEMA_VERSION,
    learner: value.learner || null,
    attempts: Array.isArray(value.attempts) ? value.attempts : [],
  }
}

export function readDeviceState() {
  try {
    return normalizeState(JSON.parse(localStorage.getItem(STATE_KEY) || 'null'))
  } catch {
    return emptyState()
  }
}

export function writeDeviceState(nextState) {
  localStorage.setItem(STATE_KEY, JSON.stringify(normalizeState(nextState)))
}

export function getLearner() {
  return readDeviceState().learner
}

export function saveLearner(input) {
  const state = readDeviceState()
  const now = new Date().toISOString()
  const learner = {
    id: state.learner?.id || uid('learner'),
    fullName: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    createdAt: state.learner?.createdAt || now,
    updatedAt: now,
  }

  writeDeviceState({ ...state, learner })
  return learner
}

export function getAttempts(learnerId) {
  return readDeviceState().attempts
    .filter((attempt) => !learnerId || attempt.learnerId === learnerId)
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
}

export function getAttempt(attemptId) {
  return readDeviceState().attempts.find((attempt) => attempt.id === attemptId) || null
}

/**
 * True when an attempt was started against the questionnaire currently shipped.
 * Attempts stamped with an older item set must not be resumed or scored, since
 * their stored answers point at questions that no longer exist.
 */
export function isCurrentQuestionnaire(attempt) {
  return attempt?.questionnaireVersion === examMeta.questionnaireVersion
}

export function getActiveAttempt(learnerId) {
  return getAttempts(learnerId).find((attempt) => !attempt.completed && isCurrentQuestionnaire(attempt)) || null
}

/** Unfinished attempts stranded by a questionnaire change. Kept, never resumed. */
export function getSupersededAttempts(learnerId) {
  return getAttempts(learnerId).filter((attempt) => !attempt.completed && !isCurrentQuestionnaire(attempt))
}

export function createAttempt(learner) {
  const state = readDeviceState()
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
    createdAt: now,
    updatedAt: now,
  }

  writeDeviceState({ ...state, attempts: [...state.attempts, attempt] })
  return attempt
}

export function saveAttempt(attempt) {
  const state = readDeviceState()
  const nextAttempt = { ...attempt, updatedAt: new Date().toISOString() }
  const index = state.attempts.findIndex((item) => item.id === nextAttempt.id)
  const attempts = [...state.attempts]

  if (index >= 0) attempts[index] = nextAttempt
  else attempts.push(nextAttempt)

  writeDeviceState({ ...state, attempts })
  return nextAttempt
}

export function removeAttempt(attemptId) {
  const state = readDeviceState()
  writeDeviceState({ ...state, attempts: state.attempts.filter((attempt) => attempt.id !== attemptId) })
}

export function clearDeviceData() {
  localStorage.removeItem(STATE_KEY)
  localStorage.removeItem(LEGACY_EXAM_KEY)
}

export function importLegacyExamIfAvailable() {
  const state = readDeviceState()
  if (state.learner || state.attempts.length) return false

  try {
    const legacy = JSON.parse(localStorage.getItem(LEGACY_EXAM_KEY) || 'null')
    if (!legacy?.candidate?.name || !legacy?.candidate?.email) return false

    const learner = saveLearner({
      fullName: legacy.candidate.name,
      email: legacy.candidate.email,
    })
    const attempt = createAttempt(learner)

    saveAttempt({
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

    localStorage.removeItem(LEGACY_EXAM_KEY)
    return true
  } catch {
    return false
  }
}
