Summary of changes for PR

This PR includes the following fixes and improvements:

- Fix: Contact page runtime error (missing `useEffect` import) and improved client-side validation and toast feedback.
- Fix: Server-side contact validation and relaxed CORS for local development to allow frontend testing.
- Fix: Footer content typos and About page title updated to `YOTIRA`.
- Enhancement: Added error handling and retry UI for Case Studies, Blog, and Careers pages to avoid infinite loading.
- Enhancement: Added Open Graph and Twitter meta tags and a `favicon.svg` to improve sharing and branding.
- Chore: Removed temporary backend test script `backend/test_post.js` and added changelog.

How to test locally:
1. Start backend: `cd backend && npm install && $env:PORT='5000'; node server.js`
2. Start frontend: `cd frontend && npm install && npm run dev`
3. Open http://localhost:5173 (or the port Vite reports) and navigate to Contact.
4. Submit the contact form and verify success toast and entry in backend DB.

Notes:
- CORS is relaxed in development; ensure `NODE_ENV=production` for stricter rules in deployment.
- Replace `/assets/og-image.png` with a real image in `frontend/src/assets` or `public/assets` for correct OG previews.
