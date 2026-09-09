import { Link } from 'react-router-dom'
import DocPage from '../components/DocPage'
import { APPLICATION_FIELDS, CONTACT_EMAIL, STORAGE_KEYS } from '../data/institution'

/**
 * Privacy statement.
 *
 * This is not boilerplate. Cognita currently runs entirely in the browser, so
 * the truthful statement is unusually short and unusually specific: here is
 * every key written to your device, here is what each one holds, and nothing
 * leaves the machine. Naming the actual storage keys keeps this page honest
 * and checkable — if the code changes, this page has to change with it.
 */
export default function Privacy() {
  return (
    <DocPage
      eyebrow="Privacy"
      title="What this site stores, and where it stays."
      summary="Cognita currently runs entirely in your browser. There is no server account, no database, and no transactional email behind this site."
      updated="This statement describes the site as it is currently built. It will be replaced before Cognita processes real applicant data."
      sections={[
        {
          id: 'summary',
          title: 'The short version',
          body: (
            <>
              <p>
                Anything you type into this site is saved in your own browser, on the device you are using,
                and is not sent to Cognita or to anyone else. There is no server behind these forms.
              </p>
              <p>
                That also means your information is not backed up, not synced between devices, and not
                recoverable by Cognita. Clearing your browser data removes it permanently.
              </p>
            </>
          ),
        },
        {
          id: 'collected',
          title: 'What the application form asks for',
          body: (
            <>
              <p>The application form collects:</p>
              <ul>{APPLICATION_FIELDS.map((f) => <li key={f}>{f}</li>)}</ul>
              <p>
                The entrance examination additionally records your answers, the time your session started and
                ended, and integrity events such as the examination window losing focus. These are held for
                evaluator context.
              </p>
            </>
          ),
        },
        {
          id: 'storage',
          title: 'Exactly what is written to your device',
          body: (
            <>
              <p>
                This site writes the following keys to your browser’s local storage. You can inspect or
                delete them yourself through your browser’s developer tools or by clearing site data.
              </p>
              <ul>
                {STORAGE_KEYS.map((s) => (
                  <li key={s.key}><code>{s.key}</code> — {s.holds}</li>
                ))}
              </ul>
              <p>
                Passwords are never stored. The account-setup screen does not persist any password you type,
                because there is no account system for it to belong to.
              </p>
            </>
          ),
        },
        {
          id: 'third-parties',
          title: 'Third parties, tracking, and cookies',
          body: (
            <>
              <p>
                This site sets no cookies, runs no analytics, includes no advertising, and embeds no
                third-party trackers or social widgets. Nothing you do here is reported to another company.
              </p>
              <p>
                Fonts and other assets are served with the site itself rather than fetched from an external
                provider, so loading a page does not disclose your visit to a third party.
              </p>
            </>
          ),
        },
        {
          id: 'email',
          title: 'Email',
          body: (
            <p>
              The admission process is described as email-based, and it will be. Today this site cannot send
              email. Where you see a record of a message being issued, that is a local simulation of the
              intended process, held in your browser. No message has been transmitted to you or to anyone
              at Cognita.
            </p>
          ),
        },
        {
          id: 'future',
          title: 'Before Cognita handles real applicant data',
          body: (
            <>
              <p>
                Real intake requires systems this site does not yet have: secure identity, server-side data
                storage, examination timing that cannot be tampered with locally, evaluator access control,
                payment handling, and student records.
              </p>
              <p>
                This statement will be replaced with a complete privacy policy — covering lawful basis,
                retention periods, your rights over your data, and how to exercise them — before any of that
                is switched on. Cognita will not begin collecting real applicant information under this
                interim statement.
              </p>
            </>
          ),
        },
        {
          id: 'contact',
          title: 'Questions about this statement',
          body: (
            <p>
              {CONTACT_EMAIL
                ? <>Write to <a className="text-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</>
                : <>Cognita has not yet published a monitored contact address. The <Link className="text-link" to="/contact">contact page</Link> explains the channels that currently exist.</>}
            </p>
          ),
        },
      ]}
      footer={
        <p>
          This page describes current technical reality rather than a legal commitment. It has not been
          reviewed by a lawyer and should not be treated as a finished privacy policy.
        </p>
      }
    />
  )
}
