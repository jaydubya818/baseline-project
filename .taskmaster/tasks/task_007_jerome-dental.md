# Task ID: 7

**Title:** RiskScannerAgent Implementation

**Status:** pending

**Dependencies:** 6

**Priority:** high

**Description:** Implement the RiskScannerAgent that checks patients against the risk rules engine.

**Details:**

1. Create RiskScannerAgent class
2. Define RiskRule schema with condition, action, severity
3. Implement rules engine with configurable rules
4. Medical risk rules: blood thinners for elderly surgery, allergy alerts
5. Financial risk rules: outstanding balances > $500
6. Scheduling risk rules: no-show history
7. Use LLM for complex rule evaluation when needed
8. Output List[RiskFlag] with severity levels
9. Allow practice-specific rule customization
10. Cache rule evaluations for performance

**Test Strategy:**

1. Test each risk rule type
2. Verify correct severity assignment
3. Test complex rule evaluation with LLM
4. Confirm practice-specific rules work
5. Test caching behavior

## Subtasks

### 7.1. Create RiskScannerAgent class

**Status:** pending  
**Dependencies:** None  

Implement agent class with RiskRule schema (condition, action, severity)

### 7.2. Implement medical risk rules

**Status:** pending  
**Dependencies:** 7.1  

Create rules for blood thinners, allergies, age-based surgical risks

### 7.3. Implement financial risk rules

**Status:** pending  
**Dependencies:** 7.1  

Create rules for outstanding balances > $500, payment history

### 7.4. Implement scheduling risk rules

**Status:** pending  
**Dependencies:** 7.1  

Create rules for no-show history, appointment gaps

### 7.5. Add practice-specific customization

**Status:** pending  
**Dependencies:** 7.2, 7.3, 7.4  

Allow practices to define custom rules and thresholds
