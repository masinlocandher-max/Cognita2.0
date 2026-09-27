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
          <Link to="/" className="brand-link" onClick={close}><BrandMark compact /></Link>
          <button className="mobile-menu" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav className={`site-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
            <Link to="/about" onClick={close}>About</Link>
            <Link to="/cee" onClick={close}>CEE</Link>
            <Link to="/programs" onClick={close}>Learning Paths</Link>
            <Link to="/admissions" onClick={close}>How It Works</Link>
            <Link to="/organizations" onClick={close}>For Organizations</Link>
            <Link to="/policies" onClick={close}>Policies</Link>
            <a className="button button--small" href={`mailto:${PRIMARY_EMAIL}?cc=${ALTERNATE_EMAIL}&subject=Cognita%20Inquiry`} onClick={close}>
              <Mail size={16} /> Contact
            </a>
          </nav>
        </div>
      </header>

      <main><Outlet /></main>

      <footer className="site-footer">
        <div className="page-width public-footer-grid">
          <div className="public-footer-brand">
            <BrandMark />
            <p>Private, non-degree professional AI training built around assessment, personalized pathways, practice, and demonstrated competency.</p>
          </div>
          <div className="public-footer-column">
            <strong>Cognita</strong>
            <Link to="/about">About</Link>
            <Link to="/cee">CEE</Link>
            <Link to="/programs">Learning Paths</Link>
            <Link to="/admissions">How It Works</Link>
            <Link to="/organizations">For Organizations</Link>
          </div>
          <div className="public-footer-column">
            <strong>Policies & transparency</strong>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/academic-integrity">Academic Integrity & AI Use</Link>
            <Link to="/student-policies">Learner Policies</Link>
            <Link to="/institutional-status">Institutional Status</Link>
          </div>
          <div className="public-footer-column">
            <strong>Contact</strong>
            <a href={`mailto:${PRIMARY_EMAIL}?cc=${ALTERNATE_EMAIL}`}>{PRIMARY_EMAIL}</a>
            <a href={`mailto:${ALTERNATE_EMAIL}?cc=${PRIMARY_EMAIL}`}>{ALTERNATE_EMAIL}</a>
          </div>
        </div>
        <div className="page-width public-footer-legal">
          <span>© {new Date().getFullYear()} The Cognita Institute of Artificial Intelligence.</span>
          <span>Private, non-degree professional training and competency development. External recognition is claimed only when actually obtained and specifically applicable.</span>
        </div>
      </footer>
    </div>
  )
}
