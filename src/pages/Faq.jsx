import { Link } from 'react-router-dom'
import DocPage from '../components/DocPage'

/**
 * Frequently asked questions.
 *
 * Every answer here is answerable from the approved sources. Where something
 * has not been decided — tuition, thresholds, retake rules — the answer says
 * so plainly instead of filling the gap. An institution that admits what it
 * has not settled reads as more trustworthy than one that improvises.
 */

const FAQS = [
  {
    q: 'What is Cognita?',
    a: [
      'Cognita is a private training and learning institution built for Filipino learners. It teaches practical, structured work with artificial intelligence — how to frame a problem, instruct a system well, verify what comes back, and stay accountable for the result.',
      'Learning is competency-based. Opening lessons and meeting attendance requirements does not earn a credential; demonstrated understanding does.',
    ],
  },
  {
    q: 'Who is Cognita for?',
    a: [
      'Learners who want structure and a clear standard rather than an unguided library of videos. Cognita is designed around different educational backgrounds, levels of English proficiency, access to technology, and the practical demands learners face outside study.',
      'You do not need prior AI experience. You do need a working email address, a suitable device and internet connection, and a willingness to be assessed honestly.',
    ],
  },
  {
    q: 'Do I need to pass an examination to be admitted?',
    a: [
      'Yes. Admission runs through an application, a human review of that application, and the Cognita Entrance Examination (CEE). The CEE is invitation-only — approved applicants receive access by email. It is not open to the public and cannot be taken on demand.',
    ],
  },
  {
    q: 'What is the CEE actually for?',
    a: [
      'The CEE is not designed to catch learners out. It is designed to understand them accurately.',
      'It establishes what you already do well and where you would benefit from support, so Cognita can place you at the right level. An artificially high result is worse for you than an honest one, because it can place you into a pathway that does not match your actual needs.',
    ],
  },
  {
    q: 'How long is the examination, and what does it cover?',
    a: [
      'The current examination is a single persistent session of 70 minutes covering functional English and communication, AI foundations, research and verification judgment, and two applied written tasks.',
      'The session runs once. Leaving or refreshing does not restart the timer.',
    ],
  },
  {
    q: 'Do I get my result immediately after submitting?',
    a: [
      'No, and this is deliberate. The objective sections can be scored automatically, but the two applied tasks require an evaluator to read them. No pass or fail decision is released until that review is complete. Your result is then communicated by email.',
    ],
  },
  {
    q: 'What is AI-00?',
    a: [
      'AI-00 is a foundation bridge, not a product you can buy. It is targeted support assigned through examination readiness evidence and evaluator judgment, covering AI foundations, functional English, comprehension, research basics, digital literacy, and learning readiness.',
      'You do not choose AI-00. It is recommended when the evidence indicates it would help you succeed.',
    ],
  },
  {
    q: 'What is the difference between the two programs?',
    a: [
      'The Cognita Professional AI Program is a 10-week guided, cohort-based route with mentor support, deadlines, and capstone-based assessment. The Cognita Skills Lab is self-paced and project-based, with a recommended 28-day rhythm and an estimated 32 to 40 hours of learning.',
      'Guided when you need structure. Flexible when you need freedom. The standard required to complete is the same in both.',
    ],
  },
  {
    q: 'How much does it cost?',
    a: [
      'Tuition has not been finalized and is not published. Cognita will not quote a figure before the fee structure is approved, because a number published early becomes a promise that may not hold.',
    ],
  },
  {
    q: 'Is Cognita accredited?',
    a: [
      'No. Cognita does not claim accreditation, government recognition, institutional partnership, or endorsement by any agency or organization. Any credential Cognita issues represents work assessed against Cognita’s own published standards, and nothing more.',
    ],
  },
  {
    q: 'Can I apply right now?',
    a: [
      'You can complete the application form, and it will be kept in your browser on this device. Cognita is not yet enrolling students, and this site has no server to send an application to, so nothing is transmitted or reviewed yet.',
      'The site states this at the point of submission rather than implying a delivery that did not happen.',
    ],
  },
  {
    q: 'What happens if I do not pass?',
    a: [
      'The result email carries the applicable next-step guidance. Retake, reapplication, and appeal rules are part of the academic policy suite, which has not been finalized. Cognita will publish those rules before they are applied to anyone, rather than deciding them case by case.',
    ],
  },
]

export default function Faq() {
  return (
    <DocPage
      eyebrow="Frequently asked questions"
      title="Questions people ask before applying."
      summary="Straight answers about admission, the entrance examination, the two learning routes, and what Cognita has and has not settled."
      sections={[
        {
          id: 'questions',
          title: 'Questions and answers',
          body: (
            <div className="ed-qa">
              {FAQS.map((item, i) => (
                <details key={item.q}>
                  <summary>
                    <span className="ed-qa-index">{String(i + 1).padStart(2, '0')}</span>
                    {item.q}
                  </summary>
                  <div className="ed-qa-answer">
                    {item.a.map((p) => <p key={p.slice(0, 32)}>{p}</p>)}
                  </div>
                </details>
              ))}
            </div>
          ),
        },
        {
          id: 'unanswered',
          title: 'Something not answered here',
          body: (
            <>
              <p>
                If your question is about a detail Cognita has not yet published — tuition, exact
                thresholds, schedules, the final credential structure — the honest answer is that it has
                not been decided. Those are listed on the <Link className="text-link" to="/policies">institutional status</Link> page.
              </p>
              <p>
                For anything else, use the <Link className="text-link" to="/contact">contact page</Link>.
              </p>
            </>
          ),
        },
      ]}
    />
  )
}
