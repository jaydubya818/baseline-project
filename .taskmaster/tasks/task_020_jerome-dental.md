# Task ID: 20

**Title:** End-to-End Testing Suite

**Status:** pending

**Dependencies:** 10, 14, 17, 19

**Priority:** high

**Description:** Create comprehensive E2E tests covering the entire data flow from local agent to dashboard.

**Details:**

1. Set up Playwright for frontend E2E tests
2. Set up pytest for backend integration tests
3. Create test fixtures for practice, users, schedules
4. Test: Local agent extracts → sanitizes → uploads
5. Test: Cloud processes → generates huddle
6. Test: Dashboard displays correct role-specific data
7. Test: Chat interface responds correctly
8. Test: Audit log captures all events
9. Create CI/CD pipeline with test stages
10. Add performance benchmarks

**Test Strategy:**

1. Run full E2E flow test
2. Verify data integrity across pipeline
3. Test with various input scenarios
4. Confirm CI/CD pipeline passes
5. Validate performance benchmarks met

## Subtasks

### 20.1. Set up test infrastructure

**Status:** pending  
**Dependencies:** None  

Configure Playwright for frontend, pytest for backend with fixtures

### 20.2. Create frontend E2E tests

**Status:** pending  
**Dependencies:** 20.1  

Test login, dashboard navigation, role-based access

### 20.3. Create backend integration tests

**Status:** pending  
**Dependencies:** 20.1  

Test API endpoints, auth flows, data ingestion

### 20.4. Create full pipeline tests

**Status:** pending  
**Dependencies:** 20.2, 20.3  

Test complete flow: local agent → cloud → dashboard display

### 20.5. Add CI/CD pipeline

**Status:** pending  
**Dependencies:** 20.2, 20.3  

Configure GitHub Actions with test stages and deployment
