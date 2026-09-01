import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import BrandMark from './BrandMark'

export default function AppLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="page-width header-inner">
          <Link to="/" className="brand-link" onClick={() => setOpen(false)}>
            <BrandMark compact />
          </Link>
          <button className="mobile-menu" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav className={`site-nav ${open ? 'is-open' : ''}`}>
            <a href="/#about" onClick={() => setOpen(false)}>About</a>
            <a href="/#learning" onClick={() => setOpen(false)}>Learning</a>
            <a href="/#difference" onClick={() => setOpen(false)}>Why Cognita</a>
            <NavLink to="/entrance-exam" onClick={() => setOpen(false)}>Entrance Exam</NavLink>
            <NavLink to="/learner" onClick={() => setOpen(false)}>Learner</NavLink>
            <Link className="button button--small" to="/learner" onClick={() => setOpen(false)}>Start your journey</Link>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="page-width footer-grid">
          <BrandMark />
          <p>Practical AI education built around readiness, critical thinking, responsible use, and real-world application.</p>
          <div className="footer-links">
            <Link to="/entrance-exam">Cognita Entrance Exam</Link>
            <Link to="/learner">Learner profile</Link>
          </div>
        </div>
        <div className="page-width footer-bottom">© {new Date().getFullYear()} Cognita Institute of Artificial Intelligence.</div>
      </footer>
    </div>
  )
}
