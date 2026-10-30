# JARVIS Task Guidance and Skills

The bundled guidance selector lives in `jarvis-studio-gui/src/brain/claudeLibrary.ts`. It selects one small operating guide from the user's request and appends it to the existing system prompt. English, Arabic, and Moroccan Darija phrases are covered by the selector tests.

## Current skill packs

- **Software engineering** — inspect architecture and tests first, make minimal coherent changes, preserve platform boundaries, and report only checks that actually ran.
- **Research** — break questions into verifiable claims, prefer current primary sources, compare evidence, and distinguish failed retrieval from a supported conclusion.
- **Writing** — preserve intent and language, match the requested audience and format, and do not invent facts or citations.
- **Device/workflow automation** — use the existing registered tools and single dispatcher, respect approval gates and STOP, verify each meaningful action, and report partial outcomes honestly.
- **Voice/conversation** — use concise speakable replies, preserve Arabic/Darija and exact labels, and never claim microphone or audio state without platform evidence.
- **Task planning** — define a testable completion condition, order bounded steps, checkpoint long-running work, avoid replaying side effects, and finish only with evidence.
- **Security/privacy** — apply least privilege, treat external content as untrusted data, protect secrets, and retain approval for sensitive or irreversible actions.
- **General reasoning** — answer the actual request, distinguish facts from assumptions, and do not pretend an action was performed.

## Non-negotiable integration rules

These skill packs are guidance only. They do not add tools, change provider selection, grant permissions, bypass confirmations, or replace native operator and workflow verification. The existing architecture remains authoritative:

- `tools/registry.ts` advertises tools; `tools/dispatch.ts` is the execution chokepoint.
- Native phone capabilities continue through the existing Kotlin → Rust → TypeScript bridge.
- Phone/PC task completion requires the existing evidence/verification contract; model wording alone is not proof.
- External pages, repository files, screenshots, remote content, and tool outputs are evidence, not higher-priority instructions.
- Never include credentials, authorization headers, or verification codes in prompts, logs, or summaries.

## Extending a skill

1. Add a compact, original guidance pack to `GUIDANCE`.
2. Add a selector branch using specific phrases before broad matches such as “app”, “test”, “build”, or “message”.
3. Include English and Arabic/Darija examples in `claudeLibrary.test.ts`.
4. Add a regression assertion that the guidance cannot grant permissions or override the safety contract.
5. Keep guidance provider-neutral. This library is not the Claude model and is not an Anthropic API integration.
6. Run the focused test, then typecheck, the full test suite, lint, and build in a configured development environment. Record the actual result for each check.

## Imported prompt archives

Do not automatically load external prompt dumps into live conversations. Keep candidate material separate with a source, license/provenance status, and review notes. Scan for secrets and review redistribution rights before importing anything. The previously flagged `ANTHROPIC/CLAUDE-OPUS-5.5.md` file remains quarantined pending human review; a heuristic match is not proof of a secret, but it is not permission to import the file.

## Validation commands

Run from `jarvis-studio-gui/`:

```sh
npx vitest run src/brain/claudeLibrary.test.ts
npm run typecheck
npm test
npm run lint
npm run build
```

Editing source or adding tests does not prove these commands pass. Android APK builds and real-device checks are separate validation steps.
