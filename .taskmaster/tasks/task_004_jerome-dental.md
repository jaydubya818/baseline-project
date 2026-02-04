# Task ID: 4

**Title:** FastAPI Schedule Ingestion Endpoint

**Status:** pending

**Dependencies:** 3

**Priority:** high

**Description:** Create the /api/v1/schedule/ingest endpoint that receives sanitized schedule data from the local agent.

**Details:**

1. Create Pydantic schemas for schedule ingestion (PatientAppt, SchedulePayload)
2. Implement POST /api/v1/schedule/ingest endpoint
3. Add request validation with Pydantic
4. Implement rate limiting (max 10 requests/minute per practice)
5. Add API key authentication for local agents
6. Store received schedule in database
7. Trigger async huddle generation after ingestion
8. Return acknowledgment with processing status
9. Log all ingestion events to audit log
10. Handle duplicate submissions gracefully (idempotency)

**Test Strategy:**

1. Test successful schedule ingestion
2. Verify Pydantic validation rejects malformed data
3. Test rate limiting behavior
4. Verify API key authentication
5. Confirm audit log entries created
6. Test idempotency with duplicate submissions

## Subtasks

### 4.1. Create Pydantic schemas for ingestion

**Status:** pending  
**Dependencies:** None  

Define PatientAppt, SchedulePayload schemas for request validation

### 4.2. Implement schedule ingestion endpoint

**Status:** pending  
**Dependencies:** 4.1  

Create POST /api/v1/schedule/ingest with validation and storage

### 4.3. Add rate limiting and API key auth

**Status:** pending  
**Dependencies:** 4.2  

Implement rate limiting (10 req/min) and API key authentication for local agents

### 4.4. Trigger async huddle generation

**Status:** pending  
**Dependencies:** 4.2  

Implement async task trigger for huddle generation after ingestion
