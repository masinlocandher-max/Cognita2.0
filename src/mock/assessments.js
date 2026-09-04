/**
 * Assessment definitions for the learning environment.
 *
 * These exercise every question type the assessment engine supports, so the
 * reusable components are proven against real shapes rather than one type.
 * The Cognita Entrance Exam is deliberately NOT defined here — it is a separate
 * instrument with its own versioned questionnaire in features/cee.
 */

import { QuestionType } from '../lib/status.js'

const {
  SINGLE_CHOICE, MULTIPLE_CHOICE, TRUE_FALSE, SHORT_RESPONSE, ESSAY,
  SCENARIO_JUDGMENT, FILE_SUBMISSION, PROJECT_SUBMISSION, HUMAN_REVIEWED_TASK,
} = QuestionType

/** Inline knowledge checks embedded in lessons. Formative, not graded. */
export const knowledgeChecks = {
  kc_clarity_1: {
    id: 'kc_clarity_1',
    type: SINGLE_CHOICE,
    prompt: 'Which sentence removes the ambiguity rather than just shortening it?',
    options: [
      { id: 'a', label: 'She told her it needed changes.' },
      { id: 'b', label: 'The manager instructed the assistant to revise the client proposal.' },
      { id: 'c', label: 'It should be revised.' },
      { id: 'd', label: 'Revisions are needed on that.' },
    ],
    correct: ['b'],
    explanation: 'Only this version names both people and the document. The others are shorter but still require the reader to guess.',
  },
  kc_clarity_2: {
    id: 'kc_clarity_2',
    type: TRUE_FALSE,
    prompt: '“Sales increased” is more concise than “Sales increased 14% between Q1 and Q2”, so it is the stronger sentence.',
    correct: ['false'],
    explanation: 'Concision removes filler, not evidence. The figure and the period are the content.',
  },
  kc_register_1: {
    id: 'kc_register_1',
    type: SINGLE_CHOICE,
    prompt: 'A deliverable will be three days late. Which opening is strongest?',
    options: [
      { id: 'a', label: 'Sorry sorry — things went sideways on our end, hope that is okay.' },
      { id: 'b', label: 'The project will be delivered on 18 September, three days later than scheduled.' },
      { id: 'c', label: 'There have been some delays due to circumstances beyond our control.' },
      { id: 'd', label: 'We are slightly behind but should be fine.' },
    ],
    correct: ['b'],
    explanation: 'It gives the new date first, states the size of the slip, and does not shift blame or over-apologize.',
  },
  kc_instruction_1: {
    id: 'kc_instruction_1',
    type: MULTIPLE_CHOICE,
    prompt: 'Which components are missing from: “Write a caption for our tourism post”? Select all that apply.',
    options: [
      { id: 'a', label: 'Audience' },
      { id: 'b', label: 'Length constraint' },
      { id: 'c', label: 'A rule against inventing attractions or awards' },
      { id: 'd', label: 'The word “please”' },
    ],
    correct: ['a', 'b', 'c'],
    explanation: 'Politeness is not a component of instruction quality. Audience, constraint and the verification rule are.',
  },
  kc_how_1: {
    id: 'kc_how_1',
    type: SINGLE_CHOICE,
    prompt: 'Why can the same system give different answers to near-identical prompts?',
    options: [
      { id: 'a', label: 'Each user is served a different database.' },
      { id: 'b', label: 'Generation is probabilistic and sensitive to context.' },
      { id: 'c', label: 'The system alternates between honest and dishonest replies.' },
      { id: 'd', label: 'The internet connection changes the answer.' },
    ],
    correct: ['b'],
    explanation: 'Variation is a property of how the output is produced, not a fault or a trick.',
  },
  kc_limits_1: {
    id: 'kc_limits_1',
    type: MULTIPLE_CHOICE,
    prompt: 'Which claim types are most likely to be fabricated? Select all that apply.',
    options: [
      { id: 'a', label: 'Citations with titles and authors' },
      { id: 'b', label: 'Precise statistics with no traceable source' },
      { id: 'c', label: 'Quotations attributed to real people' },
      { id: 'd', label: 'Requests for clarification' },
    ],
    correct: ['a', 'b', 'c'],
    explanation: 'The three highest-risk types all share a feature: they look verifiable, which is what makes them persuasive.',
  },
  kc_resp_1: {
    id: 'kc_resp_1',
    type: SINGLE_CHOICE,
    prompt: 'Who carries final responsibility for professional work produced with AI assistance?',
    options: [
      { id: 'a', label: 'The model vendor' },
      { id: 'b', label: 'The person or organization approving and using the work' },
      { id: 'c', label: 'Nobody, if the tool made the error' },
      { id: 'd', label: 'The prompt author only' },
    ],
    correct: ['b'],
    explanation: 'Tool involvement does not transfer accountability.',
  },
  kc_src_1: {
    id: 'kc_src_1',
    type: SINGLE_CHOICE,
    prompt: 'You need the enacted text of a Philippine national law. Which is strongest?',
    options: [
      { id: 'a', label: 'A reputable news article summarizing the law' },
      { id: 'b', label: 'An official legal or government source carrying the enacted text' },
      { id: 'c', label: 'An AI summary with no citations' },
      { id: 'd', label: 'A widely shared social post from a lawyer' },
    ],
    correct: ['b'],
    explanation: 'For the text of a law, the primary record governs. Everything else is a report about it.',
  },
  kc_flow_1: {
    id: 'kc_flow_1',
    type: SINGLE_CHOICE,
    prompt: 'Where should a verification stage sit in a multi-stage workflow?',
    options: [
      { id: 'a', label: 'After the draft is written, as a proofread.' },
      { id: 'b', label: 'Before synthesis, on the extracted claims.' },
      { id: 'c', label: 'Only if a client asks for sources.' },
      { id: 'd', label: 'At the very start, before anything is generated.' },
    ],
    correct: ['b'],
    explanation: 'Verifying claims before they are woven into prose is far cheaper than unpicking a finished draft — and a proofread rarely catches a confidently stated fabrication.',
  },
  kc_ver_1: {
    id: 'kc_ver_1',
    type: TRUE_FALSE,
    prompt: 'Confirming that a cited report exists is sufficient verification of a statistic attributed to it.',
    correct: ['false'],
    explanation: 'Existence is stage one. You still have to find the figure inside the report and check that its scope matches the claim.',
  },
}

/** Graded module assessments. */
export const assessments = [
  {
    id: 'asmt_clarity',
    moduleId: 'mod_clarity',
    title: 'Clear Written Communication — module assessment',
    summary: 'Six items and one written task. The written task is reviewed by an evaluator and is not scored automatically.',
    estimatedMinutes: 25,
    passMark: 70,
    questions: [
      {
        id: 'q_cl_1', type: SINGLE_CHOICE, points: 10,
        prompt: 'Which sentence communicates most precisely?',
        options: [
          { id: 'a', label: 'The manager told the assistant that she should change it.' },
          { id: 'b', label: 'The manager instructed the assistant to revise the client proposal.' },
          { id: 'c', label: 'She told her that it needed revision.' },
          { id: 'd', label: 'The proposal was something the manager mentioned.' },
        ],
        correct: ['b'],
      },
      {
        id: 'q_cl_2', type: TRUE_FALSE, points: 10,
        prompt: 'A shorter sentence is always a clearer sentence.',
        correct: ['false'],
      },
      {
        id: 'q_cl_3', type: MULTIPLE_CHOICE, points: 15,
        prompt: 'Which of these introduce ambiguity? Select all that apply.',
        options: [
          { id: 'a', label: 'A pronoun with two possible referents' },
          { id: 'b', label: 'An action with no named actor' },
          { id: 'c', label: 'A quantity with no baseline' },
          { id: 'd', label: 'A sentence written in the active voice' },
        ],
        correct: ['a', 'b', 'c'],
      },
      {
        id: 'q_cl_4', type: SCENARIO_JUDGMENT, points: 15,
        scenario: 'A colleague sends you a draft announcement reading: “The program will begin soon. Interested students should reach out.” It goes public tomorrow.',
        prompt: 'What is the most useful single change?',
        options: [
          { id: 'a', label: 'Make the tone more formal.' },
          { id: 'b', label: 'Replace “soon” with a specific date, and “reach out” with the actual channel.' },
          { id: 'c', label: 'Add an exclamation mark to raise energy.' },
          { id: 'd', label: 'Lengthen it so it looks more official.' },
        ],
        correct: ['b'],
      },
      {
        id: 'q_cl_5', type: SHORT_RESPONSE, points: 15,
        prompt: 'Rewrite this so it has exactly one reading: “The report needs updating before the meeting with the numbers.”',
        placeholder: 'Write your rewritten sentence…',
        minLength: 30,
        reviewedByHuman: true,
      },
      {
        id: 'q_cl_6', type: ESSAY, points: 35,
        prompt: 'Take one message you have actually sent asking someone for work. Quote it, identify the ambiguity, rewrite it, and explain what the rewrite removed.',
        placeholder: 'Original message, then your analysis and rewrite…',
        minLength: 400,
        reviewedByHuman: true,
      },
    ],
  },
  {
    id: 'asmt_instruction',
    moduleId: 'mod_instruction',
    title: 'Precise Instruction — module assessment',
    summary: 'Applied instruction-writing. Most of the weight sits in the written task, which an evaluator reviews.',
    estimatedMinutes: 30,
    passMark: 70,
    questions: [
      {
        id: 'q_in_1', type: MULTIPLE_CHOICE, points: 20,
        prompt: 'Which components belong in a controlled instruction? Select all that apply.',
        options: [
          { id: 'a', label: 'Deliverable shape' },
          { id: 'b', label: 'Verification rule' },
          { id: 'c', label: 'Audience' },
          { id: 'd', label: 'Encouraging language' },
        ],
        correct: ['a', 'b', 'c'],
      },
      {
        id: 'q_in_2', type: HUMAN_REVIEWED_TASK, points: 50,
        prompt: 'Rewrite “Make a marketing plan for my business” into an instruction an assistant could act on responsibly. Invent reasonable business details.',
        placeholder: 'Your rewritten instruction…',
        minLength: 500,
        reviewedByHuman: true,
        rubricSummary: 'Objective and context · audience, market, budget, timeframe · deliverable and structure · verification and responsible use · clarity',
      },
      {
        id: 'q_in_3', type: FILE_SUBMISSION, points: 15,
        prompt: 'Attach the brief you were originally given, if you have one.',
        optional: true,
        accepts: 'PDF, DOCX, or an image',
      },
      {
        id: 'q_in_4', type: PROJECT_SUBMISSION, points: 15,
        prompt: 'Optional: link a piece of published work where this instruction was used.',
        optional: true,
      },
    ],
  },
  {
    id: 'asmt_limits',
    moduleId: 'mod_limits',
    title: 'Limitations and Hallucination — module assessment',
    summary: 'Recognising fabricated claims and responding to them appropriately.',
    estimatedMinutes: 20,
    passMark: 70,
    questions: [
      {
        id: 'q_li_1', type: SINGLE_CHOICE, points: 20,
        prompt: 'Which best describes an AI hallucination?',
        options: [
          { id: 'a', label: 'A refusal to answer' },
          { id: 'b', label: 'An output that appears plausible but contains invented or incorrect information' },
          { id: 'c', label: 'A slow response' },
          { id: 'd', label: 'An image the system generated' },
        ],
        correct: ['b'],
      },
      {
        id: 'q_li_2', type: SCENARIO_JUDGMENT, points: 30,
        scenario: 'A draft press release cites “a 2025 World Employment Institute report” for a precise national figure. You cannot find the institution or the report.',
        prompt: 'What do you publish?',
        options: [
          { id: 'a', label: 'The figure, since the draft reads confidently.' },
          { id: 'b', label: 'The figure with “reportedly” added.' },
          { id: 'c', label: 'Nothing citing that report, and a note that the figure could not be verified.' },
          { id: 'd', label: 'A rounder version of the figure.' },
        ],
        correct: ['c'],
      },
      {
        id: 'q_li_3', type: ESSAY, points: 50,
        prompt: 'Explain to a colleague why an AI system’s confidence tells you nothing about accuracy, and what you do about it in practice.',
        placeholder: 'Your explanation…',
        minLength: 350,
        reviewedByHuman: true,
      },
    ],
  },
  {
    id: 'asmt_verification',
    moduleId: 'mod_verification',
    title: 'Verification in Practice — module assessment',
    summary: 'The full verification procedure applied to a live claim.',
    estimatedMinutes: 35,
    passMark: 70,
    questions: [
      {
        id: 'q_ve_1', type: SINGLE_CHOICE, points: 15,
        prompt: 'Two official pages give different requirements. One is from 2023, one was updated yesterday.',
        options: [
          { id: 'a', label: 'Use the older page — it existed first.' },
          { id: 'b', label: 'Use whichever is easier to read.' },
          { id: 'c', label: 'Give greater weight to the newer guidance while confirming it supersedes the older.' },
          { id: 'd', label: 'Combine both sets of rules.' },
        ],
        correct: ['c'],
      },
      {
        id: 'q_ve_2', type: SHORT_RESPONSE, points: 25,
        prompt: 'Write the sentence you would publish when a figure cannot be confirmed at all.',
        placeholder: 'Your sentence…',
        minLength: 60,
        reviewedByHuman: true,
      },
      {
        id: 'q_ve_3', type: HUMAN_REVIEWED_TASK, points: 60,
        prompt: 'Take any statistic from a page you read this week. Run it to ground using the two-stage procedure, and report what you found — including if you could not confirm it.',
        placeholder: 'The claim, your procedure, and your finding…',
        minLength: 500,
        reviewedByHuman: true,
        rubricSummary: 'Source identification · procedure applied · primary vs secondary · honest reporting of the finding',
      },
    ],
  },
]

export const findAssessment = (id) => assessments.find((assessment) => assessment.id === id) || null
export const findKnowledgeCheck = (id) => knowledgeChecks[id] || null
