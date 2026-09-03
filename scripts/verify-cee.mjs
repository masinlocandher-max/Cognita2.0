/**
 * CEE v1.0 integrity check.
 *
 * Guards the two things that silently break a placement instrument:
 * the questionnaire drifting from the approved item set, and the scoring
 * drifting from the approved formulas and placement bands.
 *
 * Run with: npm run verify
 */

import { appliedTasks, examMeta, examSections } from '../src/features/cee/questionnaire.js'
import { derivePlacement, scoreObjective } from '../src/features/cee/scoring.js'

const OFFICIAL_KEY =
  '1C 2A 3D 4B 5C 6B 7D 8A 9B 10C 11A 12D 13B 14C 15A 16D 17C 18B 19A 20D 21B 22C 23A 24D 25B ' +
  '26B 27D 28A 29C 30B 31D 32C 33A 34B 35D 36A 37C 38B 39D 40A ' +
  '41C 42A 43D 44B 45C'

const failures = []
const check = (label, condition, detail = '') => {
  if (condition) return
  failures.push(detail ? `${label} — ${detail}` : label)
}

const questions = examSections.flatMap((section) => section.questions)

// --- Questionnaire integrity -------------------------------------------------

check('45 objective items', questions.length === 45, `found ${questions.length}`)
check('section shape 25/15/5', examSections.map((s) => s.questions.length).join('/') === '25/15/5')
check('section weights 30/25/15', examSections.map((s) => s.pointsMax).join('/') === '30/25/15')
check('section weights sum to the objective maximum', examSections.reduce((sum, s) => sum + s.pointsMax, 0) === examMeta.objectivePoints)
check('item ids are 1..45 in order', questions.every((q, index) => q.id === index + 1))
check('every item has four options', questions.every((q) => q.options.length === 4))
check('every option is distinct within its item', questions.every((q) => new Set(q.options).size === 4))
check('every keyed answer is in range', questions.every((q) => Number.isInteger(q.answer) && q.answer >= 0 && q.answer <= 3))
check('no empty prompts', questions.every((q) => typeof q.prompt === 'string' && q.prompt.trim().length > 10))

const derivedKey = questions.map((q) => `${q.id}${String.fromCharCode(65 + q.answer)}`).join(' ')
check('answer key matches the approved CEE v1.0 key', derivedKey === OFFICIAL_KEY, `derived: ${derivedKey}`)

const scenarioTargets = examSections.flatMap((section) => (section.scenarios || []).flatMap((s) => s.appliesTo))
check('every scenario points at real items', scenarioTargets.every((id) => questions.some((q) => q.id === id)))

check('two applied tasks worth 30 points', appliedTasks.length === 2 && appliedTasks.reduce((sum, t) => sum + t.points, 0) === examMeta.appliedPoints)
check('objective + applied = 100', examMeta.objectivePoints + examMeta.appliedPoints === examMeta.totalPoints)

// --- Scoring and placement ---------------------------------------------------

/** Build an answer sheet with the first n items of each section correct. */
function answerSheet({ communication, ai, research }) {
  const wanted = { communication, ai, research }
  const answers = {}

  examSections.forEach((section) => {
    section.questions.forEach((question, index) => {
      const correct = index < wanted[section.id]
      answers[question.id] = correct ? question.answer : (question.answer + 1) % 4
    })
  })

  return answers
}

const cases = [
  { label: 'perfect paper', sheet: { communication: 25, ai: 15, research: 5 }, points: 70, code: 'AI-01' },
  { label: 'blank-equivalent paper', sheet: { communication: 0, ai: 0, research: 0 }, points: 0, code: 'AI-00-FULL' },
  { label: 'both areas exactly at threshold', sheet: { communication: 20, ai: 12, research: 4 }, points: 56, code: 'AI-01' },
  { label: 'strong AI, weak communication', sheet: { communication: 17, ai: 14, research: 5 }, points: 59, code: 'AI-00-COMMUNICATION' },
  { label: 'strong communication, weak AI', sheet: { communication: 22, ai: 8, research: 2 }, points: 46, code: 'AI-00-FOUNDATIONS' },
  { label: 'both areas below support threshold', sheet: { communication: 15, ai: 9, research: 3 }, points: 42, code: 'AI-00-FULL' },
  { label: 'communication in the 70-79 band', sheet: { communication: 19, ai: 12, research: 4 }, points: 55, code: 'BRIDGE-REVIEW' },
  { label: 'AI readiness in the 70-79 band', sheet: { communication: 24, ai: 11, research: 4 }, points: 59, code: 'BRIDGE-REVIEW' },
]

cases.forEach(({ label, sheet, points, code }) => {
  const scored = scoreObjective(examSections, answerSheet(sheet))
  check(`${label}: objective points`, scored.objectivePoints === points, `expected ${points}, got ${scored.objectivePoints}`)
  check(`${label}: placement`, scored.placement.code === code, `expected ${code}, got ${scored.placement.code}`)
  check(`${label}: points within range`, scored.objectivePoints >= 0 && scored.objectivePoints <= 70)
})

// Thresholds are inclusive at 80 and exclusive at 70, and are not rounded up.
check('79.9% does not round into progression', derivePlacement(79.9, 100).code !== 'AI-01')
check('80% exactly is progression', derivePlacement(80, 80).code === 'AI-01')
check('69.9% communication is below support', derivePlacement(69.9, 100).code === 'AI-00-COMMUNICATION')
check('70% communication is a bridge case', derivePlacement(70, 100).code === 'BRIDGE-REVIEW')

// --- Report ------------------------------------------------------------------

if (failures.length) {
  console.error(`\nCEE integrity check failed (${failures.length}):`)
  failures.forEach((failure) => console.error(`  ✗ ${failure}`))
  process.exit(1)
}

console.log(`CEE v1.0 integrity check passed — ${questions.length} objective items, ${appliedTasks.length} applied tasks, ${examMeta.totalPoints} points.`)
