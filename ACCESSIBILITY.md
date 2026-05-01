# Accessibility

## Automated checks

| Layer     | Tool                                                                  | Runs                                   |
| --------- | --------------------------------------------------------------------- | -------------------------------------- |
| Lint      | `eslint-plugin-vuejs-accessibility` (recommended)                     | pre-push, CI `lint` job                |
| E2E       | `@axe-core/playwright` — WCAG 2.0 A/AA, critical + serious violations | pre-push (skipped), CI `e2e-tests` job |
| Component | `@storybook/addon-a11y` panel                                         | local Storybook dev                    |

A serious or critical axe violation or an ESLint a11y error will fail CI and block the `build` job.

---

## Manual testing checklist

Run this before merging any PR that touches UI markup, focus management, or interactive components.

### Keyboard navigation

- [ ] Every interactive element (links, buttons, inputs) is reachable by `Tab`
- [ ] `Shift+Tab` moves focus in reverse order
- [ ] Focus order follows the visual reading order
- [ ] No focus traps outside of intentional modal dialogs
- [ ] Modals/dialogs: `Escape` closes them and returns focus to the trigger
- [ ] Dropdowns / menus: `Arrow` keys navigate options, `Enter` selects, `Escape` closes
- [ ] All actions achievable by mouse are also achievable by keyboard alone
- [ ] Visible focus indicator is present at all times (never `outline: none` without a replacement)

### Screen reader (basic smoke — VoiceOver on macOS is fine for a quick check)

**VoiceOver (macOS):** `Cmd + F5` to start · `VO = Ctrl + Option`

- [ ] Page `<title>` is announced on navigation
- [ ] Landmark regions are present: `<header>`, `<main>`, `<nav>`, `<footer>`
- [ ] Headings form a logical hierarchy (one `<h1>` per page, no skipped levels)
- [ ] Images have meaningful `alt` text; decorative images have `alt=""`
- [ ] Icon-only buttons have an accessible label (`aria-label` or visually hidden text)
- [ ] Form inputs have associated `<label>` elements
- [ ] Error messages are associated with their input (`aria-describedby`) and announced
- [ ] Dynamic content changes (toasts, alerts) are announced via a live region (`aria-live`)
- [ ] Theme toggle: announced state makes sense (e.g. "Switch to dark mode")

### Colour and contrast

- [ ] Text contrast meets WCAG AA: 4.5 : 1 for normal text, 3 : 1 for large text
- [ ] UI component contrast (borders, icons) meets 3 : 1
- [ ] Information is not conveyed by colour alone
- [ ] Verify both light and dark themes

### Zoom and motion

- [ ] Page is usable at 200 % browser zoom with no horizontal scrolling on viewport ≥ 1280 px
- [ ] `prefers-reduced-motion` — animations are suppressed or replaced with instant transitions

---

## Tools

| Tool                                                                  | Purpose                                    |
| --------------------------------------------------------------------- | ------------------------------------------ |
| [axe DevTools](https://www.deque.com/axe/devtools/) browser extension | Quick in-browser audit                     |
| Chrome → Accessibility tree (DevTools → Elements → Accessibility)     | Inspect computed roles and names           |
| VoiceOver (macOS built-in)                                            | Screen reader smoke test                   |
| NVDA + Firefox (Windows)                                              | Cross-platform screen reader check         |
| Colour Contrast Analyser (desktop app)                                | Measure contrast ratios for custom colours |
