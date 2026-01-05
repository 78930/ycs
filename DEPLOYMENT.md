Deployment guide
===============

This repository can be deployed using Docker + docker-compose for local or server deployments, or via GitHub Actions to build & push images to Docker Hub.

Quick local run (requires Docker Engine and Docker Compose):

1. Build and run services:

```bash
docker compose up --build
```

2. Services:
- Frontend: http://localhost (nginx serves built files on port 80)
- Backend: http://localhost:5000 (Express API)
- MongoDB: mongodb://mongo:27017/multi-service (internal network)

GitHub Actions (automated build & push):
1. Add the following repository secrets:
  - `DOCKERHUB_USERNAME` — your Docker Hub username
  - `DOCKERHUB_TOKEN` — a Docker Hub access token (or password)

2. Push to the `main` branch. The action will build the `backend` and `frontend` images and push them to Docker Hub under the tags:
  - `${{ secrets.DOCKERHUB_USERNAME }}/multi-service-backend:latest`
  - `${{ secrets.DOCKERHUB_USERNAME }}/multi-service-frontend:latest`

Notes and next steps:
- If you want to deploy to a cloud provider (e.g., AWS ECS, Azure, DigitalOcean App Platform, or Kubernetes), use the pushed images or adapt `docker-compose.yml` to a production-ready manifest.
- Configure environment variables for production (e.g., `MONGODB_URI`, `PORT`, and CORS origins) via your hosting provider.
- If you prefer serving the frontend via a CDN or a static host (Vercel, Netlify), deploy the `frontend/dist` build output instead of the Docker image.
