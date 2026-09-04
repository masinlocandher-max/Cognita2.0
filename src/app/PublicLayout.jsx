import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import BrandMark from '../components/BrandMark.jsx'
import { institute } from '../content/institute.js'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/programs', label: 'Programs' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/about', label: 'About' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Contact' },
]

export default function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => { setMenuOpen(false) }, [location.pathname])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="inst-header">
        <div className="page-width inst-header-inner">
          <BrandMark />

          <nav className="inst-nav" aria-label="Primary">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="inst-actions">
            <Link className="btn btn--portal btn--sm" to="/portal">Student Login</Link>
            <Link className="btn btn--brand btn--sm" to="/admissions/apply">Apply</Link>
            <button
              type="button"
              className="icon-btn mobile-menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav id="mobile-navigation" className="mobile-menu-panel" aria-label="Primary">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
                {item.label}
              </NavLink>
            ))}
            <div className="mobile-menu-actions">
              <Link className="btn btn--brand btn--block" to="/admissions/apply">Apply to Cognita <ArrowRight size={16} /></Link>
              <Link className="btn btn--secondary btn--block" to="/portal">Student Login</Link>
            </div>
          </nav>
        ) : null}
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="inst-footer">
        <div className="page-width">
          <div className="inst-footer-top">
            <div className="inst-footer-brand">
              <BrandMark to={null} variant="light" />
              <p>{institute.positioning}</p>
            </div>

            <div className="inst-footer-col">
              <h5>Study</h5>
              <ul>
                <li><Link to="/programs">Programs</Link></li>
                <li><Link to="/programs/prog-foundations">AI Foundations</Link></li>
                <li><Link to="/programs/prog-applied">Applied AI</Link></li>
                <li><Link to="/admissions">Admissions</Link></li>
              </ul>
            </div>

            <div className="inst-footer-col">
              <h5>Institute</h5>
              <ul>
                <li><Link to="/about">About Cognita</Link></li>
                <li><Link to="/resources">Resources</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/verify">Verify a credential</Link></li>
              </ul>
            </div>

            <div className="inst-footer-col">
              <h5>Students</h5>
              <ul>
                <li><Link to="/portal">Student Login</Link></li>
                <li><Link to="/admissions/entrance-exam">Entrance Exam</Link></li>
                <li><Link to="/admissions/apply">Apply</Link></li>
              </ul>
            </div>
          </div>

          <div className="inst-footer-bottom">
            <span>© {new Date().getFullYear()} {institute.name}.</span>
            <div className="inst-footer-legal">
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <span>Preview build — student records are stored on your device.</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
