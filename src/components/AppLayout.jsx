import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import BrandMark from './BrandMark'
import { getApplication } from '../lib/admissions'

/**
 * Public institutional chrome.
 *
 * Navigation reflects the canonical surface boundary: the institutional
 * website and its program information are public, and every enrollment
 * surface beyond it stays gated by lifecycle state. An applicant with a live
 * application gets a direct route back to their status.
 */
export default function AppLayout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const application = getApplication()

  useEffect(() => { setOpen(false) }, [location.pathname, location.hash])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <div className="site-shell">
      <a className="ci-skip" href="#main">Skip to content</a>

      <header className="site-header">
        <div className="page-width header-inner">
          <Link to="/" className="brand-link" onClick={close}>
            <BrandMark compact />
          </Link>

          <button
            className="mobile-menu"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="site-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          <nav id="site-navigation" className={`site-nav ${open ? 'is-open' : ''}`} aria-label="Primary">
            <a href="/#about" onClick={close}>About</a>
            <a href="/#admission" onClick={close}>Admission</a>
            <NavLink to="/programs" onClick={close} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>Programs</NavLink>
            <a href="/#founder" onClick={close}>Founder</a>
            {application ? (
              <NavLink to="/apply" onClick={close} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>Application status</NavLink>
            ) : null}
            <Link className="button button--small" to="/apply" onClick={close}>
              {application ? 'View your application' : 'Begin Your Application'}
            </Link>
          </nav>
        </div>
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="page-width footer-grid">
          <BrandMark />
          <p>
            The Cognita Institute of Artificial Intelligence is a private training and learning institution
            designed for Filipino learners.
          </p>
          <div className="footer-links">
            <a href="/#about">About Cognita</a>
            <a href="/#admission">Admission Process</a>
            <Link to="/programs">Programs</Link>
            <Link to="/apply">Apply</Link>
          </div>
        </div>
        <div className="page-width footer-bottom">
          <span>© {new Date().getFullYear()} The Cognita Institute of Artificial Intelligence.</span>
          <span>Admission is intentional. Learning is structured. Progress is earned.</span>
        </div>
      </footer>
    </div>
  )
}
