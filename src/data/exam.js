/**
 * Cognita Entrance Exam — CEE v1.0 production questionnaire.
 *
 * Candidate-facing content only. Item text and option order follow the
 * approved CEE v1.0 questionnaire; `answer` is the zero-based index of the
 * keyed option (A=0, B=1, C=2, D=3).
 *
 * The applied-response rubrics and placement thresholds are institutional
 * scoring material and are deliberately NOT imported by the app. Rubrics live
 * in docs/cee-v1-scoring-guide.md; placement logic lives in src/lib/scoring.js.
 */

export const examMeta = {
  title: 'Cognita Entrance Exam',
  version: 'CEE v1.0',
  /**
   * Identifies this exact item set. Attempts are stamped with it, so an
   * in-progress attempt started against a different questionnaire is never
   * scored against this answer key. Bump this whenever items, options, or the
   * key change.
   */
  questionnaireVersion: 'cee-1.0-production',
  recommendedMinutes: 70,
  objectiveItems: 45,
  objectivePoints: 70,
  appliedPoints: 30,
  totalPoints: 100,
}

export const examSections = [
  {
    id: 'communication',
    title: 'Functional English & Communication',
    subtitle: 'Comprehension, grammar, clarity, professional communication, and precise instruction',
    intro: 'This section measures comprehension, grammar, clarity, professional communication, and the ability to give precise instructions.',
    pointsMax: 30,
    scenarios: [
      {
        id: 'tourism-campaign',
        appliesTo: [1, 2, 3, 4],
        label: 'Read the situation below and answer Questions 1 to 4.',
        body: [
          'A local tourism organization asks an AI assistant: “Promote our municipality online.”',
          'The AI produces a campaign claiming that the municipality has a white-sand beach, receives 500,000 tourists every year, and has been named the “Top Hidden Destination in Asia.”',
          'The staff knows that none of these claims has been verified. They revise their instructions by providing a list of actual attractions, their target audience, available budget, campaign period, and a requirement that factual claims must be supported by reliable sources.',
        ],
      },
    ],
    questions: [
      {
        id: 1,
        prompt: 'What is the most serious problem with the first AI output?',
        options: ['It is too short.', 'It uses promotional language.', 'It presents unverified information as fact.', 'It discusses tourism.'],
        answer: 2,
      },
      {
        id: 2,
        prompt: 'What most improved the second instruction?',
        options: ['Relevant context and clear constraints', 'More adjectives', 'A longer greeting', 'Asking the AI to be confident'],
        answer: 0,
      },
      {
        id: 3,
        prompt: 'Which principle is best demonstrated by the staff’s response?',
        options: ['AI should be avoided in tourism.', 'Every AI response requires the same prompt.', 'Longer instructions are automatically more accurate.', 'Human judgment remains necessary when using AI.'],
        answer: 3,
      },
      {
        id: 4,
        prompt: 'Which requirement would most directly reduce the risk of fabricated factual claims?',
        options: ['“Make the campaign exciting.”', '“Do not include factual claims unless they can be supported by reliable sources.”', '“Use more persuasive language.”', '“Write at least 500 words.”'],
        answer: 1,
      },
      {
        id: 5,
        prompt: 'Choose the grammatically correct sentence.',
        options: ['She don’t understand the requirement.', 'She doesn’t understands the requirement.', 'She doesn’t understand the requirement.', 'She not understands the requirement.'],
        answer: 2,
      },
      {
        id: 6,
        prompt: 'Choose the clearest professional sentence.',
        options: ['The report has some things that maybe need fixing somehow.', 'The report needs revision because three claims lack supporting evidence.', 'There are issues in the report and things.', 'The report is the one with revision needed about evidence things.'],
        answer: 1,
      },
      {
        id: 7,
        prompt: 'Complete the sentence correctly: “If the information _____ outdated, verify it before using it.”',
        options: ['are', 'have', 'were being', 'is'],
        answer: 3,
      },
      {
        id: 8,
        prompt: 'Which sentence uses punctuation correctly?',
        options: ['Before publishing, verify the source.', 'Before, publishing verify the source.', 'Before publishing verify, the source.', 'Before publishing verify the source'],
        answer: 0,
      },
      {
        id: 9,
        prompt: 'Choose the correct sentence.',
        options: ['The students was instructed to submit the assignment.', 'The students were instructed to submit the assignment.', 'The students were instruct to submitted the assignment.', 'The students is instructed submitting the assignment.'],
        answer: 1,
      },
      {
        id: 10,
        prompt: 'Which sentence communicates the meaning most precisely?',
        options: ['The manager told the assistant that she should change it.', 'She told her that it needed revision.', 'The manager instructed the assistant to revise the client proposal.', 'The proposal was something the manager told her about.'],
        answer: 2,
      },
      {
        id: 11,
        prompt: 'Choose the correct word: “The researcher must _____ the source before citing the statistic.”',
        options: ['verify', 'verifies', 'verified', 'verifying'],
        answer: 0,
      },
      {
        id: 12,
        prompt: 'Which sentence is most concise without losing important meaning? Original: “The organization made an announcement that was about the changes that were going to happen to the program.”',
        options: ['The organization was making an announcement of changes happening.', 'Changes were announcement by the organization.', 'There were changes about the program announced by them.', 'The organization announced changes to the program.'],
        answer: 3,
      },
      {
        id: 13,
        prompt: 'Which instruction is least ambiguous?',
        options: ['Make this better.', 'Rewrite this announcement in professional English, under 120 words, for first-year college students. Preserve all factual details.', 'Improve the writing somehow.', 'Make it sound good.'],
        answer: 1,
      },
      {
        id: 14,
        prompt: 'Which sentence correctly uses an adverb?',
        options: ['AI tools can help employees work efficient.', 'AI tools can help employees work efficiency.', 'AI tools can help employees work efficiently.', 'AI tools can help employees work efficiencies.'],
        answer: 2,
      },
      {
        id: 15,
        prompt: 'Which sentence best distinguishes fact from opinion?',
        options: ['The survey reported that 61% of respondents preferred Option A, although whether that makes Option A better is a matter of interpretation.', 'Option A is obviously the best because 61% chose it.', 'Everyone prefers Option A.', 'The survey proves Option A is objectively superior.'],
        answer: 0,
      },
      {
        id: 16,
        prompt: 'A client asks for a summary of a 40-page report. Which instruction is strongest?',
        options: ['Summarize this.', 'Make the important parts shorter.', 'Read this and tell me what matters.', 'Summarize the report in five bullet points for executives. Prioritize findings, risks, financial implications, and decisions required. Do not add information that is not in the report.'],
        answer: 3,
      },
      {
        id: 17,
        prompt: 'Which sentence is written most professionally?',
        options: ['Your project is late because things happened.', 'Sorry, but it’s not really our fault.', 'The project will be delivered three days later than scheduled. We apologize for the delay and have adjusted the workflow to meet the revised delivery date of 18 September.', 'We are delayed. Hope that’s okay.'],
        answer: 2,
      },
      {
        id: 18,
        prompt: 'Which version best removes unnecessary wording? Original: “At this point in time, we are currently reviewing the application.”',
        options: ['At this current point, we currently review it.', 'We are reviewing the application.', 'The application is currently at a point in review currently.', 'At this point the application currently has review.'],
        answer: 1,
      },
      {
        id: 19,
        prompt: 'Which instruction would produce the most useful comparison of two business proposals?',
        options: ['Compare Proposal A and Proposal B based on cost, implementation time, expected benefit, operational burden, and risk. Identify missing information before recommending either one.', 'Which one is better?', 'Pick the winner.', 'Compare them and choose one quickly.'],
        answer: 0,
      },
      {
        id: 20,
        prompt: 'A report states, “Sales increased dramatically.” What additional information would make the statement more useful?',
        options: ['A stronger adjective', 'The name of the person writing it', 'A longer paragraph', 'The amount or percentage of the increase and the period being compared'],
        answer: 3,
      },
      {
        id: 21,
        prompt: 'Which instruction provides the strongest quality-control step?',
        options: ['Make sure everything is perfect.', 'Review the draft for factual claims, unsupported assumptions, contradictions, missing information, and anything requiring human verification before finalizing it.', 'Don’t make mistakes.', 'Check it again.'],
        answer: 1,
      },
      {
        id: 22,
        prompt: 'A public announcement contains this sentence: “The program will begin soon.” What is the main weakness?',
        options: ['It contains too many technical terms.', 'It is grammatically incorrect.', '“Soon” is vague and does not provide a specific date or timeframe.', 'It is too formal.'],
        answer: 2,
      },
      {
        id: 23,
        prompt: 'Which response best demonstrates professional disagreement?',
        options: ['“I recommend reconsidering this approach because the available evidence does not support the projected result.”', '“This idea is bad.”', '“You’re wrong.”', '“Whatever you want is fine.”'],
        answer: 0,
      },
      {
        id: 24,
        prompt: 'Which instruction is most appropriate for writing a public social-media caption?',
        options: ['Make this viral at any cost.', 'Write something exciting and invent details if needed.', 'Make people believe this is the best destination.', 'Write a 70-word Facebook caption for Filipino weekend travelers. Use an inviting but credible tone and do not invent attractions, awards, statistics, or claims.'],
        answer: 3,
      },
      {
        id: 25,
        prompt: 'A draft sounds polished but contains a statistic with no source. What should happen next?',
        options: ['Publish it because the writing sounds professional.', 'Verify the statistic before using it.', 'Replace the number with a larger one.', 'Ask the AI whether it is confident.'],
        answer: 1,
      },
    ],
  },
  {
    id: 'ai',
    title: 'AI Foundations',
    subtitle: 'Generative AI capability, limitation, responsible use, prompting, and human responsibility',
    intro: 'This section measures understanding of generative AI, its capabilities, limitations, responsible use, prompting, and human responsibility.',
    pointsMax: 25,
    questions: [
      {
        id: 26,
        prompt: 'Generative AI primarily creates responses by:',
        options: ['Accessing every fact on the internet in real time', 'Generating outputs from learned patterns and the context provided', 'Understanding the world exactly as a human does', 'Retrieving answers from one fixed encyclopedia'],
        answer: 1,
      },
      {
        id: 27,
        prompt: 'Which best describes an AI hallucination?',
        options: ['A computer displaying an image', 'A system refusing a request', 'A temporary internet failure', 'An output that appears plausible but contains invented or incorrect information'],
        answer: 3,
      },
      {
        id: 28,
        prompt: 'Which task is generally appropriate for AI assistance?',
        options: ['Generating several first-draft headline options for human review', 'Making an irreversible medical diagnosis without a qualified professional', 'Publishing an allegation about a person without verification', 'Entering a client’s password into an unauthorized service'],
        answer: 0,
      },
      {
        id: 29,
        prompt: 'Which task requires particularly strong human review?',
        options: ['Reformatting a heading', 'Brainstorming possible names', 'Preparing legal, medical, financial, or reputational claims for public use', 'Alphabetizing a non-sensitive list'],
        answer: 2,
      },
      {
        id: 30,
        prompt: 'What usually improves an AI instruction most?',
        options: ['Typing everything in capital letters', 'Providing relevant context, constraints, and a clear desired output', 'Adding unrelated details', 'Repeating the same sentence several times'],
        answer: 1,
      },
      {
        id: 31,
        prompt: 'Which statement is safest?',
        options: ['AI-generated citations are normally accurate.', 'Statistics produced by AI do not require checking.', 'A confident answer is usually a verified answer.', 'Important factual claims should be independently verified.'],
        answer: 3,
      },
      {
        id: 32,
        prompt: 'Two reliable sources provide different numbers for the same issue. What should you do?',
        options: ['Choose the larger number.', 'Use whichever one supports your preferred conclusion.', 'Compare their dates, definitions, scope, methodology, and authority before deciding how to report the difference.', 'Ask AI to choose one without examining the sources.'],
        answer: 2,
      },
      {
        id: 33,
        prompt: 'What does “human in the loop” mean?',
        options: ['A human reviews, approves, or makes decisions at important stages of an AI-assisted workflow.', 'No AI is used.', 'Everything is fully automated.', 'All work must be handwritten.'],
        answer: 0,
      },
      {
        id: 34,
        prompt: 'Which information should generally not be entered into a public AI service without proper authorization?',
        options: ['A public press release', 'Confidential client records containing personal information', 'A publicly available tourism description', 'A generic writing exercise'],
        answer: 1,
      },
      {
        id: 35,
        prompt: 'Why might the same generative AI system produce somewhat different answers to similar prompts?',
        options: ['Computers cannot understand written language at all.', 'AI intentionally lies every second response.', 'Every user receives a completely different database.', 'Generative systems can be probabilistic and sensitive to context.'],
        answer: 3,
      },
      {
        id: 36,
        prompt: 'An AI produces a weak first draft. What is generally the strongest next step?',
        options: ['Identify what is weak, improve the instruction, revise the output, and verify important claims.', 'Publish it immediately.', 'Assume the task is impossible.', 'Repeat the identical prompt indefinitely.'],
        answer: 0,
      },
      {
        id: 37,
        prompt: 'What is prompt chaining?',
        options: ['Linking multiple passwords', 'Asking as many unrelated questions as possible', 'Dividing a complex task into controlled stages where the output of one step informs the next', 'Copying prompts from other users'],
        answer: 2,
      },
      {
        id: 38,
        prompt: 'Who carries final responsibility for professional work created with AI assistance?',
        options: ['The AI model', 'The person or organization approving and using the work', 'The internet service provider', 'The prompt itself'],
        answer: 1,
      },
      {
        id: 39,
        prompt: 'Which statement about AI-generated creative work is most responsible?',
        options: ['Copyright never applies to AI-assisted work.', 'AI eliminates plagiarism concerns.', 'Anything generated by AI is automatically safe to publish commercially.', 'Source material, intellectual-property rights, likeness rights, licensing, and originality may still require review.'],
        answer: 3,
      },
      {
        id: 40,
        prompt: 'Which statement best describes a strong professional use of AI?',
        options: ['AI can amplify human capability while humans retain judgment and responsibility.', 'AI should replace human judgment whenever possible.', 'Using AI removes the need to understand the underlying task.', 'AI eliminates the need for verification.'],
        answer: 0,
      },
    ],
  },
  {
    id: 'research',
    title: 'Research & Verification Judgment',
    subtitle: 'Source evaluation, current information, uncertainty, and verification behavior',
    intro: 'This section measures source evaluation, current-information judgment, uncertainty management, and verification behavior.',
    pointsMax: 15,
    questions: [
      {
        id: 41,
        prompt: 'An AI assistant says that a well-known public figure was appointed to a government position this morning. What should you do before publishing the claim?',
        options: ['Trust the answer because the event is recent.', 'Ask another AI and treat agreement as confirmation.', 'Find a current authoritative source confirming the appointment.', 'Publish immediately and correct it later if necessary.'],
        answer: 2,
      },
      {
        id: 42,
        prompt: 'A website states, “Studies prove that 92% of companies prefer AI-trained employees,” but provides no study title, author, methodology, date, or source. How should the claim be treated?',
        options: ['As an unsupported claim requiring verification', 'As verified research', 'As government data', 'As a primary source'],
        answer: 0,
      },
      {
        id: 43,
        prompt: 'You find an official government guidance page from 2023 and another official page updated yesterday containing different requirements. What is the best approach?',
        options: ['Always use the oldest page.', 'Use whichever page is easier to understand.', 'Combine both rules without checking.', 'Give greater weight to the newer authoritative guidance while confirming whether it supersedes or modifies the older information.'],
        answer: 3,
      },
      {
        id: 44,
        prompt: 'An AI generates a quotation attributed to a researcher, but you cannot find the quotation in any original or reliable source. What should you do?',
        options: ['Use the quotation because it sounds credible.', 'Do not attribute the quotation as genuine unless you can verify the original source.', 'Ask AI to generate a citation for it.', 'Change a few words and keep the attribution.'],
        answer: 1,
      },
      {
        id: 45,
        prompt: 'Which source would generally be strongest for confirming the enacted text of a Philippine national law?',
        options: ['An anonymous social-media post', 'A personal blog', 'An authoritative official legal or government source containing the enacted text', 'An AI-generated summary without citations'],
        answer: 2,
      },
    ],
  },
]

export const appliedSection = {
  id: 'applied',
  title: 'Applied Communication & AI Evaluation',
  subtitle: 'Written responses reviewed by a human evaluator',
  intro: 'Write clearly and demonstrate your reasoning. There is no advantage to unnecessary length.',
  pointsMax: 30,
}

export const appliedTasks = [
  {
    id: 'applied-task-1',
    number: 1,
    title: 'Applied Communication',
    points: 15,
    scenario: 'A business owner gives an AI assistant this instruction: “Make a marketing plan for my business.”',
    prompt: 'Rewrite the request into a substantially stronger instruction that would help an AI assistant produce a useful, realistic, and responsible marketing plan.',
    guidance: 'Your revised instruction should provide enough information for the AI to understand:',
    checklist: [
      'the objective',
      'the business or product',
      'target audience',
      'geographic market',
      'available budget',
      'timeframe',
      'important constraints',
      'expected output',
      'measures of success',
      'any factual information that should be verified',
    ],
    note: 'You may reasonably invent basic hypothetical business details for purposes of completing the task.',
  },
  {
    id: 'applied-task-2',
    number: 2,
    title: 'AI Response Evaluation',
    points: 15,
    scenario: 'Imagine that an AI assistant gives the following response: “Exactly 2.8 million Filipinos lost their jobs because of artificial intelligence in 2025. A 2025 World Employment Institute report proves that 34% of Philippine BPO employees were replaced by AI.”',
    prompt: 'Evaluate this response as if you were preparing information for public release.',
    guidance: 'Explain:',
    checklist: [
      'what is potentially unreliable or unsupported',
      'what claims require verification',
      'what sources you would look for',
      'how you would determine whether the named report exists and actually supports the claim',
      'how you would communicate the issue if reliable evidence does not support an exact figure',
    ],
    note: 'Do not assume that a claim is true merely because the AI presents it confidently.',
  },
]

export const candidateInstructions = [
  'Complete the assessment independently.',
  'For the objective sections, select the best answer for each question.',
  'For the applied-response section, write your own response using clear reasoning. Do not use an AI assistant, search engine, translator, or another person to generate your answers during the examination.',
  'Read carefully. Some questions test whether you can recognize missing information, uncertainty, misleading claims, weak reasoning, or unsafe assumptions.',
]
