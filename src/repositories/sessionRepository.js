/**
 * Student Portal access.
 *
 * There is no authentication in this build. What this provides is the
 * separation the institution requires — the public website and the private
 * learning environment are different places, and the portal is not reachable by
 * simply typing a URL — implemented as a device-local session rather than as
 * access control.
 *
 * This is obscurity, not security. Every screen involved says so, and
 * docs/BACKEND_INTEGRATION_CONTRACT.md records it as a boundary the backend
 * must close with real authentication and row-level security.
 */

import { readStore, settle, updateStore } from './localStore.js'

export async function getPortalSession() {
  const store = readStore()
  return settle(store.preferences?.portalSession || null, 0)
}

export async function openPortalSession(learner) {
  const session = {
    learnerId: learner.id,
    openedAt: new Date().toISOString(),
    method: 'device-preview',
  }
  updateStore((store) => ({ ...store, preferences: { ...store.preferences, portalSession: session } }))
  return session
}

export async function closePortalSession() {
  updateStore((store) => {
    const preferences = { ...store.preferences }
    delete preferences.portalSession
    return { ...store, preferences }
  })
  return true
}
