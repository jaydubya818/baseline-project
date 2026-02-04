# Task ID: 2

**Title:** Cloud Database Schema Design (PostgreSQL)

**Status:** pending

**Dependencies:** 1

**Priority:** high

**Description:** Design and implement the PostgreSQL database schema for practices, users, schedules, huddles, and audit logs.

**Details:**

1. Create Practice model (id, name, settings, created_at)
2. Create User model with RBAC (id, practice_id, email, role: Provider|Hygienist|Admin|Manager)
3. Create Schedule model (id, practice_id, date, patient_appointments JSON)
4. Create MorningHuddle model (id, schedule_id, clinical_summary, hygiene_summary, admin_summary, risk_flags, opportunities)
5. Create AuditLog model (id, timestamp, user_id, action, resource, details) - immutable append-only
6. Create RiskFlag model (id, huddle_id, level, category, message)
7. Create RevenueOpportunity model (id, huddle_id, patient_id, treatment_type, estimated_value, priority)
8. Set up proper indexes for performance
9. Implement row-level security where applicable
10. Create migration scripts with SQLAlchemy Alembic

**Test Strategy:**

1. Run migrations successfully
2. Test CRUD operations on all models
3. Verify foreign key constraints
4. Test audit log immutability
5. Validate indexes improve query performance

## Subtasks

### 2.1. Design and create Practice and User models

**Status:** pending  
**Dependencies:** None  

Create SQLAlchemy models for Practice (id, name, settings) and User with RBAC roles

### 2.2. Create Schedule and MorningHuddle models

**Status:** pending  
**Dependencies:** 2.1  

Design schedule storage with patient appointments JSON and huddle output models

### 2.3. Implement immutable AuditLog model

**Status:** pending  
**Dependencies:** 2.1  

Create append-only audit log table with proper constraints to prevent modification

### 2.4. Create Alembic migrations and indexes

**Status:** pending  
**Dependencies:** 2.1, 2.2, 2.3  

Set up Alembic for migrations, create performance indexes for common queries
