/**
 * Evaluator queue records. One per submitted CEE attempt.
 *
 * Rubric scores follow docs/cee-v1-scoring-guide.md: Task 1 is five criteria of
 * 0-3; Task 2 is 3/4/3/3/2. Records in PENDING_REVIEW carry no scores yet.
 */

import { EvaluationStatus, PlacementCode } from '../lib/status.js'

export const TASK1_CRITERIA = [
  { id: 't1_objective', label: 'Objective and context', max: 3 },
  { id: 't1_audience', label: 'Audience, market, budget, timeframe', max: 3 },
  { id: 't1_deliverable', label: 'Deliverable and structure', max: 3 },
  { id: 't1_verification', label: 'Verification and responsible use', max: 3 },
  { id: 't1_clarity', label: 'Clarity and professional instruction', max: 3 },
]

export const TASK2_CRITERIA = [
  { id: 't2_recognition', label: 'Recognition of unsupported claims', max: 3 },
  { id: 't2_strategy', label: 'Verification strategy and source quality', max: 4 },
  { id: 't2_uncertainty', label: 'Treatment of uncertainty', max: 3 },
  { id: 't2_reasoning', label: 'Reasoning quality', max: 3 },
  { id: 't2_communication', label: 'Communication quality', max: 2 },
]

export const evaluations = [
  {
    id: 'evl_001', attemptId: 'cee_m001', learnerId: 'lnr_003',
    status: EvaluationStatus.PENDING_REVIEW,
    assignedTo: null, openedAt: null, completedAt: null,
    rubric: {}, notes: '', decision: null,
  },
  {
    id: 'evl_002', attemptId: 'cee_m002', learnerId: 'lnr_004',
    status: EvaluationStatus.PENDING_REVIEW,
    assignedTo: null, openedAt: null, completedAt: null,
    rubric: {}, notes: '', decision: null,
  },
  {
    id: 'evl_003', attemptId: 'cee_m003', learnerId: 'lnr_010',
    status: EvaluationStatus.IN_REVIEW,
    assignedTo: 'stf_002', openedAt: '2026-08-31T02:10:00.000Z', completedAt: null,
    rubric: { t1_objective: 3, t1_audience: 3, t1_deliverable: 2, t1_verification: 3, t1_clarity: 3 },
    notes: 'Task 1 is strong — the assumption-flagging instruction is exactly what we want to see. Still reading Task 2.',
    decision: null,
  },
  {
    id: 'evl_004', attemptId: 'cee_m004', learnerId: 'lnr_006',
    status: EvaluationStatus.REVIEWED,
    assignedTo: 'stf_001', openedAt: '2026-08-31T23:00:00.000Z', completedAt: '2026-09-01T01:15:00.000Z',
    rubric: {
      t1_objective: 2, t1_audience: 2, t1_deliverable: 2, t1_verification: 2, t1_clarity: 2,
      t2_recognition: 2, t2_strategy: 2, t2_uncertainty: 2, t2_reasoning: 2, t2_communication: 1,
    },
    notes: 'Consistently mid-band. Recognises the citation problem without describing how to test it. Objective profile already sits in the bridge range; the applied work agrees. Recommend targeted bridge with communication emphasis.',
    decision: null,
  },
  {
    id: 'evl_005', attemptId: 'cee_m005', learnerId: 'lnr_002',
    status: EvaluationStatus.PLACEMENT_ISSUED,
    assignedTo: 'stf_001', openedAt: '2026-08-23T00:20:00.000Z', completedAt: '2026-08-23T01:05:00.000Z',
    rubric: {
      t1_objective: 3, t1_audience: 3, t1_deliverable: 3, t1_verification: 3, t1_clarity: 3,
      t2_recognition: 3, t2_strategy: 4, t2_uncertainty: 3, t2_reasoning: 3, t2_communication: 2,
    },
    notes: 'Full marks on both tasks and the reasoning is genuinely independent — the point about "reportedly" publishing the number while pretending not to is the strongest sentence in this batch. Progresses to AI-01.',
    decision: PlacementCode.AI_01,
  },
]

export const findEvaluation = (id) => evaluations.find((evaluation) => evaluation.id === id) || null
export const findEvaluationByAttempt = (attemptId) => evaluations.find((evaluation) => evaluation.attemptId === attemptId) || null
