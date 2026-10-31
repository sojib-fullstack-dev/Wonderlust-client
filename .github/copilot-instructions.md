# Copilot instructions for wonderlust-client

## Build, test, and lint

- Install dependencies: `npm install` (or `npm ci` when the lockfile is the source of truth)
- Start the app locally: `npm run dev`
- Production build: `npm run build`
- Lint: `npm run lint`
- There is no `npm test` script or Jest/Vitest setup in this repository.
- For narrow validation, prefer a focused ESLint run such as `npx eslint src/app/page.tsx` or a compile check with `npx next build`.

## High-level architecture

- This is a Next.js 16 App Router project with most application code under `src/app` and reusable UI under `src/components`.
- `src/app/layout.tsx` defines the shared shell for the site: root layout, `Navbar`, `Footer`, and the Google font configuration.
- `src/app/page.tsx` assembles the public landing page from reusable sections in `src/components/home`.
- `src/components/ui/*` is the shadcn-style UI layer; `components.json` is the source of truth for the UI aliases (`@/components`, `@/ui`, `@/lib`, `@/hooks`).
- `src/app/globals.css` owns the Tailwind v4 theme variables and global styles.
- The project is a front-end marketing/travel app rather than a full backend service: there is no API layer, database layer, or server-side data model in the current codebase.
- Routes such as `/destinations`, `/add-destination`, `/my-bookings`, `/profile`, `/login`, and `/signup` appear in navigation but are not implemented unless a page is added explicitly.

## Key conventions

- Use the `@/*` TypeScript path alias for imports that point into the application, instead of relative paths when possible.
- Keep page composition in `src/app`, and keep reusable UI in `src/components`.
- Prefer the existing Tailwind/shadcn patterns and the `cn` helper in `src/lib/utils.ts` rather than introducing a second styling system or ad hoc class concatenation.
- Keep changes aligned with the current landing-page architecture and avoid assuming missing routes or backend services exist.
- There is a current lint caveat in this repo: `npm run lint` can report `react-hooks/set-state-in-effect` in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`; use targeted validation for the files you are changing when needed.

## Repository-specific notes

- The README is the default Next.js starter content; follow the actual app structure in `src/app` and `src/components` over the generated starter instructions.
- This repository was scaffolded with `create-next-app` and is not yet a multi-page product app beyond the current landing-page flow.
