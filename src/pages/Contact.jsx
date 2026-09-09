import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import DocPage from '../components/DocPage'
import { CONTACT_EMAIL } from '../data/institution'

/**
 * Contact.
 *
 * No institutional mailbox has been approved, so this page does not print one.
 * A fabricated address on a contact page is worse than no address: it silently
 * swallows messages from real people. When a monitored mailbox exists, set
 * CONTACT_EMAIL in data/institution.js and every surface here picks it up.
 */
export default function Contact() {
  return (
    <DocPage
      eyebrow="Contact"
      title="How to reach Cognita."
      summary="Admission runs through the application and by email. Cognita is not yet enrolling, so this page tells you exactly which channels are live and which are not."
      sections={[
        {
          id: 'admission',
          title: 'If you want to study at Cognita',
          body: (
            <>
              <p>
                Start with the application. It is the front door to the whole process — a person reviews it,
                and approved applicants are invited to the entrance examination by email.
              </p>
              <p>
                Cognita is not yet enrolling students, and this site has no server to send an application to.
                What you submit is held in your own browser on this device. The form says so at the point of
                submission rather than implying a delivery that did not happen.
              </p>
              <p style={{ marginBlockStart: 'var(--s-5)' }}>
                <Link className="button" to="/apply">
                  Begin your application <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </p>
            </>
          ),
        },
        {
          id: 'email',
          title: 'General enquiries',
          body: CONTACT_EMAIL ? (
            <>
              <p>
                Write to <a className="text-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
              <p>
                Please include enough detail to answer you properly — what you are asking about, and if it
                concerns an application, the email address you applied with.
              </p>
            </>
          ) : (
            <>
              <p>
                Cognita has not yet published a monitored contact address, so this page does not print one.
                An address that nobody reads is worse than none at all.
              </p>
              <p>
                A published enquiry mailbox is part of the work still to be completed before Cognita opens for
                real intake, alongside the systems listed on the{' '}
                <Link className="text-link" to="/policies">institutional status</Link> page.
              </p>
            </>
          ),
        },
        {
          id: 'expect',
          title: 'How admission correspondence works',
          body: (
            <>
              <p>
                Once Cognita is operating, everything that matters in admission is issued to the email address
                on your application:
              </p>
              <ul>
                <li>confirmation that your application was received;</li>
                <li>the outcome of the application review;</li>
                <li>your entrance examination invitation, which is issued to you alone;</li>
                <li>your result and, if you pass, your academic pathway recommendation;</li>
                <li>enrollment and account activation instructions.</li>
              </ul>
              <p>
                Examination access is personal and must not be shared or forwarded.
              </p>
            </>
          ),
        },
        {
          id: 'answers',
          title: 'Questions already answered',
          body: (
            <p>
              Admission, the examination, the two learning routes, AI-00, tuition, and accreditation are
              covered on the <Link className="text-link" to="/faq">frequently asked questions</Link> page.
              Where a decision has not been made, that page says so.
            </p>
          ),
        },
      ]}
    />
  )
}
