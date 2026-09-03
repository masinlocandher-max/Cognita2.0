/**
 * Certificates and the public credential lookup.
 *
 * Nothing here is cryptographically verifiable. The lookup reads a mock record
 * and the screen states plainly that institutional verification is not
 * connected — a credential page that implies more than it can prove is worse
 * than no credential page.
 */

import { certificateDefinitions, findCertificateDefinition, findCredential, issuedCredentials } from '../mock/certificates.js'
import { CertificateState } from '../lib/status.js'
import { readStore, settle } from './localStore.js'

export async function listCertificateDefinitions() {
  return settle(certificateDefinitions, 0)
}

/**
 * A learner's certificate position.
 *
 * Eligibility is derived from real local progress; issuance is not, because
 * issuing a credential is an institutional act that needs a backend.
 */
export async function listLearnerCertificates(programStates = []) {
  const local = readStore().certificates

  return settle(certificateDefinitions.map((definition) => {
    const issued = local.find((record) => record.definitionId === definition.id)
    if (issued) return { ...definition, state: issued.state, credentialId: issued.credentialId, issuedAt: issued.issuedAt }

    const programState = programStates.find((state) => state.programId === definition.programId)
    const eligible = programState?.requiredComplete === true

    return {
      ...definition,
      state: eligible ? CertificateState.ELIGIBLE : CertificateState.NOT_EARNED,
      credentialId: null,
      issuedAt: null,
      progress: programState || null,
    }
  }), 0)
}

export async function verifyCredential(credentialId) {
  const record = findCredential(credentialId)
  return settle(record ? { found: true, record, definition: findCertificateDefinition(record.definitionId) } : { found: false, record: null }, 220)
}

export const sampleCredentialIds = issuedCredentials.map((credential) => credential.credentialId)
