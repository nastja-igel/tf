# mt_ds — Claude Code Instructions

## Branching workflow

**Always start work on a feature branch. Never commit directly to `main`.**

At the start of every session:
```bash
git checkout develop          # or main if develop is stale
git pull origin develop
git checkout -b feat/short-description   # or fix/ chore/ refactor/
```

At the end of every session, create a PR:
- Use `Invoke-RestMethod` (PowerShell) — `gh` CLI is not available
- Target branch: `main`
- GitHub token stored in memory

Branch naming:
| Prefix | Use for |
|---|---|
| `feat/` | New features, new stories, new components |
| `fix/` | Bug fixes, build failures, broken tests |
| `chore/` | Token syncs, dependency updates, config |
| `refactor/` | Restructuring without behaviour change |

## Token sync (Обнови токены / "update tokens" / "update and merge")

The token collection structure is: **Primitives** (single "Value" mode) and **Semantic**
(modes "Light"/"Dark" — only "Light" is exported to CSS; there is no dark-mode CSS block).

When the user says **"Обнови токены"**, **"update tokens"**, or **"update tokens and merge"**:

1. **Start from a clean base — never reuse an old local chore branch:**
   ```bash
   git fetch origin main
   ```
   Check for other open PRs touching `src/tokens.figma.css` first (`GET /repos/nastja-igel/tf/pulls?state=open`,
   then check each PR's changed files) — if one exists, that's a parallel sync in flight; coordinate
   instead of branching blind. Otherwise branch fresh: `git checkout -b chore/tokens-YYYY-MM-DD refs/remotes/origin/main`.

2. **Fetch + resolve all tokens in a single `use_figma` call** (avoids the multi-round-trip
   JSON-eyeballing and manual RGB→hex math that slowed this down previously). Formats colors/numbers
   inline so the result is ready to diff directly against the CSS file:
   ```js
   const _ts = Date.now(); void _ts; // cache-buster — keeps every call unique so MCP never returns a stale cached result
   const collections = await figma.variables.getLocalVariableCollectionsAsync();
   const primitivesCol = collections.find(c => c.name === 'Primitives');
   const semanticCol = collections.find(c => c.name === 'Semantic');
   const valueModeId = primitivesCol.modes[0].modeId;
   const lightModeId = semanticCol.modes.find(m => m.name === 'Light').modeId;

   function fmtColor(c) {
     const hex = n => Math.round(n * 255).toString(16).padStart(2, '0');
     const a = c.a === undefined ? 1 : c.a;
     if (a >= 1) return '#' + hex(c.r) + hex(c.g) + hex(c.b);
     const rgb = n => Math.round(n * 255);
     return `rgba(${rgb(c.r)},${rgb(c.g)},${rgb(c.b)},${Math.round(a * 1000) / 1000})`;
   }
   const fmtNum = n => Math.round(n * 1000) / 1000;

   async function resolve(id, modeId, depth = 0) {
     if (depth > 12) return null;
     const v = await figma.variables.getVariableByIdAsync(id);
     let val = v.valuesByMode[modeId];
     if (val === undefined) val = Object.values(v.valuesByMode)[0];
     if (val && typeof val === 'object' && val.type === 'VARIABLE_ALIAS') {
       return resolve(val.id, modeId, depth + 1);
     }
     return { value: val, type: v.resolvedType };
   }

   const primVars = await Promise.all(primitivesCol.variableIds.map(id => figma.variables.getVariableByIdAsync(id)));
   const primitives = {};
   for (const v of primVars) {
     // primitives can alias other primitives (e.g. radius/sm -> dimension/size/8) — must resolve, not read raw
     const r = await resolve(v.id, valueModeId);
     primitives[v.name] = r.type === 'COLOR' ? fmtColor(r.value) : r.type === 'FLOAT' ? fmtNum(r.value) : r.value;
   }

   const semVars = await Promise.all(semanticCol.variableIds.map(id => figma.variables.getVariableByIdAsync(id)));
   const semantic = {};
   for (const v of semVars) {
     const r = await resolve(v.id, lightModeId);
     semantic[v.name] = r.type === 'COLOR' ? fmtColor(r.value) : r.type === 'FLOAT' ? fmtNum(r.value) : r.value;
   }

   return { primitives, semantic };
   ```
3. Diff the returned values against `src/tokens.figma.css` (name mapping is `color/x/y` → `--color-x-y`,
   `dimension/size/N` → `--dimension-size-N`, etc.) and edit only the lines that actually changed —
   most syncs touch 1–4 lines, not the whole file. Bump the `Updated:` header timestamp.
4. Commit to the fresh branch, push, open a PR targeting `main`.

When the user says **"update and merge"** or **"update tokens and merge"**, do the full cycle:
1. Steps 1–4 above
2. **Merge the PR** via GitHub API (`PATCH /repos/nastja-igel/tf/pulls/:number/merge`, `merge_method: squash`)
3. Storybook and GitHub Pages rebuild automatically on merge to `main` via CI

**Note:** this repo has stray local refs (a local branch literally named `origin/main`, alongside the
real `refs/remotes/origin/main`) that make `origin/main` an ambiguous ref in some git commands. Always
disambiguate with the explicit `refs/remotes/origin/main` form when scripting against main's tip.

## Key files

| File | Purpose |
|---|---|
| `src/tokens.figma.css` | Auto-generated — Figma export, do not edit |
| `src/tokens.css` | App-specific extensions + visual-parity overrides |
| `src/stories/Colors.stories.tsx` | Live color palette in Storybook |

## GitHub

- Repo: `nastja-igel/tf`
- Remote URL uses PAT (see memory `reference_github_token.md`)
- PRs via `Invoke-RestMethod` to `https://api.github.com/repos/nastja-igel/tf/pulls`
- `gh` CLI is unavailable

## Figma

- Working file: `sVpDRrA1nRbENMMIcS3HqN` (jS_mt_ds) — components + tokens
- Library file: `QR1l96ckjmA9QeZyCVzTi2` (mt_ds) — reference only, not the token source
- MCP Plugin API node: `92:2` (Components page)
