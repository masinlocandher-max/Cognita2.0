import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ScrollToTop from './ScrollToTop.jsx'
import PublicLayout from './PublicLayout.jsx'
import AppLayout from './AppLayout.jsx'
import LearnLayout from './LearnLayout.jsx'
import InternalLayout from './InternalLayout.jsx'
import { LoadingRows } from '../components/StateBlock.jsx'

/*
 * The public site is the first thing most people load, so it ships eagerly.
 * Everything behind it — the learner app, the learning environment, and the two
 * internal surfaces — is split out, so a visitor reading the homepage does not
 * download the evaluator workspace and the admin interface.
 */
import Home from '../pages/public/Home.jsx'
import About from '../pages/public/About.jsx'
import Programs from '../pages/public/Programs.jsx'
import Ai00 from '../pages/public/Ai00.jsx'
import Ai01 from '../pages/public/Ai01.jsx'
import Admissions from '../pages/public/Admissions.jsx'
import EntranceExamInfo from '../pages/public/EntranceExamInfo.jsx'
import Contact from '../pages/public/Contact.jsx'
import NotFound from '../pages/public/NotFound.jsx'

const Dashboard = lazy(() => import('../pages/app/Dashboard.jsx'))
const Profile = lazy(() => import('../pages/app/Profile.jsx'))
const Application = lazy(() => import('../pages/app/Application.jsx'))
const EntranceExam = lazy(() => import('../pages/app/EntranceExam.jsx'))
const Results = lazy(() => import('../pages/app/Results.jsx'))
const Placement = lazy(() => import('../pages/app/Placement.jsx'))
const Enrollment = lazy(() => import('../pages/app/Enrollment.jsx'))

const LearnDashboard = lazy(() => import('../pages/learn/LearnDashboard.jsx'))
const ProgramView = lazy(() => import('../pages/learn/ProgramView.jsx'))
const CourseView = lazy(() => import('../pages/learn/CourseView.jsx'))
const ModuleView = lazy(() => import('../pages/learn/ModuleView.jsx'))
const LessonView = lazy(() => import('../pages/learn/LessonView.jsx'))
const AssessmentView = lazy(() => import('../pages/learn/AssessmentView.jsx'))
const ProgressView = lazy(() => import('../pages/learn/ProgressView.jsx'))
const Certificates = lazy(() => import('../pages/learn/Certificates.jsx'))
const VerifyCredential = lazy(() => import('../pages/learn/VerifyCredential.jsx'))

const EvaluatorHome = lazy(() => import('../pages/staff/EvaluatorHome.jsx'))
const EvaluationQueue = lazy(() => import('../pages/staff/EvaluationQueue.jsx'))
const EvaluationReview = lazy(() => import('../pages/staff/EvaluationReview.jsx'))

const AdminOverview = lazy(() => import('../pages/admin/AdminOverview.jsx'))
const AdminSection = lazy(() => import('../pages/admin/AdminSection.jsx'))

import { ADMIN_NAV } from '../pages/admin/adminSections.jsx'

const STAFF_NAV = [
  { to: '/staff', label: 'Overview', end: true },
  { to: '/staff/evaluations', label: 'Evaluations' },
]

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="page-width" style={{ paddingBlock: 'var(--s-9)' }}><LoadingRows rows={3} height={90} /></div>}>
        <Routes>
          {/* Public institute */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/ai-00" element={<Ai00 />} />
            <Route path="/ai-01" element={<Ai01 />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/entrance-exam" element={<EntranceExamInfo />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/verify" element={<VerifyCredential />} />
            <Route path="/verify/:credentialId" element={<VerifyCredential />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Applicant and learner */}
          <Route element={<AppLayout />}>
            <Route path="/app" element={<Dashboard />} />
            <Route path="/app/profile" element={<Profile />} />
            <Route path="/app/application" element={<Application />} />
            <Route path="/app/entrance-exam" element={<EntranceExam />} />
            <Route path="/app/results" element={<Results />} />
            <Route path="/app/placement" element={<Placement />} />
            <Route path="/app/enrollment" element={<Enrollment />} />
          </Route>

          {/* Learning environment */}
          <Route element={<LearnLayout />}>
            <Route path="/learn" element={<Navigate to="/learn/dashboard" replace />} />
            <Route path="/learn/dashboard" element={<LearnDashboard />} />
            <Route path="/learn/program/:programId" element={<ProgramView />} />
            <Route path="/learn/course/:courseId" element={<CourseView />} />
            <Route path="/learn/module/:moduleId" element={<ModuleView />} />
            <Route path="/learn/lesson/:lessonId" element={<LessonView />} />
            <Route path="/learn/assessment/:assessmentId" element={<AssessmentView />} />
            <Route path="/learn/progress" element={<ProgressView />} />
            <Route path="/learn/certificates" element={<Certificates />} />
          </Route>

          {/* Evaluator workspace — internal, noindex, not in public navigation */}
          <Route element={<InternalLayout title="Cognita Evaluator" subtitle="Internal workspace" nav={STAFF_NAV} />}>
            <Route path="/staff" element={<EvaluatorHome />} />
            <Route path="/staff/evaluations" element={<EvaluationQueue />} />
            <Route path="/staff/evaluations/:attemptId" element={<EvaluationReview />} />
          </Route>

          {/* Admin — internal, noindex */}
          <Route element={<InternalLayout title="Cognita Admin" subtitle="Institutional interface" nav={ADMIN_NAV} />}>
            <Route path="/admin" element={<AdminOverview />} />
            {ADMIN_NAV.filter((item) => item.to && item.to !== '/admin').map((item) => (
              <Route key={item.to} path={item.to} element={<AdminSection sectionId={item.id} />} />
            ))}
          </Route>

          {/* Routes that existed before this build */}
          <Route path="/learner" element={<Navigate to="/app" replace />} />
          <Route path="/entrance-exam/start" element={<Navigate to="/app/entrance-exam" replace />} />
        </Routes>
      </Suspense>
    </>
  )
}
