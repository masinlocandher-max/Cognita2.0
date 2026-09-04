export const SKILLS_LAB_MODULES = [
  {
    id: 'sl-01',
    stage: 'UNDERSTAND',
    title: 'AI Foundations and Reality Check',
    suggested: 'Days 1–3',
    summary: 'Build a practical, non-hyped understanding of generative AI, its strengths, limits, and the need for human verification.',
    lessons: [
      { id: 'sl-01-01', title: 'What Generative AI Actually Does', type: 'lesson', minutes: 18 },
      { id: 'sl-01-02', title: 'What AI Does Well', type: 'lesson', minutes: 16 },
      { id: 'sl-01-03', title: 'What AI Does Poorly', type: 'lesson', minutes: 18 },
      { id: 'sl-01-output', title: 'AI Use Map', type: 'output', minutes: 35 },
    ],
  },
  {
    id: 'sl-02',
    stage: 'UNDERSTAND',
    title: 'Problem Framing and Strategic Thinking',
    suggested: 'Days 4–6',
    summary: 'Define the real problem, audience, constraints, evidence, risks, and success criteria before selecting or prompting an AI system.',
    lessons: [
      { id: 'sl-02-01', title: 'Define Before You Automate', type: 'lesson', minutes: 18 },
      { id: 'sl-02-02', title: 'Context, Constraints, and Success Criteria', type: 'lesson', minutes: 20 },
      { id: 'sl-02-output', title: 'Cognita Problem Frame', type: 'output', minutes: 45 },
    ],
  },
  {
    id: 'sl-03',
    stage: 'APPLY',
    title: 'Prompt Design and Instruction Quality',
    suggested: 'Days 7–10',
    summary: 'Write clear, structured, testable instructions and improve them through iteration rather than relying on one-shot prompting.',
    lessons: [
      { id: 'sl-03-01', title: 'Anatomy of a Strong Instruction', type: 'lesson', minutes: 20 },
      { id: 'sl-03-02', title: 'Examples, Constraints, and Evaluation Criteria', type: 'lesson', minutes: 20 },
      { id: 'sl-03-03', title: 'Prompt Auditing and Revision', type: 'lesson', minutes: 18 },
      { id: 'sl-03-output', title: 'Prompt Portfolio', type: 'output', minutes: 55 },
    ],
  },
  {
    id: 'sl-04',
    stage: 'APPLY',
    title: 'Research, Verification, and Evidence',
    suggested: 'Days 11–14',
    summary: 'Verify facts, quotations, calculations, sources, and claims instead of treating fluent AI output as evidence.',
    lessons: [
      { id: 'sl-04-01', title: 'Hallucinations and False Confidence', type: 'lesson', minutes: 18 },
      { id: 'sl-04-02', title: 'Source Quality and Cross-Checking', type: 'lesson', minutes: 22 },
      { id: 'sl-04-output', title: 'Research and Verification File', type: 'output', minutes: 60 },
    ],
  },
  {
    id: 'sl-05',
    stage: 'BUILD',
    title: 'AI-Assisted Professional Workflows',
    suggested: 'Days 15–18',
    summary: 'Break professional tasks into reviewable stages with clear AI roles, human decision points, evidence requirements, and quality checks.',
    lessons: [
      { id: 'sl-05-01', title: 'Workflow Thinking', type: 'lesson', minutes: 20 },
      { id: 'sl-05-02', title: 'Human and AI Decision Boundaries', type: 'lesson', minutes: 18 },
      { id: 'sl-05-output', title: 'Workflow Blueprint', type: 'output', minutes: 60 },
    ],
  },
  {
    id: 'sl-06',
    stage: 'BUILD',
    title: 'Communication, Creativity, and Quality Control',
    suggested: 'Days 19–21',
    summary: 'Turn AI-assisted drafts into audience-appropriate professional work through critique, editing, revision, and independent judgment.',
    lessons: [
      { id: 'sl-06-01', title: 'From First Draft to Professional Output', type: 'lesson', minutes: 20 },
      { id: 'sl-06-02', title: 'Voice, Audience, and Quality Standards', type: 'lesson', minutes: 20 },
      { id: 'sl-06-output', title: 'Before-and-After Revision Case', type: 'output', minutes: 55 },
    ],
  },
  {
    id: 'sl-07',
    stage: 'PROTECT',
    title: 'Ethics, Privacy, Bias, and Intellectual Property',
    suggested: 'Days 22–23',
    summary: 'Use AI with appropriate privacy protection, disclosure, bias awareness, intellectual-property care, and human accountability.',
    lessons: [
      { id: 'sl-07-01', title: 'Privacy and Sensitive Information', type: 'lesson', minutes: 18 },
      { id: 'sl-07-02', title: 'Bias, IP, and Responsible Disclosure', type: 'lesson', minutes: 22 },
      { id: 'sl-07-output', title: 'Responsible AI Statement', type: 'output', minutes: 40 },
    ],
  },
  {
    id: 'sl-08',
    stage: 'PROVE',
    title: 'Capstone Development and Professional Defense',
    suggested: 'Days 24–28',
    summary: 'Integrate the complete Cognita competency framework into a real project, then explain and defend the decisions behind the work.',
    lessons: [
      { id: 'sl-08-01', title: 'Capstone Brief and Evidence Plan', type: 'lesson', minutes: 20 },
      { id: 'sl-08-02', title: 'Revision, Reflection, and Defense', type: 'lesson', minutes: 20 },
      { id: 'sl-08-output', title: 'Final Capstone and Professional Defense', type: 'capstone', minutes: 180 },
    ],
  },
]

const GUIDED_FOUNDATION = [
  ['Week 1', 'Introduction to AI', 'AI foundations, human responsibility, learner purpose, and practical expectations.'],
  ['Week 2', 'AI Thinking and Prompt Strategy', 'Context, instruction quality, iterative prompting, prompt auditing, and choosing appropriate AI systems.'],
  ['Week 3', 'Research, Validation, and Communication', 'Hallucination awareness, fact verification, source quality, professional writing, reading, and editing AI output.'],
  ['Week 4', 'Digital Efficiency and Tool Stack', 'File management, digital workspace organization, practical execution speed, workflow integration, and a repeatable personal SOP.'],
]

const GUIDED_TRACKS = {
  'AI for Students': ['Research and academic productivity', 'Study planning with AI', 'Academic-integrity-aware writing support', 'Career and scholarship preparation', 'Responsible AI use in education'],
  'AI for Creatives': ['AI-assisted content creation', 'Visual and creative workflows', 'Client pitching and pricing', 'Portfolio development', 'Monetizing creative capability'],
  'AI for Entrepreneurs': ['Idea validation', 'AI-assisted market research', 'Marketing systems', 'Content-to-sales workflows', 'Business automation and scalable operations'],
  'AI for Professionals & Virtual Assistants': ['Professional and client deliverables', 'Communication and account support', 'SOPs and workflow automation', 'Specialized service packaging', 'Productivity and value improvement'],
}

export function buildGuidedModules(track = 'AI for Professionals & Virtual Assistants') {
  const foundation = GUIDED_FOUNDATION.map(([week, title, summary], index) => ({
    id: `guided-${index + 1}`,
    stage: 'FOUNDATION',
    title,
    suggested: week,
    summary,
    lessons: [
      { id: `guided-${index + 1}-lesson`, title: `${title}: Core Lesson`, type: 'lesson', minutes: 30 },
      { id: `guided-${index + 1}-practice`, title: `${title}: Applied Practice`, type: 'practice', minutes: 45 },
      { id: `guided-${index + 1}-output`, title: `${title}: Required Output`, type: 'output', minutes: 60 },
    ],
  }))

  const trackTopics = GUIDED_TRACKS[track] || GUIDED_TRACKS['AI for Professionals & Virtual Assistants']
  const specialization = trackTopics.map((title, index) => ({
    id: `guided-${index + 5}`,
    stage: 'SPECIALIZATION',
    title,
    suggested: `Week ${index + 5}`,
    summary: `Track-specific applied learning for ${track}, with a real deliverable and facilitator review.`,
    lessons: [
      { id: `guided-${index + 5}-lesson`, title: `${title}: Applied Lesson`, type: 'lesson', minutes: 30 },
      { id: `guided-${index + 5}-output`, title: `${title}: Portfolio Output`, type: 'output', minutes: 75 },
    ],
  }))

  const capstone = {
    id: 'guided-10',
    stage: 'CAPSTONE',
    title: 'Full-Integration Capstone',
    suggested: 'Week 10',
    summary: 'Integrate foundation and specialization skills into a professional project reviewed against Cognita competency standards.',
    lessons: [
      { id: 'guided-10-brief', title: 'Capstone Brief and Evidence Plan', type: 'lesson', minutes: 30 },
      { id: 'guided-10-output', title: 'Capstone Submission and Defense', type: 'capstone', minutes: 180 },
    ],
  }

  return [...foundation, ...specialization, capstone]
}

export const GUIDED_TRACK_OPTIONS = Object.keys(GUIDED_TRACKS)

export function getLearningModules(programId, track) {
  return programId === 'skills-lab' ? SKILLS_LAB_MODULES : buildGuidedModules(track)
}
