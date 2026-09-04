/**
 * Administrative reads.
 *
 * This is a frontend architecture exercise: the admin interface proves the
 * shape of the queries an institution needs, over mock data. It performs no
 * mutations, because a mutation that does not persist anywhere is a lie told to
 * whoever clicked the button. Sections whose data has no frontend source yet
 * report themselves as not connected rather than rendering an empty table that
 * implies zero records.
 */

import { learners, staff } from '../mock/learners.js'
import { ceeAttempts } from '../mock/ceeAttempts.js'
import { evaluations } from '../mock/evaluations.js'
import { issuedCredentials } from '../mock/certificates.js'
import { announcements } from '../mock/announcements.js'
import { courses, lessons, modules, programs } from '../mock/programs.js'
import { assessments } from '../mock/assessments.js'
import { ApplicationStatus, EnrollmentStatus, EvaluationStatus, JourneyStage } from '../lib/status.js'
import { settle } from './localStore.js'

/**
 * Generic table query. Deliberately mirrors what a paginated server endpoint
 * will accept, so the tables do not change shape when the data moves.
 */
export function queryCollection(rows, { search = '', searchFields = [], filters = {}, sort = null, page = 1, pageSize = 25 } = {}) {
  const term = search.trim().toLowerCase()

  let result = rows.filter((row) => {
    const matchesSearch = !term || searchFields.some((field) => String(row[field] ?? '').toLowerCase().includes(term))
    const matchesFilters = Object.entries(filters).every(([key, value]) => !value || value === 'all' || String(row[key]) === String(value))
    return matchesSearch && matchesFilters
  })

  if (sort?.field) {
    const direction = sort.direction === 'desc' ? -1 : 1
    result = [...result].sort((a, b) => {
      const left = a[sort.field]
      const right = b[sort.field]
      if (left === right) return 0
      if (left === null || left === undefined) return 1
      if (right === null || right === undefined) return -1
      return left > right ? direction : -direction
    })
  }

  const total = result.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(1, page), pageCount)
  const start = (safePage - 1) * pageSize

  return { rows: result.slice(start, start + pageSize), total, page: safePage, pageCount, pageSize }
}

export async function getOverview() {
  const pending = evaluations.filter((item) => item.status === EvaluationStatus.PENDING_REVIEW).length
  const inReview = evaluations.filter((item) => item.status === EvaluationStatus.IN_REVIEW).length

  return settle({
    metrics: [
      { id: 'learners', label: 'Learner records', value: learners.length, note: 'Mock cohort' },
      { id: 'applications', label: 'Applications submitted', value: learners.filter((l) => l.application === ApplicationStatus.SUBMITTED).length, note: 'Of all records' },
      { id: 'attempts', label: 'CEE attempts submitted', value: ceeAttempts.length, note: 'CEE v1.0 production' },
      { id: 'pending', label: 'Awaiting evaluation', value: pending + inReview, note: `${pending} pending, ${inReview} in review` },
      { id: 'enrolled', label: 'Active enrollments', value: learners.filter((l) => l.enrollment === EnrollmentStatus.ACTIVE).length, note: 'AI-00 pathway' },
      { id: 'credentials', label: 'Credentials issued', value: issuedCredentials.filter((c) => c.state === 'issued').length, note: 'Mock records' },
    ],
    journeyBreakdown: Object.values(JourneyStage)
      .map((stage) => ({ stage, count: learners.filter((learner) => learner.journeyStage === stage).length }))
      .filter((entry) => entry.count > 0),
  }, 0)
}

export async function listLearnerRows() {
  return settle(learners.map((learner) => ({
    id: learner.id,
    reference: learner.reference,
    fullName: learner.fullName,
    email: learner.email,
    municipality: learner.municipality,
    journeyStage: learner.journeyStage,
    application: learner.application,
    enrollment: learner.enrollment,
    placement: learner.placement,
    createdAt: learner.createdAt,
  })), 0)
}

export async function listApplicationRows() {
  return settle(learners
    .filter((learner) => learner.application !== ApplicationStatus.NOT_STARTED)
    .map((learner) => ({
      id: `${learner.id}_app`,
      reference: learner.reference,
      fullName: learner.fullName,
      municipality: learner.municipality,
      status: learner.application,
      createdAt: learner.createdAt,
    })), 0)
}

export async function listExamRows() {
  return settle(ceeAttempts.map((attempt) => {
    const learner = learners.find((item) => item.id === attempt.learnerId)
    return {
      id: attempt.id,
      reference: attempt.reference,
      candidate: learner?.fullName || 'Unknown',
      submittedAt: attempt.submittedAt,
      objectivePoints: attempt.scores.objectivePoints,
      communication: Math.round(attempt.scores.communication.percentage),
      aiReadiness: attempt.scores.aiReadiness,
      placement: attempt.preliminaryPlacement,
    }
  }), 0)
}

export async function listEvaluationRows() {
  return settle(evaluations.map((evaluation) => {
    const learner = learners.find((item) => item.id === evaluation.learnerId)
    const assignee = staff.find((member) => member.id === evaluation.assignedTo)
    return {
      id: evaluation.id,
      candidate: learner?.fullName || 'Unknown',
      reference: learner?.reference || '—',
      status: evaluation.status,
      assignee: assignee?.fullName || 'Unassigned',
      completedAt: evaluation.completedAt,
    }
  }), 0)
}

export async function listPlacementRows() {
  return settle(learners
    .filter((learner) => learner.placement)
    .map((learner) => ({
      id: `${learner.id}_plc`,
      reference: learner.reference,
      fullName: learner.fullName,
      placement: learner.placement,
      enrollment: learner.enrollment,
      createdAt: learner.createdAt,
    })), 0)
}

export async function listEnrollmentRows() {
  return settle(learners
    .filter((learner) => learner.enrollment !== EnrollmentStatus.NOT_ENROLLED)
    .map((learner) => ({
      id: `${learner.id}_enr`,
      reference: learner.reference,
      fullName: learner.fullName,
      program: learner.placement === 'AI-01' ? 'AI-01 Applied AI Practice' : 'AI-00 Foundation Pathway',
      status: learner.enrollment,
      createdAt: learner.createdAt,
    })), 0)
}

export async function listCurriculumRows(kind) {
  if (kind === 'programs') {
    return settle(programs.map((program) => ({
      id: program.id, code: program.code, title: program.title, level: program.level,
      courses: program.courseIds.length, weeks: program.estimatedWeeks,
    })), 0)
  }

  if (kind === 'courses') {
    return settle(courses.map((course) => ({
      id: course.id, code: course.code, title: course.title,
      program: programs.find((program) => program.id === course.programId)?.code || '—',
      modules: course.moduleIds.length,
    })), 0)
  }

  if (kind === 'modules') {
    return settle(modules.map((module) => ({
      id: module.id, title: module.title,
      course: courses.find((course) => course.id === module.courseId)?.code || '—',
      lessons: module.lessonIds.length,
      assessment: module.assessmentId ? 'Yes' : 'No',
    })), 0)
  }

  if (kind === 'lessons') {
    return settle(lessons.map((lesson) => ({
      id: lesson.id, title: lesson.title,
      module: modules.find((module) => module.id === lesson.moduleId)?.title || '—',
      minutes: lesson.estimatedMinutes,
      state: lesson.outline ? 'Outline' : 'Written',
    })), 0)
  }

  if (kind === 'assessments') {
    return settle(assessments.map((assessment) => ({
      id: assessment.id, title: assessment.title,
      module: modules.find((module) => module.id === assessment.moduleId)?.title || '—',
      questions: assessment.questions.length,
      humanReviewed: assessment.questions.filter((question) => question.reviewedByHuman).length,
    })), 0)
  }

  return settle([], 0)
}

export async function listCertificateRows() {
  return settle(issuedCredentials.map((credential) => ({
    id: credential.credentialId,
    credentialId: credential.credentialId,
    learnerName: credential.learnerName,
    programTitle: credential.programTitle,
    issuedAt: credential.issuedAt,
    state: credential.state,
  })), 0)
}

export async function listAnnouncementRows() {
  return settle(announcements.map((announcement) => ({
    id: announcement.id,
    title: announcement.title,
    audience: announcement.audience,
    publishedAt: announcement.publishedAt,
  })), 0)
}

export async function listStaffRows() {
  return settle(staff.map((member) => ({
    id: member.id,
    fullName: member.fullName,
    role: member.role,
    email: member.email,
    state: member.active ? 'Active' : 'Inactive',
  })), 0)
}
