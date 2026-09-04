import { Link, NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { BookOpen, GraduationCap, LayoutDashboard, LogOut, ScrollText, UserRound } from 'lucide-react'
import BrandMark from '../components/BrandMark.jsx'
import { usePortalSession } from '../hooks/usePortalSession.js'
import { closePortalSession } from '../repositories/sessionRepository.js'
import { useRobots } from '../hooks/useRobots.js'
import { initials } from '../lib/format.js'
import { LoadingRows } from '../components/StateBlock.jsx'

const NAV = [
  { to: '/portal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/portal/progress', label: 'Progress', icon: ScrollText },
  { to: '/portal/certificates', label: 'Certificates', icon: GraduationCap },
]

/**
 * The Cognita Student Portal shell.
 *
 * Visually distinct from the public website: this is a working environment, not
 * a prospectus. Reached only through the portal entrance, which redirects an
 * unauthenticated visitor back to sign-in.
 */
export default function PortalLayout() {
  useRobots('noindex, nofollow')
  const navigate = useNavigate()
  const { loading, session, learner } = usePortalSession()

  if (loading) {
    return <div className="page-width" style={{ paddingBlock: 'var(--s-9)' }}><LoadingRows rows={3} height={80} /></div>
  }

  if (!session) return <Navigate to="/portal" replace />

  return (
    <div className="portal-shell">
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="portal-bar on-ink">
        <div className="page-width portal-bar-inner">
          <div className="portal-bar-brand">
            <BrandMark to="/portal/dashboard" variant="light" compact />
            <span className="portal-bar-tag">Student Portal</span>
          </div>

          <nav className="portal-nav" aria-label="Student Portal">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
                <item.icon size={15} aria-hidden="true" />
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/apply" className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
              <UserRound size={15} aria-hidden="true" />
              Admissions record
            </NavLink>
          </nav>

          <div className="portal-bar-right">
            <span className="app-identity">
              <span className="app-avatar" aria-hidden="true">{initials(learner?.fullName)}</span>
              <span className="app-identity-text">
                <strong>{learner?.fullName || 'Student'}</strong>
                <span>{learner?.reference}</span>
              </span>
            </span>
            <button
              className="btn btn--quiet-onink btn--sm"
              type="button"
              onClick={async () => { await closePortalSession(); navigate('/portal') }}
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main id="main" className="portal-body">
        <Outlet />
      </main>

      <footer className="portal-foot">
        <div className="page-width row-between">
          <span>Cognita Student Portal · Course materials are for enrolled students.</span>
          <Link to="/" className="link-arrow"><BookOpen size={14} aria-hidden="true" /> Institute website</Link>
        </div>
      </footer>
    </div>
  )
}
