import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../../components/Alert.jsx'
import { useDocumentTitle } from '../../hooks/useRobots.js'

/**
 * The contact form does not send anything, and says so before you type rather
 * than after you press submit. A form that silently discards a message is worse
 * than no form.
 */
export default function Contact() {
  useDocumentTitle('Contact')
  const [copied, setCopied] = useState(false)

  return (
    <>
      <section className="page-hero">
        <div className="page-width">
          <p className="eyebrow">Contact</p>
          <h1>Talk to Cognita.</h1>
          <p className="lead reading" style={{ marginTop: 'var(--s-5)' }}>
            Questions about admissions, placement, or bringing Cognita to an organisation.
          </p>
        </div>
      </section>

      <section className="section section--paper">
        <div className="page-width contact-grid">
          <div className="stack-6">
            <Alert tone="attention" title="Message delivery is not connected" icon="MailX">
              This preview build has no email service behind it. Rather than show a form that quietly discards
              what you write, we have left the address below. Use it directly.
            </Alert>

            <div className="card">
              <p className="card-title">General and admissions</p>
              <p className="contact-address">hello@cognita.example</p>
              <button
                type="button"
                className="btn btn--secondary btn--sm"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText('hello@cognita.example')
                    setCopied(true)
                    window.setTimeout(() => setCopied(false), 2400)
                  } catch { setCopied(false) }
                }}
              >
                {copied ? 'Copied to clipboard' : 'Copy address'}
              </button>
              <p className="muted" style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--s-3)' }}>
                Placeholder address for the preview build.
              </p>
            </div>
          </div>

          <div className="stack-6">
            <div className="card">
              <p className="card-title">Before you write</p>
              <ul className="clean-list" style={{ marginTop: 'var(--s-3)' }}>
                <li>Placement questions are usually answered by <Link to="/entrance-exam">the entrance exam page</Link>.</li>
                <li>Programme structure is set out under <Link to="/programs">Programs</Link>.</li>
                <li>Credential checks go through <Link to="/verify">credential verification</Link>.</li>
              </ul>
            </div>

            <div className="card card--sunken">
              <p className="card-title">Institutional enquiries</p>
              <p className="muted" style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--s-2)' }}>
                Local government units, schools and organisations placing a group: say how many learners and what
                the work involves, and we will tell you honestly whether Cognita fits.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
