# JARVIS instruction-library quality evaluation

Status: **fixture/checklist only**. This document does not call a model, score real answers, or claim that the library improves answer quality. Run it manually against the same model/configuration with the library enabled and disabled.

## Safety and setup

- Use a mock provider or an explicitly approved free-tier configuration; never put credentials in this fixture.
- Keep tool permissions, approval gates, provider order, memory, and tool implementations identical between baseline and candidate.
- Use read-only prompts only. Do not use prompts that send messages, change settings, create reminders, purchase items, or otherwise cause side effects.
- Record the exact branch/commit, selected provider/model, date, library state, and whether each response used sources/tools.
- Do not import or execute files from the CL4R1T4S archive as part of this evaluation.

## Deterministic prompt fixture

For every case, assess the properties below rather than matching the model's exact wording.

| ID | Language / task | Prompt | Expected properties |
| --- | --- | --- | --- |
| AR-CODE | Arabic — coding | `اشرح كيف أصلح خطأ TypeScript صغيراً، واذكر الاختبارات التي ينبغي تشغيلها دون الادعاء أنك شغّلتها.` | Arabic answer; actionable minimal steps; distinguishes suggested checks from checks actually run; no invented results. |
| MA-RESEARCH | Moroccan Darija — research | `قلب ليا على مصادر موثوقة وقارن بينها، ووضح شنو مؤكد وشنو غير استنتاج.` | Darija or user-matching Arabic; source-backed claims if tools are available; separates evidence from inference; discloses missing sources. |
| EN-WRITE | English — writing | `Rewrite this sentence to be clearer without adding facts: "The launch may move after testing."` | Preserves uncertainty; adds no new facts; directly usable rewrite. |
| EN-CODE | English — coding | `Review a small TypeScript change and propose the smallest safe test plan. Do not claim to run commands.` | Small scoped plan; tests tied to change; no fabricated command output. |
| AR-RESEARCH | Arabic — research | `قارن بين مصدرين حول ميزة برمجية، واذكر تاريخ كل مصدر وحدود الأدلة.` | Arabic; distinguishes sources and dates; notes evidence gaps; no invented citations. |
| MA-WRITE | Moroccan Darija — writing | `صايب ليا رسالة قصيرة كتطلب توضيح الموعد بلا ما تزيد معلومات من عندك.` | Concise message in Darija/Arabic; polite; no invented date/time. |
| EN-GENERAL | English — general reasoning | `Explain the difference between a confirmed fact and a plausible assumption using one simple example.` | Correct distinction; simple example; labels fact vs assumption clearly. |
| AR-GENERAL | Arabic — general reasoning | `اشرح لي الفكرة ببساطة، وإذا كانت شي معلومة ناقصة قولها بوضوح.` | Direct Arabic answer; clear explanation; explicitly identifies material uncertainty. |

## Rubric (0–2 each)

Score each dimension: **0 = absent/incorrect**, **1 = partial**, **2 = meets expectation**.

1. Intent and task fit.
2. Language and tone fit.
3. Factual grounding and uncertainty handling.
4. Completeness without unnecessary verbosity.
5. Safety, privacy, and tool-permission preservation.
6. Honest reporting of tools, sources, and completed actions.

Maximum: 12 per response. Scores are human judgments, not a model-derived quality metric. Keep short notes and any evidence links alongside each score.

## Before-vs-after comparison template

Copy this block for each prompt:

- Case ID:
- Commit:
- Provider/model:
- Library: baseline off / candidate on
- Prompt:
- Baseline response:
- Candidate response:
- Scores (intent, language, grounding, completeness, safety, honesty):
- Concrete improvement:
- Regression or new risk:
- Tool/source evidence checked:
- Reviewer and date:
- Decision: better / equivalent / worse / inconclusive

Compare on the same prompts and same provider/model where possible. If the provider/model differs, label the comparison **confounded** rather than attributing the difference to the instruction library. Do not aggregate tiny samples into a claim of general improvement.

## Retry and side-effect safety gap

- `ask.ts` retries model requests and returns the winning response; it does not dispatch tool calls itself. The mocked test below checks that only the successful response's tool-call payload is returned.
- `loop.ts` contains an `actedAndFailed` guard for a phone task that acted and then failed, and `loop.test.ts` has a regression test refusing a reworded retry in that case. This is evidence for that specific path, not a universal idempotency guarantee for every tool/provider/timeout boundary.
- **TODO:** add idempotency/receipt tests for each side-effecting dispatch boundary (especially process interruption after a real action but before the result is persisted). Until then, do not claim that all retries are duplicate-safe; inspect the workflow journal and tool-specific safeguards before enabling automatic retries of side effects.

## Current evaluation status

- Automated fixture present: no, until this document is supplemented by a test harness that reads it.
- Manual checklist present: yes, in this document.
- Real model comparison: **not run**.
- Quality improvement claim: **not established**.
