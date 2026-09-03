/**
 * CEE v1.0 objective scoring and preliminary placement logic.
 *
 * Implements the Cognita scoring and placement guide:
 *
 *   Communication Points = raw correct / 25 * 30
 *   AI Foundations Points = raw correct / 15 * 25
 *   Research Points       = raw correct / 5  * 15
 *   Objective maximum     = 70
 *
 * Two deliberate implementation decisions, documented so they can be reviewed
 * by the institute rather than discovered later:
 *
 * 1. Points are computed from the raw item count, not from a rounded
 *    percentage. Rounding is applied once, at display time only.
 *
 * 2. "Combined AI Foundations + Research readiness" is computed on the
 *    weighted point scale (aiPoints + researchPoints) / 40, not on a flat
 *    item count. The guide assigns 25 points to 15 items and 15 points to
 *    5 items, so a Research item is intentionally worth more than an AI
 *    Foundations item; a flat item count would silently discard that
 *    weighting. Set AI_READINESS_MODE to 'items' to use the flat count.
 *    Both figures are returned so the two readings can be compared.
 *
 * Threshold comparisons use unrounded percentages, so a 79.4% does not become
 * a progression at 79.5%.
 */

export const AI_READINESS_MODE = 'weighted' // 'weighted' | 'items'

export const SECTION_POINTS = {
  communication: 30,
  ai: 25,
  research: 15,
}

export const OBJECTIVE_POINTS = 70
export const APPLIED_POINTS = 30

export const PLACEMENT_THRESHOLDS = {
  ready: 80,
  support: 70,
}

function scoreSection(section, answers) {
  const total = section.questions.length
  const correct = section.questions.filter((question) => answers[question.id] === question.answer).length
  const percentage = total ? (correct / total) * 100 : 0
  const points = total ? (correct / total) * section.pointsMax : 0

  return {
    id: section.id,
    title: section.title,
    correct,
    total,
    percentage,
    displayPercentage: Math.round(percentage),
    points,
    displayPoints: Math.round(points),
    pointsMax: section.pointsMax,
  }
}

/**
 * Preliminary placement indication.
 *
 * This is an objective readiness profile only. The 30 applied-response points
 * are reserved for human review, so no branch here issues a final placement.
 */
export function derivePlacement(communicationPercentage, aiReadinessPercentage) {
  const { ready, support } = PLACEMENT_THRESHOLDS
  const communication = communicationPercentage
  const aiReadiness = aiReadinessPercentage

  if (communication >= ready && aiReadiness >= ready) {
    return {
      code: 'AI-01',
      title: 'AI-01 readiness indicated',
      detail: 'Your objective results indicate readiness to proceed beyond the foundation level. Applied responses must still meet institutional review standards before final progression is confirmed.',
    }
  }

  if (communication < support && aiReadiness >= ready) {
    return {
      code: 'AI-00-COMMUNICATION',
      title: 'AI-00 Communication Readiness indicated',
      detail: 'Your objective profile shows comparatively strong AI understanding alongside a communication result that would benefit from English and communication reinforcement first.',
    }
  }

  if (communication >= ready && aiReadiness < support) {
    return {
      code: 'AI-00-FOUNDATIONS',
      title: 'AI-00 AI Foundations indicated',
      detail: 'Your objective profile shows strong communication readiness. AI foundations are the area to strengthen before progression.',
    }
  }

  if (communication < support && aiReadiness < support) {
    return {
      code: 'AI-00-FULL',
      title: 'Full AI-00 indicated',
      detail: 'Your objective profile indicates that the complete AI-00 foundation pathway is the appropriate starting point.',
    }
  }

  return {
    code: 'BRIDGE-REVIEW',
    title: 'Targeted bridge and human review indicated',
    detail: 'One or more readiness areas fall between the principal thresholds. This profile triggers individualized review rather than an automatic progression decision.',
  }
}

/**
 * Score an attempt's objective answers.
 *
 * @param {Array} sections examSections from src/data/exam.js
 * @param {Object} answers map of question id -> selected option index
 */
export function scoreObjective(sections, answers = {}) {
  const byId = Object.fromEntries(sections.map((section) => [section.id, scoreSection(section, answers)]))
  const communication = byId.communication
  const ai = byId.ai
  const research = byId.research

  const objectivePointsExact = communication.points + ai.points + research.points
  const aiReadinessWeighted = ((ai.points + research.points) / (ai.pointsMax + research.pointsMax)) * 100
  const aiReadinessByItem = ((ai.correct + research.correct) / (ai.total + research.total)) * 100
  const aiReadiness = AI_READINESS_MODE === 'items' ? aiReadinessByItem : aiReadinessWeighted

  const answered = sections
    .flatMap((section) => section.questions)
    .filter((question) => answers[question.id] !== undefined).length

  return {
    sections: [communication, ai, research],
    communication,
    ai,
    research,
    answered,
    totalItems: sections.reduce((sum, section) => sum + section.questions.length, 0),
    objectivePoints: Math.round(objectivePointsExact),
    objectivePointsExact,
    objectivePointsMax: OBJECTIVE_POINTS,
    aiReadiness: Math.round(aiReadiness),
    aiReadinessExact: aiReadiness,
    aiReadinessWeighted: Math.round(aiReadinessWeighted),
    aiReadinessByItem: Math.round(aiReadinessByItem),
    placement: derivePlacement(communication.percentage, aiReadiness),
  }
}
