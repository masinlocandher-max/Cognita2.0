/**
 * Placement presentation.
 *
 * Placement is developmental, not punitive. The vocabulary here is deliberate:
 * readiness, foundation, reinforcement. Nothing in this file says failed, weak,
 * or poor, and nothing produces a pass/fail verdict — the CEE is a placement
 * instrument, and describing it as a test someone can fail would misrepresent
 * what it measures.
 */

import { PlacementCode } from '../lib/status.js'

export const PLACEMENTS = {
  [PlacementCode.AI_01]: {
    code: PlacementCode.AI_01,
    name: 'AI-01 readiness',
    headline: 'Ready to begin applied AI practice.',
    explanation: 'Your objective profile meets the readiness threshold in both communication and AI understanding. Your applied responses still go to an evaluator before progression is confirmed.',
    nextStep: 'Await institutional review of your written responses. If confirmed, you begin at AI-01.',
    programId: 'prog_ai01',
    tone: 'positive',
    emphasis: [],
  },
  [PlacementCode.AI_00_COMMUNICATION]: {
    code: PlacementCode.AI_00_COMMUNICATION,
    name: 'AI-00 Communication Foundation',
    headline: 'Strong AI understanding, with communication as the area to build.',
    explanation: 'Your AI foundations and research judgment are comparatively strong. English and professional communication are where reinforcement will make the most difference to your work.',
    nextStep: 'Begin AI-00 with the communication modules. The AI foundations modules your profile already covers are waived.',
    programId: 'prog_ai00',
    tone: 'accent',
    emphasis: ['course_comm'],
  },
  [PlacementCode.AI_00_FOUNDATIONS]: {
    code: PlacementCode.AI_00_FOUNDATIONS,
    name: 'AI-00 AI Foundations',
    headline: 'Strong communication, with AI foundations as the area to build.',
    explanation: 'Your communication readiness is strong. Understanding of how generative systems behave — and where they fail — is the area to strengthen before applied work.',
    nextStep: 'Begin AI-00 with the AI foundations and verification modules. The communication modules your profile already covers are waived.',
    programId: 'prog_ai00',
    tone: 'accent',
    emphasis: ['course_aifound', 'course_research'],
  },
  [PlacementCode.AI_00_FULL]: {
    code: PlacementCode.AI_00_FULL,
    name: 'Full AI-00 Foundation',
    headline: 'The complete foundation pathway is the right starting point.',
    explanation: 'Both competency areas would benefit from structured work before applied AI practice. This is the pathway most learners begin with, and it is designed for exactly this profile.',
    nextStep: 'Begin AI-00 from the first module. Every module is available to you.',
    programId: 'prog_ai00',
    tone: 'info',
    emphasis: ['course_comm', 'course_aifound', 'course_research'],
  },
  [PlacementCode.TARGETED_BRIDGE]: {
    code: PlacementCode.TARGETED_BRIDGE,
    name: 'Targeted Bridge',
    headline: 'Close to the progression threshold — reviewed individually.',
    explanation: 'One or more areas sit between the principal thresholds. Cognita does not resolve this band automatically: an evaluator reads your written work and decides the starting point that fits you.',
    nextStep: 'Await individualized review. Your placement will identify specific reinforcement rather than a full pathway.',
    programId: 'prog_ai00',
    tone: 'attention',
    emphasis: [],
  },
  [PlacementCode.MANUAL_REVIEW]: {
    code: PlacementCode.MANUAL_REVIEW,
    name: 'Manual Review Required',
    headline: 'Your profile needs a person to read it.',
    explanation: 'Something in this attempt cannot be placed by the objective profile alone — an incomplete section, an unusual pattern, or a request you made. An evaluator will look at it directly.',
    nextStep: 'No action needed from you. Cognita will follow up once the review is complete.',
    programId: null,
    tone: 'quiet',
    emphasis: [],
  },
}

export function placementFor(code) {
  return PLACEMENTS[code] || PLACEMENTS[PlacementCode.MANUAL_REVIEW]
}

/**
 * The competency profile shown on the result and placement screens.
 * Bands are described, never graded.
 */
export function competencyProfile(scores) {
  if (!scores) return []

  const band = (percentage) => {
    if (percentage >= 80) return { label: 'Readiness indicated', tone: 'positive' }
    if (percentage >= 70) return { label: 'Near threshold', tone: 'attention' }
    return { label: 'Reinforcement recommended', tone: 'info' }
  }

  const communication = scores.communication || {}
  const ai = scores.aiFoundations || scores.ai || {}
  const research = scores.research || {}

  return [
    {
      id: 'communication',
      label: 'Functional English & Communication',
      correct: communication.correct,
      total: communication.total,
      percentage: Math.round(communication.percentage ?? 0),
      points: Math.round(communication.points ?? 0),
      pointsMax: communication.pointsMax ?? 30,
      band: band(communication.percentage ?? 0),
    },
    {
      id: 'ai',
      label: 'AI Foundations',
      correct: ai.correct,
      total: ai.total,
      percentage: Math.round(ai.percentage ?? 0),
      points: Math.round(ai.points ?? 0),
      pointsMax: ai.pointsMax ?? 25,
      band: band(ai.percentage ?? 0),
    },
    {
      id: 'research',
      label: 'Research & Verification Judgment',
      correct: research.correct,
      total: research.total,
      percentage: Math.round(research.percentage ?? 0),
      points: Math.round(research.points ?? 0),
      pointsMax: research.pointsMax ?? 15,
      band: band(research.percentage ?? 0),
    },
  ]
}

export const PRELIMINARY_NOTICE =
  'Your applied responses require institutional review. This result is preliminary and does not constitute final Cognita placement.'
