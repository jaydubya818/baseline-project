---
name: SellerFi Production Readiness Validation Plan
overview: |
  Comprehensive validation to ensure SellerFi is production-ready by verifying all buyer and seller tier features, ensuring entitlement correctness, eliminating browser/runtime errors, confirming database + schema integrity, establishing a repeatable regression workflow, and proving platform readiness for GTM + investor review.
todos:
  - id: phase0-db-integrity
    content: "Phase 0: Run prisma migrate status, verify schema matches migrations exactly"
    status: pending
  - id: phase0-build-sanity
    content: "Phase 0: Run lint, typecheck, build, start - confirm zero errors"
    status: pending
  - id: phase0-browser-check
    content: "Phase 0: Chrome incognito - no console errors, no hydration warnings, no 500s"
    status: pending
  - id: phase0.4-prod-rehearsal
    content: "Phase 0.4: Production-mode rehearsal - staging DB, prod env vars, webhook test"
    status: pending
  - id: phase0.5-legacy-data
    content: "Phase 0.5: Seed legacy data (old listings, deals, users) - verify no crashes"
    status: pending
  - id: phase0.5-graceful-degrade
    content: "Phase 0.5: Verify UI degrades gracefully with missing fields, sensible defaults"
    status: pending
  - id: phase1-create-accounts
    content: "Phase 1: Create 7 test accounts with password123 after DB reset"
    status: pending
  - id: phase2-free-buyer
    content: "Phase 2: Free Buyer - verify 403 on gated endpoints, UI explains blocks"
    status: pending
  - id: phase2-pro-buyer
    content: "Phase 2: Pro Buyer - filters persist, saved searches persist, AI deterministic"
    status: pending
  - id: phase2-elite-buyer
    content: "Phase 2: Elite Buyer - off-market API-gated, AI server-gated, priority messaging"
    status: pending
  - id: phase3-basic-seller
    content: "Phase 3: Basic Seller - autosave works, server rejects >1 listing"
    status: pending
  - id: phase3-featured-seller
    content: "Phase 3: Featured Seller - badge server-driven, homepage ordering correct"
    status: pending
  - id: phase3-premium-seller
    content: "Phase 3: Premium Seller - dealroom role-based, doc versioning, no step spoofing"
    status: pending
  - id: phase3-managed-sale
    content: "Phase 3: Managed Sale - deal manager in DB, audit trail, admin actions logged"
    status: pending
  - id: phase4-entitlements
    content: "Phase 4: Verify lib/entitlements.ts is single source of truth, server-side enforcement"
    status: pending
  - id: phase4-api-security
    content: "Phase 4: API routes check role & tier explicitly, no client-only security"
    status: pending
  - id: phase5-playwright
    content: "Phase 5: Run Playwright - buyer flow, seller flow, deal creation, checkout, access unlock"
    status: pending
  - id: phase5-regression-guards
    content: "Phase 5: Add regression tests - cross-role access, tier limits, admin-only routes"
    status: pending
  - id: phase6-admin-billing
    content: "Phase 6: Admin billing dashboard - MRR, subscriptions, payments, user plans"
    status: pending
  - id: phase6-admin-payments
    content: "Phase 6: Admin payments - transaction history, failed payments, revenue stats"
    status: pending
  - id: phase6.5-stripe-billing
    content: "Phase 6.5: Stripe billing - idempotency, state machine, reconciliation"
    status: pending
  - id: phase7-ux-polish
    content: "Phase 7: UX - mobile responsive, dark mode, empty states, loading skeletons"
    status: pending
  - id: phase7.5-email
    content: "Phase 7.5: Email & Notifications - SMTP, templates, env-correct links"
    status: pending
  - id: phase8-observability
    content: "Phase 8: Observability - error boundaries, structured logging, user-facing messages"
    status: pending
  - id: phase8-error-telemetry
    content: "Phase 8: Error telemetry - force failures, verify logging, no raw stack traces"
    status: pending
  - id: phase8.5-pii-privacy
    content: "Phase 8.5: PII & Privacy - no PII in logs, redact tokens, no secrets in errors"
    status: pending
  - id: phase9-security-bypass
    content: "Phase 9: Security - test tier bypass, JWT manipulation, admin route access"
    status: pending
  - id: phase9-security-abuse
    content: "Phase 9: Security - webhook replay, internal API access, rate limiting"
    status: pending
  - id: phase9.5-idor
    content: "Phase 9.5: IDOR & Ownership - cross-user access, resource ownership enforcement"
    status: pending
  - id: phase9.6-file-upload
    content: "Phase 9.6: File Upload - permissions, mime checks, storage, access control"
    status: pending
  - id: phase10-performance
    content: "Phase 10: Performance - FCP <2s, TTI <3s, API p95 <500ms, no N+1 queries"
    status: pending
  - id: phase10-ci-gates
    content: "Phase 10: CI/CD gates - fail build if performance targets unmet"
    status: pending
  - id: phase11-final-gate
    content: "Phase 11: Final gate - all success criteria met, production-ready sign-off"
    status: pending
---

# SellerFi Production Readiness Validation Plan

## Mission Statement

Validate that SellerFi is production-ready by:

- Verifying all buyer and seller tier features
- Ensuring entitlement correctness
- Eliminating browser/runtime errors
- Confirming database + schema integrity
- Establishing a repeatable regression workflow
- Proving platform readiness for GTM + investor review

---

## Phase 0: Environment Integrity & Safety (REQUIRED FIRST)

Before any functional testing, we must guarantee the system is stable, deterministic, and reproducible.

### 0.1 Database Integrity & Schema Sync

**Goal:** Eliminate schema drift and unstable migrations.

```bash
# Check migration status
npx prisma migrate status

# Verify schema matches
npx prisma db pull --print
# Compare with prisma/schema.prisma

# Reset if needed (DESTRUCTIVE)
npx prisma migrate reset --force
```

**Outcome:**

- Schema matches migrations exactly
- No hidden drift
- Safe baseline for testing

### 0.2 Build & Runtime Sanity Check

Run these commands in order:

```bash
npm run lint
npm run type-check
npm run build
npm run start
```

Then open in **Chrome** (NOT Safari, not Firefox).

**Confirm:**

- No red console errors
- No hydration warnings
- No server action mismatches
- No 500s in Network tab

### 0.3 Browser Parity & Cache Safety

To avoid false positives:

- Use fresh Chrome profile or **Incognito**
- Clear:
  - Application -> Storage
  - Cookies
  - IndexedDB
  - LocalStorage
- Disable extensions
- Confirm login flow works cleanly

---

## Phase 0.4: Production-Mode Rehearsal (NEW)

**Goal:** Prove the deployment artifact is healthy before shipping.

### 0.4.1 Production Environment Parity

```bash
# Create .env.staging from .env.production template
cp .env.production .env.staging

# Key differences to verify:
# - DATABASE_URL → staging/prod-like DB (Neon clone)
# - NEXTAUTH_URL → staging domain
# - STRIPE_SECRET_KEY → test mode key
# - STRIPE_WEBHOOK_SECRET → staging webhook secret
```

### 0.4.2 Staging DB Migration Test

```bash
# Clone production DB to staging (Neon)
# Or use a separate "prod-like" database

# Run migrations against staging
DATABASE_URL=$STAGING_DB_URL npx prisma migrate deploy

# Verify schema
DATABASE_URL=$STAGING_DB_URL npx prisma migrate status
```

### 0.4.3 Production Build Test

```bash
# Build with production env
NODE_ENV=production npm run build

# Start with production env
NODE_ENV=production npm run start

# Verify in browser:
# - No console errors
# - Auth flows work
# - API routes respond correctly
```

### 0.4.4 Webhook & Background Job Validation

| Component | Verification |
|-----------|--------------|
| Stripe webhooks | Trigger test event, confirm handler executes |
| Email sending | Send test email, verify delivery |
| Background jobs | Trigger job, verify completion |
| Scheduled tasks | Run manually, verify output |

```bash
# Test Stripe webhook locally with CLI
stripe trigger checkout.session.completed

# Verify webhook handler logs
tail -f logs/webhook.log
```

### 0.4.5 Checklist

- [ ] Staging DB migrated successfully
- [ ] Production build completes without errors
- [ ] App runs in production mode
- [ ] Webhooks fire and execute correctly
- [ ] Background jobs complete
- [ ] No environment variable mismatches

---

## Phase 0.5: Backward Compatibility & Migration Safety

**Goal:** Ensure future schema changes won't break existing users.

### 0.5.1 Legacy Data Seeding

Seed database with:

- Legacy listings (missing new fields like `readinessScore`, `competitionScore`)
- Old deals without escrow milestones
- Users without new entitlement flags (`isEliteBuyer`, `proofOfFundsVerified`)
- Subscriptions without `buyerPlan`/`sellerPlan` fields

```bash
# Create legacy test data script
npx tsx scripts/seed-legacy-data.ts
```

### 0.5.2 Verification Checklist

| Scenario | Expected Outcome |
|----------|------------------|
| Listing missing `readinessScore` | Renders with default/fallback |
| User missing `buyerTier` | Defaults to FREE |
| Deal without escrow milestones | Shows "No milestones" state |
| Subscription without plan fields | Treats as FREE tier |
| Dealroom without `ndaAccepted` | Shows pending state |

### 0.5.3 Required Patterns

All code must follow these patterns:

```typescript
// GOOD: Defensive null handling
const score = listing.readinessScore ?? 0
const tier = user.buyerTier || 'FREE'

// BAD: Assumes field exists
const score = listing.readinessScore! // NEVER DO THIS
```

**Verify:**

- No crashes with legacy data
- Sensible defaults applied
- UI degrades gracefully
- Nullable fields handled defensively
- Feature flags guard new behavior
- No `!` (non-null assertion) on DB fields

---

## Phase 1: Test Account Matrix

| Role | Tier | Email | Password | Price |
|------|------|-------|----------|-------|
| Buyer | Free | `buyer-free@test.com` | `password123` | $0 |
| Buyer | Pro | `buyer-pro@test.com` | `password123` | $19/mo |
| Buyer | Elite | `buyer-elite@test.com` | `password123` | $79/mo |
| Seller | Basic | `seller-basic@test.com` | `password123` | $19.95/mo |
| Seller | Featured | `seller-featured@test.com` | `password123` | $39/mo |
| Seller | Premium | `seller-premium@test.com` | `password123` | $59/mo |
| Seller | Managed | `seller-managed@test.com` | `password123` | $899 |

**Setup Requirements:**

- Create accounts fresh after DB reset
- Prefer Stripe test mode or seeded entitlements
- Use database seeding script or manual Stripe subscription

```bash
npm run db:seed
# Or use scripts/seed-test-billing.ts
```

---

## Phase 2: Buyer Tier Validation (Expanded)

### 2.1 Free Buyer

| Feature | Expected | Verification |
|---------|----------|--------------|
| Browse listings | Full access | Navigate to `/listings` |
| Contact sellers | Can send inquiry | Click "Contact Seller" |
| Basic search | Works | Use search bar |
| Save favorites | Limited to 3 | Try saving 4th, verify rejection |
| Form previews | Read-only | Navigate to `/learning/forms` |
| **API Gating** | 403 on gated endpoints | Call `/api/buyer/recommendations`, expect 403 |
| **UI Messaging** | Explains why blocked | Verify paywall shows upgrade CTA |

### 2.2 Buyer Pro ($19/mo)

| Feature | Expected | Verification |
|---------|----------|--------------|
| Everything in Free | Works | Re-verify all free features |
| Interactive forms | Full access to 21 forms | Forms are editable |
| AI recommendations | Panel visible | Check `/buyer/dashboard` |
| Deal alerts | Settings available | Check `/buyer/saved-searches` |
| Advanced filters | Extra filters | Check `/listings` |
| Market insights | Analytics visible | Check listing detail |
| **Filter persistence** | Survives refresh | Apply filter, refresh, verify |
| **Saved search persistence** | Survives logout | Save search, logout, login, verify |
| **AI determinism** | No hydration mismatch | Check console for hydration errors |

### 2.3 Elite Buyer ($79/mo)

| Feature | Expected | Verification |
|---------|----------|--------------|
| Everything in Pro | Works | Re-verify all Pro features |
| Elite badge | Shown on profile | Check `/buyer/dashboard`, dealrooms |
| Priority messaging | Priority indicator | Send message, check flag |
| Off-market access | Exclusive section | Check for off-market listings |
| Valuation tools | Widget available | Check listing detail |
| AI underwriting | Panel in dealroom | Check dealroom page |
| Negotiation guidance | Guidance panel | Check dealroom |
| **Off-market API gate** | Lower tiers get 403 | Test API as free user |
| **AI server-side gate** | Not just UI blocked | Verify server rejects unauthorized |
| **Priority reordering** | Messages actually flagged/reordered | Check seller inbox |

**Key Files:**

- `app/(main)/buyer/dashboard/page.tsx`
- `app/(main)/buyers/elite/page.tsx`
- `lib/entitlements.ts`

---

## Phase 3: Seller Tier Validation (Expanded)

### 3.1 Basic Seller ($19.95/mo)

| Feature | Expected | Verification |
|---------|----------|--------------|
| 1 listing per package | Can create 1 | Navigate to `/listings/new` |
| Forms library | Access | Check forms accessible |
| Dealroom messaging | Can message | Open dealroom, send message |
| NDA/LOI/PSA checklists | Available | Check dealroom docs |
| Doc exports | Works | Export from dealroom |
| Basic analytics | Views visible | Check `/seller/dashboard` |
| **Autosave** | Draft saves automatically | Create listing, verify autosave |
| **Server limit** | Rejects >1 listing | Try creating 2nd, expect rejection |

### 3.2 Featured Seller ($39/mo)

| Feature | Expected | Verification |
|---------|----------|--------------|
| Everything in Basic | Works | Re-verify all Basic features |
| Featured placement | On homepage | Check homepage for featured |
| Serious Seller badge | On listing | Check listing detail |
| AI Listing Assistant | Panel available | Check `/listings/[id]/edit` |
| Deal readiness score | Displayed | Check listing |
| Advanced analytics | Extended metrics | Check dashboard |
| **Badge server-driven** | Not client-only | Verify badge from API response |
| **Homepage ordering** | Featured first | Verify sort order |

### 3.3 Premium/Elite Seller ($59/mo)

| Feature | Expected | Verification |
|---------|----------|--------------|
| Everything in Featured | Works | Re-verify Featured features |
| Full doc bundle | All documents | Check dealroom |
| NDA/LOI/PSA generation | Auto-generation | Generate documents |
| Expert review | Scheduling available | Check booking |
| Priority support | Access granted | Verify support channel |
| Unlimited revisions | No limit | Edit forms multiple times |
| **Role-based permissions** | Dealroom enforced | Verify permissions |
| **Doc versioning** | Timestamps correct | Check document versions |
| **No step spoofing** | Server validates | Try skipping steps |

### 3.4 Managed Sale ($899 one-time)

| Feature | Expected | Verification |
|---------|----------|--------------|
| Everything in Elite | Works | Re-verify Elite features |
| Dedicated Deal Manager | Assigned | Check `/seller/managed-sale` |
| Professional Valuation | Report available | Check valuation |
| Buyer Pre-Qualification | Screening visible | Check qualification status |
| Negotiation Support | Available | Check guidance |
| Transaction Coordination | Dashboard works | Check managed sale dashboard |
| **Manager in DB** | Relationship exists | Query database |
| **Audit trail** | DealAuditLog entries | Check audit log |
| **Admin logging** | Actions logged | Verify admin actions recorded |

**Key Files:**

- `app/(main)/seller/dashboard/page.tsx`
- `app/(main)/managed-sale/page.tsx`
- `lib/actions/managed-sale.ts`

---

## Phase 4: Feature Completeness & Architecture Review

### 4.1 Must-Have Verifications

| Requirement | How to Verify |
|-------------|---------------|
| `lib/entitlements.ts` is single source of truth | All feature checks reference it |
| All UI gates backed by server-side | API routes return 403, not just hidden UI |
| No client-only security assumptions | Test with DevTools network manipulation |
| API routes check role & tier explicitly | Review route handlers |

### 4.2 Entitlement Gating Verification

Check `lib/entitlements.ts` properly gates:

- Form access by tier
- AI feature access
- Analytics levels
- Message limits
- Listing limits
- Off-market access
- Priority messaging

### 4.3 Add Regression Guards

Required Playwright tests:

- Buyer cannot access seller-only route
- Seller cannot exceed tier limits
- Admin-only routes reject non-admins
- Console error guard (fail on `console.error`)

---

## Phase 5: Automation & Regression

### 5.1 Required Playwright Runs

```bash
npm run test:e2e
```

**Must include:**

- Buyer flow (free, pro, elite)
- Seller flow (basic, featured, premium)
- Deal creation end-to-end
- Stripe checkout flow
- Post-payment access unlock

### 5.2 Regression Test Checklist

| Test | Purpose |
|------|---------|
| `e2e/chrome-buyer-seller-flows.spec.ts` | Cross-role flows |
| `e2e/pricing-checkout.spec.ts` | Stripe integration |
| `e2e/ai-elite-tools.spec.ts` | Elite feature gates |
| `e2e/forms-workflow.spec.ts` | Form access by tier |

### 5.3 Console Error Guard

Add to Playwright config:

```typescript
// Fail test if console.error is called
page.on('console', msg => {
  if (msg.type() === 'error') {
    throw new Error(`Console error: ${msg.text()}`);
  }
});
```

---

## Phase 6: Admin Dashboard - Billing & Accounting

### 6.1 Admin Billing Overview (`/admin/billing`)

| Metric | Verification |
|--------|--------------|
| MRR | Matches sum of active subscriptions |
| ARR | MRR x 12 |
| Active Subscriptions | Count matches database |
| 30-Day Churn | Cancelled in last 30 days |
| Failed Payments (7d) | Recent failures count |
| Plan Distribution | Basic/Featured/Elite/Buyer Pro breakdown |
| Recent Events | Stripe webhook log |

### 6.2 Admin Subscriptions (`/admin/billing/subscriptions`)

| Feature | Verification |
|---------|--------------|
| Subscription List | All subs with user details |
| Plan Type | Seller Plan + Buyer Plan badges |
| Status Badge | ACTIVE/PAST_DUE/CANCELLED/TRIALING |
| Stripe Links | Direct links to Stripe dashboard |
| Filters | By tier and status |

### 6.3 Admin Payments (`/super-admin/payments`)

| Feature | Verification |
|---------|--------------|
| Total Revenue | All-time sum |
| Monthly Revenue | Current month + growth |
| Payment History | User, amount, status, method, date |
| Status Badges | Color-coded by status |
| Filters | By status and payment method |
| Search | By email or payment ID |

### 6.4 User Detail Billing (`/super-admin/users/[id]`)

| Feature | Verification |
|---------|--------------|
| Subscription Tier | Current tier badge |
| Status | ACTIVE/CANCELLED indicator |
| Period End | Renewal date |
| Admin Toggles | Elite Buyer, Verified Seller |

---

## Phase 6.5: Stripe Webhook & Billing Idempotency (NEW)

**Goal:** Ensure billing state machine is robust and recoverable.

### 6.5.1 Webhook Idempotency

| Test | Expected Behavior |
|------|-------------------|
| Process same event twice | Second call is no-op |
| Event ID stored | `stripeEventId` in `BillingEvent` table |
| Duplicate detection | Returns 200, logs "already processed" |

```typescript
// lib/stripe/webhook-handler.ts
async function handleWebhook(event: Stripe.Event) {
  // Check if already processed
  const existing = await prisma.billingEvent.findUnique({
    where: { stripeEventId: event.id }
  });
  
  if (existing) {
    console.log(`Event ${event.id} already processed`);
    return { status: 'already_processed' };
  }
  
  // Process and store
  await prisma.billingEvent.create({
    data: {
      stripeEventId: event.id,
      type: event.type,
      processedAt: new Date(),
    }
  });
  
  // Handle event...
}
```

### 6.5.2 Billing State Machine Tests

| State Transition | Trigger | Expected Outcome |
|------------------|---------|------------------|
| `trialing` → `active` | Payment succeeds | Access granted |
| `active` → `past_due` | Payment fails | Grace period starts |
| `past_due` → `active` | Retry succeeds | Access restored |
| `past_due` → `canceled` | Max retries | Access revoked |
| `active` → `canceled` | User cancels | Access until period end |

```typescript
// e2e/billing-state-machine.spec.ts
test('subscription state transitions correctly', async () => {
  // Trigger trialing → active
  await stripe.testHelpers.testClocks.advance({ frozen_time: trialEndTime });
  await waitForWebhook('customer.subscription.updated');
  
  const user = await getUser(testUserId);
  expect(user.subscriptionStatus).toBe('ACTIVE');
});
```

### 6.5.3 Missed Webhook Recovery

| Scenario | Recovery Action |
|----------|-----------------|
| Webhook missed | Admin reconciliation button |
| State out of sync | Manual Stripe sync job |
| Duplicate charges | Refund + audit log |

**Admin Reconciliation Action:**

```typescript
// app/api/admin/billing/reconcile/route.ts
export async function POST(req: Request) {
  const { userId } = await req.json();
  
  // Fetch subscription from Stripe
  const sub = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
  
  // Update local state
  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionStatus: sub.status.toUpperCase(),
      subscriptionPeriodEnd: new Date(sub.current_period_end * 1000),
    }
  });
  
  // Log reconciliation
  await prisma.auditLog.create({
    data: {
      action: 'BILLING_RECONCILE',
      userId,
      details: { stripeStatus: sub.status },
    }
  });
}
```

### 6.5.4 Checklist

- [ ] Event IDs stored in database
- [ ] Duplicate webhooks ignored
- [ ] All state transitions tested
- [ ] Admin reconcile action works
- [ ] Audit log captures all billing changes

---

## Phase 7: UX & Polish Validation

| Check | Verification |
|-------|--------------|
| Mobile responsive | iPhone 14 viewport (390x844) |
| Dark mode | All pages render correctly |
| Empty states | New users see helpful content |
| Loading skeletons | No blank UI during loads |
| Error messages | Actionable, not technical |
| Accessibility | Keyboard navigation works |

---

## Phase 7.5: Email & Notifications Validation (NEW)

**Goal:** Emails are the first thing that breaks. Validate before launch.

### 7.5.1 Email Types to Test

| Email Type | Trigger | Must Verify |
|------------|---------|-------------|
| Email verification | Signup | Link works, correct env URL |
| Password reset | Forgot password | Token valid, expires correctly |
| Welcome email | First login | Renders correctly |
| Deal inquiry | Contact seller | Seller receives, reply works |
| Dealroom invite | Buyer added | Link works, permissions correct |
| Payment receipt | Subscription | Amount correct, PDF attachment |
| Payment failed | Retry | Clear CTA to update payment |
| Deal milestone | Stage change | Correct deal info |

### 7.5.2 SMTP Provider Validation

```bash
# Test SMTP connection
npx tsx scripts/test-email.ts

# Example test script
import { sendEmail } from '@/lib/email';

await sendEmail({
  to: 'test@example.com',
  subject: 'SellerFi Test Email',
  template: 'welcome',
  data: { name: 'Test User' },
});
```

### 7.5.3 Template Rendering

| Check | Verification |
|-------|--------------|
| HTML renders | No broken tags |
| Plain text fallback | Readable without HTML |
| Images load | Use absolute URLs |
| Mobile friendly | Width < 600px |
| Dark mode | Doesn't break in dark email clients |

### 7.5.4 Environment-Correct Links

| Environment | Base URL |
|-------------|----------|
| Local | `http://localhost:3000` |
| Staging | `https://staging.sellerfi.com` |
| Production | `https://app.sellerfi.com` |

```typescript
// lib/email.ts
const BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';

function getVerificationLink(token: string) {
  return `${BASE_URL}/auth/verify?token=${token}`;
}
```

### 7.5.5 Notification Channels

| Channel | Verification |
|---------|--------------|
| In-app notifications | Bell icon updates |
| Email notifications | Sent within 1 minute |
| Push notifications (if PWA) | Works on mobile |

### 7.5.6 Checklist

- [ ] SMTP connection works in staging
- [ ] All email templates render correctly
- [ ] Links point to correct environment
- [ ] Password reset tokens expire
- [ ] Unsubscribe links work
- [ ] Notification preferences respected

---

## Phase 8: Observability & Error Telemetry

**Goal:** Visibility when things break - not just "if it works, it's good."

### 8.1 Must-Have Infrastructure

| Component | Requirement |
|-----------|-------------|
| Global error boundary | Catches React errors, logs them, shows user-friendly message |
| API error logging | Structured JSON logs with context |
| User-facing error messages | Non-technical, actionable |
| Server logs tagged with | `userId`, `route`, `tier`, `correlationId` |

### 8.2 Error Boundary Implementation

```typescript
// components/error-boundary.tsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log to Sentry or custom logger
    logError({
      error: error.message,
      stack: error.stack,
      componentStack: info.componentStack,
      userId: getCurrentUserId(),
      route: window.location.pathname,
    });
  }
  
  render() {
    if (this.state.hasError) {
      return <UserFriendlyErrorPage />;
    }
    return this.props.children;
  }
}
```

### 8.3 API Error Logging Format

```typescript
// lib/api-logger.ts
function logApiError(req: Request, error: Error, context: object) {
  console.error(JSON.stringify({
    timestamp: new Date().toISOString(),
    correlationId: req.headers.get('x-correlation-id'),
    userId: context.userId,
    route: req.url,
    method: req.method,
    tier: context.userTier,
    error: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  }));
}
```

### 8.4 Verification Tests

| Test | How to Verify |
|------|---------------|
| Force API failure | Call invalid endpoint, confirm error is logged with context |
| Force permission failure | Access gated route, confirm 403 logged cleanly |
| Force React error | Throw in component, confirm boundary catches it |
| Raw stack traces | Confirm NO raw stack traces shown to users |
| Error contains userId | Check logs include user context |

---

## Phase 8.5: Data Privacy & PII Logging Risk (NEW)

**Goal:** Ensure no sensitive data leaks into logs or error responses.

### 8.5.1 PII Categories to Protect

| Category | Examples | Must NOT appear in logs |
|----------|----------|-------------------------|
| Personal | Email, phone, name | ✅ Redact |
| Financial | Card numbers, bank accounts | ✅ Redact |
| Auth | Passwords, tokens, JWTs | ✅ Redact |
| Business | SSN, EIN, financials | ✅ Redact |

### 8.5.2 Log Sanitization

```typescript
// lib/logger.ts
const REDACT_PATTERNS = [
  { pattern: /email["\s:]+["']?[\w.-]+@[\w.-]+/gi, replace: 'email: [REDACTED]' },
  { pattern: /password["\s:]+["']?[^"'\s,}]+/gi, replace: 'password: [REDACTED]' },
  { pattern: /token["\s:]+["']?[^"'\s,}]+/gi, replace: 'token: [REDACTED]' },
  { pattern: /\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/g, replace: '[CARD REDACTED]' },
  { pattern: /\b\d{3}-\d{2}-\d{4}\b/g, replace: '[SSN REDACTED]' },
];

function sanitizeLog(data: string): string {
  let result = data;
  for (const { pattern, replace } of REDACT_PATTERNS) {
    result = result.replace(pattern, replace);
  }
  return result;
}
```

### 8.5.3 Error Response Sanitization

```typescript
// lib/api-error-handler.ts
function sanitizeErrorResponse(error: Error) {
  // Never return stack traces in production
  if (process.env.NODE_ENV === 'production') {
    return {
      message: 'An error occurred. Please try again.',
      code: 'INTERNAL_ERROR',
      // NO stack, NO details, NO PII
    };
  }
  
  // In development, still redact PII
  return {
    message: sanitize(error.message),
    code: error.code,
  };
}
```

### 8.5.4 Cookie & Token Redaction

```typescript
// middleware.ts - Don't log full cookies
const logSafeHeaders = {
  ...headers,
  cookie: '[REDACTED]',
  authorization: headers.authorization ? '[BEARER TOKEN]' : undefined,
};
```

### 8.5.5 Verification Tests

| Test | Expected |
|------|----------|
| Log API error with email in body | Email is redacted |
| Log failed login | Password not in logs |
| Error response in prod | No stack trace |
| Stripe webhook log | Card info redacted |
| JWT in error | Token redacted |

### 8.5.6 Checklist

- [ ] No emails in server logs
- [ ] No passwords in any logs
- [ ] No card numbers in logs
- [ ] No JWTs in error responses
- [ ] Stack traces only in development
- [ ] Error responses are user-friendly

---

## Phase 9: Security & Abuse Scenarios

**Goal:** Validate adversarial paths, not just happy paths.

### 9.1 Tier Bypass Attacks

| Scenario | Attack | Expected Outcome |
|----------|--------|------------------|
| Modify request body | Change `tier: 'FREE'` to `tier: 'ELITE'` in request | 403 Rejected |
| Modify JWT | Change role claim in JWT | Token rejected/invalid |
| Access admin route | User navigates to `/super-admin/*` | 403 Forbidden |
| Replay payment webhook | Resend old Stripe webhook | Ignored (idempotent) |
| Call internal APIs | Direct call to `/api/admin/*` | 401/403 |
| Spam actions | Rapid-fire requests | Rate limited |

### 9.2 Security Test Implementation

```typescript
// e2e/security-bypass.spec.ts
test('cannot bypass tier via request body manipulation', async ({ request }) => {
  const response = await request.post('/api/buyer/recommendations', {
    headers: { Authorization: `Bearer ${freeUserToken}` },
    data: { tier: 'ELITE' } // Attempted bypass
  });
  expect(response.status()).toBe(403);
});

test('cannot access admin routes as regular user', async ({ page }) => {
  await loginAs('buyer-free@test.com');
  const response = await page.goto('/super-admin/users');
  expect(response?.status()).toBe(403);
});

test('webhook replay is ignored', async ({ request }) => {
  const webhookPayload = getOldWebhookPayload();
  const response = await request.post('/api/billing/webhook', {
    data: webhookPayload,
    headers: { 'stripe-signature': 'old-signature' }
  });
  // Should either reject or be idempotent
  expect([200, 400]).toContain(response.status());
});
```

### 9.3 Rate Limiting Verification

```bash
# Test rate limiting
for i in {1..100}; do
  curl -X POST http://localhost:3000/api/contact-seller \
    -H "Content-Type: application/json" \
    -d '{"message": "test"}' &
done

# Expect: After threshold, receive 429 Too Many Requests
```

### 9.4 Required Security Headers

Verify these headers are present:

| Header | Value |
|--------|-------|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Content-Security-Policy` | Restrictive policy |
| `Strict-Transport-Security` | `max-age=31536000` |

---

## Phase 9.5: IDOR & Resource Ownership (NEW)

**Goal:** Users cannot access other users' resources.

### 9.5.1 Resource Ownership Rules

| Resource | Owner | Who Can Access |
|----------|-------|----------------|
| Dealroom | Buyer + Seller | Only participants |
| Listing analytics | Seller | Only listing owner |
| Messages | Sender + Recipient | Only thread participants |
| Documents | Uploader | Only dealroom participants |
| User profile | User | User + Admin |
| Payment history | User | User + Admin |

### 9.5.2 Negative Test Cases (MUST IMPLEMENT)

```typescript
// e2e/idor-protection.spec.ts

test('buyer cannot access another buyer\'s dealroom', async ({ page }) => {
  await loginAs('buyer-free@test.com');
  // Attempt to access dealroom they're not part of
  const response = await page.goto('/dealrooms/other-user-dealroom-id');
  expect(response?.status()).toBe(403);
});

test('seller cannot view other seller\'s listing analytics', async ({ page }) => {
  await loginAs('seller-basic@test.com');
  // Attempt to access another seller's analytics
  const response = await page.request.get('/api/listings/other-listing-id/analytics');
  expect(response.status()).toBe(403);
});

test('user cannot download documents from non-member dealroom', async ({ request }) => {
  const response = await request.get('/api/documents/other-dealroom-doc-id');
  expect(response.status()).toBe(403);
});

test('user cannot read messages from other threads', async ({ request }) => {
  const response = await request.get('/api/messages/thread/other-thread-id');
  expect(response.status()).toBe(403);
});
```

### 9.5.3 API Route Ownership Checks

```typescript
// app/api/dealrooms/[id]/route.ts
export async function GET(req: Request, { params }) {
  const session = await getServerSession();
  const dealroom = await prisma.dealroom.findUnique({
    where: { id: params.id },
    include: { buyer: true, seller: true }
  });
  
  // CRITICAL: Check ownership
  if (dealroom.buyerId !== session.user.id && 
      dealroom.sellerId !== session.user.id &&
      session.user.role !== 'ADMIN') {
    return new Response('Forbidden', { status: 403 });
  }
  
  return Response.json(dealroom);
}
```

### 9.5.4 Checklist

- [ ] Dealroom access blocked for non-participants
- [ ] Listing analytics blocked for non-owners
- [ ] Document downloads blocked for non-members
- [ ] Message threads blocked for non-participants
- [ ] All IDOR tests in Playwright suite

---

## Phase 9.6: File Upload & Document Storage (NEW)

**Goal:** Secure file handling with proper access control.

### 9.6.1 Upload Permission Matrix

| Resource | Who Can Upload | Who Can Download |
|----------|----------------|------------------|
| Listing images | Listing owner | Public |
| Dealroom documents | Dealroom participants | Dealroom participants |
| NDA/LOI/PSA | Generated by system | Dealroom participants |
| User avatar | User | Public |
| Proof of funds | Buyer | Seller in dealroom |

### 9.6.2 File Validation

```typescript
// lib/file-upload.ts
const ALLOWED_TYPES = {
  document: ['application/pdf', 'image/jpeg', 'image/png'],
  image: ['image/jpeg', 'image/png', 'image/webp'],
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

async function validateUpload(file: File, category: string) {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File too large');
  }
  
  // Check MIME type (from file header, not extension)
  const buffer = await file.arrayBuffer();
  const detectedType = detectFileType(buffer);
  
  if (!ALLOWED_TYPES[category].includes(detectedType)) {
    throw new Error('Invalid file type');
  }
  
  // Basic virus scan / content validation
  if (await isMalicious(buffer)) {
    throw new Error('File rejected');
  }
}
```

### 9.6.3 Storage & Access Control

```typescript
// lib/storage.ts
async function getSignedDownloadUrl(documentId: string, userId: string) {
  const doc = await prisma.document.findUnique({
    where: { id: documentId },
    include: { dealroom: true }
  });
  
  // Check access
  const hasAccess = await canAccessDocument(userId, doc);
  if (!hasAccess) {
    throw new Error('Access denied');
  }
  
  // Return signed URL (expires in 1 hour)
  return s3.getSignedUrl('getObject', {
    Bucket: process.env.S3_BUCKET,
    Key: doc.storageKey,
    Expires: 3600,
  });
}
```

### 9.6.4 Test Cases

| Test | Expected |
|------|----------|
| Upload PDF as Basic seller | Success |
| Upload .exe disguised as PDF | Rejected |
| Upload 50MB file | Rejected (size limit) |
| Download document from non-member dealroom | 403 |
| Download with expired URL | 401 |
| Upload as Free buyer (if restricted) | 403 |

### 9.6.5 Checklist

- [ ] File type validated from content, not extension
- [ ] File size limits enforced
- [ ] Upload permissions match tier
- [ ] Download URLs are signed and expire
- [ ] Non-participants cannot download
- [ ] Storage paths are not guessable

---

## Phase 10: Performance & UX Friction

**Goal:** Investors will feel this more than they say. Slow = unprofessional.

### 10.1 Performance Targets

| Metric | Target | Tool |
|--------|--------|------|
| First Contentful Paint (FCP) | < 2s | Chrome Lighthouse |
| Time to Interactive (TTI) | < 3s | Chrome Lighthouse |
| Page transitions | < 300ms | Manual timing |
| API latency (p95) | < 500ms | Server logs |
| DB query count | No N+1 queries | Prisma query logs |
| Largest Contentful Paint | < 2.5s | Chrome Lighthouse |
| Cumulative Layout Shift | < 0.1 | Chrome Lighthouse |

### 10.2 Measurement Tools

```bash
# Run Lighthouse CI
npm install -g @lhci/cli
lhci autorun

# Enable Prisma query logging
# In .env: DATABASE_URL with ?connection_limit=5
# In schema.prisma: 
#   generator client {
#     previewFeatures = ["metrics"]
#   }
```

### 10.3 React Profiler Check

```typescript
// Wrap critical components
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  if (actualDuration > 16) { // 60fps = 16ms budget
    console.warn(`Slow render: ${id} took ${actualDuration}ms`);
  }
}

<Profiler id="BuyerDashboard" onRender={onRenderCallback}>
  <BuyerDashboard />
</Profiler>
```

### 10.4 N+1 Query Detection

```typescript
// lib/prisma.ts - Add query logging
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
  ],
});

let queryCount = 0;
prisma.$on('query', (e) => {
  queryCount++;
  if (queryCount > 10) {
    console.warn(`Potential N+1: ${queryCount} queries in single request`);
  }
});
```

### 10.5 CI/CD Performance Gates

Add to CI pipeline:

```yaml
# .github/workflows/performance.yml
name: Performance Gates

on: [push, pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run start &
      - run: npx wait-on http://localhost:3000
      
      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/listings
            http://localhost:3000/pricing
          budgetPath: ./lighthouse-budget.json
          uploadArtifacts: true

  # Fail if performance budget exceeded
  performance-budget:
    runs-on: ubuntu-latest
    steps:
      - name: Check performance metrics
        run: |
          FCP=$(cat lighthouse-report.json | jq '.audits["first-contentful-paint"].numericValue')
          if [ "$FCP" -gt 2000 ]; then
            echo "FCP exceeds 2s target: ${FCP}ms"
            exit 1
          fi
```

### 10.6 Lighthouse Budget File

```json
[
  {
    "path": "/*",
    "timings": [
      { "metric": "first-contentful-paint", "budget": 2000 },
      { "metric": "interactive", "budget": 3000 },
      { "metric": "largest-contentful-paint", "budget": 2500 }
    ],
    "resourceCounts": [
      { "resourceType": "script", "budget": 10 },
      { "resourceType": "total", "budget": 50 }
    ],
    "resourceSizes": [
      { "resourceType": "script", "budget": 500 },
      { "resourceType": "total", "budget": 1000 }
    ]
  }
]
```

---

## Phase 11: Success Criteria (Final Gate)

**All of the following must be true:**

### Environment & Build

- [ ] No console errors in Chrome
- [ ] No hydration or SSR mismatches
- [ ] No 500 errors in Network tab
- [ ] Login flow works cleanly in incognito
- [ ] `npm run lint` - zero errors
- [ ] `npm run type-check` - zero errors
- [ ] `npm run build` - succeeds
- [ ] Production-mode rehearsal passes

### Schema & Data

- [ ] No schema drift (`prisma migrate status`)
- [ ] Legacy data doesn't crash app
- [ ] Sensible defaults for missing fields
- [ ] Staging DB migrations succeed

### Features & Entitlements

- [ ] All tiers enforce entitlements correctly
- [ ] Server-side enforcement (not just UI)
- [ ] Stripe test payments succeed
- [ ] Admin can see all billing/payment data

### Billing

- [ ] Webhook idempotency works
- [ ] All state transitions tested
- [ ] Reconciliation action available
- [ ] Billing events audited

### Email & Notifications

- [ ] SMTP works in staging
- [ ] Templates render correctly
- [ ] Links point to correct environment
- [ ] Unsubscribe works

### Automation

- [ ] All Playwright tests pass
- [ ] Security tests pass
- [ ] IDOR tests pass
- [ ] Console error guard active

### Observability

- [ ] Error boundaries catch React errors
- [ ] API errors logged with context
- [ ] No raw stack traces to users

### Privacy

- [ ] No PII in logs
- [ ] Tokens redacted
- [ ] Error responses sanitized

### Security

- [ ] Tier bypass rejected
- [ ] Admin routes protected
- [ ] Webhook replay ignored
- [ ] Rate limiting active
- [ ] IDOR protection verified
- [ ] File upload validated

### Performance

- [ ] FCP < 2s
- [ ] TTI < 3s
- [ ] API p95 < 500ms
- [ ] No N+1 queries
- [ ] CI gates enforce budgets

### UX

- [ ] Mobile responsive
- [ ] Dark mode correct
- [ ] Empty states helpful
- [ ] Loading skeletons present
- [ ] App usable end-to-end without manual intervention

---

## Files to Modify if Issues Found

| Issue | File to Fix |
|-------|-------------|
| Entitlement logic | `lib/entitlements.ts` |
| Paywall UI | `components/paywall.tsx` |
| Buyer dashboard | `app/(main)/buyer/dashboard/page.tsx` |
| Seller dashboard | `app/(main)/seller/dashboard/page.tsx` |
| Dealroom features | `app/(main)/dealrooms/[id]/page.tsx` |
| API security | `app/api/**/*.ts` route handlers |
| Admin billing | `app/(admin)/admin/billing/page.tsx` |
| Prisma schema | `prisma/schema.prisma` |
| Error boundary | `components/error-boundary.tsx` |
| API logger | `lib/api-logger.ts` |
| Rate limiter | `lib/rate-limit.ts` |
| Performance config | `lighthouse-budget.json` |
| Webhook handler | `lib/stripe/webhook-handler.ts` |
| Email templates | `lib/email/templates/` |
| File upload | `lib/file-upload.ts` |
| PII sanitizer | `lib/logger.ts` |

---

## Execution Checklist

```
Phase 0: Environment Integrity
[ ] prisma migrate status - no drift
[ ] npm run lint - zero errors
[ ] npm run type-check - zero errors
[ ] npm run build - succeeds
[ ] npm run start - runs cleanly
[ ] Chrome incognito - no console errors

Phase 0.4: Production Rehearsal
[ ] Staging DB migrated
[ ] Production build works
[ ] Webhooks fire correctly
[ ] Background jobs complete
[ ] Env vars match production

Phase 0.5: Backward Compatibility
[ ] Legacy listings render without crash
[ ] Legacy users treated as FREE tier
[ ] Missing fields use sensible defaults
[ ] No non-null assertions on DB fields

Phase 1: Account Setup
[ ] 7 test accounts created
[ ] Subscriptions seeded/purchased

Phase 2: Buyer Validation
[ ] Free Buyer - all checks pass
[ ] Pro Buyer - all checks pass
[ ] Elite Buyer - all checks pass

Phase 3: Seller Validation
[ ] Basic Seller - all checks pass
[ ] Featured Seller - all checks pass
[ ] Premium Seller - all checks pass
[ ] Managed Sale - all checks pass

Phase 4: Architecture Review
[ ] Entitlements are single source of truth
[ ] Server-side enforcement verified
[ ] API security audited

Phase 5: Automation
[ ] Playwright tests pass
[ ] Regression guards added

Phase 6: Admin Dashboard
[ ] Billing overview accurate
[ ] Payments tracking works
[ ] User billing visible

Phase 6.5: Stripe Billing
[ ] Webhook idempotency verified
[ ] State transitions tested
[ ] Reconciliation action works
[ ] Billing events audited

Phase 7: UX Polish
[ ] Mobile responsive
[ ] Dark mode correct
[ ] Empty states helpful

Phase 7.5: Email & Notifications
[ ] SMTP works in staging
[ ] Templates render correctly
[ ] Links point to correct env
[ ] Unsubscribe works

Phase 8: Observability
[ ] Error boundaries implemented
[ ] API logging structured
[ ] No raw stack traces to users
[ ] Errors contain userId/route/tier

Phase 8.5: PII & Privacy
[ ] No emails in logs
[ ] No passwords in logs
[ ] Tokens redacted
[ ] Error responses sanitized

Phase 9: Security
[ ] Tier bypass rejected (403)
[ ] JWT manipulation rejected
[ ] Admin routes protected
[ ] Webhook replay ignored
[ ] Rate limiting active

Phase 9.5: IDOR Protection
[ ] Cross-user dealroom access blocked
[ ] Listing analytics blocked for non-owners
[ ] Document downloads blocked
[ ] Message threads blocked

Phase 9.6: File Upload
[ ] Type validation works
[ ] Size limits enforced
[ ] Permissions checked
[ ] Signed URLs work

Phase 10: Performance
[ ] FCP < 2s
[ ] TTI < 3s
[ ] API p95 < 500ms
[ ] No N+1 queries detected
[ ] CI gates configured

Phase 11: Final Sign-off
[ ] All success criteria met
[ ] Production-ready for GTM + investor review
```
