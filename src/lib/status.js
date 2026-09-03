/**
 * Explicit status models for Cognita 2.0.
 *
 * Every state the interface can show is named here once, with its label and
 * visual tone. UI code reads these; it never assembles state out of ad-hoc
 * boolean combinations, and it never relies on colour alone — each tone is
 * paired with an icon and a text label wherever it is rendered.
 */

/** Where a person is in the end-to-end Cognita journey. */
export const JourneyStage = {
  GUEST: 'guest',
  APPLICANT: 'applicant',
  CEE_IN_PROGRESS: 'cee_in_progress',
  CEE_SUBMITTED: 'cee_submitted',
  AWAITING_REVIEW: 'awaiting_review',
  PLACEMENT_ISSUED: 'placement_issued',
  ENROLLED: 'enrolled',
  ACTIVE_LEARNER: 'active_learner',
  PROGRAM_COMPLETE: 'program_complete',
}

export const JOURNEY_STEPS = [
  { stage: JourneyStage.APPLICANT, label: 'Application', short: 'Apply' },
  { stage: JourneyStage.CEE_SUBMITTED, label: 'Entrance Exam', short: 'Exam' },
  { stage: JourneyStage.AWAITING_REVIEW, label: 'Institutional review', short: 'Review' },
  { stage: JourneyStage.PLACEMENT_ISSUED, label: 'Placement', short: 'Placement' },
  { stage: JourneyStage.ENROLLED, label: 'Enrolment', short: 'Enrol' },
  { stage: JourneyStage.ACTIVE_LEARNER, label: 'Learning', short: 'Learn' },
]

export const JOURNEY_ORDER = [
  JourneyStage.GUEST,
  JourneyStage.APPLICANT,
  JourneyStage.CEE_IN_PROGRESS,
  JourneyStage.CEE_SUBMITTED,
  JourneyStage.AWAITING_REVIEW,
  JourneyStage.PLACEMENT_ISSUED,
  JourneyStage.ENROLLED,
  JourneyStage.ACTIVE_LEARNER,
  JourneyStage.PROGRAM_COMPLETE,
]

export const ApplicationStatus = {
  NOT_STARTED: 'not_started',
  DRAFT: 'draft',
  READY: 'ready',
  SUBMITTED: 'submitted',
}

export const AttemptStatus = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  SUBMITTED: 'submitted',
  SUPERSEDED: 'superseded',
}

export const EvaluationStatus = {
  PENDING_REVIEW: 'pending_review',
  IN_REVIEW: 'in_review',
  REVIEWED: 'reviewed',
  PLACEMENT_ISSUED: 'placement_issued',
}

export const PlacementCode = {
  AI_01: 'AI-01',
  AI_00_COMMUNICATION: 'AI-00-COMMUNICATION',
  AI_00_FOUNDATIONS: 'AI-00-FOUNDATIONS',
  AI_00_FULL: 'AI-00-FULL',
  TARGETED_BRIDGE: 'BRIDGE-REVIEW',
  MANUAL_REVIEW: 'MANUAL-REVIEW',
}

export const ModuleState = {
  LOCKED: 'locked',
  REQUIRED: 'required',
  OPTIONAL: 'optional',
  CURRENT: 'current',
  WAIVED: 'waived',
  COMPLETED: 'completed',
}

export const LessonState = {
  LOCKED: 'locked',
  AVAILABLE: 'available',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
}

export const CertificateState = {
  NOT_EARNED: 'not_earned',
  ELIGIBLE: 'eligible',
  ISSUED: 'issued',
  REVOKED: 'revoked',
}

export const EnrolmentStatus = {
  NOT_ENROLLED: 'not_enrolled',
  PENDING: 'pending',
  ACTIVE: 'active',
  COMPLETED: 'completed',
}

export const AssessmentAttemptStatus = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  SUBMITTED: 'submitted',
  AWAITING_REVIEW: 'awaiting_review',
  SCORED: 'scored',
}

export const QuestionType = {
  SINGLE_CHOICE: 'single_choice',
  MULTIPLE_CHOICE: 'multiple_choice',
  TRUE_FALSE: 'true_false',
  SHORT_RESPONSE: 'short_response',
  ESSAY: 'essay',
  SCENARIO_JUDGMENT: 'scenario_judgment',
  FILE_SUBMISSION: 'file_submission',
  PROJECT_SUBMISSION: 'project_submission',
  HUMAN_REVIEWED_TASK: 'human_reviewed_task',
}

/**
 * Presentation metadata. `tone` maps to a status class; `icon` names a lucide
 * icon resolved by the StatusPill component so status is never colour-only.
 */
export const STATUS_META = {
  // Application
  [ApplicationStatus.NOT_STARTED]: { label: 'Not started', tone: 'quiet', icon: 'Circle' },
  [ApplicationStatus.DRAFT]: { label: 'Draft', tone: 'attention', icon: 'PencilLine' },
  [ApplicationStatus.READY]: { label: 'Ready to submit', tone: 'info', icon: 'CircleCheck' },
  [ApplicationStatus.SUBMITTED]: { label: 'Submitted', tone: 'positive', icon: 'CircleCheck' },

  // CEE attempt
  [AttemptStatus.NOT_STARTED]: { label: 'Not started', tone: 'quiet', icon: 'Circle' },
  [AttemptStatus.IN_PROGRESS]: { label: 'In progress', tone: 'attention', icon: 'Hourglass' },
  [AttemptStatus.SUBMITTED]: { label: 'Submitted', tone: 'positive', icon: 'CircleCheck' },
  [AttemptStatus.SUPERSEDED]: { label: 'Superseded questionnaire', tone: 'quiet', icon: 'Archive' },

  // Evaluation
  [EvaluationStatus.PENDING_REVIEW]: { label: 'Pending review', tone: 'attention', icon: 'Inbox' },
  [EvaluationStatus.IN_REVIEW]: { label: 'In review', tone: 'info', icon: 'PenSquare' },
  [EvaluationStatus.REVIEWED]: { label: 'Reviewed', tone: 'accent', icon: 'ClipboardCheck' },
  [EvaluationStatus.PLACEMENT_ISSUED]: { label: 'Placement issued', tone: 'positive', icon: 'BadgeCheck' },

  // Modules
  [ModuleState.LOCKED]: { label: 'Locked', tone: 'quiet', icon: 'Lock' },
  [ModuleState.REQUIRED]: { label: 'Required', tone: 'info', icon: 'Asterisk' },
  [ModuleState.OPTIONAL]: { label: 'Optional', tone: 'quiet', icon: 'CirclePlus' },
  [ModuleState.CURRENT]: { label: 'Current', tone: 'accent', icon: 'PlayCircle' },
  [ModuleState.WAIVED]: { label: 'Waived by placement', tone: 'accent', icon: 'FastForward' },
  [ModuleState.COMPLETED]: { label: 'Completed', tone: 'positive', icon: 'CircleCheck' },

  // Lessons
  [LessonState.AVAILABLE]: { label: 'Not started', tone: 'quiet', icon: 'Circle' },
  [LessonState.IN_PROGRESS]: { label: 'In progress', tone: 'attention', icon: 'Hourglass' },
  [LessonState.COMPLETED]: { label: 'Completed', tone: 'positive', icon: 'CircleCheck' },

  // Certificates
  [CertificateState.NOT_EARNED]: { label: 'Not earned', tone: 'quiet', icon: 'Circle' },
  [CertificateState.ELIGIBLE]: { label: 'Eligible', tone: 'info', icon: 'Sparkles' },
  [CertificateState.ISSUED]: { label: 'Issued', tone: 'positive', icon: 'BadgeCheck' },
  [CertificateState.REVOKED]: { label: 'Revoked', tone: 'critical', icon: 'CircleSlash' },

  // Enrolment
  [EnrolmentStatus.NOT_ENROLLED]: { label: 'Not enrolled', tone: 'quiet', icon: 'Circle' },
  [EnrolmentStatus.PENDING]: { label: 'Pending', tone: 'attention', icon: 'Hourglass' },
  [EnrolmentStatus.ACTIVE]: { label: 'Active', tone: 'positive', icon: 'CircleCheck' },
  [EnrolmentStatus.COMPLETED]: { label: 'Completed', tone: 'accent', icon: 'Flag' },

  // Assessment attempts
  [AssessmentAttemptStatus.AWAITING_REVIEW]: { label: 'Awaiting review', tone: 'attention', icon: 'Inbox' },
  [AssessmentAttemptStatus.SCORED]: { label: 'Scored', tone: 'positive', icon: 'CircleCheck' },
}

export function statusMeta(value, fallbackLabel = 'Unknown') {
  return STATUS_META[value] || { label: fallbackLabel, tone: 'quiet', icon: 'Circle' }
}
