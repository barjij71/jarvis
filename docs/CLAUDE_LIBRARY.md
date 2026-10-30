# Claude Reference Library for JARVIS

This fork contains a small, original reference pack under `jarvis-studio-gui/src/brain/claudeLibrary.ts`. JARVIS selects a compact pack for coding, research, writing, or general requests and appends it to the existing system prompt.

## Important distinction

- This is a **local guidance library**, not the Claude model and not an Anthropic API integration.
- It does not require an Anthropic API key because the guidance is bundled with the app.
- Actual Claude model access requires a separately implemented/available provider and valid credentials or supported sign-in.
- The existing JARVIS tool policy, permission checks, provider routing, and action verification remain authoritative. The library must never grant new tool permissions.
- The starter packs are original concise guidance, not copies of hidden vendor system prompts.

## Adding files from a prompt archive

Keep source files in a separate folder such as `claude-library/imported/` and maintain a manifest containing the filename, source URL or archive, license/provenance status, and a short description. Do not automatically inject every imported file into every conversation: prompt dumps can be stale, oversized, inaccurate, or contain hostile instructions. Review each file, then add a bounded and task-specific summary to the selector.

Before importing the CL4R1T4S archive, verify that each file may be redistributed and that any API keys, credentials, personal data, or accidental secrets are removed. The archive's top-level license does not by itself prove rights to every third-party file.

## Validation

From `jarvis-studio-gui/` run:

```sh
npm run typecheck
npx vitest run src/brain/claudeLibrary.test.ts
npm test
npm run lint
```

These checks must be run in CI or a development environment; creating this change does not itself prove they pass.
