# Task ID: 8

**Title:** RevenueAgent Implementation

**Status:** pending

**Dependencies:** 7

**Priority:** medium

**Description:** Implement the RevenueAgent that identifies unscheduled treatment opportunities.

**Details:**

1. Create RevenueAgent class
2. Define RevenueOpportunity schema (patient_id, treatment_type, estimated_value, priority)
3. Query patient history for unscheduled treatments
4. Identify treatment gaps (e.g., recommended crown not scheduled)
5. Calculate estimated revenue value
6. Prioritize opportunities by value and urgency
7. Use LLM to generate patient-specific talking points
8. Output List[RevenueOpportunity]
9. Filter by practice's service offerings
10. Track conversion rates for ML improvement

**Test Strategy:**

1. Test opportunity identification
2. Verify revenue calculations
3. Test prioritization logic
4. Confirm talking points are generated
5. Test filtering by practice services

## Subtasks

### 8.1. Create RevenueAgent class

**Status:** pending  
**Dependencies:** None  

Implement agent with RevenueOpportunity schema (patient_id, treatment, value)

### 8.2. Implement opportunity identification

**Status:** pending  
**Dependencies:** 8.1  

Query patient history for unscheduled treatments and treatment gaps

### 8.3. Calculate revenue estimates

**Status:** pending  
**Dependencies:** 8.2  

Compute estimated value based on procedure codes and practice pricing

### 8.4. Generate talking points

**Status:** pending  
**Dependencies:** 8.2  

Use LLM to create patient-specific talking points for opportunities
