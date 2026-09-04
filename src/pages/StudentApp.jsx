import {
  Award, BookOpen, CalendarDays, ClipboardCheck, FolderOpen, GraduationCap,
  LifeBuoy, LockKeyhole, Megaphone, MessageSquareText, NotebookTabs, TrendingUp,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { getAccount, getApplication, getEnrollment, hasStudentAppAccess } from '../lib/admissions'
import AdmissionStatusPanel from '../components/AdmissionStatus'

/**
 * The Cognita Learning App.
 *
 * The private learning environment for enrolled students, separate from the
 * public institutional website. The structure below is the surface the
 * production curriculum will occupy. Areas without approved content say so
 * rather than presenting invented lessons or fabricated progress.
 */

const AREAS = [
  { icon: NotebookTabs, title: 'Modules', body: 'Structured lessons and learning materials for your enrolled program.' },
  { icon: ClipboardCheck, title: 'Assessments', body: 'Competency checks, quizzes, and practical exercises tied to each module.' },
  { icon: FolderOpen, title: 'Submissions', body: 'Required outputs, revision status, and submission history.' },
  { icon: MessageSquareText, title: 'Feedback', body: 'Mentor and facilitator review on your submitted work.' },
  { icon: TrendingUp, title: 'Progress', body: 'Completion against required outputs rather than time spent.' },
  { icon: CalendarDays, title: 'Schedule', body: 'Cohort deadlines for guided study, or your own rhythm when self-paced.' },
  { icon: GraduationCap, title: 'Capstone', body: 'Your capstone workspace and professional defense requirements.' },
  { icon: Award, title: 'Portfolio and credentials', body: 'Portfolio evidence and completion status for your program.' },
  { icon: LifeBuoy, title: 'Student support', body: 'Academic and administrative help while you study.' },
  { icon: Megaphone, title: 'Notices', body: 'Institutional announcements relevant to your enrollment.' },
]

export default function StudentApp() {
  const account = getAccount()
  const enrollment = getEnrollment()
  const application = getApplication()

  if (!hasStudentAppAccess()) {
    return (
      <section className="admissions-page">
        <div className="page-width ci-stack-lg">
          <div className="gate-card">
            <LockKeyhole size={34} aria-hidden="true" />
            <p className="section-label section-label--plain">Cognita Learning App</p>
            <h1>Student access has not been activated.</h1>
            <p>
              The Learning App is reserved for enrolled students. Admission, examination, program selection,
              enrollment, and account activation come first.
            </p>
            <Link className="button" to="/apply">View your admission status <span aria-hidden="true">→</span></Link>
          </div>
          {application ? (
            <AdmissionStatusPanel application={application} enrollment={enrollment} account={account} />
          ) : null}
        </div>
      </section>
    )
  }

  return (
    <section className="ci-app-shell">
      <div className="page-width">
        <header className="ci-app-head">
          <div>
            <p className="section-label">Cognita Learning App</p>
            <h1>Welcome, {account.fullName.split(' ')[0]}.</h1>
            <p>Your learning environment, separate from the public Cognita website.</p>
          </div>
          <div className="ci-program-chip">
            <span>{enrollment.programCode}</span>
            <strong>{enrollment.programName}</strong>
          </div>
        </header>

        <article className="ci-continue">
          <div>
            <p className="ci-card-title" style={{ color: 'rgba(255,255,255,.55)' }}>Continue learning</p>
            <h2>Your learning path</h2>
            <p>
              Lessons, activities, checkpoints, and facilitator guidance for your enrolled program appear here.
              Cognita has not yet published approved curriculum content for this build, so no modules are
              listed and no progress is recorded.
            </p>
          </div>
          <div className="ci-continue-progress">
            <div className="ci-continue-meter" role="img" aria-label="Program progress: not started">
              <span style={{ width: '0%' }} />
            </div>
            <p>Curriculum not yet connected</p>
          </div>
        </article>

        <div className="ci-app-grid" style={{ marginTop: '22px' }}>
          {AREAS.map(({ icon: Icon, title, body }) => (
            <article className="ci-app-tile ci-app-tile--pending" key={title}>
              <Icon size={19} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{body}</p>
              <span className="ci-app-pending">Opens with approved curriculum</span>
            </article>
          ))}
        </div>

        <div className="ci-notice ci-notice--sim" style={{ marginTop: '26px' }}>
          <BookOpen size={17} aria-hidden="true" />
          <div>
            <strong>Frontend preview — no curriculum, no cloud records.</strong>
            This environment shows the structure of the Cognita Learning App. Lessons, submissions, mentor
            review, and progress are not connected, and nothing here is stored outside this browser.
          </div>
        </div>
      </div>
    </section>
  )
}
