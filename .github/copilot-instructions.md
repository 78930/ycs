<!-- Copilot instructions for agents working on this repository -->
# Copilot instructions — multi-service-website

Purpose
- Help contributors and AI agents quickly make safe, correct changes to this repo (Express + React).

Quick architecture (what to know first)
- Backend: Express server at [backend/server.js](backend/server.js#L1) exposing REST endpoints under `/api/*`. Models live in [backend/models](backend/models) and routes in [backend/routes](backend/routes).
- Frontend: Vite + React app in [frontend](frontend) (entry: [frontend/src/main.jsx](frontend/src/main.jsx#L1)). Routing is handled in [frontend/src/App.jsx](frontend/src/App.jsx#L1).
- Data flow: Frontend calls backend APIs directly (axios uses absolute URLs like `http://localhost:5000/api/...`). Backend persists to MongoDB via Mongoose (see `MONGODB_URI` env).

Run & debug (developer workflows)
- Backend:
  - Install: `cd backend && npm install`
  - Dev: `npm run dev` (uses `nodemon`, server listens on `PORT` or 5000)
  - Env: set `MONGODB_URI`, `PORT`, and optional `CORS_ORIGIN` (default `http://localhost:5173`).
- Frontend:
  - Install: `cd frontend && npm install`
  - Dev: `npm run dev` (Vite on port 5173 by default)
  - Build/preview: `npm run build` / `npm run preview`

Project-specific patterns & gotchas (do not assume defaults)
- API host is hard-coded in many places to `http://localhost:5000` (search for `http://localhost:5000` in `frontend/src`). If you change backend port or add a proxy, update these callers.
- Routes and page filenames: some page filenames and route paths contain spaces (e.g., `frontend/src/pages/IT services.jsx` and routes like `/IT services`). Prefer normalizing names when refactoring — keep backward compatibility for route paths unless you update all links.
- Contact form: `POST /api/contacts/send` expects {name,email,phone,company,service,subject,message}. The schema is in [backend/models/Contact.js](backend/models/Contact.js#L1).
- Error handling: backend returns JSON errors and has middleware for 404 + 500 in [backend/server.js](backend/server.js#L1). Keep responses JSON-shaped for consistency.

Integration points & environment
- MongoDB: connection set from `process.env.MONGODB_URI` (fallback `mongodb://localhost:27017/multi-service`).
- CORS: configured in `server.js` and allows `CORS_ORIGIN` — useful when running frontend separately.
- Email notifications: TODO placeholders exist (e.g., after saving contact). Agents should not assume email delivery is implemented.

Code conventions & where to make edits
- Backend: add routes to `backend/routes/*.js`, models to `backend/models/*.js`. Export routers via `module.exports = router` and mount in `server.js`.
- Frontend: components under `frontend/src/components`, pages under `frontend/src/pages`. Use React Router `element` pattern already present in `App.jsx`.

Examples (copyable)
- Save contact (frontend call):
  - POST `http://localhost:5000/api/contacts/send` body -> contact schema fields.
- Fetch blogs (frontend):
  - GET `http://localhost:5000/api/blogs`

When editing or adding features
- Run both apps locally (frontend `5173`, backend `5000`) and test flows that touch both sides (e.g., contact form, blog listing).
- If you change an API shape, update all frontend callers and document the change in the PR description.

What I couldn't discover automatically
- Deployment config (CI/CD) and production environment variables are not present in the repo — ask the team for infra details before changing runtime configs.

If anything here is unclear or you want me to expand examples (e.g., add common axios helpers, standardize routes), tell me which area to refine.
