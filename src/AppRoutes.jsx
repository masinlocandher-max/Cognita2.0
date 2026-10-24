import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { WorkspaceProvider } from './frontend/WorkspaceContext'
import { frontendRoutes } from './frontend/routes'
import { Explore, PublicEditorial, editorialRoutes, Articles } from './frontend/PublicDirectory'
import AppLayout from './components/AppLayout'
import Home from './pages/Home'
import Classroom from './pages/Classroom'
import { InstitutionPage, ProgramDirectory, institutionalRoutes } from './pages/InstitutionPages'
import { Navigate } from 'react-router-dom'
import { MissionVision, Support, Contact, NotFound } from './pages/LearnerPages'

import SelfPaced from './pages/SelfPaced'
import PublicAdmissions from './pages/PublicAdmissions'
import Programs from './pages/Programs'
import ContactFallback from './pages/ContactFallback'
import {
  AboutCognita,
  Founder,
  EntranceExamInfo,
  Organizations,
  InstitutionalStatus,
  PoliciesIndex,
  PrivacyPolicy,
  TermsOfUse,
  AcademicIntegrityPolicy,
  StudentPolicies,
} from './pages/PublicInformation'
import './styles.css'
import './learner.css'
import './student-app.css'
import './public-site.css'
import '../brand/code/cognita-brand.css'
import './brand-runtime.css'
import './institutional-refinement.css'
import './institutional-info.css'
import './redesign.css'
import './frontend/portal.css'

/*
 * The repository is still frontend-only.
 * Production exposes public information, local practice, and labeled fictional staff demos.
 * The legacy student app remains a development preview until secure server-side
 * identity, enrollment, records, and authorization are implemented.
 */
const previewEnabled = import.meta.env.DEV
const StudentApp = previewEnabled ? lazy(() => import('./pages/StudentApp')) : null

function PreviewRoute({ component: Component }) {
  if (!previewEnabled || !Component) return <ContactFallback />
  return (
    <Suspense fallback={<div className="page-width">Loading local preview…</div>}>
      <Component />
    </Suspense>
  )
}

export function AppRoutes() { return (
      <WorkspaceProvider><Routes>
        {frontendRoutes()}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          {editorialRoutes.map(path => <Route key={path} path={path} element={<PublicEditorial />} />)}
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<Articles />} />
          <Route path="/courses" element={<ProgramDirectory />} />
          <Route path="/courses/applied-ai" element={<SelfPaced />} />
          <Route path="/skills" element={<Navigate replace to="/labs" />} />
          <Route path="/support/academic" element={<Support />} />
          <Route path="/support/technical" element={<Support />} />
          <Route path="/support/payment" element={<Support />} />
          <Route path="/support/account" element={<Support />} />
          {institutionalRoutes.map(path => <Route key={path} path={path} element={<InstitutionPage />} />)}
          <Route path="/programs/applied-ai" element={<SelfPaced />} />
          <Route path="/programs/ai-foundations" element={<Navigate replace to="/ai-foundations" />} />
          <Route path="/faq" element={<Navigate replace to="/support" />} />
          <Route path="/help" element={<Navigate replace to="/support" />} />
          <Route path="/credential-policy" element={<Navigate replace to="/credentials" />} />
          <Route path="/responsible-ai" element={<Navigate replace to="/academic-integrity" />} />
          <Route path="/student-agreement" element={<Navigate replace to="/student-policies" />} />
          <Route path="/data-policy" element={<Navigate replace to="/privacy" />} />
          <Route path="/admissions/how-it-works" element={<PublicAdmissions />} />
          <Route path="/mission-vision" element={<MissionVision />} />
          <Route path="/classroom" element={<Classroom />} />
          <Route path="/classroom/lesson" element={<Classroom />} />
          <Route path="/classroom/workspace" element={<Classroom />} />
          <Route path="/classroom/resources" element={<Classroom />} />
          <Route path="/classroom/progress" element={<Classroom />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutCognita />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/self-paced" element={<SelfPaced />} />
          <Route path="/learning-modes" element={<Programs />} />
          <Route path="/programs" element={<ProgramDirectory />} />
          <Route path="/admissions" element={<PublicAdmissions />} />
          <Route path="/how-it-works" element={<PublicAdmissions />} />
          <Route path="/cee" element={<EntranceExamInfo />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/policies" element={<PoliciesIndex />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/academic-integrity" element={<AcademicIntegrityPolicy />} />
          <Route path="/student-policies" element={<StudentPolicies />} />
          <Route path="/institutional-status" element={<InstitutionalStatus />} />

          {previewEnabled && <Route path="/app" element={<PreviewRoute component={StudentApp} />} />}

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes></WorkspaceProvider>
) }
