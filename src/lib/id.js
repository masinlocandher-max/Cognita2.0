/**
 * Identifier helpers.
 *
 * Every entity that will later live in a database is given a stable, prefixed
 * id now, so local records can be migrated rather than regenerated. See
 * docs/BACKEND_INTEGRATION_CONTRACT.md for the id prefixes per entity.
 */

export function uid(prefix) {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}_${crypto.randomUUID()}`
  }

  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
}

/** Human-readable credential id, e.g. CGN-AI00-7F3K2M. */
export function credentialId(programCode) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let suffix = ''
  for (let i = 0; i < 6; i += 1) suffix += alphabet[Math.floor(Math.random() * alphabet.length)]
  return `CGN-${programCode}-${suffix}`
}
