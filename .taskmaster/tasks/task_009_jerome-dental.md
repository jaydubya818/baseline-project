# Task ID: 9

**Title:** WriterAgent Implementation

**Status:** pending

**Dependencies:** 8

**Priority:** high

**Description:** Implement the WriterAgent that generates role-specific morning huddle summaries.

**Details:**

1. Create WriterAgent class
2. Define MorningHuddle output schema
3. Generate Clinical Summary for dentists (procedure focus, medical alerts)
4. Generate Hygiene Summary (X-ray due dates, perio gaps, anxiety flags)
5. Generate Admin Summary (tasks, payments, schedule gaps)
6. Use Azure OpenAI GPT-4 for natural language generation
7. Implement consistent professional tone
8. Keep summaries concise (< 500 words each)
9. Include priority ordering within summaries
10. Add action items with clear ownership

**Test Strategy:**

1. Test each summary type generation
2. Verify appropriate content per role
3. Confirm word limit adherence
4. Test tone consistency
5. Verify action items are clear and actionable

## Subtasks

### 9.1. Create WriterAgent class

**Status:** pending  
**Dependencies:** None  

Implement agent with MorningHuddle output schema

### 9.2. Implement clinical summary generation

**Status:** pending  
**Dependencies:** 9.1  

Generate dentist-focused summary with procedure context and medical alerts

### 9.3. Implement hygiene/admin summaries

**Status:** pending  
**Dependencies:** 9.1  

Generate hygienist summary (X-rays, perio) and admin summary (tasks, payments)

### 9.4. Ensure tone and format consistency

**Status:** pending  
**Dependencies:** 9.2, 9.3  

Implement prompts for professional tone, word limits, action items
