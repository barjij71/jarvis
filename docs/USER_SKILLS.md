# JARVIS User Skills

JARVIS can import reusable user-authored skills from Settings → Intelligence → Skills.

## Supported files

- `.md` / `.markdown`: plain Markdown, optionally with simple YAML-style metadata.
- `.txt`: plain-text instructions.
- `.json`: an object with `name`, optional `description`, optional string-array `keywords`, and `content` (or `instructions`).

Markdown example:

```markdown
---
name: Research Helper
description: Verify sources and compare evidence
keywords: research, sources, verify
---
Prefer primary sources. Compare publication dates and distinguish facts from assumptions.
```

JSON example:

```json
{
  "name": "Research Helper",
  "description": "Verify sources and compare evidence",
  "keywords": ["research", "sources", "verify"],
  "content": "Prefer primary sources. Compare publication dates and distinguish facts from assumptions."
}
```

## Limits and storage

- Maximum upload size: 100,000 characters.
- Maximum instruction text per skill: 12,000 characters.
- Maximum saved skills: 50.
- At most 3 enabled skills are included in one prompt, with an aggregate instruction budget of 18,000 characters.
- Skills are stored in the app's local WebView storage under `jarvis.user-skills.v1`; this is local to that app installation/profile and is not automatically synchronized between devices.
- Imported skills are disabled by default. Review the instruction preview, then explicitly enable or disable a skill in Settings. Skills can also be removed; removal deletes the local saved entry.

## Security model

Imported skills are text guidance, not executable plugins. JARVIS does not execute uploaded scripts, install dependencies, register tools, or grant device permissions from a skill file. The prompt frames imported text as untrusted reference material. Existing tool dispatch, approval, permission, and result-verification policies remain authoritative.

Only import files you trust and review their contents before enabling them. A malicious skill can still attempt to manipulate model output, so the application must never treat skill text as authorization to perform an action.

## Validation

Unit coverage is in `src/brain/skillStore.test.ts`. From `jarvis-studio-gui/`, run:

```sh
npm run typecheck
npx vitest run src/brain/skillStore.test.ts
npm test
npm run lint
npm run build
```

The source changes alone do not prove these commands pass; CI or a development environment must execute them.
