import { Mail, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import BrandMark from './BrandMark'

const PRIMARY_EMAIL = 'info@thecognitainstitute.com'
const ALTERNATE_EMAIL = 'cognitainstituteofai@gmail.com'

export default function AppLayout() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  useEffect(() => { setOpen(false); window.scrollTo(0, 0); document.getElementById('main-content')?.focus({preventScroll:true});
    const names = {'/':'Home','/classroom':'Classroom','/classroom/lesson':'Sample Lesson','/classroom/workspace':'My Workspace','/classroom/resources':'Resources','/classroom/progress':'My Progress','/mission-vision':'Mission & Vision','/support':'Learner Support','/contact':'Contact','/about':'About','/self-paced':'Self-Paced','/cee':'CEE','/programs':'Learning Paths','/how-it-works':'How It Works'};
    document.title = `${names[pathname] || pathname.slice(1).replaceAll('-', ' ')} | Cognita Institute`;
    const canonical = document.querySelector('link[rel="canonical"]'); if(canonical) canonical.href = `https://www.thecognitainstitute.com${pathname === '/' ? '/' : pathname}`;
  }, [pathname])

  return (
    <div className="site-shell">
      <a className="renew-skip" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="page-width header-inner">
          <Link to="/" className="brand-link" onClick={close}><BrandMark compact /></Link>
          <button className="mobile-menu" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav className={`site-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
            <Link to="/about" onClick={close}>About</Link>
            <Link to="/cognita-method" onClick={close}>Our Method</Link>
            <Link to="/programs" onClick={close}>Learning Paths</Link>
            <Link to="/resources" onClick={close}>Resources</Link>
            <Link to="/organizations" onClick={close}>For Organizations</Link>
            <Link to="/classroom" onClick={close}>Classroom</Link>
            <Link className="button button--small" to="/contact" onClick={close}>
              <Mail size={16} /> Contact
            </Link>
          </nav>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}><Outlet /></main>

      <footer className="site-footer">
        <div className="page-width public-footer-grid">
          <div className="public-footer-brand">
            <BrandMark />
            <p>Private, non-degree professional AI training built around assessment, personalized pathways, practice, and demonstrated competency.</p>
          </div>
          <div className="public-footer-column">
            <strong>Cognita</strong>
            <Link to="/about">About</Link>
            <Link to="/mission-vision">Mission & Vision</Link>
            <Link to="/founder">Founder</Link>
            <Link to="/values">Values</Link>
            <Link to="/cognita-method">Cognita Method</Link>
            <Link to="/pathways">Pathways</Link>
            <Link to="/classroom">Classroom</Link>
            <Link to="/support">Learner Support</Link>
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
            <Link to="/credentials">Credentials</Link>
            <Link to="/accessibility">Accessibility</Link>
            <Link to="/assessment-policy">Assessment Policy</Link>
            <Link to="/refund-policy">Refund Policy</Link>
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
