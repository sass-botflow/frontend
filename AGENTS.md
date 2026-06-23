# AGENTS.md

## Cursor Cloud specific instructions

### Repo layout
- This workspace has two repos: `frontend` (this repo) and `backend` (https://github.com/sass-botflow/backend).
- This is a React 19 + TypeScript + **Vite** SPA. Standard commands live in `README.md` (`npm run dev`, `npm run build`, `npm run lint`).

### Running / testing
- The frontend is a pure API client — it needs the **backend running on `http://localhost:3001`** to do anything useful (auth, bots, workflows). Start the backend first (see the backend repo's README/AGENTS.md), then `npm run dev` here.
- Dev server runs on **port 5173** with `strictPort: true` (set in `vite.config.ts`). The backend's CORS allow-list is exactly `http://localhost:5173`, so do not change the port without also updating the backend `CORS_ORIGIN`.
- Override the API base URL with `VITE_API_URL` (e.g. in `.env`); it defaults to `http://localhost:3001`.
- Linting is **oxlint** (not ESLint), configured in `.oxlintrc.json`. `react/only-export-components` is enabled, so keep React components in their own files (hooks/contexts are split into separate files under `src/auth/` for this reason).
- `tsconfig.app.json` sets `verbatimModuleSyntax` + `noUnusedLocals`/`noUnusedParameters`, so use `import type { ... }` for type-only imports and avoid unused identifiers or the build (`tsc -b`) will fail.

### Auth/session note
- The JWT and the user object are persisted in `localStorage` (`botflow_token` / `botflow_user`). There is no backend "current user" endpoint, so the session is restored from `localStorage` on load; clearing it logs the user out.
