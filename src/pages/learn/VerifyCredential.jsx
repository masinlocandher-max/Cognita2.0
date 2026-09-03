import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BadgeCheck, Search } from 'lucide-react'
import { sampleCredentialIds, verifyCredential } from '../../repositories/certificateRepository.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { CertificateState } from '../../lib/status.js'
import StatusPill from '../../components/StatusPill.jsx'
import StateBlock from '../../components/StateBlock.jsx'
import Alert from '../../components/Alert.jsx'
import { formatDate } from '../../lib/format.js'

/**
 * Public credential lookup.
 *
 * The screen is explicit that this is a record lookup, not cryptographic or
 * institutional verification — a credential page that implies more than it can
 * prove is worse than no credential page at all.
 */
export default function VerifyCredential() {
  useDocumentTitle('Verify a credential')
  const { credentialId } = useParams()
  const navigate = useNavigate()
  const [query, setQuery] = useState(credentialId || '')
  const [state, setState] = useState({ status: 'idle', result: null })

  useEffect(() => {
    if (!credentialId) { setState({ status: 'idle', result: null }); return }
    setQuery(credentialId)
    setState({ status: 'loading', result: null })
    verifyCredential(credentialId).then((result) => setState({ status: 'done', result }))
  }, [credentialId])

  const record = state.result?.record

  return (
    <section className="section section--paper">
      <div className="page-width" style={{ maxWidth: 780 }}>
        <p className="eyebrow">Credential verification</p>
        <h1>Check a Cognita credential.</h1>
        <p className="lead" style={{ marginTop: 'var(--s-4)' }}>
          Enter the credential ID printed on the certificate.
        </p>

        <form
          className="verify-form"
          onSubmit={(event) => { event.preventDefault(); if (query.trim()) navigate(`/verify/${query.trim().toUpperCase()}`) }}
        >
          <div className="field" style={{ flex: 1 }}>
            <label htmlFor="credential">Credential ID</label>
            <div className="search">
              <Search size={15} aria-hidden="true" />
              <input
                id="credential"
                className="input"
                value={query}
                placeholder="CGN-AI00-XXXXXX"
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>
          <button className="btn" type="submit">Check credential</button>
        </form>

        <p className="field-hint" style={{ marginTop: 'var(--s-3)' }}>
          Sample records in this build: {sampleCredentialIds.join(', ')}
        </p>

        <div style={{ marginTop: 'var(--s-7)' }}>
          {state.status === 'loading' ? <div className="skeleton" style={{ height: 180 }} /> : null}

          {state.status === 'done' && !state.result.found ? (
            <StateBlock
              variant="empty"
              icon="SearchX"
              title="No record found"
              description={`No credential matches “${credentialId}”. Check the ID for typos — credential IDs are case-insensitive but must match exactly otherwise.`}
            />
          ) : null}

          {record ? (
            <article className={`credential-record${record.state === CertificateState.REVOKED ? ' is-revoked' : ''}`}>
              <div className="credential-record-head">
                <BadgeCheck size={26} aria-hidden="true" />
                <StatusPill status={record.state} />
              </div>

              <h2>{record.programTitle}</h2>
              <p className="credential-holder">{record.learnerName}</p>

              <dl className="kv-grid" style={{ marginTop: 'var(--s-5)' }}>
                <div className="kv"><dt>Credential ID</dt><dd className="tabular">{record.credentialId}</dd></div>
                <div className="kv"><dt>Learner reference</dt><dd className="tabular">{record.learnerReference}</dd></div>
                <div className="kv"><dt>Issued</dt><dd>{formatDate(record.issuedAt)}</dd></div>
              </dl>

              {record.state === CertificateState.REVOKED ? (
                <Alert tone="critical" title="This credential has been revoked">{record.revokedReason}</Alert>
              ) : null}
            </article>
          ) : null}
        </div>

        <Alert tone="attention" title="What this check does and does not prove" icon="Info">
          This looks up a record held by Cognita. It is not a cryptographic proof, and in this preview build the
          records are sample data rather than an institutional register. Treat it as a starting point for a query to
          Cognita, not as independent verification.
        </Alert>
      </div>
    </section>
  )
}
