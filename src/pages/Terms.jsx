import { Link } from 'react-router-dom'
import DocPage from '../components/DocPage'

/**
 * Terms of use for the website.
 *
 * Deliberately scoped to the website only. Academic terms — tuition, refunds,
 * retakes, appeals, academic probation — belong to the student policy suite,
 * which docs/COGNITA-2.0-SOURCE-OF-TRUTH.md §18 lists as unapproved. Writing
 * them here would invent institutional policy, so this page says where they
 * are instead of guessing at them.
 */
export default function Terms() {
  return (
    <DocPage
      eyebrow="Terms of use"
      title="Terms for using this website."
      summary="These terms cover this website. They are not the academic terms of enrollment, which are published separately once approved."
      updated="Interim terms for a site that is not yet enrolling students."
      sections={[
        {
          id: 'scope',
          title: 'What these terms cover',
          body: (
            <>
              <p>
                These terms apply to your use of the Cognita website. By using the site you accept them. If
                you do not accept them, please do not use the site.
              </p>
              <p>
                They do not cover enrollment, tuition, assessment, credentials, or the academic relationship
                between Cognita and an admitted student. Those are governed by the student policy suite,
                which has not been finalized and is not published yet.
              </p>
            </>
          ),
        },
        {
          id: 'stage',
          title: 'The site is in development',
          body: (
            <>
              <p>
                Cognita is not yet enrolling students. The site describes an intended admissions process and
                intended programs. Information here may change, and sections of the site are simulations of a
                process rather than the working process itself.
              </p>
              <p>
                Nothing on this site constitutes an offer of admission, a guarantee of a place, a quotation
                of fees, or a contract for educational services.
              </p>
            </>
          ),
        },
        {
          id: 'conduct',
          title: 'Using the site properly',
          body: (
            <>
              <p>When using this site you agree not to:</p>
              <ul>
                <li>submit information you know to be false, or impersonate another person;</li>
                <li>share, resell, or publish entrance examination access that was issued to you;</li>
                <li>reproduce or distribute examination content, in whole or in part;</li>
                <li>attempt to interfere with, probe, or circumvent the site’s intended operation;</li>
                <li>use automated systems to extract content from the site at scale.</li>
              </ul>
            </>
          ),
        },
        {
          id: 'integrity',
          title: 'Examination integrity',
          body: (
            <>
              <p>
                Entrance examination access is issued to one named applicant and is not transferable. Work
                submitted must be your own.
              </p>
              <p>
                This is not a trap set for you. An artificially high result places you into a pathway that
                does not match your actual needs, which costs you more than an honest result ever would. The
                examination exists to understand you accurately, and integrity safeguards protect the
                fairness of that judgment for every applicant.
              </p>
            </>
          ),
        },
        {
          id: 'content',
          title: 'Content and intellectual property',
          body: (
            <p>
              The Cognita name, logo, written content, curriculum structure, and examination materials belong
              to Cognita. You may read and share links to public pages. You may not republish, adapt, or use
              the material commercially without written permission.
            </p>
          ),
        },
        {
          id: 'accuracy',
          title: 'Accuracy and availability',
          body: (
            <>
              <p>
                Cognita works to keep this site accurate, but content is provided as it is, without warranty.
                The site may be unavailable, incomplete, or changed without notice while it is in development.
              </p>
              <p>
                To the extent permitted by Philippine law, Cognita is not liable for loss arising from
                reliance on information published here during this development stage.
              </p>
            </>
          ),
        },
        {
          id: 'data',
          title: 'Your information',
          body: (
            <p>
              What this site stores, and where it stays, is set out in the{' '}
              <Link className="text-link" to="/privacy">privacy statement</Link>. In short: your entries are
              held in your own browser and are not transmitted to Cognita.
            </p>
          ),
        },
        {
          id: 'law',
          title: 'Governing law',
          body: (
            <p>
              These terms are governed by the laws of the Republic of the Philippines.
            </p>
          ),
        },
      ]}
      footer={
        <p>
          These interim terms have not been reviewed by a lawyer. They must be replaced with reviewed terms
          of service and enrollment terms before Cognita accepts a real application, a payment, or a student.
        </p>
      }
    />
  )
}
