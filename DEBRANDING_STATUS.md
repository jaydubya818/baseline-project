# SellerFi → Baseline Project Debranding Status

## ✅ Completed (Committed)

The following core user-facing files have been updated to remove SellerFi branding:

### Main Project Files
- **README.md** - Removed all SellerFi mentions, updated to "Baseline Project"
  - Removed live demo URL (seller-fi.vercel.app)
  - Changed GitHub URLs from jaydubya818/SellerFi to generic
  - Updated design philosophy from "Stripe-inspired" to "modern"
  - Changed agent config reference from SELLERFI_AGENT_CONFIG.md to AGENT_CONFIG.md

- **package.json** - Updated project metadata
  - Name: `seller-financing-platform` → `baseline-project`
  - Description: Generic baseline project description
  - Keywords: Removed seller-financing, added ai-development
  - Author: `SellerFi` → `Baseline Project`

- **.cursorrules** - Updated header to "Baseline Project"

- **AGENTS.md** - Made PostgreSQL examples generic

- **CLAUDE.md** - Changed database examples
  - Database names: `sellerfi` → `myapp`
  - Role names: `sellerfi_app` → `myapp_app`

- **.env.example** - Updated database name
  - `sellerfin_dev` → `myapp_dev`

- **.cursor/rules/ai-tooling.mdc** - Removed SellerFi-specific references

---

## 🔄 Remaining Work (690+ references)

The following areas still contain SellerFi references and should be updated based on your specific use case:

### Scripts Directory (~150 references)
Files that contain SellerFi or seller-financing references:
- `scripts/test-unified-templates.ts`
- `scripts/test-stripe-integration.ts`
- `scripts/test-production-endpoints.ts`
- `scripts/test-email-templates.ts`
- `scripts/stripe-sync-products.ts`
- `scripts/setup-stripe-products.ts`
- `scripts/seed-sample-listings.ts`
- `scripts/seed-managed-sale-demo.ts`
- `scripts/seed-knowledge-base.ts`
- `scripts/seed-comprehensive.ts`
- `scripts/seed-document-templates.ts`
- `scripts/run-worker.ts`
- `scripts/ralph/prd.json`
- `scripts/ralph/QUICK_START.md`
- `scripts/pre-test-qa-checklist.sh`
- `scripts/monitoring/verify-production.sh`
- `scripts/monitoring/production-health-check.sql`
- `scripts/monitoring/cohort-recruitment-email.md`
- `scripts/deploy-staging.sh`
- `scripts/cron/check-metrics-expiration.ts`
- `scripts/cron-monitoring.js`
- `scripts/bump-version.js`
- `scripts/bootstrap-ai-tooling.sh`
- `scripts/backup-database.ts`
- `scripts/verify-production-env.ts`
- `scripts/setup-webhook.sh`
- `scripts/clean-git-history.sh`
- `scripts/rag-ingest.ts`

### Taskmaster Directory (~50 references)
- `.taskmaster/docs/professional-recommendations-prd.txt`
- `.taskmaster/docs/prd.txt` - Main PRD with SellerFin business description
- `.taskmaster/docs/UX_POLISH_REPORT.md`
- `.taskmaster/docs/SECURITY_REPORT.md`
- `.taskmaster/docs/PRODUCTION_READINESS_SUMMARY.md`
- `.taskmaster/docs/PERFORMANCE_REPORT.md`
- `.taskmaster/docs/OBSERVABILITY_REPORT.md`
- `.taskmaster/docs/IDOR_PROTECTION_REPORT.md`
- `.taskmaster/tasks/tasks.json` - Task definitions with seller-financing features
- `.taskmaster/tasks/task_*.txt` files

### Claude/AI Configuration (~400 references)
- `.claude/skills/` - Multiple skill files with SellerFi context
  - `fintech-developer/skill.md` - Contains seller-financing specific examples
  - `ui-ux-designer/skill.md`
  - `nextjs-fullstack-architect/skill.md`
  - `design-system-architect/skill.md`
  - `cloud-infrastructure-architect/skill.md` - Infrastructure names
  - `skill-rules.json`
- `.claude/integration/command-registry.md`
- `.claude/install-slash-commands.sh`
- `.claude/context-cache/` - Cached file summaries
- `.claude/ralph-wiggum/` - Validation files
- `.claude/plans/production-readiness-plan.md`
- `.mcp.json` - Workspace root path

### GitHub Workflows (~10 references)
- `.github/workflows/production-cicd.yml` - Production URL references

### Development Guide
- `DEVELOPMENT_GUIDE.md` - Contains seller-financing platform examples
- `TASKMASTER_SETUP.md` - Contains old file paths

---

## 📋 Recommended Next Steps

### Option 1: Complete Debranding (Recommended for Public Baseline)
If you want this to be a completely generic baseline project:

1. **Update Scripts** - Replace seller-financing logic with generic marketplace/SaaS examples
2. **Update PRD** - Rewrite `.taskmaster/docs/prd.txt` with generic product requirements
3. **Update Tasks** - Modify task definitions to be feature-agnostic
4. **Update Skills** - Make fintech-developer skill generic or remove it
5. **Update Infrastructure** - Change cloud resource names in terraform examples
6. **Update Workflows** - Remove production URL references

### Option 2: Keep as Example Implementation
If you want to keep SellerFi as a reference implementation:

1. Add a note in README.md explaining this is based on a seller-financing platform
2. Keep the domain logic as examples of how to implement marketplace features
3. Document that users should search/replace business-specific terms

### Option 3: Hybrid Approach (Recommended)
1. Keep the main project files generic (✅ already done)
2. Move SellerFi-specific examples to a separate `examples/` directory
3. Create generic versions of scripts in the main directories
4. Document the SellerFi implementation as a case study

---

## 🔍 Search Commands for Remaining Work

To find remaining references:

```bash
# Case-insensitive search for SellerFi
rg -i "sellerfi" --type-not lock

# Search for seller-financing
rg "seller.?financ" -i --type-not lock

# Search for seller-fi URLs
rg "seller-fi" -i --type-not lock

# Search for old database names
rg "sellerfin" -i --type-not lock
```

---

## 📝 Notes

- The core project structure and AI development environment remain intact
- All functional code is unchanged - only branding/naming updated
- Database schema and business logic still reference seller-financing concepts
- Consider whether to keep domain-specific features or make them generic

**Last Updated:** 2026-02-02
**Commit:** 38b430a - "refactor: Remove SellerFi branding, convert to generic baseline project"
