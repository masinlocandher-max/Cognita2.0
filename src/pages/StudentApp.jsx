import { useMemo, useState } from 'react'
import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  FileCheck2,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  LockKeyhole,
  MessageSquareText,
  NotebookTabs,
  Settings,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { getAccount, getEnrollment, hasStudentAppAccess } from '../lib/admissions'
import { GUIDED_TRACK_OPTIONS } from '../data/learning'
import {
  createSupportRequest,
  getLearningSnapshot,
  readLearningState,
  saveCapstone,
  saveProfile,
  saveSettings,
  saveSubmission,
  setTrack,
  submitCapstone,
  toggleLessonComplete,
} from '../lib/learning'

const NAV = [
  ['overview', LayoutDashboard, 'Overview'],
  ['learn', BookOpen, 'Learn'],
  ['assessments', ClipboardCheck, 'Assessments'],
  ['feedback', MessageSquareText, 'Feedback'],
  ['capstone', GraduationCap, 'Capstone'],
  ['portfolio', FolderOpen, 'Portfolio'],
  ['credential', Award, 'Credential'],
  ['support', CircleHelp, 'Support'],
  ['profile', UserRound, 'Profile'],
]

function formatDate(value) {
  if (!value) return 'Not yet'
  return new Intl.DateTimeFormat('en-PH', { dateStyle: 'medium' }).format(new Date(value))
}

function Gate() {
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

export default function StudentApp() {
  const account = getAccount()
  const enrollment = getEnrollment()
  const [tab, setTab] = useState('overview')
  const [selectedLessonId, setSelectedLessonId] = useState(null)
  const [learning, setLearning] = useState(() => getLearningSnapshot())
  const [submissionDraft, setSubmissionDraft] = useState('')
  const [capstoneDraft, setCapstoneDraft] = useState(() => readLearningState().capstone.draft || '')
  const [capstoneReflection, setCapstoneReflection] = useState(() => readLearningState().capstone.reflection || '')
  const [supportMessage, setSupportMessage] = useState('')
  const [profile, setProfile] = useState(() => readLearningState().profile)
  const [settingsState, setSettingsState] = useState(() => readLearningState().settings)

  const refresh = () => setLearning(getLearningSnapshot())

  if (!hasStudentAppAccess()) return <Gate />

  const firstName = account.fullName.split(' ')[0]
  const selectedLesson = selectedLessonId
    ? learning.lessons.find((lesson) => lesson.id === selectedLessonId)
    : null
  const selectedModule = selectedLesson
    ? learning.modules.find((module) => module.lessons.some((lesson) => lesson.id === selectedLesson.id))
    : null

  const nextLesson = useMemo(
    () => learning.lessons.find((lesson) => !learning.state.completedLessons.includes(lesson.id)) || learning.lessons[0],
    [learning],
  )

  const openLesson = (lesson) => {
    setSelectedLessonId(lesson.id)
    setSubmissionDraft(learning.state.submissions[lesson.id]?.text || '')
    setTab('learn')
  }

  const completeLesson = (lessonId) => {
    toggleLessonComplete(lessonId)
    refresh()
  }

  const storeSubmission = () => {
    if (!selectedLesson) return
    saveSubmission(selectedLesson.id, submissionDraft)
    refresh()
  }

  const changeTrack = (event) => {
    setTrack(event.target.value)
    setSelectedLessonId(null)
    refresh()
  }

  const saveCapstoneWork = () => {
    saveCapstone({ draft: capstoneDraft, reflection: capstoneReflection })
    refresh()
  }

  const releaseCapstone = () => {
    saveCapstone({ draft: capstoneDraft, reflection: capstoneReflection })
    submitCapstone()
    refresh()
  }

  const sendSupport = () => {
    if (!supportMessage.trim()) return
    createSupportRequest(supportMessage)
    setSupportMessage('')
    refresh()
  }

  const saveProfileForm = () => {
    saveProfile(profile)
    saveSettings(settingsState)
    refresh()
  }

  const outputs = learning.lessons.filter((lesson) => ['output', 'capstone'].includes(lesson.type))
  const credentialReady = learning.progress === 100 && learning.submittedOutputs >= learning.requiredOutputs && learning.state.capstone.status === 'submitted_for_review'

  return (
    <section className="student-app-page student-workspace-page">
      <div className="student-workspace page-width">
        <aside className="student-sidebar">
          <div className="student-sidebar-brand">
            <span>COGNITA</span>
            <strong>Student App</strong>
          </div>
          <nav aria-label="Student app navigation">
            {NAV.map(([id, Icon, label]) => (
              <button key={id} type="button" className={tab === id ? 'is-active' : ''} onClick={() => setTab(id)}>
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
          <div className="student-sidebar-foot">
            <span>{enrollment.programCode}</span>
            <strong>{enrollment.programName}</strong>
            <small>Frontend learning preview</small>
          </div>
        </aside>

        <main className="student-workspace-main">
          <header className="student-topbar">
            <div>
              <span className="student-kicker">COGNITA STUDENT APP</span>
              <h1>{tab === 'overview' ? `Welcome, ${firstName}.` : NAV.find(([id]) => id === tab)?.[2]}</h1>
            </div>
            <div className="student-progress-chip">
              <span>Overall progress</span>
              <strong>{learning.progress}%</strong>
            </div>
          </header>

          {tab === 'overview' && (
            <div className="student-view">
              <section className="student-continue-panel">
                <div>
                  <span>NEXT ACTION</span>
                  <h2>{nextLesson?.title || 'Learning path complete'}</h2>
                  <p>{learning.progress === 100 ? 'Review your portfolio, capstone, and credential requirements.' : 'Continue with the next incomplete learning activity in your program.'}</p>
                </div>
                {nextLesson && <button className="button" type="button" onClick={() => openLesson(nextLesson)}>Continue learning <ChevronRight size={18} /></button>}
              </section>

              <div className="student-metric-grid">
                <article><BookOpen /><span>Learning progress</span><strong>{learning.completed}/{learning.total}</strong><small>activities completed</small></article>
                <article><FileCheck2 /><span>Required outputs</span><strong>{learning.submittedOutputs}/{learning.requiredOutputs}</strong><small>submitted locally</small></article>
                <article><GraduationCap /><span>Capstone</span><strong>{learning.state.capstone.status.replaceAll('_', ' ')}</strong><small>competency evidence</small></article>
                <article><MessageSquareText /><span>Support</span><strong>{learning.state.supportRequests.filter((request) => request.status.includes('open')).length}</strong><small>open local requests</small></article>
              </div>

              {enrollment.programId === 'professional-ai-program' && (
                <section className="student-section-panel">
                  <div className="student-section-heading"><div><span>GUIDED SPECIALIZATION</span><h2>Your applied track</h2></div><BriefcaseBusiness /></div>
                  <p>The guided route includes foundation learning followed by specialization. This selector is a frontend preview of your recorded track assignment and should become staff-controlled in production.</p>
                  <select className="student-select" value={learning.state.selectedTrack} onChange={changeTrack}>
                    {GUIDED_TRACK_OPTIONS.map((track) => <option key={track}>{track}</option>)}
                  </select>
                </section>
              )}

              <section className="student-section-panel">
                <div className="student-section-heading"><div><span>PROGRAM MAP</span><h2>Your learning journey</h2></div><NotebookTabs /></div>
                <div className="student-module-strip">
                  {learning.modules.map((module) => {
                    const done = module.lessons.every((lesson) => learning.state.completedLessons.includes(lesson.id))
                    return <div key={module.id} className={done ? 'is-complete' : ''}><span>{module.suggested}</span><strong>{module.title}</strong>{done && <Check size={16} />}</div>
                  })}
                </div>
              </section>
            </div>
          )}

          {tab === 'learn' && (
            <div className="student-view learning-view">
              <aside className="course-outline">
                {learning.modules.map((module) => (
                  <section key={module.id}>
                    <div className="course-module-title"><span>{module.stage}</span><strong>{module.title}</strong><small>{module.suggested}</small></div>
                    {module.lessons.map((lesson) => {
                      const done = learning.state.completedLessons.includes(lesson.id)
                      return (
                        <button key={lesson.id} type="button" className={`${selectedLessonId === lesson.id ? 'is-active' : ''} ${done ? 'is-complete' : ''}`} onClick={() => openLesson(lesson)}>
                          <span>{done ? <CheckCircle2 size={16} /> : <BookOpen size={16} />}</span>
                          <div><strong>{lesson.title}</strong><small>{lesson.type} · {lesson.minutes} min</small></div>
                        </button>
                      )
                    })}
                  </section>
                ))}
              </aside>

              <article className="lesson-canvas">
                {!selectedLesson ? (
                  <div className="lesson-empty"><BookOpen size={38} /><h2>Select a lesson or activity.</h2><p>Your program outline stays on the left. Open any activity to study, complete it, or submit required work.</p></div>
                ) : (
                  <>
                    <div className="lesson-meta"><span>{selectedModule.stage}</span><span>{selectedModule.suggested}</span><span>{selectedLesson.minutes} min</span></div>
                    <h2>{selectedLesson.title}</h2>
                    <p className="lesson-module-summary">{selectedModule.summary}</p>

                    <div className="lesson-content-block">
                      <h3>Learning focus</h3>
                      <p>This learning surface is structured around the approved Cognita curriculum. Production lesson media, readings, examples, and instructor materials will be inserted here without changing the competency sequence.</p>
                    </div>

                    <div className="lesson-integrity-note"><ShieldCheck /><div><strong>Human intelligence remains accountable.</strong><p>Use AI to support learning where the activity permits it, but remain able to explain, verify, revise, and defend your work. Do not submit unreviewed AI output as your own demonstrated competence.</p></div></div>

                    {['output', 'practice', 'capstone'].includes(selectedLesson.type) && (
                      <div className="lesson-submission-block">
                        <h3>{selectedLesson.type === 'capstone' ? 'Working submission' : 'Activity response'}</h3>
                        <textarea rows="10" value={submissionDraft} onChange={(event) => setSubmissionDraft(event.target.value)} placeholder="Draft your response, evidence notes, reflection, or submission here..." />
                        <div><button className="button button--ghost" type="button" onClick={storeSubmission}>Save / submit locally</button><small>This does not transmit work to Cognita yet.</small></div>
                      </div>
                    )}

                    <button className={`lesson-complete-button ${learning.state.completedLessons.includes(selectedLesson.id) ? 'is-complete' : ''}`} type="button" onClick={() => completeLesson(selectedLesson.id)}>
                      <CheckCircle2 size={19} />
                      {learning.state.completedLessons.includes(selectedLesson.id) ? 'Marked complete' : 'Mark activity complete'}
                    </button>
                  </>
                )}
              </article>
            </div>
          )}

          {tab === 'assessments' && (
            <div className="student-view">
              <div className="student-section-heading"><div><span>COMPETENCY EVIDENCE</span><h2>Required outputs and assessments</h2></div><ClipboardCheck /></div>
              <p className="student-view-intro">Cognita completion is not based on opening lessons alone. Required outputs must demonstrate applied competence and may require revision before they count toward a credential.</p>
              <div className="assessment-list">
                {outputs.map((lesson) => {
                  const submission = learning.state.submissions[lesson.id]
                  const module = learning.modules.find((item) => item.lessons.some((entry) => entry.id === lesson.id))
                  return (
                    <article key={lesson.id}>
                      <div><span>{module?.stage} · {module?.suggested}</span><h3>{lesson.title}</h3><p>{module?.title}</p></div>
                      <div className="assessment-status"><strong>{submission?.status ? submission.status.replaceAll('_', ' ') : 'not submitted'}</strong><button type="button" onClick={() => openLesson(lesson)}>Open</button></div>
                    </article>
                  )
                })}
              </div>
            </div>
          )}

          {tab === 'feedback' && (
            <div className="student-view">
              <div className="student-section-heading"><div><span>HUMAN REVIEW</span><h2>Feedback and revision queue</h2></div><MessageSquareText /></div>
              <div className="feedback-empty">
                <MessageSquareText size={36} />
                <h3>No production feedback has been delivered yet.</h3>
                <p>When the backend and facilitator workflow are connected, this area will show evaluator comments, PASS / REVISE decisions, revision deadlines, and the learner’s resubmission history. Local submissions are visible under Assessments and Portfolio.</p>
              </div>
            </div>
          )}

          {tab === 'capstone' && (
            <div className="student-view capstone-grid">
              <article className="student-section-panel">
                <div className="student-section-heading"><div><span>FINAL INTEGRATION</span><h2>Capstone workspace</h2></div><GraduationCap /></div>
                <p>Your capstone should require independent judgment, source verification, revision, and a defensible explanation of how AI was used. A single copied AI response is not sufficient evidence of competence.</p>
                <label>Capstone project / evidence draft<textarea rows="12" value={capstoneDraft} onChange={(event) => setCapstoneDraft(event.target.value)} /></label>
                <label>Reflection and professional defense notes<textarea rows="8" value={capstoneReflection} onChange={(event) => setCapstoneReflection(event.target.value)} /></label>
                <div className="capstone-actions"><button className="button button--ghost" type="button" onClick={saveCapstoneWork}>Save draft</button><button className="button" type="button" onClick={releaseCapstone}>Submit for review</button></div>
                <small className="mvp-note">Frontend preview only. “Submit” records the state on this device and does not reach an evaluator.</small>
              </article>
              <aside className="capstone-status-card">
                <span>CAPSTONE STATUS</span>
                <strong>{learning.state.capstone.status.replaceAll('_', ' ')}</strong>
                <p>Last update: {formatDate(learning.state.capstone.updatedAt || learning.state.capstone.submittedAt)}</p>
                <div><CheckCircle2 /><span>Project evidence</span></div><div><CheckCircle2 /><span>Reflection</span></div><div><ShieldCheck /><span>Professional defense review</span></div>
              </aside>
            </div>
          )}

          {tab === 'portfolio' && (
            <div className="student-view">
              <div className="student-section-heading"><div><span>EVIDENCE OF WORK</span><h2>Learning portfolio</h2></div><FolderOpen /></div>
              <p className="student-view-intro">Your portfolio should make competence visible. These are the outputs currently saved in this browser preview.</p>
              <div className="portfolio-grid">
                {learning.state.portfolio.length ? learning.state.portfolio.map((lessonId) => {
                  const lesson = learning.lessons.find((item) => item.id === lessonId)
                  const submission = learning.state.submissions[lessonId]
                  return <article key={lessonId}><Sparkles /><span>{lesson?.type || 'output'}</span><h3>{lesson?.title || lessonId}</h3><p>{submission?.text?.slice(0, 180)}{submission?.text?.length > 180 ? '…' : ''}</p><small>Updated {formatDate(submission?.updatedAt)}</small></article>
                }) : <div className="feedback-empty"><FolderOpen size={34} /><h3>Your portfolio will grow as you submit applied work.</h3></div>}
              </div>
            </div>
          )}

          {tab === 'credential' && (
            <div className="student-view credential-view">
              <article className="credential-card-preview">
                <span>COGNITA INSTITUTE</span>
                <Award size={44} />
                <h2>Credential eligibility</h2>
                <strong>{credentialReady ? 'Ready for evaluator verification' : 'Requirements in progress'}</strong>
                <p>A Cognita credential is earned through demonstrated competence, required outputs, assessment evidence, and final review. This preview does not issue a certificate.</p>
              </article>
              <div className="credential-requirements">
                <div className={learning.progress === 100 ? 'is-done' : ''}><CheckCircle2 /><span>All learning activities complete</span><strong>{learning.progress}%</strong></div>
                <div className={learning.submittedOutputs >= learning.requiredOutputs ? 'is-done' : ''}><FileCheck2 /><span>Required outputs submitted</span><strong>{learning.submittedOutputs}/{learning.requiredOutputs}</strong></div>
                <div className={learning.state.capstone.status === 'submitted_for_review' ? 'is-done' : ''}><GraduationCap /><span>Capstone submitted</span><strong>{learning.state.capstone.status.replaceAll('_', ' ')}</strong></div>
                <div><ShieldCheck /><span>Human verification</span><strong>Pending production review</strong></div>
              </div>
            </div>
          )}

          {tab === 'support' && (
            <div className="student-view support-layout">
              <article className="student-section-panel">
                <div className="student-section-heading"><div><span>STUDENT SUPPORT</span><h2>Ask for human help</h2></div><CircleHelp /></div>
                <p>Use this for learning questions, schedule concerns, accessibility needs, technical issues, or situations that require facilitator judgment.</p>
                <textarea rows="7" value={supportMessage} onChange={(event) => setSupportMessage(event.target.value)} placeholder="Describe what you need help with..." />
                <button className="button" type="button" onClick={sendSupport}>Create local support request</button>
                <small className="mvp-note">This is a device-local preview. It is not sent to Cognita yet.</small>
              </article>
              <aside className="support-history">
                <span>REQUEST HISTORY</span>
                {learning.state.supportRequests.length ? learning.state.supportRequests.map((request) => <div key={request.id}><strong>{request.status.replaceAll('_', ' ')}</strong><p>{request.message}</p><small>{formatDate(request.createdAt)}</small></div>) : <p>No support requests yet.</p>}
              </aside>
            </div>
          )}

          {tab === 'profile' && (
            <div className="student-view profile-layout">
              <article className="student-section-panel profile-card">
                <div className="student-section-heading"><div><span>LEARNER PROFILE</span><h2>Your learning identity</h2></div><UserRound /></div>
                <label>Preferred name<input value={profile.preferredName} onChange={(event) => setProfile({ ...profile, preferredName: event.target.value })} placeholder={account.fullName} /></label>
                <label>Short professional / learner bio<textarea rows="5" value={profile.bio} onChange={(event) => setProfile({ ...profile, bio: event.target.value })} /></label>
                <label>Learning and professional goals<textarea rows="6" value={profile.goals} onChange={(event) => setProfile({ ...profile, goals: event.target.value })} /></label>
              </article>
              <aside className="student-section-panel settings-card">
                <div className="student-section-heading"><div><span>SETTINGS</span><h2>Learning preferences</h2></div><Settings /></div>
                <label className="setting-toggle"><input type="checkbox" checked={settingsState.reminders} onChange={(event) => setSettingsState({ ...settingsState, reminders: event.target.checked })} /><span><strong>Learning reminders</strong><small>Preference only until real notifications are connected.</small></span></label>
                <label className="setting-toggle"><input type="checkbox" checked={settingsState.reducedMotion} onChange={(event) => setSettingsState({ ...settingsState, reducedMotion: event.target.checked })} /><span><strong>Reduced motion</strong><small>Preference for a calmer app experience.</small></span></label>
                <button className="button" type="button" onClick={saveProfileForm}>Save profile and settings</button>
                <div className="profile-account-facts"><span>Account email</span><strong>{account.email}</strong><span>Program</span><strong>{enrollment.programName}</strong><span>Access activated</span><strong>{formatDate(account.activatedAt)}</strong></div>
              </aside>
            </div>
          )}

          <footer className="student-app-footer-note">Frontend-only learning environment. Production authentication, instructor review, cross-device records, real notifications, and credential issuance remain disabled until Cognita is ready for real student intake.</footer>
        </main>
      </div>
    </section>
  )
}
