# TrendGuard

TrendGuard is a social media data integrity project that includes:

- A **marketing/landing page** (`frontend/index.html`)
- A **dashboard page** (`frontend/dashboard.html`)
- A **FastAPI backend** with REST + WebSocket endpoints (`backend/app/main.py`)
- Optional full-stack infrastructure via **Docker Compose** (`docker-compose.yml`)

This README explains exactly what is in this repository and how to run it step by step.

---

## 1) What Is In This Repository

Project structure (important paths):

- `frontend/index.html`  
  Main landing page (static HTML/CSS/JS).
- `frontend/dashboard.html`  
  Main dashboard UI page (static HTML/CSS/JS with Chart.js CDN).
- `backend/`  
  FastAPI application + tests.
- `monitoring/`  
  Prometheus config and Grafana dashboard JSON.
- `.github/workflows/ci-cd.yml`  
  CI pipeline for backend/frontend checks.
- `docker-compose.yml`  
  Local multi-service stack (backend, frontend, postgres, redis, prometheus, grafana).
- `.env.example`  
  Environment variable template.
- `TRENDGUARD_SETUP_GUIDE.md`  
  Full reference setup guide used to build this project.

---

## 2) Prerequisites

Install these first:

- **Node.js** >= 18
- **Python** >= 3.11
- **Git**
- **Docker Desktop** (optional, only if running via Docker)

Check versions:

```bash
node --version
python3 --version
git --version
docker --version
docker compose version
```

If Docker commands fail, install Docker Desktop and make sure it is running.

---

## 3) Clone and Enter Project

```bash
git clone https://github.com/MedhaUdupa/trend-guard.git
cd trend-guard
```

---

## 4) Environment Setup

Copy environment template:

```bash
cp .env.example .env
```

What to edit in `.env`:

- `DB_PASSWORD` -> password for postgres
- `REDIS_PASSWORD` -> password for redis
- `JWT_SECRET` -> long random secret
- `GRAFANA_PASSWORD` -> grafana admin password
- `TWITTER_BEARER_TOKEN` -> optional for live social ingestion

Note: `.env` is ignored by git; only `.env.example` is committed.

---

## 5) Run The Website Fastest (Static HTML Mode)

This mode serves the exact delivered `index.html` and `dashboard.html` files.

From project root:

```bash
cd frontend
python3 -m http.server 4173
```

Open:

- `http://localhost:4173/index.html`
- `http://localhost:4173/dashboard.html`

Use this mode when you want the exact static design/pages immediately.

---

## 6) Run Frontend With Vite (Dev Mode)

From project root:

```bash
cd frontend
npm install
npm run dev
```

Default Vite URL:

- `http://localhost:5173`

Useful frontend commands:

```bash
npm run test
npm run build
npm run lint
```

---

## 7) Run Backend Locally (Without Docker)

From project root:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Backend URLs:

- API root endpoints under:
  - `http://localhost:8000/api/v1/trends`
  - `http://localhost:8000/api/v1/analytics`
  - `http://localhost:8000/api/v1/health`
- Docs (in non-production mode):  
  `http://localhost:8000/docs`
- Metrics:  
  `http://localhost:8000/metrics`
- WebSocket:  
  `ws://localhost:8000/ws/live-trends`

Run backend tests:

```bash
cd backend
source venv/bin/activate
pytest tests -q
```

---

## 8) Run Full Stack With Docker Compose

From project root:

```bash
cp .env.example .env
docker compose up -d --build
```

Services exposed:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`
- Backend docs: `http://localhost:8000/docs`
- Prometheus: `http://localhost:9090`
- Grafana: `http://localhost:3000`

Check service status:

```bash
docker compose ps
docker compose logs -f backend
```

Stop stack:

```bash
docker compose down
```

---

## 9) Git Workflow Used For This Project

Current remote repository:

- `https://github.com/MedhaUdupa/trend-guard`

Typical update flow:

```bash
git checkout main
git pull
# make changes
git add .
git commit -m "Your message"
git push origin main
```

---

## 10) CI/CD Overview

GitHub Actions workflow (`.github/workflows/ci-cd.yml`) runs:

1. Data validation test
2. Backend tests
3. Frontend test + build
4. Deploy job gate after all tests pass

This keeps changes from being merged/deployed with obvious errors.

---

## 11) Troubleshooting

### Docker command not found

- Install Docker Desktop.
- Start Docker Desktop app.
- Re-open terminal.
- Verify with:

```bash
docker --version
docker compose version
```

### Port already in use

If `4173`, `5173`, or `8000` is busy, stop old process or run on a different port.

### Backend import errors in tests

Run tests from `backend/` and ensure venv is active:

```bash
cd backend
source venv/bin/activate
pytest tests -q
```

---

## 12) What To Open First

If you want to see exactly what was delivered visually:

1. Start static server in `frontend/`
2. Open `http://localhost:4173/index.html`
3. Open `http://localhost:4173/dashboard.html`

If you want full application stack:

1. Configure `.env`
2. Run `docker compose up -d --build`
3. Open frontend/backend/monitoring URLs listed above.
