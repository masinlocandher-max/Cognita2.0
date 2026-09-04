import { Link, NavLink, Outlet } from 'react-router-dom'
import { ArrowLeft, ClipboardList, FileText, MapPin, ScrollText, UserRound } from 'lucide-react'
import BrandMark from '../components/BrandMark.jsx'
import { useLearnerContext } from '../hooks/useLearnerContext.js'
import { useRobots } from '../hooks/useRobots.js'
import { initials } from '../lib/format.js'

const NAV = [
  { to: '/apply', label: 'Overview', icon: ClipboardList, end: true },
  { to: '/apply/profile', label: 'Your details', icon: UserRound },
  { to: '/apply/application', label: 'Application', icon: FileText },
  { to: '/apply/entrance-exam', label: 'Entrance Exam', icon: ClipboardList },
  { to: '/apply/result', label: 'Readiness profile', icon: ScrollText },
  { to: '/apply/placement', label: 'Placement', icon: MapPin },
]

/**
 * The applicant workspace.
 *
 * Admissions activity — application and entrance exam — happens here, before
 * enrollment. It is deliberately separate from the Student Portal, which is for
 * enrolled students and holds course material.
 */
export default function ApplyLayout() {
  useRobots('noindex, nofollow')
  const { learner } = useLearnerContext()

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="apply-bar">
        <div className="page-width apply-bar-inner">
          <div className="portal-bar-brand">
            <BrandMark to="/" />
            <span className="apply-bar-tag">Admissions</span>
          </div>

          <div className="app-bar-right">
            <Link className="btn btn--ghost btn--sm" to="/"><ArrowLeft size={14} /> Institute website</Link>
            {learner ? (
              <span className="app-identity">
                <span className="app-avatar app-avatar--light" aria-hidden="true">{initials(learner.fullName)}</span>
                <span className="app-identity-text">
                  <strong>{learner.fullName}</strong>
                  <span>{learner.reference}</span>
                </span>
              </span>
            ) : null}
          </div>
        </div>
      </header>

      <div className="app-body">
        <nav className="app-nav" aria-label="Admissions">
          <p className="app-nav-label">Your application</p>
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
              <item.icon size={16} aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
          <div className="app-nav-divider" />
          <NavLink to="/portal">
            <ScrollText size={16} aria-hidden="true" />
            Student Portal
          </NavLink>
        </nav>

        <main id="main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
