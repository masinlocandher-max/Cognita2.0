/**
 * Mock curriculum for the frontend build.
 *
 * Enough structure to exercise program navigation, module states, personalised
 * pathways, gating and lesson progression. Lessons marked `outline: true` carry
 * a real skeleton but not finished courseware, and the interface says so rather
 * than presenting a stub as a written lesson.
 */

import { PlacementCode } from '../lib/status.js'

const { AI_01, AI_00_COMMUNICATION, AI_00_FOUNDATIONS, AI_00_FULL, TARGETED_BRIDGE } = PlacementCode

/** Content blocks understood by the lesson player. */
const h = (text) => ({ type: 'heading', text })
const p = (text) => ({ type: 'paragraph', text })
const list = (items, ordered = false) => ({ type: 'list', ordered, items })
const callout = (tone, title, text) => ({ type: 'callout', tone, title, text })
const example = (title, weak, strong, why) => ({ type: 'example', title, weak, strong, why })
const check = (questionId) => ({ type: 'knowledge-check', questionId })

const outlineContent = (title, objectives) => [
  callout('attention', 'Outline lesson', 'This lesson exists as a structure for the frontend build. The written content is not finished, and Cognita does not present it as completed courseware.'),
  h('What this lesson will cover'),
  list(objectives),
  p(`The finished version of “${title}” follows the same shape as the written lessons in this module: a short framing, worked contrasts between weak and strong practice, one knowledge check, and a practice task carried into the module assessment.`),
]

export const programs = [
  {
    id: 'prog_ai00',
    code: 'AI00',
    title: 'AI-00 Foundation Pathway',
    tagline: 'Readiness before tooling.',
    summary: 'Builds the communication, AI-foundations and verification judgment a learner needs before applied AI work. Personalised: a learner takes the areas their readiness profile identifies, not all of them by default.',
    level: 'Foundation',
    estimatedWeeks: 6,
    courseIds: ['course_comm', 'course_aifound', 'course_research'],
    certificateId: 'cert_ai00',
  },
  {
    id: 'prog_ai01',
    code: 'AI01',
    title: 'AI-01 Applied AI Practice',
    tagline: 'Working with AI on real institutional and commercial problems.',
    summary: 'Applied practice: structured prompting, multi-stage workflows, verification pipelines, and delivering AI-assisted work a professional can put their name on.',
    level: 'Applied',
    estimatedWeeks: 8,
    courseIds: ['course_applied'],
    certificateId: 'cert_ai01',
    requiresPlacement: [AI_01],
  },
]

export const courses = [
  {
    id: 'course_comm',
    programId: 'prog_ai00',
    code: 'COMM',
    title: 'Communication for AI Work',
    summary: 'Writing and instructing clearly enough that an AI system — and a colleague — can act on what you meant.',
    moduleIds: ['mod_clarity', 'mod_register', 'mod_instruction'],
  },
  {
    id: 'course_aifound',
    programId: 'prog_ai00',
    code: 'AIF',
    title: 'AI Foundations',
    summary: 'What generative systems actually do, where they fail, and what that means for the work you sign your name to.',
    moduleIds: ['mod_howitworks', 'mod_limits', 'mod_responsible'],
  },
  {
    id: 'course_research',
    programId: 'prog_ai00',
    code: 'RES',
    title: 'Research & Verification',
    summary: 'Source authority, currency, and what to do when the evidence does not support the claim.',
    moduleIds: ['mod_sources', 'mod_verification'],
  },
  {
    id: 'course_applied',
    programId: 'prog_ai01',
    code: 'APP',
    title: 'Applied AI Practice',
    summary: 'Multi-stage AI workflows on real deliverables, with verification built into the process rather than bolted on.',
    moduleIds: ['mod_workflows', 'mod_pipelines', 'mod_defensible'],
  },
]

/**
 * `requiredFor` / `waivedFor` drive the personalised AI-00 pathway. A learner
 * placed into AI-00 AI Foundations does not repeat the communication modules
 * their entrance exam already demonstrated.
 */
export const modules = [
  {
    id: 'mod_clarity',
    courseId: 'course_comm',
    title: 'Clear Written Communication',
    summary: 'Precision, concision, and removing the ambiguity a reader has to guess at.',
    lessonIds: ['les_clarity_1', 'les_clarity_2', 'les_clarity_3'],
    assessmentId: 'asmt_clarity',
    requiredFor: [AI_00_COMMUNICATION, AI_00_FULL, TARGETED_BRIDGE],
    waivedFor: [AI_00_FOUNDATIONS],
  },
  {
    id: 'mod_register',
    courseId: 'course_comm',
    title: 'Professional Register and Tone',
    summary: 'Saying difficult things — delays, disagreement, bad news — without hedging or blame.',
    lessonIds: ['les_register_1', 'les_register_2'],
    assessmentId: null,
    requiredFor: [AI_00_COMMUNICATION, AI_00_FULL],
    waivedFor: [AI_00_FOUNDATIONS],
    optionalFor: [TARGETED_BRIDGE],
  },
  {
    id: 'mod_instruction',
    courseId: 'course_comm',
    title: 'Precise Instruction',
    summary: 'Turning a vague request into an instruction that can only be carried out one way.',
    lessonIds: ['les_instruction_1', 'les_instruction_2'],
    assessmentId: 'asmt_instruction',
    requiredFor: [AI_00_COMMUNICATION, AI_00_FULL, AI_00_FOUNDATIONS, TARGETED_BRIDGE],
  },
  {
    id: 'mod_howitworks',
    courseId: 'course_aifound',
    title: 'How Generative Systems Work',
    summary: 'Learned patterns, context, and probability — without the mysticism.',
    lessonIds: ['les_how_1', 'les_how_2'],
    assessmentId: null,
    requiredFor: [AI_00_FOUNDATIONS, AI_00_FULL, TARGETED_BRIDGE],
    waivedFor: [AI_00_COMMUNICATION],
  },
  {
    id: 'mod_limits',
    courseId: 'course_aifound',
    title: 'Limitations and Hallucination',
    summary: 'Why a confident answer and a correct answer are unrelated properties.',
    lessonIds: ['les_limits_1', 'les_limits_2'],
    assessmentId: 'asmt_limits',
    requiredFor: [AI_00_FOUNDATIONS, AI_00_FULL, TARGETED_BRIDGE],
    waivedFor: [AI_00_COMMUNICATION],
  },
  {
    id: 'mod_responsible',
    courseId: 'course_aifound',
    title: 'Responsible Use and Accountability',
    summary: 'Confidentiality, attribution, and who carries the consequence of AI-assisted work.',
    lessonIds: ['les_resp_1'],
    assessmentId: null,
    requiredFor: [AI_00_FOUNDATIONS, AI_00_FULL],
    optionalFor: [AI_00_COMMUNICATION, TARGETED_BRIDGE],
  },
  {
    id: 'mod_sources',
    courseId: 'course_research',
    title: 'Source Authority and Currency',
    summary: 'Which source wins, and what to do when two authoritative sources disagree.',
    lessonIds: ['les_src_1', 'les_src_2'],
    assessmentId: null,
    requiredFor: [AI_00_FULL, AI_00_FOUNDATIONS, TARGETED_BRIDGE],
    optionalFor: [AI_00_COMMUNICATION],
  },
  {
    id: 'mod_verification',
    courseId: 'course_research',
    title: 'Verification in Practice',
    summary: 'Running a claim to ground, and communicating honestly when it will not stand up.',
    lessonIds: ['les_ver_1', 'les_ver_2'],
    assessmentId: 'asmt_verification',
    requiredFor: [AI_00_FULL, AI_00_FOUNDATIONS, AI_00_COMMUNICATION, TARGETED_BRIDGE],
  },
  {
    id: 'mod_workflows',
    courseId: 'course_applied',
    title: 'Multi-stage AI Workflows',
    summary: 'Decomposing a deliverable into stages with checkable outputs.',
    lessonIds: ['les_flow_1', 'les_flow_2'],
    assessmentId: null,
    requiredFor: [AI_01],
  },
  {
    id: 'mod_pipelines',
    courseId: 'course_applied',
    title: 'Verification Pipelines',
    summary: 'Building the check into the process rather than bolting it on at the end.',
    lessonIds: ['les_pipe_1', 'les_pipe_2'],
    assessmentId: null,
    requiredFor: [AI_01],
  },
  {
    id: 'mod_defensible',
    courseId: 'course_applied',
    title: 'Delivering Defensible Work',
    summary: 'Producing AI-assisted work that survives being questioned by a client, an editor, or a regulator.',
    lessonIds: ['les_def_1'],
    assessmentId: null,
    requiredFor: [AI_01],
  },
]

export const lessons = [
  {
    id: 'les_clarity_1',
    moduleId: 'mod_clarity',
    title: 'What ambiguity costs',
    estimatedMinutes: 12,
    objectives: [
      'Identify the four places ambiguity usually enters a sentence',
      'Rewrite an ambiguous instruction so it has one reading',
      'Explain why vagueness is more expensive in AI work than in ordinary writing',
    ],
    content: [
      p('Ambiguity is not a style problem. It is a cost. Every sentence that can be read two ways is a decision you have handed to someone else — a colleague, a client, or a system that will not ask you to clarify.'),
      h('Where ambiguity enters'),
      list([
        'Pronouns with more than one possible referent — “she”, “it”, “they”',
        'Quantities without units or baselines — “significantly”, “most”, “soon”',
        'Actions without an actor — “the report will be reviewed”',
        'Scope without a boundary — “update the section”',
      ]),
      example(
        'A pronoun with two referents',
        'The manager told the assistant that she should revise it.',
        'The manager instructed the assistant to revise the client proposal.',
        'Two people, two possible referents for “she”, and “it” names nothing. The stronger version costs six more words and removes the guess entirely.',
      ),
      callout('info', 'Why this matters more with AI', 'A colleague who does not understand you asks a follow-up question. A generative system does not — it resolves the ambiguity itself, confidently, and you inherit whatever it chose.'),
      check('kc_clarity_1'),
      h('Practice'),
      p('Take the last message you sent asking someone for work. Find one sentence that could be read two ways, and rewrite it so it cannot. You will use this in the module assessment.'),
    ],
  },
  {
    id: 'les_clarity_2',
    moduleId: 'mod_clarity',
    title: 'Concision without loss',
    estimatedMinutes: 10,
    objectives: [
      'Cut filler without cutting meaning',
      'Recognise the difference between short and clear',
    ],
    content: [
      p('Concision is not brevity. A short sentence that drops a necessary condition is worse than a long one that keeps it. The test is not word count — it is whether removing the words removed anything a reader needed.'),
      example(
        'Filler that carries nothing',
        'At this point in time, we are currently reviewing the application.',
        'We are reviewing the application.',
        '“At this point in time” and “currently” say the same thing, and the present tense already says it. Nothing was lost.',
      ),
      example(
        'Cutting too far',
        'Sales increased.',
        'Sales increased 14% between Q1 and Q2.',
        'The short version is not clearer — it is emptier. Concision removes filler, not evidence.',
      ),
      check('kc_clarity_2'),
    ],
  },
  {
    id: 'les_clarity_3',
    moduleId: 'mod_clarity',
    title: 'Fact, opinion, and the space between',
    estimatedMinutes: 14,
    objectives: ['Separate a reported figure from an interpretation of it', 'Attribute claims to their source in a single sentence'],
    outline: true,
    content: outlineContent('Fact, opinion, and the space between', [
      'Marking the boundary between what a source reported and what you concluded',
      'Attribution patterns that survive scrutiny',
      'Why “the survey proves” is almost always the wrong verb',
    ]),
  },
  {
    id: 'les_register_1',
    moduleId: 'mod_register',
    title: 'Delivering bad news without hedging',
    estimatedMinutes: 11,
    objectives: ['State a delay, its cause and its remedy in three sentences', 'Avoid both blame-shifting and over-apology'],
    content: [
      p('Bad news handled well builds more trust than good news handled carelessly. The structure is consistent: state the fact, take the responsibility that is yours, give the new commitment.'),
      example(
        'Vague and defensive',
        'Your project is late because things happened. Sorry, but it is not really our fault.',
        'The project will be delivered three days later than scheduled. We apologise for the delay and have adjusted the workflow to meet the revised delivery date of 18 September.',
        'The second version names the size of the delay, owns it without excess, and gives a date the reader can plan against.',
      ),
      callout('attention', 'A common failure', 'Over-apology reads as instability. One clear apology is stronger than three.'),
      check('kc_register_1'),
    ],
  },
  {
    id: 'les_register_2',
    moduleId: 'mod_register',
    title: 'Professional disagreement',
    estimatedMinutes: 9,
    objectives: ['Disagree with a superior on evidence rather than preference'],
    outline: true,
    content: outlineContent('Professional disagreement', [
      'Separating the idea from the person who proposed it',
      'Leading with the evidence gap rather than the verdict',
      'Offering the stronger alternative in the same message',
    ]),
  },
  {
    id: 'les_instruction_1',
    moduleId: 'mod_instruction',
    title: 'Anatomy of a strong instruction',
    estimatedMinutes: 15,
    objectives: [
      'Name the seven components of an instruction that can only be read one way',
      'Convert a vague request into a controlled instruction',
      'Add a verification constraint that prevents invented detail',
    ],
    content: [
      p('A weak instruction is not one that is short. It is one that leaves the important decisions unmade, so somebody else makes them for you.'),
      h('The seven components'),
      list([
        'Objective — what the output is for',
        'Audience — who reads it',
        'Constraints — length, format, register, budget, timeframe',
        'Source material — what may be used',
        'Deliverable — the exact shape of the output',
        'Success criteria — how you will judge it',
        'Verification rule — what must not be invented',
      ], true),
      example(
        'The request as it usually arrives',
        'Make a caption for our tourism post.',
        'Write a 70-word Facebook caption for Filipino weekend travellers. Use an inviting but credible tone. Do not invent attractions, awards, statistics, or claims — use only the three attractions listed above.',
        'The second version fixes length, platform, audience, tone, and the one thing that would embarrass the organisation if it went wrong.',
      ),
      callout('info', 'The verification rule is the one people skip', 'It is also the one that prevents a fabricated award ending up on a municipal page.'),
      check('kc_instruction_1'),
    ],
  },
  {
    id: 'les_instruction_2',
    moduleId: 'mod_instruction',
    title: 'Instructions for comparison and judgment',
    estimatedMinutes: 12,
    objectives: ['Ask for a comparison that surfaces missing information before a recommendation'],
    outline: true,
    content: outlineContent('Instructions for comparison and judgment', [
      'Naming the comparison dimensions up front',
      'Requiring the gaps to be stated before the recommendation',
      'Why “which is better?” produces confident, useless answers',
    ]),
  },
  {
    id: 'les_how_1',
    moduleId: 'mod_howitworks',
    title: 'Patterns, context, and probability',
    estimatedMinutes: 13,
    objectives: ['Describe in plain language how a generative model produces text', 'Explain why the same prompt can produce different answers'],
    content: [
      p('A generative model does not look anything up. It produces the next piece of text that fits the patterns it learned and the context you gave it. That single fact explains most of its behaviour — the fluency, the usefulness, and the failures.'),
      h('Three consequences'),
      list([
        'Context is leverage. What you put in the instruction shapes the output more than any phrasing trick.',
        'Output is probabilistic. Similar prompts can produce different answers, and neither is a malfunction.',
        'Fluency is not knowledge. The system is optimised to produce text that reads correctly, which is not the same as text that is correct.',
      ]),
      callout('info', 'A useful mental model', 'Treat it as an extremely well-read colleague who never says “I am not sure” unless you ask them to.'),
      check('kc_how_1'),
    ],
  },
  {
    id: 'les_how_2',
    moduleId: 'mod_howitworks',
    title: 'Context windows and what the system forgets',
    estimatedMinutes: 10,
    objectives: ['Explain what the model can and cannot see when it answers'],
    outline: true,
    content: outlineContent('Context windows and what the system forgets', [
      'What is actually in front of the model when it responds',
      'Why a long conversation can lose an earlier instruction',
      'Practical habits for keeping the important constraints in view',
    ]),
  },
  {
    id: 'les_limits_1',
    moduleId: 'mod_limits',
    title: 'Hallucination: plausible and wrong',
    estimatedMinutes: 14,
    objectives: [
      'Define hallucination precisely',
      'Recognise the three claim types most likely to be fabricated',
      'Apply a verification rule before a claim reaches the public',
    ],
    content: [
      p('A hallucination is an output that reads as plausible and contains invented or incorrect information. It is not a bug in the ordinary sense — it is the same mechanism that produces the useful answers, applied where the pattern is confident and the fact is absent.'),
      h('The three highest-risk claim types'),
      list([
        'Citations — titles, authors, journals, and page numbers that do not exist',
        'Statistics — precise figures with no traceable source, often suspiciously round or suspiciously exact',
        'Quotations — words attributed to a real person who never said them',
      ]),
      callout('critical', 'Confidence is not evidence', 'The system has no mechanism for sounding less certain about a fact it invented. Tone tells you nothing about accuracy.'),
      example(
        'A fabricated claim in the wild',
        'A 2025 World Employment Institute report proves that 34% of Philippine BPO employees were replaced by AI.',
        'I could not verify this figure. The named institution and report should be confirmed before any number is published, and the claim should not be repeated as fact until then.',
        'Named institution, specific year, precise percentage, and the verb “proves” — the four features that make an unverified claim persuasive.',
      ),
      check('kc_limits_1'),
    ],
  },
  {
    id: 'les_limits_2',
    moduleId: 'mod_limits',
    title: 'Where AI assistance is and is not appropriate',
    estimatedMinutes: 11,
    objectives: ['Sort tasks by the cost of being wrong'],
    outline: true,
    content: outlineContent('Where AI assistance is and is not appropriate', [
      'Sorting tasks by reversibility and consequence',
      'The categories that always require a qualified human',
      'Drafting versus deciding',
    ]),
  },
  {
    id: 'les_resp_1',
    moduleId: 'mod_responsible',
    title: 'Confidentiality, attribution, accountability',
    estimatedMinutes: 12,
    objectives: ['Decide what may be entered into a third-party AI service', 'State who carries responsibility for AI-assisted work'],
    content: [
      p('Three questions decide whether AI assistance is appropriate: what you are putting in, whose work is coming out, and who answers for the result.'),
      h('What you put in'),
      p('Client records, personal information, unpublished institutional material and credentials do not go into a public AI service without authorisation. The convenience is real; so is the disclosure.'),
      h('Who answers for it'),
      p('The person or organisation approving and using the work. Not the model, not the vendor, not the prompt. This does not change because a tool was involved.'),
      check('kc_resp_1'),
    ],
  },
  {
    id: 'les_src_1',
    moduleId: 'mod_sources',
    title: 'Which source wins',
    estimatedMinutes: 12,
    objectives: ['Rank sources by authority for a given claim type', 'Identify the primary source behind a secondary report'],
    content: [
      p('Authority is claim-specific. The strongest source for the enacted text of a Philippine law is the official legal record — not a news summary of it, however reputable, and not an AI summary of the news summary.'),
      h('A working hierarchy'),
      list([
        'Primary — the enacted text, the dataset, the original study, the official register',
        'Authoritative secondary — an established outlet or institution citing the primary source',
        'Unsourced secondary — a claim with no traceable origin',
        'Generated — an AI summary with no citation, which is not a source at all',
      ], true),
      check('kc_src_1'),
    ],
  },
  {
    id: 'les_src_2',
    moduleId: 'mod_sources',
    title: 'Currency and supersession',
    estimatedMinutes: 10,
    objectives: ['Decide which of two official pages governs'],
    outline: true,
    content: outlineContent('Currency and supersession', [
      'Newer is not automatically governing — confirm supersession',
      'Reading effective dates and transitional provisions',
      'Recording which version you relied on and when',
    ]),
  },
  {
    id: 'les_ver_1',
    moduleId: 'mod_verification',
    title: 'Running a claim to ground',
    estimatedMinutes: 16,
    objectives: [
      'Verify whether a named report exists',
      'Confirm that an existing report actually supports the claim made about it',
      'Distinguish "unverified" from "false"',
    ],
    content: [
      p('Verification has two stages, and people routinely stop after the first. Stage one: does the source exist? Stage two: does it say what the claim says it says?'),
      h('The procedure'),
      list([
        'Search for the exact institution and report title in the issuing body’s own publications',
        'If the institution exists but the report does not, treat the citation as fabricated',
        'If the report exists, locate the specific figure inside it — not in coverage of it',
        'Check that the definition and scope match the claim (a survey of 400 firms is not “companies”)',
        'Record what you found and where, with the date you checked',
      ], true),
      callout('info', 'Unverified is not false', 'These are different findings and they need different language. “I could not verify this” is honest. “This is false” is a claim of its own, and needs its own evidence.'),
      check('kc_ver_1'),
    ],
  },
  {
    id: 'les_ver_2',
    moduleId: 'mod_verification',
    title: 'Communicating uncertainty',
    estimatedMinutes: 13,
    objectives: ['Write a public sentence that is honest about incomplete evidence'],
    outline: true,
    content: outlineContent('Communicating uncertainty', [
      'Language that conveys uncertainty without sounding evasive',
      'Reporting a range or a disagreement between sources',
      'What to publish when the number cannot be confirmed at all',
    ]),
  },
  {
    id: 'les_flow_1',
    moduleId: 'mod_workflows',
    title: 'Staged workflows and prompt chaining',
    estimatedMinutes: 18,
    objectives: [
      'Decompose a deliverable into stages with checkable outputs',
      'Decide where a human check belongs in the chain',
      'Keep a record of what was generated and what was confirmed',
    ],
    content: [
      p('A single instruction produces a single opinion. A staged workflow produces something you can inspect at each step — which is the only way to find the error before a client does.'),
      h('Decomposing a deliverable'),
      p('Take the output you actually owe someone and work backwards into stages whose results you can check without reading the whole thing again. A research brief is not one task; it is source gathering, claim extraction, verification, synthesis, and drafting.'),
      list([
        'Each stage produces something inspectable — a list, a table, a set of claims, not prose',
        'Each stage names what would make its output wrong',
        'Verification stages come before synthesis, never after drafting',
      ]),
      example(
        'One instruction, no checkpoints',
        'Write me a research brief on AI adoption among Philippine SMEs.',
        'Stage 1: list every claim you would need to support such a brief, with the source type each would require. Do not write the brief. Stage 2 comes after I have reviewed that list.',
        'The second version produces something a person can check in two minutes. The first produces four pages that have to be verified sentence by sentence.',
      ),
      callout('info', 'The record matters as much as the work', 'Keep what was generated separate from what was confirmed. When someone asks where a number came from — and they will — that record is your answer.'),
      check('kc_flow_1'),
    ],
  },
  {
    id: 'les_flow_2',
    moduleId: 'mod_workflows',
    title: 'Designing checkpoints that catch real errors',
    estimatedMinutes: 14,
    objectives: ['Place checkpoints where failure is most likely, not where it is most convenient'],
    outline: true,
    content: outlineContent('Designing checkpoints that catch real errors', [
      'Identifying the stages where a mistake propagates furthest',
      'Cheap checks that catch expensive errors',
      'Why a final proofread is the weakest checkpoint in the chain',
    ]),
  },
  {
    id: 'les_pipe_1',
    moduleId: 'mod_pipelines',
    title: 'Verification built into the process',
    estimatedMinutes: 16,
    objectives: ['Design a workflow where unverified claims cannot reach the draft'],
    outline: true,
    content: outlineContent('Verification built into the process', [
      'Separating claim generation from claim verification',
      'Marking every claim with its source status before drafting begins',
      'What to do with a claim that cannot be confirmed in time',
    ]),
  },
  {
    id: 'les_pipe_2',
    moduleId: 'mod_pipelines',
    title: 'Working with contested evidence',
    estimatedMinutes: 15,
    objectives: ['Report honestly when authoritative sources disagree'],
    outline: true,
    content: outlineContent('Working with contested evidence', [
      'Comparing methodology, scope and date before choosing a figure',
      'Reporting a disagreement rather than resolving it silently',
      'Language for a range, an estimate, and an unknown',
    ]),
  },
  {
    id: 'les_def_1',
    moduleId: 'mod_defensible',
    title: 'Defending the output',
    estimatedMinutes: 17,
    objectives: ['Answer “where did this come from?” without going back to the source material'],
    outline: true,
    content: outlineContent('Defending the output', [
      'The record you keep while producing the work',
      'Disclosing AI assistance proportionately and accurately',
      'What to do when a published claim turns out to be wrong',
    ]),
  },
]

export const findProgram = (id) => programs.find((program) => program.id === id) || null
export const findCourse = (id) => courses.find((course) => course.id === id) || null
export const findModule = (id) => modules.find((module) => module.id === id) || null
export const findLesson = (id) => lessons.find((lesson) => lesson.id === id) || null
