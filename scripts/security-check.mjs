import { promises as fs } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dist = path.join(root, 'dist')

const forbiddenProductionMarkers = [
  ['admissions preview state', 'cognita-v2-admissions-state'],
  ['CEE attempt preview state', 'cognita-v2-device-state'],
  ['learning preview state', 'cognita-v2-learning-state'],
  ['CEE evaluator preview state', 'cognita-v2-cee-evaluation'],
  ['founder operations console', 'Founder Operations Console'],
  ['admissions operations console', 'Admissions Operations'],
  ['learning review console', 'Learning & Facilitation Review'],
  ['preview payment mutation', 'Confirm preview payment'],
  ['preview account activation', 'frontend_preview_active'],
  ['internal operations route', '/operations/admissions'],
  ['internal learning route', '/operations/learning'],
  ['timed CEE execution route', '/entrance-exam/start'],
  ['CEE question bank prompt', 'A project brief says'],
  ['CEE question bank prompt', 'Potential hallucinated citation'],
  ['CEE evaluator scoring UI', 'CEE v1.1 EVALUATION'],
]

const forbiddenSecretMarkers = [
  'SUPABASE_SERVICE_ROLE',
  'service_role',
  'DATABASE_URL=',
  'SMTP_PASSWORD',
  'CLIENT_SECRET',
  'WEBHOOK_SECRET',
  'OPENAI_API_KEY',
  'sk_live_',
  'sk-proj-',
  'BEGIN PRIVATE KEY',
]

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await walk(fullPath))
    else files.push(fullPath)
  }

  return files
}

async function main() {
  try {
    await fs.access(dist)
  } catch {
    throw new Error('dist/ does not exist. Run npm run build before npm run security:check.')
  }

  const files = (await walk(dist)).filter((file) => /\.(?:html|js|css|json|map|txt)$/i.test(file))
  const findings = []

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8')
    const relative = path.relative(root, file)

    for (const [label, marker] of forbiddenProductionMarkers) {
      if (content.includes(marker)) findings.push(`${relative}: leaked ${label} (${marker})`)
    }

    for (const marker of forbiddenSecretMarkers) {
      if (content.includes(marker)) findings.push(`${relative}: possible secret marker (${marker})`)
    }
  }

  if (findings.length) {
    console.error('\nSECURITY CHECK FAILED\n')
    findings.forEach((finding) => console.error(`- ${finding}`))
    console.error('\nProduction builds must contain only public Cognita functionality. Internal preview workflows, the CEE bank, privileged mutations, and secrets must not ship in dist/.\n')
    process.exit(1)
  }

  console.log('Security check passed: no internal preview state, privileged UI, CEE bank markers, or known secret markers were found in the production bundle.')
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
