import { BookOpen, CalendarDays, CheckCircle2, LockKeyhole, MessageSquareText, NotebookTabs } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getAccount, getEnrollment, hasStudentAppAccess } from '../lib/admissions'

export default function StudentApp() {
  const account = getAccount()
  const enrollment = getEnrollment()

  if (!hasStudentAppAccess()) {
    return (
      <section className="student-app-page">
        <div className="page-width gate-card">
          <LockKeyhole size={36} />
          <p className="section-label">STUDENT APP</p>
          <h1>Student access has not been activated.</h1>
          <p>The learning app is reserved for enrolled students. Complete admissions, CEE, program selection, payment, and account activation first.</p>
          <Link className="button button--ghost" to="/apply">View admissions status</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="student-app-page">
      <div className="page-width student-dashboard">
        <header className="student-dashboard-header">
          <div>
            <p className="section-label">COGNITA STUDENT APP</p>
            <h1>Welcome, {account.fullName.split(' ')[0]}.</h1>
            <p>Your learning happens here, separate from the public Cognita website.</p>
          </div>
          <div className="student-program-chip">
            <span>{enrollment.programCode}</span>
            <strong>{enrollment.programName}</strong>
          </div>
        </header>

        <div className="student-app-grid">
          <article className="student-app-card student-app-card--featured">
            <BookOpen />
            <span>CONTINUE LEARNING</span>
            <h2>Your learning path</h2>
            <p>The production curriculum, lessons, activities, checkpoints, and facilitator interventions will live inside this student app rather than on the public website.</p>
            <div className="app-progress"><span style={{ width: '0%' }} /></div>
            <small>Curriculum content not yet connected in this frontend milestone.</small>
          </article>

          <article className="student-app-card">
            <NotebookTabs />
            <h3>Modules</h3>
            <p>Structured lessons, activities, assessments, and resources for your enrolled program.</p>
          </article>
          <article className="student-app-card">
            <CheckCircle2 />
            <h3>Progress</h3>
            <p>Completion, assessment status, milestones, and program requirements.</p>
          </article>
          <article className="student-app-card">
            <CalendarDays />
            <h3>Schedule</h3>
            <p>Deadlines, facilitator sessions, institutional notices, and important dates.</p>
          </article>
          <article className="student-app-card">
            <MessageSquareText />
            <h3>Support</h3>
            <p>Future access to facilitator guidance, academic support, and student services.</p>
          </article>
        </div>

        <p className="mvp-note">Frontend-only student-app shell. Production identity, cloud progress, instructor access, learning records, and cross-device sync will be connected only when Cognita is ready to accept real students.</p>
      </div>
    </section>
  )
}
