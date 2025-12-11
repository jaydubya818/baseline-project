# Seller Financing Platform - Development Guide

## 🚀 Getting Started with AI Agent Development

This guide shows you how to use the Open-SWE-With-Agents system to build your seller financing platform.

## Step 1: Add Your PRD

1. **Place your PRD file** in the `docs/` directory:
   ```bash
   # Copy your PRD markdown file to:
   docs/PRD.md
   ```

2. **Or use the template** provided at `docs/PRD_TEMPLATE.md` as a starting point

## Step 2: Initial Project Analysis

Start with the **agent-organizer** to analyze your PRD and create a comprehensive development plan:

```bash
@agent-organizer "Analyze the PRD in docs/PRD.md and create a comprehensive development plan for the seller financing platform MVP. Include technology stack recommendations, architecture design, security requirements, and a phased implementation plan."
```

**What this does:**
- Analyzes your PRD requirements
- Recommends optimal technology stack
- Suggests agent team composition
- Creates phased development plan
- Identifies security and compliance needs

## Step 3: Product Planning Phase

### Create User Stories and Roadmap
```bash
@product-manager "Based on the PRD in docs/PRD.md, create detailed user stories, acceptance criteria, and a product roadmap for the seller financing platform MVP"
```

### Set Up Sprint Management
```bash
@ai-scrum-master "Initialize automated sprint management for the seller financing platform development. Set up 3-hour standup cycles and create initial sprint backlog"
```

## Step 4: Architecture & Design Phase

### Backend Architecture
```bash
@backend-architect "Design the API architecture for the seller financing platform. Include endpoints for seller onboarding, customer applications, credit decisions, payment processing, and dashboard data"
```

### Security Architecture (CRITICAL for Financial Platform)
```bash
@security-auditor "Review the PRD and create comprehensive security requirements for the seller financing platform. Focus on PCI DSS compliance, data encryption, authentication, and financial data protection"
```

### Database Design
```bash
@database-specialist "Design the database schema for seller financing platform including sellers, customers, applications, credit decisions, payments, and transactions"
```

### Frontend Architecture
```bash
@react-pro "Design the frontend architecture for seller dashboard and customer application flow. Include component structure, state management, and routing"
```

## Step 5: Development Phase

### Backend Development
```bash
# API Development
@api-developer "Implement RESTful API endpoints for seller onboarding, customer applications, and credit decision integration based on the architecture design"

# Payment Integration
@api-developer "Integrate payment processing (Stripe/PayPal) for handling financing payments and repayment schedules"

# Authentication & Authorization
@backend-developer "Implement JWT-based authentication and role-based access control (RBAC) for sellers and admin users"
```

### Frontend Development
```bash
# Seller Dashboard
@react-pro "Build the seller dashboard with components for managing financing offers, viewing applications, and analytics"

# Customer Application Flow
@react-pro "Create the customer-facing financing application flow with multi-step form, real-time status updates, and approval/rejection handling"

# UI/UX Design
@ui-designer "Design the user interface for seller dashboard and customer application flow with focus on conversion optimization"
```

## Step 6: Financial Logic & Compliance

### Financial Calculations
```bash
@finance-tracker "Implement financial calculations for interest rates, payment schedules, and repayment tracking. Ensure compliance with financial regulations"
```

### Legal Compliance
```bash
@legal-compliance-checker "Review the platform for compliance with financial regulations, data protection laws (GDPR, CCPA), and lending requirements"
```

## Step 7: Quality Assurance

### Code Review
```bash
@code-reviewer "Review all backend and frontend code for the seller financing platform. Check for security vulnerabilities, code quality, and best practices"
```

### Security Audit
```bash
@security-auditor "Perform comprehensive security audit of the seller financing platform. Test for OWASP Top 10 vulnerabilities, authentication flaws, and data protection"
```

### Testing
```bash
@test-automator "Create comprehensive test suite including unit tests, integration tests, and end-to-end tests for the seller financing platform"

@api-tester "Create API test suite for all endpoints including authentication, authorization, and error handling"
```

### Performance Testing
```bash
@performance-engineer "Optimize the platform for performance. Test API response times, database queries, and frontend load times"
```

## Step 8: Documentation

### API Documentation
```bash
@api-documenter "Create comprehensive API documentation with OpenAPI/Swagger specification, authentication guide, and integration examples"
```

### Technical Documentation
```bash
@documentation-expert "Create technical documentation including architecture overview, deployment guide, and developer setup instructions"
```

## Step 9: Deployment

### Infrastructure Design
```bash
@cloud-architect "Design cloud infrastructure for the seller financing platform on AWS/Azure/GCP. Include high availability, scalability, and disaster recovery"
```

### CI/CD Pipeline
```bash
@devops-engineer "Set up CI/CD pipeline with automated testing, security scanning, and deployment to staging and production environments"
```

### Deployment
```bash
@deployment-engineer "Deploy the seller financing platform to production with proper monitoring, logging, and alerting"
```

## 🎯 Recommended Multi-Agent Workflow

For complex features, use the orchestrator to coordinate multiple agents:

```bash
@agent-organizer "Build the complete customer financing application flow including frontend form, backend API, credit decision integration, and payment processing. Coordinate the necessary agents for parallel development"
```

## 🔒 Security-First Development

Since this is a financial platform, security should be prioritized:

```bash
# Security review at each phase
@security-auditor "Review [specific component] for security vulnerabilities and compliance requirements"
```

## 📊 Key Agents for Financial Platform

### Critical Agents (Use Early)
- `@security-auditor` - Financial data security
- `@legal-compliance-checker` - Regulatory compliance
- `@finance-tracker` - Financial calculations
- `@backend-architect` - Secure API design

### Development Agents
- `@backend-developer` - API implementation
- `@react-pro` - Frontend development
- `@api-developer` - Payment integrations
- `@database-specialist` - Financial data modeling

### Quality Agents
- `@code-reviewer` - Code quality
- `@test-automator` - Test coverage
- `@performance-engineer` - Performance optimization

## 🚦 Development Phases Summary

1. **Planning** → `@agent-organizer`, `@product-manager`, `@ai-scrum-master`
2. **Architecture** → `@backend-architect`, `@security-auditor`, `@database-specialist`
3. **Development** → `@backend-developer`, `@react-pro`, `@api-developer`
4. **Financial Logic** → `@finance-tracker`, `@legal-compliance-checker`
5. **Quality** → `@code-reviewer`, `@test-automator`, `@security-auditor`
6. **Documentation** → `@api-documenter`, `@documentation-expert`
7. **Deployment** → `@cloud-architect`, `@devops-engineer`, `@deployment-engineer`

## 💡 Pro Tips

1. **Start with orchestrator** - Always begin complex tasks with `@agent-organizer`
2. **Security first** - Include `@security-auditor` early and often
3. **Parallel development** - Use orchestrator to run multiple agents simultaneously
4. **Continuous testing** - Run `@test-automator` after each major feature
5. **Document as you go** - Use `@api-documenter` during development

## 📝 Next Steps

1. Add your PRD to `docs/PRD.md`
2. Run `@agent-organizer` to get started
3. Follow the phased approach above
4. Use `@ai-scrum-master` for ongoing sprint management

Good luck building your seller financing platform! 🚀

