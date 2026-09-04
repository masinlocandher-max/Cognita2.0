import { Link } from 'react-router-dom'
import StatusPill from '../../components/StatusPill.jsx'
import { placementFor } from '../../services/placementService.js'
import { formatDateShort, formatDateTime } from '../../lib/format.js'
import { ApplicationStatus, EnrollmentStatus, EvaluationStatus } from '../../lib/status.js'
import {
  listAnnouncementRows, listApplicationRows, listCertificateRows, listCurriculumRows,
  listEnrollmentRows, listEvaluationRows, listExamRows, listLearnerRows, listPlacementRows, listStaffRows,
} from '../../repositories/adminRepository.js'

/**
 * The admin interface is configuration, not sixteen bespoke pages.
 *
 * Each section declares its loader, columns and controls; one component renders
 * them. Sections without a frontend data source declare `notConnected` and say
 * so, rather than rendering an empty table that reads as "no records".
 */
export const ADMIN_SECTIONS = [
  {
    id: 'learners',
    to: '/admin/learners',
    label: 'Learners',
    group: 'People',
    title: 'Learners',
    description: 'Every learner record and where each one sits in the journey.',
    load: listLearnerRows,
    searchFields: ['fullName', 'email', 'reference', 'municipality'],
    searchPlaceholder: 'Search name, email or reference',
    filters: [{
      id: 'journeyStage',
      label: 'Stage',
      options: [
        { value: 'applicant', label: 'Applicant' },
        { value: 'cee_in_progress', label: 'CEE in progress' },
        { value: 'cee_submitted', label: 'CEE submitted' },
        { value: 'awaiting_review', label: 'Awaiting review' },
        { value: 'placement_issued', label: 'Placement issued' },
        { value: 'active_learner', label: 'Active learner' },
        { value: 'program_complete', label: 'Program complete' },
      ],
    }],
    columns: [
      { id: 'fullName', label: 'Name', render: (row) => <span className="cell-strong">{row.fullName}</span> },
      { id: 'reference', label: 'Reference' },
      { id: 'email', label: 'Email' },
      { id: 'municipality', label: 'Location' },
      { id: 'journeyStage', label: 'Journey stage', render: (row) => row.journeyStage.replace(/_/g, ' ') },
      { id: 'placement', label: 'Placement', render: (row) => (row.placement ? placementFor(row.placement).name : '—') },
      { id: 'createdAt', label: 'Created', render: (row) => formatDateShort(row.createdAt) },
    ],
  },
  {
    id: 'applications',
    to: '/admin/applications',
    label: 'Applications',
    group: 'People',
    title: 'Applications',
    description: 'Admissions applications and their status.',
    load: listApplicationRows,
    searchFields: ['fullName', 'reference'],
    filters: [{
      id: 'status',
      label: 'Status',
      options: [
        { value: ApplicationStatus.DRAFT, label: 'Draft' },
        { value: ApplicationStatus.SUBMITTED, label: 'Submitted' },
      ],
    }],
    columns: [
      { id: 'fullName', label: 'Applicant', render: (row) => <span className="cell-strong">{row.fullName}</span> },
      { id: 'reference', label: 'Reference' },
      { id: 'municipality', label: 'Location' },
      { id: 'status', label: 'Status', render: (row) => <StatusPill status={row.status} /> },
      { id: 'createdAt', label: 'Created', render: (row) => formatDateShort(row.createdAt) },
    ],
  },
  {
    id: 'exams',
    to: '/admin/entrance-exams',
    label: 'Entrance exams',
    group: 'Assessment',
    title: 'Entrance exams',
    description: 'Submitted CEE attempts and their objective profiles.',
    load: listExamRows,
    searchFields: ['candidate', 'reference'],
    columns: [
      { id: 'candidate', label: 'Candidate', render: (row) => <span className="cell-strong">{row.candidate}</span> },
      { id: 'reference', label: 'Attempt' },
      { id: 'submittedAt', label: 'Submitted', render: (row) => formatDateTime(row.submittedAt) },
      { id: 'objectivePoints', label: 'Objective', numeric: true, render: (row) => `${row.objectivePoints}/70` },
      { id: 'communication', label: 'Communication', numeric: true, render: (row) => `${row.communication}%` },
      { id: 'aiReadiness', label: 'AI readiness', numeric: true, render: (row) => `${row.aiReadiness}%` },
      { id: 'placement', label: 'Preliminary', render: (row) => placementFor(row.placement).name },
    ],
  },
  {
    id: 'evaluations',
    to: '/admin/evaluations',
    label: 'Evaluations',
    group: 'Assessment',
    title: 'Evaluations',
    description: 'Applied-response review across the evaluator team.',
    load: listEvaluationRows,
    searchFields: ['candidate', 'assignee', 'reference'],
    filters: [{
      id: 'status',
      label: 'Status',
      options: [
        { value: EvaluationStatus.PENDING_REVIEW, label: 'Pending review' },
        { value: EvaluationStatus.IN_REVIEW, label: 'In review' },
        { value: EvaluationStatus.REVIEWED, label: 'Reviewed' },
        { value: EvaluationStatus.PLACEMENT_ISSUED, label: 'Placement issued' },
      ],
    }],
    columns: [
      { id: 'candidate', label: 'Candidate', render: (row) => <span className="cell-strong">{row.candidate}</span> },
      { id: 'reference', label: 'Reference' },
      { id: 'assignee', label: 'Evaluator' },
      { id: 'status', label: 'Status', render: (row) => <StatusPill status={row.status} /> },
      { id: 'completedAt', label: 'Completed', render: (row) => formatDateShort(row.completedAt) },
    ],
  },
  {
    id: 'placements',
    to: '/admin/placements',
    label: 'Placements',
    group: 'Assessment',
    title: 'Placements',
    description: 'Issued placements and the resulting pathway.',
    load: listPlacementRows,
    searchFields: ['fullName', 'reference'],
    columns: [
      { id: 'fullName', label: 'Learner', render: (row) => <span className="cell-strong">{row.fullName}</span> },
      { id: 'reference', label: 'Reference' },
      { id: 'placement', label: 'Placement', render: (row) => placementFor(row.placement).name },
      { id: 'enrollment', label: 'Enrollment', render: (row) => <StatusPill status={row.enrollment} /> },
    ],
  },
  {
    id: 'programs',
    to: '/admin/programs',
    label: 'Programs',
    group: 'Curriculum',
    title: 'Programs',
    description: 'Program definitions.',
    load: () => listCurriculumRows('programs'),
    searchFields: ['title', 'code'],
    columns: [
      { id: 'code', label: 'Code' },
      { id: 'title', label: 'Program', render: (row) => <span className="cell-strong">{row.title}</span> },
      { id: 'level', label: 'Level' },
      { id: 'courses', label: 'Courses', numeric: true },
      { id: 'weeks', label: 'Weeks', numeric: true },
    ],
  },
  {
    id: 'courses',
    to: '/admin/courses',
    label: 'Courses',
    group: 'Curriculum',
    title: 'Courses',
    description: 'Courses within each program.',
    load: () => listCurriculumRows('courses'),
    searchFields: ['title', 'code'],
    columns: [
      { id: 'code', label: 'Code' },
      { id: 'title', label: 'Course', render: (row) => <span className="cell-strong">{row.title}</span> },
      { id: 'program', label: 'Program' },
      { id: 'modules', label: 'Modules', numeric: true },
    ],
  },
  {
    id: 'modules',
    to: '/admin/modules',
    label: 'Modules',
    group: 'Curriculum',
    title: 'Modules',
    description: 'Modules and whether each carries an assessment.',
    load: () => listCurriculumRows('modules'),
    searchFields: ['title', 'course'],
    columns: [
      { id: 'title', label: 'Module', render: (row) => <span className="cell-strong">{row.title}</span> },
      { id: 'course', label: 'Course' },
      { id: 'lessons', label: 'Lessons', numeric: true },
      { id: 'assessment', label: 'Assessment' },
    ],
  },
  {
    id: 'lessons',
    to: '/admin/lessons',
    label: 'Lessons',
    group: 'Curriculum',
    title: 'Lessons',
    description: 'Lesson inventory. “Outline” means the structure exists but the content is not written.',
    load: () => listCurriculumRows('lessons'),
    searchFields: ['title', 'module'],
    filters: [{ id: 'state', label: 'Content', options: [{ value: 'Written', label: 'Written' }, { value: 'Outline', label: 'Outline' }] }],
    columns: [
      { id: 'title', label: 'Lesson', render: (row) => <span className="cell-strong">{row.title}</span> },
      { id: 'module', label: 'Module' },
      { id: 'minutes', label: 'Minutes', numeric: true },
      { id: 'state', label: 'Content', render: (row) => <StatusPill label={row.state} tone={row.state === 'Written' ? 'positive' : 'attention'} icon={row.state === 'Written' ? 'CircleCheck' : 'PencilLine'} /> },
    ],
  },
  {
    id: 'assessments',
    to: '/admin/assessments',
    label: 'Assessments',
    group: 'Curriculum',
    title: 'Assessments',
    description: 'Assessment definitions and how much of each needs a human reader.',
    load: () => listCurriculumRows('assessments'),
    searchFields: ['title', 'module'],
    columns: [
      { id: 'title', label: 'Assessment', render: (row) => <span className="cell-strong">{row.title}</span> },
      { id: 'module', label: 'Module' },
      { id: 'questions', label: 'Questions', numeric: true },
      { id: 'humanReviewed', label: 'Human reviewed', numeric: true },
    ],
  },
  {
    id: 'enrollments',
    to: '/admin/enrollments',
    label: 'Enrollments',
    group: 'Operations',
    title: 'Enrollments',
    description: 'Learners enrolled in a program.',
    load: listEnrollmentRows,
    searchFields: ['fullName', 'reference', 'program'],
    filters: [{
      id: 'status',
      label: 'Status',
      options: [
        { value: EnrollmentStatus.PENDING, label: 'Pending' },
        { value: EnrollmentStatus.ACTIVE, label: 'Active' },
        { value: EnrollmentStatus.COMPLETED, label: 'Completed' },
      ],
    }],
    columns: [
      { id: 'fullName', label: 'Learner', render: (row) => <span className="cell-strong">{row.fullName}</span> },
      { id: 'reference', label: 'Reference' },
      { id: 'program', label: 'Program' },
      { id: 'status', label: 'Status', render: (row) => <StatusPill status={row.status} /> },
    ],
  },
  {
    id: 'certificates',
    to: '/admin/certificates',
    label: 'Certificates',
    group: 'Operations',
    title: 'Certificates',
    description: 'Issued credentials and their state.',
    load: listCertificateRows,
    searchFields: ['learnerName', 'credentialId'],
    columns: [
      { id: 'credentialId', label: 'Credential', render: (row) => <Link className="cell-strong" to={`/verify/${row.credentialId}`}>{row.credentialId}</Link> },
      { id: 'learnerName', label: 'Learner' },
      { id: 'programTitle', label: 'Program' },
      { id: 'issuedAt', label: 'Issued', render: (row) => formatDateShort(row.issuedAt) },
      { id: 'state', label: 'State', render: (row) => <StatusPill status={row.state} /> },
    ],
  },
  {
    id: 'announcements',
    to: '/admin/announcements',
    label: 'Announcements',
    group: 'Operations',
    title: 'Announcements',
    description: 'Notices shown to learners.',
    load: listAnnouncementRows,
    searchFields: ['title'],
    columns: [
      { id: 'title', label: 'Title', render: (row) => <span className="cell-strong">{row.title}</span> },
      { id: 'audience', label: 'Audience' },
      { id: 'publishedAt', label: 'Published', render: (row) => formatDateShort(row.publishedAt) },
    ],
  },
  {
    id: 'staff',
    to: '/admin/staff',
    label: 'Staff',
    group: 'Operations',
    title: 'Staff',
    description: 'Evaluators and administrators.',
    load: listStaffRows,
    searchFields: ['fullName', 'role', 'email'],
    columns: [
      { id: 'fullName', label: 'Name', render: (row) => <span className="cell-strong">{row.fullName}</span> },
      { id: 'role', label: 'Role' },
      { id: 'email', label: 'Email' },
      { id: 'state', label: 'State', render: (row) => <StatusPill label={row.state} tone={row.state === 'Active' ? 'positive' : 'quiet'} icon={row.state === 'Active' ? 'CircleCheck' : 'Circle'} /> },
    ],
  },
  {
    id: 'settings',
    to: '/admin/settings',
    label: 'Settings',
    group: 'Operations',
    title: 'Settings',
    description: 'Institutional configuration.',
    notConnected: 'Settings govern real institutional behavior — cohort dates, fee structures, review cycles, notification templates. None of those systems exist behind this build, so there is nothing here to configure yet. The section is present so the information architecture is settled before the backend arrives.',
  },
]

export const ADMIN_NAV = [
  { to: '/admin', label: 'Overview', end: true, id: 'overview' },
  ...ADMIN_SECTIONS.reduce((items, section, index, all) => {
    if (index === 0 || all[index - 1].group !== section.group) items.push({ group: section.group })
    items.push({ to: section.to, label: section.label, id: section.id })
    return items
  }, []),
]

export const findAdminSection = (id) => ADMIN_SECTIONS.find((section) => section.id === id) || null
