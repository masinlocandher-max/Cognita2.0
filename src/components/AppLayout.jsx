import { Mail, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import BrandMark from './BrandMark'

const PRIMARY_EMAIL = 'info@thecognitainstitute.com'
const ALTERNATE_EMAIL = 'cognitainstituteofai@gmail.com'

export default function AppLayout() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="page-width header-inner">
          <Link to="/" className="brand-link" onClick={close}>
            <BrandMark compact />
          </Link>
          <button className="mobile-menu" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav className={`site-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
            <Link to="/about" onClick={close}>About</Link>
            <Link to="/programs" onClick={close}>Programs</Link>
            <Link to="/admissions" onClick={close}>Admissions</Link>
            <Link to="/cee" onClick={close}>CEE</Link>
            <Link to="/organizations" onClick={close}>For Organizations</Link>
            <Link to="/policies" onClick={close}>Policies</Link>
            <a className="button button--small" href={`mailto:${PRIMARY_EMAIL}?cc=${ALTERNATE_EMAIL}&subject=Cognita%20Institute%20Inquiry`} onClick={close}>
              <Mail size={16} /> Contact
            </a>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="page-width public-footer-grid">
          <div className="public-footer-brand">
            <BrandMark />
            <p>Structured, practical AI education for Filipino learners. Admission is intentional. Learning is structured. Progress is earned.</p>
          </div>
          <div className="public-footer-column">
            <strong>Institution</strong>
            <Link to="/about">About Cognita</Link>
            <Link to="/founder">Founder</Link>
            <Link to="/programs">Programs</Link>
            <Link to="/admissions">Admissions</Link>
            <Link to="/cee">Cognita Entrance Examination</Link>
            <Link to="/organizations">For Organizations</Link>
          </div>
          <div className="public-footer-column">
            <strong>Policies & transparency</strong>
            <Link to="/policies">Public Policies</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
            <Link to="/academic-integrity">Academic Integrity & AI Use</Link>
            <Link to="/student-policies">Student Policies</Link>
            <Link to="/institutional-status">Institutional Status</Link>
          </div>
          <div className="public-footer-column">
            <strong>Contact</strong>
            <a href={`mailto:${PRIMARY_EMAIL}?cc=${ALTERNATE_EMAIL}`}>{PRIMARY_EMAIL}</a>
            <a href={`mailto:${ALTERNATE_EMAIL}?cc=${PRIMARY_EMAIL}`}>{ALTERNATE_EMAIL}</a>
            <small>Use the Cognita domain address for primary institutional correspondence.</small>
          </div>
        </div>
        <div className="page-width public-footer-legal">
          <span>© {new Date().getFullYear()} The Cognita Institute of Artificial Intelligence.</span>
          <span>Private, non-degree training institution. Program-specific regulatory status is disclosed before enrollment.</span>
        </div>
      </footer>
    </div>
  )
}
