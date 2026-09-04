import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ArrowRight, Lock } from 'lucide-react'
import { usePortalSession } from '../../hooks/usePortalSession.js'
import { openPortalSession } from '../../repositories/sessionRepository.js'
import { useDocumentTitle, useRobots } from '../../hooks/useRobots.js'
import BrandMark from '../../components/BrandMark.jsx'
import Alert from '../../components/Alert.jsx'
import { LoadingRows } from '../../components/StateBlock.jsx'

/**
 * The entrance to the Cognita Student Portal.
 *
 * A public visitor arriving here sees a sign-in screen, not the learning
 * environment. What sits behind it is a device-local session rather than
 * authentication, and the screen states that rather than implying an account
 * system exists.
 */
export default function PortalSignIn() {
  useDocumentTitle('Student Portal')
  useRobots('noindex, nofollow')
  const navigate = useNavigate()
  const { loading, session, learner } = usePortalSession()
  const [working, setWorking] = useState(false)

  if (loading) {
    return (
      <div className="portal-gate">
        <div className="portal-gate-card"><LoadingRows rows={3} height={54} /></div>
      </div>
    )
  }

  if (session) return <Navigate to="/portal/dashboard" replace />

  const enter = async () => {
    setWorking(true)
    await openPortalSession(learner)
    navigate('/portal/dashboard')
  }

  return (
    <div className="portal-gate">
      <div className="portal-gate-inner">
        <div className="portal-gate-brand">
          <BrandMark to="/" variant="light" />
          <p className="portal-gate-name">Student Portal</p>
          <p className="portal-gate-blurb">
            The private learning environment for enrolled Cognita students. Course materials,
            assessments and progress records are available here and are not published on the public
            website.
          </p>
          <Link className="link-arrow" to="/" style={{ color: 'rgba(255,255,255,.7)' }}>
            Return to the institute website <ArrowRight size={15} />
          </Link>
        </div>

        <div className="portal-gate-card">
          <span className="portal-lock" style={{ color: 'var(--slate-500)', borderColor: 'var(--slate-200)' }}>
            <Lock size={12} aria-hidden="true" /> Enrolled students
          </span>
          <h1>Sign in to the Student Portal</h1>

          <Alert tone="attention" title="Accounts are not connected yet" icon="ShieldAlert">
            Cognita has not connected student accounts, so there is no password to enter. Access below is a
            preview of the portal using the record stored on this device. It is not authentication and it
            does not protect anything.
          </Alert>

          {learner ? (
            <>
              <div className="portal-gate-identity">
                <p className="field-label">Record on this device</p>
                <p className="portal-gate-identity-name">{learner.fullName}</p>
                <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>{learner.email}</p>
              </div>
              <button className="btn btn--brand btn--block btn--lg" type="button" onClick={enter} disabled={working}>
                Continue to the Student Portal <ArrowRight size={17} />
              </button>
            </>
          ) : (
            <>
              <p className="muted" style={{ fontSize: 'var(--text-sm)', lineHeight: 1.75 }}>
                There is no student record on this device. The portal is available to enrolled students —
                if you have not applied to Cognita yet, admissions begins with an application and the
                entrance exam.
              </p>
              <Link className="btn btn--brand btn--block btn--lg" to="/admissions/apply">
                Apply to Cognita <ArrowRight size={17} />
              </Link>
              <Link className="btn btn--secondary btn--block" to="/admissions">Admissions information</Link>
            </>
          )}

          <p className="portal-gate-foot">
            Trouble signing in? Enrolled students should contact the institute through the
            {' '}<Link to="/contact">contact page</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
