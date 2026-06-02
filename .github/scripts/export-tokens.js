#!/usr/bin/env node
/**
 * export-tokens.js
 *
 * Fetches all variables from the jS_mt_ds Figma file via the REST API
 * and writes src/tokens.figma.css.
 *
 * Required env:
 *   FIGMA_TOKEN  — Figma Personal Access Token
 *   FIGMA_FILE   — Figma file key (default: sVpDRrA1nRbENMMIcS3HqN)
 */

'use strict';
const https = require('https');
const fs    = require('fs');
const path  = require('path');

const TOKEN    = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE || 'sVpDRrA1nRbENMMIcS3HqN';
const OUT      = path.resolve(__dirname, '../../src/tokens.figma.css');

if (!TOKEN) {
  console.error('❌  FIGMA_TOKEN env var is required.');
  console.error('    Add it as a GitHub secret: Settings → Secrets → FIGMA_TOKEN');
  process.exit(1);
}

// ── HTTP helper ────────────────────────────────────────────────────
function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'X-Figma-Token': TOKEN } }, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(raw) }); }
        catch (e) { reject(new Error(`JSON parse failed: ${raw.slice(0, 200)}`)); }
      });
    }).on('error', reject);
  });
}

// ── Value formatters ───────────────────────────────────────────────
function toHex({ r, g, b, a = 1 }) {
  if (a < 1) {
    return `rgba(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)},${parseFloat(a.toFixed(2))})`;
  }
  const h = x => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`;
}

function formatFloat(name, val) {
  const needsPx = /font-size|line-height|letter-spacing|paragraph-spacing|paragraph-indent|dimension|\/size\/|radius|spacing/.test(name);
  const clean   = Math.abs(val - Math.round(val)) < 0.0001
    ? Math.round(val)
    : parseFloat(val.toFixed(4));
  return needsPx ? `${clean}px` : clean;
}

function cssVar(name)  { return '--' + name.replace(/\//g, '-'); }
function pad(n, len)   { return String(n).padEnd(len); }

// ── Alias resolver ─────────────────────────────────────────────────
function resolve(varId, vars, cols, depth = 0) {
  if (depth > 8) return null;
  const v = vars[varId];
  if (!v) return null;
  const col    = cols[v.variableCollectionId];
  const modeId = col.defaultModeId;
  const val    = v.valuesByMode[modeId];
  if (val && typeof val === 'object' && val.type === 'VARIABLE_ALIAS') {
    return resolve(val.id, vars, cols, depth + 1);
  }
  return { type: v.resolvedType, value: val, sourceName: v.name };
}

function renderValue(v, rawVal, vars, cols) {
  let val = rawVal;

  // Follow alias chain
  if (val && typeof val === 'object' && val.type === 'VARIABLE_ALIAS') {
    const r = resolve(val.id, vars, cols);
    if (!r) return null;
    val = r.value;
  }

  if (val === undefined || val === null) return null;

  switch (v.resolvedType) {
    case 'COLOR':   return toHex(val);
    case 'STRING':  return val;
    case 'BOOLEAN': return String(val);
    case 'FLOAT':   return formatFloat(v.name, val);
    default:        return String(val);
  }
}

// ── Main ───────────────────────────────────────────────────────────
async function main() {
  console.log(`Fetching variables from ${FILE_KEY}…`);

  const { status, body } = await get(
    `https://api.figma.com/v1/files/${FILE_KEY}/variables/local`
  );

  if (status === 403 || body.error) {
    console.error(`❌  Figma API returned ${status}: ${body.message || JSON.stringify(body)}`);
    if (status === 403) {
      console.error('    The Variables REST API requires a Figma Professional plan or higher.');
      console.error('    If you are on a paid plan, ensure FIGMA_TOKEN has file:read scope.');
    }
    process.exit(1);
  }

  const { variables, variableCollections } = body.meta;
  const varCount = Object.keys(variables).length;
  console.log(`   ${varCount} variables in ${Object.keys(variableCollections).length} collections`);

  // Group var IDs by collection, preserving Figma order
  const byCollection = [];
  for (const [colId, col] of Object.entries(variableCollections)) {
    const colVars = Object.values(variables)
      .filter(v => v.variableCollectionId === colId);
    byCollection.push({ col, vars: colVars });
  }

  // ── Build CSS ──────────────────────────────────────────────────
  const now    = new Date().toISOString().slice(0, 16) + ' UTC';
  const lines  = [
    '/* ================================================================',
    '   AUTO-GENERATED — do not edit by hand.',
    `   Source : Figma file ${FILE_KEY} (jS_mt_ds)`,
    `   Updated: ${now}`,
    '   ================================================================ */',
    '',
    ':root {',
  ];

  for (const { col, vars: colVars } of byCollection) {
    const bar = '─'.repeat(Math.max(2, 50 - col.name.length));
    lines.push('', `  /* ── ${col.name} ${bar} */`);

    const modeId = col.defaultModeId;

    for (const v of colVars) {
      const rawVal = v.valuesByMode[modeId];
      if (rawVal === undefined) continue;

      const cssValue = renderValue(v, rawVal, variables, variableCollections);
      if (cssValue === null) {
        lines.push(`  /* ${cssVar(v.name)}: unresolved alias */`);
        continue;
      }
      lines.push(`  ${cssVar(v.name)}: ${cssValue};`);
    }
  }

  lines.push('', '}', '');

  const css = lines.join('\n');
  fs.writeFileSync(OUT, css, 'utf8');

  const propCount = lines.filter(l => l.trim().startsWith('--')).length;
  console.log(`✅  Written ${path.relative(process.cwd(), OUT)}`);
  console.log(`   ${propCount} CSS custom properties`);
}

main().catch(err => { console.error('❌ ', err.message); process.exit(1); });
