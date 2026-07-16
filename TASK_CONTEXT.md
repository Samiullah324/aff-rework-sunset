# Task Context: Dark Mode

## Ticket Scope

Add a user-togglable Dark Mode to the React frontend. This is a UI-only change — no backend models, APIs, or deployment configuration are affected.

## Key Implementation Decisions

1. **Theme context** — Created `ThemeProvider` / `useTheme` in `frontend/src/contexts/themeContext.tsx`. Toggling updates React state and applies a `dark` class on `document.documentElement` so existing CSS variable overrides in `theme.css` take effect app-wide.
2. **Theme toggle UI** — Added a reusable `ThemeToggle` atom (moon/sun icon) in the sidebar (dashboard), auth pages (login/register top-right), and `Header` (for any layout using it).
3. **CSS strategy** — Extended the existing `.dark` block in `theme.css` with main-background and shadow tokens. Migrated hard-coded colors in `Header`, `DashboardLayout`, `LoginPage`, and `DashboardPage` styles to CSS variables so light/dark switch consistently without relying on `prefers-color-scheme` alone.
4. **Testing** — Added Vitest + Testing Library (no prior frontend test runner). Tests verify default light theme, toggle to dark, DOM class application, and toggle back to light.
5. **Persistence** — Theme resets on page reload (in-memory state only). localStorage persistence was intentionally omitted to match the ticket's minimal context spec; can be added as a follow-up.

## Files Changed

| File | Why |
|------|-----|
| `frontend/src/contexts/themeContext.tsx` | Theme state, toggle, and `dark` class on `<html>` |
| `frontend/src/contexts/themeContext.test.tsx` | Unit tests for theme toggling |
| `frontend/src/components/atoms/ThemeToggle/*` | Reusable toggle button component |
| `frontend/src/components/atoms/index.ts` | Export `ThemeToggle` |
| `frontend/src/main.tsx` | Wrap app with `ThemeProvider` |
| `frontend/src/components/organisms/Header/Header.tsx` | Add theme toggle to nav |
| `frontend/src/components/organisms/Header/Header.css` | Use theme CSS variables |
| `frontend/src/components/organisms/Sidebar/Sidebar.tsx` | Add theme toggle in sidebar header |
| `frontend/src/components/organisms/Sidebar/Sidebar.css` | Layout for toggle beside logo |
| `frontend/src/pages/auth/LoginPage.tsx` | Add theme toggle on auth page |
| `frontend/src/pages/auth/RegisterPage.tsx` | Add theme toggle on auth page |
| `frontend/src/pages/auth/LoginPage.css` | Theme-aware colors; toggle positioning |
| `frontend/src/pages/dashboard/DashboardPage.css` | Use theme variables for empty state |
| `frontend/src/components/templates/DashboardLayout/DashboardLayout.css` | Theme-aware main background |
| `frontend/src/styles/theme.css` | Expanded `.dark` variable overrides |
| `frontend/src/index.css` | Theme-aware scrollbar colors |
| `frontend/package.json` | Add `test` script and Vitest/Testing Library dev deps |
| `frontend/package-lock.json` | Lockfile for new dev dependencies |
| `frontend/vite.config.ts` | Vitest configuration |
| `frontend/tsconfig.app.json` | Vitest globals types |
| `frontend/src/test/setup.ts` | Test setup (jest-dom matchers) |

## Validation Performed

- Frontend: `npm run test` — 2 tests pass (2026-07-16)
- Frontend: `npm run lint` — pass, 1 pre-existing-style warning on context hook export (2026-07-16)
- Frontend: `npm run build` — pass (2026-07-16)
- Backend: not touched (no backend changes in scope)

## Branch & PR

- Branch: `sunset/task/3-156bc49e` (rebased onto `cleanup/remove-demo-content` at `8f101a5`)
- PR: https://github.com/Samiullah324/aff-rework-sunset/pull/5 (open against `cleanup/remove-demo-content`)

## Open Questions / Follow-ups

- Persist theme preference in `localStorage` and respect `prefers-color-scheme` on first visit if desired.
- `Header` / `Layout` template is not currently used by auth or dashboard routes; toggle is placed on auth pages and sidebar directly.
- `DashboardCard` and other atoms already use CSS variables and inherit dark mode automatically.
