const KEY = 'cognita-v2-cee-evaluation'

function clampScore(value) {
  const number = Number(value)
  if (!Number.isFinite(number)) return 0
  return Math.min(15, Math.max(0, Math.round(number)))
}

export function getCeeEvaluation() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || 'null')
  } catch {
    return null
  }
}

export function saveCeeEvaluation(input) {
  const promptTask = clampScore(input.promptTask)
  const judgmentTask = clampScore(input.judgmentTask)
  const appliedPoints = promptTask + judgmentTask
  const objectivePoints = Number(input.objectivePoints) || 0

  const evaluation = {
    attemptId: input.attemptId,
    promptTask,
    judgmentTask,
    appliedPoints,
    objectivePoints,
    totalPoints: objectivePoints + appliedPoints,
    decision: input.decision,
    evaluatorNote: (input.evaluatorNote || '').trim(),
    evaluatedAt: new Date().toISOString(),
    scoringModel: 'CEE v1.0 — two applied tasks, 15 points each',
  }

  localStorage.setItem(KEY, JSON.stringify(evaluation))
  return evaluation
}

export function clearCeeEvaluation() {
  localStorage.removeItem(KEY)
}
