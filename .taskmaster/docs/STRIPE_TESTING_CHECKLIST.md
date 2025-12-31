# 💳 Stripe Billing Testing Checklist

**Status**: Ready for testing when API keys are available  
**Created**: December 30, 2025  
**Priority**: Production Readiness - Phase 4

---

## 🔑 Prerequisites (What You Need)

Before testing, ensure you have:

### 1. Stripe API Keys (from Stripe Dashboard → Developers → API Keys)
```bash
# Test Mode (for development/staging)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# For webhook testing
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 2. Stripe Products & Prices Created

| Product | Price ID Environment Variable | Price |
|---------|------------------------------|-------|
| Basic Seller | `STRIPE_PRICE_BASIC_MONTHLY` | $19.95/mo |
| Featured Seller | `STRIPE_PRICE_FEATURED_MONTHLY` | $39/mo |
| Premium Seller | `STRIPE_PRICE_ELITE_MONTHLY` | $59/mo |
| Managed Sale | `STRIPE_PRICE_MANAGED_SALE` | $899 one-time |
| Buyer Pro | `STRIPE_PRICE_BUYER_PRO_MONTHLY` | $19/mo |
| Buyer Elite | `STRIPE_PRICE_BUYER_ELITE_MONTHLY` | $79/mo |

### 3. Webhook Endpoint Configured
```
URL: https://your-domain.com/api/stripe/webhook
Events: customer.subscription.*, invoice.*, checkout.session.completed
```

---

## 📋 Pre-Requisites Already Completed ✅

These items are already in place and verified:

- ✅ **Stripe SDK** installed and configured (`lib/stripe.ts`)
- ✅ **Webhook handlers** implemented with signature verification (`app/api/billing/webhook/route.ts`, `app/api/stripe/webhook/route.ts`)
- ✅ **Idempotency protection** for duplicate webhook events
- ✅ **Price-to-tier mapping** in webhook handler
- ✅ **Checkout session creation** for all plan types
- ✅ **Subscription model** in database schema
- ✅ **Entitlements system** that reads from subscription tier
- ✅ **Product configuration** centralized in `lib/stripe-products.ts`
- ✅ **Setup guide** documented in `docs/STRIPE_SETUP_GUIDE.md`

---

## 🧪 Testing Phases

### Phase 1: Stripe CLI Local Testing (No Live Keys Needed)

Install Stripe CLI and forward webhooks locally:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login (uses test account)
stripe login

# Forward webhooks to local dev server
stripe listen --forward-to localhost:3000/api/stripe/webhook

# In another terminal, trigger test events
stripe trigger customer.subscription.created
stripe trigger checkout.session.completed
stripe trigger invoice.paid
stripe trigger customer.subscription.deleted
```

**Verify in logs:**
- ✅ Webhook signature verification passes
- ✅ Event processed without errors
- ✅ Database subscription record updates

---

### Phase 2: Checkout Flow Testing

#### Test Case 2.1: Seller Basic Plan Subscription
1. Login as `seller-basic@test.com`
2. Navigate to `/pricing`
3. Click "Get Started" on Basic plan
4. Complete checkout with test card: `4242 4242 4242 4242`
5. **Verify:**
   - [ ] Redirects to `/seller/dashboard?session_id=...`
   - [ ] Subscription record created in database
   - [ ] User tier updated to BASIC
   - [ ] Webhook event received in Stripe dashboard

#### Test Case 2.2: Seller Featured Plan Subscription
1. Login as new seller account
2. Complete Featured plan checkout
3. **Verify:**
   - [ ] Featured badge shows on listing
   - [ ] Advanced analytics accessible
   - [ ] AI Listing Assistant available

#### Test Case 2.3: Seller Premium Plan Subscription
1. Login as new seller account
2. Complete Premium plan checkout
3. **Verify:**
   - [ ] All Premium features unlocked
   - [ ] Priority support indicator visible
   - [ ] Form generation tools accessible

#### Test Case 2.4: Buyer Pro Subscription
1. Login as `buyer-free@test.com`
2. Navigate to `/buyers/pro`
3. Complete Buyer Pro checkout
4. **Verify:**
   - [ ] AI recommendations enabled
   - [ ] Advanced search filters available
   - [ ] Saved searches unlimited

#### Test Case 2.5: Buyer Elite Subscription
1. Login as buyer account
2. Complete Elite checkout
3. **Verify:**
   - [ ] Elite badge displays
   - [ ] Off-market listings accessible
   - [ ] AI underwriting tools available

---

### Phase 3: Subscription State Machine Testing

#### Test Case 3.1: New Subscription (trialing → active)
```bash
stripe trigger customer.subscription.created
```
- [ ] User gains access immediately
- [ ] `status: ACTIVE` in database
- [ ] Email notification sent (if configured)

#### Test Case 3.2: Payment Success (invoice.paid)
```bash
stripe trigger invoice.paid
```
- [ ] Subscription period extends
- [ ] Payment history record created
- [ ] No disruption to access

#### Test Case 3.3: Payment Failed (invoice.payment_failed)
```bash
stripe trigger invoice.payment_failed
```
- [ ] User notified of failure
- [ ] Grace period behavior works
- [ ] Retry logic triggers

#### Test Case 3.4: Subscription Canceled (customer.subscription.deleted)
```bash
stripe trigger customer.subscription.deleted
```
- [ ] Access continues until period end
- [ ] `cancelAtPeriodEnd: true` in database
- [ ] Downgrade messaging shown

#### Test Case 3.5: Plan Upgrade (subscription.updated)
1. Subscribe to Basic plan
2. Upgrade to Featured
3. **Verify:**
   - [ ] Prorated billing calculated
   - [ ] Immediate tier upgrade
   - [ ] Webhook processed

#### Test Case 3.6: Plan Downgrade
1. Subscribe to Premium plan
2. Downgrade to Basic
3. **Verify:**
   - [ ] Downgrade scheduled for period end
   - [ ] Features remain until period end
   - [ ] Correct tier applied at renewal

---

### Phase 4: Idempotency & Error Handling

#### Test Case 4.1: Duplicate Webhook
1. Send same event twice
2. **Verify:**
   - [ ] Second event returns `{ duplicate: true }`
   - [ ] No duplicate database records
   - [ ] No duplicate emails

#### Test Case 4.2: Invalid Signature
1. Send webhook with wrong signature
2. **Verify:**
   - [ ] Returns 400 error
   - [ ] Event not processed
   - [ ] Error logged

#### Test Case 4.3: Missing Metadata
1. Create checkout with missing `userId`
2. **Verify:**
   - [ ] Returns 400 with clear error
   - [ ] No partial records created

#### Test Case 4.4: Database Error During Processing
1. Simulate DB connection failure
2. **Verify:**
   - [ ] Returns 500 error
   - [ ] Stripe retries event
   - [ ] Error logged with correlation ID

---

### Phase 5: Billing Admin Dashboard Verification

#### Test Case 5.1: Subscription Visibility
1. Login as admin (`jaydubya818@yahoo.com`)
2. Navigate to `/super-admin/subscriptions`
3. **Verify:**
   - [ ] All subscriptions listed
   - [ ] Filter by tier works
   - [ ] Status indicators accurate

#### Test Case 5.2: Payment History
1. Navigate to `/super-admin/payments`
2. **Verify:**
   - [ ] All payments visible
   - [ ] Amount and status correct
   - [ ] User association works

#### Test Case 5.3: Billing Overview
1. Navigate to `/admin/billing`
2. **Verify:**
   - [ ] MRR calculated correctly
   - [ ] Subscription counts accurate
   - [ ] Recent activity shows

---

### Phase 6: Edge Cases & Security

#### Test Case 6.1: Expired Session
1. Let checkout session expire (24 hours)
2. Try to complete payment
3. **Verify:**
   - [ ] User-friendly error message
   - [ ] Can restart checkout

#### Test Case 6.2: Invalid Plan ID
1. Call `/api/billing/subscribe` with invalid plan
2. **Verify:**
   - [ ] Returns 400 error
   - [ ] No Stripe session created

#### Test Case 6.3: Unauthorized Access
1. Try to subscribe without authentication
2. **Verify:**
   - [ ] Returns 401 error
   - [ ] Redirects to login

#### Test Case 6.4: Webhook Replay Attack
1. Replay old webhook event
2. **Verify:**
   - [ ] Idempotency key prevents reprocessing
   - [ ] Returns success but no action

---

## 🔧 Quick Setup Commands

When you have your API keys, run these commands:

```bash
# 1. Add keys to .env.local
cat >> .env.local << EOF
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE

# Price IDs (get from Stripe Dashboard after creating products)
STRIPE_PRICE_BASIC_MONTHLY=price_xxx
STRIPE_PRICE_FEATURED_MONTHLY=price_xxx
STRIPE_PRICE_ELITE_MONTHLY=price_xxx
STRIPE_PRICE_MANAGED_SALE=price_xxx
STRIPE_PRICE_BUYER_PRO_MONTHLY=price_xxx
STRIPE_PRICE_BUYER_ELITE_MONTHLY=price_xxx
EOF

# 2. Sync products to Stripe (creates products/prices)
npx tsx scripts/stripe-sync-products.ts

# 3. Start webhook listener
stripe listen --forward-to localhost:3000/api/stripe/webhook

# 4. Start dev server
npm run dev

# 5. Run billing E2E tests (when created)
npx playwright test e2e/billing.spec.ts
```

---

## 📊 Test Cards Reference

| Card Number | Behavior |
|-------------|----------|
| `4242 4242 4242 4242` | Success |
| `4000 0000 0000 0002` | Card declined |
| `4000 0000 0000 9995` | Insufficient funds |
| `4000 0025 0000 3155` | 3D Secure required |
| `4000 0000 0000 0341` | Attaching fails |
| `4100 0000 0000 0019` | Disputed (fraud) |

Use any future expiry date, any 3-digit CVC, any 5-digit ZIP.

---

## ✅ Success Criteria

All tests pass when:

1. **Checkout flows complete** for all 6 plan types
2. **Webhooks process correctly** with signature verification
3. **Database updates** reflect subscription state accurately
4. **Entitlements unlock** based on subscription tier
5. **Idempotency works** - no duplicate processing
6. **Error handling** is user-friendly
7. **Admin dashboard** shows accurate billing data
8. **State transitions** work (upgrade, downgrade, cancel)

---

## 📝 Notes

- All webhook handlers include signature verification ✅
- Idempotency is implemented via `stripePaymentIntentId` checks ✅
- Price-to-tier mapping configured in `lib/stripe/webhook-handler.ts`
- Full setup guide available at `docs/STRIPE_SETUP_GUIDE.md`

