# TrendGuard

TrendGuard is a social media data integrity platform with a FastAPI backend, React dashboard frontend, and Docker-based local infrastructure.

## Quick Start

1. Copy env template:
   - `cp .env.example .env`
2. Install backend deps:
   - `cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt`
3. Install frontend deps:
   - `cd frontend && npm install`
4. Run services with Docker:
   - `docker compose up -d`

## Local URLs

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`
- API docs: `http://localhost:8000/docs`
- Prometheus: `http://localhost:9090`
- Grafana: `http://localhost:3000`
