/**
 * Assessment definitions and learner attempts.
 *
 * Objective questions are scored on the client. Anything marked
 * `reviewedByHuman` is never auto-scored — it is held for an evaluator, and the
 * result screen says so rather than inventing a mark.
 */

import { assessments, findAssessment, findKnowledgeCheck } from '../mock/assessments.js'
import { AssessmentAttemptStatus, QuestionType } from '../lib/status.js'
import { uid } from '../lib/id.js'
import { readStore, settle, updateStore } from './localStore.js'

const AUTO_SCORED = new Set([
  QuestionType.SINGLE_CHOICE,
  QuestionType.MULTIPLE_CHOICE,
  QuestionType.TRUE_FALSE,
  QuestionType.SCENARIO_JUDGMENT,
])

export function isAutoScored(question) {
  return AUTO_SCORED.has(question.type) && !question.reviewedByHuman
}

export async function listAssessments() {
  return settle(assessments, 0)
}

export async function getAssessment(assessmentId) {
  return settle(findAssessment(assessmentId), 0)
}

export async function getKnowledgeCheck(questionId) {
  return settle(findKnowledgeCheck(questionId), 0)
}

export async function listAttemptsFor(assessmentId) {
  const all = readStore().assessmentAttempts.filter((attempt) => attempt.assessmentId === assessmentId)
  return settle([...all].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)), 0)
}

export async function getOrCreateAttempt(assessmentId) {
  const store = readStore()
  const open = store.assessmentAttempts.find(
    (attempt) => attempt.assessmentId === assessmentId && attempt.status === AssessmentAttemptStatus.IN_PROGRESS,
  )
  if (open) return open

  const now = new Date().toISOString()
  const attempt = {
    id: uid('asa'),
    assessmentId,
    status: AssessmentAttemptStatus.IN_PROGRESS,
    responses: {},
    startedAt: now,
    submittedAt: null,
    result: null,
    createdAt: now,
    updatedAt: now,
  }

  updateStore((state) => ({ ...state, assessmentAttempts: [...state.assessmentAttempts, attempt] }))
  return attempt
}

export async function saveAssessmentAttempt(attempt) {
  const next = { ...attempt, updatedAt: new Date().toISOString() }
  updateStore((store) => {
    const index = store.assessmentAttempts.findIndex((item) => item.id === next.id)
    const list = [...store.assessmentAttempts]
    if (index >= 0) list[index] = next
    else list.push(next)
    return { ...store, assessmentAttempts: list }
  })
  return next
}

/**
 * Scores the auto-scorable questions and reports the rest as held for review.
 * Never produces a total that includes an unmarked human-reviewed question.
 */
export function scoreAssessment(assessment, responses) {
  let autoPoints = 0
  let autoMax = 0
  let heldPoints = 0
  const perQuestion = []

  assessment.questions.forEach((question) => {
    const response = responses[question.id]

    if (!isAutoScored(question)) {
      const answered = Array.isArray(response) ? response.length > 0 : String(response || '').trim().length > 0
      if (!question.optional) heldPoints += question.points
      perQuestion.push({ questionId: question.id, autoScored: false, answered, points: null, max: question.points })
      return
    }

    const given = [].concat(response || []).map(String).sort()
    const expected = [...(question.correct || [])].map(String).sort()
    const correct = given.length > 0 && given.length === expected.length && given.every((value, index) => value === expected[index])

    autoMax += question.points
    if (correct) autoPoints += question.points
    perQuestion.push({ questionId: question.id, autoScored: true, correct, points: correct ? question.points : 0, max: question.points })
  })

  return {
    autoPoints,
    autoMax,
    autoPercentage: autoMax ? Math.round((autoPoints / autoMax) * 100) : null,
    heldForReviewPoints: heldPoints,
    totalPossible: autoMax + heldPoints,
    perQuestion,
    status: heldPoints > 0 ? AssessmentAttemptStatus.AWAITING_REVIEW : AssessmentAttemptStatus.SCORED,
  }
}
