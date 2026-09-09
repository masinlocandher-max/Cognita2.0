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

      <footer className="ed-footer">
        <div className="page-width">
          <div className="ed-footer-top">
            <div className="ed-footer-brand">
              <BrandMark onDark />
              <p>
                A private training and learning institution designed for Filipino learners.
                Admission is intentional. Learning is structured. Progress is earned.
              </p>
            </div>

            <nav className="ed-footer-nav" aria-label="Footer">
              <div>
                <p className="ed-footer-heading">Institute</p>
                <a href="/#about">About Cognita</a>
                <a href="/#approach">Learning philosophy</a>
                <a href="/#founder">Founder</a>
                <Link to="/policies">Institutional status</Link>
              </div>
              <div>
                <p className="ed-footer-heading">Admission</p>
                <a href="/#admission">Admission process</a>
                <Link to="/programs">Programs</Link>
                <Link to="/apply">Apply</Link>
                <Link to="/faq">Questions</Link>
              </div>
              <div>
                <p className="ed-footer-heading">Legal</p>
                <Link to="/privacy">Privacy</Link>
                <Link to="/terms">Terms of use</Link>
                <Link to="/contact">Contact</Link>
              </div>
            </nav>
          </div>

          {/* The disclosure belongs here, in plain sight, not buried on one page. */}
          <p className="ed-footer-disclosure">
            Cognita is in development and is not yet enrolling students. It does not claim accreditation,
            government recognition, or institutional partnership. This site runs entirely in your browser;
            information you enter is kept on your device and is not transmitted.{' '}
            <Link to="/policies">Read the full institutional status</Link>.
          </p>

          <div className="ed-footer-bottom">
            <span>© {new Date().getFullYear()} The Cognita Institute of Artificial Intelligence.</span>
            <span>Guided when you need structure. Flexible when you need freedom.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
