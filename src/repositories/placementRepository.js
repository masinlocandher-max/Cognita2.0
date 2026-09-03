/**
 * Placement records.
 *
 * A preliminary placement is derived from the objective sections of a submitted
 * attempt and stored with it. A *final* placement can only be issued by an
 * evaluator, so this build never writes one for a learner's own attempt — the
 * learner interface says "preliminary" everywhere, because that is what it is.
 */

import { readStore, settle, updateStore } from './localStore.js'

export async function getPreliminaryPlacement() {
  const store = readStore()
  const submitted = [...store.attempts]
    .filter((attempt) => attempt.completed)
    .sort((a, b) => new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0))[0]

  if (!submitted) return settle(null, 0)

  return settle({
    attemptId: submitted.id,
    issuedAt: submitted.submittedAt,
    preliminary: true,
    placement: submitted.placement,
    scores: submitted.scores,
    objectivePoints: submitted.objectivePoints,
  }, 0)
}

/** Placements issued by an evaluator. Empty in this build for a real learner. */
export async function listIssuedPlacements() {
  return settle(readStore().placements, 0)
}

export async function recordIssuedPlacement(record) {
  updateStore((store) => ({ ...store, placements: [...store.placements, record] }))
  return record
}
