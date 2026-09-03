/**
 * Curriculum and domain integrity check.
 *
 * Catches the failures that produce a broken screen rather than a build error:
 * a module pointing at a lesson that no longer exists, a lesson referencing a
 * knowledge check that was renamed, an assessment attached to no module, or a
 * status value with no presentation metadata.
 *
 * Run with: npm run verify
 */

import { courses, lessons, modules, programs } from '../src/mock/programs.js'
import { assessments, knowledgeChecks } from '../src/mock/assessments.js'
import { evaluations, TASK1_CRITERIA, TASK2_CRITERIA } from '../src/mock/evaluations.js'
import { ceeAttempts } from '../src/mock/ceeAttempts.js'
import { learners } from '../src/mock/learners.js'
import { certificateDefinitions, issuedCredentials } from '../src/mock/certificates.js'
import { PLACEMENTS } from '../src/services/placementService.js'
import { STATUS_META, ModuleState, LessonState, CertificateState, EvaluationStatus, ApplicationStatus, AttemptStatus, EnrolmentStatus } from '../src/lib/status.js'

const failures = []
const check = (label, condition, detail = '') => {
  if (!condition) failures.push(detail ? `${label} — ${detail}` : label)
}

const programIds = new Set(programs.map((program) => program.id))
const courseIds = new Set(courses.map((course) => course.id))
const moduleIds = new Set(modules.map((module) => module.id))
const lessonIds = new Set(lessons.map((lesson) => lesson.id))
const assessmentIds = new Set(assessments.map((assessment) => assessment.id))
const placementCodes = new Set(Object.keys(PLACEMENTS))

// --- Curriculum graph ---------------------------------------------------------

programs.forEach((program) => {
  program.courseIds.forEach((id) => check('program course reference', courseIds.has(id), `${program.id} → ${id}`))
  check('program certificate reference', !program.certificateId || certificateDefinitions.some((definition) => definition.id === program.certificateId), program.id)
})

courses.forEach((course) => {
  check('course program reference', programIds.has(course.programId), `${course.id} → ${course.programId}`)
  course.moduleIds.forEach((id) => check('course module reference', moduleIds.has(id), `${course.id} → ${id}`))
})

modules.forEach((module) => {
  check('module course reference', courseIds.has(module.courseId), `${module.id} → ${module.courseId}`)
  check('module has lessons', module.lessonIds.length > 0, module.id)
  module.lessonIds.forEach((id) => check('module lesson reference', lessonIds.has(id), `${module.id} → ${id}`))
  check('module assessment reference', !module.assessmentId || assessmentIds.has(module.assessmentId), `${module.id} → ${module.assessmentId}`)

  const pathwayCodes = [...(module.requiredFor || []), ...(module.optionalFor || []), ...(module.waivedFor || [])]
  pathwayCodes.forEach((code) => check('module pathway placement code', placementCodes.has(code), `${module.id} → ${code}`))
  check('module is not both required and waived for one placement',
    !(module.requiredFor || []).some((code) => (module.waivedFor || []).includes(code)), module.id)
})

lessons.forEach((lesson) => {
  check('lesson module reference', moduleIds.has(lesson.moduleId), `${lesson.id} → ${lesson.moduleId}`)
  check('lesson is reachable from its module', modules.some((module) => module.lessonIds.includes(lesson.id)), lesson.id)
  check('lesson has objectives', Array.isArray(lesson.objectives) && lesson.objectives.length > 0, lesson.id)
  check('lesson has content', Array.isArray(lesson.content) && lesson.content.length > 0, lesson.id)

  lesson.content
    .filter((block) => block.type === 'knowledge-check')
    .forEach((block) => check('lesson knowledge check reference', Boolean(knowledgeChecks[block.questionId]), `${lesson.id} → ${block.questionId}`))
})

// Every placement should leave a learner with something to do.
Object.values(PLACEMENTS)
  .filter((placement) => placement.programId)
  .forEach((placement) => {
    const program = programs.find((item) => item.id === placement.programId)
    check('placement programme exists', Boolean(program), placement.code)
    if (!program) return

    const available = modules.filter((module) => {
      const inProgram = courses.some((course) => course.programId === program.id && course.moduleIds.includes(module.id))
      return inProgram && !(module.waivedFor || []).includes(placement.code)
    })
    check('placement leaves at least one module to take', available.length > 0, placement.code)
  })

// --- Assessments --------------------------------------------------------------

assessments.forEach((assessment) => {
  check('assessment module reference', moduleIds.has(assessment.moduleId), `${assessment.id} → ${assessment.moduleId}`)
  check('assessment has questions', assessment.questions.length > 0, assessment.id)

  assessment.questions.forEach((question) => {
    check('question has points', typeof question.points === 'number', `${assessment.id}/${question.id}`)
    if (question.options) {
      const ids = question.options.map((option) => option.id)
      check('question option ids are unique', new Set(ids).size === ids.length, `${assessment.id}/${question.id}`)
      ;(question.correct || []).forEach((id) => check('question correct answer exists', ids.includes(id), `${assessment.id}/${question.id} → ${id}`))
    }
  })
})

Object.entries(knowledgeChecks).forEach(([id, question]) => {
  check('knowledge check id matches key', question.id === id, id)
  check('knowledge check has an explanation', Boolean(question.explanation), id)
  if (question.options) {
    const ids = question.options.map((option) => option.id)
    ;(question.correct || []).forEach((answer) => check('knowledge check answer exists', ids.includes(answer), `${id} → ${answer}`))
  }
})

// --- Evaluation and cohort mocks ---------------------------------------------

const learnerIds = new Set(learners.map((learner) => learner.id))
const attemptIds = new Set(ceeAttempts.map((attempt) => attempt.id))

check('rubric totals 30 points',
  [...TASK1_CRITERIA, ...TASK2_CRITERIA].reduce((sum, criterion) => sum + criterion.max, 0) === 30)

ceeAttempts.forEach((attempt) => {
  check('attempt learner reference', learnerIds.has(attempt.learnerId), attempt.id)
  check('attempt placement code', placementCodes.has(attempt.preliminaryPlacement), `${attempt.id} → ${attempt.preliminaryPlacement}`)
  check('attempt objective points in range', attempt.scores.objectivePoints >= 0 && attempt.scores.objectivePoints <= 70, attempt.id)
})

evaluations.forEach((evaluation) => {
  check('evaluation attempt reference', attemptIds.has(evaluation.attemptId), evaluation.id)
  check('evaluation learner reference', learnerIds.has(evaluation.learnerId), evaluation.id)
  Object.keys(evaluation.rubric || {}).forEach((criterionId) => {
    const criterion = [...TASK1_CRITERIA, ...TASK2_CRITERIA].find((item) => item.id === criterionId)
    check('rubric criterion exists', Boolean(criterion), `${evaluation.id} → ${criterionId}`)
    if (criterion) check('rubric score within range', evaluation.rubric[criterionId] <= criterion.max, `${evaluation.id}/${criterionId}`)
  })
})

issuedCredentials.forEach((credential) => {
  check('credential definition reference', certificateDefinitions.some((definition) => definition.id === credential.definitionId), credential.credentialId)
})

// --- Status presentation ------------------------------------------------------

const presentedStates = [
  ...Object.values(ApplicationStatus), ...Object.values(AttemptStatus), ...Object.values(EvaluationStatus),
  ...Object.values(ModuleState), ...Object.values(LessonState), ...Object.values(CertificateState),
  ...Object.values(EnrolmentStatus),
]
presentedStates.forEach((status) => {
  check('status has presentation metadata', Boolean(STATUS_META[status]), status)
  if (STATUS_META[status]) check('status has an icon (never colour alone)', Boolean(STATUS_META[status].icon), status)
})

// --- Report -------------------------------------------------------------------

if (failures.length) {
  console.error(`\nContent integrity check failed (${failures.length}):`)
  failures.forEach((failure) => console.error(`  ✗ ${failure}`))
  process.exit(1)
}

console.log(`Content integrity check passed — ${programs.length} programmes, ${courses.length} courses, ${modules.length} modules, ${lessons.length} lessons, ${assessments.length} assessments, ${Object.keys(knowledgeChecks).length} knowledge checks.`)
