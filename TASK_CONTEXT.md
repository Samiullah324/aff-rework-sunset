# Task Context: Demo Content Cleanup

## Ticket Scope

Remove placeholder/demo content from the React frontend and Django backend monorepo while preserving authentication, routing, design-system primitives, health checks, and deploy-critical configuration (Dockerfiles, entrypoints, Vite config).

## Key Implementation Decisions

1. **Dashboard empty state** — Replaced hard-coded metrics and sample jobs table with a centered "No data yet" empty state. Kept `DashboardLayout`, `Sidebar`, and auth-protected routing intact.
2. **Navigation** — Removed sidebar links to unimplemented routes (`/jobs`, `/calendar`, `/clients`, etc.). Only `/dashboard` remains in the sidebar to avoid broken navigation.
3. **Branding** — Replaced Horizon Digital image logos with a text-based `Logo` component driven by `VITE_APP_NAME`. Updated `index.html`, `favicon.svg`, and `content/index.ts` to generic defaults. Deleted branded image assets.
4. **API paths** — Changed `api.ts` default `baseURL` from `http://localhost:8000` to `''` so requests use same-origin `/api/...` paths (works with Vite dev proxy and nginx in deployed environments).
5. **seed_demo** — Removed sample user creation (`alice@example.com`, etc.). Preserved demo admin account (`demo@sunset.dev`) creation/sync via `DEMO_ADMIN_PASSWORD`.
6. **Migrations** — No demo-specific models or migrations existed beyond the core `User` model (`authentication.0001_initial`). No migration changes required.
7. **Design system** — Retained atoms/molecules (`Button`, `Input`, `Logo`, `DashboardCard`, `FormField`) and templates (`DashboardLayout`, `Layout`) as foundation primitives.

## Files Changed

| File | Why |
|------|-----|
| `frontend/src/pages/dashboard/DashboardPage.tsx` | Remove demo metrics/jobs; add empty state |
| `frontend/src/pages/dashboard/DashboardPage.css` | Styles for empty state; remove jobs table styles |
| `frontend/src/components/organisms/Sidebar/Sidebar.tsx` | Remove unimplemented nav items |
| `frontend/src/content/index.ts` | Generic branding/content; add empty state copy |
| `frontend/src/components/atoms/Logo/Logo.tsx` | Text logo from `VITE_APP_NAME` |
| `frontend/src/components/atoms/Logo/Logo.css` | Text logo styles |
| `frontend/src/services/api.ts` | Same-origin API default base URL |
| `frontend/index.html` | Generic title/description/theme-color |
| `frontend/public/favicon.svg` | Generic favicon (replaced branded asset) |
| `frontend/env.example` | Generic app name; empty API base URL |
| `frontend/src/styles/theme.css` | Comment-only branding cleanup |
| `frontend/src/assets/images/*` | Deleted Horizon Digital logo images |
| `frontend/public/vite.svg` | Deleted unused Vite placeholder icon |
| `backend/src/authentication/management/commands/seed_demo.py` | Remove sample users; keep demo admin |

## Validation Performed

- Frontend: `npm run lint` — pass
- Frontend: `npm run build` — pass
- Backend: `python3 manage.py test authentication.tests` — 5 tests pass
- No frontend Jest test suite exists in this project

## Open Questions / Follow-ups

- `DashboardCard` molecule is retained but unused until real dashboard data exists.
- Monorepo README/Makefile still reference "Horizon Digital" for infrastructure naming (`PROJECT_NAME`); left unchanged per scope (deploy/infra files untouched).
- `index.html` title is static "Application"; runtime title could be set from `VITE_APP_NAME` in `main.tsx` if dynamic branding is desired.
