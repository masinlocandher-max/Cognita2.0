import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import BrandMark from '../components/BrandMark.jsx'

const NAV = [
  { to: '/about', label: 'About' },
  { to: '/programs', label: 'Programs' },
  { to: '/ai-00', label: 'AI-00' },
  { to: '/ai-01', label: 'AI-01' },
  { to: '/entrance-exam', label: 'Entrance Exam' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/contact', label: 'Contact' },
]

export default function PublicLayout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => { setOpen(false) }, [location.pathname])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <div className="page-width site-header-inner">
          <BrandMark />

          <nav className={`site-nav${open ? ' site-nav--open' : ''}`} aria-label="Primary">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <Link className="btn btn--sm" to="/app">Begin student journey</Link>
            <button
              type="button"
              className="icon-btn nav-toggle"
              aria-expanded={open}
              aria-controls="primary-navigation"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="page-width">
          <div className="footer-grid">
            <div className="footer-col">
              <BrandMark to={null} variant="light" />
              <p style={{ maxWidth: '34ch', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
                Practical AI education built around readiness, judgment, and work a person can put their name on.
              </p>
            </div>
            <div className="footer-col">
              <h5>Institute</h5>
              <ul>
                <li><Link to="/about">About Cognita</Link></li>
                <li><Link to="/programs">Programs</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Pathways</h5>
              <ul>
                <li><Link to="/ai-00">AI-00 Foundation</Link></li>
                <li><Link to="/ai-01">AI-01 Applied</Link></li>
                <li><Link to="/entrance-exam">Entrance Exam</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Apply</h5>
              <ul>
                <li><Link to="/admissions">Admissions</Link></li>
                <li><Link to="/app">Student journey</Link></li>
                <li><Link to="/verify">Verify a credential</Link></li>
              </ul>
            </div>
          </div>

          <div className="footer-note">
            <span>© {new Date().getFullYear()} Cognita Institute of Artificial Intelligence.</span>
            <span>Frontend preview build — learner records are stored on your device only.</span>
          </div>
        </div>
      </footer>
    </>
  )
}
