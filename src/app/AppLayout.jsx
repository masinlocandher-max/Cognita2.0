import { Link, NavLink, Outlet } from 'react-router-dom'
import { ClipboardList, FileText, GraduationCap, LayoutDashboard, MapPin, ScrollText, UserRound } from 'lucide-react'
import BrandMark from '../components/BrandMark.jsx'
import { useLearnerContext } from '../hooks/useLearnerContext.js'
import { initials } from '../lib/format.js'

const NAV = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/app/application', label: 'Application', icon: FileText },
  { to: '/app/entrance-exam', label: 'Entrance Exam', icon: ClipboardList },
  { to: '/app/results', label: 'Readiness profile', icon: ScrollText },
  { to: '/app/placement', label: 'Placement', icon: MapPin },
  { to: '/app/enrollment', label: 'Enrolment', icon: GraduationCap },
  { to: '/app/profile', label: 'Profile', icon: UserRound },
]

export default function AppLayout() {
  const { learner } = useLearnerContext()

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="app-bar on-ink">
        <div className="page-width app-bar-inner">
          <BrandMark variant="light" compact />
          <div className="app-bar-right">
            <Link className="btn btn--quiet-onink btn--sm" to="/learn/dashboard">Learning</Link>
            <div className="app-identity">
              <span className="app-avatar" aria-hidden="true">{initials(learner?.fullName)}</span>
              <span className="app-identity-text">
                <strong>{learner?.fullName || 'Not set up'}</strong>
                <span>{learner?.reference || 'Device-local record'}</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="app-body">
        <nav className="app-nav" aria-label="Student journey">
          <p className="app-nav-label">Your journey</p>
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
              <item.icon size={16} aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
          <div className="app-nav-divider" />
          <NavLink to="/learn/dashboard" className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
            <GraduationCap size={16} aria-hidden="true" />
            Learning environment
          </NavLink>
        </nav>

        <main id="main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
