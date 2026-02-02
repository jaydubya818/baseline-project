# 🏦 Baseline Project Set up

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind" />
</p>

</p

<p align="center">
  <a href="https://seller-fi.vercel.app">🌐 Live Demo</a> •
  <a href="#features">✨ Features</a> •
  <a href="#ai-development-environment">🤖 AI Dev Environment</a> •
  <a href="#quick-start">🚀 Quick Start</a>
</p>

---

### Platform Features
- 🏠 **Beautiful UI/UX** — Stripe-inspired design with Framer Motion animations
- 📱 **Fully Responsive** — Desktop-first with mobile optimization
- 🌙 **Dark Mode** — System-aware theme switching
- ⚡ **Real-time Updates** — SSE-powered notifications and messaging
- 🔒 **Enterprise Security** — NextAuth v5, role-based access, audit logging

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router, Server Components, Server Actions) |
| **Language** | TypeScript 5.0 with strict mode |
| **Styling** | Tailwind CSS, shadcn/ui, Radix UI, Framer Motion |
| **Database** | PostgreSQL with Prisma ORM |
| **Auth** | NextAuth.js v5 (Credentials, OAuth providers) |
| **Payments** | Stripe (Subscriptions, Checkout, Webhooks) |
| **AI** | OpenAI GPT-4, Perplexity for research |
| **Real-time** | Server-Sent Events (SSE) |
| **Deployment** | Vercel (Edge Functions, ISR) |
| **Monitoring** | Sentry, Vercel Analytics |

---

## 🤖 AI Development Environment

> **"Claude on performance-enhancing drugs"** — This project was built with a revolutionary AI-assisted development environment that 10x's productivity.

### 🧠 Core AI Architecture

| Capability | Description |
|------------|-------------|
| **LSP Integration** | Language Server Protocol hooks for real-time code intelligence |
| **Hierarchical Agent Orchestration** | Subagents for specialized tasks (UI, API, testing, docs) |
| **Adversarial Validation** | Self-checking loops that catch hallucinations and errors |
| **Ralph Wiggum Loops** | Recursive validation patterns that ensure correctness |
| **2-Way Voice (STT/TTS)** | Speech-to-text and text-to-speech for hands-free coding |

### 💾 Memory & Context Management

| Feature | Description |
|---------|-------------|
| **Short-Term Memory** | Session-aware context for ongoing work |
| **Long-Term Memory** | Persistent knowledge base with semantic retrieval |
| **Dynamic Context Windowing** | Intelligent token management to maximize context |
| **Compaction Avoidance** | Strategies to prevent premature context compression |
| **Auto-Restore from Clear** | Seamless recovery when context resets |
| **Context Monitoring** | Real-time visibility into token usage |

### ⚡ Advanced Execution

| Feature | Description |
|---------|-------------|
| **Streaming Response Caching** | Cached partial responses for faster iterations |
| **Parallel Execution Pools** | Concurrent tool calls for speed |
| **Semantic Chunking** | Embeddings-based code retrieval |
| **Custom Tool Registration** | Extensible tool system |
| **Conditional Breakpoints** | Pause agent reasoning for inspection |
| **Diff-Based Rollback Protection** | Safe reversion of changes |

### 🔄 Self-Healing & Validation

| Feature | Description |
|---------|-------------|
| **Hallucination Detection** | Automatic detection of incorrect outputs |
| **Auto-Correction** | Self-healing when Claude goes off-track |
| **Prompt Chain Versioning** | Version control for prompt engineering |
| **Validators** | Keep Claude honest across context clears |
| **Auto-Generated Test Suites** | Tests run on every iteration |
| **Intelligent Recurring Loops** | Continuous work with frictionless management |

### 📚 Skills & Agents Library

This project includes **65+ Claude skills and 178+ specialized agents**:

```
.claude/
├── skills/              # Reusable skill modules (65+)
│   ├── fintech-developer
│   ├── nextjs-fullstack-architect
│   ├── ui-ux-designer
│   ├── cloud-infrastructure-architect
│   ├── compound-docs        # Knowledge compounding
│   ├── git-worktree         # Parallel development
│   └── ... (60+ more)
├── agents/              # Specialized agent configurations (178+)
│   ├── orchestration/       # 11 orchestrators
│   ├── development/         # 24 developers
│   ├── quality/             # 15 QA agents
│   ├── security/            # 4 security auditors
│   ├── review/              # 14 code reviewers (Compound)
│   ├── research/            # 4 research agents (Compound)
│   └── ... (106+ more)
├── commands/            # Slash commands (49+)
│   ├── /review              # Code review
│   ├── /workflows:plan      # Detailed planning (Compound)
│   ├── /workflows:review    # Multi-agent review (Compound)
│   ├── /workflows:compound  # Knowledge documentation (Compound)
│   └── ... (45+ more)
└── workflows/           # Multi-step automation chains
```

### 🔌 Compound Engineering Plugin

**Status**: 🔄 Pending Installation (Requires Claude Code IDE)

SellerFi integrates the **Compound Engineering Plugin** for enhanced development workflows:

**Philosophy**: *Each unit of engineering work should make subsequent units easier—not harder.*

**Installation** (In Claude Code IDE):
```
/plugin marketplace add https://github.com/EveryInc/compound-engineering-plugin
/plugin install compound-engineering
```

**What It Adds**:
- **27 Specialized Agents**: Review, research, design, workflow automation
- **20 Slash Commands**: Planning, review, browser testing, parallel resolution
- **14 Skills**: Architecture, development tools, git worktrees, browser automation

**Core Workflows**:

| Workflow | Command | Purpose |
|----------|---------|---------|
| **PLAN** | `/workflows:plan` | Create detailed plans with parallel research |
| **WORK** | `/workflows:work` | Execute with git worktrees and task tracking |
| **REVIEW** | `/workflows:review` | Multi-agent code review + browser testing |
| **COMPOUND** | `/workflows:compound` | Document learnings for future reference |

**Integration with Taskmaster**:
- **Taskmaster** = Project-level task management
- **Compound** = Implementation-level workflows
- Both systems complement each other

**Key Benefits**:
- ✅ Zero console errors enforcement (browser testing)
- ✅ Multi-agent security audits (13+ parallel agents)
- ✅ Knowledge compounding (first time: 30min → next time: 2min)
- ✅ SellerFi rule enforcement (determinism, server-side validation)

**Documentation**:
- [Compound Quick Start](.claude/COMPOUND_QUICK_START.md)
- [Compound Workflows](.claude/COMPOUND_WORKFLOWS.md)
- [Full Integration Guide](docs/COMPOUND_ENGINEERING_INTEGRATION.md)
- [Testing Guide](.claude/COMPOUND_PLUGIN_TESTING.md)

### 🌐 Browser Automation & AI Guidelines

**agent-browser** (v0.8.3) - Headless browser automation CLI optimized for AI agents:

```bash
# Install globally
npm install -g agent-browser
agent-browser install  # Download Chromium

# Example workflow (optimal for AI)
agent-browser open https://example.com
agent-browser snapshot -i              # Get interactive elements with refs
agent-browser click @e2                # Click using ref from snapshot
agent-browser fill @e3 "text"          # Fill input using ref
agent-browser screenshot page.png      # Capture screenshot
agent-browser close                    # Close browser
```

**Key Features**:
- 🎯 **Ref-based selection** - Deterministic element targeting from snapshots
- 🌳 **Accessibility tree** - Semantic element discovery (optimal for LLMs)
- ⚡ **Fast Rust CLI** - Native binary with Node.js fallback
- 🔌 **CDP support** - Connect to existing browser instances
- 📸 **Screenshot & PDF** - Visual verification and documentation

**Karpathy Guidelines** - Behavioral guidelines to reduce common LLM coding mistakes:

Located at `.claude/skills/karpathy-guidelines.md`, these principles apply to all coding tasks:

1. **Think Before Coding** - Don't assume, surface tradeoffs, ask when uncertain
2. **Simplicity First** - Minimum code that solves the problem, no speculation
3. **Surgical Changes** - Touch only what you must, clean up only your mess
4. **Goal-Driven Execution** - Define success criteria, loop until verified

Based on [Andrej Karpathy's observations](https://github.com/forrestchang/andrej-karpthy-skills) about AI coding pitfalls.

**Documentation**:
- [Installation Summary](INSTALLATION_SUMMARY.md) - Setup and test results
- [agent-browser GitHub](https://github.com/vercel-labs/agent-browser) - Full CLI reference
- [Karpathy Skills](https://github.com/forrestchang/andrej-karpthy-skills) - Original guidelines

### 📈 Marketing Skills for AI Agents

**25 Marketing Skills** - Specialized AI agent skills for conversion optimization, copywriting, SEO, and growth:

```bash
# Install all marketing skills
npx skills add coreyhaines31/marketingskills --yes

# Or install specific skills
npx skills add coreyhaines31/marketingskills --skill seo-audit page-cro copywriting
```

**Skill Categories**:

| Category | Skills |
|----------|--------|
| **Conversion Optimization** | page-cro, signup-flow-cro, onboarding-cro, form-cro, popup-cro, paywall-upgrade-cro |
| **Content & Copy** | copywriting, copy-editing, email-sequence, social-content, content-strategy |
| **SEO & Discovery** | seo-audit, programmatic-seo, competitor-alternatives, schema-markup |
| **Paid & Distribution** | paid-ads, social-content |
| **Measurement & Testing** | analytics-tracking, ab-test-setup |
| **Growth Engineering** | free-tool-strategy, referral-program |
| **Strategy & Monetization** | marketing-ideas, marketing-psychology, launch-strategy, pricing-strategy, product-marketing-context |

**Usage Examples**:
```
"Help me optimize this landing page for conversions"  → Uses page-cro skill
"Write homepage copy for my SaaS"                     → Uses copywriting skill
"Set up GA4 tracking for signups"                     → Uses analytics-tracking skill
"Audit my site for SEO issues"                        → Uses seo-audit skill
"Create a 5-email welcome sequence"                   → Uses email-sequence skill
```

**Installed to 8 AI Agents**:
- Antigravity, Claude Code, Clawdbot, Cursor, Gemini CLI, GitHub Copilot, OpenCode, Windsurf

**Documentation**:
- [Marketing Skills GitHub](https://github.com/coreyhaines31/marketingskills) - Full skill library
- [Skills Website](https://marketing-skills.com) - Interactive documentation
- Built by [Corey Haines](https://coreyhaines.com) - Technical marketer & founder

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ (LTS recommended)
- PostgreSQL 14+
- Stripe account (for payments)
- OpenAI API key (for AI features)

### Installation

```bash
# Clone the repository
git clone https://github.com/jaydubya818/SellerFi.git
cd seller-financing-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Set up the database
npm run db:migrate
npm run db:generate

# Seed sample data (optional)
npm run db:seed

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📁 Project Structure

```
seller-financing-platform/
├── app/                       # Next.js App Router
│   ├── (auth)/               # Authentication pages
│   ├── (main)/               # Main application
│   │   ├── buyer/            # Buyer dashboard, profile, saved
│   │   ├── seller/           # Seller dashboard, listings
│   │   ├── dealrooms/        # Deal room pages
│   │   ├── listings/         # Browse & detail pages
│   │   └── dealbox/          # Smart search boxes
│   └── api/                  # API routes
│       ├── auth/             # NextAuth endpoints
│       ├── listings/         # CRUD operations
│       ├── dealrooms/        # Messaging, documents
│       └── stripe/           # Payment webhooks
├── components/               # React components
│   ├── ui/                   # shadcn/ui primitives
│   ├── dashboard/            # Dashboard components
│   ├── dealrooms/            # Dealroom components
│   ├── listings/             # Listing components
│   └── pricing/              # Pricing widgets
├── lib/                      # Utilities & services
│   ├── actions/              # Server Actions
│   ├── services/             # Business logic
│   └── utils/                # Helper functions
├── prisma/                   # Database
│   ├── schema.prisma         # Data model
│   └── migrations/           # Migration history
├── .taskmaster/              # Taskmaster AI (project tasks)
│   ├── tasks/                # Task definitions
│   └── docs/                 # PRDs & specs
├── plans/                    # Compound plans (detailed implementation)
├── todos/                    # Compound todos (review findings)
└── docs/
    └── solutions/            # Compound knowledge base (9 categories)
```

---

## 🧪 Development Commands

```bash
# Development
npm run dev              # Start dev server (port 3000)
npm run build            # Production build
npm run start            # Start production server

# Database
npm run db:migrate       # Run migrations
npm run db:push          # Push schema changes
npm run db:studio        # Open Prisma Studio
npm run db:seed          # Seed sample data

# Quality
npm run lint             # ESLint
npm run type-check       # TypeScript check
npm run test             # Run tests

# Version Management
npm run version:bump:patch   # Bump patch version (1.0.0 → 1.0.1)
npm run version:bump:minor   # Bump minor version (1.0.0 → 1.1.0)
npm run version:bump:major   # Bump major version (1.0.0 → 2.0.0)
npm run test:e2e         # Playwright E2E tests

# Taskmaster (Project-Level Task Management)
task-master list         # List all tasks
task-master next         # Get next task to work on
task-master show <id>    # View task details
task-master expand --id=<id>  # Break down task into subtasks
task-master set-status --id=<id> --status=done  # Mark complete

# Compound Plugin (Implementation-Level Workflows)
# Note: These commands require Claude Code IDE
/workflows:plan "feature"     # Create detailed plan
/workflows:review #PR         # Multi-agent review
/workflows:compound "learning" # Document knowledge
/test-browser #PR             # Browser testing

# Deployment
npm run deploy:preview   # Deploy to preview
npm run deploy:staging   # Deploy to staging
```

---

## 🔐 Environment Variables

```bash
# Database
DATABASE_URL=postgresql://...

# Authentication
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=your-secret-key

# Stripe
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AI
OPENAI_API_KEY=sk-...
PERPLEXITY_API_KEY=pplx-...

# Optional
SENTRY_DSN=https://...
VERCEL_URL=https://...
```

---

## 📊 Sample Data

After seeding, you'll have access to:

| Account Type | Email | Password |
|-------------|-------|----------|
| Buyer | buyer@test.com | password123 |
| Seller | seller@test.com | password123 |
| Admin | admin@test.com | password123 |

Sample listings include SaaS businesses, restaurants, manufacturing companies, and more with realistic financials.

---

## 🎨 Design Philosophy

SellerFi follows a **Stripe-inspired design system**:

- **Typography**: Clean, professional fonts with clear hierarchy
- **Colors**: Emerald/teal primary with slate neutrals
- **Motion**: Subtle Framer Motion animations for delight
- **Components**: Accessible Radix UI primitives
- **Dark Mode**: Full dark mode support

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com) — Beautiful component library
- [Vercel](https://vercel.com) — Deployment platform
- [Prisma](https://prisma.io) — Database toolkit
- [Stripe](https://stripe.com) — Payment infrastructure
- [Taskmaster AI](https://github.com/taskmaster-ai) — AI-powered task management
- [Compound Engineering Plugin](https://github.com/EveryInc/compound-engineering-plugin) — Knowledge compounding workflows

---

## 📚 Additional Documentation

### AI Development Environment
- [Agent Configuration](.claude/SELLERFI_AGENT_CONFIG.md) — 178+ specialized agents
- [Agent Index](.claude/agents/index.md) — Complete agent catalog
- [Quick Start Guide](.claude/QUICK_START.md) — Getting started with agents

### Compound Engineering Plugin
- [Compound Quick Start](.claude/COMPOUND_QUICK_START.md) — Quick reference
- [Compound Workflows](.claude/COMPOUND_WORKFLOWS.md) — SellerFi-specific workflows
- [Integration Guide](docs/COMPOUND_ENGINEERING_INTEGRATION.md) — Complete integration
- [Testing Guide](.claude/COMPOUND_PLUGIN_TESTING.md) — Testing instructions
- [Installation Summary](COMPOUND_PLUGIN_INSTALLATION_SUMMARY.md) — Setup checklist

### Taskmaster
- [Taskmaster Setup](TASKMASTER_SETUP.md) — Configuration guide
- [Development Workflow](.cursor/rules/taskmaster/dev_workflow.mdc) — Workflow patterns
- [Command Reference](.cursor/rules/taskmaster/taskmaster.mdc) — All commands

### Project Documentation
- [API Reference](docs/API_REFERENCE.md) — API contracts
- [Testing Guide](docs/TESTING.md) — E2E + Chrome testing
- [Database Setup](docs/DATABASE_SETUP.md) — PostgreSQL + Prisma
- [Stripe Setup](docs/STRIPE_SETUP_GUIDE.md) — Payments & entitlements
- [Troubleshooting](docs/TROUBLESHOOTING.md) — Known issues

---

<p align="center">
  <strong>Built with ❤️ and 🤖 AI assistance</strong>
</p>

<p align="center">
  <a href="https://seller-fi.vercel.app">Visit SellerFi</a> •
  <a href="https://github.com/jaydubya818/SellerFi">GitHub</a>
</p>
