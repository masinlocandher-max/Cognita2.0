/**
 * Learner identity.
 *
 * Today this is a device-local profile with no authentication behind it. The
 * interface is shaped for what replaces it — a Supabase Auth session and a
 * `learners` row keyed by the auth user id — so call sites do not change when
 * identity becomes real. See docs/BACKEND_INTEGRATION_CONTRACT.md.
 */

import { uid } from '../lib/id.js'
import { readStore, settle, updateStore } from './localStore.js'

const READ_DELAY = 0

export async function getCurrentLearner() {
  return settle(readStore().learner, READ_DELAY)
}

export async function saveLearner(input) {
  const now = new Date().toISOString()
  let saved = null

  updateStore((store) => {
    const existing = store.learner
    saved = {
      id: existing?.id || uid('lnr'),
      reference: existing?.reference || `CGN-LOCAL-${String(Date.now()).slice(-4)}`,
      fullName: input.fullName.trim(),
      email: input.email.trim().toLowerCase(),
      municipality: (input.municipality || existing?.municipality || '').trim(),
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    }
    return { ...store, learner: saved }
  })

  return saved
}

/**
 * Removes the entire device record.
 *
 * Named for what it does — this is not "deleting an account", because no
 * account exists yet.
 */
export async function clearLocalIdentity() {
  const { clearStore } = await import('./localStore.js')
  clearStore()
  return true
}
