Vercel deployment guide (frontend)
=================================

This project can deploy the frontend to Vercel as a static site (Vite build). The backend is an Express app and should be deployed separately (e.g., Render, DigitalOcean, or a Docker host). Configure the frontend to use the backend via an environment variable `VITE_API_URL`.

Steps:

1. In Vercel, create a new project and import this Git repository.
2. When prompted, set the project root to `frontend` (deploy only the frontend folder).
3. Build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. Add Environment Variables in the Vercel project settings:
   - `VITE_API_URL` = https://your-backend-url (e.g., https://api.example.com)

5. Deploy. Vercel will run the build and publish the static site.

Notes:
- The frontend reads the backend base URL from `VITE_API_URL`. Locally it falls back to `http://localhost:5000`.
- For server/API hosting, deploy the `backend` separately and point `VITE_API_URL` to that host.
