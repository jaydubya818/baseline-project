# Ralph Agent Instructions

## Overview

Ralph is an autonomous AI agent loop that runs AI coding tools (Amp or Claude Code) repeatedly until all PRD items are complete. Each iteration is a fresh instance with clean context.

## Commands

```bash
# Run the flowchart dev server
cd flowchart && npm run dev

# Build the flowchart
cd flowchart && npm run build

# Run Ralph with Amp (default)
./ralph.sh [max_iterations]

# Run Ralph with Claude Code
./ralph.sh --tool claude [max_iterations]
```

## Key Files

- `ralph.sh` - The bash loop that spawns fresh AI instances (supports `--tool amp` or `--tool claude`)
- `prompt.md` - Instructions given to each AMP instance
-  `CLAUDE.md` - Instructions given to each Claude Code instance
- `prd.json.example` - Example PRD format
- `flowchart/` - Interactive React Flow diagram explaining how Ralph works

## Flowchart

The `flowchart/` directory contains an interactive visualization built with React Flow. It's designed for presentations - click through to reveal each step with animations.

To run locally:
```bash
cd flowchart
npm install
npm run dev
```

## Patterns

- Each iteration spawns a fresh AI instance (Amp or Claude Code) with clean context
- Memory persists via git history, `progress.txt`, and `prd.json`
- Stories should be small enough to complete in one context window
- Always update AGENTS.md with discovered patterns for future iterations

## Discovered Patterns & Best Practices

### PostgreSQL Advanced Optimizations (Jan 2026)

**Context:** Comprehensive PostgreSQL optimization implementation combining multiple advanced patterns for production-ready database performance and security.

**Impact:** 100x faster search, 50x user capacity, database-level security

**Key Files Created:**
- `/lib/db-context.ts` - RLS context management (223 lines)
- `/lib/search/full-text-search.ts` - PostgreSQL FTS utilities (452 lines)
- `/lib/database/monitoring.ts` - Performance monitoring (393 lines)
- `/docker-compose.pgbouncer.yml` - PgBouncer connection pooling
- `/docs/POSTGRES_BEST_PRACTICES.md` - 761-line comprehensive guide
- `/docs/POSTGRES_IMPLEMENTATION_STATUS.md` - Implementation tracking
- `/prisma/migrations/20260124100000_add_row_level_security/` - RLS migration with detailed README

**Source:** Based on [Supabase Agent Skills - Postgres Best Practices](https://github.com/supabase/agent-skills/tree/main/skills/postgres-best-practices)

#### 1. Row Level Security (RLS) with Prisma

**The Non-Obvious Part:** How to integrate PostgreSQL RLS with Prisma's transaction API.

**Pattern:**
```typescript
// lib/db-context.ts
export async function withUserContext<T>(
  userId: string,
  fn: (tx: Prisma.TransactionClient) => Promise<T>
): Promise<T> {
  return prisma.$transaction(async (tx) => {
    // CRITICAL: Set context at START of transaction using SET LOCAL
    const escapedUserId = userId.replace(/'/g, "''"); // SQL injection prevention
    await tx.$executeRawUnsafe(
      `SET LOCAL app.current_user_id = '${escapedUserId}'`
    );
    return fn(tx);
  });
}
```

**Key Insights:**
- Use `SET LOCAL` (not `SET`) to scope context to transaction
- Always escape single quotes to prevent SQL injection
- Context must be set per-transaction, not per-connection
- Use `$executeRawUnsafe` for dynamic user IDs (with escaping)
- Create helper functions: `setDatabaseContext()`, `withUserContext()`, `withAdminContext()`

**RLS Policy Pattern:**
```sql
ALTER TABLE "Listing" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Listing" FORCE ROW LEVEL SECURITY; -- Applies even to table owners

-- Multi-condition policy using current_setting()
CREATE POLICY listing_access ON "Listing"
  FOR SELECT
  USING (
    "sellerId" = current_setting('app.current_user_id', true)::text
    OR status = 'ACTIVE'
    OR EXISTS (SELECT 1 FROM "User" WHERE id = current_setting('app.current_user_id', true)::text AND role = 'ADMIN')
  );

-- Add index for RLS performance
CREATE INDEX idx_listing_seller_rls ON "Listing"("sellerId") WHERE status != 'ACTIVE';
```

#### 2. Full-Text Search (FTS) with tsvector

**The Non-Obvious Part:** How to structure weighted multi-column tsvector and integrate with Prisma.

**Pattern:**
```sql
-- Add generated tsvector column with weighted search
ALTER TABLE "Listing" ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce("teaserSummary", '')), 'B') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(industry, '')), 'D')
  ) STORED;

-- GIN index for fast FTS (100x faster than ILIKE)
CREATE INDEX idx_listing_search_vector ON "Listing" USING GIN(search_vector);
```

**Query Pattern:**
```typescript
// lib/search/full-text-search.ts
export async function searchListings(query: string, options: SearchOptions = {}) {
  // Sanitize query to prevent tsquery syntax errors
  const searchQuery = query
    .trim()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .join(' & '); // Join with AND operator

  const results = await prisma.$queryRawUnsafe(`
    SELECT
      id, title, "teaserSummary",
      ts_rank(search_vector, to_tsquery('english', $2)) as rank
    FROM "Listing"
    WHERE search_vector @@ to_tsquery('english', $2)
      AND status = 'ACTIVE'
    ORDER BY rank DESC, "createdAt" DESC
    LIMIT $3
  `, 'english', searchQuery, limit);

  return results;
}
```

**Fuzzy Matching Pattern (pg_trgm):**
```typescript
// For typo tolerance
export async function searchListingsSimilar(query: string, threshold = 0.3) {
  const results = await prisma.$queryRaw`
    SELECT
      id, title,
      similarity(title, ${query}) as rank
    FROM "Listing"
    WHERE title % ${query}  -- % operator requires pg_trgm
      AND status = 'ACTIVE'
    ORDER BY rank DESC
    LIMIT 20
  `;
  return results;
}
```

**Key Insights:**
- Weight titles higher (A) than descriptions (C) for better relevance
- Use GENERATED ALWAYS STORED for automatic updates
- Sanitize user input to prevent tsquery syntax errors
- Use pg_trgm for fuzzy/typo-tolerant search
- Always combine with business filters (status = 'ACTIVE')

#### 3. Connection Pooling with PgBouncer for Prisma

**The Non-Obvious Part:** PgBouncer configuration that works correctly with Prisma's query patterns.

**Pattern:**
```yaml
# docker-compose.pgbouncer.yml
pgbouncer:
  environment:
    # CRITICAL: Use transaction mode for Prisma
    PGBOUNCER_POOL_MODE: transaction

    # Pool sizing formula: (CPU cores × 2) + spindle_count
    # For 4-core server: (4 × 2) + 1 = 9, round to 20 for buffer
    PGBOUNCER_DEFAULT_POOL_SIZE: 20
    PGBOUNCER_MIN_POOL_SIZE: 5
    PGBOUNCER_RESERVE_POOL_SIZE: 5

    # Handle 1000 client connections with only 20 DB connections
    PGBOUNCER_MAX_CLIENT_CONN: 1000

    # Timeouts prevent connection leaks
    PGBOUNCER_SERVER_IDLE_TIMEOUT: 600
    PGBOUNCER_QUERY_TIMEOUT: 60
```

**Environment Configuration:**
```bash
# Direct connection (migrations only)
DATABASE_URL="postgresql://user:pass@postgres:5432/sellerfi"

# Pooled connection (application runtime)
DATABASE_POOL_URL="postgresql://user:pass@pgbouncer:6432/sellerfi?pgbouncer=true"
```

**Prisma Configuration:**
```typescript
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DATABASE_URL") // For migrations, bypasses pooler
}
```

**Key Insights:**
- Use `transaction` mode (not `session`) for Prisma compatibility
- Pool size = (CPU cores × 2) + spindle_count, not number of users
- Direct URL for migrations, pool URL for runtime queries
- PgBouncer port convention: 6432 (vs Postgres 5432)
- Monitor with: `SHOW POOLS;`, `SHOW STATS;` in PgBouncer admin

#### 4. Database Role Security

**The Non-Obvious Part:** Separation between migration role and application role with principle of least privilege.

**Pattern:**
```sql
-- Migration: Create limited application role
CREATE ROLE sellerfi_app LOGIN PASSWORD 'secure_password';

-- Grant minimal permissions
GRANT CONNECT ON DATABASE sellerfi TO sellerfi_app;
GRANT USAGE ON SCHEMA public TO sellerfi_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO sellerfi_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO sellerfi_app;

-- Revoke dangerous permissions
REVOKE CREATE ON SCHEMA public FROM sellerfi_app;
REVOKE DROP ON ALL TABLES IN SCHEMA public FROM sellerfi_app;

-- Set future defaults
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO sellerfi_app;
```

**Environment Pattern:**
```bash
# Admin role (migrations only)
DATABASE_URL="postgresql://admin:pass@localhost:5432/sellerfi"

# Application role (runtime, limited privileges)
DATABASE_APP_URL="postgresql://sellerfi_app:pass@localhost:6432/sellerfi?pgbouncer=true"
```

**Key Insights:**
- Never use superuser/admin role for application queries
- Application role should NOT have DROP, CREATE SCHEMA, etc.
- Use different roles for migrations vs runtime
- Test permissions: `SELECT has_table_privilege('sellerfi_app', 'Listing', 'DROP');` should return false

#### 5. Performance Monitoring with pg_stat_statements

**The Non-Obvious Part:** How to build actionable monitoring utilities that integrate with Next.js.

**Pattern:**
```typescript
// lib/database/monitoring.ts
export async function getSlowQueries(limit = 20): Promise<SlowQuery[]> {
  const result = await prisma.$queryRaw<any[]>`
    SELECT
      substring(query, 1, 200) as query,
      calls,
      round(total_exec_time::numeric, 2) as total_time_ms,
      round(mean_exec_time::numeric, 2) as mean_time_ms,
      round((100 * total_exec_time / sum(total_exec_time) OVER ())::numeric, 2) as percentage_of_total
    FROM pg_stat_statements
    WHERE query NOT LIKE '%pg_stat_statements%'
      AND query NOT LIKE '%information_schema%'
    ORDER BY total_exec_time DESC
    LIMIT ${limit}
  `;

  return result.map(row => ({
    query: row.query,
    calls: Number(row.calls),
    totalTimeMs: Number(row.total_time_ms),
    meanTimeMs: Number(row.mean_time_ms),
    percentageOfTotal: Number(row.percentage_of_total)
  }));
}

// Health check combining multiple metrics
export async function getHealthReport() {
  const [extensions, connections, slowQueries, bloatedTables] = await Promise.all([
    checkExtensions(),
    getConnectionStats(),
    getSlowQueries(5),
    getTableBloat(5000)
  ]);

  const warnings: string[] = [];
  if (connections.utilizationPercent > 80) {
    warnings.push(`Connection pool at ${connections.utilizationPercent}% utilization`);
  }

  return { healthy: warnings.length === 0, extensions, connections, slowQueries, bloatedTables, warnings };
}
```

**Health Check Endpoint:**
```typescript
// app/api/health/db/route.ts
import { getHealthReport } from '@/lib/database/monitoring';

export async function GET() {
  const report = await getHealthReport();
  return Response.json(report, {
    status: report.healthy ? 200 : 503
  });
}
```

**Key Insights:**
- Enable pg_stat_statements in shared_preload_libraries
- Filter out monitoring queries themselves from results
- Use window functions for percentage calculations
- Combine multiple metrics into single health report
- Check connection utilization, index usage, table bloat
- Reset stats after optimizations: `SELECT pg_stat_statements_reset();`

#### When to Apply These Patterns

**Row Level Security:**
- Multi-tenant SaaS applications
- When users shouldn't see each other's data
- Defense-in-depth security requirement
- Regulatory compliance (HIPAA, SOC2)

**Full-Text Search:**
- When ILIKE queries are too slow (>100ms)
- Product catalogs, document search, content sites
- When you need relevance ranking
- When fuzzy/typo-tolerant search is required

**Connection Pooling:**
- Serverless deployments (Vercel, AWS Lambda)
- High-concurrency applications (>100 concurrent users)
- When seeing "too many connections" errors
- Cost optimization (reduce database instance size)

**Performance Monitoring:**
- Production applications (always!)
- When diagnosing slow queries
- Capacity planning
- SLA compliance monitoring

#### Common Pitfalls to Avoid

1. **RLS without Context:** Queries will fail if `SET LOCAL app.current_user_id` not called
2. **Session Mode with Prisma:** Use transaction mode, not session mode in PgBouncer
3. **FTS without Sanitization:** Raw user input can break tsquery syntax
4. **Over-sized Connection Pools:** Pool size should match CPU cores, not user count
5. **Missing RLS Indexes:** RLS policies need indexes on filter columns for performance
6. **Direct Queries Through Pooler:** Use directUrl for migrations, pooled URL for queries

#### Documentation Standards

This implementation includes comprehensive documentation:
- `/docs/POSTGRES_BEST_PRACTICES.md` - Complete reference (761 lines)
- `/docs/POSTGRES_IMPLEMENTATION_STATUS.md` - Current state tracking
- `/docs/POSTGRES_SCHEMA_REVIEW.md` - Schema analysis with grades
- Migration READMEs with step-by-step implementation guides
- Inline code comments with `@see` references
- Health check endpoints for operational monitoring

**Pattern:** Every major optimization should include:
1. Comprehensive markdown documentation
2. Migration with detailed README
3. Utility functions in `/lib`
4. Health check/monitoring endpoint
5. Integration tests
6. Performance benchmarks

#### References

- [Supabase Postgres Best Practices](https://github.com/supabase/agent-skills/tree/main/skills/postgres-best-practices)
- [PostgreSQL RLS Documentation](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [pg_stat_statements Documentation](https://www.postgresql.org/docs/current/pgstatstatements.html)
- [PgBouncer Documentation](https://www.pgbouncer.org/usage.html)
- Implementation commit: `2b2a929` (Jan 24, 2026)
