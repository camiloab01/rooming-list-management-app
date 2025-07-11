# Rooming List Management App

A full‐stack application for managing hotel rooming lists by event, built with:

- **Backend**: Node.js, Express, TypeScript, PostgreSQL, JWT auth
- **Frontend**: Vite + React + TypeScript + Tailwind CSS
- **Containerization**: Docker & docker-compose

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started with Docker](#getting-started-with-docker)
3. [Running Locally (Non-Docker)](#running-locally-non-docker)
4. [Project Structure](#project-structure)
5. [Architecture Overview](#architecture-overview)
6. [Key Decisions](#key-decisions)
7. [API Reference](#api-reference)
8. [Frontend Usage](#frontend-usage)
9. [Testing](#testing)
10. [Environment Variables](#environment-variables)

---

## Prerequisites

- Docker & docker-compose
- Node.js ≥ v18 (for local dev)
- npm ≥ v8

---

## Getting Started with Docker

All you need to spin up Postgres, the backend API, and the frontend dev server:

1. **Clone the repo**

   ```bash
   git clone https://github.com/camiloab01/rooming-list-management-app.git
   cd rooming-list-app
   ```

2. **Create env files**

Copy the example and fill in secrets if you like:

```bash
cp .env.example .env
cp frontend/.env.example frontend/.env
```

The default JWT_SECRET in .env will be used by the backend.

3. **Build & start everything**

```bash
docker-compose up -d --build
```

- Postgres on port 5432
- Backend on 8181
- Frontend on 5173

4. **Seed the database (optional)**

```bash
curl -X POST http://localhost:8181/seed \
  -H "Authorization: Bearer <your-admin-jwt>"
```

5. **View your app**

- Backend API docs (via Postman or curl) at `http://localhost:8181`
- Frontend UI at `http://localhost:5173`

6. **Stop everything**

```bash
docker-compose down -v
```

## Running Locally (Non-Docker)

If you prefer to run the frontend on your host for lightning-fast HMR:

```bash
# 1) Start DB + backend in Docker
docker-compose up -d db backend

# 2) In backend/
cd backend
npm ci
npm run dev

# 3) In frontend/
cd ../frontend
npm ci
echo "VITE_API_BASE_URL=http://localhost:8181" > .env
npm run dev
```

## Running Locally (Non-Docker)

```csharp
rooming-list-app/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Express route handlers
│   │   ├── services/         # Business logic
│   │   ├── repositories/     # Raw SQL queries
│   │   ├── middleware/       # JWT auth, error handlers
│   │   ├── models/           # TS interfaces
│   │   ├── db/               # Pg pool setup
│   │   └── routes/           # Express routers
│   ├── init.sql              # DB schema & enums
│   ├── Dockerfile
│   ├── package.json
│   └── jest.config.js
├── frontend/
│   ├── src/
│   │   ├── pages/            # React pages
│   │   ├── components/       # UI components
│   │   └── services/         # Axios API client
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── docker-compose.yml
└── README.md
```

## Architecture Overview

- Layered Backend

  - 1.  Routes → 2. Controllers → 3. Services → 4. Repositories → 5. Postgres

- Frontend

  - Vite for fast builds & HMR
  - React Router for navigation
  - Axios with a paramsSerializer (qs) for multi-value filters
  - Tailwind CSS for utility-first styling
