Run the full token sync cycle:

1. Check git state and open PRs (GET /repos/nastja-igel/tf/pulls?state=open). If a PR touching tokens.figma.css is already open, coordinate instead of branching blind.
2. Branch fresh from refs/remotes/origin/main: `chore/tokens-YYYY-MM-DD` (append b/c/etc if that name already exists today).
3. Fetch ALL variables from Figma file sVpDRrA1nRbENMMIcS3HqN via mcp__claude_ai_Figma__use_figma using the full resolve script from CLAUDE.md. IMPORTANT: always include `const _ts = Date.now(); void _ts;` at the top of the JS to bust the MCP cache — never skip this line, it ensures a live fetch instead of a cached result.
4. Diff the resolved values against src/tokens.figma.css. Apply only the lines that actually changed.
5. Bump the `Updated:` timestamp in the file header.
6. Commit, push, open PR targeting main, squash-merge immediately.
7. Storybook redeploys automatically via CI — no extra step needed.
