-- Fix Failed Migration in Production Database
-- Run this directly on your Neon/Vercel production database

-- Step 1: Mark the failed migration as rolled back
UPDATE "_prisma_migrations"
SET finished_at = started_at,
    migration_name = '20260124000000_postgres_optimizations',
    logs = 'Manually rolled back - incompatible with managed database'
WHERE migration_name = '20260124000000_postgres_optimizations'
  AND finished_at IS NULL;

-- Step 2: Delete the failed migration record
DELETE FROM "_prisma_migrations"
WHERE migration_name = '20260124000000_postgres_optimizations';

-- Step 3: Now you can run the safe migration manually or let Prisma run it
-- The safe migration will be applied on next deployment
