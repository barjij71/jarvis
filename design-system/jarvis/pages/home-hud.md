# Home HUD — Page Override

This page inherits `design-system/jarvis/MASTER.md`. These rules apply only to the main HUD/home view.

## Priority order
1. Assistant state and the primary user task
2. JARVIS orb / listening-speaking state
3. Live system and task status
4. Useful telemetry and panels
5. Secondary navigation and configuration

## Layout
- Keep the existing responsive grid and user-configurable background/density settings.
- On narrow screens, prevent telemetry panels from squeezing the assistant or creating horizontal overflow.
- Prefer two or fewer levels of nested surface/border styling.
- Maintain a stable layout while live telemetry updates; numbers may change but panel geometry should not jump unnecessarily.

## State clarity
- Idle, listening, thinking, speaking, disconnected, warning, and error states must be distinguishable through text/icon/state as well as accent color.
- The orb's glow may reflect active state, but status text remains available.
- Avoid animation that competes with response text or makes controls difficult to tap.

## Responsive behavior
- Phone: primary interaction and current status stay immediately reachable; touch targets should be about 44px; secondary panels may scroll or open in sheets.
- Desktop: retain efficient information density, consistent panel alignment, and keyboard access.
- Test Arabic/Darija and English content, long model/provider labels, and long numbers for wrapping and clipping.

## Interaction
- Focus indicator must remain visible over both the dark base and accent-tinted panels.
- Hover styling is desktop-only; touch users still need pressed/selected/disabled feedback.
- Panel expansion should not steal focus or unexpectedly reset scroll position.
- Honor reduced-motion settings from the master design system.
