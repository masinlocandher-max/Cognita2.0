import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import Alert from '../../components/Alert.jsx'

/**
 * Privacy and terms.
 *
 * Written to describe what this build actually does. It does not reproduce a
 * standard policy template describing servers, processors and retention
 * schedules that do not exist — that would be a more serious misrepresentation
 * than having no page at all. Cognita will publish full policies alongside the
 * systems they govern.
 */

const PRIVACY = {
  title: 'Privacy',
  intro: 'How this website handles information, described as it currently works.',
  sections: [
    {
      heading: 'What this website stores',
      body: [
        'Everything you enter — your learner record, application answers, entrance exam responses and study progress — is stored in your own browser using local storage on the device you are using.',
        'It is not transmitted to Cognita. There is no server receiving it, no database holding it, and no member of staff who can see it.',
      ],
    },
    {
      heading: 'What that means for you',
      body: [
        'Your records do not sync between devices or browsers. Clearing your browser data removes them permanently, because no copy exists anywhere else.',
        'You can remove everything at any time from your profile page in the applicant workspace.',
      ],
    },
    {
      heading: 'Third parties',
      body: [
        'This website loads a web font from Google Fonts, which means your browser makes a request to Google’s servers to retrieve it. No other third-party service is used, and there is no analytics, advertising or tracking on this site.',
      ],
    },
    {
      heading: 'When systems are connected',
      body: [
        'When Cognita connects accounts, storage and institutional records, this page will be replaced with a full privacy policy describing what is collected, the legal basis for processing it, how long it is retained, and how to exercise your rights under the Data Privacy Act of 2012.',
        'That policy will be published before those systems handle any real applicant information.',
      ],
    },
  ],
}

const TERMS = {
  title: 'Terms',
  intro: 'The terms on which this preview website is made available.',
  sections: [
    {
      heading: 'What this website is',
      body: [
        'This is a preview build of the Cognita public website and Student Portal. It is published so that the interface, program information and admissions process can be reviewed.',
        'Completing an application or the entrance exam here does not create an application to Cognita, does not reserve a place, and does not create any obligation on either side.',
      ],
    },
    {
      heading: 'No enrollment or credential is created',
      body: [
        'Nothing on this website enrols you in a program or issues a credential. The credential verification page reads sample records and is not an institutional register.',
      ],
    },
    {
      heading: 'Educational content',
      body: [
        'Resources published on this site are educational material. They are not legal, medical, financial or professional advice, and should not be relied on as a substitute for a qualified person.',
      ],
    },
    {
      heading: 'Accuracy',
      body: [
        'Cognita aims to keep program information accurate and to state clearly where something is not yet defined. Program details, study loads and requirements may change as programs are finalized.',
      ],
    },
    {
      heading: 'Contact',
      body: [
        'Questions about these terms can be sent to the general enquiries address on the contact page.',
      ],
    },
  ],
}

export default function Legal({ document: which = 'privacy' }) {
  const content = which === 'terms' ? TERMS : PRIVACY
  useDocumentTitle(content.title)

  return (
    <>
      <section className="inst-hero on-ink" style={{ paddingBlock: 'clamp(var(--s-8), 6vw, 92px)' }}>
        <div className="page-width">
          <p className="inst-eyebrow">{content.title}</p>
          <h1 style={{ maxWidth: '16ch' }}>{content.title === 'Privacy' ? 'Privacy' : 'Terms of use'}</h1>
          <p className="inst-hero-lead">{content.intro}</p>
        </div>
      </section>

      <section className="inst-section inst-section--paper">
        <div className="page-width article" style={{ maxWidth: 760 }}>
          <Alert tone="info" title="Written for what this build does">
            This page describes the preview build as it actually works, rather than reproducing a standard
            policy about systems Cognita has not connected yet.
          </Alert>

          <div className="article-body" style={{ marginTop: 'var(--s-7)' }}>
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="article-heading">{section.heading}</h2>
                {section.body.map((paragraph) => <p className="article-paragraph" key={paragraph}>{paragraph}</p>)}
              </section>
            ))}
          </div>

          <footer className="article-foot">
            <div className="wrap-actions">
              <Link className="btn btn--secondary" to={which === 'terms' ? '/privacy' : '/terms'}>
                {which === 'terms' ? 'Privacy' : 'Terms'}
              </Link>
              <Link className="btn btn--secondary" to="/contact">Contact</Link>
            </div>
          </footer>
        </div>
      </section>
    </>
  )
}
