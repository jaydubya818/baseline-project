# SellerFi

AI-powered marketplace and AI deal execution engine for seller-financed business acquisitions under $10M.
Built with Next.js 16, React 19, Prisma, PostgreSQL, Stripe, and Playwright.

SellerFi is production software handling real financial data, payments, dealrooms, and AI-assisted underwriting.
Correctness, determinism, and trust matter more than speed.

---

## Primary Goal (Read First)

The current objective is to:
- Launch a paid beta
- Validate AI deal evaluation + execution
- Ensure buyer + seller flows work end-to-end in real Chrome
- Monetize via AI-powered premium features

This is not a demo app. Treat all changes as production-grade.

---

## Non-Negotiable Engineering Rules

- **ZERO Chrome console errors** (warnings included unless explicitly whitelisted)
- Real Chrome testing required (Playwright headed Chromium)
- Deterministic logic first, AI second
- Explainable AI outputs only (no black boxes)
- Server-side enforcement > UI-only gating
- All premium features must be entitlement-gated
- No schema resets without explicit user consent

---

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build (runs prisma generate + migrate deploy)
npm run test:e2e     # Run Playwright E2E tests (Chromium required)
npm run db:push      # Push schema changes (dev only)
npm run db:migrate   # Run migrations
```

When debugging auth, server actions, or hydration:
- Always delete `.next` before retesting
- Use a fresh Chrome profile or Incognito

---

## Critical User Flows (Must Always Work)

1. **Buyer signup** → browse → evaluate deal → start dealroom
2. **Seller signup** → create listing → receive info requests
3. **Buyer + seller** → negotiate → progress deal → close
4. **AI Deal Evaluator:**
   - Produces a 0–100 score
   - Lists missing data
   - Explains why the score exists
   - Is testable and repeatable

Any change impacting these flows requires E2E validation.

---

## AI Usage Rules

**AI is allowed for:**
- Drafting messages (info requests, summaries)
- Risk flag explanations
- "Why this deal?" narratives
- Next-step recommendations

**AI is NOT allowed for:**
- Core scoring math (point allocation, weighting, thresholds)
- Financial calculations or projections
- Entitlement, billing, or access-control decisions
- Deal, listing, or dealroom state transitions
- Writing directly to authoritative system-of-record fields

**All AI outputs must include:**
- Inputs used
- Confidence score
- Missing data indicators
- Clear user-facing explanations

---

## Data & Scoring Principles

- Scoring must be deterministic
- LLMs may enhance, not decide
- Missing data must lower confidence, not hallucinate values
- All deal scores must be reproducible with the same inputs

---

## Agent Dispatch (For Complex Work)

For tasks involving multiple domains (frontend + backend + database + auth + payments + AI), use the Agent Organizer system.

Use:
```
@agent-organizer "task description"
```

Prefer agent dispatch for:
- Cross-cutting architectural changes
- Security- or payment-related work
- AI pipeline, scoring, or underwriting logic
- System-wide refactors or migrations

---

## High-Risk Areas (Extra Care Required)

Changes in the following areas require extra validation, explicit reasoning, and end-to-end testing in real Chrome:

- Payments & Stripe
- Authentication, roles, and entitlements
- Prisma schema & migrations
- Dealroom state transitions
- AI scoring inputs, outputs, and explanations

Any modification in these areas must include:
- Clear before/after behavior
- Server-side enforcement (not UI-only)
- Playwright E2E coverage or an explicit reason why not

---

## Background & Async Work

Any long-running, compute-heavy, or batch operation (including deal re-evaluation, AI refresh jobs, notification fan-out, or scoring recomputation) must be implemented via background jobs or async workflows.

Rules:
- Do not block request/response paths with heavy computation
- Prefer queues, scheduled jobs, or event-driven workflows
- All async jobs must be idempotent and retry-safe
- User-facing APIs should return quickly with a clear status

---

## Auth & Security Patterns

```typescript
import { auth } from "@/lib/auth"
const session = await auth()
```

- Enforce roles server-side
- Buyers cannot access seller-only routes
- Sellers cannot access admin routes
- Admin access is explicitly whitelisted

---

## Database Rules

- Prisma schema is the source of truth
- No silent migrations
- No production resets
- Use `select` for performance
- All new models require:
  - Indexes
  - Clear ownership
  - Deletion strategy (soft vs hard)

---

## Documentation

| Guide | Purpose |
|-------|---------|
| [docs/API_REFERENCE.md](docs/API_REFERENCE.md) | API contracts |
| [docs/TESTING.md](docs/TESTING.md) | E2E + Chrome testing |
| [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) | Known failure modes |
| [docs/DATABASE_SETUP.md](docs/DATABASE_SETUP.md) | PostgreSQL + Prisma |
| [docs/STRIPE_SETUP_GUIDE.md](docs/STRIPE_SETUP_GUIDE.md) | Payments & entitlements |

## AI Tooling

| Resource | Purpose |
|----------|---------|
| [.claude/QUICK_START.md](.claude/QUICK_START.md) | Agent orchestration |
| [.claude/SELLERFI_AGENT_CONFIG.md](.claude/SELLERFI_AGENT_CONFIG.md) | Agent rules |
| [.claude/agents/](.claude/agents/) | Specialized sub-agents |

---

## Component & Rendering Rules

- Server Components by default
- `"use client"` only when necessary
- No browser APIs at module scope
- `localStorage` only inside guarded `useEffect`
- Avoid non-deterministic SSR (`Date.now`, `Math.random`)
- Use `dynamic(..., { ssr: false })` for browser-only UI

---

## Release Readiness Checklist

Before merging to default branch:
- [ ] Chrome E2E passes
- [ ] No console errors
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] Prisma schema validated
- [ ] Entitlements verified
- [ ] AI outputs explainable

---

## Mental Model

SellerFi is:
- A deal underwriting engine
- A workflow accelerator
- A trust machine

**If a change reduces clarity, explainability, or trust — it's wrong.**

---

## Agent Orchestration Expectations

SellerFi uses multi-agent execution for complex tasks.

When a task involves:
- Frontend + backend + database changes
- Auth, billing, or entitlements
- AI + deterministic logic
- E2E workflows

Cursor is expected to:
- Decompose the task
- Use sub-agents where appropriate
- Validate integration points before declaring completion

---

## Cursor Rules (Important)

This repository enforces strict, non-negotiable execution rules for Cursor via `.cursorrules`.

If there is ever a conflict between task instructions and `.cursorrules`, **`.cursorrules` always wins**.