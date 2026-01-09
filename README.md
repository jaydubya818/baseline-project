# 🏦 SellerFi — The Private Marketplace for Business Acquisitions

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind" />
</p>

<p align="center">
  <strong>A production-grade fintech marketplace connecting business sellers with qualified buyers through seller financing.</strong>
</p>

<p align="center">
  <a href="https://seller-fi.vercel.app">🌐 Live Demo</a> •
  <a href="#features">✨ Features</a> •
  <a href="#ai-development-environment">🤖 AI Dev Environment</a> •
  <a href="#quick-start">🚀 Quick Start</a>
</p>

---

## 🎯 What is SellerFi?

SellerFi is a private marketplace that eliminates the friction in business acquisitions by:

- **No Broker Commissions** — Direct buyer-seller connections
- **Built-in Seller Financing** — Structured deal terms with amortization calculators
- **NDA-Protected Listings** — Confidential business information with access controls
- **Secure Dealrooms** — Private spaces for negotiations, documents, and messaging
- **AI-Powered Search** — Find exactly what you're looking for in plain English

---

## ✨ Features

### For Buyers
- 🔍 **AI-Powered Search** — Natural language queries like "SaaS under $500K in Texas"
- 📊 **Smart Match Scores** — Compatibility ratings based on your profile
- 🗂️ **Dealboxes** — Save searches with custom filters and get email alerts
- 💼 **Elite Buyer Tier** — Priority access, advanced filters, and dedicated support
- 📝 **NDA Signing** — Instant access to confidential financials

### For Sellers
- 📈 **Premium Listings** — Featured placement and enhanced visibility
- 🔐 **NDA Controls** — Approve/deny access to sensitive documents
- 💬 **Secure Dealrooms** — Real-time messaging with potential buyers
- 📄 **Document Vault** — Organize due diligence materials
- 📊 **Analytics Dashboard** — Track views, inquiries, and engagement

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

This project includes **200+ Claude skills and 108 specialized agents**:

```
.claude/
├── skills/              # Reusable skill modules
│   ├── fintech-developer
│   ├── nextjs-fullstack-architect
│   ├── ui-ux-designer
│   ├── cloud-infrastructure-architect
│   └── ... (100+ more)
├── agents/              # Specialized agent configurations
│   ├── code-reviewer
│   ├── test-generator
│   ├── documentation-writer
│   └── ... (108 agents)
└── workflows/           # Multi-step automation chains
```

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
└── .taskmaster/              # AI task management
    ├── tasks/                # Task definitions
    └── docs/                 # PRDs & specs
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
npm run test:e2e         # Playwright E2E tests

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

---

<p align="center">
  <strong>Built with ❤️ and 🤖 AI assistance</strong>
</p>

<p align="center">
  <a href="https://seller-fi.vercel.app">Visit SellerFi</a> •
  <a href="https://github.com/jaydubya818/SellerFi">GitHub</a>
</p>
