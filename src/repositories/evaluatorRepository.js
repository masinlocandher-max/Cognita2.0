/**
 * Evaluator queue.
 *
 * Reads mock evaluation records and overlays any changes made in this browser.
 * There is no staff authentication and no server, so a decision recorded here
 * is a local draft — the evaluator interface labels it as one.
 */

import { evaluations as mockEvaluations, findEvaluationByAttempt, TASK1_CRITERIA, TASK2_CRITERIA } from '../mock/evaluations.js'
import { ceeAttempts, findCeeAttempt } from '../mock/ceeAttempts.js'
import { findLearner, staff } from '../mock/learners.js'
import { EvaluationStatus } from '../lib/status.js'
import { readStore, settle, updateStore } from './localStore.js'

export { TASK1_CRITERIA, TASK2_CRITERIA }

const APPLIED_MAX = 30

function withOverlay(evaluation, overlay) {
  const local = overlay[evaluation.id]
  return local ? { ...evaluation, ...local, hasLocalChanges: true } : evaluation
}

function hydrate(evaluation) {
  const attempt = findCeeAttempt(evaluation.attemptId)
  const learner = findLearner(evaluation.learnerId)
  return {
    ...evaluation,
    attempt,
    learner,
    assignee: staff.find((member) => member.id === evaluation.assignedTo) || null,
    appliedScore: appliedScoreOf(evaluation),
  }
}

export function appliedScoreOf(evaluation) {
  const criteria = [...TASK1_CRITERIA, ...TASK2_CRITERIA]
  const scored = criteria.filter((criterion) => typeof evaluation.rubric?.[criterion.id] === 'number')
  if (!scored.length) return null

  const points = scored.reduce((sum, criterion) => sum + evaluation.rubric[criterion.id], 0)
  return {
    points,
    max: APPLIED_MAX,
    complete: scored.length === criteria.length,
    scoredCriteria: scored.length,
    totalCriteria: criteria.length,
  }
}

export async function listEvaluations() {
  const overlay = readStore().evaluations
  return settle(mockEvaluations.map((evaluation) => hydrate(withOverlay(evaluation, overlay))), 0)
}

export async function getEvaluation(evaluationId) {
  const overlay = readStore().evaluations
  const base = mockEvaluations.find((evaluation) => evaluation.id === evaluationId)
  return settle(base ? hydrate(withOverlay(base, overlay)) : null, 0)
}

export async function getEvaluationByAttempt(attemptId) {
  const base = findEvaluationByAttempt(attemptId)
  return base ? getEvaluation(base.id) : settle(null, 0)
}

/** Records a local draft of an evaluator's work. Not transmitted anywhere. */
export async function saveEvaluationDraft(evaluationId, changes) {
  updateStore((store) => ({
    ...store,
    evaluations: {
      ...store.evaluations,
      [evaluationId]: { ...(store.evaluations[evaluationId] || {}), ...changes, updatedAt: new Date().toISOString() },
    },
  }))
  return getEvaluation(evaluationId)
}

export async function discardLocalEvaluation(evaluationId) {
  updateStore((store) => {
    const next = { ...store.evaluations }
    delete next[evaluationId]
    return { ...store, evaluations: next }
  })
  return getEvaluation(evaluationId)
}

export async function queueCounts() {
  const list = await listEvaluations()
  return {
    [EvaluationStatus.PENDING_REVIEW]: list.filter((item) => item.status === EvaluationStatus.PENDING_REVIEW).length,
    [EvaluationStatus.IN_REVIEW]: list.filter((item) => item.status === EvaluationStatus.IN_REVIEW).length,
    [EvaluationStatus.REVIEWED]: list.filter((item) => item.status === EvaluationStatus.REVIEWED).length,
    [EvaluationStatus.PLACEMENT_ISSUED]: list.filter((item) => item.status === EvaluationStatus.PLACEMENT_ISSUED).length,
    total: list.length,
  }
}

export const evaluatorAttempts = ceeAttempts
