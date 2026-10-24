import { Route, Navigate } from 'react-router-dom'
import PortalLayout from './PortalLayout'
import { LearnerHome, LearningIndex, LessonPage, Projects, ProjectWorkspace, Progress, StudyTools, ResourceLibrary, Labs } from './LearningPages'
import { ApplicationPreparation, AdmissionsStatus } from './AdmissionsPages'
import { OperationsHome, Roster, LearnerDetail, ReviewWorkspace, ContentWorkspace, OperationsSection } from './OperationsPages'
import { AccountWorkspace, ServicePage, StudyGuide, Portfolio, CareerToolkit } from './ServicePages'
export const studentPages={
 '/learn':LearnerHome,'/learn/programs':LearningIndex,'/learn/courses':LearningIndex,'/learn/pathway':LearningIndex,'/learn/tasks':Projects,'/learn/calendar':StudyTools,'/learn/bookmarks':StudyTools,'/learn/history':Progress,
 '/classroom/applied-ai':LearningIndex,'/classroom/applied-ai/module/:module':LessonPage,'/classroom/applied-ai/module/:module/lesson/:lesson':LessonPage,
 '/labs':Labs,'/labs/:lab':Labs,'/projects':Projects,'/projects/:id':ProjectWorkspace,'/projects/:id/:view':ProjectWorkspace,
 '/progress':Progress,'/progress/competencies':Progress,'/progress/mastery':Progress,'/progress/modules':Progress,'/progress/activity':Progress,'/progress/insights':Progress,
 '/notes':StudyTools,'/bookmarks':StudyTools,'/study-plan':StudyTools,'/onboarding':StudyTools,'/onboarding/how-cognita-works':StudyTools,'/onboarding/learning-goals':StudyTools,'/onboarding/schedule':StudyTools,'/onboarding/tools':StudyTools,'/onboarding/plan':StudyTools,'/welcome':StudyTools,
 '/library':ResourceLibrary,'/downloads':ResourceLibrary,'/resources':ResourceLibrary,'/assistant':StudyGuide,
 '/portfolio':Portfolio,'/portfolio/edit':Portfolio,'/portfolio/settings':Portfolio,
 '/account':AccountWorkspace,'/account/profile':AccountWorkspace,'/account/preferences':AccountWorkspace,'/account/privacy':AccountWorkspace,'/account/documents':AccountWorkspace,
 '/career':CareerToolkit,'/career/profile':CareerToolkit,'/career/cv':CareerToolkit,'/career/portfolio':CareerToolkit,'/career/interview':CareerToolkit,'/career/job-readiness':CareerToolkit,
}
export const serviceRoutes={
 '/assessments':'assessments','/assessments/:id':'assessments','/assessments/:id/:action':'assessments','/feedback':'feedback','/feedback/:id':'feedback','/grades':'grades',
 '/learn/credentials':'credentials','/learn/credentials/:id':'credentials','/credentials/share':'credentials','/credentials/download':'credentials','/complete/:program':'complete','/graduation':'graduation',
 '/community':'community','/community/discussions':'community','/community/groups':'community','/community/events':'community','/community/program/:program':'community','/community/discussion/:id':'community',
 '/live':'live','/live/:session':'live','/mentorship':'mentorship','/mentorship/mentors':'mentorship','/mentorship/book':'mentorship','/mentorship/sessions':'mentorship','/mentorship/session/:id':'mentorship','/attendance':'attendance',
 '/inbox':'inbox','/inbox/:thread':'inbox','/notifications':'notifications','/opportunities':'opportunities',
 '/account/security':'login','/account/notifications':'notifications','/account/billing':'denied','/account/enrollments':'denied',
 '/login':'login','/register':'login','/forgot-password':'login','/reset-password':'login','/verify-email':'login','/verify-account':'login','/session-expired':'login','/access-denied':'denied','/offline':'offline','/maintenance':'maintenance','/500':'error',
 '/support/ticket':'inbox','/support/tickets/:id':'inbox'
}
const applyPaths=['/apply','/apply/account','/apply/personal','/apply/background','/apply/goals','/apply/availability','/apply/accessibility','/apply/program-interest','/apply/review','/apply/submit']
const applicantStatus=['/application','/cee/prepare','/cee/instructions','/cee/start','/cee/question/:number','/cee/review','/cee/submit','/cee/result','/admission','/admission/offer','/admission/programs','/admission/select','/enrollment','/enrollment/mode','/enrollment/cohort','/enrollment/payment','/enrollment/payment/success','/enrollment/agreement','/enrollment/complete']
const teachSections=['classes','class/:id','grading','feedback','calendar','announcements','resources','analytics']
const adminSections=['applicants','cee','admissions','instructors','programs','cohorts','enrollments','payments','certificates','partners','institutions','support','settings','analytics','analytics/admissions','analytics/learning','analytics/programs','analytics/business','analytics/outcomes']
const institutionSections=['cohorts','progress','competencies','reports','certificates','programs']
const manageSections=['programs','programs/new','program/:id','curriculum','modules','lessons','assessments','projects','resources']
export function frontendRoutes(){return <>
 <Route element={<PortalLayout role="student"/>}>{Object.entries(studentPages).map(([path,C])=><Route key={path} path={path} element={<C/>}/>)}{Object.entries(serviceRoutes).map(([path,kind])=><Route key={path} path={path} element={<ServicePage kind={kind}/>}/>)}<Route path="/next" element={<LearningIndex/>}/></Route>
 <Route element={<PortalLayout role="applicant"/>}>{applyPaths.map(path=><Route key={path} path={path} element={<ApplicationPreparation/>}/>)}{applicantStatus.map(path=><Route key={path} path={path} element={<AdmissionsStatus/>}/>)}</Route>
 <Route element={<PortalLayout role="teach"/>}><Route path="/teach" element={<OperationsHome role="teach"/>}/><Route path="/teach/students" element={<Roster/>}/><Route path="/teach/student/:id" element={<LearnerDetail/>}/><Route path="/teach/submissions" element={<ReviewWorkspace/>}/><Route path="/teach/submissions/:id" element={<ReviewWorkspace/>}/>{teachSections.map(s=><Route key={s} path={'/teach/'+s} element={<OperationsSection/>}/>)}</Route>
 <Route element={<PortalLayout role="admin"/>}><Route path="/admin" element={<OperationsHome role="admin"/>}/><Route path="/admin/students" element={<Roster/>}/><Route path="/admin/student/:id" element={<LearnerDetail/>}/><Route path="/admin/content" element={<ContentWorkspace/>}/>{adminSections.map(s=><Route key={s} path={'/admin/'+s} element={<OperationsSection/>}/>)}{manageSections.map(s=><Route key={s} path={'/manage/'+s} element={<OperationsSection/>}/>)}</Route>
 <Route element={<PortalLayout role="institution"/>}><Route path="/institution" element={<OperationsHome role="institution"/>}/><Route path="/institution/dashboard" element={<Navigate replace to="/institution"/>}/><Route path="/institution/learners" element={<Roster/>}/><Route path="/institution/student/:id" element={<LearnerDetail/>}/>{institutionSections.map(s=><Route key={s} path={'/institution/'+s} element={<OperationsSection/>}/>)}</Route>
 </>}
export const frontendRoutePatterns=[...Object.keys(studentPages),...Object.keys(serviceRoutes),...applyPaths,...applicantStatus,...teachSections.map(x=>'/teach/'+x),...adminSections.map(x=>'/admin/'+x),...institutionSections.map(x=>'/institution/'+x),...manageSections.map(x=>'/manage/'+x)]
