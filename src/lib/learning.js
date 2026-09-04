import { getEnrollment } from './admissions'
import { GUIDED_TRACK_OPTIONS, getLearningModules } from '../data/learning'

const STATE_KEY = 'cognita-v2-learning-state'
const SCHEMA_VERSION = 1

function emptyState() {
  return {
    schemaVersion: SCHEMA_VERSION,
    selectedTrack: GUIDED_TRACK_OPTIONS[3],
    completedLessons: [],
    submissions: {},
    feedback: {},
    capstone: { status: 'not_started', draft: '', reflection: '' },
    portfolio: [],
    supportRequests: [],
    profile: { preferredName: '', bio: '', goals: '' },
    settings: { reminders: true, reducedMotion: false },
    lastVisitedLessonId: null,
  }
}

function normalize(value) {
  const base = emptyState()
  if (!value || typeof value !== 'object') return base
  return {
    ...base,
    ...value,
    completedLessons: Array.isArray(value.completedLessons) ? value.completedLessons : [],
    submissions: value.submissions || {},
    feedback: value.feedback || {},
    capstone: { ...base.capstone, ...(value.capstone || {}) },
    portfolio: Array.isArray(value.portfolio) ? value.portfolio : [],
    supportRequests: Array.isArray(value.supportRequests) ? value.supportRequests : [],
    profile: { ...base.profile, ...(value.profile || {}) },
    settings: { ...base.settings, ...(value.settings || {}) },
  }
}

export function readLearningState() {
  try {
    return normalize(JSON.parse(localStorage.getItem(STATE_KEY) || 'null'))
  } catch {
    return emptyState()
  }
}

export function writeLearningState(next) {
  const normalized = normalize(next)
  localStorage.setItem(STATE_KEY, JSON.stringify(normalized))
  return normalized
}

export function toggleLessonComplete(lessonId) {
  const state = readLearningState()
  const exists = state.completedLessons.includes(lessonId)
  const completedLessons = exists
    ? state.completedLessons.filter((id) => id !== lessonId)
    : [...state.completedLessons, lessonId]
  return writeLearningState({ ...state, completedLessons, lastVisitedLessonId: lessonId })
}

export function saveSubmission(lessonId, text) {
  const state = readLearningState()
  const submissions = {
    ...state.submissions,
    [lessonId]: {
      lessonId,
      text: text.trim(),
      status: text.trim() ? 'submitted_for_review' : 'draft',
      updatedAt: new Date().toISOString(),
    },
  }
  const portfolio = text.trim() && !state.portfolio.includes(lessonId)
    ? [...state.portfolio, lessonId]
    : state.portfolio
  return writeLearningState({ ...state, submissions, portfolio, lastVisitedLessonId: lessonId })
}

export function saveCapstone(input) {
  const state = readLearningState()
  const status = input.draft?.trim() ? 'draft_in_progress' : 'not_started'
  return writeLearningState({
    ...state,
    capstone: {
      ...state.capstone,
      ...input,
      status,
      updatedAt: new Date().toISOString(),
    },
  })
}

export function submitCapstone() {
  const state = readLearningState()
  if (!state.capstone.draft?.trim() || !state.capstone.reflection?.trim()) return state
  return writeLearningState({
    ...state,
    capstone: {
      ...state.capstone,
      status: 'submitted_for_review',
      submittedAt: new Date().toISOString(),
    },
  })
}

export function setTrack(track) {
  const state = readLearningState()
  if (!GUIDED_TRACK_OPTIONS.includes(track)) return state
  return writeLearningState({ ...state, selectedTrack: track })
}

export function saveProfile(profile) {
  const state = readLearningState()
  return writeLearningState({ ...state, profile: { ...state.profile, ...profile } })
}

export function saveSettings(settings) {
  const state = readLearningState()
  return writeLearningState({ ...state, settings: { ...state.settings, ...settings } })
}

export function createSupportRequest(message) {
  const state = readLearningState()
  if (!message.trim()) return state
  const request = {
    id: `support_${Date.now()}`,
    message: message.trim(),
    status: 'open_local_preview',
    createdAt: new Date().toISOString(),
  }
  return writeLearningState({ ...state, supportRequests: [request, ...state.supportRequests] })
}

export function getLearningSnapshot() {
  const state = readLearningState()
  const enrollment = getEnrollment()
  const modules = getLearningModules(enrollment?.programId, state.selectedTrack)
  const lessons = modules.flatMap((module) => module.lessons)
  const completed = state.completedLessons.filter((id) => lessons.some((lesson) => lesson.id === id)).length
  const total = lessons.length
  const outputs = lessons.filter((lesson) => ['output', 'capstone'].includes(lesson.type))
  const submittedOutputs = outputs.filter((lesson) => state.submissions[lesson.id]?.text?.trim()).length

  return {
    state,
    modules,
    lessons,
    completed,
    total,
    progress: total ? Math.round((completed / total) * 100) : 0,
    requiredOutputs: outputs.length,
    submittedOutputs,
  }
}

export function clearLearningPreview() {
  localStorage.removeItem(STATE_KEY)
}
