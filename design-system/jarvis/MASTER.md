# JARVIS — UI/UX Pro Max Design System

> Project-specific design-system adaptation based on the UI/UX Pro Max workflow and guidance. This file is authored for the existing JARVIS React + CSS + Tauri app; it is not a claim that the upstream search CLI was executed.

## Product and platforms
- Product: cross-platform AI voice/chat assistant with system telemetry, agents, task activity, settings, memory, and remote-device controls.
- Primary environments: Android phone and desktop (Windows/Tauri).
- Stack: React JSX + CSS, existing HUD components and CSS custom properties. Preserve current component structure, state, assistant APIs, and platform behavior.

## Visual direction
- Style: AI-native control-room HUD, restrained dark surfaces, precise data hierarchy, subtle atmospheric accent glow.
- Keep the JARVIS identity and the user's chosen accent. Cyan is the default, not a hard-coded requirement for every component.
- Prefer functional contrast and readable telemetry over decorative neon. Use glow for active/live states only; avoid large blurred-glass panels that reduce legibility.
- Use compact, consistent cards and clear grouping. Reserve strong emphasis for the primary action, live status, or a real warning.

## Color tokens
- App base: `--bg-base` (existing near-black).
- Surface: `--bg-surface`; elevated controls: `--bg-elevated`.
- Primary text: `--text-pri`; secondary: `--text-sec`; muted metadata: `--text-muted`.
- Accent: `--accent`; soft accent: `--accent-soft`; borders: `--border`, `--border-soft`.
- HUD uses `--ac` / `--ac2` and `--h-bg` / `--h-card` / `--h-line`. Keep the existing bridge between theme settings and these tokens; do not introduce a second theme engine.
- Semantic colors must communicate state consistently: green/success, amber/caution, red/destructive. Do not use accent color as the only status indicator.

## Typography
- Use the existing platform system sans stack for UI and the existing monospace stack for logs, identifiers, commands, and numeric telemetry.
- Establish hierarchy through weight, spacing, and contrast rather than excessive font-size changes.
- Labels should be concise; long provider names, URLs, model IDs, and user content must wrap or truncate safely without widening the layout.

## Layout and spacing
- Use a consistent 4px base rhythm (4, 8, 12, 16, 20, 24, 32px).
- Group related controls; separate major regions with whitespace and subtle borders rather than multiple competing glows.
- Keep desktop dashboards information-dense but scannable. On phones, prioritize the current task, assistant response, primary action, and status; secondary controls may live in sheets.
- Respect dynamic viewport sizing and display cutouts on mobile. Avoid fixed widths that cause horizontal scrolling.

## Interaction and accessibility
- Every interactive element needs a visible hover (where hover exists), pressed, disabled, and keyboard-focus state.
- Aim for 44×44px touch targets on mobile for primary icon/button controls; do not force desktop controls to be oversized.
- Respect `prefers-reduced-motion`; never communicate success/error only through animation or color.
- Keep focus visible and unobscured. Maintain semantic button/link elements, accessible names for icon-only controls, and logical focus order in dialogs/sheets.
- Make destructive actions visually distinct and reversible where practical. Confirm consequential remote-device actions and keep stop/cancel controls discoverable.
- Use live status text in addition to visual indicators. Errors should explain the issue and a next step.

## Component rules
- Buttons: one clear primary action per region; secondary actions use quiet surfaces; destructive actions remain restrained until intent is clear.
- Cards/panels: neutral surface first, accent border only for hover/selected/live state.
- Status pills: short labels plus icon or text; never rely on a colored dot alone.
- Inputs: explicit labels, readable placeholders, clear focus/error states; preserve typed text during validation.
- Dialogs/sheets: keep actions reachable on small screens, support Escape/back where platform conventions allow, and do not hide the main close/cancel action.
- Telemetry/charts: include units and labels; distinguish unavailable data from zero.

## Motion
- Use short transitions (140–220ms) for state feedback. Use longer animation only for the central JARVIS orb or meaningful mode transitions.
- Follow reduced-motion preferences globally.

## Anti-patterns to avoid
- Hard-coded cyan that overrides the user's selected theme.
- Low-contrast gray text, tiny touch targets, or important labels conveyed only by color.
- Decorative animation that delays actions or causes layout shifts.
- Excessive glass blur, glow, gradients, and nested bordered cards.
- Fixed-width controls that overflow Arabic, English, long model names, or URLs.
- Rebuilding or replacing existing behavior just to achieve a visual change.

## Validation checklist
- [ ] Android narrow viewport: no horizontal overflow; controls reachable with one hand.
- [ ] Desktop wide viewport: telemetry remains aligned and readable.
- [ ] Keyboard-only: focus is visible and dialogs can be exited.
- [ ] Reduced-motion setting: nonessential animation is minimized.
- [ ] Arabic/Darija and English labels: wrapping, alignment, and truncation are correct.
- [ ] Light/dark theme assumptions do not break the existing dark HUD or user-selected accent.
- [ ] Run typecheck, tests, lint, and Vite build; inspect Android and Windows packaging separately.
