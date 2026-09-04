import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Copy } from 'lucide-react'
import { institute } from '../../content/institute.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { useReveal } from '../../hooks/useReveal.js'
import Alert from '../../components/Alert.jsx'

/**
 * Contact.
 *
 * Email delivery is not connected, so the page publishes addresses instead of a
 * form. A form that silently discards a message is worse than no form, and
 * saying so before someone types is better than after.
 */
export default function Contact() {
  useDocumentTitle('Contact')
  useReveal()
  const [copied, setCopied] = useState(null)

  const copy = async (address) => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(address)
      window.setTimeout(() => setCopied(null), 2400)
    } catch { setCopied(null) }
  }

  return (
    <>
      <section className="inst-hero on-ink" style={{ paddingBlock: 'clamp(var(--s-9), 7vw, 108px)' }}>
        <div className="page-width">
          <p className="inst-eyebrow">Contact</p>
          <h1 style={{ maxWidth: '15ch' }}>Contact the institute</h1>
          <p className="inst-hero-lead">
            Questions about admissions, programs, placement, or bringing Cognita to an organization.
          </p>
        </div>
      </section>

      <section className="inst-section inst-section--paper">
        <div className="page-width statement-split" data-reveal>
          <div className="stack-5">
            <Alert tone="attention" title="Message delivery is not connected" icon="MailX">
              This preview website has no email service behind it. Rather than publish a form that quietly
              discards what you write, the addresses below are listed directly.
            </Alert>

            <article className="card">
              <p className="card-title">Admissions and programs</p>
              <p className="contact-address">{institute.contactEmail}</p>
              <button className="btn btn--secondary btn--sm" type="button" onClick={() => copy(institute.contactEmail)}>
                <Copy size={14} /> {copied === institute.contactEmail ? 'Copied' : 'Copy address'}
              </button>
            </article>

            <article className="card">
              <p className="card-title">General enquiries</p>
              <p className="contact-address">{institute.generalEmail}</p>
              <button className="btn btn--secondary btn--sm" type="button" onClick={() => copy(institute.generalEmail)}>
                <Copy size={14} /> {copied === institute.generalEmail ? 'Copied' : 'Copy address'}
              </button>
            </article>

            <p className="muted" style={{ fontSize: 'var(--text-xs)' }}>
              Placeholder addresses for the preview build.
            </p>
          </div>

          <div className="stack-5">
            <article className="card">
              <p className="card-title">Answered on the website</p>
              <ul className="clean-list" style={{ marginTop: 'var(--s-4)' }}>
                <li>Program structure and outcomes are on the <Link to="/programs">programs pages</Link>.</li>
                <li>Entry requirements and process are under <Link to="/admissions">admissions</Link>.</li>
                <li>The placement assessment is described on <Link to="/admissions/entrance-exam">the entrance exam page</Link>.</li>
                <li>Credentials can be checked through <Link to="/verify">credential verification</Link>.</li>
              </ul>
            </article>

            <article className="card card--sunken">
              <p className="card-title">Institutional and group enquiries</p>
              <p className="card-note" style={{ marginTop: 'var(--s-2)', lineHeight: 1.75 }}>
                Local government units, schools and organizations placing a group: describe how many learners
                are involved and what their work requires, and Cognita will tell you honestly whether the
                current programs fit.
              </p>
            </article>

            <article className="card card--sunken">
              <p className="card-title">Enrolled students</p>
              <p className="card-note" style={{ marginTop: 'var(--s-2)', lineHeight: 1.75 }}>
                Questions about your study, assessments or progress are handled through the Cognita Student
                Portal.
              </p>
              <Link className="link-arrow" to="/portal" style={{ marginTop: 'var(--s-3)' }}>Student Login <ArrowRight size={15} /></Link>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
