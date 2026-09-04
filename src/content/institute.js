/**
 * Public-facing institutional content.
 *
 * The public website speaks in learning pathways, not internal classifications.
 * Internal program codes exist here only as `portalProgramId`, which the
 * Student Portal uses after enrollment — they are never the primary public
 * language.
 *
 * Nothing in this file claims accreditation, recognition, partnership, ranking,
 * enrollment numbers or any institutional statistic. Where something is not yet
 * defined, it says so.
 */

export const institute = {
  name: 'The Cognita Institute of Artificial Intelligence',
  shortName: 'Cognita',
  positioning: 'Structured AI education for people who want to understand, apply, and grow with artificial intelligence.',
  contactEmail: 'admissions@cognita.example',
  generalEmail: 'hello@cognita.example',
}

export const pathways = [
  {
    id: 'foundations',
    name: 'AI Foundations',
    order: 1,
    summary: 'For learners building essential AI literacy and fundamental skills.',
    description:
      'Foundations covers what artificial intelligence systems actually do, where they fail, and how to communicate clearly enough that both people and systems can act on what you meant. It is the starting point for most students.',
    forWhom: [
      'Learners new to working with AI systems',
      'Professionals who use AI occasionally and want to understand it properly',
      'Anyone whose written work carries consequence',
    ],
    status: 'open',
    programIds: ['prog-foundations'],
  },
  {
    id: 'applied',
    name: 'Applied Artificial Intelligence',
    order: 2,
    summary: 'For learners who want to use AI effectively in work, communication, research, productivity, creativity, and business.',
    description:
      'Applied learning moves from understanding to practice. Students work on real deliverables using staged workflows, with verification built into the process rather than added at the end.',
    forWhom: [
      'Students who have completed AI Foundations',
      'Applicants whose placement assessment indicates applied readiness',
      'Professionals already producing work with AI assistance',
    ],
    status: 'open',
    programIds: ['prog-applied'],
  },
  {
    id: 'advanced',
    name: 'Advanced and Professional Learning',
    order: 3,
    summary: 'For learners ready to explore deeper AI workflows, automation, strategic applications, and specialized areas.',
    description:
      'Advanced study is being developed. Cognita will publish the curriculum, entry requirements and study load when the programs are defined, rather than describing courses that do not yet exist.',
    forWhom: [
      'Students who have completed Applied Artificial Intelligence',
      'Organizations placing a group of experienced staff',
    ],
    status: 'in-development',
    programIds: [],
  },
]

/**
 * The public program directory.
 *
 * `studyLoad` is indicative and labeled as such. Cognita does not publish an
 * official duration until the program calendar is set.
 */
export const publicPrograms = [
  {
    id: 'prog-foundations',
    pathwayId: 'foundations',
    portalProgramId: 'prog_ai00',
    name: 'AI Foundations',
    classification: 'Foundation program',
    summary:
      'Builds the communication, AI understanding and verification judgment required before applied AI work. The program is structured so students take the areas their placement assessment identifies.',
    intendedLearner:
      'Learners beginning structured AI education, including those already using AI tools without formal grounding. No technical background is required.',
    outcomes: [
      'Explain in plain language how generative AI systems produce their output, and why fluency is not accuracy',
      'Write instructions precise enough that a system or a colleague can act on them without guessing',
      'Recognize fabricated citations, statistics and quotations before they reach a reader',
      'Verify a claim to its primary source, and communicate honestly when it cannot be confirmed',
      'Decide which tasks are appropriate for AI assistance and which require a qualified person',
    ],
    topics: [
      'Clarity, concision and precise instruction',
      'Professional register and difficult communication',
      'How generative systems work: patterns, context and probability',
      'Limitations, hallucination and the risk profile of AI output',
      'Confidentiality, attribution and accountability',
      'Source authority, currency and supersession',
      'Verification procedure and communicating uncertainty',
    ],
    format: 'Structured lessons with worked examples, knowledge checks and module assessments. Written work is reviewed by an evaluator.',
    studyLoad: 'Indicative: three to five hours a week. Cognita confirms the program calendar at enrollment.',
    entryRequirements: [
      'Completed application',
      'Cognita Entrance Exam, which determines the modules that apply to you',
      'Functional English and reliable internet access',
    ],
    completionRequirements: [
      'Completion of the modules identified by your placement',
      'Submission of each module assessment',
      'Evaluator review of written work',
    ],
    personalized: true,
  },
  {
    id: 'prog-applied',
    pathwayId: 'applied',
    portalProgramId: 'prog_ai01',
    name: 'Applied Artificial Intelligence',
    classification: 'Applied program',
    summary:
      'Practice-based study for students producing real work with AI assistance. The organizing question is not whether AI was used well, but whether the output can be defended.',
    intendedLearner:
      'Students who have completed AI Foundations, or applicants whose entrance exam and reviewed written work indicate applied readiness.',
    outcomes: [
      'Decompose a deliverable into staged work with outputs that can be checked at each step',
      'Place verification inside the process rather than at the end of it',
      'Keep a working record separating what was generated from what was confirmed',
      'Report honestly when authoritative sources disagree or evidence is incomplete',
      'Answer for an AI-assisted deliverable when a client, editor or reviewer questions it',
    ],
    topics: [
      'Staged workflows and prompt chaining',
      'Designing checkpoints that catch errors early',
      'Verification pipelines',
      'Working with contested evidence',
      'Disclosing AI assistance proportionately',
    ],
    format: 'Applied study built around students’ own deliverables, assessed through a portfolio reviewed by an evaluator.',
    studyLoad: 'Indicative: five to eight hours a week. Cognita confirms the program calendar at enrollment.',
    entryRequirements: [
      'Completion of AI Foundations, or an entrance exam result indicating applied readiness',
      'Access to real work you can use as the basis for applied study',
    ],
    completionRequirements: [
      'Completion of all program modules',
      'Submission and evaluator review of the applied portfolio',
    ],
    personalized: false,
  },
]

export const differentiators = [
  {
    id: 'structured',
    title: 'Structured learning',
    body: 'AI education organized into clear learning pathways rather than disconnected tutorials. Each module has a defined place in a sequence, and each sequence has a defined purpose.',
  },
  {
    id: 'practical',
    title: 'Practical application',
    body: 'Study is designed around useful, real-world applications of artificial intelligence — the writing, research and decisions students already handle at work.',
  },
  {
    id: 'understanding',
    title: 'Designed for understanding',
    body: 'Students learn why and how these systems behave as they do. Memorizing prompts produces capability that expires with the tool; understanding does not.',
  },
  {
    id: 'progressive',
    title: 'Progressive learning',
    body: 'Students build capability step by step, according to readiness and demonstrated understanding, rather than moving through a fixed sequence regardless of what they already know.',
  },
  {
    id: 'context',
    title: 'Relevant context',
    body: 'Learning materials are written to be practical and understandable for Filipino learners, using examples from local work and institutions, while the underlying skills remain globally applicable.',
  },
]

export const learningSteps = [
  { id: 'discover', title: 'Discover', body: 'Review the available programs and learning pathways to understand what Cognita teaches and where you would begin.' },
  { id: 'apply', title: 'Apply or enrol', body: 'Complete the appropriate admissions process for the program you are interested in.' },
  { id: 'placement', title: 'Placement', body: 'Complete the required evaluation so your study begins at the level your understanding supports.' },
  { id: 'learn', title: 'Learn', body: 'Progress through structured lessons, activities and assessments in the Cognita Student Portal.' },
  { id: 'demonstrate', title: 'Demonstrate', body: 'Show understanding through assessments and applied work, reviewed by an evaluator.' },
  { id: 'progress', title: 'Progress', body: 'Move into higher-level study as your demonstrated understanding supports it.' },
]

export const admissionsSteps = [
  { id: 'explore', title: 'Explore programs', body: 'Read the program pages and identify the pathway that matches what you want to be able to do.' },
  { id: 'requirements', title: 'Review requirements', body: 'Check the entry requirements and the indicative study load for the program.' },
  { id: 'application', title: 'Submit an application', body: 'A short set of questions about your goals, background and available study time.' },
  { id: 'assessment', title: 'Complete the required assessment', body: 'The Cognita Entrance Exam establishes where your study should begin. It is a placement assessment, not a competitive entrance test.' },
  { id: 'outcome', title: 'Receive enrollment or placement information', body: 'Cognita reviews your written responses and confirms your placement and the modules that apply to you.' },
  { id: 'begin', title: 'Begin study', body: 'Enrolled students receive access to the Cognita Student Portal.' },
]

export const findPathway = (id) => pathways.find((pathway) => pathway.id === id) || null
export const findPublicProgram = (id) => publicPrograms.find((program) => program.id === id) || null
export const programsForPathway = (pathwayId) => publicPrograms.filter((program) => program.pathwayId === pathwayId)
