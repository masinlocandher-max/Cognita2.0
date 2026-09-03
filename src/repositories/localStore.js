/**
 * The one place in Cognita 2.0 that touches browser storage.
 *
 * Every repository reads and writes through this adapter, and no component
 * imports it directly. When the production backend arrives, the repositories
 * swap their implementation and this file is deleted — call sites do not move.
 *
 * Everything here is device-local. Nothing is transmitted anywhere.
 */

const STORE_KEY = 'cognita.v2.device'
const V1_KEY = 'cognita-v2-device-state'
const LEGACY_CEE_KEY = 'cognita-cee-v1-progress'
const SCHEMA_VERSION = 2

const listeners = new Set()

export const emptyStore = () => ({
  schemaVersion: SCHEMA_VERSION,
  learner: null,
  application: null,
  attempts: [],
  placements: [],
  enrolments: [],
  lessonProgress: {},
  moduleOverrides: {},
  assessmentAttempts: [],
  certificates: [],
  evaluations: {},
  preferences: {},
})

function hasStorage() {
  try {
    return typeof window !== 'undefined' && !!window.localStorage
  } catch {
    return false
  }
}

function migrate(raw) {
  if (!raw || typeof raw !== 'object') return null

  if (raw.schemaVersion === SCHEMA_VERSION) return { ...emptyStore(), ...raw, schemaVersion: SCHEMA_VERSION }

  // v1 held only a learner profile and CEE attempts.
  return {
    ...emptyStore(),
    learner: raw.learner || null,
    attempts: Array.isArray(raw.attempts) ? raw.attempts : [],
  }
}

/** Reads the whole device store. Never throws — a corrupt store reads as empty. */
export function readStore() {
  if (!hasStorage()) return emptyStore()

  try {
    const current = JSON.parse(window.localStorage.getItem(STORE_KEY) || 'null')
    if (current) return migrate(current)

    const legacy = JSON.parse(window.localStorage.getItem(V1_KEY) || 'null')
    if (legacy) {
      const migrated = migrate(legacy)
      window.localStorage.setItem(STORE_KEY, JSON.stringify(migrated))
      return migrated
    }
  } catch {
    return emptyStore()
  }

  return emptyStore()
}

export function writeStore(next) {
  const value = { ...emptyStore(), ...next, schemaVersion: SCHEMA_VERSION }
  if (hasStorage()) {
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(value))
    } catch {
      // Storage full or blocked (private mode). The session continues in memory
      // for this page view; callers surface persistence limits in the UI copy.
    }
  }
  listeners.forEach((listener) => listener(value))
  return value
}

/** Read-modify-write in one step. `updater` receives a copy of the store. */
export function updateStore(updater) {
  return writeStore(updater(readStore()))
}

export function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function clearStore() {
  if (hasStorage()) {
    window.localStorage.removeItem(STORE_KEY)
    window.localStorage.removeItem(V1_KEY)
    window.localStorage.removeItem(LEGACY_CEE_KEY)
  }
  const value = emptyStore()
  listeners.forEach((listener) => listener(value))
  return value
}

/**
 * A small artificial delay on reads.
 *
 * Repositories are async because the production backend will be. Keeping a
 * short delay here means loading and error states are exercised in development
 * instead of being discovered when the network appears.
 */
export function settle(value, ms = 0) {
  if (!ms) return Promise.resolve(value)
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}
