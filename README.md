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
   git clone https://github.com/your-org/rooming-list-app.git
   cd rooming-list-app
   ```

2. **Create env files**

Copy the example and fill in secrets if you like:

```bash
cp .env.example .env
cp frontend/.env.example frontend/.env
```
