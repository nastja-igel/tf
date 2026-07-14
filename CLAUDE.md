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

When the user says **"Обнови токены"**, **"update tokens"**, or **"update tokens and merge"**:
1. Fetch all variables from Figma file `sVpDRrA1nRbENMMIcS3HqN` via `mcp__claude_ai_Figma__use_figma` (Plugin API)
2. Diff against current `src/tokens.figma.css` and apply changes
3. If on a feature branch — commit to that branch
4. If on `main` — create `chore/tokens-YYYY-MM-DD` branch, commit, push, open PR

When the user says **"update and merge"** or **"update tokens and merge"**, do the full cycle:
1. Steps 1–4 above
2. **Merge the PR** via GitHub API (`PATCH /repos/nastja-igel/tf/pulls/:number/merge`, `merge_method: squash`)
3. Storybook and GitHub Pages rebuild automatically on merge to `main` via CI

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
