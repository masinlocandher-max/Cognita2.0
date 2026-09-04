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
            <a href="/#about" onClick={close}>About</a>
            <a href="/#programs" onClick={close}>Programs</a>
            <a href="/#admissions" onClick={close}>Admissions</a>
            <a href="/#cee" onClick={close}>CEE</a>
            <a href="/#training" onClick={close}>Institutional Training</a>
            <a href="/#faq" onClick={close}>FAQs</a>
            <a className="button button--small" href={`mailto:${PRIMARY_EMAIL}?subject=Cognita%20Institute%20Inquiry`} onClick={close}>
              <Mail size={16} /> Contact Cognita
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
            <strong>Explore</strong>
            <a href="/#about">About Cognita</a>
            <a href="/#programs">Programs</a>
            <a href="/#admissions">Admissions</a>
            <a href="/#cee">Cognita Entrance Examination</a>
            <a href="/#training">Institutional Training</a>
          </div>
          <div className="public-footer-column">
            <strong>Contact</strong>
            <a href={`mailto:${PRIMARY_EMAIL}`}>{PRIMARY_EMAIL}</a>
            <a href={`mailto:${ALTERNATE_EMAIL}`}>{ALTERNATE_EMAIL}</a>
            <small>Primary institutional inquiries should be sent to the Cognita domain email.</small>
          </div>
        </div>
        <div className="page-width public-footer-legal">
          <span>© {new Date().getFullYear()} The Cognita Institute of Artificial Intelligence.</span>
          <span>Private, non-degree training and learning institution. Program-specific regulatory status is disclosed before enrollment.</span>
        </div>
      </footer>
    </div>
  )
}
