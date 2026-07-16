# TASK_CONTEXT — Remove Template Scaffolding

## Ticket scope

Remove demo/template scaffolding from the Horizon Digital monorepo starter so the frontend and backend present a minimal, production-ready baseline: empty dashboard state, generic branding, no mock data, and a seed command that only provisions the admin test user.

## Key implementation decisions

1. **Dashboard empty state** — Replaced hardcoded metrics and sample jobs table with a single "No data yet" message inside the existing `DashboardLayout`, preserving auth flow and layout components.
2. **Sidebar navigation** — Removed placeholder routes (Jobs, Calendar, Clients, Employees, Invoicing, Settings) that had no backing pages; kept Dashboard and Logout only.
3. **Branding** — Replaced Horizon Digital logos, favicon, and copy with generic "App" text branding via the existing `Logo` component and `content/index.ts` CMS. Deleted template image assets.
4. **Reusable components retained** — `DashboardCard` and other layout/auth components remain for future feature work; they are no longer wired to demo data.
5. **Backend seed command** — `seed_demo` now only creates/updates the `demo@sunset.dev` admin user from `DEMO_ADMIN_PASSWORD`. Sample users (`alice@example.com`, etc.) were removed. No model changes; migrations unchanged.
6. **Deploy contract** — `.sunset/deploy.yaml` unchanged; it still references `seed_demo` and `demo_login`, which remain valid.

## Files changed

| Area | File | Why |
|------|------|-----|
| Frontend | `frontend/src/pages/dashboard/DashboardPage.tsx` | Remove mock metrics/jobs; show empty state |
| Frontend | `frontend/src/pages/dashboard/DashboardPage.css` | Styles for empty state; remove demo table styles |
| Frontend | `frontend/src/components/organisms/Sidebar/Sidebar.tsx` | Remove unimplemented nav links |
| Frontend | `frontend/src/content/index.ts` | Generic branding and simplified content keys |
| Frontend | `frontend/src/components/atoms/Logo/Logo.tsx` | Text-based logo placeholder |
| Frontend | `frontend/src/components/atoms/Logo/Logo.css` | Text logo styles |
| Frontend | `frontend/index.html` | Generic title and meta description |
| Frontend | `frontend/public/favicon.svg` | Simple placeholder favicon |
| Frontend | `frontend/src/assets/images/*` (deleted) | Remove Horizon Digital template logos |
| Frontend | `frontend/public/vite.svg` (deleted) | Remove default Vite template asset |
| Backend | `backend/src/authentication/management/commands/seed_demo.py` | Remove sample user seeding; keep admin user |
| Docs | `TASK_CONTEXT.md` | Ticket context for branch handoff |

## Verification performed

- `npm run lint` (frontend) — pass
- `npm run build` (frontend) — pass
- `python3 manage.py test authentication` (backend, sqlite) — 5 tests pass
- `python3 .sunset/validate_deploy_contract.py` — pass

## Open questions / follow-ups

- Monorepo-level env files (`env.example`, `Makefile`, `README.md`) still reference "Horizon Digital" naming for infrastructure; left unchanged per scope (app UI/backend seed only).
- `DashboardCard` molecule is unused after this change; safe to remove in a follow-up if desired.
- Frontend has no Jest test suite configured (`frontend/Makefile` has no `test` target).
