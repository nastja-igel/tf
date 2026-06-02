#!/usr/bin/env node
/**
 * figma-tokens.mjs
 * Fetches local variables from the Figma design-system file and writes
 * them as CSS custom properties to src/tokens.figma.css.
 * tokens.css imports that file so the rest of the sheet stays hand-crafted.
 *
 * Usage:
 *   FIGMA_TOKEN=<PAT> FIGMA_FILE_KEY=<key> node scripts/figma-tokens.mjs
 */

import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// ── Config ────────────────────────────────────────────────────────────────

const FILE_KEY = process.env.FIGMA_FILE_KEY || 'QR1l96ckjmA9QeZyCVzTi2'
const TOKEN    = process.env.FIGMA_TOKEN

if (!TOKEN) {
  console.error('❌  FIGMA_TOKEN env var is required')
  process.exit(1)
}

// ── Fetch ─────────────────────────────────────────────────────────────────

console.log(`→  Fetching variables from Figma file ${FILE_KEY} …`)

const res = await fetch(
  `https://api.figma.com/v1/files/${FILE_KEY}/variables/local`,
  { headers: { 'X-Figma-Token': TOKEN } }
)

if (!res.ok) {
  const body = await res.text()
  console.error(`❌  Figma API ${res.status}: ${body}`)
  process.exit(1)
}

const { meta } = await res.json()
const { variables = {}, variableCollections = {} } = meta

// ── Helpers ───────────────────────────────────────────────────────────────

/** Recursively resolve VARIABLE_ALIAS chains → raw value */
function resolveValue(value, allVars, depth = 0) {
  if (depth > 20) return null
  if (value?.type === 'VARIABLE_ALIAS') {
    const ref = allVars[value.id]
    if (!ref) return null
    const firstModeId = Object.keys(ref.valuesByMode)[0]
    return resolveValue(ref.valuesByMode[firstModeId], allVars, depth + 1)
  }
  return value
}

/** {r,g,b,a} (0-1) → #rrggbb or rgba(...) */
function toColor({ r, g, b, a }) {
  const ch = (n) => Math.round(n * 255).toString(16).padStart(2, '0')
  if (a >= 0.999) return `#${ch(r)}${ch(g)}${ch(b)}`
  return `rgba(${Math.round(r*255)}, ${Math.round(g*255)}, ${Math.round(b*255)}, ${+a.toFixed(3)})`
}

/** "Brand/ink default" → "brand-ink-default" → CSS var name "--brand-ink-default" */
function toVarName(name) {
  return name
    .trim()
    .replace(/\//g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .replace(/-{2,}/g, '-')
    .toLowerCase()
}

// ── Transform ─────────────────────────────────────────────────────────────

const lines = []
let skipped = 0

for (const col of Object.values(variableCollections)) {
  const modeId = col.defaultModeId

  lines.push('')
  lines.push(`  /* ── ${col.name} ${'─'.repeat(Math.max(0, 40 - col.name.length))} */`)

  for (const varId of col.variableIds) {
    const v = variables[varId]
    if (!v) continue

    const raw      = v.valuesByMode[modeId]
    const resolved = resolveValue(raw, variables)
    if (resolved === null) { skipped++; continue }

    const name = toVarName(v.name)
    let value

    switch (v.resolvedType) {
      case 'COLOR':
        value = toColor(resolved)
        break
      case 'FLOAT':
        // Dimensionless numbers stay unitless (opacity, font-weight);
        // values ≥ 1 that look like sizes get px.
        if (typeof resolved === 'number') {
          value = resolved < 1 && resolved > 0 ? String(resolved) : `${resolved}px`
        } else {
          value = String(resolved)
        }
        break
      case 'STRING':
        value = String(resolved)
        break
      default:
        skipped++
        continue
    }

    lines.push(`  --${name}: ${value};`)
  }
}

// ── Write tokens.figma.css ────────────────────────────────────────────────

const stamp = new Date().toISOString().replace('T', ' ').slice(0, 16)
const css = `/* ================================================================
   AUTO-GENERATED — do not edit by hand.
   Source : Figma file ${FILE_KEY}
   Updated: ${stamp} UTC
   Run    : node scripts/figma-tokens.mjs
   ================================================================ */

:root {
${lines.join('\n')}
}
`

const outPath = join(ROOT, 'src', 'tokens.figma.css')
writeFileSync(outPath, css, 'utf8')
console.log(`✅  Wrote ${lines.filter(l => l.trim().startsWith('--')).length} tokens → src/tokens.figma.css (${skipped} skipped)`)

// ── Ensure tokens.css imports the generated file ──────────────────────────

const tokensPath    = join(ROOT, 'src', 'tokens.css')
const importLine    = "@import './tokens.figma.css';"

if (existsSync(tokensPath)) {
  const src = readFileSync(tokensPath, 'utf8')
  if (!src.includes(importLine)) {
    writeFileSync(tokensPath, importLine + '\n\n' + src, 'utf8')
    console.log('✅  Prepended import to src/tokens.css')
  } else {
    console.log('ℹ️   src/tokens.css already imports tokens.figma.css')
  }
}
