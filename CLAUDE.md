# SellerFi

AI-powered B2B seller financing marketplace built with Next.js 16, React 19, Prisma, and Stripe.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build (runs prisma generate + migrate deploy)
npm run test:e2e     # Run Playwright E2E tests
npm run db:push      # Push schema changes (dev)
npm run db:migrate   # Run migrations
```

## Documentation

| Guide | Purpose |
|-------|---------|
| [API Reference](docs/API_REFERENCE.md) | 74 API endpoints |
| [Testing Guide](docs/TESTING.md) | E2E testing patterns |
| [Troubleshooting](docs/TROUBLESHOOTING.md) | Common issues & fixes |
| [Database Setup](docs/DATABASE_SETUP.md) | PostgreSQL & Prisma |
| [Stripe Setup](docs/STRIPE_SETUP_GUIDE.md) | Payment integration |

## AI Tooling

| Resource | Purpose |
|----------|---------|
| [Quick Start](.claude/QUICK_START.md) | 147 agents, commands, hooks |
| [Agent Config](.claude/SELLERFI_AGENT_CONFIG.md) | Platform configuration |
| [Agent Dispatch](.claude/agents/) | Multi-agent workflows |

## Key Patterns

- **Auth**: `import { auth } from "@/lib/auth"` then `await auth()`
- **Database**: `import { prisma } from "@/lib/prisma"` with `select` for performance
- **Validation**: Zod schemas for all API inputs
- **Components**: Server Components by default, `"use client"` when needed