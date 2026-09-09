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

const forbiddenBundleSecretMarkers = [
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

const hardCodedSecretPatterns = [
  ['OpenAI-style secret key', /\bsk-(?:proj|live)-[A-Za-z0-9_-]{20,}\b/g],
  ['Supabase service-role assignment', /SUPABASE_SERVICE_ROLE(?:_KEY)?\s*[:=]\s*["'`]([^"'`\s]{20,})["'`]/g],
  ['database URL assignment', /DATABASE_URL\s*[:=]\s*["'`]([^"'`\s]{12,})["'`]/g],
  ['client secret assignment', /CLIENT_SECRET\s*[:=]\s*["'`]([^"'`]{12,})["'`]/g],
  ['webhook secret assignment', /WEBHOOK_SECRET\s*[:=]\s*["'`]([^"'`]{12,})["'`]/g],
  ['SMTP password assignment', /SMTP_PASSWORD\s*[:=]\s*["'`]([^"'`]{8,})["'`]/g],
  ['private key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g],
]

const ignoredDirectories = new Set(['.git', 'node_modules', 'dist'])

async function walk(directory, { ignore = false } = {}) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (ignore && entry.isDirectory() && ignoredDirectories.has(entry.name)) continue
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await walk(fullPath, { ignore }))
    else files.push(fullPath)
  }

  return files
}

async function scanProductionBundle(findings) {
  try {
    await fs.access(dist)
  } catch {
    throw new Error('dist/ does not exist. Run npm run build before npm run security:check.')
  }

  const files = (await walk(dist)).filter((file) => /\.(?:html|js|css|json|map|txt)$/i.test(file))

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8')
    const relative = path.relative(root, file)

    for (const [label, marker] of forbiddenProductionMarkers) {
      if (content.includes(marker)) findings.push(`${relative}: leaked ${label} (${marker})`)
    }

    for (const marker of forbiddenBundleSecretMarkers) {
      if (content.includes(marker)) findings.push(`${relative}: possible secret marker (${marker})`)
    }
  }
}

async function scanRepositoryForHardCodedSecrets(findings) {
  const files = await walk(root, { ignore: true })
  const textFiles = files.filter((file) => /\.(?:js|jsx|mjs|cjs|ts|tsx|json|ya?ml|md|txt|html|css|toml|ini|conf)$/i.test(file))

  for (const file of files) {
    const name = path.basename(file)
    if (name === '.env' || (/^\.env\./.test(name) && name !== '.env.example')) {
      findings.push(`${path.relative(root, file)}: tracked environment file must not be committed`)
    }
  }

  for (const file of textFiles) {
    const content = await fs.readFile(file, 'utf8')
    const relative = path.relative(root, file)

    for (const [label, pattern] of hardCodedSecretPatterns) {
      pattern.lastIndex = 0
      if (pattern.test(content)) findings.push(`${relative}: possible hard-coded ${label}`)
    }
  }
}

async function main() {
  const findings = []
  await scanProductionBundle(findings)
  await scanRepositoryForHardCodedSecrets(findings)

  if (findings.length) {
    console.error('\nSECURITY CHECK FAILED\n')
    findings.forEach((finding) => console.error(`- ${finding}`))
    console.error('\nProduction builds must contain only public Cognita functionality. Internal preview workflows, the CEE bank, privileged mutations, and secrets must not ship in dist/ or be hard-coded in tracked source.\n')
    process.exit(1)
  }

  console.log('Security check passed: production bundle contains no known internal preview/CEE markers, and tracked source contains no matching hard-coded secret patterns.')
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
