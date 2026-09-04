export const PROGRAMS = [
  {
    id: 'professional-ai-program',
    code: '10-WEEK GUIDED',
    name: 'Cognita Professional AI Program',
    shortName: 'Professional AI Program',
    delivery: 'Guided, cohort-based, mentor-supported',
    duration: '10 weeks',
    summary: 'Cognita’s flagship guided program for learners who benefit from structure, deadlines, human feedback, cohort accountability, applied work, and capstone-based assessment.',
    foundationModel: 'Up to 4 weeks of foundation learning, adjusted through CEE readiness evidence, followed by a 6-week specialization.',
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

export const FOUNDATION_BRIDGE = {
  id: 'ai-00',
  code: 'AI-00',
  name: 'AI-00 Foundation Bridge',
  publicProgramChoice: false,
  purpose: 'Targeted foundational support assigned through CEE readiness evidence and evaluator judgment.',
  areas: [
    'AI foundations and responsible use',
    'Functional English and grammar support',
    'Comprehension and instruction clarity',
    'Research and verification basics',
    'Digital literacy',
    'Learning readiness',
  ],
  pathwayOutcomes: [
    'Foundation Required',
    'Foundation Accelerated',
    'Direct Track Entry',
  ],
}

export const FUTURE_LEARNING_AREAS = [
  'AI Productivity and Prompt Engineering',
  'Social Media and Digital Marketing',
  'Freelancing and Virtual Assistance',
  'Branding and Content Creation',
  'Business and Entrepreneurship',
]
