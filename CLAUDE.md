# SellerFi - Claude Code Project Context

> AI-powered seller financing marketplace platform

## 🚀 Claude Code Integration Status

**Status:** ✅ **FULLY INTEGRATED** - All skills, agents, commands, and hooks active

| Component | Count | Status |
|-----------|-------|--------|
| Skills | 51+ | ✅ Active |
| Agents | 147+ | ✅ Available |
| Slash Commands | 26+ | ✅ Ready |
| Automation Hooks | 20+ | ✅ Running |
| Submodule Skills | 3 repos | ✅ Installed |

### Quick Access
- **[.claude/QUICK_START.md](.claude/QUICK_START.md)** - Start here!
- **[docs/CLAUDE_CODE_WORKFLOW_GUIDE.md](docs/CLAUDE_CODE_WORKFLOW_GUIDE.md)** - 26 best practices
- **[.claude/INSTALLATION_VERIFICATION.md](.claude/INSTALLATION_VERIFICATION.md)** - Skills verification

---

## Agent Dispatch Protocol

For complex, multi-domain tasks requiring specialized expertise, this project uses the Agent Organizer system located in `.claude/agents/`.

**When to use Agent Dispatch:**
- Multiple technology domains (frontend + backend + database)
- Complex architectural decisions
- Cross-functional requirements
- System-wide refactoring or changes
- Security-sensitive implementations

**Dispatch Command:** `@agent-organizer "Your task description"`

---

## Project Overview

**SellerFi** is a comprehensive B2B marketplace connecting business buyers and sellers, with integrated seller financing tools. The platform enables:

- **Buyers**: Browse listings, sign NDAs, negotiate in dealrooms, get AI-powered recommendations
- **Sellers**: List businesses, manage inquiries, structure financing terms, track analytics
- **Brokers**: Manage multiple clients, access premium tools, generate documentation
- **Admins**: Full platform oversight, user management, audit logs, analytics

### Key Features

| Feature | Description |
|---------|-------------|
| AI Search | Natural language search with semantic matching |
| Dealrooms | Secure buyer-seller negotiation spaces with messaging |
| Term Sheet Builder | Interactive financing term calculator |
| Managed Sale | White-glove service for complex transactions |
| Tiered Subscriptions | Free, Pro Seller, Elite Buyer, Broker plans |
| Real-time Notifications | Socket.IO + push notifications |
| Admin Dashboard | Complete platform management suite |

---

## Technology Stack

### Core Framework
```
Next.js 16          - App Router, Server Components, Server Actions
React 19            - Latest React with concurrent features
TypeScript 5.9      - Strict mode enabled
```

### Database & ORM
```
PostgreSQL          - Primary database
Prisma 6.19         - ORM with 40 models
Upstash Redis       - Caching & rate limiting (optional)
```

### Authentication & Security
```
NextAuth v5 (beta)  - Auth.js with Prisma adapter
bcryptjs            - Password hashing
Zod                 - Request validation
```

### Payments
```
Stripe              - Subscriptions, one-time payments, Connect
```

### UI Components
```
Tailwind CSS 3.4    - Utility-first styling
Radix UI            - Accessible primitives
shadcn/ui           - Component library
Framer Motion       - Animations
Lucide React        - Icons
```

### Real-time & Monitoring
```
Socket.IO           - WebSocket connections
Sentry              - Error tracking & performance
```

### Testing
```
Playwright          - E2E testing
```

---

## Project Structure

```
seller-financing-platform/
├── app/                    # Next.js App Router
│   ├── (admin)/           # Admin route group
│   │   └── super-admin/   # Admin dashboard pages
│   ├── (auth)/            # Authentication route group
│   │   └── auth/          # Login, signup, verify, reset
│   ├── (main)/            # Main application routes
│   │   ├── buyer/         # Buyer dashboard, profile, saved
│   │   ├── seller/        # Seller dashboard, listings
│   │   ├── broker/        # Broker workspace
│   │   ├── dealrooms/     # Negotiation rooms
│   │   ├── listings/      # Listing browse, detail, create
│   │   └── settings/      # User settings
│   └── api/               # API routes (74 endpoints)
│       ├── admin/         # Admin API endpoints
│       ├── ai/            # AI-powered features
│       ├── auth/          # Authentication endpoints
│       ├── billing/       # Subscription management
│       ├── dealrooms/     # Dealroom operations
│       ├── listings/      # Listing CRUD
│       ├── notifications/ # Notification management
│       └── stripe/        # Payment processing
├── components/            # React components (102 files)
│   ├── admin/            # Admin-specific components
│   ├── ui/               # shadcn/ui components
│   └── *.tsx             # Feature components
├── lib/                  # Utility modules (46 files)
│   ├── actions/          # Server actions
│   ├── ai/               # AI utilities
│   ├── prisma.ts         # Database client
│   ├── auth.ts           # Auth configuration
│   ├── stripe.ts         # Stripe utilities
│   ├── cache.ts          # Caching layer
│   ├── redis.ts          # Redis client
│   └── *.ts              # Domain utilities
├── prisma/
│   ├── schema.prisma     # Database schema (40 models)
│   └── migrations/       # Database migrations
├── hooks/                # React hooks
├── e2e/                  # Playwright E2E tests
├── scripts/              # Utility scripts
├── public/               # Static assets
└── docs/                 # Documentation
```

---

## Development Commands

### Setup & Development
```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push schema to database (dev)
npm run db:push

# Run migrations
npm run db:migrate

# Start development server
npm run dev

# Open Prisma Studio
npm run db:studio
```

### Build & Deploy
```bash
# Build for production
npm run build

# Start production server
npm run start

# Deploy to Vercel (staging)
npm run deploy:staging

# Deploy preview
npm run deploy:preview
```

### Testing
```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests headed
npm run test:e2e:headed
```

### Database Seeding
```bash
# Seed sample listings
npm run db:seed

# Run specific seed script
npx ts-node scripts/seed-comprehensive.ts
```

---

## Environment Variables

### Required
```env
DATABASE_URL=postgresql://...
AUTH_SECRET=your-auth-secret
AUTH_URL=http://localhost:3000
```

### Payments (Required for billing)
```env
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Optional Enhancements
```env
# Redis caching (falls back to in-memory)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# Error tracking
SENTRY_DSN=https://...

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
```

---

## Key Patterns & Conventions

### Route Groups
- `(admin)` - Admin-only pages, requires ADMIN role
- `(auth)` - Authentication pages, public access
- `(main)` - Main application, mixed auth requirements

### Authentication
```typescript
// Server Component - check auth
import { auth } from "@/lib/auth"
const session = await auth()

// Admin-only API route
import { requireAdminApi } from "@/lib/admin-auth"
await requireAdminApi()

// Server Action with auth
import { auth } from "@/lib/auth"
const session = await auth()
if (!session?.user) throw new Error("Unauthorized")
```

### Database Queries
```typescript
import { prisma } from "@/lib/prisma"

// Always use select for performance
const listings = await prisma.listing.findMany({
  where: { status: "ACTIVE" },
  select: { id: true, title: true, ... },
})
```

### API Response Pattern
```typescript
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const schema = z.object({ ... })

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)
    // ... logic
    return NextResponse.json({ success: true, data })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
```

### Component Pattern
```typescript
// Server Component (default)
export default async function Page() {
  const data = await fetchData()
  return <ClientComponent data={data} />
}

// Client Component
"use client"
export function ClientComponent({ data }: Props) {
  const [state, setState] = useState()
  return <div>...</div>
}
```

---

## User Roles & Permissions

| Role | Capabilities |
|------|-------------|
| `BUYER` | Browse, save listings, request NDAs, negotiate in dealrooms |
| `SELLER` | Create listings, manage inquiries, access seller dashboard |
| `BROKER` | Multi-client management, premium tools, doc generation |
| `ADMIN` | Full platform access, user management, audit logs |

### Subscription Tiers

**Buyers:**
- Free: Basic browsing, 3 saved listings
- Elite Buyer: Unlimited saves, AI recommendations, priority support

**Sellers:**
- Free: 1 active listing, basic features
- Pro Seller: Unlimited listings, analytics, featured placement

---

## Database Models (Key Entities)

```
User                 - Authentication & profile
BuyerProfile         - Buyer-specific preferences
Listing              - Business listings
ListingFinancials    - Financial details (confidential)
FinancingTerms       - Seller financing structure
Dealroom             - Buyer-seller negotiation space
Message              - Dealroom messages
Document             - Uploaded files
Notification         - User notifications
Subscription         - Stripe subscription tracking
AuditLog             - Admin action tracking
SavedListing         - Buyer favorites
SavedSearch          - Saved search criteria
AnalyticsEvent       - User behavior tracking
```

---

## Common Tasks

### Adding a New API Route
1. Create `app/api/[feature]/route.ts`
2. Add Zod schema for validation
3. Check authentication with `auth()` or `requireAdminApi()`
4. Return `NextResponse.json()`

### Adding a New Page
1. Create `app/(main)/[feature]/page.tsx`
2. Use Server Component for data fetching
3. Create Client Component for interactivity
4. Add to navigation if needed

### Adding a Database Field
1. Update `prisma/schema.prisma`
2. Run `npm run db:push` (dev) or create migration
3. Run `npm run db:generate`
4. Update TypeScript types as needed

### Adding a UI Component
1. Use `npx shadcn@latest add [component]` for shadcn components
2. Or create in `components/[feature].tsx`
3. Follow existing patterns for props and styling

---

## Troubleshooting

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Regenerate Prisma client
npm run db:generate

# Check TypeScript
npx tsc --noEmit
```

### Database Issues
```bash
# Reset database (DESTRUCTIVE)
npx prisma migrate reset

# Check schema sync
npx prisma db pull

# Validate schema
npx prisma validate
```

### Auth Issues
- Check `AUTH_SECRET` is set
- Verify `AUTH_URL` matches your domain
- Clear cookies and try again

---

## Contributing Guidelines

1. **TypeScript**: Strict mode, no `any` unless necessary
2. **Components**: Server Components by default, `"use client"` when needed
3. **Styling**: Tailwind CSS, follow existing patterns
4. **APIs**: Zod validation, proper error handling
5. **Database**: Use `select` for queries, avoid N+1
6. **Testing**: Add E2E tests for new features

---


## Claude Code Skills & Capabilities

### Installed Skill Repositories (Git Submodules)

| Repository | Location | Purpose |
|------------|----------|---------|
| **continuous-learning** | `.claude/skills/continuous-learning/` | Autonomous knowledge extraction - creates new skills from solutions |
| **openskills** | `.claude/skills/openskills/` | Universal skills loader and CLI for managing skills |
| **superpowers** | `.claude/skills/superpowers/` | 14 composable development workflow skills |

### Superpowers Skills (14)

**Process & Planning:**
- `brainstorming` - Initial ideation and approach planning
- `writing-plans` - Creating structured implementation plans
- `executing-plans` - Following plans systematically

**Development:**
- `test-driven-development` - TDD workflow with tests-first
- `subagent-driven-development` - Specialized agents for complex tasks
- `dispatching-parallel-agents` - Managing multiple agents simultaneously

**Quality & Review:**
- `verification-before-completion` - Pre-completion checks
- `systematic-debugging` - Structured debugging methodology
- `requesting-code-review` - Preparing code reviews
- `receiving-code-review` - Handling feedback

**Git & Workflow:**
- `finishing-a-development-branch` - Branch completion checklist
- `using-git-worktrees` - Working with multiple branches

**Meta:**
- `using-superpowers` - How to use all skills
- `writing-skills` - Creating new skills

### Custom SellerFin Skills (45+)

Located in `.claude/skills/`:
- `core-components` - Design system components
- `formik-patterns` - Form handling patterns
- `react-ui-patterns` - React best practices
- `testing-patterns` - Testing strategies
- `systematic-debugging` - Debugging methodology
- `context-optimization` - Context engineering
- `fintech-developer` - Fintech-specific patterns
- ...and 38+ more specialized skills

### Slash Commands

**Development Commands:**
```
/review           - Comprehensive code review
/debug            - Systematic debugging
/test             - Run tests with reporting
/optimize         - Performance analysis
/refactor         - Safe refactoring
/ship             - Pre-deployment checklist + PR
```

**Project Commands:**
```
/code-quality     - Code quality checks
/pr-review        - Pull request review
/onboard          - Onboarding docs
/security-scan    - Security audit
```

### Automation Hooks

These run automatically on every code change:

| Hook | Trigger | Action |
|------|---------|--------|
| **Auto-format** | `.js/.ts/.tsx` edit | Prettier formatting |
| **Type-check** | `.ts/.tsx` edit | TypeScript validation |
| **Test-run** | `.test.ts` edit | Run related tests |
| **Dep-install** | `package.json` edit | npm install |
| **Branch-protect** | Any edit | Block edits on main |
| **Skill-eval** | Every prompt | Match relevant skills |

### Continuous Learning

After completing tasks, you may see evaluation prompts asking:
1. Did the task require non-obvious investigation?
2. Was the solution reusable and valuable?
3. Should this knowledge be preserved as a new skill?

**Manual Invocation:** Say `/retrospective` to review the session

---

## Contact & Resources

- **Documentation**: `/docs/` directory
- **API Reference**: `/docs/API_REFERENCE.md`
- **Deployment Guide**: `/STAGING_DEPLOYMENT.md`
- **Development Guide**: `/DEVELOPMENT_GUIDE.md`
- **Claude Code Workflow**: `/docs/CLAUDE_CODE_WORKFLOW_GUIDE.md`
- **Skills Installation**: `/.claude/INSTALLATION_VERIFICATION.md`
- **Quick Start**: `/.claude/QUICK_START.md`