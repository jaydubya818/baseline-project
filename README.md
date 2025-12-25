# SellerFi - Seller Financing Marketplace Platform

A modern marketplace platform that connects business sellers with qualified buyers and facilitates seller financing deals. Built with Next.js, TypeScript, Prisma, and Tailwind CSS.

## Features

- **Authentication System**: Secure user registration, login, and verification
- **Business Listings**: Create and manage business sale listings with detailed information
- **Buyer Dashboard**: Browse available listings with advanced filtering and search
- **Deal Rooms**: Private communication spaces for buyer-seller negotiations
- **Document Management**: Secure handling of business documents and due diligence
- **Seller Financing**: Integrated tools for managing seller-financed deals
- **Real-time Communication**: Live chat and messaging system
- **PDF Generation**: Automated document generation for deals

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components, Framer Motion
- **Backend**: Next.js API Routes, NextAuth.js authentication
- **Database**: Prisma ORM (PostgreSQL)
- **Payments**: Stripe integration
- **UI Components**: Radix UI primitives, Lucide icons
- **Forms**: React Hook Form with Zod validation
- **Real-time**: Socket.io for live features

## 🤖 Claude Skills Integration

This project includes a comprehensive collection of **200+ Claude skills and agents** for enhanced development capabilities:

### 🎯 **Core Skills Available**

#### **Fintech Development**
- **`fintech-developer`** - Payment processing, financial calculations, compliance (PCI DSS, KYC/AML)
- **`automation-engineer`** - CI/CD pipelines, GitHub Actions, testing automation
- **`cloud-infrastructure-architect`** - AWS services, Terraform, containerization, security

#### **Full-Stack Development**
- **`nextjs-fullstack-architect`** - Advanced Next.js App Router, Server Components, API design
- **`ui-ux-designer`** - User research, wireframing, accessibility, design systems
- **`design-system-architect`** - Component libraries, design tokens, Storybook integration

#### **Plus 100+ Additional Skills**
- Development, testing, deployment, documentation, business analysis, and more!

### 📚 **Skills Documentation**
- **Main Index**: [`.claude/skills/README.md`](.claude/skills/README.md)
- **Agent Collection**: [`.claude/agents/`](.claude/agents/) (108 specialized agents)
- **Usage Examples**: See skills documentation for specific workflows

### 🧮 **Example: Amortization Calculator**

Test the fintech-developer skill:
```bash
npx tsx lib/financial/test-amortization.ts
```

**Sample Output:**
```
Business Purchase: $1,000,000
Down Payment: $200,000
Financed Amount: $800,000
Monthly Payment: $9,083.84
Total Interest: $290,060.58
```

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Stripe account (for payments)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd seller-financing-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Set up the database:
```bash
npm run db:migrate
npm run db:generate
```

5. Seed sample data (optional):
```bash
npm run db:seed
```

6. Start the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
seller-financing-platform/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (main)/            # Main application pages
│   │   ├── buyer/         # Buyer dashboard and features
│   │   └── listings/      # Business listings
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── listings/      # Listings management
│   │   ├── dealrooms/     # Deal room functionality
│   │   └── broker/        # Broker services
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configurations
├── prisma/               # Database schema and migrations
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:migrate   # Run database migrations
npm run db:push      # Push schema changes
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed sample data
```

## Key Features

### For Sellers
- List businesses for sale with detailed financials
- Manage inquiries and communications with potential buyers
- Configure seller financing terms and options
- Track deal progress and documentation

### For Buyers
- Browse and search business listings
- Apply advanced filters (industry, price range, location)
- Access deal rooms for secure communications
- Submit and track financing applications

### Deal Management
- Private deal rooms for buyer-seller communication
- Document upload and sharing
- Real-time messaging and notifications
- Automated due diligence workflows

## Environment Variables

Key environment variables needed:

```bash
DATABASE_URL=         # PostgreSQL connection string
NEXTAUTH_URL=         # Your app URL (used for OAuth redirects)
AUTH_SECRET=          # NextAuth v5 secret (generate with: openssl rand -base64 32)
STRIPE_SECRET_KEY=    # Stripe secret key
STRIPE_PUBLISHABLE_KEY= # Stripe publishable key
```

## Deployment

### Staging
```bash
npm run deploy:preview
```

### Production
```bash
npm run deploy:staging
```

## Contributing

1. Create a feature branch from `master`
2. Make your changes following the existing code style
3. Run tests and linting
4. Submit a pull request

## License

MIT License

