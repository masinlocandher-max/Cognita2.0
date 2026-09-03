import { Link, NavLink, Outlet } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import BrandMark from '../components/BrandMark.jsx'

/**
 * The learning environment keeps its chrome deliberately thin. Navigation lives
 * at the edges so the reading column stays the focus.
 */
export default function LearnLayout() {
  return (
    <div className="learn-shell">
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="learn-bar">
        <div className="page-width learn-bar-inner">
          <BrandMark to="/learn/dashboard" compact />
          <nav className="site-nav" aria-label="Learning">
            <NavLink to="/learn/dashboard" className={({ isActive }) => (isActive ? 'is-active' : undefined)}>Dashboard</NavLink>
            <NavLink to="/learn/progress" className={({ isActive }) => (isActive ? 'is-active' : undefined)}>Progress</NavLink>
            <NavLink to="/learn/certificates" className={({ isActive }) => (isActive ? 'is-active' : undefined)}>Certificates</NavLink>
          </nav>
          <Link className="btn btn--secondary btn--sm" to="/app"><ArrowLeft size={14} /> Student journey</Link>
        </div>
      </header>

      <main id="main" className="learn-body">
        <Outlet />
      </main>
    </div>
  )
}
