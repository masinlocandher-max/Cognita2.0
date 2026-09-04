/**
 * Journey state.
 *
 * One function decides where a person is and what they should do next. Every
 * dashboard, nav item and call to action reads from it, so the product cannot
 * end up telling a learner two different things in two places.
 */

import { ApplicationStatus, AttemptStatus, EnrollmentStatus, JourneyStage } from '../lib/status.js'
import { attemptStatus } from '../repositories/ceeRepository.js'
import { deriveApplicationStatus } from '../repositories/admissionsRepository.js'

/**
 * @param {object} input
 * @param {object|null} input.learner
 * @param {object|null} input.application
 * @param {object|null} input.activeAttempt   in-progress attempt on the current questionnaire
 * @param {object|null} input.submittedAttempt most recent submitted attempt
 * @param {object|null} input.enrollment
 */
export function deriveJourney({ learner, application, activeAttempt, submittedAttempt, enrollment, programSummary } = {}) {
  const applicationStatus = deriveApplicationStatus(application)
  const examStatus = attemptStatus(activeAttempt || submittedAttempt)

  if (!learner) {
    return {
      stage: JourneyStage.GUEST,
      applicationStatus,
      examStatus: AttemptStatus.NOT_STARTED,
      nextAction: {
        label: 'Begin your student journey',
        to: '/apply/profile',
        description: 'Set up a learner record on this device to start your application.',
      },
    }
  }

  if (enrollment?.status === EnrollmentStatus.COMPLETED || programSummary?.requiredComplete) {
    return {
      stage: JourneyStage.PROGRAM_COMPLETE,
      applicationStatus,
      examStatus,
      nextAction: { label: 'View certificates', to: '/portal/certificates', description: 'Your required modules are complete.' },
    }
  }

  if (enrollment?.status === EnrollmentStatus.ACTIVE) {
    return {
      stage: JourneyStage.ACTIVE_LEARNER,
      applicationStatus,
      examStatus,
      nextAction: { label: 'Continue learning', to: '/portal/dashboard', description: 'Continue your study in the Student Portal.' },
    }
  }

  if (submittedAttempt?.placement) {
    if (enrollment?.status === EnrollmentStatus.PENDING) {
      return {
        stage: JourneyStage.ENROLLED,
        applicationStatus,
        examStatus,
        nextAction: { label: 'View enrollment', to: '/apply/enrollment', description: 'Your enrollment request is recorded on this device.' },
      }
    }

    return {
      stage: JourneyStage.PLACEMENT_ISSUED,
      applicationStatus,
      examStatus,
      nextAction: { label: 'View placement', to: '/apply/placement', description: 'See your readiness profile and recommended starting point.' },
      caveat: 'Preliminary — applied responses still require institutional review.',
    }
  }

  if (submittedAttempt) {
    return {
      stage: JourneyStage.AWAITING_REVIEW,
      applicationStatus,
      examStatus: AttemptStatus.SUBMITTED,
      nextAction: { label: 'View readiness profile', to: '/apply/result', description: 'Your objective profile is complete.' },
    }
  }

  if (activeAttempt?.startedAt) {
    return {
      stage: JourneyStage.CEE_IN_PROGRESS,
      applicationStatus,
      examStatus: AttemptStatus.IN_PROGRESS,
      nextAction: { label: 'Resume entrance exam', to: '/apply/entrance-exam', description: 'Your progress is saved on this device.' },
    }
  }

  if (applicationStatus === ApplicationStatus.SUBMITTED) {
    return {
      stage: JourneyStage.APPLICANT,
      applicationStatus,
      examStatus,
      nextAction: { label: 'Begin entrance exam', to: '/apply/entrance-exam', description: '70 minutes recommended. Progress is saved as you go.' },
    }
  }

  return {
    stage: JourneyStage.APPLICANT,
    applicationStatus,
    examStatus,
    nextAction: {
      label: applicationStatus === ApplicationStatus.NOT_STARTED ? 'Start your application' : 'Continue application',
      to: '/apply/application',
      description: 'A short set of questions about your goals and background.',
    },
  }
}

/** How far along the visible journey rail the learner is. */
export function journeyProgressIndex(stage) {
  const order = [
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
  return Math.max(0, order.indexOf(stage))
}
