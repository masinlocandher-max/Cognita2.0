/**
 * Certificate definitions and mock issued credentials.
 *
 * Nothing here is cryptographically verifiable and the interface says so. The
 * verification screen exists to prove the flow, not the credential.
 */

import { CertificateState } from '../lib/status.js'

export const certificateDefinitions = [
  {
    id: 'cert_ai00',
    programId: 'prog_ai00',
    title: 'AI-00 Foundation Pathway',
    description: 'Awarded on completion of the required AI-00 modules and their assessments, following evaluator review of written work.',
    requirements: ['All required modules completed', 'All module assessments submitted', 'Written work reviewed by an evaluator'],
  },
  {
    id: 'cert_ai01',
    programId: 'prog_ai01',
    title: 'AI-01 Applied AI Practice',
    description: 'Awarded on completion of AI-01 including the applied portfolio.',
    requirements: ['AI-01 placement or AI-00 completion', 'All AI-01 modules completed', 'Applied portfolio reviewed'],
  },
]

/** Issued credentials backing the mock public verification screen. */
export const issuedCredentials = [
  {
    credentialId: 'CGN-AI00-7F3K2M',
    definitionId: 'cert_ai00',
    learnerName: 'Sofia Mendoza',
    learnerReference: 'CGN-2026-0009',
    programTitle: 'AI-00 Foundation Pathway',
    issuedAt: '2026-08-30T00:00:00.000Z',
    state: CertificateState.ISSUED,
  },
  {
    credentialId: 'CGN-AI00-QW82BD',
    definitionId: 'cert_ai00',
    learnerName: 'Althea Ramos',
    learnerReference: 'CGN-2026-0001',
    programTitle: 'AI-00 Foundation Pathway',
    issuedAt: '2026-08-26T00:00:00.000Z',
    state: CertificateState.REVOKED,
    revokedReason: 'Issued against an incomplete record. Reissued under a new credential id.',
  },
]

export const findCredential = (credentialId) =>
  issuedCredentials.find((credential) => credential.credentialId.toUpperCase() === String(credentialId || '').toUpperCase()) || null

export const findCertificateDefinition = (id) => certificateDefinitions.find((definition) => definition.id === id) || null
