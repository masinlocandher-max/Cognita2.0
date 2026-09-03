/**
 * The admissions application.
 *
 * "Submitted" here means submitted into device-local storage. No application
 * reaches Cognita in this build, and the interface never claims otherwise.
 */

import { ApplicationStatus } from '../lib/status.js'
import { readStore, settle, updateStore } from './localStore.js'

export const APPLICATION_FIELDS = [
  { id: 'goal', label: 'What do you want to be able to do after Cognita?', type: 'textarea', required: true, hint: 'A few sentences is enough. Be specific about the work, not the technology.' },
  { id: 'background', label: 'Current work or study', type: 'text', required: true },
  { id: 'municipality', label: 'City or municipality', type: 'text', required: true },
  { id: 'experience', label: 'How would you describe your experience with AI tools?', type: 'select', required: true, options: ['None yet', 'Occasional use', 'Regular use for work', 'I build with AI tools'] },
  { id: 'englishComfort', label: 'How comfortable are you writing in English at work?', type: 'select', required: true, options: ['Not comfortable yet', 'Somewhat comfortable', 'Comfortable', 'Very comfortable'] },
  { id: 'availability', label: 'Hours per week you can commit', type: 'select', required: true, options: ['Under 3 hours', '3-5 hours', '6-10 hours', 'More than 10 hours'] },
  { id: 'accessibility', label: 'Anything we should know to support you? (optional)', type: 'textarea', required: false, hint: 'Access needs, connectivity constraints, schedule limits.' },
]

const emptyApplication = () => ({
  id: null,
  status: ApplicationStatus.NOT_STARTED,
  answers: {},
  startedAt: null,
  submittedAt: null,
  updatedAt: null,
})

export async function getApplication() {
  return settle(readStore().application || emptyApplication(), 0)
}

export function deriveApplicationStatus(application) {
  if (!application || application.status === ApplicationStatus.SUBMITTED) {
    return application?.status || ApplicationStatus.NOT_STARTED
  }

  const answered = APPLICATION_FIELDS.filter((field) => field.required)
    .every((field) => String(application.answers?.[field.id] || '').trim().length > 0)

  if (answered) return ApplicationStatus.READY
  const started = Object.values(application.answers || {}).some((value) => String(value || '').trim().length > 0)
  return started ? ApplicationStatus.DRAFT : ApplicationStatus.NOT_STARTED
}

export async function saveApplicationDraft(answers) {
  const now = new Date().toISOString()
  let saved = null

  updateStore((store) => {
    const current = store.application || emptyApplication()
    const next = {
      ...current,
      id: current.id || `app_${Date.now().toString(36)}`,
      answers: { ...current.answers, ...answers },
      startedAt: current.startedAt || now,
      updatedAt: now,
    }
    saved = { ...next, status: deriveApplicationStatus(next) }
    return { ...store, application: saved }
  })

  return saved
}

export async function submitApplication() {
  const now = new Date().toISOString()
  let saved = null

  updateStore((store) => {
    const current = store.application || emptyApplication()
    saved = { ...current, status: ApplicationStatus.SUBMITTED, submittedAt: now, updatedAt: now }
    return { ...store, application: saved }
  })

  return saved
}
