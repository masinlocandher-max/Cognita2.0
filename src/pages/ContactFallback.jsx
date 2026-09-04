import { ArrowLeft, Mail, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

const PRIMARY_EMAIL = 'info@thecognitainstitute.com'
const ALTERNATE_EMAIL = 'cognitainstituteofai@gmail.com'

export default function ContactFallback() {
  return (
    <section className="contact-fallback-page">
      <div className="page-width contact-fallback-card">
        <div className="contact-fallback-copy">
          <p className="section-label">COGNITA ASSISTANCE</p>
          <h1>This page is not available as a public service yet.</h1>
          <p>If you reached a page that requires a system still being connected, contact Cognita directly. We would rather route you to a real person than show a form or workflow that is not yet operational.</p>
          <div className="contact-fallback-note"><ShieldCheck size={18} /><span>Public information remains available on the Cognita website. Backend-dependent services will only be presented as live once they are actually connected.</span></div>
        </div>

        <div className="contact-fallback-actions">
          <a className="button" href={`mailto:${PRIMARY_EMAIL}?cc=${ALTERNATE_EMAIL}&subject=Cognita%20Website%20Assistance`}><Mail size={17} /> Email {PRIMARY_EMAIL}</a>
          <a className="button button--ghost" href={`mailto:${ALTERNATE_EMAIL}?cc=${PRIMARY_EMAIL}&subject=Cognita%20Website%20Assistance`}><Mail size={17} /> Email alternate address</a>
          <Link className="contact-fallback-home" to="/"><ArrowLeft size={16} /> Return to Cognita website</Link>
        </div>
      </div>
    </section>
  )
}
