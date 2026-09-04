/**
 * Public educational resources.
 *
 * Written to be genuinely useful and factually careful. No article cites a
 * study, statistic, survey or institution — where a claim would need evidence
 * Cognita does not hold, the article explains the reasoning instead of
 * borrowing authority it cannot show.
 */

const paragraph = (text) => ({ type: 'paragraph', text })
const heading = (text) => ({ type: 'heading', text })
const list = (items, ordered = false) => ({ type: 'list', ordered, items })
const note = (title, text) => ({ type: 'note', title, text })
const compare = (title, weak, strong, why) => ({ type: 'compare', title, weak, strong, why })

export const resourceCategories = [
  { id: 'explainer', label: 'AI explainers' },
  { id: 'guide', label: 'Learning guides' },
  { id: 'responsible', label: 'Responsible AI' },
  { id: 'update', label: 'Institute updates' },
]

export const resources = [
  {
    slug: 'what-a-language-model-is-doing',
    category: 'explainer',
    title: 'What a language model is actually doing',
    summary: 'Fluency and knowledge are different properties. Understanding why explains most of the behavior people find surprising.',
    readingMinutes: 6,
    publishedAt: '2026-08-18',
    body: [
      paragraph('A generative language model does not look anything up. It produces text that fits the patterns it learned during training and the context it was given. That single mechanism explains most of what people find surprising about these systems — the usefulness, the fluency, and the failures.'),
      heading('Why the output reads so well'),
      paragraph('The system is optimised to produce text that looks like text a competent person would write. It is very good at that. What it is not doing is checking whether the sentence is true, because truth is not the property being optimised. A well-formed sentence and a correct sentence are produced by the same process.'),
      note('The practical consequence', 'Tone tells you nothing about accuracy. A model has no mechanism for sounding less certain about a fact it invented than about one it did not.'),
      heading('Why the same question gives different answers'),
      paragraph('Generation involves choosing between plausible continuations. That choice is probabilistic and sensitive to the surrounding context, so similar prompts can produce different answers. This is a property of how the output is produced, not a fault and not evidence that the system is being inconsistent on purpose.'),
      heading('Why context matters more than phrasing'),
      paragraph('What you include in an instruction shapes the output far more than any particular form of words. Adding the audience, the constraints and the material the system may use changes the result substantially. Rearranging polite phrasing does not.'),
      list([
        'Context is leverage — the relevant facts, limits and purpose',
        'Constraints are instructions — length, format, register, what may not be invented',
        'Phrasing tricks are mostly folklore',
      ]),
      heading('What this means for your work'),
      paragraph('Treat the output as a capable first draft from someone very well read who will never tell you they are unsure. That framing produces the right habits: use it for structure and speed, verify anything that carries consequence, and keep the judgment with yourself.'),
    ],
  },
  {
    slug: 'checking-a-claim',
    category: 'guide',
    title: 'How to check a claim an AI system gave you',
    summary: 'A two-stage procedure. Most people stop after the first stage, which is where fabricated citations survive.',
    readingMinutes: 7,
    publishedAt: '2026-08-22',
    body: [
      paragraph('Verification has two stages. Stage one asks whether the source exists. Stage two asks whether it says what the claim says it says. Stopping after stage one is the most common way a fabricated citation reaches a published page.'),
      heading('Stage one: does the source exist?'),
      list([
        'Search for the exact institution and the exact report title in the issuing body’s own publications, not in coverage of them',
        'If the institution exists but the publication does not, treat the citation as fabricated',
        'If neither exists, the claim has no support at all — this is common with confident, specific-sounding attributions',
      ], true),
      heading('Stage two: does it support the claim?'),
      list([
        'Locate the specific figure inside the document itself',
        'Check that the definitions match — a survey of four hundred firms is not "companies"',
        'Check the scope and the date — national figures and regional figures are routinely swapped',
        'Record what you found, where, and when you checked',
      ], true),
      note('Unverified is not false', '“I could not verify this” and “this is false” are different findings that need different language. The second is a claim of its own and needs its own evidence.'),
      heading('What to publish when a figure will not stand up'),
      paragraph('Say plainly that available sources do not support a specific figure, describe what the credible sources do show, and name what remains unconfirmed. Avoid softening an unverified number with a word like “reportedly” — that publishes the number while appearing not to.'),
      heading('The claims most worth checking'),
      list([
        'Precise statistics with no traceable source, especially suspiciously round or suspiciously exact ones',
        'Citations with full titles, authors and years — the detail is what makes them persuasive',
        'Quotations attributed to real people',
        'Anything about a law, a regulation, or a requirement someone will act on',
      ]),
    ],
  },
  {
    slug: 'writing-an-instruction',
    category: 'guide',
    title: 'Writing an instruction an AI system can follow',
    summary: 'A weak instruction is not a short one. It is one that leaves the important decisions unmade.',
    readingMinutes: 6,
    publishedAt: '2026-08-26',
    body: [
      paragraph('When an instruction produces a disappointing result, the cause is usually not the phrasing. It is that the instruction left the decisions that mattered to whoever — or whatever — read it.'),
      heading('The seven components'),
      list([
        'Objective — what the output is for',
        'Audience — who reads it',
        'Constraints — length, format, register, budget, timeframe',
        'Source material — what may be used',
        'Deliverable — the exact shape of the output',
        'Success criteria — how you will judge it',
        'Verification rule — what must not be invented',
      ], true),
      compare(
        'A request as it usually arrives',
        'Make a caption for our tourism post.',
        'Write a 70-word caption for weekend travellers. Use an inviting but credible tone. Do not invent attractions, awards or statistics — use only the three attractions listed above.',
        'The second version fixes length, audience and tone, and closes off the one failure that would embarrass the organization.',
      ),
      heading('The component people skip'),
      paragraph('The verification rule. It is the difference between a caption that reads well and a caption that credits your municipality with an award it never received. If the output will be published, name what may not be invented.'),
      heading('Asking for a comparison'),
      paragraph('Comparisons produce confident, useless answers when the dimensions are left open. Name the dimensions, and ask for the gaps before the recommendation: cost, implementation time, expected benefit, operational burden, risk — and what information is missing before either option can be recommended.'),
    ],
  },
  {
    slug: 'responsible-use-at-work',
    category: 'responsible',
    title: 'Responsible AI use at work: what goes in, what stays out',
    summary: 'Three questions decide whether AI assistance is appropriate for a task.',
    readingMinutes: 5,
    publishedAt: '2026-08-29',
    body: [
      paragraph('Most workplace questions about AI resolve into three: what are you putting in, whose work is coming out, and who answers for the result.'),
      heading('What you put in'),
      paragraph('Client records, personal information, unpublished institutional material and credentials do not go into a public AI service without authorisation. The convenience is real. So is the disclosure — once information has been submitted to a third-party service, you no longer control where it sits or how it is retained.'),
      list([
        'Safe by default: published material, generic exercises, your own draft writing',
        'Not without authorisation: personal data, client records, unpublished internal documents, anything under a confidentiality obligation',
        'Never: passwords, access credentials, payment details',
      ]),
      heading('Whose work is coming out'),
      paragraph('Source material, intellectual property, likeness rights, licensing and originality can all still apply to AI-assisted output. Using a generative system does not clear those questions and does not remove plagiarism risk.'),
      heading('Who answers for it'),
      paragraph('The person or organization approving and using the work. Not the model, not the vendor, not the instruction that produced it. Tool involvement does not transfer accountability, and no professional body treats it as if it does.'),
      note('A useful test', 'Before sending AI-assisted work onward, ask whether you could explain how each factual claim in it was checked. If you cannot, the work is not finished.'),
      heading('Where a qualified person is required'),
      paragraph('Legal, medical, financial and safety-critical judgments, and any decision that is difficult to reverse. AI assistance can help prepare and structure such work. It cannot be the thing that decides it.'),
    ],
  },
  {
    slug: 'cognita-website-preview',
    category: 'update',
    title: 'About this website',
    summary: 'What is live, what is a preview, and what Cognita is deliberately not claiming yet.',
    readingMinutes: 3,
    publishedAt: '2026-09-03',
    body: [
      paragraph('This website is a preview build of the Cognita public site and Student Portal. We would rather say that plainly than have a prospective student discover it later.'),
      heading('What works'),
      list([
        'The public website, program information and admissions material',
        'The application and the Cognita Entrance Exam, which run and score in your browser',
        'The Student Portal interface, including lessons, assessments and progress',
      ]),
      heading('What is not connected yet'),
      list([
        'Accounts and sign-in. Records are stored on your device, not on a Cognita server',
        'Submission. Applications and exam responses do not reach Cognita staff',
        'Evaluator review, enrollment, payment, email and certificate issuance',
      ]),
      note('Why we say so', 'A preview that quietly behaves like a finished system teaches prospective students to trust the wrong things. Every screen that could be misread carries a note about what it does and does not do.'),
      heading('What Cognita is not claiming'),
      paragraph('We do not publish accreditation status, recognition, partnerships, rankings, enrollment numbers or graduate outcomes, because none of those have been established. When they are, they will appear here with the detail required to check them.'),
    ],
  },
]

export const findResource = (slug) => resources.find((resource) => resource.slug === slug) || null
export const resourcesByCategory = (categoryId) =>
  resources.filter((resource) => !categoryId || categoryId === 'all' || resource.category === categoryId)
