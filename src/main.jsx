import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Home from './pages/Home'
import PublicAdmissions from './pages/PublicAdmissions'
import Programs from './pages/Programs'
import ContactFallback from './pages/ContactFallback'
import {
  AboutCognita,
  Founder,
  EntranceExamInfo,
  Organizations,
  ProfessionalProgram,
  SkillsLabProgram,
  InstitutionalStatus,
  PoliciesIndex,
  PrivacyPolicy,
  TermsOfUse,
  AcademicIntegrityPolicy,
  StudentPolicies,
} from './pages/PublicInformation'
import './fonts.css'
import './styles.css'
import './learner.css'
import './admissions.css'
import './founder-console.css'
import './student-app.css'
import './learning-review.css'
import './public-site.css'
import '../brand/code/cognita-brand.css'
import './brand-runtime.css'
import './institutional-refinement.css'
import './institutional-routing.css'
import './public-admissions.css'
import './institutional-info.css'

/*
 * SECURITY BOUNDARY
 *
 * The current repository has no production authentication or authorization
 * backend. Therefore every workflow that would require a trusted identity is
 * development-only and must not ship as an available production route.
 *
 * Vite replaces import.meta.env.DEV at build time. Production builds use
 * default deny: only the explicit public route allowlist below is registered.
 * The dynamic imports are intentionally behind DEV so the CEE item bank,
 * evaluator console, payment simulator, learner state, and staff preview code
 * are not required by the production application graph.
 */
const previewEnabled = import.meta.env.DEV

const ApplyPreview = previewEnabled ? lazy(() => import('./pages/Apply')) : null
const EntranceExam = previewEnabled ? lazy(() => import('./pages/EntranceExam')) : null
const Exam = previewEnabled ? lazy(() => import('./pages/Exam')) : null
const Payment = previewEnabled ? lazy(() => import('./pages/Payment')) : null
const AccountSetup = previewEnabled ? lazy(() => import('./pages/AccountSetup')) : null
const StudentApp = previewEnabled ? lazy(() => import('./pages/StudentApp')) : null
const FounderConsole = previewEnabled ? lazy(() => import('./pages/FounderConsole')) : null
const AdmissionsReview = previewEnabled ? lazy(() => import('./pages/AdmissionsReview')) : null
const LearningReview = previewEnabled ? lazy(() => import('./pages/LearningReview')) : null

function PreviewRoute({ component: Component }) {
  if (!previewEnabled || !Component) return <ContactFallback />
  return (
    <Suspense fallback={<div className="page-width">Loading local preview…</div>}>
      <Component />
    </Suspense>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {/* Production public allowlist. Everything else falls through to ContactFallback. */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutCognita />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/professional-ai-program" element={<ProfessionalProgram />} />
          <Route path="/programs/skills-lab" element={<SkillsLabProgram />} />
          <Route path="/admissions" element={<PublicAdmissions />} />
          <Route path="/apply" element={<PublicAdmissions />} />
          <Route path="/cee" element={<EntranceExamInfo />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/policies" element={<PoliciesIndex />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/academic-integrity" element={<AcademicIntegrityPolicy />} />
          <Route path="/student-policies" element={<StudentPolicies />} />
          <Route path="/institutional-status" element={<InstitutionalStatus />} />

          {/* Local product simulation only. Never authorize real users here. */}
          {previewEnabled && <Route path="/entrance-exam" element={<PreviewRoute component={EntranceExam} />} />}
          {previewEnabled && <Route path="/entrance-exam/start" element={<PreviewRoute component={Exam} />} />}
          {previewEnabled && <Route path="/payment" element={<PreviewRoute component={Payment} />} />}
          {previewEnabled && <Route path="/account-setup" element={<PreviewRoute component={AccountSetup} />} />}
          {previewEnabled && <Route path="/app" element={<PreviewRoute component={StudentApp} />} />}
          {previewEnabled && <Route path="/operations" element={<PreviewRoute component={FounderConsole} />} />}
          {previewEnabled && <Route path="/operations/apply-preview" element={<PreviewRoute component={ApplyPreview} />} />}
          {previewEnabled && <Route path="/operations/admissions" element={<PreviewRoute component={AdmissionsReview} />} />}
          {previewEnabled && <Route path="/operations/learning" element={<PreviewRoute component={LearningReview} />} />}

          <Route path="*" element={<ContactFallback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
