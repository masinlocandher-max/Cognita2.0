/**
 * Mock cohort used by the evaluator workspace and the admin interface.
 *
 * These are invented people for a frontend build. No real learner data appears
 * anywhere in this repository.
 */

import { ApplicationStatus, EnrollmentStatus, JourneyStage, PlacementCode } from '../lib/status.js'

export const learners = [
  { id: 'lnr_001', reference: 'CGN-2026-0001', fullName: 'Althea Ramos', email: 'althea.ramos@example.ph', municipality: 'Iba, Zambales', createdAt: '2026-08-04T02:10:00.000Z', journeyStage: JourneyStage.ACTIVE_LEARNER, application: ApplicationStatus.SUBMITTED, enrollment: EnrollmentStatus.ACTIVE, placement: PlacementCode.AI_00_COMMUNICATION },
  { id: 'lnr_002', reference: 'CGN-2026-0002', fullName: 'Miguel Santiago', email: 'm.santiago@example.ph', municipality: 'Masinloc, Zambales', createdAt: '2026-08-05T06:32:00.000Z', journeyStage: JourneyStage.PLACEMENT_ISSUED, application: ApplicationStatus.SUBMITTED, enrollment: EnrollmentStatus.PENDING, placement: PlacementCode.AI_01 },
  { id: 'lnr_003', reference: 'CGN-2026-0003', fullName: 'Bea Villanueva', email: 'bea.v@example.ph', municipality: 'Quezon City', createdAt: '2026-08-09T09:15:00.000Z', journeyStage: JourneyStage.AWAITING_REVIEW, application: ApplicationStatus.SUBMITTED, enrollment: EnrollmentStatus.NOT_ENROLLED, placement: null },
  { id: 'lnr_004', reference: 'CGN-2026-0004', fullName: 'Jomar Dela Cruz', email: 'jomar.dc@example.ph', municipality: 'Olongapo City', createdAt: '2026-08-11T01:44:00.000Z', journeyStage: JourneyStage.AWAITING_REVIEW, application: ApplicationStatus.SUBMITTED, enrollment: EnrollmentStatus.NOT_ENROLLED, placement: null },
  { id: 'lnr_005', reference: 'CGN-2026-0005', fullName: 'Carmela Ong', email: 'carmela.ong@example.ph', municipality: 'Makati City', createdAt: '2026-08-12T23:05:00.000Z', journeyStage: JourneyStage.ACTIVE_LEARNER, application: ApplicationStatus.SUBMITTED, enrollment: EnrollmentStatus.ACTIVE, placement: PlacementCode.AI_00_FOUNDATIONS },
  { id: 'lnr_006', reference: 'CGN-2026-0006', fullName: 'Rafael Bautista', email: 'rafa.b@example.ph', municipality: 'Cebu City', createdAt: '2026-08-14T04:20:00.000Z', journeyStage: JourneyStage.CEE_SUBMITTED, application: ApplicationStatus.SUBMITTED, enrollment: EnrollmentStatus.NOT_ENROLLED, placement: null },
  { id: 'lnr_007', reference: 'CGN-2026-0007', fullName: 'Nadine Corpuz', email: 'nadine.c@example.ph', municipality: 'Davao City', createdAt: '2026-08-15T07:50:00.000Z', journeyStage: JourneyStage.CEE_IN_PROGRESS, application: ApplicationStatus.SUBMITTED, enrollment: EnrollmentStatus.NOT_ENROLLED, placement: null },
  { id: 'lnr_008', reference: 'CGN-2026-0008', fullName: 'Enrico Lim', email: 'e.lim@example.ph', municipality: 'Baguio City', createdAt: '2026-08-16T11:12:00.000Z', journeyStage: JourneyStage.APPLICANT, application: ApplicationStatus.DRAFT, enrollment: EnrollmentStatus.NOT_ENROLLED, placement: null },
  { id: 'lnr_009', reference: 'CGN-2026-0009', fullName: 'Sofia Mendoza', email: 'sofia.m@example.ph', municipality: 'Iloilo City', createdAt: '2026-08-18T00:41:00.000Z', journeyStage: JourneyStage.PROGRAM_COMPLETE, application: ApplicationStatus.SUBMITTED, enrollment: EnrollmentStatus.COMPLETED, placement: PlacementCode.AI_00_FULL },
  { id: 'lnr_010', reference: 'CGN-2026-0010', fullName: 'Paolo Reyes', email: 'paolo.reyes@example.ph', municipality: 'Botolan, Zambales', createdAt: '2026-08-19T05:08:00.000Z', journeyStage: JourneyStage.AWAITING_REVIEW, application: ApplicationStatus.SUBMITTED, enrollment: EnrollmentStatus.NOT_ENROLLED, placement: null },
  { id: 'lnr_011', reference: 'CGN-2026-0011', fullName: 'Trisha Gutierrez', email: 'trisha.g@example.ph', municipality: 'Pasig City', createdAt: '2026-08-21T08:26:00.000Z', journeyStage: JourneyStage.PLACEMENT_ISSUED, application: ApplicationStatus.SUBMITTED, enrollment: EnrollmentStatus.NOT_ENROLLED, placement: PlacementCode.TARGETED_BRIDGE },
  { id: 'lnr_012', reference: 'CGN-2026-0012', fullName: 'Dante Aquino', email: 'dante.aquino@example.ph', municipality: 'Angeles City', createdAt: '2026-08-24T02:55:00.000Z', journeyStage: JourneyStage.APPLICANT, application: ApplicationStatus.NOT_STARTED, enrollment: EnrollmentStatus.NOT_ENROLLED, placement: null },
]

export const staff = [
  { id: 'stf_001', fullName: 'Dr. Liwayway Cruz', role: 'Lead Evaluator', email: 'l.cruz@cognita.example', active: true },
  { id: 'stf_002', fullName: 'Marco Salcedo', role: 'Evaluator', email: 'm.salcedo@cognita.example', active: true },
  { id: 'stf_003', fullName: 'Joy Fernandez', role: 'Admissions', email: 'j.fernandez@cognita.example', active: true },
  { id: 'stf_004', fullName: 'Ramon Tiu', role: 'Registrar', email: 'r.tiu@cognita.example', active: false },
]

export const findLearner = (id) => learners.find((learner) => learner.id === id) || null
