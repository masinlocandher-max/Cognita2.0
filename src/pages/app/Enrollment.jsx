import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLearnerContext } from '../../hooks/useLearnerContext.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { placementFor } from '../../services/placementService.js'
import { EnrolmentStatus } from '../../lib/status.js'
import StateBlock, { LoadingRows } from '../../components/StateBlock.jsx'
import StatusPill from '../../components/StatusPill.jsx'
import Alert from '../../components/Alert.jsx'

/**
 * Enrolment.
 *
 * Enrolment is an institutional commitment — a place in a cohort, a fee, a
 * record. None of that exists in a frontend-only build, so this page shows the
 * shape of the step and says plainly that it cannot be completed yet rather
 * than offering a button that pretends.
 */
export default function Enrollment() {
  useDocumentTitle('Enrolment')
  const { loading, submittedAttempt } = useLearnerContext()

  if (loading) return <LoadingRows rows={3} height={90} />

  const placement = submittedAttempt?.placement ? placementFor(submittedAttempt.placement.code) : null

  return (
    <>
      <div className="page-head page-head-row">
        <div>
          <p className="eyebrow">Enrolment</p>
          <h1>Joining a cohort.</h1>
          <p>Enrolment follows placement. It confirms which programme you are joining and when your cohort begins.</p>
        </div>
        <StatusPill status={EnrolmentStatus.NOT_ENROLLED} />
      </div>

      {!placement ? (
        <StateBlock
          variant="empty"
          title="Placement comes first"
          description="Once you have a placement, your enrolment options appear here."
          action={<Link className="btn" to="/app/entrance-exam">Go to the entrance exam <ArrowRight size={16} /></Link>}
        />
      ) : (
        <div className="stack-6">
          <div className="card">
            <p className="card-title">Indicated programme</p>
            <h2 style={{ fontSize: 'var(--text-xl)', marginTop: 6 }}>
              {placement.programId === 'prog_ai01' ? 'AI-01 Applied AI Practice' : 'AI-00 Foundation Pathway'}
            </h2>
            <p className="muted" style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--s-3)', lineHeight: 1.7 }}>
              {placement.nextStep}
            </p>
          </div>

          <Alert tone="attention" title="Enrolment is not connected in this build" icon="PlugZap">
            Enrolling means a cohort place, an institutional record, and — where fees apply — a payment. None of those
            systems exist behind this preview, so there is no enrol button here. A button that recorded your intent
            in this browser and called it enrolment would be a false confirmation.
          </Alert>

          <div className="card card--sunken">
            <p className="card-title">What enrolment will involve</p>
            <ol className="numbered-list">
              <li>Confirmation of your placement after institutional review of your written responses.</li>
              <li>Selection of a cohort start date.</li>
              <li>Any applicable fee, handled through a payment provider — not collected anywhere on this site today.</li>
              <li>Issue of your enrolment record and access to the learning environment.</li>
            </ol>
          </div>

          <div className="card">
            <p className="card-title">You can explore the material now</p>
            <p className="muted" style={{ fontSize: 'var(--text-sm)', margin: 'var(--s-2) 0 var(--s-4)' }}>
              The learning environment is open in this preview so you can see the structure of the pathway before
              enrolment exists.
            </p>
            <Link className="btn btn--secondary" to="/learn/dashboard">Open the learning environment <ArrowRight size={16} /></Link>
          </div>
        </div>
      )}
    </>
  )
}
