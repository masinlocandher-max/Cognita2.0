/**
 * Institutional voice check.
 *
 * Cognita's word-usage rules are part of the brand, not a style preference, and
 * a copy rule that is only written down gets broken quietly. This script reads
 * the public website source and fails the build on the language the institute
 * has decided not to use.
 *
 * It checks visible copy only — JSX text, string literals used as content and
 * content data files — not identifiers, imports, routes or code comments.
 *
 * Run with: npm run verify
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

/** Language the institute does not use in public copy. */
const FORBIDDEN = [
  { word: 'revolutionary', why: 'unsupported superiority claim' },
  { word: 'disruptive', why: 'startup jargon' },
  { word: 'game-changing', why: 'unsupported superiority claim' },
  { word: 'world-class', why: 'unsupported superiority claim' },
  { word: 'cutting-edge', why: 'marketing filler' },
  { word: 'next-generation', why: 'marketing filler' },
  { word: 'future-proof', why: 'unsupportable promise' },
  { word: 'unlock your potential', why: 'marketing filler' },
  { word: 'transform your life', why: 'unsupportable promise' },
  { word: 'master ai', why: 'unsupportable promise' },
  { word: 'ai expert', why: 'unsupportable promise' },
  { word: 'guaranteed', why: 'unsupportable promise' },
  { word: 'prestigious', why: 'unsupported superiority claim' },
  { word: 'elite', why: 'positions the institute as exclusive' },
  { word: 'best-in-class', why: 'unsupported superiority claim' },
  { word: 'the leading', why: 'unsupported superiority claim' },
  { word: 'no. 1', why: 'unsupported superiority claim' },
  { word: 'open app', why: 'the Student Portal is not called an app' },
  { word: 'the app', why: 'the Student Portal is not called an app' },
  { word: 'our users', why: 'students are not users' },
  { word: 'customers', why: 'students are not customers' },
  { word: 'our products', why: 'programs are not products' },
]

/** Language that is allowed but must not become a verbal tic. */
const RATIONED = [
  { word: 'journey', max: 2 },
  { word: 'empower', max: 0 },
  { word: 'innovation', max: 1 },
  { word: 'transform', max: 2 },
  { word: 'seamless', max: 0 },
  { word: 'leveraging', max: 0 },
  { word: 'leverage the', max: 0 },
]

const PUBLIC_SOURCES = ['src/pages/public', 'src/content', 'src/app/PublicLayout.jsx']

function collectFiles(target) {
  const stats = statSync(target)
  if (stats.isFile()) return [target]
  return readdirSync(target).flatMap((entry) => collectFiles(join(target, entry)))
}

/**
 * Extracts visible copy: JSX text nodes and quoted strings, minus the things
 * that are code rather than words — imports, className/to/href values, and
 * comment blocks.
 */
function extractCopy(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/^\s*\/\/.*$/gm, ' ')
    .replace(/^import[^\n]*$/gm, ' ')
    .replace(/className=(["'{])[^"'}]*\1/g, ' ')
    .replace(/\b(?:to|href|src|id|htmlFor|name|style)=\{?["'][^"']*["']\}?/g, ' ')
    .replace(/\b(?:to|path)=\{`[^`]*`\}/g, ' ')
}

const failures = []
const warnings = []
const files = PUBLIC_SOURCES.flatMap(collectFiles).filter((file) => /\.(jsx?|mjs)$/.test(file))
const rationedCounts = Object.fromEntries(RATIONED.map((entry) => [entry.word, { count: 0, files: new Set() }]))

files.forEach((file) => {
  const copy = extractCopy(readFileSync(file, 'utf8')).toLowerCase()

  FORBIDDEN.forEach(({ word, why }) => {
    // Word boundaries, so "the appropriate process" is not read as "the app".
    const pattern = new RegExp(`(?<![a-z])${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![a-z])`)
    if (pattern.test(copy)) failures.push(`${file}: "${word}" — ${why}`)
  })

  RATIONED.forEach(({ word }) => {
    const matches = copy.match(new RegExp(`\\b${word}`, 'g'))
    if (!matches) return
    rationedCounts[word].count += matches.length
    rationedCounts[word].files.add(file)
  })
})

RATIONED.forEach(({ word, max }) => {
  const entry = rationedCounts[word]
  if (entry.count > max) {
    failures.push(
      `"${word}" appears ${entry.count} times across the public site (limit ${max}) — ${[...entry.files].join(', ')}`,
    )
  }
})

/*
 * Spelling convention. Cognita writes in Philippine English, which follows
 * American forms — program, enrollment, organized. Mixed conventions on an
 * institutional site read as carelessness.
 */
const BRITISH_FORMS = ['programme', 'enrolment', 'organised', 'personalised', 'recognise', 'behaviour', 'labelled', 'apologise', 'centre']
files.forEach((file) => {
  const copy = extractCopy(readFileSync(file, 'utf8')).toLowerCase()
  BRITISH_FORMS.forEach((form) => {
    if (new RegExp(`\\b${form}`).test(copy)) failures.push(`${file}: "${form}" — Cognita uses American spelling conventions.`)
  })
})

/* The Student Portal must be named correctly wherever it is introduced. */
const portalMentions = files.filter((file) => {
  const copy = extractCopy(readFileSync(file, 'utf8'))
  return /student portal/i.test(copy)
})
if (!portalMentions.length) failures.push('The Student Portal is never named on the public site.')

/* Public pages must not publish the placement thresholds. */
const thresholdPattern = /(80\s?%|70\s?%)[^.]{0,60}(threshold|placement|progress)/i
files.forEach((file) => {
  const copy = extractCopy(readFileSync(file, 'utf8'))
  if (thresholdPattern.test(copy)) failures.push(`${file}: publishes a placement threshold — internal decision rules stay internal.`)
})

if (warnings.length) {
  console.warn('\nVoice warnings:')
  warnings.forEach((warning) => console.warn(`  · ${warning}`))
}

if (failures.length) {
  console.error(`\nInstitutional voice check failed (${failures.length}):`)
  failures.forEach((failure) => console.error(`  ✗ ${failure}`))
  process.exit(1)
}

console.log(`Institutional voice check passed — ${files.length} public source files, ${FORBIDDEN.length} forbidden terms, ${RATIONED.length} rationed terms.`)
