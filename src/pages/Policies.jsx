import { Link } from 'react-router-dom'
import DocPage from '../components/DocPage'
import { DISCLOSURES } from '../data/institution'

/**
 * Institutional status and policy index.
 *
 * The unusual move here is publishing what is NOT settled. docs/…§18 lists
 * thirteen items awaiting academic approval; a prospective learner deserves to
 * know they are open rather than discover it after applying. Stating the gaps
 * plainly is what makes the rest of the site credible.
 */

const PENDING = [
  'Entrance examination pass threshold and applied-task rubric',
  'Thresholds for Foundation Required, Foundation Accelerated, and Direct Track Entry',
  'The week-by-week curriculum map for the 10-week guided program',
  'Required deliverable count for each route',
  'Tuition and payment structure',
  'Eligibility criteria beyond the current application and examination flow',
  'Credential names and credential hierarchy',
  'Grading and mastery thresholds',
  'Attendance policy for guided cohorts',
  'Remediation, reapplication, retake, appeal, and academic-probation rules',
  'Instructor and evaluator qualification standards',
  'The student handbook and full policy suite',
  'The opening public course catalog',
]

export default function Policies() {
  return (
    <DocPage
      eyebrow="Institutional status"
      title="What Cognita claims, and what it does not."
      summary="A record of where the institution actually stands: the disclosures that apply today, the documents that exist, and the decisions still open."
      sections={[
        {
          id: 'disclosures',
          title: 'Disclosures',
          body: (
            <>
              {DISCLOSURES.map((d) => (
                <div key={d.id} style={{ marginBlockStart: 'var(--s-5)' }}>
                  <h3>{d.title}</h3>
                  <p style={{ marginBlockStart: 'var(--s-2)' }}>{d.body}</p>
                </div>
              ))}
            </>
          ),
        },
        {
          id: 'published',
          title: 'Published documents',
          body: (
            <>
              <p>These are available now:</p>
              <ul>
                <li><Link className="text-link" to="/privacy">Privacy statement</Link> — what this site stores and where it stays.</li>
                <li><Link className="text-link" to="/terms">Terms of use</Link> — terms covering the website.</li>
                <li><Link className="text-link" to="/faq">Frequently asked questions</Link> — admission, the examination, and the two routes.</li>
              </ul>
              <p>
                Both the privacy statement and the terms are interim documents written for a site that is not
                yet enrolling students. Neither has been reviewed by a lawyer, and both say so on the page.
              </p>
            </>
          ),
        },
        {
          id: 'pending',
          title: 'Decisions still open',
          body: (
            <>
              <p>
                The following have not been finalized. Cognita does not publish provisional figures for these,
                because a number published early becomes a promise that may not hold.
              </p>
              <ul>{PENDING.map((p) => <li key={p}>{p}</li>)}</ul>
              <p>
                If an answer you need is on this list, the honest answer today is that it has not been decided.
              </p>
            </>
          ),
        },
        {
          id: 'integrity',
          title: 'Academic integrity',
          body: (
            <>
              <p>
                Cognita assesses demonstrated competence. Work submitted for assessment must be the learner’s
                own, and entrance examination access issued to one applicant may not be shared.
              </p>
              <p>
                Integrity safeguards exist to protect learners, fairness, academic standards, and the
                credibility of a Cognita credential — not to catch people out. The full academic-integrity
                policy, including how findings are handled and appealed, forms part of the student policy
                suite listed above as still open.
              </p>
            </>
          ),
        },
      ]}
      footer={
        <p>
          Cognita publishes this page so that a prospective learner, parent, or partner can see the
          institution’s actual position rather than infer it. It will shorten as decisions are approved.
        </p>
      }
    />
  )
}
