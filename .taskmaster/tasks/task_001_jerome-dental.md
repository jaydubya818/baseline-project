# Task ID: 1

**Title:** Project Infrastructure and Monorepo Setup

**Status:** pending

**Dependencies:** None

**Priority:** high

**Description:** Initialize the monorepo structure with apps/web (Next.js), apps/api (FastAPI), apps/local-agent (Python), and packages/shared (Pydantic models).

**Details:**

1. Create monorepo root with workspace configuration
2. Initialize /apps/web with Next.js 14+, TypeScript, Tailwind CSS, Shadcn/UI
3. Initialize /apps/api with Python FastAPI, Poetry/uv for dependencies
4. Initialize /apps/local-agent with Python, Playwright, PyInstaller config
5. Create /packages/shared for Pydantic models shared between Python projects
6. Configure ESLint, Prettier for frontend
7. Configure Ruff, Black for Python projects
8. Set up root-level scripts for building all projects
9. Create .env.example files for each app
10. Set up .gitignore for all project types

**Test Strategy:**

1. Verify each app can be started independently
2. Confirm shared package can be imported in both Python apps
3. Run linters on all projects without errors
4. Verify TypeScript compilation succeeds
5. Confirm Docker build works for each app

## Subtasks

### 1.1. Configure monorepo root with Turborepo or npm workspaces

**Status:** pending  
**Dependencies:** None  

Set up root package.json with workspace configuration and shared scripts

### 1.2. Initialize Next.js app in /apps/web

**Status:** pending  
**Dependencies:** 1.1  

Create Next.js 14+ app with TypeScript, Tailwind CSS, and Shadcn/UI

### 1.3. Initialize FastAPI backend in /apps/api

**Status:** pending  
**Dependencies:** 1.1  

Set up Python FastAPI project with Poetry/uv, configure pyproject.toml

### 1.4. Initialize local agent in /apps/local-agent

**Status:** pending  
**Dependencies:** 1.1  

Create Python project with Playwright, PyInstaller config for Windows .exe

### 1.5. Create shared Pydantic package in /packages/shared

**Status:** pending  
**Dependencies:** 1.3, 1.4  

Set up shared Python package with common Pydantic models and utilities
