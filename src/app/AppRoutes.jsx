import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ScrollToTop from './ScrollToTop.jsx'
import PublicLayout from './PublicLayout.jsx'
import ApplyLayout from './ApplyLayout.jsx'
import PortalLayout from './PortalLayout.jsx'
import InternalLayout from './InternalLayout.jsx'
import { LoadingRows } from '../components/StateBlock.jsx'

/*
 * Three audiences, three route groups.
 *
 *   Public   — the institute website, open to everyone
 *   Apply    — the applicant workspace, for people going through admissions
 *   Portal   — the Cognita Student Portal, for enrolled students
 *
 * Course material lives only under /portal, which is reachable through the
 * portal entrance and nowhere else. The public site links to the entrance, not
 * past it.
 *
 * The public pages ship eagerly; everything behind them is split out.
 */
import Home from '../pages/public/Home.jsx'
import About from '../pages/public/About.jsx'
import Programs from '../pages/public/Programs.jsx'
import ProgramDetail from '../pages/public/ProgramDetail.jsx'
import Admissions from '../pages/public/Admissions.jsx'
import EntranceExamInfo from '../pages/public/EntranceExamInfo.jsx'
import ApplyStart from '../pages/public/ApplyStart.jsx'
import Resources from '../pages/public/Resources.jsx'
import ResourceArticle from '../pages/public/ResourceArticle.jsx'
import Contact from '../pages/public/Contact.jsx'
import Legal from '../pages/public/Legal.jsx'
import NotFound from '../pages/public/NotFound.jsx'

const VerifyCredential = lazy(() => import('../pages/public/VerifyCredential.jsx'))

const ApplyOverview = lazy(() => import('../pages/apply/ApplyOverview.jsx'))
const Profile = lazy(() => import('../pages/apply/Profile.jsx'))
const Application = lazy(() => import('../pages/apply/Application.jsx'))
const EntranceExam = lazy(() => import('../pages/apply/EntranceExam.jsx'))
const Results = lazy(() => import('../pages/apply/Results.jsx'))
const Placement = lazy(() => import('../pages/apply/Placement.jsx'))
const Enrollment = lazy(() => import('../pages/apply/Enrollment.jsx'))

const PortalSignIn = lazy(() => import('../pages/portal/PortalSignIn.jsx'))
const PortalDashboard = lazy(() => import('../pages/portal/PortalDashboard.jsx'))
const ProgramView = lazy(() => import('../pages/portal/ProgramView.jsx'))
const CourseView = lazy(() => import('../pages/portal/CourseView.jsx'))
const ModuleView = lazy(() => import('../pages/portal/ModuleView.jsx'))
const LessonView = lazy(() => import('../pages/portal/LessonView.jsx'))
const AssessmentView = lazy(() => import('../pages/portal/AssessmentView.jsx'))
const ProgressView = lazy(() => import('../pages/portal/ProgressView.jsx'))
const Certificates = lazy(() => import('../pages/portal/Certificates.jsx'))

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
          {/* The public institute website */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/programs/:programId" element={<ProgramDetail />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/admissions/entrance-exam" element={<EntranceExamInfo />} />
            <Route path="/admissions/apply" element={<ApplyStart />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:slug" element={<ResourceArticle />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Legal document="privacy" />} />
            <Route path="/terms" element={<Legal document="terms" />} />
            <Route path="/verify" element={<VerifyCredential />} />
            <Route path="/verify/:credentialId" element={<VerifyCredential />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Applicant workspace — admissions activity, before enrollment */}
          <Route element={<ApplyLayout />}>
            <Route path="/apply" element={<ApplyOverview />} />
            <Route path="/apply/profile" element={<Profile />} />
            <Route path="/apply/application" element={<Application />} />
            <Route path="/apply/entrance-exam" element={<EntranceExam />} />
            <Route path="/apply/result" element={<Results />} />
            <Route path="/apply/placement" element={<Placement />} />
            <Route path="/apply/enrollment" element={<Enrollment />} />
          </Route>

          {/* Student Portal entrance — public visitors reach this and stop here */}
          <Route path="/portal" element={<PortalSignIn />} />

          {/* Student Portal — enrolled students only */}
          <Route element={<PortalLayout />}>
            <Route path="/portal/dashboard" element={<PortalDashboard />} />
            <Route path="/portal/program/:programId" element={<ProgramView />} />
            <Route path="/portal/course/:courseId" element={<CourseView />} />
            <Route path="/portal/module/:moduleId" element={<ModuleView />} />
            <Route path="/portal/lesson/:lessonId" element={<LessonView />} />
            <Route path="/portal/assessment/:assessmentId" element={<AssessmentView />} />
            <Route path="/portal/progress" element={<ProgressView />} />
            <Route path="/portal/certificates" element={<Certificates />} />
          </Route>

          {/* Evaluator workspace — internal, noindex, not in public navigation */}
          <Route element={<InternalLayout title="Cognita Evaluator" subtitle="Internal workspace" nav={STAFF_NAV} />}>
            <Route path="/staff" element={<EvaluatorHome />} />
            <Route path="/staff/evaluations" element={<EvaluationQueue />} />
            <Route path="/staff/evaluations/:attemptId" element={<EvaluationReview />} />
          </Route>

          {/* Administrative interface — internal, noindex */}
          <Route element={<InternalLayout title="Cognita Admin" subtitle="Institutional interface" nav={ADMIN_NAV} />}>
            <Route path="/admin" element={<AdminOverview />} />
            {ADMIN_NAV.filter((item) => item.to && item.to !== '/admin').map((item) => (
              <Route key={item.to} path={item.to} element={<AdminSection sectionId={item.id} />} />
            ))}
          </Route>

          {/* Routes that existed before this structure */}
          <Route path="/learner" element={<Navigate to="/apply" replace />} />
          <Route path="/app" element={<Navigate to="/apply" replace />} />
          <Route path="/app/profile" element={<Navigate to="/apply/profile" replace />} />
          <Route path="/app/application" element={<Navigate to="/apply/application" replace />} />
          <Route path="/app/entrance-exam" element={<Navigate to="/apply/entrance-exam" replace />} />
          <Route path="/app/results" element={<Navigate to="/apply/result" replace />} />
          <Route path="/app/placement" element={<Navigate to="/apply/placement" replace />} />
          <Route path="/app/enrollment" element={<Navigate to="/apply/enrollment" replace />} />
          <Route path="/entrance-exam" element={<Navigate to="/admissions/entrance-exam" replace />} />
          <Route path="/entrance-exam/start" element={<Navigate to="/apply/entrance-exam" replace />} />
          <Route path="/ai-00" element={<Navigate to="/programs/prog-foundations" replace />} />
          <Route path="/ai-01" element={<Navigate to="/programs/prog-applied" replace />} />
          <Route path="/learn" element={<Navigate to="/portal" replace />} />
          <Route path="/learn/dashboard" element={<Navigate to="/portal/dashboard" replace />} />
          <Route path="/learn/progress" element={<Navigate to="/portal/progress" replace />} />
          <Route path="/learn/certificates" element={<Navigate to="/portal/certificates" replace />} />
        </Routes>
      </Suspense>
    </>
  )
}
