export const PROGRAMS = [
  {
    id: 'professional-ai-program',
    code: '10-WEEK GUIDED',
    name: 'Cognita Professional AI Program',
    shortName: 'Professional AI Program',
    delivery: 'Guided, cohort-based, mentor-supported',
    duration: '10 weeks',
    summary: 'Cognita’s flagship guided program for learners who benefit from structure, deadlines, human feedback, cohort accountability, applied work, and capstone-based assessment.',
    foundationModel: 'Up to 4 weeks of targeted foundation learning, assigned from AI-00 / CEE competency evidence, followed by specialization and capstone progression.',
    specializations: [
      'AI for Students',
      'AI for Creatives',
      'AI for Entrepreneurs',
      'AI for Professionals & Virtual Assistants',
    ],
    completionStandard: 'Required outputs, mentor review, revision where needed, portfolio evidence, capstone completion, and demonstrated competency.',
  },
  {
    id: 'skills-lab',
    code: 'SELF-PACED',
    name: 'Cognita Skills Lab: Applied AI Foundations and Professional Practice',
    shortName: 'Cognita Skills Lab',
    delivery: 'Self-paced, project-based, assessment-driven',
    duration: '28 days recommended · 32–40 hours estimated',
    summary: 'A flexible independent-learning route for learners who need control over their study schedule without lowering Cognita’s assessment and competency standards.',
    promise: 'Learn it. Build it. Prove it.',
    modules: [
      'AI Foundations and Reality Check',
      'Problem Framing and Strategic Thinking',
      'Prompt Design and Instruction Quality',
      'Research, Verification, and Evidence',
      'AI-Assisted Professional Workflows',
      'Communication, Creativity, and Quality Control',
      'Ethics, Privacy, Bias, and Intellectual Property',
      'Capstone Development and Professional Defense',
    ],
    completionStandard: 'All required outputs and assessments must be completed before the final credential is unlocked.',
  },
]

export const AI00_ASSESSMENT = {
  id: 'ai-00',
  code: 'AI-00',
  name: 'Cognita Entrance Examination',
  shortName: 'CEE',
  publicProgramChoice: false,
  purpose: 'Diagnostic admissions and readiness assessment used to understand the learner’s current general and AI-related competencies and determine the appropriate training flow.',
  domains: [
    'Communication & Instruction Comprehension',
    'Reasoning, Numeracy & Practical Problem Solving',
    'Digital & Information Literacy',
    'AI Foundations, Safety & Responsible Use',
    'Research, Verification & Evidence Judgment',
    'Applied Instruction, Workflow & Decision Judgment',
  ],
  pathwayOutcomes: [
    'Foundation Required',
    'Foundation Accelerated',
    'Direct Track Entry',
  ],
}

export const FOUNDATION_MODULES = [
  {
    code: 'FND-01',
    name: 'Communication & Instruction Comprehension',
    assignedFrom: 'AI-00 communication profile',
  },
  {
    code: 'FND-02',
    name: 'Reasoning, Numeracy & Practical Problem Solving',
    assignedFrom: 'AI-00 reasoning profile',
  },
  {
    code: 'FND-03',
    name: 'Digital & Information Literacy',
    assignedFrom: 'AI-00 digital-readiness profile',
  },
  {
    code: 'FND-04',
    name: 'AI Foundations & Responsible Use',
    assignedFrom: 'AI-00 AI-readiness profile',
  },
  {
    code: 'FND-05',
    name: 'Research, Verification & Evidence',
    assignedFrom: 'AI-00 research profile',
  },
  {
    code: 'FND-06',
    name: 'Applied Prompting, Workflow & Decision Practice',
    assignedFrom: 'AI-00 applied-response evaluation',
  },
]

export const FUTURE_LEARNING_AREAS = [
  'AI Productivity and Prompt Engineering',
  'Social Media and Digital Marketing',
  'Freelancing and Virtual Assistance',
  'Branding and Content Creation',
  'Business and Entrepreneurship',
]
