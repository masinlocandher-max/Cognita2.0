import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck } from 'lucide-react'
import { useAsync } from '../../hooks/useAsync.js'
import { listLearnerCertificates } from '../../repositories/certificateRepository.js'
import { useLearningContext } from '../../hooks/useLearningContext.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { CertificateState } from '../../lib/status.js'
import StatusPill from '../../components/StatusPill.jsx'
import { LoadingRows } from '../../components/StateBlock.jsx'
import Alert from '../../components/Alert.jsx'
import { formatDate } from '../../lib/format.js'

export default function Certificates() {
  useDocumentTitle('Certificates')
  const { summary, loading: contextLoading } = useLearningContext()
  const certificates = useAsync(() => listLearnerCertificates(summary ? [summary] : []), [summary?.programId, summary?.requiredComplete])

  if (contextLoading || certificates.loading) return <LoadingRows rows={3} height={120} />

  return (
    <div className="stack-7">
      <div className="page-head">
        <p className="eyebrow">Certificates</p>
        <h1>Your credentials.</h1>
        <p>A credential is issued once the required modules are complete and the written work has been reviewed.</p>
      </div>

      <Alert tone="attention" title="Credential issuance is not connected" icon="PlugZap">
        Issuing a credential is an institutional act that needs a server, a register, and a review record. This build
        can show you what you are eligible for; it cannot issue anything, and nothing here is independently verifiable.
      </Alert>

      <div className="grid-2">
        {certificates.data.map((certificate) => (
          <article className={`certificate-card${certificate.state === CertificateState.ISSUED ? ' is-issued' : ''}`} key={certificate.id}>
            <div className="certificate-head">
              <BadgeCheck size={22} aria-hidden="true" />
              <StatusPill status={certificate.state} />
            </div>

            <h2>{certificate.title}</h2>
            <p className="certificate-description">{certificate.description}</p>

            <dl className="kv-grid certificate-facts">
              <div className="kv"><dt>Credential ID</dt><dd className="tabular">{certificate.credentialId || 'Not issued'}</dd></div>
              <div className="kv"><dt>Completion date</dt><dd>{certificate.issuedAt ? formatDate(certificate.issuedAt) : '—'}</dd></div>
            </dl>

            <div className="certificate-requirements">
              <p className="field-label">Requirements</p>
              <ul className="clean-list">
                {certificate.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}
              </ul>
            </div>

            {certificate.progress ? (
              <p className="card-note">
                {certificate.progress.completedLessons} of {certificate.progress.totalLessons} lessons complete
                {certificate.progress.requiredComplete ? ' · required modules done' : ''}
              </p>
            ) : null}

            {certificate.credentialId ? (
              <Link className="link-arrow" to={`/verify/${certificate.credentialId}`}>View credential record <ArrowRight size={15} /></Link>
            ) : null}
          </article>
        ))}
      </div>

      <div className="card card--sunken">
        <p className="card-title">Credential verification</p>
        <p className="muted" style={{ fontSize: 'var(--text-sm)', margin: 'var(--s-2) 0 var(--s-4)' }}>
          Cognita credentials carry a public record so an employer can check them. The lookup exists in this build
          against sample records only.
        </p>
        <Link className="btn btn--secondary btn--sm" to="/verify">Open credential lookup <ArrowRight size={15} /></Link>
      </div>
    </div>
  )
}
