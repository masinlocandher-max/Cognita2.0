import { Navigate, Route, Routes } from 'react-router-dom'
import ScrollToTop from './ScrollToTop.jsx'
import PublicLayout from './PublicLayout.jsx'
import AppLayout from './AppLayout.jsx'
import LearnLayout from './LearnLayout.jsx'
import InternalLayout from './InternalLayout.jsx'

import Home from '../pages/public/Home.jsx'
import About from '../pages/public/About.jsx'
import Programs from '../pages/public/Programs.jsx'
import Ai00 from '../pages/public/Ai00.jsx'
import Ai01 from '../pages/public/Ai01.jsx'
import Admissions from '../pages/public/Admissions.jsx'
import EntranceExamInfo from '../pages/public/EntranceExamInfo.jsx'
import Contact from '../pages/public/Contact.jsx'
import NotFound from '../pages/public/NotFound.jsx'

import Dashboard from '../pages/app/Dashboard.jsx'
import Profile from '../pages/app/Profile.jsx'
import Application from '../pages/app/Application.jsx'
import EntranceExam from '../pages/app/EntranceExam.jsx'
import Results from '../pages/app/Results.jsx'
import Placement from '../pages/app/Placement.jsx'
import Enrollment from '../pages/app/Enrollment.jsx'

import LearnDashboard from '../pages/learn/LearnDashboard.jsx'
import ProgramView from '../pages/learn/ProgramView.jsx'
import CourseView from '../pages/learn/CourseView.jsx'
import ModuleView from '../pages/learn/ModuleView.jsx'
import LessonView from '../pages/learn/LessonView.jsx'
import AssessmentView from '../pages/learn/AssessmentView.jsx'
import ProgressView from '../pages/learn/ProgressView.jsx'
import Certificates from '../pages/learn/Certificates.jsx'
import VerifyCredential from '../pages/learn/VerifyCredential.jsx'

import EvaluatorHome from '../pages/staff/EvaluatorHome.jsx'
import EvaluationQueue from '../pages/staff/EvaluationQueue.jsx'
import EvaluationReview from '../pages/staff/EvaluationReview.jsx'

import AdminOverview from '../pages/admin/AdminOverview.jsx'
import AdminSection from '../pages/admin/AdminSection.jsx'
import { ADMIN_NAV } from '../pages/admin/adminSections.jsx'

const STAFF_NAV = [
  { to: '/staff', label: 'Overview', end: true },
  { to: '/staff/evaluations', label: 'Evaluations' },
]

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
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
    </>
  )
}
