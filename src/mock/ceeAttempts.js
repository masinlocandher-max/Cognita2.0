/**
 * Mock submitted CEE attempts backing the evaluator queue.
 *
 * Objective figures follow the real CEE v1.0 weighting (30 / 25 / 15). Applied
 * responses are written as a candidate would actually write them, including the
 * weaker ones — an evaluator interface tested only on strong answers is not
 * tested at all.
 */

import { PlacementCode } from '../lib/status.js'

const objective = (commCorrect, aiCorrect, resCorrect) => {
  const communicationPoints = (commCorrect / 25) * 30
  const aiPoints = (aiCorrect / 15) * 25
  const researchPoints = (resCorrect / 5) * 15
  return {
    communication: { correct: commCorrect, total: 25, percentage: (commCorrect / 25) * 100, points: communicationPoints, pointsMax: 30 },
    aiFoundations: { correct: aiCorrect, total: 15, percentage: (aiCorrect / 15) * 100, points: aiPoints, pointsMax: 25 },
    research: { correct: resCorrect, total: 5, percentage: (resCorrect / 5) * 100, points: researchPoints, pointsMax: 15 },
    objectivePoints: Math.round(communicationPoints + aiPoints + researchPoints),
    aiReadiness: Math.round(((aiPoints + researchPoints) / 40) * 100),
  }
}

export const ceeAttempts = [
  {
    id: 'cee_m001', learnerId: 'lnr_003', reference: 'CEE-0003-01',
    questionnaireVersion: 'cee-1.0-production',
    submittedAt: '2026-08-28T03:12:00.000Z', durationMinutes: 62,
    scores: objective(21, 13, 4),
    preliminaryPlacement: PlacementCode.AI_01,
    applied: {
      'applied-task-1': 'Write a 6-week marketing plan for Balay Kape, a two-branch specialty coffee shop in Iba, Zambales. Objective: lift weekday morning sales, which are currently about 30% of weekend volume. Audience: local office workers aged 25-45 within 3km, plus students from the nearby state university. Budget: PHP 18,000 total for the six weeks, mostly Facebook and printed materials. Timeframe: 15 September to 26 October. Constraints: we have no video team, only two staff who can post, and we cannot discount below PHP 95 per cup. Deliverable: a week-by-week plan in a table, with the channel, the message, who executes it, and the cost. Success measures: weekday 7-10am transactions, average basket size, and follower growth. Do not invent statistics about the Zambales coffee market or claim awards we have not received. Where you need a number I have not given you, mark it as an assumption I need to confirm rather than stating it as fact.',
      'applied-task-2': 'Neither claim can be relied on as written. The first gives an exact figure, 2.8 million, for a national employment effect in a year that has just ended, and attributes the entire loss to one cause. Job losses rarely have a single attributable cause and a figure that precise would require a methodology the answer does not name. The second cites a "2025 World Employment Institute report" and uses the word "proves". I would first check whether the World Employment Institute exists at all, since fabricated citations usually name a plausible-sounding institution. If it exists, I would look for the report in its own publications rather than in coverage of it, then find the 34% figure inside the report and check that the definition matches: BPO employees replaced by AI is a narrower claim than BPO roles reduced. For Philippine employment data I would go to the Philippine Statistics Authority labour force survey and DOLE, and for BPO specifically to the IT and Business Process Association of the Philippines. If none of that supports an exact figure, I would not publish a number. I would write that available data does not support a specific national figure, describe what the credible sources do show, and say plainly what remains unverified. Confidence in the answer is not evidence for it.',
    },
  },
  {
    id: 'cee_m002', learnerId: 'lnr_004', reference: 'CEE-0004-01',
    questionnaireVersion: 'cee-1.0-production',
    submittedAt: '2026-08-28T09:40:00.000Z', durationMinutes: 70,
    scores: objective(16, 13, 5),
    preliminaryPlacement: PlacementCode.AI_00_COMMUNICATION,
    applied: {
      'applied-task-1': 'Make marketing plan for my sari-sari store in Olongapo. Budget is small maybe 5000 pesos. I want more customer in the morning. Please make plan for 1 month, put what to post in facebook and how much cost. Do not put fake information about my store.',
      'applied-task-2': 'The answer is not sure. The number 2.8 million is very exact so maybe it is not true. Also World Employment Institute I never heard of it, need to check if it is real organization. I will search PSA and DOLE for the real data about jobs. If I cannot find, I will not use the number and I will say the data is not confirmed. AI can sound confident but still wrong.',
    },
  },
  {
    id: 'cee_m003', learnerId: 'lnr_010', reference: 'CEE-0010-01',
    questionnaireVersion: 'cee-1.0-production',
    submittedAt: '2026-08-30T01:22:00.000Z', durationMinutes: 55,
    scores: objective(23, 9, 3),
    preliminaryPlacement: PlacementCode.AI_00_FOUNDATIONS,
    applied: {
      'applied-task-1': 'Please produce a three-month marketing plan for Hilom Wellness Studio, a yoga and pilates studio in Botolan with one location and four instructors. Objective: fill weekday afternoon classes, which currently run at roughly a third of capacity. Audience: women aged 28-50 in Botolan and Iba, mostly work-from-home professionals and small business owners. Budget: PHP 45,000 across the quarter. Timeframe: October to December. Constraints: no paid influencer partnerships, and instructor time for content is capped at two hours a week. Deliverable: a monthly plan with objectives, channels, content themes, owner, and budget line. Success measures: weekday afternoon attendance, trial-to-membership conversion, and cost per acquired member. Please flag anything you assumed rather than presenting it as established, and do not invent competitor figures.',
      'applied-task-2': 'The claims are confident but I would not publish either. 2.8 million is an exact number attached to a single cause, which is a strong claim about a complicated thing. I would look for the report from the named institute directly. If the report exists I would check whether it actually says 34 percent were replaced by AI, because reports often say something narrower. Sources I would use are PSA and IBPAP. If I cannot confirm it, I would say the figure could not be verified rather than repeating it with hedging words, because hedging still spreads the number.',
    },
  },
  {
    id: 'cee_m004', learnerId: 'lnr_006', reference: 'CEE-0006-01',
    questionnaireVersion: 'cee-1.0-production',
    submittedAt: '2026-08-31T06:05:00.000Z', durationMinutes: 68,
    scores: objective(18, 11, 4),
    preliminaryPlacement: PlacementCode.TARGETED_BRIDGE,
    applied: {
      'applied-task-1': 'Create a marketing plan for my printing business in Cebu. We do tarpaulins, invitations and school forms. Objective is to get more school and barangay orders before the school year. Audience: school administrators and barangay officials in Cebu City. Budget: PHP 12,000 for two months. Deliverable: a plan with what to do each week and the cost. Success: number of new institutional accounts. Do not invent prices of competitors or claim we are the biggest printer, we are not.',
      'applied-task-2': 'Both sentences sound official but nothing is proven. The word proves is too strong for one report even if it exists. I would search for the World Employment Institute and the 2025 report. If it is not findable, the citation is probably invented, which happens with AI. I would check PSA data for Philippine employment and see what it actually shows. If there is no reliable exact figure I would say so and give the range that credible sources support instead of a single number.',
    },
  },
  {
    id: 'cee_m005', learnerId: 'lnr_002', reference: 'CEE-0002-01',
    questionnaireVersion: 'cee-1.0-production',
    submittedAt: '2026-08-22T02:30:00.000Z', durationMinutes: 58,
    scores: objective(24, 14, 5),
    preliminaryPlacement: PlacementCode.AI_01,
    applied: {
      'applied-task-1': 'Produce a launch marketing plan for Tanglaw, a Tagalog-language financial literacy newsletter for OFW families. Objective: 2,000 subscribers in the first quarter. Audience: OFW spouses managing household remittances, aged 30-55, primarily Facebook users on mobile. Geographic market: Philippines, concentrated in Region III and Region I. Budget: PHP 60,000 for the quarter. Timeframe: 1 October to 31 December. Constraints: content is written by one person; no paid endorsements; all financial statements must be general education, not advice. Deliverable: a channel plan, a four-week content calendar template, and a subscriber funnel with conversion assumptions stated as assumptions. Success measures: subscriber count, open rate, and cost per subscriber. Verification: do not state remittance volumes, OFW population figures, or platform statistics unless you attribute them to a named public source; where you cannot, mark the figure as requiring confirmation.',
      'applied-task-2': 'Two separate problems. First, an exact national figure attributed to a single cause in a year that has only just closed — job displacement attribution requires a methodology, and none is named. Second, a citation that carries the weight of the claim: a named institute, a year, and the verb "proves". That combination is the signature of a fabricated citation, so the citation itself is the first thing to test, not the last. Procedure: confirm the institution exists; find the report in its own publication list rather than in coverage; locate the 34% figure inside the document; check that the report defines "replaced by AI" the way the claim does. For the national figure, PSA labour force survey data and DOLE releases are primary; IBPAP for BPO-specific employment. If no primary source supports an exact figure, the honest output states that no reliable source supports a specific number, gives what the credible data does show, and names what remains unconfirmed. I would not soften an unverified figure with "reportedly" — that publishes the number while pretending not to.',
    },
  },
]

export const findCeeAttempt = (id) => ceeAttempts.find((attempt) => attempt.id === id) || null
