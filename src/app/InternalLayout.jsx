import { NavLink, Outlet } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import { useRobots } from '../hooks/useRobots.js'

/**
 * Shell for internal surfaces — the evaluator workspace and the admin
 * interface. Marked noindex, nofollow, absent from public navigation, and
 * explicit that no staff authentication exists in this build.
 */
export default function InternalLayout({ title, subtitle, nav, wide = false }) {
  useRobots()

  return (
    <div className="internal-shell">
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="internal-bar">
        <div className="page-width internal-bar-inner">
          <span className="internal-mark">
            {title}
            <span>{subtitle}</span>
          </span>
          <span className="local-badge"><ShieldAlert size={12} aria-hidden="true" /> No staff authentication in this build</span>
        </div>
      </header>

      <div className={`internal-body${wide ? ' internal-body--wide' : ''}`}>
        {nav?.length ? (
          <nav className="internal-nav" aria-label={`${title} sections`}>
            {nav.map((item) => (
              item.group
                ? <p className="internal-nav-group" key={`group-${item.group}`}>{item.group}</p>
                : (
                  <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
                    {item.label}
                  </NavLink>
                )
            ))}
          </nav>
        ) : null}

        <main id="main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
